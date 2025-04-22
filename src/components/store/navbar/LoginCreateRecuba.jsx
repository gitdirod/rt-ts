import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Divider
} from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "/src/hooks/useAuth";
import LoginModal from './LoginModal';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';

export default function LoginCreateRecuba({ openExternal = false, onCloseExternal = null }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const { isLoading, user, logout } = useAuth({ middleware: 'guest' });
  const navigate = useNavigate();

  // Si no se pasa openExternal, controlar el modal internamente
  const isControlledExternally = typeof openExternal === 'boolean' && onCloseExternal !== null;
  const isDialogOpen = isControlledExternally ? openExternal : openDialog;

  const handleIconClick = (event) => {
    if (!isLoading) {
      if (user) {
        setAnchorEl(event.currentTarget);
      } else {
        if (isControlledExternally) {
          onCloseExternal?.(false); // opcional, si el padre lo desea cerrar desde click
        } else {
          setOpenDialog(true);
        }
      }
    }
  };

  const handleCloseDialog = () => {
    if (isControlledExternally) {
      onCloseExternal?.();
    } else {
      setOpenDialog(false);
    }
  };

  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <>
      {/* Ícono de usuario (solo si no es llamado desde externo) */}
      {!isControlledExternally && (
        <PersonOutlinedIcon
          onClick={handleIconClick}
          sx={{ cursor: 'pointer', fontSize: 30, color: 'grey.700' }}
        />
      )}

      {/* Menú desplegable para usuario autenticado */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2,
              minWidth: 220,
              mt: 1,
              p: 1,
            },
          },
        }}
      >
        <Typography sx={{ px: 2, py: 1, fontWeight: 'bold', color: 'text.secondary' }}>
          ¡Hola, {user?.name}!
        </Typography>

        <Divider sx={{ my: 1 }} />

        <MenuItem onClick={() => { navigate('/store/user'); handleCloseMenu(); }}>
          <ListItemIcon><AccountCircleIcon fontSize="small" /></ListItemIcon>Mi perfil
        </MenuItem>

        <MenuItem onClick={() => { navigate('/store/bought'); handleCloseMenu(); }}>
          <ListItemIcon><ShoppingBagIcon fontSize="small" /></ListItemIcon>Mis compras
        </MenuItem>

        <MenuItem onClick={() => { navigate('/store/likes'); handleCloseMenu(); }}>
          <ListItemIcon><FavoriteBorderIcon fontSize="small" /></ListItemIcon>Me gustan
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        <MenuItem onClick={() => { logout(); handleCloseMenu(); }}>
          <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>Cerrar sesión
        </MenuItem>
      </Menu>

      {/* Dialog externo o interno */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <Box display="flex" justifyContent="flex-end" px={2} pt={1}>
          <IconButton onClick={handleCloseDialog}><CloseIcon /></IconButton>
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
          {tabIndex === 0 && <LoginModal />}
          {tabIndex === 1 && <Box mt={2}>Crear cuenta aquí</Box>}
          {tabIndex === 2 && <Box mt={2}>Recuperar contraseña aquí</Box>}
        </DialogContent>
      </Dialog>
    </>
  );
}
