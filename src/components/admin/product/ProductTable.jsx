import React from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { formatearDinero } from '/src/helpers';
import ImageTable from '/src/components/admin/ImageTable';
import BACKEND from '/src/data/backend';

export default function ProductTable({
  products, 
  selectedProducts = [],
  totalRecords, 
  page, 
  rowsPerPage, 
  handleChangePage, 
  handleChangeRowsPerPage, 
  handleEdit,
  searchComponente,
  optionComponent
}) {

  const selectedIds = selectedProducts.map(p => p.id);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', overflowY:'auto', p:1, border:"1px solid #ccc" }}>
      <TableContainer  sx={{ maxHeight: 'calc(100vh - 155px)', overflowY: 'auto', borderRadius: 2 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow >
              <TableCell>
                <Typography variant="subtitle2" color="text.secondary">
                  Dis.
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
                  Grupo & Caategoria
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" color="text.secondary">
                  Tipo
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" color="text.secondary">
                  Precio
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" color="text.secondary">
                  Imagen
                </Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(products || []).map((product, index) => {
              const isSelected = selectedIds.includes(product.id);
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
                  onClick={() => handleEdit(product)}
                >
                  <TableCell>{product?.available ? <CheckCircleOutlinedIcon color='primary' /> : <CancelOutlinedIcon sx={{ color: 'grey.600' }} />}</TableCell>
                  <TableCell><Typography variant="body2">{product?.code}</Typography></TableCell>
                  <TableCell><Typography variant="body2">{product?.name}</Typography></TableCell>
                  <TableCell><Typography variant="body2">{`${product?.group?.name} - ${product?.category?.name}`}</Typography></TableCell>
                  <TableCell><Typography variant="body2">{product?.type_product?.name}</Typography></TableCell>
                  <TableCell><Typography variant="body2">{formatearDinero(product?.price)}</Typography></TableCell>
                  <TableCell>
                    <ImageTable
                      images={product?.images}
                      url={BACKEND.PRODUCTS.URL}
                      higth={14}
                      count={true}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', mt: 1 }}>
        
        {/* Aquí inyectas dinámicamente el filtro que quieras */}
        {searchComponente && (
          <Box sx={{ ml: 2 }}>
            {searchComponente}
          </Box>
        )}
        {optionComponent && (
          <Box sx={{ ml: 2 }}>
            {optionComponent}
          </Box>
        )}
        <TablePagination
          component="div"
          count={totalRecords || 0}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        
      </Box>

    </Paper>
  )
}
