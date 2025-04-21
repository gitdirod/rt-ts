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
    
    const [enableUser, setEnableUser] = useState(false)
    const [enableAdminUser, setEnableAdminUser] = useState(false)
    // const [categoriesCurrent, setCategoriesCurrent] = useState([])
    const [groupToShow, setGroupToShow] = useState({});
    const [order, setOrder] = useState(localStorage.getItem('productsCart')===null ? [] :JSON.parse(localStorage.getItem('productsCart')) )
    const [orderBuy, setOrderBuy] = useState(localStorage.getItem('productsBuy')===null ? [] :JSON.parse(localStorage.getItem('productsBuy')) )
    const [subtotal, setSubtotal] = useState(0)
    const [subtotalBuy, setSubtotalBuy] = useState(0)
    const [total, setTotal] = useState(0)
    const [showMenu, setShowMenu] = useState(false)
    const [showProducts, setShowProducts] = useState([])
    const [navHeight, setNavHeight] = useState(0)
    const [categoryCurrent, setCategoryCurrent] = useState({})    
    

    const handleSetNavHeight=(higth)=>{
        setNavHeight(higth)
    }
    const handleSetShowProducts=(products)=>{
        setShowProducts(products)
    }
    const handleSetEnableUser=(user)=>{
        setEnableUser(user)
    }
    const handleSetEnableAdminUser=(user)=>{
        setEnableAdminUser(user)
    }

    const { data: likes, mutate: mutateLikes } = useSWR(enableUser ? '/api/likes': null, () => 
        clienteAxios('/api/likes').then(res => res.data.data), swrConfig)
    

    const { data: orders, mutate: mutateOrders } = useSWR(enableAdminUser || enableUser ?'/api/orders':null, () => 
        clienteAxios('/api/orders')
        .then(res => res.data.data),
        swrConfig

    )

    const { data: soldOrders, mutate: mutateSoldOrders } = useSWR(enableAdminUser || enableUser ?'/api/sold_orders':null, () => 
        clienteAxios('/api/sold_orders')
        .then(res => res.data.data),
        swrConfig

    )

    const { data: purchases, mutate: mutatePurchases } = useSWR(enableAdminUser ?'/api/purchase_orders':null, () => 
        clienteAxios('/api/purchase_orders')
        .then(res => res.data.data),
        swrConfig
    )
    
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

    const { data: memories, isLoading:isMemories,  mutate: mutateMemories } = useSWR('/api/memories', () => 
        clienteAxios('/api/memories')
        .then(res => res.data.data),
        swrConfig
    )

    const { data: types, isLoading:isTypes,  mutate: mutateTypes } = useSWR('/api/type_products', () => 
        clienteAxios('/api/type_products')
        .then(res => res.data.data),
        swrConfig
    ) 

    // const { data: categories, isLoading:isCategories, mutate: mutateCategories } = useSWR('/api/categories', () => 
    //     clienteAxios('/api/categories')
    //     .then(res => res.data.data),
    //     swrConfig
    // )

    const { data: landings, mutate: mutateLandings } = useSWR('/api/landings', () => 
        clienteAxios('/api/landings')
        .then(res => res.data.data),
        swrConfig
    )

    const { data: suggesteds, mutate: mutateSuggesteds } = useSWR('/api/suggesteds', () => 
        clienteAxios('/api/suggesteds')
        .then(res => res.data.data),
        swrConfig
    )
    const { data: suggestions, mutate: mutateSuggestions } = useSWR('/api/suggestions', () => 
        clienteAxios('/api/suggestions')
        .then(res => res.data.data),
        swrConfig
    )
    const { data: customers, mutate: mutateCustomers } = useSWR(enableAdminUser?'/api/customers':null, () => 
        clienteAxios('/api/customers')
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

   
    const handleGroupToShow= (id = null) =>{
        if(id){
            const group = groups?.filter(group => group.id === id)[0]
            setGroupToShow(group)
        }else{
            setGroupToShow({})
        }
        
    }
    // const handleGetCategories = (id) => {
    //     const categoriasGrupo = categories?.filter(categoria => categoria.group_id === id)
    //     setCategoriesCurrent(categoriasGrupo)
    // }
   

    const toastMessage = (message, success = true)=>{
        if(success){
            console.log('ok')
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



    const handleSetMenu =(state)=>{
        setShowMenu(state)
    }
    const handleClearOrder = ()=>{
        setOrder([])
        localStorage.setItem('productsCart', JSON.stringify([]))
    }
    const handleClearOrderBuy = ()=>{
        setOrderBuy([])
        localStorage.setItem('productsBuy', JSON.stringify([]))
    }
    

    
    // const handleClikCategoryCurrent= id =>{
    //     const categoria = categories?.filter(categoria => categoria.id === id)[0]
    //     setCategoryCurrent(categoria)
    // }
    

    return(
        <StoreContext.Provider
            value={{
                showProducts,
                // groups,
                // isGroups,
                // mutateGroups,

                // categories,
                // isCategories,
                // mutateCategories,
                // categoriesCurrent,
                // handleGetCategories,
                // handleClikCategoryCurrent,
                order,
                likes,
                orders,
                soldOrders,
                purchases,
                showMenu,
                types,
                landings,
                suggestions,
                suggesteds,
                memories,
                sizes,
                numbers,
                inventory,
                
                navHeight,

                isTypes,
                customers,

                
                mutateLikes,
                mutateOrders,
                mutateSoldOrders,
                mutatePurchases,
                mutateTypes,
                mutateLandings,
                mutateSuggestions,
                mutateSuggesteds,
                mutateMemories,
                mutateSizes,
                mutateNumbers,
                mutateInventory,
                mutateCustomers,
                
                
                handleSetMenu,
                handleGroupToShow,
                groupToShow,
                handleSetNavHeight,
                
                categoryCurrent,
    

                handleClearOrder,
                handleAddOrder,
                handleRemoveProduct,
                total,
                subtotal,
                handleSetEnableUser,
                handleSetEnableAdminUser,
                handleSetShowProducts,

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