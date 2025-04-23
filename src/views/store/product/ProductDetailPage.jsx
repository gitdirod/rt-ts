import { useEffect, useState, memo } from "react"
import IsLoading from "/src/components/store/common/IsLoading"
import ProductDetailCard from "/src/components/store/product/ProductDetailCard"
import { Box } from "@mui/material"
import { useParams } from "react-router-dom";
import { ProductService } from "/src/services/ProductService"; // asegúrate de importar esto

export async function loader({ params }){
  return params.productName
}

const ProductDetailPage=() => {

  const { id: productId } = useParams();
  const [productToShow, setProductToShow] = useState(null);  // Estado para el producto

  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener el producto por ID
  const getProduct = async (id) => {
    const { data, error } = await ProductService.fetchById(id);
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