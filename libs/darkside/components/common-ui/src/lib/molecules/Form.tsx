/*
 
This is the master form component, we should never need to manually create a customer facing form that doesn't use this

It requires 2 things

1. Give it state, or use the default state of just email
2. Provide onSubmit function

*/

import React from 'react';
import styled from 'styled-components';

import { Button } from './Button';

type FormProps = {
  onSubmit: (e: React.SyntheticEvent) => void;
  title?: string;
  caption?: string;
};

const FormContainer = styled.div`
  p {
    margin-top: calc(var(--gutter) / 20);
  }
  form {
    display: flex;
    align-items: flex-end;
    margin-top: calc(var(--gutter) / 5);
    .input-container {
      display: flex;
      flex-wrap: wrap;
      flex: 1;

      &.submit {
        flex: 0 0 100px;
        button {
          font-size: 1.4rem;
          width: auto;
          height: 46px;
        }
      }

      > * {
        flex: 1 1 100%;
      }

      label {
        font-weight: bold;
      }

      input {
        border: 1px solid #ccc;
        height: 4.6rem;
        padding-left: 10px;
      }
    }
  }
`;

const Form = ({ onSubmit, title, caption }: FormProps) => {
  return (
    <FormContainer>
      {title && <h4>{title}</h4>}
      {caption && <p className="small">{caption}</p>}
      <form onSubmit={onSubmit}>
        <div className="input-container">
          <input type="text" name="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="input-container submit">
          <Button className="tertiary">Submit</Button>
        </div>
      </form>
    </FormContainer>
  );
};

export { Form };
