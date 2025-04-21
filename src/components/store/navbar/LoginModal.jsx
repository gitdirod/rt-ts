import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';

export default function LoginModal() {
  return (
    <Box mt={2}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
        <AlternateEmailIcon sx={{ color: 'action.active', mr: 1 }} />
        <TextField label="Correo" variant="standard" type="email" fullWidth />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
        <PasswordIcon sx={{ color: 'action.active', mr: 1 }} />
        <TextField label="Contraseña" variant="standard" type="password" fullWidth />
      </Box>
      <Button variant="contained" sx={{ width: 1, fontWeight: 'bold', textTransform: 'none' }}>
        Iniciar sesión
      </Button>
    </Box>
  )
}
