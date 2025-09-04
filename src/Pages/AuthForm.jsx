import { useContext, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup,} from "firebase/auth";
import { AuthContext } from "../Provider/Authprovider";
import app from "../firebase/firebase.init";
import { toast } from "react-toastify";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
    const from = location.state || '/'
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
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-700 to-blue-700 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 uppercase">
          {isRegister ? "Register" : "Login"}
        </h2>

        {/* Role Selection */}
        <label className="block mb-2 font-semibold text-gray-700">Select Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
          className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
        />}
        {/* Email */}
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) =>setEmail(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500"
        />

        {/* Forgot password */}
        {!isRegister && (
          <div
           
            className="text-sm text-blue-600 cursor-pointer hover:underline mb-4"
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
            className="w-full p-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
          />
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        {/* Google login */}
        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center"
        >
          <span className="mr-2">🔴</span> Login with Google
        </button>

        {/* Switch login/register */}
        <p
          className="mt-4 text-center text-sm text-blue-600 cursor-pointer hover:underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login now"
            : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
}
