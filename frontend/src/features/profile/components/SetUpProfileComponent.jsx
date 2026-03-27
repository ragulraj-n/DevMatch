import { MdEdit } from "react-icons/md";
import SetupProfileForm from "./SetupProfileForm";

const SetUpProfileComponent = () => {
  return (
    <div className="w-4/5 mx-auto flex flex-col items-center mt-4 h-screen border shadow-md gap-5">
        <div className="flex pt-5">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=alex_dev&backgroundColor=0f172a&hairColor=2c1e0f&topChance=80&accessoriesChance=30&clothingColor=3b82f6" width={200} height={200} className='rounded-full'/>
            <button className="absolute top-48 left-[53%] border bg-blue-700 flex p-2 rounded-full h-12 w-12 items-center justify-center"><MdEdit color="white" size={25}/></button>
        </div>
       <div className="w-full flex flex-col justify-center items-center">
             <h1 className="font-bold text-3xl">Welcome, Ragul</h1>
            <p>Complete your profile to connect with developers who match your skills and interests.</p>
       </div>
       <SetupProfileForm />
    </div>
  )
}

export default SetUpProfileComponent
