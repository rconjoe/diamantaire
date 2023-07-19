import { setSpace, tabletAndUp, XXLDesktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const SingleJournalEntryStyles = styled.div`
  .journal-entry__crumbs {
    display: flex;
    justify-content: flex-start;
    padding: ${setSpace(3)} ${setSpace(2.6)};
    margin: auto;
    white-space: nowrap;
    overflow-x: hidden;
    font-size: var(--font-size-xxxxsmall);
    a:not(:last-child):after {
      content: '/';
      padding: ${setSpace(1)};
    }
    a:last-child {
      font-weight: 600;
    }
    ${tabletAndUp(`
      justify-content: flex-start;
       margin-left:12px;
      padding-left: ${setSpace(6)};
       padding-top: 2rem
        `)}

    ${XXLDesktopAndUp(`
      padding-left: ${setSpace(8)};
    `)};
  }
`;
