import React, { useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const HiddenInput = styled('input')({
  display: 'none',
});

export default function ImageUploader({ onImagesChange, maxImages = 5, message="Subir imágenes" }) {
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    // Limitar la cantidad de imágenes
    const remainingSlots = maxImages - previewImages.length;
    if (remainingSlots <= 0) return;

    const limitedFiles = files.slice(0, remainingSlots);

    const readers = limitedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () =>
          resolve({ src: reader.result, name: file.name, file });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((newImages) => {
      const updatedImages = [...previewImages, ...newImages];
      setPreviewImages(updatedImages);
      if (onImagesChange) onImagesChange(updatedImages.map((img) => img.file));
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    const updated = previewImages.filter((_, i) => i !== indexToRemove);
    setPreviewImages(updated);
    if (onImagesChange) onImagesChange(updated.map((img) => img.file));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        variant="outlined"
        color="primary"
        component="label"
        startIcon={<UploadFileIcon />}
        disabled={previewImages.length >= maxImages}
      >
        {message}
        <HiddenInput
          accept="image/*"
          multiple
          type="file"
          onChange={handleImageUpload}
        />
      </Button>

      {previewImages.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
          {previewImages.map((img, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                width: 100,
                height: 100,
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 2,
              }}
            >
              <img
                src={img.src}
                alt={img.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <IconButton
                size="small"
                onClick={() => handleRemoveImage(index)}
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
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

