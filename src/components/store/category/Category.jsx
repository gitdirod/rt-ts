import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { Card, CardMedia, CardActionArea, CardContent, Typography, Box } from "@mui/material";
import { urlsBackend } from "/src/data/urlsBackend";

const Category = ({ categoria, width = 128, height = 100 }) => {
  const navigate = useNavigate();
  // const { handleClikCategoryCurrent, handleSetMenu } = useStore();


  const handleClick = () => {
    // handleClikCategoryCurrent(categoria?.id);
    // handleSetMenu(false);
    navigate(
      `/store/products/?cat=${categoria?.name}&ci=${[categoria?.id].join(",")}&gro=${categoria?.group_name}&gi=${categoria?.group_id}`
    );
  };

  return (
    <Card
      elevation={4}
      onClick={handleClick}
      sx={{
        width,
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardActionArea>
        <Box sx={{ position: "relative", width: "100%", height }}>
          <CardMedia
            component="img"
            image={urlsBackend.CATEGORY + categoria?.images?.[0]?.name}
            alt={categoria?.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.1)",
              transition: "opacity 0.3s",
              "&:hover": {
                opacity: 0,
              },
            }}
          />
        </Box>

        <CardContent sx={{ bgcolor: "primary.main", py: 1, px: 2 }}>
          <Typography
            // variant="subtitle2"
            color="white"
            // fontWeight="bold"
            textAlign="center"
            noWrap
          >
            {categoria?.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default memo(Category);
