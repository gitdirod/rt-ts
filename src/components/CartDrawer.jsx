import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import useStore from '/src/hooks/useStore';

import ProductCartDrawer from './store/product/ProductCartDrawer';
import { formatearDinero } from '/src/helpers';
import TittleName from './store/common/TittleName';

export default function CartDrawer() {
  const { openDrawerCart, toggleDrawerCart, order, subtotal } = useStore();

  return (
    <Drawer anchor="right" open={openDrawerCart} onClose={() => toggleDrawerCart(false)}>
      <Box
        sx={{
          width: 380,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Título */}
        <Box p={2} sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <TittleName>
            <ShoppingCartIcon sx={{ fontSize: 40 }} color="primary" /> Carrito ({order?.length})
          </TittleName>

          {/* Botón de cerrar SOLO en pantallas pequeñas */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'flex-end',
          p: 1,
        }}
      >
        <IconButton
          onClick={() => toggleDrawerCart(false)}
          sx={{
            bgcolor: 'grey.100',
            boxShadow: 2,
            width: 40,
            height: 40,
            borderRadius: '50%',
            '&:hover': {
              bgcolor: 'grey.200',
            },
          }}
        >
          <CloseIcon sx={{ fontSize: 24, color: 'grey.800' }} />
        </IconButton>
      </Box>
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
