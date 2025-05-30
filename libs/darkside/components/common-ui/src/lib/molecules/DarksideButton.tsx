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
    font-size: var(font-size-xsmall);
    transition: 0.25s;
    font-weight: 500;

    a {
      color: inherit;
      font-weight: 500;
    }
  }

  &.disabled {
    button {
      cursor: not-allowed;
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

    &.color-theme--oos {
      button {
        border: 0.1rem solid rgb(216, 214, 209);
        color: rgb(115, 115, 104);
        &:hover {
          color: rgb(115, 115, 104);
        }
      }
    }

    &.color-theme--black {
      button {
        border: 0.1rem solid var(--color-black);
        color: var(--color-black);
        &:hover {
          background-color: var(--color-black);
          color: var(--color-white);
        }
      }
    }

    &.color-theme--white {
      button {
        border: 0.1rem solid var(--color-white);
        color: var(--color-white);
        &:hover {
          background-color: var(--color-white);
          color: var(--color-black);
        }
      }
    }

    &.m-color-theme--white {
      button {
        border: 0.1rem solid var(--color-white);
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
          border: 0.1rem solid var(--color-black);
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

    &.m-color-theme--teal {
      @media (max-width: 767px) {
        button {
          border-bottom: 0.1rem solid var(--color-teal);
          color: var(--color-teal);
          &:hover {
            background-color: var(--color-black);
            color: var(--color-white);
          }
        }
      }
    }

    &.m-color-theme--black {
      @media (max-width: 767px) {
        button {
          border-bottom: 0.1rem solid var(--color-black);
          color: var(--color-black);

          &:hover {
            color: var(--color-black);
          }
        }
      }
    }

    &.m-color-theme--white {
      @media (max-width: 767px) {
        button {
          border-bottom: 0.1rem solid var(--color-white);
          color: var(--color-white);

          &:hover {
            color: var(--color-white);
          }
        }
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

  &.text-size--small {
    button {
      font-size: var(--font-size-xxsmall);
    }
  }

  &.text-size--normal {
    button {
      font-size: var(--font-size-xsmall);
    }
  }

  &.text-size--medium {
    button {
      font-size: var(--font-size-xxsmall);
    }
  }

  &.font-weight--normal {
    button {
      font-weight: var(--font-weight-normal);
    }
  }

  &.font-weight--medium {
    button {
      font-weight: var(--font-weight-medium);
    }
  }

  &.font-weight--bold {
    button {
      font-weight: var(--font-weight-bold);
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
  textSize = 'normal',
  fontWeight = 'medium',
  mobileColorTheme,
  openUrlInNewWindow = false,
  disabled = false,
  style,
}: DarksideButtonProps) => {
  if (!children) {
    return null;
  }

  return (
    <DarksideButtonStyles
      className={clsx(
        className,
        `button-style--${type}`,
        `color-theme--${colorTheme}`,
        `${mobileColorTheme ? `m-color-theme--${mobileColorTheme}` : ''}`,
        `text-size--${textSize}`,
        `font-weight--${fontWeight}`,
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
