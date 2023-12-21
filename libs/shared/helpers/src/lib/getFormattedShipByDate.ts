import { DateTime } from 'luxon-business-days';

import { toBCP47LocaleTag } from './currency';

export const LOCALES = {
  en_US: 'English',
  de: 'Deutsch', // TODO: According to Mozilla, the locale for Germany should be de-DE. I am unsure how to resolve this mismatch.
  fr: 'Français',
  es: 'Español',
};

export const LOCALE_KEYS = Object.keys(LOCALES);

//const BUSINESS_DAY_CUTOFF_HOUR = 24;

const DECEMBER_MONTH = 12;
const SATURDAY = 6;
const SUNDAY = 7;

/*
Vendor Holidays for 2023:

Thanksgiving Day: 11/23/2023
Black Friday: 11/24/2023
Christmas: 12/25/2023
New Year's Eve Eve: 12/29/2023
New Year's 2024: 1/1/2024
*/
const OBSERVED_HOLIDAYS = {
  'Thanksgiving Day': {
    day: 23,
    month: 11,
    year: 2023,
  },
  'Black Friday': {
    day: 24,
    month: 11,
    year: 2023,
  },
  Christmas: {
    day: 25,
    month: 12,
    year: 2023,
  },
  "New Year's Eve Eve": {
    day: 29,
    month: 12,
    year: 2023,
  },
  "New Year's Day": {
    day: 1,
    month: 1,
    year: 2024,
  },
};

export const getShipByDate = (shippingBusinessDays, currentDateTime = DateTime.local()) => {
  // Cut off for business day is 12 AM PT

  const currentPacificDateTime = currentDateTime.setZone('America/Los_Angeles');
  const currentDate = DateTime.local(currentPacificDateTime.year, currentPacificDateTime.month, currentPacificDateTime.day);

  const {
    // /* eslint-disable-next-line no-unused-vars */
    // isColumbusDay,
    // /* eslint-disable-next-line no-unused-vars */
    // isMLKDay,
    ...desiredHolidays
  } = currentDate.availableHolidayMatchers;

  const defaultHolidayMatchers = Object.values(desiredHolidays);

  currentDate.setupBusiness({
    holidayMatchers: [
      ...defaultHolidayMatchers,
      isObservedThanksgivingDay,
      isBlackFriday,
      isObservedChristmas,
      isObservedNewYears,
      isObservedNewYearsEveEve,
    ],
  });

  // Package bug: date used must not have h/m/s,etc.
  const shipByDate = currentDate.plusBusiness({
    days: shippingBusinessDays,
  });

  return shipByDate;
};

