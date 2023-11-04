import React from 'react'

export default function BlockSubHeader({itemName, image=null}) {
    return (
        <div className='w-full center-r py-1 text-green-500'>
            <div>
                {image}
            </div>
            <span className='font-bold text-center text-lg border-b border-green-500 '>{itemName}</span>
        </div>
    )
}
