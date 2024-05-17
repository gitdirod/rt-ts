import { memo } from "react"
import { useNavigate } from "react-router-dom"
import SideBarClient from "../components/SideBarClient";
import BottomBarClient from "../components/BottomBarClient";
import useStore from "../hooks/useStore";
import LikeHart from "../components/LikeHart";
import IsLoading from "../components/IsLoading";

import { useAuth } from "../hooks/useAuth";
import TittleName from "/src/components/TittleName";


const Likes=()=> {
    const navigate = useNavigate()
    const {likes} = useStore()

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
                        Me Gustan
                      </TittleName>
                    </div>

                    <div className="flex justify-start  rounded-sm p-4 gap-1 items-center pt-4 border bg-white flex-wrap">
                    {/* Contenedor de producto */}

                        {likes?.map(like =>(
                              
                          <div 
                            key={like.id}
                            className="flex group relative rounded-sm overflow-hidden shadow-md cursor-pointer"
                            onClick={()=> {
                              navigate('/product/'+ like.product.name +'?code='+ like.product.code)
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            })
                            }}
                          >
                            <div 
                              className="lg:opacity-0 lg:group-hover:opacity-100 absolute right-0 p-1 transition-all duration-300"
                            >
                              <LikeHart
                                productId={like.product['id']}
                              />
                            </div>
                            <div className="from-transparent absolute group-hover:bg-cyanPrimary w-full h-full opacity-30"></div>
                            <div 
                              className="absolute flex justify-center items-center h-full w-full text-center text-white text-xl text-shadow font-bold"
                            >
                              {like.product['name']}
                            </div>

                            <div 
                              className="absolute flex  bottom-0 justify-center w-full text-center text-white text-sm text-shadow  backdrop-blur-md font-regular bg-white bg-opacity-30  rounded-b-sm"
                            >
                              Cód. {like.product.code}
                            </div>

                            <div className=" w-80 h-80  md:w-48 md:h-48 flex justify-center items-center shrink-0 border border-white bg-[#15A7AE]/60">
                              <img 
                                className="object-contain h-full rounded-sm"
                                src= {import.meta.env.VITE_API_URL +'/products/' + like.product.image['name']}
                                alt={like.product.image['name']} 
                              />
                            </div>
                          </div>
                            
                        ))}
                    
                    </div>
    
                  
                </div>
    
              </div>
            </div>
          </div>
        </div>
        
      )
}
export default memo(Likes)
