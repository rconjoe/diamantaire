import { CartItemsList } from '@diamantaire/darkside/components/cart';
import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { useInternalCheckout, useCartData } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/global';
import { tabletAndUp } from '@diamantaire/styles/darkside-styles';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface InternalCheckoutPageProps {
  locale: string;
  dehydratedState: DehydratedState;
}

const InternalCheckoutPage = () => {
  const { locale } = useRouter();
  const { data: { internalCheckout: attributionData } = {}, isLoading } = useInternalCheckout();
  const { data: checkout } = useCartData(locale);

  // Local state for the selected options
  const [selectedChannel, setSelectedChannel] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSalesPerson, setSelectedSalesPerson] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  // Initialize selection when data is loaded
  useEffect(() => {
    if (attributionData) {
      setSelectedChannel(attributionData.salesChannels[0]?.name || '');
      setSelectedLocation(attributionData.salesLocations[0]?.name || '');
      setSelectedSalesPerson(`${attributionData.salesReps[0]?.name} : ${attributionData.salesReps[0]?.salesId}` || '');
    }
  }, [attributionData]);

  const handleCreateSalesOrder = async (event: React.FormEvent) => {
    event.preventDefault();

    const variables = normalizeVariablesForDraftOrder({
      checkout,
      selectedChannel,
      selectedLocation,
      selectedSalesPerson,
    });

    createDraftOrder({ variables, setResult, setError });
  };

  if (isLoading) return <div>Loading...</div>;

  const InternalCheckoutStyles = styled.div`
    .wrapper {
      display: grid;
      grid-template-columns: 1fr;
      ${tabletAndUp(`grid-template-columns: 1fr 1fr;`)}
    }
    .col {
      padding: 4rem;
      h2 {
        font-size: 2.5rem;
      }
    }
    .sales-attribution {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      label {
        font-size: 2rem;
      }
      select {
        border-width: 1px;
        border-color: hsl(240 5.9% 90%);
        height: 3.5rem;
      }
      button {
        margin-top: 2rem;
      }
    }
    .result {
      margin: 20px 0;
      background-color: #e5ffe1;
      border: 1px solid var(--color-teal);
      padding: 20px;
      & a {
        color: blue;
        text-decoration: underline;
      }
      & a:hover {
        font-style: none;
      }
    }
  `;

  return (
    <InternalCheckoutStyles>
      <form onSubmit={handleCreateSalesOrder}>
        <div className="wrapper">
          <div className="sales-attribution col">
            <h2>Sales Attribution</h2>
            {/* Sales Channel Select */}
            <label htmlFor="sales_channel">Sales Channel:</label>
            <select id="sales_channel" value={selectedChannel} onChange={(e) => setSelectedChannel(e.target.value)}>
              {attributionData?.salesChannels.map((channel) => (
                <option key={channel.name} value={channel.name}>
                  {channel.name}
                </option>
              ))}
            </select>

            {/* Location Select */}
            <label htmlFor="location">Location:</label>
            <select id="location" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              {attributionData?.salesLocations.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>

            {/* Sales Person Select */}
            <label htmlFor="sales_person">Sales Person:</label>
            <select id="sales_person" value={selectedSalesPerson} onChange={(e) => setSelectedSalesPerson(e.target.value)}>
              {attributionData?.salesReps.map((rep) => (
                <option key={rep.name} value={`${rep.name} : ${rep.salesId}`}>
                  {rep.name} : {rep.salesId}
                </option>
              ))}
            </select>
            <DarksideButton buttonType="submit">Create Draft Order</DarksideButton>
            {result && (
              <div className="result">
                <h3>Draft Order Created {new Date(result?.createdAt).toLocaleDateString()}</h3>
                <p>
                  <a
                    href={`https://admin.shopify.com/store/vo-live/draft_orders/${result?.id?.split('/').pop()}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Draft Order
                  </a>
                </p>
                {result?.invoiceUrl && (
                  <>
                    <h3>or View Checkout Page</h3>

                    <p>
                      <a href={result?.invoiceUrl} target="_blank" rel="noreferrer">
                        View Checkout Page
                      </a>
                    </p>
                  </>
                )}
              </div>
            )}
            {error && <div className="error-message">{error}</div>}
          </div>
          <div className="col">
            <h2>Create Draft Order</h2>

            <p>You can create a draft order from the the items currently on your cart on www.vrai.com (on this device).</p>

            <CartItemsList />
          </div>
        </div>
      </form>
      {/* Additional JSX for displaying errors, draft order details, etc. */}
    </InternalCheckoutStyles>
  );
};

InternalCheckoutPage.getTemplate = getTemplate;

async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<InternalCheckoutPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const { locale } = context;

  const internalCheckoutQuery = queries.internalCheckout.content();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(internalCheckoutQuery);

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  const props: InternalCheckoutPageProps = {
    locale,
    dehydratedState,
  };

  return {
    props,
  };
}

export { InternalCheckoutPage, getServerSideProps as getServerSidePropsInternalCheckoutPage };

export default InternalCheckoutPage;

export const normalizeVariablesForDraftOrder = ({ checkout, selectedChannel, selectedLocation, selectedSalesPerson }) => {
  const lineItems = checkout.lines.map((line) => ({
    variantId: line.merchandise.id,
    quantity: line.quantity,
    customAttributes: line.attributes,
  }));

  const variables = {
    input: {
      lineItems: lineItems,
      customAttributes: [
        ...checkout.attributes,
        { key: 'sales_channel', value: selectedChannel },
        { key: 'location', value: selectedLocation },
        { key: 'sales_person', value: selectedSalesPerson },
      ],
      note: checkout.note,
    },
  };

  return variables;
};

export const createDraftOrder = async ({ variables, setResult, setError }) => {
  const BASE_URL = `${process.env['NEXT_PUBLIC_PROTOCOL']}${process.env['NEXT_PUBLIC_VERCEL_URL']}`;
  const baseUrl = typeof window === 'undefined' ? BASE_URL : window.location.origin;

  try {
    const response = await fetch(`${baseUrl}/api/shopify/create-draft-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(variables),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    setResult(data);
  } catch (error) {
    setError('An error occurred while creating the draft order. Please try again.');
    console.error('Error creating draft order:', error);
  }
};
