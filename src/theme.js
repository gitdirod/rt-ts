// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008B8B',       // color principal
      light: '#4db6ac',      // light estándar de MUI
      dark: '#005f5f',       // opcional
      contrastText: '#fff',  // texto sobre botones primary
      lightHover: '#d2f4f4', // color personalizado para hover suave
    },
    secondary: {
      main: '#ff4081',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
