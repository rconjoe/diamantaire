import { useEffect, useState } from 'react';

export function useVariantInventory(variantId: string, trackInventory: boolean) {
  const [isInStock, setInStock] = useState(!trackInventory);
  const [isFetching, setIsFetching] = useState(false);
  let numericalVariantId = variantId;

  if (numericalVariantId?.includes('gid')) {
    numericalVariantId = variantId.split('/').pop();
  }

  useEffect(() => {
    const fetchStockByVariant = async (id: string): Promise<any> => {
      setIsFetching(true);

      const variantStockQtyResponse = await fetch(`http://${window.location.host}/api/products/inventory?variantId=${id}`);
      const variantStockQty = await variantStockQtyResponse.json();

      setIsFetching(false);

      if (variantStockQty?.inventoryQuantity > 0) {
        setInStock(true);
      } else {
        setInStock(false);
      }
    };

    if (trackInventory) {
      fetchStockByVariant(numericalVariantId);
    }
  }, [numericalVariantId, trackInventory]);

  return {
    isFetching,
    isInStock,
  };
}

export default useVariantInventory;
