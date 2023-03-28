import {
  MEDIUM_FONT_WEIGHT,
  setSpace,
  noHoverDevice,
  tabletAndUp,
  MAIN_FONT,
  COPY_SIZE,
  WHITE,
  BLACK,
  TRANSPARENT,
  TEAL,
  TEAL_MED,
  GREY_DARK,
  GREY_MED,
  GREY_LIGHT,
} from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import styled from 'styled-components';

interface Props {
  css: string;
}

const ButtonStyles = styled.button<Props>`
  // BASE STYLES
  background-color: ${TRANSPARENT};
  cursor: pointer;
  letter-spacing: 0px;
  font-family: ${MAIN_FONT};
  font-style: normal;
  border: 0;
  &:focus {
    box-shadow: none;
  }

  color: ${BLACK};

  /* Black text on on white background with white border */
  &.primary {
    font-weight: ${MEDIUM_FONT_WEIGHT};
    font-size: ${COPY_SIZE};
    width: ${setSpace(25)};
    height: ${setSpace(6)};
    border: 2px solid ${BLACK};
    transition: 0.1s linear background-color, 0.1s linear color;

    &:hover {
      background-color: ${BLACK};
      color: ${WHITE};
    }

    &:active {
      background-color: unset;
      color: ${BLACK};
    }

    &.-inverse {
      color: ${WHITE};
      border-color: ${WHITE};

      &:hover {
        background-color: ${WHITE};
        color: ${BLACK};

        &.-hover-font-teal {
          color: ${TEAL};
        }
      }

      &:active {
        background-color: ${TRANSPARENT};
        color: ${WHITE};
        border-color: ${WHITE};
      }
    }

    &.-wide {
      width: 100%;
    }

    &.-mobile-wide {
      width: 100%;

      ${tabletAndUp(`
        width: ${setSpace(25)};
      `)};
    }

    &.-inverse-tabletAndUp {
      ${tabletAndUp(`
        color: ${WHITE};
        border-color: ${WHITE};

        &:hover {
          background-color: ${WHITE};
          color: ${BLACK};

          &.-hover-font-teal {
            color: ${TEAL};
          }
        }

        &:active {
          background-color: ${TRANSPARENT};
          color: ${WHITE};
          border-color: ${WHITE};
        }
      `)};
    }
    &.-width300 {
      width: 100%;
      white-space: nowrap;

      ${tabletAndUp(`width: 350px;`)}
    }
  }

  /* Teal link */
  &.secondary {
    font-weight: ${MEDIUM_FONT_WEIGHT};
    font-size: ${COPY_SIZE};
    border: 0;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: ${setSpace(0.5)};
    padding-top: ${setSpace(0.5)};
    border-bottom: 1px solid ${TEAL};
    color: ${TEAL};
    transition: 0.1s linear border-bottom, 0.1s linear color;

    &:hover {
      border-bottom: 1px solid ${TEAL_MED};
      color: ${TEAL_MED};
    }

    &:active {
      color: ${TEAL};
      border-color: ${TEAL};
    }

    &.-black {
      color: ${BLACK};
      border-bottom: 1px solid ${BLACK};
    }

    &.-white {
      color: ${WHITE};
      border-bottom: 1px solid ${WHITE};
    }
    ${tabletAndUp(`
      &.-tall-block {
        margin-top: 0;
      }
    `)};

    // Note that the secondary / underlined CTA does NOT support the wide style because it looks strange to have a really long underline.
  }

  /* PDPs / BuyFlow */
  &.tertiary {
    font-weight: ${MEDIUM_FONT_WEIGHT};
    font-size: ${COPY_SIZE};
    width: ${setSpace(25)};
    height: ${setSpace(6)};
    color: ${WHITE};
    background-color: ${BLACK};
    border: 2px solid ${BLACK};

    &:active {
      background-color: ${WHITE};
      color: ${BLACK};
    }

    &.-wide {
      width: 100%;
    }

    &.-mobile-wide {
      width: 100%;

      ${tabletAndUp(`
        width: ${setSpace(25)};
      `)};
    }
  }

  /**
 * Make sure inactive is at the bottom of these styles so it overwrites above!
 */
  &.inactive {
    border: 1px solid ${GREY_MED};
    background: ${WHITE};
    color: ${GREY_DARK};
    cursor: not-allowed;

    &:hover {
      color: ${GREY_DARK};
      ${noHoverDevice()};
    }
  }

  /**
 * Extra disabled styles for disabling button links in _links.scss under
 * as this <Button> component is usually wrapped by a <Link><a /><Link>
 */
  &.disabled {
    background: ${GREY_LIGHT};
    cursor: not-allowed;
    border: unset;
  }

  &:disabled {
    background: ${GREY_LIGHT};
    cursor: not-allowed;
    border: unset;

    &:hover {
      background: ${GREY_LIGHT};
      color: ${GREY_DARK};
      ${noHoverDevice()};
    }
  }

  ${(props) => props.css};
`;

const Button = (props) => {
  return (
    <ButtonStyles {...props} className={clsx(props.className)}>
      {props.children}
    </ButtonStyles>
  );
};

export { Button };
