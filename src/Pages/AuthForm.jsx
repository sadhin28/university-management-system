import { useContext, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup,} from "firebase/auth";
import { AuthContext } from "../Provider/Authprovider";
import app from "../firebase/firebase.init";
import { toast } from "react-toastify";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
export default function AuthForm() {
  const { login, CreateNewUser ,user,setuser,updateUserProfile} = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [name, setname] = useState("");
  const auth = getAuth(app);
  const location = useLocation()
    const navigate = useNavigate()
    const from =role !=='admin'?location.state||'/':location.state||'/admin'
  const handleSubmit = async () => {
    try {
      if (isRegister) {
        if (role !== "student") {
          toast.error("Only students can register");
          return;
        }

        CreateNewUser(email, password)
         .then((result) => {
       
        const user = result.user;
        setuser(user);
        toast.success("Successfully Registered", {
          position: "top-center",
          autoClose: 2000,
        });
        
        updateUserProfile(name,photoURL)
          .then(() => {

             result.user &&navigate(from)
            
          })

      });

        toast.success("Student registered successfully with photo");
        user && navigate(from)
        
      } else {
        await login(email, password)
        .then(result => {
               result && toast.success(`${role} login successful`);
                result.user && navigate(from)
            })
            .catch(error => {
                toast.error(error.message)
            })
        
        
        user && navigate(from)
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
 const provider = new GoogleAuthProvider();
   const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then(res => {
                setuser(res.user)
                res.user && navigate(from)
                res.user  && toast.success(`Google login successful`);
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
  return (
    <div className="relative top-20 flex items-center justify-center  px-4 ">
      <div className="border-2  border-[#097C7DFF] hover:shadow-2xl shadow-lg bg-gray-100/20 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 uppercase">
          {isRegister ? "Register" : "Login"}
        </h2>

        {/* Role Selection */}
        <label className="block mb-2 font-semibold text-gray-700">Select Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        {/* name */}
       {isRegister&& <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) =>setname(e.target.value)}
          className="w-full p-2 mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
        />}
        {/* Email */}
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) =>setEmail(e.target.value)}
          className="w-full p-2 mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
        />

        {/* Forgot password */}
        {!isRegister && (
          <div
           
            className="w-25 text-sm text-[#097C7DFF] hover:text-red-500 cursor-pointer hover:underline mb-4"
          >
            <NavLink 
            state={{ email: email }}
            to="/forgotPassword"
            >Forgot Password?</NavLink>
           
          </div>
        )}

        {/* Photo URL (only in register mode) */}
        {isRegister && (
          <input
            type="text"
            placeholder="Enter photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full p-2 mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
          />
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white p-2 rounded-lg  items-center gap-2 md:text-xl  w-full font-bold"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        {/* Google login */}
        <div className="my-4  flex items-center">
          <hr className="flex-grow border-[#097C7DFF]" />
          <span className="mx-2 font-bold text-[#097C7DFF] text-sm">or</span>
          <hr className=" flex-grow  border-[#097C7DFF]" />
        </div>
        <button
          onClick={handleGoogleLogin}
          className="bg-gradient-to-r font-bold from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white p-2 rounded-lg  items-center flex justify-center gap-2 md:text-xl  w-full"
        >
        <FaGoogle className="mr-1 "/> Login with Google
        </button>

        {/* Switch login/register */}
        <p
          className="mt-4 text-center text-sm text-[#097C7DFF] cursor-pointer "
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? <p>Already have an account?  <span className="hover:underline hover:text-red-500">Login now</span></p>
            : <p>Don't have an account? <span className="hover:underline hover:text-red-500">Register</span></p>}
        </p>
      </div>
    </div>
  );
}
