import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaArrowLeft } from "react-icons/fa"
import toast from 'react-hot-toast'
import { forgetPasswordApi } from '../services/authApi'

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isEmailSent, setIsEmailSent] = useState(false)
    const navigate = useNavigate()

    const validateEmail = (email) => {
        if (!email) return "Email is required"
        if (!/^\S+@\S+\.\S+$/.test(email)) return "Please enter a valid email address"
        return ""
    }

    const handleSendResetLink = async () => {
        const emailError = validateEmail(email)
        
        if (emailError) {
            setError({ email: emailError })
            return
        }
        
        setError({})
        
        try {
            setIsLoading(true)
            const res = await forgetPasswordApi({email});
            if (res) {
                setIsEmailSent(true)
                toast.success("Password reset link sent to your email!")
            }
            
        } catch (err) {
            console.log(err)
            const errorMessage = err.response?.data?.message || "Failed to send reset link. Please try again."
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendLink = async () => {
        await handleSendResetLink()
    }

    if (isEmailSent) {
        return (
            <div className='min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
                <div className='w-full max-w-md'>
                    <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 text-center'>
                        <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6'>
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        
                        <h2 className='text-2xl font-bold text-gray-800 mb-3'>Check Your Email</h2>
                        <p className='text-gray-600 mb-4'>
                            We've sent a password reset link to <strong className='text-blue-600'>{email}</strong>
                        </p>
                        <p className='text-sm text-gray-500 mb-6'>
                            Click the link in the email to reset your password. The link will expire in 15 minutes.
                        </p>
                        
                        <div className='space-y-3'>
                            <button
                                onClick={handleResendLink}
                                disabled={isLoading}
                                className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50'
                            >
                                {isLoading ? "Sending..." : "Resend Email"}
                            </button>
                            
                            <Link to="/login">
                                <button className='w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2'>
                                    <FaArrowLeft size={16} />
                                    Back to Login
                                </button>
                            </Link>
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
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM3 20a9 9 0 0118 0"></path>
                        </svg>
                    </div>
                    <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent'>
                        Forgot Password?
                    </h1>
                    <p className='text-gray-600 mt-2'>No worries! Enter your email and we'll send you a reset link</p>
                </div>

                <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20'>
                    <div className='space-y-5'>
                        <div className='space-y-2'>
                            <label className='text-sm font-semibold text-gray-700 flex items-center gap-2'>
                                <FaEnvelope className='text-blue-600' />
                                Email Address
                            </label>
                            <input
                                type="email"
                                className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none bg-gray-50'
                                placeholder='Enter your registered email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendResetLink()}
                            />
                            {error.email && (
                                <p className='text-red-500 text-sm flex items-center gap-1 mt-1'>
                                    <span>⚠️</span> {error.email}
                                </p>
                            )}
                        </div>

                        <button
                            onClick={handleSendResetLink}
                            disabled={isLoading}
                            className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                "Send Reset Link"
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

            </div>

        </div>
    )
}

export default ForgotPasswordForm