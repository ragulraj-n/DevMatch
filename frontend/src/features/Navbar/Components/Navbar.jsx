import React, { useEffect, useState , useRef } from 'react'
import { FaUsers } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { Link } from 'react-router-dom';
import { getCurUserProfile } from '../services/navbarApi';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../user/userSlice';
import SearchSuggestion from './SearchSuggestion';
import NavProfileCard from './NavProfileCard';

const Navbar = () => {

    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const [search,setSearch] = useState("");
    const [showSuggestion,setShowSuggestion] = useState(false);
    const [showNavProfile,setShowNavProfile] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        if(user){
            dispatch(addUser(user));
        }
    }, [user, dispatch]);

    const userData = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getCurUserProfile();
            setUser(data);
        }
        fetchUserData();
    }, []);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowNavProfile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);


    const navItemsStyle =
        "w-12 sm:w-14 h-[44px] flex flex-col items-center justify-center cursor-pointer";

    return (
    <div className='relative border-b bg-gray-100'>

        <div className='absolute top-16 left-0 md:left-44 w-full md:w-[383px] z-50 bg-gray-50'>
            <SearchSuggestion search={search} showSuggestion={showSuggestion}/>
        </div>

        <div className='flex flex-col md:flex-row items-center justify-between gap-4 px-3 py-2'>
            <div className='flex items-center gap-4 sm:gap-6 w-full md:w-auto'>
                <Link to="/feed">
                    <h1 className='font-bold text-lg sm:text-2xl shadow-md px-3 py-2 rounded-sm whitespace-nowrap'>
                        DevMatch
                    </h1>
                </Link>

                <input
                    className='border-2 h-10 w-full md:w-64 focus:w-full md:focus:w-96 px-3 rounded-3xl outline-none bg-gray-50 transition-all duration-300'
                    placeholder='Search Users'
                    onChange={(e)=>setSearch(e.target.value)}
                    onFocus={()=>setShowSuggestion(true)}
                    onBlur={()=>setTimeout(()=>setShowSuggestion(false),300)}
                />
            </div>

            <div className='flex items-center justify-around w-full md:w-auto gap-4 sm:gap-5 px-2'>

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

                <div className={navItemsStyle + ' relative'}
                ref={profileRef}>
                    <img
                        src={userData?.profileImage?.imageUrl}
                        className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover'
                        onClick={()=>setShowNavProfile(prev => !prev)}
                    />
                   {showNavProfile && <NavProfileCard setShowNavProfile={()=>setShowNavProfile(false)} />}
                </div>
            </div>
        </div>
    </div>
)
}

export default Navbar;