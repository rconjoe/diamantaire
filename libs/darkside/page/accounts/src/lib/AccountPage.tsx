import { RedirectToSignIn, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { getTemplate as getAccountTemplate } from '@diamantaire/darkside/template/accounts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AccountDetails from './AccountDetails';
import { AccountOrders } from './AccountOrders';
import { AccountPageNav } from './AccountPageNav';

export type AccountCustomer = {
  first_name: string;
  last_name: string;
  phone: string;
  id: string;
  email: string;
  default_address: {
    id: string;
    first_name: string;
    last_name: string;
    address1: string;
    address2: string;
    city: string;
    zip: string;
    province: string;
    country: string;
    phone: string;
    country_code: string;
    province_code: string;
  };
};

const AccountPage = () => {
  const [currentCustomer, setCurrentCustomer] = useState<AccountCustomer | null>(null);
  const { user } = useUser();
  const { query: { accountPageSlug: path } = {} } = useRouter();

  useEffect(() => {
    if (!user) return;

    const email = user.emailAddresses?.[0]?.emailAddress || null;

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

      const data = await response.json();

      setCurrentCustomer(data);
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
