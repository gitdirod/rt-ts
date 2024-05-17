import React from 'react'
import iconCircle from '/src/static/icons/seller/circle.svg'

export default function UnidsAvailable({units=null, textColor=' text-white ', style=' font-poppins-extrabold text-xs md:text-sm '}) {
  return (
    <div className={'center-r gap-1 ' + textColor + ' '+ style }>
        <div className='relative'>
            <img src={iconCircle} alt="" className='w-2  absolute animate-ping top-0 left-0 ' />
            <img src={iconCircle} alt="" className='w-2' />
        </div>
        <span>{units} </span> <span>unidades</span>
    </div>
  )
}
