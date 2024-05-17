import React, { useEffect, useRef, useState } from 'react'

import useAdmin from '/src/hooks/useAdmin'
import LabelSimple from '/src/components/admin/LabelSimple'

import ModalViewRequest from '../ModalViewRequest'
import iconSave from '/src/static/icons/save_filled.svg'
import BlockSubHeader from '../BlockSubHeader'
import BtnsUpdate from '../BtnsUpdate'
import ModalBlockHeader from '/src/components/common/modals/ModalBlockHeader'
import ModalContainer from '/src/components/common/modals/ModalContainer'

export default function ModalViewStoreUpdateItem({item, labelName, headerTitle, iconColor, iconBlack}){

    const {
        create,  
        handleModalViewRequest,
        handleModalStateRequest,
        handleModalStateComponent
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
    const closeModal = ()=>{
        handleModalStateComponent(false)
    }
    useEffect(()=>{
        if(state){
            mutate()
            setState(false)
        }
        handleModalViewRequest(<ModalViewRequest text="Guardando..." icon={iconSave} spin={false}/> )
        handleModalStateRequest(waiting)
    },[waiting])

    return (
        <ModalContainer>
            <ModalBlockHeader
                name={headerTitle}
                iconColor={iconColor}
                closeModal={closeModal}
            />
            <form 
                className="flex flex-col justify-between items-center flex-1 p-4 gap-4"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className='flex  flex-col items-center justify-around gap-2 flex-wrap w-full '>
                    {/* name */}
                    <LabelSimple
                        htmlfor="name"
                        name={labelName+':'}
                        image={iconBlack}
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
                    closeAction={closeModal}
                />
                
            </form>
        </ModalContainer>
        
    )
}
