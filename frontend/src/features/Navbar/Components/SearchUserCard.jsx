import React from 'react'
import { Link } from 'react-router-dom';

const SearchUserCard = ({user}) => {
  return (
    <Link to={`/u/${user.userName}`}>
      <div className='hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-200'>
        <div className='px-4 py-3 flex items-center gap-4'>
          <div>
            <img 
              src={user?.profileImage?.imageUrl || "https://i.ibb.co/NnCS39LF/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission.jpg"} 
              className='rounded-full h-12 w-12 object-cover border border-gray-200'
              alt={user?.firstName}
            />
          </div>
          
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 flex-wrap'>
              <h1 className='font-semibold text-gray-800'>
                {user.firstName + " " + user.lastName}
              </h1>
              <span className='text-xs text-gray-400'>@{user.userName}</span>
            </div>
            {user.bio && (
              <p className='text-sm text-gray-500 line-clamp-1 mt-0.5'>
                {user.bio}
              </p>
            )}
            {!user.bio && (
              <p className='text-sm text-gray-400 italic mt-0.5'>No bio yet</p>
            )}
          </div>
          
          <div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SearchUserCard