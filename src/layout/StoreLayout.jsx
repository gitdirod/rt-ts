import { memo } from "react";
import { Outlet } from "react-router-dom";
import CartDrawer from "/src/components/CartDrawer";
import StoreNavbar from "../components/store/navbar/StoreNavbar";
import { Grid } from "@mui/material";

const StoreLayout = () => {
  return (
    <Grid
      container 
      spacing={0} 
      sx={{ 
        cursor: "default", 
        display:'flex', 
        height:'99.5vh',
        position:'relative',
      }}
    >
      <StoreNavbar />

      {/* Margen superior ya no es necesario si StoreNavbar es sticky */}
      <Outlet />

      <CartDrawer />
    </Grid>
  );
};

export default memo(StoreLayout);

