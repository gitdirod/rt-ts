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

import Stack from '@mui/material/Stack';
import { formatearDinero, formatearFecha } from '/src/helpers';
import { useNavigate } from 'react-router-dom';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { SoldOrderService } from '/src/services/SoldOrderService';
import OrderStatusBadge from '/src/components/admin/sold/OrderStatusBadge';
import PaymentStatusBadge from '/src/components/admin/sold/PaymentStatusBadge';

export default function ProductPage({selectedProducts=[]}) {
 
    const navigate = useNavigate()

    const handleEditPurchaseOrder=(soldOrder)=>{
      navigate(`/admin/orders/orders/item/${soldOrder.id}`)
    }

    const {data: soldOrders} = SoldOrderService.useAllSoldOrders()

    const selectedIds = selectedProducts.map(p => p.id);
    // return
    return (
        <Box>
        
        <Box sx={{display:'flex', my:1, p:1, borderRadius:1, border:'1px solid #ccc', bgcolor:'white', justifyContent:'space-between', alignItems:'center'}}>
            <Stack direction="row" spacing={2} alignItems="center">
            <ShoppingBasketIcon color="primary"/>
            <Typography variant="h5" fontWeight="bold">
              Ventas
            </Typography>
            <Chip label={soldOrders.length || 0} color="primary" />
            </Stack>
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
                      Subtotal
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total
                    </Typography>
                  </TableCell>
                  <TableCell>
                      <Typography variant="subtitle2" color="text.secondary">
                      Cliente
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
                  <TableCell>
                      <Typography variant="subtitle2" color="text.secondary">
                      Estado
                      </Typography>
                  </TableCell>
                  <TableCell>
                      <Typography variant="subtitle2" color="text.secondary">
                      Pago
                      </Typography>
                  </TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {(soldOrders || []).map((soldOrder, index) => {
                  const isSelected = selectedIds.includes(soldOrder.id);
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
                      onClick={() => handleEditPurchaseOrder(soldOrder)}
                      >
                      
                      <TableCell><Typography variant="body2">{soldOrder?.id}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{formatearDinero(soldOrder?.subtotal)}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{formatearDinero(soldOrder?.subtotal * 1.15)}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{`${soldOrder?.user?.name} - ${soldOrder?.user?.email}`}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{soldOrder?.products_count}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{formatearFecha(soldOrder?.created_at)}</Typography></TableCell>
                      <TableCell>
                        <OrderStatusBadge estado={soldOrder?.soldOrderTracking?.state} />
                      </TableCell>
                      <TableCell>
                        <PaymentStatusBadge estado={soldOrder?.soldOrderPayment?.state} />
                      </TableCell>
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
