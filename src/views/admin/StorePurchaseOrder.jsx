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
import useStore from '/src/hooks/useStore';

export default function MiTablaConPaginacion() {
 


  const [tabIndex, setTabIndex] = useState(0);

  const {orderBuy}= useStore()

  const handleChangeTab = (event, newValue) => {
    setTabIndex(newValue);
  };

 
  

  return (
    <div className="overflow-y-hidden flex flex-col flex-1 ">
        <Box sx={{display:'flex', mt:1, px:1, borderRadius:1, border:'1px solid #ccc', bgcolor:'white', justifyContent:'space-between', alignItems:'center'}}>
            <Stack direction="row" spacing={2} alignItems="center">
                <ShoppingCartCheckoutIcon color="primary"/>
                <Typography variant="h5" fontWeight="bold">
                Ingreso de unidades
                </Typography>
                <Chip label={orderBuy.length || 0} color="primary" />
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
        <Box sx={{ flexGrow: 1, pt: 1 }}>
            {tabIndex === 0 && <PasoSeleccion />}
            {tabIndex === 1 && <PasoUnidades />}
            {tabIndex === 2 && <PasoResumen />}
        </Box>
      
    </div>
  );
}
