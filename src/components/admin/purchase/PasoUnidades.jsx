import React, { useState, useMemo } from 'react'
import PurchaseOrderTableUnits from './PurchaseOrderTableUnits'
import ProductFilters from '../product/ProductFilters';

export default function PasoUnidades({purchaseOrderProducts, handleUpdateProduct, removeProductFromPurchaseOrder}) {

  // Filtros locales
  const [filterName, setFilterName] = useState('');
  const [filterCode, setFilterCode] = useState('');
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterTypes, setFilterTypes] = useState([]);

  //variables paginacion
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const filteredProducts = useMemo(() => {
    return purchaseOrderProducts.filter(p => {
      const matchesName = p.product.name?.toLowerCase().includes(filterName.toLowerCase());
      const matchesCode = p.product.code?.toLowerCase().includes(filterCode.toLowerCase());
      const matchesCategories = filterCategories.length === 0 || filterCategories.includes(p.product?.category?.id);
      const matchesTypes = filterTypes.length === 0 || filterTypes.includes(p.product?.type_product?.id);
      return matchesName && matchesCode && matchesCategories && matchesTypes;
    });
  }, [purchaseOrderProducts, filterName, filterCode, filterCategories, filterTypes]);
  

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleUpdateProductQuantity = (e, p) => {
    const value = e.target.value;
    const regex = /^\d*$/;
    if (value === '' || regex.test(value)) {
      handleUpdateProduct(p.product_id, 'quantity', parseInt(value, 10) || 0);
    }
  };

  const handleUpdateProductPrice = (e, p) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,3}$/;
    if (value === '' || regex.test(value)) {
      handleUpdateProduct(p.product_id, 'price', parseFloat(value) || 0);
    }
  };

  const onRowsPerPageChange = (e)=>{
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }

  const onPageChange = (e, newPage)=>{
    setPage(newPage)
  }
  

  return ( 
    <PurchaseOrderTableUnits
      products={paginatedProducts}
      page={page}
      totalProducts={filteredProducts?.length || 0}
      rowsPerPage={rowsPerPage}
      handleUpdateProductQuantity={handleUpdateProductQuantity}
      handleUpdateProductPrice={handleUpdateProductPrice}
      handleRemoveProductBuy={removeProductFromPurchaseOrder}
      onRowsPerPageChange={onRowsPerPageChange}
      onPageChange={onPageChange}
      searchComponente={(
        <ProductFilters
          handleDebouncedFilterName={setFilterName}
          handleDebouncedFilterCode={setFilterCode}
          handleChangeCategories={setFilterCategories}
          handleChangeTypes={setFilterTypes}
        />
      )}
    />
  );
}
