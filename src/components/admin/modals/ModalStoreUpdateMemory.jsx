import React, { forwardRef, useState } from 'react';
import { Box, Button, TextField, Typography, Alert, FormLabel, TextareaAutosize, FormControl } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ImageUploader from '/src/components/ImageUploader';
import SaveIcon from '@mui/icons-material/Save';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import BACKEND from '/src/data/backend';
import { MemoryService } from '/src/services/MemoryService';


const ModalStoreUpdateMemory = forwardRef(({ memory, onUpdated, onCancel }, ref) => {

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

    const [memoryName, setMemoryName] = useState(memory?.name || '')
    const [description, setDescription] = useState(memory?.description || '')
    const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);
    const [errores, setErrores] = useState({});

    const handleSubmit = async e =>{
        // e.preventDefault()
        const pro = {
            _method: memory?.id ? 'PUT' : 'POST',
            id: memory?.id,
            name: memoryName,
            description: description,
            image: imagenesSeleccionadas[0],
        }

        const response = memory 
        ? await MemoryService.update(memory.id, pro) 
        : await MemoryService.create(pro);
      
        
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
                memory ? 
                    <PublishedWithChangesOutlinedIcon color='primary' sx={{fontSize: 40}} /> 
                    : 
                    <NoteAddOutlinedIcon color='primary' sx={{fontSize: 40}}/> 
            }
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold'}}>
                {memory ? 'Actualizar memoria':'Crear memoria'}
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
                    value={memoryName}
                    onChange={(e) => setMemoryName(e.target.value)}
                    />
                    
                </Box>
                {errores?.name && (
                    <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
                    {errores?.name}
                    </Alert>
                )}

                <FormControl fullWidth>
                    <FormLabel>Descripción</FormLabel>
                    <TextareaAutosize
                        minRows={4}
                        placeholder="Ingrese una descripción"
                        style={{
                            width: '100%',
                            padding: 8,
                            borderRadius: 4,
                            border: '1px solid #ccc',
                            fontFamily: 'inherit',
                            fontSize: '1rem',
                            resize: 'vertical',
                        }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormControl>
                {errores?.description && (
                    <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
                    {errores?.description}
                    </Alert>
                )}

                <ImageUploader onImagesChange={setImagenesSeleccionadas} maxImages={1} />
                {errores?.images && (
                    <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
                    {errores?.images}
                    </Alert>
                )}

                {memory?.image && (
                    <img
                        src={BACKEND.MEMORIES.URL + memory?.image}
                        alt={memory?.name}
                        style={{ height: 80, objectFit: 'contain' }}
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

export default ModalStoreUpdateMemory;
