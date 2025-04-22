import {
  Box, Typography, Button, TextField, Stack, Card, CardContent, Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useRef, useState, useEffect, memo } from 'react';
import { useAuth } from '/src/hooks/useAuth';
import { ADDRESSES_TYPES } from '/src/data/addressesTypes';
import useAdmin from '/src/hooks/useAdmin';
import BACKEND from '/src/data/backend';

const TarjetEnvoice = ({ children, envoiceAddress, envoice = true }) => {
  const { userMutate, isLoading } = useAuth({ middleware: 'auth', url: '/' });
  const { newCreate } = useAdmin();

  const [formOpen, setFormOpen] = useState(false);

  const nameRef = useRef();
  const cityRef = useRef();
  const addressRef = useRef();
  const [ccruc, setCcruc] = useState('');
  const [phone, setPhone] = useState('');
  const [errores, setErrores] = useState({});

  useEffect(() => {
    setCcruc(envoiceAddress?.ccruc ?? '');
    setPhone(envoiceAddress?.phone ?? '');
  }, [envoiceAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = {
      type: envoice ? ADDRESSES_TYPES.ENVOICE : ADDRESSES_TYPES.SEND,
      people: nameRef.current.value,
      ccruc: ccruc.replace(/\s+/g, ''),
      city: cityRef.current.value,
      address: addressRef.current.value,
      phone: phone.replace(/\s+/g, '')
    };

    const response = await newCreate(BACKEND.ADDRESSES.KEY, sendData);
    if (response.success) {
      setErrores({});
      userMutate();
      setFormOpen(false);
    } else {
      setErrores(response.errors);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        {children}

        {!formOpen && Object.keys(envoiceAddress).length > 0 ? (
          <>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={1}>
              <Typography variant="subtitle1"><strong>Nombre:</strong> {envoiceAddress?.people}</Typography>
              <Typography variant="subtitle1"><strong>CC o RUC:</strong> {envoiceAddress?.ccruc}</Typography>
              <Typography variant="subtitle1"><strong>Teléfono:</strong> {envoiceAddress?.phone}</Typography>
              <Typography variant="subtitle1"><strong>Ciudad:</strong> {envoiceAddress?.city}</Typography>
              <Typography variant="subtitle1"><strong>Dirección:</strong> {envoiceAddress?.address}</Typography>
            </Stack>
            <Button
              startIcon={<EditIcon />}
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => setFormOpen(true)}
            >
              Actualizar
            </Button>
          </>
        ) : (
          !formOpen && (
            <Button
              startIcon={<AddIcon />}
              onClick={() => setFormOpen(true)}
              sx={{ mt: 2 }}
              color={envoice ? 'primary' : 'secondary'}
              variant="outlined"
            >
              {envoice ? 'Agregar datos de facturación' : 'Agregar datos de envío'}
            </Button>
          )
        )}

        {formOpen && (
          <Box component="form" mt={3} onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Nombre"
                defaultValue={envoiceAddress?.people}
                inputRef={nameRef}
                error={!!errores.people}
                helperText={errores.people}
                fullWidth
              />
              <TextField
                label="CC o RUC"
                value={ccruc}
                onChange={(e) => setCcruc(e.target.value)}
                error={!!errores.ccruc}
                helperText={errores.ccruc}
                fullWidth
              />
              <TextField
                label="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={!!errores.phone}
                helperText={errores.phone}
                fullWidth
              />
              <TextField
                label="Ciudad"
                defaultValue={envoiceAddress?.city}
                inputRef={cityRef}
                error={!!errores.city}
                helperText={errores.city}
                fullWidth
              />
              <TextField
                label="Dirección"
                defaultValue={envoiceAddress?.address}
                inputRef={addressRef}
                error={!!errores.address}
                helperText={errores.address}
                fullWidth
              />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button type="submit" variant="contained" disabled={isLoading}>
                  Guardar
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<CloseIcon />}
                  onClick={() => {
                    setFormOpen(false);
                    setErrores({});
                  }}
                >
                  Cancelar
                </Button>
              </Stack>
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(TarjetEnvoice);
