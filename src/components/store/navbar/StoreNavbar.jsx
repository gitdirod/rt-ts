import { memo } from "react"
import { useNavigate } from "react-router-dom"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppBar, Badge, Box, Container, IconButton, Toolbar } from "@mui/material";

import logo from "/src/static/img/logo.svg"
import Stack from "@mui/material/Stack";
import useStore from "/src/hooks/useStore";
import LoginCreateRecuba from "./LoginCreateRecuba";
import { useAuth } from "/src/hooks/useAuth";

const StoreNavbar = () => {
  const navigate = useNavigate()
  const { user } = useAuth({ middleware: 'guest' })
  const { order, toggleDrawerCart } = useStore()

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={1}
      sx={{
        backdropFilter: 'blur(6px)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        // borderBottom: '1px solid #e5e7eb'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 0, my: 0 }}>
          <LogoStore action={() => navigate('/store')} logo={logo} />

          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton>
              <SearchOutlinedIcon sx={{ fontSize: 30, color: 'grey.700' }} />
            </IconButton>
            <LoginCreateRecuba />
            <IconButton onClick={() => toggleDrawerCart(true)}>
              <Badge badgeContent={order?.length} color="primary" overlap="circular">
                <ShoppingCartOutlinedIcon sx={{ fontSize: 30, color: 'grey.700' }} />
              </Badge>
            </IconButton>
            {user?.role === "admin" && (
              <IconButton onClick={() => navigate('/admin/inventory/products')}>
                <SettingsIcon sx={{ fontSize: 30, color: 'primary.main' }} />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const LogoStore = ({ action, logo }) => (
  <Box onClick={action} sx={{ cursor: 'pointer' }}>
    <Box
      component="img"
      src={logo}
      alt="logo"
      sx={{ width: '7rem', height: 'auto' }}
    />
  </Box>
)

export default memo(StoreNavbar)
