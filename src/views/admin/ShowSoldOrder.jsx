import { useLoaderData } from "react-router-dom"
import IsLoading from "../../components/store/common/IsLoading"
import SoldOrderDescription from "/src/components/admin/SoldOrderDescription"
import { SoldOrderService } from "/src/services/SoldOrderService"


export async function loader({ params }){
    return params.itemId
}


export default function ShowSoldOrder(){
    
    const orderUrl = useLoaderData()
    const { data: order } = SoldOrderService.useSoldOrderById(Number(orderUrl));
    
    if(order === undefined) return (<IsLoading />)
    
    
    return (
        <div className="flex-1 flex  h-[100%] pb-4">

            {/* Item description  */}
            <div className="flex flex-1">
                <SoldOrderDescription 
                    order = {order}
                /> 
            </div>
        
        </div>
    )
}