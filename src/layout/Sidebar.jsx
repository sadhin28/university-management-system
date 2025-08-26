import {
  FaTachometerAlt,
  FaUserGraduate,
  FaBook,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaCog,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // toggle sidebar open/closed

  const menus = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/" },
    { name: "Students", icon: <FaUserGraduate />, path: "/students" },
    { name: "Courses", icon: <FaBook />, path: "/courses" },
    { name: "Faculty", icon: <FaChalkboardTeacher />, path: "/faculty" },
    { name: "Schedule", icon: <FaCalendarAlt />, path: "/schedule" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div
      className={`
        h-screen bg-gradient-to-b from-green-400 to-red-400 to-gray-400 text-white flex flex-col transition-all duration-300
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      {/* Top Bar with toggle button */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3 text-xl  text-black font-bold">
          <FaBook size={24} />
          {isOpen && <span className="whitespace-nowrap text-black">City University</span>}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-black text-lg">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          {menus.map((menu, i) => (
            <li key={i}>
              <NavLink
                to={menu.path}
                title={menu.name}
                className={({ isActive }) =>
                  `flex items-center text-black gap-3 px-4 py-2 rounded-md cursor-pointer transition-colors 
                  ${isActive ? "bg-green-800/50  font-semibold" : "hover:bg-green-800/50"}`
                }
              >
                <span className="text-lg">{menu.icon}</span>
                {isOpen && (
                  <span className="whitespace-nowrap transition-opacity duration-300">
                    {menu.name}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
