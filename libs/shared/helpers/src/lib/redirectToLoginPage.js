export default function redirectToLoginPage({ res, req }) {
  /**
   * TODO: Replace with { redirect } return when
   * we upgrade to next 10, as this approach is
   * not desirable for clientside
   * https://github.com/vercel/next.js/discussions/11281
   */
  const isServer = !!req;

  if (isServer) {
    res.setHeader('location', '/account/login');
    res.statusCode = 302;
    res.end();

    return {
      props: {},
    };
  } else {
    return {
      props: {
        shouldRedirectToLogin: true,
      },
    };
  }
}
