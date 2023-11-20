import styled from 'styled-components';

export const StyledWishlistShareModal = styled.div`
  .wishlist-share-modal {
    .header {
      text-align: center;
    }

    .title {
      width: 100%;
      text-align: center;

      * {
        font-size: var(--font-size-medium);
      }
    }

    .subtitle {
      text-align: center;
      margin: -1.5rem 0 3rem 0;

      * {
        font-size: var(--font-size-xxsmall);
      }
    }

    .close {
      position: absolute;
      right: 1rem;
      top: 1rem;
    }

    .wrapper {
      border-radius: 0;
      max-width: 50rem;
    }

    .form-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    [type='text'] {
      border: 1px solid var(--color-lighter-grey);
      width: 100%;
      padding: 0 10px;
      outline: none;
      height: 4.6rem;
      line-height: 4.6rem;
    }

    textarea {
      border: 1px solid var(--color-lighter-grey);
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
