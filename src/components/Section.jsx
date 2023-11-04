import { memo } from "react"
import { NavLink, useLocation } from "react-router-dom"



import tag from '/src/static/icons/tag.svg'
import envoice from '/src/static/icons/envoice.svg'
import add from '/src/static/icons/add.svg'
import bag from '/src/static/icons/bag.svg'
import category from '/src/static/icons/category.svg'
import user from '/src/static/icons/user.svg'
import imgGroup from '/src/static/icons/group.svg'
import store from '/src/static/icons/store.svg'
import page from '/src/static/icons/page.svg'





const Section = memo(({section}) =>{ 
    
    const activeSection = "bg-green-500 text-white font-bold activeSection border-green-500 border-l-4 border-l-green-700"
    const notActiveSection = "text-slate-600 hover:border-green-500 hover:bg-green-50 hover:font-bold border"
    const location = useLocation()
    const styleSection = location.pathname.startsWith(`/admin/${section.url}`) ? activeSection : notActiveSection
    
  return (

    <div 
        className={`${styleSection} group flex justify-between items-center rounded-r-md transition-all duration-150 my-0.5`}
    >
        <NavLink 
            className=" flex justify-start gap-x-2 flex-1 h-full py-4"
            to={`${section.url}`}
        >
            
            <div className="flex justify-center items-center text-slate-700 group-[.activeSection]:text-white pl-4">
                {
                    section.image === "imgProducts" ? <img className="w-6 h-6 grey" src={bag} alt="" />:
                    section.image === "imgCategories" ? <img className="w-6 h-6 grey" src={category} alt="" />:
                    section.image === "imgGroups" ? <img className="w-6 h-6 grey" src={imgGroup} alt="" />:
                    section.image === "imgType" ? <img className="w-6 h-6 grey" src={tag} alt="" />:
                    section.image === "imgUsers" ? <img className="w-6 h-6 grey" src={user} alt="" />:
                    section.image === "imgOrders" ? <img className="w-6 h-6 grey" src={envoice} alt="" />:
                    section.image === "imgOther" ? '':
                    section.image === "imgStore" ? <img className="w-6 h-6 grey" src={store} alt="" />:
                    section.image === "imgSettings" ? <img className="w-6 h-6 grey" src={page} alt="" />:''
                }
            </div>
            <p className="hidden md:block">{section.name}</p>
        </NavLink> 
        {
            section.urlNew !== undefined?
            <NavLink 
                className="hidden md:block text-transparent group-hover:text-slate-600 justify-center items-center transition-all duration-150 group-[.activeSection]:text-white pr-4"
                to={`/admin/${section.urlNew}`}
            >
                {/* <IconAdd
                    width="5"
                    higth="5"
                /> */}
                <img 
                    className="w-6 h-6 grey"
                    src={add}
                    alt="" 
                /> 
            </NavLink>
            :
            ""
        }
    </div>

  )
})
export default Section;
