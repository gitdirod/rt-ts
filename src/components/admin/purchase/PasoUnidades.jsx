import useStore from '/src/hooks/useStore'
import React, { useState, useMemo } from 'react'
import PurchaseOrderTableUnits from './PurchaseOrderTableUnits'
import { Box, TextField } from '@mui/material';

export default function PasoUnidades() {
  const { orderBuy, handleUpdateProduct, handleRemoveProductBuy } = useStore();



  // Filtros locales
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const filteredProducts = useMemo(() => {
    return orderBuy.filter(p => {
      const matchesName = p.name?.toLowerCase().includes(filterName.toLowerCase());
      return matchesName;
    });
  }, [orderBuy, filterName]);

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);


  const handleUpdateProductQuantity = (e,p) =>{
    const value = e.target.value;
    const regex = /^\d*$/;
    if (value === '' || regex.test(value)) {
      handleUpdateProduct(orderBuy, p.id, 'quantity', parseInt(value, 10) || 0);
    }
  }

  const handleUpdateProductPrice = (e, p) =>{
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,3}$/;
    if (value === '' || regex.test(value)) {
      handleUpdateProduct(orderBuy, p.id, 'price', parseFloat(value) || 0);
    }
  }

  const onRowsPerPageChange = (e)=>{
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }

  const onPageChange = (e, newPage)=>{
    setPage(newPage)
  }
  

  return (
    <>
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
    </Box>
    <PurchaseOrderTableUnits
      products={paginatedProducts}
      page={page}
      totalProducts={filteredProducts?.length || 0}
      rowsPerPage={rowsPerPage}
      filterName={filterName}
      setFilterName={setFilterName}
      handleUpdateProductQuantity={handleUpdateProductQuantity}
      handleUpdateProductPrice={handleUpdateProductPrice}
      handleRemoveProductBuy={handleRemoveProductBuy}
      onRowsPerPageChange={onRowsPerPageChange}
      onPageChange={onPageChange}
    />
    </>
  );
}
