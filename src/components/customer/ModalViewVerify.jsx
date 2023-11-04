import {
    memo,
    useState,
    useEffect
} from 'react'
import { useAuth } from "/src/hooks/useAuth"

import useAdmin from '/src/hooks/useAdmin'
import useStore from '/src/hooks/useStore'

import close from '/src/static/icons/close.svg'

// #F1A31F amarillo
// #E35544 rojo
// #15A7AE cyan claro
// #2D565E cyan oscuro




const ModalViewVerify=({closeModal})=> {

    const { user } = useAuth({
        middleware: 'auth',
        url: '/'
    })
    const {handleClickModalVerify} = useStore() 
    const {emailVerification} = useAdmin()
    
    const [errores, setErrores] = useState({})
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)
  
    const handleSubmit = e => {      
        e.preventDefault()
        
        if(!waiting){
            emailVerification('email/verification-notification', setErrores, setState, setWaiting)
        }
    }

    useEffect(()=>{
        if(state){
            setState(false)
            handleClickModalVerify()
        }
    },[waiting])

     return (
        <div className='min-h-screen justify-center items-center flex w-screen shadow-md '>
            <div 
                className='w-full h-screen bg-[#E35544] bg-opacity-30 backdrop-blur-md flex justify-center items-center py-4 md:px-0 px-4'
            >
                <div
                    className='relative flex justify-center items-center flex-col gap-y-4 bg-[#E35544] shadow-md max-w-2xl flex-1 pt-8 pb-4 px-4 rounded-md border border-white'
                >
                    <div
                        className='absolute  translate-x-1/2 sm:translate-x-0 -top-5 sm:-right-5 right-1/2 rounded-full shadow-md text-[#2D565E] bg-white cursor-pointer'
                        onClick={()=>{
                            // handleClickModalVerify
                            closeModal()
                        }}
                    >
                        <img className="w-6 h-6 grey" src={close} alt="" />
                    </div>
                        <div className='border font-quicksand-bold text-white text-center px-4 py-1 rounded-md shadow-md text-2xl'>
                            <span>Cuenta pendiente por verificación</span>
                        </div>
                        <div className=' text-center text-white text-lg'>
                            Cuenta pendiente por verificación. Se envío un correo de confirmación a <span >{user.email}</span>
                        </div>
                        <div className='border-b border-white bg-white w-full'></div>
                        <form 
                            noValidate
                            onSubmit={handleSubmit}
                            className=' text-center px-4 py-2 rounded-md shadow-md  font-quicksand-bold text-lg bg-white text-[#E35544] cursor-pointer '
                        >
                            <button>{waiting?'Enviando...':'Click aquí para volver a enviar link de activacíon'}</button>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default memo(ModalViewVerify)
