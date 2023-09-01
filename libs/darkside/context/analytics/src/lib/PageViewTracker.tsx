import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAnalytics } from './AnalyticsProvider';

const PageViewTracker = ({ productData }) => {
  const { viewPage, productViewed } = useAnalytics();
  const router = useRouter();

  function emitViewPageEvent(pageName: string) {
    const segments = router?.pathname.split('/').filter(Boolean);
    const productSlugSegmentPath = segments[segments.length - 1];
    const isProductSlug = productSlugSegmentPath === '[productSlug]';

    if (isProductSlug) {
      const { id, productTitle, productType, image, sku, price } = productData || {};

      productViewed({
        product_id: id,
        sku: sku,
        category: productType,
        name: productTitle,
        brand: 'VRAI',
        // variant: '111',
        price,
        quantity: 1,
        currency: 'USD',
        // url,
        image_url: image?.src,
      });
    } else {
      viewPage(pageName);
    }
  }

  useEffect(() => {
    const handleRouteChange = () => {
      console.log('handle route change', router.pathname);
      emitViewPageEvent(router.pathname);
    };

    // Add an event listener for route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Manually track the initial page view when the component mounts
    emitViewPageEvent(router.pathname);

    // Clean up the event listener when the component unmounts
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // This component doesn't render anything in the DOM
};

export { PageViewTracker };
