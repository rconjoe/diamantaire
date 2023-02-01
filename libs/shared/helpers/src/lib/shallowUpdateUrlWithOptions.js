// TODO: Do we need this?

// import Router from 'next/router';

// import { isServer } from './';
// import { getRoute } from '../universal-routes/uniRouteSelectors';

// export const removeTrailingSlash = str => {
//   const [url, params] = str.split('?');

//   if (url.endsWith('/')) {
//     if (!params) {
//       return url.substring(0, url.length - 1);
//     }

//     return [url.substring(0, url.length - 1), '?', params].join('');
//   }

//   return str;
// };

// const shallowUpdateUrlWithOptions = ({
//   category,
//   options,
//   productType,
//   slug,
//   route,
//   product,
// }) => {
//   if (!isServer()) {
//     if (route?.createLink) {
//       const { createLink } = route;
//       const createLinkParam = product
//         ? { product, options }
//         : { slug, options };
//       const { href, as } = createLink(createLinkParam);

//       Router.replace(href, removeTrailingSlash(decodeURIComponent(as)), {
//         shallow: true,
//       });
//     } else {
//       const { createLink } = getRoute(productType, category);
//       const { href, as } = createLink({ product: slug, options });

//       Router.replace(href, decodeURIComponent(as), { shallow: true });
//     }
//   }
// };

// export default shallowUpdateUrlWithOptions;
