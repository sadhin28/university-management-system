import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Addfaculty() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        id: "",
        name: "",
        email: "",
        department: "",
        title: "",
        office: "",
        courses: "",
        researchArea: "",
        bio: "",
        image: null,
        imagePreview: "",
        phone:""
    });
    const coursesArray = form.courses
        ? form.courses.split(",").map((c) => c.trim())
        : [];

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
        const data = {
            id: form.id,
            name: form.name,
            email: form.email,
            department: form.department,
            title: form.title,
            office: form.office,
            courses: coursesArray,
            researchArea: form.researchArea,
            bio: form.bio,
            image: form.imagePreview,
            phone:form.phone
        }
        //post now
        fetch(`https://university-management-server-topaz.vercel.app/faculty`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                e.value = ''
                Swal.fire({
                    title: `Sucess`,
                    text: `Add faculty successfully!`,
                    icon: "success",
                    draggable: true
                });
                navigate('/faculty')

            })
            .catch(error => {
                Swal.fire({
                    title: 'Faculty',
                    text: `${error.message}`,
                    icon: "error",
                    draggable: true
                });
            })

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent py-10 px-4">
            <div className="w-full max-w-6xl bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6">Add Professor</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 items-center">
                    {/* ID */}
                    <div className="flex flex-col  ">
                        <label>ID</label>
                        <input
                            type="text"
                            name="id"
                            value={form.id}
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

                    {/* Department */}
                    <div className="flex flex-col">
                        <label>Department</label>
                        <input
                            type="text"
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        />
                    </div>

                    {/* Title */}
                    <div className="flex flex-col">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        />
                    </div>

                    {/* Office */}
                    <div className="flex flex-col">
                        <label>Office</label>
                        <input
                            type="text"
                            name="office"
                            value={form.office}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        />
                    </div>

                    {/* Courses */}
                    <div className="flex flex-col">
                        <label>Courses (Used ,)</label>
                        <input
                            type="text"
                            name="courses"
                            value={form.courses}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        />
                    </div>

                    {/* Research Area */}
                    <div className="flex flex-col">
                        <label>Research Area</label>
                        <input
                            type="text"
                            name="researchArea"
                            value={form.researchArea}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        />
                    </div>
                    {/* Phone */}
                    <div className="col-span-2 flex flex-col">
                        <label>Phone</label>
                         <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        />
                    </div>  
                    {/* Bio */}
                    <div className="col-span-2 flex flex-col">
                        <label>Bio</label>
                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            rows={4}
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        />
                    </div>
                   
                    {/* Image Upload */}
                    <div className="col-span-2 flex flex-col">
                        <label>Profile Image</label>
                        <input
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
