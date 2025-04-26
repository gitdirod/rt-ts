import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination,
  TextField,
  Box,
  Typography,
  Select,
  Chip,
  MenuItem,
  ListSubheader,
  FormControl,
  InputLabel
} from '@mui/material';

import Stack from '@mui/material/Stack';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


import BACKEND from '/src/data/backend';
import { ProductService } from '/src/services/ProductService';
import { formatearDinero } from '/src/helpers';
import ImageTable from '/src/components/admin/ImageTable';
import { GroupService } from '/src/services/GroupService';
import { TypeService } from '/src/services/TypeService';

export default function MiTablaConPaginacion() {
 
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [first, setFirst] = useState(0);
    const [sortField, setSortField] = useState('id');
    const [sortOrder, setSortOrder] = useState('desc');
    const [filterName, setFilterName] = useState('')
    const [filterCode, setFilterCode] = useState('')

    const [selectedProduct, setSelectedProduct] = useState({})

    const [debouncedFilterName, setDebouncedFilterName] = useState('');
    const [debouncedFilterCode, setDebouncedFilterCode] = useState('');

    const {data:groups} = GroupService.useAllGroups()
    const {data:types} = TypeService.useAllTypes()

    const { data: products, totalRecords, loading, mutate } = ProductService.useProducts({
        page: Math.floor(first / rowsPerPage) + 1,
        perPage: rowsPerPage,
        name: debouncedFilterName,
        code: debouncedFilterCode,
        categories: [],
        types: [],
        group_id: '',
        // categories: selectedCategories.map(sel => sel.id).join(','),
        // types: selectedTypes.map(sel => sel.id).join(','),
        sortField,
        sortOrder
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setFirst(newPage * rowsPerPage);
    };
    

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        setFirst(0);
    };
    

    const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);
    const currentPage = Math.min(page, totalPages - 1 >= 0 ? totalPages - 1 : 0);

    const [edit, setEdit] = useState(false);

    const handleAddProduct = (product) => {
        
    };
    
        //   Filtros
    const [categoryIds, setCategoryIds] = useState([]);
    const [typeId, setTypeId] = useState('')


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


    useEffect(() => {
        const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);
        if (page >= totalPages && totalPages > 0) {
        setPage(totalPages - 1);
        setFirst((totalPages - 1) * rowsPerPage);
        }
    }, [totalRecords, rowsPerPage, page]);
    

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, overflow: 'hidden' }}>
            <Box sx={{display:'flex', flexDirection:'column', pr:1, pt:1, borderRadius:1, justifyContent:'space-between', alignItems:'center'}}>
            
            <Stack gap={1} alignItems="center" >
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
                <FormControl variant="standard" sx={{ mb: 2, width:200 }}>
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
                <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Tipo de producto</InputLabel>
                    <Select
                    value={typeId}
                    label="Tipo"
                    onChange={(e) => setTypeId(e.target.value)}
                    >
                    <MenuItem value="">
                        <em>Seleccionar</em>
                    </MenuItem>
                    {types?.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                        {type.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Stack>
            </Box>
        

            <Paper sx={{ width: '100%', overflow: 'hidden', overflowY:'auto', p:1, border:"1px solid #ccc" }}>
                <TableContainer  sx={{ maxHeight: 'calc(100vh - 145px)', overflowY: 'auto', borderRadius: 2 }}>
                <Table stickyHeader>
                    <TableHead>
                    <TableRow >
                        <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                            Dis.
                        </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                        Código
                        </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                            Nombre
                        </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                            Grupo & Caategoria
                        </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                            Tipo
                        </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                            Precio
                        </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                            Imagen
                        </Typography></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {(products || []).map((product, index) => (
                        <TableRow 
                        key={index}
                        hover
                        sx={{
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease-in-out',
                            '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.05)', // claro en light mode
                            }
                        }}
                        onClick={() => {
                            handleAddProduct(product)
                        }}
                        // onContextMenu={(e) => {
                        //   e.preventDefault(); //  evitar que se abra el menú por defecto
                            
                        // }}
                        >
                        <TableCell>{product?.available ? <CheckCircleOutlinedIcon color='primary'/> : <CancelOutlinedIcon sx={{color:'grey.600'}} /> }</TableCell>
                        <TableCell><Typography variant="body2">{product?.code}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{product?.name}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{`${product?.group?.name} - ${product?.category.name}`}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{product?.type_product?.name}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{formatearDinero(product?.price)}</Typography></TableCell>
                        <TableCell>
                            <ImageTable 
                            images={product?.images}
                            url={BACKEND.PRODUCTS.URL}
                            higth={14}
                            count={true}
                            />
                        </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={totalRecords || 0}
                    page={currentPage}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
