import { GREY_LIGHTER } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const StyledWishlistShareModal = styled.div`
  .wishlist-share-modal {
    .title {
      * {
        font-size: var(--font-size-medium);
      }
    }

    .wrapper {
      max-width: 50rem;
    }

    .form-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    [type='text'] {
      border: 1px solid ${GREY_LIGHTER};
      width: 100%;
      padding: 0 10px;
      height: 3rem;
      line-height: 3rem;
      outline: none;
    }

    textarea {
      border: 1px solid ${GREY_LIGHTER};
      line-height: 1.5rem;
      outline: none;
      padding: 10px;
      height: 100px;
    }

    [type='checkbox'] {
      margin: 0 10px 0 0;
      outline: none;
    }
  }
`;
