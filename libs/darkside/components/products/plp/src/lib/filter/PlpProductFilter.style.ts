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
  }

  .filter__header {
    .filter__title {
      margin-right: 1rem;
      display: none;
      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        display: block;
      }
      h4 {
        margin: 0;
        font-size: var(--font-size-xxxsmall);
        font-weight: 400;
        color: var(--color-dark-grey);
      }
    }
    .filter__icon {
      position: relative;
      top: 0.1rem;
      margin-right: 0.5rem;

      button {
        border: none;
        background-color: transparent;
        padding: 0;
        font-size: var(--font-size-xxxsmall);
      }

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        display: none;
      }

      svg {
        width: 30px;
        position: relative;
        top: 0.2rem;
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

        @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
          &:nth-child(n + 3) {
            display: none;
          }
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
          font-size: var(--font-size-xxxsmall);
          &.active {
            .arrow-up {
              transform: rotate(0deg);
            }
          }

          .arrow-up {
            width: 0;
            height: 0;
            border-left: 0.35rem solid transparent;
            border-right: 0.35rem solid transparent;
            border-bottom: 0.7rem solid black;
            display: inline-block;
            margin-left: 0.3rem;
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  .filter-slider {
    max-width: 37rem;
    padding-top: 2rem;
  }
  .filter-option-set {
    padding-top: 1rem;
    ul {
      overflow-x: auto;
      overflow-y: visible;
      padding: 1rem 0;
      max-width: 90vw;
      margin: 0 auto;
      padding-left: 0.4rem;
      li {
        margin-right: 1.5rem;

        button {
          background-color: transparent;
          padding: 0;
          text-transform: capitalize;
        }
        svg {
          height: 3.15rem;
          width: auto;
          display: inline-block;
          overflow: visible;
        }
      }
    }

    &.diamondType {
      ul {
        padding-left: 0.4rem;
      }
      button {
        border-bottom: 0.2rem solid transparent;
        transition: 0.25s;

        &:hover,
        &.active {
          border-color: var(--color-teal);
        }
      }
    }

    &.styles {
      button {
        border-bottom: 0.2rem solid transparent;
        transition: 0.25s;

        &:hover,
        &.active {
          border-bottom: 2px solid var(--color-teal);
        }

        .setting-icon {
          margin-right: 1rem;
          position: relative;
          top: 0.1rem;
        }
      }
      span {
        font-size: var(--font-size-xxxsmall);
      }
    }

    &.metal {
      ul {
        padding-left: 0;
        margin: 0;
        @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
          padding-left: 0.4rem;
        }
      }
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
        font-size: var(--font-size-xxxsmall);
      }

      .metal-swatch {
        height: 3rem;
        width: 3rem;
        display: inline-block;
        flex: 0 0 3rem;
        border: 0.1rem solid transparent;
        border-radius: 50%;
        margin-right: 0.7rem;
        position: relative;

        &::before {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          position: absolute;
          border: 0.1rem solid transparent;
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

        &.and {
          display: none;
        }
      }
    }
    &.priceRange {
      button.active {
        font-weight: bold;
        border-bottom: 0.2rem solid var(--color-teal);
      }

      .price-text {
        font-size: var(--font-size-xxxsmall);
      }
    }
    /* mobile filter */
    &.stacked {
      border-bottom: 1px solid #eaeaea;
      padding: 20px 0;

      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        border-bottom: none;
      }

      ul {
        overflow-x: hidden;
        overflow-y: visible;
        padding: 10px 0;
        max-width: 90vw;
        margin: 0;
        padding-left: 0;

        li {
          &:last-child {
            margin-bottom: 0px;
          }
          button {
            background-color: transparent;
            padding: 0;
            display: block;
          }
          svg {
            height: 27px;

            width: auto;
            display: inline-block;
            overflow: visible;
          }
        }
      }

      &.diamondType {
        li {
          margin-bottom: 1rem;
        }
        button {
          border-bottom: 2px solid transparent;
          transition: 0.25s;
          display: flex;
          width: 100%;
          max-width: 170px;
          text-align: left;
          border: 1px solid transparent;
          padding: 0.5rem 0.7rem 0.3rem;

          .diamond-icon {
            flex: 0 0 30px;
            text-align: center;
            margin-right: 10px;
          }

          .diamond-text {
            flex: 0 110px;
          }

          &:hover,
          &.active {
            border-color: var(--color-teal);
          }
        }
      }

      &.styles,
      &.subStyles {
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
        li {
          margin-right: calc(var(--gutter) / 3);
          &:last-child {
            margin-right: 0px;
          }

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
          position: relative;
          margin: 0 auto;

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

      /* &.styles,
      &.subStyles {
        display: none;
      } */

      &.styles,
      &.subStyles {
        ul {
          display: block;

          li {
            display: block;
            margin-bottom: 1rem;

            span {
              font-size: var(--font-size-xxsmall);
            }
          }
        }
      }
      &.priceRange {
        ul {
          display: block;
          margin: 0;
          padding: 10px 0 0 10px;

          li {
            margin-bottom: 1rem;

            &:last-child {
              margin-bottom: 0px;
            }

            .price-text {
              font-size: var(--font-size-xxsmall);
            }
          }
        }
      }
      &.diamondType {
        ul {
          display: block;
          margin: 0;

          span {
            font-size: var(--font-size-xxsmall);
          }
        }
      }
      .filter-slider {
        padding: 10px 0 30px;
      }
    }
  }

  .active-filters {
    padding: 1.2rem 0 0;
    ul {
      flex-wrap: wrap;
    }
    li {
      margin-right: 1rem;
      button {
        background-color: transparent;
        border: none;
        transition: 0.25s;
        font-size: var(--font-size-xxxsmall);

        span {
          color: #777;
          transition: 0.25s;
          margin-right: 0.2rem;
        }

        &.price-filter-tab {
          .close {
            margin-right: 0.3rem;
          }
          .hyphen {
            margin: 0 0.3rem 0 0.3rem;
          }
        }
      }
    }
  }

  .specific-filter-options {
    .filter-option-set {
      padding-right: 5rem;
      @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
        h3,
        .diamond-text {
          display: none;
        }
      }

      &:last-child {
        padding-right: 0;
      }
    }
  }
`;
