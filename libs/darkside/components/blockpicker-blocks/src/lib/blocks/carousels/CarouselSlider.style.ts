import { desktopAndUp, tabletAndUp, XXLDesktopAndUp, setSpace, mobileOnly } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const chevronWidth = '5rem';
const containerWidth = '148rem';
const carouselWidth = '128rem';

export const CarouselSliderContainer = styled.div`
  position: relative;
  display: block;

  .content-block__layout {
    position: relative;
    padding: 0;

    ${tabletAndUp(`
    padding: 0 ${setSpace(3)}
  `)}

    ${XXLDesktopAndUp(`
    padding: 0;
  `)}
  }

  .content-block__title {
    position: relative;
    text-align: center;
    margin: ${setSpace(3)} 0;
    ${tabletAndUp(`
      margin: ${setSpace(3)} 0 ${setSpace(6)} 0;
    `)}
    &.-no-margin {
      margin: 0;
    }
    &.-no-margin-top {
      margin-top: 0;
    }
    .primary {
      font-weight: 400 !important;
      line-height: 3.6rem;
      font-size: 3.2rem;

      ${XXLDesktopAndUp(`
      font-size: 4.2rem;
      line-height: 4.8rem;
    `)}
    }
  }

  .content-block__subtitle {
    font-size: 1.6rem;
    margin-top: 1rem;
  }

  .carousel-nav {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    display: block;
    padding: 0;
    height: 100%;
    width: 100%;
    margin: auto;

    ${tabletAndUp(`
    max-width: calc(100vw );
  `)}

    ${XXLDesktopAndUp(`
    max-width: calc(${containerWidth} - 5rem);
    `)}
    /* ${XXLDesktopAndUp(`
    max-width: calc(${carouselWidth} + 10rem);
    `)} */

  &.xl-width {
      ${XXLDesktopAndUp(`
      max-width: 95vw;
    `)}
    }
  }

  .carousel-arrow {
    background: #fff;
    display: none;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: calc(${chevronWidth});
    position: absolute;
    z-index: 1;
    right: 0;
    top: -10px;

    button {
      padding: 0;
      background-color: transparent;
    }

    ${tabletAndUp(`
    display: flex;
    height: 100%;
  `)}

    &.xl-width {
      ${tabletAndUp(`
    display: flex;
    height: calc(((100vw - ${setSpace(15)} * 2) / 3));
  `)}

      ${XXLDesktopAndUp(`
    height: calc(((90vw - ${chevronWidth}) / 4));
  `)}
    }
    &.-celebrity-bottom-carousel {
      ${tabletAndUp(`
    display: flex;
    height:60%;
  `)}

      ${desktopAndUp(`
    height:90%;
  `)}
    }

    &.-diamond-carousel {
      ${tabletAndUp(`
    display: flex;
    height:50%;
  `)}

      ${desktopAndUp(`
    height:80%;
  `)}
    }
    svg {
      width: auto;
      height: 1.5rem;
    }

    &.arrow-left {
      left: 0;
    }

    &.arrow-right {
      right: 0;
    }
  }

  .carousel-container {
    position: relative;
    display: block;
    margin: 0 auto;
    padding: 0;
    height: 100%;
    max-width: 100%;
    overflow: hidden;

    ${tabletAndUp(`
    max-width: calc(100vw  - 12.5rem);
  `)}

    ${XXLDesktopAndUp(`
    max-width: calc(${carouselWidth} - ${chevronWidth} * 2);
    `)}

  &.xl-width {
      ${XXLDesktopAndUp(`
     max-width: 90vw;
    `)}
    }
  }

  .centered {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;

    .cta {
      margin-top: ${setSpace(3)};

      ${tabletAndUp(`
        margin-top: ${setSpace(6)};
      `)};
    }
  }

  &.quote-slider {
    .carousel-arrow svg {
      transform: scale(2);
    }
  }

  .carousel-footer {
    margin-top: 2rem;
  }

  .swiper-slide.modular_slick_carousel_block {
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

  /* Embla styles */

  &.modular_carousel_hover_block,
  &.modular_product_slider_block,
  &.modular_celebrity_carousel_block,
  &.modular_instagram_reel_block,
  &.modular_grid_carousel_block {
    .embla__slide {
      padding: 0 10px;
      max-width: 280px;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        flex: 0 0 25%;
        max-width: 100%;
      }
    }
  }

  &.modular_slick_carousel_block {
    .embla__slide {
      padding: 0 20px;
      max-width: 200px;
      margin: 0 auto;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        flex: 0 0 20%;
        padding: 0 40px;
        max-width: 100%;
      }
    }
  }

  &.modular_instagram_reel_block {
    .content-block__title {
      h2 {
        font-size: 2.7rem;
      }
    }
  }

  .slider-dots {
    position: relative;
    top: -10px;
    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      top: -50px;
    }
    ul {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;
      justify-content: center;
      gap: 1rem;
      li {
        button {
          height: 0.5rem;
          width: 0.5rem;
          background-color: var(--color-black);
          border: none;
          border-radius: 50%;
          line-height: 1;
          padding: 0;
          opacity: 0.1;

          &.active {
            opacity: 0.75;
          }
        }
      }
    }
  }
`;
