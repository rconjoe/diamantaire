import { XIcon } from '@diamantaire/shared/icons';
import { media } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const FreezeBody = createGlobalStyle`
    body, html {
      overflow: hidden;
    }

`;

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

  &.modal--lg {
    .wrapper {
      max-width: 100vw;
      border-radius: 0;
      ${media.large`max-width: 1080px; border-radius: 10px;`}
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
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;

    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      padding: 20px 40px 0;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;

      .modal__title {
        border: 2px solid #ccc;
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
        padding: 5px 10px;
      }
      button {
        background-color: transparent;
        border: none;
        padding: 0;
        position: relative;
        right: -4px;
        svg path {
          stroke: #fff;
        }
      }
    }

    .body {
      padding: 0 40px 40px;
    }
  }
  &.modal--sm {
    .wrapper {
      max-width: 90vw;
      ${media.large`max-width: 1000px;`}
    }
  }
  &.modal--position-bottom-left {
    .wrapper {
      margin-top: auto;
      margin-left: 10px;
      margin-bottom: 10px;
      margin-right: 10px;
    }
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
    margin-bottom: 10px;
    > * {
      flex: 1 1 100%;
    }
    &:last-child {
      margin-bottom: 0px;
    }
    input {
      flex: 1;
      height: 36px;
      padding-left: 10px;
    }

    textarea {
      padding: 15px;
      min-height: 150px;
    }
    .error {
      background-color: red;
      color: #fff;
      font-weight: bold;
      font-size: 1.2rem;
      padding: 5px;
      margin-top: 5px;
      border-radius: 5px;
    }
  }
`;

interface ModalProps extends PropsWithChildren {
  title: string | boolean;
  onClose: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children, className }) => {
  const isHeaderDisabled = title === false;

  return (
    <ModalStyles
      className={clsx(className, {
        'modal--no-title': isHeaderDisabled,
      })}
    >
      <FreezeBody />
      <button className="close" onClick={onClose}></button>
      <div className="wrapper">
        <div className="inner">
          {isHeaderDisabled ? (
            <div className="close close--fixed">
              <button onClick={onClose}>
                <XIcon />
              </button>
            </div>
          ) : (
            <div className="header">
              <div className="title">
                <h4>{title}</h4>
              </div>
              <div className="close">
                <button onClick={onClose}>
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
