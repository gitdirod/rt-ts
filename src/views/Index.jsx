import ShowCategories from "../components/store/category/ShowCategories";
import { memo } from "react";
// import SuggestedsProducts from "../components/SuggestedsProducts";
import Footer from "../components/store/footer/Footer";
import Memories from "../components/store/memories/Memories";
import Landing from "/src/components/store/landing/Landing";
// import SuggestedCategory from "/src/components/SuggestedCategoryDELETE";
import { Box } from "@mui/material";

const Inicio = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        mt: 2,
        transition: "all 0.3s ease"
      }}
    >
      <Landing />

      {/* <Box display="flex" gap={2}>
        <SuggestedCategory />
      </Box> */}

      {/* <SuggestedsProducts /> */}

      <ShowCategories
        width={160}
        height={160}
        font="text-lg" // Este prop parece usar tailwind, ¿lo estás usando para clases internas?
      />

      <Memories />
      {/* <Footer /> */}
    </Box>
  );
};

export default memo(Inicio);
