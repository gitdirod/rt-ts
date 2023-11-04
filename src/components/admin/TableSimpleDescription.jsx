import { useNavigate } from "react-router-dom"
import { formatearDinero } from "/src/helpers"
import { memo } from "react";

import moment from 'moment/dist/moment';
import 'moment/dist/locale/es'
import localization from 'moment/locale/es';
moment.suppressDeprecationWarnings = true;
moment.updateLocale('es', localization);


const TableSimpleDescription=({items, item, actionFunction, actionUrl})=> {
    const navigate = useNavigate()
    const handleSelect =(itemSelected)=>{
        actionFunction(itemSelected.id)
        navigate(`${actionUrl}${itemSelected.id}`)
    }
    
    const selected = ((select)=>(select.id === item.id ? " border-slate-600" : ""))

    return (
    <>
        <div className="flex border rounded-md mr-0.5 mt-0.5 font-bold text-slate-600 px-2 py-1 bg-white border-slate-300">
            <span className="w-8 text-center" >Id</span>
            <span className="w-16 text-center">Total</span>
            <span className="w-48 text-center">Usuario</span>
            <span className="flex-1 text-center">Factura</span>
        </div>
        <div className="relative w-96 h-full overflow-y-scroll scrollbar">
            <div className="absolute top-0 w-full pb-1">

                {items?.map(item =>{
                    const created_at = new Date(item.created_at).toDateString()
                    return (
                        <div 
                            key={item.id}
                            className={`${selected(item)} flex items-center border border-l-4 rounded-md mr-0.5 mt-0.5 bg-white text-slate-500 px-2 cursor-pointer transition-all`}
                            onClick={()=>handleSelect(item)}
                        >
                            <div className="flex justify-center items-center w-8 text-sm" >{item.id}</div>
                            <div className="flex items-center justify-center w-16 text-slate-600 text-right" >
                                <span className="text-sm font-bold">
                                    {formatearDinero(item.total)}
                                </span>
                            </div> 
                            <div className="flex flex-1 flex-col justify-center items-center w-48" >
                                <span className="font-bold">
                                    {item.user['name']}
                                </span>
                                <span className="text-sm">
                                    {moment(created_at).fromNow()}
                                </span>
                            </div>
                            <span className="font-semibold">{item.envoice}</span>
                        </div>
                    )
                }
                )}
            
            </div>
        </div>
    </>
    )
}

export default memo(TableSimpleDescription) 
