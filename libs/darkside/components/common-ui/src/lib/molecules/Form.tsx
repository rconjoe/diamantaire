/*

This is the master form component, we should never need to manually create a customer facing form that doesn't use this

*/

import { allCountries, fiftyStates } from '@diamantaire/shared/constants';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import styled from 'styled-components';

import { DarksideButton } from './DarksideButton';
import { Heading } from './Heading';
import { Markdown } from './Markdown';

import 'react-international-phone/style.css';

const Select = dynamic(() => import('react-select'));

type FormProps = {
  onSubmit?: (e: React.SyntheticEvent, formState: object) => void;
  caption?: string;
  id?: string;
  title?: string;
  schema?: FormSchemaType[];
  formGridStyle?: 'single' | 'split';
  stackedSubmit?: boolean;
  formState?: object;
  setFormState?: (state: object) => void;
  showOptIn?: boolean;
  ctaCopy?: string;
  optInCopy?: string;
  extraClass?: string;
  isValid?: boolean;
  setIsValid?: (state: boolean) => void;
  gridStyle?: 'single' | 'split';
  emailPlaceholderText?: string;
};

type InputType = 'text' | 'textarea' | 'phone' | 'number' | 'country-dropdown' | 'state-dropdown' | 'email' | 'password';

export type FormSchemaType = {
  name: string;
  placeholder: string;
  inputType?: InputType;
  defaultValue?: string;
  required: boolean;
  defaultCountry?: string;
};

const FormContainer = styled.div<{ gridStyle?: string; stackedSubmit?: boolean; fieldsLength: number }>`
  p {
    margin-top: calc(var(--gutter) / 20);
    font-size: var(--font-size-xxsmall);
  }
  .form {
    display: flex;
    /* flex-wrap: wrap; */
    align-items: flex-end;
    margin-top: calc(var(--gutter) / 5);
    .input-container {
      display: flex;
      flex-wrap: ${({ stackedSubmit }) => (stackedSubmit ? 'wrap' : 'nowrap')};
      margin-bottom: ${({ fieldsLength }) => (fieldsLength === 1 ? 0 : ` calc(var(--gutter) / 3);`)};
      flex: 1;

      &.submit {
        margin-bottom: 0px;
        // flex: ${({ stackedSubmit }) => (stackedSubmit ? '0 0 140px' : '0 0 140px')};
      }

      > * {
        flex: 1;
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
  .input-opt-in {
    width: 100%;
    input[type='checkbox'] {
      width: 13px;
      height: 13px;
      appearance: none;
      background-color: #fff;
      margin: 0;
      font: inherit;
      color: currentColor;
      border: 1px solid currentColor;
    }
    input[type='checkbox']::before {
      display: block;
      content: '';
      width: 100%;
      height: 100%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 13px 13px currentColor;
    }

    input[type='checkbox']:checked::before {
      transform: scale(1);
    }
    &.-error {
      color: red;
      a {
        color: red;
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
  showOptIn,
  ctaCopy = 'Submit',
  optInCopy,
  extraClass,
  isValid,
  setIsValid,
}: FormProps) => {
  const initialFormState = {};

  schema?.forEach((field) => {
    if (field.inputType === 'state-dropdown') {
      initialFormState[field.name] = fiftyStates.find((state) => state.value === field.defaultValue) || null;
    } else if (field.inputType === 'country-dropdown') {
      initialFormState[field.name] = allCountries.find((country) => country.label === field.defaultValue) || null;
    } else {
      initialFormState[field.name] = field.defaultValue || '';
    }
  });

  const [formState, setFormState] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const showGdprError = showOptIn && !isValid;

  return (
    <FormContainer gridStyle={formGridStyle} stackedSubmit={stackedSubmit} fieldsLength={schema?.length | 1}>
      {title && (
        <Heading type="h4" className="primary">
          {title}
        </Heading>
      )}
      {caption && <p className="small">{caption}</p>}
      <form onSubmit={(e) => onSubmit(e, formState)}>
        <div className="form">
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
              const { inputType, required, placeholder, name, defaultCountry } = field || {};

              if (inputType === 'text') {
                return (
                  <div className="input-container" key={`${id}-${index}`}>
                    <input
                      type="text"
                      required={required}
                      name={name}
                      value={formState?.[name]}
                      placeholder={placeholder}
                      onChange={handleInputChange}
                    />
                  </div>
                );
              } else if (inputType === 'email') {
                return (
                  <div className="input-container" key={`${id}-${index}`}>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder={placeholder}
                      pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$"
                      required
                      value={formState?.[name]}
                      onChange={handleInputChange}
                    />
                  </div>
                );
              } else if (inputType === 'phone') {
                return (
                  <div className="input-container" key={`${id}-${index}`}>
                    <PhoneInput
                      value={formState?.[name]}
                      placeholder={placeholder}
                      onChange={(selectedPhone) => {
                        setFormState({ ...formState, [name]: selectedPhone });
                      }}
                      defaultCountry={defaultCountry}
                    />
                  </div>
                );
              } else if (inputType === 'country-dropdown') {
                // Render the country dropdown using the Select component
                return (
                  <div className="input-container" key={`${id}-${index}`}>
                    <Select classNamePrefix="dropdown" options={allCountries} value={formState?.[name]} />
                  </div>
                );
              } else if (inputType === 'state-dropdown') {
                // Render the state dropdown using the Select component (assuming you have a similar component)
                return (
                  <div className="input-container" key={`${id}-${index}`}>
                    <Select classNamePrefix="dropdown" options={fiftyStates} value={formState?.[name]} />
                  </div>
                );
              }
            })
          )}
          {showOptIn && stackedSubmit && (
            <div
              className={clsx('input-opt-in', {
                '-error': showGdprError,
              })}
            >
              <input
                type="checkbox"
                name="isConsent"
                id="optin"
                onChange={(e) => {
                  const { name, checked } = e.target;

                  setFormState((prevState) => ({ ...prevState, [name]: checked }));
                  setIsValid(true);
                }}
              />
              <label htmlFor="optin">
                <Markdown options={{ forceBlock: false }} extraClass={extraClass}>
                  {optInCopy}
                </Markdown>
              </label>
            </div>
          )}
          <div className="input-container submit">
            <DarksideButton type="solid" colorTheme="black" buttonType="submit">
              {ctaCopy}
            </DarksideButton>
          </div>
        </div>
        {showOptIn && !stackedSubmit && (
          <div
            className={clsx('input-opt-in', {
              '-error': showGdprError,
            })}
          >
            <input
              type="checkbox"
              name="isConsent"
              id="optin"
              onChange={(e) => {
                const { name, checked } = e.target;

                setFormState((prevState) => ({ ...prevState, [name]: checked }));
                setIsValid(true);
              }}
            />
            <label htmlFor="optin">
              <Markdown options={{ forceBlock: false }} extraClass={extraClass}>
                {optInCopy}
              </Markdown>
            </label>
          </div>
        )}
      </form>
    </FormContainer>
  );
};

export { Form };
