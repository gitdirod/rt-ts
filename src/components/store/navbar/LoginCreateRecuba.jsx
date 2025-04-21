import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  IconButton,
  Box,
  TextField,
  Button
} from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';

export default function LoginCreateRecuba() {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <PersonOutlinedIcon onClick={handleOpen} sx={{ cursor: 'pointer', fontSize: 30, color: 'grey.700' }} />

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        {/* <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Cuenta
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle> */}

        <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)} centered>
          <Tab label="Iniciar sesión" sx={{ textTransform: 'none' }} />
          <Tab label="Registrarse" sx={{ textTransform: 'none' }} />
          <Tab label="Recuperar" sx={{ textTransform: 'none' }} />
        </Tabs>

        <DialogContent>
            {tabIndex === 0 && 
                <Box mt={2}> 
                    {/* Formulario login */} 
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                        <AlternateEmailIcon sx={{ color: 'action.active', mr: 1 }} />
                        <TextField
                            label="Correo"
                            variant="standard"
                            type="email"
                            autoFocus
                            fullWidth
                            // value={productName}
                            // onChange={(e) => setProductName(e.target.value)}
                        />
                    
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                        <PasswordIcon sx={{ color: 'action.active', mr: 1 }} />
                        <TextField
                            label="Contraseña"
                            variant="standard"
                            type="password"
                            fullWidth
                            // value={productName}
                            // onChange={(e) => setProductName(e.target.value)}
                        />
                    
                    </Box>
                    <Button variant='contained' sx={{width:1, fontWeight:'bold',  textTransform: 'none'}}>Inicar sesión</Button>
                </Box>
            }
            {tabIndex === 1 && 
                <Box mt={2}> 
                    {/* Formulario registro */} 
                    Crear cuenta aquí 
                </Box>
            }
            {tabIndex === 2 && 
                <Box mt={2}> 
                    {/* Formulario recuperación */} 
                    Recuperar contraseña aquí 
                </Box>
            }
            </DialogContent>
      </Dialog>
    </>
  );
}
