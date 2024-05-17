import {memo, useState, createRef} from 'react'
import useAdmin from '../../hooks/useAdmin'
import { useEffect } from 'react'
import useStore from '../../hooks/useStore'
import close from '/src/static/icons/close.svg'
import fire from '/src/static/icons/fire.svg'
import add from '/src/static/icons/add.svg'



const AddSuggestion=()=> {

    const {create} = useAdmin()
    const {
        mutateSuggestions
    } = useStore()


    const [edit, setEdit] = useState(false)
    const [errores, setErrores] = useState(false)
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)

    const nameRef = createRef()

    const handleSubmit = e => {
        
        e.preventDefault()
        
        const newSuggestion = {
            name: nameRef.current.value,
        }
        create('suggestions', newSuggestion,setErrores,setState, setWaiting)
    }
    useEffect(()=>{
        if(state){
            mutateSuggestions()
            setState(false)
            setState(false)
        }
    },[waiting])
  return (
    <>
    {
        edit?
        
        <form
            className=''
            onSubmit={handleSubmit}
            noValidate
        >
            <div className='flex gap-x-2 items-center'>
                <label 
                    htmlFor="Name"
                    className="flex justify-start gap-x-2 text-slate-600 font-bold px-1 group-hover:text-slate-700 transition-all duration-200"
                >
                    <img className="w-6 h-6 grey" src={fire} alt="" />
                    Nombre:
                </label>
                <input 
                    type="text" 
                    id="name"
                    className="border-slate-300 focus:border-green-400 hover:shadow-green-200 w-full text-slate-600 font-semibold px-3 py-1 rounded-md border outline-none  hover:shadow-sm transition-all duration-200"
                    placeholder="Escribe un nombre"
                    ref={nameRef}
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
                {/* {errores.name ? <Alert>{errores.name}</Alert> : null} */}
            </div>
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
                Agregar sugerencia
            </div>
        </div>
    }</>
  )
}

export default memo(AddSuggestion)