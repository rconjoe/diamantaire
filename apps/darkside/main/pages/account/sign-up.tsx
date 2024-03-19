import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignInPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/account/sign-in');
  }, []);

  return <></>;
};

export default SignInPage;
