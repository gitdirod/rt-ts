import React, { useEffect, useState } from 'react';
import { Box, Stack, TextField, Typography, Divider, Button } from '@mui/material';
import { formatearDinero } from '/src/helpers';
import SimpleTablePurchaseResume from './SimpleTablePurchaseResume';
import SendIcon from '@mui/icons-material/Send';
import { formatearDinero2 } from '/src/helpers';
import { PurchaseOrderService } from '/src/services/PurchaseOrderService';
import { useNavigate } from 'react-router-dom';

export default function PasoResumen({purchaseOrder, purchaseOrderProducts, subtotalBuy, clearPurchaseOrder}) {

  const navigate = useNavigate()
  const [envoice, setEnvoice] = useState(purchaseOrder?.envoice || '');
  const [errores, setErrores] = useState({});

  const isUpdate = purchaseOrder?.id != null;

  const handlePurchaseOrder = async (e) =>{


    const _purchaseOrder = {
      _method: isUpdate ? 'PUT' : 'POST',
      id: purchaseOrder?.id,
      subtotal: formatearDinero2(subtotalBuy),
      total: formatearDinero2(subtotalBuy * 1.15),
      envoice: envoice,
      products : purchaseOrderProducts?.map(product => (
          {
              id: product.product_id,
              quantity: product.quantity,
              price: product.price
          }
      ))
    }
    
    const response = isUpdate 
    ? await PurchaseOrderService.update(_purchaseOrder.id, _purchaseOrder)
    : await PurchaseOrderService.create(_purchaseOrder)

    if (response.success) {
      setErrores({});
      clearPurchaseOrder()
      navigate('/admin/purchases/purchases')
      
    } else {
      setErrores(response.errors);
    }
  }

  useEffect(()=>{
    setEnvoice(purchaseOrder?.envoice || '')
    setErrores({});
  },[purchaseOrder])

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
            Productos seleccionados: <strong>{purchaseOrderProducts?.length}</strong>
          </Typography>

          <Typography variant="body1">
            Subtotal: <strong>{formatearDinero(subtotalBuy || 0)}</strong>
          </Typography>

          <TextField
            error={Boolean(errores?.envoice)}
            helperText={errores?.envoice}
            label="Comprobante / Factura"
            size="small"
            value={envoice}
            onChange={(e) => setEnvoice(e.target.value)}
            sx={{ minWidth: 200 }}
          />
        </Stack>
        <Button variant="outlined" color="primary" startIcon={<SendIcon />} onClick={handlePurchaseOrder}>
          {isUpdate ? 'Actualizar compra' : 'Crear compra'}
        </Button>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ maxHeight: 'calc(100vh - 205px)', overflowY: 'auto' }}>
        <SimpleTablePurchaseResume products={purchaseOrderProducts} />
      </Box>

      {/* Puedes añadir más detalles aquí: impuestos, botones, etc. */}
    </Box>
  );
}
