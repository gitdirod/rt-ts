import React from 'react'


const TittleName =({children, font="text-2xl md:text-4xl", style= 'text-zinc-700 '})=>{
    return(
        <div className={`font-poppins-extrabold ${font} ${style} px-8 w-fit  py-4 rounded-lg `}>
            {children}
        </div>
    )
}
export default TittleName;