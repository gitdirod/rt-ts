import { memo } from 'react';
import TittleName from '../common/TittleName';
import { Grid, Box } from '@mui/material';
import { MemoryService } from '/src/services/MemoryService';
import MemoryCard from './MemoryCard';

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
            <MemoryCard memory={memory} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default memo(Memories);
