import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { DEFAULT_PROFILE_IMG } from "../constant";
import { setUpProfileApi, uploadImage } from "../services/profileApi";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../user/userSlice";
import toast from 'react-hot-toast';

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
        github:"",
        linkedin:"",
        portfolio:"",
    })

    const [currSkill,setCurrSkill] = useState("");
    const [currInterest,setCurrInterest] = useState("");
    const [isOpenUpload,setIsOpenUpload] = useState(false);
    const [currImage,setCurrImage] = useState(null);
    const [previewImage,setPreviewImage] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [uploadLoading,setUploadLoading] = useState(false);

    const handleUserSkill = (e) =>{
        setCurrSkill(e.target.value);
    }

    const handleUserSkillKeyAction = (e) =>{
        if(e.key === "Enter" && currSkill.trim()!==""){
            if(userData.skills.length >= 15){
                toast.error("Maximum 15 skills allowed");
                return;
            }
            setUserData((prev)=>({...prev,
                skills:[...prev.skills,currSkill.trim()]}));
            setCurrSkill("");
        }else if(e.key === "Backspace" && currSkill===""){
            setUserData((prev)=>({
                ...prev,
                skills:prev.skills.slice(0,-1),
            }));
        }
    }

    const handleRemoveSkill = (indexToRemove) => {
        setUserData((prev)=>({
            ...prev,
            skills:prev.skills.filter((_,index) => index !== indexToRemove)
        }));
    }

    const handleUserInterests = (e) =>{
        setCurrInterest(e.target.value);
    }

    const handleUserInterestsKeyDown = (e) =>{
        if(e.key === "Enter" && currInterest.trim()!==""){
            if(userData.interests.length >= 15){
                toast.error("Maximum 15 interests allowed");
                return;
            }
            setUserData((prev)=>({...prev,
                interests:[...prev.interests,currInterest.trim()]}));
            setCurrInterest("");
        }else if(e.key === "Backspace" && currInterest===""){
            setUserData((prev)=>({
                ...prev,
                interests:prev.interests.slice(0,-1),
            }));
        }
    }

    const handleRemoveInterest = (indexToRemove) => {
        setUserData((prev)=>({
            ...prev,
            interests:prev.interests.filter((_,index) => index !== indexToRemove)
        }));
    }

    const handleUploadImage = async () =>{
        if(!currImage){
            toast.error("Please select an image first");
            return;
        }
        
        try{
            setUploadLoading(true);
            const formData = new FormData();
            formData.append("image",currImage);
            const res = await uploadImage(formData);
            const imageUrl = res?.data?.data?.imageUrl;
            setUserData({...userData,profileImage:imageUrl});
            setIsOpenUpload(false);
            setPreviewImage(null);
            setCurrImage(null);
            toast.success("Profile image uploaded successfully");
        }catch(err){
            console.log(err);
            toast.error(err.response?.data?.message || "Failed to upload image");
        }finally{
            setUploadLoading(false);
        }
    }

    const validateProfileData = () => {
        const errors = {};
        
        if(userData.bio && userData.bio.length > 500){
            errors.bio = "Bio must be less than 500 characters";
        }
        
        if(userData.location && userData.location.length > 100){
            errors.location = "Location must be less than 100 characters";
        }
        
        if(userData.github && !userData.github.match(/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+$/)){
            errors.github = "Please enter a valid GitHub URL";
        }
        
        if(userData.linkedin && !userData.linkedin.match(/^(https?:\/\/)?(www\.)?linkedin\.com\/.+/)){
            errors.linkedin = "Please enter a valid LinkedIn URL";
        }
        
        if(userData.portfolio && !userData.portfolio.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)){
            errors.portfolio = "Please enter a valid URL";
        }
        
        if(Object.keys(errors).length > 0){
            Object.values(errors).forEach(err => toast.error(err));
            return false;
        }
        return true;
    }

    const handleSaveUserProfile = async () =>{
        if(!validateProfileData()) return;
        
        const userName = user.userName;
        if(!userName){
            toast.error("User information not found");
            return;
        }
        
        try{
            setIsLoading(true);
            const res = await setUpProfileApi(userName,userData);
            dispatch(addUser(res.data));
            toast.success("Profile saved successfully");
            setCurrentStep();
        }catch(err){
            console.log(err);
            toast.error(err.response?.data?.message || "Failed to save profile");
        }finally{
            setIsLoading(false);
        }
    }

