import { memo } from "react"
import logo from "/src/static/img/logo.svg"
import { Box, CircularProgress } from "@mui/material"

const IsLoading = ({bg}) => {
  return (
    <div className={` h-screen center-r text-center flex-1 ${bg}`}>
        <div className="absolute center-c">
            <img 
                className="w-64"
                src={logo} 
                alt="logo Empresa" />
            <div className="w-full center-r text-3xl text-cyanPrimary font-poppins-extrabold py-2 px-2">
              <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress size={'10rem'} />
              </Box>
            </div>
        </div>
    </div>
  )
}

export default memo(IsLoading)