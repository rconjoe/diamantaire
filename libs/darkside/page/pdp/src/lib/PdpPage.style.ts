import { media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const PageContainerStyles = styled.div`
  .product-container {
    position: relative;
    ${media.medium`display: flex;flex-direction: row;`}
    .media-container {
      flex: 1;
      overflow: hidden;
      max-width: 100%;
      ${media.medium`padding: 0 0 0 2rem;`}
      ${media.xl`padding: 0 1rem 0 2rem;`}
    }
    .info-container {
      padding: 0 2.4rem 0;
      overflow: hidden;
      flex: 0 0 43rem;
      ${media.xl`flex: 0 0 55rem;`}

      .info__inner {
        max-width: 450px;
        margin: 0 auto;
      }
    }
  }
  #breadcrumb {
    max-width: 100%;
    padding: 0 1.5rem 0.5rem;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      padding: 0 2rem 0.5rem;
    }

    ul {
      @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
        padding: 0;
      }
    }
  }
`;
