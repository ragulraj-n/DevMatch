import React, { useEffect, useState } from "react";
import { DiCode, DiGithubBadge} from "react-icons/di";
import { TbWorld, TbMapPin } from "react-icons/tb";
import { FaLinkedin, FaLink } from "react-icons/fa";
import { FaUserPlus, FaCheck, FaSpinner, FaComment } from "react-icons/fa6";
import DisplayProject from "./DisplayProject";
import { DEFAULT_PROFILE_IMG } from "../constant";
import { getUserProfileApi } from "../services/profileApi";
import { sendConnectionRequestApi } from '../../connection/services/userConnectionApi'
import { fetchAllConnectionData } from "../../connection/connectionActions";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from 'react-hot-toast';

const UserProfile = () => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.user.currentUser);
  const connections = useSelector((state) => state.connection.connections);
  const pendingRequests = useSelector((state) => state.connection.pendingRequests);
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sendingRequest, setSendingRequest] = useState(false);
  const { userName } = useParams();

  const isOwnProfile = !userName || currUser?.userName === userName;
  const isConnected = connections.some(conn => conn._id === user?._id);
  const isRequestSent = pendingRequests.some(req => req._id === user?._id);

  useEffect(() => {
    const fetchProfile = async () => {
        if (!userName) {
            setUser(currUser);
            setLoading(false);
            return;
        } 

        if (currUser?.userName === userName) {
            setUser(currUser);
            setLoading(false);
            return;
        }
        
        try{
            setLoading(true);
            const tempuser = await getUserProfileApi(userName);
            setUser(tempuser);
        }catch(err){
            console.log(err);
            toast.error(err.response?.data?.message || "Failed to load profile");
        }finally{
            setLoading(false);
        }
    };

    fetchProfile();
  }, [userName, currUser]);

  const handleSendConnectionRequest = async () => {
    try{
      setSendingRequest(true);
      await sendConnectionRequestApi("requested", user._id);
      await dispatch(fetchAllConnectionData());
      toast.success("Connection request sent");
    }catch(err){
      if(err?.response?.data?.errorCode === "CONNECTION_REQUEST_ALREADY_SENT") {
        toast.success("Connection sent already");
      } else {
        toast.error("Unable to send Request");
      }
    }finally{
      setSendingRequest(false);
    }
  };

  const handleSendMessage = () => {
    toast.success("Message feature coming soon!");
  };

  const renderActionButton = () => {
    if (isOwnProfile) return null;
    
    if (isConnected) {
      return (
        <button 
          className='px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md flex items-center gap-2'
          onClick={handleSendMessage}
        >
          <FaComment />
          Message
        </button>
      );
    }
    
    if (isRequestSent) {
      return (
        <button 
          className='px-8 py-3 bg-gray-400 text-white rounded-xl font-semibold flex items-center gap-2 cursor-not-allowed'
          disabled={true}
        >
          <FaCheck />
          Request Sent
        </button>
      );
    }
    
    return (
      <button 
        className='px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md flex items-center gap-2 disabled:opacity-50'
        onClick={handleSendConnectionRequest}
        disabled={sendingRequest}
      >
        {sendingRequest ? <FaSpinner className='animate-spin' /> : <FaUserPlus />}
        Connect
      </button>
    );
  };

  if(loading){
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
        <div className='flex flex-col justify-center items-center h-screen'>
          <div className='relative'>
            <div className='animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600'></div>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='h-8 w-8 bg-blue-600 rounded-full animate-pulse'></div>
            </div>
          </div>
          <p className='mt-6 text-gray-700 font-semibold text-lg'>Loading profile...</p>
        </div>
      </div>
    )
  }

  if(!user){
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
        <div className='flex flex-col justify-center items-center h-screen px-4'>
          <div className='bg-white rounded-2xl shadow-xl p-8 max-w-md text-center'>
            <div className='inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-red-100 to-orange-100 mb-6'>
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-gray-800 mb-3'>User Not Found</h2>
            <p className='text-gray-600'>The profile you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      <div className='container mx-auto px-4 py-8 w-4/5'>
        
        <div className='bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl'>
          <div className='relative'>
            <div className='h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'></div>
            <div className='absolute -bottom-16 left-8 md:left-12'>
              <div className='relative'>
                <div className='absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-md opacity-75'></div>
                <img 
                  className='relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover bg-white' 
                  src={user?.profileImage?.imageUrl || DEFAULT_PROFILE_IMG} 
                  alt={user?.firstName}
                />
              </div>
            </div>
          </div>

          <div className='pt-20 pb-8 px-8 md:px-12'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
              <div>
                <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                  {user?.firstName + " " + user?.lastName}
                </h1>
                <p className='text-gray-500 mt-1 text-lg'>@{user?.userName}</p>
              </div>
              
              {currUser && renderActionButton()}
            </div>

            <div className='flex flex-wrap gap-3 mb-6'>
              {user?.experienceLevel && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                  <DiCode size={18} />
                  {user?.experienceLevel}
                </span>
              )}
              
              {user?.availabilityStatus && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                  <TbWorld size={18} />
                  {user?.availabilityStatus?.replace('_', ' ')}
                </span>
              )}
              
              {user?.location && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm">
                  <TbMapPin size={18} />
                  {user?.location}
                </span>
              )}
            </div>

            <div className='flex flex-wrap gap-6 mb-8 pb-6 border-b border-gray-200'>
              {user?.github && (
                <a href={user?.github} target="_blank" rel="noopener noreferrer" 
                  className='flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors'>
                  <DiGithubBadge size={28} />
                  <span className='text-sm font-medium'>GitHub</span>
                </a>
              )}
              
              {user?.linkedin && (
                <a href={user?.linkedin} target="_blank" rel="noopener noreferrer" 
                  className='flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors'>
                  <FaLinkedin size={24} />
                  <span className='text-sm font-medium'>LinkedIn</span>
                </a>
              )}
              
              {user?.portfolio && (
                <a href={user?.portfolio} target="_blank" rel="noopener noreferrer" 
                  className='flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors'>
                  <FaLink size={22} />
                  <span className='text-sm font-medium'>Portfolio</span>
                </a>
              )}
            </div>

            <div className='space-y-6'>
              {user?.bio && (
                <div>
                  <h2 className='text-xl font-bold text-gray-800 mb-3 flex items-center gap-2'>
                    <span className='w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full'></span>
                    About
                  </h2>
                  <p className='text-gray-700 leading-relaxed'>
                    {user?.bio}
                  </p>
                </div>
              )}

              {user?.skills && user?.skills.length > 0 && (
                <div>
                  <h2 className='text-xl font-bold text-gray-800 mb-3 flex items-center gap-2'>
                    <span className='w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full'></span>
                    Skills
                  </h2>
                  <div className='flex flex-wrap gap-2'>
                    {user?.skills.map((e, index) => (
                      <span className='bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-200 hover:shadow-md transition-all' key={index}>
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {user?.interests && user?.interests.length > 0 && (
                <div>
                  <h2 className='text-xl font-bold text-gray-800 mb-3 flex items-center gap-2'>
                    <span className='w-1 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full'></span>
                    Interests
                  </h2>
                  <div className='flex flex-wrap gap-2'>
                    {user?.interests.map((e, index) => (
                      <span className='bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium border border-purple-200 hover:shadow-md transition-all' key={index}>
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {user?.projects && user?.projects.length > 0 && (
          <DisplayProject projects={user?.projects}/>
        )}
      </div>
    </div>
  );
};

export default UserProfile;