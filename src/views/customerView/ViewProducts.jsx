import { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductService } from '/src/services/ProductService';
import Products from "/src/components/Products";
import { Button, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TittleName from "/src/components/TittleName";
import FilterGroups from "/src/components/FilterGroups";

const CustomerView = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const groupId = queryParams.get('gi');
  const categoryIds = queryParams.get('ci')?.split(',') || [];
  const groupName = queryParams.get('gro')?.split(',') || [];
  const categoryNameRaw = queryParams.get('cat') || '';
  const categoryName = categoryNameRaw.trim();

  const [rowsPerPage] = useState(15);
  const [sortField] = useState('id');
  const [sortOrder] = useState('desc');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const { data, totalRecords, loading } = ProductService.useProducts({
    page,
    perPage: rowsPerPage,
    name: '',
    code: '',
    categories: categoryIds,
    types: [],
    group_id: groupId,
    sortField,
    sortOrder
  });

  useEffect(() => {
    setProducts([]);
    setPage(1);
  }, [location.search]);

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;
    let actualizado = false;
    setProducts(prev => {
      const nuevos = data.filter(item => !prev.some(p => p.id === item.id));
      if (nuevos.length > 0) {
        actualizado = true;
        return [...prev, ...nuevos];
      }
      return prev;
    });
  }, [data]);

  const loadMore = () => setPage(prev => prev + 1);
  const noMoreProducts = products.length >= totalRecords;

  return (
    <Box sx={{ display: 'flex', width: '100%'  }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 260,
          position: 'sticky',
          top: 64,
          alignSelf: 'flex-start',
          height: 'calc(100vh - 64px)',
          overflowY: 'auto',
          px: 2,
          borderRight: '1px solid',
          borderColor: 'divider', // Usa el color de división del theme
          bgcolor: '#fafafa'
        }}
      >

        <FilterGroups />
      </Box>

      {/* Contenido (usa scroll natural del body) */}
      <Box sx={{ flex: 1, px: 4, py: 3 }}>
        <TittleName>
          {groupName}
          {categoryName ? ` & ${categoryName}` : ''}
        </TittleName>

        <Products products={products} />

        <Box mt={6} display="flex" justifyContent="center">
          <Button
            color="primary"
            sx={{ fontWeight: 'bold' }}
            startIcon={<AddIcon />}
            variant="outlined"
            disabled={loading || noMoreProducts}
            onClick={loadMore}
          >
            {loading
              ? 'Cargando...'
              : noMoreProducts
              ? 'No hay más productos'
              : 'Ver más productos'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(CustomerView);
