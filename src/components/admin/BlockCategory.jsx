import options from '/src/static/icons/options.svg'
import { useEffect, useRef, useState } from 'react'
import LabelSimple from '/src/components/admin/LabelSimple'
import useStore from '/src/hooks/useStore'
import UploadImage from './UploadImage'
import useAdmin from '/src/hooks/useAdmin'
import edit from '/src/static/icons/edit.svg'
import iconDelete from '/src/static/icons/delete.svg'
import imgImages from '/src/static/icons/images.svg'
import add from '/src/static/icons/add.svg'
import imgDelete from '/src/static/icons/delete.svg'
import iconUpdate from '/src/static/icons/update.svg'
import iconCategory from '/src/static/icons/category.svg'
import iconFire from '/src/static/icons/starBlack.svg'
import iconGroup from '/src/static/icons/groupBlack.svg'
import BtnsUpdate from './BtnsUpdate'
import BlockSubHeader from './BlockSubHeader'
import ModalViewRequest from './ModalViewRequest'
import { urlsBackend } from '/src/data/urlsBackend'


export default function BlockCategory({category}) {

    const { 
        update,  
        handleModalViewRequest,
        handleModalStateRequest
    } =useAdmin()
    const {
        groups, 
        mutateCategories
    } = useStore()

    const [showOptions, setShowOptions] = useState(false)
    const [activeEdit, setActiveEdit] = useState(false)
    const [group, setGroup] = useState(0)
    
    const [image, setImage]= useState([])

    const [stateUpdate, setStateUpdate] = useState(false)
    const [waitingUpdate, setWaitingUpdate] = useState(false)
    const [erroresUpdate, setErroresUpdate] = useState({})
    
    const [checked, setChecked] = useState(0)

    const handleChange = (e) => {
        setChecked(!e)
    }

    const nameRef = useRef()
    const groupRef = useRef()

    const removeFile = (name)=>{
        setImage(files => files.filter(file => file?.name !== name))
    }

    useEffect(()=>{
        if(category?.id !== undefined){
            setGroup(category?.group_id)
            setChecked(category.suggested)
        }
    },[category])

    const handleSubmit = async e =>{
        e.preventDefault()
        const categoryToUpdate = {
          _method: 'PUT',
          id: category.id,
          name: nameRef.current.value,
          group_id: groupRef.current.value,
          suggested:checked ? 1 : 0,
          images: image
        }
        if(!waitingUpdate){
            update('categories', categoryToUpdate, setErroresUpdate, setStateUpdate, setWaitingUpdate)
        }

    }


    useEffect(()=>{
        if(stateUpdate){
          mutateCategories()
          setStateUpdate(false)
          setShowOptions(false)
          setActiveEdit(false)
          setImage([])
        }
        handleModalViewRequest(<ModalViewRequest text="Actualizando..." icon={iconUpdate}/>)
        handleModalStateRequest(waitingUpdate)
    },[waitingUpdate])

    return (
        <>
        {
            activeEdit?
            <form
                className='w-full border border-green-500 bg-white shrink-0 -order-1 mb-4 rounded-lg overflow-hidden p-2'
                onSubmit={handleSubmit}
                noValidate
            >
                <BlockSubHeader
                        itemName={`Editar categoría: "${category?.name}"`}
                    />
                
                <div className='center-r'>
                    <div className='center-r w-32'>
                        <img 
                            className=" w-20 h-20 rounded-lg"
                            src={urlsBackend.CATEGORY + category?.images[0]?.['name']} 
                            alt={category?.images[0]} 
                        /> 
                    </div>
                    <div className='center-r gap-2 p-2 flex-wrap '>
                        {/* name */}
                        <LabelSimple
                            htmlfor="name"
                            name="Nombre categoría:"
                            image={iconCategory}
                            error={erroresUpdate?.name}
                        >
                            <input 
                            type="text" 
                            id="name"
                            defaultValue={category?.name}
                            ref={nameRef}
                            />
                        </LabelSimple>

                        {/* Group */}
                        <LabelSimple
                            htmlfor="group"
                            name="Grupo:"
                            image={iconGroup}
                            error={erroresUpdate.category}
                        >
                            <select 
                            id="group"
                            name="group"
                            value={group}
                            ref={groupRef}
                            onChange={(e)=>setGroup(e.target.value)}
                            >
                            {groups?.map((group)=> (<option className="text-slate-600" key={group?.id} value={group?.id} >{group?.name}</option>))}
                            </select>
                        </LabelSimple>

                        <LabelSimple
                            htmlfor="suggested"
                            name="Sugerido:"
                            image={iconFire}
                            error={erroresUpdate.category}
                        >
                            
                            <div className="flex-1 flex justify-center items-center">
                                <label className="relative inline-flex cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={checked} onChange={()=>handleChange(checked)}/>
                                    <div className="w-[200px] h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-[98px] after:transition-all  peer-checked:bg-green-500"></div>
                                </label>
                            </div>

                        </LabelSimple>


                        <div 
                            className="flex flex-col items-start w-full max-w-md group  bg-white border rounded-lg overflow-hidden focus-within:text-green-500 focus-within:border-green-500  text-slate-600 "
                        >
                            <UploadImage
                                setImages={setImage}
                                image={image}
                                max={1}
                            >
                                <label 
                                htmlFor="images"
                                className="flex justify-start items-center gap-x-2 py-1 text-slate-700' text-slate-600 font-bold px-1  transition-all duration-200 group-focus-[.bg-green-500]:text-green-500 "
                                >
                                <img className="w-5 h-5 grey group-focus-[.bg-green-500]:green" src={imgImages} alt="" />
                                    Nueva imagen. <span className=' font-thin'>"Imagen cuadrada"</span>
                                </label>
                                <img className="w-5 h-5 grey group-focus-[.bg-green-500]:green" src={add} alt="" />

                            </UploadImage>
                            <div className="w-full"></div>
                            
                            {
                                image?.length > 0 && (
                                    <div className="flex gap-2 flex-wrap w-full px-1 py-1">
                                
                                        {image?.map(file => (
                                            <li 
                                                className='relative flex justify-center items-center flex-shrink-0 ring-red-700 rounded overflow-hidden focus-within:border-red-700 focus-within:ring-2 flex-1 '
                                                key={file.preview}
                                            >
                                                <img 
                                                    className="w-20 h-20 object-fill"
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
                    </div>
                </div>
                <BtnsUpdate
                    closeAction={()=>{
                        setActiveEdit(false)
                        setShowOptions(false)
                    }}
                />
            </form>
            :
            <div
                className="relative flex flex-col flex-1 w-full max-w-[200px] min-w-[180px] shrink-0 border shadow-md rounded overflow-hidden"
            >
                <img 
                    src={urlsBackend.CATEGORY + category?.images[0]?.['name']} 
                    alt="save" className='object-contain' 
                />
                <div className="flex justify-between w-full items-center px-2 bg-slate-800 py-1 border-t">
                    <div className="flex flex-col items-center text-sm w-full text-white  p-0 font-bold">
                        <span className="font-thin">Categoría:</span> {category?.name}
                    </div>
                    {
                        category?.suggested == true &&(
                            <div>
                                <img className="w-5 h-5 green" src={iconFire} alt="" />
                            </div>
                        )
                    }
                    
                </div>
                {
                    showOptions?
                    <div 
                        className="bg-slate-800 bg-opacity-90 rounded overflow-hidden text-white shadow-md  font-normal opacity-100  absolute  top-100  right-0"
                        onMouseLeave={()=>{
                            setShowOptions(false)
                        }}
                    >
                        <ul className=" text-xs flex flex-col justify-center items-center">
                            <li className="group/li   hover:shadow hover:bg-slate-700 p-2 h-10  cursor-pointer"
                                onClick={()=>{
                                    setActiveEdit(true)
                                }}
                            >
                                <div className="flex justify-between items-center gap-2 w-20 ">
                                    Editar
                                    <img src={edit} alt="save" className='w-4 h-4 white ' />
                                </div>
                            </li>
                            <li className="group/li  hover:shadow hover:bg-slate-700 p-2 h-10  cursor-pointer">
                                <div className="flex justify-between items-center gap-2 w-20 ">
                                    Eliminar
                                    <img src={iconDelete} alt="save" className='w-4 h-4 white ' />
                                </div>
                            </li>
                            
                            
                        </ul>
                    </div>
                    :
                    <div 
                        className="absolute top-0.5 right-0.5 drop-shadow-md shadow-md rounded-full bg-black bg-opacity-60 cursor-pointer"
                        onClick={()=>setShowOptions(true)}
                    >
                        <img src={options} alt="save" className='w-5 h-5 white' />
                    </div>
                }
                
            </div>
        }
        </>
    )
}
