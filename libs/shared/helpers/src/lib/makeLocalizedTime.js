import { toBCP47LocaleTag } from './language';
import { captureException } from '@sentry/nextjs';

/**
 * Formay a datetime in a different timezone.
 * date = Javascript DateTime object
 * userTimezone = Target time zone
 * locale = formatting locale, such as en-US
 */
const makeLocalizedTime = ({ date, userTimezone, locale }) => {
  let localizedDateTime;

  if (!date) {
    return '';
  }

  let intlDateObj = new Intl.DateTimeFormat(toBCP47LocaleTag(locale), {
    timeZone: userTimezone,
    hour: 'numeric',
    minute: '2-digit',
  });

  try {
    localizedDateTime = intlDateObj.format(date);
  } catch (e) {
    // https://docs.sentry.io/clients/javascript/usage/
    captureException(e, { date, userTimezone, locale });

    return '';
  }

  return localizedDateTime;
};

export default makeLocalizedTime;
