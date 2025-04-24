import { useState } from 'react';
import {
  Box, Typography, Accordion, AccordionSummary, AccordionDetails,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, Button, Stack
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CategoryIcon from '@mui/icons-material/Category';

import { GroupService } from '/src/services/GroupService';
import { CategoryService } from '/src/services/CategoryService';
import BACKEND from '/src/data/backend';
import IsLoading from '/src/components/store/common/IsLoading';

export default function IndexGroupAccordion() {
  const { data: groups } = GroupService.useAllGroups();
  const { data: categories } = CategoryService.useAllCategories();

  if (!groups) return <IsLoading />;

  return (
    <Box className="flex flex-col flex-1 overflow-hidden">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 1,
          my: 1,
          bgcolor: 'white',
          borderRadius: 1,
          border: '1px solid #ccc'
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <CategoryIcon color="primary" />
          <Typography variant="h5" fontWeight="bold">
            Grupos y Categorías
          </Typography>
          <Chip label={groups.length} color="primary" />
        </Stack>
        <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>
          Nuevo
        </Button>
      </Box>

      <Box sx={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', pr: 1 }}>
        {groups.map((group) => (
          <Accordion
          key={group.id}
          disableGutters
          square={false}
          sx={{
            mb: 1,
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            boxShadow: '0px 1px 3px rgba(0,0,0,0.05)',
            '&:before': { display: 'none' },
            overflow: 'hidden', // <- importante para que el borderRadius afecte a todo
          }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">{group.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {group.categories?.length ? (
                <TableContainer sx={{ borderRadius: 1, overflow: 'hidden', border:"1px solid #ccc" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: 'grey.100' }}>
                        <TableCell><strong>Categoría</strong></TableCell>
                        <TableCell><strong>Imagen</strong></TableCell>
                        <TableCell><strong>¿Sugerida?</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {group.categories.map((cat) => (
                        <TableRow key={cat.id} hover>
                          <TableCell>{cat.name}</TableCell>
                          <TableCell>
                            <img
                              src={BACKEND.CATEGORIES.URL + cat?.images?.[0]?.name}
                              alt={cat.name}
                              style={{ height: 40, objectFit: 'contain' }}
                            />
                          </TableCell>
                          <TableCell>
                            {cat.suggested ? (
                              <Chip label="Sí" color="success" size="small" />
                            ) : (
                              <Chip label="No" color="default" size="small" />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" color="text.secondary">Este grupo no tiene categorías.</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
