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
import BtnsUpdate from "./BtnsUpdate";

import BlockSubHeader from "./BlockSubHeader";

import iconEdit from '/src/static/icons/edit.svg'
import iconDelete from '/src/static/icons/delete.svg'
import iconOptions from '/src/static/icons/options.svg'
import iconTag from '/src/static/icons/commentBlack.svg'
import iconUpdate from '/src/static/icons/update.svg'
import iconAdd from '/src/static/icons/add.svg'
import iconImages from '/src/static/icons/images.svg'
import iconCalendar from '/src/static/icons/calendar.svg'
import iconText from '/src/static/icons/text.svg'


export default function BlockComment({comment}) {

    const {
        update,  
  
    } = useAdmin()
    const {mutateMemories} = useStore()
    const [showOptions, setShowOptions] = useState(false)
    const [activeEdit, setActiveEdit] = useState(false)
    
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
        const updateComment = {
            _method: 'PUT',
            id: comment.id,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            image: image[0]
        }
        if(!waiting){
            update('memories',updateComment,setErrores, setState, setWaiting)
        }
    }


    return (
        <div 
            className={`relative flex justify-between items-center border p-2 rounded-lg ${activeEdit?
                "bg-white border-green-500 my-4 ":
                "bg-white hover:border-slate-400 "} 
                `}  
        >
            {
                activeEdit?
                <form 
                    className="flex flex-col flex-1"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <BlockSubHeader
                        itemName={`Editar: "${comment.name}"`}
                    />
                    
                    <div className='flex justify-center items-start gap-2 flex-wrap'>
                        
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
                                        defaultValue={comment?.name}
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
                                        defaultValue={comment?.description}
                                        rows={10} 
                                        ref={descriptionRef} 
                                    />
                                </LabelSimple>
                            </div>
                        
                            <div 
                                className="flex flex-col items-start w-full max-w-md group border rounded-lg bg-white overflow-hidden focus-within:text-green-500 focus-within:ring-green-500 focus-within:border-green-500  text-slate-600 focus-within:ring-1"
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
                                    <img className="w-5 h-5 grey group-focus-[.bg-green-500]:green" src={iconImages} alt="" />
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
                                                    <img className="w-6 h-6 white" src={iconDelete} alt="" />
                                                    
                                                </button>
                                            </li>
                                            ))}
                                        </div>
                                    )
                                }
                            </div>

                            <BtnsUpdate
                            closeAction={setActiveEdit}
                        />
                    </div>
                    
                </form>
                :
                <>
                    <div className='flex flex-1 gap-x-4 text-slate-700  transition-all'>
                        <div className="w-52 max-h-52 rounded overflow-hidden center-r">
                            <img 
                                src={import.meta.env.VITE_API_URL + "/memories/"+comment?.image} 
                                alt="save" className='object-contain  rounded shadow' 
                            />
                        </div>
                        <div className='flex flex-col flex-1 w-full'>
                            <div className=" flex justify-between text-2xl font-bold">
                                {comment.name}
                                <div className="flex  items-center gap-x-2">
                                    <img src={iconCalendar} alt="" className='w-4 h-4 gray'/>
                                    <span className=' font-thin text-sm'>{moment(comment?.updated_at).format("ll")}</span>
                                </div>
                            </div>
                            <div className=" text-slate-600">
                                {comment.description}
                            </div>
                        </div>
                    </div>
                    <div 
                        className='relative flex group/item flex-col justify-center items-center px-4 font-bold text-sm cursor-pointer'
                    >
                        
                        {
                            showOptions?
                            <div 
                                className="bg-slate-800 text-white shadow-md  font-normal rounded overflow-hidden opacity-100 transition-all absolute  top-100  right-0"
                                onMouseLeave={()=>{
                                    setShowOptions(false)
                                }}
                            >
                                <ul className=" text-xs flex justify-center items-center">
                                    <li className="group/li hover:bg-slate-700 p-2 transition-all">
                                        <div className="flex justify-between items-center gap-2 w-20 ">
                                            Eliminar
                                            <img src={iconDelete} alt="save" className='w-4 h-4 white transition-all' />
                                        </div>
                                    </li>
                                    <li className="group/li hover:bg-slate-700 p-2 transition-all"
                                        onClick={()=>{
                                            setActiveEdit(true)
                                            setShowOptions(false)
                                            setImage([])
                                        }}
                                    >
                                        <div className="flex justify-between items-center gap-2 w-20 ">
                                            Editar
                                            <img src={iconEdit} alt="save" className='w-4 h-4 white transition-all' />
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div>
                            :
                            <div onClick={()=>setShowOptions(!showOptions)}>
                                <img src={iconOptions} alt="save" className='w-4 h-4 grey' />
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    )
}
