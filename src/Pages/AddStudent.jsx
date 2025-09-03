import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddStudent() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
        email: "",
        program: "",
        year: "",
        gpa: '',
        studentId: "",
        imagePreview: null
    },);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setForm((prev) => ({
                ...prev,
                image: file,
                imagePreview: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const StudentData = {
            name: form.name,
            email: form.email,
            program: form.program,
            year: `${form.year}`,
            gpa: form.gpa,
            studentId: form.studentId,
            imagePreview: form.imagePreview
        }

        //post now
        fetch(`${import.meta.env.VITE_API}/student`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(StudentData)
        })
            .then(res => res.json())
            .then(data => {
                e.value = ''
                Swal.fire({
                    title: `Sucess`,
                    text: `Add Student successfully!`,
                    icon: "success",
                    draggable: true
                });
                navigate('/students')

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
        <div className="min-h-screen flex items-center justify-center bg-transparent py-10 px-4">
            <div className="w-full max-w-6xl bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6">Add Student</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 items-center">
                    {/* ID */}
                    <div className="flex flex-col  ">
                        <label>Stuendt ID</label>
                        <input
                            
                            type="text"
                            name="studentId"
                            value={form.studentId}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                            required
                        />
                    </div>

                    {/* Name */}
                    <div className="flex flex-col">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                            required
                        />
                    </div>

                    {/* Program */}
                    <div className="flex flex-col">
                        <label>Program</label>
                        <select
                             required
                            value={form.program}
                            name="program"
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        >
                            <option value="">Select Program</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Physics">Physics</option>
                           
                        </select>
                    </div>

                    {/* year */}
                    <div className="flex flex-col">
                        <label>Year</label>
                        <select
                            required
                            value={form.year}
                            name="year"
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        >
                            <option value="">Select Years</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                        </select>
                    </div>

                    {/* GPA */}
                    <div className="flex flex-col">
                        <label>GPA</label>
                        <input
                            required
                            type="text"
                            name="gpa"
                            value={form.gpa}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="col-span-2 flex flex-col">
                        <label>Profile Image</label>
                        <input
                            required
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        />
                    </div>

                    {/* Image Preview */}
                    {form.imagePreview && (
                        <div className="col-span-2 flex justify-center">
                            <img
                                src={form.imagePreview}
                                alt="Preview"
                                className="w-32 h-32 object-contain rounded"
                            />
                        </div>
                    )}

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

