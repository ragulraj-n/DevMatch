import React, { useState } from 'react'
import { validateConfirmPassword, validateEmail, validateFirstName, validateLastName, validatePassword } from '../validations/registerValidation';
import { signupApi } from '../services/authApi';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../user/userSlice';
import { FaEyeSlash, FaEye } from "react-icons/fa";

const SignupForm = () => {
    const inputField = 'w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-50';
    const inputLabel = 'text-sm font-semibold text-gray-700 flex items-center gap-2'
    
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const currUser = useSelector(state => state.user.currentUser);
    
    const navigate = useNavigate();
    if (currUser) navigate('/setup-profile');

    const handleRegister = async () => {
        const newError = {};
        newError.firstName = validateFirstName(firstName);
        newError.lastName = validateLastName(lastName);
        newError.email = validateEmail(email);
        newError.password = validatePassword(password);
        newError.confirmPassword = validateConfirmPassword(password, confirmPassword);
        const hasError = Object.values(newError).some(err => err);
        if (hasError) {
            setError(newError);
            return;
        }

        setError(newError);
        const toastId = toast.loading("User Account Creating...")
        try {
            const res = await signupApi({
                firstName,
                lastName,
                email,
                password
            })
            dispatch(addUser(res?.data?.data));
            navigate("/setup-profile", { replace: true });
            toast.success("Account Created Successfully", { id: toastId });
        } catch (err) {
            const message = err.response?.data?.message || 'SignUp failed';
            toast.error(message, { id: toastId });
            console.log("Data:", err.response?.data);
            console.log("Status:", err.response?.status);
        }
    }

    const handleShowPassword = () => setIsShowPassword((prev) => !prev);
    const handleConfirmShowPassword = () => setIsShowConfirmPassword((prev) => !prev);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="w-full max-w-2xl">
                <div className='text-center mb-6 animate-fade-in'>
                    <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent'>
                        Join DevMatch
                    </h1>
                    <p className='text-gray-600 mt-2'>Create your developer profile</p>
                </div>

                <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-white/20'>
                    <h2 className='text-2xl font-bold text-gray-800 text-center mb-6'>
                        Create Account ✨
                    </h2>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-col w-full space-y-2">
                                <label className={inputLabel}>
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    First Name
                                </label>
                                <input
                                    className={inputField}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                    placeholder="John"
                                />
                                {error.firstName && (
                                    <p className="text-red-500 text-sm flex items-center gap-1">
                                        <span>⚠️</span> {error.firstName}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col w-full space-y-2">
                                <label className={inputLabel}>
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    Last Name
                                </label>
                                <input
                                    className={inputField}
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    placeholder="Doe"
                                />
                                {error.lastName && (
                                    <p className="text-red-500 text-sm flex items-center gap-1">
                                        <span>⚠️</span> {error.lastName}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className={inputLabel}>
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                </svg>
                                Email Address
                            </label>
                            <input
                                className={inputField}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="john@example.com"
                            />
                            {error.email && (
                                <p className="text-red-500 text-sm flex items-center gap-1">
                                    <span>⚠️</span> {error.email}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className={inputLabel}>
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className={inputField}
                                    type={isShowPassword ? "text" : "password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    placeholder="Create a strong password"
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
                            {error.password && (
                                <p className="text-red-500 text-sm flex items-center gap-1">
                                    <span>⚠️</span> {error.password}
                                </p>
                            )}
                            <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-2">
                                <span className={password.length >= 8 ? "text-green-600" : ""}>✓ 8+ chars</span>
                                <span className={/[A-Z]/.test(password) ? "text-green-600" : ""}>✓ Uppercase</span>
                                <span className={/[a-z]/.test(password) ? "text-green-600" : ""}>✓ Lowercase</span>
                                <span className={/[0-9]/.test(password) ? "text-green-600" : ""}>✓ Number</span>
                                <span className={/[!@#$%^&*]/.test(password) ? "text-green-600" : ""}>✓ Special char</span>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className={inputLabel}>
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    className={inputField}
                                    type={isShowConfirmPassword ? "text" : "password"}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'
                                    onClick={handleConfirmShowPassword}
                                >
                                    {isShowConfirmPassword === false && <FaEyeSlash size={20} />}
                                    {isShowConfirmPassword && <FaEye size={20} />}
                                </button>
                            </div>
                            {error.confirmPassword && (
                                <p className="text-red-500 text-sm flex items-center gap-1">
                                    <span>⚠️</span> {error.confirmPassword}
                                </p>
                            )}
                        </div>

                        <button
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg mt-4"
                            onClick={handleRegister}
                        >
                            Create Account
                        </button>

                        <div className='text-center pt-4'>
                            <p className='text-gray-600'>
                                Already have an account?{' '}
                                <Link to="/login" className='text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors'>
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className='fixed -z-10 top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
                <div className='fixed -z-10 bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
                <div className='fixed -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>
            </div>

           </div>
    )
}

export default SignupForm