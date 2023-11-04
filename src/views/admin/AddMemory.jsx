import {
    memo, 
    createRef, 
    useEffect, 
    useState
} from 'react'
import useAdmin from '../../hooks/useAdmin'
import UploadImage from '../../components/admin/UploadImage'
import Alert from '../../components/Alert'
import useStore from '../../hooks/useStore'
import add from '/src/static/icons/add.svg'
import images from '/src/static/icons/images.svg'
import close from '/src/static/icons/close.svg'
import text from '/src/static/icons/text.svg'
import imgImage from '/src/static/icons/images.svg'


const AddMemory=()=> {

    const {create} = useAdmin()
    const {mutateMemories} = useStore()

    const [edit, setEdit] = useState(false)
    const [errores, setErrores] = useState(false)
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [image, setImage] = useState([])

    const nameRef = createRef()
    const descriptionRef = createRef()

    const handleSubmit = e => {
        
        e.preventDefault()
        
        const newMemory = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            images: image
        }
        create('memories',newMemory,setErrores,setState, setWaiting)
    }
    useEffect(()=>{
        if(state){
            mutateMemories()
            setState(false)
            setState(false)
            setEdit(false)
        }
    },[waiting])

    return (
        <div className='w-full'>
        {
            edit?
            
            <form
                className=''
                onSubmit={handleSubmit}
                noValidate
            >
                <div className='flex gap-y-2 flex-col justify-center gap-x-2 items-center'>
                    <div 
                        className='flex flex-col justify-start items-start w-full'
                    >
                        <label 
                            htmlFor="Name"
                            className="flex justify-start gap-x-2 text-slate-600 font-bold px-1 group-hover:text-slate-700 transition-all duration-200"
                        >
                            <img 
                                className="w-6 h-6 grey"
                                src={images}
                                alt="" 
                            /> 
                            Nombre:
                        </label>
                        <input 
                            type="text" 
                            id="name"
                            className="border-slate-300 focus:border-green-400 hover:shadow-green-200 w-full text-slate-600 font-semibold px-3 py-1 rounded-md border outline-none  hover:shadow-sm transition-all duration-200"
                            placeholder="Escribe un nombre"
                            ref={nameRef}
                        />
                        {errores.name ? <Alert>{errores.name}</Alert> : null}
                    </div>
                    <div 
                        className='flex flex-col justify-start items-start w-full'
                    >
                        <label 
                            htmlFor="Name"
                            className="flex justify-start gap-x-2 text-slate-600 font-bold px-1 group-hover:text-slate-700 transition-all duration-200"
                        >
                            <img className="w-6 h-6 grey" src={text} alt="" />
                            Descripción:
                            </label>

                        <textarea 
                            className="border-slate-300 focus:border-green-400 hover:shadow-green-200 w-full text-slate-600 font-semibold px-3 py-1 rounded-md border outline-none  hover:shadow-sm transition-all duration-200"
                            type="text" 
                            id="description"
                            placeholder="Escribe una descripción del recuerdo"
                            rows={2} 
                            ref={descriptionRef} 
                        />
                        {errores.description ? <Alert>{errores.description}</Alert> : null}
                    </div>
                    <div 
                        className='flex flex-col justify-start items-start w-full'
                    >
                        <label 
                            htmlFor="Name"
                            className="flex justify-start gap-x-2 text-slate-600 font-bold px-1 group-hover:text-slate-700 transition-all duration-200"
                        >
                            <img className="w-6 h-6 grey" src={imgImage} alt="" />
                            Imagen 500x500:
                        </label>
                        <UploadImage
                            setImages={setImage}
                            errores={errores}
                        />
                    </div>
                    <div className='flex justify-center items-center gap-x-4'>
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
                            <img 
                                className="w-6 h-6 grey"
                                src={close}
                                alt="" 
                            />
                            Cancelar
                        </div>
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
                    Agregar recuerdo
                </div>
            </div>
        }</div>
      )
}

export default memo(AddMemory)
