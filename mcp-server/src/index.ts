#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
	CallToolRequestSchema,
	ListToolsRequestSchema,
	ErrorCode,
	McpError,
} from '@modelcontextprotocol/sdk/types.js'
import * as fs from 'fs/promises'
import * as path from 'path'

type TaskStatus = 'todo' | 'in-progress' | 'done'

interface Task {
	id: string
	title: string
	description: string
	status: TaskStatus
	createdAt: number
}

const STORAGE_DIR = path.join(
	process.env.HOME || process.env.USERPROFILE || '',
	'.task-tracker'
)
const STORAGE_PATH = path.join(STORAGE_DIR, 'tasks.json')

async function ensureStorageDirectory(): Promise<void> {
	try {
		await fs.mkdir(STORAGE_DIR, { recursive: true })
	} catch (error) {
		console.error('Ошибка при создании директории хранилища:', error)
		throw error
	}
}

async function readTasks(): Promise<Task[]> {
	try {
		await ensureStorageDirectory()
		const data = await fs.readFile(STORAGE_PATH, 'utf-8')
		return JSON.parse(data)
	} catch (error: any) {
		if (error.code === 'ENOENT') {
			return []
		}
		console.error('Ошибка при чтении задач:', error)
		return []
	}
}

async function writeTasks(tasks: Task[]): Promise<void> {
	try {
		await ensureStorageDirectory()
		await fs.writeFile(STORAGE_PATH, JSON.stringify(tasks, null, 2), 'utf-8')
	} catch (error) {
		console.error('Ошибка при записи задач:', error)
		throw error
	}
}

class TaskTrackerMCPServer {
	private server: Server

	constructor() {
		this.server = new Server(
			{
				name: 'task-tracker-mcp-server',
				version: '0.1.0',
			},
			{
				capabilities: {
					tools: {},
				},
			}
		)

		this.setupHandlers()
	}

