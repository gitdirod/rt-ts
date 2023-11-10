import React, { useEffect, useRef, useState } from 'react'
import useAdmin from '/src/hooks/useAdmin'
import LabelSimple from '/src/components/admin/LabelSimple'

import useStore from '/src/hooks/useStore'
import BtnsUpdate from '../BtnsUpdate'
import ModalViewRequest from '../ModalViewRequest'
import Btn from '../Btn'
import UploadImages from '/src/components/common/UploadImages'
import ShowUploadedImages from '/src/components/common/ShowUploadedImages'

import iconSave from '/src/static/icons/save_filled.svg'
import iconTagBlack from '/src/static/icons/tagBlack.svg'
import iconTag from '/src/static/icons/tag.svg'
import iconImage from '/src/static/icons/images.svg'
import iconClose from '/src/static/icons/seller/close.svg'

export default function ModalViewStoreType({setAction}) {

    const {
        create,  
        handleModalViewRequest,
        handleModalStateRequest,
        handleModalStateComponent
    } = useAdmin()
    const {mutateTypes} = useStore()

    const [errores, setErrores] = useState({})
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)

    const nameRef = useRef()
    const [image, setImage]= useState([])

    const removeFile = (name)=>{
        setImage(files => files.filter(file => file.name !== name))
    }

    const closeModal = ()=>{
        handleModalStateComponent(false)
    }

    const handleSubmit = async e =>{
        
        e.preventDefault()
        const typeStore = {
          name: nameRef.current.value,
          image: image[0]
        }
        if(!waiting){
            create('type_products', typeStore, setErrores, setState, setWaiting)
        }
    }

    useEffect(()=>{
        if(state){
            mutateTypes()
            setState(false)
            setAction(false)
        }
        handleModalViewRequest(<ModalViewRequest text="Guardando..." icon={iconSave} spin={false}/> )
        handleModalStateRequest(waiting)
    },[waiting])

    return (
        <div className='h-fit bg-white max-h-[calc(100vh-10vh)] top-full z-10 rounded-lg overflow-auto'>
            <div className="relative w-full gap-4 center-r p-2 font-light bg-slate-800 text-white text-2xl rounded-t-lg md:min-w-[500px]">
                <img src={iconTag} className="w-8" alt="ok" />
                <span className="text-base md:text-xl font-poppins-regular">Nuevo Tipo de producto</span>
                
                <Btn
                    style='md:absolute bg-white right-2 '
                    icon={iconClose}
                    imageColor
                    action={()=>{
                        closeModal()
                    }}
                />
            </div>
            
            <form 
                className="flex flex-col justify-between items-center flex-1 p-4 "
                onSubmit={handleSubmit}
                noValidate
            >
                <div className='flex  flex-col items-center justify-around gap-2 flex-wrap w-full '>
                    {/* name */}
                    <LabelSimple
                        htmlfor="name"
                        name="Nombre:"
                        image={iconTagBlack}
                        error={errores.name}
                    >
                        <input 
                        type="text" 
                        id="name"
                        ref={nameRef}
                        />
                    </LabelSimple>
                    <LabelSimple
                        htmlfor="image"
                        name="Imagen:"
                        image={iconImage}
                        error={errores.image}
                    >
                        
                        <UploadImages
                            setImages={setImage}
                            images={image}
                            max={1}
                        >
                                <div className=' font-poppins-regular text-slate-400 '>Imagen cuadrada PNG</div>
                        </UploadImages>
                    </LabelSimple>

                    <ShowUploadedImages
                        removeImage={removeFile}
                        images={image}
                    />
        
                    <BtnsUpdate
                        closeAction={closeModal}
                    />
                </div>
                
            </form>
        </div>
    )
}
