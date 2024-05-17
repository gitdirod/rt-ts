import React from 'react'
import whatsapp from "/src/static/icons/whatsappIcon.png"
import { urlsSocial } from '/src/data/urlsSocial'

export default function WhatsAppContactButton() {
  return (
    <a
        className="center-c gap-y-3   fixed transform  cursor-pointer rounded-full p-4 top-1/2 -translate-y-1/2  right-0 drop-shadow-xl group"
        href={urlsSocial.facebook}
        target="_blank"
    >
        <img 
          className=" w-10 h-10 sm:w-14 sm:h-14 group-hover:scale-125 transition-all"
          src={whatsapp}
          alt="whatsapp" 
        />
        <div className="center-c group-hover:flex hidden p-2 bg-white shadow-md rounded-md font-poppins-bold border-2 border-green-500 text-slate-700 ">
            <p className=" text-xl">Hola!</p>
            <p>¿Cómo podemos ayudarte?</p>
        </div>
      </a>
  )
}
