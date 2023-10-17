import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getAccountTemplate } from '@diamantaire/darkside/template/accounts';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { NextRequest } from 'next/server';
import { useEffect, useState } from 'react';

import AccountDetails from './AccountDetails';
import { AccountOrders } from './AccountOrders';
import { AccountPageNav, navItems } from './AccountPageNav';

const AccountPage = ({ path }) => {
  const [currentCustomer, setCurrentCustomer] = useState(null);

  useEffect(() => {
    async function getCustomer() {
      const response = await fetch('/api/customers/getCustomerByEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload: {
            email: 'sam.davidoff@vrai.com',
          },
        }),
      });

      const data = await response.json();

      return data;
    }

    async function fetchOrders() {
      const customer = await getCustomer();

      setCurrentCustomer(customer);
    }

    fetchOrders();
  }, []);

  return (
    <>
      <AccountPageNav customerName={currentCustomer?.firstName} />
      {path === 'details' && <AccountDetails customer={currentCustomer} />}
      {path === 'order-history' && <AccountOrders customer={currentCustomer} />}
    </>
  );
};

AccountPage.getTemplate = getAccountTemplate;

export interface GetStaticPropsRequest extends NextRequest {
  query: {
    accountPageSlug: string;
  };
}

async function getStaticPaths() {
  const paths = navItems.map((item) => item.href);

  return {
    paths,
    fallback: false,
  };
}

async function getStaticProps({ params, locale }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ ...queries.template.global(locale) });

  return {
    props: {
      path: params.accountPageSlug,
      // ran into a serializing issue - https://github.com/TanStack/query/issues/1458#issuecomment-747716357
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export { AccountPage, getStaticProps, getStaticPaths };
