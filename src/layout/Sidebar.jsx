import {
  FaTachometerAlt,
  FaUserGraduate,
  FaBook,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaCog,
  FaTimes,
  FaBars,
  FaSignInAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/Authprovider";
import { TbLogin, TbLogout, } from "react-icons/tb";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // toggle sidebar open/closed
  const { user, Logout } = useContext(AuthContext)
  console.log(user)
  const menus = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/" },
    ...(user ? [
      { name: "Students", icon: <FaUserGraduate />, path: "/students" },
      { name: "Courses", icon: <FaBook />, path: "/courses" },
      { name: "Faculty", icon: <FaChalkboardTeacher />, path: "/faculty" },
      { name: "Schedule", icon: <FaCalendarAlt />, path: "/schedule" },
      { name: "Settings", icon: <FaCog />, path: "/settings" },
    ] : [])

  ];

  return (
    <div
      className={`
         shadow-lg min-h-full bg-gradient-to-b from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white flex flex-col transition-all duration-300
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      {/* Top Bar with toggle button */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex  items-center gap-3 text-xl   font-bold">
          <FaBook className="" size={24} />
          {isOpen && <span className="whitespace-nowrap">World University</span>}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-lg">
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
                  `flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-colors 
                  ${isActive ? "bg-gray-800/50  font-semibold" : "hover:bg-green-800/50"}`
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
          {
            user ? <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-colors 
                  ${isActive ? "hover:bg-green-800/50" : "hover:bg-green-800/50"}`
              }
              onClick={Logout}

            >
              <span className="text-lg"><TbLogout /></span>
              {isOpen && (
                <span className="whitespace-nowrap transition-opacity duration-300">
                  Logout
                </span>
              )}
            </NavLink>
              :
              <NavLink
                to='/login'
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-colors 
                  ${isActive ? "bg-gray-800/50  font-semibold" : "hover:bg-green-800/50"}`
                }


              >
                <span className="text-lg"><TbLogin /></span>

                {isOpen && (
                  <span className="whitespace-nowrap transition-opacity duration-300">
                    Login
                  </span>
                )}
              </NavLink>
          }
          <NavLink
            to='/register'
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-colors 
                  ${isActive ? "bg-gray-800/50  font-semibold" : "hover:bg-green-800/50"}`
            }


          >
            <span className="text-lg"><FaSignInAlt /></span>

            {isOpen && (
              <span className="whitespace-nowrap transition-opacity duration-300">
                Register
              </span>
            )}
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
