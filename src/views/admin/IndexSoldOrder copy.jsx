import {  memo, useEffect, useState } from "react"
import IsLoading from "../../components/store/common/IsLoading"
import { useNavigate } from "react-router-dom"

import iconEnvoice from '/src/static/icons/envoice.svg'
import TableHeader from "/src/components/admin/TableHeader"

import TagPayment from '/src/components/admin/TagPayment'
import TagTracking from '/src/components/admin/TagTracking'
import { formatearDinero } from '/src/helpers'
import { SoldOrderService } from "/src/services/SoldOrderService"


const IndexSoldOrder= () => {

  const {data: soldOrders} = SoldOrderService.useAllSoldOrders()

  const navigate = useNavigate()
  const handleSelect =(id)=>{
    navigate(`/admin/orders/orders/item/${id}`)
  }
  const columns = [
    { title: '#', className: 'w-10' },
    { title: 'Subtotal', className: 'w-32' },
    { title: 'Total', className: 'w-32' },
    { title: 'Cliente', className: '' },
    { title: 'Estado', className: '' },
    { title: 'Articulos', className: 'w-24' },
    { title: 'Unidades', className: 'w-24' }
  ];

  if(soldOrders === undefined) return (<IsLoading/>)
  
  return (
    <div className="overflow-y-hidden flex flex-col flex-1">
      {/* Titulo y nuevo */}
      <div className='flex'>
              <img src={iconEnvoice} alt="save" className='w-8 h-8 pr-2' />
                Prefacturas ({soldOrders?.length})
            </div>
        

        <table className=" table-fixed w-full text-slate-600">
          <TableHeader columns={columns} />
          <tbody className='w-full  '>
            {
                soldOrders?.map(item=>(
                    <TableTrItem
                        key={item.id}
                        item={item}
                        change={handleSelect}
                    />
                )
                )
            }
          </tbody>
        </table>
    </div>
      
  )
}


const TableTrItem=({item, change})=> {
  const {id, subtotal, total, user, products} = item

  const [units, setUnits] = useState(0)
  useEffect(()=>{
      const unidades = products?.reduce((quantity, item) => (Number(item.quantity)) + quantity, 0)
      setUnits(unidades)
  })
  
  return (
  <tr
      className='cursor-pointer group/item'
      onClick={()=>change(item.id)}
  >
      <Td style='w-10 border-l rounded-l-lg'>
          {id}
      </Td>
      <Td>{formatearDinero(subtotal)}</Td>
      <Td>{formatearDinero(total)}</Td>
      <Td>
          <span>{user?.name}</span>
          <span className="text-sm">{user?.email}</span>
      </Td>
      <Td>
          <div className='flex gap-1'>
            <TagPayment orderPayment={item?.soldOrderPayment}/>
            <TagTracking orderTracking={item?.soldOrderTracking}/>
          </div>
      </Td>
      <Td style='w-24'>
          {products?.length}
      </Td>
      <Td style='w-24 border-r rounded-r-lg'>
          {units}
      </Td>
  </tr>
)
}
const Td = ({children, style=''})=>{
  return(
    <td
          className='px-0'
      >
      <div className={`py-1  font-poppins-regular bg-white text-sm group-hover/item:border-slate-400 transition-all h-14 flex flex-col flex-1 items-center justify-center group-hover/item:font-poppins-semibold border-y ${style}`}>
          {children}
      </div>
    </td>
  )
}

export default memo(IndexSoldOrder)