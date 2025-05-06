import { useState } from 'react';
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
import useStore from '/src/hooks/useStore';

export default function StoreUpdatePurchaseOrder() {
 

  const [tabIndex, setTabIndex] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  
  // const {orderBuy}= useStore()
  const {getPurchaseOrderProductsFromStorage}= useStore()

  const initialOrderBuy = getPurchaseOrderProductsFromStorage(); // o getPurchaseOrderProductsFromStorage('purchaseOrderProducts-9')
  const [orderBuy, setOrderBuy] = useState(initialOrderBuy);

  


  const addPurchaseOrderProduct = (product, notify = true, storageKey = 'purchaseOrderProducts') => {
    const currentProducts = JSON.parse(localStorage.getItem(storageKey)) || [];
    const exists = currentProducts.some(item => item.product_id === product.id);
  
    if (exists) {
      if (notify) console.log('Este producto ya fue agregado');
      return;
    }
  
    const newItem = {
      product_id: product.id,
      product: product,
      quantity: 1,
      price: product.price ?? 0
    };
  
    const updated = [...currentProducts, newItem];
    localStorage.setItem(storageKey, JSON.stringify(updated));
  
    if (storageKey === 'purchaseOrderProducts') setOrderBuy(updated);
  
    if (notify) console.log('Agregado al carrito');
  };

  const handleAddAllProducts = (products, storageKey = 'purchaseOrderProducts') => {
    const currentProducts = JSON.parse(localStorage.getItem(storageKey)) || [];
    const nuevos = [];
  
    products?.forEach((p) => {
      const existe = currentProducts.some((o) => o.product_id === p.id);
      if (!existe) {
        nuevos.push({
          product_id: p.id,
          price: p.price || 0,
          quantity: 1,
          product: p,
        });
      }
    });
  
    const actualizados = [...currentProducts, ...nuevos];
    localStorage.setItem(storageKey, JSON.stringify(actualizados));
  
    // Solo actualizar el estado global si es el storage principal
    if (storageKey === 'purchaseOrderProducts') {
      setOrderBuy(actualizados);
    }
  
    console.log('Todos los productos visibles fueron agregados');
  };
  
  const handleRemoveProductBuy = (productId, storageKey = 'purchaseOrderProducts') => {
    const currentProducts = JSON.parse(localStorage.getItem(storageKey)) || [];
    const exists = currentProducts.some(item => item.product_id === productId);
  
    if (!exists) return;
  
    const updated = currentProducts.filter(item => item.product_id !== productId);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  
    // Solo actualiza el estado global si es la orden activa
    if (storageKey === 'purchaseOrderProducts') {
      setOrderBuy(updated);
    }
  
    console.log('Producto eliminado de lista!');
  };

  const handleRemoveAllProducts = (products, storageKey = 'purchaseOrderProducts') => {
    const currentProducts = JSON.parse(localStorage.getItem(storageKey)) || [];
    const idsAEliminar = new Set(products.map(p => p.id));
  
    const actualizados = currentProducts.filter(p => !idsAEliminar.has(p.product_id));
    localStorage.setItem(storageKey, JSON.stringify(actualizados));
  
    if (storageKey === 'purchaseOrderProducts') {
      setOrderBuy(actualizados);
    }
  
    console.log('Todos los productos visibles fueron eliminados');
  };
  
  

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
                addPurchaseOrderProduct={addPurchaseOrderProduct}
                handleAddAllProducts={handleAddAllProducts}
                handleRemoveProductBuy={handleRemoveProductBuy}
                handleRemoveAllProducts={handleRemoveAllProducts}
              />
            }
            {tabIndex === 1 && 
              <PasoUnidades 
              />
            }
            {tabIndex === 2 && 
              <PasoResumen 
              />
            }
        </Box>
      
    </div>
  );
}
