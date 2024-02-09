import styled from 'styled-components';

export const StyledWishlistLikeButton = styled.div`
  position: absolute;
  cursor: pointer;
  width: 1.8rem;
  right: 0;
  top: 0;
  z-index: 1;

  .wishlist-like-button {
    background: transparent;
    padding: 0;
    margin: 0;
  }

  .active {
    svg {
      fill: var(--color-teal);
    }
  }

  svg {
    width: 100%;
  }

  &.bundle {
    top: 1rem;
    right: 0;

    @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
      top: 3rem;
      right: 0;
    }

    @media (min-width: ${({ theme }) => theme.sizes.xl}) {
      top: 3rem;
      right: 5.5rem;
    }
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

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      top: 2.25rem;
    }
  }

  &.diamond-table {
    top: auto;
    bottom: 0;
    right: 1.5rem;
  }

  &.cfy {
    top: 1.5rem;
    right: 1.5rem;
    position: absolute !important;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      top: 0.5rem;
      right: -0.5rem;
    }
  }

  &.plp {
    position: relative;
    right: auto;
    top: auto;
    height: 2rem;
    &.with-space {
      right: 1rem;
      &.with-space-small {
        right: 0.5rem;
      }
    }
    svg {
      height: 2rem;
    }
  }

  &.pdp {
    top: 1rem;
    right: 1.25rem;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      top: 0.25rem;
      right: 4rem;
    }
  }
`;
