import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
 import { getAuth } from "firebase/auth";
import { AuthContext } from "../Provider/Authprovider";
export default function AddStudent() {
    const auth =getAuth()
    const id =useParams().uid
    const [students,setstudents]=useState([{
        name:"",
        email: "",
        program: "",
        year: "",
        gpa: '',
        studentId: "",
        imagePreview: null,
        uid:'',
        role:'student'
    },])

    const navigate = useNavigate()
   const {role}=useContext(AuthContext)
    useEffect(() => {
     
        const fetchUsers = async () => {
          if (role !== "admin") return;
    
          try {
            const token = await auth.currentUser.getIdToken();
            const res = await fetch(`${import.meta.env.VITE_API}/users`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setstudents(data.filter(data=>data.uid === id));
          } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to fetch users.", "error");
          }
        };
        fetchUsers();
      }, []);
   
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setForm((prev) => ({ ...prev, [name]: value }));
    // };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (!file) return;

    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         setForm((prev) => ({
    //             ...prev,
    //             image: file,
    //             imagePreview: reader.result,
    //         }));
    //     };
    //     reader.readAsDataURL(file);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const StudentData = {
            name: e.target.name.value,
            email: e.target.email.value,
            program: e.target.program.value,
            year: e.target.year.value,
            gpa: e.target.gpa.value,
            studentId: e.target.studentId.value,
            imagePreview:students[0].photoURL,
            uid:students[0].uid,
            role:students[0].role
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
                            value={students[0].name}
                          
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
                            value={students[0].email}
                         
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                            required
                        />
                    </div>

                    {/* Program */}
                    <div className="flex flex-col">
                        <label>Program</label>
                        <select
                             required
                    
                            name="program"
                          
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
                            
                            name="year"
                         
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
                           
                        
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        />
                    </div>

                    {/* Image Upload */}
                    {/* <div className="col-span-2 flex flex-col">
                        <label>Profile Image</label>
                        <input
                            required
                            type="file"
                            accept="image/*"
                          
                            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        />
                    </div> */}

                    {/* Image Preview */}
                    {students[0].photoURL && (
                        <div className="col-span-2 flex justify-center">
                            <img
                                src={students[0].photoURL}
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

