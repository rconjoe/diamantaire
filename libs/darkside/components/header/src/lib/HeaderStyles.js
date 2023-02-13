import { BP_LG, teal } from 'helpers/constants';
import React from 'react';
import styled from 'styled-components';
import { MAIN_FONT } from 'styles/globalStyles';

const StackedHeaderStylesContainer = styled.header`
  display: none;

  @media (min-width: ${BP_LG}) {
    display: block;
  }
  .stacked-header__container {
    padding: 2.4rem 0;
  }

  .stacked-header__top-level {
    max-width: 90vw;
    color: text;
    margin: 0 auto;
    padding: 0 0 2.4rem;
    display: flex;
    align-items: center;

    > * {
      flex: 0 0 33.33%;
    }

    .nav__logo {
      max-width: 95px;
      margin: 0 auto;
    }

    .nav__col--left ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        margin-right: 20px;
        font-size: 1.3rem;
      }
    }

    .nav__col--right ul {
      justify-content: flex-end;
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
          background: ${teal};
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
`;

const StackedHeaderStyles = ({ children }) => {
  return <StackedHeaderStylesContainer>{children}</StackedHeaderStylesContainer>;
};

export { StackedHeaderStyles };
