import React, 
{ memo } from 'react'
import useStore from "/src/hooks/useStore"
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import cart from '/src/static/icons/cart.svg'
import user from '/src/static/icons/user.svg'
import bag from '/src/static/icons/bag.svg'
import heart from '/src/static/icons/heartBlack.svg'


const ButtonBar=({section})=> {
    const navigate = useNavigate()
    const {handleSetMenu} = useStore()
    const activeSection = "text-[#15A7AE] bg-[#15A7AE]/5  font-bold activeSection border-[#15A7AE] border-[#15A7AE]"
    const notActiveSection = "text-slate-600 hover:border-slate-200 hover:bg-slate-100"
    const location = useLocation()
    const styleSection = location.pathname.startsWith(`/${section.url}`) ? activeSection : notActiveSection
    

    const handleCloseMenu= () =>{
        handleSetMenu(false)
        navigate(`/${section.url}`)
    }
  return (
    <>
        <div 
            // to={`/${section.url}`}
            onClick={()=>{
                handleCloseMenu()
            }}
            className={`${styleSection} group flex justify-between items-center gap-x-2 rounded-md px-4 py-2 border transition-all duration-150 my-0.5 mx-0.5 bg-white`}
        >
            <div
                className=" flex justify-start space-x-2 flex-1"
                
            >
                <div className="flex justify-center items-center">
                    {
                        section.image === "imgCart" ? <img className="w-6 h-6 grey" src={cart} alt=""/>:
                        section.image === "imgProducts" ? <img className="w-6 h-6 grey" src={bag} alt="" />:
                        section.image === "imgUser" ? <img className="w-6 h-6 grey" src={user} alt=""/>:
                        section.image === "imgLike" ? <img className="w-6 h-6 grey" src={heart} alt=""/>:
                        ''
                    }
                </div>
            </div>
        </div> 
    </>
  )
}
export default memo(ButtonBar)