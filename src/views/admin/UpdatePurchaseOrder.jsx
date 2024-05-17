import {memo, useEffect, useState} from 'react'
import {
    useLoaderData
  } from "react-router-dom"
import useStore from '/src/hooks/useStore'
import TableTrItemPurchaseOrder from './TableTrItemPurchaseOrder'
import { useAuth } from '/src/hooks/useAuth'
import { formatearDinero, formatearDinero2 } from '/src/helpers'
import useAdmin from '/src/hooks/useAdmin'
import IsLoading from '/src/components/IsLoading'
import SearchComponent from '/src/components/admin/SearchComponent'
import BlockHeader from '/src/components/admin/BlockHeader'

import LinkBtn from '/src/components/admin/LinkBtn'
import Btn from '/src/components/admin/Btn'
import TableHeader from '/src/components/admin/TableHeader'
import LabelSimple from '/src/components/admin/LabelSimple'
import ModalViewRequest from '/src/components/admin/ModalViewRequest'

import iconEnvoice from '/src/static/icons/envoiceBlack.svg'
import iconUpdate from '/src/static/icons/update.svg'
import iconList from '/src/static/icons/list_circle.svg'
import iconCart from '/src/static/icons/cart.svg'

export async function loader({ params }){
    return params.itemId
}

const UpdatePurchaseOrder=()=> {

    const {
        products,
        purchases,
        mutatePurchases
    } = useStore()
    const { user } = useAuth({
        middleware: 'guest',
    })
    const purchaseUrl = useLoaderData()
    const {
        update,
        handleModalViewRequest,
        handleModalStateRequest
    } = useAdmin()

    
    const [envoice, setEnvoice] = useState('')
    const [showOrderBuy, setShowOrderBuy] = useState([])
    const [showOrderProducts, setShowOrderProducts] = useState([])

    const [purchaseItem, setPurchaseItem] = useState({})
    const [orderToUpdate, setOrderToUpdate] = useState([])
    const [productsToUpdate, setProductsToUpdate] = useState([])


    const [errores, setErrores] = useState({})
    const [state, setState] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [subTotal, setSubtotal] = useState(0)



    const handleAddBuy = (product) =>{
        if(productsToUpdate?.some( orderState =>  orderState.id === product.id )){
            const OrderUpdated = productsToUpdate.map( orderState => {
                if(orderState.id === product.id && (orderState.quantity != product.quantity || orderState.price != product.price)){
                    return product
                }else{
                    return orderState
                }
            })
            setProductsToUpdate(OrderUpdated) 
        }else{
            setProductsToUpdate([...productsToUpdate, product])
        }
    }
    const handleRemoveProductBuy = id => {
        if(productsToUpdate.some( orderState => orderState.id === id)){
            const OrderUpdated = productsToUpdate.filter(orderState => orderState.id !== id)
            setProductsToUpdate(OrderUpdated) 
        }
    }

    const addToCart = (prod) =>{
        handleAddBuy({...prod, quantity: 1})
    } 

    const handleSubmit = e => {
        e.preventDefault()
        const newOrderBuy = {
            _method: 'PUT',
            id: orderToUpdate.id,
            subtotal: formatearDinero2(subTotal),
            total: formatearDinero2(subTotal*1.12),
            envoice: envoice,
            products : productsToUpdate?.map(product => (
                {
                    id: product.id,
                    quantity: product.quantity,
                    price: product.price
                }
            ))
        }
        
        if(!waiting){
            update('purchase_orders', newOrderBuy, setErrores, setState, setWaiting)
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
        { title: '$precio', className: '' },
        { title: 'Unidades.', className: '' },
      ];

    // Se Cargan todos los productos y la orden en la variable pricipal
    useEffect(()=>{
        if(purchases?.some(pur=> pur.id === Number(purchaseUrl))){
            const selectedPurchase = purchases?.find(pur=> pur.id === Number(purchaseUrl))
            setOrderToUpdate(selectedPurchase)
            const products = selectedPurchase?.products.map(pro=>(
                    {
                        id: pro.product_id,
                        quantity: pro.quantity,
                        subtotal: pro.subtotal,
                        price: pro.price,
                        name: pro.name,
                        code: pro.code
                    }
                )
            )
            setProductsToUpdate(products)
            setEnvoice(selectedPurchase.envoice)
        }else{
            mutatePurchases()
        }
    },[purchaseUrl, purchases])

    useEffect(()=>{
        if(Object.keys(purchaseItem).length !== 0){
            handleAddBuy(purchaseItem)
        }
    },[purchaseItem])

    useEffect(()=>{
        const subTotal = productsToUpdate?.reduce((subtotal, item) => (item.subtotal) + subtotal, 0)
        setSubtotal(subTotal)
    }, [productsToUpdate])

    useEffect(()=>{
        if(state){
          mutatePurchases()
          setState(false)
        }
        handleModalViewRequest(<ModalViewRequest text="Actualizando..." icon={iconUpdate}/>)
        handleModalStateRequest(waiting)
    },[waiting])

    if(Object.keys(orderToUpdate).length === 0){
        return <IsLoading/>
    }

    
    return (
        <div
            className=' flex-1 flex flex-col  h-[100%] pb-4'
        >
            {/* Cabecera */}
            <BlockHeader
                name={  
                    <div className='flex items-center'>
                        <img src={iconCart} alt="save" className='w-8 h-8 pr-2' />
                        {'Actualizar compra: #'+ orderToUpdate?.id}
                    </div>
                }
                // name={'Actualizar compra: #'+ orderToUpdate?.id} 
                code={orderToUpdate?.code}
                middle={
                    <div className='w-full center-r font-poppins-bold text-sm border rounded-lg bg-slate-700 text-white px-4 p-1 gap-8 '>
                        <div className='center-r gap-x-2'>
                            <p>Subtotal: <span className='font-poppins-regular'>{formatearDinero(subTotal)}</span></p>
                        </div>
                        <div className='center-r gap-x-2'>
                            <p>Total: <span className='font-poppins-regular'>{formatearDinero(subTotal * 1.12)}</span></p>
                        </div>
                    </div>
                }
            >
                <LinkBtn
                    to="/admin/purchases/purchases"
                    icon={iconList}
                    text='Lista'
                    imageColor='white'
                />
        
                <form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Btn
                        icon={iconUpdate}
                        text='Actualizar'
                        style='bg-green-500'
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
                        placeholder='Ingresa referencia'
                        defaultValue={orderToUpdate?.envoice}
                        onChange={(e)=>{setEnvoice(e.target.value)}}
                    />
                </LabelSimple>
                
            </div>
            
            <div className='flex flex-1 h-96 border-orange-500'>
                <div className=' w-1/3 flex flex-col border-cyan-500 overflow-y-auto p-0.5'>
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
                    <table className=" table-fixed w-full">
                    <TableHeader columns={columnsStock} />
                        <tbody className='w-full border-fuchsia-500 text-slate-600  font-poppins-regular'>
                    {
                        showOrderProducts?.map(item=>{
                            if(!productsToUpdate?.some(item2=> item.id === item2.id || item.id === item2.product_id )){
                                return(
                                    <tr
                                        key={item.id}
                                        className='cursor-pointer group/item'
                                        onClick={()=>{
                                            addToCart(
                                                {
                                                    id: item.id,
                                                    name:item.name,  
                                                    code:item.code,
                                                    quantity: 1,
                                                    price: item.price,
                                                    subtotal: item.price
                                                }
                                            )
                                        }}
                                    >
                                        <td
                                            className='px-0 w-10'
                                        >
                                            <div className='h-10 bg-white group-hover/item:border-slate-400 center-r flex-1  border-y border-l  py-1 rounded-l-lg'>
                                                {item.id}
                                            </div>
                                        </td>
                                        <td
                                            className='px-0'
                                        >
                                            <div className='py-1 bg-white group-hover/item:border-slate-400 h-10 center-r flex-1 font-semibold border-y'>
                                                {item.name}
                                            </div>
                                        </td>
                                        <td
                                            className='px-0'
                                        >
                                            <div className='py-1 bg-white group-hover/item:border-slate-400 h-10 center-r flex-1 border-y border-r rounded-r-lg'>
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
                            inputSearch={productsToUpdate}
                            setOutput={setShowOrderBuy}
                            style='text-green-500'
                            placeholder='Buscar en compra.'
                        />
                    </div>
                    <table className=" table-fixed w-full text-slate-600">
                        
                        <TableHeader columns={columnsCart} style='base-th-class-green'/>
                        <tbody className='w-full  '>
                    {
                        showOrderBuy?.map(item=>
                            (
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


export default memo(UpdatePurchaseOrder)


