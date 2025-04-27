import { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import ProductFilters from './ProductFilters';
import ModalStoreUpdateProduct from '/src/components/admin/modals/ModalStoreUpdateProduct';
import { ProductService } from '/src/services/ProductService';

export default function ProductPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filterName, setFilterName] = useState('');
  const [filterCode, setFilterCode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [edit, setEdit] = useState(false);

  const { data: products, totalRecords, mutate } = ProductService.useProducts({
    page: page + 1,
    perPage: rowsPerPage,
    name: filterName,
    code: filterCode,
    categories: [],
    types: [],
    group_id: '',
    sortField: 'id',
    sortOrder: 'desc'
  });

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEdit(true);
  };

  const handleCloseEdit = () => setEdit(false);

  return (
    <>
      <ProductFilters 
        filterName={filterName}
        filterCode={filterCode}
        onFilterNameChange={setFilterName}
        onFilterCodeChange={setFilterCode}
      />

      <ProductTable 
        products={products}
        page={page}
        rowsPerPage={rowsPerPage}
        totalRecords={totalRecords}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        onEdit={handleEdit}
      />

      <ModalStoreUpdateProduct
        open={edit}
        product={selectedProduct}
        onCancel={handleCloseEdit}
        onUpdated={() => {
          mutate();
          handleCloseEdit();
        }}
      />
    </>
  );
}
