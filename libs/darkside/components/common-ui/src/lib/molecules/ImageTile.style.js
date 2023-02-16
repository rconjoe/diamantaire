import {
  tabletAndUp,
  setSpace,
  HEADLINE_SIZE,
  MEDIUM_FONT_WEIGHT,
  BOLD_FONT_WEIGHT,
} from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ImageTileContainer = styled.div`
  ${tabletAndUp(`
    padding: ${setSpace(2)};
  `)};
  &.-modular-content-quad-block {
    ${tabletAndUp(`
      padding: 0;
    `)};
  }

  .image-tile__copy-container {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin-top: ${setSpace(0.5)};
    margin-bottom: ${setSpace(4)};
    text-align: left;
    &.-modular-content-quad-block {
      margin-bottom: 0;
    }
    &.-background-color {
      margin-left: auto;
      margin-right: auto;
    }
  }

  .image-tile__title {
    margin: 5px 0;
    .in-the-media & {
      font-weight: ${BOLD_FONT_WEIGHT};
      text-transform: uppercase;
      line-height: 32px;
    }
    &.primary {
      font-weight: ${MEDIUM_FONT_WEIGHT};
      font-size: ${HEADLINE_SIZE};
      line-height: 1.3;
      ${tabletAndUp(`
        font-size: 2rem;
      `)};
    }
  }

  .image-tile__subtitle {
    font-weight: 500;
    p {
      font-size: 1.5rem;
      text-transform: uppercase;
      color: #7c7c7c;
      ${tabletAndUp(`
        margin-top: 0;
      `)}
    }
  }

  .image-tile__image {
    width: 100%;

    /* HACK: forces blog posts that live on pages like blogHome and blogCategory to uniform aspect ratio.
   *  TODO: replace with a responsive query */
    &.-blog {
      aspect-ratio: 1.5 / 1;
    }
  }

  .image-tile__button {
    margin-top: ${setSpace(0.5)};
  }

  .image-tile__anchor {
    text-align: center;
  }

  // Hack to line up the bottom of the image and the text in the quad block
  .ModularHalfWidthQuadBlock & {
    padding-bottom: 0 !important;
    padding-top: 0 !important;
  }

  &.-is-svg {
    &.-background-color {
      background-color: ${(props) => props.backgroundColorRgba};
      padding: ${setSpace(4)} ${setSpace(2)} 0 ${setSpace(2)};
      margin-bottom: ${setSpace(2)};
    }

    ${tabletAndUp(`
      padding: ${setSpace(2)};

      &.-background-color {
        margin: 0 ${setSpace(1)};
      }
    `)};

    margin: 0 auto;

    h2 {
      text-align: center;
    }

    p {
      text-align: center;
    }

    .svg {
      height: 125px;
      width: 125px;
      display: flex;
      margin: 0 auto;
      margin-bottom: ${setSpace(2)};
    }

    .svgCopyContainer {
      ${tabletAndUp(`
        min-height: 0;
      `)};
    }
  }
`;
