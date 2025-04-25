import React, { useEffect, useState } from 'react'
import BlockHeader from './BlockHeader'
import { formatearDinero } from '/src/helpers'
import LabelSimple from './LabelSimple'


import iconCashBlack from '/src/static/icons/cash.svg'
import iconUpdate from '/src/static/icons/update.svg'
import iconEnvoice from '/src/static/icons/envoice.svg'
import iconProduct from '/src/static/icons/itemBlack.svg'
import iconEnvoiceBlack from '/src/static/icons/envoiceBlack.svg'
import iconPlane from '/src/static/icons/plane.svg'
import useAdmin from '/src/hooks/useAdmin'
import useStore from '/src/hooks/useStore'
import { ORDER_PAYMENT_TYPES } from '/src/data/orderPaymentTypes'
import { ORDER_STATE_TYPES } from '/src/data/orderStateTypes'
import Btn from './Btn'

import ShowTotal from '/src/components/common/ShowTotal'
import AddressTarget from '/src/components/sellerAdmin/SellerAdminAddressTarget'
import iconCash from '/src/static/icons/common/cash.svg'
import iconSend from '/src/static/icons/common/send.svg'
import SellerAdminCustomerTarget from '/src/components/sellerAdmin/SellerAdminCustomerTarget'
import TableHeader from './TableHeader'
import { urlsBackend } from '/src/data/urlsBackend'



