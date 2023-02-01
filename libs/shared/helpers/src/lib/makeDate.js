import { DateTime } from 'luxon';
import { toNumber } from './';

const makeDate = ({ month, day, hour, year, minute }) => {
  const dateConfig = {
    ...(year && { year: toNumber(year) }), // optional, defaults to current year
    month: toNumber(month),
    day: toNumber(day),
    hour: toNumber(hour),
    ...(minute && { minute: toNumber(minute) }), // optional minute
    zone: 'America/Los_Angeles',
    numberingSystem: 'beng',
  };

  return DateTime.fromObject(dateConfig);
};

export default makeDate;
