import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Tabs,
  Tab
} from '@mui/material';

import Stack from '@mui/material/Stack';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';


import PasoSeleccion from '/src/components/admin/purchase/PasoSeleccion';
import PasoUnidades from '/src/components/admin/purchase/PasoUnidades';
import PasoResumen from '/src/components/admin/purchase/PasoResumen';
import { 
  addProductToPurchaseOrder, 
  addProductsToPurchaseOrder,
  removeProductFromPurchaseOrder,
  removeProductsFromPurchaseOrder,
  updateProductInPurchaseOrder,
  clearPurchaseOrder,
  getPurchaseOrderProductsFromStorage,
  savePurchaseOrderProductsToStorage
} from '/src/features/purchaseOrders/localStorage';
import { useParams } from 'react-router-dom';
import { PurchaseOrderService } from '/src/services/PurchaseOrderService';
import IsLoading from '/src/components/store/common/IsLoading';


export default function StoreUpdatePurchaseOrder() {
 
  const { itemId: orderId } = useParams();
  const localKey= orderId ? `purchaseOrderProducts-${orderId}`:'purchaseOrderProducts'
  
  const [isLoading, setIsLoading] = useState(orderId ? true : false);

  const [tabIndex, setTabIndex] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };


  const initialPurchaseOrderProducts = getPurchaseOrderProductsFromStorage(localKey); // o getPurchaseOrderProductsFromStorage('purchaseOrderProducts-9')
  
  const [purchaseOrder, setPurchaseOrder] = useState({})
  const [purchaseOrderProducts, setPurchaseOrderProducts] = useState(initialPurchaseOrderProducts);
  const [purchaseOrderSubtotal, setPurchaseOrderSubtotal] = useState(0)


  const addProduct=(product, key = localKey)=>{
    const updated = addProductToPurchaseOrder(product, key)
    setPurchaseOrderProducts(updated)
  }

  const addProducts=(product, key = localKey)=>{
    const updated = addProductsToPurchaseOrder(product, key)
    setPurchaseOrderProducts(updated)
  }

  const updateProduct =(productId, field, value, key = localKey)=>{
    const updated = updateProductInPurchaseOrder(productId, field, value, key)
    setPurchaseOrderProducts(updated)
  }

  const removeProduct=(productId, key = localKey)=>{
    const updated = removeProductFromPurchaseOrder(productId, key)
    setPurchaseOrderProducts(updated)
  }

  const removeProducts=(productId, key = localKey)=>{
    const updated = removeProductsFromPurchaseOrder(productId, key)
    setPurchaseOrderProducts(updated)
  }

  const clearAll = (storageKey = localKey) => {
    const update = clearPurchaseOrder(storageKey)
    setPurchaseOrderProducts(update)
  };

  // Función para obtener el producto por ID
  const getPurchaseOrder = async (id) => {
    const { data, error } = await PurchaseOrderService.fetchById(id);
    if (data.data) {
      setPurchaseOrder(data.data)
      setPurchaseOrderProducts(data.data.products);
      savePurchaseOrderProductsToStorage(data.data.products, localKey)
    } else {
    console.error("Error al cargar la ordern", error);
    }
    setIsLoading(false);
  };
 

  useEffect(()=>{
      const newSubtotalBuy = purchaseOrderProducts?.reduce((subtotal, product) => (product.price * product.quantity) + subtotal, 0)
      setPurchaseOrderSubtotal(newSubtotalBuy)
  }, [purchaseOrderProducts])

  useEffect(() => {
    if (orderId) {
      getPurchaseOrder(orderId);  // Obtener el producto cuando se monta el componente
    }else{
      setPurchaseOrder({})
      const initialPurchaseOrderProducts = getPurchaseOrderProductsFromStorage('purchaseOrderProducts');
      setPurchaseOrderProducts(initialPurchaseOrderProducts);
    }
  }, [orderId]);

  
  if(isLoading || purchaseOrderProducts === undefined || purchaseOrderProducts === null || purchaseOrderProducts?.length < 0 ) return <IsLoading/>

  return (
    <div className="overflow-y-hidden flex flex-col flex-1 ">
        <Box sx={{display:'flex', mt:1, px:1, borderRadius:1, border:'1px solid #ccc', bgcolor:'white', justifyContent:'space-between', alignItems:'center'}}>
            <Stack direction="row" spacing={2} alignItems="center">
                <AddShoppingCartOutlinedIcon color="primary"/>
                <Typography variant="h5" fontWeight="bold">
                {orderId ? `Editar compra ${orderId}`:'Nueva compra'}
                </Typography>
                <Chip label={purchaseOrderProducts.length || 0} color="primary" />
            </Stack>
            <Stack direction="row" gap={2} alignItems="center">
                {/* Aquí van los Tabs */}
                <Tabs value={tabIndex} onChange={handleChangeTab} textColor="primary" indicatorColor="primary">
                    <Tab label="Seleccionar" />
                    <Tab label="Unidades" />
                    <Tab label="Resumen" />
                </Tabs>
            </Stack>
        </Box>

        {/* Contenido según el tab */}
        <Box sx={{ flexGrow: 1, pt: 1 }}>
            {tabIndex === 0 && 
              <PasoSeleccion 
                purchaseOrderProducts={purchaseOrderProducts} 
                addProductToPurchaseOrder={addProduct}
                handleAddAllProducts={addProducts}
                removeProductFromPurchaseOrder={removeProduct}
                handleRemoveAllProducts={removeProducts}
              />
            }
            {tabIndex === 1 && 
              <PasoUnidades 
                purchaseOrderProducts={purchaseOrderProducts}
                handleUpdateProduct={updateProduct}
                removeProductFromPurchaseOrder={removeProduct}
              />
            }
            {tabIndex === 2 && 
              <PasoResumen 
                purchaseOrder={purchaseOrder}
                purchaseOrderProducts={purchaseOrderProducts}
                subtotalBuy={purchaseOrderSubtotal}
                clearPurchaseOrder={clearAll}
              />
            }
        </Box>
      
    </div>
  );
}
