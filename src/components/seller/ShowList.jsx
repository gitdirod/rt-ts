import React from 'react'
import TableHeader from "/src/components/admin/TableHeader"
import Tbody from "/src/components/admin/Tbody"
import { formatearDinero } from "/src/helpers"

import ImageTable from "/src/components/admin/ImageTable"
import useStore from '/src/hooks/useStore'
import iconDelete from "/src/static/icons/delete.svg"
import iconClose from '/src/static/icons/seller/close.svg'
import iconCart from "/src/static/icons/seller/cart.svg"
import iconCustions from "/src/static/img/cuestions.svg"
import iconArrow from "/src/static/icons/seller/arrowBlack.svg"
import Btn from '/src/components/admin/Btn'
import NoProductsToShow from '/src/components/common/NoProductsToShow'
import ShowTotal from '/src/components/common/ShowTotal'
import { useNavigate } from 'react-router-dom'

export default function ShowList({ closeModal}) {

    const navigate = useNavigate()
    
    const {
        order,
        subtotal,
        total,
      } =useStore()
    const { handleRemoveProduct } = useStore()

    const columns = [
        { title: '#', className: 'w-10' },
        { title: 'Imagen', className: 'w-32' },
        { title: 'Nombre', className: 'w-64' },
        { title: 'Precio', className: 'w-32' },
        { title: 'Unidades', className: 'w-20' },
        { title: 'Subtotal', className: 'w-20' },
        { title: 'Eliminar', className: 'w-20' },
    ];

    const renderRow = (item) => (
        <tr
          key={item.id}
          className=' group/item'
        >
            {/* Aquí podrías renderizar las celdas como prefieras, dependiendo del item. */}
            <Td style='w-10 group-hover/item:border-l-slate-300 border-l rounded-l-lg'>
                {item.id}
            </Td>
            <Td style="z-0 w-32">
                <ImageTable 
                    images={item?.images}
                    url={import.meta.env.VITE_API_URL + "/products/"}
                    higth={14}
                    count={true}
                />
            </Td>
            <Td style='flex-col'>
                <span className='text-md'>{item?.name}</span>
                <span className=' text-xs'>{item?.code}</span>
            </Td>
            
            <Td style='w-32 '>
                {formatearDinero(item?.price)}
            </Td>
            <Td style={`w-20`}>
                {item?.cantidad}
            </Td>
            <Td style={`w-20`}>
                {formatearDinero(item?.cantidad * item?.price)}
            </Td>
            <Td style={`w-20 cursor-pointer rounded-r-lg border-r `}>
                <img src={iconDelete} className='w-4 h-4 red' alt="" 
                    onClick={()=>{
                        handleRemoveProduct(item?.id)
                    }}
                />
            </Td>
            
            
        </tr>
      );
    return (
        <div 
            id='listProduct' 
            className="center-c max-h-[calc(100vh-10vh)] bg-slate-100 overflow-x-hidden overflow-auto top-full z-10 rounded-lg " 
        > 

            <div className="relative w-full gap-4 center-r p-2 font-light bg-slate-800 text-white text-2xl">
                <img src={iconCart} className="w-8" alt="ok" />
                <span className="text-base md:text-xl font-poppins-regular">Productos en Carrito</span>
                
                <Btn
                    style='md:absolute bg-white right-2 '
                    icon={iconClose}
                    imageColor
                    action={()=>{
                        closeModal()
                    }}
                />
            </div>
            <div className=' overflow-y-auto py-1'>


                <div className="center-c gap-2 rounded-lg p-1  h-full">
                    
                    {
                        order?.length > 0 ?
                        <div className='center-c gap-y-2 h-full'>
                        
                            <div 
                                className="center-r text-white gap-2 px-4 py-1 rounded-lg font-poppins-bold bg-green-500 cursor-pointer"
                                onClick={()=>{
                                    navigate('/sellerAdmin/admin/cart')
                                    closeModal()
                                }}
                            >
                                Continuar con la compra
                                <img src={iconArrow} className="w-5 white" alt="next"/>
                            </div>
                            <table className="table-fixed w-fit text-slate-800">
                                <Tbody items={order} renderRow={renderRow} />
                                <TableHeader columns={columns} />
                                
                            </table>
                            <div className='flex justify-end w-full'>
                                <ShowTotal subtotal={subtotal} total={total} />
                            </div>
                        </div>
                        :
                        <NoProductsToShow icon={iconCustions}/>
                    }
                </div>

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
        <div className={`py-1 font-poppins-regular text-sm bg-white group-hover/item:border-y-slate-400 group-hover/item:bg-slate- transition-all h-16 flex flex-1 items-center justify-center group-hover/item:font-poppins-semibold border-y ${style}`}>
            {children}
        </div>
    </td>
    )
  }
