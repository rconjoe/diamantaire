import { DarksideButton, UIString } from '@diamantaire/darkside/components/common-ui';
import { addItemToCart, updateMultipleItemsQuantity } from '@diamantaire/darkside/data/api';
import { useCartData, useCartInfo } from '@diamantaire/darkside/data/hooks';
import { createShopifyVariantId } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CartNoteStyles = styled.div`
  margin-top: 5rem;
  .gift-note-toggle-text {
    display: block;
    font-size: var(--font-size-xsmall);
    margin-bottom: 1rem;
  }

  .gift-note-toggle {
    background-color: transparent;
    border: none;
    padding: 0;
    color: var(--color-teal);
    transition: 0.25s;
    font-weight: bold;
    font-size: var(--font-size-xsmall);

    &:hover {
      opacity: 0.7;
    }
  }

  .cart-note-with-note {
    margin-bottom: 1rem;
    .title {
      display: flex;
      p {
        font-weight: 600;
        flex: 1;
      }
    }
  }

  .cart-note-input {
    textarea {
      border: 0.1rem solid #000;
      width: 100%;
      min-height: 10rem;
      padding: 1.5rem;
      font-size: 1.6rem;
    }

    ul {
      margin-top: 1rem;
      li {
        margin-right: 1.5rem;
        &:last-child {
          margin-right: 0px;
        }

        button {
          font-size: var(--font-size-xsmall);
        }
      }
    }
  }
`;

const CartNote = () => {
  const { locale } = useRouter();
  const { data: checkout, refetch } = useCartData(locale);
  const { data: { cart: cartData } = {} } = useCartInfo(locale);

  const { pageCopy: cartCopy } = cartData || {};
  const { addNoteOptionCta, updateNoteOptionCta, removeNoteOptionCta } = cartCopy?.[0] || {};

  const noteVariantId = createShopifyVariantId(40638483660893);

  const [isGiftNoteOpen, setIsGiftNoteOpen] = useState(false);
  const [giftNoteText, setGiftNoteText] = useState('');
  const [giftNoteInputText, setGiftNoteInputText] = useState('');

  useEffect(() => {
    const noteLineItem = checkout?.lines?.find((line) => line.merchandise.id === noteVariantId);
    const noteText = noteLineItem?.attributes.find((attr) => attr.key === 'note')?.value || '';

    setGiftNoteText(noteText);
    setGiftNoteInputText(noteText);
  }, [checkout]);

  const handleGiftNoteAction = async () => {
    const existingNoteLineItem = checkout?.lines?.find((line) => line.merchandise.id === noteVariantId);

    try {
      if (giftNoteInputText) {
        const attributes = [
          { key: '_hiddenProduct', value: 'true' },
          { key: 'note', value: giftNoteInputText },
        ];

        if (existingNoteLineItem) {
          // Update existing note
          await updateMultipleItemsQuantity({
            items: [
              {
                lineId: existingNoteLineItem.id,
                variantId: noteVariantId,
                quantity: 1,
                attributes: attributes,
              },
            ],
          });
        } else {
          // Add new note if it doesn't exist
          await addItemToCart({
            variantId: noteVariantId,
            customAttributes: attributes,
          });
        }
      } else if (!giftNoteInputText && existingNoteLineItem) {
        // Delete note if input is empty and note exists

        await updateMultipleItemsQuantity({
          items: [
            {
              lineId: existingNoteLineItem.id,
              variantId: noteVariantId,
              quantity: 0,
              attributes: existingNoteLineItem.attributes,
            },
          ],
        });
      }

      refetch();
    } catch (error) {
      console.error('Failed to update the gift note:', error);
      // Handle error (e.g., show error message to user)
    }

    setIsGiftNoteOpen(false);
  };

  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef?.current?.focus();
  }, []);

  const hasExistingNoteLineItem = checkout?.lines?.find((line) => line.merchandise.id === noteVariantId);

  return (
    <CartNoteStyles>
      {giftNoteText ? (
        <div className="cart-note-with-note">
          <div className="title">
            <p>
              <UIString>Gift note</UIString>:
            </p>
            <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsGiftNoteOpen(!isGiftNoteOpen)}>
              <UIString>Modify</UIString>
            </DarksideButton>
          </div>
          <div className="value">
            <p>{giftNoteText}</p>
          </div>
        </div>
      ) : (
        <div className="cart-subtotal__gift-note gift-note-toggle-text">
          <button className="gift-note-toggle" onClick={() => setIsGiftNoteOpen(true)}>
            {addNoteOptionCta}
          </button>{' '}
          <span>
            (<UIString>optional</UIString>)
          </span>
        </div>
      )}
      {isGiftNoteOpen && (
        <div className="cart-note-input">
          <textarea ref={textAreaRef} value={giftNoteInputText} onChange={(e) => setGiftNoteInputText(e.target.value)} />
          <ul className="flex list-unstyled align-center">
            <li>
              <DarksideButton onClick={handleGiftNoteAction}>
                {hasExistingNoteLineItem
                  ? giftNoteInputText
                    ? updateNoteOptionCta
                    : removeNoteOptionCta
                  : addNoteOptionCta}
              </DarksideButton>
            </li>
            <li>
              <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsGiftNoteOpen(false)}>
                <UIString>Cancel</UIString>
              </DarksideButton>
            </li>
          </ul>
        </div>
      )}
    </CartNoteStyles>
  );
};

export default CartNote;
