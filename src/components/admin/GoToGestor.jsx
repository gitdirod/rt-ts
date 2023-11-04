import React from 'react'
import iconGestor from '/src/static/icons/common/config.svg'
import { useAuth } from '/src/hooks/useAuth'
import { Link } from 'react-router-dom'

export default function GoToGestor({to}) {
    const { 
        user 
      } = useAuth({
        middleware: 'guest',
      })
    return (
        <>
            {
            user?.role==='admin' && (
                <Link    
                to={to}        
                className="absolute top-0 right-0 cursor-pointer hover:scale-125 transition-all p-1"
                >
                    <img className="w-6 h-6" src={iconGestor} alt="" />
                </Link>
            )
            }
        </>
    )
}
