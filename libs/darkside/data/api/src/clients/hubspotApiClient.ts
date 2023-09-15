import { HUBSPOT_FORM_SUBMIT_URL, HUBSPOT_PORTAL_ID } from '@diamantaire/shared/constants';
import axios from 'axios';

const generateHubspotURL = (listId: string) => {
  if (!listId) {
    throw new Error('listId is missing or undefined');
  }

  return `${HUBSPOT_FORM_SUBMIT_URL}/${HUBSPOT_PORTAL_ID}/${listId}`;
};

const sendHubspotForm = async ({
  listData,
  phone,
  email,
  locale,
  countryCode,
  //isConsent,
  pageUrl,
  pageTitle,
  recipientEmail,
  partnerName,
  name,
  message,
  productImageUrl,
  productImage,
  smsSubscription,
  smsConsentSource,
  sendSMS,
  wishlistingLinkProperty,
  erAngleImage,
  erDetailImage,
  erProfileImage,
  erUprightImage,
  erFrontImage,
  erSideImage,
  erName,
  erUrl,
}: any) => {
  const data = {
    fields: [
      {
        name: 'email',
        value: email || '',
      },
      {
        name: 'phone',
        value: phone || '',
      },
      {
        name: 'partner_email__c',
        value: recipientEmail || '',
      },
      {
        name: 'partner_name__c',
        value: partnerName || '',
      },
      {
        name: 'firstname',
        value: name || '',
      },
      {
        name: 'message',
        value: message || '',
      },
      {
        name: 'image_url',
        value: productImageUrl || '',
      },
      {
        name: 'product_image',
        value: productImage || '',
      },
      {
        name: 'locale',
        value: locale || '',
      },
      {
        name: 'country',
        value: countryCode || '',
      },
      {
        name: 'subscription_source',
        value: listData?.source || '',
      },
      {
        name: 'sms_subscription',
        value: smsSubscription || '',
      },
      {
        name: 'sms_consent_source',
        value: smsConsentSource || '',
      },
      {
        name: 'sakari_send_sms',
        value: sendSMS || '',
      },
      {
        name: 'wishlisting_link_property',
        value: wishlistingLinkProperty || '',
      },
      {
        name: 'er_summary_angle_image',
        value: erAngleImage || '',
      },
      {
        name: 'er_summary_detail_image',
        value: erDetailImage || '',
      },
      {
        name: 'er_summary_profile_image',
        value: erProfileImage || '',
      },
      {
        name: 'er_summary_upright_image',
        value: erUprightImage || '',
      },
      {
        name: 'er_summary_front_image',
        value: erFrontImage || '',
      },
      {
        name: 'er_summary_side_image',
        value: erSideImage || '',
      },
      {
        name: 'er_summary_name',
        value: erName || '',
      },
      {
        name: 'er_summary_url',
        value: erUrl || '',
      },
    ],
    sfdcCampaignId: listData?.sfdcCampaignId || '',
    context: {
      // hutk: hubspotCookieToken(),
      // TODO: include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission
      pageUri: typeof window !== 'undefined' ? window.location.href : pageUrl,
      pageName: typeof document !== 'undefined' ? document.title : pageTitle,
    },
  };

  // if (isConsent) {
  //   data.legalConsentOptions = {
  //     consent: {
  //       consentToProcess: isConsent,
  //       text: '', // TODO: HUBSPOT_CONSENT_TEXT,
  //     },
  //   };
  // }
  const url = generateHubspotURL(listData?.listId);
  // TODO: hubspotEmailCookie.set(email);

  try {
    const response = await axios.post(url, data);

    console.log('response from client', { response });

    return response.data;
  } catch (error) {
    console.error('Error submitting form data to HubSpot:', error);
    throw new Error('Error submitting form data to HubSpot');
  }
};

export { sendHubspotForm };
