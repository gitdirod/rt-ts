import {
  Paper, Grid, Typography, Divider, Stack, Box
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function UserInfoCard({ user, addresses }) {
  const InfoItem = ({ icon, label }) => (
    <Stack direction="row" alignItems="center" spacing={1}>
      {icon}
      <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
    </Stack>
  );

  const Section = ({ title, items }) => (
    <Box sx={{ flex: 1 }}>
      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>{title}</Typography>
      <Grid container spacing={2}>
        {items.map(({ label, value }) => (
          <Grid key={label} >
            <Typography variant="caption" color="text.secondary">{label}</Typography>
            <Typography variant="body2">{value || 'No registrado'}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 1, border:'1px solid #ccc' }}>
      <Typography variant="subtitle" fontWeight="bold" gutterBottom>Datos del Usuario</Typography>
      <Grid container spacing={2} mb={2}>
        <Grid >
          <InfoItem icon={<PersonIcon color="primary" />} label={user.name} />
        </Grid>
        <Grid >
          <InfoItem icon={<EmailIcon color="primary" />} label={user.email} />
        </Grid>
        <Grid >
          <InfoItem
            icon={<PhoneIcon color="primary" />}
            label={user.phones?.length ? user.phones.join(', ') : 'No registrados'}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Contenedor para secciones en fila-columna responsiva */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2
        }}
      >
        <Section
          title="Datos de Facturación"
          items={[
            { label: 'Nombre', value: addresses?.envoice?.people },
            { label: 'CC/RUC', value: addresses?.envoice?.ccruc },
            { label: 'Teléfono', value: addresses?.envoice?.phone },
            { label: 'Ciudad', value: addresses?.envoice?.city },
            { label: 'Dirección', value: addresses?.envoice?.address }
          ]}
        />

        <Section
          title="Datos de Envío"
          items={[
            { label: 'Nombre', value: addresses?.send?.people },
            { label: 'CC/RUC', value: addresses?.send?.ccruc },
            { label: 'Teléfono', value: addresses?.send?.phone },
            { label: 'Ciudad', value: addresses?.send?.city },
            { label: 'Dirección', value: addresses?.send?.address }
          ]}
        />
      </Box>
    </Paper>
  );
}
