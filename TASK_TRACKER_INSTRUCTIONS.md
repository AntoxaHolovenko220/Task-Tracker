# Task Tracker Usage Instructions

## Brief Description

**Task Tracker** is a simple and convenient web application for task management. Allows you to create, edit, delete tasks and track their completion status.

**What It's For:**
- Organizing personal or team tasks
- Visual tracking of work progress
- Quick switching between tasks

## How to Install and Run

### Requirements

- **Node.js** version 18.0 or higher
- **npm** (usually installed with Node.js)

### Step-by-Step Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the application in development mode:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   - After startup, you'll see an address in the console, usually: `http://localhost:5173`
   - Open this address in your browser

4. **Build for production (optional):**
   ```bash
   npm run build
   ```
   After build, files will be in the `dist/` folder

## How to Use

### Adding a New Task

1. Click the **"Add Task"** button in the top right corner
2. Fill out the form:
   - **Task Title** (required)
   - **Description** (optional)
   - **Status** (select from list)
3. Click the **"Create"** button

### Changing Task Status

There are two ways to change task status:

**Method 1: Dragging (Drag & Drop)**
- Hold down the left mouse button on the task card
- Drag it to the desired column (To Do / In Progress / Done)
- Release the mouse button

**Method 2: Checkmark Button**
- Click the checkmark icon (✓) on the task card in "To Do" or "In Progress" columns
- The task will immediately move to the "Done" column

### Editing a Task

1. Click the **"Edit"** button on the task card
2. In the opened window, change the needed fields:
   - Title
   - Description
   - Status
3. Click **"Save"**

### Deleting a Task

1. Click the **"Delete"** button on the task card
2. Confirm deletion in the appeared dialog

### Theme Toggle

- Click the sun/moon icon in the top right corner
- The application will switch between light and dark themes
- Your choice will be automatically saved

### Language Toggle

- Click the language icon (RU/EN) in the top right corner next to the theme toggle
- The application will switch between Russian and English languages
- Your choice will be automatically saved

## Application Structure

The application consists of three columns:

1. **📋 To Do**
   - Tasks that haven't been started yet
   - Orange stripe on the left of the card

2. **⚙️ In Progress**
   - Tasks you're working on
   - More saturated orange stripe

3. **✅ Done**
   - Completed tasks
   - Darkest orange stripe
   - Text is crossed out

## FAQ (Frequently Asked Questions)

### Where Is Data Stored?

Data is stored in your browser's **localStorage**. This means:
- ✅ Data is only available to you
- ✅ Works offline (after first load)
- ⚠️ Data is tied to a specific browser and device
- ⚠️ Tasks will be deleted if browser data is cleared

### How to Reset All Tasks?

You can delete all tasks manually, or:
1. Open developer console (F12)
2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Find "Local Storage" → your domain
4. Delete the `task-tracker-tasks` key

Or simply clear all site data through browser settings.

### Can I Export Tasks?

Export is not implemented in the current version. You can:
- Take screenshots of columns
- Copy data from localStorage (via developer console)
- Export to JSON/CSV is planned for future versions

### Is Mobile Device Support Available?

Yes, the application is responsive and works on mobile devices. However, drag & drop may be inconvenient on touch screens, so use the checkmark button to change status.

### What to Do If Tasks Don't Save?

1. Check if cookies are enabled in the browser
2. Make sure localStorage is not blocked (check privacy settings)
3. Check browser console for errors (F12 → Console)

## Help Contacts

If you have problems or questions:

1. **Check development documentation:** `DEVELOPMENT_PROCESS.md`
2. **Study the code:** all files are in the `src/` folder
3. **Create an issue in the repository:** if the project is hosted on GitHub
4. **Contact the development team**

## Useful Tips

💡 **Tip 1:** Use task descriptions to add details, links, or notes

💡 **Tip 2:** Drag tasks to the "In Progress" column when you start working on them

💡 **Tip 3:** Regularly move completed tasks to the "Done" column to visualize progress

💡 **Tip 4:** Use dark theme for evening work — it's less tiring for the eyes

💡 **Tip 5:** Columns show the number of tasks in each, helping to quickly assess workload
