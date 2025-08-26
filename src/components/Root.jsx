import { Outlet } from "react-router-dom";
import Navbar from "../layout/Header";
import Sidebar from "../layout/Sidebar";

const Root = () => {
    return (
        <div className="flex">
            <div className="">
                <Sidebar/>
            </div>
            <div className="min-h-screen w-full border">
                 <Navbar/>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;