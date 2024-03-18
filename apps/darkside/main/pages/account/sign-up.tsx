import { getTemplate as getAccountTemplate } from '@diamantaire/darkside/template/accounts';
import { useRouter } from 'next/router';

const SignInPage = () => {
  const router = useRouter();

  return router.push('/account/sign-in');
};

SignInPage.getTemplate = getAccountTemplate;
export default SignInPage;
