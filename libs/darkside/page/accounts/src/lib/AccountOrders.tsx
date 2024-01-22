import { useClerk } from '@clerk/nextjs';
import { UIString } from '@diamantaire/darkside/components/common-ui';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { media } from '@diamantaire/styles/darkside-styles';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { AccountCustomer } from './AccountPage';

const AccountOrdersStyles = styled.div`
  padding: 4rem 0;

  .table {
    .table-row {
      display: flex;
      border-bottom: 0.1rem solid #dcdbd5;

      .table-col {
        flex: 1;
        font-size: var(--font-size-xxsmall);

        ${media.medium`
          font-size: var(--font-size-xxsmall);
        `}
      }
    }
    .table-head {
      .table-row {
        padding: 0 0 1rem;

        .table-col {
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-xsmall);

          ${media.medium`
            font-size: var(--font-size-xsmall);
          `};
        }
      }
    }

    .table-body {
      .table-row {
        padding: 1rem 0;
        a {
          color: var(--color-teal);
          text-decoration: underline;
        }

        .table-col {
          &.status {
            text-transform: capitalize;
          }
        }
      }
    }
  }

  .hide-md {
    display: none;
    ${media.medium`display: block;`}
  }
`;

const AccountOrders = ({ customer }: { customer: AccountCustomer }) => {
  const [orders, setOrders] = useState(null);

  const [ordersLoaded, setOrdersLoaded] = useState(false);

  const { locale } = useRouter();

  const { _t } = useTranslations(locale);

  const clerk = useClerk();

  useEffect(() => {
    async function getOrders() {
      const response = await fetch('/api/customers/getCustomerOrders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload: {
            id: customer?.id,
          },
        }),
      });

      if (response.ok) {
        try {
          return await response.json();
        } catch (error) {
          console.error('Error parsing JSON:', error);

          clerk.signOut();
        }
      } else {
        console.error('HTTP error! Status:', response.status);

        const rawResponse = await response.text();

        console.log('text:', rawResponse);
      }
    }

    async function fetchOrders() {
      const ordersTemp = await getOrders();

      setOrders(ordersTemp);

      setOrdersLoaded(true);
    }

    if (customer?.id) {
      fetchOrders();
    }
  }, [customer]);

  return (
    <AccountOrdersStyles>
      <NextSeo
        title={`${_t('Account Orders')} | VRAI`}
        canonical={typeof window !== 'undefined' && window.location.origin + window.location.pathname}
      />
      {ordersLoaded && (
        <div className="table container-wrapper">
          {orders?.length !== 0 ? (
            <>
              <div className="table-head">
                <div className="table-row">
                  <div className="table-col">
                    <UIString>Order</UIString>
                  </div>
                  <div className="table-col">
                    <UIString>Date</UIString>
                  </div>
                  <div className="table-col">
                    <UIString>Status</UIString>
                  </div>
                  <div className="table-col hide-md">
                    <UIString>Total</UIString>
                  </div>
                </div>
              </div>
              <div className="table-body">
                {orders?.map((order) => {
                  return (
                    <div className="table-row" key={order?.id}>
                      <div className="table-col">
                        <a target="_blank" href={order?.order_status_url}>
                          {order?.name}
                        </a>
                      </div>
                      <div className="table-col">
                        {order?.created_at && format(new Date(order?.created_at), 'MM/dd/yyyy')}
                      </div>
                      <div className="table-col status">{order.financial_status}</div>
                      <div className="table-col hide-md">${order.total_price}</div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p>No orders yet!</p>
          )}
        </div>
      )}
    </AccountOrdersStyles>
  );
};

export { AccountOrders };
