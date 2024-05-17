import {memo, useEffect, useState} from 'react'
import BounceLoader from "react-spinners/BounceLoader"
import useAdmin from '/src/hooks/useAdmin'
import ok from '/src/static/icons/ok.svg'
import imgImage from '/src/static/icons/images.svg'
import imgDelete from '/src/static/icons/delete.svg'


import moment from 'moment/dist/moment';
import 'moment/dist/locale/es'
import localization from 'moment/locale/es';
import useStore from '/src/hooks/useStore'
moment.suppressDeprecationWarnings = true;
moment.updateLocale('es', localization);

import calendar from '/src/static/icons/calendar.svg'

const ModalImageVisor = ()=> {

    const {
        orderAdmin,
        handleSetModalImage,
        ModalImage,
        destroy,
    } = useAdmin()
    const {mutateOrders} = useStore()

    const images = orderAdmin.payment_images
    const [imageSelected, setImageSelected] = useState({})
    const [tryDeleteImage, setTryDeleteImage] = useState(false)

    const [errores, setErrores] = useState({})
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [message, setMessage] = useState(false)

    const changeModal=()=>{
        handleSetModalImage(!ModalImage)
    }
    
    if(images?.length === 0  || images === undefined){ 
        return(
            <div 
                className='font-bold text-3xl text-slate-600 p-4'
                onClick={()=>{
                    changeModal()
                }}
            >
                Ups! Vuelve a cargar
            </div>
        ) 
    }

    const SentDeleteImage=()=>{

        const imageToDelete = {
          _method: 'DELETE',
          id: imageSelected.id
        }
        
        destroy('payments',imageToDelete, setErrores, setState, setWaiting)
    }

    useEffect(()=>{
        if (Object.keys(images).length !== 0) {
            setImageSelected(images[0])
        }
    },[orderAdmin])

    useEffect(()=>{
        if(state){
            mutateOrders()
            setMessage('Imagen eliminada correctamente.')
            setTimeout(()=>{
                setMessage(false)
                setState(false)
                setTryDeleteImage(false)
                changeModal(false)

            }, 3000)
        }
    },[waiting])


    return (
        <div 
            className='bg-white py-2 relative'
        >
            <div className='w-full flex justify-center items-center gap-x-2 font-bold text-slate-600 text-xl'>
                <img className="w-6 h-6 grey" src={imgImage} alt="" />
                Comprobantes Bancarios: Ordern #{orderAdmin.id}
            </div>


            {
                tryDeleteImage?
                    <div className='absolute flex flex-col justify-center items-center gap-x-4 bottom-0 z-20 w-full h-full backdrop-blur-sm bg-black bg-opacity-80 rounded-md shadow-md text-white  text-xl font-bold'>
                        
                        <div className={`absolute ${waiting? 'flex':'hidden'} flex gap-x-4 justify-center items-center text-4xl `}>
                            <>
                                <BounceLoader color="#FFF" size={100} />
                                Eliminando...
                            </>
                        </div>
                        <div 
                            className={`w-full ${waiting? 'hidden':'flex'} flex flex-col justify-center items-center`}
                        >
                            {
                                message && state?
                                <div className='flex flex-col justify-center items-center text-3xl gap-y-2 capitalize'>
                                    <img className="w-20 h-20 grey" src={ok} alt="" /> 
                                    {message}
                                </div>
                                : message && state === false?
                                <div className='flex flex-col justify-center items-center text-3xl gap-y-2 capitalize'>
                                    Error al eliminar
                                </div>
                                :
                                <>
                                
                                <img className="w-20 h-20 grey" src={imgDelete} alt="" />
                            ¿Seguro vas a eliminar esta imagen?
                            <div className='my-4 flex justify-center items-center gap-x-4 w-full px-10'>
                                <div 
                                    className='bg-white border border-red-500 text-red-500 rounded-md px-4 py-2 flex-1 text-center cursor-pointer shadow-md'
                                    onClick={()=>setTryDeleteImage(false)}
                                >
                                    Cancelar
                                </div>
                                <div 
                                    className='text-white border border-white bg-red-500 rounded-md px-4 py-2 flex-1 text-center cursor-pointer shadow-md'
                                    onClick={()=>{
                                        SentDeleteImage(imageSelected)
                                    }}
                                >
                                    Eliminar
                                </div>
                            </div>
                                
                                
                                </>
                            }
                        </div>
                    </div>
                    :
                    ''
            }



            <div className='flex gap-x-4 px-4'>
                <div className='flex flex-col justify-center gap-y-2'>
                    {
                        images?.map(ima=> (
                            <div 
                                className='border border-white shadow-md cursor-pointer'
                                key={ima.id}
                                onClick={()=>{
                                    setImageSelected(ima)
                                    setTryDeleteImage(false)
                                }}
                            >
                                <img 
                                    className=" w-20 h-auto rounded-md"
                                    src={import.meta.env.VITE_API_URL + "/payments/" + ima['name']}
                                    alt="Imagen de pago bancario" 
                                />
                            </div>
                        ))
                    }
                </div>
                <div className=' my-2'>
                    <div className='group relative  overflow-hidden'>
                                  
                        <div className='flex w-full text-sm absolute bottom-0 right-0 bg-white text-white backdrop-blur-sm bg-opacity-20 gap-x-2 justify-end items-center p-1  font-bold'>
                            <div 
                                className='flex flex-1 justify-center items-center gap-x-2 border border-white bg-red-500  rounded-md py-1 px-2 cursor-pointer'
                                onClick={()=>setTryDeleteImage(true)}
                            >
                                <img className="w-6 h-6 grey" src={imgDelete} alt="" />
                                Eliminar
                            </div>
                            
                        </div>
                        <div className="flex justify-center items-center gap-x-2 my-1 text-slate-700">
                            <img 
                                className="w-6 h-6 grey"
                                src={calendar}
                                alt="" 
                            /> 
                            {
                                images?
                                moment(imageSelected.created_at).format('LLLL')
                                :
                                "Cargando..."   
                            }
                        </div>
                        <img 
                            className='shadow-md border'
                            src={import.meta.env.VITE_API_URL + "/payments/" + imageSelected['name']}
                            alt="" 
                        />
            
                    </div>
                    
                </div>
            </div>

            
        </div>
    )
}

export default memo(ModalImageVisor)