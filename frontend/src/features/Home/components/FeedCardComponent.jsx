import React from 'react'
import { sendConnectionRequest } from '../services/feedApi'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const FeedCardComponent = ({user, setIndex, userFeedLength}) => {

    const handleConnectionButton = async (status) => {
        if(!user?._id){
            toast.error("User information not found");
            return;
        }
        
        try{
            const res = await sendConnectionRequest(status, user._id);
            toast.success(status === "requested" ? "Connection request sent!" : "Profile ignored");
            setIndex((prev) => {
                if(prev >= userFeedLength - 1) return prev;
                return prev + 1;
            });
            console.log(res);
        }catch(err){
            console.log(err);
            toast.error(err.response?.data?.message || "Failed to process request");
        }
    }

    if(!user){
        return (
            <div className='flex justify-center items-center h-screen'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4'></div>
                    <p className='text-gray-600'>Loading profile...</p>
                </div>
            </div>
        )
    }

  return (
    <div className='group relative max-w-5xl mx-4 md:mx-auto'>
      <div className='absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500'></div>
      
      <div className='relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]'>
        
        <div className='absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'></div>
        
        <div className='flex flex-col md:flex-row gap-8 p-6 md:p-8'>
          
          <div className='flex flex-col items-center md:w-1/3'>
            <div className='relative'>
              <div className='absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-md opacity-75'></div>
              <img
                src={user?.profileImage?.imageUrl || "https://i.ibb.co/NnCS39LF/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission.jpg"}
                alt="profile"
                className='relative h-[200px] w-[200px] rounded-full object-cover border-4 border-white shadow-xl'
              />
            </div>

            <Link to={`/u/${user?.userName}`} className='w-4/5 mt-6'>
              <button className='w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl text-white font-semibold transition-all duration-200 transform hover:scale-105 shadow-md'>
                View Full Profile
              </button>
            </Link>
          </div>

          <div className='flex-1 space-y-5'>
            
            <div>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                {user?.firstName + " " + user?.lastName}
              </h1>
              <p className='text-gray-500 mt-1'>@{user?.userName}</p>
            </div>

            <div className='flex flex-wrap gap-3'>
              {user?.experienceLevel && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  {user?.experienceLevel}
                </span>
              )}

              {user?.availabilityStatus && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {user?.availabilityStatus?.replace('_', ' ')}
                </span>
              )}
              
              {user?.location && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {user?.location}
                </span>
              )}
            </div>

            {user?.bio && (
              <div>
                <p className='text-gray-700 leading-relaxed line-clamp-3'>
                  {user?.bio}
                </p>
              </div>
            )}

            {user?.skills && user?.skills.length > 0 && (
              <div>
                <h2 className='text-lg font-bold text-gray-800 mb-3 flex items-center gap-2'>
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                  Skills
                </h2>
                <div className='flex flex-wrap gap-2'>
                  {user?.skills.slice(0, 6).map((d, index) => (
                    <span className='bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-200 hover:shadow-md transition-all' key={index}>
                      {d}
                    </span>
                  ))}
                  {user?.skills.length > 6 && (
                    <span className='bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-semibold'>
                      +{user?.skills.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {user?.interests && user?.interests.length > 0 && (
              <div>
                <h2 className='text-lg font-bold text-gray-800 mb-3 flex items-center gap-2'>
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  Interests
                </h2>
                <div className='flex flex-wrap gap-2'>
                  {user?.interests.slice(0, 6).map((d, index) => (
                    <span className='bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium border border-purple-200 hover:shadow-md transition-all' key={index}>
                      {d}
                    </span>
                  ))}
                  {user?.interests.length > 6 && (
                    <span className='bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium'>
                      +{user?.interests.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            )}
                
            <div className='flex gap-4 pt-4'>
              <button 
                className='flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-md'
                onClick={()=>handleConnectionButton("requested")}
              >
                <span className='flex items-center justify-center gap-2'>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                  </svg>
                  Connect
                </span>
              </button>

              <button 
                className='flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200 border border-gray-300'
                onClick={()=>handleConnectionButton("ignored")}
              >
                <span className='flex items-center justify-center gap-2'>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Ignore
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedCardComponent