import { DarksideButton, Form, FormSchemaType, Heading, UIString } from '@diamantaire/darkside/components/common-ui';
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
  const { address, setNewAddress } = useState(default_address);

  const shippingDetailsFormSchema: FormSchemaType[] = [
    {
      name: 'id',
      inputType: 'hidden',
      defaultValue: address?.id,
    },
    {
      name: 'first_name',
      placeholder: 'First name',
      inputType: 'text',
      defaultValue: address?.first_name,
      required: true,
    },
    {
      name: 'last_name',
      placeholder: 'Last name',
      inputType: 'text',
      defaultValue: address?.last_name,
      required: true,
    },
    {
      name: 'address1',
      placeholder: 'Address 1',
      inputType: 'text',
      defaultValue: address?.address1,
      required: true,
    },
    {
      name: 'address2',
      placeholder: 'Address 2',
      inputType: 'text',
      defaultValue: address?.address2,
      required: false,
    },

    {
      name: 'city',
      placeholder: 'City',
      inputType: 'text',
      defaultValue: address?.city,
      required: true,
    },
    {
      name: 'zip',
      placeholder: 'Zip',
      inputType: 'text',
      defaultValue: address?.zip,
      required: true,
    },
    {
      name: 'country_code',
      placeholder: 'Country',
      inputType: 'country-dropdown',
      defaultValue: address?.country_code,
      required: true,
    },
    {
      name: 'province_code',
      placeholder: 'State',
      inputType: 'state-dropdown',
      defaultValue: address?.province_code,
      required: false,
    },
  ];

  const phoneFormSchema: FormSchemaType[] = [
    {
      name: 'phone',
      placeholder: 'Phone number',
      inputType: 'phone',
      defaultValue: address?.phone,
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
            first_name: formData.first_name,
            last_name: formData.last_name,
            address1: formData.address1,
            address2: formData.address2,
            city: formData.city,
            province_code: formData.province_code,
            country_code: formData.country_code,
            zip: formData.zip,
            id: formData.id,
          },
        },
      },
    }).then((res) => {
      if (res.customer_address) {
        setNewAddress(res.customer_address);

        setIsEditingShippingInfo(false);
      } else {
        // TODO handle Error with message or visual or a call from your granma
      }
    });
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
                <UIString>Shipping information</UIString>
              </Heading>
            </div>

            <Form
              formGridStyle="single"
              flexDirection="column"
              id={'shippping-details'}
              schema={shippingDetailsFormSchema}
              onSubmit={handleShippingInfoUpdate}
            />

            <div className="cancel">
              <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsEditingShippingInfo(false)}>
                <UIString>Cancel</UIString>
              </DarksideButton>
            </div>
          </div>
        ) : (
          default_address && (
            <div className="shipping-info__container">
              <div className="title flex justify-space-between align-center">
                <Heading type="h4" className="subtitle">
                  <UIString>Shipping information</UIString>
                </Heading>

                <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsEditingShippingInfo(true)}>
                  <UIString>Edit</UIString>
                </DarksideButton>
              </div>

              <ul className="list">
                <li>
                  {default_address?.firstName} {default_address?.lastName}
                </li>
                <li>{default_address?.address1}</li>
                <li>{default_address?.address2}</li>
                <li>
                  {default_address?.city}, {default_address?.province_code}, {default_address?.zip}
                </li>
                <li>{default_address?.country}</li>
              </ul>
            </div>
          )
        )}

        <div className="email__container">
          <Heading type="h4" className="subtitle">
            <UIString>Your email</UIString>
          </Heading>
          <ul className="list">
            <li>{customer?.email}</li>
          </ul>
        </div>

        <div className="phone__container">
          <div className="title flex justify-space-between align-center">
            <Heading type="h4" className="subtitle">
              <UIString>Your phone number</UIString>
            </Heading>

            <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsEdittingPhone(true)}>
              <UIString>Edit</UIString>
            </DarksideButton>
          </div>

          <ul className="list">
            <li>
              {isEdittingPhone ? (
                <div className="phone-form">
                  <Form schema={phoneFormSchema} onSubmit={handlePhoneFormSubmit} flexDirection="column" />
                  <div className="close-phone-form">
                    <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsEdittingPhone(false)}>
                      <UIString>Cancel</UIString>
                    </DarksideButton>
                  </div>
                </div>
              ) : (
                <p>{phone || default_address?.phone}</p>
              )}
            </li>
          </ul>
        </div>
      </div>
    </AccountDetailsStyles>
  );
};

export default AccountDetails;
