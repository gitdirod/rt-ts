import { useState, useEffect, memo } from "react";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Close";

const ImagePreviewManager = ({ images = [], url = '', edit = false, setDelete }) => {
  const [toDelete, setToDelete] = useState([]);

  const toggleImageDeletion = (image) => {
    setToDelete((prev) => {
      const alreadyMarked = prev.find(img => img.id === image.id);
      return alreadyMarked
        ? prev.filter(img => img.id !== image.id)
        : [...prev, image];
    });
  };

  useEffect(() => {
    if (setDelete) {
      setDelete(toDelete);
    }
  }, [toDelete]);

  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
      {images.map((img) => {
        const marked = toDelete.find(d => d.id === img.id);
        return (
          <Box
            key={img.id}
            sx={{
              position: 'relative',
              width: 100,
              height: 100,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 2,
              opacity: marked ? 0.5 : 1,
              border: marked ? '2px solid red' : 'none',
            }}
          >
            <img
              src={url + img.name}
              alt={img.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {edit && (
              <IconButton
                size="small"
                onClick={() => toggleImageDeletion(img)}
                sx={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  bgcolor: 'rgba(255,255,255,0.7)',
                  '&:hover': { bgcolor: 'white' },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default memo(ImagePreviewManager);
