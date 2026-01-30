# React ToDo Status Dashboard

A React-based Task “ToDo” Status Dashboard built to practice form handling, state management, and dynamic UI updates using a component-driven architecture.

This project translates a pre-designed task status planning template into a fully interactive React application, emphasizing clear data modeling, predictable defaults, and real-time dashboard updates.

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
  - New tasks start as **Not Started**
  - New tasks default to **Low Priority**
- Edit and delete existing tasks
- Real-time dashboard metrics derived from application state

---

## Design Reference & Planning

Before implementation, the application was planned using a task status reporting template.  
This planning artifact was used to define:

- Task data structure
- Default task values
- Status categories and transitions
- Completion percentage rules
- Dashboard summary logic

The planning-first approach ensured that UI behavior and state logic were clearly defined before writing application code.

### Original Planning Template

![Task Status Planning Template](public/img/Task_todo_Pic1.jpg)

Key assumptions carried into the React implementation:

- Status drives completion behavior  
- Completion percentage is editable **only** when status is *In Progress*  
- *Completed* locks progress to 100%  
- *Scheduled* and *Not Started* lock progress to 0%  

---

## Dashboard Implementation & State Progression

The dashboard reflects task data dynamically based on user interaction and task updates.  
All values displayed are derived directly from React state.

### Initial Dashboard State

![Initial Dashboard State](public/img/Task_todo_Pic2.jpg)

At initial load:

- No tasks are present  
- Dashboard counters are zeroed  
- The task table is empty  

This represents the default application state before any user interaction.

---

### Dashboard After Tasks Are Added

![Dashboard With Active Tasks](public/img/Task_todo_Pic3.jpg)

After tasks are added, the dashboard updates automatically to display:

- Task counts by status  
- Priority indicators  
- Completion percentages  
- Available task actions (Edit / Delete)  

Dashboard metrics and task rows stay synchronized as task data changes.

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

Static assets used for documentation are stored in:

```
public/
└── img/
    ├── Task_todo_Pic1.jpg
    ├── Task_todo_Pic2.jpg
    └── Task_todo_Pic3.jpg
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd react-todo-list
```

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Future Improvements

- Enhanced UI styling and theming  
- Task filtering and sorting  
- Persist tasks using localStorage or a backend API  
- Data visualization (charts for task completion)  

---

## Summary

This project demonstrates how a structured planning artifact can be translated into a dynamic, state-driven React dashboard.  
The result is a predictable, extensible task management interface built with clear separation of concerns and real-time UI updates.
