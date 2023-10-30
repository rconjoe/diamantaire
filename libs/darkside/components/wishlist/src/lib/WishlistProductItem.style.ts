import { GREY_LIGHTER, TEAL, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const StyledWishlistSlideoutProductItem = styled.div`
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
    line-height: 1.2;

    ${tabletAndUp(`
      padding: 0 4rem 0 0;
    `)}
  }

  .poster {
    width: 160px;
  }

  .title {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xsmall);
  }

  .price {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-medium);
    margin-top: 0.25rem;
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

    &.active {
      border-color: ${TEAL};
    }
  }

  .share {
    color: ${TEAL};
    text-decoration: underline;
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: var(--font-size-xsmall);

    svg {
      width: 25px;
      height: auto;
    }
  }
`;

export const StyledWishlistPageProductItem = styled.div`
  width: calc((100% - 6rem) / 4);
  align-self: stretch;

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
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xsmall);
  }

  .price {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-medium);
    margin-top: 0.25rem;
  }

  button {
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
    width: 4.5rem;
    cursor: pointer;
    border: 1px solid transparent;

    &.active {
      border-color: ${TEAL};
    }
  }

  .share {
    color: ${TEAL};
    text-decoration: underline;
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: var(--font-size-xsmall);

    svg {
      width: 25px;
      height: auto;
    }
  }
`;
