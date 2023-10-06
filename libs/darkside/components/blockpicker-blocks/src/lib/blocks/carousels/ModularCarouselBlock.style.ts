import { media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularCarouselBlockContainer = styled.div`
  margin: calc(var(--gutter) / 2) 0;
  ${media.small`margin: 80px 0;`}

  .carousel__title {
    text-align: center;
  }

  .carousel-footer {
    max-width: 90vw;
    margin: 5rem auto 0;
    ${media.small`max-width: 35rem;`}
  }
`;
