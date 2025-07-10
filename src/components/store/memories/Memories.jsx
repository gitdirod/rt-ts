import { memo } from 'react';
import TittleName from '../common/TittleName';
import BACKEND from '/src/data/backend';

import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Fade,
} from '@mui/material';
import { MemoryService } from '/src/services/MemoryService';

const Memories = () => {
  const { data: memories } = MemoryService.useAllMemories();

  if (!memories || memories.length === 0) return null;

  return (
    <Box sx={{ width: '100%', px: 1, pt: 8 }}>
      <TittleName>Nuestros orfebres</TittleName>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ py: 4 }}
      >
        {memories.map((memory) => (
          <Grid key={memory.id}>
            <Card
              sx={{
                position: 'relative',
                width: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 3,
                bgcolor: 'background.paper',
              }}
            >
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  py: 1,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {memory.name}
                </Typography>
              </Box>

              <CardMedia
                component="img"
                image={BACKEND.MEMORIES.URL + memory.image}
                alt={memory.name}
              />

              <Fade in timeout={300}>
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'primary.main',
                    color: 'white',
                    backdropFilter: 'blur(6px)',
                    bgcolorOpacity: 0.5,
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    '&:hover': {
                      opacity: 1,
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {memory.name}
                  </Typography>
                  <CardContent
                    sx={{
                      maxHeight: 120,
                      overflowY: 'auto',
                      bgcolor: 'transparent',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {memory.description}
                    </Typography>
                  </CardContent>
                </Box>
              </Fade>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default memo(Memories);
