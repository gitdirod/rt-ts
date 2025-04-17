import React from 'react'
import { useNavigate } from "react-router-dom" 
import iconUser from '/src/static/icons/userBlack.svg'
import iconLogout from '/src/static/icons/logout.svg'
import { useAuth } from '/src/hooks/useAuth'

export default function NavUserSections() {
    const navigate = useNavigate()
    const {
        logout, 
        user 
    } = useAuth({
        middleware: 'guest',
    })

    const sections = [
        {
            id: 1,
            name: 'Compras',
            icon:'iconBag',
            url: '/store/bought'
        },
        {
            id: 2,
            name: 'Me gustan',
            icon:'iconHart',
            url: '/store/likes'
        },
        {
            id: 3,
            name: 'Perfil',
            icon:'iconUser',
            url: '/store/user'
        },
    ]
    return (
        <div className="group px-2 ">
                                        
            {
                user?
                <>
                    <img className="w-6 h-6 grey" src={iconUser} alt="" />
                    {/* agregar hidden en vez de flex */}
                    <div className="hidden font-poppins-regular group-hover:flex  left-0 absolute w-full bg-white rounded-lg p-1 shadow-md   border"> 
                        <ul className="w-full">
                            {sections?.map(section =>(
                                <li 
                                    key={section.id}
                                    className="flex justify-start items-center gap-x-2 hover:font-poppins-bold hover:text-cyanPrimary group/item  rounded-t-sm py-1 cursor-pointer px-1  transition-all"
                                    onClick={()=>{
                                        navigate(section.url)
                                    }}
                                >
                                <img className="w-6 h-6 grey group-hover/item:cyan " src={'/iconos/userSections/' + section.icon + '.svg'} alt={section.name} /> 
                                {section.name}
                            </li>
                            ))}
                            <li 
                                className="flex justify-start items-center gap-x-2 hover:font-poppins-bold hover:text-cyanPrimary group/item rounded-b-md py-1 cursor-pointer px-1  transition-all"
                                onClick={logout}
                            >
                                <img className="w-6 h-6 grey group-hover/item:cyan" src={iconLogout} alt="" />
                                Salir
                            </li>
                        </ul>
                    </div>
                </>
                :
                <div
                    onClick={()=>{
                        navigate('/auth/login/')
                    }}
                >

                    <img className="w-6 h-6 white" src={iconUser} alt="iniciar" />
                </div>
            }

        </div>
    )
}
