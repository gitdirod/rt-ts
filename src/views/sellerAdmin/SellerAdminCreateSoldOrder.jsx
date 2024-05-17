
import useStore from "../../hooks/useStore"
import { useEffect, useState, memo } from "react"

import useAdmin from "../../hooks/useAdmin"
import BlockHeader from "/src/components/admin/BlockHeader"
import Btn from "../../components/admin/Btn"
import ModalViewRequest from "/src/components/admin/ModalViewRequest"
import LabelSimple from "/src/components/admin/LabelSimple"
import SellerAdminModalSelectCustomer from "./SellerAdminModalSelectCustomer"
import AddressTarget from "/src/components/sellerAdmin/SellerAdminAddressTarget"
import SellerAdminCustomerTarget from "/src/components/sellerAdmin/SellerAdminCustomerTarget"
import NoProductsToShow from "/src/components/common/NoProductsToShow"
import ShowTotal from "/src/components/common/ShowTotal"
import TableHeader from "/src/components/admin/TableHeader"
import Tbody from "/src/components/admin/Tbody"

import iconDelete from "/src/static/icons/delete.svg"
import iconItem from '/src/static/icons/item.svg'
import iconSearch from '/src/static/icons/search.svg'
import iconSave from '/src/static/icons/save_filled.svg'
import iconUser from '/src/static/icons/userBlack.svg'
import iconCash from '/src/static/icons/common/cash.svg'
import iconSend from '/src/static/icons/common/send.svg'

import { formatearDinero } from "/src/helpers"
import { urlsBackend } from "/src/data/urlsBackend"
import ModalViewAddProduct from "/src/components/seller/ModalViewAddProduct"
import UploadImages from "/src/components/common/UploadImages"
import ShowUploadedImages from "/src/components/common/ShowUploadedImages"
import AlertAdmin from "/src/components/admin/AlertAdmin"
import IsLoading from "/src/components/IsLoading"
import iconStore from "/src/static/icons/seller/shop.svg"


