import useStore from '/src/hooks/useStore'
import {memo, useEffect, useState} from 'react'
import TableTrItemPurchaseOrder from './TableTrItemPurchaseOrder'
import { useAuth } from '/src/hooks/useAuth'
import { formatearDinero, formatearDinero2 } from '/src/helpers'
import useAdmin from '/src/hooks/useAdmin'
import { useNavigate } from "react-router-dom"
import SearchComponent from '/src/components/admin/SearchComponent'
import iconCart from '/src/static/icons/cart.svg'
import BlockHeader from '/src/components/admin/BlockHeader'
import Btn from '/src/components/admin/Btn'
import LabelSimple from '/src/components/admin/LabelSimple'
import TableHeader from '/src/components/admin/TableHeader'
import iconDelete from '/src/static/icons/delete.svg'
import iconSave from '/src/static/icons/save_filled.svg'
import iconEnvoice from '/src/static/icons/envoiceBlack.svg'
import ModalViewRequest from '/src/components/admin/ModalViewRequest'


const StorePurchaseOrder=()=> {
    const navigate = useNavigate()
    const {
        products,
        handleAddBuy,
        handleClearOrderBuy,
        handleRemoveProductBuy,
        orderBuy,
        subtotalBuy,
        mutatePurchases
    } = useStore()
    const { user } = useAuth({
        middleware: 'guest',
    })

    const {
        create,
        handleModalViewRequest,
        handleModalStateRequest
    } = useAdmin()

    
    const [envoice, setEnvoice] = useState('')
    const [showOrderBuy, setShowOrderBuy] = useState([])
    const [showOrderProducts, setShowOrderProducts] = useState([])
    const [purchaseItem, setPurchaseItem] = useState({})
    const [orderToBuy, setOrderToBuy] = useState(orderBuy)


    const [errores, setErrores] = useState({})
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)

    const addToCart = (prod) =>{
        handleAddBuy({...prod, quantity: 0})
    } 
    

    const handleSubmit = e => {
        e.preventDefault()
        const newOrderBuy = {
            subtotal: formatearDinero2(subtotalBuy),
            total: formatearDinero2(subtotalBuy * 1.12),
            envoice: envoice,
            products : orderBuy?.map(product => (
                {
                    id: product.id,
                    quantity: product.quantity,
                    price: product.price
                }
            ))
        }
        if(!waiting){
            create('purchase_orders', newOrderBuy, setErrores, setState, setWaiting)
        }
    }


    const columnsStock = [
        { title: '#', className: 'w-10' },
        { title: 'Nombre', className: '' },
        { title: 'Código', className: '' },
      ];
    const columnsCart = [
        { title: '#', className: 'w-10' },
        { title: 'Nombre', className: '' },
        { title: 'Código', className: '' },
        { title: '$ Precio', className: '' },
        { title: 'Unidades', className: '' },
      ];
    useEffect(()=>{
        if(state){
          mutatePurchases()
          setState(false)
          handleClearOrderBuy()
          navigate('/admin/purchases/purchases')
        }
        handleModalViewRequest(<ModalViewRequest text="Actualizando..." icon={iconSave} spin={false}/> )
        handleModalStateRequest(waiting)
    },[waiting])


    useEffect(()=>{
        if(Object.keys(purchaseItem).length !== 0){
            handleAddBuy(purchaseItem)
        }
    },[purchaseItem])

    useEffect(()=>{
        setOrderToBuy(orderBuy)
    },[orderBuy])
    
    
    
    return (
    <div
        className=' flex-1 flex flex-col  h-[100%]'
    >
        {/* Cabecera */}
        <BlockHeader
            name={  
                <div className='flex items-center'>
                  <img src={iconCart} alt="save" className='w-8 h-8 pr-2' />
                  Nueva compra
                </div>
                }
            middle={
                <div className='w-full center-r font-poppins-bold text-sm border rounded-lg bg-slate-700 text-white px-4 p-1 gap-8 '>
                    <div className='center-r gap-x-2'>
                        <p>Subtotal: <span className='font-poppins-regular'>{formatearDinero(subtotalBuy)}</span></p>
                    </div>
                    <div className='center-r gap-x-2'>
                        <p>Total: <span className='font-poppins-regular'>{formatearDinero(subtotalBuy * 1.12)}</span></p>
                    </div>
                </div>
            }
        >
            
            <Btn
                icon={iconDelete}
                text="Limpiar"
                action={handleClearOrderBuy}
            />
            <form
                onSubmit={handleSubmit}
                noValidate
            >
                <Btn
                    icon={iconSave}
                    text="Guardar"
                    style="bg-green-500"
                />
            </form>
        </BlockHeader>
        {/* Contenido */}
        <div
            className='center-r w-full mb-2'
        >
            <LabelSimple
                htmlfor="envoice"
                name="Factura:"
                image={iconEnvoice}
                error={errores?.envoice}
            >
                <input 
                type="text" 
                id="name"
                className="flex-1 font-bold outline-none transition-all duration-200 mx-2"
                onChange={(e)=>{setEnvoice(e.target.value)}}
                />
            </LabelSimple>
        </div>

        <div className='flex flex-1 h-96 border-orange-500 overflow-y-auto'>
            <div className=' w-1/3 flex flex-col overflow-y-auto'>
                <div
                    className=' p-1'
                >
                    <SearchComponent
                        inputSearch={products}
                        setOutput={setShowOrderProducts}
                        placeholder='Buscar en Inventario.'
                        styleInput='style-input-black'
                    />
                </div>
                <table className=" table-fixed w-full font-poppins-regular">
                    <TableHeader columns={columnsStock} />
                    <tbody className='w-full text-slate-600 '>
                {
                    showOrderProducts?.map(item=>{
                        if(!orderBuy?.some(item2=> item.id === item2.id)){
                            return(
                                <tr
                                    key={item.id}
                                    className='cursor-pointer group/item'
                                    onClick={()=>{
                                        addToCart(item)
                                    }}
                                >
                                    <td
                                        className='px-0 w-10'
                                    >
                                        <div className='h-10 bg-white group-hover/item:border-slate-400  center-r flex-1   border-y border-l text-sm py-1  rounded-l-lg'>
                                            {item.id}
                                        </div>
                                    </td>
                                    <td
                                        className='px-0'
                                    >
                                        <div className='py-1 bg-white group-hover/item:border-slate-400  h-10 center-r flex-1 font-semibold border-y'>
                                            {item.name}
                                        </div>
                                    </td>
                                    <td
                                        className='px-0'
                                    >
                                        <div className='py-1 bg-white group-hover/item:border-slate-400  h-10 center-r flex-1   border-y border-r rounded-r-lg'>
                                            {item.code}
                                        </div>
                                    </td>
                                </tr>
                                
                            )
                        }
                        
                    }
                    )
                }
                </tbody>
                </table>
            </div>
            <div
                className=' w-2/3 flex flex-col border-cyan-500 overflow-y-auto px-0.5'
            >
                <div className='p-1'>
                    <SearchComponent
                        inputSearch={orderToBuy}
                        setOutput={setShowOrderBuy}
                        style='text-green-500'
                        placeholder='Buscar en compra.'
                    />
                </div>
                <table className=" table-fixed w-full text-slate-600">
                <TableHeader columns={columnsCart}  style='base-th-class-green' />
                    <tbody className='w-full'>
                {
                    showOrderBuy?.map(item=>(
                        <TableTrItemPurchaseOrder
                            key={item.id}
                            productId={item.id}
                            item={item}
                            chageItem={setPurchaseItem}
                            deleteItem={handleRemoveProductBuy}
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


export default memo(StorePurchaseOrder)
