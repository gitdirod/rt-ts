import { memo, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductService } from '/src/services/ProductService';
import { Button, Box, Container } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TittleName from "/src/components/TittleName";
import FilterGroups from "/src/components/FilterGroups";
import ProductGrid from "/src/components/store/product/ProductGrid";

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
  const buttonRef = useRef(null);

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
    setProducts(prev => {
      const nuevos = data.filter(item => !prev.some(p => p.id === item.id));
      return nuevos.length > 0 ? [...prev, ...nuevos] : prev;
    });
  }, [data]);

  const loadMore = () => setPage(prev => prev + 1);
  const noMoreProducts = products.length >= totalRecords;

  // Observer refinado
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio === 1 &&
          !loading &&
          !noMoreProducts
        ) {
          loadMore();
        }
      },
      {
        threshold: 1.0, // Solo se dispara cuando el botón es 100% visible
      }
    );

    const el = buttonRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loading, noMoreProducts]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
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
          borderColor: 'divider',
          bgcolor: '#fff'
        }}
      >
        <FilterGroups />
      </Box>

      {/* Contenido */}
      <Box sx={{ flex: 1 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
          <TittleName>
            {groupName}
            {categoryName ? ` & ${categoryName}` : ''}
          </TittleName>

          <ProductGrid products={products} />

          <Box mt={6} display="flex" justifyContent="center">
            <Button
              ref={buttonRef}
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
        </Container>
      </Box>
    </Box>
  );
};

export default memo(CustomerView);