export default function SoldOrderDescription({order}) {

    const { 
        update,

    } =useAdmin()
    const { 
        mutateSoldOrders,
    } = useStore()


    const [valuePayment, setValuePayment] = useState(ORDER_PAYMENT_TYPES.POR_PAGAR)
    const [valueStatus, setValueStatus] = useState(ORDER_STATE_TYPES.BODEGA)
    const [valueEnvoice, setValueEnvoice] = useState('No disponible')


    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [errores, setErrores] = useState({})


    const columns = [
        { title: 'id', className: 'w-10' },
        { title: 'Imagen', className: '' },
        { title: 'Nombre', className: '' },
        { title: 'Unidades', className: 'w-32' },
        { title: 'Precio unidad', className: 'w-32' },
        { title: 'Importe', className: 'w-32' }
    ];


    const handleSubmit = async e =>{
        e.preventDefault()
        const updateOrder = {
            _method: 'PUT',
            id: order.id,
            envoice: valueEnvoice ? valueEnvoice : 'No registra',
            sold_order_payment: valuePayment,
            sold_order_tracking: valueStatus
        }
    
        if(!waiting){
          update('sold_orders', updateOrder, setErrores, setState, setWaiting)
        }
    }


 

    useEffect(()=>{
        if(order?.id !== undefined){
            setValuePayment(order?.soldOrderPayment?.state)
            setValueEnvoice(order?.envoice)
            setValueStatus(order?.soldOrderTracking?.state)
        }
    },[order])
    

    return (
        <div className='overflow-y-hidden flex flex-col flex-1 h-full'>
            <BlockHeader
                name={
                    <div className='flex items-center'>
                        <img src={iconEnvoice} alt="save" className='w-8 h-8 pr-2' />
                        {'Prefactura #'+ order?.id}
                    </div>
                }
                middle={
                    <div className='w-full center-r bg-slate-800 font-poppins-bold rounded-lg text-white'>
                        Total: {formatearDinero(order?.total)}
                    </div>
                }
            >
                
                <form
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Btn
                        icon={iconUpdate}
                        text='Actualizar'
                        style="bg-green-500"
                    />
                </form>
                    
            </BlockHeader>
            <div className="flex flex-1 relative w-full overflow-hidden pb-5 overflow-y-auto">
                <div className='w-full'>

                    {/* Aqui se carga todo */}
                    <div className='font-bold text-slate-700 pr-1 flex flex-col gap-y-2'>

                        

                        <div className='center-r gap-x-2 shrink-0 '>

                            <LabelSimple
                                htmlfor="envoice"
                                name="Factura:"
                                image={iconEnvoiceBlack}
                                // error={errores.name}
                            >
                                <input 
                                    type="text" 
                                    id="name"
                                    className="flex-1 font-semibold outline-none transition-all duration-200 mx-2"
                                    placeholder='Ingresa el número de factura...'
                                    value={valueEnvoice}
                                    onChange={(e)=>setValueEnvoice(e.target.value)}
                                />
                            </LabelSimple>
                            <LabelSimple
                                htmlfor="payment"
                                name="Pago:"
                                image={iconCashBlack}
                                // error={errores.category}
                            >
                                <select 
                                    id="payment"
                                    className="flex-1 font-semibold outline-none transition-all duration-200 uppercase mx-2 cursor-pointer"
                                    name="payment"
                                    value={valuePayment}
                                    onChange={(e)=>setValuePayment(e.target.value)}
                                >
                                    {Object.values(ORDER_PAYMENT_TYPES).map(paymentType => (
                                        <option key={paymentType.VALUE} className="text-slate-600" value={paymentType.VALUE}>
                                            {paymentType.VALUE}
                                        </option>
                                    ))}
                                </select>
                            </LabelSimple>
                            <LabelSimple
                                htmlfor="status"
                                name="Posición:"
                                image={iconPlane}
                                // error={errores.category}
                            >
                                <select 
                                    id="status"
                                    className="flex-1 font-semibold outline-none transition-all duration-200 uppercase mx-2 cursor-pointer"
                                    name="status"
                                    value={valueStatus}
                                    onChange={(e)=>setValueStatus(e.target.value)}
                                >
                                    {Object.values(ORDER_STATE_TYPES).map(stateType => (
                                        <option key={stateType.VALUE} className="text-slate-600" value={stateType.VALUE}>
                                            {stateType.VALUE}
                                        </option>
                                    ))}
                                </select>
                            </LabelSimple>

                            
                        </div>


                        <div className='flex gap-2 flex-wrap font-normal bg-white p-1 rounded-lg border'>
                            <SellerAdminCustomerTarget customer={order?.user}/> 
                            <div className='flex gap-2 flex-1  shrink-0'>
                                <AddressTarget cursor address={order?.addresses?.envoice} icon={iconCash}/>
                                <AddressTarget cursor address={order?.addresses?.send} icon={iconSend} title='Datos de envio'/>
                            </div>
                            
                        </div>


                        <div>
                            <div className='flex gap-x-1'>
                                <img className="w-5 h-5 grey" src={iconProduct} alt="" />
                                Productos:
                            </div>
                            <div className='flex flex-col text-slate-700 font-normal flex-wrap gap-x-4'>
                
                                <table className=" table-fixed w-full text-slate-600 ">
                                    
                                    <tbody className='w-full  '>
                                    {
                                        order?.products?.map(item=>(
                                            <TableTrProduct
                                                key={item.product_id}
                                                item={item}
                                                order={order}
                                            />
                                        )
                                        )
                                    }
                                    </tbody>
                                    <TableHeader columns={columns} />
                                </table>
                                <div className='flex justify-end w-full'>
                                    <ShowTotal subtotal={order?.subtotal} total={order?.total} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}




const TableTrProduct=({item})=> {
    
    const {
        product_id:id,
        name, 
        code,  
        image
    } = item
    

    return (
    <tr
        className=''
    >
        <Td style='rounded-l-lg w-10 border-l'>
            {id}
        </Td>
        <Td style=''>
            <img 
                className='h-14'
                src={ urlsBackend.PRODUCT_IMAGE + image} 
                alt={image} 
            />
        </Td>
        <Td style='flex-col'>
            <span className='text-md'>{name}</span>
            <span className=' text-xs'>{code}</span>
        </Td>
        <Td style='w-32 '>
            {item?.quantity}
        </Td>
        <Td style='w-32 '>
            {item?.price?formatearDinero(item?.price):'$0'}
        </Td>
        <Td style='w-32 border-r rounded-r-lg'>
            {item?.subtotal?formatearDinero(item?.subtotal):'0'}
        </Td>
        
        
    </tr>
  )
}
const Td = ({children, style=''})=>{
    return(
        <td
            className='px-0'
        >
        <div className={`py-1 text-sm bg-white transition-all font-poppins-regular h-16 flex flex-1 items-center justify-center border-y ${style}`}>
            {children}
        </div>
    </td>
    )
}