import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { makeCurrencyFromShopifyPrice } from '@diamantaire/shared/helpers';
import { XIcon } from '@diamantaire/shared/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

const ChildProductStyles = styled.div`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 10px;
  position: relative;

  .child-product__inner {
    display: flex;
    align-items: center;

    .child-product__image {
      flex: 0 0 168px;
      padding-right: 20px;
    }

    .cart-item__content {
      flex: 1;
      padding-right: 10px;

      button {
        font-size: 1.4rem;
      }
      p {
        margin-bottom: 5px;
        font-size: 1.5rem;
        color: #777;

        &:first-child {
          display: flex;
          color: var(--color-black);
          span {
            flex: 1;
            text-align: right;
          }
        }

        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
  }
  .certificate-info {
    border: 1px solid #000;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    &.dark {
      background-color: #222;
      .certificate-info__inner {
        padding: 20px;

        .certificate-info__title {
          p {
            color: var(--color-white);
          }
        }
        .certificate-info__body {
          p {
            margin: 0;
            font-size: 1.4rem;
            display: block;
            color: #ccc;
          }

          button {
            font-size: 1.6rem;
            color: #fff;
            border-bottom: 1px solid var(--color-white);
            svg {
              line {
                stroke: var(--color-white);
              }
            }
          }
        }
      }
    }

    .certificate-info__inner {
      padding: 20px;

      .certificate-info__title {
        display: flex;
        margin-bottom: 10px;
        p {
          flex: 1;
          margin: 0;
          font-size: 1.7rem;
          display: block;
          color: #000;

          &:first-child {
            flex: 2;
          }
          &:last-child {
            text-align: right;
          }
        }
      }
      .certificate-info__body {
        p {
          margin: 0;
          font-size: 1.4rem;
          display: block;
          color: #737368;
        }

        button {
          font-size: 1.6rem;
          svg {
            position: relative;
            top: 7px;
            left: -5px;
            margin-right: -5px;
            transform: scale(0.75);
          }
        }
      }
    }
  }
`;

const ChildProduct = ({ lineItem, refinedCartItemDetails, certificate }) => {
  console.log('lineItem', lineItem);
  const { attributes, cost } = lineItem || {};
  const { copy: certCopy, title: certTitle, price: certPrice } = certificate || {};
  const [showCert, setShowCert] = useState(false);

  const image = useMemo(() => {
    const matchingAttribute = attributes?.find((item) => item.key === '_image')?.value;

    return matchingAttribute;
  }, [lineItem]);

  const itemAttributes = useMemo(
    () => [
      {
        label: refinedCartItemDetails?.['caratWeight'],
        value: attributes?.find((item) => item.key === 'caratWeight')?.value,
      },
      {
        label: 'Cut',
        value: attributes?.find((item) => item.key === 'cut')?.value,
      },
      {
        label: 'Clarity',
        value: attributes?.find((item) => item.key === 'clarity')?.value,
      },
      {
        label: '',
        value: attributes?.bandAccent,
      },
    ],
    [refinedCartItemDetails, lineItem],
  );

  return (
    <ChildProductStyles>
      <div className="child-product__inner">
        {image && (
          <div className="child-product__image">
            <img src={image} alt="" />
          </div>
        )}
        <div className="cart-item__content">
          <p>
            <strong>Diamond</strong>
            <span>{makeCurrencyFromShopifyPrice(parseFloat(cost?.totalAmount?.amount))}</span>
          </p>
          {itemAttributes?.map((specItem, index) => {
            if (!specItem?.value || specItem.value === '') return null;

            return (
              <p className={specItem?.label?.toLowerCase()} key={`${lineItem.id}-${index}`}>
                {specItem.label !== '' ? specItem.label + ':' : ''} {specItem.value}
              </p>
            );
          })}
          <DarksideButton type="underline" colorTheme="teal" onClick={() => setShowCert(true)}>
            Diamond Certificate
          </DarksideButton>
        </div>
      </div>
      <AnimatePresence>
        {showCert && (
          <motion.div
            className="certificate-info dark"
            key="cert-container"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { y: 0, opacity: 1 },
              collapsed: { y: 50, opacity: 0 },
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <div className="certificate-info__inner">
              <div className="certificate-info__title">
                <p>{certTitle}</p>
                <p>{certPrice}</p>
              </div>
              <div className="certificate-info__body">
                <p>{certCopy}</p>
                <DarksideButton type="underline" onClick={() => setShowCert(false)}>
                  <XIcon />
                  Close
                </DarksideButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ChildProductStyles>
  );
};

export default ChildProduct;
