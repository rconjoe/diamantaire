import { isWithinInterval } from 'date-fns';

export function isCurrentTimeWithinInterval(startTime: string, endTime: string): boolean {
  try {
    const currentTime = new Date();
    const startDateTime = new Date(startTime);
    const endDateTime = new Date(endTime);

    // Check if any of the dates are invalid
    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      console.error('Invalid start or end time');

      return false;
    }

    // Check if end time is before start time
    if (endDateTime < startDateTime) {
      console.error('End time is before start time');

      return false;
    }

    return isWithinInterval(currentTime, { start: startDateTime, end: endDateTime });
  } catch (error) {
    console.error('Error in isCurrentTimeWithinInterval:', error);

    return false;
  }
}
