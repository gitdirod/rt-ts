import React, { memo } from 'react'
import { sectionsUser } from '/src/data/sectionsUser'
import ButtomBar from './ButtomBar'
import useStore from '/src/hooks/useStore'
import { useAuth } from '/src/hooks/useAuth'


const BottomBarClient=()=> {

    const { 
        modalBuy  
    } = useStore()
    const { user } = useAuth({middleware: 'guest'})
    const zindex = modalBuy ? "z-0" : "z-30"
    
  return (
    <>
    {user && (
        <div className={`flex md:hidden fixed justify-center items-center bottom-0 w-full bg-white bg-opacity-80 shadow-t-md backdrop-blur-sm ${zindex}`}>
            <div className='w-fit md:w-48'>
                <ul className='flex font-bold'>
                    {sectionsUser.map( section => section && (
                        <ButtomBar 
                            key={section.id}
                            section={section}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )}
    </>
  )
}
export default memo(BottomBarClient)