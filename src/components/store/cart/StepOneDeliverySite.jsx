import React, { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper
} from '@mui/material';

export default function StepOneDeliverySite() {
  const [deliveryOption, setDeliveryOption] = useState('local');

  const handleChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
            Selecciona una opción de entrega
          </FormLabel>
          <RadioGroup
            name="delivery-options"
            value={deliveryOption}
            onChange={handleChange}
          >
            <FormControlLabel
              value="local"
              control={<Radio />}
              label="Retirar en local físico: JUAN LEÓN MERA N26-21 Y SANTA MARÍA - TECNITOOLS"
            />
            <FormControlLabel
              value="quito"
              control={<Radio />}
              label="Entrega a domicilio en Quito - Consultar primero con un asesor (pueden aplicar cargos adicionales)"
              disabled
            />
            <FormControlLabel
              value="fuera"
              control={<Radio />}
              label="Entregas fuera de Quito - Consultar primero con un asesor (pueden aplicar cargos adicionales)"
              disabled
            />
          </RadioGroup>
        </FormControl>
      </Paper>
    </Container>
  );
}
