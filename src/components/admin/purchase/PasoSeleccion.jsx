import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { ProductService } from '/src/services/ProductService';
import ProductTable from '../product/ProductTable';
import ProductFilters from '../product/ProductFilters';
import SelectActionMode from './SelectActionMode';

export default function ProductPage({
  purchaseOrder=[],
  addPurchaseOrderProduct,
  handleAddAllProducts,
  handleRemoveProductBuy,
  handleRemoveAllProducts
}) {

  // Filtros
  const [debouncedFilterName, setDebouncedFilterName] = useState('');
  const [debouncedFilterCode, setDebouncedFilterCode] = useState('');
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterTypes, setFilterTypes] = useState([]);

  // Paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const { data: products, totalRecords } = ProductService.useProducts({
    page: page + 1,
    perPage: rowsPerPage,
    name: debouncedFilterName,
    code: debouncedFilterCode,
    categories: filterCategories,
    types: filterTypes,
    group_id: '',
    sortField: 'id',
    sortOrder: 'desc'
  });

  const [actionMode, setActionMode] = useState('add'); // Por defecto agregar

  const handleProductClick = (prod) => {
    if (actionMode === 'add') {
      addPurchaseOrderProduct({ ...prod, quantity: 1 },true,'purchaseOrderProducts');
    } else if (actionMode === 'remove') {
      handleRemoveProductBuy(prod.id);
    }
  };

  // Filtros
  const handleDebouncedFilterName = (name) => {
    setDebouncedFilterName(name);
    setPage(0);
  };
  const handleDebouncedFilterCode = (code) => {
    setDebouncedFilterCode(code);
    setPage(0);
  };
  const handleChangeCategories = (categories) => {
    setFilterCategories(categories);
    setPage(0);
  };
  const handleChangeTypes = (types) => {
    setFilterTypes(types);
    setPage(0);
  };

  // Paginación
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);
  const safePage = (totalPages === 0) ? 0 : (page >= totalPages ? totalPages - 1 : page);

  useEffect(() => {
    if (page >= totalPages && totalPages > 0) {
      setPage(totalPages - 1);
    }
  }, [totalRecords, rowsPerPage]);

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
        optionComponent={(
          <SelectActionMode
            mode={actionMode}
            onChange={setActionMode}
            onAddAll={()=>handleAddAllProducts(products)}
            onRemoveAll={()=>handleRemoveAllProducts(products)}
          />
        )}
        products={products}
        totalRecords={totalRecords}
        selectedProducts={purchaseOrder}
        page={safePage}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleEdit={handleProductClick}
      />
    </Box>
  );
}
