import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(0 0 0 / 70%);
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

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

    position: relative;
    z-index: 100;
    border-radius: 10px;
    box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);

    .header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      padding: 20px 40px;
      background-color: #000;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border: 2px solid #fff;

      .modal__title {
        flex: 1;
        h4 {
          margin: 0;
          color: #fff;
        }
      }
      .close {
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
    }

    .body {
      padding: 0 40px 40px;
    }
  }
  &.sm-modal {
    .wrapper {
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
  title: string;
  onClose: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children, className }) => {
  return (
    <ModalContainer className={className}>
      <button className="close" onClick={onClose}></button>
      <div className="wrapper">
        <div className="inner">
          <div className="header">
            <div className="title">
              <h4>{title}</h4>
            </div>
            <div className="close">
              <button onClick={onClose}>X</button>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </ModalContainer>
  );
};

export { Modal };
