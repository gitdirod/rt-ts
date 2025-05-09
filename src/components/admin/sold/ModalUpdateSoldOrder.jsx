import React, { forwardRef, useEffect, useState } from 'react';
import { 
  Modal, Box, Checkbox, FormControl, FormControlLabel, FormLabel, Button, 
  InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography, Alert, ListSubheader 
} from '@mui/material';


import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';

import { TypeService } from '/src/services/TypeService';
import { ProductService } from '/src/services/ProductService';

const ModalUpdateSoldOrder = forwardRef(({ product, onUpdated, onCancel, open, handleCloseEdit }, ref) => {

 
  const { data: types } = TypeService.useAllTypes();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',           // Responsivo en pantallas pequeñas
    maxWidth: 1000,           // Máximo 1000px
    bgcolor: 'background.paper',
    maxHeight: '95vh',
    overflowY: 'auto',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  const [typeId, setTypeId] = useState(product?.type_product?.id || '');
  const [errores, setErrores] = useState({});

  const handleSubmit = async (e) => {
    const pro = {
      _method: product?.id ? 'PUT' : 'POST',
      id: product?.id,
      
      type: typeId,
    
    };

    const response = product
      ? await ProductService.update(product.id, pro)
      : await ProductService.create(pro);

    if (response.success) {
      setErrores({});
      if (onUpdated) onUpdated();
    } else {
      setErrores(response.errors);
    }
  };

  useEffect(() => {

    setTypeId(product?.type_product?.id || '');

  }, [product]);
  

  return (

    <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleCloseEdit();
          }
        }}
      >

        <Box sx={style}>
            <Box sx={{ display: 'flex', flex: 1, gap: 2, alignItems: 'center', justifyContent: 'center', width: '100%', mb: 2 }}>
                {product ? 
                    <PublishedWithChangesOutlinedIcon color="primary" sx={{ fontSize: 40 }} /> :
                    <NoteAddOutlinedIcon color="primary" sx={{ fontSize: 40 }} />
                }
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                    {product ? 'Actualizar producto' : 'Crear producto'}
                </Typography>
            </Box>

            <Box sx={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>

                <FormControl variant="standard" fullWidth>
                    <InputLabel>Tipo de producto</InputLabel>
                    <Select
                        value={typeId}
                        onChange={(e) => setTypeId(e.target.value)}
                    >
                        <MenuItem value=""><em>Seleccionar</em></MenuItem>
                        {types?.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                            {type.name}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {errores?.type && <Alert severity="error" icon={<GppBadOutlinedIcon fontSize="inherit" />}>{errores.type}</Alert>}

            </Box>
        </Box>
    </Modal>
    
  );
});

export default ModalUpdateSoldOrder
