import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function SelectActionMode({ mode, onChange }) {
  const handleChange = (event, newMode) => {
    if (newMode !== null) onChange(newMode);
  };

  return (
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
  );
}
