import useSWR from 'swr'
import clienteAxios from "/src/config/axios"
import { createContext, useState, useEffect, memo } from "react"
import { toast } from "react-toastify"
import { formatearDinero2 } from '/src/helpers'
import { swrConfig } from '/src/utils/fetchData'



const StoreContext = createContext()

const StoreProvider = memo(({children}) => { 
    
    const [enableUser, setEnableUser] = useState(false)
    const [enableAdminUser, setEnableAdminUser] = useState(false)
    const [categoriesCurrent, setCategoriesCurrent] = useState([])
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
    // const [product, setProduct] = useState({})
    
    

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
    const { data: products, isLoading:isProducts, mutate: mutateProducts } = useSWR(enableAdminUser?'/api/products':'/api/public-products', () => 
        clienteAxios(enableAdminUser?'/api/products':'/api/public-products')
        .then(res => res.data.data),
        swrConfig
    )

    const { data: memories, isLoading:isMemories,  mutate: mutateMemories } = useSWR('/api/memories', () => 
        clienteAxios('/api/memories')
        .then(res => res.data.data),
        swrConfig
    )

    const { data: groups, isLoading:isGroups,  mutate: mutateGroups } = useSWR('/api/groups', () => 
        clienteAxios('/api/groups')
        .then(res => res.data.data),
        swrConfig
    ) 

    const { data: types, isLoading:isTypes,  mutate: mutateTypes } = useSWR('/api/type_products', () => 
        clienteAxios('/api/type_products')
        .then(res => res.data.data),
        swrConfig
    ) 

    const { data: categories, isLoading:isCategories, mutate: mutateCategories } = useSWR('/api/categories', () => 
        clienteAxios('/api/categories')
        .then(res => res.data.data),
        swrConfig
    )
    

    // const { data: products, isLoading:isProducts, mutate: mutateProducts } = useSWR('/api/products', () => 
    //     clienteAxios('/api/products')
    //     .then(res => res.data.data)
    //     .catch(error => {
    //         // throw Error(error?.response?.data?.errors)
    //     })
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
    const handleGetCategories = (id) => {
        const categoriasGrupo = categories?.filter(categoria => categoria.group_id === id)
        setCategoriesCurrent(categoriasGrupo)
    }
    


    // const handleSetProduct = id =>{
    //     const product =  products.find((product)=> product.id === Number(id))
    //     setProduct(product)
    // }
   

    const toastMessage = (message, success = true)=>{
        if(success){
            toast.success(<span className="font-poppins-regular">{message}</span>,{
                position: "bottom-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                // theme: "colored",
            })
        }else{
            toast.warn( <span className='font-poppins-regular'>{message}</span>, {
                position: "bottom-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                // theme: "colored",
            })
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
    

    
    const handleClikCategoryCurrent= id =>{
        const categoria = categories?.filter(categoria => categoria.id === id)[0]
        setCategoryCurrent(categoria)
    }
    

    return(
        <StoreContext.Provider
            value={{
                showProducts,
                // product,
                categories,
                groups,
                products,
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

                isGroups,
                isCategories,
                isProducts,
                isTypes,
                customers,

                categoriesCurrent,
                
                mutateGroups,
                mutateCategories,
                mutateProducts,
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
                
                
                handleGetCategories,
                handleSetMenu,
                handleGroupToShow,
                groupToShow,
                handleSetNavHeight,
                
                handleClikCategoryCurrent,
                categoryCurrent,
                
                // modalImage,
                // handleClickModalImage,
                // modal,
                // modalVerify,
                // modalSearch,
                // modalBuy,
                // productModal,
                // handleClickModal,
                // handleClickModalVerify,
                // handleSetProductModal,
                // handleClickModalSearch,
                // handleClickModalBuy,
                // handleSubmiNewOrder,
                // handleSubmiLike,
                // indexProductModal,
                // handleSetProduct,

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
                subtotalBuy
                
            }}
        
        >{children}
        </StoreContext.Provider>

    )
})

export {
    StoreProvider
}
export default StoreContext

    // const handleClickModal = () =>{
    //     setModal(!modal)
    // }
    // const handleClickModalSearch = () =>{
    //     setModalSearch(!modalSearch)
    // }
    // const handleClickModalBuy = () =>{
    //     setModalBuy(!modalBuy)
    // }
    // const handleClickModalImage = () =>{
    //     setModalImage(!modalImage)
    // }
    // const handleClickModalVerify = () =>{
    //     setModalVerify(!modalVerify)
    // }
     // const handleSetProductModal = (id, index=0) =>{
    //     const product =  products.find((product)=> product.id === Number(id))
    //     setProductModal(product)
    //     setIndexProductModal(index)
    // }
     
    
    // const [modal, setModal] = useState(false)
    // const [modalSearch, setModalSearch] = useState(false)
    // const [modalBuy, setModalBuy] = useState(false)
    // const [modalImage, setModalImage] = useState(false)
    // const [productModal, setProductModal] = useState({})
    // const [indexProductModal, setIndexProductModal] = useState(0)
    // const [modalVerify, setModalVerify] = useState(false)
    // const [showCategories, setShowCategories] = useState(false);
    