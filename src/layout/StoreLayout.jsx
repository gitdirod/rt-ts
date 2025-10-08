import { memo } from "react";
import { Outlet } from "react-router-dom";
import CartDrawer from "/src/components/CartDrawer";
import StoreNavbar from "../components/store/navbar/StoreNavbar";
import { Box, Typography } from "@mui/material";

const StoreLayout = () => {
  return (
    <Box
      position="relative"
      sx={{
        cursor: "default",
        maxHeight: "100vh",
      }}
    >
      {/* <Typography className="poppins-regular">Texto regular</Typography>
      <Typography className="poppins-medium">Texto medio</Typography>
      <Typography className="poppins-bold">Texto en negrita real</Typography> */}

      <StoreNavbar />

      {/* Margen superior ya no es necesario si StoreNavbar es sticky */}
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          transition: "all 0.3s ease",
        }}
      >
        <Outlet />
      </Box>

      <CartDrawer />
    </Box>
  );
};

export default memo(StoreLayout);

