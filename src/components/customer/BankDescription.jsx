import React from 'react'

export default function BankDescription({bank}) {
  return (
    <div
        className='flex  bg-white justify-center gap-y-4 rounded-lg border px-4 py-2 gap-x-4'
    >
        <div className='flex justify-center items-center '>
            <img 
                className='h-10 rounded-sm'
                src={`/banks/${bank.img}`}
                alt="" 
            />
        </div>
        <div className='flex flex-col'>
            <div className='font-poppins-bold'>
                {bank.name}
            </div>
            <div className='flex flex-col'>
                <p>{bank.type}</p>
                {bank.number}
            </div>
            <div>
                {bank.user}
            </div>
            <div>
                CC:
                {bank.cc}
            </div>
        </div>
    </div>
  )
}
