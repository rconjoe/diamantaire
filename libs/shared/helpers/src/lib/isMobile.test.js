import { isMobile } from './';

describe('isMobile() tests', () => {
  it('returns true if view width is 768px and under', () => {
    const mobileWidths = [320, 375, 425, 768];

    mobileWidths.forEach(width => {
      const viewportSpy = { width: jest.fn().mockReturnValue(width) };
      const actual = isMobile({ viewport: viewportSpy });
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  it('returns false if view width is 769px and above', () => {
    const nonMobileWidths = [769, 1025, 1200, 1440, 1920, 1440, 3840];

    nonMobileWidths.forEach(width => {
      const viewportSpy = { width: jest.fn().mockReturnValue(width) };
      const actual = isMobile({ viewport: viewportSpy });
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });
});
