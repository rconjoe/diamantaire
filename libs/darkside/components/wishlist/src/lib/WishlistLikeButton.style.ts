import { tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const StyledWishlistLikeButton = styled.div`
  position: absolute;
  cursor: pointer;
  width: 1.8rem;
  right: 0;
  top: 0;
  z-index: 1;

  .active {
    svg {
      fill: var(--color-teal);
    }
  }

  svg {
    width: 100%;
  }

  &.bundle {
    top: 3rem;
    right: 4rem;
  }

  &.wishlist-page {
    top: 1rem;
    right: 1.5rem;
  }

  &.wishlist-slideout {
  }

  &.diamond-detail {
    top: 2rem;
    right: -0.5rem;

    ${tabletAndUp(`
      top: 2.25rem;
    `)}
  }

  &.diamond-table {
    top: 1.5rem;
    right: 1.5rem;
  }

  &.cfy {
    top: 1.5rem;
    right: 1.5rem;
    position: absolute !important;

    ${tabletAndUp(`
      top: 0.5rem;
      right: -0.5rem;
    `)}
  }

  &.plp {
    top: 1rem;
    right: 1rem;
  }

  &.pdp {
    top: 1rem;
    right: 1.25rem;

    ${tabletAndUp(`
      top: 0.25rem;
      right: 4rem;
    `)}
  }
`;
