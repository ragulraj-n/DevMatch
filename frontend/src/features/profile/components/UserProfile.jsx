import React from 'react'

const UserProfile = () => {
  return (
    <div className='flex m-1'>
        <div className='border w-[20%] h-screen shadow-md fixed'>
          <img src="https://m.media-amazon.com/images/I/71Zg6RRQzsL._AC_UF894,1000_QL80_.jpg" alt="" className='w-[95%] mx-auto mt-2 h-[300px]'/>
          <div className='flex flex-col ml-5 mt-2'>
              <h3 className='font-semibold text-lg'>@username6</h3>
              <p>Github</p>
              <p>LinkedIn</p>
              <p>Portfolio</p>
          </div>
        </div>
        <div className='ml-[20%] flex flex-col items-start pl-3 pt-5 w-full mr-10'>
            <div className='h-screen w-full'>
              <div className='fixed'>
                 <h1 className='font-semibold text-3xl'>Ragul Raj N</h1>
                 <h3 className='text-sm'>coimbatore</h3>
              </div>
              <div className='mt-[8%] border h-1/3 w-full text-xl p-4'>
                Driven Software Developer eager to turn complex problems into elegant solutions. Proficient in JavaScript, React, and Python, with a strong foundation in computer science principles. Quick learner focused on building high-quality, user-friendly applications. Ready to contribute and grow within a collaborative tech team.
              </div>
              <div className='border h-1/6 mt-10'>
                  Skills: 
              </div>
              <div className='border h-1/6 mt-10'>
                  Interests: 
              </div>
            </div>
        </div>
    </div>
  )
}

export default UserProfile
