import { memo, useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth";
import {  useNavigate } from "react-router-dom";
import { timeToText } from "/src/helpers";
import TarjetEnvoice from "/src/components/TarjetEnvoice";

import imgUser from '/src/static/icons/user.svg'
import imgLogout from '/src/static/icons/logout.svg'
import imgUpdate from '/src/static/icons/update.svg'
import imgPhone from '/src/static/icons/phone.svg'
import plane from '/src/static/icons/plane.svg'
import email from '/src/static/icons/email.svg'
import iconEnvoice from '/src/static/icons/envoice.svg'


const User=()=> {
  const navigate = useNavigate()
  const { logout, user } = useAuth({
      middleware: 'auth',
      url: '/'
  })

  const address = user?.address

  const [envoiceAddress, setEnvoiceAddress] = useState({})
  const [sendAddress, setSendAddress] = useState({})

  const handleLogout=()=>{
    logout()
    navigate('/')
    
  } 
  useEffect(()=>{
    address?.envoice ? setEnvoiceAddress(address?.envoice) : setEnvoiceAddress({})
    address?.send ? setSendAddress(address?.send) : setSendAddress({})
    
  },[user])
      
    return (
          <div className="relative flex flex-col w-full">
            {/* <BottomBarClient/> */}
          <div className="flex w-full">
            {/* <SideBarClient/> */}
            <div 
              className="mx-auto w-full pb-10 mt-4 flex flex-col relative"
            >
              <div 
                className="flex flex-col items-center md:flex-row md:items-start md:space-x-4 md:px-4 rounded-sm pb-4"
              >
                <div className="flex flex-col justify-between w-full ">
                  
                    <div className="flex flex-col justify-center items-start w-full my-2">
                        <div>
                                <h1 
                                    className="font-bold text-4xl text-slate-700 tracking-wider "
                                >
                                    Mi Perfil
                                </h1>
                            <div className="h-0.5 bg-[#15A7AE]"></div>
                        </div>
                    </div>

                    {/* COntenido */}
                    <div
                      className="flex gap-2 flex-wrap "
                    >
                      <div className="flex flex-col  w-full relative pt-10 bg-white text-slate-600 text-md font-bold rounded-sm border px-2 md:px-10">
                        <div className="absolute top-0 right-0 p-1 text-xs">
                          Desde: {timeToText(user?.created_at,'LLL')}
                
                        </div>
                        <div className="flex flex-col  gap-x-4 justify-between items-start sm:items-center">
                          <div className="flex gap-x-2 items-center">
                          <img className="w-6 h-6 grey" src={imgUser} alt="" />
                            <span className="">Nombre:</span> {user.name}
                          </div>
                          <div className="flex gap-x-2 items-center">
                          <img className="w-6 h-6 grey" src={email} alt="" />
                            Correo: {user.email}
                          </div>
                          <div className="flex gap-x-2 items-center">
                          <img className="w-6 h-6 grey" src={imgPhone} alt="" />
                            Telefono: {user.phone}
                          </div>
                          
                        </div>
                        <div className="flex justify-center my-4 items-center gap-x-2 text-white bg-[#15A7AE] hover:bg-[#2D565E] cursor-pointer transition-all w-full py-1 rounded-sm">
                        <img className="w-4 h-4 white" src={imgUpdate} alt="" />
                          <span>Actualizar</span>
                        </div>
                      </div>

                      <div
                        className="flex flex-col md:flex-row gap-2 w-full"
                      >
                        <TarjetEnvoice
                          envoiceAddress={envoiceAddress}
                        >
                          <div 
                            className=" text-cyanPrimary flex items-center gap-x-2 font-bold text-xl"
                          >
                            {/* <IconIdentification/> */}
                            <img className="w-6 h-6 cyan" src={iconEnvoice} alt="" />
                            Datos de facturacion: 
                          </div>
                        </TarjetEnvoice>

                        <TarjetEnvoice
                          envoiceAddress={sendAddress}
                          envoice={false}
                        >
                          <div 
                            className=" text-pinkDark flex items-center gap-x-2 font-bold text-xl"
                          >
                            <img className="w-6 h-6 pinkDark" src={plane} alt="" />
                            Datos de Envio: 
                          </div>
                        </TarjetEnvoice>
                      </div>
                      <div 
                        className="flex justify-center items-center md:hidden rounded-sm py-4 gap-2 w-full bg-[#2D565E] text-white font-bold"
                        onClick={()=>{handleLogout()}}
                      >
                        <img className="w-6 h-6 grey" src={imgLogout} alt="" />
                        <span>Cerrar sesión</span>
                      </div>
                    </div>
                </div>
    
              </div>
            </div>
          </div>
        </div>
    )
}
export default memo(User)
