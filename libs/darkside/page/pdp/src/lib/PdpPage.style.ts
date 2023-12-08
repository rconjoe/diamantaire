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
      ${media.medium`padding: 0 2rem;`}
      ${media.xl`padding: 0 3rem 0 2rem;`}
    }
    .info-container {
      padding: 0 4rem 0 2rem;
      overflow: hidden;
      flex: 0 0 40rem;
      ${media.xl`flex: 0 0 55rem;`}

      .info__inner {
        margin: 0 auto;
        /* ${media.small`max-width: 25rem;`} */
        ${media.medium`max-width: 35rem;`}
        ${media.xl`max-width: 450px;`}
      }
    }
  }
`;
