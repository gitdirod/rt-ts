import React, { useEffect, useState } from 'react'
import { formatearDinero } from '/src/helpers'
import { ORDER_PAYMENT_TYPES } from '/src/data/orderPaymentTypes'
import { ORDER_STATE_TYPES } from '/src/data/orderStateTypes'
import iconUpload from "/src/static/icons/common/upload.svg"
import iconOk from '/src/static/icons/ok_filled.svg'
import iconTime from '/src/static/icons/time.svg'
import UploadImage from '/src/components/admin/UploadImage'
import iconDelete from '/src/static/icons/delete.svg'
import iconSave from '/src/static/icons/save_filled.svg'
import Btn from '/src/components/admin/Btn'
import ModalViewRequest from '/src/components/admin/ModalViewRequest'
import useAdmin from '/src/hooks/useAdmin'
import useStore from '/src/hooks/useStore'

export default function UploadPayment({order, soldOrderPayment, soldOrderTracking, payment_images, canSend=true}) {

    const {
        handleModalViewRequest,
        handleModalStateRequest,
        create,
        handleCloseModals
    } = useAdmin()

    const { mutateSoldOrders } = useStore()
    const [images, setImages] = useState([])
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [errores, setErrores] = useState({})

    const removeFile = (name)=>{
    setImages(files => files.filter(file => file.name !== name))
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        const imagePayment = {
            sold_order_id: order.id,
            image: images[0]
        }
        if(!waiting){
            create('sold-order-payments',imagePayment,setErrores,setState, setWaiting)
        }
    }

    useEffect(()=>{
        if(state){
            mutateSoldOrders()
            setState(false)
            setImages([])
            handleCloseModals()
        }
        handleModalViewRequest(<ModalViewRequest text="Guardando..." icon={iconSave} spin={false}/>)
        handleModalStateRequest(waiting)
    },[waiting])

    return (
    <div className='center-r w-full'>
        {
            soldOrderPayment?.state === ORDER_PAYMENT_TYPES.PAGADO.VALUE ?
            <div className='center-r gap-4'>
                <div className='center-r gap-2 font-poppins-regular text-white px-2 rounded-lg bg-green-500'>
                    <img src={iconOk} className="w-4 white" alt="ok" />
                    Pagado
                </div>
                <div className={`center-r gap-2 font-poppins-regular text-white px-2 rounded-lg ${ORDER_STATE_TYPES?.[soldOrderTracking?.state].BG}`}>
                    <img src={`/iconos/tag/tracking/${ORDER_STATE_TYPES?.[soldOrderTracking?.state].ICON}`} className="w-4 white" alt="ok" />
                    {ORDER_STATE_TYPES?.[soldOrderTracking?.state].NAME}
                </div>
            </div>
            :soldOrderPayment?.state === ORDER_PAYMENT_TYPES['POR PAGAR'].VALUE && payment_images?.length > 0?
            <div className='center-r gap-2 font-poppins-regular text-white px-2 rounded-lg bg-yellow-500'>
                <img src={iconTime} className="w-4 white" alt="ok" />
                Pendiente de revisión
            </div>
            :
            
            <div className=''>
                {
                    canSend ?
                    <UploadImage
                        max={1}
                        setImages={setImages}
                        image={images}
                    >
                        { images?.length === 0 && (
                            <div 
                                className='center-r gap-2 font-poppins-bold text-white px-2 rounded-lg bg-red-500'
                            >
                                <img src={iconUpload} className="w-5 white" alt="ok" />
                                Subir Pago {formatearDinero(order?.total)}
                            </div>
                        )}
                    </UploadImage>:
                    <div>
                        { images?.length === 0 && (
                            <div 
                                className='center-r gap-2 font-poppins-bold text-white px-2 rounded-lg bg-red-500'
                            >
                                <img src={iconUpload} className="w-5 white" alt="ok" />
                                Subir Pago {formatearDinero(order?.total)}
                            </div>
                        )}
                    </div>
                }
                <div className='w-full center-c gap-1'>
                    {
                        images?.length > 0 && (
                            <>
                                <div 
                                    className='center-r gap-2 font-poppins-bold rounded-lg bg-cyanPrimary p-1'
                                >
                                    {images?.map(file => (
                                        <li 
                                            className='relative flex  justify-center items-center flex-shrink-0 ring-red-700 focus-within:border-red-700 focus-within:ring-2 flex-1 w-20'
                                            key={file.preview}
                                        >
                                            <img 
                                                className="w-full h-full object-contain rounded-lg"
                                                src={file.preview} 
                                                alt={file.name} 
                                                onLoad={()=>{
                                                URL.revokeObjectURL(file.preview)
                                                }}
                                            /> 
                                            <button
                                                type='button'
                                                className='absolute focus:opacity-100 outline-none opacity-0 hover:opacity-100 h-full text-white transition-all flex justify-center gap-x-2 items-center bg-red-600 bg-opacity-70 w-full  ring-red-700 focus-within:border-red-700 focus-within:ring-2'
                                                onClick={()=> removeFile(file.name)}
                                            >
                                                <img className="w-6 h-6 white" src={iconDelete} alt="" />
                                                
                                            </button>
                                        </li>
                                    ))}
                                </div>
                                <form
                                    className='center-r'
                                    onSubmit={handleSubmit}
                                    noValidate
                                >
                                    <Btn 
                                        text='Guardar'
                                        icon={iconSave}
                                        style='bg-cyanPrimary '
                                    />
                                </form>
                            </>
                        )
                    }
                    
                </div>
            </div> 
            
        }
    </div>
  )
}
