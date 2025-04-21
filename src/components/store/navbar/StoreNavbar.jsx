import { memo } from "react"
import { useNavigate } from "react-router-dom"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { Badge } from "@mui/material";

import logo from "/src/static/img/logo.svg"
import { Stack } from "@mui/material";
import useStore from "/src/hooks/useStore";
import LoginCreateRecuba from "./LoginCreateRecuba";

const StoreNavbar = () => {
  const navigate = useNavigate()

  const {order, toggleDrawerCart} = useStore()

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/70 border-b border-zinc-200 shadow-sm transition-all">
      <div className="container mx-auto flex items-center justify-between  py-2 px-2 sx:px-0">
        <LogoStore
          action={() => {
            navigate('/store')
          }}
          logo={logo}

        />
        {/* Aquí podrías poner botones, links, etc */}
        <Stack direction="row" spacing={2}>
            <SearchOutlinedIcon sx={{ cursor: 'pointer', fontSize: 30, color: 'grey.700' }} />
            <LoginCreateRecuba/>
            <Badge badgeContent={order?.length} color="primary" overlap="circular" sx={{ cursor: 'pointer'}} onClick={()=>toggleDrawerCart(true)}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: 30, color: 'grey.700' }} />
            </Badge>
            <SettingsIcon onClick={()=>navigate('/admin/inventory/products')} sx={{ cursor: 'pointer', fontSize: 30, color: 'primary.main' }}/>
        </Stack>

      </div>
    </nav>
  )
}

const LogoStore = ({ action, logo }) => {
  return (
    <div
      className="cursor-pointer"
      onClick={action}
    >
      <img
        className="w-28 md:h-30"
        src={logo}
        alt="logo"
      />
    </div>
  )
}

export default memo(StoreNavbar)
