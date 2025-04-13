import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination,
  TextField,
  Box
} from '@mui/material';

import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Stack from '@mui/material/Stack';


import { ProductService } from '/src/services/ProductService';
import { formatearDinero } from '/src/helpers';
import ImageTable from '/src/components/admin/ImageTable';
import BlockHeader from '/src/components/admin/BlockHeader';
import SearchIcon from '@mui/icons-material/Search';
import iconItem from '/src/static/icons/item.svg'
import { useNavigate } from 'react-router-dom';


export default function MiTablaConPaginacion() {

  const navigate = useNavigate()
  const addProduct =()=>{
    navigate(`/admin/inventory/storeProduct`)
  }
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [first, setFirst] = useState(0);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterName, setFilterName] = useState('')
  const [filterCode, setFilterCode] = useState('')

  const { data: products, totalRecords, loading, mutate } = ProductService.useProducts({
    page: Math.floor(first / rowsPerPage) + 1,
    perPage: rowsPerPage,
    name: filterName,
    code: filterCode,
    // categories: selectedCategories.map(sel => sel.id).join(','),
    // types: selectedTypes.map(sel => sel.id).join(','),
    sortField,
    sortOrder
  });

  console.log(products)

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


  useEffect(() => {
    const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);
    if (page >= totalPages && totalPages > 0) {
      setPage(totalPages - 1);
      setFirst((totalPages - 1) * rowsPerPage);
    }
  }, [totalRecords, rowsPerPage, page]);
  

  return (
    <div className="overflow-y-hidden flex flex-col flex-1 pb-2">
            <BlockHeader
              middle = {(
                <div className='flex items-center'>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Nombre" variant="standard" 
                      onChange={(event) => {
                        setFilterName(event.target.value);
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Código" variant="standard"
                      onChange={(event) => {
                        setFilterCode(event.target.value);
                      }}
                    />
                  </Box>

                </div>
              )}
                  name={  
                  <div className='flex'>
                    <img src={iconItem} alt="save" className='w-8 h-8 pr-2' />
                      Productos ({totalRecords || 0})
                  </div>
                  }
                  
              >
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" color="success" startIcon={<AddCircleOutlineIcon />} onClick={addProduct} >
                    Nuevo
                  </Button>
                </Stack>
              </BlockHeader>
      <div className='flex flex-1 relative w-full overflow-hidden pb-5 overflow-y-auto ' >
        <div className=' w-full absolute '>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell><span className='font-bold'>Código</span></TableCell>
                    <TableCell><span className='font-bold'>Nombre</span></TableCell>
                    <TableCell><span className='font-bold'>Grupo - Categoría</span></TableCell>
                    <TableCell><span className='font-bold'>Tipo</span></TableCell>
                    <TableCell><span className='font-bold'>Precio</span></TableCell>
                    <TableCell><span className='font-bold'>Imagen</span></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(products || []).map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product?.code}</TableCell>
                      <TableCell>{product?.name}</TableCell>
                      <TableCell><span>{`${product?.group?.name} - ${product?.category.name}`}</span></TableCell>
                      <TableCell>{product?.type_product?.name}</TableCell>
                      <TableCell>{formatearDinero(product?.price)}</TableCell>
                      <TableCell>
                        <ImageTable 
                          images={product?.images}
                          url={import.meta.env.VITE_API_URL + "/products/"}
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
              rowsPerPageOptions={[5, 10, 25]}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
}
