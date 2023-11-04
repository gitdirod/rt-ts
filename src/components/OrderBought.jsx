import { memo } from "react"
import { formatearDinero, timeToText } from "/src/helpers"

import iconCalendar from '/src/static/icons/common/calendar.svg'
import iconCash from '/src/static/icons/common/cash.svg'
import ModalViewBought from "./customer/ModalViewBought"
import useAdmin from "/src/hooks/useAdmin"
import UploadPayment from "./customer/UploadPayment"


const OrderBought=({order})=> {

    const {
        handleModalStateComponent,
        handleModalViewComponent,
        handleCloseModals
    } = useAdmin()

    return (
        <div 
            className=" cursor-pointer w-full p-2 text-slate-600 font-poppins-regular bg-white border rounded-lg overflow-hidden hover:border-slate-400"
            onClick={()=>{
                handleModalViewComponent(<ModalViewBought order={order} closeModal={handleCloseModals}/>)
                handleModalStateComponent(true)
            }}
        >
            
            <div className="flex gap-2 flex-col md:flex-row   justify-between items-center  bg-white">
                <div className="w-full md:w-1/4 text-slate-500">
                    #{order.id}
                </div>
        
                <div className="w-full md:w-1/4 center-r gap-2">
                    <img className="w-6 h-6" src={iconCalendar} alt="" /> 
                    {timeToText(order?.created_at)}
                </div>
                <div className="w-full md:w-1/4 center-r gap-2">
                    <img className="w-6 h-6" src={iconCash} alt="" />
                    <span className="font-poppins-extrabold">{formatearDinero(order.total)}</span>
                </div>
                <div 
                    className='w-full md:w-1/4 center-r '
                >
                    {/* <span className="px-2 border text-sm rounded-lg font-poppins-bold ">{order?.soldOrderPayment?.state}</span> */}
                    <UploadPayment
                    order={order} 
                    soldOrderPayment={order?.soldOrderPayment}
                    soldOrderTracking={order?.soldOrderTracking}
                    payment_images ={order?.payments}
                    canSend={false}
                    />
                </div>
            </div>
        </div>
    )
}
export default memo((OrderBought))
