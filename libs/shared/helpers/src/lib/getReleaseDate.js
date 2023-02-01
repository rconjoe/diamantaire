import getCurrentDate from './getCurrentDate';
import makeDate from './makeDate';

export const GIFT_WITH_PURCHASE_START_DATE = makeDate({
  month: 12,
  day: 24,
  hour: 0,
});

export const GIFT_WITH_PURCHASE_END_DATE = makeDate({
  month: 12,
  day: 27,
  hour: 12,
});

export const isGiftWithPurchaseActive = (date = getCurrentDate()) => {
  return (
    date > GIFT_WITH_PURCHASE_START_DATE && date < GIFT_WITH_PURCHASE_END_DATE
  );
};

export const VIRTUAL_APPOINTMENT_START_DATE = makeDate({
  year: 2020,
  month: 4,
  day: 30,
  hour: 12,
});

export const getIsVirtualAppointmentActive = (date = getCurrentDate()) => {
  return date > VIRTUAL_APPOINTMENT_START_DATE && !getFrontlineActive();
};

export const FRONTLINE_START_DATE = makeDate({
  year: 2020,
  month: 4,
  day: 21,
  hour: 12,
});

export const FRONTLINE_END_DATE = makeDate({
  year: 2020,
  month: 5,
  day: 8,
  hour: 12,
});

export const getFrontlineActive = (date = getCurrentDate()) => {
  return date > FRONTLINE_START_DATE && date < FRONTLINE_END_DATE;
};

export const HOLIDAY_GIFT_NOTE_START_DATE = makeDate({
  month: 11,
  day: 4,
  hour: 12,
});

export const HOLIDAY_GIFT_NOTE_END_DATE = makeDate({
  month: 12,
  day: 31,
  hour: 23,
  minute: 59,
});

export const getHolidayGiftNoteActive = (date = getCurrentDate()) => {
  return (
    date > HOLIDAY_GIFT_NOTE_START_DATE && date < HOLIDAY_GIFT_NOTE_END_DATE
  );
};
