import { SignIn } from '@clerk/nextjs';
import { getTemplate as getAccountTemplate } from '@diamantaire/darkside/template/accounts';
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
`;

const SignInPage = () => {
  return (
    <SignInPageStyles>
      <h1>sign in temp</h1>
      <SignIn
        appearance={{
          variables: {
            colorPrimary: '#5e7a7d',
            fontSize: '2rem',
            spacingUnit: '2rem',
          },
        }}
        signUpUrl="/account/sign-up"
        afterSignUpUrl="/account/details"
        afterSignInUrl="/account/details"
      />
    </SignInPageStyles>
  );
};

SignInPage.getTemplate = getAccountTemplate;
export default SignInPage;
