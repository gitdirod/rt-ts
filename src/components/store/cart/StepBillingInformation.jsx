
import React, { useEffect, useState } from 'react'
import TarjetEnvoice from './TarjetEnvoice'
import { useAuth } from '/src/hooks/useAuth';
import { Container, Typography } from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';

export default function StepBillingInformation() {

      const { user } = useAuth({ middleware: 'auth', url: '/' });
    
      const address = user?.address;
      const [envoiceAddress, setEnvoiceAddress] = useState({});
    
    
    
    useEffect(() => {
        address?.envoice && setEnvoiceAddress(address.envoice);
    }, [user]);
    return (
        <Container maxWidth="sm">
            <TarjetEnvoice envoiceAddress={envoiceAddress}>
            <Typography color="grey.800" fontWeight="bold" variant="h6" display="flex" alignItems="center" gap={1}>
            <ReceiptIcon /> Datos de facturación
            </Typography>
        </TarjetEnvoice>
        </Container>
    )
}
