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
  get(cookies) {
    return cookies[HUBSPOT_EMAIL_COOKIE] ? decode(cookies[HUBSPOT_EMAIL_COOKIE]) : false;
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
  get(cookies) {
    return cookies[ACCOUNT_EMAIL_COOKIE] ? decode(cookies[ACCOUNT_EMAIL_COOKIE]) : false;
  },
  remove() {
    Cookies.remove(ACCOUNT_EMAIL_COOKIE);
  },
};
