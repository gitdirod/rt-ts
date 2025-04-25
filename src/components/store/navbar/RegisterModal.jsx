import React, { useState } from 'react'
import { Box, Button, TextField, Alert, Stack } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import { useAuth } from '/src/hooks/useAuth';
import { useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';


import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';

export default function RegisterModal() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmationPassword, setconfirmationPassword] = useState('')

  const location = useLocation();
  const urlActual = location.pathname + location.search;


  // const { login, errores } = useAuth({ middleware: 'guest', urlLogin:'/'});
  const { register, errores } = useAuth({ middleware: 'guest', urlLogin:'/'});

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!email || !password || !confirmationPassword || !name) {
      return;
    }
    const newUser = {
      name: name,
      email: email,
      password : password,
      password_confirmation : confirmationPassword
    }

    await register( newUser, () => window.location.reload() );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={2}>
      <Box sx={{ display: 'flex', flexDirection: 'column',  mb: 2, gap:1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
          <PersonIcon sx={{ color: 'action.active', mr: 1 }} />
          <TextField 
            value={name}
            onChange={(event) => setName(event.target.value)}
            label="Nombre" 
            variant="standard" 
            type="text" 
            fullWidth 
          />
        </Box>
        {errores?.name && (
            <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
            {errores?.name}
            </Alert>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column',  mb: 2, gap:1 }}>
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
        {errores?.email && (
            <Alert icon={<GppBadOutlinedIcon fontSize="inherit" />} severity="error">
            {errores?.email}
            </Alert>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection:'column', mb: 2, gap:1 }}>
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
      </Box>
      <Box sx={{ display: 'flex', flexDirection:'column', mb: 2, gap:1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
          <PasswordIcon sx={{ color: 'action.active', mr: 1 }} />
          <TextField 
            value={confirmationPassword}
            onChange={(event)=>setconfirmationPassword(event.target.value)}
            label="Confirmar contraseña" 
            variant="standard" 
            type="password" 
            fullWidth 
          />
        </Box>
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
