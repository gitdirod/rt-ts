import React, { useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { formatearDinero } from '/src/helpers';
import ImageTable from '/src/components/admin/ImageTable';
import BACKEND from '/src/data/backend';

import { TextField, InputAdornment } from '@mui/material';

export default function PurchaseOrderTableUnits({
  products,
  selectedProducts = [],
  handleUpdateProduct,
  searchComponente,
  optionComponent
}) {
  const selectedIds = selectedProducts.map(p => p.id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', overflowY: 'auto', p: 1, border: '1px solid #ccc' }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 155px)', overflowY: 'auto', borderRadius: 2 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((product) => {
              const isSelected = selectedIds.includes(product.id);
              return (
                <TableRow
                  key={product.id}
                  sx={{
                    backgroundColor: isSelected ? 'rgba(0, 255, 0, 0.1)' : 'transparent',
                    transition: 'background-color 0.2s ease-in-out',
                  }}
                >
                  <TableCell>
                    <ImageTable
                      images={product?.images}
                      url={BACKEND.PRODUCTS.URL}
                      higth={14}
                      count={true}
                    />
                  </TableCell>
                  <TableCell>{product?.code}</TableCell>
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      sx={{ maxWidth: '10rem' }}
                      value={product.quantity ?? ''}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Solo números enteros positivos
                        const regex = /^\d*$/;
                        if (value === '' || regex.test(value)) {
                          handleUpdateProduct(product.id, 'quantity', parseInt(value, 10) || 0);
                        }
                      }}
                      slotProps={{
                        input: {
                          min: 0,
                          step: 1,
                        },
                      }}
                    />
                  </TableCell>
                  
                    <TableCell>
                      <TextField
                        type="number"
                        size="small"
                        sx={{ maxWidth: '10rem' }}
                        value={product.price ?? ''}
                        onChange={(e) => {
                          const value = e.target.value;

                          // Solo números positivos con hasta 3 decimales
                          const regex = /^\d*\.?\d{0,3}$/;
                          if (value === '' || regex.test(value)) {
                            handleUpdateProduct(product.id, 'price', parseFloat(value) || 0);
                          }
                        }}
                        slotProps={{
                          input: {
                            min: 0,
                            step: 0.001,
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }
                        }}
                      />
                    </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', mt: 1 }}>
        {searchComponente && <Box sx={{ ml: 2 }}>{searchComponente}</Box>}
        {optionComponent && <Box sx={{ ml: 2 }}>{optionComponent}</Box>}
        <TablePagination
          component="div"
          count={products.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[25, 50, 100]}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Box>
    </Paper>
  );
}

