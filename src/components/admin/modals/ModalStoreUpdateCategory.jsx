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
import { GroupService } from '/src/services/GroupService';
import { CategoryService } from '/src/services/CategoryService';
import BACKEND from '/src/data/backend';


const ModalStoreUpdateCategory = forwardRef(({ category, onUpdated, onCancel }, ref) => {

    const {data:groups} = GroupService.useAllGroups(true)

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
    const [suggested, setSuggested] = useState(category?.suggested ? true : false)
    const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);
    const [errores, setErrores] = useState({});

    const handleSubmit = async e =>{
        // e.preventDefault()
        const pro = {
            _method: category?.id ? 'PUT' : 'POST',
            id: category?.id,
            name: categoryName,
            group_id: groupId,
            suggested: suggested ? 1 : 0,
            images: imagenesSeleccionadas,
        }

        const response = category 
        ? await CategoryService.update(category.id, pro) 
        : await CategoryService.create(pro);
      
        
        if (response.success) {
            setErrores({})
            if (onUpdated) onUpdated();
          } else {
            setErrores(response.errors)
          }
        
      }

    if (!groups?.length ) {
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
                    {groups?.map((gr) => (
                        <MenuItem key={gr.id} value={gr.id}>
                        {gr.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                {errores?.group_id && (
                    <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
                    {errores?.group_id}
                    </Alert>
                )}

                <FormControlLabel
                    control={
                    <Checkbox
                        checked={suggested}
                        onChange={(e) => setSuggested(e.target.checked)}
                        color="primary"
                    />
                    }
                    label="Categoría sugerida"
                    sx={{ mt: 1 }}
                />

                <ImageUploader onImagesChange={setImagenesSeleccionadas} maxImages={1} />
                {errores?.images && (
                    <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
                    {errores?.images}
                    </Alert>
                )}


                {category?.images && (
                    <ImagePreviewManager
                        images={category?.images}
                        url={BACKEND.CATEGORIES.URL}
                        edit={false}
                        
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
