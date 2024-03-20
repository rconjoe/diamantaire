import { useUser } from '@clerk/nextjs';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { AccountLogin } from '@diamantaire/darkside/page/accounts';
import { getTemplate as getAccountTemplate } from '@diamantaire/darkside/template/accounts';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';

const SignInPageStyles = styled.div`
  padding: 50px 0 100px;
  margin: 0 auto;
  max-width: 400px;
  min-height: 63rem;

  .cl-rootBox {
    width: 100%;
    margin: 0 auto;

    .cl-card {
      width: 100%;
      margin: 0px;

      .cl-formFieldInput {
        padding-left: 15px;
      }
    }
  }
  > p {
    margin-bottom: 30px;
    text-align: center;
  }
`;

const SignInPage = () => {
  const { locale } = useRouter();
  const { _t } = useTranslations(locale);

  const { user } = useUser();

  // Need page to reload if the user is already logged in
  if (user?.id) {
    return (window.location.href = `${window.location.origin}/account/details`);
  }

  return (
    <SignInPageStyles>
      <NextSeo title={`${_t('Sign In')} | VRAI`} />
      <AccountLogin />
    </SignInPageStyles>
  );
};

SignInPage.getTemplate = getAccountTemplate;

export default SignInPage;
