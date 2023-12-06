/* eslint-disable camelcase */

import { useAnalytics } from '@diamantaire/analytics';
import {
  DarksideButton,
  DatoImage,
  Heading,
  ProductAppointmentCTA,
  UIString,
} from '@diamantaire/darkside/components/common-ui';
import { OptionSelector, ProductDiamondHand, ProductIconList } from '@diamantaire/darkside/components/products/pdp';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { ERProductCartItemProps } from '@diamantaire/darkside/context/cart-context';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { addERProductToCart } from '@diamantaire/darkside/data/api';
import { useCartData, useProductDato, useTranslations } from '@diamantaire/darkside/data/hooks';
import {
  DIAMOND_TYPE_HUMAN_NAMES,
  DIAMOND_VIDEO_BASE_URL,
  ENGRAVING_PRICE_CENTS,
  PdpTypePlural,
  getCurrency,
  getFormattedPrice,
  metalTypeAsConst,
  parseValidLocale,
  pdpTypeSingleToPluralAsConst,
} from '@diamantaire/shared/constants';
import { extractMetalTypeFromShopifyHandle } from '@diamantaire/shared/helpers';
import { OptionItemProps } from '@diamantaire/shared/types';
import { getNumericalLotId } from '@diamantaire/shared-diamond';
import { createShopifyVariantId } from '@diamantaire/shared-product';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useCallback, useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const ReviewBuildStepStyles = styled(motion.div)`
  padding: 2rem 2rem 14rem;

  .review-wrapper {
    display: flex;

    .product-images {
      flex: 2;
      display: flex;
      flex-wrap: wrap;
      margin: 0 -1rem;

      > .image {
        padding: 0 1rem;
        flex: 0 0 50%;
        display: flex;

        > div {
          display: flex;
        }

        img {
          object-fit: cover;
          max-height: 608px;
        }
      }
    }
    .product-summary {
      flex: 1;

      .product-summary__inner {
        position: relative;
        padding: 2rem 4rem;
        max-width: 55rem;
        margin: 0 auto;

        h1 {
          /* margin-bottom: 2rem; */
        }

        .total-price {
          margin-bottom: 2rem;
        }
      }

      .builder-summary__content {
        border-bottom: 0.1rem solid #ccc;

        .builder-summary__content__inner {
          ul {
            padding: 0 0 2rem;
            li {
              display: flex;
              padding: 0 0 0.5rem;

              &:last-child {
                padding: 0;
              }

              span {
                font-size: var(--font-size-xsmall);

                &.label {
                  font-weight: bold;
                  margin-right: 1rem;
                }

                &.value {
                  font-weight: normal;
                }

                &.toggle {
                  flex: 1;
                  text-align: right;
                  display: block;

                  button {
                    font-size: var(--font-size-xsmall);
                  }
                }
              }

              button {
                font-size: 1.4rem;
                font-weight: normal;
                color: var(--color-teal);
                background: none;
                border: none;
                padding: 0;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .ring-size-container {
      margin: 2rem 0 0;
      .selector-label {
        margin: 0 0 1rem;
      }

      h4 {
        margin: 0;
      }
    }

    .engraving-container {
      padding: 2rem 0;

      .engraving-prompt-text {
        display: flex;
        align-items: center;
        p {
          margin-left: 0.5rem;
          display: inline-block;
        }
      }

      .engraving-result-text {
        display: flex;
        justify-content: space-between;
        p {
          span {
            font-weight: bold;
            margin-right: 0.7rem;
          }
        }

        a,
        button {
          font-size: 1.4rem;
        }
      }

      .engraving-input-container {
        margin: 2rem 0;
        input {
          border: 0.1rem solid #ccc;
          height: 4rem;
          width: 100%;
          padding-left: 1rem;
        }

        p {
          font-size: 1.3rem;
          margin: 0.5rem 0 2rem;
        }
      }
    }

    .atc-button {
      font-size: var(--font-size-xxsmall);
    }

    .review-atc {
      padding: 2rem 0 0;
      ul {
        li {
          margin-bottom: 1rem;
          &:last-child {
            margin-bottom: 0px;
          }
        }
      }
    }
  }
  .product-icon-list-container > ul {
    margin: 0;
    padding-top: 2rem;
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
  const { data: checkout, refetch } = useCartData(router?.locale);
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
  }>(configurations?.ringSize?.filter((item) => item.value === '5')[0] || null);

  const { productAdded } = useAnalytics();

  const sizeOptions = configurations[sizeOptionKey];

  console.log('review configurations', configurations);

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
  async function addCustomProductToCart() {
    const productGroupKey = uuidv4();
    // 1. Get the product variant ID for the setting. Need fallback for non-ER custom products
    const settingType = selectedSize?.id ? 'engagement-ring' : 'jewelry';
    const settingVariantId = selectedSize?.id || product?.variantId;

    // 2. Get the product variant ID for the diamond
    const diamondVariantId = createShopifyVariantId(diamond?.dangerousInternalShopifyVariantId);

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

    await addERProductToCart({
      settingVariantId,
      settingAttributes,
      diamondVariantId,
      diamondAttributes,
      hasEngraving: engravingText ? true : false,
      engravingText,
    }).then(() => refetch());

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

    return;
  }

  const summaryItems = [
    {
      label: _t('diamondType'),
      value: _t(diamond?.diamondType),
    },
    {
      label: 'Centerstone',
      value: diamond?.carat + ', ' + diamond?.color + ', ' + diamond?.clarity,
    },
    {
      label: _t('Band'),
      value: _t(product?.bandAccent),
    },
    {
      label: 'Metal',
      value: _t(product.metal),
    },
  ];

  console.log('productzzz', product);
  console.log('diamondzzz', diamond);

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
          <div className="diamond-hand">
            <ProductDiamondHand diamondType={selectedConfiguration?.diamondType} range={[0.5, 8]} initValue={2} />
          </div>
        </div>
        <div className="product-summary">
          <div className="product-summary__inner">
            <WishlistLikeButton extraClass="bundle" productId={`bundle-${settingSlugs?.productSlug}::${diamond?.lotId}`} />

            <Heading type="h1" className="secondary no-margin">
              {product?.productTitle}
            </Heading>

            <p className="total-price">
              <span>
                {getFormattedPrice(
                  product?.price + diamond?.price + (engravingText ? ENGRAVING_PRICE_CENTS : 0),
                  router?.locale,
                )}
              </span>
            </p>

            <div className="builder-summary__content">
              <div className="builder-summary__content__inner">
                <ul className="list-unstyled">
                  {summaryItems?.map((item, index) => {
                    return (
                      <li>
                        <span className="label">{item.label}:</span>
                        <span className="value">{item.value}</span>
                        <span className="toggle">
                          <button>Modify</button>
                        </span>
                      </li>
                    );
                  })}
                </ul>
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
                    <UIString>Add engraving</UIString>
                  </DarksideButton>
                  <p>
                    (<UIString>optional</UIString>)
                  </p>
                </div>
              ) : (
                <div className="engraving-result-text">
                  <p className="result-text">
                    <span>
                      <UIString>Your Engraving</UIString>:
                    </span>
                    {engravingText}
                  </p>
                  <DarksideButton
                    onClick={() => setIsEngravingInputVisible(!isEngravingInputVisible)}
                    type="underline"
                    colorTheme="teal"
                  >
                    <UIString>Modify</UIString>
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
                    <UIString>Character Limit</UIString> ({engravingInputText.length}/{MAX_CHAR_LIMIT})
                  </p>
                  <DarksideButton
                    onClick={isEngravingInputEmpty ? () => removeEngraving() : () => confirmEngraving()}
                    type="outline"
                  >
                    <UIString>
                      {isEngravingInputEmpty && engravingText && isEngravingInputVisible
                        ? 'Delete engraving'
                        : !engravingText
                        ? 'Add engraving'
                        : 'Update engraving'}
                    </UIString>
                  </DarksideButton>
                </div>
              )}

              <div className="review-atc">
                <ul className="list-unstyled">
                  <li>
                    <DarksideButton className="atc-button" onClick={() => addCustomProductToCart()}>
                      <UIString>Add To Bag</UIString>
                    </DarksideButton>
                  </li>
                  <li>
                    <ProductAppointmentCTA productType={productType} />
                  </li>
                </ul>
              </div>

              {product.productType && productIconListType && (
                <div className="product-icon-list-container">
                  <ProductIconList
                    productIconListType={productIconListType}
                    locale={router.locale}
                    configuration={selectedConfiguration}
                  />
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
