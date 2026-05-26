import {
  FaHome,
  FaPen,
  FaImage,
  FaTasks,
  FaChartBar,
  FaFileAlt,
} from "react-icons/fa";
import { FaRobot } from "react-icons/fa";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/",
    },
    {
      name: "AI Writer",
      icon: <FaPen />,
      path: "/ai-writer",
    },
    {
      name: "Image Generator",
      icon: <FaImage />,
      path: "/image-generator",
    },
    {
      name: "Tasks",
      icon: <FaTasks />,
      path: "/tasks",
    },
    {
      name: "Analytics",
      icon: <FaChartBar />,
      path: "/analytics",
    },
    {
      name: "Documents",
      icon: <FaFileAlt />,
      path: "/documents",
    },
  ];

  return (
    <div className="h-screen w-64 bg-purple-700 text-white p-5 flex flex-col shadow-2xl">

      {/* LOGO */}
    <h1 className="text-3xl font-bold mb-10 tracking-wide flex items-center gap-3 whitespace-nowrap">
  <FaRobot className="text-2xl shrink-0 relative right-3" />
  <span className="leading-none relative right-4">WorkPilot AI</span>
</h1>

      {/* MENU */}
      <div className="flex flex-col gap-2">

        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 transform
              
              ${
                isActive
                  ? "bg-white text-purple-700 shadow-lg scale-105"
                  : "hover:bg-purple-600 hover:translate-x-2"
              }`
            }
          >
            <span className="text-lg">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.name}
            </span>
          </NavLink>
        ))}

      </div>

      {/* BOTTOM TEXT */}
      <div className="mt-auto text-sm text-purple-200">
        AI Productivity App v1.0
      </div>

    </div>
  );
}