import { XLDesktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const gap = '2rem';

const mediaWidth = '375px';

const StyledDiamondTableRow = styled.div`
  display: block;
  flex-wrap: wrap;

  .row-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    ${XLDesktopAndUp(`
      flex-direction: row;
      gap: ${gap};
      padding: ${gap} 0;
    `)}
  }

  .row-media {
    width: 100%;
    display: flex;
    padding: 0;
    align-items: flex-start;

    ${XLDesktopAndUp(`
      width: ${mediaWidth};
    `)}

    .row-media-content {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    img {
      width: auto;
      max-width: 100%;
      max-height: 100%;
    }

    .row-media-content {
      display: block;
      position: relative;
    }
  }

  .row-aside {
    display: flex;
    flex-direction: column;
    gap: ${gap};
    flex: 1;
    width: 100%;
    padding: ${gap};

    ${XLDesktopAndUp(`
      padding: 0;
    `)}
  }

  .row-accordion {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    order: 2;

    ${XLDesktopAndUp(`
      order: 1;
      padding-right: ${gap};
    `)}
  }

  .row-cta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 0 ${gap};
    order: 1;
    width: 100%;
    gap: ${gap};

    ${XLDesktopAndUp(`
      order: 2;
      padding-right: ${gap};
    `)}

    button {
      width: 360px;
      max-width: 100%;
    }

    .button-details {
      font-size: var(--font-size-xxsmall);
    }
  }
`;

export { StyledDiamondTableRow };

export default StyledDiamondTableRow;
