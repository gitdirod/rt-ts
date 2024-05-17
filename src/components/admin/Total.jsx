import { useEffect, useState } from 'react'
import { formatearDinero, formatearDinero2 } from '/src/helpers'

export default function Total({purchases}) {

    const [subTotal, setSubtotal] = useState(0)

    useEffect(()=>{
        const subTotal = purchases?.reduce((subtotal, item) => (item.subtotal) + subtotal, 0)
        setSubtotal(subTotal)
    }, [purchases])

    return (
        <div
            className='w-full'
        >
                <div
                    className='flex font-poppins-regular justify-around gap-x-4 items-center border text-sm rounded-lg bg-slate-700 p-1 text-white'
                >
                    
                    <div className='flex justify-start items-center gap-x-2'>
                        <span 
                            className='font-poppins-bold'
                        >
                            Subtotal:
                        </span>
                        <span 
                            type="text" 
                            className=' outline-none'
                        >   {formatearDinero(subTotal)}</span>
                    </div>
                    <div className='flex justify-start items-center gap-x-2'>
                        <span 
                            className='font-poppins-bold'
                        >
                            Total:
                        </span>
                        <span 
                            className=' outline-none'
                        >   {formatearDinero(subTotal*1.12)}</span>
                    </div>
                </div>
        </div>
  )
}
