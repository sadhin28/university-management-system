import { useContext } from "react";
import { FaBell } from "react-icons/fa";
import { AuthContext } from "../Provider/Authprovider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user ,role ,unseenCount} = useContext(AuthContext)

  return (
    <div className=" sticky  top-0 backdrop-blur z-50">
      <div className="flex  bg-gradient-to-r from-[#8BB9B9FF]/80 to-[#031226FF]/70 to-[#839096FF]/80  justify-between items-center  shadow-lg px-6 py-3 text-black">
       <div className="uppercase font-bold text-white text-xl">{role&& role}</div>
        {/* Right side */}
        <div className="flex items-center  gap-6">
          
          {role === "student"?<Link to="notices">
            <div className="relative">
        <FaBell className="text-2xl cursor-pointer" />
        {unseenCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
            {unseenCount}
          </span>
        )}
      </div></Link>:<Link to="/notices">
            <div className="relative">
        <FaBell className="text-2xl cursor-pointer" />
        {unseenCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
            {unseenCount}
          </span>
        )}
      </div></Link>}

          <Link to= '/profile'>
           {
            user ? <img className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold cursor-pointer" src={user.photoURL} alt="" /> : <h1 className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold cursor-pointer">User</h1>

          }
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
