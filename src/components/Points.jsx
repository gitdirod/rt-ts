import {memo, useState} from 'react'


const Points=({store})=> {
    const [show, setShow] = useState(false)
  return (
    <div className=''>
        <div
            className="flex justify-start md:justify-center py-2 gap-x-2 items-center font-bold  text-base cursor-pointer hover:bg-white hover:text-slate-600 transition-all rounded-sm duration-400"
            onClick={()=>setShow(!show)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
            </svg>
            {store.name}
        </div>
        {
            show?
            <div className='flex justify-center p-2 border-b border-b-white gap-2'>
                <div
                    className='w-1/2'
                >
                    <img 
                        className='rounded-md shadow-slate-700 shadow-md border border-white object-cover bg-center'
                        src={"/points/"+ store.image}

                        alt="" 
                    />
                </div>
                <iframe 
                    className='w-1/2 rounded-md shadow-slate-700 shadow-md'
                    src={store.map} 
                    width="600"  allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                >
                </iframe>
                
            </div>
            :
            ""
        }
    </div>
  )
}
export default memo(Points)
