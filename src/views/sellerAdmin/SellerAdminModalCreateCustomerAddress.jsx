import {memo, useState, useEffect, useRef} from 'react'
import { useAuth } from "/src/hooks/useAuth"
import Btn from '/src/components/admin/Btn'


import LabelSimple from '/src/components/admin/LabelSimple'
import BlockHeader from '/src/components/admin/BlockHeader'
import iconClose from '/src/static/icons/close.svg'
import iconUser from '/src/static/icons/userBlack.svg'
import iconSend from '/src/static/icons/common/send.svg'
import iconCash from '/src/static/icons/common/cash.svg'
import iconSave from "/src/static/icons/save_filled.svg"
import iconUpdate from "/src/static/icons/update.svg"
import iconCode from "/src/static/icons/barcode.svg"
import iconPhone from "/src/static/icons/phone.svg"
import iconAddress from "/src/static/icons/position.svg"
import iconCity from "/src/static/icons/common/cityBlack.svg"
import useAdmin from '/src/hooks/useAdmin'
import useStore from '/src/hooks/useStore'
import ModalViewRequest from '/src/components/admin/ModalViewRequest'
import { CUSTOMER_ADDRESSES_TYPES } from '/src/data/customerAddressesType'


const SellerAdminModalCreateCustomerAddress=({customer, type, closeModal})=> {

    const { user } = useAuth({
        middleware: 'auth',
        url: '/'
    })

    const {
        create,
        update,
        handleModalViewRequest,
        handleModalStateRequest
    } = useAdmin()
    const {mutateCustomers} = useStore()

    const ccrucRef = useRef();
    const nameRef = useRef();
    const phoneRef = useRef();
    const cityRef = useRef();
    const addressRef = useRef();

    const [errores, setErrores] = useState({})
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)
    
    const handleSendData = () =>{
        let sendCustomerAddress = {
            customer_id: customer?.id,
            type: type,
            ccruc: ccrucRef.current.value,
            people: nameRef.current.value,
            phone: phoneRef.current.value,
            city: cityRef.current.value,
            address: addressRef.current.value,
        };
    
        if (customer?.addresses?.[type] ? true : false ) {
            sendCustomerAddress._method = 'PUT'
            sendCustomerAddress.id = customer?.addresses?.[type]?.id
        }
    
        if (!waiting) {
            if(customer?.addresses?.[type] ? true : false )
            {
                update('customer-addresses', sendCustomerAddress, setErrores, setState, setWaiting)
            }else{
                create('customer-addresses', sendCustomerAddress, setErrores, setState, setWaiting)
            }
        }

    }

    const initial = {
        ccruc:customer?.addresses?.[type]?.ccruc ? customer?.addresses?.[type]?.ccruc :
            customer?.ccruc ? customer?.ccruc:'' ,
        people:customer?.addresses?.[type]?.people ? customer?.addresses?.[type]?.people :
            customer?.name ? customer?.name:'' ,
        phone:customer?.addresses?.[type]?.phone ? customer?.addresses?.[type]?.phone :
            customer?.phone ? customer?.phone:'' ,
        city:customer?.addresses?.[type]?.city ? customer?.addresses?.[type]?.city :'' ,
        address:customer?.addresses?.[type]?.address ? customer?.addresses?.[type]?.address :'' ,
    }
    // console.log(initial)
    const isUpdate = customer?.addresses?.[type] ? true : false

    useEffect(()=>{
        if(state){
            mutateCustomers()
            closeModal()
        }
        handleModalViewRequest(<ModalViewRequest text={isUpdate?'Actualizando...':'Guardando...'} icon={isUpdate ? iconUpdate : iconSave} spin={isUpdate}/> )
        handleModalStateRequest(waiting)
    },[waiting])

    // console.log(customer)

    return (
        <div className=" md:flex flex-col w-full font-poppins-extrabold bg-white rounded-lg overflow-hidden p-2">
        
        <BlockHeader
            name={  
                <div className='flex items-center'>
                  <img src={type === CUSTOMER_ADDRESSES_TYPES.SEND?iconSend:iconCash} alt="save" className='w-8 h-8 gray pr-2' />
                    {
                        type === CUSTOMER_ADDRESSES_TYPES.SEND && customer?.addresses?.send !== undefined ? "Actualizar datos de envio":
                        type === CUSTOMER_ADDRESSES_TYPES.ENVOICE && customer?.addresses?.envoice !== undefined ? "Actualizar datos de facturación":
                        type === CUSTOMER_ADDRESSES_TYPES.SEND && customer?.addresses?.send === undefined ? "Agregar datos de Envio":
                        type === CUSTOMER_ADDRESSES_TYPES.ENVOICE && customer?.addresses?.envoice === undefined ? "Agregar datos de facturación":
                        'Algo va mal, intenta recargar la pagina con F5'
                    }
                </div>
                }
                
            >
                <Btn
                style='bg-green-500 border right-2 '
                icon={isUpdate ? iconUpdate : iconSave}
                text={isUpdate?'Actualizar':'Guardar'}
                action={handleSendData}
                />
                <Btn
                
                icon={iconClose}
                text='Cancelar'
                action={()=>{
                    closeModal()
                }}
                />
            </BlockHeader>
        
        <div className=" relative flex-wrap center-c text-slate-700 md:flex-row  max-h-screen gap-2 md:gap-4 px-1 md:px-10 py-2">
            <LabelSimple
                htmlfor="ccruc"
                name="CC/RUC:"
                image={iconCode}
                error={errores.ccruc}
            >
            <input 
                type="text" 
                id="ccruc"
                placeholder="Cedula o Ruc."
                ref={ccrucRef}
                defaultValue={initial?.ccruc}
            />
            </LabelSimple>
            <LabelSimple
                htmlfor="name"
                name="Nombre:"
                image={iconUser}
                error={errores.name}
            >
            <input 
                type="text" 
                id="name"
                placeholder="Nombre con apellido"
                ref={nameRef}
                defaultValue={initial?.people}
            />
            </LabelSimple>
            <LabelSimple
                htmlfor="phone"
                name="Telefono:"
                image={iconPhone}
                error={errores.phone}
            >
            <input 
                type="text" 
                id="phone"
                placeholder="Número telefonico"
                ref={phoneRef}
                defaultValue={initial?.phone}
            />
            </LabelSimple>
            <LabelSimple
                htmlfor="city"
                name="Ciudad:"
                image={iconCity}
                error={errores.city}
            >
            <input 
                type="text" 
                id="city"
                placeholder="Ingresa la ciudad"
                ref={cityRef}
                defaultValue={initial?.city}
            />
            </LabelSimple>
            <LabelSimple
                htmlfor="address"
                name="Dirección:"
                image={iconAddress}
                error={errores.address}
            >
            <input 
                type="text" 
                id="address"
                placeholder="Ingresa la dirección"
                ref={addressRef}
                defaultValue={initial?.address}
            />
            </LabelSimple>
        </div>
        
    </div>
    )
}

export default memo(SellerAdminModalCreateCustomerAddress)

