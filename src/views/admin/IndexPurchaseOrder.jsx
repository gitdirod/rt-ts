import {
  Box,
  Typography,
  Chip,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { PurchaseOrderService } from '/src/services/PurchaseOrderService';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { formatearDinero, formatearFecha } from '/src/helpers';
import { useNavigate } from 'react-router-dom';

export default function ProductPage({selectedProducts=[]}) {
 
    const navigate = useNavigate()

    const handleAddPurchaseOrder = () => {
        navigate('/admin/purchases/storePurchase')
    };

    const handleEditPurchaseOrder=(purchaseOrder)=>{
        navigate('/admin/purchases/purchases/purchase/'+purchaseOrder.id)
    }
    
    const { data: purchaseOrders, totalRecords, loading, mutate } = PurchaseOrderService.useAllPurchaseOrders()

    const selectedIds = selectedProducts.map(p => p.id);
    // return
    return (
        <Box>
        
            <Box sx={{display:'flex', my:1, p:1, borderRadius:1, border:'1px solid #ccc', bgcolor:'white', justifyContent:'space-between', alignItems:'center'}}>
                <Stack direction="row" spacing={2} alignItems="center">
                <ShoppingCartOutlinedIcon color="primary"/>
                <Typography variant="h5" fontWeight="bold">
                    Ordenes de compra
                </Typography>
                <Chip label={purchaseOrders.length || 0} color="primary" />
                </Stack>

                <Button variant="outlined" color="primary" startIcon={<AddCircleOutlineIcon />} 
                    onClick={() => {
                    handleAddPurchaseOrder(null); // por ejemplo, abrir modal de vista
                }}
                >
                Orden de compra
                </Button>
            </Box>

            <Paper sx={{ width: '100%', overflow: 'hidden', overflowY:'auto', p:1, border:"1px solid #ccc" }}>
            <TableContainer  sx={{ maxHeight: 'calc(100vh - 155px)', overflowY: 'auto', borderRadius: 2 }}>
                <Table stickyHeader>
                <TableHead>
                    <TableRow >
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                        ID
                        </Typography>
                    </TableCell>
                    <TableCell>
                    <Typography variant="subtitle2" color="text.secondary">
                        Comprobante / Factura
                    </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                        Subtotal
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                        Total + IVA
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                        Productos
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                        Creado
                        </Typography>
                    </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(purchaseOrders || []).map((purchaseOrder, index) => {
                    const isSelected = selectedIds.includes(purchaseOrder.id);
                    return (
                        <TableRow
                        key={index}
                        hover
                        sx={{
                            cursor: 'pointer',
                            backgroundColor: isSelected ? 'rgba(0, 255, 0, 0.1)' : 'transparent', // verde suave
                            '&:hover': {
                            backgroundColor: isSelected ? 'rgba(0, 255, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                            },
                            transition: 'background-color 0.2s ease-in-out',
                        }}
                        onClick={() => handleEditPurchaseOrder(purchaseOrder)}
                        >
                        
                        <TableCell><Typography variant="body2">{purchaseOrder?.id}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{purchaseOrder?.envoice}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{formatearDinero(purchaseOrder?.subtotal)}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{formatearDinero(purchaseOrder?.subtotal * 1.15)}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{purchaseOrder?.products_count}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{formatearFecha(purchaseOrder?.created_at)}</Typography></TableCell>
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>

            </Paper>
        
        </Box>
    );
}
