import { memo } from "react"
import { formatearDinero } from "/src/helpers"

import BlockHeader from "/src/components/admin/BlockHeader"
import iconItem from '/src/static/icons/item.svg'
import LinkBtn from './LinkBtn';
import iconList from '/src/static/icons/list_circle.svg'
import { timeToText } from '/src/helpers';
import IsLoading from "/src/components/store/common/IsLoading";


const ProductDescription=({product})=> {

    if(product === undefined){return <IsLoading />} 

    // console.log(product)
    return (
        
        <div className="flex flex-wrap flex-col flex-1 ">
            {/* Top bar */}
            <BlockHeader
            name={  
                <div className='flex items-center'>
                  <img src={iconItem} alt="save" className='w-8 h-8 pr-2' />
                  {product?.name}
                </div>
                }
                code={product?.code}
            >
                <LinkBtn
                    to="/admin/inventory/stock"
                    icon={iconList}
                    text='Lista'
                    imageColor='white'
                />
            </BlockHeader>

            {/* Bottom part */}
            <div className="overflow-y-auto flex-1 relative text-sm font-poppins-regular">
                <div className="w-full absolte">
                    <div className="flex flex-col justify-between p-0 gap-y-2">
                        <div className="flex flex-col text-slate-600 w-full items-stretch gap-y-4">
                            
                        <div className="">
                            <div>Ingresos {product?.purchase_order_products?.length}</div>
                        {
                            product?.purchase_order_products?.length?
                            <table className="w-full text-slate-600">
                            <thead
                                className=' w-full  text-white'
                            >
                                
                                <tr className="">
                                    <th className="w-10 bg-slate-800 rounded-l-lg ">#</th>
                                    <th className="w-32 bg-slate-800 ">Fecha</th>
                                    <th
                                        className='bg-slate-800' colSpan={2}
                                    >
                                        Factura
                                    </th> 
                                    <th className="w-14 bg-slate-800">Unidades</th>
                                    <th className=" bg-slate-800">Precio</th>
                                    <th className=" bg-slate-800 rounded-r-lg">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className='w-full'>
                        {
                            product?.purchase_order_products?.map(item=>(
                                <tr 
                                    key={item.id}
                                    className="group/item text-sm"
                                >
                                    <td className="p-0 w-14" >
                                        <div className="center-c h-10 border-y border-l rounded-l-lg bg-white">
                                            {item?.purchase_order?.id}
                                        </div>
                                    </td>
                                    <td className="p-0">
                                        <div className="center-c h-10 border-y bg-white">
                                        {timeToText(item?.purchase_order?.created_at,'ll')}
                                        </div>
                                    </td>
                                    <td className="p-0" colSpan={2}>
                                        <div className="center-r h-10 border-y bg-white">
                                        {item?.purchase_order?.envoice}
                                        </div>
                                    </td>
                                    <td className="px-0">
                                        <div className="center-r h-10  border-y bg-white">
                                            <span>{item?.quantity}</span>
                                        </div>
                                    </td>
                                    <td className="px-0">
                                        <div className="center-r h-10  border-y bg-white ">
                                            <span>{formatearDinero(item?.price)}</span>
                                        </div>
                                    </td>
                                    <td className="px-0">
                                        <div className="center-r h-10  border-y border-r bg-white  rounded-r-lg">
                                            <span>{formatearDinero(item?.subtotal)}</span>
                                        </div>
                                    </td>
                                </tr>
                            )
                            )
                        }
                        </tbody>
                            </table>
                            :
                            <div className='font-poppins-bold'>Sin ingresos disponibles</div>
                        }
                        </div>



                        <div>
                            <div>Egresos {product?.sold_order_products?.length}</div>
                        {
                            product?.sold_order_products?.length?
                            <table className="w-full text-slate-600">
                            <thead
                                className=' w-full  text-white'
                            >
                                
                                <tr className="">
                                    <th className="w-10 bg-slate-800  rounded-l-lg">#</th>
                                    <th className="w-32 bg-slate-800 ">Fecha</th>
                                    <th
                                        className='bg-slate-800' colSpan={2}
                                    >
                                        Factura
                                    </th> 
                                    <th className="w-14 bg-slate-800">Unidades</th>
                                    <th className=" bg-slate-800">Precio</th>
                                    <th className=" bg-slate-800 rounded-r-lg">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className='w-full'>
                        {
                            product?.sold_order_products?.map(item=>(
                                <tr 
                                    key={item.id}
                                    className="group/item text-sm"
                                >
                                    <td className="p-0 w-14" >
                                        <div className="center-c h-10 bg-white border-y border-l rounded-l-lg">
                                            {item?.sold_order_id}
                                        </div>
                                    </td>
                                    <td className="p-0">
                                        <div className="center-c h-10 bg-white border-y">
                                            {timeToText(item?.order?.created_at,"ll")}
                                        </div>
                                    </td>
                                    <td className="p-0" colSpan={2}>
                                        <div className="center-c h-10 bg-white  border-y">
                                            <span>{item?.sold_order?.envoice}</span>
                                            <span>{item?.sold_order?.user?.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-0">
                                        <div className="center-r bg-white h-10 border-y">
                                            <span>{item?.quantity}</span>
                                        </div>
                                    </td>
                                    <td className="px-0">
                                        <div className="center-r bg-white h-10 border-y">
                                            <span>{formatearDinero(item?.price)}</span>
                                        </div>
                                    </td>
                                    <td className="px-0">
                                        <div className="center-r bg-white h-10  border-y border-r rounded-r-lg">
                                            <span>{formatearDinero(item?.subtotal)}</span>
                                        </div>
                                    </td>
                                </tr>
                            )
                            )
                        }
                        </tbody>
                            </table>
                            :
                            <div className='font-bold'>Sin egresos disponibles</div>
                        }
                        </div>
                        

                        



                        </div>
                    </div>
                </div>

            </div>
    </div>
            
    
    
  )
}

const Tag =({children, label=''})=>{
    return(
        <div className="flex gap-x-8">
            <div>{label}:</div>
            <div className="flex justify-center items-center gap-x-2 font-normal">
                {children}
            </div>
        </div>
    )
}
export default memo(ProductDescription)
