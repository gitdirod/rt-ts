import { useParams } from "react-router-dom";
import { useAuth } from "/src/hooks/useAuth";
import IsLoading from "/src/components/store/common/IsLoading";
import TittleName from "/src/components/store/common/TittleName";
import { SoldOrderService } from "/src/services/SoldOrderService";
import { formatearDinero, formatearFecha } from "/src/helpers";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Box,
  Divider,
  Stack,
} from '@mui/material';
import EstadoPedido from "/src/components/store/cart/EstadoPedido";
import PagoPedido from "/src/components/store/cart/PagoPedido";

export default function BoughtDetailPage() {
  const { id } = useParams();
  const { data: order, isLoading } = SoldOrderService.useSoldOrderById(Number(id));
  const { user } = useAuth({ middleware: 'auth', url: '/' });

  if (!user || isLoading || !order) return <IsLoading />;
  // console.log(order)

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <TittleName>Detalle del Pedido #{order.id}</TittleName>

      <Typography variant="body2" sx={{ mt: 1, mb: 3 }}>
        Fecha: {formatearFecha(order.created_at, 'dddd D [de] MMMM [de] YYYY - HH:mm')}
      </Typography>

      <Stack direction="row" gap={2}>
        <EstadoPedido estado={order?.soldOrderTracking?.state} />
        <PagoPedido estado={order?.soldOrderPayment?.state} />
      </Stack>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, mt: 2 }}>
        <Table size="medium">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell>
                <Typography variant="subtitle2" color="text.secondary">
                  Código
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" color="text.secondary">
                  Producto
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" color="text.secondary">
                  Cantidad
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" color="text.secondary">
                  Total
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.products?.map((product) => (
              <TableRow key={product?.product_id} hover>
                <TableCell>
                  <Typography variant="body2">{product?.code}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{product?.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{product?.quantity || '—'}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {product?.subtotal ? formatearDinero(product.subtotal) : '—'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
</TableContainer>


      <Box sx={{ maxWidth: 400, ml: 'auto', mt: 4 }}>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1" color="text.secondary">Subtotal</Typography>
          <Typography variant="body1">{formatearDinero(order.subtotal)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1" color="text.secondary">Impuestos (15%)</Typography>
          <Typography variant="body1">{formatearDinero(order.subtotal * 0.15)}</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold">Total pagado</Typography>
          <Typography variant="h6" fontWeight="bold" color="primary">
            {formatearDinero(order.total)}
          </Typography>
        </Box>
      </Box>

    </Container>
  );
}
