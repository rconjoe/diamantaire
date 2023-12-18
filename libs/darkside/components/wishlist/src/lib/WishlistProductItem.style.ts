import { tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const StyledWishlistSlideoutProductItem = styled.div`
  .card {
    position: relative;
    display: flex;
    gap: 2rem;
    border-bottom: 0.1rem solid var(--color-lighter-grey);
    padding: 0 0 2rem;
  }

  .text {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 3rem 0 0;
    line-height: 1.2;

    ${tabletAndUp(`
      padding: 0 4rem 0 0;
    `)}
  }

  .poster {
    width: 12rem;
  }

  .title {
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xxsmall);
  }

  .price {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xxsmall);
    margin-top: 0.75rem;
  }

  button {
    font-size: var(--font-size-xxsmall);
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    max-width: 20rem;
  }

  .custom-pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .custom-pagination-thumbnail {
    width: 4rem;
    border: 0.1rem solid transparent;
    cursor: pointer;

    &.active {
      border-color: var(--color-teal);
    }
  }

  .share {
    color: var(--color-teal);
    cursor: pointer;
    text-decoration: underline;
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: var(--font-size-xxsmall);

    svg {
      width: 2.5rem;
      height: auto;
    }
  }
`;

export const StyledWishlistPageProductItem = styled.div`
  width: 100%;

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 0 0 2rem;
    height: 100%;
  }

  .text {
    flex: 1;
    display: flex;
    line-height: 1.2;
    flex-direction: column;
    margin-top: auto;

    > a {
      margin-top: auto;
    }
  }

  .poster {
    width: 100%;
  }

  .title {
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-xxsmall);
  }

  .price {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xxsmall);
    margin-top: 0.25rem;
  }

  button {
    font-size: var(--font-size-xxsmall);
    margin-top: 1rem;
    width: 100%;
  }

  .custom-pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    display: none;
  }

  .custom-pagination-thumbnail {
    width: 4rem;
    cursor: pointer;
    border: 0.1rem solid transparent;

    &.active {
      border-color: var(--color-teal);
    }
  }

  .share {
    color: var(--color-teal);
    cursor: pointer;
    text-decoration: underline;
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: var(--font-size-xxsmall);

    svg {
      width: 2.5rem;
      height: auto;
    }
  }

  .action {
    margin-top: auto;
    width: 100%;
    flex-direction: column;
    align-self: flex-end;
    display: flex;
  }
`;
