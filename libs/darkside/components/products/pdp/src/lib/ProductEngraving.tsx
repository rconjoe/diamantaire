// Controlled component for adding custom engraving to a product
// Keep state regarding actual engraving text outside of this component

import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import {
  ENGRAVING_CHARACTER_LIMITS,
  ENGRAVING_INITIALS_OPTIONS,
  JEWELRY_ENGRAVING_MAX_LENGTH,
} from '@diamantaire/shared/constants';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
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

      p {
        font-size: 1.3rem;
        margin: 5px 0 20px;
      }
    }
  }
`;

const ProductEngraving = ({ engravingText, setEngravingText }) => {
  const [isEngravingInputVisible, setIsEngravingInputVisible] = useState(false);
  const [engravingInputText, setEngravingInputText] = useState('');
  const { query } = useRouter();
  const MAX_CHAR_LIMIT = ENGRAVING_CHARACTER_LIMITS[query.collectionSlug.toString()]
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
                // Validate input value against allowed characters
                const newValue = e.target.value;
                let isValid = true;

                if (newValue.length > MAX_CHAR_LIMIT) return;

                newValue.split('').forEach((char) => {
                  if (ENGRAVING_INITIALS_OPTIONS.includes(char.toUpperCase())) {
                    return;
                  } else {
                    isValid = false;
                  }
                });

                if (isValid) setEngravingInputText(e.target.value);
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
