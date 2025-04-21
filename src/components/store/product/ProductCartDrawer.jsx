import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import useStore from '/src/hooks/useStore';
import { urlsBackend } from '/src/data/urlsBackend';
import { formatearDinero } from '/src/helpers';

export default function ProductCartDrawer({product}) {
    const { handleAddOrder, handleRemoveProduct } = useStore();

    const [cantidad, setCantidad] = useState(product.cantidad);
    
    const updateCantidad = (nuevaCantidad) => {
        if (nuevaCantidad >= 1 && nuevaCantidad <= product.units) {
            setCantidad(nuevaCantidad);
            handleAddOrder({ ...product, cantidad: nuevaCantidad });
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                p: 1,
                // border: '1px solid #ddd',
                // borderRadius: 2,
            }}
        >
            {/* Imagen */}
            <Box sx={{ flexShrink: 0 }}>
                <img
                src={urlsBackend.PRODUCT_IMAGE + product?.images?.[0]?.name}
                alt={product.name}
                style={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: 8,
                }}
                />
            </Box>

            {/* Detalles */}
            <Box sx={{ flexGrow: 1 }}>
                <Typography fontWeight="bold">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                Código: {product.code}
                </Typography>
                <Typography variant="body2" mt={1}>
                {formatearDinero(product.price)} x {cantidad} ={" "}
                <strong>{formatearDinero(product.price * cantidad)}</strong>
                </Typography>

                {/* Controles de cantidad */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                    <IconButton
                        onClick={() => updateCantidad(cantidad - 1)}
                        disabled={cantidad <= 1}
                        size="small"
                    >
                        <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Box
                        sx={{
                        px: 2,
                        py: 0.5,
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        minWidth: 32,
                        textAlign: 'center',
                        }}
                    >
                        {cantidad}
                    </Box>
                    <IconButton
                        onClick={() => updateCantidad(cantidad + 1)}
                        disabled={cantidad >= product.units}
                        size="small"
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            {/* Eliminar */}
            <IconButton  onClick={() => handleRemoveProduct(product.id)}>
                <DeleteIcon />
            </IconButton>
        </Box>
    )
}
