import { RedirectToSignIn, SignedIn, UserButton, SignedOut } from '@clerk/nextjs';
import { getTemplate as getAccountTemplate } from '@diamantaire/darkside/template/accounts';
import { useEffect, useState } from 'react';

import AccountDetails from './AccountDetails';
import { AccountOrders } from './AccountOrders';
import { AccountPageNav } from './AccountPageNav';

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
      <SignedIn>
        <AccountPageNav customerName={currentCustomer?.firstName} />
        {path === 'details' && <AccountDetails customer={currentCustomer} />}
        {path === 'order-history' && <AccountOrders customer={currentCustomer} />}
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <UserButton />
    </>
  );
};

AccountPage.getTemplate = getAccountTemplate;

export { AccountPage };
