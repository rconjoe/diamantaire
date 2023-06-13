import { GREY_LIGHT, GREY_LIGHTEST, TEAL, WHITE } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondTable = styled.div`
  display: flex;
  font-size: 14px;
  flex: 1;

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

    &:nth-child(2n) {
      background-color: ${GREY_LIGHTEST};
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
  }

  .vo-table-head .vo-table-row {
    justify-content: space-between;
    flex-direction: row;
    display: flex;
    background-color: ${GREY_LIGHTEST};
    width: 100%;
    margin: 0;
  }

  .vo-table-head .vo-table-cell {
    cursor: pointer;
    border-right: 1px solid ${GREY_LIGHT};
    text-transform: uppercase;
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

  .vo-table-body .vo-table-row-head:hover,
  .vo-table-body .vo-table-row-head:focus {
    background-color: ${TEAL};
    color: ${WHITE};
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
    font-size: 14px;
    margin-top: 10px;
  }

  .vo-table-pagination button:hover,
  .vo-table-pagination button:focus {
    background-color: ${TEAL};
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
    font-size: 21px;
    width: 300px;
  }

  .vo-loader-icon {
    width: 20px;
    height: 20px;
    border: 2px solid ${WHITE};
    border-bottom-color: ${TEAL};
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
    margin-left: 10px;
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
