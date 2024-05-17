import React, { useEffect, useRef, useState } from 'react'
import useAdmin from '/src/hooks/useAdmin'
import LabelSimple from '/src/components/admin/LabelSimple'

import useStore from '/src/hooks/useStore'
import BtnsUpdate from '../BtnsUpdate'
import ModalViewRequest from '../ModalViewRequest'

import UploadImages from '/src/components/common/UploadImages'
import ShowUploadedImages from '/src/components/common/ShowUploadedImages'

import iconSave from '/src/static/icons/save_filled.svg'
import iconTagBlack from '/src/static/icons/tagBlack.svg'

import iconImage from '/src/static/icons/images.svg'

import ModalBlockHeader from '/src/components/common/modals/ModalBlockHeader'
import ModalContainer from '/src/components/common/modals/ModalContainer'
import ImagesShower from '/src/components/admin/ImagesShower'
import { urlsBackend } from '/src/data/urlsBackend'
import iconTag from '/src/static/icons/tag.svg'

export default function ModalViewStoreUpdateType({setAction, item}) {

    const {
        create,  
        update,  
        handleModalViewRequest,
        handleModalStateRequest,
        handleModalStateComponent
    } = useAdmin()

    const {mutateTypes} = useStore()

    const nameRef = useRef()
    const [image, setImage]= useState([])

    const [errores, setErrores] = useState({})
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)

    const removeFile = (name)=>{
        setImage(files => files.filter(file => file.name !== name))
    }

    const closeModal = ()=>{
        handleModalStateComponent(false)
    }
    const handleSubmit = async e =>{
        
        e.preventDefault()
        let typeStore = {
          name: nameRef.current.value,
          image: image[0]
        }
        if(!waiting){
            if(item?.id){
                typeStore.id = item.id
                typeStore._method= 'PUT'
                update('type_products', typeStore, setErrores, setState, setWaiting)
            }else{
                create('type_products', typeStore, setErrores, setState, setWaiting)
            }
        }

    }

    const initail = {
        name:item?.name ? item.name :'',
    }
    const initialImage = {
        name:item?.image ? item.image : '',
        id:item?.image ? item.image : ''
        
    }

    useEffect(()=>{
        if(state){
            mutateTypes()
            setState(false)
            if(setAction){
                setAction(false)
            }
        }
        handleModalViewRequest(<ModalViewRequest text="Guardando..." icon={iconSave} spin={false}/> )
        handleModalStateRequest(waiting)
    },[waiting])

    return (
        <ModalContainer>
            <ModalBlockHeader
                name={item?.id ? "Actualizar Tipo de producto":"Nuevo Tipo de producto"}
                closeModal={closeModal}
                iconColor={iconTag}
            />
            
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
                        defaultValue={initail.name}
                        />
                    </LabelSimple>
                    <LabelSimple
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
                    
                    {
                        image.length == 0 && item?.id && (
                            <ImagesShower images={[initialImage]} url={urlsBackend.ICON}/>
                        )
                    }
        
                    <BtnsUpdate
                        closeAction={closeModal}
                    />
                </div>
                
            </form>
        </ModalContainer>
        
    )
}
