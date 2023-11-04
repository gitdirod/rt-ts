import { useAuth } from "/src/hooks/useAuth"
import { memo } from "react"
import { Link } from "react-router-dom"
import bell from '/src/static/icons/bell_filled.svg'
import store from '/src/static/icons/store.svg'
import logo from "/src/static/img/logo.svg"
import logout from "/src/static/icons/power.svg"
import ButtomViews from "/src/components/common/ButtomViews"


const NavAdmin =()=> {

    const {user} = useAuth({
      middleware: 'auth',
      url: '/admin'
    })
    
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
        <ButtomViews/>
        
      </div>
    
    ) 
}
export default memo(NavAdmin)