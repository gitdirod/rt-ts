import { formatearDinero } from "/src/helpers"
import { useNavigate } from "react-router-dom"
import useStore from "/src/hooks/useStore"
import { memo, useState } from "react"
import { urlsBackend } from "/src/data/urlsBackend"
import UnidsAvailable from "./UnidsAvailable"

import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, Modal } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import ProductDetailCard from "./ProductDetailCard"



const ProductCard=({product})=> {
    const navigate = useNavigate()
    const { order, toggleDrawerCart, handleAddOrder} = useStore()
    const theme = useTheme();
    const inOrder = order?.find(pro => pro.id === product?.id ) ?? null
    
    const [openModal, setOpenModal] = useState(false)
    const handleCloseModal = () => setOpenModal(false);
    const handleOpenModal = () => {
        setOpenModal(true)
      };

    const updateCantidad = (nuevaCantidad) => {
        if (nuevaCantidad >= 1 && nuevaCantidad <= product.units) {
            handleAddOrder({ ...product, cantidad: nuevaCantidad });
        }
    };


    return (
        <div className="flex flex-col justify-between items-center bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all min-w-[250px] w-full group">
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: {
                        xs: '95%',  // móviles
                        sm: '90%',  // tablets pequeñas
                        md: '80%',  // tablets grandes
                        lg: '70%',  // pantallas grandes
                        xl: '60%'   // pantallas extra grandes
                    },
                    maxHeight: '90vh',  // evita que se desborde verticalmente
                    overflowY: 'auto',  // scroll si es necesario
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 0,
                    }}
                >
                    <ProductDetailCard product={product} />
                </Box>
            </Modal>


            <div 
                className="w-full h-full px-4 pt-4 pb-2 cursor-pointer flex flex-col items-center gap-2"
                onClick={() => {
                    navigate(`/store/product/${product.id}?name=${encodeURIComponent(product.name)}&code=${encodeURIComponent(product.code)}`)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                }}
            >
                {/* Icono de tipo de producto y grupo */}
                <div className="flex justify-between items-center w-full mb-1 text-slate-500 text-sm">
                    <div className="flex items-center gap-2">
                        <img 
                            src={urlsBackend.ICON + product?.type_product?.image}
                            alt="icon" 
                            className="h-5 w-5"
                        />
                        <span>{product?.group?.name}</span>
                    </div>
                    <UnidsAvailable units={product?.units} textColor="text-slate-700" />
                </div>

                {/* Imagen del producto con efecto hover */}
                <div className="relative w-full h-52 flex justify-center items-center overflow-hidden rounded-lg">
                    <img 
                        src={urlsBackend.PRODUCT_IMAGE + product.images[0]?.name}
                        alt={product.name}
                        className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{
                            position: 'absolute',
                            bottom: 1,
                            width: '100%',
                            bgcolor: '#fff', // fondo blanco
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            opacity: {sx:100, md:0},
                            transition: 'opacity 0.3s ease-in-out',
                            zIndex: 10,
                            '&:hover': {
                                bgcolor: theme.palette.primary.lightHover,
                                borderColor: theme.palette.primary.main,
                            },
                        }}
                        className="group-hover:opacity-100 opacity-100 md:opacity-0 "
                        onClick={(e) => {
                            e.stopPropagation(); // evitar navigate al hacer click en el botón
                            handleOpenModal()
                            // navigate(`/store/product/${product.name}?code=${product.code}&pid=${product.id}`)
                        }}
                        >
                        Previsualizar
                    </Button>


                </div>

                {/* Nombre y código */}
                <span className="text-center text-base font-medium text-slate-800 mt-2 leading-snug">
                    {product.name} <span className="text-slate-500 text-sm">({product.code})</span>
                </span>
            </div>

            {/* Botón Comprar / Ver en carrito */}
            <Box sx={{ width: '100%', p: 2}}>
                <Button
                    fullWidth
                    color="primary"
                    onClick={() => {
                        updateCantidad( inOrder? inOrder?.cantidad + 1 : 1 )
                        toggleDrawerCart(true)
                    }}
                    startIcon={<AddShoppingCartIcon />}
                    variant="contained"
                    sx={{
                        py: 1.2,
                        fontWeight: 600,
                        fontSize: '1rem',
                        textTransform: 'none',
                        borderRadius: '12px'
                    }}
                >
                    Agregar — <span className="ml-2 font-bold">{formatearDinero(product.price)}</span>
                </Button>
            </Box>
        </div>

    )
}

export default memo(ProductCard)