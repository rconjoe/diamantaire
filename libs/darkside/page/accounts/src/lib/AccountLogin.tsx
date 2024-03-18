import { useSignIn, useSignUp } from '@clerk/nextjs';
import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { GoogleIcon, Logo } from '@diamantaire/shared/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

export type EmailLinkFactor = {
  emailAddressId: string;
  safeIdentifier: string;
  primary?: boolean;
};

const AccountLoginStyles = styled.div`
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 24px 48px;
  border: 1px solid transparent;

  .form__inner {
    padding: 40px;

    .logo-container {
      margin-bottom: 2rem;
      text-align: center;
      svg {
        max-width: 70px;
        height: auto;
        margin: 0 auto;
      }
    }

    .confirmation-text {
      text-align: center;
    }

    .google-auth {
      span {
        position: relative;
        top: 0.5rem;
        margin-right: 0.5rem;
      }
      button {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 1rem 2rem 1.5rem;
      }
    }

    .divider {
      display: flex;
      margin: 4rem 0;

      .line {
        flex: 1;
        border-bottom: 1px solid #ccc;
        position: relative;
        top: -10px;
      }

      .or-text {
        font-size: var(--font-size-xxsmall);
        padding: 0 1rem;
      }
    }

    .input-container {
      margin-bottom: 10px;
      label {
        display: block;
        font-size: var(--font-size-xxsmall);
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
      input {
        border: 1px solid #ccc;
        height: 4.5rem;
        width: 100%;
        padding-left: 10px;
        border-radius: 4px;
        font-size: var(--font-size-xxsmall);
      }
    }
  }
`;

const AccountLogin = () => {
  const { isLoaded, signUp } = useSignUp();
  const { signIn } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const { locale } = useRouter();

  const { _t } = useTranslations(locale);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    // First tries to sign up user, if user already exists, it will sign them in.

    try {
      setPendingVerification(true);

      await signUp.create({
        emailAddress,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_link',
        redirectUrl: `${window.location.origin}/account/details`,
      });
    } catch (err: any) {
      const errorCode = JSON.parse(JSON.stringify(err))?.errors?.[0]?.code;

      // If user already exists, we need to sign them in.
      if (errorCode === 'form_identifier_exists') {
        const si = await signIn.create({ identifier: emailAddress });

        const { emailAddressId }: any = si.supportedFirstFactors.find(
          (ff) => ff.strategy === 'email_link' && ff.safeIdentifier === emailAddress,
        );

        const { startEmailLinkFlow } = signIn.createEmailLinkFlow();

        await startEmailLinkFlow({ emailAddressId: emailAddressId, redirectUrl: window.location.href });

        // change the UI to our pending section.
      }
    }
  };

  // Google Login
  const signInWithOAuth = (strategy: any) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/account/details',
    });
  };

  return (
    <AccountLoginStyles>
      <div className="form__inner">
        <div className="logo-container">
          <Logo />
        </div>

        {pendingVerification ? (
          <div className="confirmation-text">
            <p>Check your email for an authentication link from VRAI</p>
          </div>
        ) : (
          <>
            <div className="oauth-container">
              <DarksideButton
                type="outline"
                textSize="small"
                colorTheme="black"
                className="google-auth"
                onClick={() => signInWithOAuth('oauth_google')}
              >
                <span>
                  <GoogleIcon />
                </span>{' '}
                Continue with Google
              </DarksideButton>
            </div>

            <div className="divider">
              <span className="line"></span>
              <span className="or-text">or</span>
              <span className="line"></span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" onChange={(e) => setEmailAddress(e.target.value)} />
              </div>
              <DarksideButton textSize="small" colorTheme="teal" buttonType="submit">
                Continue
              </DarksideButton>
            </form>
          </>
        )}
      </div>
    </AccountLoginStyles>
  );
};

export { AccountLogin };
