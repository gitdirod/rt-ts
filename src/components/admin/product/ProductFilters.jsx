import React, { useEffect, useState } from 'react';
import { Box, Stack, TextField, Button, Popover, MenuItem, ListSubheader, InputLabel, FormControl, Select, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { GroupService } from '/src/services/GroupService';

export default function ProductFilters({ handleDebouncedFilterName, handleDebouncedFilterCode, handleChangeCategories }) {
  const [anchorEl, setAnchorEl] = useState(null);   // Controla si el popover está abierto

  const {data:groups} = GroupService.useAllGroups()

  //   Filtros
  const [categoryIds, setCategoryIds] = useState([]);
  const [typeId, setTypeId] = useState('')
  const [filterName, setFilterName] = useState('');
  const [filterCode, setFilterCode] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



  useEffect(() => {
    const handler = setTimeout(() => {
      handleDebouncedFilterName(filterName);
    }, 500);
    return () => clearTimeout(handler);
  }, [filterName]);

  useEffect(() => {
    const handler = setTimeout(() => {
      handleDebouncedFilterCode(filterCode);
    }, 500);
    return () => clearTimeout(handler);
  }, [filterCode]);

  useEffect(() => {
    handleChangeCategories(categoryIds)
  },[categoryIds])

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

          <FormControl variant="standard" sx={{ mb: 2, width:1 }}>
            <InputLabel>Categorías</InputLabel>
            <Select
              multiple
              value={categoryIds} // ahora es un array
              label="Categoría"
              onChange={(e) => setCategoryIds(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
              renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((id) => {
                  const category = groups.flatMap(group => group.categories).find(cat => cat.id === id);
                  return <Chip key={id} label={category?.name || id} />;
                })}
              </Box>
              )}
            >
              <MenuItem value="">
              <em>Seleccionar categoría</em>
              </MenuItem>

              {groups?.map((group) => (
              [
                <ListSubheader key={`group-${group.id}`}>{group.name}</ListSubheader>,
                group.categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                    {category.name}
                </MenuItem>
                ))
              ]
              ))}
            </Select>
        </FormControl>
        </Box>
      </Popover>
    </>
  );
}
