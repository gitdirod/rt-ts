import React from 'react'
import SoldOrderDescription from '/src/components/admin/SoldOrderDescription'
import Btn from '/src/components/admin/Btn'
import iconCart from '/src/static/icons/seller/cart.svg'
import iconAddCart from "/src/static/icons/seller/addCart.svg"
import iconClose from '/src/static/icons/seller/close.svg'
import iconCheck from "/src/static/icons/seller/check.svg"
import iconDelete from "/src/static/icons/admin/delete.svg"
import useStore from '/src/hooks/useStore'

export default function ModalViewShowOrder({order}) {

    const { soldOrders } = useStore()
    const selectedOrder = soldOrders?.find(ord=> ord.id === order.id)
    
    return (
        <div className=' max-h-[calc(100vh-10vh)] overflow-x-hidden overflow-y-auto rounded-lg bg-white p-1 center-c font-poppins-regular'>
            <div className='flex flex-col w-full  overflow-y-auto  max-w-6xl text-slate-600 gap-y-2 bg-slate-100'>
                <SoldOrderDescription order={selectedOrder}/>
            </div>
        </div>
    )
}
