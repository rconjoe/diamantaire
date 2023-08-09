import { DarksideButton, Form, FormSchemaType } from '@diamantaire/darkside/components/common-ui';
import { fetchData } from '@diamantaire/darkside/data/api';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const AccountDetailsStyles = styled.div`
  padding: var(--gutter) 0;

  h4 {
    font-size: var(--font-size-xsmall);
  }

  ul {
    li {
      font-size: var(--font-size-xsmall);
    }
  }

  .shipping-info__container,
  .email__container,
  .phone__container {
    padding: calc(var(--gutter) / 2) 0;
    border-bottom: 1px solid var(--color-grey);
  }

  .shipping-info__container {
    padding-top: 0;
  }

  .shipping-info__form {
    max-width: 450px;

    .cancel {
      padding: calc(var(--gutter) / 3) 0 calc(var(--gutter) / 2);
    }
  }

  .phone__container {
    border-bottom: none;
    max-width: 450px;

    .phone-form {
      .close-phone-form {
        flex: 1;
        margin-top: calc(var(--gutter) / 3);
      }
      form {
        .submit {
          max-width: 140px;
        }
      }
    }
  }
`;

const AccountDetails = ({ customer }) => {
  const [customerShippingInfo, setCustomerShippingInfo] = useState(null);
  const [isEditingShippingInfo, setIsEditingShippingInfo] = useState(false);
  const [isEdittingPhone, setIsEdittingPhone] = useState(false);
  const { phone, defaultAddress } = customerShippingInfo || {};

  useEffect(() => {
    async function getCustomerShippingDetails() {
      return fetchData({
        url: '/api/customers/getCustomerShippingDetails',
        body: {
          payload: {
            id: customer?.id,
          },
        },
      });
    }

    async function fetchCustomerShippingDetails() {
      const details = await getCustomerShippingDetails();

      return setCustomerShippingInfo(details);
    }

    if (customer?.id) {
      fetchCustomerShippingDetails();
    }
  }, [customer?.id]);

  const shippingDetailsFormSchema: FormSchemaType[] = [
    {
      name: 'firstName',
      placeholder: 'First name',
      inputType: 'text',
      defaultValue: defaultAddress?.firstName,
      required: true,
    },
    {
      name: 'lastName',
      placeholder: 'Last name',
      inputType: 'text',
      defaultValue: defaultAddress?.lastName,
      required: true,
    },
    {
      name: 'address1',
      placeholder: 'Address 1',
      inputType: 'text',
      defaultValue: defaultAddress?.address1,
      required: true,
    },
    {
      name: 'address2',
      placeholder: 'Address 2',
      inputType: 'text',
      defaultValue: defaultAddress?.address2,
      required: true,
    },

    {
      name: 'city',
      placeholder: 'City',
      inputType: 'text',
      defaultValue: defaultAddress?.city,
      required: true,
    },
    {
      name: 'zip',
      placeholder: 'Zip',
      inputType: 'text',
      defaultValue: defaultAddress?.zip,
      required: true,
    },
    {
      name: 'state',
      placeholder: 'State',
      inputType: 'state-dropdown',
      defaultValue: defaultAddress?.provinceCode,
      required: true,
    },
    {
      name: 'country',
      placeholder: 'Country',
      inputType: 'country-dropdown',
      defaultValue: defaultAddress?.country,
      required: true,
    },
  ];

  const phoneFormSchema: FormSchemaType[] = [
    {
      name: 'phone',
      placeholder: 'Phone number',
      inputType: 'phone',
      defaultValue: defaultAddress?.phone,
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
              <h4>Shipping information</h4>
            </div>
            <Form
              id={'shippping-details'}
              schema={shippingDetailsFormSchema}
              formGridStyle="single"
              onSubmit={handleShippingInfoUpdate}
            />

            <div className="cancel">
              <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsEditingShippingInfo(false)}>
                Cancel
              </DarksideButton>
            </div>
          </div>
        ) : (
          defaultAddress && (
            <div className="shipping-info__container">
              <div className="title flex justify-space-between align-center">
                <h4>Shipping information</h4>
                <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsEditingShippingInfo(true)}>
                  Edit
                </DarksideButton>
              </div>
              <ul className="list-unstyled">
                <li>
                  {defaultAddress?.firstName} {defaultAddress?.lastName}
                </li>
                <li>{defaultAddress?.address1}</li>
                <li>{defaultAddress?.address2}</li>
                <li>
                  {defaultAddress?.city}, {defaultAddress?.provinceCode} {defaultAddress?.zip}
                </li>
                <li>{defaultAddress?.country}</li>
              </ul>
            </div>
          )
        )}

        <div className="email__container">
          <h4>Your email</h4>
          <ul className="list-unstyled">
            <li>{customer?.email}</li>
          </ul>
        </div>
        <div className="phone__container">
          <h4>Your phone number</h4>
          <ul className="list-unstyled">
            <li>
              {phone ? (
                phone
              ) : isEdittingPhone ? (
                <div className="phone-form">
                  <Form schema={phoneFormSchema} onSubmit={handlePhoneFormSubmit} />
                  <div className="close-phone-form">
                    <DarksideButton type="underline" onClick={() => setIsEdittingPhone(false)}>
                      Cancel
                    </DarksideButton>
                  </div>
                </div>
              ) : (
                <DarksideButton onClick={() => setIsEdittingPhone(true)} type="underline" colorTheme="teal">
                  Enter your phone number
                </DarksideButton>
              )}
            </li>
          </ul>
        </div>
      </div>
    </AccountDetailsStyles>
  );
};

export default AccountDetails;
