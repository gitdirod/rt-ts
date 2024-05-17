import React from 'react'

export default function Btn({icon, text, textSize=' text-xs ', style = 'bg-slate-700', textColor='text-white', imageColor='white', action = null, isButton=true, padding='p-2'}) {
  const styleLink = 'flex justify-center items-center cursor-pointer hover:scale-110  transition-all rounded-lg font-poppins-bold  gap-1 ' + style +' '+ textColor + ' ' + textSize +' ' + padding;
  return (
      <>
        {
            isButton ?
            <button
                className={styleLink}
                onClick={() => action && action()} // Verifica si 'action' existe antes de llamarla
            >
                {icon && (<img src={icon} alt={text} className={`w-5 h-5 ${imageColor}`}/>)}
                {text}
            </button>
            :
            <div
                className={styleLink}
                onClick={() => action && action()} // Verifica si 'action' existe antes de llamarla
            >
                {icon && (<img src={icon} alt={text} className={`w-5 h-5 ${imageColor}`}/>)} 
                {text}
            </div>
        }
      </>
  )
}
