import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import { useAuth } from '/src/hooks/useAuth';

export default function LoginModal() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, errores } = useAuth({ middleware: 'guest', urlLogin:'/'});

  const handleSubmit = async (e) => {
    // e.preventDefault(); 
    await login({ email, password });
  };

  console.log(errores)

  return (
    <Box mt={2}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
        <AlternateEmailIcon sx={{ color: 'action.active', mr: 1 }} />
        <TextField 
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          label="Correo" 
          variant="standard" 
          type="email" 
          fullWidth 
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
        <PasswordIcon sx={{ color: 'action.active', mr: 1 }} />
        <TextField 
        value={password}
        onChange={(event)=>setPassword(event.target.value)}
        label="Contraseña" 
        variant="standard" 
        type="password" 
        fullWidth 
      />
      </Box>
      <Button 
        variant="contained" 
        sx={{ width: 1, fontWeight: 'bold', textTransform: 'none' }}
        onClick={handleSubmit}
      >
        Iniciar sesión
      </Button>
    </Box>
  )
}
