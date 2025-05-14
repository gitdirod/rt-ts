import { useState } from 'react';
import { SuggestionService } from '/src/services/SuggestionService';
import {
    Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Modal, Stack,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BACKEND from '/src/data/backend';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { SuggestedService } from '/src/services/SuggestedService';
import { Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ModalStoreUpdateSuggestion from '/src/components/admin/suggestion/ModalStoreUpdateSuggestion';
import SelectProductsDialog from '/src/components/admin/product/SelectProductsDialog';
import ImageProductTable from '/src/components/admin/product/ImageProductTable';



export default function IndexSuggested() {
    const { data: suggestions, mutate } = SuggestionService.useAllSuggestions();

    // Control del Dialog de selección
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const [errores, setErrores] = useState({});

    const handleAddProduct = (group) => {
        setSelectedGroup(group);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedGroup(null);
        mutate()
    };

    
    

    const handleDeleteProductToGroup = async (product, group) => {
        
        const deleteSuggested = {
            product_id: product.id,
            suggestion_id: group.id
        }
        const response = await SuggestedService.create(deleteSuggested);
                
                
        if (response.success) {
            setErrores({})
            mutate()

        } else {
            setErrores(response.errors)
        }
    };

    //  Modal crear editar grupo  
      const [editSuggestion, setEditSuggestion] = useState(false);
      const [selectedSuggestion, setSelectedSuggestion] = useState({})
      
      const handleEditSuggestion = (group) => {
        setSelectedSuggestion(group)
        setEditSuggestion(true)
      };
      const handleCloseEditSuggestion = () => setEditSuggestion(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>

            <Modal
                open={editSuggestion}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleCloseEditSuggestion();
                    }
                }}
            >
                <ModalStoreUpdateSuggestion 
                    group={selectedSuggestion}
                    onCancel={handleCloseEditSuggestion}
                    onUpdated={() => {
                        handleCloseEditSuggestion();
                    mutate();
                    }}
                />
            </Modal>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1,
                my: 1,
                bgcolor: 'white',
                borderRadius: 1,
                border: '1px solid #ccc'
            }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <StarPurple500Icon color="primary" />
                    <Typography variant="h5" fontWeight="bold">
                        Productos sugeridos
                    </Typography>
                    <Chip variant="outlined" label={suggestions.length} color="primary" />
                </Stack>
                <Button onClick={()=>handleEditSuggestion(null)} variant="outlined" color="primary" startIcon={<AddCircleOutlineIcon />}>
                    Grupo
                </Button>
            </Box>

            {/* Lista de grupos */}
            <Box sx={{ maxHeight: 'calc(100vh - 95px)', overflowY: 'auto', pr: 1 }}>
                {suggestions.map((sug) => (
                    <Accordion key={sug.id} disableGutters square={false} sx={{
                        mb: 1,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        boxShadow: '0px 1px 3px rgba(0,0,0,0.05)',
                        '&:before': { display: 'none' },
                        overflow: 'hidden',
                    }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography fontWeight="medium">{sug.name}</Typography>
                                    <Chip variant="outlined" label={`${sug?.products?.length || 0}`} size="small" color="primary" sx={{ fontSize: '0.75rem', height: 20 }} />
                                </Box>
                                <Stack direction="row">
                                    <Tooltip title="Renombrar grupo" arrow>
                                        <EditIcon
                                            onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditSuggestion(sug);
                                            }}
                                            sx={{
                                            ml: 2,
                                            fontSize: 20,
                                            cursor: 'pointer',
                                            color: 'grey.500',
                                            transition: 'color 0.2s ease-in-out',
                                            '&:hover': { color: 'primary.main' }
                                            }}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Agregar producto" arrow>
                                        <AddCircleOutlineIcon
                                            onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddProduct(sug);
                                            }}
                                            sx={{
                                            ml: 2,
                                            fontSize: 20,
                                            cursor: 'pointer',
                                            color: 'grey.500',
                                            transition: 'color 0.2s ease-in-out',
                                            '&:hover': { color: 'primary.main' }
                                            }}
                                        />
                                    </Tooltip>
                                </Stack>

                            </Box>
                        </AccordionSummary>

                        <AccordionDetails>
                            {sug.products?.length ? (
                                <TableContainer sx={{ borderRadius: 1, overflow: 'hidden', border: "1px solid #ccc" }}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: 'grey.100' }}>
                                                <TableCell>Id</TableCell>
                                                <TableCell>Código</TableCell>
                                                <TableCell>Nombre</TableCell>
                                                <TableCell>Imagen</TableCell>
                                                <TableCell>Eliminar</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {sug.products.map((pro) => (
                                                <TableRow key={pro.id} sx={{ cursor: 'pointer' }} hover>
                                                    <TableCell>{pro.id}</TableCell>
                                                    <TableCell>{pro.code}</TableCell>
                                                    <TableCell>{pro.name}</TableCell>
                                                    <TableCell>
                                                        <ImageProductTable 
                                                            images={pro?.images}
                                                            url={BACKEND.PRODUCTS.URL}
                                                            higth={20}
                                                            count={false}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <DeleteOutlineIcon
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteProductToGroup(pro, sug);
                                                            }}
                                                            sx={{
                                                                ml: 2,
                                                                fontSize: 20,
                                                                cursor: 'pointer',
                                                                color: 'grey.500',
                                                                transition: 'color 0.2s ease-in-out',
                                                                '&:hover': { color: 'primary.main' }
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    Este grupo no tiene productos.
                                </Typography>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

            {/* Dialog separado para seleccionar productos */}
            <SelectProductsDialog
                open={openDialog}
                onClose={handleCloseDialog}
                group={selectedGroup}
            />
        </Box>
    )
}
