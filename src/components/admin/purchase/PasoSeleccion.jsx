import { useEffect, useState } from 'react';
import {
  Box
} from '@mui/material';


import { ProductService } from '/src/services/ProductService';
import ProductTable from '../product/ProductTable';
import ProductFilters from '../product/ProductFilters';
import useStore from '/src/hooks/useStore';


export default function ProductPage() {
 
    //variables filtrado
    const [debouncedFilterName, setDebouncedFilterName] = useState('');
    const [debouncedFilterCode, setDebouncedFilterCode] = useState('');
    const [filterCategories, setFilterCategories] = useState([]);
    const [filterTypes, setFilterTypes] = useState([]);

    // Variables paginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
  
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

    const {
        handleAddBuy,
    } = useStore()

    const addToCart = (prod) =>{
        handleAddBuy({...prod, quantity: 1})
    } 

  
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
        handleEdit={addToCart}
      />
    </Box>
  );
}
