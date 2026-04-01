import React, { useState } from 'react'
import { IoMdSkipForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addProjectApi } from '../services/profileApi';

const SetUpProjectComponent = ({setCurrentStep}) => {
    const dispatch = useDispatch();
    const [projectData,setProjectData] = useState({
        title:"",
        description:"",
        githubLink:"",
        liveLink:"",
        techStack:[]
    });

    const [currTechStack,setCurrTechStack] = useState("");

    const handleChange = (field,e) =>{
        setProjectData({...projectData,
            [field]:e.target.value,
        });
    }

    const handleTechStack = (e) =>{
        setCurrTechStack(e.target.value);
    }

    const handleTechStackKey = (e) =>{
        if(e.key === "Enter" && currTechStack.trim() !== ""){
            setProjectData((prev)=>({
                ...prev,
                techStack:[...prev.techStack,currTechStack.trim()],
            }));
            setCurrTechStack("");
        }
        if(currTechStack === "" && e.key === "Backspace"){
            setProjectData((prev)=>({
                ...prev,
                techStack:prev.techStack.slice(0,-1),
            }))
        }
    }

    const handleSetUpProject = async () =>{
        try{
            const res = await addProjectApi(projectData);
            console.log(res.data);
        }catch(err){
            console.log(err.response);
        }
    }

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
            onChange={(e)=>handleChange("title",e)}
            value={projectData.title}
          />
        </div>

        <div className="flex flex-col items-center w-full">
          <label className="font-bold text-lg mb-2 w-full">
            Description
          </label>
        <textarea 
            className="w-full border-2 h-32 px-3 py-2 focus:border-blue-500 focus:outline-none bg-gray-100  rounded-md resize-none"
            placeholder="Describe the project shortly"
            onChange={(e)=>handleChange("description",e)}
            value={projectData.description} />
        <p className="w-full text-right text-sm text-gray-500 mt-1">
           {projectData.description.length}/500 chars
        </p>
        </div>
        <div className="flex flex-col items-center w-full">
            <label className='font-bold text-lg w-full'>
                Github Link
            </label>
            <input 
                className='w-full border-b-2 border-blue-600 focus:outline-none py-2 px-1'
                placeholder='https://github.com/ragulraj-n/DevMatch'
                onChange={(e)=>handleChange("githubLink",e)}
                value={projectData.githubLink}
            />
        </div>
        <div className="flex flex-col items-center w-full">
            <label className='font-bold text-lg w-full'>
                Demo Link
            </label>
            <input 
                className='w-full border-b-2 border-blue-600 focus:outline-none py-2 px-1'
                placeholder='https://devmatch.com'
                onChange={(e)=>handleChange("liveLink",e)}
                value={projectData.liveLink}
            />
        </div>
        <div className='flex flex-col mt-3'>
            <div className='flex items-center gap-5'>
                <label className='font-bold text-lg'>Tech Stacks</label>
                <input className='border-2 h-10 pl-2 w-1/4 py-1 rounded-md focus:outline-blue-600 bg-gray-50'
                value={currTechStack}
                onChange={handleTechStack}
                onKeyDown={handleTechStackKey}/>
                <p>{projectData.techStack.length}/6</p>
            </div>
            <div className='flex flex-wrap gap-3 mt-6'>
                {
                   projectData.techStack.map((d,index)=><p key={index} className='border px-3 py-1 bg-gray-200 rounded-lg font-semibold'>
                        {d}
                    </p>
                )
                }
            </div>
             <div className="flex justify-end mt-10">
                <div className='flex gap-10 items-center justify-center'>
                    <button className="text-gray-500 font-bold px-3 py-1 text-lg rounded-md flex items-center gap-2">Skip<IoMdSkipForward />
                    </button>
                    <button className="border bg-blue-600 text-white font-bold px-3 py-1 text-lg rounded-md flex    items-center gap-2"
                    onClick={handleSetUpProject}>SAVE
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default SetUpProjectComponent;