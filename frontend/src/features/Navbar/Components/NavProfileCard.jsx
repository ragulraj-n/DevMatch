import React from 'react'
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { Link } from 'react-router-dom';

const NavProfileCard = ({setShowNavProfile}) => {
  return (
    <div className='absolute top-[52px] -right-7 w-40 border-2 mr-2 flex flex-col justify-center items-center font-semibold text-md shadow-lg py-2 bg-gray-200 rounded-md z-[100]'>
        <Link to='/profile'><p className='flex items-center gap-2 cursor-pointer'
        onClick={()=>setShowNavProfile()}><FaUser />Profile</p></Link>
        <div className='h-[1px] w-2/3 my-2 bg-gray-600 mx-auto'></div>
        <p className='flex items-center gap-2'><TbLogout size={22} />logout</p>
    </div>
  )
}

export default NavProfileCard
