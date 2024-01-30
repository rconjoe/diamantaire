import { contentBlockMargin, media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularCarouselBlockContainer = styled.div`
  ${contentBlockMargin}

  .carousel__title {
    text-align: center;
  }

  .carousel-footer {
    max-width: 90vw;
    margin: 5rem auto 0;
    ${media.small`max-width: 35rem;`}
  }
`;
