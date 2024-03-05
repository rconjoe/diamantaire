import { CartItemsList } from '@diamantaire/darkside/components/cart';
import { useInternalCheckout } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/global';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface InternalCheckoutPageProps {
  locale: string;
  dehydratedState: DehydratedState;
}

const InternalCheckoutPage = () => {
  const { data: { internalCheckout: attributionData } = {}, isLoading } = useInternalCheckout();

  // Local state for the selected options
  const [selectedChannel, setSelectedChannel] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSalesPerson, setSelectedSalesPerson] = useState('');

  // Initialize selection when data is loaded
  useEffect(() => {
    if (attributionData) {
      setSelectedChannel(attributionData.salesChannels[0]?.name || '');
      setSelectedLocation(attributionData.salesLocations[0]?.name || '');
      setSelectedSalesPerson(attributionData.salesReps[0]?.name || '');
    }
  }, [attributionData]);

  const handleCreateSalesOrder = async () => {
    // Prepare the data for your draft order creation
    // This includes both cart items and sales attribution details
    const draftOrderData = {
      // Include necessary attributes from cartData and selections from sales attribution
      note: cartData?.note,
      buyerIdentity: cartData?.buyerIdentity,
      lines: cartData?.lines,
      // Add any other necessary details for order creation
    };

    // Fetch call to create the draft order
    console.log('Creating draft order with:', draftOrderData);
    // Implement the fetch call
  };

  if (isLoading) return <div>Loading...</div>;

  const InternalCheckoutStyles = styled.div`
    .wrapper {
      display: flex;
    }
  `;

  return (
    <InternalCheckoutStyles>
      <h2>Create Draft Order</h2>
      <form onSubmit={handleCreateSalesOrder}>
        <div className="wrapper">
          <div>
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
                <option key={rep.name} value={rep.name}>
                  {rep.name} : {rep.salesId}
                </option>
              ))}
            </select>
          </div>
          <div>
            <CartItemsList />
          </div>
        </div>
        <button type="submit">Create Draft Order</button>
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
