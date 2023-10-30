import { DarksideButton, UIString } from '@diamantaire/darkside/components/common-ui';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { XIcon } from '@diamantaire/shared/icons';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
  const { attributes, cost } = lineItem || {};
  const { copy: certCopy, title: certTitle, price: certPrice } = certificate || {};
  const [showCert, setShowCert] = useState(false);
  const { locale } = useRouter();
  const { _t } = useTranslations(locale);

  const image = useMemo(() => {
    const imageSrc = attributes?.find((item) => item.key === 'productAsset')?.value;

    return imageSrc.includes('https')
      ? imageSrc
      : JSON.parse(attributes?.find((item) => item.key === 'productAsset')?.value);
  }, [lineItem]);

  const productType = useMemo(() => {
    let matchingAttribute = attributes?.find((attr) => attr.key === '_productType')?.value;

    if (matchingAttribute === 'Earrings') {
      // Check if Earrings product has child. If so, it's a pair
      const isLeftOrRight = attributes?.find((attr) => attr.key === 'leftOrRight')?.value;

      if (isLeftOrRight === 'Left' || isLeftOrRight === 'Right') {
        const capitalizedDirection = isLeftOrRight.charAt(0).toUpperCase() + isLeftOrRight.slice(1);

        matchingAttribute += ' (' + _t(capitalizedDirection) + ')';
      }
    }

    return matchingAttribute;
  }, [attributes]);

  const isProductDiamond = useMemo(() => {
    return productType === 'Diamond';
  }, [productType]);

  const itemAttributes = useMemo(
    () => [
      {
        label: refinedCartItemDetails?.['diamondType'],
        value: attributes?.find((item) => item.key === 'diamondShape')?.value,
      },
      {
        label: refinedCartItemDetails?.['metal'],
        value: attributes?.find((item) => item.key === 'metalType')?.value,
      },
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
        <div className="child-product__image">{isProductDiamond ? <img src={image} alt="" /> : <Image {...image} />}</div>

        <div className="cart-item__content">
          <p>
            <strong>{productType}</strong>
            {isProductDiamond && <span>{getFormattedPrice(parseFloat(cost?.totalAmount?.amount) * 100, locale)}</span>}
          </p>
          {itemAttributes?.map((specItem, index) => {
            if (!specItem?.value || specItem.value === '') return null;

            return (
              <p className={specItem?.label?.toLowerCase()} key={`${lineItem.id}-${index}`}>
                {specItem.label !== '' ? specItem.label + ':' : ''} {specItem.value}
              </p>
            );
          })}
          {isProductDiamond && (
            <DarksideButton type="underline" colorTheme="teal" onClick={() => setShowCert(true)}>
              <UIString>Diamond Certificate</UIString>
            </DarksideButton>
          )}
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
