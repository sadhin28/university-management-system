import { ArrowLeft, GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { Link, useLoaderData, } from "react-router-dom";
import Swal from "sweetalert2";

const ViewProfile = () => {
     const faculty = useLoaderData()
     const handleShowPhoto = () => {
    Swal.fire({
      title: `<span style="color:#fff; font-weight:bold; font-size:1.5rem;">${faculty?.name || "Profile Picture"}</span>`,
      html: `<img src="${faculty?.image || "https://via.placeholder.com/300"}" 
              alt="${faculty?.name}'s profile" 
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
  
  if (!faculty) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600">Faculty Not Found ❌</h1>
      </div>
    );
  }
    return (
      <div className="flex justify-center items-start min-h-screen  px-4 py-10 shadow-xl hover:shadow-lg">
      <div className="hover:shadow-lg w-full max-w-3xl bg-gray-100/20 rounded-2xl shadow-xl overflow-hidden relative">
        
        {/* Back Button */}
        <Link
          to="/faculty"
          className=" top-16  left-4 flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 text-white  shadow hover:bg-blue-700/30 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        {/* Header */}
        <div className="h-28 bg-gradient-to-r from-blue-600/30 to-purple-500/20 relative">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <img
              src={faculty?.image}
              alt={faculty?.name}
              className="w-24 h-24 rounded-full border-3 border-white shadow-md object-cover"
              onClick={handleShowPhoto}
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 pb-6 px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">{faculty?.name}</h1>
          <p className="text-md text-gray-600">{faculty?.title}</p>
          <p className="text-sm text-gray-500 flex justify-center items-center gap-1 mt-1">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
            {faculty?.department}
          </p>

          {/* Contact */}
          <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={`mailto:${faculty?.email}`}
              className="flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg shadow hover:bg-indigo-100 transition text-sm"
            >
              <Mail className="w-4 h-4" /> {faculty?.email}
            </a>
            <a
              href={`tel:+88${faculty?.phone}`}
              className="flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-lg shadow hover:bg-green-100 transition text-sm"
            >
              <Phone className="w-4 h-4" /> {faculty?.phone}
            </a>
          </div>

          {/* About */}
          <div className="mt-5 text-left bg-gray-50 rounded-xl p-4 shadow-inner">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">About</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{faculty?.bio}</p>
          </div>

          {/* Research */}
          <div className="mt-4 text-left bg-gray-50 rounded-xl p-4 shadow-inner">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Research</h2>
            <p className="text-gray-700 text-sm">{faculty?.researchArea}</p>
          </div>

          {/* Courses */}
          <div className="mt-4 text-left bg-gray-50 rounded-xl p-4 shadow-inner">
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-1 mb-2">Courses</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm">
              {faculty?.courses.map((course, idx) => (
                <li key={idx}>{course}</li>
              ))}
            </ul>
          </div>

          {/* Office */}
          <div className="mt-4 text-left bg-gray-50 rounded-xl p-4 shadow-inner flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <p className="text-gray-700 text-sm">
              <strong>Office:</strong> {faculty?.office}
            </p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default ViewProfile;