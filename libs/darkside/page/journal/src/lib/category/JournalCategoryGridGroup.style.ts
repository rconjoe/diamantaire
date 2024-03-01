import { media, setSpace, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const JournalCategoryGridGroupStyles = styled.div`
  .journal-category-grid__wrapper {
    margin-top: ${setSpace(4)};
    width: 100%;

    hr {
      border: none;
      background-color: black;
      color: black;
      height: 0.5rem;
    }

    &.header-content {
      margin-top: ${setSpace(6)};
      margin-bottom: ${setSpace(3)};
      ${tabletAndUp(`
      margin-top: ${setSpace(8)};
        margin-bottom: ${setSpace(4)};
        `)}
    }

    .journal-category-grid__title {
      display: inline-block;
      text-transform: uppercase;
      margin-right: ${setSpace(2)};
      font-size: var(--font-size-small);

      /* if a parent has the fit-content additionalClass then have no margin right on the title */
      .fit-content & {
        margin-right: 0;
      }

      .with-route & {
        margin-right: 0.5rem;
      }
    }

    .journal-category-grid__link-container {
      display: inline-block;
      a,
      a:visited {
        font-size: ${setSpace(2)};
        font-weight: 600;
        color: var(--color-teal);
        text-decoration: underline;
      }
    }
  }

  .journal-category-grid__content-block-container {
    ${media.medium`margin: 0 -1.6rem; display: flex;`}
    > * {
      flex: 0 0 33.33%;
    }

    a,
    a:visited {
      font-size: ${setSpace(2)};
      font-weight: 600;
      color: var(--color-teal);
      text-decoration: underline;

      button {
        margin-top: 0.8rem;
      }
    }

    div { 
      &.journal-item {
        padding: 0 1.6rem;
        @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
          padding: 1rem 0;
        }
      }
    }
  }
`;
