import React, { forwardRef, useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import GridViewIcon from '@mui/icons-material/GridView';
import { SuggestionService } from '/src/services/SuggestionService';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';


const ModalStoreUpdateSuggestion = forwardRef(({ group, onUpdated, onCancel }, ref) => {

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

    const [groupName, setGroupName] = useState(group?.name || '')
    const [errores, setErrores] = useState({});

    const handleSubmit = async e =>{
        // e.preventDefault()
        const gru = {
          _method: group?.id ? 'PUT' : 'POST',
          id: group?.id,
          name: groupName    
        }

        const response = group 
        ? await SuggestionService.update(group.id, gru) 
        : await SuggestionService.create(gru);
      
        
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
                group ? 
                    <DriveFileRenameOutlineRoundedIcon color='primary' sx={{fontSize: 40}} /> 
                    : 
                    <NoteAddOutlinedIcon color='primary' sx={{fontSize: 40}}/> 
            }
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold'}}>
                {group ? 'Renombrar grupo':'Crear grupo'}
            </Typography>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                <StarPurple500Icon sx={{ color: 'action.active', mr: 1 }} />
                <TextField
                label="Nombre"
                variant="standard"
                fullWidth
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                />
                
            </Box>
            {errores?.name && (
                <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
                {errores?.name}
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

export default ModalStoreUpdateSuggestion;
