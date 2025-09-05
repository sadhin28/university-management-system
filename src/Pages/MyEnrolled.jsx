import {  useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import EnrollCard from "./EnrolledCard";
import { AuthContext } from "../Provider/Authprovider";
import { Link, useNavigate } from "react-router-dom";

const MyEnrolled  = () => {
       const [courseEnrolled,setenrolled]=useState([]);
       console.log(courseEnrolled)
       const navigate= useNavigate() 
       const {user}=useContext(AuthContext)
   
       useEffect(()=>{
            axios.get(`${import.meta.env.VITE_API}/course/my-enrolled?studentEmail=${user.email}`)
            .then(res=>setenrolled(res.data))
        },[])
        const onDelete=(id)=>{
            Swal.fire({
                        title: "Are you sure you want to Calcel it?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Confirm Calcel"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            fetch(`${import.meta.env.VITE_API}/course/my-enrolled/${id}`, {
                                method: 'DELETE'
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.deletedCount > 0) {
                                        setenrolled(apply => apply.filter(apply => apply._id !== id));
                                        Swal.fire({
                                            title: "Successfully Deleted!",
                                            text: "Your Job Post has been deleted.",
                                            icon: "success"
                                        });
                                    }
                                })
            
                        }
                    });
        }
        
        const viewcourse=(id)=>{
            navigate(`/viewCourse/${id}`)
        }
        
    return (
        <>
        {  <div className="min-h-screen px-4 ">
          <h1 className="md:text-3xl font-bold pt-6 text-center ">My Enrolled Course</h1>
          {courseEnrolled?.find(data=>data?.studentEmail === user.email)?(<div className="py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {
                courseEnrolled.map(enrolled=><EnrollCard user={user} key={enrolled._id} courseEnrolled={courseEnrolled} viewcourse={viewcourse}  onDelete={onDelete}  enroll ={enrolled}></EnrollCard>)
              }
            </div>):(<div className="space-y-5 min-h-screen flex-col  flex items-center justify-center ">
                <h1 className="text-center md:text-2xl font-bold">You are not Enrolled in any of these courses.</h1>
                <Link to="/courses" className="hover:shadow-2xl border-2  hover:bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] hover:text-white  px-2 py-2 rounded-lg text-center items-center gap-2 font-bold text-xs">Enroll Now</Link>
            </div>)
          }
          
       </div>}
        </>
      
    );
};

export default MyEnrolled ;
