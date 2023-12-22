import { DarksideButton, Markdown, Modal, UIString } from '@diamantaire/darkside/components/common-ui';
import { sendHubspotForm } from '@diamantaire/darkside/data/api';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { FORM_SUBSCRIPTION_SOURCE_NAME, HUBSPOT_WISHLIST_SHARE_FORM_ID } from '@diamantaire/shared/constants';
import { getCountry, getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import * as EmailValidator from 'email-validator';
import { useState } from 'react';

import { StyledWishlistShareModal } from './WishlistShareModal.style';

interface HubspotResponse {
  inlineMessage: string;
}

interface WishlistShareModalProps {
  title: string;
  subtitle: string;
  locale: string;
  onClose: () => void;
  errorMessage: string;
  successMessage: string;
}

const WishlistShareModal: React.FC<WishlistShareModalProps> = ({
  onClose,
  locale,
  title,
  subtitle,
  errorMessage,
  successMessage,
}) => {
  const { _t } = useTranslations(locale);

  const defaultData = {
    recipientEmail: '',
    userEmail: '',
    userName: '',
    message: '',
    isConsent: true,
  };

  const [response, setResponse] = useState(null);

  const [formData, setFormData] = useState(defaultData);

  const products = getLocalStorageWishlist()?.join(',');

  const baseUrl = window?.location?.origin || '';

  const listId = HUBSPOT_WISHLIST_SHARE_FORM_ID;

  const countryCode = getCountry(locale);

  const source = FORM_SUBSCRIPTION_SOURCE_NAME.wishlistShareSource;

  const handleShare: ({
    message,
    userName,
    userEmail,
    isConsent,
    recipientEmail,
  }: {
    message: string;
    userName: string;
    userEmail: string;
    isConsent: boolean;
    recipientEmail: string;
  }) => Promise<HubspotResponse> = async ({ message, userName, userEmail, isConsent, recipientEmail }) => {
    const data = {
      listData: {
        listId,
      },
      source,
      isConsent,
      locale,
      message,
      countryCode,
      recipientEmail: userEmail,
      name: userName,
      email: recipientEmail,
      wishlistingLinkProperty: `${baseUrl}/wishlist-share?username=${userName}&products=${products}`,
    };

    return sendHubspotForm(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userEmail, recipientEmail } = formData;

    const validUserEmail = EmailValidator.validate(userEmail);

    const validRecipientEmail = EmailValidator.validate(recipientEmail);

    if (!validUserEmail) {
      const emailError = `${_t('Your email address')} ${_t('is not a valid email address.')}`;

      setResponse(emailError);

      setTimeout(() => {
        // the response is removed after 5 sec
        setResponse(null);
      }, 5000);

      return;
    }

    if (!validRecipientEmail) {
      const emailError = `${_t('Recipient email address')} ${_t('is not a valid email address.')}`;

      setResponse(emailError);

      setTimeout(() => {
        // the response is removed after 5 sec
        setResponse(null);
      }, 5000);

      return;
    }

    const payload = await handleShare(formData);

    const { inlineMessage } = payload || {};

    if (inlineMessage) {
      setResponse(successMessage);

      setFormData(defaultData);
    } else {
      setResponse(errorMessage);
    }

    setTimeout(() => {
      setResponse(null);
    }, 5000);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <StyledWishlistShareModal>
      <Modal className="wishlist-share-modal" onClose={onClose} title={title}>
        <div className="subtitle">
          <p>{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="recipientEmail"
              placeholder={_t('Recipient email address')}
              value={formData.recipientEmail}
              onChange={handleChange}
            />

            <input
              type="text"
              name="userEmail"
              placeholder={_t('Your email address')}
              value={formData.userEmail}
              onChange={handleChange}
            />

            <input
              type="text"
              name="userName"
              placeholder={_t('Your name')}
              value={formData.userName}
              onChange={handleChange}
            />

            <textarea name="message" placeholder={_t('Your message')} value={formData.message} onChange={handleChange} />

            <div>
              <input type="checkbox" name="isConsent" checked={formData.isConsent} onChange={handleChange} />
              <UIString>Sign me up for VRAI updates</UIString>
            </div>

            <DarksideButton buttonType="submit" type="solid" colorTheme="black">
              <UIString>Send</UIString>
            </DarksideButton>
          </div>
        </form>

        {response && (
          <div className="form-response">
            <Markdown withStyles={false}>{response}</Markdown>
          </div>
        )}
      </Modal>
    </StyledWishlistShareModal>
  );
};

export { WishlistShareModal };
