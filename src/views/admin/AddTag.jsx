import {memo, useState, createRef, useEffect} from 'react'
import useAdmin from '../../hooks/useAdmin'
import useStore from '../../hooks/useStore'
import Alert from '../../components/Alert'
import UploadIcon from '../../components/admin/UploadIcon'
import tag from '/src/static/icons/tag.svg'
import close from '/src/static/icons/close.svg'
import add from '/src/static/icons/add.svg'



const AddTag=()=> {

    const {create} = useAdmin()
    const {
        mutateTypes
    } = useStore()


    const [edit, setEdit] = useState(false)
    const [errores, setErrores] = useState(false)
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)

    const nameRef = createRef()
    const [icon, setIcon] = useState({})

    const handleSubmit = e => {
        
        e.preventDefault()
        
        const newTag = {
            name: nameRef.current.value,
            images: icon
        }
        create('type_products',newTag,setErrores,setState, setWaiting)
    }
    useEffect(()=>{
        if(state){
            mutateTypes()
            setState(false)
            setState(false)
            setEdit(false)
        }
    },[waiting])
  return (
    <>
    {
        edit?
        
        <form
            className='py-4'
            onSubmit={handleSubmit}
            noValidate
        >
            <div className='flex gap-x-2 items-center'>
                <label 
                    htmlFor="Name"
                    className="flex justify-start gap-x-2 text-slate-600 font-bold px-1 group-hover:text-slate-700 transition-all duration-200"
                >
                    <img className="w-6 h-6 grey" src={tag} alt="" />
                    Nombre etiqueta:
                </label>
                <input 
                    type="text" 
                    id="name"
                    className="flex-1 border-slate-300 focus:border-green-400 hover:shadow-green-200 text-slate-600 font-semibold px-3 py-1 rounded-md border outline-none  hover:shadow-sm transition-all duration-200"
                    placeholder="Ejemplo: 40 colores"
                    ref={nameRef}
                />
                <UploadIcon
                    setIcon={setIcon}
                    errores={errores}
                />
                <button 
                    className='flex w-fit gap-x-2 items-center bg-green-500 text-white font-bold px-2 py-1 rounded-md cursor-pointer'
                >
                    <img 
                        className="w-6 h-6 grey"
                        src={add}
                        alt="" 
                    />
                    Guardar
                </button>
                <div
                    className='flex w-fit gap-x-2 items-center bg-slate-600 text-white font-bold px-2 py-1 rounded-md cursor-pointer'
                    onClick={()=>setEdit(false)}
                >
                    <img className="w-6 h-6 grey" src={close} alt="" />
                    Cancelar
                </div>
            </div>
            {errores.name ? <Alert>{errores.name}</Alert> : null}
        </form>
        :
        <div>
            <div 
                className=' flex w-fit gap-x-2 items-center bg-green-500 text-white font-bold px-2 py-1 rounded-md cursor-pointer'
                onClick={()=>setEdit(true)}
            >
                <img 
                    className="w-6 h-6 grey"
                    src={add}
                    alt="" 
                />
                Nueva etiqueta
            </div>
        </div>
    }</>
  )
}

export default memo(AddTag)