import { DarksideButton, Markdown, Modal, UIString } from '@diamantaire/darkside/components/common-ui';
import { sendHubspotForm } from '@diamantaire/darkside/data/api';
import {
  FORM_SUBSCRIPTION_SOURCE_NAME,
  HUBSPOT_DROP_A_HINT_FORM_ID,
  HUBSPOT_WISHLIST_SHARE_FORM_ID,
} from '@diamantaire/shared/constants';
import { getCountry, getLocalStorageWishlist } from '@diamantaire/shared/helpers';
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
}

interface WishlistDropHintModalProps {
  title: string;
  subtitle: string;
  locale: string;
  onClose: () => void;
  productLink: string;
  productImage: string;
  errorMessage: string;
}

const WishlistShareModal: React.FC<WishlistShareModalProps> = ({ onClose, locale, title, subtitle, errorMessage }) => {
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
      recipientEmail,
      name: userName,
      email: userEmail,
      wishlistingLinkProperty: `${baseUrl}/wishlist-share?username=${userName}&products=${products}`,
    };

    return sendHubspotForm(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = await handleShare(formData);

    const { inlineMessage } = payload || {};

    if (inlineMessage) {
      setResponse(inlineMessage);

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
              placeholder="Recipient email address"
              value={formData.recipientEmail}
              onChange={handleChange}
            />

            <input
              type="text"
              name="userEmail"
              placeholder="Your email address"
              value={formData.userEmail}
              onChange={handleChange}
            />

            <input type="text" name="userName" placeholder="Your name" value={formData.userName} onChange={handleChange} />

            <textarea name="message" placeholder="Your message" value={formData.message} onChange={handleChange} />

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

const WishlistDropHintModal: React.FC<WishlistDropHintModalProps> = ({
  title,
  subtitle,
  onClose,
  locale,
  productImage,
  productLink,
  errorMessage,
}) => {
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
      recipientEmail,
      name: userName,
      email: userEmail,
      productLink: `${baseUrl}${productLink}`,
      productImage: productImage,
    };

    return sendHubspotForm(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = await handleShare(formData);

    const { inlineMessage } = payload || {};

    if (inlineMessage) {
      setResponse(inlineMessage);

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
              placeholder="Recipient email address"
              value={formData.recipientEmail}
              onChange={handleChange}
            />

            <input
              type="text"
              name="userEmail"
              placeholder="Your email address"
              value={formData.userEmail}
              onChange={handleChange}
            />

            <input type="text" name="userName" placeholder="Your name" value={formData.userName} onChange={handleChange} />

            <textarea name="message" placeholder="Your message" value={formData.message} onChange={handleChange} />

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

export { WishlistShareModal, WishlistDropHintModal };
