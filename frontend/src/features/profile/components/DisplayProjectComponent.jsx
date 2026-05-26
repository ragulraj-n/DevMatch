import React, { useState } from 'react'
import { DiGithubBadge } from "react-icons/di";
import { FaLaptopCode, FaExternalLinkAlt } from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";
import { HiOutlineCode } from "react-icons/hi";

const DisplayProjectComponent = ({project}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const description = project?.description || "";
  const shouldTruncate = description.length > 150;
  const displayDescription = showFullDescription ? description : description.slice(0, 150);

  return (
    <div className="group relative max-w-5xl mx-4 md:mx-auto mb-6">
      <div className='absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500'></div>
      
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        
        <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'></div>
        
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            
            <div className='hidden md:flex items-start justify-center'>
              <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg'>
                <FaLaptopCode size={32} className="text-white" />
              </div>
            </div>

            <div className="flex-1">
              <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4'>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {project?.title}
                </h2>
                
                <div className='flex gap-3'>
                  {project?.githubLink && (
                    <a href={project?.githubLink} target='_blank' rel="noopener noreferrer" 
                      className='flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-xl transition-all duration-200 transform hover:scale-105 text-sm font-medium shadow-md'>
                      <DiGithubBadge size={20} />
                      Code
                    </a>
                  )}
                  
                  {project?.liveLink && (
                    <a href={project?.liveLink} target='_blank' rel="noopener noreferrer"
                      className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 text-sm font-medium shadow-md'>
                      <FaExternalLinkAlt size={14} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-4">
                {displayDescription}
                {shouldTruncate && !showFullDescription && (
                  <button 
                    onClick={() => setShowFullDescription(true)}
                    className='text-blue-600 hover:text-blue-700 font-medium ml-2'
                  >
                    ...read more
                  </button>
                )}
                {showFullDescription && (
                  <button 
                    onClick={() => setShowFullDescription(false)}
                    className='text-blue-600 hover:text-blue-700 font-medium ml-2'
                  >
                    show less
                  </button>
                )}
              </p>

              <div>
                <div className='flex items-center gap-2 mb-3'>
                  <HiOutlineCode className='text-blue-600' size={18} />
                  <h3 className='font-semibold text-gray-700'>Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project?.techStack?.map((tech, index) => (
                    <span 
                      key={index}
                      className='bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayProjectComponent