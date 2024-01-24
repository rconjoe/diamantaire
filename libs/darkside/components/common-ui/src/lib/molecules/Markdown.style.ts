import { setSpace, mobileOnly, desktopAndUp, media } from '@diamantaire/styles/darkside-styles';
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
    margin-bottom: 1rem;

    p {
      font-weight: var(--font-weight-normal);
      font-size: var(--font-size-xsmall);
      margin: 2rem 0;
    }

    h1 {
      font-weight: var(--font-weight-normal);
      font-size: 42px;
      line-height: 1.2;

      ${mobileOnly(`
      font-size: 2.8rem;
    `)}
    }

    // we should NOT be using the strong tag, so let's override it to be an h2
    h2,
    strong {
      font-weight: var(--font-weight-medium);
      line-height: 1.2;

      ${mobileOnly(`font-size: 2.4rem;`)}
    }

    ol,
    ul {
      letter-spacing: 0px;
      font-family: var(--font-family-main);
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
      padding-left: 0.5rem;
      margin: 0.5rem 0 0;
      font-size: var(--font-size-xxxsmall);
    }
    &.-modularSideBySideBlock {
      margin: 0;
      h2 {
        font-size: var(--font-size-xsmall);
        ${desktopAndUp(`
        font-size: 2.2rem;
      `)};
      }
      h2 {
        font-size: var(--font-size-xsmall);
        ${desktopAndUp(`
        font-size: 2.2rem;
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
      &.-vrai-created-diamond {
        margin: 0 auto;
        p {
          margin: 10px 0;
        }

        p:first-child {
          margin: 20px 0 10px 0;
        }

        p:last-child {
          margin: 10px 0 20px;
        }
      }
      &.-snug-center-copy {
        p {
          margin-top: 0;
          ${mobileOnly(`text-align: center`)}
        }
      }
    }
  }
`;
