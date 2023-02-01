import { getHolidayGiftNoteActive } from './getReleaseDate';
import getEnvConfig from '../env';

const {
  GIFT_NOTE_VARIANT_ID,
  GIFT_NOTE_PRODUCT_HANDLE,
  HOLIDAY_GIFT_NOTE_PRODUCT_HANDLE,
  HOLIDAY_GIFT_NOTE_VARIANT_ID,
} = getEnvConfig();

const isHolidayGiftNoteActive = getHolidayGiftNoteActive();

export const getCurrentGiftNoteHandle = () =>
  isHolidayGiftNoteActive
    ? HOLIDAY_GIFT_NOTE_PRODUCT_HANDLE
    : GIFT_NOTE_PRODUCT_HANDLE;

export const getCurrentGiftNoteVariantId = () =>
  isHolidayGiftNoteActive ? HOLIDAY_GIFT_NOTE_VARIANT_ID : GIFT_NOTE_VARIANT_ID;
