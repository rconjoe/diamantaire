import { GREY_LIGHTER } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const StyledWishlistProductItem = styled.div`
  .card {
    position: relative;
    display: flex;
    gap: 2rem;
    border-bottom: 1px solid ${GREY_LIGHTER};
    padding: 0 0 2rem;
  }
  .text {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 2rem 0 0;
  }
  .poster {
    width: 160px;
  }
  .title {
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xsmall);
  }
  .price {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-small);
  }
  button {
    margin-top: 1rem;
    max-width: 200px;
  }
  .custom-pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  .custom-pagination-thumbnail {
    width: 4.5rem;
    border: 1px solid transparent;
    cursor: pointer;
  }
`;
