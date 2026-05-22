import React from 'react'
import { sendConnectionRequest } from '../services/feedApi'
import { Link } from 'react-router-dom';

const FeedCardComponent = ({user,setIndex}) => {

    const handleConnectionButton = async (status) =>{
        const res = await sendConnectionRequest(status,user._id);
        setIndex((prev)=>prev+1);
        console.log(res);
    }

  return (
    <div className='border border-gray-300 shadow-lg rounded-3xl mx-auto w-[60%] p-6 flex gap-10 bg-white hover:shadow-2xl transition-all duration-300'>

      <div className='flex flex-col items-center w-1/4'>
        <img
          src={user?.profileImage?.imageUrl}
          alt="profile"
          className='h-[200px] w-[200px] rounded-full object-cover border-4 border-blue-500'
        />

        <Link to={`/u/${user?.userName}`}>
              <button className='mx-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 mt-4 rounded-xl w-full text-white text-lg font-semibold cursor-pointer transition-all duration-200'>
              View Profile
            </button>
        </Link>
      </div>

      <div className='flex flex-col w-full'>

        <h1 className='font-bold text-3xl text-gray-800'>
          {user?.firstName+" "+user?.lastName}
        </h1>

        <div className='flex items-center gap-3 mt-3 flex-wrap'>
          <p className="flex h-8 items-center py-2 px-4 rounded-2xl bg-blue-100 font-semibold text-blue-700 text-[15px]">
            {user?.experienceLevel}
          </p>

          <p className="flex h-8 items-center py-2 px-4 rounded-2xl bg-green-100 font-semibold text-green-700 text-[15px]">
            {user?.availabilityStatus}
          </p>
        </div>

        <p className='mt-4 text-gray-600 leading-relaxed'>
         {user?.bio}
        </p>

        <div className='mt-5 flex items-start gap-4'>
        <h2 className='text-lg font-bold text-gray-800 min-w-[80px]'>
            Skills
        </h2>

        <div className='flex flex-wrap gap-3'>
           { user?.skills.map((d,index)=>(
                <span className='bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-200' key={index}>
                {d}
                </span>
            ))}
                        
        </div>
        </div>

        <div className='mt-4 flex items-start gap-4'>
        <h2 className='text-lg font-bold text-gray-800 min-w-[80px]'>
            Interests
        </h2>

        <div className='flex flex-wrap gap-3'>
             { user?.interests.map((d,index)=>(
                <span className='bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium border border-purple-200' key={index}>
                {d}
                </span>
            ))}
        </div>
        </div>
                
        <div className='flex gap-6 mt-8 pl-[20%]'>

          <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200'
          onClick={()=>handleConnectionButton("requested")}>
            Connect
          </button>

          <button className='bg-red-100 hover:bg-red-200 text-red-600 px-6 py-3 rounded-xl font-semibold transition-all duration-200'
            onClick={()=>handleConnectionButton("ignored")}
            >
            Ignore
          </button>

        </div>

      </div>
    </div>
  )
}

export default FeedCardComponent