import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import loginAnimation from '../assets/lotte/LoginAnimation.json'
import Lottie from 'lottie-react';
import app from '../firebase/firebase.init';
import { AuthContext } from '../Provider/Authprovider';



const Login = () => {
    const location = useLocation()
    const navigate = useNavigate()
     const [takeemail, setTakeemail] = useState("");
    const handleChange = (event) => {
        setTakeemail(event.target.value);
    }

    const from = location.state || '/'
    const { setuser, login, forgotPassword } = useContext(AuthContext)

    const handleSubmit = (e) => {

        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        login(email, password)
            .then(result => {

                result.user && navigate(from)
            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()
    const handelLoginWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(res => {
                setuser(res.user)
                res.user && navigate(from)
            })
            .catch(error => {
                toast.error(error.message)
            })
    }
    //forgot password
    // const handelForgatePassword = () => {
    //     const email = document.getElementsByName('email')[0].value
    //     if (!email) {
    //         toast.error("Please Provide A valid Email Address")
    //     }
    //     else {
    //         forgotPassword(auth, email)
    //             .then(res => {
    //                 toast.success('Forgot Password,Please Check email')
    //             })
    //             .catch(error => {
    //                 toast.error(error.message)
    //             })
    //     }
    // }
    return (
        <div className='min-h-screen  bg-gradient-to-r from-[#8BB9B9FF]/80 to-[#031226FF]/70 to-[#839096FF]/80   grid md:grid-cols-2 px-5 '>
            <div className='md:mt-20 lg:mt-0 '>
                <Lottie className='' animationData={loginAnimation}></Lottie>
            </div>
            <div className=" flex items-center justify-center mt-5 mb-5">
                <div className="bg-gradient-to-b from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] w-full max-w-3xl p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-white mb-6">
                        Login
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="email"
                                className="block py-2 text-sm font-medium text-white"
                            >
                                User Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                onChange={handleChange}
                                name='email'
                                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your Email"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block py-2 text-white text-sm font-medium "
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
                            Login now
                        </button>
                        <div className='mt-2 text-white hover:underline'><Link to="/forgotPassword"
                        state={{ email: takeemail }}
                        >Forgot password?</Link></div>
                        <div className='text-center text-white mt-2'><span>You have no Acount? </span>  <Link to='/register'><span className="text-red-300 hover:underline">Register Now</span></Link></div>
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

export default Login;