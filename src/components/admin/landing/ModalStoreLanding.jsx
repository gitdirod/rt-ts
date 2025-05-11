import React, { forwardRef, useState } from 'react';
import { Box, FormControl, Button, InputLabel, MenuItem, Select, Typography, Alert } from '@mui/material';
import ImageUploader from '/src/components/ImageUploader';
import SaveIcon from '@mui/icons-material/Save';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import { LandingService } from '/src/services/LandingService';
import { DEVICE_TYPES } from '/src/data/deviceTypes';


const ModalStoreLanding = forwardRef(({ onUpdated, onCancel }, ref) => {


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        maxHeight: '95vh',  // evita que se desborde verticalmente
        overflowY: 'auto',  // scroll si es necesario
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    const [typeId, setTypeId] = useState(0)
    const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]);
    const [errores, setErrores] = useState({});

    const handleSubmit = async e =>{
        // e.preventDefault()
        const _landing = {
            _method: 'POST',
            type: typeId,
            images: imagenesSeleccionadas,
        }

        const response = await LandingService.create(_landing);
      
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
            <NoteAddOutlinedIcon color='primary' sx={{fontSize: 40}}/> 
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold'}}>
                Crear landing
            </Typography>
        </Box>

        <FormControl variant="standard" fullWidth>
            <InputLabel>Tipo de pantalla</InputLabel>
            <Select
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
            >
                <MenuItem value=""><em>Seleccionar</em></MenuItem>
                {DEVICE_TYPES?.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                    {type.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        {errores?.type && <Alert severity="error" icon={<GppBadOutlinedIcon fontSize="inherit" />}>{errores.type}</Alert>}

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <ImageUploader 
                onImagesChange={setImagenesSeleccionadas} 
                maxImages={1} 
                message="Subir imagen"
            />
            {errores?.images && (
                <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
                {errores?.images}
                </Alert>
            )}

        </Box>
        <Box sx={{flex: 1, display: 'flex', marginTop:'1rem', gap: 1, justifyContent:'end'}}> 
            <Button variant="outlined" color='inherit' startIcon={<CancelOutlinedIcon />} onClick={onCancel} >Cancelar</Button>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmit}>Guardar</Button>
        </Box>
    </Box>

    );
});

export default ModalStoreLanding;
