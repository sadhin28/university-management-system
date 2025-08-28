import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Lottie from "lottie-react";
import registerLottieData from '../assets/lotte/registeranimation.json'
import { AuthContext } from "../Provider/Authprovider";
import app from "../firebase/firebase.init";

const Register = () => {
 const location =useLocation()
    const navigate = useNavigate()
    
    const from = location.state || '/'
  const { setuser, CreateNewUser, updateUserProfile } = useContext(AuthContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const name = e.target.name.value
    const photoUrl = e.target.photo.value

    const data = { name, email, photoUrl }

    CreateNewUser(email, password)
      .then((result) => {
       
        const user = result.user;
        setuser(user);
        toast.success("Successfully Registered", {
          position: "top-center",
          autoClose: 2000,
        });
        
        updateUserProfile(data.name, data.photoUrl)
          .then(() => {

             result.user &&navigate(from)
            toast.success("Profile updated successfully")
          })

      });
  }

  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()
  const handelLoginWithGoogle = () => {

    signInWithPopup(auth, provider)
      .then(res => {
        setuser(res.user)
         res.user &&navigate(from)
      })
      .catch(error => {
          toast.error(error.message)
      })


  }

  return (
    <div className=" bg-gradient-to-r from-[#8BB9B9FF]/80 to-[#031226FF]/70 to-[#839096FF]/80 grid md:grid-cols-2 p-5">
      <div className="md:mt-20 lg:mt-0 ">
        <Lottie animationData={registerLottieData}></Lottie>
      </div>
      <div className="flex items-center justify-center mt-5 mb-5">
        <div className="bg-gradient-to-b from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] w-full max-w-3xl p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            REGISTER
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block py-2 text-white text-sm font-medium"
              >
                User name
              </label>
              <input
                type="text"
                id="text"

                name='name'
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter User Name"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white py-2"
              >
                User Email
              </label>
              <input
                type="email"
                id="text"

                name='email'
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your Email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="photo Url"
                className="block text-sm font-medium text-white py-2"
              >
                Photo Url
              </label>
              <input
                type="text"
                id="text"

                name='photo'
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Photo url"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white py-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"

                name='password'
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white backdrop-blur-lg border-2 hover:shadow-lg rounded-xl overflow-hidden font-bold"
            >
              Register
            </button>
            <div className="text-center text-white mt-2"><span>Already an acount?  </span><Link to='/login'><span className="text-red-300 hover:underline">login now</span></Link></div>
            <div className="text-center text-white mt-2 mb-2">--------------- or ---------------</div>
            <button onClick={handelLoginWithGoogle} className="btn w-full bg-white flex justify-center items-center gap-2   text-black border p-2 rounded-xl ">
              <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
              <div>Login with Google</div>
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;