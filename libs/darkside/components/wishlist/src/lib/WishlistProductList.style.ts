import styled from 'styled-components';

export const StyledWishlistSlideoutProductList = styled.div`
  display: block;
  width: 100%;

  .wishlist-product-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    .list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }

  .wishlist-no-result {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    .subtitle {
      width: 100%;
      text-align: center;

      p {
        margin: -0.5rem 0 1.5rem;
      }
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      margin: 0 0 2rem;
    }

    .item {
      width: calc((100% - 2rem) / 2);
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
      border: 2px solid var(--color-black);
      font-size: var(--font-size-xsmall);
      font-weight: var(--font-weight-bold);
      padding: 1rem;
      display: block;
      text-align: center;

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
    display: flex;
    flex-direction: column;
    width: 100%;

    .list {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      margin: 4rem 0;
    }

    .cta {
      width: 250px;
      margin: auto;
    }
  }

  .wishlist-no-result {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;

    .subtitle {
      text-align: center;
      display: block;
      width: 100%;
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      margin: 4rem 0;
    }

    .item {
      width: calc((100% - 6rem) / 4);
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
      margin: 2rem 0 0;
    }

    .title {
      transition: all 0.25s ease;
      border: 2px solid var(--color-black);
      font-size: var(--font-size-xsmall);
      font-weight: var(--font-weight-bold);
      padding: 1rem;
      display: block;
      text-align: center;

      &:hover,
      &.active {
        background: var(--color-black);
        color: var(--color-white);
      }
    }
  }
`;
