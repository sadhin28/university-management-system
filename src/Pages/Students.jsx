import React, { useContext, useEffect, useState } from 'react';
import { FaUserGraduate, FaPlus, FaFilter } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/Authprovider';
import { getAuth } from "firebase/auth";
const Students = () => {
    const {role}=useContext(AuthContext)
    const studentsData = useLoaderData()
    const [students, setStudents] = useState([]);
    const [Students, setStudent] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        program: '',
        year: '',
        gpa: '',
    });

    useEffect(() => {
        setStudent(studentsData);
    }, []);
  
//=====================================================

  // Fetch users (only admin)
  const auth=getAuth()
  useEffect(() => {
    const fetchUsers = async () => {
      if (role !== "admin") return;

      try {
        const token = await auth.currentUser.getIdToken();
        const res = await fetch(`${import.meta.env.VITE_API}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStudents(data.filter(data=>data.role === 'student'));
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch users.", "error");
      }
    };
    fetchUsers();
  }, [role]);
//======================================================
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredStudents = Students.filter((student) => {
        return (
            student.name.toLowerCase().includes(search.toLowerCase()) &&
            (filters.program ? student.program === filters.program : true) &&
            (filters.year ? student.year === filters.year : true) &&
            (filters.gpa ? student.gpa >= parseFloat(filters.gpa) : true)
        );
    });

    // const onDelete = (id) => {
    //     Swal.fire({
    //         title: "Are you sure you want to Delete it?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Confirm Delete"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             fetch(`${import.meta.env.VITE_API}/student/${id}`, {
    //                 method: 'DELETE'
    //             })
    //                 .then(res => res.json())
    //                 .then(data => {
    //                     if (data.deletedCount > 0) {
    //                         setStudents(apply => apply.filter(apply => apply._id !== id));
    //                         Swal.fire({
    //                             title: "Successfully Deleted!",
    //                             text: "Student has been deleted.",
    //                             icon: "success"
    //                         });
    //                     }
    //                 })

    //         }
    //     });
    // }
    const handleDelete = async (uid, email) => {
        const data =(Students.find(data=>data.uid === uid))
         fetch(`${import.meta.env.VITE_API}/student/${data._id}`, {
                    method: 'DELETE'
              })
        const confirm = await Swal.fire({
         title: "Are you sure?",
         text: `Delete Student ${email}?`,
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#d33",
         cancelButtonColor: "#3085d6",
         confirmButtonText: "Yes, delete it!",
       });
   
       if (confirm.isConfirmed) {
         try {
           const token = await auth.currentUser.getIdToken();
           const res = await fetch(`${import.meta.env.VITE_API}/users/${uid}`, {
             method: "DELETE",
             headers: { Authorization: `Bearer ${token}` },
          });
   
           if (res.ok) {
             setStudents(students.filter(u => u.uid !== uid));
              Swal.fire("Deleted!", `${email} has been deleted.`, "success");
            
           }
         } catch (err) {
           console.error(err);
           Swal.fire("Error", "Failed to delete Student.", "error");
         }
       }
     };
   
     if (role !== "admin") {
       return <p className="text-center text-red-500 mt-10">❌ You are not authorized to view this page.</p>;
     }
    return (
        <div className="p-6 max-w-8xl mx-auto">
            <div className="text-center mb-6  md:text-xl">
                <div>
                    <h1 className="text-3xl font-bold">Students</h1>
                    <p className="text-gray-500">Manage All student enrollments and records</p>
                </div>
            </div>

            <div className='md:flex md:gap-4 md:justify-between '>
                <div className="mb-6 w-full">
                    <input
                        
                        type="text"
                        placeholder="Search students..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]  w-full pl-10 pr-3 py-2 border rounded-lg"
                    />
                </div>

                {/* Filters */}
                <div className="grid md:flex gap-5 mb-6">
                    <select
                        value={filters.program}
                        onChange={(e) => setFilters({ ...filters, program: e.target.value })}
                        className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                    >
                        <option value="">All Program</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                    </select>
                    <select
                        value={filters.year}
                        onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                        className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                    >
                        <option value="">All Years</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                    </select>
                    <select
                        value={filters.gpa}
                        onChange={(e) => setFilters({ ...filters, gpa: e.target.value })}
                        className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799] "
                    >
                        <option value="">Min GPA</option>
                        <option value="3.5">3.5+</option>
                        <option value="3.6">3.6+</option>
                        <option value="3.7">3.7+</option>
                        <option value="3.8">3.8+</option>
                    </select>
                </div>
            </div>

            {/* Student Cards */}
            <div className="space-y-4">
                {filteredStudents?.map((student) => (
                    <div key={student._id} className="md:flex justify-between hover:shadow-lg items-center p-4 border-2 border-[#097C7DFF] rounded-lg bg-gray-100/20 shadow-sm">
                        <div className="md:flex items-center  gap-4">
                            <div className='w-20 h-20 rounded-full mx-auto'>
                                <img className='rounded-full h-20 w-20' src={student.photoURL} alt="" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">{student.name}</h2>
                                <p className="text-sm text-gray-500">{student.email}</p>
                                <div className="md:flex grid items-center gap-2 text-sm text-gray-600 mt-1">
                                    <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs">{student.studentId}</span>
                                    <span>{student.program}</span>
                                    <span className='invisible md:visible'>•</span>
                                    <span>{student.year}</span>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <p className="font-semibold">GPA: {student.gpa}</p>
                            <p className="text-sm text-gray-500 ">{student.courses} courses enrolled</p>
                        </div>
                     {role === 'admin'&& 
                     <div className='flex justify-between space-x-5'>
                           {role === 'admin'&& <button onClick={() => handleDelete(student.uid,student.email)} className="my-2 border-2 font-bold hover:bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] hover:text-white  px-2 py-2 rounded-lg text-center items-center gap-2  text-xs">
                            Delete Student
                        </button>}
                        {role === 'admin'&& <Link to={`/addStudent/${student.uid}`}  className="my-2 border-2 font-bold hover:bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] hover:text-white  px-2 py-2 rounded-lg text-center items-center gap-2  text-xs">
                            Conform Admision
                        </Link>}
                    </div>}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Students;
