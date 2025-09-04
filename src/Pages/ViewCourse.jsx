import  { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import {  useParams } from 'react-router-dom';

const ViewCourse = () => {
    const {id}= useParams()
    const [course,setviewCourse]=useState()
  
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API}/course/${id}`)
        .then(res=>res.json())
        .then(data=>setviewCourse(data))
    },[])

      if (!course) {
    return (
      <div className="p-4 text-center text-gray-500 border rounded-xl">
        No course data available.
      </div>
    );
  }
    return (
    <div className="mx-3 mx-auto md:w-full min-h-screen flex items-center justify-center ">
      <div className="max-w-lg w-full p-10 bg-gray-100/20 hover:shadow-xl shadow-lg rounded-2xl border">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">{course.name}</h2>
          <span className="text-sm font-medium text-gray-500">Code: {course.code}</span>
        </div>

        {/* Details */}
        <div className="space-y-1 text-sm text-gray-700">
          <p>
            <span className="font-medium">Instructor:</span> {course.instructor}
          </p>
          <p>
            <span className="font-medium">Credits:</span> {course.credits}
          </p>
          <p>
            <span className="font-medium">Schedule:</span> {course.schedule}
          </p>
          <p>
            <span className="font-medium">Capacity:</span> {course.enrolled}/{course.capacity} students
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4 justify-center w-full">
          <button
            className="bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white px-6 py-2 rounded-lg flex items-center gap-2 md:text-xl text-xs"
           
          >
            <FaArrowLeft /> Back
          </button>
        </div>
      </div>
    </div>

    )
};

export default ViewCourse;