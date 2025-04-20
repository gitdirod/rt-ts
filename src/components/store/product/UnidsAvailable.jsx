import React from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function UnidsAvailable({ units = null }) {
  const theme = useTheme()
  const primaryColor = theme.palette.primary.main

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Box position="relative" display="flex" alignItems="center" justifyContent="center">
        {/* Ping animado con primary */}
        <Box
          sx={{
            position: 'absolute',
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: primaryColor,
            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
            opacity: 0.75,
          }}
        />
        <FiberManualRecordIcon color="primary" sx={{ fontSize: 12 }} />
      </Box>
      <Typography variant="body2" fontWeight="medium">
        {units}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {units === 1 ? 'unidad' : 'unidades'}
      </Typography>

      {/* Animación ping personalizada */}
      <style>
        {`
          @keyframes ping {
            0% { transform: scale(1); opacity: 0.75; }
            75%, 100% { transform: scale(2); opacity: 0; }
          }
        `}
      </style>
    </Box>
  )
}
