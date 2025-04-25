import { SuggestionService } from '/src/services/SuggestionService'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Stack, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';

export default function IndexSuggested() {

    const {data:suggestions}= SuggestionService.useAllSuggestions()

    
    const handleAddProduct = (group)=>{
        console.log(group.name)
    }
    
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
                    <StarPurple500Icon color="primary" />
                    <Typography variant="h5" fontWeight="bold">
                        Productos sugeridos
                    </Typography>
                    <Chip label={suggestions.length} color="primary" />
                </Stack>
                <Button 
                // onClick={()=>handleEditGroup(null)} 
                variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>
                    Grupo
                </Button>
            </Box>

            <Box sx={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', pr: 1 }}>
                {suggestions.map((group) => (
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
                            label={`${group?.productos?.length || 0}`}
                            size="small"
                            color="primary"
                            sx={{ fontSize: '0.75rem', height: 20 }}
                            />
                        </Box>
        
                        <EditIcon 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddProduct(group);
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
                        {group.products?.length ? (
                        <TableContainer sx={{ borderRadius: 1, overflow: 'hidden', border:"1px solid #ccc" }}>
                            <Table size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'grey.100' }}>
                                <TableCell>Id</TableCell>
                                <TableCell>Nombre</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {group.products.map((cat) => (
                                <TableRow key={cat.id} 
                                // onClick={()=>handleEditCategory(cat)} 
                                sx={{cursor:'pointer'}} hover>
                                    <TableCell>{cat.name}</TableCell>
                                    
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        ) : (
                        <Typography variant="body2" color="text.secondary">Este grupo no tiene productos.</Typography>
                        )}
                    </AccordionDetails>
                    </Accordion>
                ))}
                </Box>
        </Box>
    )
}

