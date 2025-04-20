import { memo } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "/src/hooks/useAuth"
import logo from "/src/static/img/logo.svg"
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

const NavAdmin =()=> {

    const {user} = useAuth({
      middleware: 'auth',
      url: '/admin'
    })

    const navigate = useNavigate()
    
    return (
    
      <div className="flex  items-center w-full justify-between  h-[50px] border-b bg-white md:px-2">
        <Link
          
          to={'/admin/inventory/products'}
        >
          <div  className="">
            <img 
              className=" h-10 w-32 object-fill " 
              src={logo} 
              alt="logo" 
            />

          </div>
        </Link>
        <div className="flex justify-center items-center text-sm font-bold text-slate-700">
          {user?.name && (
            <p>Hola! {user.name}</p>
          )}
        </div>
        <StoreMallDirectoryIcon 
          sx={{cursor:'pointer', color:'primary.main', fontSize:30}}
          onClick={()=>navigate('/store')}
        />
      </div>
    
    ) 
}
export default memo(NavAdmin)