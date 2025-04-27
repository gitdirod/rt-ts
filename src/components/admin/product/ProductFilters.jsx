import React, { useEffect, useState } from 'react';
import { Box, Stack, TextField, Button, Popover } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function ProductFilters({ setDebouncedFilterName, setDebouncedFilterCode }) {
  const [anchorEl, setAnchorEl] = useState(null);   // Controla si el popover está abierto

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [filterName, setFilterName] = useState('');
  const [filterCode, setFilterCode] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilterName(filterName);
    }, 500);
    return () => clearTimeout(handler);
  }, [filterName]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilterCode(filterCode);
    }, 500);
    return () => clearTimeout(handler);
  }, [filterCode]);

  return (
    <>
      <Button variant="outlined" startIcon={<SearchIcon />}onClick={handleClick}>
        Buscar
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
          <TextField
            label="Buscar por nombre"
            size="small"
            value={filterName}
            onChange={(event) => setFilterName(event.target.value)}
          />
          <TextField
            label="Buscar por código"
            size="small"
            value={filterCode}
            onChange={(event) => setFilterCode(event.target.value)}
          />
        </Box>
      </Popover>
    </>
  );
}
