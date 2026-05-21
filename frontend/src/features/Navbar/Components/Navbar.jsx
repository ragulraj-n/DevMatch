import React, { useEffect, useState } from 'react'
import { FaUsers } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { Link } from 'react-router-dom';
import { getCurUserProfile } from '../services/navbarApi';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../user/userSlice';
import SearchSuggestion from './SearchSuggestion';

const Navbar = () => {

    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    if (user) dispatch(addUser(user));
    const userData = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getCurUserProfile();
            setUser(data);
        }
        fetchUserData();
    }, []);

    const navItemsStyle =
        "w-12 sm:w-14 h-[44px] flex flex-col items-center justify-center cursor-pointer";

    return (
        <div className='h-auto min-h-16 border-2 flex flex-col md:flex-row items-center justify-between gap-4 px-3 py-2 bg-gray-100'>

            <div className='flex items-center justify-betwee md:justify-start gap-4 sm:gap-6 w-full md:w-1/2'>

                <Link to="/feed">
                    <h1 className='font-bold text-lg sm:text-2xl shadow-md px-3 py-2 rounded-sm whitespace-nowrap'>
                        DevMatch
                    </h1>
                </Link>

                <div className='w-full'>
                    <input
                    className='border-2 h-10 w-40 md:w-64 focus:w-56 md:focus:w-96 px-3 rounded-3xl outline-none bg-gray-50'
                    placeholder='Search Users'
                />
                </div>
            </div>

            <div className='flex items-center justify-around w-full md:w-1/3 gap-2 sm:gap-5 px-2 sm:px-6 md:px-10'>

                <Link to="/feed">
                    <div className={navItemsStyle}>
                        <IoHomeSharp size={24} className='sm:w-[30px] sm:h-[30px]' />
                        <p className='text-[10px] sm:text-xs'>Home</p>
                    </div>
                </Link>

                <div className={navItemsStyle}>
                    <FaUsers size={24} className='sm:w-[30px] sm:h-[30px]' />
                    <p className='text-[10px] sm:text-xs'>Connection</p>
                </div>

                <div className={navItemsStyle}>
                    <IoMdNotifications size={24} className='sm:w-[30px] sm:h-[30px]' />
                    <p className='text-[10px] sm:text-xs'>Notification</p>
                </div>

                <Link to="profile">
                    <div className={navItemsStyle + " mb-1"}>
                        <img
                            src={userData?.profileImage?.imageUrl}
                            className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover'
                        />
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Navbar;