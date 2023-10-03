import { MAIN_FONT } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

interface Props {
  $headerHeight: number;
}

export const MegaMenuStylesContainer = styled.div<Props>`
  border-bottom: 1px solid #000;
  padding-bottom: 4rem;
  position: ${({ $isFixed }) => ($isFixed ? 'fixed' : 'absolute')};
  top: ${({ $headerHeight }) => $headerHeight + 'px'};
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 5000;

  &.hide {
    display: none;
  }

  .mega-menu__wrapper {
    margin: 0 auto;
  }

  .menu-container {
    justify-content: center;
    margin: 0 -4rem;
    padding-top: 2rem;

    &.VRAIcreatedDiamond,
    &.Gifts,
    &.about {
      max-width: 100rem;
      margin: 0 auto;
    }

    .menu-container__col {
      padding: 0 6rem;

      &.byRecipient {
        .col__inner {
          min-width: 130px;
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
              font-size: 1.5rem;
              font-family: ${MAIN_FONT};
              letter-spacing: 0.3px;
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
                    max-width: 2.8rem;
                    height: 2.8rem;
                  }
                }

                &.ring-style {
                  flex: 0 0 6rem;
                  top: 4px;

                  svg {
                    max-width: 6rem;
                    height: 2.8rem;
                  }
                }
              }
            }
          }

          &.grandchildren-links {
            padding: 1.5rem 0 0.5rem 1.6rem;
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
      &.wedding {
        .col__inner ul li:last-child {
          font-weight: bold;
        }
      }
    }
  }
`;
