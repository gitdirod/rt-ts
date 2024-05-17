import { memo } from "react"
import logo from "/src/static/img/logo.svg"
import PacmanLoader from "react-spinners/PacmanLoader"

const IsLoading = ({bg, color='#15A7AE'}) => {
  return (
    <div className={` h-screen center-r text-center flex-1 ${bg}`}>
        <div className="absolute center-c">
            <img 
                className="w-64"
                src={logo} 
                alt="logo Empresa" />
            <div className="w-full center-r text-3xl text-cyanPrimary font-poppins-extrabold py-2 px-2">
                <PacmanLoader color={color} size={40} speedMultiplier={1}/>
            </div>
        </div>
    </div>
  )
}

export default memo(IsLoading)