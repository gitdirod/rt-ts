import { memo } from "react"
import { useNavigate } from "react-router-dom"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Badge } from "@mui/material";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import logo from "/src/static/img/logo.svg"
import { Stack } from "@mui/material";
import useStore from "/src/hooks/useStore";

const Navbar = () => {
  const navigate = useNavigate()

  const {order} = useStore()

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/70 border-b border-zinc-200 shadow-sm transition-all">
      <div className="container mx-auto flex items-center justify-between  py-2">
        <LogoStore
          action={() => {
            navigate('/store')
          }}
          logo={logo}

        />
        {/* Aquí podrías poner botones, links, etc */}
        <Stack direction="row" spacing={2}>
            <SearchOutlinedIcon sx={{ cursor: 'pointer', fontSize: 30, color: 'grey.700' }} />
            <PersonOutlinedIcon sx={{ cursor: 'pointer', fontSize: 30, color: 'grey.700' }} />
            <Badge badgeContent={order?.length} color="primary" overlap="circular">
                <ShoppingCartOutlinedIcon sx={{ cursor: 'pointer', fontSize: 30, color: 'grey.700' }} />
            </Badge>
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

export default memo(Navbar)
