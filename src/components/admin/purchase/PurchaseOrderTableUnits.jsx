import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  InputAdornment
} from '@mui/material';
import ImageTable from '/src/components/admin/ImageTable';
import BACKEND from '/src/data/backend';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function PurchaseOrderTableUnits({

  products,
  totalProducts,
  page,
  rowsPerPage,
  handleUpdateProductQuantity,
  handleUpdateProductPrice,
  handleRemoveProductBuy,
  onRowsPerPageChange,
  onPageChange,
  searchComponente

}) {
 


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
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => {
              const isInvalid = p.price <= 0 || p.quantity <= 0;
          
              return (
                <TableRow
                  key={p.product_id}
                  sx={isInvalid ? { backgroundColor: 'rgba(255, 0, 0, 0.1)' } : {}}
                >
                  <TableCell>
                    <ImageTable
                      images={p?.product?.images}
                      url={BACKEND.PRODUCTS.URL}
                      higth={14}
                      count={true}
                    />
                  </TableCell>
                  <TableCell>{p?.product?.code}</TableCell>
                  <TableCell>{p?.product?.name}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      sx={{
                        maxWidth: '10rem',
                        ...(p.quantity <= 0 && {
                          color: 'error.main',
                          fontWeight: 'bold',
                          '& .MuiInputBase-input': {
                            color: 'error.main',
                            fontWeight: 'bold',
                          }
                        })
                      }}
                      value={p.quantity ?? ''}
                      onChange={(e)=>handleUpdateProductQuantity(e, p)}
                      slotProps={{ input: { min: 0, step: 1 } }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      sx={{
                        maxWidth: '10rem',
                        ...(p.price <= 0 && {
                          color: 'error.main',
                          fontWeight: 'bold',
                          '& .MuiInputBase-input': {
                            color: 'error.main',
                            fontWeight: 'bold',
                          }
                        })
                      }}
                      value={p.price ?? ''}
                      onChange={(e) => handleUpdateProductPrice(e, p)}
                      slotProps={{
                        input: {
                          min: 0,
                          step: 0.001,
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteOutlineIcon
                      onClick={() => handleRemoveProductBuy(p.product_id)}
                      sx={{
                        ml: 2,
                        fontSize: 20,
                        cursor: 'pointer',
                        color: 'grey.500',
                        transition: 'color 0.2s ease-in-out',
                        '&:hover': { color: 'primary.main' },
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
        {searchComponente && (
          <Box sx={{ ml: 2 }}>
            {searchComponente}
          </Box>
        )}

        <TablePagination
          component="div"
          count={totalProducts}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[25, 50, 100]}
          onPageChange={(e, newPage) => onPageChange(e, newPage)}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Box>
    </Paper>
  );
}