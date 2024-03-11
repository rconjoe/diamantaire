import { ERProductCartItemProps, ProductAddonDiamond, addERProductToCart } from '@diamantaire/darkside/data/api';
import {
  parseValidLocale,
  getCurrency,
  getFormattedPrice,
  DIAMOND_TYPE_HUMAN_NAMES,
  PdpTypePlural,
  pdpTypeSingleToPluralAsConst,
} from '@diamantaire/shared/constants';
import { getFormattedShipByDate, specGenerator } from '@diamantaire/shared/helpers';
import { createShopifyVariantId } from '@diamantaire/shared-product';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export async function addCustomProductToCart({
  selectedSize,
  builderProduct,
  router,
  engravingText,
  updateGlobalContext,
  refetch,
  productIconList,
  shopifyProductData,
  checkout,
  ToastError,
  _t,
  datoParentProductData,
  diamondImages,
  productAdded,
}) {
  const {
    configuration: selectedConfiguration,
    optionConfigs: configurations,
    shopifyVariantId: shopifySettingVariantId,
    productTitle: variantProductTitle,
    variantDetails: additionalVariantData,
  } = shopifyProductData || {};

  const productGroupKey = uuidv4();
  const { product, diamonds } = builderProduct;
  const diamondPrice = Array.isArray(diamonds) && diamonds?.map((diamond) => diamond.price).reduce((a, b) => a + b, 0);
  const { locale } = router || {};
  const { countryCode } = parseValidLocale(locale);
  const currencyCode = getCurrency(countryCode);
  const isToiMoi = router.query.collectionSlug.includes('toi-moi');
  const isDiamondCFY = diamonds?.some((diamond) => diamond?.slug === 'cto-diamonds');
  const shipTimeParent = productIconList?.items?.find(
    (item) => item._modelApiKey === 'modular_shipping_product_icon_list_item',
  );
  const customJewelryPdpTypes = ['Necklace', 'Earrings'];
  const pdpType: PdpTypePlural = customJewelryPdpTypes.includes(product?.productType)
    ? 'Jewelry'
    : pdpTypeSingleToPluralAsConst[product?.productType];
  const {
    shippingBusinessDays,
    shippingBusinessDaysCountryMap,
    shippingText,
    cutForYouShippingBusinessDaysCountryMap,
    cutForYouShippingBusinessDays,
    cutForYouShippingText,
  } = shipTimeParent || {};

  // Step 7: Determine shipping time based on country
  const shippingTime =
    countryCode === 'US'
      ? shippingBusinessDays
      : shippingBusinessDaysCountryMap?.[countryCode]
      ? shippingBusinessDaysCountryMap?.[countryCode]
      : shippingBusinessDaysCountryMap?.['International'];

  // Step 8: Determine custom shipping time for 'Cut For You' (CFY) diamonds
  const cfyShippingTime =
    countryCode === 'US'
      ? cutForYouShippingBusinessDays
      : cutForYouShippingBusinessDaysCountryMap?.[countryCode]
      ? cutForYouShippingBusinessDaysCountryMap?.[countryCode]
      : cutForYouShippingBusinessDaysCountryMap?.['International'];

  // 1. Get the product variant ID for the setting. Need fallback for non-ER custom products
  const settingType = selectedSize?.id ? 'engagement-ring' : 'jewelry';
  const settingVariantId = selectedSize?.id || shopifySettingVariantId;
  const { productType } = product || {};
  const { goldPurity, bandAccent } = product.configuration || {};
  const image = {
    src: product?.productContent?.assetStack?.[0]?.url,
    width: product?.productContent?.assetStack?.[0]?.width,
    height: product?.productContent?.assetStack?.[0]?.height,
  };
  const { productTitle } = datoParentProductData || {};

  console.log('settingVariantId', product);

  // 2. Get the product variant ID for the diamond
  // TODO: Add support for multiple diamonds
  const diamondVariantIds = diamonds.map((diamond) => createShopifyVariantId(diamond?.dangerousInternalShopifyVariantId));

  // 2.5 Check if diamond ID is already in cart (there can only be one of each custom diamond)
  const isDiamondInCart = checkout?.lines?.some((line) => diamondVariantIds.includes(line.merchandise.id));

  if (isDiamondInCart) {
    return toast.error(<ToastError locale={locale} />, {
      autoClose: 3000,
    });
  }

  // 3. Create custom attributes for the setting
  const formattedShippingTime = getFormattedShipByDate(shippingTime, locale);
  const erMetal = (goldPurity ? goldPurity + ' ' : '') + _t(builderProduct?.product?.configuration?.metal);

  const refinedBandAccent =
    settingType === 'engagement-ring' && bandAccent ? bandAccent?.charAt(0)?.toUpperCase() + bandAccent.slice(1) : '';

  const settingSpecs = specGenerator({
    configuration: {
      ...shopifyProductData?.configuration,
      diamondType: diamonds.map((diamond) => DIAMOND_TYPE_HUMAN_NAMES[diamond?.diamondType]).join(' + '),
      ringSize: selectedSize?.value,
    },
    productType,
    _t,
    hasChildDiamond: true,
    locale,
  });

  const settingAttributes: ERProductCartItemProps['settingAttributes'] = {
    _productType: productType,
    _productTypeTranslated: _t(productType),
    metalType: erMetal,
    productAsset: image?.src,
    _productAssetObject: JSON.stringify(image),
    _productTitle: productTitle,
    productIconListShippingCopy: `${_t(shippingText)} ${formattedShippingTime}`,
    pdpUrl: window.location.href,
    shippingText: _t(shippingText),
    feedId: settingVariantId,
    // engraving
    _EngravingBack: engravingText,
    _specs: settingSpecs,
    productGroupKey,
    diamondShape: diamonds.map((diamond) => DIAMOND_TYPE_HUMAN_NAMES[diamond?.diamondType]).join(' + '),
    // centerStone: diamond?.carat + ', ' + diamond?.color + ', ' + diamond?.clarity,
    ringSize: selectedSize?.value,
    bandAccent: refinedBandAccent,
    totalPrice: (product.price + diamondPrice).toString(),
    productCategory: settingType === 'engagement-ring' ? 'Setting' : productType ? productType : 'Setting',
    _dateAdded: Date.now().toString(),
    shippingBusinessDays: isDiamondCFY ? cfyShippingTime?.toString() : shippingTime?.toString(),

    // Diamond Sync
    childProduct: JSON.stringify({
      behavior: 'linked',
      additionalVariantIds: diamonds?.map((diamond) => createShopifyVariantId(diamond?.dangerousInternalShopifyVariantId)),
    }),
  };

  // 4. Create custom attributes for the diamond
  // const isPair = router?.asPath.includes('pair');
  const shippingTextDiamondAttribute = isDiamondCFY ? cutForYouShippingText : _t(shippingText);
  const diamondsToAdd = diamonds.map((diamond, index) => {
    const diamondSpecs = specGenerator({
      configuration: { ...diamond },
      productType: 'Diamond',
      _t,
      locale,
    });
    const diamondAttributes: ProductAddonDiamond['attributes'] = {
      _productTitle: diamond?.productTitle,
      productAsset: diamondImages[index],
      _productAssetObject: JSON.stringify({
        src: diamondImages[index],
        width: 200,
        height: 200,
      }),
      _dateAdded: (Date.now() + 100).toString(),
      caratWeight: diamond.carat.toString(),
      clarity: diamond.clarity,
      diamondType: diamond.diamondType,
      cut: diamond.cut,
      color: diamond.color,
      feedId: settingVariantId,
      lotId: diamond.lotId,
      isChildProduct: 'true',
      productGroupKey,
      _specs: diamondSpecs,
      _productType: 'Diamond',
      _productTypeTranslated: _t('Diamond'),
      shippingText: shippingTextDiamondAttribute,
      productIconListShippingCopy: `${shippingTextDiamondAttribute} ${formattedShippingTime}`,
      pdpUrl: window.location.href,
      shippingBusinessDays: isDiamondCFY ? cfyShippingTime?.toString() : shippingTime?.toString(),
    };

    return {
      variantId: createShopifyVariantId(diamond?.dangerousInternalShopifyVariantId),
      attributes: diamondAttributes,
      quantity: 1,
    };
  });

  await addERProductToCart({
    settingVariantId,
    settingAttributes,
    diamonds: diamondsToAdd,
    hasEngraving: engravingText ? true : false,
    engravingText,
    locale,
  }).then(() => refetch());

  updateGlobalContext({
    isCartOpen: true,
  });

  // TODO: Add Sentry Loggin

  const { productTitle: settingProductTitle, image: { src } = { src: '' }, price: settingPrice } = product || {};
  const formattedSettingPrice = getFormattedPrice(settingPrice, locale, true, true);
  const formattedDiamondPrice = getFormattedPrice(diamondPrice, locale, true, true);
  const id = settingVariantId.split('/').pop();
  const totalAmount = getFormattedPrice(settingPrice + diamondPrice, locale, true, true);

  Array.isArray(diamonds) &&
    diamonds?.map((diamond) => {
      productAdded({
        id,
        // sku: 'F15',
        category: pdpType,
        name: settingProductTitle,
        brand: 'VRAI',
        variant: variantProductTitle,
        product: variantProductTitle,
        // url: 'https://www.website.com/product/path',
        image_url: src,
        ...selectedConfiguration,
        // complete_your_ring
        setting: settingProductTitle,
        diamond_lot_Id: diamond?.lotId,
        diamond_type: diamond?.diamondType,
        carat: diamond?.carat,
        gold_purity: goldPurity,
        band_accent: bandAccent,
        shape: diamond?.diamondType,
        clarity: diamond?.clarity,
        colour: diamond?.color,
        centerstone: `${diamond?.carat}ct, ${diamond?.color}, ${diamond?.clarity}`,
        ecommerce: {
          value: totalAmount,
          currency: currencyCode,
          add: {
            products: [
              {
                id,
                name: settingProductTitle,
                price: formattedSettingPrice,
                category: pdpType,
                variant: variantProductTitle,
                quantity: 1,
                brand: 'VRAI',
              },
              {
                id: diamond?.dangerousInternalShopifyVariantId,
                name: diamond?.productTitle,
                price: formattedDiamondPrice,
                brand: 'VRAI',
                category: diamond?.productType,
                variant: diamond?.productTitle,
                quantity: 1,
              },
            ],
          },
        },
        items: [
          {
            item_id: id,
            item_name: variantProductTitle,
            item_brand: 'VRAI',
            item_category: pdpType,
            price: formattedSettingPrice,
            currency: currencyCode,
            quantity: 1,
            ...selectedConfiguration,
          },
          {
            item_id: diamond?.dangerousInternalShopifyVariantId,
            item_name: diamond?.productTitle,
            item_brand: 'VRAI',
            item_category: diamond?.productType,
            price: formattedDiamondPrice,
            currency: currencyCode,
            quantity: 1,
          },
        ],
      });
    });

  return;
}
