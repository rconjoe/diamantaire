import { useEffect, useState } from 'react';

export function useVariantInventory(variantId: string, trackInventory: boolean) {
  const [isInStock, setInStock] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  // Extract numerical ID if variantId is in a URL format
  let numericalVariantId = variantId.includes('gid') ? variantId.split('/').pop() : variantId;

  useEffect(() => {
    const fetchStockByVariant = async (id: string) => {
      if (trackInventory) {
        setIsFetching(true);

        // Constructing the request URL
        const BASE_URL =
          typeof window === 'undefined'
            ? process.env['NEXT_PUBLIC_PROTOCOL'] + process.env['NEXT_PUBLIC_VERCEL_URL']
            : window.location.origin;
        const reqUrl = `${BASE_URL}/api/products/inventory?${new URLSearchParams({ variantId: id }).toString()}`;

        try {
          const response = await fetch(reqUrl);
          const { inventoryQuantity, inventoryPolicy } = await response.json();

          // Determine stock status based on inventory policy and quantity
          setInStock(inventoryPolicy === 'continue' || inventoryQuantity > 0);
        } catch (error) {
          console.error('Error fetching inventory:', error);
          setInStock(true); // Assume in stock if there's an error
        } finally {
          setIsFetching(false);
        }
      } else {
        // If not tracking inventory, assume in stock
        setInStock(true);
      }
    };

    // Reset isInStock based on trackInventory when variantId changes
    setInStock(!trackInventory);
    fetchStockByVariant(numericalVariantId);
  }, [numericalVariantId, trackInventory]);

  return { isFetching, isInStock };
}

export default useVariantInventory;
