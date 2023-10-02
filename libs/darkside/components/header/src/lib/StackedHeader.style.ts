import { BP_LG, MAIN_FONT } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const StackedHeaderStylesContainer = styled.div`
  display: none;
  z-index: 6000;
  position: relative;
  left: 0;
  width: 100%;
  background-color: #fff;

  @media (min-width: ${BP_LG}) {
    display: block;
  }

  .language-selector-sub,
  .language-selector {
    text-transform: capitalize;
  }

  .stacked-header__container {
    padding: 2.4rem 0;
  }

  .stacked-header__top-level {
    color: text;
    margin: 0 auto;
    padding: 0 0 2.4rem;
    display: flex;
    align-items: center;
    max-width: 90vw;

    > * {
      flex: 0 0 33.33%;
    }

    .nav__logo {
      max-width: 95px;
      margin: 0 auto;

      svg {
        width: 100%;
        height: auto;
      }
    }

    .nav__col--left .country-locale-selector {
      margin: 0;
      padding: 0;
      display: flex;
      list-style: none;
      align-items: center;
      gap: 1rem;

      > li {
        display: flex;
        font-size: 1.3rem;
        margin-right: 0px;
        position: relative;

        button {
          background-color: transparent;
          line-height: 1;
          border: none;
          padding: 0;
        }

        .language-icon {
          display: inline-block;
          transform: translateY(-2px) rotate(180deg);
          padding: 0 0.7rem;

          &.active {
            transform: translateY(1px) rotate(0deg);
          }
        }

        .country-selector {
          display: flex;
          align-items: center;

          svg {
            display: block;
            position: relative;
            height: 18px;
          }

          span {
            flex: 1;
            white-space: nowrap;
          }
        }

        &.calendar {
          svg {
            height: 18px;
          }
        }

        &.language {
          min-width: 80px;
          margin-right: 0;
        }

        &:last-child {
          margin-left: 0;
          margin-right: 0;
        }
      }
    }

    .nav__col--right ul {
      justify-content: flex-end;

      .cart svg {
        height: 21px;
      }

      .wishlist svg {
        transform: translate(0, 1px);
      }

      .accounts svg {
        transform: translate(0, 1px);
      }
    }
  }

  .stacked-bottom-level ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: center;
    text-align: center;

    li {
      margin: 0 15px;
      font-family: ${MAIN_FONT};

      a {
        font-family: ${MAIN_FONT};
        letter-spacing: 0.3px;
        font-size: 1.4rem;
        text-decoration: none;
        position: relative;
        transition: 0.25s;

        &::before {
          content: '';
          background: var(--color-teal);
          display: block;
          position: absolute;
          bottom: -5px;
          left: 0;
          height: 2px;
          transition: 0.25s;
          width: 0%;
        }

        &:hover,
        &.active {
          color: #000;

          &::before {
            width: 100%;
          }
        }
      }
    }
  }

  .stacked-header__desktop-nav {
    text-transform: uppercase;
  }
`;
