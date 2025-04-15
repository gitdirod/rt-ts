import { useNavigate } from "react-router-dom"

export default function Grupo({group}){

  const navigate = useNavigate()
  const goTo= () =>{
      navigate(`/store/products/?gro=${group?.name}&gi=${group?.id}`)
    }
  return (

    <>
        <li 
          className="hover:border-b-slate-800 px-2 font-poppins-regular rounded-sm hover:scale-110 transition-all cursor-pointer" 
          onClick={()=>goTo()}
        >
          <div
            className="flex justify-center items-center  text-white"
          >
            {group?.name}
          </div>
        </li>
    </>
  )
}
