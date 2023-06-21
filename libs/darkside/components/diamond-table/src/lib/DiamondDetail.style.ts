import { XLDesktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const gap = '2rem';

const mediaWidth = '375px';

const StyledDiamondDetail = styled.div`
  display: block;
  flex-wrap: wrap;

  .detail-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    ${XLDesktopAndUp(`
      flex-direction: row;
      padding: ${gap} 0;
    `)}
  }

  .detail-media {
    width: 100%;
    display: flex;
    padding: 0 ${gap};
    align-items: flex-start;

    ${XLDesktopAndUp(`
      width: ${mediaWidth};
    `)}

    .detail-media-content {
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

    .detail-media-content {
      display: block;
      position: relative;
    }
  }

  .detail-text {
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

  .detail-info {
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

  .detail-cta {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    order: 1;
    width: 100%;

    ${XLDesktopAndUp(`
      order: 2;
      padding-right: ${gap};
    `)}

    button {
      width: 360px;
      max-width: 100%;
    }
  }
`;

export { StyledDiamondDetail };

export default StyledDiamondDetail;
