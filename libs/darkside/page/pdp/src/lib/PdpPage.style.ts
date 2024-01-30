import { contentBlockMargin, media, pageMargin } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const PageContainerStyles = styled.div`
  ${media.medium`  margin-left: 1.25rem;
  margin-right: 1.25rem;`}
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
      overflow: hidden;
      flex: 0 0 43rem;
      padding: 0 2rem;
      ${media.medium`
      // subtracts pageMargin from right padding to make it equadistant
      padding: 0 calc(2.4rem - 1.2rem) 0 2.4rem;
      `}
      ${media.xl`flex: 0 0 55rem;`}

      .info__inner {
        max-width: 450px;
        margin: 0 auto;
      }
    }
  }
  #breadcrumb {
    max-width: 100%;
    ${pageMargin}
    ul {
      @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
        padding: 0;
      }
    }
  }
`;
