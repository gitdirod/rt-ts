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
      >
        {products.map((prod) => (
          <ProductCard product={prod} sx={{ flex: 1 }} key={prod.id}/>
        ))}
      </Grid>
    </Container>
  );
};

export default memo(ProductGrid);
