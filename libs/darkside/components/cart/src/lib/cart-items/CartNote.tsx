import { DarksideButton, UIString } from '@diamantaire/darkside/components/common-ui';
import { addItemToCart, updateMultipleItemsQuantity } from '@diamantaire/darkside/data/api';
import { useCartData } from '@diamantaire/darkside/data/hooks';
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

    if (giftNoteInputText && existingNoteLineItem) {
      // Update existing note
      const updatePayload = {
        items: [
          {
            lineId: existingNoteLineItem.id,
            variantId: noteVariantId,
            quantity: 1, // Assuming quantity remains constant for a note
            attributes: [{ key: 'note', value: giftNoteInputText }], // Update the note text
          },
        ],
      };

      await updateMultipleItemsQuantity(updatePayload);
    } else if (giftNoteInputText && !existingNoteLineItem) {
      // Add new note if it doesn't exist
      const addPayload = {
        variantId: noteVariantId,
        customAttributes: [{ key: 'note', value: giftNoteInputText }],
      };

      await addItemToCart(addPayload);
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
    setIsGiftNoteOpen(false); // Close the input area after action
  };

  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef?.current?.focus();
  }, []);

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
        !isGiftNoteOpen && (
          <div className="cart-subtotal__gift-note">
            <button className="gift-note-toggle" onClick={() => setIsGiftNoteOpen(true)}>
              <UIString>Add Gift Note</UIString>
            </button>
          </div>
        )
      )}
      {isGiftNoteOpen && (
        <div className="cart-note-input">
          <textarea ref={textAreaRef} value={giftNoteInputText} onChange={(e) => setGiftNoteInputText(e.target.value)} />
          <ul className="flex list-unstyled align-center">
            <li>
              <DarksideButton onClick={handleGiftNoteAction}>
                <UIString>{giftNoteInputText ? 'Save Note' : 'Delete Note'}</UIString>
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
