import { Box, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function ProductFilters({setDebouncedFilterName, setDebouncedFilterCode}) {

  const [filterName, setFilterName] = useState('')
  const [filterCode, setFilterCode] = useState('')


  // Debounce para el nombre
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilterName(filterName);
    }, 500); // espera 500 ms

    return () => {
      clearTimeout(handler);
    };
  }, [filterName]);

  // Debounce para el código
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilterCode(filterCode);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filterCode]);


  return (
    <Stack direction="row" gap={1} alignItems="center" >
      <Box sx={{ display: 'flex', alignItems: 'flex-end', maxWidth:200 }}>
        <TextField
          label="Buscar por nombre"
          id="outlined-size-small"
          size="small"
          onChange={(event) => {
            setFilterName(event.target.value);
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', maxWidth:200}}>
        <TextField
          label="Buscar por código"
          id="outlined-size-small"
          size="small"
          onChange={(event) => {
            setFilterCode(event.target.value);
          }}
        />
      </Box>
    </Stack>
  )
}
