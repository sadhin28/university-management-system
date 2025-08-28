import { useContext } from "react";
import { FaBell } from "react-icons/fa";
import { AuthContext } from "../Provider/Authprovider";

const Navbar = () => {
  const {user}=useContext(AuthContext)
  console.log(user)
  return (
    <div className="sticky bg-white-xx  top-0 backdrop-blur z-50">
      <div className="flex border border-[3px] border-b-[#159799] justify-between items-center hover:shadow px-6 py-3 text-black">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search text-white students, courses, faculty..."
        className="w-1/2 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
      />

      {/* Right side */}
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <FaBell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center"></span>
        </div>
      
          {
            user?<img className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold cursor-pointer" src={user.photoURL} alt="" />:<h1 className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold cursor-pointer">User</h1>
          
          } 
        
      </div>
    </div>
    </div>
  );
};

export default Navbar;
