import React, { useState } from 'react'
import { Box, Button, TextField, Alert, Stack } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import { useAuth } from '/src/hooks/useAuth';

import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';

export default function LoginModal() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, errores } = useAuth({ middleware: 'guest', urlLogin:'/'});

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!email || !password) {
      return;
    }

    await login({ email, password });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={2}>
      <Box sx={{ display: 'flex', flexDirection: 'column',  mb: 2, gap:1 }}>
        <Stack direction="row">
          <AlternateEmailIcon sx={{ color: 'action.active', mr: 1 }} />
          <TextField 
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            label="Correo" 
            variant="standard" 
            type="email" 
            fullWidth 
          />
        </Stack>
        {errores?.email && (
            <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
            {errores?.email}
            </Alert>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection:'column', mb: 2, gap:1 }}>
        <Stack direction="row">
          <PasswordIcon sx={{ color: 'action.active', mr: 1 }} />
          <TextField 
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            label="Contraseña" 
            variant="standard" 
            type="password" 
            fullWidth 
          />
        </Stack>
        {errores?.password && (
            <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
            {errores?.password}
            </Alert>
        )}

      </Box>
      <Button
        type="submit"
        variant="contained"
        disabled={!email || !password} // o loading si lo tienes
        sx={{ width: 1, fontWeight: 'bold', textTransform: 'none' }}
      >
        Iniciar sesión
      </Button>
    </Box>
  )
}
