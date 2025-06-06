import React from 'react';
import { Typography, Box } from '@mui/material';

const TittleName = ({ children, fontSize = { xs: '1.5rem', md: '2.5rem' }, color = 'text.primary' }) => {
  return (
    <Box
      sx={{
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 800,
        fontSize,
        color,
        width: 'fit-content',
        py: 2,
        borderRadius: 2,
      }}
    >
      <Typography component="div" sx={{ font: 'inherit' }}>
        {children}
      </Typography>
    </Box>
  );
};

export default TittleName;
