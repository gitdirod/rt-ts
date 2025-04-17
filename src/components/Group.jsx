import { useNavigate } from "react-router-dom"

export default function Grupo({group}){

  const navigate = useNavigate()
  const goTo= () =>{
      navigate(`/store/products/?gro=${group?.name}&gi=${group?.id}`)
    }
  return (

    <>
        <li 
          className="hover:bg-zinc-200 hover:border-b p-2 rounded-lg hover:scale-110 transition-all cursor-pointer" 
          onClick={()=>goTo()}
        >
          <div
            className="flex justify-center items-center "
          >
            {group?.name}
          </div>
        </li>
    </>
  )
}
