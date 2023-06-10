import { FONT_SIZE_7 } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondFilter = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .vo-filter {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 15px 20px;
    position: relative;
    border: 1px solid #ccc;
  }

  .vo-filter-title {
    font-size: 16px;
    padding: 0 0 15px;
    border-bottom: 1px solid #ccc;
    text-transform: capitalize;
    display: flex;
    gap: 5px;
    align-items: center;

    .title {
      font-weight: 400;
      font-size: ${FONT_SIZE_7};
      text-transform: uppercase;
    }
  }

  .vo-filter-list {
    list-style-position: outside;
    padding: 10px 20px 0;
    margin: 0;
  }

  .vo-filter-list-item {
    cursor: pointer;
    font-size: 14px;
  }

  .vo-filter-list-item a {
    color: #333;
  }

  .vo-filter-list-item a:hover,
  .vo-filter-list-item a:focus {
    color: #000;
  }

  .vo-filter-list-item.active a {
    color: red;
  }

  .vo-filter-loading {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    cursor: default;
  }

  .vo-filter-slider {
    padding: 10px 0 0;
  }

  .vo-filter-list-diamondType {
    list-style: none;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;

    svg {
      display: block;
      height: 30px;
      width: auto;
    }
  }
`;

export default StyledDiamondFilter;

export { StyledDiamondFilter };
