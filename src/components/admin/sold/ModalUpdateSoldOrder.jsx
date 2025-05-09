import React, { forwardRef, useEffect, useState } from 'react';
import { 
  Modal, Box, FormControl, Button, 
  InputLabel, MenuItem, Select, Typography, Alert, ListSubheader 
} from '@mui/material';


import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';

import { SoldOrderService } from '/src/services/SoldOrderService';
import { ORDER_PAYMENT_TYPES } from '/src/data/orderPaymentTypes';
import { ORDER_STATE_TYPES } from '/src/data/orderStateTypes';

const ModalUpdateSoldOrder = forwardRef(({ soldOrder, onUpdated, onCancel, open, handleCloseEdit }, ref) => {

 
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',           // Responsivo en pantallas pequeñas
    maxWidth: 500,           // Máximo 1000px
    bgcolor: 'background.paper',
    maxHeight: '95vh',
    overflowY: 'auto',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

    const [valuePayment, setValuePayment] = useState(soldOrder?.sold_order_payment?.state || '');
    const [valueStatus, setValueStatus] = useState(soldOrder?.sold_order_tracking?.state || '')

    const [errores, setErrores] = useState({});

    const handleSubmit = async (e) => {
        const _soldOrder = {
        _method: 'PUT',
        id: soldOrder?.id,
        
        sold_order_payment: valuePayment,
        
        };

        const response = await SoldOrderService.update(soldOrder.id, _soldOrder)


        if (response.success) {
        setErrores({});
        if (onUpdated) onUpdated();
        } else {
        setErrores(response.errors);
        }
    };

    return (

        <Modal
            open={open}
            onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
                handleCloseEdit();
            }
            }}
        >

            <Box sx={style}>
                <Box sx={{ display: 'flex', flex: 1, gap: 2, alignItems: 'center', justifyContent: 'center', width: '100%', mb: 2 }}>
                    <NoteAddOutlinedIcon color="primary" sx={{ fontSize: 40 }} />
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                        Actualizar venta
                    </Typography>
                </Box>

                <Box sx={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 2 }}>

                    <FormControl variant="standard" fullWidth>
                        <InputLabel>Pago</InputLabel>
                        <Select
                            value={valuePayment}
                            onChange={(e) => setValuePayment(e.target.value)}
                        >
                            <MenuItem value=""><em>Seleccionar</em></MenuItem>
                            {ORDER_PAYMENT_TYPES.map((paymentType) => (
                            <MenuItem key={paymentType.value} value={paymentType.value}>
                                {paymentType.name}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {errores?.type && <Alert severity="error" icon={<GppBadOutlinedIcon fontSize="inherit" />}>{errores.type}</Alert>}

                    <FormControl variant="standard" fullWidth>
                        <InputLabel>Estado</InputLabel>
                        <Select
                            value={valueStatus}
                            onChange={(e) => setValueStatus(e.target.value)}
                        >
                            <MenuItem value=""><em>Seleccionar</em></MenuItem>
                            {ORDER_STATE_TYPES.map((stateType) => (
                            <MenuItem key={stateType.value} value={stateType.value}>
                                {stateType.name}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {errores?.type && <Alert severity="error" icon={<GppBadOutlinedIcon fontSize="inherit" />}>{errores.type}</Alert>}

                </Box>
            </Box>
        </Modal>
        
    );
});

export default ModalUpdateSoldOrder
