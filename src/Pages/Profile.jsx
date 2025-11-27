import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/Authprovider";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, role } = useContext(AuthContext);

  const handleShowPhoto = () => {
    Swal.fire({
      title: `<span style="color:#fff; font-weight:bold; font-size:1.5rem;">${user?.displayName || "Profile Picture"}</span>`,
      html: `<img src="${user?.photoURL || "https://via.placeholder.com/300"}" 
              alt="${user?.displayName}'s profile" 
              style="width:300px; height:300px; border-radius:50%; border:5px solid #159799; object-fit:cover; box-shadow:0 5px 15px rgba(0,0,0,0.3);" />`,
      showCloseButton: true,
      showConfirmButton: false,
      background: 'linear-gradient(135deg, #1D5A5AFF, #031226FF, #0881B5FF)',
      width: 400,
      padding: '30px',
      customClass: {
        popup: 'rounded-2xl shadow-2xl animate__animated animate__fadeInDown',
        closeButton: 'hover:text-red-500 transition-colors duration-300'
      },
      didOpen: () => {
        const closeBtn = Swal.getCloseButton();
        if (closeBtn) {
          closeBtn.style.fontSize = '1.5rem';
        }
      }
    });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="rounded-bl-[80px] rounded-br-[80px] bg-gradient-to-l from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] pb-7 text-white h-60 flex items-center justify-center">
        <div className="text-center">
          <div className="md:text-5xl uppercase text-xl font-bold py-4">{role && role}</div>
          <h1 className="md:text-4xl text-xl font-bold">Welcome, {user?.displayName}!</h1>
          <p className="mt-2 md:text-lg text-xl">We&apos;re glad to have you back!</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="container mx-auto mt-8">
        <div className="max-w-md mx-auto border-4 border-[#2C3D4D] shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-shadow duration-300">
          <div className="flex justify-center items-center p-6">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt={`${user?.displayName}'s profile`}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-[#2C3D4D] shadow-md cursor-pointer hover:scale-110 transition-transform duration-300"
              onClick={handleShowPhoto}
            />
          </div>
          <div className="px-6 pb-6 text-center">
            <h2 className="text-2xl font-semibold">{user?.displayName}</h2>
            <p className="text-gray-800 mt-2">{user?.email}</p>
          </div>
          <div className="flex justify-center pb-6">
            <Link
              to="/update-profile"
              className="bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white px-6 py-2 rounded-lg flex items-center gap-2 md:text-xl text-xs hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-white hover:bg-none"
            >
              Update Your Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto mt-10">
        <div className="hover:shadow-xl shadow-md rounded-lg p-6 mx-2 mx-auto transition-shadow duration-300">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Exciting New Features</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-500 text-white flex justify-center items-center rounded-full text-lg font-bold">1</div>
              <div>
                <h4 className="font-semibold text-gray-800">Enhanced Security</h4>
                <p className="text-gray-600">
                  Your account is now secured with multi-factor authentication to keep your data safe.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500 text-white flex justify-center items-center rounded-full text-lg font-bold">2</div>
              <div>
                <h4 className="font-semibold text-gray-800">Personalized Dashboard</h4>
                <p className="text-gray-600">
                  View your activity summary and suggestions tailored just for you.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-500 text-white flex justify-center items-center rounded-full text-lg font-bold">3</div>
              <div>
                <h4 className="font-semibold text-gray-800">Interactive Challenges</h4>
                <p className="text-gray-600">
                  Participate in fun challenges and earn rewards along the way!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
