import { SignUp } from '@clerk/nextjs';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { getTemplate as getAccountTemplate } from '@diamantaire/darkside/template/accounts';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';

const SignUpPageStyles = styled.div`
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
`;
const SignInPage = () => {
  const { locale } = useRouter();
  const { _t } = useTranslations(locale);

  return (
    <SignUpPageStyles>
      <NextSeo title={`${_t('Sign Up')} | VRAI`} />
      <SignUp
        appearance={{
          variables: {
            colorPrimary: '#5e7a7d',
            fontSize: '2rem',
            spacingUnit: '2rem',
          },
        }}
        afterSignUpUrl="/account/details"
        afterSignInUrl="/account/details"
        routing="hash"
      />
    </SignUpPageStyles>
  );
};

SignInPage.getTemplate = getAccountTemplate;
export default SignInPage;
