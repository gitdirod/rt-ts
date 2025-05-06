import {
  Box,
  Typography,
  Chip,
  Button
} from '@mui/material';

import Stack from '@mui/material/Stack';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useParams } from "react-router-dom";
import useStore from '/src/hooks/useStore';
import SimpleTablePurchaseResume from '/src/components/admin/purchase/SimpleTablePurchaseResume';
import { PurchaseOrderService } from '/src/services/PurchaseOrderService';
import { useEffect, useState } from 'react';
import IsLoading from '/src/components/store/common/IsLoading';

// export async function loader({ params }){
//     return params.itemId
// }


export default function UpdatePurchaseOrder() {

    const {orderBuy}= useStore()
    const { itemId: orderId } = useParams();
    console.log(orderId)
    const [purchaseOrder, setPurchaseOrder] = useState(null);  // Estado para el producto
    const [isLoading, setIsLoading] = useState(true);



    const handleEditPurchaseOrder =()=>{
        console.log('edit')
    }

    // Función para obtener el producto por ID
    const getOrder = async (id) => {
        const { data, error } = await PurchaseOrderService.fetchById(id);
        if (data.data) {
            console.log(data.data)
        setPurchaseOrder(data.data);
        } else {
        console.error("Error al cargar la ordern", error);
        }
        setIsLoading(false);
    };


    useEffect(() => {
    if (orderId) {
        getOrder(orderId);  // Obtener el producto cuando se monta el componente
    }
    }, [orderId]);

    console.log(purchaseOrder)

    if(isLoading || purchaseOrder === undefined || purchaseOrder === null || purchaseOrder?.products?.length < 0 ) return <IsLoading/>

  return (
    <Box>
        <Box sx={{display:'flex', mt:1, p:1, borderRadius:1, border:'1px solid #ccc', bgcolor:'white', justifyContent:'space-between', alignItems:'center'}}>
            <Stack direction="row" spacing={2} alignItems="center">
                <AddShoppingCartOutlinedIcon color="primary"/>
                <Typography variant="h5" fontWeight="bold">
                Ingreso de unidades
                </Typography>
                <Chip label={purchaseOrder?.products.length || 0} color="primary" />
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
            <SimpleTablePurchaseResume products={purchaseOrder?.products} />
        </Box>
      
    </Box>
  );
}
