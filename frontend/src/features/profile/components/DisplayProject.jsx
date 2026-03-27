import {DiGithubBadge} from "react-icons/di";
import {FaLaptopCode} from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";


const DisplayProject = () => {
  return (
    <div>
        <h1 className="ml-[10%] font-bold text-[25px] mt-10">Projects</h1>
        <div className="pb-4">
        <div className="w-4/5 bg-gray-400 mx-auto mt-4 rounded-xl py-2 pb-4">
        <div className="px-5 py-2 flex gap-5 items-center">
            <FaLaptopCode size={60}/>
           <div className="w-3/5 h-30">
             <h2 className="text-2xl font-bold mb-2">DevMatch</h2>
             <p className="line-clamp-4">It is a web application which helps developer to connect with another developer to build something coolIt is a web application which helps developer to connect with another developer to build something coolIt is a web application which helps developer to connect with another developer to build something coolIt is a web application which helps developer to connect with another developer to build something cool</p>
             <div className="flex gap-2 mt-2">
              <p className="font-bold border bg-blue-800 text-white rounded-md w-32 py-1 px-2 flex">Tech Stack<GrFormNextLink size={25} /></p>
              <div className="flex gap-2 flex-wrap">
                {
                  ["React.js","Node.js","Express.js","MongoDB","C++"].map(e =>
                    <p className="border rounded-lg px-3 py-1 bg-gray-300 text-black font-medium text-[16px]">{e}</p>
                  )
                }
             </div>
             </div>
           </div>
           <div className="flex flex-col mx-auto gap-6 items-center mt-5">
              <p className="flex items-center border rounded-full py-1 px-3 bg-blue-700 text-black font-semibold cursor-pointer">Source Code<DiGithubBadge size={35} /></p>
              <p className="flex items-center border rounded-full py-1 px-3 bg-blue-700 text-black font-semibold cursor-pointer">View Project<GrFormNextLink size={35} /></p>
           </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default DisplayProject
