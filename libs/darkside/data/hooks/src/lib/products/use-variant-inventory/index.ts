import { useEffect, useState } from 'react';

export function useVariantInventory(variantId: string, trackInventory: boolean) {
  const [isInStock, setInStock] = useState(true); // Default to true
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchStockByVariant = async (id: string): Promise<void> => {
      if (trackInventory) {
        setIsFetching(true);
        try {
          const variantStockQtyResponse = await fetch(
            `http://${window.location.host}/api/products/inventory?variantId=${id}`,
          );
          const variantStockQty = await variantStockQtyResponse.json();

          setInStock(variantStockQty?.inventoryQuantity > 0);
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

    fetchStockByVariant(variantId);
  }, [variantId, trackInventory]);

  return { isFetching, isInStock };
}

export default useVariantInventory;
