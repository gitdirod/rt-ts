import useStore from '/src/hooks/useStore'
import React from 'react'
import PurchaseOrderTableUnits from './PurchaseOrderTableUnits'

export default function PasoUnidades() {
  const { orderBuy, handleUpdateProduct, handleRemoveProductBuy } = useStore();

  return (
    <PurchaseOrderTableUnits
      products={orderBuy}
      handleUpdateProduct={handleUpdateProduct}
      handleRemoveProductBuy={handleRemoveProductBuy}
    />
  );
}
