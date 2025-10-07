// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({

  palette: {
    primary: {
      main: '#008B8B',
      light: '#4db6ac',
      dark: '#005f5f',
      contrastText: '#fff',
      lightHover: '#d2f4f4',
    },
    secondary: {
      main: '#ff4081',
    },
  },

  shape: {
    borderRadius: 12,
  },
});

export default theme;
