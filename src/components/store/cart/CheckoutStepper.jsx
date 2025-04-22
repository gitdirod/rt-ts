// src/components/store/cart/CheckoutStepper.jsx
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useState } from 'react';

const steps = ['Ubicación de entrega', 'Forma de pago', 'Confirmar pedido'];

export default function CheckoutStepper({ onClose }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>¡Pedido completado!</Typography>
            <Button onClick={handleReset}>Reiniciar</Button>
            <Button onClick={onClose}>Cerrar</Button>
          </>
        ) : (
          <>
            <Typography sx={{ mb: 2 }}>
              Paso actual: <strong>{steps[activeStep]}</strong>
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>Atrás</Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
