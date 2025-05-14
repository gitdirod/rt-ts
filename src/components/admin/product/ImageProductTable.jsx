import { memo } from 'react';
import { Box, Avatar, Badge } from '@mui/material';
import bag from '/src/static/icons/bag.svg';

const ImageProductTable = ({ height = 40, url, images, count = false }) => {
  const hasImages = images?.length > 0;
  const imageSize = height; // Para controlar el tamaño dinámico

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, zIndex: 0 }}>
      {hasImages ? (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          {count && (
            <Badge
              badgeContent={images.length}
              color="primary"
              sx={{
                position: 'absolute',
                top: -4,
                right: -4,
                '& .MuiBadge-badge': {
                  backgroundColor: 'rgba(30, 41, 59, 0.8)', // bg-slate-800 + opacity
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '0.7rem',
                  height: '1rem',
                  width: '1rem',
                  minWidth: 'unset',
                  borderRadius: '50%',
                  backdropFilter: 'blur(2px)',
                  border: '1px solid white',
                }
              }}
            />
          )}
          <Avatar
            variant="rounded"
            src={url + images[0]?.name}
            alt={images[0]?.name}
            sx={{
              width: imageSize,
              height: imageSize,
              borderRadius: 1,
              objectFit: 'cover'
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
            borderRadius: 1,
            backgroundColor: 'background.paper'
          }}
        >
          <Box
            component="img"
            src={bag}
            alt="bag icon"
            sx={{
              width: 24,
              height: 24,
              opacity: 0.7
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default memo(ImageProductTable);
