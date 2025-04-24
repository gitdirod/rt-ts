import useSWR from 'swr'
import clienteAxios from "/src/config/axios"
import { createContext, useState, useEffect, memo } from "react"
import { formatearDinero2 } from '/src/helpers'
import { swrConfig } from '/src/utils/fetchData'

const StoreContext = createContext()

const StoreProvider = memo(({children}) => { 

    // Configuracion para que  active el Drawer del carrito
    const [openDrawerCart, setOpenDrawerCart] = useState(false)
    const toggleDrawerCart = (newOpen) => {
        setOpenDrawerCart(newOpen);
    };
    
    
    const [order, setOrder] = useState(localStorage.getItem('productsCart')===null ? [] :JSON.parse(localStorage.getItem('productsCart')) )
    const [orderBuy, setOrderBuy] = useState(localStorage.getItem('productsBuy')===null ? [] :JSON.parse(localStorage.getItem('productsBuy')) )
    const [subtotal, setSubtotal] = useState(0)
    const [subtotalBuy, setSubtotalBuy] = useState(0)
    const [total, setTotal] = useState(0)
        
    const [enableUser, setEnableUser] = useState(false)
    const handleSetEnableUser=(user)=>{
        setEnableUser(user)
    }
    
    const [enableAdminUser, setEnableAdminUser] = useState(false)
    const handleSetEnableAdminUser=(user)=>{
        setEnableAdminUser(user)
    }


    // const { data: purchases, mutate: mutatePurchases } = useSWR(enableAdminUser ?'/api/purchase_orders':null, () => 
    //     clienteAxios('/api/purchase_orders')
    //     .then(res => res.data.data),
    //     swrConfig
    // )
    
    const { data: numbers,  mutate: mutateNumbers } = useSWR(enableAdminUser?'/api/number_colors':null, () => 
        clienteAxios('/api/number_colors')
        .then(res => res.data.data),
        swrConfig
    )

    const { data: sizes,  mutate: mutateSizes } = useSWR(enableAdminUser?'/api/sizes':null, () => 
        clienteAxios('/api/sizes')
        .then(res => res.data.data),
        swrConfig
    )
    const { data: inventory, mutate: mutateInventory } = useSWR(enableAdminUser?'/api/inventory':null, () => 
        clienteAxios('/api/inventory')
        .then(res => res.data.data),
        swrConfig
    )
    

    useEffect(()=>{
        const newSubtotal = order?.reduce((subtotal, product) => (product.price * product.cantidad) + subtotal, 0)
        setSubtotal(newSubtotal)
        setTotal(()=>(formatearDinero2(newSubtotal * 1.15)))
    }, [order])

    useEffect(()=>{
        const newSubtotalBuy = orderBuy?.reduce((subtotal, product) => (product.price * product.quantity) + subtotal, 0)
        setSubtotalBuy(newSubtotalBuy)
    }, [orderBuy])

   

    const toastMessage = (message, success = true)=>{
        if(success){
            console.log(message)
        }else{
            console.log('mal')
        }

        
    }

    const handleAddOrder = ({available,category_id, description, ...product}) =>{
        if(order.some( orderState =>  orderState.id === product.id )){
            const OrderUpdated = order.map( orderState => {
                if(orderState.id === product.id && orderState.cantidad != product.cantidad){
                    toastMessage('Guardado correctamente!')
                    return product
                }else{
                    return orderState
                }
            })
            setOrder(OrderUpdated) 
            localStorage.setItem('productsCart', JSON.stringify(OrderUpdated))

        }else{
            setOrder([...order, product])
            localStorage.setItem('productsCart', JSON.stringify([...order, product]))
            toastMessage('Agregado al carrito')
        }
    }
    const handleRemoveProduct = id => {
        if(order.some( orderState => orderState.id === id)){
            const OrderUpdated = order.filter(orderState => orderState.id !== id)
            setOrder(OrderUpdated)
            localStorage.setItem('productsCart', JSON.stringify(OrderUpdated))
            toastMessage('Producto eliminado!')
        }
    }
    const handleAddBuy = ({available,category_id, description, ...product}, notify= true) =>{
        if(orderBuy.some( orderState =>  orderState.id === product.id )){
            const OrderUpdated = orderBuy.map( orderState => {
                if(orderState.id === product.id && (orderState.quantity != product.quantity || orderState.price != product.price)){
                    if(notify){
                        toastMessage('Guardado correctamente!')
                    }
                    return product
                }else{
                    return orderState
                }
            })
            setOrderBuy(OrderUpdated) 
            localStorage.setItem('productsBuy', JSON.stringify(OrderUpdated))

        }else{
            setOrderBuy([...orderBuy, product])
            localStorage.setItem('productsBuy', JSON.stringify([...orderBuy, product]))
            if(notify){
                toastMessage('Agregado al carrito')
            }
        }
    }
    const handleRemoveProductBuy = id => {
        if(orderBuy.some( orderState => orderState.id === id)){
            const OrderUpdated = orderBuy.filter(orderState => orderState.id !== id)
            setOrderBuy(OrderUpdated)
            localStorage.setItem('productsBuy', JSON.stringify(OrderUpdated))
            toastMessage('Producto eliminado de lista!', false)
        }
    }

    const handleClearOrder = ()=>{
        setOrder([])
        localStorage.setItem('productsCart', JSON.stringify([]))
    }
    const handleClearOrderBuy = ()=>{
        setOrderBuy([])
        localStorage.setItem('productsBuy', JSON.stringify([]))
    }
    

    return(
        <StoreContext.Provider
            value={{
                
                order,
                // purchases,
                // mutatePurchases,
                sizes,
                numbers,
                inventory,
                
                mutateSizes,
                mutateNumbers,
                mutateInventory,
                
                
                handleClearOrder,
                handleAddOrder,
                handleRemoveProduct,
                total,
                subtotal,
                handleSetEnableUser,
                handleSetEnableAdminUser,
                
                handleClearOrderBuy,
                handleRemoveProductBuy,
                handleAddBuy,
                orderBuy,
                subtotalBuy,
                
                openDrawerCart,
                setOpenDrawerCart,
                toggleDrawerCart
                
            }}
        
        >{children}
        </StoreContext.Provider>

    )
})

export {
    StoreProvider
}
export default StoreContext