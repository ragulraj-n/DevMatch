import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { DEFAULT_PROFILE_IMG } from "../constant";
import { setUpProfileApi, uploadImage } from "../services/profileApi";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../user/userSlice";



const SetUpProfileComponent = ({setCurrentStep}) => {
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const [userData,setUserData] = useState({
        bio:"",
        location:"",
        skills:[],
        interests:[],
        experienceLevel:"",
        availabilityStatus:"",
        profileImage:DEFAULT_PROFILE_IMG,
    })

    const [currSkill,setCurrSkill] = useState("");
    const [currInterest,setCurrInterest] = useState("");
    const [isOpenUpload,setIsOpenUpload] = useState(false);
    const [currImage,setCurrImage] = useState(null);
    const [previewImage,setPreviewImage] = useState(null);

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

    const handleUserInterests = (e) =>{
        setCurrInterest(e.target.value);
    }

    const handleUserInterestsKeyDown = (e) =>{
        if(e.key === "Enter" && currInterest.trim()!==""){
            setUserData((prev)=>({...prev,
                interests:[...prev.interests,currInterest]}));
            setCurrInterest("");
        }else if(e.key == "Backspace" && currInterest===""){
            setUserData((prev)=>({
                ...prev,
                interests:prev.interests.slice(0,-1),
            }));
        }
    }

    const handleUploadImage = async () =>{
        try{
            setIsOpenUpload(false);
            const formData = new FormData();
            formData.append("image",currImage);
            const res = await uploadImage(formData);
            const imageUrl = res?.data?.data?.imageUrl;
            setUserData({...userData,profileImage:imageUrl});
        }catch(err){
            console.log(err);
        }
    }

    const handleSaveUserProfile = async () =>{
            const userName = user.userName;
        try{
            const res = await setUpProfileApi(userName,userData);
            dispatch(addUser(res.data));
            console.log(res.data);
        }catch(err){
            console.log(err);
        }
        
    }

return (
    <div className="w-full mx-auto flex flex-col items-center mt-4 gap-5">
        <div className="flex pt-5 flex-col items-center w-full relative">
            <img src={previewImage || userData.profileImage} className="w-[200px] h-[200px] rounded-full object-cover"/>
            <button className="absolute top-48 left-[53%] border bg-blue-700 flex p-2 rounded-full h-12 w-12 items-center justify-center" onClick={()=>setIsOpenUpload(true)}><MdEdit color="white" size={25}/></button>
            {isOpenUpload && <div className="border w-3/5 bg-gray-200 mt-10 h-80 flex justify-center mx-auto items-center pl-10 rounded-md flex-col relative">
                <button className="absolute top-2 right-2" onClick={()=>{
                    setIsOpenUpload(false);
                    setPreviewImage(null);
                }}><GiCancel size={25} color="black"/></button>
                <input type="file" accept="image/*" className="" onChange={e=>{
                    setCurrImage(e.target.files[0])
                    setPreviewImage(URL.createObjectURL(e.target.files[0]))
                }}/>
                <button className="bg-blue-600 text-white py-1.5 px-16  rounded-md absolute bottom-10"
                onClick={handleUploadImage}>Upload</button>
            </div>}
        </div>
    <div className="w-full flex flex-col justify-center items-center">
            <h1 className="font-bold text-3xl text-blue-700">Welcome, Ragul</h1>
            <p>Complete your profile to connect with developers who match your skills and interests.</p>
    </div>
    <div className="w-4/5 flex flex-col gap-6">
        <div className="flex flex-col">
            <label className="text-md font-bold">About Yourself</label>
            <textarea className="border-2 h-32 px-2 py-1 focus:border-blue-500 focus:outline-none bg-gray-100 rounded-sm" placeholder="Tell About Yourself"
            value={userData.bio}
            onChange={e => setUserData({...userData,bio:e.target.value})}/>
            <p className="flex justify-end">{userData.bio.length}/500 chars</p>
        </div>
        <div className="flex flex-col justify-center">
            <label className="text-md font-bold">Location</label>
            <input className="border-2 w-1/3 h-10 px-2 py-1 focus:border-blue-500 focus:outline-none bg-gray-200 rounded-sm" 
            value={userData.location}
            onChange={e => setUserData({...userData,location:e.target.value})}/>
        </div>
        <div className="flex items-center">
            <div className="flex flex-col w-1/2 ">
                <label className="text-md font-bold">Experience Level</label>
                <select className="border-2 w-2/3 h-10 px-2 py-1 focus:border-blue-500 focus:outline-none bg-gray-200 rounded-sm"
                value={userData.experienceLevel}
                onChange={(e)=>setUserData({...userData,
                    experienceLevel:e.target.value,
                })}>
                <option value="">--Choose--</option>
                <option value="student">Student</option>
                <option value="fresher">Fresher</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
                </select>
            </div>
            <div className="flex flex-col w-1/2">
                <label className="text-md font-bold">Availability Status</label>
                <select className="border-2 w-2/3 h-10 px-2 py-1 focus:border-blue-500 focus:outline-none bg-gray-200 rounded-sm"
                value={userData.availabilityStatus}
                onChange={(e)=>setUserData({...userData,
                    availabilityStatus:e.target.value,
                })}>
                <option value="">--Choose--</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="open_to_collab">Open To Collab</option>
                </select>
            </div>
        </div>
        <div>
            <label className="text-md font-bold">Skills</label>
            <div className="flex pl-10 items-center justify-start flex-wrap w-4/5">
                {
                    userData.skills.map((e)=>{
                    return <p className="border border-blue-600 bg-gray-100 py-0.5 px-3 shadow-md mr-2 rounded-full mt-2">{e}</p>
                    })
            }
            <input className="focus:outline-none mt-2 w-full border-none" onChange={(e)=>handleUserSkill(e)} value={currSkill} onKeyDown={(e)=>handleUserSkillKeyAction(e)} placeholder="Enter Your Skills Eg:- React.js, Express.js"/>
            </div>
            <div className="h-0.5 w-4/5 bg-blue-400 mt-2"></div>
        </div>
        <div>
            <label className="text-md font-bold">Interests</label>
            <div className="flex pl-10 items-center justify-start flex-wrap w-4/5">
                {
                    userData.interests.map((e)=>{
                    return <p className="border border-blue-600 bg-gray-100 py-0.5 px-3 shadow-md mr-2 rounded-full mt-2">{e}</p>
                    })
            }
            <input className="border-none focus:outline-none mt-2 w-full" onChange={(e)=>handleUserInterests(e)} value={currInterest} onKeyDown={(e)=>handleUserInterestsKeyDown(e)} placeholder="Enter Your Interests Eg:- Web Development, Open Source"/>
            </div>
            <div className="h-0.5 w-4/5 bg-blue-400 mt-2"></div>
        </div> 
        <div className="flex flex-col items-center w-full">
            <label className='font-bold text-lg w-full'>
                Github
            </label>
            <input 
                className='w-full border-b-2 border-blue-600 focus:outline-none py-2 px-1'
                placeholder='https://github.com/ragulraj-n'
                />
        </div> 
        <div className="flex flex-col items-center w-full">
            <label className='font-bold text-lg w-full'>
                Linkedin
            </label>
            <input 
                className='w-full border-b-2 border-blue-600 focus:outline-none py-2 px-1'
                placeholder='https://linkedin.com/ragulraj-n'
                />
        </div> 
        <div className="flex flex-col items-center w-full">
            <label className='font-bold text-lg w-full'>
                Portfoilo
            </label>
            <input 
                className='w-full border-b-2 border-blue-600 focus:outline-none py-2 px-1'
                placeholder='https://ragulraj.tech'
                />
        </div> 
        <div className="flex justify-end mt-10">
            <button className="border bg-blue-600 text-white font-bold px-3 py-1 text-lg rounded-md flex  items-center gap-2"
            onClick={handleSaveUserProfile}>Save & Next<FaArrowRight />
            </button>
        </div>
    </div>
    </div>
)
}

export default SetUpProfileComponent
