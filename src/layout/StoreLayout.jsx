import { memo } from "react";
import { Outlet } from "react-router-dom";
import CartDrawer from "/src/components/CartDrawer";
import StoreNavbar from "../components/store/navbar/StoreNavbar";
import { Box } from "@mui/material";

const StoreLayout = () => {
  return (
    <Box
      position="relative"
      sx={{
        cursor: "default",
        minHeight: "100vh",
      }}
    >
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

