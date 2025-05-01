import useStore from '/src/hooks/useStore'
import React from 'react'
import PurchaseOrderTableUnits from './PurchaseOrderTableUnits'

export default function PasoUnidades() {
  const { orderBuy, setOrderBuy } = useStore();

  const handleUpdateProduct = (id, field, value) => {
    const updated = orderBuy.map(p => {
      if (p.id === id) return { ...p, [field]: value };
      return p;
    });
    setOrderBuy(updated);
    localStorage.setItem('productsBuy', JSON.stringify(updated));
  };

  return (
    <PurchaseOrderTableUnits
      products={orderBuy}
      handleUpdateProduct={handleUpdateProduct}
    />
  );
}
