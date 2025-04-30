import { ToggleButton, ToggleButtonGroup, IconButton, Tooltip, Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

export default function SelectActionMode({ mode, onChange, onAddAll, onRemoveAll }) {
  const handleChange = (event, newMode) => {
    if (newMode !== null) onChange(newMode);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleChange}
        size="small"
      >
        <ToggleButton
          value="add"
          sx={{
            color: mode === 'add' ? 'primary.main' : 'text.secondary',
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              }
            },
          }}
        >
          <AddCircleOutlineIcon sx={{ mr: 1 }} />
          Agregar
        </ToggleButton>

        <ToggleButton
          value="remove"
          sx={{
            color: mode === 'remove' ? 'error.main' : 'text.secondary',
            '&.Mui-selected': {
              backgroundColor: 'error.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'error.dark',
              }
            },
          }}
        >
          <DeleteOutlineIcon sx={{ mr: 1 }} />
          Eliminar
        </ToggleButton>
      </ToggleButtonGroup>

      <Tooltip title="Agregar todos los productos visibles">
        <IconButton
          color="primary"
          onClick={onAddAll}
          size="small"
          sx={{
            border: '1px solid',
            borderColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.light',
            }
          }}
        >
          <PlaylistAddCheckIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Eliminar todos los productos visibles">
        <IconButton
          color="error"
          onClick={onRemoveAll}
          size="small"
          sx={{
            border: '1px solid',
            borderColor: 'error.main',
            '&:hover': {
              backgroundColor: 'error.light',
            }
          }}
        >
          <PlaylistRemoveIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
