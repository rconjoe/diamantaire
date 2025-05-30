import styled from 'styled-components';

const StyledDiamondFilter = styled.aside`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .vo-filter {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;

    &.vo-filter-clarity {
      margin: -5px 0 -10px;
    }
  }

  .vo-filter-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 9rem;

    .title {
      font-weight: 500;
      font-size: var(--font-size-xxxsmall);
      text-transform: uppercase;
    }
  }

  .vo-filter-radio .vo-filter-list {
    justify-content: flex-start;
    gap: 0.25rem;

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      gap: 1rem;
    }
  }

  .vo-filter-radio,
  .vo-filter-slider {
    padding: 0;
    flex: 1;
  }

  .vo-slider-value-start,
  .vo-slider-value-end {
    color: #516868;
    font-size: var(--font-size-xxxsmall);
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

  .vo-filter-list-item a,
  .vo-filter-list-item button {
    color: #333;
    width: 100%;
    padding: 0.4rem 0.2rem;
    display: flex;
    justify-content: center;
    border: 0.1rem solid transparent;
    background: transparent;
    font-size: var(--font-size-xxxsmall);
  }

  .vo-filter-list-item a:hover,
  .vo-filter-list-item a:focus {
    color: var(--color-teal);
  }

  .vo-filter-list-item.active a,
  .vo-filter-list-item.active button {
    cursor: pointer;
    color: var(--color-teal);
    border: 0.1rem solid var(--color-teal);
  }

  .vo-filter-carat {
    min-height: 3.7rem;
  }

  .vo-filter-price {
    min-height: 3.7rem;
  }

  .vo-filter-cut {
    padding-top: 1rem;
    min-height: 3.75rem;

    .vo-filter-list-item button,
    .vo-filter-list-item a {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  .vo-filter-clarity {
    min-height: 2.75rem;

    .vo-filter-list-item button,
    .vo-filter-list-item a {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  .vo-filter-color {
    min-height: 4.5rem;

    .vo-filter-list-item:nth-child(1) {
      width: 6.6rem;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        width: 7rem;
      }
    }

    .vo-filter-list-item:nth-child(2) {
      width: 8.9rem;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        width: 10rem;
      }
    }
    .vo-filter-list-item:nth-child(3) {
      width: 7.1rem;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        width: 8rem;
      }
    }
  }

  .vo-filter-diamondType {
    flex-direction: column;
    max-width: 100%;
    min-height: 7.5rem;

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
      padding: 1rem 0;

      @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
        display: block;
        padding-left: 10px;
      }

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        display: flex;
        white-space: normal;
        gap: 1.5rem;
      }
    }

    .vo-filter-list-item {
      display: inline-block;

      @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
        left: -18px;
        position: relative;
      }

      .-pair {
        padding: 0 0 0 0.5rem;
      }

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        display: flex;
      }

      &.active button,
      &.active a,
      button,
      a {
        padding: 0 0.8rem;
        border: 0;

        @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
          padding: 0;
        }
      }

      &.active:after {
        content: '';
        border-bottom: 0.2rem solid var(--color-teal);
        position: absolute;
        bottom: -0.8rem;
        width: 100%;
        left: 0;
      }

      svg {
        display: block;
        height: 3rem;
        width: auto;
      }
    }

    .arrow.arrow-left,
    .arrow.arrow-right {
      transition: all 0.25s ease;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 5rem;
      width: 3rem;
      background: var(--color-white);
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
        width: 7rem;
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
      margin-bottom: 1rem;
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
