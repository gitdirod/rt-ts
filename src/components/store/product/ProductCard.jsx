import { formatearDinero } from "/src/helpers"
import { useNavigate } from "react-router-dom"
import useStore from "/src/hooks/useStore"
import { memo, useState } from "react"
import UnidsAvailable from "./UnidsAvailable"

import { Box, Button, Modal } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useTheme } from '@mui/material/styles';
import ProductDetailCard from "./ProductDetailCard"
import BACKEND from "/src/data/backend"

const ProductCard = ({ product }) => {
    const navigate = useNavigate()
    const { order, toggleDrawerCart, handleAddOrder } = useStore()
    const theme = useTheme();
    const inOrder = order?.find(pro => pro.id === product?.id) ?? null

    const [openModal, setOpenModal] = useState(false)
    const handleCloseModal = () => setOpenModal(false);
    const handleOpenModal = () => setOpenModal(true);

    const updateCantidad = (nuevaCantidad) => {
        if (nuevaCantidad >= 1 && nuevaCantidad <= product.units) {
            handleAddOrder({ ...product, cantidad: nuevaCantidad });
        }
    };

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                boxShadow: 1,
                minWidth: 250,
                width: '100%',
                transition: 'all 0.3s ease-in-out',
                position: 'relative',
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)', // levanta un poquito la tarjeta
                    '& .previewButton': {
                        opacity: 1,
                    }
                }
            }}
        >
            {/* Modal de Previsualización */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '95%', sm: '90%', md: '80%', lg: '70%', xl: '60%' },
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 0,
                    }}
                >
                    <ProductDetailCard product={product} />
                </Box>
            </Modal>

            {/* Parte clickeable */}
            <Box 
                onClick={() => {
                    navigate(`/store/product/${product.id}?name=${encodeURIComponent(product.name)}&code=${encodeURIComponent(product.code)}`)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                sx={{
                    width: '100%',
                    height: '100%',
                    px: 2,
                    pt: 2,
                    pb: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                {/* Icono tipo de producto */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    mb: 1,
                    color: 'text.secondary',
                    fontSize: '0.875rem'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img 
                            src={BACKEND.ICONS.URL + product?.type_product?.image}
                            alt="icon"
                            style={{ height: '20px', width: '20px' }}
                        />
                        <span>{product?.group?.name}</span>
                    </Box>
                    <UnidsAvailable units={product?.units} textColor="text-slate-700" />
                </Box>

                {/* Imagen de producto */}
                <Box sx={{
                    position: 'relative',
                    width: '100%',
                    height: '208px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderRadius: 2,
                }}>
                    <img 
                        src={BACKEND.PRODUCTS.URL + product.images[0]?.name}
                        alt={product.name}
                        style={{
                            height: '100%',
                            objectFit: 'contain',
                            transition: 'transform 0.3s ease-in-out',
                        }}
                    />

                    {/* Botón Previsualizar */}
                    <Button
                        variant="outlined"
                        size="small"
                        className="previewButton"
                        sx={{
                            position: 'absolute',
                            bottom: '8px',
                            width: '90%',
                            bgcolor: '#fff',
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            opacity: { xs: 1, md: 0 },
                            transition: 'opacity 0.3s ease-in-out',
                            zIndex: 10,
                            '&:hover': {
                                bgcolor: theme.palette.primary.lightHover,
                                borderColor: theme.palette.primary.main,
                                opacity: 1
                            },
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal();
                        }}
                    >
                        Previsualizar
                    </Button>
                </Box>

                {/* Nombre y código del producto */}
                <Box sx={{
                    textAlign: 'center',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'text.primary',
                    mt: 2,
                    lineHeight: 1.25,
                }}>
                    {product.name} <Box component="span" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>({product.code})</Box>
                </Box>
            </Box>

            {/* Botón Agregar al carrito */}
            <Box sx={{ width: '100%', p: 2 }}>
                <Button
                    fullWidth
                    color="primary"
                    onClick={() => {
                        updateCantidad(inOrder ? inOrder.cantidad + 1 : 1)
                        toggleDrawerCart(true)
                    }}
                    startIcon={<AddShoppingCartIcon />}
                    variant="contained"
                    sx={{
                        py: 1.2,
                        fontWeight: 600,
                        fontSize: '1rem',
                        textTransform: 'none',
                        borderRadius: '12px',
                    }}
                >
                    Agregar — <Box component="span" sx={{ ml: 2, fontWeight: 'bold' }}>{formatearDinero(product.price)}</Box>
                </Button>
            </Box>
        </Box>
    )
}

export default memo(ProductCard)
