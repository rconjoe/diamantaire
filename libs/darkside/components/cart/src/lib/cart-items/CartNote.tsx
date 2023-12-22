import { DarksideButton, UIString } from '@diamantaire/darkside/components/common-ui';
import { addItemToCart, updateGiftNote, updateMultipleItemsQuantity } from '@diamantaire/darkside/data/api';
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
          font-size: 1.3rem;
        }
      }
    }
  }
`;

const CartNote = ({ addNoteOptionCta }) => {
  const { locale } = useRouter();
  const { data: checkout, refetch } = useCartData(locale);
  const [isGiftNoteOpen, setIsGiftNoteOpen] = useState(false);
  const [giftNoteText, setGiftNoteText] = useState(checkout?.note);
  const [orderHasNote, setOrderHasNote] = useState(checkout?.note ? true : false);
  const [giftNoteInputText, setGiftNoteInputText] = useState(checkout?.note);

  const noteVariantId = createShopifyVariantId(40638483660893);

  async function toggleGiftNote() {
    console.log(giftNoteText);
    setGiftNoteText(giftNoteInputText);
    setIsGiftNoteOpen(false);
    const doesUserHaveNoteInCart = checkout?.lines?.find((line) => line?.merchandise?.id === noteVariantId);

    if (giftNoteInputText?.length > 0) {
      setOrderHasNote(true);
    } else {
      setOrderHasNote(false);
    }

    await updateGiftNote({ giftNote: giftNoteInputText }).then(() => refetch());
    if (doesUserHaveNoteInCart) {
      const updatedAttributes = {
        _hiddenProduct: 'true',
        note: giftNoteInputText,
      };

      const refinedAttributes = Object.keys(updatedAttributes)
        .map((key) => {
          return {
            key,
            value: updatedAttributes[key],
          };
        })
        .filter((attr) => attr.value !== '' && attr.value !== null && attr.value !== undefined);

      return await updateMultipleItemsQuantity({
        items: [
          {
            lineId: doesUserHaveNoteInCart.id,
            variantId: doesUserHaveNoteInCart.merchandise.id,
            quantity: 1,
            attributes: refinedAttributes,
          },
        ],
      }).then(() => refetch());
    }
  }
  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef?.current?.focus();
  }, []);

  const giftNoteStatus =
    giftNoteInputText?.length > 0 && giftNoteText?.length > 0
      ? 'Update Gift Note'
      : !giftNoteText
      ? 'Add Gift Note'
      : giftNoteInputText?.length === 0 && giftNoteText?.length > 0
      ? 'Remove Gift Note'
      : '';

  async function removeNoteFromOrder(item) {
    return await updateMultipleItemsQuantity({
      items: [
        {
          lineId: item.id,
          variantId: item.merchandise.id,
          quantity: 0,
          attributes: item.attributes,
        },
      ],
    }).then(() => refetch());
  }

  // Check if user has gift note
  useEffect(() => {
    async function checkForCartNote() {
      if (!checkout) return null;

      const doesUserHaveNoteInCart = checkout?.lines?.find((line) => line?.merchandise?.id === noteVariantId);

      if (orderHasNote && !doesUserHaveNoteInCart) {
        const attributes = {
          _hiddenProduct: 'true',
          note: giftNoteText,
        };
        const refinedAttributes = Object.keys(attributes)
          .map((key) => {
            return {
              key,
              value: attributes[key],
            };
          })
          .filter((attr) => attr.value !== '' && attr.value !== null && attr.value !== undefined);

        await addItemToCart(noteVariantId, refinedAttributes).then(() => refetch());
      } else if (!orderHasNote && doesUserHaveNoteInCart) {
        await removeNoteFromOrder(doesUserHaveNoteInCart);
      }
    }

    checkForCartNote();
  }, [checkout, orderHasNote]);

  return (
    <CartNoteStyles>
      {orderHasNote ? (
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
        <div className="cart-subtotal__gift-note">
          <div className="gift-note-toggle-text">
            <button className="gift-note-toggle" onClick={() => setIsGiftNoteOpen(!isGiftNoteOpen)}>
              {addNoteOptionCta}
            </button>{' '}
            <span>
              (<UIString>optional</UIString>)
            </span>
          </div>
        </div>
      )}

      {isGiftNoteOpen && (
        <div className="cart-note-input">
          <textarea ref={textAreaRef} value={giftNoteInputText} onChange={(e) => setGiftNoteInputText(e.target.value)} />
          <ul className="flex list-unstyled align-center">
            <li>
              <DarksideButton onClick={() => toggleGiftNote()}>{giftNoteStatus}</DarksideButton>
            </li>
            <li>
              <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsGiftNoteOpen(false)}>
                Cancel
              </DarksideButton>
            </li>
          </ul>
        </div>
      )}
    </CartNoteStyles>
  );
};

export default CartNote;
