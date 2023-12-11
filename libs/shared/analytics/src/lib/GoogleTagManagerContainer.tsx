'use client';

import { isProdEnv } from '@diamantaire/shared/constants';
import { getIsUserInEu } from '@diamantaire/shared/geolocation';
import { GoogleTagManager } from '@next/third-parties/google';
import { useCookieConsentContext } from '@use-cookie-consent/react';

const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;
const isDevEnabled = process.env.NEXT_PUBLIC_LOCAL_GTM === 'true'; // set locally in .env.local

const GoogleTagManagerContainer = () => {
  const isUserInEu = getIsUserInEu();
  const { consent } = useCookieConsentContext();

  // 3 cases:
  // 1. User is in EU and has accepted statistics and marketing cookies
  // 2. User is not in EU and is in production environment
  // 3. User is in development environment and has enabled GTM

  const isEnabled =
    (isProdEnv && isUserInEu && consent?.statistics && consent?.marketing) || (!isUserInEu && isProdEnv) || isDevEnabled;

  if (!isEnabled || !GTM_CONTAINER_ID) {
    return null;
  }

  return <GoogleTagManager gtmId={GTM_CONTAINER_ID} />;
};

export { GoogleTagManagerContainer };
export default GoogleTagManagerContainer;
