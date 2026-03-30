import React, { useState } from 'react'
import SetUpProfileComponent from './SetUpProfileComponent'
import SetUpProjectComponent from './SetUpProjectComponent';

const SetUpProfileLayout = () => {
    const [currPosition,setCurrPosition] = useState(2);
  return (
       <div className="w-4/5 flex flex-col mx-auto items-center mt-4 border shadow-md">
            {currPosition===1 && <SetUpProfileComponent />}
            {currPosition===2 && <SetUpProjectComponent />}
       </div>
  )
}

export default SetUpProfileLayout
