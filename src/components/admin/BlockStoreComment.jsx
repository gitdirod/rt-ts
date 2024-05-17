import { useRef, useState, useEffect } from "react"


import moment from 'moment/dist/moment';
import 'moment/dist/locale/es'
import localization from 'moment/locale/es';
moment.suppressDeprecationWarnings = true;
moment.updateLocale('es', localization);

import LabelSimple from "/src/components/admin/LabelSimple"
import UploadImage from "/src/components/admin/UploadImage"
import useStore from "/src/hooks/useStore"
import useAdmin from "/src/hooks/useAdmin"
import BlockSubHeader from "/src/components/admin/BlockSubHeader";
import iconText from '/src/static/icons/text.svg'
import iconTag from '/src/static/icons/commentBlack.svg'
import iconSave from '/src/static/icons/save_filled.svg'
import iconAdd from '/src/static/icons/add.svg'
import imgImages from '/src/static/icons/images.svg'
import imgDelete from '/src/static/icons/delete.svg'
import BtnsUpdate from "./BtnsUpdate";
import ModalViewRequest from "./ModalViewRequest";


export default function BlockStoreComment({setAction}) {

    const {
        create,  
        handleModalViewRequest,
        handleModalStateRequest
    } = useAdmin()
    const {mutateMemories} = useStore()
    
    const [errores, setErrores] = useState({})
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)
    
    const nameRef = useRef()
    const descriptionRef = useRef()
    const [image, setImage]= useState([])

    const removeFile = (name)=>{
        setImage(files => files.filter(file => file.name !== name))
    }

    const handleSubmit = async e =>{
        
        e.preventDefault()
        const storeComment = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            image: image[0]
        }
        if(!waiting){
            create('memories',storeComment,setErrores, setState, setWaiting)
        }
    }

    useEffect(()=>{
        if(state){
            mutateMemories()
            setState(false)
            setAction(false)
        }
        handleModalViewRequest(<ModalViewRequest text="Guardando..." icon={iconSave} spin={false}/> )
        handleModalStateRequest(waiting)
    },[waiting])
    return (
        <div 
            className={`relative flex justify-between items-center rounded border my-4 bg-white border-green-500  `}  
        >
 
            <form 
                className="flex flex-col flex-1"
                onSubmit={handleSubmit}
                noValidate
            >
                <BlockSubHeader
                    itemName={`Nuevo comentario`}
                />
                
                <div className='flex items-start justify-center gap-2 p-2 flex-wrap'>
                    
                        <div className="flex flex-col gap-2 w-full max-w-md">
                                {/* name */}
                            <LabelSimple
                                htmlfor="name"
                                name="Título: "
                                image={iconTag}
                                error={errores.name}
                            >
                                <input 
                                    type="text" 
                                    id="name"
                                    className="flex-1 font-semibold outline-none transition-all mx-2"
                                    ref={nameRef}
                                />
                            </LabelSimple>

                            <LabelSimple
                                htmlfor="type"
                                name="Descripción:"
                                image={iconText}
                                flex='flex flex-col'
                                error={errores.description}
                            > 
                                <textarea 
                                    className="w-full rounded text-slate-600 text-left  px-3 py-1 focus:text-green-500"
                                    type="text" 
                                    placeholder="Comenta..."
                                    rows={10} 
                                    ref={descriptionRef} 
                                />
                            </LabelSimple>
                        </div>
                    
                        <div 
                            className="flex flex-col items-start rounded-lg w-full max-w-md group border bg-white overflow-hidden style-input-green text-slate-600 focus-within:ring-1"
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
                                <img className="w-5 h-5 grey group-focus-[.bg-green-500]:green" src={imgImages} alt="" />
                                    Nueva imagen. <span className=' font-thin'>"Imagen cuadrada 500x500 "</span>
                                </label>
                                <img className="w-5 h-5 grey group-focus-[.bg-green-500]:green" src={iconAdd} alt="" />

                            </UploadImage>
                            <div className="w-full"></div>
                        
                            {
                                image?.length > 0 && (
                                    <div className="flex gap-2 flex-wrap w-full px-1 py-1">
                                
                                        {image?.map(file => (
                                        <li 
                                            className='relative flex justify-center items-center flex-shrink-0 ring-red-700 focus-within:border-red-700 focus-within:ring-2 flex-1 '
                                            key={file.preview}
                                        >
                                            <img 
                                                className="w-32 h-32 object-fill"
                                                src={file.preview} 
                                                alt={file.name} 
                                                onLoad={()=>{
                                                URL.revokeObjectURL(file.preview)
                                                }}
                                            /> 
                                            <button
                                                type='button'
                                                className='absolute focus:opacity-100 outline-none opacity-0 hover:opacity-100 h-full text-white transition-all flex justify-center gap-x-2 items-center bg-red-600 bg-opacity-70 w-full  ring-red-700 focus-within:border-red-700 focus-within:ring-2'
                                                onClick={()=> removeFile(file.name)}
                                            >
                                                <img className="w-6 h-6 white" src={imgDelete} alt="" />
                                                
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
