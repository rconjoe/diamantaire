// TODO: delete

// /* eslint-disable no-unused-vars */

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import { isEqual, omitBy, isUndefined } from 'lodash';
// import Router from 'next/router';

// import { isServer } from './';

// import uniRoutes from '../universal-routes';
// import * as activeProduct from '../store/selectors/activeProduct';
// import * as configuredProducts from '../store/selectors/configuredProducts';
// import * as builder from '../store/selectors/builder';
// import * as router from '../store/selectors/router';

// import { JEWELRY_PRODUCT_SLUGS } from '../shopify/hardcodedJewelryProducts';
// import { getIsModularEngRingMixedDiamond } from './mixedDiamondPairsHelper';

// const propTypes = {
//   slug: PropTypes.string.isRequired,
//   options: PropTypes.object,
//   activeRouteKey: PropTypes.string.isRequired,
//   isRouteChanging: PropTypes.bool,
//   isJewelryProduct: PropTypes.bool,
//   router: PropTypes.object,
// };

// const withBuilderUrlUpdate = WrappedComponent => {
//   class WithUrlUpdateWrapper extends Component {
//     componentDidMount() {
//       const { activeRouteKey, options, slug, router } = this.props;
//       const cleanedOptions = cleanUpOptions(options);
//       const initialOptions = {
//         ...(cleanedOptions?.diamondType && {
//           diamondType: cleanedOptions?.diamondType,
//         }),
//         ...(cleanedOptions?.metal && { metal: cleanedOptions?.metal }),
//       };
//       const { createLink } = uniRoutes[activeRouteKey];
//       const {
//         query: {
//           metal: metalFromQueryParam,
//           diamondType: diamondTypeFromQueryParam,
//         },
//       } = router || { query: {} };

//       if (
//         (cleanedOptions &&
//           cleanedOptions?.metal &&
//           metalFromQueryParam &&
//           metalFromQueryParam !== cleanedOptions?.metal) ||
//         (cleanedOptions &&
//           cleanedOptions?.diamondType &&
//           diamondTypeFromQueryParam &&
//           diamondTypeFromQueryParam !== cleanedOptions?.diamondType)
//       ) {
//         const { href, as } = createLink({
//           product: slug,
//           options: initialOptions,
//         });

//         Router.replace(href, as, { shallow: true });
//       }
//     }
//     componentDidUpdate(prevProps) {
//       if (isServer()) {
//         return;
//       }

//       const {
//         activeRouteKey,
//         options,
//         slug,
//         isRouteChanging,
//         isJewelryProduct,
//       } = this.props;

//       if (isJewelryProduct) {
//         return;
//       }

//       const {
//         options: prevOptions,
//         activeRouteKey: prevActiveRouteKey,
//       } = prevProps;

//       /**
//        * There is a bug when switching routes where shallow updating
//        * here interferes with completing the route change. To deal with this,
//        * we can just do nothing if the route keys are different.
//        * We infer that different route keys means we are changing routes.
//        *
//        * We also check redux for route changing action because it is
//        * not enough just to check the route key on diamond table page, we
//        * need to explicitly check the route is changing or not.
//        */

//       if (isRouteChanging || activeRouteKey !== prevActiveRouteKey) {
//         return;
//       }

//       /**
//        * There is some weird injection happening with options object
//        * that can't be easily explained. However, if we force clean
//        * product key/value from the options object, we can deal with
//        * this weird injection bug. This also cannot be cleaned in
//        * mapStateToProps for some reason as the injection is happening
//        * at this time.
//        *
//        * This is in fact a true mystery as `product`` is never stored in
//        * configuredProducts.options.
//        *
//        * Replication:
//        * Remove cleanUpOptions.
//        * Load a page that has product in query.
//        * /diamonds/pear?metal=platinum&bandAccent=plain&ringSize=5.5&flow=setting&product=knife-edge
//        *
//        * Log out options/prevOptions.
//        *
//        * Click on diamond shapes and view options/prevOptions, you will see
//        * 'product' as a key in options even though if you view
//        * configuredOptions, there is no such key. This causes a repeated
//        * shallow url update causing a infinit loop & crash.
//        *
//        * Disabling `if (product && category === 'diamonds') {`
//        * from createDynamicBuilderRoutes fixes this behaviour so it is possible
//        * that something to do with that is going wrong.
//        */

//       const cleanedOptions = cleanUpOptions(options);

//       const cleanedPrevOptions = cleanUpOptions(prevOptions);

//       if (!isEqual(cleanedOptions, cleanedPrevOptions)) {
//         const { createLink } = uniRoutes[activeRouteKey];

//         const { href, as } = createLink({
//           product: slug,
//           options: cleanedOptions,
//         });

//         Router.replace(href, as, { shallow: true });
//       }
//     }

//     render() {
//       /**
//        * We don't want to pass the props that this component fetches
//        * only the props that should be pass-through
//        */
//       const {
//         slug,
//         options,
//         activeRouteKey,
//         isRouteChanging,
//         ...rest
//       } = this.props;

//       return <WrappedComponent {...rest} />;
//     }
//   }

//   WithUrlUpdateWrapper.propTypes = propTypes;

//   return WithUrlUpdateWrapper;
// };

// const mapStateToProps = state => {
//   const slug = activeProduct.getSlug(state);

//   const isJewelryProduct = JEWELRY_PRODUCT_SLUGS.includes(slug);

//   if (isJewelryProduct) {
//     return {
//       isJewelryProduct,
//     };
//   }

//   const configuredOptions = configuredProducts.getConfiguredOptions(
//     state,
//     slug
//   );

//   const isMixedPair = slug && getIsModularEngRingMixedDiamond(slug);

//   let diamondLotId = configuredProducts.getDiamondLotId(state, slug);

//   if (isMixedPair) {
//     diamondLotId = configuredProducts
//       .getDiamondLotIdsFromPairDiamonds(state, slug)
//       .join();
//   }

//   const activeRouteKey = builder.getActiveRouteKey(state);
//   const activeFlow = builder.getActiveFlow(state);
//   const isRouteChanging = router.getIsRouteChanging(state);
//   const isDiamondsPage = activeRouteKey === 'builderDynamicDiamond';

//   const options = {
//     ...configuredOptions,
//     diamondLotId,
//     ...(!isDiamondsPage && { flow: activeFlow }),
//   };

//   /**
//    * We have a lot of undefined values in our options
//    * that trigger a mistaken evaluaiton in an isEqual comparison.
//    * It might be better to fix this at the source of truth where
//    * the options are being added to configuredProducts.option
//    * even if they are undefined in getInitialProps. We have been
//    * mass dumping options when we setActiveProduct and now we must
//    * pay the price.
//    */
//   const validatedOptions = omitBy(options, isUndefined);

//   return {
//     slug,
//     activeRouteKey,
//     isRouteChanging,
//     options: validatedOptions,
//   };
// };

// export default compose(connect(mapStateToProps), withBuilderUrlUpdate);

// function cleanUpOptions(option) {
//   let strippedOptions = {};

//   for (let key in option) {
//     if (key !== 'product') {
//       strippedOptions[key] = option[key];
//     }
//   }

//   return strippedOptions;
// }
