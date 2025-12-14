# Task Tracker Development Process

## Where Did We Start?

### First Step

The first step was planning the application architecture and choosing technologies:

1. **Stack Selection:**
   - React + TypeScript (for type safety)
   - Tailwind CSS (for rapid styling)
   - @dnd-kit (for drag & drop functionality)
   - localStorage (for simple data storage)

2. **Requirements Study:**
   - 3 task columns (To Do, In Progress, Done)
   - Dragging and checkmark button for status changes
   - Dark and light themes with orange accents
   - CRUD operations with tasks

3. **Project Structure:**
   - Created modular component structure
   - Separation into pages, components, and types

### Work Planning

The development plan included the following stages:

1. ✅ Project setup (Tailwind, TypeScript)
2. ✅ Creating types and interfaces
3. ✅ Component development (TaskCard, TaskColumn, AddTaskModal)
4. ✅ Drag & drop logic implementation
5. ✅ localStorage integration
6. ✅ Adding theme toggle
7. ✅ MCP Server creation
8. ✅ Documentation writing

## How Did We Organize the Code?

### File Structure

```
src/
├── components/
│   ├── TaskCard/          # Task card
│   ├── TaskColumn/        # Task column
│   ├── AddTaskModal/      # Add/edit modal window
│   ├── ThemeToggle/       # Theme toggle
│   └── LanguageToggle/    # Language toggle
├── contexts/
│   └── LanguageContext.tsx  # Context for language management
├── pages/
│   └── MainPage/          # Main page with logic
├── types/
│   └── task.ts            # TypeScript types for tasks
├── App.tsx                # Root component
└── main.tsx              # Entry point
```

### Why This Approach?

1. **Modularity:**
   - Each component in its own folder — easy to find and modify
   - Reusable components separated out

2. **Separation of Concerns:**
   - `MainPage` contains all business logic (state, handlers)
   - Components are responsible only for display
   - Types separated out for reuse

3. **Scalability:**
   - Easy to add new components
   - Simple project navigation
   - Ready for adding new pages

## What Were the Difficulties?

### Difficulty 1: Library Compatibility

**Problem:** `react-beautiful-dnd` doesn't support React 19.

**Solution:** Switched to `@dnd-kit/core`, which is fully compatible and has a more modern API.

**What We Learned:** Always check library compatibility with React version before use.

### Difficulty 2: State Synchronization with localStorage

**Problem:** Needed to synchronize React state with localStorage without unnecessary re-renders.

**Solution:** Used `useEffect` to save to localStorage when tasks change. Loading happens once when the component mounts.

**What We Learned:** Proper use of `useEffect` with dependencies is critical for performance.

### Difficulty 3: Drag & Drop Between Columns

**Problem:** Needed to implement dragging not only within a column but also between columns.

**Solution:** Used `DndContext` for the entire application, and `useDroppable` for each column. Task status updates based on `over.id` in the `onDragEnd` event.

**What We Learned:** @dnd-kit provides a flexible API for complex drag & drop scenarios.

### Difficulty 4: MCP Server Creation

**Problem:** Lack of experience with Model Context Protocol.

**Solution:** Studied `@modelcontextprotocol/sdk` documentation and created a server using TypeScript. Implemented 5 tools for task management.

**What We Learned:** MCP is a powerful protocol for integrating AI assistants with applications. JSON schemas ensure data validation.

## What Can Be Improved?

### Features for Future Versions

1. **Backend Synchronization:**
   - API for storing tasks on server
   - Synchronization between devices
   - Multi-user mode

2. **Extended Features:**
   - Task tags and categories
   - Task priorities
   - Deadlines and reminders
   - Task search and filtering
   - Task sorting

3. **UX Improvements:**
   - Dragging animations
   - Action confirmation via toast notifications
   - Keyboard shortcuts
   - Task export/import (JSON, CSV)

4. **Integrations:**
   - Calendar integration
   - Browser notifications
   - Export to other task management systems

5. **MCP Server Improvements:**
   - Synchronization with browser localStorage via WebSocket
   - Adding tools for statistics and analytics
   - Filter and search support through MCP

### Technical Improvements

1. **Testing:**
   - Unit tests for components
   - Integration tests for drag & drop
   - E2E tests for main scenarios

2. **Optimization:**
   - List virtualization for large task volumes
   - Component memoization (React.memo, useMemo)
   - Lazy loading of components

3. **Accessibility (a11y):**
   - ARIA attributes
   - Screen reader support
   - Keyboard navigation

## MCP Experience

### Which MCP Server Was Used?

Created our own **Task Tracker MCP Server** for managing tasks through Model Context Protocol.

### How Did It Help in Development?

Although the MCP Server was created as part of the assignment, it demonstrates:

1. **AI Assistant Integration Capability:**
   - AI can manage tasks through MCP protocol
   - Automation of task creation and updates
   - Task statistics retrieval

2. **Architectural Flexibility:**
   - Server works independently from web application
   - Can be extended for integration with other systems

### What Was Difficult About Integration?

1. **Understanding MCP Structure:**
   - Learning the protocol took time
   - Needed to correctly define tools and schemas

2. **Data Storage:**
   - MCP Server stores data in JSON file
   - Web application uses localStorage
   - Real project needs synchronization through API

3. **Data Validation:**
   - JSON schemas must be precise
   - Error handling at all stages

### MCP Server Creation Process

1. **SDK Study:**
   - Read `@modelcontextprotocol/sdk` documentation
   - Understood server structure and tools

2. **Tool Definition:**
   - `list_tasks` — get task list
   - `create_task` — create task
   - `update_task_status` — update status
   - `delete_task` — delete task
   - `get_task_statistics` — statistics

3. **Implementation:**
   - Created server using TypeScript
   - Added validation through JSON schemas
   - Implemented file system work for storage

4. **Documentation:**
   - Wrote README with usage examples
   - Described all tools and parameters

## Conclusions

Developing Task Tracker was an interesting experience that allowed:

- ✅ Learning modern drag & drop libraries
- ✅ Mastering MCP protocol work
- ✅ Practicing modular architecture creation
- ✅ Learning to effectively use AI tools

The project turned out functional, with clean code and good documentation. Ready for further development and scaling.
