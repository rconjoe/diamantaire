import { makeDate } from './';
import { DateTime } from 'luxon';

describe('makeDate()', () => {
  it('takes a dateObject with different types and returns a luxon Date Object', () => {
    const dateObject = {
      day: '23',
      month: '1',
      hour: 12,
    };

    expect(makeDate(dateObject)).toEqual(
      DateTime.fromObject({
        month: 1,
        day: 23,
        hour: 12,
        zone: 'America/Los_Angeles',
        numberingSystem: 'beng',
      })
    );
  });

  it('Applies the optional year param', () => {
    const dateObject = {
      day: '23',
      month: '1',
      hour: 12,
      year: 2019,
    };

    const optionalYearDateObject = {
      day: '23',
      month: '1',
      hour: 12,
    };

    expect(makeDate(dateObject)).toEqual(
      DateTime.fromObject({
        year: 2019,
        month: 1,
        day: 23,
        hour: 12,
        zone: 'America/Los_Angeles',
        numberingSystem: 'beng',
      })
    );
    expect(makeDate(optionalYearDateObject)).toEqual(
      DateTime.fromObject({
        year: new Date().getFullYear(),
        month: 1,
        day: 23,
        hour: 12,
        zone: 'America/Los_Angeles',
        numberingSystem: 'beng',
      })
    );
  });
});
