import { decode, encode } from 'base-64';
import Cookies from 'js-cookie';
export const HUBSPOT_EMAIL_COOKIE = 'hbe';
export const ACCOUNT_EMAIL_COOKIE = 'ae';

export const hubspotEmailCookie = {
  set(val) {
    Cookies.set(HUBSPOT_EMAIL_COOKIE, encode(val), {
      expires: 360,
    });
  },
  get() {
    const cookieValue = Cookies.get(HUBSPOT_EMAIL_COOKIE);

    return cookieValue ? decode(cookieValue) : false;
  },
  remove() {
    Cookies.remove(HUBSPOT_EMAIL_COOKIE);
  },
};

export const accountEmailCookie = {
  set(val) {
    Cookies.set(ACCOUNT_EMAIL_COOKIE, encode(val), {
      expires: 30,
    });
  },
  get() {
    const cookieValue = Cookies.get(ACCOUNT_EMAIL_COOKIE);

    return cookieValue ? decode(cookieValue) : false;
  },
  remove() {
    Cookies.remove(ACCOUNT_EMAIL_COOKIE);
  },
};
