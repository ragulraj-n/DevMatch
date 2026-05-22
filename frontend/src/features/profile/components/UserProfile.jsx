import React, { useEffect, useState } from "react";
import { DiCode, DiGithubBadge} from "react-icons/di";
import { TbWorld } from "react-icons/tb";
import { FaLinkedin, FaLink} from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import DisplayProject from "./DisplayProject";
import { DEFAULT_PROFILE_IMG } from "../constant";
import { getUserProfileApi } from "../services/profileApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const UserProfile = () => {
  const currUser = useSelector((state)=>state.user.currentUser);
  const [user,setUser] = useState(null);
  const { userName } = useParams();

  useEffect(() => {

    const fetchProfile = async () => {
        if (!userName) return;

        const tempuser = await getUserProfileApi(userName);
        setUser(tempuser);
    };

    if (!userName) {
        setUser(currUser);
        return;
    }

    if (currUser?.userName === userName) {
        setUser(currUser);
    } 
    else {  
        fetchProfile();
    }

}, [userName, currUser]);

  return (
    <div className="flex flex-col min-h-screen h-screen">
      <div className="w-4/5 bg-gray-400 mx-auto mt-16 rounded-3xl pb-10 flex">
        <div className="w-[28%] pl-14">
          <img className="w-52 mt-10 border-4 border-blue-700 rounded-full" src={user?.profileImage?.imageUrl} />
          <div className="flex flex-col gap-5 mt-5 items-start">
            <div className="flex gap-2 justify-center items-center">
              <p className="flex h-8items-center border py-1 px-2 rounded-3xl bg-blue-400 font-semibold text-black text-[15px] gap-1"><DiCode size={25} />{user?.experienceLevel}</p> 
              <p className="border h-9 py-1 px-2 rounded-3xl bg-blue-400 font-semibold text-black text-[15px] flex items-center gap-1"
              ><TbWorld />{user?.availabilityStatus}</p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white font-bold text-[35px]">{user?.firstName +" "+ user?.lastName}</h1>
              <p className="font-semibold text-sm">{`@${user?.userName}`}</p>
            </div>
            <button className="border w-4/5 h-10 flex justify-center items-center gap-2 bg-blue-600 rounded-full text-white text-lg
            font-semibold"><FaUserPlus />Connect</button>
            <div className="w-full flex justify-start items-center gap-5">
             <a href={user?.github} target="_blank"> <DiGithubBadge size={40} /> </a>
              <a href={user?.linkedin} target="_blank"><FaLinkedin size={30}/></a>
              <a href={user?.portfolio} target="_blank"><FaLink size={30}/></a>

            </div>
          </div>
        </div>
        <div className="w-[72%] flex flex-col gap-5 mt-10 pr-10">
          <h2 className="text-[22px] font-bold text-black">About</h2>
          <p className="text-white text-[17px] ">
           {user?.bio}
          </p>
          <div className="h-0.5 bg-blue-600 w-full"/>
          <h2 className="text-[22px] font-bold text-black">Skills</h2>
          <div className="flex gap-2 flex-wrap">
            {
              user?.skills.map((e,index) =>
                <p className="border rounded-lg px-3 py-1 bg-gray-300 text-black font-medium text-[16px]" key={index}>{e}</p>
              )
            }
          </div>
          <div className="h-0.5 mt-3 bg-blue-600 w-full"/>
          <h2 className="text-[22px] font-bold text-black">Interests</h2>
           <div className="flex gap-2 flex-wrap">
            {
              user?.interests.map((e,index) =>
                <p className="border rounded-lg px-4 py-1 bg-gray-300 text-black font-medium text-[16px]" key={index}>{e}</p>
              )
            }
          </div>
        </div>
      </div>
      {user?.projects.length > 0 && <DisplayProject projects={user?.projects}/>}
    </div>
  );
};

export default UserProfile;