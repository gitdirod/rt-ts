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
  
  const [isLoading, setIsLoading] = useState(true);

  const [tabIndex, setTabIndex] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };


  const [subtotalBuy, setSubtotalBuy] = useState(0)
  const initialOrderBuy = getPurchaseOrderProductsFromStorage(localKey); // o getPurchaseOrderProductsFromStorage('purchaseOrderProducts-9')
  const [orderBuy, setOrderBuy] = useState(initialOrderBuy);


  const addProduct=(product, key = localKey)=>{
    const updated = addProductToPurchaseOrder(product, key)
    setOrderBuy(updated)
  }

  const addProducts=(product, key = localKey)=>{
    const updated = addProductsToPurchaseOrder(product, key)
    setOrderBuy(updated)
  }

  const updateProduct =(productId, field, value, key = localKey)=>{
    const updated = updateProductInPurchaseOrder(productId, field, value, key)
    setOrderBuy(updated)
  }

  const removeProduct=(productId, key = localKey)=>{
    const updated = removeProductFromPurchaseOrder(productId, key)
    setOrderBuy(updated)
  }

  const removeProducts=(productId, key = localKey)=>{
    const updated = removeProductsFromPurchaseOrder(productId, key)
    setOrderBuy(updated)
  }

    const clearAll = (storageKey = localKey) => {
      const update = clearPurchaseOrder(storageKey)
      setOrderBuy(update)
  };

  // Función para obtener el producto por ID
  const getOrder = async (id) => {
    const { data, error } = await PurchaseOrderService.fetchById(id);
    if (data.data) {
      setOrderBuy(data.data.products);
      savePurchaseOrderProductsToStorage(data.data.products, localKey)
    } else {
    console.error("Error al cargar la ordern", error);
    }
    setIsLoading(false);
  };
 

  useEffect(()=>{
      const newSubtotalBuy = orderBuy?.reduce((subtotal, product) => (product.price * product.quantity) + subtotal, 0)
      setSubtotalBuy(newSubtotalBuy)
  }, [orderBuy])

  useEffect(() => {
    if (orderId) {
      getOrder(orderId);  // Obtener el producto cuando se monta el componente
    }
  }, [orderId]);
  
  if(isLoading || orderBuy === undefined || orderBuy === null || orderBuy?.length < 0 ) return <IsLoading/>

  return (
    <div className="overflow-y-hidden flex flex-col flex-1 ">
        <Box sx={{display:'flex', mt:1, px:1, borderRadius:1, border:'1px solid #ccc', bgcolor:'white', justifyContent:'space-between', alignItems:'center'}}>
            <Stack direction="row" spacing={2} alignItems="center">
                <AddShoppingCartOutlinedIcon color="primary"/>
                <Typography variant="h5" fontWeight="bold">
                Ingreso de unidades
                </Typography>
                <Chip label={orderBuy.length || 0} color="primary" />
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
                purchaseOrder={orderBuy} 
                addProductToPurchaseOrder={addProduct}
                handleAddAllProducts={addProducts}
                removeProductFromPurchaseOrder={removeProduct}
                handleRemoveAllProducts={removeProducts}
              />
            }
            {tabIndex === 1 && 
              <PasoUnidades 
                purchaseOrder={orderBuy}
                handleUpdateProduct={updateProduct}
                removeProductFromPurchaseOrder={removeProduct}
              />
            }
            {tabIndex === 2 && 
              <PasoResumen 
                purchaseOrder={orderBuy}
                subtotalBuy={subtotalBuy}
                clearPurchaseOrder={clearAll}
              />
            }
        </Box>
      
    </div>
  );
}
