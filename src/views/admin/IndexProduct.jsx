import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination,
  TextField,
  Box,
  Typography,
  Chip
} from '@mui/material';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SearchIcon from '@mui/icons-material/Search';

import BACKEND from '/src/data/backend';
import { ProductService } from '/src/services/ProductService';
import { formatearDinero } from '/src/helpers';
import ImageTable from '/src/components/admin/ImageTable';
import ModalStoreUpdateProduct from '/src/components/admin/modals/ModalStoreUpdateProduct';

export default function MiTablaConPaginacion() {
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [first, setFirst] = useState(0);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterName, setFilterName] = useState('')
  const [filterCode, setFilterCode] = useState('')

  const [selectedProduct, setSelectedProduct] = useState({})

  const [debouncedFilterName, setDebouncedFilterName] = useState('');
  const [debouncedFilterCode, setDebouncedFilterCode] = useState('');


  const { data: products, totalRecords, loading, mutate } = ProductService.useProducts({
    page: Math.floor(first / rowsPerPage) + 1,
    perPage: rowsPerPage,
    name: debouncedFilterName,
    code: debouncedFilterCode,
    categories: [],
    types: [],
    group_id: '',
    // categories: selectedCategories.map(sel => sel.id).join(','),
    // types: selectedTypes.map(sel => sel.id).join(','),
    sortField,
    sortOrder
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setFirst(newPage * rowsPerPage);
  };
  

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    setFirst(0);
  };

  const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);
  const currentPage = Math.min(page, totalPages - 1 >= 0 ? totalPages - 1 : 0);

  const [edit, setEdit] = useState(false);

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setEdit(true)
  };

  const handleCloseEdit = () => setEdit(false);


  // Debounce para el nombre
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilterName(filterName);
    }, 500); // espera 500 ms

    return () => {
      clearTimeout(handler);
    };
  }, [filterName]);

  // Debounce para el código
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilterCode(filterCode);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filterCode]);


  useEffect(() => {
    const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);
    if (page >= totalPages && totalPages > 0) {
      setPage(totalPages - 1);
      setFirst((totalPages - 1) * rowsPerPage);
    }
  }, [totalRecords, rowsPerPage, page]);
  

  return (
    <div className="overflow-y-hidden flex flex-col flex-1 pb-2">
      <Modal
        open={edit}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleCloseEdit();
          }
        }}
      >
        <ModalStoreUpdateProduct 
          product={selectedProduct}
          onCancel={handleCloseEdit}
          onUpdated={() => {
            handleCloseEdit();
            mutate();
          }}
        />
      </Modal>
        <Box sx={{display:'flex', my:1, p:1, borderRadius:1, border:'1px solid #ccc', bgcolor:'white', justifyContent:'space-between', alignItems:'center'}}>
          <Stack direction="row" flexShrink={0} alignItems="center">
            <Inventory2OutlinedIcon color="primary" fontSize="large"/>
            <Typography 
              component="div" 
              sx={{ fontWeight: 'bold', fontSize:'1.8rem', color:'grey.800' }}
            >
              Productos <Chip label={totalRecords || 0} color="primary" sx={{ fontWeight: 'bold', fontSize: '1rem' }} />
            </Typography>

          </Stack>
          <Stack direction="row" alignItems="center" >
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" label="Nombre" variant="standard" 
                onChange={(event) => {
                  setFilterName(event.target.value);
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField id="input-with-sx" label="Código" variant="standard"
                onChange={(event) => {
                  setFilterCode(event.target.value);
                }}
              />
            </Box>
          </Stack>
          <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} 
            onClick={() => {
            handleEdit(null); // por ejemplo, abrir modal de vista
          }}
          >
            Nuevo
          </Button>
        </Box>
      

        <Paper sx={{ width: '100%', overflow: 'hidden', overflowY:'auto', p:1, border:"1px solid #ccc" }}>
            <TableContainer  sx={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto', borderRadius: 2 }}>
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
                  {(products || []).map((product, index) => (
                    <TableRow 
                      key={index}
                      hover
                      sx={{
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.05)', // claro en light mode
                        }
                      }}
                      onClick={() => {
                        handleEdit(product)
                      }}
                      // onContextMenu={(e) => {
                      //   e.preventDefault(); //  evitar que se abra el menú por defecto
                        
                      // }}
                    >
                      <TableCell>{product?.available ? <CheckCircleOutlinedIcon color='primary'/> : <CancelOutlinedIcon /> }</TableCell>
                      <TableCell><Typography variant="body2">{product?.code}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{product?.name}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{`${product?.group?.name} - ${product?.category.name}`}</Typography></TableCell>
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
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={totalRecords || 0}
              page={currentPage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
    </div>
  );
}
