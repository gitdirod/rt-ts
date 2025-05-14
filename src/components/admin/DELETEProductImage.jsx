import React from 'react'

import { Box } from '@mui/material'

const ProductImage = ({ imageUrl }) => {
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 1,
      boxSizing: 'border-box',
    }}>
      <img
        src={imageUrl}
        alt="Producto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </Box>
  )
}

export default ProductImage
