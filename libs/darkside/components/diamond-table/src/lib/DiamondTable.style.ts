import {
  FONT_SIZE_6,
  FONT_SIZE_7,
  FONT_SIZE_8,
  GREY_LIGHT,
  GREY_LIGHTER,
  GREY_LIGHTEST,
  WHITE,
  tabletAndUp,
} from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondTable = styled.div`
  font-size: ${FONT_SIZE_8};
  display: block;
  margin: 30px -25px 0;

  ${tabletAndUp(`
    font-size: ${FONT_SIZE_7};
    width: 100%;
    display: flex;
    margin: 0;
  `)}

  .vo-table-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .vo-table-row {
    flex-direction: column;
    display: flex;
    width: 100%;
    margin: 0;
    background-color: ${WHITE};

    border: 1px solid ${GREY_LIGHT};
    border-bottom: 0;

    &:nth-child(2n) {
      background-color: ${GREY_LIGHTEST};
    }

    &:first-child {
      border-top: 0;
    }

    &:last-child {
      border-bottom: 1px solid ${GREY_LIGHT};
    }
  }

  .vo-table-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    position: relative;
    width: 16%;
  }

  .vo-table-cell:nth-child(1) {
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
    display: flex;
    width: 100%;
    z-index: 1;
    position: sticky;
    top: ${(props) => props.headerHeight}px;
  }

  .vo-table-head .vo-table-row {
    justify-content: space-between;
    flex-direction: row;
    display: flex;
    background: ${GREY_LIGHTER} !important;
    width: 100%;
    margin: 0;
    border-top: 1px solid ${GREY_LIGHT};
  }

  .vo-table-head .vo-table-cell {
    cursor: pointer;
    border-right: 1px solid ${GREY_LIGHT};
    background: ${GREY_LIGHTER} !important;
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 5px;
    font-weight: 500;

    ${tabletAndUp(`
      background: ${GREY_LIGHTEST} !important;
      padding: 15px 20px;
    `)}
  }

  .vo-table-head .vo-table-cell:last-child {
    border-right: 0;
  }

  .vo-table-head .vo-table-cell:hover {
    background: ${GREY_LIGHTEST};
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
  }

  .vo-table-body .vo-table-row.active,
  .vo-table-body .vo-table-row-head:hover,
  .vo-table-body .vo-table-row-head:focus {
    background-color: var(--color-teal);
    color: ${WHITE};
  }

  .vo-table-body .vo-table-row-body {
    display: block;
    background: ${WHITE};
    border-top: 1px solid ${GREY_LIGHT};
  }

  .vo-table-pagination {
    display: block;
    position: relative;
  }

  .vo-table-pagi-container {
    background-color: ${WHITE};
    border: 0;
    justify-content: space-between;
    align-items: center;
    display: flex;
    padding: 20px;
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
    height: 40px;
    width: 40px;
    cursor: pointer;
    background-color: ${WHITE};
    margin: 0 -1px;
    border: 0;
    border: 1px solid ${GREY_LIGHT};
  }

  .vo-table-pagination p {
    margin-top: 10px;
    font-size: ${FONT_SIZE_7};
  }

  .vo-table-pagination button:hover,
  .vo-table-pagination button:focus {
    background-color: var(--color-teal);
    color: ${WHITE};
  }

  .vo-table-loading {
    position: fixed;
    bottom: 8px;
    right: 50%;
    transform: translateX(50%);
    background-color: rgba(94, 122, 125, 0.75);
    color: ${WHITE};
    padding: 15px 20px;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    font-size: ${FONT_SIZE_6};
    width: 300px;
  }

  .vo-loader-icon {
    width: 20px;
    height: 20px;
    border: 2px solid ${WHITE};
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

  .vo-sort-icon {
    margin-left: 5px;

    ${tabletAndUp(`
      margin-left: 10px;
    `)}
  }

  .vo-table-no-result {
    border-bottom: 0;
    padding: 20px 0;
  }

  .vo-table-clear-button {
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 5px;
    margin-top: 15px;
    color: ${WHITE};
    background: #333;
  }

  .vo-table-clear-button:hover,
  .vo-table-clear-button:focus {
    background: #000;
  }
`;

export default StyledDiamondTable;

export { StyledDiamondTable };
