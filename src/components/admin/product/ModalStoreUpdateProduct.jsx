import React, { forwardRef, useEffect, useState } from 'react';
import { 
  Modal, Box, Checkbox, FormControl, FormControlLabel, FormLabel, Button, 
  InputLabel, MenuItem, Select, TextareaAutosize, TextField, Typography, Alert, ListSubheader 
} from '@mui/material';

import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ImageUploader from '/src/components/ImageUploader';
import CropOutlinedIcon from '@mui/icons-material/CropOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import ImagePreviewManager from '/src/components/ImagePreviewManager';
import SaveIcon from '@mui/icons-material/Save';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';


import { ProductService } from '/src/services/ProductService';

const ModalStoreUpdateProduct = forwardRef(({ product, groups, types,  onUpdated, onCancel, open, handleCloseEdit }, ref) => {



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

  

  const [productName, setProductName] = useState(product?.name || '');
  const [productCode, setProductCode] = useState(product?.code || '');
  const [categoryId, setCategoryId] = useState(product?.category?.id || '');
  const [typeId, setTypeId] = useState(product?.type_product?.id || '');
  const [visible, setVisible] = useState(product?.available ? true : false);
  const [productDescripcion, setProductDescripcion] = useState(product?.description || '');
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [productSize, setProductSize] = useState(product?.size || '');
  const [productWeight, setProductWeight] = useState(product?.weight || '');
  const [productPower, setProductPower] = useState(product?.number_color || '');
  const [errores, setErrores] = useState({});

  const handleSubmit = async (e) => {
    const pro = {
      _method: product?.id ? 'PUT' : 'POST',
      id: product?.id,
      name: productName,
      code: productCode,
      category: categoryId,
      type: typeId,
      description: productDescripcion,
      available: visible ? 1 : 0,
      size: productSize,
      number_color: productPower,
      weight: productWeight,
      images: imagenesSeleccionadas,
      deleted: imagesToDelete.map(img => img.id) 
      // deleted: imagesToDelete.map(img => ({ id: img.id }))
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
    setProductName(product?.name || '');
    setProductCode(product?.code || '');
    setCategoryId(product?.category?.id || '');
    setTypeId(product?.type_product?.id || '');
    setVisible(product?.available ? true : false);
    setProductDescripcion(product?.description || '');
    setProductSize(product?.size || '');
    setProductWeight(product?.weight || '');
    setProductPower(product?.number_color || '');
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
        {(!types?.length || !groups?.length ) ? (
          <Typography>Cargando categorías y tipos...</Typography>
        ) : (
          <>
            <Box sx={{ display: 'flex', flex: 1, gap: 2, alignItems: 'center', justifyContent: 'center', width: '100%', mb: 2 }}>
              {product ? 
                <PublishedWithChangesOutlinedIcon color="primary" sx={{ fontSize: 40 }} /> :
                <NoteAddOutlinedIcon color="primary" sx={{ fontSize: 40 }} />
              }
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                {product ? 'Actualizar producto' : 'Crear producto'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {/* Columna izquierda */}
              <Box sx={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Inventory2OutlinedIcon sx={{ color: 'action.active', mr: 1 }} />
                  <TextField
                    label="Nombre"
                    variant="standard"
                    fullWidth
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Box>
                {errores?.name && <Alert severity="error" icon={<GppBadOutlinedIcon fontSize="inherit" />}>{errores.name}</Alert>}

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <QrCodeIcon sx={{ color: 'action.active', mr: 1 }} />
                  <TextField
                    label="Código"
                    variant="standard"
                    fullWidth
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value.toUpperCase())}
                  />
                </Box>
                {errores?.code && <Alert severity="error" icon={<GppBadOutlinedIcon fontSize="inherit" />}>{errores.code}</Alert>}

                <FormControl variant="standard" fullWidth>
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <MenuItem value=""><em>Seleccionar categoría</em></MenuItem>
                    {groups?.map((group) => (
                      [
                        <ListSubheader key={`group-${group.id}`}>{group.name}</ListSubheader>,
                        group.categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))
                      ]
                    ))}
                  </Select>
                </FormControl>
                {errores?.category && <Alert severity="error" icon={<GppBadOutlinedIcon fontSize="inherit" />}>{errores.category}</Alert>}

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

                <FormControlLabel
                  control={<Checkbox checked={visible} onChange={(e) => setVisible(e.target.checked)} color="primary" />}
                  label="Visible en tienda"
                  sx={{ mt: 1 }}
                />

                <FormControl fullWidth>
                  <FormLabel>Descripción</FormLabel>
                  <TextareaAutosize
                    minRows={4}
                    placeholder="Ingrese una descripción"
                    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical' }}
                    value={productDescripcion}
                    onChange={(e) => setProductDescripcion(e.target.value)}
                  />
                </FormControl>
                {errores?.description && <Alert severity="error" icon={<GppBadOutlinedIcon fontSize="inherit" />}>{errores.description}</Alert>}
              </Box>

              {/* Columna derecha */}
              <Box sx={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ImageUploader onImagesChange={setImagenesSeleccionadas} />
                {errores?.images && <Alert severity="error" icon={<GppBadOutlinedIcon fontSize="inherit" />}>{errores.images}</Alert>}

                {product?.images && (
                  <ImagePreviewManager
                    images={product?.images}
                    url={import.meta.env.VITE_API_URL + "/products/"}
                    edit={true}
                    setDelete={setImagesToDelete}
                  />
                )}

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <CropOutlinedIcon sx={{ color: 'action.active', mr: 1 }} />
                  <TextField
                    label="Tamaño"
                    variant="standard"
                    fullWidth
                    value={productSize}
                    onChange={(e) => setProductSize(e.target.value)}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <FitnessCenterOutlinedIcon sx={{ color: 'action.active', mr: 1 }} />
                  <TextField
                    label="Peso"
                    variant="standard"
                    fullWidth
                    value={productWeight}
                    onChange={(e) => setProductWeight(e.target.value)}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <ElectricBoltOutlinedIcon sx={{ color: 'action.active', mr: 1 }} />
                  <TextField
                    label="Potencia"
                    variant="standard"
                    fullWidth
                    value={productPower}
                    onChange={(e) => setProductPower(e.target.value)}
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', marginTop: '1rem', gap: 1, justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="inherit" startIcon={<CancelOutlinedIcon />} 
                onClick={
                  ()=>{
                  onCancel()
                  setErrores({});
                  }
                }
              >
                Cancelar
              </Button>
              <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmit}>
                Guardar
              </Button>
            </Box>
          </>
        )}
      </Box>
      </Modal>
    
  );
});

export default ModalStoreUpdateProduct
