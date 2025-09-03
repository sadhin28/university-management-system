import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import EnrollCard from "./EnrolledCard";
import { AuthContext } from "../Provider/Authprovider";
import { useNavigate } from "react-router-dom";

const MyEnrolled  = () => {
       const [courseEnrolled,setenrolled]=useState([]);
       const navigate= useNavigate() 
       const {user}=useContext(AuthContext)
        useEffect(()=>{
            axios.get(`${import.meta.env.VITE_API}/course/my-enrolled?studenEmail=${user.email}`)
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
       <div className="min-h-screen px-4 ">
          <h1 className="md:text-3xl font-bold pt-6 text-center ">My Enrolled Course</h1>
          {
            courseEnrolled.length>0?(
                <div className="py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                      {
                 courseEnrolled.map(enrolled=><EnrollCard key={enrolled._id} viewcourse={viewcourse}  onDelete={onDelete}  enroll ={enrolled}></EnrollCard>)
               }
                </div>
            ):(<div>
                <div className="min-h-screen flex justify-center items-center w-11/12 mx-auto">
                    <h1 className="lg:text-2xl md:text-3xl text-xl font-bold text-center text-white">Empy Enroll!Place enrolle Course</h1>
                </div>
            </div>)
          }
          
            
             
             
          
          
          
       </div>
    );
};

export default MyEnrolled ;
