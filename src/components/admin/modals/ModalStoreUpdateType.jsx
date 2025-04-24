import React, { forwardRef, useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ImageUploader from '/src/components/ImageUploader';
import SaveIcon from '@mui/icons-material/Save';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import BACKEND from '/src/data/backend';
import { TypeService } from '/src/services/TypeService';


const ModalStoreUpdateType = forwardRef(({ type, onUpdated, onCancel }, ref) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        maxHeight: '95vh',  // evita que se desborde verticalmente
        overflowY: 'auto',  // scroll si es necesario
        // border: '1px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    const [typeName, setTypeName] = useState(type?.name || '')
    const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);
    const [errores, setErrores] = useState({});

    const handleSubmit = async e =>{
        // e.preventDefault()
        const typ = {
            _method: type?.id ? 'PUT' : 'POST',
            id: type?.id,
            name: typeName,
            image: imagenesSeleccionadas[0],
        }

        const response = type 
        ? await TypeService.update(type.id, typ) 
        : await TypeService.create(typ);
      
        
        if (response.success) {
            setErrores({})
            if (onUpdated) onUpdated();
          } else {
            setErrores(response.errors)
          }
        
      }
      

    return (
    <Box sx={style}>
        <Box sx={{ display: 'flex', flex: 1, gap: 2, alignItems: 'center', justifyContent:'center', width: '100%', mb: 2 }}>
            {
                type ? 
                    <PublishedWithChangesOutlinedIcon color='primary' sx={{fontSize: 40}} /> 
                    : 
                    <NoteAddOutlinedIcon color='primary' sx={{fontSize: 40}}/> 
            }
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold'}}>
                {type ? 'Actualizar tipo de producto':'Crear tipo de producto'}
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
                    value={typeName}
                    onChange={(e) => setTypeName(e.target.value)}
                    />
                    
                </Box>
                {errores?.name && (
                    <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
                    {errores?.name}
                    </Alert>
                )}

                {type && (
                    <img
                    src={BACKEND.ICONS.URL + type?.image}
                    alt={type?.name}
                    style={{ height: 40, objectFit: 'contain' }}
                />
                )}

                <ImageUploader onImagesChange={setImagenesSeleccionadas} message={type ? "Cambiar imagen":"Subir imagen"} maxImages={1} />
                {errores?.image && (
                    <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
                    {errores?.image}
                    </Alert>
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

export default ModalStoreUpdateType;
