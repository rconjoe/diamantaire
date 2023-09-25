import { desktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularQuadImageGridContainer = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  .title__container {
    ${desktopAndUp(`
        padding-bottom: var(--gutter);
    `)}
  }
  .blocks__grid {
    display: none;
    flex-wrap: wrap;
    margin: 0 -10px;
    ${desktopAndUp(`
        display: flex;
    `)}

    .item__container {
      flex: 0 0 50%;
      padding: 0 10px;

      .item__title {
        padding: 0.5rem 0 2rem;
        h3 {
          font-size: 2.2rem;
          margin: 0;
        }
      }
    }
  }

  .mobile-slider {
    ${desktopAndUp(`
        display: none;
    `)}
  }
`;