// In separate module so that it can be mocked in index.test.js
export const getFormattedShipByDate = (shippingBusinessDays, _locale = 'en-us', currentDateTime = DateTime.local()) => {
  const normalizeLocale = (locale) => {
    if (LOCALE_KEYS.includes(_locale)) {
      return toBCP47LocaleTag(locale);
    }

    return 'en-us';
  };

  const locale = normalizeLocale(_locale);

  const shipByDate = getShipByDate(shippingBusinessDays, currentDateTime);

  const formattedShipByDate = shipByDate.setLocale(locale).toLocaleString({
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return formattedShipByDate;
};

export const getFormattedShipByDateWithYear = (
  shippingBusinessDays,
  _locale = 'en-us',
  currentDateTime = DateTime.local(),
) => {
  const normalizeLocale = (locale) => {
    if (LOCALE_KEYS.includes(_locale)) {
      return toBCP47LocaleTag(locale);
    }

    return 'en-us';
  };

  const locale = normalizeLocale(_locale);

  const shipByDate = getShipByDate(shippingBusinessDays, currentDateTime);

  const formattedShipByDate = shipByDate
    .setLocale(locale)
    .toLocaleString({
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
    .replace(/,\s/, ' ');

  return formattedShipByDate;
};
export const getShippingTextWithDateCopy = (shippingText, formattedShipByDate) => {
  if (!shippingText || !formattedShipByDate) {
    return;
  }

  return `${shippingText?.trim()} ${formattedShipByDate}`;
};

export function getShipByDateCopy(businessdays, shippingText, locale) {
  if (businessdays && shippingText) {
    const formattedShipByDate = getFormattedShipByDate(businessdays, locale);

    return getShippingTextWithDateCopy(shippingText, formattedShipByDate);
  }
}

// CUSTOM HOLIDAY MATCHERS

// Friday following fourth Thursday in November
export function isObservedHoliday(date, holidayObj) {
  if (!holidayObj) {
    return false;
  }

  // special handling for new years.
  // if the new years is observed a day before
  // it will fall in the previous year and needs to be adjusted
  if (date.day === 31 && date.month === DECEMBER_MONTH) {
    holidayObj.year += 1;
  }

  const holiday = DateTime.fromObject(holidayObj);

  let observedHoliday = holiday;

  // If it falls on a saturday, subtract one day
  if (holiday.weekday === SATURDAY) {
    observedHoliday = holiday.plus({ days: -1 });
  }
  // If it falls on a Sunday, add 1 day
  else if (holiday.weekday === SUNDAY) {
    observedHoliday = holiday.plus({ days: 1 });
  }

  return +date === +observedHoliday;
}

export const isObservedPresidentsDay = (date) => isObservedHoliday(date, OBSERVED_HOLIDAYS["President's Day"]);

export const isObservedGoodFriday = (date) => isObservedHoliday(date, OBSERVED_HOLIDAYS['Good Friday']);

export const isObservedMemorialDay = (date) => isObservedHoliday(date, OBSERVED_HOLIDAYS['Memorial Day']);

export const isObservedIndependenceDay = (date) => isObservedHoliday(date, OBSERVED_HOLIDAYS['Independence Day']);

export const isObservedLaborDay = (date) => isObservedHoliday(date, OBSERVED_HOLIDAYS['Labor Day']);

export const isObservedThanksgivingDay = (date) => isObservedHoliday(date, OBSERVED_HOLIDAYS['Thanksgiving Day']);

export const isBlackFriday = (date) => isObservedHoliday(date, OBSERVED_HOLIDAYS['Black Friday']);

export const isObservedChristmas = (date) => isObservedHoliday(date, OBSERVED_HOLIDAYS['Christmas']);

export const isObservedNewYears = (date) => isObservedHoliday(date, OBSERVED_HOLIDAYS["New Year's Day"]);

export const isObservedNewYearsEveEve = (date) => isObservedHoliday(date, OBSERVED_HOLIDAYS["New Year's Eve Eve"]);

/**
 * @param {DateTime} input
 */
export const isLeapYear = (input) => {
  const year = input.year;

  return (year % 400 === 0 || year % 100 !== 0) && year % 4 === 0;
};

/**
 * @param {DateTime} input
 * @return boolean
 */
export const isLastDayOfTheYear = (input) => {
  return input.month === 12 && input.day === 31;
};

/**
 * @param {DateTime} input
 * @return boolean
 */
export const isLastDayOfTheMonth = (input) => {
  const dt = isLeapYear(input) ? 1 : 0;
  const store = {
    1: 31,
    2: 28 + dt,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 30,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  return store[input.month] === input.day;
};

/**
 * Returns the nearest date object of 12PM pacific standard time.
 * @param {DateTime} d
 * @param {boolean} ignoreToday - flag variable will return nearest next day 12PM.
 * @returns {Date}
 */
export const getNextDateAt12PM = (d = DateTime.local(), ignoreToday = false) => {
  // Convert to PST time. This is required since we are comparing the hour hand and so forth.
  const input = DateTime.fromObject({
    year: d.year,
    month: d.month,
    day: d.day,
    hour: d.hour,
    minute: d.minute,
    second: d.second,
    millisecond: d.millisecond,
    zone: 'America/Los_Angeles',
  });

  const fetchToday = !ignoreToday && input.hour < 12;
  const year = input.year;
  const month = input.month;
  const day = input.day;

  if (!fetchToday && isLastDayOfTheMonth(input)) {
    const dy = isLastDayOfTheYear(input) ? 1 : 0;

    const date = DateTime.fromObject({
      year: year + dy,
      month: month === 12 ? 1 : month + 1,
      day: 1,
      hour: 12,
      minute: 0,
      second: 0,
      zone: 'America/Los_Angeles',
    });

    return date.toJSDate();
  }

  const t = fetchToday ? 0 : 1;

  const tday = day + t;

  const date = DateTime.fromObject({
    year,
    month,
    day: tday,
    hour: 12,
    minute: 0,
    second: 0,
    zone: 'America/Los_Angeles',
  });

  return date.toJSDate();
};
