import React from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

export default function UnidsAvailable({
  units = null,
  textColor = 'text-white',
  style = 'text-xs md:text-sm'
}) {
  return (
    <div className={`flex items-center gap-2 ${textColor} ${style}`}>
      <div className="relative flex items-center justify-center">
        {/* Ping animado */}
        <div className="absolute animate-ping inline-flex h-3 w-3 rounded-full bg-current opacity-75"></div>
        <FiberManualRecordIcon sx={{ fontSize: 12 }} />
      </div>
      <span className="leading-tight">{units}</span>
      <span className="opacity-80">{units == 1 ? 'unidad': 'unidades'}</span>
    </div>
  )
}
