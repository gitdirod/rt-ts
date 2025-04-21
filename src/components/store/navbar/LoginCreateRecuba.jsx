import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  IconButton,
  Box,
  TextField,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import { useAuth } from "/src/hooks/useAuth";

export default function LoginCreateRecuba() {
  const [openDialog, setOpenDialog] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const { isLoading, user, logout } = useAuth({ middleware: 'guest' });
  const navigate = useNavigate();

  const handleIconClick = (event) => {
    if (!isLoading) {
      if (user) {
        setAnchorEl(event.currentTarget);
      } else {
        setOpenDialog(true);
        console.log('iniciar')
      }
    }
  };

  console.log(user)
  console.log(isLoading)

  const handleCloseDialog = () => setOpenDialog(false);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <>
      {/* Ícono de usuario */}
      <PersonOutlinedIcon
        onClick={handleIconClick}
        sx={{ cursor: 'pointer', fontSize: 30, color: 'grey.700' }}
      />

      {/* Menú desplegable para usuario autenticado */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => { navigate('/store/user'); handleCloseMenu(); }}>Mi perfil</MenuItem>
        <MenuItem onClick={() => { navigate('/store/bought'); handleCloseMenu(); }}>Mis compras</MenuItem>
        <MenuItem onClick={() => { navigate('/store/likes'); handleCloseMenu(); }}>Me gustan</MenuItem>
        <MenuItem
          onClick={() => {
            logout(); // o tu función de logout personalizada
            handleCloseMenu();
          }}
        >
          Cerrar sesión
        </MenuItem>
      </Menu>

      {/* Dialog de login / registro / recuperación */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <Box display="flex" justifyContent="flex-end" px={2} pt={1}>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          centered
        >
          <Tab label="Iniciar sesión" sx={{ textTransform: 'none' }} />
          <Tab label="Registrarse" sx={{ textTransform: 'none' }} />
          <Tab label="Recuperar" sx={{ textTransform: 'none' }} />
        </Tabs>

        <DialogContent>
          {tabIndex === 0 && (
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
          )}

          {tabIndex === 1 && (
            <Box mt={2}>
              {/* Formulario registro */}
              Crear cuenta aquí
            </Box>
          )}

          {tabIndex === 2 && (
            <Box mt={2}>
              {/* Formulario recuperación */}
              Recuperar contraseña aquí
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
