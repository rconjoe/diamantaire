import styled from 'styled-components';

export const StackedHeaderStylesContainer = styled.div`
  display: none;
  z-index: 4000;
  position: relative;
  left: 0;
  width: 100%;
  background-color: #fff;

  @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
    display: block;
  }

  .language-selector-sub,
  .language-selector {
    text-transform: capitalize;
  }

  .stacked-header__container {
    padding: 2.4rem 0 1.4rem;
  }

  .stacked-header__top-level {
    color: text;
    margin: 0 auto;
    padding: 0 0 1.4rem;
    display: flex;
    align-items: center;
    max-width: 90vw;

    > * {
      flex: 0 0 33.33%;
    }

    .nav__logo {
      max-width: 9.5rem;
      margin: 0 auto;

      svg {
        width: 100%;
        height: auto;
      }
    }

    .nav__col--center {
      flex: 0 0 20%;
    }

    .nav__col--left {
      flex: 0 0 40%;

      .country-locale-selector {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: baseline;

        > li {
          font-size: 1.4rem;
          display: inline-block;
          margin-right: 2rem;
          position: relative;

          &.divider {
            margin: 0 1rem;
          }

          button {
            background-color: transparent;
            border: none;
            padding: 0;
            line-height: 1;
          }

          .language-icon {
            display: inline-block;
            transform: rotate(180deg);
            padding: 0 0.7rem;

            &.active {
              transform: translateY(0.1rem) rotate(0deg);
            }
          }

          &.country-selector {
            /* flex: 0 0 10rem; */
            button {
              display: flex;
              align-items: baseline;
              width: 100%;
              margin-right: 1rem;

              svg {
                flex: 0 0 3rem;
                position: relative;
                top: 0.6rem;
              }

              span {
                flex: 1;
                white-space: nowrap;
                font-size: 1.4rem;
                color: var(--color-black);
              }
            }
          }

          &.country-selector__chat {
            svg {
              width: 1.7rem;
              position: relative;
              top: 0.3rem;
            }

            &.with-lang {
              margin-left: 2rem;
            }
          }

          &.calendar {
            display: flex;
            top: 0.3rem;
            .calendar__link {
              display: flex;
              align-items: center;
            }
            svg {
              height: 1.8rem;
              position: relative;
              top: 0.1rem;
            }
          }

          &.language {
            min-width: 8rem;
            margin-right: 0;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    .nav__col--right {
      flex: 0 0 40%;

      ul {
        justify-content: flex-end;

        .cart svg {
          height: 2.1rem;
        }

        .wishlist svg {
          transform: scale(0.8) translate(0, 0.1rem);
        }

        .accounts svg {
          transform: translate(0, 0.1rem);
        }
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
      margin: 0 1.5rem;
      font-family: var(--font-family-main);

      a {
        font-family: var(--font-family-main);
        letter-spacing: 0.1rem;
        font-size: 1.4rem;
        text-decoration: none;
        position: relative;
        transition: 0.25s;

        &::before {
          content: '';
          background: var(--color-teal);
          display: block;
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          height: 0.2rem;
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
