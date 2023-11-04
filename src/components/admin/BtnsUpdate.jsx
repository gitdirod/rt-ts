import React from 'react'
import Btn from "./Btn"
import iconClose from '/src/static/icons/close.svg'
import iconSave from '/src/static/icons/save_filled.svg'

export default function BtnsUpdate({closeAction}) {
  return (
    <div 
        className='flex gap-4 p-2 px-10 w-full'
    >
        <Btn
            icon={iconClose}
            text='Cerrar'
            action={()=>closeAction(false)}
            isButton={false}
            style="w-full bg-slate-700"
        />
        <Btn
            icon={iconSave}
            text={'Guardar'}
            style='bg-green-500 w-full'
        />
    </div>
  )
}
