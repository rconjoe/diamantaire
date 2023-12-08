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
      padding: 0;
    }

    .form-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    [type='text'] {
      border: 0.1rem solid var(--color-lighter-grey);
      width: 100%;
      padding: 0 1rem;
      outline: none;
      height: 4.6rem;
      line-height: 4.6rem;
    }

    textarea {
      border: 0.1rem solid var(--color-lighter-grey);
      line-height: 1.5rem;
      outline: none;
      padding: 1rem;
      height: 10rem;
    }

    [type='checkbox'] {
      margin: 0 1rem 0 0;
      outline: none;
    }

    .form-response {
      display: block;
      margin: 2rem 0 0;
      font-size: var(font-size-xxsmall);
    }

    button {
      text-transform: uppercase;
    }
  }
`;
