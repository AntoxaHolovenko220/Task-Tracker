# AI Tools Workflow Documentation

## Which AI Tool Was Used?

**Cursor AI** — an integrated AI assistant in the Cursor editor — was used for developing the Task Tracker application.

**Why Cursor?**

- Direct integration into the development process (inline suggestions, chat)
- Understanding of project context and open files
- Ability to quickly refactor and generate code
- Built-in support for TypeScript and React
- Convenient work with project file structure

## What Tasks Were Solved with AI?

### 1. Project Setup and Architecture

**Task:** Quickly set up Tailwind CSS with dark theme support and orange color scheme.

**How AI Helped:**
- Generated `tailwind.config.js` configuration with dark theme settings (`darkMode: 'class'`)
- Added custom orange color palette
- Configured PostCSS
- Added necessary directives to CSS file

**Result:** The project was set up with full Tailwind CSS and dark theme support in a few minutes, which usually takes 15-20 minutes manually.

### 2. Drag & Drop Implementation

**Task:** Implement task dragging between columns using a modern library compatible with React 19.

**How AI Helped:**
- Identified compatibility issue with `react-beautiful-dnd` and React 19
- Suggested alternative — `@dnd-kit/core` with React 19 support
- Generated code for DndContext, SortableContext setup
- Implemented drag & drop event handling logic (`handleDragStart`, `handleDragEnd`)
- Added visual feedback with DragOverlay

**Result:** Fully functional drag & drop was implemented in one AI session, avoiding compatibility issues.

### 3. MCP Server Creation

**Task:** Create an MCP Server for integrating Task Tracker with AI assistants through Model Context Protocol.

**How AI Helped:**
- Explained MCP Server structure and `@modelcontextprotocol/sdk` usage
- Generated basic server structure with request handlers
- Created 5 tools: `list_tasks`, `create_task`, `update_task_status`, `delete_task`, `get_task_statistics`
- Implemented input data validation through JSON schemas
- Added error handling and TypeScript typing

**Result:** A fully functional MCP Server was created from scratch, including documentation and usage examples.

## Prompt Examples

### Prompt 1: Tailwind CSS Setup

```
Set up Tailwind CSS for the project with dark theme support via 'dark' class.
Add a custom orange color palette for application accents.
Configure PostCSS and add necessary directives to CSS file.
```

**What We Got in Response:**
- Ready configuration files `tailwind.config.js` and `postcss.config.js`
- Updated `src/App.css` with Tailwind directives
- Explanations on dark theme setup via classes

### Prompt 2: TaskCard Component Implementation

```
Create a TaskCard component for displaying a task with:
- Title and description
- Edit and delete buttons
- Ability to mark task as done
- Drag & drop support via @dnd-kit
- Styling with orange accents and dark theme support
```

**What We Got in Response:**
- Fully typed TypeScript component
- Integration with `@dnd-kit/sortable`
- Styling using Tailwind CSS
- Event handlers for all actions

### Prompt 3: MCP Server Creation

```
Create an MCP Server for Task Tracker task management.
The server should provide tools for:
- Viewing task list (with status filtering)
- Creating new tasks
- Updating task statuses
- Deleting tasks
- Getting task statistics

Use @modelcontextprotocol/sdk and save data to JSON file.
```

**What We Got in Response:**
- Complete MCP Server structure with TypeScript
- 5 tools with valid JSON schemas
- File system logic for task storage
- Error handling and data validation

## What Did You Learn?

### New Approaches and Techniques

1. **@dnd-kit library:**
   - Modern alternative to `react-beautiful-dnd`
   - Better React 19 and TypeScript support
   - More flexible architecture with hooks (`useSortable`, `useDroppable`)

2. **Model Context Protocol (MCP):**
   - Protocol for integrating AI assistants with external systems
   - MCP Server structure with tools
   - JSON schemas for input data validation

3. **Dark Theme in Tailwind:**
   - Using `dark:` prefixes for styles
   - Toggling via class on `document.documentElement`
   - Saving preferences in localStorage

### How AI Accelerated Development

1. **Time Savings on Finding Solutions:**
   - Instead of searching documentation and Stack Overflow, got ready solutions immediately
   - AI suggested alternatives when compatibility issues were detected

2. **Boilerplate Code Generation:**
   - React components with proper typing generated in seconds
   - Configuration files created without errors

3. **Refactoring and Improvement:**
   - AI helped optimize code on the fly
   - Suggested architecture improvements

**Total Time Savings:** Approximately 60-70% of development time was saved thanks to the AI assistant.

## Difficulties and Solutions

### Problem 1: Library Compatibility

**Difficulty:** `react-beautiful-dnd` doesn't support React 19.

**Solution:** AI suggested using `@dnd-kit/core`, which is fully compatible with React 19 and has a better API.

**How AI Helped:** Immediately identified the problem from the error message and suggested a working solution with code example.

### Problem 2: Data Synchronization Between MCP Server and Application

**Difficulty:** MCP Server stores data in a JSON file, while the application uses browser localStorage.

**Solution:** For demonstration, we use separate storage in MCP Server (`~/.task-tracker/tasks.json`). In a real application, synchronization can be added through API or shared storage.

**How AI Helped:** Explained architectural limitations and suggested several solution options with code examples.

### Problem 3: Typing in MCP Server

**Difficulty:** Needed to properly type input parameters for tools.

**Solution:** AI created TypeScript interfaces and JSON schemas for validation, ensuring type safety.

**How AI Helped:** Provided ready types and schemas, avoiding runtime errors.

## Conclusions

Working with AI tools (in this case Cursor AI) significantly accelerated the development process:

- ✅ Fast boilerplate code generation
- ✅ Solving compatibility issues on the fly
- ✅ Learning new technologies during development
- ✅ Creating quality, typed code

However, it's important to understand that AI is a tool for acceleration, not a replacement for code understanding. Always necessary to:
- Check generated code
- Understand architectural decisions
- Test functionality
- Adapt code to specific project requirements
