import { useNavigate } from "react-router-dom"
import { memo } from "react"
import { formatearDinero } from "/src/helpers"


const TableSimple=({items, item, actionUrl})=> {
    const navigate = useNavigate()
    const handleSelect =(itemSelected)=>{
        navigate(`${actionUrl}${itemSelected.id}`)
    }

    const selected = ((select)=>(select.id === item.id ? " border-slate-400 border-l-slate-700 bg-slate-700 text-white font-bold " : 
    " group-hover/item:font-semibold  border-y transition-all group-hover/item:border-y-slate-400  group-hover/item:border-r-slate-400 group-hover/item:border-l-slate-400 bg-white"))
    return (
    
    <div className='flex flex-1 relative w-full overflow-hidden '>
        <div
            className=' w-full flex flex-col border-cyan-500 overflow-y-scroll'
        >
            <table className=" table-fixed w-96 text-slate-600 ">
                <thead  
                    className=' w-full sticky top-0  text-slate-700 h-10'
                >
                    <tr className="">
                        <th className=" p-0 w-14 border-none ">
                            <div className="  bg-white rounded-l border-l border-y border-slate-500 h-8">

                            </div>
                        </th>
                        <th
                            className=' p-0' colSpan={4}
                        >
                            <div className=" bg-white flex justify-center items-center px-0 mx-0 border-y border-y-slate-500 h-8">
                                Productos
                            </div>
                        </th> 
                        <th className="p-0">
                            <div className=" bg-white px-0 mx-0 rounded-r border-r border-y border-slate-500 h-8">

                            </div>
                        </th>
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
                            <div className={`center-c h-12 border-y border-l rounded-l-lg ${selected(item)}`}>
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
                            <div className={`center-c h-12  border-y border-r rounded-r-lg ${selected(item)}`}>
                                <span className="text-sm">{formatearDinero(item?.price)}</span>
                                <span className="text-sm">{item?.units}</span>
                            </div>
                        </td>
                    </tr>
                ))
            }
            </tbody>
            </table>
        </div>
    </div>
    
    )
}
export default memo(TableSimple)
