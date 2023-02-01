import { useEffect } from 'react';
import { getEnvConfig } from '@diamantaire/shared/constants';

// Predicted to be a bot if lower than threshold
const { RECAPTCHA_ENABLED, RECAPTCHA_PUBLIC_KEY } = getEnvConfig();

/**
 * 
 * 
 *  // Use hook to get action handler
    const verifyReCaptcha = useReCaptcha();

    // submit action, formData and callback to receive verification data
    const handleOnClick = async e => {
      e.preventDefault();
      verifyReCaptcha('submit', { name, email }, handleSubmitForm);
    }

    // With form and verification data, decide how to handle the form
    const handleSubmitForm = ({ verify, formData }) => {
      console.log("should I submit this form?", { verify, formData });
    }
 */

/**
 * Loads script and calls callback when loaded
 * @param {string} id
 * @param {string} url
 * @param {function} callback
 */
const loadScriptByURL = (id, url, callback) => {
  const isScriptExist = document.getElementById(id);

  if (!isScriptExist) {
    var script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = url;
    script.id = id;
    script.onload = function () {
      if (callback) {
        callback();
      }
    };
    document.body.appendChild(script);
  }

  if (isScriptExist && callback) {
    callback();
  }
};

const handleSubmit = (action, formData, callback) => {
  window.grecaptcha.ready(() => {
    window.grecaptcha
      .execute(RECAPTCHA_PUBLIC_KEY, { action })
      .then((token) => {
        submitData(token, formData, callback);
      });
  });
};

const submitData = (token, formData, callback = () => {}) => {
  // call a backend API to verify reCAPTCHA response
  fetch('/api/recaptcha/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...formData,
      'g-recaptcha-response': token,
    }),
  })
    .then((res) => res.json())
    .then((verify) => {
      callback({ verify, formData });
    });
};

export const useReCaptcha = () => {
  useEffect(() => {
    // load the script by passing the URL
    if (RECAPTCHA_ENABLED) {
      loadScriptByURL(
        'recaptcha-key',
        `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_PUBLIC_KEY}`,
        function () {
          // callback for when the script is loaded
        }
      );
    }
  }, []);

  if (!RECAPTCHA_ENABLED) {
    return;
  }

  return handleSubmit;
};
