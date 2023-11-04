import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkBtn({to, icon, text, imageColor, action = null, style = ' bg-slate-700'}) {
  const styleLink = "center-r text-center cursor-pointer font-poppins-bold text-white hover:scale-110 text-xs transition-all rounded-lg p-2 gap-1 " + style
  return (
    <Link
        className={styleLink} 
        to={to}
        onClick={() => action && action()}
    >
        <img src={icon} alt={text} className={`w-5 h-5 ${imageColor}`} />
        {text}
    </Link>
  )
}
