import { useLoaderData, useNavigate } from "react-router-dom"
import useStore from "../../hooks/useStore"
import IsLoading from "../../components/IsLoading"
import { formatearDinero } from '/src/helpers'
import BlockKardex from "/src/components/admin/BlockKardex"


export async function loader({ params }){
    return params.itemId
}


export default function ShowStock(){
    
    const {products} = useStore()
    const productUrl = useLoaderData()
    const product =  products?.find((product)=> product.id === Number(productUrl))
    
    if(product === undefined) return (<IsLoading />)
    
    return (
        <div className="flex-1 flex  h-[100%] pb-4">
            {/* items list */}
            <div className=" overflow-y-hidden flex">
                <TableSimple 
                    items = {products}
                    item = {product}
                    actionUrl = {"/admin/inventory/stock/product/"}
                />
            </div>
            {/* Item description  */}
            
            <div className="flex flex-1">
                <BlockKardex 
                    product = {product}
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

    const selected = ((select)=>(select.id === item.id ? " border-slate-400 border-l-slate-700 bg-slate-700 text-white font-poppins-bold " : 
    "group-hover/item:bg-slate-100 font-poppins-regular group-hover/item:font-poppins-bold  border-y transition-all group-hover/item:border-y-slate-300  group-hover/item:border-r-slate-300 group-hover/item:border-l-slate-300 bg-white"))
    return (
    
    <div className='flex flex-1 relative w-full overflow-hidden '>
        <div
            className=' w-full flex flex-col border-cyan-500 overflow-y-auto px-0.5'
        >
            <table className=" table-fixed w-96 text-slate-600">
                <thead
                    className=' w-full sticky top-0  text-white'
                >
                    <tr className="">
                        <th className="w-10 bg-slate-800 rounded-l-lg "></th>
                        <th
                            className='bg-slate-800' colSpan={4}
                        >
                            Productos
                        </th> 
                        <th className="w-14 bg-slate-800 rounded-r-lg"></th>
                    </tr>
                </thead>
                <tbody className='w-full  '>
            {
                items?.map(item=>(
                    <tr 
                        key={item.id}
                        className="group/item cursor-pointer text-sm"
                        onClick={()=>handleSelect(item)}
                    >
                        <td className="p-0 w-14" colSpan={1}>
                            <div className={`center-c h-12 border-y border-l rounded-l-lg w-10 ${selected(item)}`}>
                                <span className="text-sm">{item?.id}</span>
                            </div>
                        </td>
                        <td className="p-0" colSpan={4}>
                            <div className={`center-c h-12 border-y ${selected(item)}`}>
                                <span className="">{item?.name}</span>
                                <span className="text-sm">{item?.code}</span>
                            </div>
                        </td>
                        <td className="px-0" colSpan={1}>
                            <div className={`center-c h-12  border-y border-r rounded-r-lg  w-14 ${selected(item)}`}>
                                <span>{formatearDinero(item?.price)}</span>
                                <span>{item?.units}</span>
                            </div>
                        </td>
                    </tr>
                )
                )
            }
            </tbody>
            </table>
        </div>
    </div>
    
    )
}
