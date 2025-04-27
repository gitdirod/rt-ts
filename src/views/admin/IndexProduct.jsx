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

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


import { ProductService } from '/src/services/ProductService';

import ModalStoreUpdateProduct from '/src/components/admin/modals/ModalStoreUpdateProduct';
import InventoryIcon from '@mui/icons-material/Inventory';
import ProductTable from '/src/components/admin/product/ProductTable';

export default function MiTablaConPaginacion() {
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filterName, setFilterName] = useState('')
  const [filterCode, setFilterCode] = useState('')
  const [debouncedFilterName, setDebouncedFilterName] = useState('');
  const [debouncedFilterCode, setDebouncedFilterCode] = useState('');

  const [selectedProduct, setSelectedProduct] = useState({})
  const [edit, setEdit] = useState(false);



  const { data: products, totalRecords, loading, mutate } = ProductService.useProducts({
    page: page + 1,
    perPage: rowsPerPage,
    name: debouncedFilterName,
    code: debouncedFilterCode,
    categories: [],
    types: [],
    group_id: '',
    sortField:'id',
    sortOrder:'desc'
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  // Siempre vuelve a página 0 cuando cambias el tamaño
  };

  const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);
  const safePage = (totalPages === 0) ? 0 : (page >= totalPages ? totalPages - 1 : page);
  

  


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
    }
  }, [totalRecords, rowsPerPage]);
  
  

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
          <Stack direction="row" spacing={2} alignItems="center">
            <InventoryIcon color="primary"/>
            <Typography variant="h5" fontWeight="bold">
              Productos
            </Typography>
            <Chip label={totalRecords || 0} color="primary" />
          </Stack>
          <Stack direction="row" gap={1} alignItems="center" >
            <Box sx={{ display: 'flex', alignItems: 'flex-end', maxWidth:200 }}>
              <TextField
                label="Buscar por nombre"
                id="outlined-size-small"
                size="small"
                onChange={(event) => {
                  setFilterName(event.target.value);
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', maxWidth:200}}>
              <TextField
                label="Buscar por código"
                id="outlined-size-small"
                size="small"
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
        
        <ProductTable
          products={products}
          totalRecords={totalRecords}
          page={safePage}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleEdit={handleEdit}
        />

    </div>
  );
}
