import { FaTasks, FaRobot, FaChartLine, FaFileAlt } from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {

  // LINE CHART DATA
  const lineData = [
    { name: "Mon", tasks: 10, ai: 5 },
    { name: "Tue", tasks: 20, ai: 12 },
    { name: "Wed", tasks: 15, ai: 18 },
    { name: "Thu", tasks: 30, ai: 22 },
    { name: "Fri", tasks: 40, ai: 35 },
  ];

  // PIE CHART DATA
  const pieData = [
    { name: "Completed", value: 60 },
    { name: "Pending", value: 25 },
    { name: "In Progress", value: 15 },
  ];

  const COLORS = ["#4F46E5", "#22C55E", "#F97316"];

  return (
    <div className="space-y-5">

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">

        <div className="bg-white p-3 rounded-lg shadow text-center">
          <FaTasks className="text-blue-500 text-xl mx-auto" />
          <h2 className="text-lg font-bold mt-1">45</h2>
          <p className="text-xs text-gray-500">Tasks</p>
        </div>

        <div className="bg-white p-3 rounded-lg shadow text-center">
          <FaRobot className="text-purple-500 text-xl mx-auto" />
          <h2 className="text-lg font-bold mt-1">120</h2>
          <p className="text-xs text-gray-500">AI Usage</p>
        </div>

        <div className="bg-white p-3 rounded-lg shadow text-center">
          <FaChartLine className="text-green-500 text-xl mx-auto" />
          <h2 className="text-lg font-bold mt-1">32</h2>
          <p className="text-xs text-gray-500">Completed</p>
        </div>

        <div className="bg-white p-3 rounded-lg shadow text-center">
          <FaFileAlt className="text-orange-500 text-xl mx-auto" />
          <h2 className="text-lg font-bold mt-1">12</h2>
          <p className="text-xs text-gray-500">Docs</p>
        </div>

        {/* ADD TASK */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-lg shadow text-center cursor-pointer hover:scale-105 transition">
          <div className="text-2xl font-bold">+</div>
          <h2 className="text-lg font-bold mt-1">Add Task</h2>
          <p className="text-xs opacity-80">Create new</p>
        </div>

      </div>

      {/* ================= CHARTS ================= */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* LINE CHART */}
        <div className="bg-white p-4 rounded-lg shadow h-[300px] flex-1">
          <h2 className="font-bold mb-2">Productivity Trend</h2>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="tasks"
                stroke="#4F46E5"
                strokeWidth={2}
              />

              <Line
                type="monotone"
                dataKey="ai"
                stroke="#22C55E"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-4 rounded-lg shadow h-[300px] flex-1 flex flex-col justify-center items-center">

          <h2 className="font-bold mb-2">Task Distribution</h2>

          <ResponsiveContainer width={250} height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={90}
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* ================= LOWER SECTIONS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

        {/* RECENT TASKS */}
        <div className="bg-white p-4 rounded-lg shadow">

          <h2 className="font-bold mb-3">Recent Tasks</h2>

          <div className="space-y-2">

            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Design dashboard UI</span>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Fix routing issues</span>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Build AI Writer</span>
            </div>

          </div>

        </div>

        {/* RECENT AI CHATS */}
        <div className="bg-white p-4 rounded-lg shadow">

          <h2 className="font-bold mb-3">Recent AI Chats</h2>

          <div className="space-y-3 text-sm">

            <div className="flex items-center gap-2">
              🤖 <span>Generate landing page ideas</span>
            </div>

            <div className="flex items-center gap-2">
              🧠 <span>Summarize notes</span>
            </div>

            <div className="flex items-center gap-2">
              ⚡ <span>Create React component</span>
            </div>

          </div>

        </div>

        {/* ACTIVITY */}
        <div className="bg-white p-4 rounded-lg shadow">

          <h2 className="font-bold mb-3">Activity</h2>

          <div className="space-y-2 text-sm text-gray-600">

            <p>✔ 5 tasks completed today</p>
            <p>⚡ 12 AI requests used</p>
            <p>📄 3 documents created</p>
            <p>🚀 System running smoothly</p>

          </div>

        </div>

      </div>

    </div>
  );
}