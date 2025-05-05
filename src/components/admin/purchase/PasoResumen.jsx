import React, { useState } from 'react';
import useStore from '/src/hooks/useStore';
import { Box, Stack, TextField, Typography, Divider, Button } from '@mui/material';
import { formatearDinero } from '/src/helpers';
import SimpleTablePurchaseResume from './SimpleTablePurchaseResume';
import SendIcon from '@mui/icons-material/Send';
import { formatearDinero2 } from '/src/helpers';
import { PurchaseOrderService } from '/src/services/PurchaseOrderService';
import { useNavigate } from 'react-router-dom';

export default function PasoResumen() {

  const navigate = useNavigate()
  const { orderBuy, subtotalBuy, handleClearOrderBuy } = useStore();
  const [envoice, setEnvoice] = useState('');
  const [errores, setErrores] = useState({});

  const handlePurchaseOrder = async (e) =>{
    
    const newOrderBuy = {
      subtotal: formatearDinero2(subtotalBuy),
      total: formatearDinero2(subtotalBuy * 1.15),
      envoice: envoice,
      products : orderBuy?.map(product => (
          {
              id: product.id,
              quantity: product.quantity,
              price: product.price
          }
      ))
    }

    const response = await PurchaseOrderService.create(newOrderBuy)
    if (response.success) {
      setErrores({});
      handleClearOrderBuy()
      navigate('/admin/purchases/purchases')
      
    } else {
      setErrores(response.errors);
      console.log(response.errors)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        bgcolor: 'background.paper',
        borderRadius: 1,
        p: 2,
        boxShadow: 1,
      }}
    >
      
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="space-between" alignItems="center">
        <Stack direction='row' alignItems="center" spacing={3}>
          <Typography variant="body1">
            Productos seleccionados: <strong>{orderBuy?.length}</strong>
          </Typography>

          <Typography variant="body1">
            Subtotal: <strong>{formatearDinero(subtotalBuy || 0)}</strong>
          </Typography>

          <TextField
            label="Comprobante / Factura"
            size="small"
            value={envoice}
            onChange={(e) => setEnvoice(e.target.value)}
            sx={{ minWidth: 200 }}
          />
        </Stack>
        <Button variant="outlined" color="primary" startIcon={<SendIcon />} onClick={handlePurchaseOrder}>
          Enviar
        </Button>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ maxHeight: 'calc(100vh - 205px)', overflowY: 'auto' }}>
        <SimpleTablePurchaseResume products={orderBuy} />
      </Box>

      {/* Puedes añadir más detalles aquí: impuestos, botones, etc. */}
    </Box>
  );
}
