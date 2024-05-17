import {  memo, useEffect, useState } from "react"
import IsLoading from "../../components/IsLoading"
import { useNavigate } from "react-router-dom"
import useStore from "../../hooks/useStore"
import BlockHeader from "/src/components/admin/BlockHeader"
// import TableTrOrder from "/src/components/admin/TableTrOrder"
import Total from '/src/components/admin/Total'
import iconEnvoice from '/src/static/icons/envoice.svg'
import TableHeader from "/src/components/admin/TableHeader"

import TagPayment from '/src/components/admin/TagPayment'
import TagTracking from '/src/components/admin/TagTracking'
import { formatearDinero } from '/src/helpers'
import SoldOrderDescription from "/src/components/admin/SoldOrderDescription"
import useAdmin from "/src/hooks/useAdmin"
import ModalViewShowOrder from "/src/components/seller/ModalViewShowOrder"


const SellerAdminIndexSoldOrders= ({}) => {
  const {soldOrders} = useStore()
  const {
    handleModalStateComponent,
    handleModalViewComponent,
    handleCloseModals
} = useAdmin()


  const navigate = useNavigate()
  const handleSelect =(item)=>{
    handleModalStateComponent(true)
    handleModalViewComponent(<ModalViewShowOrder order={item} closeModal={handleCloseModals}/>)
    // navigate(`/admin/orders/item/${id}`)
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
        <BlockHeader
          name={
            <div className='flex'>
              <img src={iconEnvoice} alt="save" className='w-8 h-8 pr-2' />
                Prefacturas ({soldOrders?.length})
            </div>
          }
          middle={
            <Total
            purchases={soldOrders}
        />
          }
        >
        </BlockHeader>
        {/* <Total
            purchases={soldOrders}
        /> */}

        <table className=" table-fixed w-full text-slate-600">
          <TableHeader columns={columns} />
          <tbody className='w-full  '>
            {
                soldOrders?.map(item=>(
                    <TableTrItem
                        key={item.id}
                        item={item}
                        change={()=>handleSelect(item)}
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
  
  console.log(item)
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
          <span>{item?.addresses?.send?.people}</span>
          <span className="text-sm">{item?.addresses?.send?.ccruc}</span>
      </Td>
      <Td style=''>
          <div className='flex gap-x-2'>
          <TagPayment orderPayment={item?.soldOrderPayment}/>
          <TagTracking orderTracking={item?.soldOrderTracking}/>
          </div>
      </Td>
      {/* <Td><TagStatus order={item}/></Td> */}
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

export default memo(SellerAdminIndexSoldOrders)