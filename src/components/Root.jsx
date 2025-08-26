import { Outlet } from "react-router-dom";
import Navbar from "../layout/Header";
import Sidebar from "../layout/Sidebar";

const Root = () => {
    return (
            <div className="flex">
      <Sidebar />
      <main className="flex-1  overflow-y-auto h-screen">
        <Navbar/>
        <Outlet />
      </main>
    </div>

    );
};

export default Root;