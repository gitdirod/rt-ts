import useStore from "../hooks/useStore"
import { useEffect, useState, memo } from "react"
import { useLocation } from "react-router-dom"
import { formatearDinero } from "../helpers"
import IsLoading from "../components/IsLoading"
import LikeHart from "../components/LikeHart"
import useAdmin from "/src/hooks/useAdmin"
import ModalViewImage from "/src/components/ModalViewImage"
import BoltIcon from '@mui/icons-material/Bolt';
import CropIcon from '@mui/icons-material/Crop';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

import {
  Box, Grid, Typography, IconButton, Button, Divider, Stack, Avatar
} from '@mui/material';
import {
  ArrowBackIosNew, ArrowForwardIos, ShoppingCart
} from '@mui/icons-material';

import UnidsAvailable from "/src/components/seller/UnidsAvailable"
import GoToGestor from "/src/components/admin/GoToGestor"
import ModalViewAddProduct from "/src/components/seller/ModalViewAddProduct"
import BACKEND from "/src/data/backend"

export async function loader({ params }){
  return params.productName
}


const ShowProductCustomer=() => {

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const productId = queryParams.get('pid');

  
  const [productToShow, setProductToShow] = useState(null);  // Estado para el producto
  const { products, order } = useStore()

  const {
    handleCloseModals,
    handleModalStateImage,
    handleModalViewImage,
    handleModalStateComponent,
    handleModalViewComponent,
    fetchProductById
  
  } = useAdmin()

  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener el producto por ID
  const getProduct = async (id) => {
    const { data, error } = await fetchProductById(id);  // Usamos la función del contexto
    if (data) {
        setProductToShow(data);
    } else {
        console.error("Error al cargar el producto", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (productId) {
      getProduct(productId);  // Obtener el producto cuando se monta el componente
    }
  }, [productId]);
  
  
  const inOrder = order?.find(product => product.id === productToShow?.id ) ?? null
  
  const [images, setImages] = useState([])
  const [indexImage, setIndexImage] = useState(0)
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

  useEffect(()=>{
    setImages(productToShow?.images)
    setIndexImage(0)
  },[productToShow,products])

  if(isLoading || productToShow === undefined || productToShow === null || productToShow?.units < 0 ) return <IsLoading/>

  return (
    <Box maxWidth="xl" mx="auto" my={4} p={3} bgcolor="white" borderRadius={4} boxShadow={3}>
      <Grid container  spacing={4}>
        {/* Galería de Imágenes */}
        <Grid container direction="column"
          size={{xs:12, md:6}}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack >
            <Box
              component="img"
              src={BACKEND.PRODUCTS.URL + productToShow?.images?.[indexImage]?.name}
              alt="Imagen de producto"
              sx={{ width: '100%', height: 400, objectFit: 'contain', borderRadius: 3, border: '1px solid #CCC', cursor: 'zoom-in' }}
              onClick={() => {
                handleModalStateImage(true);
                handleModalViewImage(<ModalViewImage images={productToShow.images} url={BACKEND.PRODUCTS.URL} index={indexImage} closeModal={handleCloseModals} />);
              }}
            />
            {productToShow?.images.length >= 1 && (
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

          {productToShow?.images.length >= 1 && (
            <Stack direction="row" spacing={1} mt={2} justifyContent="center" flexWrap="wrap">
              {productToShow.images.map((img, idx) => (
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
                  <LikeHart size="w-4" productId={productToShow.id} />
                  <Typography variant="h5" fontWeight="" textTransform="uppercase">
                    {productToShow.name} <span className="text-zinc-500">({productToShow?.code})</span>
                  </Typography>
                </Stack>
                <Box>
                  <UnidsAvailable units={productToShow?.units} textColor="text-cyanPrimary" />
                </Box>
              </Stack>
              
              <Box textAlign="center">
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {formatearDinero(productToShow.price)}
                </Typography>
                <Typography variant="caption" color="text.secondary">Más impuestos</Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<ShoppingCart />}
                  size="large"
                  onClick={() => {
                    handleModalStateComponent(true);
                    handleModalViewComponent(<ModalViewAddProduct product={productToShow} closeModal={handleCloseModals} />);
                  }}
                >
                  {inOrder ? `(${inOrder?.cantidad}) Unidades` : 'Comprar'}
                </Button>
                {/* <ButtonLikeHart productId={productToShow.id} /> */}
              </Stack>
            </Stack>

            <Divider />

            <Box>
              <Typography  variant="body2" color="text.secondary" mt={1}>
              {productToShow.description}
              </Typography>
            </Box>

            <Stack direction={'row'} spacing={4}>
              {/* <Stack direction="row" spacing={1} alignItems="center">
                <Category fontSize="small" />
                <Typography>{productToShow?.group?.name}</Typography>
              </Stack> */}
              <Stack direction="row" spacing={1} color="text.secondary" alignItems="center">
                <Avatar src={BACKEND.ICONS.URL + productToShow?.type?.image} sx={{ width: 20, height: 20 }} />
                <Typography fontSize="small">{productToShow?.type?.name}</Typography>
              </Stack>
              {productToShow?.weight && (
                <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                  <FitnessCenterIcon fontSize="small" />
                  <Typography fontSize="small">{productToShow?.weight}</Typography>
                </Stack>
              )}
              {productToShow?.size && (
                <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                  <CropIcon fontSize="small" />
                  <Typography fontSize="small">{productToShow?.size}</Typography>
                </Stack>
              )}
              {productToShow?.number_color && (
                <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                  <BoltIcon fontSize="small" />
                  <Typography fontSize="small">{productToShow?.number_color}</Typography>
                </Stack>
              )}
              
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <GoToGestor to={`/admin/inventory/products/item/${productToShow.id}`} />
    </Box>
  );

}

export default memo(ShowProductCustomer)