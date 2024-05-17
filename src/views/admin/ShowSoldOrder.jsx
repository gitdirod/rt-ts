import { useLoaderData } from "react-router-dom"

import useStore from "../../hooks/useStore"
import IsLoading from "../../components/IsLoading"
import SoldOrderDescription from "/src/components/admin/SoldOrderDescription"
import iconPhone from '/src/static/icons/phone.svg'
import iconEmail from '/src/static/icons/email.svg'

import { useNavigate } from "react-router-dom"
import { formatearDinero } from "/src/helpers"
import TagPayment from "/src/components/admin/TagPayment"


export async function loader({ params }){
    return params.itemId
}


export default function ShowSoldOrder(){
    
    const {soldOrders} = useStore()
    const orderUrl = useLoaderData()
    const order =  soldOrders?.find((order)=> order.id === Number(orderUrl))
    
    if(order === undefined) return (<IsLoading />)
    
    
    return (
        <div className="flex-1 flex  h-[100%] pb-4">
            
            {/* items list */}
            <div className=" overflow-y-hidden flex">
                <TableSimple 
                    items = {soldOrders}
                    item = {order}
                    actionUrl = {"/admin/orders/orders/item/"}
                />
            </div>

            {/* Item description  */}
            <div className="flex flex-1">
                <SoldOrderDescription 
                    order = {order}
                /> 
            </div>
        
        </div>
    )
}

const TableSimple=({items, item, actionUrl})=> {

   
    const navigate = useNavigate()
    const handleSelect =(itemSelected)=>{
        navigate(`${actionUrl}${itemSelected.id}`)
    }

    const selected = ((select)=>(select.id === item.id ? " selected group/item_list bg-slate-700 text-white font-poppins-bold " : 
    "bg-white hover:border-slate-300 text-slate-600 hover:bg-slate-100 font-poppins-regular transition-all"))
    const selectedImg = ((select)=>(select.id === item.id ? " white " : "gray"))
    
    return (
    
    <div 
        className='flex flex-1 relative w-full overflow-hidden '
    >
        <div
            className=' w-full flex flex-col border-cyan-500 overflow-y-scroll px-0.5'
        >
            <div className=" w-96 ">
                <div className="flex justify-center  rounded-lg items-center font-poppins-bold bg-slate-800 text-white ">
                    Prefacturas ({items?.length})
                </div>
                {
                    items?.map(item=>(
                        <div
                            key={item.id}
                            className={`flex flex-col rounded-lg cursor-pointer border mt-0.5 p-1 text-xs transition-all ${selected(item)} `}
                            onClick={()=>handleSelect(item)}
                        >
                            <div className="flex justify-between ">
                                <span className=" w-1/3">#{item.id}</span>
                                <span className=" text-base w-1/3 text-center">{item?.total?formatearDinero(item?.total):''}</span>
                                <div className="w-1/3 text-end">
                                    <TagPayment
                                        orderPayment={item?.soldOrderPayment}
                                        mini={true}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col font-normal">
                                
                                <span className="">{item?.user?.name}</span>
                                
                                <div className="flex gap-x-1">
                                    <img className={`w-4 h-4 ${selectedImg(item)}`} src={iconEmail} alt="" />
                                    <span className="">{item?.user?.email}</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
                
                
            </div>
        </div>
    </div>
    
    )
}