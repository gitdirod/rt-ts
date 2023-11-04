import {memo} from 'react'
import useStore from "/src/hooks/useStore";
import Product from "/src/components/Product";

const SuggestedsProducts =()=> {

  const { suggestions } = useStore()

  return (
    <div className='px-2 gap-8 w-full flex flex-col'>
      {suggestions?.map(sugg=> sugg?.products?.some(product=> product?.available == true) && (
        <div key={sugg.id}>
          <div className="center-r py-5">
            <div className='bg-cyanPrimary  text-3xl rounded-lg font-poppins-extrabold px-8 py-1 text-white w-fit'>{sugg.name}</div>
          </div>
          <div className="z-0 flex-wrap justify-center items-center grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-auto px-4 w-full">
            {sugg?.products?.map(product => product?.available == true && (
              <Product
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      ))} 
    </div>
  )
}
export default memo(SuggestedsProducts)