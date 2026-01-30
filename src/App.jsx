import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TodoList from "./components/TodoList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

  // ✅ DELETE by id
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // ✅ UPDATE by id (replace the task)
  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  return (
    <>
      <h1>Task 'ToDo' Status Report</h1>

      <TaskForm onAddTask={addTask} />

      <TodoList
        tasks={tasks}
        onDeleteTask={deleteTask}
        onUpdateTask={updateTask}
      />
    </>
  );
};

export default App;
