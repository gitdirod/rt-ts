import React, { useState, useMemo } from 'react';
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
  selectedProducts = [],
  handleUpdateProduct,
  handleRemoveProductBuy,
  searchComponente,
  optionComponent
}) {
  const selectedIds = selectedProducts.map(p => p.id);

  // Filtros locales
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesName = p.name?.toLowerCase().includes(filterName.toLowerCase());
      return matchesName;
    });
  }, [products, filterName]);

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', overflowY: 'auto', p: 1, border: '1px solid #ccc' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
        <TextField
          label="Buscar por nombre"
          size="small"
          value={filterName}
          onChange={(e) => {
            setFilterName(e.target.value);
            setPage(0);
          }}
        />
        {searchComponente && searchComponente}
        {optionComponent && optionComponent}
      </Box>

      <TableContainer sx={{ maxHeight: 'calc(100vh - 195px)', overflowY: 'auto', borderRadius: 2 }}>
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
                        const regex = /^\d*$/;
                        if (value === '' || regex.test(value)) {
                          handleUpdateProduct(products, product.id, 'quantity', parseInt(value, 10) || 0);
                        }
                      }}
                      slotProps={{ input: { min: 0, step: 1 } }}
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
                        const regex = /^\d*\.?\d{0,3}$/;
                        if (value === '' || regex.test(value)) {
                          handleUpdateProduct(products, product.id, 'price', parseFloat(value) || 0);
                        }
                      }}
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
                      onClick={() => handleRemoveProductBuy(product.id)}
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
        <TablePagination
          component="div"
          count={filteredProducts.length}
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