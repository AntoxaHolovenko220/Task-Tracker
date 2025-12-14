# Task Tracker

A simple and convenient web application for task management, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- ✅ **Task Management**: Create, edit, and delete tasks
- 🎯 **Three Columns**: To Do, In Progress, Done for tracking progress
- 🖱️ **Drag & Drop**: Drag tasks between columns
- ✅ **Quick Completion**: Checkmark button to instantly move a task to "Done"
- 🌙 **Dark Theme**: Toggle between light and dark themes with orange accents
- 🌐 **Multilingual**: Support for Russian and English languages
- 💾 **Local Storage**: All data is saved in browser's localStorage
- 🤖 **MCP Server**: Integration with AI assistants through Model Context Protocol

## 🛠️ Technologies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **@dnd-kit** - Drag & Drop functionality
- **@heroicons/react** - Icons
- **Vite** - Build tool and dev server

## 📦 Installation

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📚 Documentation

- [TASK_TRACKER_INSTRUCTIONS.md](./TASK_TRACKER_INSTRUCTIONS.md) - Application usage instructions
- [AI_WORKFLOW_DOCUMENTATION.md](./AI_WORKFLOW_DOCUMENTATION.md) - AI workflow documentation
- [DEVELOPMENT_PROCESS.md](./DEVELOPMENT_PROCESS.md) - Development process description
- [MCP_SERVER_DOCUMENTATION.md](./MCP_SERVER_DOCUMENTATION.md) - MCP Server documentation

## 🤖 MCP Server

The project includes its own MCP Server for integration with AI assistants. See [MCP_SERVER_DOCUMENTATION.md](./MCP_SERVER_DOCUMENTATION.md) for details.

### MCP Server Installation

```bash
cd mcp-server
npm install
npm run build
```

### Running MCP Server

```bash
npm start
```

## 📁 Project Structure

```
task-tracker/
├── src/
│   ├── components/       # React components
│   │   ├── TaskCard/
│   │   ├── TaskColumn/
│   │   ├── AddTaskModal/
│   │   ├── ThemeToggle/
│   │   └── LanguageToggle/
│   ├── contexts/         # React contexts
│   │   └── LanguageContext.tsx
│   ├── pages/
│   │   └── MainPage/     # Main page
│   ├── types/
│   │   └── task.ts       # TypeScript types
│   └── App.tsx
├── mcp-server/           # MCP Server for AI integration
│   ├── src/
│   │   └── index.ts
│   └── package.json
└── package.json
```

## 🎨 UI Features

- **Orange Color Scheme**: Orange accents for all elements
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: Transitions and effects for better UX
- **Dark Theme**: Full dark theme support with preference saving
- **Multilingual**: Support for Russian and English languages with preference saving

## 🔧 Development

The project uses:
- **Vite** for fast development with HMR
- **TypeScript** for type safety
- **ESLint** for code linting
- **Tailwind CSS** for styling

## 📝 License

This project was created as part of a test assignment.

## 👨‍💻 Author

Developed using AI tools (Cursor AI) to accelerate the development process.
