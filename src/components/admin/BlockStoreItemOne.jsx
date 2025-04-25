import React, { useEffect, useRef, useState } from 'react'
import BlockSubHeader from './BlockSubHeader'
import useAdmin from '/src/hooks/useAdmin'
import LabelSimple from '/src/components/admin/LabelSimple'
import BtnsUpdate from './BtnsUpdate'

import iconSave from '/src/static/icons/save_filled.svg'

export default function BlockStoreItemOne({url, itemName, labelName='', mutate, setAction, icon}) {

    const {
        create,  
       
    } = useAdmin()

    const [errores, setErrores] = useState({})
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)

    const nameRef = useRef()


    const handleSubmit = async e =>{
        
        e.preventDefault()
        const itemToStore = {
          name: nameRef.current.value,
        }
        if(!waiting){
            create(url, itemToStore, setErrores, setState, setWaiting)
        }
    }



    return (
        <div className='border border-green-500 mb-4 h-fit bg-white rounded'>
            
            <form 
                className="flex flex-col justify-between  items-center flex-1"
                onSubmit={handleSubmit}
                noValidate
            >
                <BlockSubHeader
                itemName={itemName}
                isNew={true}
                setAction={setAction}
            />
                <div className='flex  flex-col items-center justify-around gap-2 flex-wrap w-full'>
                    {/* name */}
                    <LabelSimple
                        htmlfor="name"
                        name={labelName}
                        image={icon}
                        error={errores?.name}
                    >
                        <input 
                        type="text" 
                        id="name"
                        ref={nameRef}
                        />
                    </LabelSimple>
                </div>
                <BtnsUpdate
                    closeAction={setAction}
                />
                
            </form>
        </div>
    )
}
