import {memo, useEffect, useState, createRef} from 'react'
import useAdmin from '../../hooks/useAdmin'
import useStore from '../../hooks/useStore'
import Alert from '../../components/Alert'
import add from '/src/static/icons/add.svg'
import imgSize from '/src/static/icons/size.svg'
import imgEdit from '/src/static/icons/edit.svg'
import imgDelete from '/src/static/icons/delete.svg'
import close from '/src/static/icons/close.svg'


const SizeBlock=({size})=> {

    const {
        update,
        destroy
    } = useAdmin()

    const {
        mutateSizes,
    }= useStore()
    const nameRef = createRef()
    
    const [del, setDel] = useState(false)
    const [delErrores, setDelErrores] = useState(false)
    const [delState, setDelState] = useState(false)
    const [delWaiting, setDelWaiting] = useState(false)
    
    const [edit, setEdit] = useState(false)
    const [editErrores, setEditErrores] = useState(false)
    const [editState, setEditState] = useState(false)
    const [editWaiting, setEditWaiting] = useState(false)

    const handleEdit = e => {
        e.preventDefault()
        
        const renameSize = {
            _method: 'PUT',
            id: size.id,
            name: nameRef.current.value
        }
        if(!delWaiting){
            update('sizes',renameSize,setEditErrores,setEditState, setEditWaiting)
        }
    }
    useEffect(()=>{
        if(editState){
            mutateSizes()
            setEditState(false)
            setEditWaiting(false)
            setEdit(false)
        }
    },[editWaiting])


    const handleDel= e =>{
        e.preventDefault()
        const delSize = {
            _method: 'DELETE',
            id: size.id,
        }
        
        if(!delWaiting){
            destroy('sizes', delSize,setDelErrores,setDelState, setDelWaiting)
        }
    }
    useEffect(()=>{
        if(delState){
            mutateSizes()
            setDelState(false)
            setDel(false)
        }
    },[delWaiting])

    return (
        <div 
            className='relative flex font-semibold border rounded-md'
        >
            {
                edit?
                <form
                    className='w-full py-4 px-2'
                    onSubmit={handleEdit}
                    noValidate
                >
                    <div className='flex gap-x-2 items-center rounded-md'>
                        <label 
                            htmlFor="Name"
                            className="flex justify-start gap-x-2 text-slate-600 font-bold group-hover:text-slate-700 transition-all duration-200 flex-shrink-0"
                        >
                            <img className="w-6 h-6 grey" src={imgSize} alt="" />
                            Actualizar:
                        </label>
                        <input 
                            type="text" 
                            id="name"
                            className="border-slate-300 focus:border-green-400 hover:shadow-green-200 w-full text-slate-600 font-semibold px-3 py-1 rounded-md border outline-none  hover:shadow-sm transition-all duration-200"
                            placeholder="Escribe un nuevo nombre"
                            defaultValue={size?.name}
                            ref={nameRef}
                        />
                        
                        <button 
                            className='flex w-fit gap-x-2 items-center bg-green-500 text-white font-bold px-2 py-1 rounded-md cursor-pointer'
                        >
                            <div className={`${editWaiting?'animate-spin':''}`}>
                                <img 
                                    className="w-6 h-6 grey"
                                    src={add}
                                    alt="" 
                                />
                            </div>
                            <span className="text-sm">{editWaiting? "Guardando...": "Guardar"}</span>
                        </button>
                        <div
                            className='flex w-fit gap-x-2 items-center bg-slate-600 text-white font-bold px-2 py-1 rounded-md cursor-pointer'
                            onClick={()=>setEdit(false)}
                        >
                            <img className="w-6 h-6 grey" src={close} alt="" />
                            Cancelar
                        </div>
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
                                <div
                                    className=' cursor-pointer p-1 text-red-500'
                                    onClick={()=>setDel(true)}
                                >
                                    <img className="w-6 h-6 grey" src={imgDelete} alt="" />
                                </div>
                            </div>
                        </div>

                        <div 
                            className='cursor-pointer font-bold text-xl'
                        >
                            {size?.name}
                        </div>
                        
                    </div>
                    
                </>
            }
            {
                del?
                <div
                className='absolute gap-y-4 flex flex-col justify-center items-center gap-x-2 w-full h-full bg-black bg-opacity-90 left-0 right-0 top-0 bottom-0 rounded-md shadow-md'
            >
                {/* <p className='text-white  font-bold'>Se eliminaran los datos.</p> */}
                <form 
                    onSubmit={handleDel}
                    noValidate
                    className='flex justify-center items-center gap-x-4'
                >
                    <button 
                        className='bg-red-500 text-slate-900 font-bold px-4 py-2 rounded-md cursor-pointer'
                    >
                        Eliminar
                    </button>
                    <div className='bg-white text-slate-900 font-bold px-4 py-2 rounded-md cursor-pointer'
                        onClick={()=>setDel(false)}
                    >
                        Cancelar
                    </div>
                </form>
            </div>
                :
                ""
            }
        </div>
    )
}

export default memo(SizeBlock) 