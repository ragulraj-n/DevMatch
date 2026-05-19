
import DisplayProjectComponent from "./DisplayProjectComponent";


const DisplayProject = ({projects}) => {
  return (
    <div>
        <h1 className="ml-[10%] font-bold text-[25px] mt-10">Projects</h1>
        <div className="pb-4">
          {
            projects.map((data,index)=><DisplayProjectComponent key={index} project={data}/>)
          }
      </div>
    </div>
  )
}

export default DisplayProject
