import { memo, useEffect, useState } from "react";
import { useAuth } from "/src/hooks/useAuth";
import { useNavigate } from "react-router-dom";


import {
  Box,
  Typography,
  Stack,
  Button,
  Paper,
  Container,
} from "@mui/material";

import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CircularProgress from '@mui/material/CircularProgress';
import TittleName from "/src/components/store/common/TittleName";
import TarjetEnvoice from "/src/components/store/cart/TarjetEnvoice";
import { formatearFecha } from "/src/helpers";

const User = () => {
  const navigate = useNavigate();
  const { isLoading, logout, user } = useAuth({ middleware: 'auth', url: '/' });

  const address = user?.address;
  const [envoiceAddress, setEnvoiceAddress] = useState({});
  const [sendAddress, setSendAddress] = useState({});

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    address?.envoice && setEnvoiceAddress(address.envoice);
    address?.send && setSendAddress(address.send);
  }, [user]);

  if (isLoading || !user) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{py:6}}>
      <TittleName>
        Mi Perfil
      </TittleName>

      <Paper elevation={3} sx={{ p: 3, my: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle2" color="text.secondary">
            Desde: {formatearFecha(user?.created_at)}
          </Typography>
        </Box>

        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PersonIcon color="action" />
            <Typography>Nombre: {user.name}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon color="action" />
            <Typography>Correo: {user.email}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PhoneIphoneIcon color="action" />
            <Typography>
              Teléfonos:&nbsp;
              {user.phones && user.phones.length > 0
                ? user.phones.join(', ')
                : 'No registrados'}
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <TarjetEnvoice envoiceAddress={envoiceAddress}>
          <Typography color="grey.800" fontWeight="bold" variant="h6" display="flex" alignItems="center" gap={1}>
            <ReceiptIcon /> Datos de facturación
          </Typography>
        </TarjetEnvoice>

        <TarjetEnvoice envoiceAddress={sendAddress} envoice={false}>
          <Typography color="grey.800" fontWeight="bold" variant="h6" display="flex" alignItems="center" gap={1}>
            <LocalShippingIcon /> Datos de envío
          </Typography>
        </TarjetEnvoice>
      </Stack>

      <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mt: 4 }}>
        <Button
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          variant="contained"
          color="error"
        >
          Cerrar sesión
        </Button>
      </Box>
    </Container>
  );
};

export default memo(User);