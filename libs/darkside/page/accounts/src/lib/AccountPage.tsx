import { RedirectToSignIn, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { accountEmailCookie } from '@diamantaire/darkside/data/api';
import { getTemplate as getAccountTemplate } from '@diamantaire/darkside/template/accounts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AccountDetails from './AccountDetails';
import { AccountOrders } from './AccountOrders';
import { AccountPageNav } from './AccountPageNav';

export type AccountCustomer = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  id?: string;
  email?: string;
  default_address?: {
    id?: string;
    first_name?: string;
    last_name?: string;
    address1?: string;
    address2?: string;
    city?: string;
    zip?: string;
    province?: string;
    country?: string;
    phone?: string;
    country_code?: string;
    province_code?: string;
  };
};

const AccountPage = () => {
  const [currentCustomer, setCurrentCustomer] = useState<AccountCustomer | null>(null);
  const { user } = useUser();
  const { query: { accountPageSlug: path } = {} } = useRouter();

  useEffect(() => {
    if (!user) return;

    // const email = user.emailAddresses?.[0]?.emailAddress || null;
    const email = 'mjdorony2@gmail.com';

    accountEmailCookie.set(email);

    if (!email) return;

    async function getCustomer() {
      const response = await fetch('/api/customers/getCustomerByEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload: {
            email,
          },
        }),
      });

      if (response.ok) {
        try {
          const json = await response.json();

          setCurrentCustomer(json);
        } catch (error) {
          console.error('Error parsing JSON:', error);

          setCurrentCustomer({
            email,
          });
        }
      } else {
        console.error('HTTP error! Status:', response.status);

        const rawResponse = await response.text();

        console.log('text:', rawResponse);

        setCurrentCustomer({
          email,
        });
      }
    }

    getCustomer();
  }, [user, path]);

  return (
    <>
      <SignedIn>
        <AccountPageNav customerName={currentCustomer?.first_name} />

        {path === 'details' && <AccountDetails customer={currentCustomer} />}

        {path === 'order-history' && <AccountOrders customer={currentCustomer} />}
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

AccountPage.getTemplate = getAccountTemplate;

export { AccountPage };
