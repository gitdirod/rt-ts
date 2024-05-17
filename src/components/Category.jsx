import useStore from "/src/hooks/useStore"
import { useNavigate } from "react-router-dom"
import { memo } from "react"
import { urlsBackend } from "/src/data/urlsBackend"



const Category=({categoria, width = 'w-32', height='h-auto'})=> {
    const navigate = useNavigate()
    const {
            handleClikCategoryCurrent,
            handleSetMenu
        } = useStore()

    const handleCloseMenu= () =>{
        handleSetMenu(false)
        navigate(`/store/products/?cat=${categoria?.name}&gro=${categoria?.group_name}`)
        
    }
    
    return (
        <>
            
            <div
                className={`my-2 ${width} group/item h-auto rounded-lg overflow-hidden border center-c  hover:scale-105 transition-all shadow-md cursor-pointer `} 
                key={categoria?.id}
                onClick={()=>{
                    handleClikCategoryCurrent(categoria?.id)
                    handleCloseMenu()
                    
                }}  
                
            >
                <div className={` relative ${width} ${height} center-r overflow-hidden`}>
                    
                    <img 
                        className={`${width} h-auto group-hover/item:scale-110 transition-all duration-500`}
                        src={urlsBackend.CATEGORY + categoria?.images[0]?.['name']} 
                        alt={`${categoria?.image}`} 
                    />
                    <div 
                        className="group-hover:opacity-0 transition-all duration-300 absolute w-full h-full opacity-40"
                    >

                        </div>
                </div>
                <div className="text-white font-poppins-bold text-sm p-0.5  w-full center-r bg-slate-700">
                    {categoria?.name}
                </div>
            </div>
                    
            
        </>
    )
}
export default memo(Category) 
