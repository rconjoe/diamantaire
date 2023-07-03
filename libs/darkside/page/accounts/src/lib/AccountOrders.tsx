import { media } from '@diamantaire/styles/darkside-styles';
import { format } from 'date-fns';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const AccountOrdersStyles = styled.div`
  padding: var(--gutter) 0;

  .table {
    .table-row {
      display: flex;
      border-bottom: 1px solid #dcdbd5;

      .table-col {
        flex: 1;
        font-size: var(--font-size-xxxsmall);
      }
    }
    .table-head {
      .table-row {
        padding: 10px 0;
        .table-col {
          font-weight: var(--font-weight-bold);
        }
      }
    }
    .table-body {
      .table-row {
        padding: 10px 0;
      }
    }
  }

  .hide-md {
    display: none;
    ${media.medium`display: block;`}
  }
`;

const AccountOrders = ({ customer }) => {
  const [orders, setOrders] = useState([]);

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

      const data = await response.json();

      return data;
    }

    async function fetchOrders() {
      const ordersTemp = await getOrders();

      setOrders(ordersTemp);
    }

    if (customer?.id) {
      fetchOrders();
    }
  }, [customer]);

  return (
    <AccountOrdersStyles>
      <NextSeo title="Account Orders" />
      <div className="table container-wrapper">
        <div className="table-head">
          <div className="table-row">
            <div className="table-col">Order</div>
            <div className="table-col">Date</div>
            <div className="table-col">Status</div>
            <div className="table-col hide-md">Total</div>
          </div>
        </div>
        <div className="table-body">
          {orders?.map((order) => {
            return (
              <div className="table-row" key={order?.id}>
                <div className="table-col">{order?.name}</div>
                <div className="table-col">{order?.createdAt && format(new Date(order?.createdAt), 'MM/dd/yyyy')}</div>
                <div className="table-col">{order?.status === 'FULFILLED' ? 'Shipped' : ''}</div>
                <div className="table-col hide-md">${order?.price?.total?.amount}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AccountOrdersStyles>
  );
};

export { AccountOrders };
