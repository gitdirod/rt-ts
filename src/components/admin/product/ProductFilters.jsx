import { Box, TextField, Stack } from '@mui/material';

export default function ProductFilters({ filterName, filterCode, onFilterNameChange, onFilterCodeChange }) {
  return (
    <Stack direction="row" gap={2}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', maxWidth: 200 }}>
        <TextField
          label="Buscar por nombre"
          size="small"
          value={filterName}
          onChange={(e) => onFilterNameChange(e.target.value)}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', maxWidth: 200 }}>
        <TextField
          label="Buscar por código"
          size="small"
          value={filterCode}
          onChange={(e) => onFilterCodeChange(e.target.value)}
        />
      </Box>
    </Stack>
  );
}
