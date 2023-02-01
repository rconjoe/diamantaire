import { ACCOUNT_DETAILS_PATH } from '@diamantaire/shared/constants';

const buildRedirectUrl = ({ redirectTo, redirectType }) => {
  if (redirectType === 'auction') {
    const redirectUrl = {
      slug: redirectTo,
    };

    return redirectUrl;
  }

  return ACCOUNT_DETAILS_PATH;
};

export default buildRedirectUrl;
