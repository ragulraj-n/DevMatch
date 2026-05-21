import React, { useEffect } from 'react'
import { FaUsers } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { Link } from 'react-router-dom';

const Navbar = () => {
   
    const navItemsStyle = "w-14 h-[44px] flex flex-col items-center justify-center cursor-pointer";
  return (
    <div className='h-16 border-2 flex items-center justify-between gap-5'>
        <div className='flex gap-10 items-center w-1/2'>
            <Link to="/feed">
                <h1 className='font-bold text-2xl shadow-md ml-10 p-2 px-3 rounded-sm'>DevMatch</h1>
            </Link>
            
            <input className='border-2 h-10 w-2/5 min-w-16 focus:w-3/5'/>
        </div>
        <div className='flex px-20 justify-around w-1/3 gap-5 '>
            <Link to="/feed">
                <div className={navItemsStyle}>
                    <IoHomeSharp size={30}/>
                    <p className='text-xs'>Home</p>
                </div>
            </Link>
            <div className={navItemsStyle}>
                <FaUsers size={30}/>
                <p className='text-xs'>Connection</p>
            </div>
            <div className={navItemsStyle}>
                <IoMdNotifications size={30}/>
                <p className='text-xs'>Notification</p>
            </div>
            <Link to="profile">
            <div className={navItemsStyle + " mb-2"}>
                <img src="https://i.ibb.co/NnCS39LF/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission.jpg" className='w-14 h-14 rounded-full object-cover'/>
            </div>
            </Link>
        </div>
    </div>
  )
}

export default Navbar;

