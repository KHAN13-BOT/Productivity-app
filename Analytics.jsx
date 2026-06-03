import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

const pieData = [
  { name: "Completed", value: 12 },
  { name: "Pending", value: 5 },
  { name: "In Progress", value: 8 },
];

const barData = [
  { name: "Mon", tasks: 4 },
  { name: "Tue", tasks: 7 },
  { name: "Wed", tasks: 3 },
  { name: "Thu", tasks: 6 },
  { name: "Fri", tasks: 9 },
];

const PIE_COLORS = ["#7C6FE0", "#34D399", "#FBBF24"];

const statRows = [
  { label: "Total tasks this week", value: 29, delta: "+12%", up: true },
  { label: "AI completions", value: 18, delta: "+34%", up: true },
  { label: "Avg tasks per day", value: 5.8, delta: "-3%", up: false },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#1A1A26", border: "0.5px solid #3A3A52",
      borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#F0EFF8",
    }}>
      <p style={{ color: "#9B9AB4", marginBottom: 6, fontWeight: 500 }}>{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color || "#7C6FE0", margin: "2px 0" }}>
          {p.dataKey}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
};

export default function Analytics() {
  const total = pieData.reduce((s, d) => s + d.value, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Header */}
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#F0EFF8", margin: 0, letterSpacing: "-0.5px" }}>
          Analytics
        </h1>
        <p style={{ fontSize: 14, color: "#9B9AB4", margin: "4px 0 0" }}>
          Overview of your productivity metrics
        </p>
      </div>

      {/* Summary stat strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        {statRows.map(s => (
          <div key={s.label} style={{
            background: "#1A1A26", border: "0.5px solid #2E2E42",
            borderRadius: 14, padding: "16px 18px",
          }}>
            <p style={{ fontSize: 12, color: "#9B9AB4", margin: "0 0 8px", letterSpacing: "0.03em" }}>{s.label}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: "#F0EFF8", lineHeight: 1 }}>{s.value}</span>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 6,
                background: s.up ? "#34D39918" : "#F8717118",
                color: s.up ? "#34D399" : "#F87171",
              }}>
                {s.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>

        {/* Donut */}
        <div style={{ background: "#1A1A26", border: "0.5px solid #2E2E42", borderRadius: 16, padding: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#F0EFF8", margin: "0 0 4px" }}>Task Status</h2>
          <p style={{ fontSize: 12, color: "#9B9AB4", margin: "0 0 20px" }}>This week's distribution</p>

          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ position: "relative", width: 160, height: 160, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={72} innerRadius={48} strokeWidth={0}>
                    {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center label */}
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                pointerEvents: "none",
              }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: "#F0EFF8" }}>{total}</span>
                <span style={{ fontSize: 10, color: "#9B9AB4", letterSpacing: "0.05em", textTransform: "uppercase" }}>total</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
              {pieData.map((d, i) => (
                <div key={d.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: "#9B9AB4", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: PIE_COLORS[i], display: "inline-block" }} />
                      {d.name}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#F0EFF8" }}>
                      {Math.round(d.value / total * 100)}%
                    </span>
                  </div>
                  <div style={{ height: 3, background: "#2E2E42", borderRadius: 4 }}>
                    <div style={{
                      height: "100%", borderRadius: 4,
                      background: PIE_COLORS[i],
                      width: `${Math.round(d.value / total * 100)}%`,
                      transition: "width 0.6s ease",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div style={{ background: "#1A1A26", border: "0.5px solid #2E2E42", borderRadius: 16, padding: "20px 20px 12px" }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#F0EFF8", margin: "0 0 4px" }}>Weekly Activity</h2>
          <p style={{ fontSize: 12, color: "#9B9AB4", margin: "0 0 20px" }}>Tasks completed per day</p>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 4, bottom: 0, left: -20 }} barSize={28}>
                <CartesianGrid vertical={false} stroke="#2E2E42" strokeDasharray="0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#5E5D78" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#5E5D78" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#7C6FE010" }} />
                <Bar dataKey="tasks" fill="#7C6FE0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
