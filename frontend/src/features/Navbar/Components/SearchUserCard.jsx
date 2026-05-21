import React from 'react'

const SearchUserCard = ({user}) => {
  return (
    <div className='h-[px] border-2 w-full flex justify-between items-center px-2'>
        <div className='w-1/5'>
            <img src={user?.profileImage?.imageUrl || "https://i.ibb.co/NnCS39LF/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission.jpg"} className='rounded-full h-11 w-11'/>
        </div>
        <div className='flex justify-start w-full items-center gap-2'>
            <h1 className='font-semibold text-lg whitespace-nowrap'>{user.firstName + " " + user.lastName}</h1>
            <p className='text-[14px] font-light line-clamp-1'>{user.bio}</p>
        </div>
    </div>
  )
}

export default SearchUserCard
