import React from 'react'
import { useEffect, useState } from "react"
import useStore from "/src/hooks/useStore"
import { formatearDinero } from "/src/helpers"

import BACKEND from "/src/data/backend"

import {
  Box, Grid, Typography, IconButton, Button, Divider, Stack, Avatar
} from '@mui/material';

import {
  ArrowBackIosNew, ArrowForwardIos, ShoppingCart
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BoltIcon from '@mui/icons-material/Bolt';
import CropIcon from '@mui/icons-material/Crop';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import UnidsAvailable from "/src/components/store/product/UnidsAvailable"
import LikeHart from './LikeHart'

export default function ProductDetailCard({product}) {

    const { handleAddOrder, toggleDrawerCart } = useStore()
    
    const [images, setImages] = useState([])
    const [indexImage, setIndexImage] = useState(0)
    const [cantidad, setCantidad] = useState(1);

    

    const upIndex=()=>{
    if(indexImage === Number(images?.length)-1){
        setIndexImage(0)
        
    }else{
        setIndexImage(indexImage + 1)
    }
    }
    
      const downIndex=()=>{
        if(indexImage === 0){
            setIndexImage(Number(images?.length)-1)
            
        }else{
            setIndexImage(indexImage - 1)
        }
      }
    
      const updateCantidad = (nuevaCantidad) => {
        if (nuevaCantidad >= 1 && nuevaCantidad <= product.units) {
          setCantidad(nuevaCantidad);
          handleAddOrder({ ...product, cantidad: nuevaCantidad });
        }
      };
    
    
      useEffect(()=>{
        setImages(product?.images)
        setIndexImage(0)
      },[product])
    
    return (
        <Box maxWidth="xl" mx="auto" bgcolor="white">
            <Grid container sx={{p:4}} spacing={4}>
                {/* Galería de Imágenes */}
                <Grid container direction="column"
                size={{xs:12, md:6}}

                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    position:'relative',
                    gap:1
                }}
                >
                <Stack >
                    <Box
                    component="img"
                    src={BACKEND.PRODUCTS.URL + product?.images?.[indexImage]?.name}
                    alt="Imagen de producto"
                    sx={{ width: '100%', height: 400, objectFit: 'contain', cursor: 'zoom-in' }}
                    />
                    {product?.images.length > 1 && (
                    <>
                        <IconButton
                        onClick={downIndex}
                        sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', backgroundColor: '#fff' }}
                        >
                        <ArrowBackIosNew />
                        </IconButton>
                        <IconButton
                        onClick={upIndex}
                        sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', backgroundColor: '#fff' }}
                        >
                        <ArrowForwardIos />
                        </IconButton>
                    </>
                    )}
                </Stack>

                {product?.images.length > 1 && (
                    <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
                    {product.images.map((img, idx) => (
                        <Avatar
                        key={img.id}
                        src={BACKEND.PRODUCTS.URL + img.name}
                        variant="rounded"
                        sx={{
                            width: 64,
                            height: 64,
                            border: idx === indexImage ? '2px solid #00acc1' : '1px solid #ddd',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.05)' }
                        }}
                        onClick={() => setIndexImage(idx)}
                        />
                    ))}
                    </Stack>
                )}
                </Grid>

                {/* Información del Producto */}
                <Grid size={{xs:12, md:6}}>
                <Stack spacing={3}>
                    <Stack spacing={4}>
                    <Stack direction="column"  spacing={0}>
                        <Stack direction="row" spacing={4}>
                        <LikeHart size="w-4" product={product} />
                        <Typography sx={{fontFamily: 'poppins-extrabold, sans-serif', fontWeight: 800 }} variant="h5" fontWeight="" textTransform="uppercase">
                            {product.name} <span className="text-zinc-500">({product?.code})</span>
                        </Typography>
                        </Stack>
                        <Box>
                        <UnidsAvailable units={product?.units} textColor="text-cyanPrimary" />
                        </Box>
                    </Stack>
                    
                    <Box textAlign="center">
                        <Typography variant="h4" fontWeight="bold" color="primary">
                        {formatearDinero(product.price)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">Más impuestos</Typography>
                    </Box>
                    <Stack direction={{sx:'column', sm:'row'}} sx={{
                        justifyContent:'center', gap:1
                    }} spacing={2}>

                        {/* Controles de cantidad */}
                        <Box
                        sx={{
                            display: 'flex',
                            justifyContent:'center',
                            alignItems: 'center',
                            border: '2px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            overflow: 'hidden',
                            height: 50,
                        }}
                        >
                            <Box
                                component="button"
                                onClick={() => setCantidad(cantidad - 1)}
                                disabled={cantidad <= 1}
                                sx={{
                                width: 50,
                                height: 50,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'grey.200',
                                },
                                '&:disabled': {
                                    opacity: 0.4,
                                    cursor: 'not-allowed',
                                }
                                }}
                            >
                                <RemoveIcon fontSize="medium" />
                            </Box>

                            <Box
                                sx={{
                                px: 3,
                                fontWeight: 700,
                                fontSize: '1.2rem',
                                minWidth: 50,
                                textAlign: 'center',
                                color: 'text.primary'
                                }}
                            >
                                {cantidad}
                            </Box>

                            <Box
                                component="button"
                                onClick={() => setCantidad(cantidad + 1)}
                                disabled={cantidad >= product.units}
                                sx={{
                                width: 50,
                                height: 50,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: 'grey.200',
                                },
                                '&:disabled': {
                                    opacity: 0.4,
                                    cursor: 'not-allowed',
                                }
                                }}
                            >
                                <AddIcon fontSize="medium" />
                            </Box>
                        </Box>


                        <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<ShoppingCart />}
                        size="large"
                        onClick={()=>{
                            updateCantidad(cantidad)
                            toggleDrawerCart(true)
                        }}
                        >
                        Agregar al carrito
                        </Button>
                        {/* <ButtonLikeHart productId={productToShow.id} /> */}
                    </Stack>
                    </Stack>

                    <Divider />

                    <Box
                        sx={{
                            maxHeight: 150, // altura máxima en px
                            overflowY: 'auto', // scroll vertical
                            pr: 1 // padding a la derecha para evitar que el texto se esconda detrás del scroll
                        }}
                        >
                        <Typography variant="body2" color="text.secondary" mt={1}>
                            {product.description}
                        </Typography>
                    </Box>


                    <Stack direction={'row'} spacing={4}>
                    {/* <Stack direction="row" spacing={1} alignItems="center">
                        <Category fontSize="small" />
                        <Typography>{productToShow?.group?.name}</Typography>
                    </Stack> */}
                    <Stack direction="row" spacing={1} color="text.secondary" alignItems="center">
                        <Avatar src={BACKEND.ICONS.URL + product?.type_product?.image} sx={{ width: 20, height: 20 }} />
                        <Typography fontSize="small">{product?.type_product?.name}</Typography>
                    </Stack>
                    {product?.weight && (
                        <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                        <FitnessCenterIcon fontSize="small" />
                        <Typography fontSize="small">{product?.weight}</Typography>
                        </Stack>
                    )}
                    {product?.size && (
                        <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                        <CropIcon fontSize="small" />
                        <Typography fontSize="small">{product?.size}</Typography>
                        </Stack>
                    )}
                    {product?.number_color && (
                        <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                        <BoltIcon fontSize="small" />
                        <Typography fontSize="small">{product?.number_color}</Typography>
                        </Stack>
                    )}
                    
                    </Stack>
                </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}
