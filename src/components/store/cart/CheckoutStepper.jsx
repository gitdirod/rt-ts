// src/components/store/cart/CheckoutStepper.jsx
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useState } from 'react';

const steps = ['Ubicación de entrega', 'Forma de pago', 'Confirmar pedido'];

export default function CheckoutStepper({ 
  onClose, 
  stepContent1, 
  stepContent2, 
  stepContent3 
}) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return stepContent1 || <Typography>Contenido del paso 1</Typography>;
      case 1:
        return stepContent2 || <Typography>Contenido del paso 2</Typography>;
      case 2:
        return stepContent3 || <Typography>Contenido del paso 3</Typography>;
      default:
        return null;
    }
  };

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
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
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
