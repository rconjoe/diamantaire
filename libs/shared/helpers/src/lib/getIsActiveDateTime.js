import { makeDate, getCurrentDate } from './';

const isActiveDateTime = (startDate, endDate) => {
  const currentDate = getCurrentDate();

  return currentDate > makeDate(startDate) && currentDate < makeDate(endDate);
};

export default isActiveDateTime;
