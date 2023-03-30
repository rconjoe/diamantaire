import { TEAL, MAIN_FONT } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

interface Props {
  $headerHeight: number;
}

export const MegaMenuStylesContainer = styled.div<Props>`
  border-bottom: 1px solid #000;
  padding-bottom: 2.4rem;
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
    max-width: 1440px;
  }

  .menu-container {
    justify-content: center;
    margin: 0 -40px;
    padding-top: 20px;

    &.VRAIcreatedDiamond,
    &.Gifts,
    &.about {
      max-width: 1000px;
      margin: 0 auto;
    }

    .menu-container__col {
      flex: 1;
      padding: 0 40px;
      .col__inner {
        display: inline-block;
        h4 {
          font-size: 1.4rem;
          line-height: 2rem;
          margin: 0 0 10px;
          text-transform: uppercase;
        }
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: inline-block;
          li {
            margin-bottom: 10px;

            &:last-child {
              margin-bottom: 0px;
            }
            a {
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
                &::before {
                  content: '';
                  background: ${TEAL};
                  display: block;
                  position: absolute;
                  bottom: -5px;
                  left: 0;
                  height: 2px;
                  transition: 0.25s;
                  width: 0%;
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
                top: 2px;
                margin-right: 5px;

                &.diamond {
                  flex: 0 0 30px;
                  svg {
                    max-width: 28px;
                    height: 28px;
                  }
                }
                &.ring-style {
                  flex: 0 0 60px;
                  top: 4px;
                  svg {
                    max-width: 60px;
                    height: 28px;
                  }
                }
              }
            }
          }

          &.grandchildren-links {
            padding: 15px 0px 5px 1.6rem;
          }
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
