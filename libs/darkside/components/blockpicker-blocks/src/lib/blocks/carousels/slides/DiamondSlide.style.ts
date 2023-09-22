import { tabletAndUp, MAIN_FONT } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularSwiperCarouselBlockContainer = styled.div``;

export const SlideContainer = styled.div`
  outline: none;
  text-align: center;

  .slide__image-container {
    img {
      display: block;
      max-width: 100%;
      height: auto;
      &.-hover {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }

  .mobile-slide__text {
    font-family: ${MAIN_FONT};
    font-size: 20px;
    font-weight: 500;
    line-height: 1.3;
    margin-top: 25px;
    ${tabletAndUp(`
    font-size:18px;
    margin-top: 40px;
    font-weight: 600;
  `)}
  }
`;
