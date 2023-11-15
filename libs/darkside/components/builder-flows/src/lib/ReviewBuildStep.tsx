/* eslint-disable camelcase */
import { DarksideButton, DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import { OptionSelector, ProductIconList } from '@diamantaire/darkside/components/products/pdp';
import { useAnalytics } from '@diamantaire/darkside/context/analytics';
import { ERProductCartItemProps } from '@diamantaire/darkside/context/cart-context';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { addERProductToCart } from '@diamantaire/darkside/data/api';
import { useCartData, useProductDato, useTranslations } from '@diamantaire/darkside/data/hooks';
import {
  DIAMOND_TYPE_HUMAN_NAMES,
  DIAMOND_VIDEO_BASE_URL,
  PdpTypePlural,
  metalTypeAsConst,
  pdpTypeSingleToPluralAsConst,
  getCurrency,
  parseValidLocale,
  getFormattedPrice,
} from '@diamantaire/shared/constants';
import { extractMetalTypeFromShopifyHandle, makeCurrency } from '@diamantaire/shared/helpers';
import { OptionItemProps } from '@diamantaire/shared/types';
import { getNumericalLotId } from '@diamantaire/shared-diamond';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useCallback, useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import SummaryItem from './SummaryItem';

const ReviewBuildStepStyles = styled(motion.div)`
  height: 100vh;
  overflow-y: scroll;
  padding: 20px 20px 140px;

  .review-wrapper {
    display: flex;

    .product-images {
      flex: 2;
      display: flex;
      margin: 0 -10px;

      > .image {
        padding: 0 10px;
        flex: 1;
      }

      .diamond-image {
        display: flex;

        img {
          object-fit: cover;
          max-height: 608px;
        }
      }
    }
    .product-summary {
      flex: 1;

      .product-summary__inner {
        padding: 20px 40px;
        max-width: 550px;
        margin: 0 auto;

        h1 {
          /* margin-bottom: 20px; */
        }

        .total-price {
          margin-bottom: 20px;
        }
      }

      .builder-summary__content {
        border-bottom: 1px solid #ccc;
      }
    }

    .ring-size-container {
      margin: 20px 0 0;
      .selector-label {
        margin: 0 0 10px;
      }

      h4 {
        margin: 0;
      }
    }

    .engraving-container {
      padding: 20px 0;

      .engraving-prompt-text {
        display: flex;
        align-items: center;
        p {
          margin-left: 5px;
          display: inline-block;
        }
      }

      .engraving-result-text {
        display: flex;
        justify-content: space-between;
        p {
          span {
            font-weight: bold;
            margin-right: 7px;
          }
        }

        a,
        button {
          font-size: 1.4rem;
        }
      }

      .engraving-input-container {
        margin: 20px 0;
        input {
          border: 1px solid #ccc;
          height: 40px;
          width: 100%;
          padding-left: 10px;
        }

        p {
          font-size: 1.3rem;
          margin: 5px 0 20px;
        }
      }
    }

    .review-atc {
      padding: 20px 0 0;
      ul {
        li {
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0px;
          }
        }
      }
    }
  }
  .product-icon-list-container > ul {
    margin: 0;
    padding-top: 20px;
  }
`;

const ToastErrorStyles = styled.div`
  p {
    font-size: 1.6rem;
  }
`;

const ToastError = () => {
  return (
    <ToastErrorStyles>
      <p>This diamond is already in your cart</p>
    </ToastErrorStyles>
  );
};

const MAX_CHAR_LIMIT = 16;

const ReviewBuildStep = ({ settingSlugs, type, configurations, variantProductTitle, selectedConfiguration }) => {
  const sizeOptionKey = 'ringSize';
  const router = useRouter();
  const { data: checkout } = useCartData(router?.locale);
  const { builderProduct } = useContext(BuilderProductContext);
  const updateGlobalContext = useContext(GlobalUpdateContext);

  const [isEngravingInputVisible, setIsEngravingInputVisible] = useState(false);
  const [engravingInputText, setEngravingInputText] = useState('');
  const [engravingText, setEngravingText] = useState(null);
  const [selectedSize, setSelectedSize] = useState<{
    id: string;
    value?: string;
    valueLabel?: string;
    isSelected?: boolean;
  }>(configurations.ringSize.filter((item) => item.value === '5')[0] || null);
  const { productAdded } = useAnalytics();

  const sizeOptions = configurations[sizeOptionKey];

  const { collectionSlug } = settingSlugs;

  const { product, diamond } = builderProduct;

  const { countryCode } = parseValidLocale(router?.locale);
  const currencyCode = getCurrency(countryCode);

  const { _t } = useTranslations(router?.locale);

  const mutatedLotId = getNumericalLotId(diamond?.lotId);

  const diamondImage = `${DIAMOND_VIDEO_BASE_URL}/${mutatedLotId}-thumb.jpg`;
  const allowedKeys = ['product', 'diamond'];

  const sortedKeys = Object.keys(builderProduct)
    .filter((key) => allowedKeys.includes(key))
    .sort((a, b) => {
      return allowedKeys.indexOf(a) - allowedKeys.indexOf(b);
    });

  function confirmEngraving() {
    setEngravingText(engravingInputText);
    setIsEngravingInputVisible(false);
  }

  function removeEngraving() {
    setEngravingText(null);
    setEngravingInputText('');
    setIsEngravingInputVisible(false);
  }

  const pdpType: PdpTypePlural = pdpTypeSingleToPluralAsConst[product?.productType];
  const { data }: { data: any } = useProductDato(collectionSlug, router.locale, pdpType);

  const datoParentProductData: any = data?.engagementRingProduct || data?.jewelryProduct;
  const productIconListType = datoParentProductData?.productIconList?.productType;

  const isEngravingInputEmpty = useMemo(() => {
    return isEngravingInputVisible && engravingInputText.length === 0;
  }, [engravingInputText]);

  const handleSizeChange = useCallback((option: OptionItemProps) => {
    // setSelectVariantId(option.id);
    setSelectedSize(option);
  }, []);

  const { productTitle, productType, goldPurity, bandAccent, shopifyProductHandle, image, configuredProductOptionsInOrder } =
    product;

  // Need the ring size
  function addCustomProductToCart() {
    const productGroupKey = uuidv4();
    // 1. Get the product variant ID for the setting. Need fallback for non-ER custom products
    const settingType = selectedSize?.id ? 'engagement-ring' : 'jewelry';
    const settingVariantId = selectedSize?.id || product?.variantId;

    // 2. Get the product variant ID for the diamond
    const diamondVariantId = 'gid://shopify/ProductVariant/' + diamond?.dangerousInternalShopifyVariantId;

    // 2.5 Check if diamond ID is already in cart (there can only be one of each custom diamond)
    const isDiamondInCart = checkout?.lines?.find((item) => item.merchandise.id === diamondVariantId);

    if (isDiamondInCart) {
      return toast.error(ToastError, {
        autoClose: 3000,
      });
    }

    // 3. Create custom attributes for the setting

    const erMetal =
      (goldPurity ? goldPurity + ' ' : '') +
      (settingType === 'engagement-ring'
        ? metalTypeAsConst[extractMetalTypeFromShopifyHandle(shopifyProductHandle)]
        : metalTypeAsConst[extractMetalTypeFromShopifyHandle(configuredProductOptionsInOrder)]);
    const refinedBandAccent =
      settingType === 'engagement-ring' ? bandAccent?.charAt(0)?.toUpperCase() + bandAccent.slice(1) : '';

    const settingAttributes: ERProductCartItemProps['settingAttributes'] = {
      _productType: productType,
      metalType: erMetal,
      productAsset: JSON.stringify(image),
      _productTitle: productTitle,
      productIconListShippingCopy: 'temp',
      pdpUrl: window.location.href,
      shippingText: _t('Made-to-order. Ships by'),
      feedId: settingVariantId,
      // engraving
      _EngravingBack: engravingText,
      _specs: `Shape: ${
        DIAMOND_TYPE_HUMAN_NAMES[selectedConfiguration?.diamondType]
      };Metal: ${erMetal};Band: ${refinedBandAccent};Ring size: ${selectedConfiguration?.ringSize}`,
      productGroupKey,
      diamondShape: DIAMOND_TYPE_HUMAN_NAMES[diamond.diamondType],
      centerStone: diamond?.carat + ', ' + diamond?.color + ', ' + diamond?.clarity,
      ringSize: selectedConfiguration?.ringSize,
      bandAccent: refinedBandAccent,
      totalPrice: (product.price + diamond.price).toString(),
      productCategory: settingType === 'engagement-ring' ? 'Setting' : productType ? productType : 'Setting',
      _dateAdded: Date.now().toString(),

      // Diamond Sync
      childProduct: JSON.stringify({
        behavior: 'linked',
        additionalVariantIds: [diamondVariantId],
      }),
    };

    // 4. Create custom attributes for the diamond

    const diamondAttributes: ERProductCartItemProps['diamondAttributes'] = {
      _productTitle: diamond?.productTitle,
      productAsset: diamondImage,
      _dateAdded: Date.now().toString(),
      caratWeight: diamond.carat.toString(),
      clarity: diamond.clarity,
      cut: diamond.cut,
      color: diamond.color,
      feedId: settingVariantId,
      lotId: diamond.lotId,
      isChildProduct: 'true',
      productGroupKey,
      _productType: 'Diamond',
      shippingText: _t('Made-to-order. Ships by'),
      productIconListShippingCopy: 'temp',
      shippingBusinessDays: 'temp',
      pdpUrl: window.location.href,
    };

    addERProductToCart({
      settingVariantId,
      settingAttributes,
      diamondVariantId,
      diamondAttributes,
    });

    updateGlobalContext({
      isCartOpen: true,
    });

    // TODO: Add Sentry Loggin

    const { productTitle: settingProductTitle, image: { src } = { src: '' }, price: settingPrice } = product || {};
    const formattedSettingPrice = getFormattedPrice(settingPrice, router?.locale, true, true);
    const formattedDiamondPrice = getFormattedPrice(diamond?.price, router?.locale, true, true);
    const id = settingVariantId.split('/').pop();
    const totalAmount = getFormattedPrice(settingPrice + diamond?.price, router?.locale, true, true);

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
  }

  return (
    <ReviewBuildStepStyles
      key="diamond-step-container"
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: { opacity: 1 },
        collapsed: { opacity: 0 },
      }}
      transition={{
        duration: 0.75,
      }}
    >
      <div className="review-wrapper">
        <div className="product-images">
          <div className="image setting-image">{product?.image && <DatoImage image={product?.image} />}</div>
          <div className="image diamond-image">{diamondImage && <img src={diamondImage} alt="" />}</div>
        </div>
        <div className="product-summary">
          <div className="product-summary__inner">
            <Heading type="h1" className="secondary no-margin">
              {product?.productTitle}
            </Heading>
            <p className="total-price">
              <span>{makeCurrency(product?.price + diamond?.price, 'en-US', 'USD')}</span>
            </p>

            <div className="builder-summary__content">
              <div className="builder-summary__content__inner">
                {builderProduct &&
                  sortedKeys.map((key: string, index) => {
                    if (!builderProduct[key] || (key !== 'product' && key !== 'diamond')) return null;

                    const summaryItem = builderProduct[key];

                    const modifyIndex =
                      key === 'diamond' && type === 'setting-to-diamond'
                        ? 1
                        : key === 'diamond' && type === 'diamond-to-setting'
                        ? 0
                        : key === 'product' && type === 'diamond-to-setting'
                        ? 2
                        : key === 'product' && type === 'setting-to-diamond'
                        ? 0
                        : key === 'product' && type === 'diamond-to-setting'
                        ? 2
                        : null;

                    return (
                      <SummaryItem
                        modifyIndex={modifyIndex}
                        item={summaryItem}
                        itemType={key}
                        key={index}
                        showPrice={true}
                      />
                    );
                  })}
              </div>
            </div>

            {selectedSize && (
              <div className="ring-size-container">
                <OptionSelector
                  optionType={sizeOptionKey}
                  label={sizeOptionKey}
                  options={sizeOptions}
                  selectedOptionValue={selectedSize.value}
                  onChange={handleSizeChange}
                />
              </div>
            )}

            <div className="engraving-container">
              {!engravingText ? (
                <div className="engraving-prompt-text">
                  <DarksideButton
                    onClick={() => setIsEngravingInputVisible(!isEngravingInputVisible)}
                    type="underline"
                    colorTheme="teal"
                  >
                    Add engraving
                  </DarksideButton>
                  <p>(optional)</p>
                </div>
              ) : (
                <div className="engraving-result-text">
                  <p className="result-text">
                    <span>Your Engraving:</span>
                    {engravingText}
                  </p>
                  <DarksideButton
                    onClick={() => setIsEngravingInputVisible(!isEngravingInputVisible)}
                    type="underline"
                    colorTheme="teal"
                  >
                    Modify
                  </DarksideButton>
                </div>
              )}

              {isEngravingInputVisible && (
                <div className="engraving-input-container">
                  <input
                    type="text"
                    value={engravingInputText}
                    onChange={(e) => {
                      if (e.target.value.length > MAX_CHAR_LIMIT) return;
                      setEngravingInputText(e.target.value);
                    }}
                  />
                  <p className="limit-text">
                    Character Limit ({engravingInputText.length}/{MAX_CHAR_LIMIT})
                  </p>
                  <DarksideButton
                    onClick={isEngravingInputEmpty ? () => removeEngraving() : () => confirmEngraving()}
                    type="outline"
                  >
                    {isEngravingInputEmpty && engravingText && isEngravingInputVisible
                      ? 'Delete engraving'
                      : !engravingText
                      ? 'Add engraving'
                      : 'Update engraving'}
                  </DarksideButton>
                </div>
              )}

              <div className="review-atc">
                <ul className="list-unstyled">
                  <li>
                    <DarksideButton onClick={() => addCustomProductToCart()}>Add to bag</DarksideButton>
                  </li>
                  <li>
                    <DarksideButton colorTheme="grey">Visit our New York Location</DarksideButton>
                  </li>
                </ul>
              </div>

              {product.productType && productIconListType && (
                <div className="product-icon-list-container">
                  <ProductIconList productIconListType={productIconListType} locale={'en_US'} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ReviewBuildStepStyles>
  );
};

export default ReviewBuildStep;
