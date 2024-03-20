import type { RudderAnalytics } from '@rudderstack/analytics-js';
import { useEffect, useState } from 'react';

const useRudderStackAnalytics = (): RudderAnalytics | undefined => {
  const [analytics, setAnalytics] = useState<RudderAnalytics>();

  useEffect(() => {
    if (!analytics) {
      const initialize = async () => {
        const { RudderAnalytics } = await import('@rudderstack/analytics-js');
        const analyticsInstance = new RudderAnalytics();

        analyticsInstance.load(
          process.env['NEXT_PUBLIC_RUDDERSTACK_KEY'],
          process.env['NEXT_PUBLIC_RUDDERSTACK_DATA_PLANE'],
        );

        analyticsInstance.ready(() => {
          console.log('We are all set!!!');
        });

        setAnalytics(analyticsInstance);
      };

      initialize().catch((e) => console.log(e));
    }
  }, [analytics]);

  return analytics;
};

export { useRudderStackAnalytics };
