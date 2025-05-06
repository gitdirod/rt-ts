import { createContext, useState, useEffect, memo } from "react"
import { formatearDinero2 } from '/src/helpers'

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

    // const handleUpdateProduct = (order, id, field, value) => {
    //     const updated = order.map(p => {
    //     if (p.id === id) return { ...p, [field]: value };
    //     return p;
    //     });
    //     setOrderBuy(updated);
    //     localStorage.setItem('productsBuy', JSON.stringify(updated));
    // };

    const handleUpdateProduct = (order, productId, field, value) => {
        const updated = order.map(p => {
          if (p.product_id === productId) {
            return { ...p, [field]: value };
          }
          return p;
        });
        setOrderBuy(updated);
        localStorage.setItem('productsBuy', JSON.stringify(updated));
      };
      

    const handleAddBuy = (product, notify = true) => {
        const exists = orderBuy.some(orderState => orderState.product_id === product.id);
      
        if (exists) {
          if (notify) console.log('Este producto ya fue agregado');
          return;
        }
      
        const newItem = {
          product_id: product.id,
          product: product, // objeto completo para mostrar código, nombre, etc.
          quantity: 1,
          price: product.price ?? 0
        };
      
        const finalOrder = [...orderBuy, newItem];
        setOrderBuy(finalOrder);
        localStorage.setItem('productsBuy', JSON.stringify(finalOrder));
      
        if (notify) console.log('Agregado al carrito');
    };
      
    // const handleAddBuy = ({ ...product }, notify = true) => {
    //     // Verificar si ya existe el producto en la lista
    //     const exists = orderBuy.some(orderState => orderState.id === product.id);
        
    //     if (exists) {
    //         if (notify) console.log('Este producto ya fue agregado');
    //         return; // no hace nada si ya está
    //     }
        
    //     const finalOrder = [...orderBuy, product];
    //     setOrderBuy(finalOrder);
    //     localStorage.setItem('productsBuy', JSON.stringify(finalOrder));
        
    //     if (notify) console.log('Agregado al carrito');
    // };

      // Agregar todos los productos visibles

    const handleAddAllProducts = (orderBuy, products) => {
        const productosActuales = [...orderBuy];
        const nuevos = [];
        
        products?.forEach((p) => {
            const existe = productosActuales.find((o) => o.product_id === p.id);
            if (!existe) {
            nuevos.push({
                product_id: p.id,
                price: p.price || 0,
                quantity: 1,
                product: p
            });
            }
        });
        
        const actualizados = [...productosActuales, ...nuevos];
        setOrderBuy(actualizados);
        localStorage.setItem('productsBuy', JSON.stringify(actualizados));
        console.log('Todos los productos visibles fueron agregados');
    };
      
    // const handleAddAllProducts = (orderBuy, products) => {
    //     const productosActuales = [...orderBuy];
    //     const nuevos = [];

    //     products?.forEach((p) => {
    //     const existe = productosActuales.find((o) => o.id === p.id);
    //     if (!existe) {
    //         nuevos.push({ ...p, quantity: 1 });
    //     }
    //     });
    //     const actualizados = [...productosActuales, ...nuevos];
    //     setOrderBuy(actualizados);
    //     localStorage.setItem('productsBuy', JSON.stringify(actualizados));
    //     console.log('Todos los productos visibles fueron agregados');
    // }

      // Eliminar todos los productos visibles

    const handleRemoveAllProducts = (orderBuy, products) => {
        const idsAEliminar = new Set(products.map(p => p.id));
        const actualizados = orderBuy.filter(p => !idsAEliminar.has(p.product_id));
        setOrderBuy(actualizados);
        localStorage.setItem('productsBuy', JSON.stringify(actualizados));
        console.log('Todos los productos visibles fueron eliminados');
    };
      
    // const handleRemoveAllProducts = (orderBuy, products) => {
    //     const idsAEliminar = new Set(products.map(p => p.id));
    //     const actualizados = orderBuy.filter(p => !idsAEliminar.has(p.id));
    //     setOrderBuy(actualizados);
    //     localStorage.setItem('productsBuy', JSON.stringify(actualizados));
    //     console.log('Todos los productos visibles fueron eliminados');
    // };

    const handleRemoveProductBuy = (productId) => {
        if (orderBuy.some(orderState => orderState.product_id === productId)) {
          const updatedOrder = orderBuy.filter(orderState => orderState.product_id !== productId);
          setOrderBuy(updatedOrder);
          localStorage.setItem('productsBuy', JSON.stringify(updatedOrder));
          toastMessage('Producto eliminado de lista!', false);
        }
    };
      
    // const handleRemoveProductBuy = id => {
    //     if(orderBuy.some( orderState => orderState.id === id)){
    //         const OrderUpdated = orderBuy.filter(orderState => orderState.id !== id)
    //         setOrderBuy(OrderUpdated)
    //         localStorage.setItem('productsBuy', JSON.stringify(OrderUpdated))
    //         toastMessage('Producto eliminado de lista!', false)
    //     }
    // }

    const handleRemoveProduct = (id, silent = false) => {
        const newOrder = order.filter(p => p.id !== id);
        if (newOrder.length !== order.length) {
          setOrder(newOrder);
          localStorage.setItem('productsCart', JSON.stringify(newOrder));
          if (!silent) toastMessage('Producto eliminado!');
        }
    };

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
                          
                
                handleClearOrder,
                handleAddOrder,
                handleRemoveProduct,
                total,
                subtotal,
                
                handleClearOrderBuy,
                handleRemoveProductBuy,
                handleAddBuy,
                handleUpdateProduct,
                orderBuy,
                subtotalBuy,
                
                openDrawerCart,
                setOpenDrawerCart,
                toggleDrawerCart,
                setOrderBuy,

                handleAddAllProducts,
                handleRemoveAllProducts
            }}
        
        >{children}
        </StoreContext.Provider>

    )
})

export {
    StoreProvider
}
export default StoreContext