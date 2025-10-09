import {
  FaBook,
  FaTimes,
  FaBars,
  FaUniversity,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/Authprovider";
import { TbLogin, TbLogout } from "react-icons/tb";
import { getMenus } from "./Menue";
import { BirdIcon, BookDashed } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // default closed
  const { user, Logout, role } = useContext(AuthContext);

  const menus = getMenus(user, role, Logout);

  //  Open by default on md+ screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true); // md and up
      } else {
        setIsOpen(false); // sm
      }
    };

    handleResize(); // run once at mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`
        shadow-lg min-h-full bg-gradient-to-b from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white flex flex-col transition-all duration-300
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      {/* Top Bar with toggle button */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3 text-xl font-bold">
          <FaUniversity size={24} />
          {isOpen && <span className="whitespace-nowrap">City University</span>}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-lg hover:text-green-300">
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
                  ${isActive ? "bg-gray-800/50 font-semibold" : "hover:bg-red-800/50"}`
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

          {user && (
            <NavLink
              onClick={Logout}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-colors 
                ${isActive ? "hover:bg-green-800/50" : "hover:bg-green-800/50"}`
              }
            >
              <span className="text-lg">
                <TbLogout />
              </span>
              {isOpen && (
                <span className="whitespace-nowrap transition-opacity duration-300">
                  Logout
                </span>
              )}
            </NavLink>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
