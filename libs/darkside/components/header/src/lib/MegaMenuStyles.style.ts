import styled from 'styled-components';

interface Props {
  $headerHeight: number;
}

export const MegaMenuStylesContainer = styled.div<Props>`
  border-bottom: 0.1rem solid #000;
  padding-bottom: 0;
  position: fixed;
  top: ${({ $headerHeight }) => $headerHeight + 'px'};
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 5000;
  transition: 0.25s;

  &.hide {
    display: none;
  }

  .mega-menu__wrapper {
    margin: 0 auto;
  }

  .menu-container {
    justify-content: start;
    margin: 0 -4rem;
    flex-wrap: wrap;

    @media (min-width: ${({ theme }) => theme.sizes.xl}) {
      flex-wrap: nowrap;
      justify-content: center;
    }

    &.VRAIcreatedDiamond,
    &.Gifts,
    &.test4 {
      max-width: 100rem;
      margin: 0 auto;
    }

    &.four-col {
      .menu-container__col {
        padding: 0 3rem;
      }
    }

    .menu-container__col {
      padding: 0 6rem;
      flex: 0 0 50%;
      margin-bottom: 4rem;
      @media (min-width: ${({ theme }) => theme.sizes.xl}) {
        flex: 1;
      }

      &.byRecipient {
        .col__inner {
          min-width: 13rem;
        }
      }

      .col__inner {
        display: inline-block;

        h4 {
          font-size: 1.4rem;
          line-height: 2rem;
          margin: 0 0 1rem;
          text-transform: uppercase;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: inline-block;

          li {
            display: block;
            margin: 0 0 0.5rem;

            &:last-child {
              margin: 0;
            }

            a,
            span {
              font-size: 1.7rem;
              font-family: var(--font-family-main);
              text-decoration: none;
              position: relative;
              transition: 0.25s;
              display: flex;

              &.has-icon {
                display: flex;
                align-items: center;
              }

              span.link-text {
                white-space: nowrap;

                &::before {
                  content: '';
                  background: var(--color-teal);
                  display: block;
                  position: absolute;
                  bottom: -0.2rem;
                  left: 0;
                  height: 0.2rem;
                  transition: 0.25s;
                  width: 0%;
                }

                strong {
                  font-weight: var(--font-weight-bold);
                }
              }

              &:hover,
              &.active {
                .link-text {
                  color: #000;

                  &::before {
                    width: 100%;
                  }
                }
              }

              span {
                position: relative;
                margin-right: 0.5rem;
                top: 0.2rem;

                &.diamond {
                  flex: 0 0 3rem;
                  display: flex;
                  justify-content: center;

                  svg {
                    height: auto;
                    width: 100%;
                    max-height: 2.8rem;
                  }
                }

                &.ring-style {
                  flex: 0 0 6rem;
                  top: 0.4rem;

                  svg {
                    height: auto;
                    width: 100%;
                    max-height: 2.8rem;
                  }
                }
              }
            }
          }

          &.grandchildren-links {
            padding: 1rem 0 0.5rem 1.6rem;
          }
        }
      }
      &.shop_by_shape {
        ul li {
          margin: 0 0 0.8rem;
        }

        li:last-child {
          margin-top: 1.5rem !important;
        }
      }
    }
  }
`;
