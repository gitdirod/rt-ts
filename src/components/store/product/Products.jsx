
import { memo } from "react";
import Product from "./Product";

const Products = ({ products }) => {
  return (
    <div className="w-full">
      <div className="mx-auto  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((prod) => (
          <Product key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};

export default memo(Products);
