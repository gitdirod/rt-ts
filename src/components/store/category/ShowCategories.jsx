import { memo } from "react"
import useStore from "/src/hooks/useStore"
import Category from "./Category"
import TittleName from "../common/TittleName";

const ShowCategories =({width='w-40', height='h-auto', font = "text-2xl"})=> {
  const {
    categories
  } = useStore();
  return (
    
    <div
      className="flex flex-col gap-y-4 justify-center items-center w-full xl:px-20 py-16"
    >
      <TittleName>
        Compra por categorías
      </TittleName>
      <div className="flex shrink-0 flex-wrap justify-center items-center gap-4 container w-full">
        
        {categories?.map(category => category.show == true && (
          <div
            key={category?.id}
            onClick={()=>{
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }}
          >
            <Category 
              categoria={category}
              width={width}
              height={height}
              font={font}
            />
          </div>
        ))}

      </div>
    </div>
    
  )
}

export default memo(ShowCategories)


