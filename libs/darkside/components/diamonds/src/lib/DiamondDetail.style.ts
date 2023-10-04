import { BLACK, GREY_DARK, GREY_LIGHT, desktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const gap = '2rem';

const mediaWidth = '50%';

const StyledDiamondDetail = styled.div`
  display: block;
  flex-wrap: wrap;

  > .body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: ${gap};

    ${desktopAndUp(`
      flex-direction: row;
      padding: ${gap} 0;
    `)}
  }

  > .foot {
    display: flex;
    margin: 5rem -2.4rem 0;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: ${gap};

    ${desktopAndUp(`
      margin: 0;
    `)}
  }

  > .body > .main {
    width: 100%;
    padding: 0 0 ${gap};
    top: ${(props) => props.headerHeight}px;

    ${desktopAndUp(`
      width: 70%;
      position: sticky;
    `)}
  }

  > .body > .aside {
    display: flex;
    flex-direction: column;
    gap: ${gap};
    width: 100%;

    ${desktopAndUp(`
      padding: 0 ${gap} ${gap};
      width: 30%;
    `)}
  }

  .main > .media {
    display: block;
    margin: 0 -2.4rem;

    ${desktopAndUp(`
      margin: 0;
      display: flex;
      align-items: flex-start;
    `)}

    .media-content {
      position: relative;
      flex: 1;
      gap: ${gap};
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    .media-content-item {
      width: 100%;
      display: block;

      ${desktopAndUp(`
        width: ${mediaWidth};
      `)}
    }
  }

  .aside > .title {
    font-size: var(--font-size-medium);
    font-weight: var(--font-weight-medium);
    text-align: center;
    line-height: 1.2;
    padding-right: 10%;

    ${desktopAndUp(`
      font-size: var(--font-size-large);
      font-weight: var(--font-weight-medium);
      text-align: left;
    `)}
  }

  .aside > .price {
    display: block;
    text-align: center;
    margin-top: -1.5rem;
    color: ${BLACK};
    font-size: var(--font-size-small);

    ${desktopAndUp(`
      text-align: left;
      font-size: var(--font-size-small);
    `)}

    .price-text {
      display: block;
      text-align: center;
      font-size: var(--font-size-xxxsmall);

      ${desktopAndUp(`
        text-align: left;
        font-size: var(--font-size-xxxxsmall);
      `)}
    }
  }

  .aside > .cta {
    display: flex;
    flex-direction: column;
    gap: ${gap};
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 !important;
    width: 100%;

    ${desktopAndUp(`
      padding-right: ${gap};
    `)}

    button {
      width: 100%;
      max-width: 100%;

      &.-slideout {
        font-size: var(--font-size-xxxsmall) !important;
      }

      &.-link-teal.primary {
        font-weight: 500;
      }
    }
  }

  .aside > .mail {
    display: flex;
    flex-direction: column;
    margin-top: 3rem;

    ${desktopAndUp(`
      margin-top: 0;
    `)}

    .title {
      font-size: var(--font-size-small);
      font-weight: 500;
      text-align: left;

      ${desktopAndUp(`
        font-size: var(--font-size-xsmall);
      `)}
    }

    p {
      font-size: var(--font-size-xxsmall);
    }

    form {
      flex: unset;
      width: 100%;
      display: block;
      margin-top: calc(${gap} / 2);

      .input-container {
        float: left;
        margin: 0;

        &:nth-child(1) {
          width: 65%;
        }

        &:nth-child(2) {
          width: 35%;
        }
      }

      button.submit,
      [type='text'] {
        flex: unset;
        width: 100%;
        height: 4.8rem;
      }
    }
  }

  .media-content > .carousel {
    width: 100%;
    display: block;
    overflow: hidden;
    padding: 0 0 30px;

    .swiper {
      overflow: visible;
    }

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .swiper-pagination {
      bottom: -30px;
    }

    .swiper-pagination-bullet {
      width: 5px;
      height: 5px;
      background: ${GREY_DARK};

      &.active {
        background: ${GREY_LIGHT};
      }
    }

    .diamond-hand {
      padding-bottom: 1rem;
      max-width: calc(100% - 4.8rem);
    }
  }
`;

export { StyledDiamondDetail };

export default StyledDiamondDetail;
