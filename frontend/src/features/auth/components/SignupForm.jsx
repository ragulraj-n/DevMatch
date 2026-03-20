import React, { use, useState } from 'react'
import { validateConfirmPassword, validateEmail, validateFirstName, validateLastName, validatePassword } from '../validations/registerValidation';
import {signupApi } from '../services/authApi';
import toast from 'react-hot-toast';

const RegisterForm = () => {
    const inputField = 'border p-1 pl-2';
    const inputLabel = 'font-semibold'

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState({});

    const handleRegister = async () =>{
            const newError = {};
            newError.firstName = validateFirstName(firstName);
            newError.lastName = validateLastName(lastName);
            newError.email = validateEmail(email);
            newError.password = validatePassword(password);
            newError.confirmPassword = validateConfirmPassword(password,confirmPassword);
            const hasError = Object.values(newError).some(err => err);

            if(hasError){
                setError(newError);
                return;
            }

            setError(newError);
        const toastId = toast.loading("User Account Creating...")
        try{
            const res = await signupApi({
                firstName,
                lastName,
                email,
                password
            }) 
            console.log(res);
            toast.success("Account Created Successfully",{id: toastId});
        }catch(err){
            const message = err.response?.data?.message || 'SignUp failed';
            toast.error(message,{id: toastId});
            console.log("Data:", err.response?.data);
            console.log("Status:", err.response?.status);
        }
    }

    return (
    <div className="flex items-center justify-center min-h-screen px-4">
        <div className="border border-black w-full max-w-md md:max-w-lg lg:max-w-xl rounded-md p-6 md:p-8">
        
        <div className="flex flex-col gap-5">

            <div className="flex flex-col md:flex-row gap-4">
            
            <div className="flex flex-col w-full">
                <label className={inputLabel}>Firstname</label>
                <input
                className={inputField}
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                />
                {error.firstName && (
                <p className="text-red-500 text-sm">{error.firstName}</p>
                )}
            </div>

            <div className="flex flex-col w-full">
                <label className={inputLabel}>Lastname</label>
                <input
                className={inputField}
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                />
                {error.lastName && (
                <p className="text-red-500 text-sm">{error.lastName}</p>
                )}
            </div>

            </div>

            <div className="flex flex-col">
            <label className={inputLabel}>Email</label>
            <input
                className={inputField}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            {error.email && (
                <p className="text-red-500 text-sm">{error.email}</p>
            )}
            </div>

            <div className="flex flex-col">
            <label className={inputLabel}>Password</label>
            <input
                className={inputField}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            {error.password && (
                <p className="text-red-500 text-sm">{error.password}</p>
            )}
            </div>

            <div className="flex flex-col">
            <label className={inputLabel}>Confirm password</label>
            <input
                className={inputField}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
            />
            {error.confirmPassword && (
                <p className="text-red-500 text-sm">{error.confirmPassword}</p>
            )}
            </div>

            <button
            className="bg-gray-600 hover:bg-gray-700 text-white w-full md:w-1/2 mx-auto py-2 rounded-md transition"
            onClick={handleRegister}
            >
            Register
            </button>

        </div>
        </div>
    </div>
    );

}

export default RegisterForm
