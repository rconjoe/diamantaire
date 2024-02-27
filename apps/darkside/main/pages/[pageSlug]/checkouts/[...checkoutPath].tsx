const CheckoutRedirect = () => {
  return null;
};

export default CheckoutRedirect;

export async function getServerSideProps(context) {
  // Set up the destination URL with the dynamic part
  const destination = `https://checkout.vrai.com${context.resolvedUrl}`;

  // Perform the redirect
  return {
    redirect: {
      destination: destination,
      permanent: false, // Set to true if this is a permanent redirect, false otherwise
    },
  };
}
