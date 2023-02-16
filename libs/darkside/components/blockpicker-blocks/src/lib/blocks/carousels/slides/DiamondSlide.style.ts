import { mobileOnly, tabletAndUp, MAIN_FONT } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularSwiperCarouselBlockContainer = styled.div`
  .product-slide {
    width: 100%;
    height: auto;
    flex-direction: column;

    transition: all 0.2s ease-in-out 0s;
    ${mobileOnly(`
    transform: scale(0.7);
  `)}
    &.swiper-slide-active {
      ${mobileOnly(`
    transform: scale(1);
  `)}
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

export const SlideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  outline: none;

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
`;
