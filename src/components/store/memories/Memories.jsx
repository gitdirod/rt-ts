import { memo } from 'react';
import TittleName from '../common/TittleName';
import BACKEND from '/src/data/backend';

import {
  Box,
  Typography,
  Card,
  CardMedia,
  Grid,
} from '@mui/material';
import { MemoryService } from '/src/services/MemoryService';

const Memories = () => {
  const { data: memories } = MemoryService.useAllMemories();

  if (!memories || memories.length === 0) return null;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      sx={{ py: 8, px: { xs: 2, xl: 10 }, gap: 4 }}
    >
      <TittleName> Nuestros orfebres </TittleName>

      <Grid
        container
        columns={{ xs: 12, sm: 12, md: 12 }}
        spacing={3}
        justifyContent="center"
      >
        {memories.map((memory) => (
          <Grid
            key={memory.id}
            sx={{
              gridColumn: {
                xs: 'span 12',
                sm: 'span 6',
                md: 'span 4',
              },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card
              sx={{
                width: '100%',
                maxWidth: 420, // Aumentamos el ancho máximo
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: 4,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Imagen ampliada */}
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default memo(Memories);

