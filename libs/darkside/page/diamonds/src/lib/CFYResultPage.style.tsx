import { TEAL, TEAL_MED, desktopAndUp, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const pageGap = '5rem';

const StyledCFYResultPage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem auto;

  .page-header {
    padding: 1rem 1.5rem 0;
    text-align: center;

    ${tabletAndUp(`
      padding: 0.5rem 3rem 0;
    `)}

    .title {
      font-size: var(--font-size-large);
      font-weight: var(--font-weight-medium);
      margin: 0 0 1.5rem;
      line-height: 1.1;

      ${tabletAndUp(`
        font-size: var(--font-size-large);
        margin: 0 0 1.5rem;
      `)}
    }

    p {
      font-size: var(--font-size-xxxsmall);
      max-width: 100%;
      margin: 0 auto;
      width: 360px;

      ${tabletAndUp(`
        font-size: var(--font-size-xsmall);
        width: 550px;
      `)}
    }
  }

  .page-row {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${pageGap};

    ${tabletAndUp(`
    flex-direction: row;  
  `)}
  }

  .page-content {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    ${tabletAndUp(`
    width: calc(50% - (${pageGap} / 2))
    `)}
  }

  .page-content {
    > .media {
      ${desktopAndUp(`
      width: 50rem;
      height: 57rem;
      `)}

      .swiper {
        ${desktopAndUp(`
        width: 50rem;
        height: 57rem;
        `)}
      }
    }

    .custom-pagination {
      transform: translateX(-50%);
      position: absolute;
      bottom: 0;
      left: 50%;
      display: flex;
      justify-content: center;
      gap: 1rem;
      z-index: 1;
    }

    .custom-pagination-thumbnail {
      width: 6rem;
      height: 6rem;
      cursor: pointer;
      border: 1px solid transparent;
      padding: 0.1rem;

      &.active {
        border: 1px solid ${TEAL_MED};
      }

      .caption {
        display: none;
      }

      .diamond36 {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .page-aside {
    width: 100%;

    ${tabletAndUp(`
      width: calc(50% - (${pageGap} / 2));
    `)}
  }

  .page-aside {
    .inner {
      display: flex;
      flex-direction: column;
      max-width: 450px;
    }

    .title,
    .title * {
      font-size: var(--font-size-medium);
      font-weight: var(--font-weight-medium);
    }

    .subtitle,
    .subtitle * {
      font-size: var(--font-size-medium);
      text-transform: capitalize;
    }

    .price,
    .price * {
      margin: 0.25rem 0 0;
      font-size: var(--font-size-small);
    }

    > .accordion {
      margin: 2rem 0 0;
    }

    .date {
      margin: 2rem 0 0;
    }

    .date,
    .date * {
      font-size: var(--font-size-xsmall);
      font-weight: var(--font-weight-bold) !important;
    }

    .policy,
    .policy * {
      padding: 0;
      margin: 0.25rem 0 0;
      font-size: var(--font-size-xxxsmall);
    }

    .links * {
      font-size: var(--font-size-xxsmall);
    }

    .links a {
      color: ${TEAL};
    }

    .cta {
      display: flex;
      gap: 1rem;
    }
  }
`;

export default StyledCFYResultPage;

export { StyledCFYResultPage };
