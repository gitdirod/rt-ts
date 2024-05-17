import { useAuth } from "/src/hooks/useAuth"

import { Link } from 'react-router-dom'

import useStore from "/src/hooks/useStore"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import IsLoading from "/src/components/IsLoading"




export default function SidebarSeller({}) {

    const {user} = useAuth({
        middleware: 'auth',
        url: '/admin'
    })

    const location = useLocation();
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search);
    const groupName = queryParams.get('gro');
    const categoryName = queryParams.get('cat');
    

    const{
        groups,
        categories
    } = useStore()
    
    const actualGroup = groups?.filter(gr=> gr?.name === groupName)[0]
    const categoriesGroup = categories?.filter(cat=> cat?.group_id === actualGroup?.id)
    const actualCategory = categories?.filter(cat=> cat?.name === categoryName && cat?.group_id === actualGroup?.id )[0]

    const allProducts = actualGroup ? false : true



    if(groups === undefined){
        return <IsLoading/>
    }

    return (
        <div className='flex  border-r bg-white '>
            <div className='w-fit p-1 overflow-y-auto scrollbar font-poppins-regular'>
                <Link
                    to='/seller/inventory/products/'
                    className={`w-full block ${allProducts?'bg-slate-800 text-white font-poppins-bold ':'border hover:border-slate-400 text-slate-700 hover:bg-slate-100 '}  p-2 text-xs cursor-pointer   text-center  rounded-lg`}
                >
                    Productos
                </Link>
            {
                groups?.map(group=>
                    {
                        const styleSection = actualGroup?.id === group.id
                        ?
                        "font-semibold rounded-t-lg bg-slate-800  text-white shadow border-b border-b-slate-500 text-center ":
                        "hover:bg-slate-200 hover:border-slate-400 hover:shadow rounded-lg text-left "
                        const isGroup = actualGroup?.id === group?.id ? true : false

                        return(
                            (
                                <div
                                    className={` ${isGroup?'shadow bg-slate-700':''} border rounded-lg  my-1 overflow-hidden w-[120px]`} 
                                    key={group.id}
                                >
                                    
                                    <Link
                                        to={'/seller/inventory/products/?gro=' + group.name}
                                    >
                                        <div className={styleSection + ' center-r h-10 border border-transparent p-1 transition-all'}>
                                            <span className='text-xs w-full '>{group.name}</span>
                                        </div>
                                    </Link>
                                    {
                                        categoriesGroup?.map(cat=> cat?.group_id === actualGroup?.id && group?.id === actualGroup?.id &&  (
                                            <div
                                                key={cat?.id}
                                                onClick={()=>navigate('/seller/inventory/products/?gro=' + group?.name +'&cat='+ cat?.name)}
                                                className={`${actualCategory?.id === cat?.id ? 'transition-all font-poppins-bold text-yellow-500':'text-white hover:bg-slate-600 '} cursor-pointer p-2 text-[11px]`}
                                            >
                                                <div className=''>
                                                    {cat?.name}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        )
                    }
                )
            }
            </div>
        
        </div>
    )
}