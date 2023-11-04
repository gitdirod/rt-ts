import { useLoaderData } from "react-router-dom"
import HeaderShower from "../../components/admin/HeaderShower"
import useAdmin from "../../hooks/useAdmin"
import TableSimpleDescription from "../../components/admin/TableSimpleDescription"
import SoldOrderDescription from "../../components/admin/SoldOrderDescription"
import IsLoading from "../../components/IsLoading"
import { memo } from "react"
import useStore from "../../hooks/useStore"

export async function loader({ params }){
    return params.itemId
}

const OrdersShower=()=> {
    const {handleGetOrder} = useAdmin()
    const {orders} = useStore()
    const orderUrl = useLoaderData()
    const order =  orders?.find((order)=> order.id === Number(orderUrl))
    
    if(order === undefined) return (<IsLoading />)

    return (
        <div className="flex flex-wrap flex-1">
            
            {/* items list */}
            <div className=" flex flex-col">
                {/* Titulo y nuevo */}
                <HeaderShower 
                    NameSection = "Ordenes"
                />
            
                <TableSimpleDescription 
                    items = {orders}
                    item = {order}
                    actionFunction = {handleGetOrder}
                    actionUrl = {"/admin/orders/item/"}
                />
            </div>
            {/* Item description  */}
            <div className="relative flex-1 overflow-y-scroll scrollbar">
                <SoldOrderDescription 
                    order = {order}
                />
            </div>
    
        </div>
  )
}
export default memo(OrdersShower)
