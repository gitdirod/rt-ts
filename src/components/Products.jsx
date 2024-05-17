import Product from "./Product";
import { memo } from "react";
const Products=({products})=> {
  return (
    <div className="flex-wrap justify-center items-center grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-auto px-4 w-full">
      {products?.map(prod => (
        <Product
          key={prod.id}
          product={prod}
        />
        ))
      }
    </div>
  )
}
export default memo(Products)