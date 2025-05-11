import React from 'react';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import { Box } from '@mui/material';

const deviceMap = {
  0: {
    icon: SmartphoneIcon,
    color: '#4caf50', // verde
    label: 'Teléfono'
  },
  1: {
    icon: TabletMacIcon,
    color: '#2196f3', // azul
    label: 'Tableta'
  },
  2: {
    icon: DesktopWindowsOutlinedIcon,
    color: '#ff9800', // naranja
    label: 'Escritorio'
  }
};

export default function DeviceTypeIcon({ type }) {
  const device = deviceMap[type];

  if (!device) return null;

  const IconComponent = device.icon;

  return (
      <Box component="span" color={device.color}>
        <IconComponent /> {device.label}
      </Box>
  );
}
