import { isWithinInterval } from 'date-fns';

export function isCurrentTimeWithinInterval(startTime: string, endTime: string): boolean {
  if (!startTime || !endTime) return false;

  const currentTime = new Date();
  let startDateTime = new Date(startTime);
  let endDateTime = new Date(endTime);

  // Ensure startDateTime is before endDateTime
  if (startDateTime > endDateTime) {
    const temp = startDateTime;

    startDateTime = endDateTime;
    endDateTime = temp;
  }

  return isWithinInterval(currentTime, { start: startDateTime, end: endDateTime });
}
