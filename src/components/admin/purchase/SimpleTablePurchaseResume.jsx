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
          {products.map((p, index) => {
            const isInvalid = p.price <= 0 || p.quantity <= 0;
            return (
              <TableRow
                key={p?.product?.id}
                sx={isInvalid ? { backgroundColor: 'rgba(255, 0, 0, 0.1)' } : {}}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{p?.product?.code}</TableCell>
                <TableCell>{p?.product?.name}</TableCell>
                <TableCell align="right" sx={p.price <= 0 ? { color: 'error.main', fontWeight: 'bold' } : {}}>
                  {formatearDinero(p.price)}
                </TableCell>
                <TableCell align="right" sx={p.quantity <= 0 ? { color: 'error.main', fontWeight: 'bold' } : {}}>
                  {p.quantity}
                </TableCell>
                <TableCell align="right">{formatearDinero((p.price || 0) * (p.quantity || 0))}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
