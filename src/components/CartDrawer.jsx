import React from 'react';
import {
  Box,
  Drawer,

  List,
  ListItem,
} from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useStore from '/src/hooks/useStore';
import TittleName from './TittleName';
import ProductCartDrawer from './ProductCartDrawer';

export default function CartDrawer() {
  const { openDrawerCart, toggleDrawerCart, order, handleAddOrder } = useStore();

  const DrawerList = (
    <Box sx={{ width: 550 }} role="presentation" px={2}>
      <List>
        {order?.map((product, index) => (
            <ListItem key={product.id || index} sx={{ mb: 2, p: 0, }}>
                <ProductCartDrawer product={product}/>
            </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer anchor="right" open={openDrawerCart} onClose={() => toggleDrawerCart(false)}>
      <Box p={2}>
        <TittleName>
          <ShoppingCartIcon sx={{ fontSize: 40 }} color="primary" /> Carrito ({order?.length})
        </TittleName>
      </Box>
      {DrawerList}
    </Drawer>
  );
}
