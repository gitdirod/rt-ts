import React from 'react';
import {
  Container,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material';
import { formatearDinero } from '/src/helpers';
import useStore from '/src/hooks/useStore';

export default function StepResume() {
  const { order, total } = useStore();

  return (
    <Container maxWidth="md">
      <Stack spacing={3} sx={{ my: 4 }}>
        <Typography variant="h5" color="primary" textAlign="center" fontWeight="bold">
          Total a pagar: {formatearDinero(total)}
        </Typography>

        <Typography variant="h6" textAlign="center">
          Entrega en: <strong>Retirar en local físico</strong><br />
          JUAN LEÓN MERA N26-21 Y SANTA MARÍA - TECNITOOLS
        </Typography>

        <Box sx={{ overflowX: 'auto' }}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Producto</strong></TableCell>
                  <TableCell><strong>Código</strong></TableCell>
                  <TableCell align="center"><strong>Cantidad</strong></TableCell>
                  <TableCell align="right"><strong>Precio unitario</strong></TableCell>
                  <TableCell align="right"><strong>Subtotal</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell align="center">{item.cantidad}</TableCell>
                    <TableCell align="right">{formatearDinero(item.price)}</TableCell>
                    <TableCell align="right">{formatearDinero(item.price * item.cantidad)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Typography variant="h6" textAlign="right" sx={{ pr: 2 }}>
          Total: <strong>{formatearDinero(total)}</strong>
        </Typography>
      </Stack>
    </Container>
  );
}
