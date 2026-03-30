import React, { useState } from 'react'

const SetUpProjectComponent = () => {

  return (
    <div className='w-full flex flex-col mt-6 px-4 items-center pb-20'>
      
      <p className='text-center text-lg mb-6 max-w-xl'>
        Complete your project details to find the right developers for you
      </p>

      <div className="w-4/5 flex flex-col gap-6">
        <div className='flex flex-col items-center w-full'>
          <label className='font-bold text-lg w-full text-left'>
            Title
          </label>
          <input 
            className='w-full border-b-2 border-blue-600 focus:outline-none py-2 px-1'
            placeholder='Enter project title'
          />
        </div>

        <div className="flex flex-col items-center w-full">
          <label className="font-bold text-lg mb-2 w-full">
            Description
          </label>
        <textarea className="w-full border-2 h-32 px-3 py-2 focus:border-blue-500 focus:outline-none bg-gray-100 rounded-md resize-none"
            placeholder="Describe the project shortly " />
        <p className="w-full text-right text-sm text-gray-500 mt-1">
            /500 chars
        </p>
        </div>
        <div className="flex flex-col items-center w-full">
            <label className='font-bold text-lg w-full'>
                Github Link
            </label>
            <input 
                className='w-full border-b-2 border-blue-600 focus:outline-none py-2 px-1'
                placeholder='https://github.com/ragulraj-n/DevMatch'
            />
        </div>
        <div className="flex flex-col items-center w-full">
            <label className='font-bold text-lg w-full'>
                Demo Link
            </label>
            <input 
                className='w-full border-b-2 border-blue-600 focus:outline-none py-2 px-1'
                placeholder='https://devmatch.com'
            />
        </div>
        <div className='flex flex-col mt-3'>
            <div className='flex items-center gap-5'>
                <label className='font-bold text-lg'>Tech Stacks</label>
                <input className='border-2 h-10 pl-2 w-1/4 py-1 rounded-md focus:outline-blue-600 bg-gray-50' />
            </div>
            <div className='flex flex-wrap gap-3 mt-6'>
                {
                    ["React.js","Node.js","MongoDB"].map((d)=><p className='border px-3 py-1 bg-gray-200 rounded-lg font-semibold'>
                        {d}
                    </p>)
                }
            </div>
        </div>

      </div>
    </div>
  )
}

export default SetUpProjectComponent