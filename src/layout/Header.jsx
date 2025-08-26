import { FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="sticky bg-white-xx  top-0 backdrop-blur z-50">
      <div className="flex justify-between items-center shadow px-6 py-3">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search students, courses, faculty..."
        className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#159799]"
      />

      {/* Right side */}
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <FaBell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center"></span>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold cursor-pointer">
          AD
        </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
