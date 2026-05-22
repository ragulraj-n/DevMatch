import React from 'react'
import { Link } from 'react-router-dom';

const SearchUserCard = ({user}) => {
  return (
    <Link to={`/u/${user.userName}`}>
      <div className='h-[px] w-full flex justify-between items-center px-2'>
          <div className='w-1/5'>
              <img src={user?.profileImage?.imageUrl || "https://i.ibb.co/NnCS39LF/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission.jpg"} className='rounded-full h-11 w-11'/>
          </div>
          <div className='flex justify-start w-full items-center gap-2'>
              <h1 className='font-semibold text-lg whitespace-nowrap'>{user.firstName + " " + user.lastName}</h1>
              <p className='text-[14px] font-light line-clamp-1'>{user.bio}</p>
          </div>
      </div>
    </Link>
  )
}

export default SearchUserCard;
