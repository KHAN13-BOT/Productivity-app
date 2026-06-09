import { useState, useRef, useEffect } from "react";

const FILTERS = ["All", "Active", "Done"];

const PRIORITY_MAP = {
  high:   { label: "High",   color: "#F87171", bg: "#F8717118" },
  medium: { label: "Medium", color: "#FBBF24", bg: "#FBBF2418" },
  low:    { label: "Low",    color: "#34D399", bg: "#34D39918" },
};

const initialTasks = [
  { id: 1, text: "Design dashboard UI", done: true,  priority: "high" },
  { id: 2, text: "Fix routing issues",  done: false, priority: "medium" },
  { id: 3, text: "Build AI Writer",     done: false, priority: "low" },
];

const EmptyState = ({ filter }) => (
  <div style={{
    background: "#1A1A26", border: "1.5px dashed #2E2E42",
    borderRadius: 14, padding: "40px 24px", textAlign: "center",
  }}>
    <div style={{
      width: 48, height: 48, borderRadius: 14, background: "#7C6FE018",
      display: "flex", alignItems: "center", justifyContent: "center",
      margin: "0 auto 14px", fontSize: 20, color: "#7C6FE0",
    }}>✓</div>
    <p style={{ fontSize: 14, fontWeight: 600, color: "#F0EFF8", margin: "0 0 4px" }}>
      {filter === "Done" ? "No completed tasks yet" : filter === "Active" ? "No active tasks" : "All clear!"}
    </p>
    <p style={{ fontSize: 13, color: "#9B9AB4", margin: 0 }}>
      {filter === "All" ? "Add your first task above to get started." : `Switch filter to see other tasks.`}
    </p>
  </div>
);

