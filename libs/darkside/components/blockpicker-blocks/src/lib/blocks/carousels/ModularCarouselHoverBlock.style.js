import { desktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const SliderWrapper = styled.div`
  &.xl-width {
    margin-top: -20px;

    @media (min-width: 1200px) {
      margin-top: -40px;
    }
  }

  .slide-item {
    width: 100%;
    height: auto;
    flex-direction: column;

    &:focus,
    &:hover {
      cursor: pointer;

      .list-item-media-hover {
        ${desktopAndUp(`
          opacity: 1;
        `)}
      }
    }
  }
`;

export const ModularCarouselHoverBlockItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  > .container {
    padding: 0;
  }

  a:hover {
    .list-item__media--hover {
      opacity: 1;
    }
  }

  .list-item__copy {
    display: block;
    text-align: left;
    margin: 20px 0 0;
  }
  .list-item__copy-title {
    display: block;
    text-align: left;
    margin: 20px 0 0;
  }

  .list-item__media {
    img {
      display: block;
      max-width: 100%;
      height: auto;
      position: relative;
    }

    .lazyload-placeholder {
      position: absolute !important;
      height: 100% !important;
      width: 100% !important;
      left: 0;
      top: 0;
    }
  }

  .list-item__media--hover {
    transition: all 0.25s ease;
    display: none;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding-top: 100%;

    ${desktopAndUp(`
    display: block;
  `)}
  }
`;
