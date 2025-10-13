import { memo, useState } from "react";
import useStore from "../../../hooks/useStore";
import { formatearDinero } from "../../../helpers";

import { useNavigate } from "react-router-dom"
import { useAuth } from "/src/hooks/useAuth";
import TittleName from "/src/components/store/common/TittleName";
import { Box, Button, List, ListItem, Stack, Typography } from "@mui/material";
import ProductCartDrawer from "/src/components/store/product/ProductCartDrawer";
import { Container } from '@mui/material';
import CheckoutModal from "/src/components/store/cart/CheckoutModal";
import LoginCreateRecuba from "/src/components/store/navbar/LoginCreateRecuba";
import NoProductsToShow from "/src/components/store/cart/NoProductsToShow";



const Cart=()=> {
    const navigate = useNavigate()

    const [openLogin, setOpenLogin] = useState(false);

    
    const {
            order, 
            subtotal, 
            // handleClickModalBuy
        } = useStore()  

    const { user } = useAuth({middleware: 'guest'})



    const [openCheckout, setOpenCheckout] = useState(false);

    const handleBuy = () => {
        if (user?.email_verified_at) {
          setOpenCheckout(true);
        } else {
          setOpenLogin(true); // Abre el modal local
        }
      };
      
    
    return (

        <Container sx={{pt:4, height: "calc(100% - 4rem)", // <─ igual altura que sidebar
            overflow: "hidden",
            overflowY: "auto",}}>
            <LoginCreateRecuba openExternal={openLogin} onCloseExternal={() => setOpenLogin(false)} />


            <TittleName>Resumen de Compra</TittleName>
            {/* Contenedor de productos y resumen */}
            {order.length === 0 ? (
                <NoProductsToShow goTo='/store/'/>
                ):(

            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{width:1}}>
                
                {/* Contenedor de productos */}
                <Box
                    order={{ xs: 2, sm: 1 }}
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        px: 2,
                    }}
                >
                    <List>
                        {order?.map((product, index) => (
                        <ListItem divider key={product.id || index} sx={{ mb: 2, p: 0 }}>
                            <ProductCartDrawer product={product} />
                        </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Contenedor de resumen */}
                <Stack order={{ xs: 1, sm: 2 }} sx={{gap:2}} width={{ xs:1, sm:0.5, md:0.4 }}>
                    
                    <Box
                        sx={{
                            border: '1px solid #ddd',
                            px: 3,
                            py: 2,
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={1}
                        >
                            <Typography variant="body2" color="text.secondary">
                            Subtotal
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {formatearDinero(subtotal)}
                            </Typography>
                        </Box>

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="body2" color="text.secondary">
                            Impuestos
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {formatearDinero(0.15 * subtotal)}
                            </Typography>
                        </Box>

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="h6" fontWeight="bold">
                            Total
                            </Typography>
                            <Typography variant="h5" fontWeight="bold" sx={{fontFamily: 'poppins-extrabold'}} color="primary">
                            {formatearDinero(subtotal * 1.15)}
                            </Typography>
                        </Box>
                        <Button variant="contained" fullWidth sx={{fontWeight:'bold'}} color="primary" onClick={handleBuy}>
                            Terminar pedido
                        </Button>
                    </Box>
                    <CheckoutModal open={openCheckout} onClose={() => setOpenCheckout(false)} />
                    {/* <CheckoutStepper/> */}
                </Stack>
            </Stack>
            )}
        </Container>
    )
}

export default memo(Cart)