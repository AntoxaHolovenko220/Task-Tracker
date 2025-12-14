# Task Tracker MCP Server Documentation

## Description

Task Tracker MCP Server is a server that implements the Model Context Protocol (MCP) for managing tasks in the Task Tracker application. It allows AI assistants to interact with tasks through a standardized protocol.

MCP (Model Context Protocol) Server is a server that allows AI assistants (such as Claude in Cursor) to interact with your Task Tracker application. Through the MCP Server, AI can create, update, delete, and retrieve information about tasks.

## Architecture

### Technology Stack

- **@modelcontextprotocol/sdk** - SDK for creating MCP servers
- **TypeScript** - Type safety and modern JavaScript
- **Node.js** - Runtime environment

### Server Structure

```
mcp-server/
├── src/
│   └── index.ts          # Main server file
├── dist/                 # Compiled JavaScript
├── package.json
└── tsconfig.json
```

### Main Components

1. **TaskTrackerMCPServer class**
   - MCP server initialization
   - Request handler registration
   - Error handling

2. **Data Storage**
   - JSON file: `~/.task-tracker/tasks.json` (Linux/Mac) or `C:\Users\YourName\.task-tracker\tasks.json` (Windows)
   - Functions: `readTasks()`, `writeTasks()`

3. **Tools**
   - 5 tools for task management
   - JSON schemas for input data validation

## Installation and Setup

### Step 1: Install Dependencies

Open a terminal in the `mcp-server` folder and run:

```bash
cd mcp-server
npm install
```

### Step 2: Build the Project

Compile TypeScript code to JavaScript:

```bash
npm run build
```

After successful build, the `index.js` file will appear in the `dist` folder.

### Step 3: Verify Server Operation

To verify, you can run the server directly:

```bash
npm start
```

The server will start and be ready to work. Press `Ctrl+C` to stop.

### Development Mode

For development with automatic reload on changes:

```bash
npm run dev
```

This mode uses `tsx` to run TypeScript files directly without compilation.

## Available Tools

### 1. list_tasks

Get a list of all tasks or filtered by status.

**Parameters:**
```json
{
  "status": "todo" | "in-progress" | "done" | "all"
}
```

**Usage Example:**
```json
{
  "status": "todo"
}
```

**Response:**
```json
[
  {
    "id": "1234567890",
    "title": "Complete project",
    "description": "Need to complete all tasks",
    "status": "todo",
    "createdAt": 1234567890
  }
]
```

### 2. create_task

Create a new task.

**Parameters:**
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "status": "todo" | "in-progress" | "done" (default: "todo")
}
```

**Usage Example:**
```json
{
  "title": "Learn MCP protocol",
  "description": "Read documentation and create a server example",
  "status": "in-progress"
}
```

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "Task successfully created: { ... }"
    }
  ]
}
```

### 3. update_task_status

Update the status of an existing task.

**Parameters:**
```json
{
  "taskId": "string (required)",
  "status": "todo" | "in-progress" | "done" (required)
}
```

**Usage Example:**
```json
{
  "taskId": "1234567890",
  "status": "done"
}
```

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "Task status updated: { ... }"
    }
  ]
}
```

### 4. delete_task

Delete a task.

**Parameters:**
```json
{
  "taskId": "string (required)"
}
```

**Usage Example:**
```json
{
  "taskId": "1234567890"
}
```

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "Task deleted: { ... }"
    }
  ]
}
```

### 5. get_task_statistics

Get task statistics (count by each status).

**Parameters:** None

**Usage Example:**
```json
{}
```

**Response:**
```json
{
  "total": 10,
  "todo": 5,
  "in-progress": 3,
  "done": 2
}
```

## Integration with AI Assistants

### Setup in Cursor

1. Open Cursor settings (usually via `Ctrl+,` or `Cmd+,`)

2. Find the "MCP Servers" or "Model Context Protocol" section

3. Add the following configuration:

**For Windows:**
```json
{
  "mcpServers": {
    "task-tracker": {
      "command": "node",
      "args": ["D:\\Task-Tracker\\mcp-server\\dist\\index.js"]
    }
  }
}
```

**For Linux/Mac:**
```json
{
  "mcpServers": {
    "task-tracker": {
      "command": "node",
      "args": ["/absolute/path/to/Task-Tracker/mcp-server/dist/index.js"]
    }
  }
}
```

**Important:** 
- Replace the path with the absolute path to your project
- Use double backslashes (`\\`) in Windows or regular slashes (`/`) in Linux/Mac
- **Restart Cursor** after changing the configuration

### Setup in Claude Desktop

Add to the Claude Desktop configuration file (usually `%APPDATA%\\Claude\\claude_desktop_config.json` on Windows or `~/Library/Application Support/Claude/claude_desktop_config.json` on Mac):

**For Windows:**
```json
{
  "mcpServers": {
    "task-tracker": {
      "command": "node",
      "args": ["D:\\Task-Tracker\\mcp-server\\dist\\index.js"]
    }
  }
}
```

**For Linux/Mac:**
```json
{
  "mcpServers": {
    "task-tracker": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/dist/index.js"]
    }
  }
}
```

**Important:** Use an absolute path to the `dist/index.js` file. After changing the configuration, restart Claude Desktop.

