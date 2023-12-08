import { setSpace, desktopAndUp, mobileOnly } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const DiamondLeoBlockContainer = styled.div`
  .diamond-leo__wrapper {
    background: var(--color-lightest-grey);
    margin-top: ${setSpace(2)};
    padding: ${setSpace(3)} !important;
    display: flex;
    flex-direction: column;
    &.-blockquote {
      display: flex;
      align-items: center;
      text-align: center;
      margin-bottom: ${setSpace(4)};

      ${desktopAndUp(`
        padding: ${setSpace(6)} !important;
      `)};
    }

    .diamond-leo__name {
      font-weight: 300;
      font-size: 1.6rem !important;
      margin-bottom: ${setSpace(1)};
      ${mobileOnly(`
        font-weight: 500 !important;
      `)}
    }

    .diamond-leo__quote {
      margin-bottom: ${setSpace(1)};
      margin-top: 1.4rem;
      font-size: 1.9rem !important;
      &.-blockquote {
        text-align: center;
        max-width: 700px;
        margin: 0 auto ${setSpace(4)};
        ${mobileOnly(`
          font-size: 1.7rem !important;
          width: 27.7rem;
          margin: 0 auto 2rem;
        `)}
      }
    }

    .diamond-leo__signature {
      max-width: 12.6rem;
      aspect-ratio: auto;
      height: auto;
      &.-blockquote {
        margin: 0 auto;
      }
      ${mobileOnly(`
        max-width: 8.8rem;
      `)}
    }
  }

  svg,
  img {
    max-width: 14rem;
  }
`;
