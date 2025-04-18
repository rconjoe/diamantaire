// Controlled component for adding custom engraving to a product
// Keep state regarding actual engraving text outside of this component

import { DarksideButton, UIString } from '@diamantaire/darkside/components/common-ui';
import {
  ENGAGEMENT_RING_PRODUCT_TYPE,
  ENGRAVING_CHARACTER_LIMITS,
  ENGRAVING_REGEX,
  JEWELRY_ENGRAVING_MAX_LENGTH,
  WEDDING_BAND_PRODUCT_TYPE,
} from '@diamantaire/shared/constants';
import { DEFAULT_BUILDER_ENGRAVING_FONT, getRenderedInputEngravingFontStyles } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

const ProductEngravingStyles = styled.div`
  .engraving-container {
    padding: 0 0 1rem;

    .engraving-prompt-text {
      display: flex;
      align-items: baseline;

      p {
        margin-left: 0.5rem;
        display: inline-block;
      }

      .engraving-cta {
        button,
        a {
          font-size: 1.7rem;
        }
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
      &.-engagement-ring {
        input {
          ${getRenderedInputEngravingFontStyles(DEFAULT_BUILDER_ENGRAVING_FONT)};
        }
      }
      input {
        border: 0.1rem solid #ccc;
        height: 4rem;
        width: 100%;
        padding-left: 1rem;
      }

      &.is-initial {
        input {
          max-width: 4rem;
          padding-left: 0;
          text-align: center;
          font-size: var(--font-size-xsmall);
        }
      }

      p {
        font-size: 1.3rem;
        margin: 0.5rem 0 2rem;
      }
    }
  }
`;

const ProductEngraving = ({ engravingText, setEngravingText, hasSingleInitialEngraving, productType }) => {
  console.log({ productType });
  const [isEngravingInputVisible, setIsEngravingInputVisible] = useState(false);
  const [engravingInputText, setEngravingInputText] = useState('');

  const inputRef = useRef(null);
  const { query } = useRouter();
  const MAX_CHAR_LIMIT = hasSingleInitialEngraving
    ? 1
    : ENGRAVING_CHARACTER_LIMITS[query.collectionSlug.toString()]
    ? ENGRAVING_CHARACTER_LIMITS[query.collectionSlug.toString()]
    : JEWELRY_ENGRAVING_MAX_LENGTH;

  const isEngravingInputEmpty = useMemo(() => {
    return isEngravingInputVisible && engravingInputText.length === 0;
  }, [engravingInputText]);

  function confirmEngraving() {
    setEngravingText(engravingInputText);
    setIsEngravingInputVisible(false);
  }

  function removeEngraving() {
    setEngravingText(null);
    setEngravingInputText('');
    setIsEngravingInputVisible(false);
  }

  useEffect(() => {
    if (isEngravingInputVisible) {
      inputRef.current.focus();
    }
  }, [isEngravingInputVisible]);

  const engravingCtaText = useMemo(() => {
    return `Add ${hasSingleInitialEngraving ? 'initial' : 'engraving'}`;
  }, [hasSingleInitialEngraving]);

  return (
    <ProductEngravingStyles>
      <div className="engraving-container">
        {!engravingText ? (
          <div className="engraving-prompt-text">
            <DarksideButton
              onClick={() => setIsEngravingInputVisible(!isEngravingInputVisible)}
              type="underline"
              colorTheme="teal"
              className="engraving-cta"
            >
              <UIString>{engravingCtaText}</UIString>
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
              onClick={() => {
                setIsEngravingInputVisible(!isEngravingInputVisible);
              }}
              type="underline"
              colorTheme="teal"
            >
              <UIString>Modify</UIString>
            </DarksideButton>
          </div>
        )}
        {isEngravingInputVisible && (
          <div
            className={clsx('engraving-input-container', {
              'is-initial': hasSingleInitialEngraving,
              '-engagement-ring': productType === ENGAGEMENT_RING_PRODUCT_TYPE || productType === WEDDING_BAND_PRODUCT_TYPE,
            })}
          >
            <input
              type="text"
              ref={inputRef}
              value={engravingInputText}
              onChange={(e) => {
                const newValue = e.target.value;

                if (newValue.length > MAX_CHAR_LIMIT) return;

                if (ENGRAVING_REGEX.test(newValue) || newValue === '') {
                  setEngravingInputText(newValue);
                }
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
      </div>
    </ProductEngravingStyles>
  );
};

export default ProductEngraving;
