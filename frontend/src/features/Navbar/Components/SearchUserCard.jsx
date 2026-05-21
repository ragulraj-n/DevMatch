import React from 'react'

const SearchUserCard = () => {
  return (
    <div className='h-[px] border-2 w-full flex justify-between items-center px-2'>
        <div className='w-1/5'>
            <img src='https://i.ibb.co/NnCS39LF/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission.jpg' className='rounded-full h-12 w-12'/>
        </div>
        <div className='flex justify-start w-full items-center gap-2'>
            <h1 className='font-semibold text-lg whitespace-nowrap'>Mukish Kumar</h1>
            <p className='text-[14px] font-light line-clamp-1'>i am java developer </p>
        </div>
    </div>
  )
}

export default SearchUserCard
