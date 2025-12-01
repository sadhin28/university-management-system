import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/Authprovider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { updateUserProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const file = event.target.photo.files[0]; // get the uploaded file

    if (!file) {
      toast.error("Please select a photo");
      return;
    }

    setLoading(true);

    try {
      // Upload to ImageBB
      const formData = new FormData();
      formData.append("image", file);

      const imgbbAPIKey = "c0c329a501ae5973aa8ffc521737a1e9";
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        const imageUrl = data.data.url; // get uploaded image URL

        // Update Firebase profile
        await updateUserProfile(name, imageUrl);

        toast.success("Profile updated successfully");
        navigate("/profile");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-11/12 mx-auto min-h-screen flex justify-center items-center">
      <div className="border-4 border-[#2C3D4D] hover:shadow-lg p-10 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Update Profile</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF] focus:outline-none focus:ring-2 focus:ring-[#159799]"
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
              className="w-full px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF] focus:outline-none focus:ring-2 focus:ring-[#159799]"
              name="name"
              required
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r hover:border-2 from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white p-2 rounded-lg items-center gap-2 md:text-xl w-full hover:bg-none"
            >
              {loading ? "Updating..." : "Update Information"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
