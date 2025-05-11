import { useState } from 'react'
import { Box, Button, Chip, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BACKEND from '/src/data/backend';
import { LandingService } from '/src/services/LandingService';
import { formatearFecha } from '/src/helpers';
import VrpanoOutlinedIcon from '@mui/icons-material/VrpanoOutlined';
import DeviceTypeIcon from '/src/components/admin/landing/DeviceTypeIcon';
import ModalStoreLanding from '/src/components/admin/landing/ModalStoreLanding';
export default function IndexMemory(){


    const {data:landings}= LandingService.useAllLandings(true)
    
    const [uploadLanding, setUploadLanding] = useState(false);
    const handleCloseEditMemory = () => setUploadLanding(false);

    return (

        <Box className="flex flex-col flex-1 overflow-hidden">
            <Modal
                open={uploadLanding}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleCloseEditMemory();
                    }
                }}
            >
                <ModalStoreLanding
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
                    <VrpanoOutlinedIcon color="primary" />
                    <Typography variant="h5" fontWeight="bold">
                        Landings
                    </Typography>
                    <Chip variant="outlined" label={landings.length} color="primary" />
                </Stack>
                <Button 
                onClick={()=>setUploadLanding(true)} 
                variant="outlined" color="primary" startIcon={<AddCircleOutlineIcon />}>
                    Landing
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
                            Tipo
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                            Imagen
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle2" color="text.secondary">
                            Creado
                        </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(landings || []).map((landing, index) => (
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
                    //   onClick={() => {
                    //     handleEditMemory(landing)
                    //   }}
                    >
                      
                        <TableCell><Typography variant="body2">{landing?.id}</Typography></TableCell>
                        <TableCell><DeviceTypeIcon type={landing?.type} /></TableCell>
                        <TableCell>
                            <img
                              src={BACKEND.LANDINGS.URL + landing?.name}
                              alt={landing.name}
                              style={{ height: 80, objectFit: 'contain' }}
                            />
                        </TableCell>
                        <TableCell><Typography variant="body2">{formatearFecha(landing?.created_at)}</Typography></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

  )
}