import { useContext } from "react";
import { AuthContext } from "../Provider/Authprovider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpiner from "../components/LoadingSpiner";

const Privateroute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location = useLocation();
    if(loading){
        return <LoadingSpiner/>
    }
    if(user && user?.email){
        return children
    }
    return (
        <div>
            <Navigate to="/login" state={location?.pathname}/>
        </div>
    );
};

export default Privateroute;