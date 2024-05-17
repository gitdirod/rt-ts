import React from 'react'


const TittleName =({children, font="text-4xl", style= 'bg-slate-700 text-white'})=>{
    return(
        <div className={`font-poppins-extrabold ${font} ${style} px-8 w-fit  py-1 rounded-lg `}>
            {children}
        </div>
    )
}
export default TittleName;