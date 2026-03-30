import React from 'react'
import SetUpProfileComponent from './SetUpProfileComponent'

const SetUpProfileLayout = () => {
  return (
    <div>
       <div className="w-4/5 flex flex-col mx-auto items-center mt-4 border shadow-md">
            <SetUpProfileComponent />
       </div>
    </div>
  )
}

export default SetUpProfileLayout
