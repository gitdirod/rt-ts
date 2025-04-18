import { memo } from "react"
import { useNavigate } from "react-router-dom"
import logo from "/src/static/img/logoWhite.svg"

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/70 border-b border-zinc-200 shadow-sm transition-all">
      <div className="container mx-auto flex items-center justify-between px-6 py-2">
        <LogoStore
          action={() => {
            navigate('/store')
          }}
          logo={logo}
        />
        {/* Aquí podrías poner botones, links, etc */}
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
