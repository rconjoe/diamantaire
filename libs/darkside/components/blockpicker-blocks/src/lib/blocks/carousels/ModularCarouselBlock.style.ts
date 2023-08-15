import { media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularCarouselBlockContainer = styled.div`
  .carousel-footer {
    max-width: 90vw;
    margin: 0 auto;
    ${media.small`max-width: 350px;`}
  }
`;
