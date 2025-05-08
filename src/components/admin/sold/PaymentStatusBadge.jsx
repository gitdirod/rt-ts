import { Box, Typography } from '@mui/material';

const estadoColors = {
  'POR PAGAR': 'warning.main',
  'PAGADO': 'success.main',
};

export default function PaymentStatusBadge({ estado = '' }) {
  const color = estadoColors[estado] || 'grey.500';

  return (
    <Box
      sx={{
        px: 2,
        py: 0.5,
        borderRadius: 2,
        display: 'inline-block',
        bgcolor: color,
      }}
    >
      <Typography variant="caption" color="white" fontWeight="bold">
        {estado}
      </Typography>
    </Box>
  );
}
