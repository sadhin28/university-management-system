import {  useContext, useState } from "react";
import { Search, Plus, Filter, Mail, MapPin, BookOpen } from "lucide-react";

import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/Authprovider";

export default function Faculty() {
    const Faculty  = useLoaderData()
    const [searchQuery, setSearchQuery] = useState("");
    const [sampleFaculty,setsampleFaculty]=useState(Faculty)
    const {role}=useContext(AuthContext)
    const filteredFaculty = sampleFaculty.filter(
        (faculty) =>
            faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faculty.researchArea.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const DeleteFacultyMember=(id)=>{
          Swal.fire({
                         title: "Are you sure you want to Delete it?",
                         text: "You won't be able to revert this!",
                         icon: "warning",
                         showCancelButton: true,
                         confirmButtonColor: "#3085d6",
                         cancelButtonColor: "#d33",
                         confirmButtonText: "Delete"
                     }).then((result) => {
                         if (result.isConfirmed) {
                             fetch(`${import.meta.env.VITE_API}/faculty/${id}`, {
                                 method: 'DELETE'
                             })
                                 .then(res => res.json())
                                 .then(data => {
                                     if (data.deletedCount > 0) {
                                         setsampleFaculty(apply => apply.filter(apply => apply._id !== id));
                                         Swal.fire({
                                             title: "Successfully Deleted!",
                                             text: "Faculty Member has been deleted.",
                                             icon: "success"
                                         });
                                     }
                                 })
             
                         }
                     });
    }
    return (
        <div className="min-h-screen  p-6">
            <div className="max-w-8xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center mb-6  md:text-xl">
                    <div>
                        <h1 className="text-3xl font-bold">Faculty</h1>
                        <p className="text-gray-500">
                            All faculty members In Our University
                        </p>
                    </div>

                </div>

                {/* Filters */}
                <div className=" rounded-xl shadow p-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search faculty..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className=" bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]  w-full pl-10 pr-3 py-2 border rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Faculty Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredFaculty?.map((faculty) => (
                        <div
                            key={faculty._id}
                            className="hover:shadow-md shadow-xl border-2 border-[#097C7DFF] bg-gray-100/20 rounded-xl  duration-300"
                        >
                           <div className=" rounded-xl bg-">
                              {/* Card Header */}
                            <div className="text-center p-6 border-b">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                    <img
                                        src={
                                            faculty?.image && faculty?.image ||
                                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${faculty.name}`
                                        }
                                        alt={faculty?.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h2 className="text-xl font-semibold">{faculty?.name}</h2>
                                <span className="inline-block mt-1 px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                                    {faculty?.title}
                                </span>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 space-y-4">
                                {/* Info */}
                                <div className="space-y-3 text-sm ">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 " />
                                        <span>{faculty?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span>{faculty?.office}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-gray-400" />
                                        <span>{faculty?.department}</span>
                                    </div>
                                </div>

                                {/* Research Area */}
                                <div>
                                    <p className="text-sm font-medium">Research Area</p>
                                    <p className="text-sm text-gray-500">{faculty?.researchArea}</p>
                                </div>

                                {/* Courses */}
                                <div>
                                    <p className="text-sm font-medium">
                                        Courses ({faculty?.courses?.length})
                                    </p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {faculty?.courses.map((course) => (
                                            <span
                                                key={course}
                                                className="px-2 py-1 text-xs border rounded-lg text-gray-600"
                                            >
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                    {role  === 'admin'&& <Link onClick={()=>DeleteFacultyMember(faculty._id)} className="font-bold flex-1 px-3 text-center py-2 border-2 rounded-lg text-sm hover:bg-gray-100 transition">
                                        Delete 
                                    </Link>}
                                    <Link to={`/ViewProfile/${faculty._id}`} className="font-bold flex-1 px-3 text-center py-2 border-2 rounded-lg bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white px-6 py-2 rounded-lg flex-1 text-center gap-2 md:text-xl text-xs">
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

