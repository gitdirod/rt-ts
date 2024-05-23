import {memo, useState, useEffect} from 'react'
import useStore from '/src/hooks/useStore'
import { useAuth } from "/src/hooks/useAuth"
import { formatearDinero } from '/src/helpers'
import TarjetEnvoice from "/src/components/TarjetEnvoice";
import UploadPayment from '../admin/UploadPayment'
import useAdmin from '/src/hooks/useAdmin'

import iconClose from '/src/static/icons/seller/close.svg'
import iconCheck from "/src/static/icons/seller/check.svg"

import cash from '/src/static/icons/cash.svg'
import plane from '/src/static/icons/plane.svg'
import iconAlert from '/src/static/icons/alertBlack.svg'

import { banks } from '/src/data/banks'
import Btn from '../admin/Btn';
import BankDescription from './BankDescription';


const ModalViewPurchase=({closeModal})=> {

    const { user } = useAuth({
        middleware: 'auth',
        url: '/'
    })
    const {
        order, 
        total, 
        subtotal, 
        mutateSoldOrders,
        mutateProducts,
        handleClearOrder
    } = useStore() 
    const {
        create
    } = useAdmin()
    
    const [images, setImages] = useState([])
    const [errores, setErrores] = useState({})
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [envoiceAddress, setEnvoiceAddress] = useState({})
    const [sendAddress, setSendAddress] = useState({})
    const address = user?.address

    const handleSubmit = e => {
        e.preventDefault()
        const newOrder = {
            subtotal: subtotal,
            total: total,
            addresses:{
                envoice_id: envoiceAddress.id,
                send_id:sendAddress.id
            },
            products : order?.map(product => (
                {
                    id: product.id,
                    quantity: product.cantidad
                }
            )),
            image: images[0]
        }
        if(!waiting){
            create('sold_orders', newOrder, setErrores, setState, setWaiting)
        }
    }

    useEffect(()=>{
        address?.envoice ? setEnvoiceAddress(address?.envoice) : setEnvoiceAddress({})
        address?.send ? setSendAddress(address?.send) : setSendAddress({})
      },[user])

    useEffect(()=>{
        if(state){
            mutateSoldOrders()
            mutateProducts()
            setState(false)
            handleClearOrder()
            closeModal()
        }
    },[waiting])

     return (
        <div className='max-h-[calc(100vh-10vh)] overflow-x-hidden overflow-y-auto rounded-lg bg-white'>
            <div className='flex flex-col text-slate-600 gap-y-2 bg-slate-100 max-w-4xl'>
                
                <div className="relative gap-4 center-r p-2 font-light bg-slate-800 text-white text-2xl">
                    <img src={iconCheck} className="w-8" alt="ok" />
                    <span className="text-base md:text-xl font-bold">Proceder con el pago</span>
                    <Btn
                        style='md:absolute bg-white right-2 '
                        icon={iconClose}
                        imageColor
                        action={()=>{
                            closeModal()
                        }}
                    />
                </div>
                <div className='flex flex-col justify-center items-start px-4  '>
                    <div className='flex items-center gap-x-2'>
                        <img className="w-6 h-6 grey" src={cash} alt="" />
                        <span className='text-xl font-poppins-extrabold'>Resumen de Pago</span>
                    </div>
                    <div className='flex flex-col gap-x-4 w-full font-poppins-regular  '>
                        <div className='flex flex-col p-2 px-4  rounded-lg bg-white border'>
                                <div className="flex justify-between items-center">
                                    <span className=""> Subtotal</span>
                                    <span className="font-poppins-bold ">{formatearDinero(subtotal)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Impuestos</span>
                                    <span className="font-poppins-bold ">{formatearDinero(subtotal * 0.15)}</span>
                                </div>
                            <div className="flex justify-between items-center border-t ">
                                <span>Total:</span>
                                <span className="font-poppins-extrabold">{formatearDinero(total)}</span>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row gap-2 md:gap-4 mt-2 '>
                            {banks.map(bank => (
                                <BankDescription key={bank.id} bank={bank}/>
                            ))}
                        </div>
                        <div className=' my-2 flex-1 '>
                            <UploadPayment
                                setImages={setImages}
                                errores={errores}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex px-4'>
        
                    <div className='flex flex-col justify-center sm:flex-row gap-y-2 gap-x-4 font-poppins-bold w-full'>
                        <TarjetEnvoice
                            envoiceAddress={envoiceAddress}
                        >
                            <div 
                                className=" text-pinkPrimary text-center flex  items-center gap-x-2  text-xl"
                            >
                                {/* <IconIdentification/> */}
                                Datos de facturación: 
                            </div>
                        </TarjetEnvoice>

                        <TarjetEnvoice
                            envoiceAddress={sendAddress}
                            envoice={false}
                        >
                            <div 
                                className=" text-cyanPrimary text-center flex  items-center gap-x-2 text-xl"
                            >
                                <img className="w-6 h-6 cyan" src={plane} alt="" />
                                Datos de Envío: 
                            </div>
                        </TarjetEnvoice>

                    </div>
                </div>
            
                <form 
                    className='w-full center-r px-4 p-2'
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {
                        Object.keys(envoiceAddress).length == 0 || Object.keys(sendAddress).length == 0 ?
                        
                        <Btn
                            style='bg-cyanPrimary w-full'
                            icon={iconAlert}
                            text='Actualiza datos de envío y datos de facturación.'
                            textSize='text-md'
                            isButton={false}
                        />
                        :
                        <Btn
                            style='bg-cyanPrimary w-full'
                            icon={cash}
                            text='Realizar pago'
                            textSize='text-md'
                            isButton={true}
                        />                    
                    }

                </form>
            
            </div>
        </div>
    )
}

export default memo(ModalViewPurchase)
