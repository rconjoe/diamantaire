import styled from 'styled-components';

export const StyledWishlistSlideoutProductList = styled.div`
  display: block;
  width: 100%;

  .wishlist-product-list {
    flex-direction: column;
    display: flex;
    width: 100%;
    gap: 2rem;

    .list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }

  .wishlist-no-result {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      gap: 2rem;
    }

    .subtitle {
      width: 100%;
      text-align: center;

      p {
        margin: -0.5rem 0 1.5rem;
      }
    }

    .list {
      display: flex;
      gap: 2rem 1rem;
      flex-wrap: wrap;
      margin: 0 0 2rem;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        gap: 2rem;
      }
    }

    .item {
      width: calc((100% - 1rem) / 2);

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        width: calc((100% - 2rem) / 2);
      }
    }

    .media {
      display: block;
    }

    .text {
      display: block;
      margin: 1rem 0 0;
    }

    .title {
      transition: all 0.25s ease;
      font-size: var(--font-size-xxsmall);
      border: 0.2rem solid var(--color-black);
      font-weight: var(--font-weight-medium);
      text-align: center;
      padding: 0.5rem 0;
      display: block;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        font-size: var(--font-size-xxsmall);
        font-weight: var(--font-weight-medium);
        padding: 1rem;
      }

      &:hover,
      &.active {
        background: var(--color-black);
        color: var(--color-white);
      }
    }
  }
`;

export const StyledWishlistPageProductList = styled.div`
  display: block;
  width: 100%;

  .wishlist-product-list {
    flex-direction: column;
    display: flex;
    width: 100%;

    .list {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      margin: 4rem 0;
    }

    .cta {
      width: 25rem;
      margin: auto;
    }
  }

  .wishlist-no-result {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    .subtitle {
      margin: -2rem 0 0;
      text-align: center;
      display: block;
      width: 100%;
    }

    .list {
      display: flex;
      gap: 2rem 1rem;
      flex-wrap: wrap;
      margin: 0 0 6rem 0;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        margin: 2rem 0 6rem 0;
        gap: 2rem;
      }
    }

    .item {
      width: calc((100% - 1rem) / 2);

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        width: calc((100% - 6rem) / 4);
      }
    }

    .media {
      display: block;

      img {
        display: block;
        width: 100%;
      }
    }

    .text {
      display: block;
      margin: 1rem 0 0;
    }

    .title {
      transition: all 0.25s ease;
      font-size: var(--font-size-xxsmall);
      border: 0.2rem solid var(--color-black);
      font-weight: var(--font-weight-medium);
      text-align: center;
      padding: 0.5rem 0;
      display: block;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        font-size: var(--font-size-xsmall);
        font-weight: var(--font-weight-bold);
        padding: 1rem;
      }

      &:hover,
      &.active {
        background: var(--color-black);
        color: var(--color-white);
      }
    }
  }
`;
