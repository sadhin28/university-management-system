import React, { useContext, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Provider/Authprovider';

const ForgetPassword = () => {
    const { passReset, LogOut } = useContext(AuthContext)
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || "");
    const navigate = useNavigate()
    const handleChange = (event) => {
        setEmail(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        passReset(email)
            .then(() => {
                toast.success('Password reset email sent successfully');
                window.open("https://mail.google.com/", "_blank");
                event.target.reset();
                LogOut();
                navigate('/login');
            })
            .catch((error) => {
                toast.error(error.message || 'An error occurred while resetting the password');
            });
    };
    return (
         <div className="max-w-md mx-auto border-4 border-[#2C3D4D] shadow-md hover:shadow-lg rounded-lg overflow-hidden  grid w-11/12  justify-center items-center card bg-base-100  max-w-lg shrink-0 shadow-sm mx-auto  px-0 md:px-3 py-7 my-16 ">
            
            <h3 className="text-center text-2xl font-semibold mb-4">Reset Your Password</h3>
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email Address</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                        required
                    />
                </div>

                <div className="form-control mt-6">
                    <button className="bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white p-3 rounded-lg  items-center gap-2 md:text-xl  w-full">
                        Send Reset Link
                    </button>
                </div>
            </form>

            <div className="flex text-xl justify-center mt-4">
                <small className="text-center">
                    Remembered your password?
                    <Link to="/login" className="text-[#DA3615FF] hover:underline"> Login here</Link>
                </small>
            </div>
        </div>
    );
};

export default ForgetPassword;