import {
  Box,
  Typography,
  Chip,
  Button,
  Tabs,
  Tab
} from '@mui/material';

import Stack from '@mui/material/Stack';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useParams } from "react-router-dom";
import useStore from '/src/hooks/useStore';
import { PurchaseOrderService } from '/src/services/PurchaseOrderService';
import { useEffect, useState } from 'react';
import IsLoading from '/src/components/store/common/IsLoading';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import PasoUnidades from '/src/components/admin/purchase/PasoUnidades';
import PasoResumen from '/src/components/admin/purchase/PasoResumen';
import PasoSeleccion from '/src/components/admin/purchase/PasoSeleccion';


export default function UpdatePurchaseOrder() {

 
    const {orderBuy}= useStore()
    const { itemId: orderId } = useParams();
    
    const [purchaseOrder, setPurchaseOrder] = useState(null);  // Estado para el producto
    const [isLoading, setIsLoading] = useState(true);



    const handleEditPurchaseOrder =()=>{
        console.log('edit')
    }

    // Función para obtener el producto por ID
    const getOrder = async (id) => {
        const { data, error } = await PurchaseOrderService.fetchById(id);
        if (data.data) {
        setPurchaseOrder(data.data);
        } else {
        console.error("Error al cargar la ordern", error);
        }
        setIsLoading(false);
    };

    const [tabIndex, setTabIndex] = useState(0);
    const handleChangeTab = (event, newValue) => {
      setTabIndex(newValue);
    };

    useEffect(() => {
    if (orderId) {
        getOrder(orderId);  // Obtener el producto cuando se monta el componente
    }
    }, [orderId]);


    if(isLoading || purchaseOrder === undefined || purchaseOrder === null || purchaseOrder?.products?.length < 0 ) return <IsLoading/>

    return (
    <Box>
        <Box sx={{display:'flex', mt:1, p:1, borderRadius:1, border:'1px solid #ccc', bgcolor:'white', justifyContent:'space-between', alignItems:'center'}}>
            <Stack direction="row" spacing={2} alignItems="center">
                <ShoppingCartCheckoutOutlinedIcon color="primary"/>
                <Typography variant="h5" fontWeight="bold">
                Editar Ingreso "Orden {orderId}"
                </Typography>
                <Chip label={purchaseOrder?.products.length || 0} color="primary" />
            </Stack>
            <Stack direction="row" gap={2} alignItems="center">
                {/* Aquí van los Tabs */}
                <Tabs value={tabIndex} onChange={handleChangeTab} textColor="primary" indicatorColor="primary">
                    <Tab label="Seleccionar" />
                    <Tab label="Unidades" />
                    <Tab label="Resumen" />
                </Tabs>
            </Stack>
            <Button variant="outlined" color="primary" startIcon={<EditOutlinedIcon />} 
                onClick={() => {
                    handleEditPurchaseOrder(null); // por ejemplo, abrir modal de vista
            }}
            >
            Editar
            </Button>
        </Box>
        {/* Contenido según el tab */}
        <Box sx={{ flexGrow: 1, pt: 1 }}>
            {tabIndex === 0 && <PasoSeleccion purchaseOrder={purchaseOrder?.products}/>}
            {tabIndex === 1 && <PasoUnidades />}
            {tabIndex === 2 && <PasoResumen />}
        </Box>
      
    </Box>
    );
}
