import { colorMap } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const PlpProductFilterStyles = styled.div`
  position: sticky;
  top: ${({ headerHeight, isSettingSelect }) => (isSettingSelect ? 0 : headerHeight - 1 + 'px')};
  background-color: #fff;
  z-index: 100;
  padding: calc(var(--gutter) / 3) 0;

  .filter__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .filter__header {
    .filter__title {
      margin-right: 10px;
      h4 {
        margin: 0;
        font-size: var(--font-size-xxxsmall);
      }
    }

    .filter__options {
      li {
        margin-right: calc(var(--gutter) / 3);
        &:last-child {
          margin-right: 0px;
        }

        button {
          border: none;
          background-color: transparent;
          padding: 0;
          &.active {
            .arrow-up {
              transform: rotate(0deg);
            }
          }

          .arrow-up {
            width: 0;
            height: 0;
            border-left: 3.5px solid transparent;
            border-right: 3.5px solid transparent;
            border-bottom: 7px solid black;
            display: inline-block;
            margin-left: 3px;
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  .filter-slider {
    max-width: 370px;
    padding-top: 20px;
  }
  .filter-option-set {
    padding-top: 10px;
    ul {
      li {
        margin-right: calc(var(--gutter) / 3);
        &:last-child {
          margin-right: 0px;
        }

        button {
          background-color: transparent;
          padding: 0;
        }
        svg {
          height: 30px;
          width: auto;
          display: inline-block;
        }
      }
    }

    &.diamondType {
      button {
        padding: 5px 15px;
        border-radius: 10px;
        transition: 0.25s;
        border: 1px solid #ccc;
        &:hover {
          background-color: var(--color-teal);
          border-color: var(--color-teal);
          .diamond-text {
            color: #fff;
          }

          svg {
            path,
            polygon,
            rect {
              stroke: #fff;
            }
          }
        }
        .diamond-icon {
          margin-right: 10px;
          position: relative;
          top: 1px;
        }
      }
    }

    &.styles {
      button {
        border-bottom: 2px solid transparent;
        transition: 0.25s;
        &:hover {
          border-bottom: 2px solid var(--color-teal);
        }
        .setting-icon {
          margin-right: 10px;
          position: relative;
          top: 1px;
        }
      }
    }

    &.metal {
      button {
        width: 100%;
        background-color: transparent;
        padding: 0;
        border: 1px solid #ccc;
        padding: 5px 15px;
        border-radius: 10px;
        transition: 0.25s;
        &:hover {
          background-color: var(--color-teal);
          border-color: var(--color-teal);
          .metal-text {
            color: #fff;
          }
        }
      }

      .metal-swatch {
        height: 30px;
        width: 30px;
        display: inline-block;
        flex: 0 0 30px;
        border: 1px solid transparent;
        border-radius: 50%;
        margin-right: 7px;

        /* TODO - refine to css variables */
        &.yellow-gold {
          background-color: ${colorMap['yellow-gold']};
        }

        &.white-gold {
          background-image: ${colorMap['white-gold']};
        }

        &.rose-gold {
          background-color: ${colorMap['rose-gold']};
        }

        &.sterling-silver {
          background: linear-gradient(138deg, #d2d2d0 0%, #f7f7f7 50%, #c9cac8 100%);
        }
      }
    }
    &.priceRange {
      button.active {
        font-weight: bold;
        border-bottom: 2px solid var(--color-teal);
      }
    }
  }

  .active-filters {
    padding: 10px 0 0;
    li {
      margin-right: 10px;
      button {
        background-color: transparent;
        border: 1px solid #ccc;
        padding: 5px 15px;
        border-radius: 30px;
        transition: 0.25s;

        &:hover {
          background-color: var(--color-teal);
          border-color: var(--color-teal);
          color: #fff;
          span,
          span.close {
            color: #fff;
          }
        }

        span {
          color: #777;
          transition: 0.25s;
        }

        &.price-filter-tab {
          .close {
            margin-right: 3px;
          }
          .hyphen {
            margin: 0 3px 0 3px;
          }
        }
      }
    }
  }
`;
