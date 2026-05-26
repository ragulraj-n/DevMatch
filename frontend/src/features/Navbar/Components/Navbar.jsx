import React, { useEffect, useState, useRef } from 'react'
import { FaUsers, FaUserFriends } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { IoMdNotifications, IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { getCurUserProfile, logoutUserApi } from '../services/navbarApi';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../../user/userSlice';
import SearchSuggestion from './SearchSuggestion';
import NavProfileCard from './NavProfileCard';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [showNavProfile, setShowNavProfile] = useState(false);
    const [hasNotifications, setHasNotifications] = useState(false);
    const navigate = useNavigate();
    const profileRef = useRef(null);
    const searchRef = useRef(null);

    const userData = useSelector((state) => state.user.currentUser);
    const isLoggedIn = !!userData || !!user; 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const data = await getCurUserProfile();
                if (data) {
                    setUser(data);
                    dispatch(addUser(data));
                }
            } catch (error) {
                console.log("Not authenticated - showing public navbar");
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        fetchUserData();
    }, []); 

    useEffect(() => {
        if (user) {
            dispatch(addUser(user));
        }
    }, [user, dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowNavProfile(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setTimeout(() => setShowSuggestion(false), 200);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const userLogout = async () => {
        try {
            await logoutUserApi();
            setUser(null);
            dispatch(removeUser());
            toast.success("Logged out successfully");
            navigate('/login');
        } catch (error) {
            console.log("Logout failed:", error);
            toast.error("Logout failed");
        }
    }

    const navItemsStyle = "relative group flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105";
    const iconStyle = "w-6 h-6 sm:w-7 sm:h-7";
    const labelStyle = "text-[10px] sm:text-xs mt-1 font-medium";

    if (loading) {
        return (
            <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 shadow-lg border-b border-white/20">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            DevMatch
                        </h1>
                        <div className="w-20 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                    </div>
                </div>
            </nav>
        )
    }

    if (!isLoggedIn) {
        return (
            <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 shadow-lg border-b border-white/20">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <Link to="/">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                DevMatch
                            </h1>
                        </Link>
                        
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <button className="px-5 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-xl transition-all duration-200">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 shadow-lg border-b border-white/20">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <Link to="/feed">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">
                                DevMatch
                            </h1>
                        </Link>

                        <div className="relative flex-1 md:w-80" ref={searchRef}>
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                                <input
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white/50 backdrop-blur-sm transition-all duration-200"
                                    placeholder="Search developers..."
                                    onChange={(e) => setSearch(e.target.value)}
                                    onFocus={() => setShowSuggestion(true)}
                                    value={search}
                                />
                            </div>
                            {showSuggestion && search.length >= 2 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                                    <SearchSuggestion search={search} showSuggestion={showSuggestion} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-around w-full md:w-auto gap-4 sm:gap-6">
                        <Link to="/feed">
                            <div className={navItemsStyle}>
                                <IoHomeSharp className={iconStyle + " text-gray-600 group-hover:text-blue-600 transition-colors"} />
                                <p className={labelStyle + " text-gray-600 group-hover:text-blue-600 transition-colors"}>Home</p>
                            </div>
                        </Link>

                        <Link to="/connections">
                            <div className={navItemsStyle}>
                                <FaUserFriends className={iconStyle + " text-gray-600 group-hover:text-blue-600 transition-colors"} />
                                <p className={labelStyle + " text-gray-600 group-hover:text-blue-600 transition-colors"}>Connections</p>
                            </div>
                        </Link>

                        <Link to="/notifications">
                            <div className={navItemsStyle + " relative"}>
                                {hasNotifications && (
                                    <span className="absolute -top-1 -right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                                )}
                                {hasNotifications ? (
                                    <IoMdNotifications className={iconStyle + " text-red-500"} />
                                ) : (
                                    <IoMdNotificationsOutline className={iconStyle + " text-gray-600 group-hover:text-blue-600 transition-colors"} />
                                )}
                                <p className={labelStyle + " text-gray-600 group-hover:text-blue-600 transition-colors"}>Notifications</p>
                            </div>
                        </Link>

                        <div className={navItemsStyle + " relative"} ref={profileRef}>
                            <img
                                src={userData?.profileImage?.imageUrl || user?.profileImage?.imageUrl || "https://i.ibb.co/NnCS39LF/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission.jpg"}
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-md hover:border-blue-500 transition-all duration-200"
                                onClick={() => setShowNavProfile(prev => !prev)}
                                alt="Profile"
                            />
                            {showNavProfile && <NavProfileCard setShowNavProfile={() => setShowNavProfile(false)} userLogout={userLogout} />}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar