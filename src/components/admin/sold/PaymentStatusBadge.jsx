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
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        border: '1px solid',
        borderColor: color,
        bgcolor: 'background.paper',
        whiteSpace: 'nowrap',
        width: 'auto',
        maxWidth: '100%',
      }}
    >
      <Typography
        variant="caption"
        color={color}
        fontWeight="medium"
        sx={{ lineHeight: 2 }}
      >
        {estado}
      </Typography>
    </Box>
  );
}
