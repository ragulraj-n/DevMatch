import React, { useState } from 'react'
import { loginApi } from '../services/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../user/userSlice';
import { FaEyeSlash,FaEye } from "react-icons/fa";

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState({});
    const [isShowPassword,setIsShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () =>{
        try{
          const newError = {};
          if(!email.trim()) newError.email = "Email is required!";
          if(!password.trim()) newError.password = "Password is required!";
          else if(password.trim().length < 8) newError.password = "Minimum lenght password must be 8";

          if(Object.keys(newError).length>0){
            setError(newError);
            return;
          } 
          const res = await loginApi({
            email,
            password
          });
          dispatch(addUser(res?.data?.data));
          navigate("/setup-profile");
          setError({});
        }catch(err){
          console.log(err);
        }
    }

     const handleShowPassword = () =>setIsShowPassword((prev)=>!prev);

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
       <div className='border-2 border-black-300 rounded-2xl min-w-[30%] min-h-[50%] flex flex-col justify-center items-center gap-10'>
            <h1 className='font-bold text-2xl'>Welcome To DevMatch</h1>
            <div className='flex flex-col w-[80%] gap-4'>
                <div className='flex flex-col'>
                    <label className='font-semibold'>Enter Your Email Id</label>
                    <input className='border rounded-xs px-2 py-2' 
                     onChange={e => setEmail(e.target.value)}
                     value={email}
                     placeholder='user@gmail.com'/>
                    {error.email && <p className='text-red-500'>{error.email}</p>}
                </div>
                <div className='flex flex-col relative'>
                    <label className='font-semibold'>Enter Your Password</label>
                    <input className='border rounded-xs px-2 py-2' 
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type={isShowPassword?'text':'password'} />
                    {isShowPassword===false && <FaEyeSlash className='absolute top-8 right-5 cursor-pointer' 
                    onClick={handleShowPassword} size={24}/>}
                    {isShowPassword && <FaEye className='absolute top-8 right-5 cursor-pointer' 
                    onClick={handleShowPassword} size={24}/>}
                    {error.password && <p className='text-red-500'>{error.password}</p>}
                </div>
                <button className='border bg-gray-500 w-[40%]  mx-auto h-9 rounded-xl'
                onClick={handleLogin}>
                Login</button>
                <p className='mx-auto'>New to DevMatch? <Link to="/signup" className='font-semibold'>Create new account</Link></p>
            </div>
       </div>
    </div>
  )
}

export default LoginForm
