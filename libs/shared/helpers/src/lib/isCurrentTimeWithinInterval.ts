import { isWithinInterval } from 'date-fns';

export function isCurrentTimeWithinInterval(startTime: string, endTime: string): boolean {
  const currentTime = new Date();
  const startDateTime = new Date(startTime);
  const endDateTime = new Date(endTime);

  console.log({
    currentTime,
    startDateTime,
    endDateTime,
  });

  if (!currentTime || !startDateTime || !endDateTime) return false;

  return isWithinInterval(currentTime, { start: startDateTime, end: endDateTime });
}
