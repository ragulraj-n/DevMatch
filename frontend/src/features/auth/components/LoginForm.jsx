import React, { useState } from 'react'
import { loginApi } from '../services/authApi';
import { Link } from 'react-router-dom';


const LoginForm = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState({});

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
          console.log(res);
          setError({});
        }catch(err){
          console.log(err);
        }
    }

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
                <div className='flex flex-col'>
                    <label className='font-semibold'>Enter Your Password</label>
                    <input className='border rounded-xs px-2 py-2' 
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type='password' />
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
