import { useMemo, useState } from "react";

const PRIORITY_OPTIONS = [
  { value: "HIGH", label: "High" },
  { value: "NORMAL", label: "Normal" },
  { value: "LOW", label: "Low" },
];

const STATUS_OPTIONS = [
  { value: "NOT_STARTED", label: "Not Started" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "SCHEDULED", label: "Scheduled" },
  { value: "COMPLETED", label: "Completed" },
];

const DEFAULT_FORM = {
  task: "",
  description: "",
  priority: "LOW",
  status: "NOT_STARTED",
  percentComplete: 0,
};

export default function TaskForm({ onAddTask }) {
  const [form, setForm] = useState(DEFAULT_FORM);

  const isInProgress = form.status === "IN_PROGRESS";

  // enforce your percent rules
  const enforcedPercent = useMemo(() => {
    if (form.status === "COMPLETED") return 100;
    if (form.status === "NOT_STARTED") return 0;
    if (form.status === "SCHEDULED") return 0;
    return Number(form.percentComplete ?? 0);
  }, [form.status, form.percentComplete]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const nextValue = type === "range" ? Number(value) : value;

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskTrimmed = form.task.trim();
    const descTrimmed = form.description.trim();

    if (!taskTrimmed) {
      alert("Task is required.");
      return;
    }
    if (!descTrimmed) {
      alert("Description is required.");
      return;
    }

    const newTask = {
      id: crypto?.randomUUID?.() ?? String(Date.now()),
      task: taskTrimmed,
      description: descTrimmed,
      priority: form.priority,
      status: form.status,
      percentComplete: enforcedPercent,
    };

    // I just learnt this one - it's called optional chaining
    // If this function exists, call it. If it doesn’t, do nothing and don’t crash.
    onAddTask?.(newTask);

   
    document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" });

    setForm(DEFAULT_FORM);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-row">
        <label htmlFor="task">Task</label>
        <input
          id="task"
          name="task"
          value={form.task}
          onChange={handleChange}
          placeholder="e.g., Go to the DMV"
        />
      </div>

      <div className="form-row">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="e.g., Renew my license"
        />
      </div>

      <div className="form-row two-col">
        <div className="form-row">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            {PRIORITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <label className="completion-label">
          Complete: <span>{enforcedPercent}%</span>
        </label>

        {isInProgress ? (
          <input
            type="range"
            name="percentComplete"
            min={0}
            max={99}
            value={Number(form.percentComplete)}
            onChange={handleChange}
          />
        ) : (
          <input type="range" min={0} max={100} value={enforcedPercent} disabled />
        )}

        <small className="form-help">
          Percent is editable only when Status = In Progress. Completed locks to
          100%. Scheduled/Not Started lock to 0%.
        </small>
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
}
