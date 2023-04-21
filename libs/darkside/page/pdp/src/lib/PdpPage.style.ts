import { media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const PageContainerStyles = styled.div`
  .product-container {
    ${media.medium`display: flex;flex-direction: row;`}
    .media-container {
      flex: 1;
      ${media.medium`padding: 0 20px;`}
    }
    .info-container {
      flex: 0 0 550px;
      padding: 0 40px 0 20px;
      overflow: hidden;
    }
  }
`;
