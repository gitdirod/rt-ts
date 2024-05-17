import {
    memo,
    useRef,
    useState, 
    useEffect
} from 'react'
import useAdmin from '/src/hooks/useAdmin'
import { useAuth } from "/src/hooks/useAuth";
import Alert from './Alert'
import add from '/src/static/icons/add.svg'
import close from '/src/static/icons/close.svg'
import imgUpdate from '/src/static/icons/update.svg'
import { PHONES_TYPES } from '/src/data/phonesTypes';
import { ADDRESSES_TYPES } from '/src/data/addressesTypes';
import Btn from './admin/Btn';


const TarjetEnvoice=({children, envoiceAddress, envoice = true})=> {

    const {
        create,
      } = useAdmin()

    const { 
        userMutate
    } = useAuth({
        middleware: 'auth',
        url: '/'
      })

    const [phoneToShow, setPhoneToShow] = useState("No registra")
    const [createNew, setCreateNew] = useState(false)

    const [stateNewTarjet, setStateNewTarjet] = useState(false)
    const [waitingNewTarjet, setWaitingNewTarjet] = useState(false)
    const [errorNewTarjet, setErrorNewTarjet] = useState(false)
    
    const nameRef = useRef()
    const [ccruc, setCcruc] = useState(envoiceAddress?.['ccruc']?envoiceAddress?.['ccruc']:"")
    const [phone, setPhone] = useState(envoiceAddress?.phone?.number?envoiceAddress?.phone?.number:"")
    const cityRef = useRef()
    const addressRef = useRef()
    



    const handleAddTarjetSubmit = async e =>{
        e.preventDefault()
        const tarjetEnvoice = {
            type: envoice? ADDRESSES_TYPES.ENVOICE: ADDRESSES_TYPES.SEND,
            people: nameRef.current.value,
            ccruc: ccruc.replace(/\s+/g, ''),
            city: cityRef.current.value,
            address: addressRef.current.value,
            phone: {
                number: phone.replace(/\s+/g, ''),
                type: envoice? PHONES_TYPES.ENVOICE: PHONES_TYPES.SEND,
            }
        }
        create('addresses',tarjetEnvoice, setErrorNewTarjet, setStateNewTarjet, setWaitingNewTarjet)
      }
      const updateNumber = (e) => {
        const val = e.target.value
        if (e.target.validity.valid) {
            setPhone(e.target.value)
        }
          else if (val === '' || val === '-' ) {
            setPhone(val)
          }
      }
      const updateCcRuc = (e) => {
        const val = e.target.value
        if (e.target.validity.valid) {
            setCcruc(e.target.value)
        }
          else if (val === '' || val === '-' ) {
            setCcruc(val)
          }
      }
      useEffect(()=>{
        setPhone(envoiceAddress?.phone?.number?envoiceAddress?.phone?.number:"")
        setCcruc(envoiceAddress?.['ccruc']?envoiceAddress?.['ccruc']:"")
      },[envoiceAddress])

      useEffect(()=>{
        if(stateNewTarjet){
            userMutate()
            setStateNewTarjet(false)
            setCreateNew(false)
        }
      },[waitingNewTarjet])

  return (
    <div 
        className=" border p-2 rounded-lg flex-1 bg-white"
    >
        {children}
        {
        Object.keys(envoiceAddress). length > 0 && createNew=== false ?
        <div 
            className=""
        >
            
            <div className="mt-2 font-poppins-regular">
                <p className=" font-poppins-semibold">Nombre: <span className="font-poppins-regular"> {envoiceAddress?.['people']}</span></p>
                <p className=" font-poppins-semibold">CC o RUC: <span className="font-poppins-regular "> {envoiceAddress?.['ccruc']}</span></p>
                
                <p className=" font-poppins-semibold">Telefono: <span className=" font-poppins-regular"> {envoiceAddress?.phone?.['number']}</span></p>
            </div>

            <div className="border-t">
                <p className=" font-poppins-semibold">Ciudad: <span className="font-poppins-regular"> {envoiceAddress?.['city']}</span></p>
            </div>

            <div className="">
                <p className="font-poppins-semibold">Direción: <span className="font-poppins-regular"> {envoiceAddress?.['address']}</span></p>
            </div>

            <div className='flex items-center justify-center pt-2'>
                <div 
                    className=" py-0.5 text-sm shadow-md w-fit px-4 cursor-pointer bg-[#15A7AE] hover:bg-[#2D565E] transition-all rounded-sm text-center text-white  flex  justify-center items-center gap-x-2 font-bold"
                    onClick={()=>setCreateNew(true)}
                >
                    <img className="w-4 h-4 white" src={imgUpdate} alt="" />
                    Actualizar
                </div>
            </div>
        </div>
        :
        <>
            {
                !createNew && (
                    <div 
                        className={`cursor-pointer flex items-center gap-x-2 ${envoice ? 'text-pinkPrimary':'text-cyanPrimary'}`}
                        onClick={()=>setCreateNew(!createNew)}
                    >
                        <img 
                            className={`w-6 h-6 ${envoice?'pink':'cyan'}`}
                            src={add}
                            alt="" 
                        />
                        <span className=" font-poppins-bold">{envoice ? 'Agregar datos de facturación':'Agregar datos de envío'}</span>
                    </div>
                )
            }
        </>
        
        }
        {
            createNew && (
                <form 
                className='w-full font-poppins-regular'
                onSubmit={handleAddTarjetSubmit}
            >
                <div className='py-1'>
                    <label 
                        htmlFor="name"
                    >
                        <span className='font-poppins-bold'>Nombre:</span>
                    </label>
                    <input 
                        id='name'
                        type="text" 
                        className='border py-1 px-2'
                        placeholder='Ingresa nombre de destinatario'
                        defaultValue={envoiceAddress?.['people']}
                        ref={nameRef}
                    />
                    {errorNewTarjet?.people ? <Alert>{errorNewTarjet.people}</Alert> : null}
                </div>

                <div className='py-1'>
                    <label 
                        htmlFor="ccruc"
                    >
                        <span className='font-poppins-bold'>CC o RUC:</span>
                    </label>
                    <input 
                        id='ccruc'
                        type="text" 
                        className='border py-1 px-2'
                        placeholder='CC o RUC de destinatario'
                        onChange={updateCcRuc}
                        pattern="^-?[0-9]\d*\.?\d*$"
                        value={ccruc}
                    />
                    {errorNewTarjet?.ccruc ? <Alert>{errorNewTarjet.ccruc}</Alert> : null}
                </div>

                <div className='py-1'>
                    <label 
                        htmlFor="phone"
                    >
                        <span className='font-poppins-bold'>Telefono:</span>
                    </label>
                    <input 
                        id='phone'
                        type="tel" 
                        className='border py-1 px-2'
                        placeholder='Ingresa # de telefono'
                        onChange={updateNumber}
                        pattern="^-?[0-9]\d*\.?\d*$"
                        value={phone}
                    />
                    {errorNewTarjet?.['phone.number'] ? <Alert>{errorNewTarjet['phone.number'][0]}</Alert> : null}
                    

                </div>

                <div className='py-1'>
                    <label 
                        htmlFor="city"
                    >
                        <span className='font-poppins-bold'>Ciudad:</span>
                    </label>
                    <input 
                        id='city'
                        type="text" 
                        className='border py-1 px-2'
                        placeholder='Ingresa ciudad de destino'
                        defaultValue={envoiceAddress?.['city']}
                        ref={cityRef}
                    />
                    {errorNewTarjet?.city ? <Alert>{errorNewTarjet.city}</Alert> : null}
                </div>
                <div className='py-1'>
                    <label 
                        htmlFor="address"
                    >
                        <span className='font-poppins-bold'>Dirección:</span>
                    </label>
                    <input 
                        id='address'
                        type="text" 
                        className='border py-1 px-2'
                        placeholder='Ingresa dirección de destino'
                        defaultValue={envoiceAddress?.['address']}
                        ref={addressRef}

                    />
                    {errorNewTarjet?.address ? <Alert>{errorNewTarjet.address}</Alert> : null}
                </div>
                <div className='center-r gap-x-4  mt-1'>
                    <Btn
                        icon={add}
                        text='Guardar'
                        style='bg-cyanPrimary'
                    />
                    <Btn
                        icon={close}
                        text='Cancelar'
                        isButton={false}
                        action={()=>{
                            setCreateNew(false)
                            setErrorNewTarjet({})
                        }}
                    />
                </div>
            </form>
            )
        }

    

    </div>
  )
}

export default memo(TarjetEnvoice)