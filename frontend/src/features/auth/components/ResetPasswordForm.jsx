import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaArrowLeft } from "react-icons/fa"
import toast from 'react-hot-toast'
import { resetPasswordApi, validateResetTokenApi } from '../services/authApi'

const ResetPasswordForm = ({ token }) => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isValidating, setIsValidating] = useState(true)
    const [isTokenValid, setIsTokenValid] = useState(false)
    const [isResetSuccess, setIsResetSuccess] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        validateToken()
    }, [token])

    const validateToken = async () => {
        try {
            setIsValidating(true)
            if (token && token.length > 20) {
                setIsTokenValid(true)
            } else {
                setIsTokenValid(false)
                toast.error("Invalid or expired reset link")
                setTimeout(() => navigate('/login'), 2000)
            }
            
            await validateResetTokenApi(token);
            setIsTokenValid(true)
        } catch (err) {
            console.log(err)
            setIsTokenValid(false)
            toast.error("Invalid or expired reset link")
            setTimeout(() => navigate('/login'), 2000)
        } finally {
            setIsValidating(false)
        }
    }

    const validatePassword = (password) => {
        if (!password) return "Password is required"
        if (password.length < 8) return "Password must be at least 8 characters"
        if (!/[A-Z]/.test(password)) return "Must include at least one uppercase letter"
        if (!/[a-z]/.test(password)) return "Must include at least one lowercase letter"
        if (!/[0-9]/.test(password)) return "Must include at least one number"
        if (!/[!@#$%^&*]/.test(password)) return "Must include at least one special character (!@#$%^&*)"
        return ""
    }

    const validateConfirmPassword = (password, confirmPassword) => {
        if (!confirmPassword) return "Please confirm your password"
        if (password !== confirmPassword) return "Passwords do not match"
        return ""
    }

    const handleResetPassword = async () => {
        const passwordError = validatePassword(password)
        const confirmError = validateConfirmPassword(password, confirmPassword)
        
        const newError = {}
        if (passwordError) newError.password = passwordError
        if (confirmError) newError.confirmPassword = confirmError
        
        if (Object.keys(newError).length > 0) {
            setError(newError)
            return
        }
        
        setError({})
        
        try {
            setIsLoading(true)
            
            await resetPasswordApi(token,password);
            setIsResetSuccess(true)
            toast.success("Password reset successfully! Redirecting to login...")
            setTimeout(() => navigate('/login'), 3000)
        } catch (err) {
            console.log(err)
            const errorMessage = "Failed to reset password. Please try again."
            toast.error(errorMessage)
            setTimeout(() => navigate('/login'), 2000)
        } finally {
            setIsLoading(false)
        }
    }

    if (isValidating) {
        return (
            <div className='min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
                <div className='w-full max-w-md text-center'>
                    <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8'>
                        <div className='flex justify-center mb-6'>
                            <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600'></div>
                        </div>
                        <h2 className='text-xl font-semibold text-gray-700'>Validating reset link...</h2>
                        <p className='text-gray-500 mt-2'>Please wait while we verify your request</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!isTokenValid) {
        return (
            <div className='min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
                <div className='w-full max-w-md'>
                    <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center'>
                        <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6'>
                            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                        </div>
                        <h2 className='text-2xl font-bold text-gray-800 mb-3'>Invalid Reset Link</h2>
                        <p className='text-gray-600 mb-6'>
                            This password reset link is invalid or has expired.
                        </p>
                        <Link to="/login">
                            <button className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200'>
                                Back to Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    if (isResetSuccess) {
        return (
            <div className='min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
                <div className='w-full max-w-md'>
                    <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center'>
                        <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6'>
                            <FaCheckCircle className='text-4xl text-green-600' />
                        </div>
                        <h2 className='text-2xl font-bold text-gray-800 mb-3'>Password Reset Successfully!</h2>
                        <p className='text-gray-600 mb-6'>
                            Your password has been reset. Redirecting you to login...
                        </p>
                        <div className='flex justify-center'>
                            <div className='animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600'></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
            <div className='w-full max-w-md'>
                <div className='text-center mb-8'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg mb-4'>
                        <FaLock className='w-8 h-8 text-white' />
                    </div>
                    <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent'>
                        Create New Password
                    </h1>
                    <p className='text-gray-600 mt-2'>Enter your new password below</p>
                </div>

                <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20'>
                    <div className='space-y-5'>
                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                <FaLock className='text-blue-600' />
                                New Password
                            </label>
                            <div className='relative'>
                                <input
                                    type={isShowPassword ? "text" : "password"}
                                    className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-50'
                                    placeholder='Enter new password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'
                                    onClick={() => setIsShowPassword(!isShowPassword)}
                                >
                                    {isShowPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                            {error.password && (
                                <p className='text-red-500 text-sm flex items-center gap-1 mt-1'>
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

                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                <FaLock className='text-blue-600' />
                                Confirm New Password
                            </label>
                            <div className='relative'>
                                <input
                                    type={isShowConfirmPassword ? "text" : "password"}
                                    className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-50'
                                    placeholder='Confirm your new password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'
                                    onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                                >
                                    {isShowConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                            {error.confirmPassword && (
                                <p className='text-red-500 text-sm flex items-center gap-1 mt-1'>
                                    <span>⚠️</span> {error.confirmPassword}
                                </p>
                            )}
                        </div>

                        <button
                            onClick={handleResetPassword}
                            disabled={isLoading}
                            className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Resetting Password...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </button>

                        <div className='text-center pt-4'>
                            <Link to="/login" className='text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors flex items-center justify-center gap-2'>
                                <FaArrowLeft size={14} />
                                Back to Login
                            </Link>
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
            `}</style>
        </div>
    )
}

export default ResetPasswordForm;