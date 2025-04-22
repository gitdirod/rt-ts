// src/components/store/cart/CheckoutModal.jsx
import { Box, Modal } from '@mui/material';
import CheckoutStepper from './CheckoutStepper';

const CheckoutModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '95%', md: '70%' },
        maxHeight: '90vh',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}>
        <CheckoutStepper onClose={onClose} />
      </Box>
    </Modal>
  );
};

export default CheckoutModal;
