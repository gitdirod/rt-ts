import {memo, useEffect, useState, createRef} from 'react'
// import IconDelete from '../../components/admin/IconDelete'
// import IconEdit from '../../components/admin/IconEdit'
import useAdmin from '../../hooks/useAdmin'
import useStore from '../../hooks/useStore'
import UploadImage from '../../components/admin/UploadImage'
import Alert from '../../components/Alert'
import imgDelete from '/src/static/icons/delete.svg'
import edit from '/src/static/icons/edit.svg'

const MemoryBlock=({memory})=> {
    const{update, destroy}= useAdmin()
    const{mutateMemories}= useStore()
    
    
    const[sendDelete, sendSetDelete]= useState(false)
    
    const[eliminar, setEliminar]= useState(false)
    const[deleteState, setDeleteState]= useState(false)
    const[deleteWaiting, setDeleteWaiting]= useState(false)
    const[deleteErrores, setDeleteErrores]= useState(false)

    const[editar, setEditar]= useState(false)
    const[editarState, setEditarState]= useState(false)
    const[editarWaiting, setEditarWaiting]= useState(false)
    const[editarErrores, setEditarErrores]= useState(false)
    
    const descriptionRef = createRef()
    const nameRef = createRef()
    const[image, setImage]= useState(false)

    const handleDelete= e =>{
        e.preventDefault()
        const deleteMemory = {
            _method: 'DELETE',
            id: memory.id,
        }
        if(!deleteWaiting){
            destroy('memories', deleteMemory, setDeleteErrores,setDeleteState, setDeleteWaiting)
        }
    }
    useEffect(()=>{
        if(deleteState){
            mutateMemories()
            setEliminar(false)
            setDeleteWaiting(false)
            setDeleteState(false)
        }
    },[deleteWaiting])

    const handleEditar= e =>{
        e.preventDefault()
        const updateMemory = {
            _method: 'PUT',
            id: memory.id,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            image: image[0]
        }
        console.log(updateMemory)
        if(!editarWaiting){
            update('memories',updateMemory,setEditarErrores,setEditarState, setEditarWaiting)
        }
    }
    useEffect(()=>{
        if(editarState){
            mutateMemories()
            setEditar(false)
            setEditarWaiting(false)
            setEditarState(false)
        }
    },[editarWaiting])
    
  return (
    <div 
        className='relative flex gap-y-1 flex-col border rounded-md shadow-md border-y-slate-300 px-2 py-1'
    >
        
        {
            !editar && !eliminar?
            <div
                className='absolute top-0 right-0 flex'
            >
                <div
                    className='cursor-pointer p-1 text-green-500'
                    onClick={()=>setEditar(!editar)}
                >
                    <img className="w-6 h-6 grey" src={edit} alt="" />
                </div>
                <div
                    className=' cursor-pointer p-1 text-red-500'
                    onClick={()=>setEliminar(true)}
                >
                    <img className="w-6 h-6 grey" src={imgDelete} alt="" />
                </div>
            </div>
            :
            ""
        }
        {
            eliminar?
            <div
                className='absolute gap-y-4 flex flex-col justify-center items-center gap-x-2 w-full h-full bg-black bg-opacity-90 left-0 right-0 top-0 bottom-0 rounded-md shadow-md'
            >
                <p className='text-white  font-bold'>Se eliminaran los datos.</p>
                <form 
                    onSubmit={handleDelete}
                    noValidate
                    className='flex justify-center items-center gap-x-4'
                >
                    <button 
                        className='bg-red-500 text-slate-900 font-bold px-4 py-2 rounded-md cursor-pointer'
                    >
                        Eliminar
                    </button>
                    <div className='bg-white text-slate-900 font-bold px-4 py-2 rounded-md cursor-pointer'
                        onClick={()=>setEliminar(false)}
                    >
                        Cancelar
                    </div>
                </form>
            </div>
            :
            ""
        }
        {
            editar?
            <form 
                className='relative flex justify-start gap-x-4'
                onSubmit={handleEditar}
                noValidate
            >

                <div 
                    className='absolute flex gap-x-2 right-0 top-0'
                >
                    <div
                        className=' cursor-pointer p-1 text-slate-700 font-bold'
                        onClick={()=>setEditar(false)}
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
                    className='relative'
                >
                    <div
                        className='absolute flex justify-center items-center h-full bg-white w-64 rounded-md shadow-md  border border-white'
                    >
                        <UploadImage
                            setImages={setImage}
                            errores={editarErrores}
                            w="w-64"
                            textPut='Agregar imagen, o click para seleccionar. Dimensión libre, se ajustará a 500px sin perder escala'
                        />
                    </div>
                    <img 
                        className='w-64 rounded-md shadow-md  border border-white'
                        src={import.meta.env.VITE_API_URL + "/memories/" + memory.image} 
                        alt={memory.name} 
                    />
                </div>
                <div className='flex gap-y-1 flex-col flex-1'>
                    <div className=''>
                        <input 
                            type="text" 
                            className='text-xl font-extrabold outline-none px-2 w-full underline decoration-1 '
                            defaultValue={memory.name}
                            ref={nameRef}
                        />
                        {editarErrores.name ? <Alert>{editarErrores.name}</Alert> : null}
                    </div>
                    <div className=' flex-1 rounded-md  px-2 py-1'>
                    <textarea 
                        className="w-full h-full outline-none underline decoration-1"
                        type="text" 
                        defaultValue={memory.description}
                        ref={descriptionRef} 
                    />
                        {editarErrores.description ? <Alert>{editarErrores.description}</Alert> : null}
                    </div>
                </div>
            </form>
            :
            <div className='flex justify-start gap-x-4'>

                
                <img 
                    className='w-64 rounded-md shadow-md  border border-white'
                    src={import.meta.env.VITE_API_URL + "/memories/" + memory.image} 
                    alt={memory.name} 
                />
                <div className='flex gap-y-1 flex-col flex-1'>
                    <div>
                        <span className='border border-transparent px-2 text-xl font-extrabold'>{memory.name}</span>
                    </div>
                    <div className=' flex-1 px-2 py-1 bg-white'>
                        {/* <p>{memory.description}</p> */}
                        <textarea 
                        className="w-full h-full outline-none"
                        type="text" 
                        readOnly
                        value={memory.description}
                    />
                    </div>
                </div>
            </div>
        }
        {
            editarWaiting?
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

export default memo(MemoryBlock)