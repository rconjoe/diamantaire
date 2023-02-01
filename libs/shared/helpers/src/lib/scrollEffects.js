import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

const focusScroll = scrollableTarget =>
  disableBodyScroll(document.querySelector(`.${scrollableTarget}`));

const unFocusScroll = scrollableTarget =>
  enableBodyScroll(document.querySelector(`.${scrollableTarget}`));

export default {
  focusScroll,
  unFocusScroll,
  clearScroll: clearAllBodyScrollLocks,
};
