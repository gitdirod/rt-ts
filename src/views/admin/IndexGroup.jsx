import { useState } from 'react';
import {
  Box, Typography, Accordion, AccordionSummary, AccordionDetails,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button, Stack,
  Modal
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CategoryIcon from '@mui/icons-material/Category';

import { GroupService } from '/src/services/GroupService';
import EditIcon from '@mui/icons-material/Edit';
import BACKEND from '/src/data/backend';
import ModalStoreUpdateGroup from '/src/components/admin/modals/ModalStoreUpdateGroup';
import ModalStoreUpdateCategory from '/src/components/admin/modals/ModalStoreUpdateCategory';

export default function IndexGroupAccordion() {
  const { data: groups, mutate } = GroupService.useAllGroups();

//  Modal crear editar grupo  
  const [editGroup, setEditGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({})
  
  const handleEditGroup = (group) => {
    setSelectedGroup(group)
    setEditGroup(true)
  };
  const handleCloseEditGroup = () => setEditGroup(false);

// Modal crear editar categoria

const [editCategory, setEditCategory] = useState(false);
const [selectedCategory, setSelectedCategory] = useState({})

const handleEditCategory = (group) => {
  setSelectedCategory(group)
  setEditCategory(true)
};
const handleCloseEditCategory = () => setEditCategory(false);


  return (
    <Box className="flex flex-col flex-1 overflow-hidden">
        <Modal
            open={editCategory}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    handleCloseEditCategory();
                }
            }}
        >
            <ModalStoreUpdateCategory 
                category={selectedCategory}
                onCancel={handleCloseEditCategory}
                onUpdated={() => {
                    handleCloseEditCategory();
                mutate();
                }}
            />
        </Modal>
        <Modal
            open={editGroup}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    handleCloseEditGroup();
                }
            }}
        >
            <ModalStoreUpdateGroup 
                group={selectedGroup}
                onCancel={handleCloseEditGroup}
                onUpdated={() => {
                    handleCloseEditGroup();
                mutate();
                }}
            />
        </Modal>
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
        <Stack direction="row" gap={2}>
            <Button onClick={()=>handleEditGroup(null)} variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>
            Grupo
            </Button>
            <Button onClick={()=>handleEditCategory(null)} variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>
            Categoría
            </Button>
        </Stack>
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography fontWeight="medium">{group.name}</Typography>
                    <Chip
                    label={`${group?.categories?.length || 0}`}
                    size="small"
                    color="primary"
                    sx={{ fontSize: '0.75rem', height: 20 }}
                    />
                </Box>

                <EditIcon 
                    onClick={(e) => {
                    e.stopPropagation();
                    handleEditGroup(group);
                    }}
                    sx={{ 
                    ml: 2, 
                    fontSize: 20, 
                    cursor: 'pointer', 
                    color: 'grey.500',
                    transition: 'color 0.2s ease-in-out',
                    '&:hover': {
                        color: 'primary.main',
                    }
                    }} 
                />
</Box>

            </AccordionSummary >
            
            <AccordionDetails>
              {group.categories?.length ? (
                <TableContainer sx={{ borderRadius: 1, overflow: 'hidden', border:"1px solid #ccc" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: 'grey.100' }}>
                        <TableCell>Categoría</TableCell>
                        <TableCell>Productos</TableCell>
                        <TableCell>Imagen</TableCell>
                        <TableCell>¿Sugerida?</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {group.categories.map((cat) => (
                        <TableRow key={cat.id} onClick={()=>handleEditCategory(cat)} sx={{cursor:'pointer'}} hover>
                          <TableCell>{cat.name}</TableCell>
                          <TableCell>{cat.products}</TableCell>
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
