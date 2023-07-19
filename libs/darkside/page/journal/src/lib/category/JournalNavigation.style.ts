import { setSpace, mobileOnly, tabletAndUp, desktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const JournalNavigationStyles = styled.div`
  .blog-navigation {
    padding: ${setSpace(2.5)} 0;
    background-color: #ebeff0;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow-x: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    ${mobileOnly(`
      justify-content: left;
    `)};

    .blog-navigation__logo {
      display: none;
      position: absolute;
      left: 0;
      padding-left: 5vw;
      h2 {
        font-weight: 500 !important;
        font-size: var(--font-size-small);
      }

      ${desktopAndUp(`
        display: block;
      `)};
    }

    .blog-navigation__header-links {
      display: flex;
      justify-content: flex-start;
      gap: 38px;
      margin: 0 20px;
      ${tabletAndUp(`
        justify-content: center;
      `)};
    }

    .blog-navigation__item {
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.7px;

      white-space: nowrap;

      ${tabletAndUp(`
        font-size: 16px;
      `)};
    }
  }
`;
