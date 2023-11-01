import { DarksideButton, Modal } from '@diamantaire/darkside/components/common-ui';
import {
  FORM_SUBSCRIPTION_SOURCE_NAME,
  HUBSPOT_FORM_SUBMIT_URL,
  HUBSPOT_PORTAL_ID,
  HUBSPOT_WISHLIST_SHARE_FORM_ID,
} from '@diamantaire/shared/constants';
import { getCountry, getLocalStorageWishlist } from '@diamantaire/shared/helpers';
import { useState } from 'react';

import { StyledWishlistShareModal } from './WishlistShareModal.style';

interface WishlistShareModalProps {
  onClose: () => void;
  locale: string;
  content?: any;
}

const WishlistShareModal: React.FC<WishlistShareModalProps> = ({ onClose, locale, content }) => {
  const defaultData = {
    recipientEmail: '',
    userEmail: '',
    userName: '',
    message: '',
    isConsent: false,
  };

  const [formData, setFormData] = useState(defaultData);

  console.log(content);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState(false);

  const products = getLocalStorageWishlist()?.join(',');

  const baseUrl = window.location.origin;

  const currentURL = window.location.href;

  const url = `${HUBSPOT_FORM_SUBMIT_URL}/${HUBSPOT_PORTAL_ID}/${HUBSPOT_WISHLIST_SHARE_FORM_ID}`;

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
  }) => Promise<Response> = async ({ message, userName, userEmail, isConsent, recipientEmail }) => {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: [
          {
            name: 'email',
            value: userEmail || '',
          },
          {
            name: 'name',
            value: userName || '',
          },
          {
            name: 'locale',
            value: locale || '',
          },
          {
            name: 'source',
            value: FORM_SUBSCRIPTION_SOURCE_NAME.wishlistShareSource,
          },
          {
            name: 'countryCode',
            value: getCountry(locale) || '',
          },
          {
            name: 'isConsent',
            value: isConsent || false,
          },
          {
            name: 'pageUrl',
            value: currentURL || '',
          },
          {
            name: 'pageTitle',
            value: 'WishList Share Page',
          },
          {
            name: 'recipientEmail',
            value: recipientEmail || '',
          },
          {
            name: 'message',
            value: message || '',
          },
          {
            name: 'wishlistingLinkProperty',
            value: `${baseUrl}/wishlist?username=${userName}&products=${products}`,
          },
        ],
      }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = await handleShare(formData);

    setFormData(defaultData);

    if (payload.status === 200) {
      setSuccess(true);
    } else {
      setError(true);
    }

    setTimeout(() => {
      setSuccess(false);
      setError(false);
    }, 5000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <StyledWishlistShareModal>
      <Modal className="wishlist-share-modal" onClose={onClose} title="Share your wishlist">
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
              <span>I consent to sharing my wishlist.</span>
            </div>
            <DarksideButton buttonType="submit" type="solid" colorTheme="black">
              send
            </DarksideButton>
          </div>
        </form>

        {(success || error) && <div className="formResponse">response</div>}
      </Modal>
    </StyledWishlistShareModal>
  );
};

export default WishlistShareModal;

export { WishlistShareModal };
