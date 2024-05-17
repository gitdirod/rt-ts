import {memo, useEffect, useState, createRef} from 'react'
import useAdmin from '../../hooks/useAdmin'
import useStore from '../../hooks/useStore'
import imgEdit from '/src/static/icons/edit.svg'
import Alert from '../../components/Alert'
import UploadIcon from '../../components/admin/UploadIcon'


const TagBlock=({tag})=> {

    const {
        update,
    } = useAdmin()

    const {
        mutateTypes,
    }= useStore()
    const nameRef = createRef()
    const [icon, setIcon] = useState([])

    
    const [edit, setEdit] = useState(false)
    const [editErrores, setEditErrores] = useState(false)
    const [editState, setEditState] = useState(false)
    const [editWaiting, setEditWaiting] = useState(false)

    const handleEdit = e => {
        e.preventDefault()
        
        const updateTag = {
            _method: 'PUT',
            id: tag.id,
            name: nameRef.current.value,
            images: icon
        }
        if(!editWaiting){
            update('type_products',updateTag,setEditErrores,setEditState, setEditWaiting)
        }
    }
    useEffect(()=>{
        if(editState){
            mutateTypes()
            setEditState(false)
            setEditWaiting(false)
            setEdit(false)
        }
    },[editWaiting])

    return (
        <div 
            className='relative flex font-semibold border rounded-md'
        >
            {
                edit?
                <form
                    className='relative flex gap-x-2 w-full rounded-md text-slate-600 border-slate-600 h-full px-2 py-4 overflow-hidden'
                    onSubmit={handleEdit}
                    noValidate
                >

                    <div 
                        className='absolute flex gap-x-2 right-0 top-0'
                    >
                        <div
                            className=' cursor-pointer p-1 text-slate-700 font-bold'
                            onClick={()=>setEdit(false)}
                        >
                            Cancelar
                        </div>
                        <button
                            className=' cursor-pointer p-1 text-green-500 font-bold'
                        >
                            Guardar
                        </button>
                    </div>

                    <div 
                        className='flex gap-x-4  items-center cursor-pointer font-bold text-xl'
                    >
                        <div className='w-10'>
                            <span className='text-base font-normal'>#{tag.id}</span>
                        </div>
                        <div className='w-10 h-10'>
                        <UploadIcon
                            setIcon={setIcon}
                            errores={editErrores}
                        />
                        </div>
                            <input 
                                type="text" 
                                id="name"
                                className="outline-none  transition-all duration-200 underline decoration-1"
                                placeholder="Escribe un nuevo nombre"
                                defaultValue={tag?.name}
                                ref={nameRef}
                            />
                    </div>

                    {editErrores.name ? <Alert>{editErrores.name}</Alert> : null}
                </form>
                :
                <>
                    <div className='relative flex gap-x-2 w-full rounded-md text-slate-600 border-slate-600 h-full px-2 py-4 overflow-hidden'>
                        <div
                            className='absolute top-0 right-0 border border-red-500'
                        >
                            <div
                                className='absolute top-0 right-0 flex'
                            >
                                <div
                                    className='cursor-pointer p-1 text-green-500'
                                    onClick={()=>setEdit(true)}
                                >
                                    <img className="w-6 h-6 grey" src={imgEdit} alt="" />
                                </div>
                            </div>
                        </div>

                        <div 
                            className='flex gap-x-4  items-center cursor-pointer font-bold text-xl'
                        >
                            <div className='w-10'>
                                <span className='text-base font-normal'>#{tag.id}</span>
                            </div>
                            <div className='w-10'>
                                <img 
                                    className='w-6 h-6 '
                                    src={import.meta.env.VITE_API_URL + "/iconos/" + tag.image}  
                                    alt="" 
                                />
                            </div>
                            <div>
                                {tag?.name}
                            </div>
                        </div>
                        
                    </div>
                    
                </>
            }
            {
            editWaiting?
            <div
                className='absolute flex justify-center items-center bg-opacity-90 left-0 right-0 top-0 bottom-0 h-full w-full bg-black text-white font-extrabold rounded-md shadow-md'
            >
                Guardando...
            </div>
            :
            ""
        }
            
            
        </div>
    )
}

export default memo(TagBlock) 