import styled from 'styled-components';

export const ModularQuadImageGridContainer = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  .title__container {
    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      padding-bottom: var(--gutter);
    }
  }
  .blocks__grid {
    display: none;
    flex-wrap: wrap;
    margin: 0 -10px;
    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      display: flex;
    }

    .item__container {
      flex: 0 0 50%;
      padding: 0 10px;

      .item__title {
        padding: 0.5rem 0 2rem;
        h3 {
          font-size: 2.2rem;
          margin: 0;
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
