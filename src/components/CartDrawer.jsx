import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  Divider,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useStore from '/src/hooks/useStore';
import TittleName from './TittleName';
import ProductCartDrawer from './ProductCartDrawer';
import { formatearDinero } from '/src/helpers';

export default function CartDrawer() {
  const { openDrawerCart, toggleDrawerCart, order, subtotal } = useStore();

  return (
    <Drawer anchor="right" open={openDrawerCart} onClose={() => toggleDrawerCart(false)}>
      <Box
        sx={{
          width: 550,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Título */}
        <Box p={2}>
          <TittleName>
            <ShoppingCartIcon sx={{ fontSize: 40 }} color="primary" /> Carrito ({order?.length})
          </TittleName>
        </Box>

        {/* Lista con scroll */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            px: 2,
          }}
        >
          <List>
            {order?.map((product, index) => (
              <ListItem key={product.id || index} sx={{ mb: 2, p: 0 }}>
                <ProductCartDrawer product={product} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Total fijo al fondo */}
        <Box
            sx={{
                borderTop: '1px solid #ddd',
                px: 3,
                py: 2,
                backgroundColor: '#f9f9f9',
                position: 'sticky',
                bottom: 0,
                zIndex: 1,
            }}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
            >
                <Typography variant="body2" color="text.secondary">
                Subtotal
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {formatearDinero(subtotal)}
                </Typography>
            </Box>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
            >
                <Typography variant="body2" color="text.secondary">
                Impuestos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {formatearDinero(0.15 * subtotal)}
                </Typography>
            </Box>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="h6" fontWeight="bold">
                Total
                </Typography>
                <Typography variant="h5" fontWeight="bold" sx={{fontFamily: 'poppins-extrabold'}} color="primary">
                {formatearDinero(subtotal * 1.15)}
                </Typography>
            </Box>
        </Box>

      </Box>
    </Drawer>
  );
}
