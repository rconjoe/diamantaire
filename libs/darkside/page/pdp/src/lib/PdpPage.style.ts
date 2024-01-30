import { contentBlockMargin, media, pageMargin } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const PageContainerStyles = styled.div`
  ${pageMargin}
  .product-container {
    position: relative;
    ${contentBlockMargin}
    ${media.medium`display: flex;flex-direction: row;`}
    .media-container {
      flex: 1;
      overflow: hidden;
      max-width: 100%;
    }
    .info-container {
      // subtracts pageMargin from right padding to make it equadistant
      padding: 0 calc(2.4rem - 1.2rem) 0 2.4rem;
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

    ul {
      @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
        padding: 0;
      }
    }
  }
`;
