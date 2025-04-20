import useStore from "../hooks/useStore"
import OrderBought from "../components/OrderBought";
import SideBarClient from "../components/SideBarClient";
import BottomBarClient from "../components/BottomBarClient";
import { useAuth } from "../hooks/useAuth";
import IsLoading from "../components/store/common/IsLoading";
import TittleName from "/src/components/TittleName";


export default function Bought(){
  
  const {soldOrders} = useStore()

  const { user } = useAuth({
    middleware: 'auth',
    url: '/'
  })

  if(user === undefined) return(<IsLoading/>)

  return (
    <div className="relative flex w-full">
        <BottomBarClient/>
      <div className="flex w-full">
        <SideBarClient/>
        <div 
          className="mx-auto w-full pb-10 mt-4 flex flex-col relative"
        >
          <div 
            className="flex flex-col items-center md:flex-row md:items-start md:space-x-4 md:px-4 rounded-md pb-4"
          >
            <div className="flex flex-col justify-between w-full">
              
              <div className="flex flex-col justify-center items-start w-full my-2">
                <TittleName style='bg-cyanPrimary text-white'>
                  Mis Compras
                </TittleName>
              </div>


              <div className="flex flex-col gap-1 items-center p-2 ">
                  {/* Contenedor de producto */}
                <div className="w-full center-r font-poppins-bold text-white bg-slate-700 rounded-lg">
                  <div className="w-1/4 center-r">
                    Orden
                  </div>
                  <div className="w-1/4 center-r">
                    Fecha
                  </div>
                  <div className="w-1/4 center-r">
                    Total
                  </div>
                  <div className="w-1/4 center-r">
                    Estado
                  </div>
                </div>
                  {soldOrders?.map(order =>(
                    <OrderBought 
                      order={order}
                      key={order.id}
                    />
                      
                  ))}
                  
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    
  )
}
