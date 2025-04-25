import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Box,
    CircularProgress
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ProductService } from '/src/services/ProductService';
import { SuggestedService } from '/src/services/SuggestedService';

export default function SelectProductsDialog({ open, onClose, group }) {
    const rowsPerPage = 10;

    // Estados de búsqueda
    const [filterName, setFilterName] = useState('');
    const [filterCode, setFilterCode] = useState('');
    const [debouncedFilterName, setDebouncedFilterName] = useState('');
    const [debouncedFilterCode, setDebouncedFilterCode] = useState('');

    const [errores, setErrores] = useState({});

    // Paginación
    const [first, setFirst] = useState(0); // es el index del primer item
    const page = Math.floor(first / rowsPerPage) + 1;

    // Cargar productos no sugeridos
    const { data: products, totalRecords, loading, mutate } = ProductService.useNoSuggestedProducts({
        page,
        perPage: rowsPerPage,
        name: debouncedFilterName,
        code: debouncedFilterCode,
        sortField: 'id',
        sortOrder: 'desc'
    });

    // Debounce para nombre
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilterName(filterName);
        }, 500);
        return () => clearTimeout(handler);
    }, [filterName]);

    // Debounce para código
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilterCode(filterCode);
        }, 500);
        return () => clearTimeout(handler);
    }, [filterCode]);

    // Al cerrar, limpiar filtros
    const handleClose = () => {
        setFilterName('');
        setFilterCode('');
        setDebouncedFilterName('');
        setDebouncedFilterCode('');
        setFirst(0);
        onClose();
    };

    const handleAddProductToGroup = async (product) => {
        
        const newSuggested = {
            product_id: product.id,
            suggestion_id: group.id
        }
        const response = await SuggestedService.create(newSuggested);
              
                
        if (response.success) {
            setErrores({})
            handleClose();
            mutate()

        } else {
            setErrores(response.errors)
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Agregar productos al grupo: {group?.name}
            </DialogTitle>

            <DialogContent dividers>

                {/* Buscadores */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                        label="Buscar por nombre"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                        fullWidth
                        size="small"
                    />
                    <TextField
                        label="Buscar por código"
                        value={filterCode}
                        onChange={(e) => setFilterCode(e.target.value)}
                        fullWidth
                        size="small"
                    />
                </Box>

                {/* Tabla de productos */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {products?.length ? (
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Código</TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Acción</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow key={product.id} hover>
                                                <TableCell>{product.id}</TableCell>
                                                <TableCell>{product.code}</TableCell>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() => handleAddProductToGroup(product)}
                                                    >
                                                        Agregar
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No hay productos disponibles para agregar.
                            </Typography>
                        )}
                    </>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
