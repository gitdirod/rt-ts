// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008B8B', // tu color turquesa
    //   main: '#3c8188', // tu color turquesa
    },
    secondary: {
      main: '#ff4081', // opcional, puedes personalizar más
    },
  },
  shape: {
    borderRadius: 12, // bordes redondeados globales
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
