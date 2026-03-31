import React, { useState } from 'react'
import SetUpProfileComponent from './SetUpProfileComponent'
import SetUpProjectComponent from './SetUpProjectComponent';
import StepTracker from './StepTracker ';

const SetUpProfileLayout = () => {
     const [currentStep,setCurrentStep] = useState(1);
     return (
          <div className="w-4/5 flex flex-col mx-auto items-center mt-4 border shadow-md">
               <StepTracker currentStep={currentStep}/>
               {currentStep===1 && <SetUpProfileComponent setCurrentStep={()=>setCurrentStep(2)}/>}
               {currentStep===2 && <SetUpProjectComponent setCurrentStep={()=>setCurrentStep(1)}/>}
          </div>
  )
}

export default SetUpProfileLayout
