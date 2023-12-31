import React, { useEffect, useRef, useState } from 'react'
import BlockSubHeader from './BlockSubHeader'
import useAdmin from '/src/hooks/useAdmin'
import LabelSimple from '/src/components/admin/LabelSimple'
import iconSave from '/src/static/icons/save_filled.svg'
import iconTag from '/src/static/icons/tagBlack.svg'
import iconDelete from '/src/static/icons/delete.svg'
import iconImage from '/src/static/icons/images.svg'
import add from '/src/static/icons/add.svg'
import useStore from '/src/hooks/useStore'
import UploadImage from './UploadImage'
import BtnsUpdate from './BtnsUpdate'
import AlertAdmin from './AlertAdmin'
import ModalViewRequest from './ModalViewRequest'

export default function BlockStoreType({setAction}) {

    const {
        create,  
        handleModalViewRequest,
        handleModalStateRequest
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
        <div className='border border-green-500 mb-4 h-fit rounded bg-white'>
            
            <form 
                className="flex flex-col justify-between  items-center flex-1"
                onSubmit={handleSubmit}
                noValidate
            >
                <BlockSubHeader
                itemName='Nuevo tipo de producto'
        
            />
                <div className='flex  flex-col items-center justify-around gap-2 flex-wrap w-full'>
                    {/* name */}
                    <LabelSimple
                        htmlfor="name"
                        name="Tipo de producto:"
                        image={iconTag}
                        error={errores.name}
                    >
                        <input 
                        type="text" 
                        id="name"
                        ref={nameRef}
                        />
                    </LabelSimple>


                    <div 
                            className="flex flex-col items-start w-full border rounded-lg max-w-md group  bg-white overflow-hidden focus-within:text-green-500 focus-within:ring-green-500 focus-within:border-green-500  text-slate-600"
                        >
                            <UploadImage
                                setImages={setImage}
                                image={image}
                                max={1}
                            >
                                <label 
                                htmlFor="images"
                                className="flex justify-start items-center gap-x-2 py-1 text-slate-700' text-slate-600 px-1  transition-all duration-200 group-focus-[.bg-green-500]:text-green-500 "
                                >
                                <img className="w-5 h-5 grey group-focus-[.bg-green-500]:green" src={iconImage} alt="" />
                                    Nueva imagen. <span className=' font-thin'>"Imagen cuadrada con transparencia PNG "</span>
                                </label>
                                <img className="w-5 h-5 grey group-focus-[.bg-green-500]:green" src={add} alt="" />

                            </UploadImage>
                            {errores?.image ? <AlertAdmin>{errores?.image}</AlertAdmin> : null}
                        <div className="w-full "></div>
                        
                        {
                            image?.length > 0 && (
                                <div className="flex gap-2 flex-wrap px-1 py-1">
                            
                                    {image?.map(file => (
                                    <li 
                                        className='relative flex justify-center items-center flex-shrink-0 ring-red-700 focus-within:border-red-700 focus-within:ring-2 flex-1 '
                                        key={file.preview}
                                    >
                                        <img 
                                            className="w-32 h-32 object-fill rounded"
                                            src={file.preview} 
                                            alt={file.name} 
                                            onLoad={()=>{
                                            URL.revokeObjectURL(file.preview)
                                            }}
                                        /> 
                                        <button
                                            type='button'
                                            className='absolute focus:opacity-100 outline-none rounded opacity-0 hover:opacity-100 h-full text-white transition-all center-r gap-x-2 bg-red-600 bg-opacity-70 w-full  ring-red-700 focus-within:border-red-700 focus-within:ring-2'
                                            onClick={()=> removeFile(file.name)}
                                        >
                                            <img className="w-6 h-6 white" src={iconDelete} alt="" />
                                            
                                        </button>
                                    </li>
                                    ))}
                                </div>
                            )
                        }
                        
                    </div>
                    <BtnsUpdate
                        closeAction={setAction}
                    />
                </div>
                
            </form>
        </div>
    )
}
