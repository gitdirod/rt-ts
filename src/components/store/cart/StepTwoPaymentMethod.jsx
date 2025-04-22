import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  Input
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { banks } from '/src/data/banks';
import BankDescription from './BankDescription';
import useStore from '/src/hooks/useStore';
import { formatearDinero } from '/src/helpers';

export default function StepTwoPaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState('transfer');

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const { total }= useStore()

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log('Archivo seleccionado:', file);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography
                variant="h5"
                color="primary"
                fullWidth
                textAlign="center"
                sx={{ fontWeight: 'bold', mb: 2 }}
            >
                Total a pagar: {formatearDinero(total)}
            </Typography>
        <FormControl component="fieldset" fullWidth>
            

            <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
                Selecciona un método de pago
            </FormLabel>
            
            <RadioGroup
                name="payment-method"
                value={paymentMethod}
                onChange={handlePaymentChange}
            >
                <FormControlLabel
                value="transfer"
                control={<Radio />}
                label={`Transferencia bancaria ${formatearDinero(total)}`}
                />
                <FormControlLabel
                value="card"
                control={<Radio />}
                label="Tarjeta de débito o crédito (próximamente)"
                disabled
                />
            </RadioGroup>

            {paymentMethod === 'transfer' && (
                <>
                <Box sx={{ mt: 4 }}>
                    {banks.map((bank, index) => (
                    <BankDescription key={index} bank={bank} />
                    ))}
                </Box>

                <Box sx={{ mt: 3 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                    Subir comprobante de transferencia:
                    </Typography>
                    <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadIcon />}
                    >
                    Seleccionar imagen
                    <Input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileUpload}
                    />
                    </Button>
              </Box>
            </>
          )}
        </FormControl>
      </Paper>
    </Container>
  );
}
