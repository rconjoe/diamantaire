import { useEffect, useState, useRef } from 'react';

export function useVariantInventory(variantId: string, trackInventory: boolean) {
  const [isInStock, setInStock] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const abortController = useRef(new AbortController());

  useEffect(() => {
    const fetchStockByVariant = async (id: string) => {
      if (trackInventory) {
        setIsFetching(true);
        abortController.current.abort(); // Cancel the previous fetch request
        abortController.current = new AbortController();

        try {
          const BASE_URL =
            typeof window === 'undefined'
              ? process.env['NEXT_PUBLIC_PROTOCOL'] + process.env['NEXT_PUBLIC_VERCEL_URL']
              : window.location.origin;
          const reqUrl = `${BASE_URL}/api/products/inventory?${new URLSearchParams({ variantId: id }).toString()}`;

          const response = await fetch(reqUrl, { signal: abortController.current.signal });
          const { inventoryQuantity, inventoryPolicy } = await response.json();

          setInStock(inventoryPolicy === 'continue' || inventoryQuantity > 0);
        } catch (error) {
          if (error instanceof Error && error.name !== 'AbortError') {
            console.error('Error fetching inventory:', error);
            setInStock(true); // Assume in stock if there's an error
          }
        } finally {
          setIsFetching(false);
        }
      } else {
        setInStock(true);
      }
    };

    // Extract numerical ID if variantId is in a URL format
    const numericalVariantId = variantId?.includes('gid') ? variantId?.split('/').pop() : variantId;


    // Reset isInStock based on trackInventory when variantId changes
    setInStock(!trackInventory);
    fetchStockByVariant(numericalVariantId);

    // Cleanup function to abort fetch when component unmounts or variant changes
    return () => {
      abortController.current.abort();
    };
  }, [variantId, trackInventory]);

  return { isFetching, isInStock };
}

export default useVariantInventory;
