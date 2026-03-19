import React, { useState } from 'react'

const LoginForm = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = () =>{
        
    }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
       <div className='border-2 border-black-300 rounded-2xl w-[30%] h-[50%] flex flex-col justify-center items-center gap-10'>
            <h1>Welcome To DevMatch</h1>
            <div className='flex flex-col w-[80%] gap-4'>
                <div className='flex flex-col'>
                    <label>Enter The Email</label>
                    <input className='border rounded-xs px-2 py-2' 
                     onChange={e => setEmail(e.target.value)}
                     value={email}
                     placeholder='user@gmail.com'/>
                </div>
                <div className='flex flex-col'>
                    <label>Enter The Password</label>
                    <input className='border rounded-xs px-2 py-2' 
                    onChange={e => setPassword(e.target.value)}
                    value={password} />
                </div>
                <button className='border bg-gray-500 w-[40%]  mx-auto h-9 rounded-xl'>
                Login</button>
                <p>New to DevMatch? Create new account</p>
            </div>
       </div>
    </div>
  )
}

export default LoginForm