export default function Tasks() {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("All");
  const [deletingId, setDeletingId] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const addTask = () => {
    const text = input.trim();
    if (!text) return;
    setTasks(prev => [{ id: Date.now(), text, done: false, priority }, ...prev]);
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") addTask();
  };

  const toggleTask = (id) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const deleteTask = (id) => {
    setDeletingId(id);
    setTimeout(() => {
      setTasks(prev => prev.filter(t => t.id !== id));
      setDeletingId(null);
    }, 200);
  };

  const filtered = tasks.filter(t =>
    filter === "All" ? true : filter === "Done" ? t.done : !t.done
  );
  const doneCount = tasks.filter(t => t.done).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#F0EFF8", margin: 0, letterSpacing: "-0.5px" }}>
            Tasks
          </h1>
          <p style={{ fontSize: 14, color: "#9B9AB4", margin: "4px 0 0" }}>
            {doneCount} of {tasks.length} completed
          </p>
        </div>

        {/* Progress pill */}
        <div style={{
          background: "#1A1A26", border: "0.5px solid #2E2E42",
          borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{ width: 80, height: 4, background: "#2E2E42", borderRadius: 4 }}>
            <div style={{
              height: "100%", borderRadius: 4, background: "#7C6FE0",
              width: tasks.length ? `${Math.round(doneCount / tasks.length * 100)}%` : "0%",
              transition: "width 0.4s ease",
            }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#7C6FE0" }}>
            {tasks.length ? Math.round(doneCount / tasks.length * 100) : 0}%
          </span>
        </div>
      </div>

      {/* Input card */}
      <div style={{ background: "#1A1A26", border: "0.5px solid #2E2E42", borderRadius: 16, padding: 16 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="What needs to be done?"
            style={{
              flex: "1 1 200px",
              background: "#0D0D12", border: "0.5px solid #3A3A52",
              borderRadius: 10, padding: "11px 14px",
              fontSize: 14, color: "#F0EFF8",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "#7C6FE0"}
            onBlur={e => e.target.style.borderColor = "#3A3A52"}
            aria-label="New task"
          />

          {/* Priority selector */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {Object.entries(PRIORITY_MAP).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setPriority(key)}
                style={{
                  padding: "8px 12px", borderRadius: 8, fontSize: 11, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.15s",
                  background: priority === key ? val.bg : "transparent",
                  color: priority === key ? val.color : "#5E5D78",
                  border: priority === key ? `0.5px solid ${val.color}40` : "0.5px solid #2E2E42",
                }}
                aria-pressed={priority === key}
                aria-label={`Set priority: ${val.label}`}
              >
                {val.label}
              </button>
            ))}
          </div>

          <button
            onClick={addTask}
            disabled={!input.trim()}
            style={{
              background: input.trim() ? "#7C6FE0" : "#2E2E42",
              color: input.trim() ? "#fff" : "#5E5D78",
              border: "none", borderRadius: 10,
              padding: "11px 20px", fontSize: 13, fontWeight: 600,
              cursor: input.trim() ? "pointer" : "default",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
            aria-label="Add task"
          >
            + Add task
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 4 }}>
        {FILTERS.map(f => {
          const count = f === "All" ? tasks.length : f === "Done" ? doneCount : tasks.length - doneCount;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                cursor: "pointer", transition: "all 0.15s",
                background: filter === f ? "#7C6FE020" : "transparent",
                color: filter === f ? "#7C6FE0" : "#9B9AB4",
                border: filter === f ? "0.5px solid #7C6FE050" : "0.5px solid transparent",
                display: "flex", alignItems: "center", gap: 6,
              }}
              aria-pressed={filter === f}
            >
              {f}
              <span style={{
                fontSize: 10, fontWeight: 700,
                background: filter === f ? "#7C6FE030" : "#2E2E42",
                color: filter === f ? "#7C6FE0" : "#5E5D78",
                padding: "1px 6px", borderRadius: 10,
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Task list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          filtered.map(t => {
            const pri = PRIORITY_MAP[t.priority];
            const isDeleting = deletingId === t.id;
            return (
              <div
                key={t.id}
                style={{
                  background: "#1A1A26",
                  border: "0.5px solid #2E2E42",
                  borderRadius: 12,
                  padding: "14px 16px",
                  display: "flex", alignItems: "center", gap: 12,
                  opacity: isDeleting ? 0 : 1,
                  transform: isDeleting ? "translateX(8px)" : "none",
                  transition: "opacity 0.2s, transform 0.2s, border-color 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#3A3A52"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#2E2E42"}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleTask(t.id)}
                  style={{
                    width: 20, height: 20, borderRadius: 6,
                    border: t.done ? "none" : "1.5px solid #3A3A52",
                    background: t.done ? "#7C6FE0" : "transparent",
                    cursor: "pointer", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, color: "#fff",
                    transition: "all 0.2s",
                  }}
                  aria-label={t.done ? "Mark incomplete" : "Mark complete"}
                >
                  {t.done && "✓"}
                </button>

                {/* Text */}
                <span style={{
                  flex: 1, fontSize: 14,
                  color: t.done ? "#5E5D78" : "#C8C7E0",
                  textDecoration: t.done ? "line-through" : "none",
                  transition: "all 0.2s",
                }}>
                  {t.text}
                </span>

                {/* Priority badge */}
                <span style={{
                  fontSize: 10, fontWeight: 600,
                  color: pri.color, background: pri.bg,
                  padding: "3px 8px", borderRadius: 6,
                  flexShrink: 0,
                }}>
                  {pri.label}
                </span>

                {/* Delete */}
                <button
                  onClick={() => deleteTask(t.id)}
                  style={{
                    background: "transparent", border: "none",
                    cursor: "pointer", padding: 4, borderRadius: 6,
                    color: "#5E5D78", fontSize: 13,
                    transition: "color 0.15s",
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#F87171"}
                  onMouseLeave={e => e.currentTarget.style.color = "#5E5D78"}
                  aria-label={`Delete task: ${t.text}`}
                >
                  ✕
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
