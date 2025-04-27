import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TablePagination, Typography
  } from '@mui/material';
  import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
  import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
  import ImageTable from '/src/components/admin/ImageTable';
  import BACKEND from '/src/data/backend';
  import { formatearDinero } from '/src/helpers';
  
  export default function ProductTable({ products, page, rowsPerPage, totalRecords, onPageChange, onRowsPerPageChange, onEdit }) {
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden', overflowY: 'auto', p: 1, border: "1px solid #ccc" }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 155px)', overflowY: 'auto', borderRadius: 2 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {/* Cabeceras */}
                <TableCell>Dis.</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Grupo & Categoría</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Imagen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(products || []).map((product, index) => (
                <TableRow key={index} hover onClick={() => onEdit(product)}>
                  <TableCell>{product?.available ? <CheckCircleOutlinedIcon color="primary" /> : <CancelOutlinedIcon sx={{ color: 'grey.600' }} />}</TableCell>
                  <TableCell>{product?.code}</TableCell>
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>{`${product?.group?.name} - ${product?.category?.name}`}</TableCell>
                  <TableCell>{product?.type_product?.name}</TableCell>
                  <TableCell>{formatearDinero(product?.price)}</TableCell>
                  <TableCell>
                    <ImageTable images={product?.images} url={BACKEND.PRODUCTS.URL} higth={14} count={true} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalRecords || 0}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </Paper>
    );
  }
  