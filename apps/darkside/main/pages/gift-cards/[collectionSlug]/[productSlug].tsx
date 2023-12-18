import {
  PdpPage,
  PdpPageParams,
  PdpPageProps,
  getServerSideProps as pdpGetServerSideProps,
} from '@diamantaire/darkside/page/pdp';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getCountry, isCountrySupported } from '@diamantaire/shared/helpers';

export async function extendedGetServerSideProps(
  context: GetServerSidePropsContext<PdpPageParams>,
): Promise<GetServerSidePropsResult<PdpPageProps>> {
  // Check if the user is in an international subdirectory, e.g., '/de-DE'
  const { locale } = context;
  const supportedCountries = [{ code: 'US' }];
  const countryCode = getCountry(locale);
  const isSupported = isCountrySupported(supportedCountries, countryCode);

  if (!isSupported) {
    // Show not found error for international users
    return {
      notFound: true,
    };
  }

  // Proceed with the original getServerSideProps for US users
  return pdpGetServerSideProps(context);
}

export default PdpPage;
export { extendedGetServerSideProps as getServerSideProps };
