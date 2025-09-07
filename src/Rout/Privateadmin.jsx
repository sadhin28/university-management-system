import { useContext } from "react";
import { AuthContext } from "../Provider/Authprovider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpiner from "../components/LoadingSpiner";
import Swal from "sweetalert2";

const Privateadmin = ({ children }) => {
    const { loading, role } = useContext(AuthContext)
    const location = useLocation();
    if (loading) {
        return <LoadingSpiner />
    }
    if (role && role !== 'admin') {

        {
            Swal.fire({
                title: 'Sorry',
                text: `Only Admin Can Access this page`,
                icon: "error",
                draggable: true
            });
    } 
    }
      else{
         return children

      }
    return (
        <div>
            <Navigate to="/admin" state={location?.pathname} />

        </div>
    );
};


export default Privateadmin;