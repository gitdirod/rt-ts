import { useEffect, useState, memo } from "react"
import { useLocation } from "react-router-dom"
import useAdmin from "/src/hooks/useAdmin"
import IsLoading from "/src/components/store/common/IsLoading"
import ProductDetailCard from "/src/components/store/product/ProductDetailCard"
import { Box } from "@mui/material"

export async function loader({ params }){
  return params.productName
}

const ProductDetailPage=() => {

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const productId = queryParams.get('pid');
  
  const [productToShow, setProductToShow] = useState(null);  // Estado para el producto

  const { fetchProductById } = useAdmin()

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
  

  if(isLoading || productToShow === undefined || productToShow === null || productToShow?.units < 0 ) return <IsLoading/>

  return (
    <Box sx={{my:4}}>
      <ProductDetailCard product={productToShow}/>
    </Box>
  );

}

export default memo(ProductDetailPage)