import {memo, useEffect, useState, createRef} from 'react'
import useAdmin from '../../hooks/useAdmin'
import useStore from '../../hooks/useStore'
import add from '/src/static/icons/add.svg'
import close from '/src/static/icons/close.svg'
import fire from '/src/static/icons/fire.svg'

const SuggestionBlock=({suggestion})=> {

    const {
        update,
        handleSetModalSuggested,
        modalSuggested,
        handleSetSuggestion
    } = useAdmin()

    const {
        mutateSuggestions,
        suggesteds
    }= useStore()
    const [edit, setEdit] = useState(false)
    const nameRef = createRef()

    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [errores, setErrores] = useState({})

    const handleSubmit = e => {
        e.preventDefault()
        
        const renameSuggestion = {
            _method: 'PUT',
            id: suggestion.id,
            name: nameRef.current.value
        }
        if(!waiting){
            update('suggestions', renameSuggestion,setErrores,setState, setWaiting)
        }
    }

    useEffect(()=>{
        if(state){
            mutateSuggestions()
            setState(false)
            setEdit(false)
        }
    },[waiting])

    const suggestedsSelected = suggesteds?.filter(item => item.suggestion_id == suggestion.id)

    return (
        <div 
            className='flex font-semibold border rounded-md'
        >
            {
                edit?
                <form
                    className='w-full'
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className='flex gap-x-2 items-center py-4 px-2 bg-slate-50 rounded-md'>
                        <label 
                            htmlFor="Name"
                            className="flex justify-start gap-x-2 text-slate-600 font-bold group-hover:text-slate-700 transition-all duration-200 flex-shrink-0"
                        >
                            <img className="w-6 h-6 grey" src={fire} alt="" />
                            Actualizar nombre:
                        </label>
                        <input 
                            type="text" 
                            id="name"
                            className="border-slate-300 focus:border-green-400 hover:shadow-green-200 w-full text-slate-600 font-semibold px-3 py-1 rounded-md border outline-none  hover:shadow-sm transition-all duration-200"
                            placeholder="Escribe un nuevo nombre"
                            defaultValue={suggestion?.name}
                            ref={nameRef}
                        />
                        <button 
                            className='flex w-fit gap-x-2 items-center bg-green-500 text-white font-bold px-2 py-1 rounded-md cursor-pointer'
                        >
                            <div className={`${waiting?'animate-spin':''}`}>
                                <img 
                                    className="w-6 h-6 grey"
                                    src={add}
                                    alt="" 
                                />
                            </div>
                            <span className="text-sm">{waiting? "Guardando...": "Guardar"}</span>
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
                <>
                    <div className='flex gap-x-2 border-r rounded-l-md bg-slate-700 text-white border-slate-600 h-full px-2 py-4 overflow-hidden'>
                        <div 
                            className='cursor-pointer'
                            onClick={()=>setEdit(true)}
                        >
                            {suggestion.name}
                        </div>
                        <div 
                            className=' cursor-pointer bg-red-500'
                            onClick={()=>{
                                handleSetModalSuggested(true)
                                handleSetSuggestion(suggestion)
                            }}
                        >
                            <img 
                                className="w-6 h-6 grey"
                                src={add}
                                alt="" 
                            />
                        </div>
                    </div>
                    <div className='flex items-center px-4 bg-slate-50 flex-1'>
                        <div className='flex gap-x-2'>
                            {
                                suggestedsSelected?.map(item =>(
                                    <div 
                                        key={item.id}
                                    >
                                        <img 
                                            className="h-12 border rounded-md"
                                            src={import.meta.env.VITE_API_URL + "/products/" + item.images[0].name} 
                                            alt="imagen" 
                                        />
                                    </div>
                                ) )
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default memo(SuggestionBlock) 