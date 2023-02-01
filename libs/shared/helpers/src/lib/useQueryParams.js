import { useRouter } from 'next/router';
import { fromPairs } from 'lodash';

/**
 * Convert router.asPath to an object/hash.
 *
 * This is useful in client-side components that don't require data from the server.
 */
export const parsePath = asPath => {
  if (asPath) {
    const url = new URL(asPath, 'http://dummy.com'); // since asPath is relative, we need base url to attach it to, hence we use dummy base url

    if (url.searchParams) {
      const query = fromPairs(Array.from(url.searchParams.entries()));

      return query;
    }
  }

  return {};
};

export const getParams = () => {
  try {
    return parsePath(window.location.href);
  } catch {
    return {};
  }
};

export const useQueryParams = () => {
  const routerInfo = useRouter();

  return parsePath(routerInfo.asPath);
};

export default useQueryParams;
