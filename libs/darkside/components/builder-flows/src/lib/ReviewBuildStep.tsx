import { DarksideButton, DatoImage, Heading } from '@diamantaire/darkside/components/common-ui';
import { ProductIconList } from '@diamantaire/darkside/components/products/pdp';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { makeCurrency } from '@diamantaire/shared/helpers';
import { motion } from 'framer-motion';
import { useContext, useMemo, useState } from 'react';
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
      padding: 20px 0;
      ul {
        li {
          margin-bottom: 20px;
        }
      }
    }
  }
`;

const ReviewBuildStep = () => {
  const { builderProduct } = useContext(BuilderProductContext);
  const [isEngravingInputVisible, setIsEngravingInputVisible] = useState(false);
  const [engravingInputText, setEngravingInputText] = useState('');
  const [engravingText, setEngravingText] = useState(null);

  const { product, diamond } = builderProduct;

  const mutatedLotId = diamond?.lotId?.replace(/F/g, '');

  const src = `https://videos.diamondfoundry.com/${mutatedLotId}-thumb.jpg`;

  const sortedKeys = Object.keys(builderProduct).sort((a, b) => {
    if (a === 'product') {
      return -1; // 'product' comes before 'diamond'
    }
    if (b === 'product') {
      return 1; // 'product' comes before 'diamond'
    }
    if (a === 'diamond') {
      return 1; // 'diamond' comes after 'product'
    }
    if (b === 'diamond') {
      return -1; // 'diamond' comes after 'product'
    }

    return 0; // maintain the order for other keys
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

  const isEngravingInputEmpty = useMemo(() => {
    return isEngravingInputVisible && engravingInputText.length === 0;
  }, [engravingInputText]);

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
              {product.productTitle}
            </Heading>
            <p className="total-price">
              <span>{makeCurrency(product?.price + diamond?.price, 'en-US', 'USD')}</span>
            </p>

            <div className="builder-summary__content">
              <div className="builder-summary__content__inner">
                {builderProduct &&
                  sortedKeys.map((key: string, index) => {
                    console.log('builderFlowState[key]', builderProduct[key]);
                    if (!builderProduct[key] || (key !== 'product' && key !== 'diamond')) return null;

                    const summaryItem = builderProduct[key];

                    return <SummaryItem item={summaryItem} type={key} key={index} showPrice={true} />;
                  })}
              </div>
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
                      if (e.target.value.length > 16) return;
                      setEngravingInputText(e.target.value);
                    }}
                  />
                  <p className="limit-text">Character Limit ({engravingInputText.length}/16)</p>
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
                    <DarksideButton colorTheme="grey">Vist our New York Location</DarksideButton>
                  </li>
                </ul>
              </div>

              {product.productType && <ProductIconList productIconListType={product.productType} locale={'en_US'} />}
            </div>
          </div>
        </div>
      </div>
    </ReviewBuildStepStyles>
  );
};

export default ReviewBuildStep;
