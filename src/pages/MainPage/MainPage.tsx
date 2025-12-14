import { useState, useEffect } from 'react'
import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Task, TaskStatus } from '../../types/task'
import { TaskColumn } from '../../components/TaskColumn/TaskColumn'
import { AddTaskModal } from '../../components/AddTaskModal/AddTaskModal'
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle'
import { LanguageToggle } from '../../components/LanguageToggle/LanguageToggle'
import { TaskCard } from '../../components/TaskCard/TaskCard'
import { useLanguage } from '../../contexts/LanguageContext'
import { PlusIcon } from '@heroicons/react/24/outline'

const STORAGE_KEY = 'task-tracker-tasks'

const MainPage = () => {
	const { t } = useLanguage()
	const [tasks, setTasks] = useState<Task[]>([])
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editingTask, setEditingTask] = useState<Task | null>(null)
	const [activeTask, setActiveTask] = useState<Task | null>(null)

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	)

	const [isLoaded, setIsLoaded] = useState(false)

	// Загрузка задач из localStorage
	useEffect(() => {
		const savedTasks = localStorage.getItem(STORAGE_KEY)
		if (savedTasks) {
			try {
				const parsedTasks = JSON.parse(savedTasks)
				setTasks(parsedTasks)
			} catch (error) {
				console.error('Ошибка при загрузке задач:', error)
			}
		}
		setIsLoaded(true)
	}, [])

	// Сохранение задач в localStorage
	useEffect(() => {
		if (isLoaded) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
		}
	}, [tasks, isLoaded])

	const getTasksByStatus = (status: TaskStatus): Task[] => {
		return tasks.filter(task => task.status === status)
	}

	const handleDragStart = (event: DragStartEvent) => {
		const task = tasks.find(t => t.id === event.active.id)
		if (task) {
			setActiveTask(task)
		}
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		setActiveTask(null)

		if (!over) return

		const taskId = active.id as string
		const overId = over.id as string

		// Если перетаскиваем задачу в колонку (изменение статуса)
		if (['todo', 'in-progress', 'done'].includes(overId)) {
			const newStatus = overId as TaskStatus
			const activeTask = tasks.find(t => t.id === taskId)

			// Если статус не изменился, возможно это перетаскивание внутри колонки
			if (activeTask?.status === newStatus) {
				return
			}

			setTasks(prevTasks =>
				prevTasks.map(task =>
					task.id === taskId ? { ...task, status: newStatus } : task
				)
			)
			return
		}

		// Если перетаскиваем задачу на другую задачу (сортировка внутри колонки)
		const activeTask = tasks.find(t => t.id === taskId)
		const overTask = tasks.find(t => t.id === overId)

		if (!activeTask || !overTask) return

		// Если задачи в одной колонке, меняем их порядок
		if (activeTask.status === overTask.status) {
			// Получаем отфильтрованный список задач с одинаковым статусом
			const statusTasks = tasks.filter(t => t.status === activeTask.status)
			const activeIndexInStatus = statusTasks.findIndex(t => t.id === taskId)
			const overIndexInStatus = statusTasks.findIndex(t => t.id === overId)

			if (activeIndexInStatus !== -1 && overIndexInStatus !== -1) {
				// Создаем новый массив с измененным порядком задач этого статуса
				const reorderedStatusTasks = arrayMove(
					statusTasks,
					activeIndexInStatus,
					overIndexInStatus
				)

				// Обновляем общий массив задач
				setTasks(prevTasks => {
					// Удаляем задачи с этим статусом
					const otherTasks = prevTasks.filter(
						t => t.status !== activeTask.status
					)
					// Добавляем задачи с новым порядком
					return [...otherTasks, ...reorderedStatusTasks]
				})
			}
		}
	}

	const handleAddTask = () => {
		setEditingTask(null)
		setIsModalOpen(true)
	}

	const handleEditTask = (task: Task) => {
		setEditingTask(task)
		setIsModalOpen(true)
	}

	const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
		if (editingTask) {
			// Редактирование существующей задачи
			setTasks(prevTasks =>
				prevTasks.map(task =>
					task.id === editingTask.id ? { ...task, ...taskData } : task
				)
			)
		} else {
			// Создание новой задачи
			const newTask: Task = {
				id: Date.now().toString(),
				...taskData,
				createdAt: Date.now(),
			}
			setTasks(prevTasks => [...prevTasks, newTask])
		}
		setIsModalOpen(false)
		setEditingTask(null)
	}

	const handleDeleteTask = (id: string) => {
		if (confirm(t('deleteConfirm'))) {
			setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
		}
	}

	const handleToggleDone = (id: string) => {
		setTasks(prevTasks =>
			prevTasks.map(task =>
				task.id === id
					? { ...task, status: task.status === 'done' ? 'todo' : 'done' }
					: task
			)
		)
	}

	return (
		<div className='min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors'>
			<div className='container mx-auto px-4 py-8'>
				{/* Header */}
				<div className='mb-8'>
					{/* Заголовок и кнопка темы в один ряд */}
					<div className='flex items-center justify-between mb-2'>
						<h1 className='text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100'>
							{t('appTitle')}
						</h1>
						<div className='flex items-center gap-2'>
							<LanguageToggle />
							<ThemeToggle />
						</div>
					</div>
					{/* Подзаголовок */}
					<p className='text-gray-600 dark:text-gray-400 mb-4'>
						{t('appSubtitle')}
					</p>
					{/* Кнопка добавления задачи на всю ширину на мобильных */}
					<button
						onClick={handleAddTask}
						className='w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl'
					>
						<PlusIcon className='w-5 h-5' />
						{t('addTask')}
					</button>
				</div>

				{/* Columns */}
				<DndContext
					sensors={sensors}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
				>
					<div className='flex flex-col lg:flex-row lg:items-stretch gap-6'>
						<TaskColumn
							status='todo'
							tasks={getTasksByStatus('todo')}
							onEdit={handleEditTask}
							onDelete={handleDeleteTask}
							onToggleDone={handleToggleDone}
						/>
						<TaskColumn
							status='in-progress'
							tasks={getTasksByStatus('in-progress')}
							onEdit={handleEditTask}
							onDelete={handleDeleteTask}
							onToggleDone={handleToggleDone}
						/>
						<TaskColumn
							status='done'
							tasks={getTasksByStatus('done')}
							onEdit={handleEditTask}
							onDelete={handleDeleteTask}
							onToggleDone={handleToggleDone}
						/>
					</div>

					<DragOverlay>
						{activeTask ? (
							<div className='rotate-3 opacity-90'>
								<TaskCard
									task={activeTask}
									onEdit={handleEditTask}
									onDelete={handleDeleteTask}
									onToggleDone={handleToggleDone}
								/>
							</div>
						) : null}
					</DragOverlay>
				</DndContext>
			</div>

			{/* Modal */}
			<AddTaskModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false)
					setEditingTask(null)
				}}
				onSave={handleSaveTask}
				editingTask={editingTask}
			/>
		</div>
	)
}

export default MainPage