	private setupHandlers(): void {
		this.server.setRequestHandler(ListToolsRequestSchema, async () => {
			return {
				tools: [
					{
						name: 'list_tasks',
						description:
							'Получить список всех задач или отфильтрованных по статусу',
						inputSchema: {
							type: 'object',
							properties: {
								status: {
									type: 'string',
									enum: ['todo', 'in-progress', 'done', 'all'],
									description: 'Фильтр по статусу задачи',
								},
							},
						},
					},
					{
						name: 'create_task',
						description: 'Создать новую задачу',
						inputSchema: {
							type: 'object',
							required: ['title'],
							properties: {
								title: {
									type: 'string',
									description: 'Название задачи',
								},
								description: {
									type: 'string',
									description: 'Описание задачи',
								},
								status: {
									type: 'string',
									enum: ['todo', 'in-progress', 'done'],
									description: 'Статус задачи (по умолчанию: todo)',
									default: 'todo',
								},
							},
						},
					},
					{
						name: 'update_task_status',
						description: 'Обновить статус существующей задачи',
						inputSchema: {
							type: 'object',
							required: ['taskId', 'status'],
							properties: {
								taskId: {
									type: 'string',
									description: 'ID задачи для обновления',
								},
								status: {
									type: 'string',
									enum: ['todo', 'in-progress', 'done'],
									description: 'Новый статус задачи',
								},
							},
						},
					},
					{
						name: 'delete_task',
						description: 'Удалить задачу',
						inputSchema: {
							type: 'object',
							required: ['taskId'],
							properties: {
								taskId: {
									type: 'string',
									description: 'ID задачи для удаления',
								},
							},
						},
					},
					{
						name: 'get_task_statistics',
						description:
							'Получить статистику по задачам (количество по каждому статусу)',
						inputSchema: {
							type: 'object',
							properties: {},
						},
					},
				],
			}
		})

		this.server.setRequestHandler(
			CallToolRequestSchema,
			async (request: any) => {
				const { name, arguments: args } = request.params

				try {
					switch (name) {
						case 'list_tasks': {
							const tasks = await readTasks()
							const statusFilter = (args?.status as string) || 'all'

							let filteredTasks = tasks
							if (statusFilter !== 'all') {
								filteredTasks = tasks.filter(
									task => task.status === statusFilter
								)
							}

							return {
								content: [
									{
										type: 'text',
										text: JSON.stringify(filteredTasks, null, 2),
									},
								],
							}
						}

						case 'create_task': {
							if (!args?.title || typeof args.title !== 'string') {
								throw new McpError(
									ErrorCode.InvalidParams,
									'Параметр title обязателен и должен быть строкой'
								)
							}

							const tasks = await readTasks()
							const newTask: Task = {
								id: Date.now().toString(),
								title: args.title as string,
								description: (args.description as string) || '',
								status: (args.status as TaskStatus) || 'todo',
								createdAt: Date.now(),
							}

							tasks.push(newTask)
							await writeTasks(tasks)

							return {
								content: [
									{
										type: 'text',
										text: `Задача успешно создана: ${JSON.stringify(
											newTask,
											null,
											2
										)}`,
									},
								],
							}
						}

						case 'update_task_status': {
							if (!args?.taskId || typeof args.taskId !== 'string') {
								throw new McpError(
									ErrorCode.InvalidParams,
									'Параметр taskId обязателен и должен быть строкой'
								)
							}

							if (!args?.status || typeof args.status !== 'string') {
								throw new McpError(
									ErrorCode.InvalidParams,
									'Параметр status обязателен и должен быть строкой'
								)
							}

							const validStatuses: TaskStatus[] = [
								'todo',
								'in-progress',
								'done',
							]
							if (!validStatuses.includes(args.status as TaskStatus)) {
								throw new McpError(
									ErrorCode.InvalidParams,
									`Статус должен быть одним из: ${validStatuses.join(', ')}`
								)
							}

							const tasks = await readTasks()
							const taskIndex = tasks.findIndex(
								task => task.id === (args.taskId as string)
							)

							if (taskIndex === -1) {
								throw new McpError(
									ErrorCode.InvalidParams,
									`Задача с ID ${args.taskId} не найдена`
								)
							}

							tasks[taskIndex].status = args.status as TaskStatus
							await writeTasks(tasks)

							return {
								content: [
									{
										type: 'text',
										text: `Статус задачи обновлен: ${JSON.stringify(
											tasks[taskIndex],
											null,
											2
										)}`,
									},
								],
							}
						}

						case 'delete_task': {
							if (!args?.taskId || typeof args.taskId !== 'string') {
								throw new McpError(
									ErrorCode.InvalidParams,
									'Параметр taskId обязателен и должен быть строкой'
								)
							}

							const tasks = await readTasks()
							const taskIndex = tasks.findIndex(
								task => task.id === (args.taskId as string)
							)

							if (taskIndex === -1) {
								throw new McpError(
									ErrorCode.InvalidParams,
									`Задача с ID ${args.taskId} не найдена`
								)
							}

							const deletedTask = tasks[taskIndex]
							tasks.splice(taskIndex, 1)
							await writeTasks(tasks)

							return {
								content: [
									{
										type: 'text',
										text: `Задача удалена: ${JSON.stringify(
											deletedTask,
											null,
											2
										)}`,
									},
								],
							}
						}

						case 'get_task_statistics': {
							const tasks = await readTasks()
							const statistics = {
								total: tasks.length,
								todo: tasks.filter(task => task.status === 'todo').length,
								'in-progress': tasks.filter(
									task => task.status === 'in-progress'
								).length,
								done: tasks.filter(task => task.status === 'done').length,
							}

							return {
								content: [
									{
										type: 'text',
										text: JSON.stringify(statistics, null, 2),
									},
								],
							}
						}

						default:
							throw new McpError(
								ErrorCode.MethodNotFound,
								`Неизвестный инструмент: ${name}`
							)
					}
				} catch (error) {
					if (error instanceof McpError) {
						throw error
					}
					throw new McpError(
						ErrorCode.InternalError,
						`Ошибка при выполнении инструмента ${name}: ${
							error instanceof Error ? error.message : String(error)
						}`
					)
				}
			}
		)
	}

	async run(): Promise<void> {
		const transport = new StdioServerTransport()
		await this.server.connect(transport)
		console.error('Task Tracker MCP Server запущен')
	}
}

const server = new TaskTrackerMCPServer()
server.run().catch(error => {
	console.error('Ошибка при запуске сервера:', error)
	process.exit(1)
})
