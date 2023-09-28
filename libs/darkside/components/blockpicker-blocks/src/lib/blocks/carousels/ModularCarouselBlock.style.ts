import { media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularCarouselBlockContainer = styled.div`
  .carousel-footer {
    max-width: 90vw;
    margin: 5rem auto 0;
    ${media.small`max-width: 35rem;`}
  }
`;
