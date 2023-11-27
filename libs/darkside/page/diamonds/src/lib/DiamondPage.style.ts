import { desktopAndUp, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const asideWidthLG = '40rem';
const asideWidthMD = '40%';
const gapMD = '2.4rem';
const gapLG = '5rem';

const StyledDiamondPage = styled.div`
  margin: 2.5rem auto 0;
  display: block;

  ${tabletAndUp(`
    margin: 2.5rem auto 0;
    flex-wrap: wrap;
    display: flex;
    gap: 0 ${gapMD};
  `)}

  ${desktopAndUp(`
    gap: 0 ${gapLG};
  `)}

  .page-title {
    width: 100%;
    display: block;
    padding: 0 0 3rem;

    ${tabletAndUp(`
      display: flex;
      justify-content: center;
      padding: 0 0 6rem;
    `)}

    .title {
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-medium);
      text-align: center;
      line-height: 1;
    }
  }

  .page-aside {
    display: block;
    width: 100%;

    ${tabletAndUp(`
      width: ${asideWidthMD};
      display: flex;
      flex-direction: column;
      position: sticky;
      align-self: flex-start;
      top: 12.5rem;
    `)}

    ${desktopAndUp(`
      width: ${asideWidthLG};
    `)}
  }

  .page-main {
    width: 100%;

    ${tabletAndUp(`
      width: calc(100% - ${asideWidthMD} - ${gapMD});
    `)}

    ${desktopAndUp(`
      width: calc(100% - ${asideWidthLG} - ${gapLG});
    `)}
  }

  .vo-filter-clear-button {
    margin: 2rem 0 0;
    * {
      font-size: var(--font-size-xxxsmall);
      font-weight: var(--font-weight-normal);
    }
  }
`;

export default StyledDiamondPage;

export { StyledDiamondPage };
