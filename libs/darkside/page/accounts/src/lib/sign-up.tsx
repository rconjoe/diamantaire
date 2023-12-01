import { getAuth, buildClerkProps } from '@clerk/nextjs/server';
import { GetServerSideProps } from 'next';

import { AccountPage } from './AccountPage';

export default AccountPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = await getAuth(ctx.req);

  if (!userId) {
    return {
      redirect: {
        destination: '/accounts/sign-in?redirect_url=' + ctx.resolvedUrl,
        permanent: false,
      },
    };
  }

  return { props: { ...buildClerkProps(ctx.req) } };
};
