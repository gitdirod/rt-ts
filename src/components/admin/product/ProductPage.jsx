import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Chip
} from '@mui/material';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ProductService } from '/src/services/ProductService';
import InventoryIcon from '@mui/icons-material/Inventory';
import ProductTable from './ProductTable';
import ModalStoreUpdateProduct from './ModalStoreUpdateProduct';
import ProductFilters from './ProductFilters';

import { TypeService } from '/src/services/TypeService';
import { GroupService } from '/src/services/GroupService';

export default function ProductPage() {
 
  // Variables control ModalStoreUpdateProduct
  const [selectedProduct, setSelectedProduct] = useState({})
  const [edit, setEdit] = useState(false);
  const handleCloseEdit = () => setEdit(false);
  const handleEdit = (product) => {
    setSelectedProduct(product)
    setEdit(true)
    setFetchEnabled(true)
  };


  //variables filtrado
  const [debouncedFilterName, setDebouncedFilterName] = useState('');
  const [debouncedFilterCode, setDebouncedFilterCode] = useState('');
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterTypes, setFilterTypes] = useState([]);


  // Variables paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [fetchEnabled, setFetchEnabled] = useState(false);
  const { data: groups } = GroupService.useAllGroups(fetchEnabled);
  const { data: types } = TypeService.useAllTypes(fetchEnabled);
  
  const { data: products, totalRecords, loading, mutate } = ProductService.useProducts({
    page: page + 1,
    perPage: rowsPerPage,
    name: debouncedFilterName,
    code: debouncedFilterCode,
    categories: filterCategories,
    types: filterTypes,
    group_id: '',
    sortField:'id',
    sortOrder:'desc'
  });

  
  const handleDebouncedFilterName = (name) => {
    setDebouncedFilterName(name);
    setPage(0);
  };
  const handleDebouncedFilterCode = (code) => {
    setDebouncedFilterCode(code);
    setPage(0);
  };
  const handleChangeCategories = (categories) =>{
    setFilterCategories(categories)
    setPage(0);
  }
  const handleChangeTypes = (types) =>{
    setFilterTypes(types)
    setPage(0);
  }
  
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  // Siempre vuelve a página 0 cuando cambias el tamaño
  };

  const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);
  const safePage = (totalPages === 0) ? 0 : (page >= totalPages ? totalPages - 1 : page);
  
  useEffect(() => {
    const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);
    if (page >= totalPages && totalPages > 0) {
      setPage(totalPages - 1);
    }
  }, [totalRecords, rowsPerPage]);

  // return
  return (
    <Box>
    {/* <div className="overflow-y-hidden flex flex-col flex-1"> */}
      <ModalStoreUpdateProduct 
        product={selectedProduct} 
        groups={groups}
        types={types}
        open={edit}
        onCancel= {handleCloseEdit}
        onUpdated={()=>{
          handleCloseEdit();
          mutate();
        }}
        handleEdit={handleEdit} 
        handleCloseEdit={handleCloseEdit}
      />
      
      <Box sx={{display:'flex', my:1, p:1, borderRadius:1, border:'1px solid #ccc', bgcolor:'white', justifyContent:'space-between', alignItems:'center'}}>
        <Stack direction="row" spacing={2} alignItems="center">
          <InventoryIcon color="primary"/>
          <Typography variant="h5" fontWeight="bold">
            Productos
          </Typography>
          <Chip variant="outlined" label={totalRecords || 0} color="primary" />
        </Stack>

        <Button variant="outlined" color="primary" startIcon={<AddCircleOutlineIcon />} 
            onClick={() => {
            handleEdit(null); // por ejemplo, abrir modal de vista
          }}
          >
          Nuevo
        </Button>
      </Box>
      
      <ProductTable
        searchComponente={(
          <ProductFilters
            handleDebouncedFilterName={handleDebouncedFilterName}
            handleDebouncedFilterCode={handleDebouncedFilterCode}
            handleChangeCategories={handleChangeCategories}
            handleChangeTypes={handleChangeTypes}
          />
        )}
        products={products}
        totalRecords={totalRecords}
        page={safePage}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleEdit={handleEdit}
      />
    </Box>
  );
}
