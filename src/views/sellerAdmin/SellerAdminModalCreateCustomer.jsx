
import {memo, useState, useEffect, useRef} from 'react'
import { useAuth } from "/src/hooks/useAuth"
import Btn from '/src/components/admin/Btn'


import LabelSimple from '/src/components/admin/LabelSimple'
import BlockHeader from '/src/components/admin/BlockHeader'
import iconClose from '/src/static/icons/close.svg'
import iconUser from '/src/static/icons/userBlack.svg'
import iconCustomer from "/src/static/icons/sellerAdmin/customer.svg"
import iconSave from "/src/static/icons/save_filled.svg"
import iconUpdate from "/src/static/icons/update.svg"
import iconCode from "/src/static/icons/barcode.svg"
import iconPhone from "/src/static/icons/phone.svg"
import iconEmail from "/src/static/icons/email.svg"
import useAdmin from '/src/hooks/useAdmin'
import useStore from '/src/hooks/useStore'
import ModalViewRequest from '/src/components/admin/ModalViewRequest'


const SellerAdminModalCreateCustomer=({customer, closeModal})=> {

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
    const emailRef = useRef();

    const [errores, setErrores] = useState({})
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)

    const handleSendData = () =>{
        const sendCustomer = {
            ccruc:ccrucRef.current.value,
            name:nameRef.current.value,
            phone:phoneRef.current.value,
            email:emailRef.current.value
        }
        if(isCustomer){
            sendCustomer._method = 'PUT'
            sendCustomer.id = customer?.id
        }

        if(!waiting){
            if(isCustomer){
                update('customers', sendCustomer, setErrores, setState, setWaiting)
            }else{
                create('customers', sendCustomer, setErrores, setState, setWaiting)
            }
        }
    }
    const isCustomer = customer ? true : false
    const initial = {
        ccruc: isCustomer ? customer?.ccruc :'',
        name: isCustomer ? customer?.name :'',
        phone: isCustomer ? customer?.phone :'',
        email: isCustomer ? customer?.email :'',
    }
    useEffect(()=>{
        if(state){
            mutateCustomers()
            closeModal()
        }
        handleModalViewRequest(<ModalViewRequest text={isCustomer ?'Actualizando...' :'Guardando...' } icon={isCustomer ? iconUpdate :iconSave} spin={isCustomer}/> )
        handleModalStateRequest(waiting)
    },[waiting])

    return (
        <div className=" md:flex flex-col w-full font-poppins-extrabold bg-white rounded-lg overflow-hidden p-2">
        
        <BlockHeader
            name={  
                <div className='flex items-center'>
                  <img src={iconCustomer} alt="save" className='w-8 h-8 gray pr-2' />
                  {isCustomer?'Actualizar cliente':'Crear cliente'}
                </div>
                }
                
            >
                <Btn
                style='bg-green-500 border right-2 '
                icon={isCustomer ? iconUpdate :iconSave}
                text={isCustomer ?'Actualizar' :'Guardar' }
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
                defaultValue={initial?.name}
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
                htmlfor="email"
                name="Correo:"
                image={iconEmail}
                error={errores.email}
            >
            <input 
                type="text" 
                id="email"
                placeholder="Ingresa correo"
                ref={emailRef}
                defaultValue={initial?.phone}
            />
            </LabelSimple>
        </div>
        
    </div>
    )
}

export default memo(SellerAdminModalCreateCustomer)


