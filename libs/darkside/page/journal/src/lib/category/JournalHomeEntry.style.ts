import { media, setSpace, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const JournalHomeEntryStyles = styled.div<{
  headerHeight: number;
}>`
  padding-top: ${(props) => props.headerHeight + 'px'};

  .journal-home__wrapper {
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

    .journal-home__title {
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
  }
  .journal-home__content-block-container {
    ${media.medium`margin: 0 -1.6rem;display: flex;flex-wrap: wrap;`}

    > * {
      flex: 1 1 100%;
      ${media.medium`flex: 0 0 33.33%;`}
    }

    a,
    a:visited {
      font-size: ${setSpace(2)};
      font-weight: 600;
      color: var(--color-teal);
      text-decoration: underline;
    }

    ${tabletAndUp(`
      grid-template-columns: 1fr 1fr 1fr;
    `)};
  }
  .journal-home__load-more-button {
    max-width: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${setSpace(6)};
    max-width: 30rem;
    margin: 0 auto;
  }
`;
