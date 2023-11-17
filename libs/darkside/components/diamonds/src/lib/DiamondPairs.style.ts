import { BLACK, desktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const gap = '2rem';

const mediaWidth = '45rem';

export const StyledDiamondPairCell = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledDiamondPairActiveRow = styled.div`
  display: block;
  flex-wrap: wrap;

  .row-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    ${desktopAndUp(`
      flex-direction: row;
      gap: ${gap};
      padding: ${gap} 0;
    `)}
  }

  .row-media {
    width: 100%;
    padding: 0;
    display: flex;
    align-items: flex-start;

    ${desktopAndUp(`
      width: ${mediaWidth};
    `)}

    .row-media-content {
      width: 100%;
      display: block;
      position: relative;
      font-size: 0;

      > div {
        display: inline-block;
        width: 50%;
      }

      > div > div {
        display: block;
      }
    }

    img {
      width: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .row-aside {
    display: flex;
    flex-direction: column;
    gap: ${gap};
    flex: 1;
    width: 100%;
    padding: ${gap};
    margin-bottom: ${gap};

    ${desktopAndUp(`
      padding: 0;
    `)}
  }

  .row-accordion {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    ${desktopAndUp(`
      padding-right: ${gap};
    `)}

    .certificate {
      .accordion-content-wrapper {
        display: flex;
        gap: 2rem;
        .thb {
          width: auto;
          flex: 1;
        }
      }
    }
  }

  .row-info {
    color: var(--color-black);
    display: block;
    font-size: var(--font-size-xsmall);
    margin: -1rem 0 1rem;

    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    li {
      display: flex;
      gap: 0.5rem;
    }

    .label {
      display: inline-block;
      font-weight: var(--font-weight-bold);
    }

    .value {
      display: inline-block;
    }
  }

  .row-cta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap: ${gap};

    ${desktopAndUp(`
      padding-right: ${gap};
    `)}

    button {
      width: 100%;
      max-width: 360px;
    }

    .button-details button {
      font-size: var(--font-size-xxsmall);
      font-weight: 400;
      width: auto;
    }

    .button-expert button,
    .button-purchase button {
      font-weight: 400;
    }
  }
`;
