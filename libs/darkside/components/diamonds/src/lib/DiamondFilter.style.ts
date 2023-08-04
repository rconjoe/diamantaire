import { BLACK, desktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondFilter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .vo-filter {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }

  .vo-filter-title {
    display: flex;
    align-items: center;
    text-transform: capitalize;
    gap: 5px;
    width: 90px;

    .title {
      font-weight: 500;
      font-size: var(--font-size-xxxsmall);
      text-transform: uppercase;
    }
  }

  .vo-filter-radio .vo-filter-list {
    gap: 5px;

    ${desktopAndUp(`
      gap: 10px;
    `)}
  }

  .vo-filter-radio,
  .vo-filter-slider {
    padding: 0;
    flex: 1;
  }

  .vo-filter-list {
    list-style-position: inside;
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  .vo-filter-list-item {
    position: relative;
    cursor: pointer;
    font-size: var(--font-size-xxxsmall);
    display: block;
    text-align: center;
  }

  .vo-filter-list-item a {
    color: #333;
    width: 100%;
    padding: 4px 2px;
    display: flex;
    border: 1px solid transparent;
  }

  .vo-filter-list-item a:hover,
  .vo-filter-list-item a:focus {
    color: var(--color-teal);
  }

  .vo-filter-list-item.active a {
    color: var(--color-teal);
    border: 1px solid var(--color-teal);
  }

  .vo-filter-diamondType {
    flex-direction: column;
    max-width: 100%;

    .vo-filter-radio {
      max-width: 100%;
      overflow-x: auto;

      ::-webkit-scrollbar {
        opacity: 0;
        height: 0;
      }
    }

    .vo-filter-list {
      list-style: none;
      padding: 10px 0;
      display: flex;
      justify-content: space-between;

      .vo-filter-list-item.active a,
      .vo-filter-list-item a {
        padding: 0;
        border: 0;
      }

      .vo-filter-list-item.active:after {
        content: '';
        border-bottom: 2px solid var(--color-teal);
        position: absolute;
        margin-left: -12px;
        bottom: -8px;
        width: 24px;
        left: 50%;
      }

      svg {
        display: block;
        height: 30px;
        width: auto;
      }
    }
  }

  .vo-below-copy {
    width: 100%;
    margin: 15px 0 0;
    font-size: var(--font-size-xxxsmall);
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

  #tooltip-cut {
    p {
      gap: 2rem;
      display: flex;
      flex-direction: row;
      align-items: center;

      img {
        height: auto;
        width: 70px;
      }
    }
  }

  #tooltip-color {
    gap: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    img {
      margin-top: -2rem;
      margin-bottom: 2rem;
    }
  }

  #tooltip-clarity {
    img {
      margin-top: 2rem;
    }
  }
`;

export default StyledDiamondFilter;

export { StyledDiamondFilter };
