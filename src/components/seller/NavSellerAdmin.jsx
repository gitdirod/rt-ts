import { useAuth } from "/src/hooks/useAuth"
import { memo, useState } from "react"
import { Link } from "react-router-dom"
import logo from "/src/static/img/logo.svg"
import iconItem from "/src/static/icons/seller/item02.svg"
import iconCart from "/src/static/icons/seller/shop.svg"
import iconStore from "/src/static/icons/seller/shop.svg"
import ButtomViews from "/src/components/common/ButtomViews"
import useStore from "/src/hooks/useStore"
import { formatearDinero } from "/src/helpers"
import ShowList from "./ShowList"
import useAdmin from "/src/hooks/useAdmin"



const NavSellerAdmin =()=> {

  const {user} = useAuth({
    middleware: 'auth',
    url: '/admin'
  })
    const {
      order,
      total
    } =useStore()
    const {
      handleModalStateComponent,
      handleModalViewComponent,
      handleCloseModals
    } = useAdmin()

  const [show, setShow] = useState(false)

    return (
    
      <div className="relative flex items-center w-full justify-between  h-[50px] border-b bg-white md:px-2">
        <Link
          
          to={'/admin/inventory/products'}
        >
          <div  className="">
            <img 
              className=" h-10 object-fill " 
              src={logo} 
              alt="logo" 
            />

          </div>
        </Link>

        {/* <div className=" flex justify-center gap-10 text-sm font-poppins-regular text-white w-full h-full p-1">

          <div 
            className="center-r gap-6 bg-slate-800 border rounded-lg px-2 py-1 cursor-pointer"
            onClick={()=>{
              handleModalViewComponent(<ShowList closeModal={handleCloseModals}/>)
              handleModalStateComponent(true)
            }}
          >
              <div className="center-r gap-2">
                <img src={iconItem} alt="" className="h-6"/>
                <span className="font-poppins-bold text-xl">{order?.length}</span>
              </div>
              <div className="center-r gap-2">
                <img src={iconCart} alt="" className="h-6"/>
                <span className="font-poppins-bold text-xl">{formatearDinero(total)}</span>
              </div>
          </div>

        </div> */}
        <div className="center-r">
          <Link 
          to='/seller/inventory/products/'
          className="p-2 hover:scale-110 transition-all cursor-pointer">
            <div className=" shrink-0 center-r w-8 h-8 bg-slate-800 rounded-full">
              <img className="w-5 h-5" src={iconStore} alt="" />
            </div>
          </Link>

          <ButtomViews/>
        </div>
      </div>
    
    ) 
}


export default memo(NavSellerAdmin)