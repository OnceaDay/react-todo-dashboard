import { useMemo, useState } from "react";

const STATUS_LABELS = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  SCHEDULED: "Scheduled",
  COMPLETED: "Completed",
};

const PRIORITY_LABELS = {
  LOW: "Low",
  NORMAL: "Normal",
  HIGH: "High",
};

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

export default function TodoList({ tasks = [], onDeleteTask, onUpdateTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const completedCount = tasks.filter((t) => t.status === "COMPLETED").length;
  const inProgressCount = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const notStartedCount = tasks.filter((t) => t.status === "NOT_STARTED").length;

  // Enforce percent rules while editing
  const enforcedEditPercent = useMemo(() => {
    if (!editForm) return 0;
    if (editForm.status === "COMPLETED") return 100;
    if (editForm.status === "NOT_STARTED") return 0;
    if (editForm.status === "SCHEDULED") return 0;
    return Number(editForm.percentComplete ?? 0);
  }, [editForm]);

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditForm({
      id: task.id,
      task: task.task ?? "",
      description: task.description ?? "",
      priority: task.priority ?? "LOW",
      status: task.status ?? "NOT_STARTED",
      percentComplete: Number(task.percentComplete ?? 0),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleEditChange = (e) => {
    const { name, value, type } = e.target;
    const nextValue = type === "range" ? Number(value) : value;

    setEditForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  const saveEdit = () => {
    if (!editForm) return;

    const taskTrimmed = editForm.task.trim();
    const descTrimmed = editForm.description.trim();

    if (!taskTrimmed) {
      alert("Task is required.");
      return;
    }
    if (!descTrimmed) {
      alert("Description is required.");
      return;
    }

    const updated = {
      ...editForm,
      task: taskTrimmed,
      description: descTrimmed,
      percentComplete: enforcedEditPercent,
    };

    onUpdateTask?.(updated);
    cancelEdit();
  };

  return (
    <section id="dashboard" className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>

        <div className="summary">
          <div className="summary-card">
            <span className="summary-title">Completed</span>
            <span className="summary-value">{completedCount}</span>
          </div>
          <div className="summary-card">
            <span className="summary-title">In Progress</span>
            <span className="summary-value">{inProgressCount}</span>
          </div>
          <div className="summary-card">
            <span className="summary-title">Not Started</span>
            <span className="summary-value">{notStartedCount}</span>
          </div>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p className="empty">No tasks yet. Add one above.</p>
      ) : (
        <div className="table-wrap">
          <table className="task-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Complete</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((t) => {
                const isEditing = editingId === t.id;

                // key fix: during edit, render the row from editForm (single source of truth)
                const rowData = isEditing ? editForm : t;

                // If something weird happens and editForm is null, fail safely
                if (!rowData) return null;

                const percent = Number(rowData.percentComplete ?? 0);

                return (
                  <tr key={t.id}>
                    {/* Task */}
                    <td className="task-name">
                      {isEditing ? (
                        <input
                          name="task"
                          value={editForm.task}
                          onChange={handleEditChange}
                        />
                      ) : (
                        rowData.task
                      )}
                    </td>

                    {/* Description */}
                    <td className="task-desc">
                      {isEditing ? (
                        <input
                          name="description"
                          value={editForm.description}
                          onChange={handleEditChange}
                        />
                      ) : (
                        rowData.description
                      )}
                    </td>

                    {/* Priority */}
                    <td>
                      {isEditing ? (
                        <select
                          name="priority"
                          value={editForm.priority}
                          onChange={handleEditChange}
                        >
                          {PRIORITY_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className={`badge priority ${rowData.priority}`}>
                          {PRIORITY_LABELS[rowData.priority] ?? rowData.priority}
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td>
                      {isEditing ? (
                        <select
                          name="status"
                          value={editForm.status}
                          onChange={handleEditChange}
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className={`pill status ${rowData.status}`}>
                          {STATUS_LABELS[rowData.status] ?? rowData.status}
                        </span>
                      )}
                    </td>

                    {/* Complete */}
                    <td>
                      {isEditing ? (
                        <>
                          <div className="progress">
                            <div
                              className={`progress-bar ${
                                enforcedEditPercent === 100 ? "done" : ""
                              }`}
                              style={{ width: `${enforcedEditPercent}%` }}
                            />
                          </div>

                          {editForm.status === "IN_PROGRESS" ? (
                            <input
                              type="range"
                              name="percentComplete"
                              min={0}
                              max={99}
                              value={Number(editForm.percentComplete)}
                              onChange={handleEditChange}
                            />
                          ) : null}

                          <div className="progress-label">
                            {enforcedEditPercent}%
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="progress">
                            <div
                              className={`progress-bar ${
                                percent === 100 ? "done" : ""
                              }`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <div className="progress-label">{percent}%</div>
                        </>
                      )}
                    </td>

                    {/* Actions */}
                    <td>
                      {isEditing ? (
                        <div className="actions">
                          <button
                            type="button"
                            className="btn primary"
                            onClick={saveEdit}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="actions">
                          <button
                            type="button"
                            className="btn"
                            onClick={() => startEdit(t)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn danger"
                            onClick={() => {
                              if (!confirm("Delete this task?")) return;
                              onDeleteTask?.(t.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
