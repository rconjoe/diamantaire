import { setSpace, mobileOnly, customBPAndDown, BP_LG } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

/**
 * IMPORTANT NOTE: These styles are used heavily in ProductSuggestionQuadBlock.js.
 * Please edit with caution as designs will be impacted in that block
 * as well. Feel free to use separate styles in ProductSuggestQuadBlock.style.js
 * if need be.
 */

/**
 * This override allows the size of this block to be driven by the image,
 * rather than the container, thus allowing us to maintain the aspect ratio
 * of the image.
 */

export const ModularHalfWidthQuadBlockContainer = styled.div`
  margin-top: ${setSpace(4)};
  margin-bottom: ${setSpace(4)};

  ${customBPAndDown(
    BP_LG,
    `
      max-width: 864px !important;
    `,
  )};

  .quad__image-quad-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    margin: ${setSpace(2)} 0;

    ${mobileOnly(`
      margin: ${setSpace(2)} 0;
      grid-template-columns: 1fr;
    `)};

    &.right {
      direction: rtl;
    }

    picture {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }
  }

  .quad__block-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    margin: 0 0 0 ${setSpace(2)};

    row-gap: ${setSpace(4)};
    ${mobileOnly(`
      margin: ${setSpace(2)} 0 0;
    `)};
  }

  .quad__image-tile-container {
    margin: 0;
    padding: 0;

    // Ensure there is some margin below the first two ImageTiles
    &:nth-child(-n + 2) {
      margin-bottom: ${setSpace(1.5)};
    }

    // Ensure the last two ImageTiles align with the base of the image
    &:nth-last-child(-n + 2) {
      align-self: end;
      margin-bottom: -4px; // This is to overcome the line-height spacing related to characters that go below the baseline.
    }

    // This sets the horizontal spacing on mobile
    ${(props) =>
      props.$imageAlignment === 'left' &&
      mobileOnly(`
        &:nth-child(odd) {
          margin: 0 ${setSpace(1.5)} 0 0;
        }
        &:nth-child(even) {
          margin: 0 0 0 ${setSpace(1.5)};
        }
      `)};
    ${(props) =>
      props.$imageAlignment === 'right' &&
      mobileOnly(`
        &:nth-child(even) {
          margin: 0 ${setSpace(1.5)} 0 0;
        }
        &:nth-child(odd) {
          margin: 0 0 0 ${setSpace(1.5)};
        }
      `)};

    .imageTileCopyContainer {
      margin-bottom: 0;
    }
    ${mobileOnly(`
      .imageTileCopyContainer {
        margin-bottom: ${setSpace(3)};
      }
    `)};
  }
`;
