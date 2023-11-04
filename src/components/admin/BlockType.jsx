import { useRef, useState, useEffect } from "react"
import LabelSimple from "/src/components/admin/LabelSimple"
import UploadImage from "/src/components/admin/UploadImage"
import useStore from "/src/hooks/useStore"
import useAdmin from "/src/hooks/useAdmin"
import BtnsUpdate from "./BtnsUpdate"
import ModalViewRequest from "./ModalViewRequest"
import iconUpdate from '/src/static/icons/update.svg'
import iconAdd from '/src/static/icons/add.svg'
import iconImages from '/src/static/icons/images.svg'
import iconDelete from '/src/static/icons/delete.svg'
import iconTag from '/src/static/icons/tagBlack.svg'
import iconEdit from '/src/static/icons/edit.svg'
import iconOptions from '/src/static/icons/options.svg'




export default function BlockType({type}) {

    const {
        update,  
        handleModalViewRequest,
        handleModalStateRequest
    } = useAdmin()
    const {mutateTypes} = useStore()
    const [showOptions, setShowOptions] = useState(false)
    const [activeEdit, setActiveEdit] = useState(false)
    
    const [errores, setErrores] = useState({})
    const [stateUpdate, setStateUpdate] = useState(false)
    const [waitingUpdate, setWaitingUpdate] = useState(false)
    
    const nameRef = useRef()
    const [image, setImage]= useState([])

    const removeFile = (name)=>{
        setImage(files => files.filter(file => file.name !== name))
    }

    const handleSubmit = async e =>{
        
        e.preventDefault()
        const typeToUpdate = {
            _method: 'PUT',
            id: type.id,
            name: nameRef.current.value,
            image: image[0]
        }
        if(!waitingUpdate){
            update('type_products', typeToUpdate, setErrores, setStateUpdate, setWaitingUpdate)
        }
    }

    useEffect(()=>{
        if(stateUpdate){
            mutateTypes()
            setStateUpdate(false)
            setActiveEdit(false)
            setShowOptions(false)
            setImage([])
        }
        handleModalViewRequest(<ModalViewRequest text="Actualizando..." icon={iconUpdate}/>)
        handleModalStateRequest(waitingUpdate)
    },[waitingUpdate])

    return (
        <div 
            className={`relative flex justify-between items-center border mt-0.5 py-2  group rounded-lg  ${activeEdit?
                "bg-white border-green-500 mt-4 mb-4":
                "bg-white hover:border-slate-400 "} 
                `}  
        >
            {
                activeEdit?
                <form 
                    className="flex flex-col justify-between  items-center flex-1 "
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className='w-full center-r text-green-500 '>
                        <span className=' font-bold text-center'>Editar: {type?.name}</span>
                    </div>
                    <div className='center-r gap-2 flex-wrap w-full'>


                        {
                            image?.length > 0 ?
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
                                        className='absolute rounded focus:opacity-100 outline-none opacity-0 hover:opacity-100 h-full text-white transition-all flex justify-center gap-x-2 items-center bg-red-600 bg-opacity-70 w-full  ring-red-700 focus-within:border-red-700 focus-within:ring-2'
                                        onClick={()=> removeFile(file.name)}
                                    >
                                        <img className="w-6 h-6 white" src={iconDelete} alt="" />
                                        
                                    </button>
                                </li>
                                ))}
                            </div>:
                            <img 
                                src={import.meta.env.VITE_API_URL + "/iconos/"+type?.image} 
                                alt="save" className='object-contain w-20  px-1' 
                            />
                        }
                        
                        {/* name */}
                        <div className="flex flex-col gap-2">
                            <LabelSimple
                                htmlfor="name"
                                name="Nombre tipo de producto:"
                                image={iconTag}
                                error={errores.name}
                            >
                                <input 
                                type="text" 
                                id="name"
                                defaultValue={type?.name}
                                ref={nameRef}
                                />
                            </LabelSimple>

                            <div 
                                className="flex flex-col items-start w-full max-w-md group h-8 border rounded-lg bg-white overflow-hidden focus-within:text-green-500 focus-within:ring-green-500 focus-within:border-green-500  text-slate-600"
                            >
                                <UploadImage
                                    setImages={setImage}
                                    image={image}
                                    max={1}
                                    isBlock={true}
                                >
                                    <label 
                                    htmlFor="images"
                                    className="flex justify-start items-center gap-x-2 py-1 text-slate-700' text-slate-600 px-1  transition-all duration-200 group-focus-[.bg-green-500]:text-green-500 "
                                    >
                                    <img className="w-5 h-5 grey group-focus-[.bg-green-500]:green" src={iconImages} alt="" />
                                        Nueva imagen. <span className=' font-thin'>"Imagen cuadrada con transparencia PNG "</span>
                                    </label>
                                    <img className="w-5 h-5 grey group-focus-[.bg-green-500]:green" src={iconAdd} alt="" />

                                </UploadImage>
                            
                        </div>
                    </div>
                    <BtnsUpdate
                        closeAction={()=>{
                            setActiveEdit(false)
                            setShowOptions(false)
                        }}
                    />

                    </div>
                </form>
                :
                <>
                    <div className='flex gap-x-4 items-center text-slate-700 group-hover:font-bold transition-all'>
                        <span className=' w-10 px-4 text-sm'>
                            {type.id}
                        </span>
                        <img 
                            src={import.meta.env.VITE_API_URL + "/iconos/"+type?.image} 
                            alt="save" className='object-contain w-10' 
                        />
                        <div className=''>
                            {type.name}
                        </div>
                    </div>
                    <div 
                        className='relative flex group/item flex-col justify-center items-center px-4 font-bold text-sm cursor-pointer'
                    >
                        
                        {
                            showOptions?
                            <div 
                                className="bg-slate-800 text-white shadow-md  font-normal opacity-100 transition-all absolute  top-100  right-0 rounded overflow-hidden"
                                onMouseLeave={()=>{
                                    setShowOptions(false)
                                }}
                            >
                                <ul className=" text-xs flex justify-center items-center">
                                    <li className="group/li  hover:bg-slate-700 p-2 transition-all">
                                        <div className="flex justify-between items-center gap-2 w-20 ">
                                            Eliminar
                                            <img src={iconDelete} alt="save" className='w-4 h-4 white transition-all' />
                                        </div>
                                    </li>
                                    <li className="group/li   hover:bg-slate-700 p-2 transition-all"
                                        onClick={()=>setActiveEdit(true)}
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
