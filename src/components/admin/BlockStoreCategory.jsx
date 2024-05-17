import React, { useState, useRef, useEffect } from 'react'
import useAdmin from '/src/hooks/useAdmin'
import useStore from '/src/hooks/useStore'
import iconSave from '/src/static/icons/save_filled.svg'
import iconGroup from '/src/static/icons/groupBlack.svg'
import iconImage from '/src/static/icons/images.svg'
import add from '/src/static/icons/add.svg'
import iconDelete from '/src/static/icons/delete.svg'
import iconCategory from '/src/static/icons/category.svg'
import iconFire from '/src/static/icons/fireBlack.svg'
import LabelSimple from './LabelSimple'
import UploadImage from './UploadImage'
import BtnsUpdate from './BtnsUpdate'
import BlockSubHeader from './BlockSubHeader'
import ModalViewRequest from './ModalViewRequest'


export default function BlockStoreCategory({setAction}) {


    const { 
        create,  
        handleModalViewRequest,
        handleModalStateRequest
    } =useAdmin()
    const {
        groups, 
        mutateCategories
    } = useStore()

    const [group, setGroup] = useState(0)
    
    const [image, setImage]= useState([])

    const [stateUpdate, setStateUpdate] = useState(false)
    const [waitingUpdate, setWaitingUpdate] = useState(false)
    const [erroresUpdate, setErroresUpdate] = useState({})
    

    const nameRef = useRef()
    const groupRef = useRef()

    const [checked, setChecked] = useState(0)
    const handleChange = (e) => {
        setChecked(!e)
    }

    const removeFile = (name)=>{
        setImage(files => files.filter(file => file.name !== name))
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        const categoryToSave = {
          name: nameRef.current.value,
          group_id: groupRef.current.value,
          suggested:checked ? 1 : 0,
          images: image
        }
        if(!waitingUpdate){
            create('categories', categoryToSave, setErroresUpdate, setStateUpdate, setWaitingUpdate)
        }

    }


    useEffect(()=>{
        if(stateUpdate){
          mutateCategories()
          setStateUpdate(false)
          setAction(false)
          setImage([])
          
        }
        // handleSetblockRequestShow(
        // <BlockModalRequest
        //     text="Guardando..."
        //     icon={iconSave}
        //     spin={false}
        // />
        // )
        // handleSetModalRequest(waitingUpdate)
        handleModalViewRequest(<ModalViewRequest text="Guardando..." icon={iconSave} spin={false}/> )
        handleModalStateRequest(waitingUpdate)
    },[waitingUpdate])


  return (
        <form
            className='w-full border border-green-500 bg-white shrink-0 -order-1 mb-4 rounded-lg overflow-hidden'
            onSubmit={handleSubmit}
            noValidate
        >

            <BlockSubHeader
                itemName={`Nueva Categoría`}
            />
            <div className='flex justify-around gap-2 p-2 flex-wrap'>
                {/* name */}
                <LabelSimple
                    htmlfor="name"
                    name="Nombre categoría:"
                    image={iconCategory}
                    error={erroresUpdate.name}
                >
                    <input 
                    type="text" 
                    id="name"
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
                    {groups?.map((group)=> (<option className="text-slate-600" key={group.id} value={group.id} >{group.name}</option>))}
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
                    className="flex flex-col items-start w-full max-w-md group border  bg-white overflow-hidden focus-within:text-green-500 focus-within:ring-green-500 focus-within:border-green-500  text-slate-600 focus-within:ring-1 rounded-lg"
                >
                    <UploadImage
                        setImages={setImage}
                        image={image}
                        max={1}
                    >
                        <label 
                        htmlFor="images"
                        className="flex justify-start items-center gap-x-2 py-1 text-slate-700' text-slate-600 font-poppins-bold px-1  transition-all rounded-lg "
                        >
                        <img className="w-5 h-5 grey" src={iconImage} alt="" />
                            Nueva imagen. <span className=' font-thin'>"Imagen cuadrada"</span>
                        </label>
                        <img className="w-5 h-5 grey" src={add} alt="" />

                    </UploadImage>
                    <div className="w-full border-t"></div>
                    
                    {
                        image?.length > 0 ?
                        <div className="flex gap-2 flex-wrap w-full px-1 py-1">
                        
                        {image?.map(file => (
                        <li 
                            className='relative flex justify-center items-center flex-shrink-0 ring-red-700 focus-within:border-red-700 focus-within:ring-2 flex-1 '
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
                                <img className="w-6 h-6 white" src={iconDelete} alt="" />
                                
                            </button>
                        </li>
                        ))}
                        {erroresUpdate?.image ? <Alert>{erroresUpdate?.image}</Alert> : null}
                    </div>
                    :
                    ''
                    }
                
                </div>
                <BtnsUpdate
                    closeAction={()=>{
                        setAction(false)
                    }}
                />
            </div>
        </form>
  )
}
