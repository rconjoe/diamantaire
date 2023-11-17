import { isWithinInterval } from 'date-fns';

export function isCurrentTimeWithinInterval(startTime: string, endTime: string): boolean {
  const currentTime = new Date();
  let startDateTime = new Date(startTime);
  let endDateTime = new Date(endTime);

  console.log({
    currentTime,
    startDateTime,
    endDateTime,
  });

  if (!currentTime || !startDateTime || !endDateTime) return false;

  // Ensure startDateTime is before endDateTime
  if (startDateTime > endDateTime) {
    const temp = startDateTime;

    startDateTime = endDateTime;
    endDateTime = temp;
  }

  return isWithinInterval(currentTime, { start: startDateTime, end: endDateTime });
}
