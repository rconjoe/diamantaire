/*

This is the master form component, we should never need to manually create a customer facing form that doesn't use this

*/

import { allCountries, fiftyStates } from '@diamantaire/shared/constants';
import dynamic from 'next/dynamic';
import React, {
  useEffect,
  // useState
} from 'react';
import styled from 'styled-components';

import { DarksideButton } from './DarksideButton';
import { Heading } from './Heading';

const Select = dynamic(() => import('react-select'));

type FormProps = {
  onSubmit: (e: React.SyntheticEvent, formState: object) => void;
  caption?: string;
  id?: string;
  title?: string;
  schema?: FormSchemaType[];
  formGridStyle?: 'single' | 'split';
  stackedSubmit?: boolean;
  formState?: object;
  setFormState?: (state: object) => void;
};

export type FormSchemaType = {
  name: string;
  placeholder: string;
  inputType?: 'text' | 'textarea' | 'phone' | 'number' | 'country-dropdown' | 'state-dropdown' | 'email' | 'password';
  defaultValue?: string;
  required: boolean;
};

const FormContainer = styled.div<{ gridStyle?: string; stackedSubmit?: boolean; fieldsLength: number }>`
  p {
    margin-top: calc(var(--gutter) / 20);
    font-size: var(--font-size-xxsmall);
  }
  form {
    display: flex;
    /* flex-wrap: wrap; */
    align-items: flex-end;
    margin-top: calc(var(--gutter) / 5);
    .input-container {
      display: flex;
      flex-wrap: ${({ stackedSubmit }) => (stackedSubmit ? 'wrap' : 'nowrap')};
      flex: ${({ gridStyle, stackedSubmit }) => (gridStyle === 'single' && stackedSubmit ? '0 0 100%' : '1')};
      margin-bottom: ${({ fieldsLength, stackedSubmit }) =>
        !stackedSubmit && fieldsLength === 1 ? 0 : ` calc(var(--gutter) / 3);`};

      &.submit {
        margin-bottom: 0px;
        flex: ${({ stackedSubmit }) => (stackedSubmit ? '0 0 140px' : '0 0 140px')};
      }

      > * {
        flex: 1 1 100%;
      }

      label {
        font-weight: bold;
      }

      input {
        border: 1px solid #ccc;
        height: 4.7rem;
        padding-left: 10px;
        font-size: var(--font-size-xxxsmall);
      }

      .dropdown__single-value {
        font-size: var(--font-size-xxxsmall);
        color: #000;
      }

      .dropdown__option {
        font-size: var(--font-size-xxxsmall);
        color: #000;
      }
    }
  }
`;

const Form = ({
  onSubmit,
  title,
  caption,
  schema,
  id,
  formGridStyle = 'single',
  stackedSubmit = true,
  formState,
  setFormState = (e) => console.log('initial', e),
}: FormProps) => {
  // const [formState, setFormState] = useState(null);

  useEffect(() => {
    const initialFormState = {};

    schema?.map((field) => {
      if (field.inputType === 'state-dropdown') {
        return (initialFormState[field.name] = fiftyStates.filter((state) => state.value === field.defaultValue)[0]);
      } else if (field.inputType === 'country-dropdown') {
        return (initialFormState[field.name] = allCountries.filter((state) => state.label === field.defaultValue)[0]);
      } else {
        return (initialFormState[field.name] = field.defaultValue);
      }
    });

    // console.log(initialFormState);

    return setFormState(initialFormState);
  }, [schema]);

  return (
    <FormContainer gridStyle={formGridStyle} stackedSubmit={stackedSubmit} fieldsLength={schema?.length | 1}>
      {title && (
        <Heading type="h4" className="primary">
          {title}
        </Heading>
      )}
      {caption && <p className="small">{caption}</p>}
      <form onSubmit={(e) => onSubmit(e, formState)}>
        {!schema ? (
          <div className="input-container">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$"
              required
              onChange={(e) => {
                const { name, value } = e.target;

                setFormState((prevState) => ({ ...prevState, [name]: value }));
              }}
            />
          </div>
        ) : (
          schema?.map((field, index) => {
            const { inputType, required, placeholder, name } = field || {};

            return (
              <div className="input-container" key={`${id}-${index}`}>
                {inputType === 'text' || inputType === 'phone' ? (
                  <input
                    type={inputType}
                    required={required}
                    name={name}
                    value={formState?.[name]}
                    placeholder={placeholder}
                    onChange={(e) => setFormState({ ...formState, [name]: e.target.value })}
                  />
                ) : (
                  <div className="dropdown-container">
                    <Select classNamePrefix="dropdown" options={fiftyStates} value={formState?.[name]} />
                  </div>
                )}
              </div>
            );
          })
        )}
        <div className="input-container submit">
          <DarksideButton type="solid" colorTheme="black" buttonType="submit">
            Submit
          </DarksideButton>
        </div>
      </form>
    </FormContainer>
  );
};

export { Form };
