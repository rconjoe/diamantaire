import { colorMap } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const PlpProductFilterStyles = styled.div`
  background-color: #fff;
  padding: calc(var(--gutter) / 3) 0;

  .filter__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      padding: 0 2.4rem;
    }
  }

  .filter__header {
    .filter__title {
      margin-right: 10px;
      h4 {
        margin: 0;
        font-size: var(--font-size-xxxsmall);
        display: none;
        @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
          display: block;
        }
      }
    }
    .filter-icon {
      position: relative;
      top: 2px;
      margin-right: 5px;
      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        display: none;
      }
    }

    .filter__option-selector {
      button {
        transition: 0.25s;
        &.active {
          font-weight: bold;
        }
      }
    }

    .filter__options {
      li {
        margin-right: calc(var(--gutter) / 3);

        &:nth-child(n + 3) {
          display: none;
        }

        &:last-child {
          margin-right: 0px;
        }

        &.mobile-filter-toggle {
          display: block;
          @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
            display: none;
          }
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
      overflow-x: auto;
      overflow-y: visible;
      padding: 10px 0;
      max-width: 90vw;
      margin: 0 auto;
      padding-left: 4px;
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
          overflow: visible;
        }
      }
    }

    &.diamondType {
      button {
        border-bottom: 2px solid transparent;
        transition: 0.25s;

        &:hover,
        &.active {
          border-color: var(--color-teal);
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
        transition: 0.25s;

        &.active {
          .metal-swatch {
            &::before {
              border-color: var(--color-teal);
            }
          }
        }
      }

      .metal-text {
        white-space: nowrap;
      }

      .metal-swatch {
        height: 30px;
        width: 30px;
        display: inline-block;
        flex: 0 0 30px;
        border: 1px solid transparent;
        border-radius: 50%;
        margin-right: 7px;
        position: relative;

        &::before {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          position: absolute;
          border: 1px solid transparent;
          transform: scale(1.35);
        }

        /* TODO - refine to css variables */
        &.yellow-gold {
          background-color: ${colorMap['yellow-gold']};
        }

        &.white-gold {
          background: linear-gradient(305deg, rgb(254, 254, 254), rgb(206, 206, 206), transparent);
        }

        &.rose-gold {
          background-color: ${colorMap['rose-gold']};
        }

        &.sterling-silver {
          background: linear-gradient(138deg, #d2d2d0 0%, #f7f7f7 50%, #c9cac8 100%);
        }

        &.platinum {
          background: #c8c8c8;
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
    padding: 12px 0 0;
    li {
      margin-right: 10px;
      button {
        background-color: transparent;
        border: none;
        transition: 0.25s;

        span {
          color: #777;
          transition: 0.25s;
          margin-right: 2px;
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

  .specific-filter-options {
    .filter-option-set {
      padding-right: 5rem;

      &:last-child {
        padding-right: 0;
      }
    }
  }
`;
