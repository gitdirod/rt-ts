import React from 'react'
import iconClose from '/src/static/icons/seller/close.svg'
import iconTag from '/src/static/icons/tag.svg'
import Btn from '/src/components/admin/Btn'

export default function ModalBlockHeader({name, closeModal }) {
  return (
    <div className="relative w-full gap-4 center-r p-2 font-light bg-slate-800 text-white text-2xl rounded-t-lg md:min-w-[500px]">
        <img src={iconTag} className="w-8" alt="ok" />
        <span className="text-base md:text-xl font-poppins-regular">{name}</span>
        
        <Btn
            style='md:absolute bg-white right-2 '
            icon={iconClose}
            imageColor
            action={()=>{
                closeModal()
            }}
        />
    </div>
  )
}
