# React ToDo Status Dashboard

A React-based **Task “ToDo” Status Report** dashboard built with **React + Vite** to practice controlled forms, state management, and dynamic UI updates.

This project began as an **Excel-based dashboard prototype** used to define the data model, rules, and visual layout, and was then implemented as a fully interactive React application.

---

## Tech Stack

- React
- Vite
- JavaScript (ES6+)
- CSS

---

## Core Features

- Add tasks using a controlled form
- Task fields include:
  - Task name
  - Description
  - Priority (Low / Normal / High)
  - Status (Not Started / Scheduled / In Progress / Completed)
  - Completion percentage
- Default task behavior:
  - New tasks default to **Not Started**
  - New tasks default to **Low** priority
- Edit and delete tasks
- Dashboard metrics update automatically from application state

---

## Excel Prototype → React Build

Before writing any React code, the dashboard was **designed in Excel** as a planning template to define:

- The task table structure (columns and fields)
- Status categories and task flow
- Priority indicators
- Completion and progress rules
- Summary metrics for the dashboard (Completed / In Progress / Not Started)

### 1) Excel Design Prototype (Source of Truth)

![Excel Design Prototype](public/img/Task_todo_Pic1.jpg)

Rules carried into the React implementation:

- Completion percentage is editable **only** when **Status = In Progress**
- **Completed** locks completion to **100%**
- **Not Started** and **Scheduled** lock completion to **0%**
- New tasks start as **Not Started** with **Low** priority by default

---

## React Dashboard Screenshots

### 2) Initial React Dashboard State

![Initial React Dashboard State](public/img/Task_todo_Pic2.jpg)

At initial load:
- No tasks exist
- Dashboard counters are zeroed
- The task list is empty

### 3) Dashboard After Tasks Are Added

![React Dashboard With Tasks](public/img/Task_todo_Pic3.jpg)

After tasks are added and updated, the dashboard dynamically displays:
- Counts by status
- Priority and status indicators
- Completion percentage per task
- Available task actions (Edit / Delete)

All dashboard values are derived from React state and remain synchronized as tasks change.

---

## Project Structure

```
src/
├── components/
│   ├── TaskForm.jsx
│   ├── TodoEditForm.jsx
│   ├── TodoForm.jsx
│   ├── TodoItem.jsx
│   └── TodoList.jsx
├── App.jsx
├── main.jsx
```

Screenshot assets used in this README:

```
public/
└── img/
    ├── Task_todo_Pic1.jpg   # Excel prototype
    ├── Task_todo_Pic2.jpg   # Initial React dashboard
    └── Task_todo_Pic3.jpg   # React dashboard with tasks
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/OnceaDay/react-todo-dashboard.git
cd react-todo-dashboard
```

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## Future Improvements

- UI and responsive layout refinements
- Filtering and sorting by priority or status
- Persist tasks using localStorage or a backend API
- Visual charts for task completion

---

## Summary

This project demonstrates a practical workflow: **prototype in Excel → implement in React**.

The Excel version established the rules and layout first; the React version delivers the same logic as a state-driven, interactive dashboard.
