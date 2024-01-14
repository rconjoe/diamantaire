import { DarksideButtonProps } from '@diamantaire/shared/types';
import clsx from 'clsx';
import Link from 'next/link';
import styled from 'styled-components';

const DarksideButtonStyles = styled.div`
  width: 100%;
  button {
    text-align: center;
    width: 100%;
    padding: 1rem 2rem;
    font-size: 1.8rem;
    transition: 0.25s;
    font-weight: 500;

    a {
      color: inherit;
      font-weight: 500;
    }
  }

  &.disabled {
    button {
      opacity: 0.4;

      &:hover {
        cursor: not-allowed;
      }
    }
  }
  &.button-style--solid {
    button {
      background-color: var(--color-black);
      color: var(--color-white);
      border: 0.2rem solid var(--color-black);

      &:hover {
        background-color: var(--color-white);
        color: var(--color-black);
        border-color: var(--color-black);
      }
    }
    &.color-theme--white {
      button {
        border: 0.2rem solid var(--color-white);
        color: var(--color-black);
        background-color: var(--color-white);
        &:hover {
          background-color: var(--color-black);
          color: var(--color-white);
          border-color: var(--color-black);
        }
      }
    }
    &.color-theme--teal {
      button {
        border: 0.2rem solid var(--color-teal);
        color: var(--color-white);
        background-color: var(--color-teal);
        &:hover {
          background-color: var(--color-white);
          color: var(--color-teal);
          border-color: var(--color-teal);
        }
      }
    }
    &.color-theme--grey {
      button {
        border: 0.2rem solid var(--color-lightest-grey);
        color: var(--color-black);
        background-color: var(--color-lightest-grey);
        font-size: 1.3rem;
        font-weight: 400;
        min-height: 4.7rem;
        &:hover {
          background-color: var(--color-lightest-grey);
          color: var(--color-grey);
          border-color: var(--color-lightest-grey);
        }
      }
    }
  }

  &.button-style--outline {
    button {
      background-color: transparent;
    }
    &.color-theme--black {
      button {
        border: 0.2rem solid var(--color-black);
        color: var(--color-black);
        &:hover {
          background-color: var(--color-black);
          color: var(--color-white);
        }
      }
    }
    &.color-theme--white {
      button {
        border: 0.1rem solid var(--color-black);
        color: var(--color-black);
        &:hover {
          background-color: var(--color-white);
          color: var(--color-black);
        }
      }
    }
    &.m-color-theme--white {
      button {
        border: 0.2rem solid var(--color-white);
        color: var(--color-white);
        &:hover {
          background-color: var(--color-white);
          color: var(--color-black);
        }
      }
    }
    &.m-color-theme--black {
      @media (max-width: 767px) {
        button {
          border: 0.2rem solid var(--color-black);
          color: var(--color-black);
          &:hover {
            background-color: var(--color-black);
            color: var(--color-white);
          }
        }
      }
    }
  }

  &.button-style--underline {
    width: auto;
    button {
      width: auto;
      padding: 0;
      border-bottom: 0.1rem solid var(--color-black);
      background-color: transparent;
      display: inline-block;
      color: var(--color-black);
      &:hover {
        opacity: 0.7;
      }
    }

    &.color-theme--teal {
      button {
        color: var(--color-teal);
        border-bottom: 0.1rem solid var(--color-teal);
      }
    }
    &.color-theme--white {
      button {
        color: var(--color-white);
        border-bottom: 0.1rem solid var(--color-white);
      }
    }
  }
  &.button-style--text-underline {
    width: auto;
    button {
      width: auto;
      padding: 0;
      text-decoration: underline;
      background-color: transparent;
      display: inline-block;
      color: var(--color-black);
      &:hover {
        opacity: 0.7;
      }
    }

    &.color-theme--teal {
      button {
        color: var(--color-teal);
      }
    }
    &.color-theme--white {
      button {
        color: var(--color-white);
      }
    }
  }
`;

const DarksideButton = ({
  href,
  children,
  className,
  onClick,
  buttonType = 'button',
  type = 'solid',
  colorTheme = 'black',
  mobileColorTheme,
  openUrlInNewWindow = false,
  disabled = false,
  style,
}: DarksideButtonProps) => {
  return (
    <DarksideButtonStyles
      className={clsx(
        className,
        `button-style--${type}`,
        `color-theme--${colorTheme}`,
        `${mobileColorTheme ? `m-color-theme--${mobileColorTheme}` : ''}`,
      )}
    >
      {href && openUrlInNewWindow ? (
        <a href={href} target="_blank" style={style}>
          <button>{children}</button>
        </a>
      ) : href ? (
        <Link href={href} style={style}>
          <button>{children}</button>
        </Link>
      ) : (
        <button style={style} disabled={disabled} type={buttonType} onClick={onClick}>
          {children}
        </button>
      )}
    </DarksideButtonStyles>
  );
};

export { DarksideButton };
