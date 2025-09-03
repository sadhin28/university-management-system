import React, { useEffect, useState } from 'react';
import { FaUserGraduate, FaPlus, FaFilter } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router-dom';

const Students = () => {
    const studentsData = useLoaderData()
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({
        program: '',
        year: '',
        gpa: '',
    });

    useEffect(() => {
        setStudents(studentsData);
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredStudents = students.filter((student) => {
        return (
            student.name.toLowerCase().includes(search.toLowerCase()) &&
            (filters.program ? student.program === filters.program : true) &&
            (filters.year ? student.year === filters.year : true) &&
            (filters.gpa ? student.gpa >= parseFloat(filters.gpa) : true)
        );
    });

    return (
        <div className="p-6 max-w-8xl mx-auto">
            <div className="flex justify-between items-center mb-6 text-xs md:text-xl">
                <div>
                    <h1 className="text-3xl font-bold">Students</h1>
                    <p className="text-gray-500">Manage student enrollments and records</p>
                </div>
                <Link to='/addStudent' className="bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white px-6 py-2 rounded-lg flex items-center gap-2 md:text-xl text-xs">
                    <FaPlus />
                    Add Student
                </Link>
            </div>

           <div className='md:flex md:justify-between '>
              <div className="mb-6 ">
                <input
                    type="text"
                    placeholder="Search students..."
                    value={search}
                    onChange={handleSearch}
                    className="bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]  w-full pl-10 pr-3 py-2 border rounded-lg" 
                />
            </div>

            {/* Filters */}
            <div className="grid md:flex gap-4 mb-6">
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
                    <div key={student._id} className="md:flex justify-between hover:shadow-lg items-center p-4 border rounded-lg bg-white shadow-sm">
                        <div className="md:flex items-center  gap-4">
                            <div className='w-20 h-20 rounded-full'>
                                <img className='rounded-full h-20 w-20' src={student.imagePreview} alt="" />
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
                        <div className="md:text-right">
                            <p className="font-semibold">GPA: {student.gpa}</p>
                            <p className="text-sm text-gray-500">{student.courses} courses enrolled</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Students;
