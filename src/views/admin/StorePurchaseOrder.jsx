import { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Tabs,
  Tab
} from '@mui/material';

import Stack from '@mui/material/Stack';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';


import PasoSeleccion from '/src/components/admin/purchase/PasoSeleccion';
import PasoUnidades from '/src/components/admin/purchase/PasoUnidades';
import PasoResumen from '/src/components/admin/purchase/PasoResumen';

export default function MiTablaConPaginacion() {
 


  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  const totalRecords = 500; // Ejemplo
  

  return (
    <div className="overflow-y-hidden flex flex-col flex-1 ">
        <Box sx={{display:'flex', my:0, p:1, borderRadius:1, border:'1px solid #ccc', bgcolor:'white', justifyContent:'space-between', alignItems:'center'}}>
            <Stack direction="row" spacing={2} alignItems="center">
                <ShoppingCartCheckoutIcon color="primary"/>
                <Typography variant="h5" fontWeight="bold">
                Ingreso de unidades
                </Typography>
                <Chip label={totalRecords || 0} color="primary" />
            </Stack>
            <Stack direction="row" gap={2} alignItems="center">
                {/* Aquí van los Tabs */}
                <Tabs value={tabIndex} onChange={handleChangeTab} textColor="primary" indicatorColor="primary">
                    <Tab label="Seleccionar" />
                    <Tab label="Unidades" />
                    <Tab label="Resumen" />
                </Tabs>
            </Stack>
        </Box>

        {/* Contenido según el tab */}
        <Box sx={{ flexGrow: 1, mt: 1 }}>
            {tabIndex === 0 && <PasoSeleccion />}
            {tabIndex === 1 && <PasoUnidades />}
            {tabIndex === 2 && <PasoResumen />}
        </Box>
      
    </div>
  );
}
