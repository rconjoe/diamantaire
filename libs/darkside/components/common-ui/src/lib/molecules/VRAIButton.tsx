import {
  setSpace,
  noHoverDevice,
  tabletAndUp,
  MAIN_FONT,
  WHITE,
  BLACK,
  TRANSPARENT,
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

  color: var(--color-black);

  &.primary {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-copy);
    width: 100%;
    max-width: 350px;
    height: ${setSpace(6)};
    border: 2px solid var(--color-black);
    transition: 0.1s linear background-color, 0.1s linear color;
    background-color: var(--color-black);
    color: var(--color-white);

    &:hover {
      background-color: transparent;
      color: var(--color-black);
    }

    &:active {
      background-color: unset;
      color: var(--color-black);
    }

    &.-inverse {
      color: var(--color-black);
      border-color: var(--color-black);
      background-color: var(--color-white);

      &:hover {
        background-color: var(--color-black);
        color: var(--color-white);

        &.-hover-font-teal {
          color: var(--color-teal);
        }
      }

      &:active {
        background-color: ${TRANSPARENT};
        color: ${WHITE};
        border-color: ${WHITE};
      }

      &.-color-theme-teal {
        background-color: transparent;
        border-color: var(--color-teal);
        color: var(--color-teal);

        &:hover {
          background-color: var(--color-white);
          color: var(--color-teal);
        }
      }
    }

    &.-color-theme-teal {
      background-color: var(--color-teal);
      border-color: var(--color-teal);
      color: var(--color-white);

      &:hover {
        background-color: var(--color-white);
        color: var(--color-teal);
      }
    }

    &.-color-theme-white {
      background-color: var(--color-white);
      border-color: var(--color-white);
      color: var(--color-white);

      &:hover {
        background-color: var(--color-white);
        color: var(--color-black);
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
              color: var(--color-teal);
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
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-copy);
    border: 0;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: ${setSpace(0.5)};
    padding-top: ${setSpace(0.5)};
    border-bottom: 1px solid var(--color-black);
    color: var(--color-black);
    transition: 0.25s;

    &:hover {
      border-bottom: 1px solid var(--color-black);
      color: var(--color-black);
      opacity: 0.5;
    }

    &:active {
      color: var(--color-teal);
      border-color: var(--color-teal);
    }

    &.-black {
      color: ${BLACK};
      border-bottom: 1px solid ${BLACK};
    }

    &.-white {
      color: ${WHITE};
      border-bottom: 1px solid ${WHITE};
    }
    &.-color-theme-teal {
      color: var(--color-teal);
      border-bottom: 1px solid var(--color-teal);
    }
    &.-color-theme-white {
      color: var(--color-white);
      border-bottom: 1px solid var(--color-white);
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
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-copy);
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

type ButtonProps = {
  children: React.ReactNode;
  type?: 'solid' | 'underline';
  inverse?: boolean;
  colorTheme?: 'black' | 'teal' | 'white';
  isLink?: boolean;
  className?: string;
};

const VRAIButton = ({ className, children, type = 'solid', inverse, colorTheme }: ButtonProps) => {
  return (
    <ButtonStyles
      className={clsx(className, {
        primary: type === 'solid',
        secondary: type === 'underline',
        '-inverse': inverse,
        '-color-theme-teal': colorTheme === 'teal',
        '-color-theme-white': colorTheme === 'white',
      })}
    >
      {children}
    </ButtonStyles>
  );
};

export { VRAIButton };
