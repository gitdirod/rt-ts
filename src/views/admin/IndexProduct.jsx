import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination
} from '@mui/material';
import { ProductService } from '/src/services/ProductService';
import { formatearDinero } from '/src/helpers';
import ImageTable from '/src/components/admin/ImageTable';
import BlockHeader from '/src/components/admin/BlockHeader';
import LabelSimpleWithoutLine from '/src/components/admin/LabelSimpleWithoutLines';
import LinkBtn from '/src/components/admin/LinkBtn';
import iconSearch from '/src/static/icons/search.svg'
import add from '/src/static/icons/add.svg'
import iconItem from '/src/static/icons/item.svg'
import ok from '/src/static/icons/ok.svg'
import close from '/src/static/icons/close.svg'

export default function MiTablaConPaginacion() {
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [first, setFirst] = useState(0);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');

  const { data: products, totalRecords, loading, mutate } = ProductService.useProducts({
    page: Math.floor(first / rowsPerPage) + 1,
    perPage: rowsPerPage,
    name: '',
    code: '',
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
                <div>
                  <LabelSimpleWithoutLine
                    icon={iconSearch}
                    // name='Buscar:'
                  >
                    <input 
                      type="text" 
                      placeholder='Buscar...'
                      className=""
                    />
                  </LabelSimpleWithoutLine>
                </div>
              )}
                  name={  
                  <div className='flex'>
                    <img src={iconItem} alt="save" className='w-8 h-8 pr-2' />
                      Productos ({totalRecords || 0})
                  </div>
                  }
                  
              >
                <LinkBtn
                    to='/admin/inventory/storeProduct'
                    icon={add}
                    text='Nuevo'
                    imageColor='white'
                    style='bg-cyanPrimary'
                />
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
