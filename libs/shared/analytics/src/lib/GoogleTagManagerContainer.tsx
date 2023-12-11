'use client';

import { getIsUserInEu } from '@diamantaire/shared/geolocation';
import { GoogleTagManager } from '@next/third-parties/google';
import { useCookieConsentContext } from '@use-cookie-consent/react';

const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;
const isDevEnabled = process.env.NEXT_PUBLIC_LOCAL_GTM === 'true';

const GoogleTagManagerContainer = () => {
  const isUserInEu = getIsUserInEu();
  const { consent } = useCookieConsentContext();

  const isEnabled = !isUserInEu || (consent?.statistics && consent?.marketing) || isDevEnabled;

  if (!isEnabled || !GTM_CONTAINER_ID) {
    return null;
  }

  return <GoogleTagManager gtmId={GTM_CONTAINER_ID} />;
};

export { GoogleTagManagerContainer };
export default GoogleTagManagerContainer;
