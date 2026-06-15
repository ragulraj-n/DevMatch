import React from 'react'
import { FaUser, FaUserCircle, FaCog, FaQuestionCircle } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link } from 'react-router-dom';

const NavProfileCard = ({setShowNavProfile, userLogout}) => {
  return (
    <div className='absolute top-[52px] -right-3 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden z-[100] animate-fade-in-down'>
      <div className='absolute -top-1 right-4 w-3 h-3 bg-white transform rotate-45'></div>
      
      <div className='bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-full bg-white/20 flex items-center justify-center'>
            <FaUserCircle size={32} className='text-white' />
          </div>
          <div>
            <p className='text-white font-semibold text-sm'>My Account</p>
            <p className='text-white/80 text-xs'>Manage your profile</p>
          </div>
        </div>
      </div>
      
      <div className='py-2'>
        <Link to='/profile'>
          <div 
            className='flex items-center gap-3 px-5 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 cursor-pointer group'
            onClick={() => setShowNavProfile()}
          >
            <div className='w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors'>
              <FaUser className='text-blue-600 text-sm' />
            </div>
            <div>
              <p className='font-semibold text-gray-700 group-hover:text-blue-700 transition-colors'>My Profile</p>
              <p className='text-xs text-gray-400'>View and edit your profile</p>
            </div>
          </div>
        </Link>
        
        <Link to='/' className='pointer-events-none'>
          <div 
            className='flex items-center gap-3 px-5 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 cursor-pointer group'
            onClick={() => setShowNavProfile()}
          >
            <div className='w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors'>
              <FaCog className='text-gray-600 text-sm' />
            </div>
            <div>
              <p className='font-semibold text-gray-700 group-hover:text-gray-900 transition-colors'>Settings</p>
              <p className='text-xs text-gray-400'>Privacy and preferences</p>
            </div>
          </div>
        </Link>
        
        <Link to='/help'>
          <div 
            className='flex items-center gap-3 px-5 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 cursor-pointer group'
            onClick={() => setShowNavProfile()}
          >
            <div className='w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors'>
              <FaQuestionCircle className='text-purple-600 text-sm' />
            </div>
            <div>
              <p className='font-semibold text-gray-700 group-hover:text-purple-700 transition-colors'>Help & Support</p>
              <p className='text-xs text-gray-400'>Get help and contact us</p>
            </div>
          </div>
        </Link>
      </div>
      
      <div className='border-t border-gray-100 my-2'></div>
      
      <div className='py-2'>
        <div 
          className='flex items-center gap-3 px-5 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-200 cursor-pointer group'
          onClick={() => {
            setShowNavProfile();
            userLogout();
          }}
        >
          <div className='w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors'>
            <TbLogout className='text-red-600 text-lg' />
          </div>
          <div>
            <p className='font-semibold text-red-600 group-hover:text-red-700 transition-colors'>Logout</p>
            <p className='text-xs text-gray-400'>Sign out of your account</p>
          </div>
        </div>
      </div>
      
      <div className='bg-gray-50 px-5 py-3 border-t border-gray-100'>
        <p className='text-xs text-gray-400 text-center'>DevMatch v1.0.0</p>
      </div>
    </div>
  )
}

export default NavProfileCard