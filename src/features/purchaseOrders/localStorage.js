export const getPurchaseOrderProductsFromStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};
  
export const savePurchaseOrderProductsToStorage = (products, key = 'purchaseOrderProducts') => {
    localStorage.setItem(key, JSON.stringify(products));
};
  
export const addProductToPurchaseOrder = (product, key = 'purchaseOrderProducts') => {
    const current = getPurchaseOrderProductsFromStorage(key);
    if(current.some(p => p.product_id === product.id)) return current;

    const updated = [
      ...current,
      {
        product_id: product.id,
        product,
        quantity: 1,
        price: product.price ?? 0
      }
    ];
    savePurchaseOrderProductsToStorage(updated, key);
    return updated;
};

export const addProductsToPurchaseOrder = (products, key = 'purchaseOrderProducts')=>{
    const current = getPurchaseOrderProductsFromStorage(key);
    const news = [];

    products?.forEach((p) => {
        const existe = current.some((o) => o.product_id === p.id);
        if (!existe) {
          news.push({
            product_id: p.id,
            price: p.price || 0,
            quantity: 1,
            product: p,
          });
        }
    });
    const updated = [...current, ...news];
    savePurchaseOrderProductsToStorage(updated, key);
    return updated;
}
  
  
export const updateProductInPurchaseOrder = (productId, field, value, key = 'purchaseOrderProducts') => {
    const current = getPurchaseOrderProductsFromStorage(key);
    const updated = current.map(p =>
        p.product_id === productId ? { ...p, [field]: value } : p
    );
    savePurchaseOrderProductsToStorage(updated, key);
    return updated;
};
  
export const removeProductFromPurchaseOrder = (productId, key = 'purchaseOrderProducts') => {
    const current = getPurchaseOrderProductsFromStorage(key);
    const updated = current.filter(p => p.product_id !== productId);
    savePurchaseOrderProductsToStorage(updated, key);
    return updated;
};

export const removeProductsFromPurchaseOrder = (products, key = 'purchaseOrderProducts') => {
    const current = getPurchaseOrderProductsFromStorage(key);
    const idsToDelete = new Set(products.map(p => p.id));
  
    const updated = current.filter(p => !idsToDelete.has(p.product_id));
    savePurchaseOrderProductsToStorage(updated, key);
    return updated;
  };
  
export const clearPurchaseOrder = (key = 'purchaseOrderProducts') => {
    localStorage.removeItem(key);
    return [];
};
  