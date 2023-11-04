
import {memo, useState} from 'react'
import { useAuth } from "/src/hooks/useAuth"
import Btn from '/src/components/admin/Btn'


import LabelSimple from '/src/components/admin/LabelSimple'
import BlockHeader from '/src/components/admin/BlockHeader'
import iconClose from '/src/static/icons/close.svg'
import iconUser from '/src/static/icons/userBlack.svg'
import iconCustomer from "/src/static/icons/sellerAdmin/customer.svg"
import iconPhone from "/src/static/icons/phone.svg"
import iconEmail from "/src/static/icons/email.svg"
import useStore from '/src/hooks/useStore'
import useAdmin from '/src/hooks/useAdmin'


const SellerAdminModalSelectCustomer=({ closeModal})=> {

    const { user } = useAuth({
        middleware: 'auth',
        url: '/'
    })

    const {customers} = useStore()
    const {
        customerCcruc,
        handleSetCustomerCcruc
    } = useAdmin()

    // const [ccruc, setCcruc] = useState('');
    
    
    return (
        <div className=" md:flex flex-col w-full font-poppins-extrabold bg-white rounded-lg overflow-hidden p-2">
        
        <BlockHeader
            name={  
                <div className='flex items-center'>
                  <img src={iconCustomer} alt="save" className='w-8 h-8 gray pr-2' />
                  Seleccionar cliente
                </div>
                }
                
            >
                <Btn
                
                    icon={iconClose}
                    text='Cerrar'
                    action={()=>{
                        closeModal()
                    }}
                />
            </BlockHeader>
        
        <div className=" relative flex-wrap center-c text-slate-700 md:flex-row  max-h-screen gap-2 md:gap-4 px-1 md:px-10 py-2">
            <LabelSimple
                htmlfor="ccruc"
                name="CC/RUC:"
                image={iconUser}
            >
            <input 
                type="text" 
                id="ccruc"
                placeholder="Cedula o Ruc."
                value={customerCcruc}
                onChange={(e)=>handleSetCustomerCcruc(e.target.value)}
                
            />
            </LabelSimple>
            
            <div className=' border  rounded-lg  p-2 flex flex-col  font-poppins-regular'>
                {
                    customers?.map(cust=> {
                        const isSelected = cust?.ccruc === customerCcruc ? true : false;
                        return(
                            <div 
                                key={cust?.id} 
                                className={`flex gap-4 cursor-pointer ${ isSelected ? 'bg-cyanPrimary text-white' : 'hover:bg-slate-700'}  p-1 px-2 group/item rounded-lg hover:text-white`}
                                onClick={()=>handleSetCustomerCcruc(cust?.ccruc)}
                            >
                                <span className='font-poppins-bold'>{cust?.name}</span>
                                <span>({cust?.ccruc})</span>
                                <div className='center-r gap-1'>
                                    <img src={iconEmail} className={`w-5 ${isSelected ? 'white' : 'group-hover/item:white'}`} alt="" />
                                    {cust?.email}
                                </div>
                                <div className='center-r gap-1'>
                                    <img src={iconPhone} className={`w-5 ${isSelected ? 'white' : 'group-hover/item:white'}`} alt="" />
                                    {cust?.phone}
                                </div>
                            </div>
                        )})
                }

            </div>
            
        </div>
        
    </div>
    )
}

export default memo(SellerAdminModalSelectCustomer)


