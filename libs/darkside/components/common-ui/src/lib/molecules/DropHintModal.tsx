import { sendHubspotForm } from '@diamantaire/darkside/data/api';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { FORM_SUBSCRIPTION_SOURCE_NAME, HUBSPOT_DROP_A_HINT_FORM_ID } from '@diamantaire/shared/constants';
import { getCountry } from '@diamantaire/shared/helpers';
import * as EmailValidator from 'email-validator';
import { useState } from 'react';

import { DarksideButton } from './DarksideButton';
import { StyledDropHintModal } from './DropHintModal.style';
import { Markdown } from './Markdown';
import { Modal } from './Modal';
import { UIString } from './UIString';

interface HubspotResponse {
  inlineMessage: string;
}

interface DropHintModalProps {
  title: string;
  subtitle: string;
  locale: string;
  onClose: () => void;
  productLink: string;
  productImage: string;
}

const DropHintModal: React.FC<DropHintModalProps> = ({ title, subtitle, onClose, locale, productImage, productLink }) => {
  const { _t } = useTranslations(locale);

  const defaultData = {
    recipientEmail: '',
    userEmail: '',
    userName: '',
    message: '',
    isConsent: true,
  };

  const [formData, setFormData] = useState(defaultData);

  const [response, setResponse] = useState(null);

  const countryCode = getCountry(locale);

  const source = FORM_SUBSCRIPTION_SOURCE_NAME.dropAHintSource;

  const baseUrl = window?.location?.origin || '';

  const listId = HUBSPOT_DROP_A_HINT_FORM_ID;

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
      locale,
      message,
      isConsent,
      countryCode,
      recipientEmail: userEmail,
      name: userName,
      email: recipientEmail,
      productImageUrl: `${baseUrl}${locale !== 'en-US' ? `/${locale}` : ''}${productLink}`,
      productImage: productImage,
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
      setResponse(inlineMessage);

      setFormData(defaultData);
    } else {
      setResponse(_t('Drop Hint Error Messsage'));
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
    <StyledDropHintModal>
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
              name={_t('userName')}
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
    </StyledDropHintModal>
  );
};

export { DropHintModal };
