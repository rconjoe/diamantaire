import { useEffect, useState } from 'react';

export function useVariantInventory(variantId: string, trackInventory: boolean) {
  const [isInStock, setInStock] = useState(true); // Default to true
  const [isFetching, setIsFetching] = useState(false);
  let numericalVariantId = variantId;

  if (numericalVariantId?.includes('gid')) {
    numericalVariantId = variantId.split('/').pop();
  }

  useEffect(() => {
    const fetchStockByVariant = async (id: string): Promise<void> => {
      if (trackInventory) {
        setIsFetching(true);
        try {
          const variantStockQtyResponse = await fetch(
            `http://${window.location.host}/api/products/inventory?variantId=${id}`,
          );
          const variantStockJson = await variantStockQtyResponse.json();

          setInStock(variantStockJson?.inventoryQuantity > 0);
        } catch (error) {
          console.error('Inventory fetch error:', error);
        } finally {
          setIsFetching(false);
        }
      } else {
        // If not tracking inventory, assume in stock
        setInStock(true);
      }
    };

    fetchStockByVariant(numericalVariantId);
  }, [numericalVariantId, trackInventory]);

  return { isFetching, isInStock };
}

export default useVariantInventory;
