import { useState } from 'react'
import { MemoryService } from '/src/services/MemoryService'
import { Box, Button, Chip, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CommentIcon from '@mui/icons-material/Comment';
import BACKEND from '/src/data/backend';
import ModalStoreUpdateMemory from '/src/components/admin/memory/ModalStoreUpdateMemory';


export default function IndexMemory(){


    const {data:memories, mutate} = MemoryService.useAllMemories()

    // Modal crear editar categoria
    
    const [editMemory, setEditMemory] = useState(false);
    const [selectedMemory, setSelectedMemory] = useState({})
    
    const handleEditMemory = (group) => {
      setSelectedMemory(group)
      setEditMemory(true)
    };
    const handleCloseEditMemory = () => setEditMemory(false);

    return (

        <Box className="flex flex-col flex-1 overflow-hidden">
            <Modal
                open={editMemory}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleCloseEditMemory();
                    }
                }}
            >
                <ModalStoreUpdateMemory 
                    memory={selectedMemory}
                    onCancel={handleCloseEditMemory}
                    onUpdated={() => {
                        handleCloseEditMemory();
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
                    <CommentIcon color="primary" />
                    <Typography variant="h5" fontWeight="bold">
                        Memorias
                    </Typography>
                    <Chip variant="outlined" label={memories.length} color="primary" />
                </Stack>
                <Button 
                onClick={()=>handleEditMemory(null)} 
                variant="outlined" color="primary" startIcon={<AddCircleOutlineIcon />}>
                    Memoria
                </Button>
            </Box>


            <Paper sx={{ width: '100%', overflow: 'hidden', overflowY:'auto', p:1, border:"1px solid #ccc" }}>
            <TableContainer  sx={{ maxHeight: 'calc(100vh - 95px)', overflowY: 'auto', borderRadius: 2 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow >
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                            Id
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                        Nombre
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                            Descripción
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
                  {(memories || []).map((memory, index) => (
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
                        handleEditMemory(memory)
                      }}
                    >
                      
                        <TableCell><Typography variant="body2">{memory?.id}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{memory?.name}</Typography></TableCell>
                        <TableCell><Typography variant="body2">{memory?.description}</Typography></TableCell>
                        <TableCell>
                            <img
                              src={BACKEND.MEMORIES.URL + memory?.image}
                              alt={memory.name}
                              style={{ height: 80, objectFit: 'contain' }}
                            />
                      </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
    // <div className='overflow-y-hidden flex flex-col flex-1 pl-2 pb-2'>
    //     <div className='flex'>
    //                 <img src={IconComment} alt="save" className='w-8 h-8 pr-2' />
    //                 Comentarios de clientes
    //             </div>
    //             <Btn
    //                 icon={iconAdd}
    //                 text='Nuevo'
    //                 style='bg-green-500'
    //                 action={()=>setAdding(true)}
    //             />

        
    //     <div className="flex flex-1 relative w-full overflow-hidden pb-5 overflow-y-auto">
    //         <div className='w-full'>
                
    //         </div>
    //     </div>
        
    // </div>
  )
}