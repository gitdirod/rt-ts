import React from 'react'
import iconEmail from '/src/static/icons/email.svg'
import iconPhone from '/src/static/icons/phone.svg'

export default function SellerAdminCustomerTarget({customer}) {
  return (
    <div className='flex justify-center gap-4 w-full font-poppins-regular'>
        <div className='flex items-center gap-1'>
            <span className='font-poppins-extrabold'>{customer?.name}</span>
            {customer?.ccruc && (<span className=''>({customer?.ccruc})</span>)}
            
        </div>
        <div className='flex gap-x-1 items-center'>
            <img src={iconEmail} alt="save" className='w-5 h-5 gray' />
            <span className=''>{customer?.email}</span>
            {/* {user?.phone} */}
        </div>
        <div className='flex gap-x-1 items-center'>
            <img src={iconPhone} alt="save" className='w-5 h-5 gray' />
            <span className=''>{customer?.phone}</span>
        </div>
    </div>
  )
}
