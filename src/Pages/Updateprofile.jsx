import { useContext } from "react";
import { useNavigate } from "react-router-dom";


import { AuthContext } from "../Provider/Authprovider";
import { toast } from "react-toastify";

const UpdateProfile = () => {
    const navigate = useNavigate();
    const { updateUserProfile } =useContext(AuthContext)
      const handleUpdate = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const photo = event.target.photo.value;
        updateUserProfile(name, photo)
            .then(() => {
               
                navigate("/profile");
                toast.success("Profile updated successfully")
            })


    };
    return (
         <div className="w-11/12 mx-auto min-h-screen  flex justify-center items-center">
           
            <div className="border-4 hover:shadow-lg p-10 rounded-xl shadow-lg w-full max-w-lg">
                <h2 className="text-center text-2xl font-bold mb-4">Update Profile</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="url"
                            placeholder="Enter photo URL"
                            className="w-full px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                            name="photo"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            className="w-full px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                            name="name"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white p-3 rounded-lg  items-center gap-2 md:text-xl  w-full"
                        >
                            Update Information
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;