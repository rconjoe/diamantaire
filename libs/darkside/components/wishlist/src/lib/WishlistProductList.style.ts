import { BLACK } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const StyledWishlistProductList = styled.div`
  .wishlist-product-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .wishlist-no-result {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    .item {
      width: calc(50% - 1rem);
    }

    .media {
      display: block;
    }

    .text {
      display: block;
      margin: 2rem 0 0;
    }

    .title {
      border: 2px solid ${BLACK};
      font-size: var(--font-size-medium);
      padding: 1rem;
      display: block;
      text-align: center;
    }
  }
`;
