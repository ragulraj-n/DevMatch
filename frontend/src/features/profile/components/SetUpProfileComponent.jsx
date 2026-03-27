import { useState } from "react";
import { MdEdit } from "react-icons/md";

const SetUpProfileComponent = () => {

    const [userData,setUserData] = useState({
        bio:"",
        location:"",
        skills:[],
    })

    const [currSkill,setCurrSkill] = useState("");

    const handleUserSkill = (e) =>{
        setCurrSkill(e.target.value);
    }

    const handleUserSkillKeyAction = (e) =>{
        if(e.key === "Enter" && currSkill.trim()!==""){
            setUserData((prev)=>({...prev,
                skills:[...prev.skills,currSkill]}));
            setCurrSkill("");
        }else if(e.key == "Backspace" && currSkill===""){
            setUserData((prev)=>({
                ...prev,
                skills:prev.skills.slice(0,-1),
            }));
        }
    }

  return (
    <div className="w-4/5 mx-auto flex flex-col items-center mt-4 border shadow-md gap-5">
        <div className="flex pt-5">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=alex_dev&backgroundColor=0f172a&hairColor=2c1e0f&topChance=80&accessoriesChance=30&clothingColor=3b82f6" width={200} height={200} className='rounded-full'/>
            <button className="absolute top-48 left-[53%] border bg-blue-700 flex p-2 rounded-full h-12 w-12 items-center justify-center"><MdEdit color="white" size={25}/></button>
        </div>
       <div className="w-full flex flex-col justify-center items-center">
             <h1 className="font-bold text-3xl text-blue-700">Welcome, Ragul</h1>
            <p>Complete your profile to connect with developers who match your skills and interests.</p>
       </div>
       <div className="w-4/5 border h-screen flex flex-col gap-6">
        <div className="flex flex-col">
            <label className="text-md font-bold">About Yourself</label>
            <textarea className="border-2 h-32 px-2 py-1 focus:border-blue-500 focus:outline-none bg-gray-100 rouned-sm"/>
        </div>
        <div className="flex flex-col justify-center">
             <lable className="text-md font-bold">Location</lable>
             <input className="border-2 w-1/3 h-10 px-2 py-1 focus:border-blue-500 focus:outline-none bg-gray-200 rounded-sm" />
        </div>
        <div className="flex items-center">
            <div className="flex flex-col w-1/2 ">
                <lable className="text-md font-bold">Experience Level</lable>
                <select className="border-2 w-2/3 h-10 px-2 py-1 focus:border-blue-500 focus:outline-none bg-gray-200 rounded-sm">
                <option value="">--Choose--</option>
                <option value="student">Student</option>
                <option value="fresher">Fresher</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
                </select>
            </div>
            <div className="flex flex-col w-1/2">
                <lable className="text-md font-bold">Availability Status</lable>
                <select className="border-2 w-2/3 h-10 px-2 py-1 focus:border-blue-500 focus:outline-none bg-gray-200 rounded-sm">
                <option value="">--Choose--</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="openToCollab">Open To Collab</option>
                </select>
            </div>
        </div>
        <div className="">
            <lable className="text-md font-bold">Skills</lable>
            <div className="flex pl-10 items-center justify-start flex-wrap">
                {
                    userData.skills.map((e)=>{
                       return <p className="border border-blue-600 bg-gray-100 py-0.5 px-3 shadow-md mr-2 rounded-full mt-2">{e}</p>
                    })
             }
             <input className="border-none focus:outline-none mt-2" onChange={(e)=>handleUserSkill(e)} value={currSkill} onKeyDown={(e)=>handleUserSkillKeyAction(e)}/>
            </div>

            <div className="h-0.5 w-4/5 bg-blue-400 mt-2"></div>
        </div>
       </div>
    </div>
  )
}

export default SetUpProfileComponent
