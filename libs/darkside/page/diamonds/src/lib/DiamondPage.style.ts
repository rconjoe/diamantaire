import { desktopAndUp, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const asideWidthLG = '400px';
const asideWidthMD = '40%';
const gapMD = '2.4rem';
const gapLG = '50px';

const StyledDiamondPage = styled.div`
  margin: 25px auto 0;
  display: block;

  ${tabletAndUp(`
    margin: 25px auto 0;
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
    padding: 0 0 30px;

    ${tabletAndUp(`
      display: flex;
      justify-content: flex-end;
    `)}

    .title {
      font-size: var(--font-size-small);
      text-align: center;
      line-height: 30px;
      font-weight: 500;

      ${tabletAndUp(`
        width: calc(100% - ${asideWidthMD} - ${gapMD});
      `)}

      ${desktopAndUp(`
        width: calc(100% - ${asideWidthLG} - ${gapLG});
      `)}
    }
  }

  .page-aside {
    display: block;
    width: 100%;

    ${tabletAndUp(`
      width: ${asideWidthMD};
      display: flex;
      flex-direction: column;
      margin-top: -30px;
      position: sticky;
      align-self: flex-start;
      top: 155px;
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
`;

export default StyledDiamondPage;

export { StyledDiamondPage };
