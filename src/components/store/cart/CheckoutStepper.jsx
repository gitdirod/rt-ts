// src/components/store/cart/CheckoutStepper.jsx
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import StepResume from './StepResume';
import StepDeliverySite from './StepDeliverySite';
import StepPaymentMethod from './StepPaymentMethod';
import StepBillingInformation from './StepBillingInformation';
import whatsappIcon from '/src/static/img/whatsapp.svg';
import BACKEND from '/src/data/backend';
import useStore from '/src/hooks/useStore';
import { useAuth } from '/src/hooks/useAuth';
import request from '/src/services/request';


const steps = ['Confirmar pedido', 'Ubicación de entrega', 'Forma de pago', 'Datos de facturación'];

export default function CheckoutStepper({ onClose, stepContent1, stepContent2 }) {

  const {
    order, 
    total, 
    subtotal, 
    mutateSoldOrders,
    handleClearOrder
  } = useStore()

  const { user } = useAuth({ middleware: 'auth', url: '/' });

  const [activeStep, setActiveStep] = useState(0);

  const [transferProofFile, setTransferProofFile] = useState(null);


  const handleNext = () => {
    if (activeStep === 2 && !transferProofFile) return;
  
    // Si está en el último paso antes de completar
    if (isLastStep) {
      handleFinish(); // Tu acción personalizada aquí
    }
  
    setActiveStep((prev) => prev + 1);
  };

  const address = user?.address;
  const [envoiceAddress, setEnvoiceAddress] = useState({});
  const [sendAddress, setSendAddress] = useState({});
  useEffect(() => {
    address?.envoice && setEnvoiceAddress(address.envoice);
    address?.send && setSendAddress(address.send);
  }, [user]);
  const handleFinish = async () => {
    const newOrder = {
      subtotal,
      total,
      addresses: {
        envoice_id: envoiceAddress.id,
        send_id: sendAddress.id,
      },
      products: order?.map(product => ({
        id: product.id,
        quantity: product.cantidad
      })),
      image: transferProofFile, // File se maneja automáticamente
    };
  
    const response = await request(BACKEND.SOLD_ORDERS.KEY, 'POST', newOrder);
  
    if (response.success) {
      mutateSoldOrders();
      handleClearOrder();
    } else {
      console.log(response.errors);
    }
  };
  

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return stepContent1 || <StepResume />;
      case 1:
        return stepContent2 || <StepDeliverySite />;
      case 2:
        return <StepPaymentMethod onUploadChange={setTransferProofFile} />;
      case 3:
        return <StepBillingInformation />;
      default:
        return null;
    }
  };

  

  const isLastStep = activeStep === steps.length - 1;
  const isCompleted = activeStep === steps.length;

  const canContinue = () => {
    if (activeStep === 2) return transferProofFile;
    return true;
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
        {isCompleted ? (
          <>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            ¡Pedido completado!
          </Typography>
      
          <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
            Por favor, ponte en contacto con nuestros asesores para finalizar el proceso de compra.
          </Typography>
      
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Box
            component="img"
            src={whatsappIcon}
            alt="WhatsApp"
            sx={{ width: 56, height: 56 }}
          />
            <a
              href="https://api.whatsapp.com/send?phone=+593998613905&text=Hola!%C2%A0me%C2%A0puedes%C2%A0ayudar%C2%A0con%C2%A0un%C2%A0equipo,%C2%A0Gracias."
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: '#25D366', fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              099 861 3905
            </a>
          </Box>
      
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={onClose}>
              Cerrar
            </Button>
          </Box>
        </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>Atrás</Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!canContinue()}
              >
                {isLastStep ? 'Finalizar' : 'Siguiente'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
