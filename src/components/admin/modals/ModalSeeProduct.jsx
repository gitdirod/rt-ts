import React, { forwardRef } from 'react';
import { Box, Typography } from '@mui/material';
import { formatearDinero } from '/src/helpers';
import BACKEND from '/src/data/backend';
import ProductImage from '../ProductImage';
import DisabledByDefaultTwoToneIcon from '@mui/icons-material/DisabledByDefaultTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';

const ModalSeeProduct = forwardRef(({ product }, ref) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4
  };

  return (
    <Box sx={style}>
      <Box sx={{ display: 'flex', gap: 4 , display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {/* Imagen a la izquierda */}
        <Box sx={{ width: '33.33%', height: '100%' }} >
            {product?.images?.length > 0 && (
            <ProductImage imageUrl={BACKEND.PRODUCTS.URL + product.images[0].name} />
            )}
        </Box>

        {/* Info a la derecha */}
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
            <Box className="flex items-center">
                {product?.available ? <CheckBoxTwoToneIcon color='success'/> : <DisabledByDefaultTwoToneIcon color='error'/> }
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <span className="font-black">{product?.name}</span> 
                </Typography>
            </Box>
          <Typography sx={{ mt: 2 }}>
            <span className="font-bold">Precio:</span> {formatearDinero(product?.price)}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <span className="font-bold">Código:</span> {product?.code}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <span className="font-bold">Descripción:</span> {product?.description}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <div className="p-2 border bg-zinc-50 border-zinc-700 rounded-lg flex items-center gap-4">
              <div className='text-xs text-slate-700'>
                <span className="font-bold">Grupo:</span> {product?.group?.name}
              </div>
              <div className='text-xs text-slate-700'>
                <span className="font-bold">Categoría:</span> {product?.category?.name}
              </div>
              <div className='text-xs text-slate-700'>
                <span className="font-bold">Tipo:</span> {product?.type_product?.name}
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default ModalSeeProduct;
