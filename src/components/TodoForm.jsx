// src/components/TodoForm.jsx
import { useState } from "react";

const STATUS_OPTIONS = ["Not Started", "In Progress", "Blocked", "Done"];

const DEFAULT_FORM = {
  title: "",
  description: "",
  status: "Not Started",
};

const TodoForm = ({ onAddTodo }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please enter both a task and a description.");
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
    };

    onAddTodo(newTodo);
    setFormData(DEFAULT_FORM);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="field">
        <label htmlFor="title">Task</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="field">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TodoForm;