return (
    <div className="w-full mx-auto flex flex-col items-center mt-4 gap-5">
        <div className="flex pt-5 flex-col items-center w-full relative">
            <div className="relative group">
                <img src={previewImage || userData.profileImage} className="w-[200px] h-[200px] rounded-full object-cover border-4 border-blue-500 shadow-lg"/>
                <button className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex p-3 rounded-full transition-all duration-200 transform hover:scale-105 shadow-md" 
                onClick={()=>setIsOpenUpload(true)}>
                    <MdEdit color="white" size={20}/>
                </button>
            </div>
            
            {isOpenUpload && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => {
                    setIsOpenUpload(false);
                    setPreviewImage(null);
                    setCurrImage(null);
                }}>
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 relative" onClick={e => e.stopPropagation()}>
                        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors" 
                        onClick={() => {
                            setIsOpenUpload(false);
                            setPreviewImage(null);
                            setCurrImage(null);
                        }}>
                            <GiCancel size={24}/>
                        </button>
                        
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Profile Picture</h3>
                        
                        <div className="mb-4">
                            {previewImage && (
                                <img src={previewImage} className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-blue-500 mb-4"/>
                            )}
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                onChange={e => {
                                    if(e.target.files[0]){
                                        if(e.target.files[0].size > 5 * 1024 * 1024){
                                            toast.error("Image size must be less than 5MB");
                                            return;
                                        }
                                        setCurrImage(e.target.files[0]);
                                        setPreviewImage(URL.createObjectURL(e.target.files[0]));
                                    }
                                }}
                            />
                        </div>
                        
                        <button 
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleUploadImage}
                            disabled={uploadLoading}
                        >
                            {uploadLoading ? "Uploading..." : "Upload Image"}
                        </button>
                    </div>
                </div>
            )}
        </div>
        
        <div className="w-full flex flex-col justify-center items-center">
            <h1 className="font-bold text-3xl bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                Welcome, {user?.firstName || "Developer"}!
            </h1>
            <p className="text-gray-600 text-center">Complete your profile to connect with developers who match your skills and interests.</p>
        </div>
        
        <div className="w-4/5 flex flex-col gap-6">
            <div className="flex flex-col">
                <label className="text-md font-bold text-gray-700">About Yourself</label>
                <textarea className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl h-32 px-4 py-3 focus:outline-none bg-gray-50 transition-all duration-200" 
                placeholder="Tell About Yourself"
                value={userData.bio}
                maxLength={500}
                onChange={e => setUserData({...userData,bio:e.target.value})}/>
                <p className="flex justify-end text-sm text-gray-500 mt-1">{userData.bio.length}/500 chars</p>
            </div>
            
            <div className="flex flex-col">
                <label className="text-md font-bold text-gray-700">Location</label>
                <input className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl w-full md:w-1/2 h-12 px-4 py-2 focus:outline-none bg-gray-50 transition-all duration-200" 
                value={userData.location}
                placeholder="e.g., San Francisco, CA"
                onChange={e => setUserData({...userData,location:e.target.value})}/>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col w-full md:w-1/2">
                    <label className="text-md font-bold text-gray-700">Experience Level</label>
                    <select className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl w-full h-12 px-4 py-2 focus:outline-none bg-gray-50 transition-all duration-200 cursor-pointer"
                    value={userData.experienceLevel}
                    onChange={(e)=>setUserData({...userData,
                        experienceLevel:e.target.value,
                    })}>
                        <option value="">-- Choose --</option>
                        <option value="student">Student</option>
                        <option value="fresher">Fresher</option>
                        <option value="junior">Junior</option>
                        <option value="mid">Mid</option>
                        <option value="senior">Senior</option>
                    </select>
                </div>
                
                <div className="flex flex-col w-full md:w-1/2">
                    <label className="text-md font-bold text-gray-700">Availability Status</label>
                    <select className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl w-full h-12 px-4 py-2 focus:outline-none bg-gray-50 transition-all duration-200 cursor-pointer"
                    value={userData.availabilityStatus}
                    onChange={(e)=>setUserData({...userData,
                        availabilityStatus:e.target.value,
                    })}>
                        <option value="">-- Choose --</option>
                        <option value="available">Available</option>
                        <option value="busy">Busy</option>
                        <option value="open_to_collab">Open To Collab</option>
                    </select>
                </div>
            </div>
            
            <div>
                <label className="text-md font-bold text-gray-700">Skills</label>
                <div className="flex flex-wrap gap-2 mt-2 p-3 border-2 border-gray-300 rounded-xl min-h-[80px] bg-gray-50">
                    {userData.skills.map((e, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {e}
                            <button
                                type="button"
                                onClick={() => handleRemoveSkill(idx)}
                                className="hover:text-blue-900 ml-1"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                    <input 
                        className="flex-1 min-w-[150px] focus:outline-none bg-transparent px-2"
                        onChange={handleUserSkill} 
                        value={currSkill} 
                        onKeyDown={handleUserSkillKeyAction} 
                        placeholder={userData.skills.length === 0 ? "Type skill and press Enter (e.g., React.js)" : "Add more skills..."}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">Press Enter to add, Backspace to remove last</p>
            </div>
            
            <div>
                <label className="text-md font-bold text-gray-700">Interests</label>
                <div className="flex flex-wrap gap-2 mt-2 p-3 border-2 border-gray-300 rounded-xl min-h-[80px] bg-gray-50">
                    {userData.interests.map((e, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {e}
                            <button
                                type="button"
                                onClick={() => handleRemoveInterest(idx)}
                                className="hover:text-purple-900 ml-1"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                    <input 
                        className="flex-1 min-w-[150px] focus:outline-none bg-transparent px-2"
                        onChange={handleUserInterests} 
                        value={currInterest} 
                        onKeyDown={handleUserInterestsKeyDown} 
                        placeholder={userData.interests.length === 0 ? "Type interest and press Enter (e.g., Web Development)" : "Add more interests..."}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">Press Enter to add, Backspace to remove last</p>
            </div>
            
            <div className="flex flex-col">
                <label className='font-bold text-lg text-gray-700'>GitHub</label>
                <input 
                    className='w-full border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none py-3 px-1 bg-transparent transition-colors duration-200'
                    placeholder='https://github.com/username'
                    value={userData.github}
                    onChange={(e)=>setUserData({...userData,github:e.target.value})}/>
            </div>
            
            <div className="flex flex-col">
                <label className='font-bold text-lg text-gray-700'>LinkedIn</label>
                <input 
                    className='w-full border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none py-3 px-1 bg-transparent transition-colors duration-200'
                    placeholder='https://linkedin.com/in/username'
                    value={userData.linkedin}
                    onChange={(e)=>setUserData({...userData,linkedin:e.target.value})}/>
            </div>
            
            <div className="flex flex-col">
                <label className='font-bold text-lg text-gray-700'>Portfolio</label>
                <input 
                    className='w-full border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none py-3 px-1 bg-transparent transition-colors duration-200'
                    placeholder='https://yourportfolio.com'
                    value={userData.portfolio}
                    onChange={(e)=>setUserData({...userData,portfolio:e.target.value})}/>
            </div>
            
            <div className="flex justify-end mt-10 pb-10">
                <button 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3 text-lg rounded-xl flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSaveUserProfile}
                    disabled={isLoading}
                >
                    {isLoading ? "Saving..." : "Save & Next"}
                    <FaArrowRight />
                </button>
            </div>
        </div>
    </div>
)
}

export default SetUpProfileComponent