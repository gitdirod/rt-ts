import {
  Box,
  Typography,
  Card,
  CardMedia,
} from '@mui/material';

import BACKEND from '/src/data/backend';

const MemoryCard = ({ memory }) => {
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 420,
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: 4,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Imagen */}
      <Box sx={{ position: 'relative', height: 300 }}>
        <CardMedia
          component="img"
          image={BACKEND.MEMORIES.URL + memory.image}
          alt={memory.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            opacity: 0,
            transition: 'opacity 0.3s',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            px: 2,
            textAlign: 'center',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={1}>
            {memory.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              maxHeight: 140,
              overflowY: 'auto',
            }}
          >
            {memory.description}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.100' }}>
        <Typography
          variant="subtitle1"
          fontWeight="medium"
          color="text.primary"
        >
          {memory.name}
        </Typography>
      </Box>
    </Card>
  );
};

export default MemoryCard;