const SellerAdminCreateSoldOrder=()=> {
    const {
        create,
        handleModalViewRequest,
        handleModalStateRequest,
        handleCloseModals,
        handleModalStateComponent,
        handleModalViewComponent,
        customerCcruc,
        handleSetCustomerCcruc,
        handleClearCustomerCcruc
    } = useAdmin()

    
    const {
        customers,
        order,
        subtotal,
        total,
        handleRemoveProduct,
        handleClearOrder,
        mutateProducts, 
        mutateSoldOrders
    } = useStore()
    const [customerSelected, setCustomerSelected] = useState({})
    

    const [errores, setErrores] = useState({})
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)

    const [images, setImages] = useState([])

    const removeImage = (name)=>{
        setImages(files => files.filter(file => file.name !== name))
    }

    const columns = [
        { title: '#', className: 'w-10' },
        { title: 'Imagen', className: '' },
        { title: 'Nombre', className: '' },
        { title: 'Precio', className: '' },
        { title: 'Unidades', className: '' },
        { title: 'Subtotal', className: '' },
        { title: 'Eliminar', className: '' },
    ];

    

    useEffect(()=>{
        if(state){
            mutateProducts()
            setState(false)
            handleClearOrder()
            mutateSoldOrders()
            handleClearCustomerCcruc()
            setImages([])
        }
        handleModalViewRequest(<ModalViewRequest text="Guardando..." icon={iconSave} spin={false}/> )
        handleModalStateRequest(waiting)
    },[waiting])

    useEffect(()=>{
        const customer = customers?.find(cust=> cust?.ccruc === customerCcruc)
        customer ? setCustomerSelected(customer) : setCustomerSelected({})
    },[customerCcruc,customers])
    


    const handleSubmit =async (e) => {
        e.preventDefault()
        const sendOrder = {
            subtotal: subtotal,
            total: total,
            
            customer_addresses:{
                envoice_id: customerSelected?.addresses?.envoice?.id,
                send_id: customerSelected?.addresses?.send?.id
            },
            products : order?.map(product => (
                {
                    id: product.id,
                    quantity: product.cantidad
                }
            )),
            image: images[0]
        }
        if(!waiting){
            create('sold_orders', sendOrder, setErrores, setState, setWaiting)
        }
    }
    // console.log(customerSelected)


    const renderRow = (item) => (
        <tr
            key={item.id}
            className=' group/item'
        >
            {/* Aquí podrías renderizar las celdas como prefieras, dependiendo del item. */}
            <Td style='w-10 group-hover/item:border-l-slate-300 border-l rounded-l-lg'>
                {item.id}
            </Td>
            <Td>
                <img src={urlsBackend.PRODUCT_IMAGE + item?.images[0]?.name}  className="h-full" alt="" />
            </Td>
            <Td style='flex-col'>
                <span className='text-md'>{item?.name}</span>
                <span className=' text-xs'>{item?.code}</span>
            </Td>
            
            <Td>
                {formatearDinero(item?.price)}
            </Td>
            <Td >
                <div
                    className=" cursor-pointer w-full center-r h-full font-poppins-extrabold"
                    onClick={()=>{
                        handleModalStateComponent(true)
                        handleModalViewComponent(<ModalViewAddProduct isButtonCart={false} urlCart='/sellerAdmin/admin/cart' product={item} closeModal={handleCloseModals}/>)
                    }}
                >
                    {item?.cantidad}
                </div>
            </Td>
            <Td>
                {formatearDinero(item?.cantidad * item?.price)}
            </Td>
            <Td style={` cursor-pointer rounded-r-lg border-r `}>
                <img src={iconDelete} className='w-4 h-4 red' alt="" 
                    onClick={()=>{
                        handleRemoveProduct(item?.id)
                    }}
                />
            </Td>
            
        </tr>
      );
    
    if(customers === undefined){
        return <IsLoading/>
    }
    if(order.length <1 ){
        return(
            <div className="w-full center-r" >
                <NoProductsToShow icon={iconStore} goTo='/seller/inventory/products'/>
            </div>
        )
    }
    return (
        <div className="flex flex-wrap flex-1">
            {/* items list */}
            <form 
                className=" overflow-y-hidden flex flex-col flex-1"
                onSubmit={handleSubmit}
                noValidate
            >

                <BlockHeader
                    name={  
                        <div className='flex items-center'>
                          <img src={iconItem} alt="save" className='w-8 h-8 gray pr-2' />
                            Nueva Prefactura
                        </div>
                        }
                    middle={
                        <div 
                            className="w-full center-r gap-2"
                        >
                            <LabelSimple
                                htmlfor="name"
                                name="RUC/CC:"
                                image={iconUser}
                                // error={errores.name}
                            >
                            <input 
                                type="text" 
                                id="name"
                                placeholder="Escribe un nombre."
                                value={customerCcruc}
                                onChange={(e)=>handleSetCustomerCcruc(e.target.value)}
                            />
                            </LabelSimple>
                            <Btn
                                icon={iconSearch}
                                isButton={false}
                                padding="h-full px-2 "
                                action={()=>{
                                    handleModalStateComponent(true)
                                    handleModalViewComponent(<SellerAdminModalSelectCustomer  closeModal={handleCloseModals}/>)
                                }}
                            />
                            
                        </div>
                    }
                >
                    <Btn
                        icon={iconSave}
                        text='Guardar'
                        style="bg-cyanPrimary"
                    />
                    
                </BlockHeader>
                

                <div className="overflow-y-auto flex-1 relative">
                    <div className="absolute flex flex-col w-full gap-4 lg:flex-row text-slate-700 ">
                        <div className="flex flex-col w-full gap-4">

                            <div className="flex flex-col gap-2 items-start p-2  bg-white w-full border rounded-lg overflow-hidden ">
                                        
                                {customerSelected?.id && (<SellerAdminCustomerTarget customer={customerSelected}/>)}
                                <div className="center-r flex-wrap gap-4 w-full">
                                {customerSelected?.addresses?.envoice && (
                                    <AddressTarget address={customerSelected?.addresses?.envoice} icon={iconCash}/>
                                )}
                                {customerSelected?.addresses?.send && (
                                    <AddressTarget address={customerSelected?.addresses?.send} icon={iconSend} title='Datos de envio'/>
                                )}
                                </div>

                                { errores?.customer_addresses && (
                                    <AlertAdmin>
                                        {errores?.customer_addresses?.map(error=> <div key={error}> {error} </div>)}
                                    </AlertAdmin>
                                )}
                            </div>
                            
                            <div className="flex items-center justify-center bg-white rounded-lg border p-2  gap-2">
                                <ShowUploadedImages removeImage={removeImage} images={images}/>
                                <UploadImages 
                                    setImages={setImages} 
                                    images={images} 
                                    maxMessage={
                                        <Btn text='Pendiente para subir' isButton={false} style="bg-cyanPrimary h-fit" />
                                    }
                                >
                                    <Btn icon={iconCash} imageColor text='Agregar comprobante de pago' isButton={false} />
                                </UploadImages>
                            </div>

                            <div className="w-fit">
                                <table className="table-fixed w-full text-slate-800">
                                    <Tbody items={order} renderRow={renderRow} />
                                    <TableHeader columns={columns} />
                                    
                                </table>
                                <div className='flex justify-end w-full'>
                                    <ShowTotal subtotal={subtotal} total={total} />
                                </div>
                            </div>

                            
                        </div>
                        
                    </div>
                </div>
               
            </form>
            
        </div>
  )
}

export default memo(SellerAdminCreateSoldOrder)

const Td = ({children, style='',id, select})=>{
    return(
        <td
            className='px-0'
            onClick={()=>{id? select(id):null}}
        >
        <div className={`py-1 font-poppins-regular text-sm bg-white group-hover/item:border-y-slate-400 group-hover/item:bg-slate- transition-all h-16  flex-1 center-r group-hover/item:font-poppins-semibold border-y ${style}`}>
            {children}
        </div>
    </td>
    )
  }