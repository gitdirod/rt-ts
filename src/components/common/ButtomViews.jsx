import React, { useState } from 'react'
import { views } from "/src/data/pages"
import { useNavigate } from 'react-router-dom'
import iconLogout from "/src/static/icons/seller/logout.svg"
import { useAuth } from '/src/hooks/useAuth'


export default function ButtomViews() {
    const {user, logout} = useAuth({
        middleware: 'auth',
        url: '/admin'
      })
    
    const[show, setShow] = useState(false)
    const navigate = useNavigate()
    const actualView = views?.filter(view=> location.pathname.startsWith(view.blockUrl))[0]
    
    return (
        <>
        {user?.role ==='admin' && (
            <>
                <div className="flex justify-between cursor-pointer hover:scale-110 transition-all shrink-0"
                    onClick={()=>setShow(!show)}
                    
                >
                    <div className="center-r w-8 h-8 bg-slate-800 rounded-full">
                        <img className="w-5 h-5" src={'/iconos/views/'+actualView?.icon+'.svg'} alt={actualView?.name} />
                    </div>
                </div>
                {
                    show && 
                    (
                        <div className="center-c absolute w-40 border font-poppins-semibold text-slate-700 bg-white shadow-lg z-10 right-0 rounded-lg overflow-hidden top-12">
                            <div className="center-c bg-slate-800 w-full py-2 font-poppins-extrabold text-white">
                                <img src={'/iconos/views/'+actualView.icon+'.svg'} className="w-8 h-8" alt={actualView?.name} />
                                {actualView?.name}
                            </div>
                            <div className=" center-c py-2 border-b  text-sm w-full px-0.5">
                                {
                                    views?.map(view => view?.id !== actualView?.id && (
                                        <div 
                                            key={view.id} 
                                            className="center-r gap-2 transition-all rounded w-full py-2 cursor-pointer hover:bg-slate-700 hover:text-white"
                                            onClick={()=>{
                                                setShow(false)
                                                navigate(view?.url)
                                            }}
                                        >
                                            <img src={'/iconos/views/'+view.icon+'.svg'} className="w-5 h-5" alt={view?.name} />
                                            <span>{view?.name}</span>
                                        </div>
                                    ))
                                }
                            </div> 
                            <div className='px-0.5 w-full py-2'> 
                                <div 
                                    className="center-r gap-2 transition-all rounded w-full py-2 cursor-pointer hover:bg-slate-700 hover:text-white"
                                    onClick={logout}
                                >
                                    <img src={iconLogout} className="w-5 h-5" alt='Salir' />
                                    <span>Salir</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        )}
        </>
        
    )
}
