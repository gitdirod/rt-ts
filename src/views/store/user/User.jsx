import { memo, useEffect, useState } from "react";
import { useAuth } from "/src/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { timeToText } from "/src/helpers";
import TarjetEnvoice from "/src/components/TarjetEnvoice";

import {
  Box,
  Typography,
  Stack,
  Button,
  Paper,
} from "@mui/material";

import LogoutIcon from '@mui/icons-material/Logout';
import UpdateIcon from '@mui/icons-material/Update';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CircularProgress from '@mui/material/CircularProgress';
import TittleName from "/src/components/store/common/TittleName";

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
    <Box className="container mx-auto px-2 py-6">
      <TittleName>
        Mi Perfil
      </TittleName>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle2" color="text.secondary">
            Desde: {timeToText(user?.created_at, 'LLL')}
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
            <Typography>Teléfono: {user.phone}</Typography>
          </Stack>
          <Button
            startIcon={<UpdateIcon />}
            variant="contained"
            sx={{ mt: 2, alignSelf: 'start', backgroundColor: '#15A7AE', '&:hover': { backgroundColor: '#2D565E' } }}
          >
            Actualizar
          </Button>
        </Stack>
      </Paper>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <TarjetEnvoice envoiceAddress={envoiceAddress}>
          <Typography color="primary" fontWeight="bold" variant="h6" display="flex" alignItems="center" gap={1}>
            <ReceiptIcon /> Datos de facturación
          </Typography>
        </TarjetEnvoice>

        <TarjetEnvoice envoiceAddress={sendAddress} envoice={false}>
          <Typography color="secondary" fontWeight="bold" variant="h6" display="flex" alignItems="center" gap={1}>
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
    </Box>
  );
};

export default memo(User);