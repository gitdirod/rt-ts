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
import { urlsBackend } from "/src/data/urlsBackend"
import ModalViewStoreUpdateType from "/src/components/admin/modals/ModalViewStoreUpdateType"




export default function BlockType({type}) {

    const {
        update,  
        handleModalViewRequest,
        handleModalStateRequest,
        handleModalStateComponent,
        handleModalViewComponent
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

    const editItem=()=>{
        handleModalViewComponent(<ModalViewStoreUpdateType item={type} setAction={setActiveEdit}/>)
        handleModalStateComponent(true)
    }

    return (
        <div 
            className="relative flex justify-between items-center border mt-0.5 py-2  group rounded-lg bg-white hover:border-slate-400"   
            onClick={editItem}
        >
            <div className='flex gap-x-4 items-center text-slate-700 group-hover:font-bold transition-all'>
                <span className=' w-10 px-4 text-sm'>
                    {type.id}
                </span>
                <img 
                    src={urlsBackend.ICON +type?.image} 
                    alt="save" className='object-contain w-10' 
                />
                <div className=''>
                    {type.name}
                </div>
            </div>
        </div>
    )
}
