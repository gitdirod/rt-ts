import { useState } from 'react'
import IsLoading from '/src/components/store/common/IsLoading'
import { Box, Button, Chip, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TypeService } from '/src/services/TypeService'
import BACKEND from '/src/data/backend';
import ModalStoreUpdateType from '/src/components/admin/type/ModalStoreUpdateType';



export default function IndexType(){

    const{data:types, mutate} = TypeService.useAllTypes(true)

    //  Modal crear editar grupo  
      const [editType, setEditType] = useState(false);
      const [selectedType, setSelectedType] = useState({})
      
      const handleEditType = (type) => {
        setSelectedType(type)
        setEditType(true)
      };
      const handleCloseEditType = () => setEditType(false);


    if(types === undefined) return(<IsLoading/>)

    return (
        <Box className="flex flex-col flex-1 overflow-hidden">
            <Modal
                open={editType}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleCloseEditType();
                    }
                }}
            >
                <ModalStoreUpdateType 
                    type={selectedType}
                    onCancel={handleCloseEditType}
                    onUpdated={() => {
                        handleCloseEditType();
                    mutate();
                    }}
                />
        </Modal>

            {/* Cabecera de la pagina, indica el titulo y las opciones para agregar */}
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
                    <LocalOfferRoundedIcon color="primary" />
                    <Typography variant="h5" fontWeight="bold">
                        Tipos de productos
                    </Typography>
                    <Chip variant="outlined" label={types.length} color="primary" />
                </Stack>
                <Button onClick={()=>handleEditType(null)} variant="outlined" color="primary" startIcon={<AddCircleOutlineIcon />}>
                    Tipo de producto
                </Button>
            </Box>


            <Paper sx={{ width: '100%', overflow: 'hidden', overflowY:'auto', p:1, border:"1px solid #ccc" }}>
            <TableContainer  sx={{ maxHeight: 'calc(100vh - 95px)', overflowY: 'auto', borderRadius: 2 }}>
              <Table stickyHeader>
                <TableHead>
                    <TableRow >
                        <TableCell>
                            <Typography variant="subtitle2" color="text.secondary">
                                ID
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" color="text.secondary">
                                Nombre
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" color="text.secondary">
                                Imagen
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {(types || []).map((type, index) => (
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
                        handleEditType(type)
                      }}
                    >
                        <TableCell><Typography variant="body2">{type?.id}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{type?.name}</Typography></TableCell>
                        <TableCell>
                            <img
                                src={BACKEND.ICONS.URL + type?.image}
                                alt={type.name}
                                style={{ height: 40, objectFit: 'contain' }}
                            />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>


        </Box>

  )
}