import { useEffect, useState } from 'react';
import {
Box,
Typography,
Chip,
TableContainer,
Table,
Paper,
TableHead,
TableRow,
TableCell,
TableBody,
Divider
} from '@mui/material';

import Stack from '@mui/material/Stack';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { useParams } from 'react-router-dom';
import { SoldOrderService } from '/src/services/SoldOrderService';
import IsLoading from '/src/components/store/common/IsLoading';
import ImageTable from '/src/components/admin/ImageTable';
import BACKEND from '/src/data/backend';
import { formatearDinero } from '/src/helpers';
import UserInfoCard from '/src/components/admin/sold/UserInfoCard';
import OrderStatusBadge from '/src/components/admin/sold/OrderStatusBadge';
import PaymentStatusBadge from '/src/components/admin/sold/PaymentStatusBadge';
import ModalUpdateSoldOrder from '/src/components/admin/sold/ModalUpdateSoldOrder';

export default function StoreUpdatePurchaseOrder() {

    const { itemId: orderId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [soldOrder, setSoldOrder] = useState({})
    const [user, setUser] = useState({})
    const [addresses, setAddresses] = useState({})
    const [soldOrderProducts, setSoldOrderProducts] = useState([]);


    const [edit, setEdit] = useState(false);
    const handleCloseEdit = () => setEdit(false);
    const handleEdit = () => {
        setEdit(true)
    };

    //   Función para obtener el producto por ID
    const getSoldOrder = async (id) => {
        const { data, error } = await SoldOrderService.fetchById(id);
        if (data.data) {
            setSoldOrder(data.data)
            setUser(data?.data?.user)
            setAddresses(data?.data?.user?.address)
            setSoldOrderProducts(data.data.products);
        } else {
        console.error("Error al cargar la ordern", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
    if (orderId) {
        getSoldOrder(orderId);  // Obtener el producto cuando se monta el componente
    }
    }, [orderId]);

    if(isLoading || soldOrderProducts === undefined || soldOrderProducts === null || soldOrderProducts?.length < 0 ) return <IsLoading/>

    return (
        <Box>
            <ModalUpdateSoldOrder 
                open={edit}
                soldOrder={soldOrder} 
                onCancel= {handleCloseEdit}
                onUpdated={()=>{
                handleCloseEdit();
                mutate();
                }}
                handleEdit={handleEdit} 
                handleCloseEdit={handleCloseEdit}
            />
            <Box sx={{display:'flex', my:1, p:1, borderRadius:1, border:'1px solid #ccc', bgcolor:'white', justifyContent:'space-between', alignItems:'center'}}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <ReceiptOutlinedIcon color="primary"/>
                    <Typography variant="h5" fontWeight="bold">
                    Prefactura {orderId}
                    </Typography>
                    <Chip label={soldOrderProducts?.length || 0} color="primary" />
                </Stack>
                <Stack gap={2} sx={{cursor:'pointer'}} direction="row" onClick={()=>setEdit(true)}>
                    <OrderStatusBadge estado={soldOrder?.sold_order_tracking?.state} />
                    <PaymentStatusBadge estado={soldOrder?.sold_order_payment?.state} />
                </Stack>
            </Box>

            <Box sx={{ maxHeight: 'calc(100vh - 70px)', overflowY: 'auto'}}>
                <UserInfoCard user={user} addresses={addresses}/>

                <Paper sx={{ width: '100%',my:1, border:"1px solid #ccc" }}>
                    <TableContainer  sx={{  overflowY: 'auto', borderRadius: 2 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow >
                                    <TableCell>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Imagen
                                    </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" color="text.secondary">
                                        Código
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" color="text.secondary">
                                        Nombre
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" color="text.secondary">
                                        Precio
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" color="text.secondary">
                                        Unidades
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" color="text.secondary">
                                        Subtotal
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(soldOrderProducts || []).map((soldOrderproduct, index) => 
                                (
                                    <TableRow
                                        key={index}
                                        hover
                                        sx={{
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s ease-in-out',
                                        }}
                                    >
                                        <TableCell>
                                            <ImageTable
                                                images={soldOrderproduct?.product?.images}
                                                url={BACKEND.PRODUCTS.URL}
                                                higth={14}
                                            />
                                        </TableCell>
                                        <TableCell><Typography variant="body2">{soldOrderproduct?.product?.code}</Typography></TableCell>
                                        <TableCell><Typography variant="body2">{soldOrderproduct?.product?.name}</Typography></TableCell>
                                        <TableCell><Typography variant="body2">{formatearDinero(soldOrderproduct?.price)}</Typography></TableCell>
                                        <TableCell><Typography variant="body2">{soldOrderproduct?.quantity}</Typography></TableCell>
                                        <TableCell><Typography variant="body2">{formatearDinero(soldOrderproduct?.subtotal)}</Typography></TableCell>
                                    
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </TableContainer>
                        <Box sx={{ my: 2, mx:1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Paper elevation={1} sx={{ p: 2, width: '100%', maxWidth: 400, borderRadius: 1, border: '1px solid #ccc' }}>
                            <Stack spacing={1}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="subtitle2" color="text.secondary">Subtotal:</Typography>
                                <Typography variant="body2">{formatearDinero(soldOrder?.subtotal)}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="subtitle2" color="text.secondary">Impuestos (15%):</Typography>
                                <Typography variant="body2">{formatearDinero(soldOrder?.subtotal * 0.15)}</Typography>
                            </Stack>
                            <Divider />
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="subtitle1" fontWeight="bold">Total:</Typography>
                                <Typography variant="subtitle1" fontWeight="bold">{formatearDinero(soldOrder?.total)}</Typography>
                            </Stack>
                            </Stack>
                        </Paper>
                        </Box>
                </Paper>
            </Box>
        </Box>
    );
}
