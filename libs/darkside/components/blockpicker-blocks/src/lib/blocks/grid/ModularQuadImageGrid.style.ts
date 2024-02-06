import { contentBlockMargin, contentBlockTitle } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularQuadImageGridContainer = styled.div`
  max-width: var(--max-width-small);
  ${contentBlockMargin}
  .title__container {
    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      padding-bottom: var(--gutter);
    }
    .primary {
      ${contentBlockTitle}
    }
  }

  .blocks__grid {
    display: none;
    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .item__container {
      flex: 0 0 50%;

      .item__title {
        h3 {
          font-size: 2.2rem;
          margin-top: 0.5rem;
        }
      }
    }
  }

  .mobile-slider {
    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      display: none;
    }
  }
`;
