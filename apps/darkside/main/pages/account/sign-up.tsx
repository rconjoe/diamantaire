import { SignUp } from '@clerk/nextjs';
import { getTemplate as getAccountTemplate } from '@diamantaire/darkside/template/accounts';
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
  return (
    <SignUpPageStyles>
      <h1>sign up temp</h1>
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
