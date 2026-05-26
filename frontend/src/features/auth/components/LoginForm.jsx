import React, { useState } from 'react'
import { loginApi } from '../services/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../user/userSlice';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const [isShowPassword, setIsShowPassword] = useState(false);
    const currUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();

    if (currUser) navigate('/feed');
    
    const handleLogin = async () => {
        try {
            const newError = {};
            if (!email.trim()) newError.email = "Email is required!";
            if (!password.trim()) newError.password = "Password is required!";
            else if (password.trim().length < 8) newError.password = "Minimum lenght password must be 8";

            if (Object.keys(newError).length > 0) {
                setError(newError);
                return;
            }
            const res = await loginApi({
                email,
                password
            });
            toast.success("User LogIn successfully");
            dispatch(addUser(res?.data?.data));
            navigate("/feed");
            setError({});
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
            console.log(err.response?.data?.message || "Login failed");
        }
    }

    const handleShowPassword = () => setIsShowPassword((prev) => !prev);

    return (
        <div className='min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
            <div className='w-full max-w-md'>
                
                <div className='text-center mb-8 animate-fade-in'>
                    <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent'>
                        DevMatch
                    </h1>
                    <p className='text-gray-600 mt-2'>Connect with amazing developers</p>
                </div>

                <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20'>
                    <h2 className='text-2xl font-bold text-gray-800 text-center mb-6'>
                        Welcome Back! 👋
                    </h2>

                    <div className='space-y-5'>
                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                </svg>
                                Email Address
                            </label>
                            <input
                                className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-50'
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                placeholder='user@example.com'
                            />
                            {error.email && (
                                <p className='text-red-500 text-sm flex items-center gap-1 mt-1'>
                                    <span className='text-red-500'>⚠️</span> {error.email}
                                </p>
                            )}
                        </div>


                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                                Password
                            </label>
                            <div className='relative'>
                                <input
                                    className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-50'
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    type={isShowPassword ? 'text' : 'password'}
                                    placeholder='Enter your password'
                                />
                                <button
                                    type="button"
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'
                                    onClick={handleShowPassword}
                                >
                                    {isShowPassword === false && <FaEyeSlash size={20} />}
                                    {isShowPassword && <FaEye size={20} />}
                                </button>
                            </div>
                            <div className='flex justify-end'>
                                <Link to="/forgot-password" className='text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors'>
                                    Forgot Password?
                                </Link>
                            </div>
                            {error.password && (
                                <p className='text-red-500 text-sm flex items-center gap-1 mt-1'>
                                    <span className='text-red-500'>⚠️</span> {error.password}
                                </p>
                            )}
                        </div>

                        <button
                            className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg'
                            onClick={handleLogin}
                        >
                            Login to DevMatch
                        </button>

                        <div className='text-center pt-4'>
                            <p className='text-gray-600'>
                                New to DevMatch?{' '}
                                <Link to="/signup" className='text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors'>
                                    Create new account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className='fixed -z-10 top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
                <div className='fixed -z-10 bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
                <div className='fixed -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
            `}</style>
        </div>
    )
}

export default LoginForm