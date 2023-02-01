// TODO: Do we need this?

// import Router from 'next/router';
// import debugFor from 'debug';

// import * as auctionRoutes from '../universal-routes/auctionRoutes';

// const debug = debugFor('JewelryUrlUpdater');

// function auctionShallowUpdateUrlWithOptions({ slug, options }) {
//   let route;

//   switch (slug) {
//     case 'vrai-single-diamond-cross-necklace': {
//       route = auctionRoutes.diamondCrossProduct;
//       break;
//     }
//     default: {
//       debug(`Route ${slug} for auction slug not found.`);
//     }
//   }

//   if (route) {
//     const { createLink } = route;
//     const { href, as } = createLink({ product: slug, options });

//     Router.replace(href, decodeURIComponent(as), { shallow: true });
//   }
// }

// export function getAuctionUrl({ slug, options }) {
//   let route;

//   switch (slug) {
//     case 'vrai-single-diamond-cross-necklace': {
//       route = auctionRoutes.diamondCrossProduct;
//       break;
//     }
//     default: {
//       debug(`Route ${slug} for auction slug not found.`);
//     }
//   }

//   if (route) {
//     const { createLink } = route;
//     const { as } = createLink({ product: slug, options });

//     return as;
//   }

//   return null;
// }

// export default auctionShallowUpdateUrlWithOptions;
