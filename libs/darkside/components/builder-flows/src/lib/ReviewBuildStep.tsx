import { DarksideButton, DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import { OptionSelector, ProductIconList } from '@diamantaire/darkside/components/products/pdp';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { useProductDato } from '@diamantaire/darkside/data/hooks';
import { PdpTypePlural, pdpTypeSingleToPluralAsConst } from '@diamantaire/shared/constants';
import { makeCurrency } from '@diamantaire/shared/helpers';
import { OptionItemProps } from '@diamantaire/shared/types';
import { getNumericalLotId } from '@diamantaire/shared-diamond';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useCallback, useContext, useMemo, useState } from 'react';
import styled from 'styled-components';

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

      > .image {
        padding: 0 10px;
        flex: 1;
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
      h4 {
        margin: 0 0 10px;
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

const MAX_CHAR_LIMIT = 16;

const ReviewBuildStep = ({ settingSlugs, type, selectedConfiguration, configurations }) => {
  const sizeOptionKey = 'ringSize';
  const { builderProduct } = useContext(BuilderProductContext);
  const [isEngravingInputVisible, setIsEngravingInputVisible] = useState(false);
  const [engravingInputText, setEngravingInputText] = useState('');
  const [engravingText, setEngravingText] = useState(null);
  const [selectedSize, setSelectedSize] = useState<string>(selectedConfiguration?.[sizeOptionKey] || null);
  const sizeOptions = configurations[sizeOptionKey];

  const { collectionSlug } = settingSlugs;

  const { product, diamond } = builderProduct;

  const router = useRouter();

  const mutatedLotId = getNumericalLotId(diamond?.lotId);

  const src = `https://videos.diamondfoundry.com/${mutatedLotId}-thumb.jpg`;
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
    console.log('option', option);
    // setSelectVariantId(option.id);
    setSelectedSize(option.value);
  }, []);

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
          <div className="image diamond-image">{src && <img src={src} alt="" />}</div>
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

            <div className="ring-size-container">
              <Heading type="h4" className="primary">
                Ring Size:
              </Heading>
              <OptionSelector
                optionType={sizeOptionKey}
                label={sizeOptionKey}
                options={sizeOptions}
                selectedOptionValue={selectedSize}
                onChange={handleSizeChange}
              />
            </div>

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
                    <DarksideButton>Add to bag</DarksideButton>
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