### Connection Verification

After restarting Cursor/Claude Desktop, the AI assistant should automatically connect to the MCP Server. You can verify this by asking the AI:

```
Show me a list of all tasks
```

If the server is working correctly, the AI will be able to use tools to work with tasks.

## Usage via AI Assistant

After setup, you can use AI to manage tasks in natural language:

### Command Examples:

1. **Creating a task:**
   ```
   Create a task "Learn TypeScript" with status "in-progress"
   ```
   
   AI uses the `create_task` tool with parameters:
   ```json
   {
     "title": "Learn TypeScript",
     "status": "in-progress"
   }
   ```

2. **Getting a task list:**
   ```
   Show me all tasks with status "todo"
   ```
   
   AI uses the `list_tasks` tool with parameters:
   ```json
   {
     "status": "todo"
   }
   ```

3. **Updating status:**
   ```
   Move task with ID 1234567890 to status "done"
   ```
   
   AI uses the `update_task_status` tool with parameters:
   ```json
   {
     "taskId": "1234567890",
     "status": "done"
   }
   ```

4. **Getting statistics:**
   ```
   How many tasks do I have in progress?
   ```
   
   AI uses the `get_task_statistics` tool and returns the count of tasks with status "in-progress".

5. **Deleting a task:**
   ```
   Delete task with ID 1234567890
   ```
   
   AI uses the `delete_task` tool with parameters:
   ```json
   {
     "taskId": "1234567890"
   }
   ```

## Data Storage

MCP Server saves all tasks to a JSON file:

- **Windows:** `C:\Users\YourName\.task-tracker\tasks.json`
- **Linux/Mac:** `~/.task-tracker/tasks.json`

**Important:** This storage is **separate** from browser localStorage, so tasks created through the MCP Server will not automatically appear in the web application and vice versa.

## Code Examples

### Server Initialization

```typescript
const server = new TaskTrackerMCPServer();
server.run().catch(console.error);
```

### Reading Tasks

```typescript
async function readTasks(): Promise<Task[]> {
  try {
    await ensureStorageDirectory();
    const data = await fs.readFile(STORAGE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}
```

### Creating a Task

```typescript
case 'create_task': {
  const tasks = await readTasks();
  const newTask: Task = {
    id: Date.now().toString(),
    title: args?.title as string,
    description: (args?.description as string) || '',
    status: (args?.status as TaskStatus) || 'todo',
    createdAt: Date.now(),
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  return { content: [{ type: 'text', text: `Task created: ...` }] };
}
```

## Troubleshooting

### Problem: Server Won't Start

**Solution:**
1. Make sure all dependencies are installed: `npm install`
2. Check that TypeScript is compiled: `npm run build`
3. Check that Node.js is installed: `node --version`
4. Check file permissions: `chmod +x dist/index.js` (Linux/Mac)

### Problem: File Read/Write Errors

**Solution:**
1. Check permissions to create the `~/.task-tracker/` directory (or `C:\Users\YourName\.task-tracker\` on Windows)
2. Make sure there's enough disk space
3. Check that the home directory path is correct
4. Check server logs for detailed error information

### Problem: AI Can't See Tools

**Solution:**
1. Make sure the server path is **absolute** (not relative)
2. Check that the `dist/index.js` file exists
3. Check that the server starts without errors
4. Restart the AI assistant after changing the configuration
5. Check Cursor/Claude Desktop logs for errors

### Problem: Tasks Don't Sync with Web Application

**Important:** This is expected behavior. MCP Server uses separate storage (JSON file), while the web application uses browser localStorage. They don't sync automatically.

## Limitations and Future Improvements

### Current Limitations

1. **Separate Storage**: MCP Server uses a JSON file, doesn't sync with browser localStorage
2. **No Authentication**: All tasks are stored locally without user separation
3. **No Format Validation**: File format correctness is not validated

### Planned (Possible) Improvements

1. **API Integration**: Sync with web application through API
2. **WebSocket Support**: Real-time updates between MCP Server and application
3. **Extended Statistics**: Add tools for analytics and reports
4. **Filters and Search**: Tools for searching tasks by various criteria
5. **Tags and Categories**: Support for task tags and categories through MCP

## What Problem Does MCP Server Solve?

### Task Management Automation

MCP Server allows AI assistants to automatically:
- Create tasks based on conversation
- Update task statuses
- Get statistics and reports
- Manage tasks without direct UI interaction

### Workflow Integration

Usage examples:
- **During work**: AI creates tasks based on your requests
- **Planning**: AI helps organize tasks by status
- **Reporting**: Quick statistics retrieval through AI

### Interface Unification

MCP protocol standardizes interaction between AI assistants and applications, allowing:
- Use one server with different AI assistants
- Easily add new tools
- Integrate with other MCP-compatible systems

## Implementation Architecture

The server is implemented using `@modelcontextprotocol/sdk` and provides the following capabilities:

- Reading and writing tasks from/to JSON file
- Input data validation through JSON schemas
- Error handling using McpError
- TypeScript typing for type safety

## Conclusion

Task Tracker MCP Server demonstrates how to integrate a web application with AI assistants through Model Context Protocol. This opens new possibilities for automation and improving user experience, allowing AI assistants to manage tasks in natural language.
