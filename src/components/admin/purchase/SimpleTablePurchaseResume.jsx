import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { formatearDinero } from '/src/helpers';

export default function SimpleTablePurchaseResume({ products = [] }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 0 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="subtitle2">#</Typography></TableCell>
            <TableCell><Typography variant="subtitle2">Código</Typography></TableCell>
            <TableCell><Typography variant="subtitle2">Nombre</Typography></TableCell>
            <TableCell align="right"><Typography variant="subtitle2">Precio</Typography></TableCell>
            <TableCell align="right"><Typography variant="subtitle2">Unidades</Typography></TableCell>
            <TableCell align="right"><Typography variant="subtitle2">Subtotal</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p, index) => (
            <TableRow key={p?.product?.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{p?.product?.code}</TableCell>
              <TableCell>{p?.product?.name}</TableCell>
              <TableCell align="right">{formatearDinero(p.price)}</TableCell>
              <TableCell align="right">{p.quantity}</TableCell>
              <TableCell align="right">{formatearDinero((p.price || 0) * (p.quantity || 0))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
