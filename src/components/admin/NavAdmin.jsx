import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "/src/hooks/useAuth";

import logo from "/src/static/img/logo.svg";
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

import { AppBar, Box, IconButton, Toolbar, Typography, useTheme, useMediaQuery } from "@mui/material";

const NavAdmin = () => {
  const { user } = useAuth({ middleware: 'auth', url: '/admin' });
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
  position="static"
  color="white"
  elevation={0}
  sx={{
    height: 50, // altura fija
    justifyContent: 'center', // centra verticalmente el contenido del Toolbar
    borderBottom: '1px solid #ddd'
  }}
>
  <Toolbar sx={{ height: '100%', px: 2, justifyContent: 'space-between' }}>
    {/* Logo fijo a la izquierda */}
    <Box
      sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      onClick={() => navigate('/admin/inventory/products')}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          height: 40,
          objectFit: 'contain'
        }}
      />
    </Box>

    {/* Usuario en el centro (solo si hay espacio) */}
    {!isSmallScreen && user?.name && (
      <Typography variant="body1" color="text.primary">
        Hola, {user.name}
      </Typography>
    )}

    {/* Ir a tienda a la derecha */}
    <IconButton color="primary" onClick={() => navigate('/store')}>
      <StoreMallDirectoryIcon sx={{ fontSize: 28 }} />
    </IconButton>
  </Toolbar>
</AppBar>

  );
};

export default memo(NavAdmin);
