import { useEffect, useState } from 'react';
import {
Box,
Typography,
Chip,
} from '@mui/material';

import Stack from '@mui/material/Stack';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { useParams } from 'react-router-dom';
import { SoldOrderService } from '/src/services/SoldOrderService';
import IsLoading from '/src/components/store/common/IsLoading';

export default function StoreUpdatePurchaseOrder() {

    const { itemId: orderId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [soldOrder, setSoldOrder] = useState({})
    const [soldOrderProducts, setSoldOrderProducts] = useState();

    //   Función para obtener el producto por ID
    const getSoldOrder = async (id) => {
        const { data, error } = await SoldOrderService.fetchById(id);
        if (data.data) {
            setSoldOrder(data.data)
            setSoldOrderProducts(data.data.products);
        } else {
        console.error("Error al cargar la ordern", error);
        }
        setIsLoading(false);
    };
    console.log(soldOrderProducts)
    console.log(soldOrder)

    useEffect(() => {
    if (orderId) {
        getSoldOrder(orderId);  // Obtener el producto cuando se monta el componente
    }
    }, [orderId]);


    if(isLoading || soldOrderProducts === undefined || soldOrderProducts === null || soldOrderProducts?.length < 0 ) return <IsLoading/>

    return (
        <Box>
            <Box sx={{display:'flex', my:1, p:1, borderRadius:1, border:'1px solid #ccc', bgcolor:'white', justifyContent:'space-between', alignItems:'center'}}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <ReceiptOutlinedIcon color="primary"/>
                    <Typography variant="h5" fontWeight="bold">
                    Prefactura {orderId}
                    </Typography>
                    <Chip label={soldOrderProducts?.length || 0} color="primary" />
                </Stack>

            </Box>
        </Box>
    );
}
