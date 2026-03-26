import React, { useState } from "react";
import { DiCode, DiGithubBadge} from "react-icons/di";
import { TbWorld } from "react-icons/tb";
import { FaLinkedin, FaLink, FaLaptopCode} from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";
import { FaUserPlus } from "react-icons/fa6";


const UserProfile = () => {

  return (
    <div className="flex flex-col min-h-screen h-screen">
      <div className="w-4/5 bg-gray-400 mx-auto mt-16 rounded-3xl pb-10 flex">
        <div className="w-[28%] pl-14">
          <img className="w-52 mt-10 border-4 border-blue-700 rounded-full" src="https://api.dicebear.com/7.x/avataaars/svg?seed=alex_dev&backgroundColor=0f172a&hairColor=2c1e0f&topChance=80&accessoriesChance=30&clothingColor=3b82f6" />
          <div className="flex flex-col gap-5 mt-5 items-start">
            <div className="flex gap-2 justify-center items-center">
              <p className="flex h-8items-center border py-1 px-2 rounded-3xl bg-blue-400 font-semibold text-black text-[15px] gap-1"><DiCode size={25} />Senior Dev</p> 
              <p className="border h-9 py-1 px-2 rounded-3xl bg-blue-400 font-semibold text-black text-[15px] flex items-center gap-1"
              ><TbWorld />Lets Collab</p>
            </div>
            <h1 className="text-white font-bold text-[35px]">Ragul Raj</h1>
            <button className="border w-4/5 h-10 flex justify-center items-center gap-2 bg-blue-600 rounded-full text-white text-lg
            font-semibold"><FaUserPlus />Connect</button>
            <div className="w-full flex justify-start items-center gap-5">
              <DiGithubBadge size={40} />
              <FaLinkedin size={30}/>
              <FaLink size={30}/>

            </div>
          </div>
        </div>
        <div className="w-[72%] flex flex-col gap-5 mt-10 pr-10">
          <h2 className="text-[22px] font-bold text-black">About</h2>
          <p className="text-white text-[17px] ">
            Hello, I'm Ragul Raj passionate about building smart and scalable web & mobile applications. I've completed a full-stack development course and constantly explore new technologies to refine my skills. Focused on continuous learning, I aim to transition into the IT industry by 2027 and eventually move towards AI and data science.
          </p>
          <div className="h-0.5 bg-blue-600 w-full"/>
          <h2 className="text-[22px] font-bold text-black">Skills</h2>
          <div className="flex gap-2 flex-wrap">
            {
              ["React.js","Node.js","Express.js","MongoDB","C++","TailwindCSS","React.js","Node.js","Express.js","MongoDB","C++","TailwindCSS"].map(e =>
                <p className="border rounded-lg px-3 py-1 bg-gray-300 text-black font-medium text-[16px]">{e}</p>
              )
            }
          </div>
          <div className="h-0.5 mt-3 bg-blue-600 w-full"/>
          <h2 className="text-[22px] font-bold text-black">Interests</h2>
           <div className="flex gap-2 flex-wrap">
            {
              ["Web Development","Open Source","FinTech","App Development"].map(e =>
                <p className="border rounded-lg px-4 py-1 bg-gray-300 text-black font-medium text-[16px]">{e}</p>
              )
            }
          </div>
        </div>
      </div>
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
  );
};

export default UserProfile;