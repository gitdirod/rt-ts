import { memo, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { formatearDinero } from '/src/helpers'

import { useAuth } from '/src/hooks/useAuth'

import add from '/src/static/icons/add.svg'
import iconCart from '/src/static/icons/cart.svg'
import Total from '/src/components/admin/Total'
import LinkBtn from '../../components/admin/LinkBtn'
import TableHeader from '/src/components/admin/TableHeader'


import moment from 'moment/dist/moment';
import 'moment/dist/locale/es'
import localization from 'moment/locale/es';
import { PurchaseOrderService } from '/src/services/PurchaseOrderService'

moment.suppressDeprecationWarnings = true;
moment.updateLocale('es', localization);

const IndexPurchaseOrder=()=> {

    // const {
    //     purchases
    // } = useStore()
    const {data:purchases} = PurchaseOrderService.useAllPurchaseOrders()
    const { user } = useAuth({
        middleware: 'guest',
    })
    
    const columns = [
        { title: 'Id', className: 'w-10' },
        { title: 'Factura', className: '' },
        { title: 'Subtotal', className: '' },
        { title: 'Total', className: '' },
        { title: 'Articulos', className: 'w-32' },
        { title: 'Unidades', className: 'w-32' },
        { title: 'Actualizado', className: '' },
      ];
    
    return (
    <div
        className=' overflow-y-hidden flex flex-col flex-1'
    >
        {/* Cabecera */}
        <div>
                <div className='flex'>
                    <img src={iconCart} alt="save" className='w-8 h-8 pr-2' />
                    Compras ({purchases?.length})
                </div>
                <Total purchases={purchases} />
            
        
            <LinkBtn
                to='/admin/purchases/storePurchase'
                icon={add}
                text='Nueva'
                style='bg-cyanPrimary'
                imageColor='white'
            />
        </div>
        
        {/* Contenido */}
        
        
        <div className='flex flex-1 h-96 border-orange-500'>
            <div
                className=' w-full flex flex-col border-cyan-500 overflow-y-auto px-0.5'
            >
                <table className=" table-fixed w-full text-slate-600">
                    <TableHeader columns={columns} />
                    <tbody className='w-full  '>
                        {
                            purchases?.map(item=>(
                                <TableTrPurchase
                                    key={item.id}
                                    item={item}
                                />
                            )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}


export default memo(IndexPurchaseOrder)

const TableTrPurchase=({item})=> {
    
    const {id, envoice, subtotal, products} = item
    const [units, setUnits] = useState(0)
    useEffect(()=>{
        const unidades = products?.reduce((units, item) => (Number(item.quantity)) + units, 0)
        setUnits(unidades)
    })

    const navigate = useNavigate()
    const handleSelect =(id)=>{
        navigate('/admin/purchases/purchases/purchase/'+id)
    }

    return (
    <tr
        className='cursor-pointer group/item'
        onClick={()=>handleSelect(item.id)}
    >
        <Td style='w-10 border-l rounded-l-lg'>{id}</Td>
        <Td>{envoice}</Td>
        <Td>{subtotal?formatearDinero(subtotal):'$0'}</Td>
        <Td>{subtotal?formatearDinero(subtotal*1.12):'$0'}</Td>
        <Td style='w-32'>{products?.length}</Td>
        <Td style='w-32'>{units}</Td>
        <Td style='text-sm  border-r rounded-r-lg'>{moment(item?.created_at).format('lll')}</Td>
    </tr>
  )
}

const Td=({ children, style=''})=>{
    return(
        <td className='px-0'>
            <div className={`py-1 bg-white font-poppins-regular group-hover/item:border-slate-500  transition-all h-10 center-r flex-1  group-hover/item:font-poppins-bold border-y ${style}`}>
                {children}
            </div>
        </td>
    )
}
