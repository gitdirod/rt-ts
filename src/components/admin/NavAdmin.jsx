import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "/src/hooks/useAuth"
import logo from "/src/static/img/logo.svg"
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import { Box, Stack } from "@mui/material";

const NavAdmin =()=> {

    const {user} = useAuth({
      middleware: 'auth',
      url: '/admin'
    })

    const navigate = useNavigate()
    
    return (
      <Stack 
        direction="row"
        sx={{
          height:50,
          px:'2rem',
          bgcolor:'white',
          borderBottom:'1px solid #ddd',
          justifyContent:'space-between',
          alignItems:'center'
        }}
      >
        <Box sx={{cursor:'pointer'}} onClick={()=>navigate('/admin/inventory/products')}>
          <img 
            className=" h-10 w-32 object-fill " 
            src={logo} 
            alt="logo" 
          />
        </Box>
        <Stack >
          {user?.name && (
            <p>Hola! {user.name}</p>
          )}
        </Stack>
        <StoreMallDirectoryIcon 
          sx={{cursor:'pointer', color:'grey.700', fontSize:30}}
          onClick={()=>navigate('/store')}
        />
      </Stack>
    
    ) 
}
export default memo(NavAdmin)