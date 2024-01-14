import styled from 'styled-components';

export const PlpProductFilterStyles = styled.div`
  background-color: var(--color-white);
  padding: 1rem 0;
  width: 100%;

  .filter__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
    padding: 0;

    .flex-row {
      max-width: 100%;
    }
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
      top: 0.1rem;
      position: relative;
      margin-right: 0.5rem;

      button {
        padding: 0;
        border: none;
        background-color: transparent;
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
        min-width: 60px;

        &.active {
          font-weight: bold;
        }
      }
    }

    .filter__options {
      li {
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
          padding: 0;
          border: none;
          background-color: transparent;
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
    padding: 1rem 0.4rem 0;
    overflow-x: auto;
    max-width: 100%;

    ul {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      padding: 1rem 0;
      width: 100%;
      margin: 0 auto;
      gap: 1rem 0;
      overflow-x: auto;

      ::-webkit-scrollbar {
        opacity: 0;
        height: 0;
      }

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
      @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
        width: 100%;
      }

      button {
        border-bottom: 0.2rem solid transparent;

        &:hover,
        &.active {
          border-color: var(--color-teal);
        }
      }
    }

    &.styles {
      button {
        border-bottom: 0.2rem solid transparent;

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
        margin: 0;
      }

      button {
        background-color: transparent;
        width: 100%;

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
        width: 3rem;
        height: 3rem;
        display: inline-block;
        flex: 0 0 3rem;
        border: 0.1rem solid transparent;
        border-radius: 50%;
        margin-right: 1rem;
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
          background-color: var(--metal-yellow-gold);
        }

        &.white-gold {
          background: linear-gradient(305deg, rgb(254, 254, 254), rgb(206, 206, 206), transparent);
        }

        &.rose-gold {
          background-color: var(--metal-rose-gold);
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
      border-top: 1px solid #eaeaea;
      padding: 20px 0;

      &:first-child {
        border-top: 0;
        padding-top: 0;
      }

      &:last-child {
        border-bottom: none;
      }

      ul {
        display: flex;
        flex-direction: column;
        padding: 1rem 0;
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
          margin-bottom: 0.25rem;
        }

        button {
          border-bottom: 2px solid transparent;
          display: flex;
          width: 100%;
          max-width: 170px;
          text-align: left;
          border: 1px solid transparent;
          padding: 0.5rem 0.7rem 0rem;

          .diamond-icon {
            flex: 0 0 30px;
            text-align: center;
            margin-right: 10px;
          }

          .diamond-text {
            flex: 0 110px;
          }

          &.active {
            border-color: var(--color-teal);
          }
        }
      }

      &.styles,
      &.subStyles {
        button {
          border-bottom: 2px solid transparent;

          &.active {
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
        ul {
          padding-left: 1rem;
        }

        li {
          margin-right: calc(var(--gutter) / 3);

          &:last-child {
            margin-right: 0px;
          }

          button {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            background-color: transparent;

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

          &.yellow-gold {
            background-color: var(--metal-yellow-gold);
          }

          &.white-gold {
            background: linear-gradient(305deg, rgb(254, 254, 254), rgb(206, 206, 206), transparent);
          }

          &.rose-gold {
            background-color: var(--metal-rose-gold);
          }

          &.sterling-silver {
            background: linear-gradient(138deg, #d2d2d0 0%, #f7f7f7 50%, #c9cac8 100%);
          }

          &.platinum {
            background-color: var(--metal-platinum);
          }
        }
      }

      &.styles,
      &.subStyles {
        ul {
          display: block;

          li {
            display: block;
            margin-bottom: 0.5rem;

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
          padding: 1rem 0 0 1rem;

          li {
            margin-bottom: 0.5rem;

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
    ul {
      padding: 1.2rem 0 0;
      flex-wrap: wrap;

      &:empty {
        display: none;
      }
    }

    li {
      margin-right: 1rem;

      button {
        font-size: var(--font-size-xxxsmall);
        background-color: transparent;
        color: var(--color-black);
        border: none;

        &:hover {
          color: var(--color-teal);
        }

        .close {
          font-size: var(--font-size-small);
          color: var(--color-grey);
          margin-right: 1rem;
          transition: 0.25s;
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
      @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
        padding-right: 5rem;
      }

      h3,
      .diamond-text {
        @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
          display: none;
        }
      }

      &:last-child {
        padding-right: 0;
      }
    }
  }
`;
