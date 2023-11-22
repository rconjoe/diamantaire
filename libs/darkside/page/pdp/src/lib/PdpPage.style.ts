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
      ${media.medium`padding: 0 20px;`}
      ${media.xl`padding: 0 30px 0 20px;`}
    }
    .info-container {
      padding: 0 40px 0 20px;
      overflow: hidden;
      flex: 0 0 400px;
      ${media.xl`flex: 0 0 550px;`}

      .info__inner {
        margin: 0 auto;
        /* ${media.small`max-width: 250px;`} */
        ${media.medium`max-width: 350px;`}
        ${media.xl`max-width: 450px;`}
      }
    }
  }
`;
