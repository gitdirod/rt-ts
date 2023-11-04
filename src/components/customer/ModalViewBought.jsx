import {memo, useState, useEffect} from 'react'
import { useAuth } from "/src/hooks/useAuth"
import { formatearDinero } from '/src/helpers'

import iconClose from '/src/static/icons/seller/close.svg'
import iconCheck from "/src/static/icons/seller/check.svg"

import iconCash from '/src/static/icons/common/cash.svg'
import iconSend from '/src/static/icons/common/send.svg'
import Btn from '../admin/Btn';

import TableHeader from '/src/components/admin/TableHeader'

import { urlsBackend } from '/src/data/urlsBackend'
import UploadPayment from './UploadPayment'
import ShowTotal from '/src/components/common/ShowTotal'


const ModalViewBought=({order, closeModal})=> {

    const { user } = useAuth({
        middleware: 'auth',
        url: '/'
    })
    
    const [envoiceAddress, setEnvoiceAddress] = useState({})
    const [sendAddress, setSendAddress] = useState({})
    const address = order?.addresses


    useEffect(()=>{
        address?.envoice ? setEnvoiceAddress(address?.envoice) : setEnvoiceAddress({})
        address?.send ? setSendAddress(address?.send) : setSendAddress({})
      },[user])


     return (
        <div className='max-h-[calc(100vh-10vh)] overflow-x-hidden overflow-y-auto rounded-lg bg-white  font-poppins-regular'>
            <div className='flex flex-col text-slate-600 gap-y-2 bg-slate-100 max-w-4xl'>
                
                <div className="relative gap-4 center-r p-2 font-light bg-slate-800 text-white text-2xl">
                    <img src={iconCheck} className="w-8" alt="ok" />
                    <span className="text-base md:text-xl ">Detalles de orden #<span className='font-poppins-bold'>{order?.id}</span></span>
                    <Btn
                        style='md:absolute bg-white right-2 '
                        icon={iconClose}
                        imageColor
                        action={()=>{
                            closeModal()
                        }}
                    />
                </div>

                <UploadPayment 
                    order={order}
                    soldOrderPayment={order?.soldOrderPayment} 
                    soldOrderTracking={order?.soldOrderTracking}
                    payment_images={order?.payments}
                />

                <div className='flex flex-col p-1 gap-2 '>
                    <AddressTarget icon={iconCash} address={envoiceAddress}/>
                    <AddressTarget icon={iconSend} address={sendAddress} title='Datos envio:'/>                   
                </div>
                <ShowList order={order}/>
            </div>
        </div>
    )
}

export default memo(ModalViewBought)

const AddressTarget = ({address, icon, title='Datos facturación:'}) => {
    return(
        <div className='bg-white p-2 rounded-lg border'>
            <div className='center-r gap-2 bg-slate-700 rounded-lg px-2 text-white w-fit'>
                <img src={icon} className='w-4'send="" />
                <span className='font-poppins-extrabold'>{title}</span>
            </div>
            <div 
                className='flex items-center gap-4 border-b'
            >
                <p>Nombre: <span className='font-poppins-semibold'>{address?.people}</span>  </p>  
                <p>Cc/Ruc: <span className='font-poppins-semibold'>{address?.ccruc}</span>  </p>  
                <p>Telefono: <span className='font-poppins-semibold'>{address?.phone}</span>  </p>  
            </div>
            <div 
                className='flex items-center gap-4 '
            >
                <p>Ciudad: <span className='font-poppins-semibold'>{address?.city}</span>  </p>  
                <p>Dirección: <span className='font-poppins-semibold'>{address?.address}</span>  </p>   
            </div>
        </div>
    )
}

const ShowList = ({order}) => {

    

    const columns = [
        { title: '#', className: 'w-10' },
        { title: 'Imagen', className: 'w-32' },
        { title: 'Nombre', className: '' },
        { title: 'Precio', className: 'w-32' },
        { title: 'Unidades', className: 'w-20' },
        { title: 'Subtotal', className: 'w-20' },
    ];

    const renderRow = (item) => (
        <tr
          key={item.product_id}
          className=' group/item'
          onClick={() => handleSelect(item.id)}
        >
            {/* Aquí podrías renderizar las celdas como prefieras, dependiendo del item. */}
            <Td style='w-10 group-hover/item:border-l-slate-300 border-l rounded-l-lg'>
                {item.product_id}
            </Td>
            <Td style="z-0 w-32">
                <img src={urlsBackend.PRODUCT_IMAGE + item?.image} className='h-full' alt="" />
            </Td>
            <Td style='flex-col'>
                <span className='text-md'>{item?.name}</span>
                <span className=' text-xs'>{item?.code}</span>
            </Td>
            
            <Td style='w-32 '>
                {formatearDinero(item?.price)}
            </Td>
            <Td style={`w-20`}>
                {item?.quantity}
            </Td>
            <Td style={`w-20 rounded-r-lg border-r `}>
                {formatearDinero(item?.quantity * item?.price)}
            </Td>
            
        </tr>
      );
    return (
        <div 
            id='listProduct' 
            className=" max-h-[calc(100vh-50px)] p-1 overflow-hidden top-full" 
            > 
            <div className="flex flex-col gap-1 items-end bg-white border rounded-lg p-1 shadow overflow-y-auto scrollbar max-h-[calc(100vh-50px)]">
                <table className="table-fixed w-full text-slate-800">
                    <Tbody items={order?.products} renderRow={renderRow} />
                    <TableHeader columns={columns} />
                </table>
                <ShowTotal subTotal={order?.subtotal} total={order?.total}/>
            </div>
        </div>
    )
}

const Td = ({children, style='',id, select})=>{
    return(
        <td
            className='px-0'
            onClick={()=>{id? select(id):null}}
        >
        <div className={`py-1 font-poppins-regular text-sm bg-white group-hover/item:border-y-slate-400 group-hover/item:bg-slate- transition-all h-16  flex-1 center-r group-hover/item:font-poppins-semibold border-y ${style}`}>
            {children}
        </div>
    </td>
    )
  }

  const Tbody = ({ items, renderRow }) => (
    <>
    <tbody className='w-full'>
      {items?.map(item => renderRow(item))}
    </tbody>
    </>
);