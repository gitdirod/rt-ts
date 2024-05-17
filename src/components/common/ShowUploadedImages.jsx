import React from 'react'
import iconDelete from "/src/static/icons/admin/delete.svg"

export default function ShowUploadedImages({removeImage, images}) {
    if(images?.length === 0){
        return ''
    }
    return (
        <ul className='center-r gap-x-4 shrink-1 flex-wrap w-fit'>
            {images.map(image => (
                <li 
                    className='relative center-c flex-shrink-0 group  rounded-lg border p-0.5 bg-white overflow-hidden'
                    key={image.preview}
                >
                    <img 
                        className='h-20 rounded-lg'
                        src={image.preview} 
                        alt={image.name} 
                        onLoad={()=>{
                        URL.revokeObjectURL(image.preview)
                        }}
                    /> 
                    <button
                        type='button'
                        className='absolute opacity-0 hover:opacity-100 h-full bg-black flex justify-center items-center bg-opacity-80 w-full'
                        onClick={()=> removeImage(image.name)}
                    >
                        <img className="w-10 h-10" src={iconDelete} alt="" />
                    </button>
                </li>
            ))}
        
        </ul>
  )
}
