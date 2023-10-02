import { setSpace, mobileOnly, desktopAndUp, MAIN_FONT, media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const MarkdownContainer = styled.div`
  &.with-styles {
    margin: ${setSpace(2)} auto 0;
    font-weight: var(--font-weight-normal);
    font-size: var(--font-size-xsmall);

    a {
      text-decoration: underline;
    }

    // copyLongForm
    margin-bottom: 10px;

    p {
      font-weight: var(--font-weight-normal);
      font-size: var(--font-size-xsmall);
      margin: 20px 0;
    }

    h1 {
      font-weight: var(--font-weight-normal);
      font-size: 42px;
      line-height: 1.2;

      ${mobileOnly(`
      font-size: 28px;
    `)}
    }

    // we should NOT be using the strong tag, so let's override it to be an h2
    h2,
    strong {
      font-weight: var(--font-weight-medium);
      line-height: 1.2;

      ${mobileOnly(`font-size: 24px;`)}
    }

    ol,
    ul {
      letter-spacing: 0px;
      font-family: ${MAIN_FONT};
      font-style: normal;
      font-size: var(--font-size-xsmall);
      font-weight: 400;
      line-height: ${setSpace(3)};
    }

    &.-links-teal {
      a {
        color: var(--color-teal);
      }
    }
    &.-opt-in {
      display: inline-block;
      padding-left: 5px;
      margin: 5px 0 0;
      font-size: var(--font-size-xxxsmall);
    }
    &.-modularSideBySideBlock {
      margin: 0;
      h2 {
        font-size: var(--font-size-xsmall);
        ${desktopAndUp(`
        font-size: 22px;
      `)};
      }
      h2 {
        font-size: var(--font-size-xsmall);
        ${desktopAndUp(`
        font-size: 22px;
      `)};
      }
      strong {
        font-size: unset;
      }
      h3 {
        font-size: var(--font-size-xsmall);
      }
    }
    &.-textOnlyBlock {
      max-width: 90vw;
      ${media.medium`max-width: 714px`}

      &.-snug-center-copy {
        p {
          margin-top: 0;
          ${mobileOnly(`text-align: center`)}
        }
      }
    }
  }
`;
