import { memo } from "react"
import { useAuth } from "/src/hooks/useAuth";
import TittleName from "/src/components/store/common/TittleName";
import { LikeService } from "/src/services/LikeService";
import { Container } from "@mui/material";
import ProductGrid from "/src/components/store/product/ProductGrid";



const Likes=()=> {
  
    const {data:likes} = LikeService.useAllLikes()
    const { user } = useAuth({ middleware: 'auth', url: '/'})
    
    return (
      <Container maxWidth="lg" sx={{py:6}}>
        <TittleName>
        Me gustan
        </TittleName>
        <ProductGrid products={likes} />
      </Container>  
      )
}
export default memo(Likes)
