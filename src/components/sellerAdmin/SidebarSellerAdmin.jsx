import { useAuth } from "/src/hooks/useAuth"

import { Link } from 'react-router-dom'

import useStore from "/src/hooks/useStore"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import IsLoading from "/src/components/IsLoading"




export default function SidebarSellerAdmin({}) {

    const {user} = useAuth({
        middleware: 'auth',
        url: '/admin'
    })

    const location = useLocation();
    const navigate = useNavigate()
    
    const{
        orders,
    } = useStore()

    
    const views = [
        {
            id:0,
            name:'Compra',
            image:'iconStore.svg',
            url:'/sellerAdmin/admin/cart'
        },{
            id:1,
            name:'Prefacturas',
            image:'iconEnvoice.svg',
            url:'/sellerAdmin/admin/quotation'
        },
        {
            id:2,
            name:'Clientes',
            image:'iconUsers.svg',
            url:'/sellerAdmin/admin/customers'
        }
    ]
    
    if(orders === undefined){
        return <IsLoading/>
    }

    return (
        <div className='flex  border-r bg-white '>
            <div className='w-fit p-1  gap-0.5 flex flex-col  overflow-y-auto scrollbar font-poppins-regular text-slate-700 '>
            {
                views?.map(view => view &&  (
                    <div
                        key={view?.id}
                        onClick={()=>navigate(view.url)}
                        className={`${location.pathname.startsWith(view.url) ? 'transition-all font-poppins-bold bg-slate-700 text-white':' hover:bg-slate-100 '} border rounded-lg cursor-pointer p-2 text-sm w-[135px]`}
                    >
                        <div className="flex justify-start gap-2 w-full">
                            <img src={"/iconos/sellerAdmin/"+view.image} className={`${location.pathname.startsWith(view.url) ? 'white ':' grey'} w-5 h-5`} alt="" />
                            {view?.name}
                        </div>
                    </div>
                ))
            }
            </div>
        
        </div>
    )
}