import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Addcourse() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        id: "",
        name: "",
        code: "",
        instructor: "",
        enrolled: "",
        capacity: "",
        credits: "",
        schedule: ""
    },);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const formatTo12Hour = (time) => {
        if (!time) return "";
        let [hour, minute] = time.split(":");
        hour = parseInt(hour);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12; // 0 => 12
        return `${hour}:${minute} ${ampm}`;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const CoursetData = {
            name: form.name,
            code: form.code,
            instructor: form.instructor,
            capacity: form.capacity,
            credits: form.credits,
            schedule: formatTo12Hour(form.schedule)
        }
        console.log(CoursetData)
        //post now
        fetch(`${import.meta.env.VITE_API}/course`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(CoursetData)
        })
            .then(res => res.json())
            .then(data => {
                e.value = ''
                Swal.fire({
                    title: `Sucess`,
                    text: `Add Course successfully!`,
                    icon: "success",
                    draggable: true
                });
                navigate('/courses')

            })
            .catch(error => {
                Swal.fire({
                    title: 'Student',
                    text: `${error.message}`,
                    icon: "error",
                    draggable: true
                });
            })

    };

    return (
        <div className="bg-transparent py-20 px-4">
            <div className="w-full max-w-7xl bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-8 mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6">Add Course</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 items-center">
                    {/* ID */}
                    <div className="flex flex-col  ">
                        <label>Instructor Name</label>
                        <input

                            type="text"
                            name="instructor"
                            value={form.instructor}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                            required
                        />
                    </div>

                    {/* Name */}
                    <div className="flex flex-col">
                        <label>Course Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                            required
                        />
                    </div>

                    {/* Code */}
                    <div className="flex flex-col">
                        <label>Course Code</label>
                        <input
                            type="text"
                            name="code"
                            value={form.code}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                            required
                        />
                    </div>

                    {/* Program */}
                    <div className="flex flex-col">
                        <label>Course Credit</label>
                        <select
                            required
                            value={form.credits}
                            name="credits"
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        >
                            <option value="">Select credits</option>
                            <option value="1.5 Credit">1.5 Credit</option>
                            <option value="3 Credit">3 Credit</option>


                        </select>
                    </div>

                    {/* year */}
                    <div className="flex flex-col">
                        <label>Enrolled</label>
                        <input
                            type="time"
                            name="schedule"
                            value={form.schedule}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF] focus:outline-none focus:ring-2 focus:ring-[#159799]"
                            required
                        />

                    </div>

                    {/* GPA */}
                    <div className="flex flex-col">
                        <label>Capacity</label>
                        <input
                            required
                            type="text"
                            name="capacity"
                            value={form.capacity}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        />
                    </div>
                    {/* Submit */}
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white px-4 py-2 rounded-lg w-full items-center gap-2 md:text-xl text-xs"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}