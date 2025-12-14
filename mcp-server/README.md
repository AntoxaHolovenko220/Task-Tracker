# Task Tracker MCP Server

MCP Server для управления задачами Task Tracker через Model Context Protocol.

## Описание

Этот MCP Server предоставляет инструменты для управления задачами в Task Tracker приложении. Он позволяет AI-ассистентам создавать, обновлять, удалять и получать список задач.

## Установка

```bash
cd mcp-server
npm install
npm run build
```

## Использование

### Запуск сервера

```bash
npm start
```

### Для разработки (с hot reload)

```bash
npm run dev
```

## Доступные инструменты

### 1. `list_tasks`

Получить список всех задач или отфильтрованных по статусу.

**Параметры:**
- `status` (опционально): `'todo' | 'in-progress' | 'done' | 'all'` - фильтр по статусу

**Пример:**
```json
{
  "status": "todo"
}
```

### 2. `create_task`

Создать новую задачу.

**Параметры:**
- `title` (обязательно): название задачи
- `description` (опционально): описание задачи
- `status` (опционально): `'todo' | 'in-progress' | 'done'` (по умолчанию: `'todo'`)

**Пример:**
```json
{
  "title": "Завершить проект",
  "description": "Необходимо завершить все задачи проекта",
  "status": "in-progress"
}
```

### 3. `update_task_status`

Обновить статус существующей задачи.

**Параметры:**
- `taskId` (обязательно): ID задачи
- `status` (обязательно): новый статус `'todo' | 'in-progress' | 'done'`

**Пример:**
```json
{
  "taskId": "1234567890",
  "status": "done"
}
```

### 4. `delete_task`

Удалить задачу.

**Параметры:**
- `taskId` (обязательно): ID задачи для удаления

**Пример:**
```json
{
  "taskId": "1234567890"
}
```

### 5. `get_task_statistics`

Получить статистику по задачам (количество по каждому статусу).

**Параметры:** нет

## Хранение данных

Сервер сохраняет задачи в JSON файл по пути: `~/.task-tracker/tasks.json`

## Интеграция с Cursor/Claude

Для использования этого MCP Server в Cursor или Claude Code, добавьте его в конфигурацию:

```json
{
  "mcpServers": {
    "task-tracker": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/index.js"]
    }
  }
}
```

## Архитектура

Сервер реализован с использованием `@modelcontextprotocol/sdk` и предоставляет следующие возможности:

- Чтение и запись задач из/в JSON файл
- Валидация входных данных
- Обработка ошибок
- Типизация TypeScript

## Разработка

```bash
# Установка зависимостей
npm install

# Сборка
npm run build

# Запуск в режиме разработки
npm run dev
```



