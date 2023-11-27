import { media, setSpace } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const JournalHeaderStyles = styled.div`
  .in-the-media & {
    display: none;
  }

  &.is-category-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    padding: 0 ${setSpace(8)};
    background: #ebeff0;

    .blog-navigation {
      border: 0;
    }
  }

  .title-container {
    text-align: center;
    padding: 2rem 0 2rem;
    font-size: ${setSpace(4)};
    font-weight: 400;
    min-width: 20rem;
    ${media.medium`padding: ${setSpace(3)} 0 ${setSpace(5)};`}

    .is-category-list & {
      text-align: left;
      padding: 0;
    }

    a {
      font-size: 2.7rem;
      font-weight: 500;
    }
  }
`;
