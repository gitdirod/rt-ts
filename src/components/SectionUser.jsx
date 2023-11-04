import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import bag from '/src/static/icons/bag.svg'
import hart from '/src/static/icons/heartBlack.svg'
import cart from '/src/static/icons/cartBlack.svg'
import user from '/src/static/icons/userBlack.svg'


// #F1A31F amarillo
// #E35544 rojo
// #15A7AE cyan claro
// #2D565E cyan oscuro
const SectionUser=({section})=> {
    const activeSection = " text-white activeSection font-poppins-bold bg-slate-800 rounded-lg "
    const notActiveSection = " font-poppins-regular text-slate-700 hover:font-poppins-bold "
    const location = useLocation()
    const styleSection = location.pathname.startsWith(`/${section.url}`) ? activeSection : notActiveSection
    const styleIcon = location.pathname.startsWith(`/${section.url}`) ? 'white' : 'grey'
    
  return (
    <>
        <NavLink 
            to={`/${section.url}`}
            className={`${styleSection} group flex items-center gap-x-2 py-2 transition-all mb-0.5`}
        >
            <div
                className=" flex flex-col items-center justify-center flex-1"
                
            >
                <div className="flex justify-center items-center">
                    {
                        section.image === "imgCart" ? <img className={`w-6 h-6 ${styleIcon}`} src={cart} alt=""/>:
                        section.image === "imgProducts" ? <img className={`w-6 h-6 ${styleIcon}`} src={bag} alt=""/>:
                        section.image === "imgUser" ? <img className={`w-6 h-6 ${styleIcon}`} src={user} alt=""/>:
                        section.image === "imgLike" ? <img className={`w-6 h-6 ${styleIcon}`} src={hart} alt=""/>:
                        ''
                    }
                </div>
                <div className='hidden lg:flex  text-[11px]   text-center'>{section.name}</div>
            </div>
        </NavLink> 
    </>
  )
}
export default memo(SectionUser)
