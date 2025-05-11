import { useState } from 'react';
import {
  Box, Button, Chip, Modal, Paper, Stack,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BACKEND from '/src/data/backend';
import { LandingService } from '/src/services/LandingService';
import { formatearFecha } from '/src/helpers';
import VrpanoOutlinedIcon from '@mui/icons-material/VrpanoOutlined';
import DeviceTypeIcon from '/src/components/admin/landing/DeviceTypeIcon';
import ModalStoreLanding from '/src/components/admin/landing/ModalStoreLanding';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ConfirmDialog from '/src/components/admin/common/ConfirmDialog';


export default function IndexMemory() {
  const { data: landings, mutate } = LandingService.useAllLandings(true);

  const [uploadLanding, setUploadLanding] = useState(false);
  const closeModalUploadLanding = () => setUploadLanding(false);

  const [errores, setErrores] = useState({});
  const [landingToDelete, setLandingToDelete] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteClick = (landing) => {
    setLandingToDelete(landing);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!landingToDelete) return;

    const response = await LandingService.delete(landingToDelete.id);

    if (response.success) {
      setErrores({});
      mutate();
    } else {
      setErrores(response.errors);
    }

    setLandingToDelete(null);
    setConfirmOpen(false);
  };

  return (
    <Box className="flex flex-col flex-1 overflow-hidden">
      <Modal
        open={uploadLanding}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') closeModalUploadLanding();
        }}
      >
        <ModalStoreLanding
          onCancel={closeModalUploadLanding}
          onUpdated={() => {
            closeModalUploadLanding();
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
          border: '1px solid #ccc',
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
          onClick={() => setUploadLanding(true)}
          variant="outlined"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
        >
          Landing
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden', overflowY: 'auto', p: 1, border: '1px solid #ccc' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 95px)', borderRadius: 2 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle2" color="text.secondary">Id</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" color="text.secondary">Tipo</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" color="text.secondary">Imagen</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" color="text.secondary">Creado</Typography></TableCell>
                <TableCell><Typography variant="subtitle2" color="text.secondary">Eliminar</Typography></TableCell>
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
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
                  }}
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
                  <TableCell>
                    <DeleteOutlineIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(landing);
                      }}
                      sx={{
                        ml: 2,
                        fontSize: 20,
                        cursor: 'pointer',
                        color: 'grey.500',
                        transition: 'color 0.2s ease-in-out',
                        '&:hover': { color: 'primary.main' },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar landing?"
        description="Esta acción eliminará el landing permanentemente."
        confirmText="Eliminar"
      />
    </Box>
  );
}
