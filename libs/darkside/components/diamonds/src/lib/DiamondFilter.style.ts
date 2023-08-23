import { TEAL_MED, desktopAndUp, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondFilter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

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
    justify-content: flex-start;
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

  .vo-slider-value-start,
  .vo-slider-value-end {
    color: ${TEAL_MED};
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
    justify-content: center;
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

  .vo-filter-cut {
    padding-top: 1rem;
  }

  .vo-filter-cut,
  .vo-filter-clarity {
    .vo-filter-list-item a {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  .vo-filter-color {
    .vo-filter-list-item:nth-child(1) {
      width: 6.6rem;

      ${tabletAndUp(`
        width: 7rem;
      `)}
    }
    .vo-filter-list-item:nth-child(2) {
      width: 8.9rem;

      ${tabletAndUp(`
        width: 10rem;
      `)}
    }
    .vo-filter-list-item:nth-child(3) {
      width: 7.1rem;

      ${tabletAndUp(`
        width: 8rem;
      `)}
    }
  }

  .vo-filter-diamondType {
    flex-direction: column;
    max-width: 100%;

    .vo-filter-radio {
      overflow-x: auto;
      max-width: 100%;

      ::-webkit-scrollbar {
        opacity: 0;
        height: 0;
      }
    }

    .vo-filter-list {
      list-style: none;
      white-space: nowrap;
      padding: 10px 0;
      display: block;

      ${tabletAndUp(`
        display: flex;
        white-space: normal;
        justify-content: space-between;
      `)}
    }

    .vo-filter-list-item {
      display: inline-block;

      ${tabletAndUp(`
        display: flex;
      `)}

      &.active a,
      a {
        padding: 0 8px;
        border: 0;

        ${tabletAndUp(`
          padding: 0;
        `)}
      }

      &.active:after {
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

    .arrow.arrow-left,
    .arrow.arrow-right {
      transition: all 0.25s ease;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 50px;
      width: 30px;
      background: rgba(255, 255, 255, 0.75);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .arrow.arrow-right {
      left: auto;
      right: 0;
    }

    .arrow:hover {
      background: rgba(255, 255, 255, 1);
    }
  }

  .vo-below-copy {
    width: 100%;
    margin: 2rem 0 0;
    font-size: var(--font-size-xxxsmall);
    font-weight: var(--font-weight-normal);
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
