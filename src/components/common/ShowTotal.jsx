import { formatearDinero } from '/src/helpers'
import React from 'react'

export default  function ShowTotal ({subtotal, total}) {


  return (
    <div className='font-poppins-regular w-full max-w-[200px] border rounded-lg p-2 bg-cyanPrimary text-white'>
        <div className='flex justify-between '>
            Subtotal: <span className='font-poppins-extrabold'>{formatearDinero(subtotal)}</span>
        </div>
        <div className='flex justify-between border-b'>
            Iva: <span className='font-poppins-extrabold'>{formatearDinero(subtotal * 0.15)}</span>
        </div>
        <div className='flex justify-between'>
            Total: <span className='font-poppins-extrabold'>{formatearDinero(total)}</span>
        </div>
    </div>
  )
}
