// Controlled component for adding custom engraving to a product
// Keep state regarding actual engraving text outside of this component

import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import {
  ENGRAVING_CHARACTER_LIMITS,
  ENGRAVING_INITIALS_OPTIONS,
  JEWELRY_ENGRAVING_MAX_LENGTH,
} from '@diamantaire/shared/constants';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

const ProductEngravingStyles = styled.div`
  .engraving-container {
    padding: 0 0 10px;

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

      &.is-initial {
        input {
          max-width: 40px;
          padding-left: 0;
          text-align: center;
          font-size: var(--font-size-xsmall);
        }
      }

      p {
        font-size: 1.3rem;
        margin: 5px 0 20px;
      }
    }
  }
`;

const ProductEngraving = ({ engravingText, setEngravingText, hasSingleInitialEngraving }) => {
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

  return (
    <ProductEngravingStyles>
      <div className="engraving-container">
        {!engravingText ? (
          <div className="engraving-prompt-text">
            <DarksideButton
              onClick={() => setIsEngravingInputVisible(!isEngravingInputVisible)}
              type="underline"
              colorTheme="teal"
            >
              Add {hasSingleInitialEngraving ? 'initial' : 'engraving'}
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
              onClick={() => {
                setIsEngravingInputVisible(!isEngravingInputVisible);
              }}
              type="underline"
              colorTheme="teal"
            >
              Modify
            </DarksideButton>
          </div>
        )}
        {isEngravingInputVisible && (
          <div
            className={clsx('engraving-input-container', {
              'is-initial': hasSingleInitialEngraving,
            })}
          >
            <input
              type="text"
              ref={inputRef}
              value={engravingInputText}
              onChange={(e) => {
                // Validate input value against allowed characters
                let newValue = e.target.value;
                let isValid = true;

                if (newValue.length > MAX_CHAR_LIMIT) return;

                // If initial, force uppercase
                if (hasSingleInitialEngraving) {
                  newValue = newValue.toUpperCase();
                }

                newValue.split('').forEach((char) => {
                  if (ENGRAVING_INITIALS_OPTIONS.includes(char.toUpperCase())) {
                    return;
                  } else {
                    isValid = false;
                  }
                });

                if (isValid) setEngravingInputText(newValue);
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
      </div>
    </ProductEngravingStyles>
  );
};

export default ProductEngraving;
