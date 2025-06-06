import { memo } from "react"
import Category from "./Category"
import TittleName from "../common/TittleName"
import { CategoryService } from "/src/services/CategoryService"
import { Box, CircularProgress } from "@mui/material"

const ShowCategories = ({ width = 160, height = 160 }) => {
  const { data: categories, loading } = CategoryService.useAllCategories()

  if (loading || !categories) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      sx={{ py: 8, px: { xs: 2, xl: 10 }, gap: 4 }}
    >
      <TittleName>
        Compra por categorías
      </TittleName>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap={2}
        width="100%"
      >
        {categories.map((category) =>
          category.show === true ? (
            <Box
              key={category.id}
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              <Category
                categoria={category}
                width={width}
                height={height}
              />
            </Box>
          ) : null
        )}
      </Box>
    </Box>
  )
}

export default memo(ShowCategories)
