import { SignIn } from '@clerk/nextjs';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import {
  POST_SIGN_IN_REDIRECT_URL,
  POST_SIGN_UP_REDIRECT_URL,
  SIGN_UP_REDIRECT_URL,
} from '@diamantaire/darkside/page/accounts';
import { getTemplate as getAccountTemplate } from '@diamantaire/darkside/template/accounts';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';

const SignInPageStyles = styled.div`
  padding: 50px 0 100px;
  margin: 0 auto;
  max-width: 400px;
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

  return (
    <SignInPageStyles>
      <NextSeo title={`${_t('Sign In')} | VRAI`} />
      <p>
        {_t('If this is your first time signing in, please create an account using the email you placed your order with')}
      </p>
      <SignIn
        appearance={{
          variables: {
            colorPrimary: '#5e7a7d',
            fontSize: '2rem',
            spacingUnit: '2rem',
          },
        }}
        signUpUrl={SIGN_UP_REDIRECT_URL}
        afterSignUpUrl={POST_SIGN_UP_REDIRECT_URL}
        afterSignInUrl={POST_SIGN_IN_REDIRECT_URL}
      />
    </SignInPageStyles>
  );
};

SignInPage.getTemplate = getAccountTemplate;
export default SignInPage;
