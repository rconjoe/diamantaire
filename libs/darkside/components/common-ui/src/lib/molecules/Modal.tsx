import { XIcon } from '@diamantaire/shared/icons';
import { media } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const ModalStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(0 0 0 / 46%);
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  z-index: 10000;
  font-size: 1.6rem;
  padding: 0 2rem;

  @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
    padding: 0;
  }

  &.modal--lg {
    .wrapper {
      max-width: 100vw;
      border-radius: 0;
      ${media.large`max-width: 1080px; border-radius: 1rem;`}
    }
  }

  > .close {
    background-color: transparent;
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    &:focus,
    &:active {
      outline: none;
    }
  }

  .wrapper {
    flex: 1;
    background-color: #fff;
    max-width: 90vw;
    margin: 0 auto;
    position: relative;
    z-index: 100;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow:
      rgba(17, 17, 26, 0.1) 0px 0.4rem 1.6rem,
      rgba(17, 17, 26, 0.05) 0px 0.8rem 3.2rem;

    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2rem;
      padding: 2rem 2rem 0;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        padding: 2rem 4rem 0;
      }

      .modal__title {
        border: 0.2rem solid #ccc;
        flex: 1;
        h4 {
          margin: 0;
          color: #fff;
          font-size: 1.6rem;
        }
      }
    }
    .close {
      &.close--fixed {
        position: absolute;
        right: 0;
        padding: 0.5rem 1rem;
      }
      button {
        background-color: transparent;
        border: none;
        padding: 0;
        position: relative;
        right: -0.4rem;
        svg path {
          stroke: #fff;
        }
      }
    }

    .body {
      padding: 0 2rem 4rem;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        padding: 0 4rem 4rem;
      }
    }
  }
  &.modal--sm {
    .wrapper {
      max-width: 90vw;
      ${media.large`max-width: 1000px;`}
    }
  }
  &.modal--position-bottom-left {
    ${media.medium`
    .wrapper {
      margin-top: auto;
      margin-left: 1rem;
      margin-bottom: 1rem;
      margin-right: 1rem;
    }
    `}
  }
  &.modal--no-title {
    .wrapper {
      .header {
        display: none;
      }
      .body {
        padding: 0;
      }
    }
  }
  .input-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    > * {
      flex: 1 1 100%;
    }
    &:last-child {
      margin-bottom: 0px;
    }
    input {
      flex: 1;
      height: 3.6rem;
      padding-left: 1rem;
    }

    textarea {
      padding: 1.5rem;
      min-height: 15rem;
    }
    .error {
      background-color: red;
      color: #fff;
      font-weight: bold;
      font-size: 1.2rem;
      padding: 0.5rem;
      margin-top: 0.5rem;
      border-radius: 0.5rem;
    }
  }
`;

interface ModalProps extends PropsWithChildren {
  title: string | boolean;
  onClose: () => void;
  onCloseIcon?: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children, className, onCloseIcon }) => {
  const isHeaderDisabled = title === false;

  return (
    <ModalStyles
      className={clsx(className, {
        'modal--no-title': isHeaderDisabled,
      })}
    >
      <button className="close" onClick={onClose}></button>
      <div className="wrapper">
        <div className="inner">
          {isHeaderDisabled ? (
            <div className="close close--fixed">
              <button onClick={onCloseIcon ? onCloseIcon : onClose}>
                <XIcon />
              </button>
            </div>
          ) : (
            <div className="header">
              <div className="title">
                <h4>{title}</h4>
              </div>
              <div className="close">
                <button onClick={onCloseIcon ? onCloseIcon : onClose}>
                  <XIcon />
                </button>
              </div>
            </div>
          )}
          <div className="body">{children}</div>
        </div>
      </div>
    </ModalStyles>
  );
};

export { Modal };
