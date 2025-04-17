import { formatearDinero } from "/src/helpers"
import { useNavigate } from "react-router-dom"
import useStore from "/src/hooks/useStore"
import { useState, useEffect, memo } from "react"
import { urlsBackend } from "/src/data/urlsBackend"
import UnidsAvailable from "./seller/UnidsAvailable"
import useAdmin from "/src/hooks/useAdmin"
import ModalViewAddProduct from "./seller/ModalViewAddProduct"

import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box, Typography } from "@mui/material"


const Product=({product})=> {
    const navigate = useNavigate()
    const { order} = useStore()
    const [inCart, setInCart] = useState(false)

    useEffect(()=>{
        order?.some( orderState =>  orderState.id === product.id ) ? setInCart(true) : setInCart(false)
    }, [order])

    const {
        handleModalStateComponent,
        handleModalViewComponent,
        handleCloseModals
    } = useAdmin()

    return (
        <div className="flex flex-col justify-between items-center bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all min-w-[250px] w-full group">
            <div 
                className="w-full h-full px-4 pt-4 pb-2 cursor-pointer flex flex-col items-center gap-2"
                onClick={() => {
                    navigate(`/store/product/${product.name}?code=${product.code}&pid=${product.id}`)
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
                        if (!inCart) {
                            handleModalStateComponent(true)
                            handleModalViewComponent(<ModalViewAddProduct product={product} closeModal={handleCloseModals} />)
                        } else {
                            navigate('/store/cart')
                        }
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
                    {!inCart ? 'Comprar' : 'Ver en carrito'} — <span className="ml-2 font-bold">{formatearDinero(product.price)}</span>
                </Button>
            </Box>
        </div>

    )
}

export default memo(Product)