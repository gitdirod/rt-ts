import React from 'react'

export default function ModalContainer({children}) {
  return (
    <div className='h-fit bg-white max-h-[calc(100vh-10vh)] top-full z-10 rounded-lg overflow-auto'>
        {children}
    </div>
  )
}
