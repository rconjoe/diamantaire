import { DateTime } from 'luxon';

const getCurrentDate = () => {
  return DateTime.fromObject({
    zone: 'America/Los_Angeles',
    numberingSystem: 'beng',
  });
};

export default getCurrentDate;
