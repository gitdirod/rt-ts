


import IsLoading from '../../components/IsLoading'
import BlockHeader from '/src/components/admin/BlockHeader'
import { useAuth } from '/src/hooks/useAuth'
import Btn from '/src/components/admin/Btn'
import useAdmin from '/src/hooks/useAdmin'
import SellerAdminModalCreateCustomer from './SellerAdminModalCreateCustomer'

import useStore from '/src/hooks/useStore'

import iconUsers from '/src/static/icons/sellerAdmin/customers.svg'

import iconAdd from '/src/static/icons/add.svg'
import iconSend from '/src/static/icons/common/send.svg'
import iconCash from '/src/static/icons/common/cash.svg'
import SellerAdminModalCreateCustomerAddress from './SellerAdminModalCreateCustomerAddress'
import { CUSTOMER_ADDRESSES_TYPES } from '/src/data/customerAddressesType'
import AddressTarget from '/src/components/sellerAdmin/SellerAdminAddressTarget'
import SellerAdminCustomerTarget from '/src/components/sellerAdmin/SellerAdminCustomerTarget'

export default function SellerAdminIndexCustomers (){
    const {users} = useAuth({
        middleware: 'auth',
        url: '/admin'
      })


    const {
        handleModalStateComponent,
        handleModalViewComponent,
        handleCloseModals
    } = useAdmin()

    const {customers} = useStore()

    if(customers === undefined) return(<IsLoading/>)
    return (
        <div className='overflow-y-hidden flex flex-col flex-1'>
            <BlockHeader
                name={
                    <div className='flex'>
                    <img src={iconUsers} alt="save" className='w-8 h-8 pr-2' />
                        Clientes ({customers?.length})
                    </div>
                }
            >
                <Btn
                    style='bg-green-500'
                    text='Crear cliente'
                    icon={iconAdd}
                    action={()=>{
                            handleModalStateComponent(true)
                            handleModalViewComponent(<SellerAdminModalCreateCustomer  closeModal={handleCloseModals}/>)
                        }  
                    }
                />
            </BlockHeader>
            <div className="flex flex-1 relative w-full overflow-hidden pb-5 overflow-y-auto">
                <div className='w-full absolute'>

                    
                    <div className='pb-1 pr-1 flex flex-col gap-0.5'>
                        {customers?.map(customer => (
                            <div
                                key={customer.id}
                            >
                                <BlockCustomer
                                    customer={customer}
                                >
                                    
                                </BlockCustomer>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

const BlockCustomer=({customer})=>{
    const {
        handleModalStateComponent,
        handleModalViewComponent,
        handleCloseModals
    } = useAdmin()
    
    return(
        <div className='flex w-full border gap-x-1 justify-between p-2 transition-all bg-white rounded-lg text-slate-700 hover:border-slate-500 '>
            <div className='flex flex-col w-full gap-2 font-poppins-regular'>
                <div 
                    className='flex gap-4 flex-wrap cursor-pointer px-2'
                    onClick={()=>{
                        handleModalStateComponent(true)
                        handleModalViewComponent(<SellerAdminModalCreateCustomer customer={customer} closeModal={handleCloseModals}/>)
                    }}
                >
                    <SellerAdminCustomerTarget customer={customer}/>
                </div>
                <div className='center-c md:flex-row w-full flex-wrap gap-4'>
                    {
                        customer?.addresses?.envoice ?
                        <div className='flex-1' onClick={()=>{
                                handleModalStateComponent(true)
                                handleModalViewComponent(<SellerAdminModalCreateCustomerAddress customer={customer} type={CUSTOMER_ADDRESSES_TYPES.ENVOICE} closeModal={handleCloseModals}/>)
                            }}
                        >
                            <AddressTarget icon={iconCash} address={customer?.addresses?.envoice}/>
                        </div>
                        :
                        <Btn
                        text='Agregar datos de facturación'
                        icon={iconCash}
                        imageColor
                        action={()=>{
                            handleModalStateComponent(true)
                            handleModalViewComponent(<SellerAdminModalCreateCustomerAddress customer={customer} type={CUSTOMER_ADDRESSES_TYPES.ENVOICE} closeModal={handleCloseModals}/>)
                        }}
                    />
                    }
                    {
                         customer?.addresses?.send ?
                         <div className='flex-1' onClick={()=>{
                            handleModalStateComponent(true)
                            handleModalViewComponent(<SellerAdminModalCreateCustomerAddress isUpdate={true} customer={customer} type={CUSTOMER_ADDRESSES_TYPES.SEND} closeModal={handleCloseModals}/>)
                         }}>
                            <AddressTarget text='Datos de envio' icon={iconSend} address={customer?.addresses?.send}/>
                         </div>
                         :
                        <Btn
                        text='Agregar datos de envio'
                        icon={iconSend}
                        imageColor
                        action={()=>{
                            handleModalStateComponent(true)
                            handleModalViewComponent(<SellerAdminModalCreateCustomerAddress isUpdate={true} customer={customer} type={CUSTOMER_ADDRESSES_TYPES.SEND} closeModal={handleCloseModals}/>)
                        }}
                    />
                    }
                </div>
            </div>
            
        </div>
    )
}

