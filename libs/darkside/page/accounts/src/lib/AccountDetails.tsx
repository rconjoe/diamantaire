import { DarksideButton, Form, FormSchemaType, Heading } from '@diamantaire/darkside/components/common-ui';
import { fetchData } from '@diamantaire/darkside/data/api';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import styled from 'styled-components';

const AccountDetailsStyles = styled.div`
  padding: 2rem 0;

  .subtitle {
    font-size: var(--font-size-xsmall);
  }

  .list {
    list-style-type: none;
    padding: 0;

    li {
      font-size: var(--font-size-xsmall);
    }
  }

  .shipping-info__container,
  .email__container,
  .phone__container {
    padding: 2rem 0;
    border-bottom: 0.1rem solid var(--color-grey);
  }

  .shipping-info__container {
    padding-top: 0;
  }

  .shipping-info__form {
    max-width: 450px;

    .cancel {
      padding: 2rem 0;
    }
  }

  .phone__container {
    border-bottom: none;

    .phone-form {
      max-width: 450px;

      .close-phone-form {
        flex: 1;
        margin-top: 1rem;
      }

      .input-container {
        margin-bottom: 1rem;

        input {
          width: 100%;
        }
      }
    }
  }
`;

const AccountDetails = ({ customer }) => {
  const [isEditingShippingInfo, setIsEditingShippingInfo] = useState(false);
  const [isEdittingPhone, setIsEdittingPhone] = useState(false);
  const { phone, default_address } = customer || {};

  const shippingDetailsFormSchema: FormSchemaType[] = [
    {
      name: 'firstName',
      placeholder: 'First name',
      inputType: 'text',
      defaultValue: default_address?.firstName,
      required: true,
    },
    {
      name: 'lastName',
      placeholder: 'Last name',
      inputType: 'text',
      defaultValue: default_address?.lastName,
      required: true,
    },
    {
      name: 'address1',
      placeholder: 'Address 1',
      inputType: 'text',
      defaultValue: default_address?.address1,
      required: true,
    },
    {
      name: 'address2',
      placeholder: 'Address 2',
      inputType: 'text',
      defaultValue: default_address?.address2,
      required: true,
    },

    {
      name: 'city',
      placeholder: 'City',
      inputType: 'text',
      defaultValue: default_address?.city,
      required: true,
    },
    {
      name: 'zip',
      placeholder: 'Zip',
      inputType: 'text',
      defaultValue: default_address?.zip,
      required: true,
    },
    {
      name: 'state',
      placeholder: 'State',
      inputType: 'state-dropdown',
      defaultValue: default_address?.provinceCode,
      required: true,
    },
    {
      name: 'country',
      placeholder: 'Country',
      inputType: 'country-dropdown',
      defaultValue: default_address?.country,
      required: true,
    },
  ];

  const phoneFormSchema: FormSchemaType[] = [
    {
      name: 'phone',
      placeholder: 'Phone number',
      inputType: 'phone',
      defaultValue: default_address?.phone,
      required: true,
    },
  ];

  async function handleShippingInfoUpdate(e, formData) {
    e.preventDefault();

    await fetchData({
      url: '/api/customers/updateCustomerShippingDetails',
      body: {
        payload: {
          customerId: customer?.id,
          address: {
            firstName: formData.firstName,
            lastName: formData.firstName,
            address1: formData.address1,
            address2: formData.address2,
            city: formData.city,
            province: formData.state.label,
            country: formData.state.country,
            zip: formData.zip,
          },
        },
      },
    }).then((res) => console.log('update res', res));
  }

  async function handlePhoneFormSubmit(e, formData) {
    e.preventDefault();
    console.log('formData', formData);

    // await fetchData({
    //   url: '/api/customers/updateCustomerShippingDetails',
    //   body: {
    //     payload: {
    //       customerId: customer?.id,
    //       address: {
    //         phone: formData.phone,
    //       },
    //     },
    //   },
    // }).then((res) => console.log('update res', res));
  }

  return (
    <AccountDetailsStyles>
      <NextSeo title="Customer Details" />

      <div className="container-wrapper">
        {isEditingShippingInfo ? (
          <div className="shipping-info__form">
            <div className="title flex justify-space-between align-center">
              <Heading type="h4" className="subtitle">
                Shipping information
              </Heading>
            </div>

            <Form
              id={'shippping-details'}
              schema={shippingDetailsFormSchema}
              formGridStyle="single"
              flexDirection="column"
              onSubmit={handleShippingInfoUpdate}
            />

            <div className="cancel">
              <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsEditingShippingInfo(false)}>
                Cancel
              </DarksideButton>
            </div>
          </div>
        ) : (
          default_address && (
            <div className="shipping-info__container">
              <div className="title flex justify-space-between align-center">
                <Heading type="h4" className="subtitle">
                  Shipping information
                </Heading>

                <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsEditingShippingInfo(true)}>
                  Edit
                </DarksideButton>
              </div>

              <ul className="list">
                <li>
                  {default_address?.firstName} {default_address?.lastName}
                </li>
                <li>{default_address?.address1}</li>
                <li>{default_address?.address2}</li>
                <li>
                  {default_address?.city}, {default_address?.provinceCode} {default_address?.zip}
                </li>
                <li>{default_address?.country}</li>
              </ul>
            </div>
          )
        )}

        <div className="email__container">
          <Heading type="h4" className="subtitle">
            Your email
          </Heading>
          <ul className="list">
            <li>{customer?.email}</li>
          </ul>
        </div>

        <div className="phone__container">
          <div className="title flex justify-space-between align-center">
            <Heading type="h4" className="subtitle">
              Your phone number
            </Heading>

            <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsEdittingPhone(true)}>
              Edit
            </DarksideButton>
          </div>

          <ul className="list">
            <li>
              {isEdittingPhone ? (
                <div className="phone-form">
                  <Form schema={phoneFormSchema} onSubmit={handlePhoneFormSubmit} flexDirection="column" />
                  <div className="close-phone-form">
                    <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsEdittingPhone(false)}>
                      Cancel
                    </DarksideButton>
                  </div>
                </div>
              ) : (
                <p>{phone || default_address.phone}</p>
              )}
            </li>
          </ul>
        </div>
      </div>
    </AccountDetailsStyles>
  );
};

export default AccountDetails;
