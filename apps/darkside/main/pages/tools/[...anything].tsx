// This file can be deleted after April 1st, 2024

const CheckoutRedirect = () => {
  return null;
};

export default CheckoutRedirect;

export async function getServerSideProps() {
  // Set up the destination URL with the dynamic part
  const destination = `https://vrai.com/account/sign-in`;

  // Perform the redirect
  return {
    redirect: {
      destination: destination,
      permanent: false, // Set to true if this is a permanent redirect, false otherwise
    },
  };
}
