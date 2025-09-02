import {  useState } from "react";
import { Search, Plus, Filter, Mail, MapPin, BookOpen } from "lucide-react";

import { Link, useLoaderData } from "react-router-dom";

export default function Faculty() {
    const sampleFaculty  = useLoaderData()
    const [searchQuery, setSearchQuery] = useState("");
    console.log(sampleFaculty)
    
    const filteredFaculty = sampleFaculty.filter(
        (faculty) =>
            faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faculty.researchArea.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen  p-6">
            <div className="max-w-8xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 text-xs md:text-xl">
                    <div>
                        <h1 className="text-3xl font-bold">Faculty</h1>
                        <p className="text-gray-500 ">
                            Manage faculty members and their assignments
                        </p>
                    </div>
                    <Link to="/addfaculty" className="bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white p-2  rounded-lg flex items-center gap-2 md:text-xl text-xs">
                        <Plus className="w-4 h-4" />
                        Add Faculty
                    </Link>
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
                            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
                        >
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
                                <div className="space-y-3 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
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
                                    <Link to={`/contact/${faculty._id}`} className="flex-1 px-3 text-center py-2 border rounded-lg text-sm hover:bg-gray-100 transition">
                                        Contact
                                    </Link>
                                    <Link to={`/ViewProfile/${faculty._id}`} className="flex-1 text-center px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition">
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

