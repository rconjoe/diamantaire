import clsx from 'clsx';
import Link from 'next/link';
import styled from 'styled-components';

export type DatoDarksideButtonProps = {
  id: string;
  ctaCopy: string;
  ctaLinkUrl: string;
  ctaButtonType: 'solid' | 'outline' | 'underline';
  ctaButtonColorTheme: 'black' | 'teal' | 'white';
  ctaButtonMobileColorTheme: 'black' | 'teal' | 'white';
  openUrlInNewWindow: boolean;
};

export type DarksideButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  buttonType?: 'button' | 'submit' | 'reset';
  type?: 'solid' | 'outline' | 'underline';
  colorTheme?: 'black' | 'teal' | 'white';
  mobileColorTheme?: 'desktop' | 'black' | 'teal' | 'white';
  openUrlInNewWindow?: boolean;
};

const DarksideButtonStyles = styled.div`
  width: 100%;
  button {
    text-align: center;
    width: 100%;
    padding: 10px 20px;
    font-size: 1.8rem;
    transition: 0.25s;
    font-weight: 500;
  }
  &.button-style--solid {
    button {
      background-color: var(--color-black);
      color: var(--color-white);
      border: 2px solid var(--color-black);

      &:hover {
        background-color: var(--color-white);
        color: var(--color-black);
        border-color: var(--color-black);
      }
    }
    &.color-theme--white {
      button {
        border: 2px solid var(--color-white);
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
        border: 2px solid var(--color-teal);
        color: var(--color-white);
        background-color: var(--color-teal);
        &:hover {
          background-color: var(--color-white);
          color: var(--color-teal);
          border-color: var(--color-teal);
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
        border: 2px solid var(--color-black);
        color: var(--color-black);
        &:hover {
          background-color: var(--color-black);
          color: var(--color-white);
        }
      }
    }
    &.color-theme--white {
      button {
        border: 2px solid var(--color-white);
        color: var(--color-white);
        &:hover {
          background-color: var(--color-white);
          color: var(--color-black);
        }
      }
    }
    &.m-color-theme--white {
      button {
        border: 2px solid var(--color-white);
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
          border: 2px solid var(--color-black);
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
      border-bottom: 1px solid var(--color-black);
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
        border-bottom: 1px solid var(--color-teal);
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
        <a href={href} target="_blank">
          <button>{children}</button>
        </a>
      ) : href ? (
        <Link href={href}>
          <button>{children}</button>
        </Link>
      ) : (
        <button type={buttonType} onClick={onClick}>
          {children}
        </button>
      )}
    </DarksideButtonStyles>
  );
};

export { DarksideButton };
