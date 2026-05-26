import React, { useState } from 'react'
import { IoMdSkipForward } from "react-icons/io";
import { useDispatch, useSelector} from "react-redux";
import { addProjectApi } from '../services/profileApi';
import { addUser } from "../../user/userSlice";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SetUpProjectComponent = ({setCurrentStep}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [projectData, setProjectData] = useState({
        title:"",
        description:"",
        githubLink:"",
        liveLink:"",
        techStack:[]
    });

    const [currTechStack, setCurrTechStack] = useState("");

    const handleChange = (field, e) => {
        setProjectData({
            ...projectData,
            [field]: e.target.value,
        });
    }

    const handleTechStack = (e) => {
        setCurrTechStack(e.target.value);
    }

    const handleTechStackKey = (e) => {
        if(e.key === "Enter" && currTechStack.trim() !== ""){
            if(projectData.techStack.length >= 10){
                toast.error("Maximum 10 technologies allowed per project");
                return;
            }
            if(currTechStack.trim().length < 2){
                toast.error("Technology name must be at least 2 characters");
                return;
            }
            setProjectData((prev)=>({
                ...prev,
                techStack: [...prev.techStack, currTechStack.trim()],
            }));
            setCurrTechStack("");
        }
    }

    const handleTechStackDelete = (index) => {
        setProjectData((prev) =>({
            ...prev,
            techStack: prev.techStack.filter((_, i) => i !== index),
        }));
        toast.success("Technology removed");
    }

    const validateProjectData = () => {
        const errors = {};
        
        if(!projectData.title.trim()){
            errors.title = "Project title is required";
        } else if(projectData.title.length < 3){
            errors.title = "Title must be at least 3 characters";
        } else if(projectData.title.length > 100){
            errors.title = "Title must be less than 100 characters";
        }
        
        if(!projectData.description.trim()){
            errors.description = "Project description is required";
        } else if(projectData.description.length < 20){
            errors.description = "Description must be at least 20 characters";
        } else if(projectData.description.length > 1000){
            errors.description = "Description must be less than 1000 characters";
        }
        
        if(projectData.githubLink.trim()){
            const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+(\/[a-zA-Z0-9-]+)?(\/)?$/;
            if(!githubRegex.test(projectData.githubLink.trim())){
                errors.githubLink = "Please enter a valid GitHub repository URL";
            }
        }
        
        if(projectData.liveLink.trim()){
            const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            if(!urlRegex.test(projectData.liveLink.trim())){
                errors.liveLink = "Please enter a valid URL (e.g., https://example.com)";
            }
        }
        
        if(projectData.techStack.length === 0){
            errors.techStack = "Add at least one technology";
        }
        
        if(Object.keys(errors).length > 0){
            Object.values(errors).forEach(err => toast.error(err));
            return false;
        }
        return true;
    }

    const handleSetUpProject = async () => {
        if(!validateProjectData()) return;
        
        try{
            setIsLoading(true);
            const res = await addProjectApi(projectData);
            dispatch(addUser(res?.data?.data));
            toast.success("Project added successfully! Redirecting to Home...");
            setTimeout(() => {
                navigate("/feed");
            }, 1500);
        }catch(err){
            console.log(err);
            const errorMessage = err.response?.data?.message || "Failed to add project";
            toast.error(errorMessage);
            setIsLoading(false);
        }
    }

    const handleSkip = () => {
        toast.success("You can add projects later from your profile");
        navigate("/feed");
    }

    const handleBack = () => {
        setCurrentStep();
    }

  return (
    <div className='w-full flex flex-col mt-6 px-4 items-center pb-20'>
      
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-2'>
          Showcase Your Work
        </h2>
        <p className='text-gray-600 max-w-xl mx-auto'>
          Complete your project details to find the right developers for you
        </p>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div className='flex flex-col'>
          <label className='font-bold text-lg text-gray-700 mb-2'>
            Project Title <span className='text-red-500'>*</span>
          </label>
          <input 
            className='w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl py-3 px-4 focus:outline-none bg-gray-50 transition-all duration-200'
            placeholder='Enter project title (e.g., DevMatch Platform)'
            onChange={(e)=>handleChange("title",e)}
            value={projectData.title}
            maxLength={100}
          />
          <div className='flex justify-between mt-1'>
            <p className='text-xs text-gray-500'>3-100 characters</p>
            <p className='text-xs text-gray-500'>{projectData.title.length}/100</p>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-bold text-lg text-gray-700 mb-2">
            Description <span className='text-red-500'>*</span>
          </label>
          <textarea 
            className="w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl h-32 px-4 py-3 focus:outline-none bg-gray-50 transition-all duration-200 resize-none"
            placeholder="Describe your project - what problem it solves, key features, technologies used..."
            onChange={(e)=>handleChange("description",e)}
            value={projectData.description}
            maxLength={1000}
          />
          <div className='flex justify-between mt-1'>
            <p className='text-xs text-gray-500'>20-1000 characters</p>
            <p className='text-xs text-gray-500'>{projectData.description.length}/1000</p>
          </div>
        </div>

        <div className="flex flex-col">
          <label className='font-bold text-lg text-gray-700 mb-2'>
            GitHub Repository
          </label>
          <input 
            className='w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl py-3 px-4 focus:outline-none bg-gray-50 transition-all duration-200'
            placeholder='https://github.com/username/project-name'
            onChange={(e)=>handleChange("githubLink",e)}
            value={projectData.githubLink}
          />
          <p className='text-xs text-gray-500 mt-1'>Optional: Link to your source code</p>
        </div>

        <div className="flex flex-col">
          <label className='font-bold text-lg text-gray-700 mb-2'>
            Live Demo URL
          </label>
          <input 
            className='w-full border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl py-3 px-4 focus:outline-none bg-gray-50 transition-all duration-200'
            placeholder='https://your-project-demo.com'
            onChange={(e)=>handleChange("liveLink",e)}
            value={projectData.liveLink}
          />
          <p className='text-xs text-gray-500 mt-1'>Optional: Where can people see your project in action?</p>
        </div>

        <div className='flex flex-col'>
          <label className='font-bold text-lg text-gray-700 mb-2'>
            Tech Stack <span className='text-red-500'>*</span>
          </label>
          <div className='flex flex-wrap gap-2 p-3 border-2 border-gray-300 rounded-xl min-h-[80px] bg-gray-50'>
            {projectData.techStack.map((tech, index) => (
              <span key={index} className='inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold'>
                {tech}
                <MdDelete 
                  className='cursor-pointer hover:text-red-600 transition-colors ml-1' 
                  size={16}
                  onClick={() => handleTechStackDelete(index)}
                />
              </span>
            ))}
            <input 
              className='flex-1 min-w-[150px] focus:outline-none bg-transparent px-2'
              placeholder={projectData.techStack.length === 0 ? "Type technology and press Enter (e.g., React, Node.js)" : "Add more technologies..."}
              value={currTechStack}
              onChange={handleTechStack}
              onKeyDown={handleTechStackKey}
              disabled={projectData.techStack.length >= 10}
            />
          </div>
          <div className='flex justify-between mt-1'>
            <p className='text-xs text-gray-500'>Press Enter to add technology</p>
            <p className='text-xs text-gray-500'>{projectData.techStack.length}/10 technologies</p>
          </div>
        </div>

        <div className="flex justify-between mt-10 gap-4">
          <button 
            className="border-2 border-gray-400 text-gray-700 font-bold px-6 py-3 text-lg rounded-xl hover:bg-gray-100 transition-all duration-200"
            onClick={handleBack}
          >
            ← Back
          </button>
          
          <div className='flex gap-4'>
            <button 
              className="text-gray-500 font-bold px-6 py-3 text-lg rounded-xl hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
              onClick={handleSkip}
            >
              Skip <IoMdSkipForward size={20} />
            </button>
            
            <button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3 text-lg rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              onClick={handleSetUpProject}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save & Go to Home"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetUpProjectComponent