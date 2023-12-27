import { DEFAULT_LOCALE, VO_ROOT_URL } from '@diamantaire/shared/constants';

const getCurrentUrl = ({ locale, asPath }) => {
  const localeSubdir = locale !== DEFAULT_LOCALE ? `/${locale}` : '';

  return `${VO_ROOT_URL}${localeSubdir}${asPath}`;
};

export { getCurrentUrl };
