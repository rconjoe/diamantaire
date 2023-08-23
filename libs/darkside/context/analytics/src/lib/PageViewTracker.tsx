import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useRudderstack } from './RudderstackProvider';

const PageViewTracker = () => {
  const { trackPageView } = useRudderstack();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      trackPageView();
    };

    // Add an event listener for route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Manually track the initial page view when the component mounts
    trackPageView();

    // Clean up the event listener when the component unmounts
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; // This component doesn't render anything in the DOM
};

export { PageViewTracker };
