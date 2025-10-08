import { memo } from "react";
import { Container, Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [] }) => {
  return (
    <Container maxWidth="xl"> {/* ancho amplio para permitir 4 cols en xl */}
      <Grid
        container
        spacing={1} // ~24px de gap
        alignItems="stretch" // estira todos los items a la misma altura
        sx={{border:"1px solid red"}}
      >
        {products.map((prod) => (
          <ProductCard product={prod} sx={{ flex: 1 }} key={prod.id}/>
          // <Grid
          //   container
          //   item
          //   key={prod.id}
          //   // xs={12}   // 1 col
          //   // sm={6}    // 2 cols
          //   // md={4}    // 3 cols
          //   // lg={3}    // 4 cols (también aplica en xl si quieres)
          //   sx={{ display: 'flex' }} // para que la card pueda llenar la altura
          // >
            
          // </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default memo(ProductGrid);
