import React, { forwardRef, useState } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, Button, InputLabel, MenuItem, Select, TextField, Typography, Alert } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ImageUploader from '/src/components/ImageUploader';
import ImagePreviewManager from '/src/components/ImagePreviewManager';
import SaveIcon from '@mui/icons-material/Save';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import { CategoryService } from '/src/services/CategoryService';
import { TypeService } from '/src/services/TypeService';
import { ProductService } from '/src/services/ProductService';


const ModalStoreUpdateCategory = forwardRef(({ category, onUpdated, onCancel }, ref) => {

    const {data:categories} = CategoryService.useAllCategories()
    const {data:types} = TypeService.useAllTypes()

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        maxHeight: '95vh',  // evita que se desborde verticalmente
        overflowY: 'auto',  // scroll si es necesario
        // border: '1px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    const [categoryName, setCategoryName] = useState(category?.name || '')
    const [groupId, setGroupId] = useState(category?.group_id || '')
    const [visible, setVisible] = useState(category?.available ? true : false)
    const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [errores, setErrores] = useState({});

    const handleSubmit = async e =>{
        // e.preventDefault()
        const pro = {
            _method: category?.id ? 'PUT' : 'POST',
            id: category?.id,
            name: productName,
            category: groupId,
            available: visible ? 1 : 0,
            images: imagenesSeleccionadas,
            deleted: imagesToDelete?.map(img =>(
                {
                    id:img.id
                }
            ))
        }

        const response = category 
        ? await ProductService.update(category.id, pro) 
        : await ProductService.create(pro);
      
        
        if (response.success) {
            setErrores({})
            if (onUpdated) onUpdated();
          } else {
            setErrores(response.errors)
          }
        
      }

    if (!categories?.length || !types?.length) {
    return <Box sx={style}><Typography>Cargando grupos...</Typography></Box>
    }
      

    return (
    <Box sx={style}>
        <Box sx={{ display: 'flex', flex: 1, gap: 2, alignItems: 'center', justifyContent:'center', width: '100%', mb: 2 }}>
            {
                category ? 
                    <PublishedWithChangesOutlinedIcon color='primary' sx={{fontSize: 40}} /> 
                    : 
                    <NoteAddOutlinedIcon color='primary' sx={{fontSize: 40}}/> 
            }
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold'}}>
                {category ? 'Actualizar categoría':'Crear categoría'}
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 4 }}>
            {/* Columna izquierda */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                    <Inventory2OutlinedIcon sx={{ color: 'action.active', mr: 1 }} />
                    <TextField
                    label="Nombre"
                    variant="standard"
                    fullWidth
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    />
                    
                </Box>
                {errores?.name && (
                    <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
                    {errores?.name}
                    </Alert>
                )}

                <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Grupo</InputLabel>
                    <Select
                    value={groupId}
                    label="Grupo"
                    onChange={(e) => setGroupId(e.target.value)}
                    >
                    <MenuItem value="">
                        <em>Seleccionar grupo</em>
                    </MenuItem>
                    {categories?.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                        {category.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                {errores?.category && (
                    <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
                    {errores?.category}
                    </Alert>
                )}

                <FormControlLabel
                    control={
                    <Checkbox
                        checked={visible}
                        onChange={(e) => setVisible(e.target.checked)}
                        color="primary"
                    />
                    }
                    label="Visible en tienda"
                    sx={{ mt: 1 }}
                />

                <ImageUploader onImagesChange={setImagenesSeleccionadas} />
                {errores?.images && (
                    <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
                    {errores?.images}
                    </Alert>
                )}


                {category?.images && (
                    <ImagePreviewManager
                        images={category?.images}
                        url={import.meta.env.VITE_API_URL + "/products/"}
                        edit={true}
                        setDelete={setImagesToDelete}
                    />
                )}

            </Box>

        </Box>
        <Box sx={{flex: 1, display: 'flex', marginTop:'1rem', gap: 1, justifyContent:'end'}}> 
            <Button variant="outlined" color='inherit' startIcon={<CancelOutlinedIcon />} onClick={onCancel} >Cancelar</Button>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmit}>Guardar</Button>
        </Box>
    </Box>

    );
});

export default ModalStoreUpdateCategory;
