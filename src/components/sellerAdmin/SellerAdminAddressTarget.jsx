import React from 'react'

export default function AddressTarget({address, icon, cursor='cursor-pointer', title='Datos facturación:'}) {

    return (
        <div className={`bg-white p-2 rounded-lg border font-poppins-regular  hover:border-slate-400 flex-1 shrink-0 min-w-md ${cursor}`}>
            <div className='center-r gap-2 bg-slate-700 rounded-lg px-2 text-white w-fit'>
                <img src={icon} className='w-4'send="" />
                <span className='font-poppins-extrabold'>{title}</span>
            </div>
            <div 
                className='flex items-center gap-4 border-b shrink-0'
            >
                <p>Nombre: <span className='font-poppins-semibold'>{address?.people}</span>  </p>  
                <p>Cc/Ruc: <span className='font-poppins-semibold'>{address?.ccruc}</span>  </p>  
                <p>Telefono: <span className='font-poppins-semibold'>{address?.phone}</span>  </p>  
            </div>
            <div 
                className='flex items-center gap-4  shrink-0'
            >
                <p>Ciudad: <span className='font-poppins-semibold'>{address?.city}</span>  </p>  
                <p>Dirección: <span className='font-poppins-semibold'>{address?.address}</span>  </p>   
            </div>
        </div>
    )
}