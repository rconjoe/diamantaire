import { desktopAndUp, mobileOnly, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondTable = styled.div`
  font-size: var(--font-size-xxxsmall);
  display: block;
  margin: 3rem -2.5rem 0;

  ${tabletAndUp(`
    width: 100%;
    display: flex;
    margin: 0;
  `)}

  .vo-table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .vo-table-row {
    flex-direction: column;
    display: flex;
    width: 100%;
    margin: 0;
    background-color: var(--color-white);

    &:nth-child(2n) {
      background-color: var(--color-lightest-grey);
    }

    &.pair-row {
      .vo-table-cell {
        text-align: center;
        @media (min-width: 992px) {
          padding: 1rem 2rem;
        }
      }
    }
  }

  .vo-table-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 2rem;
    position: relative;
    width: 16%;

    ${desktopAndUp(`
      padding: 1.5rem 2rem;
    `)}
  }

  .vo-table-cell:nth-child(1),
  .vo-table-cell:last-child {
    text-align: center;
    flex: 1;
  }

  .vo-table-cell-loading {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    cursor: default;
  }

  .vo-table-head {
    z-index: 2;
    width: 100%;
    display: flex;
    position: sticky;
    top: 55px;
  }

  .vo-table-head .vo-table-row {
    justify-content: space-between;
    flex-direction: row;
    display: flex;
    background: var(--color-lighter-grey) !important;
    width: 100%;
    margin: 0;
  }

  .vo-table-head .vo-table-cell {
    cursor: pointer;
    border-right: 0.1rem solid var(--color-light-grey);
    background: var(--color-lighter-grey) !important;
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1rem 0.5rem;
    font-size: var(--font-size-xxxxsmall);
    font-weight: var(--font-weight-medium);

    ${tabletAndUp(`
      background: var(--color-lightest-grey) !important;
      padding: 1rem 2rem;
    `)}
  }

  .vo-table-head .vo-table-cell:last-child {
    border-right: 0;
  }

  .vo-table-head .vo-table-cell:hover {
    background: var(--color-lightest-grey);
  }

  .vo-table-body {
    flex-direction: column;
    display: flex;
    width: 100%;
  }

  .vo-table-body .vo-table-row-head {
    display: flex;
    justify-content: space-between;
    border-bottom: 0;
    cursor: pointer;
    width: 100%;

    ${mobileOnly(`
      min-height: 5.2rem;
    `)}
  }

  .vo-table-body .vo-table-row.active,
  .vo-table-body .vo-table-row-head:hover,
  .vo-table-body .vo-table-row-head:focus {
    background-color: var(--color-teal);
    color: var(--color-white);
  }

  .vo-table-body .vo-table-row.active {
    .vo-table-row-head {
      z-index: 2;
      position: sticky;
      background-color: var(--color-teal);
      top: calc(${(props) => props.headerHeight}px + ${(props) => props.tableHeadHeight}px);
    }

    .vo-table-row-head .vo-table-cell {
      font-weight: var(--font-weight-medium);
    }
  }

  .vo-table-body .vo-table-row-body {
    display: block;
    background: var(--color-white);
    border-top: 0.1rem solid var(--color-light-grey);
  }

  .vo-table-pagination {
    display: block;
    position: relative;
  }

  .vo-table-pagi-container {
    background-color: var(--color-white);
    border: 0;
    justify-content: space-between;
    align-items: center;
    display: flex;
    padding: 2rem;
    width: 100%;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .vo-table-pagi-loading {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    cursor: default;
  }

  .vo-table-pagi-cell {
    justify-content: space-between;
    align-items: center;
    display: flex;
  }

  .vo-table-pagination button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    height: 4rem;
    width: 4rem;
    cursor: pointer;
    background-color: var(--color-white);
    margin: 0 -0.1rem;
    border: 0;
    border: 0.1rem solid var(--color-light-grey);
  }

  .vo-table-pagination p {
    margin-top: 1rem;
    font-size: var(--font-size-xxxsmall);
  }

  .vo-table-pagination button:hover,
  .vo-table-pagination button:focus {
    background-color: var(--color-teal);
    color: var(--color-white);
  }

  .vo-sort-icon {
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    ${tabletAndUp(`
      margin-left: 1rem;
    `)}

    .arrow-up {
      opacity: 0;
      display: none;
    }

    .arrow-down {
      opacity: 0.25;
    }

    &.has-active {
      * {
        opacity: 0;
        display: none;
      }

      *.active {
        display: block;
        opacity: 1;
      }
    }
  }

  .promo {
    display: flex;
    padding: 2rem;
    justify-content: center;
    align-items: center;
  }

  .vo-table-foot {
    display: block;
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 3rem 0;
    margin: auto;
    gap: 2rem;
  }

  .vo-table-no-result {
    border-bottom: 0;
    width: 100%;
  }

  .vo-table-no-result-container {
    padding: 0 2.5rem;

    ${tabletAndUp(`
      padding: 0;
    `)}

    p {
      font-size: var(--font-size-xxxsmall);
    }

    ul {
      padding: 0;
      margin: 0;
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    li > * {
      display: inline-block;
    }

    li button {
      margin-left: 0.5rem;
    }

    li a {
      color: var(--color-teal);
      text-decoration: underline;
    }
  }

  .vo-table-clear-button {
    cursor: pointer;
    margin-top: 0.6rem;
    display: inline-block;

    button {
      margin-left: 0 !important;
      font-size: var(--font-size-xxxsmall);
      font-weight: var(--font-weight-normal);
    }
  }

  .arrow-up {
    width: 0;
    height: 0;
    border-bottom: 0.8rem solid black;
    border-left: 0.4rem solid transparent;
    border-right: 0.4rem solid transparent;
  }

  .arrow-down {
    width: 0;
    height: 0;
    border-top: 0.8rem solid black;
    border-left: 0.4rem solid transparent;
    border-right: 0.4rem solid transparent;
  }

  .vo-table-trigger {
    position: absolute;
    bottom: ${(props) => props.triggerOffset}px;
    left: 0;
    display: block;
    width: 100%;
    height: 0.1rem;
  }

  .vo-table-loading {
    position: relative;
    display: block;
    background-color: rgba(94, 122, 125, 0.75);
    color: var(--color-white);
    padding: 1.5rem 2rem;
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-xxsmall);
    width: 100%;

    ${tabletAndUp(`
      width: 30rem;
    `)}
  }

  .vo-loader-icon {
    width: 2rem;
    height: 2rem;
    border: 0.2rem solid var(--color-white);
    border-bottom-color: var(--color-teal);
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: vo-loader-icon-rotation 1s linear infinite;
  }

  @keyframes vo-loader-icon-rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default StyledDiamondTable;

export { StyledDiamondTable };
