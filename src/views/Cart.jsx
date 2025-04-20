import { memo } from "react";
import useStore from "../hooks/useStore";
import { formatearDinero } from "../helpers";

import { useNavigate } from "react-router-dom"
import { useAuth } from "/src/hooks/useAuth";
import TittleName from "/src/components/store/common/TittleName";
import useAdmin from "/src/hooks/useAdmin";
import NoProductsToShow from "/src/components/common/NoProductsToShow";
import { Box, List, ListItem, Stack, Typography } from "@mui/material";
import ProductCartDrawer from "/src/components/store/product/ProductCartDrawer";
import { Container } from '@mui/material';

const Cart=()=> {
    const navigate = useNavigate()
    
    const {
            order, 
            subtotal, 
            handleClickModalBuy
        } = useStore()  

    const { user } = useAuth({middleware: 'guest'})



    const handleBuy = ()=>{
        if(user?.email_verified_at){
            handleClickModalBuy()
        }else if(user?.email_verified_at === null){
            console.log('verificar cuenta')
        }
        else{
            console.log('inicia sesion')
    
            setTimeout(()=>{
                navigate('/auth/login/')
            }, 5000)
            
        }

    }
    
    return (

        <Container>
            {/* Contenedor de productos y resumen */}
            {order.length === 0 ? (
                <NoProductsToShow goTo='/store/'/>
                ):(

            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{width:1}}>
                {/* Contenedor de productos */}
                <Box
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
                <Stack maxWidth={{ sx:100, md:500 }}>
                    <TittleName>Resumen de Compra</TittleName>
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
                    </Box>
                </Stack>
            </Stack>
            )}
        </Container>
    )
}

export default memo(Cart)