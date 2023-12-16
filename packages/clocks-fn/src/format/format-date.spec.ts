import { describe, expect, it } from 'vitest';
import { ZDateFormats, formatDateTime } from './format-date.mjs';

describe('Format', () => {
  it('should format to the empty string if the value is undefined with no fallback', () => {
    expect(formatDateTime(undefined)).toEqual('');
  });

  it('should format to the empty string if the value is null with no fallback', () => {
    expect(formatDateTime(null)).toEqual('');
  });

  it('should format to the given timezone', () => {
    // Arrange.
    const timeZone = 'America/Chicago';
    const stamp = '2023-12-07T01:38:00.000Z';
    const expected = '2023-12-06T19:38:00.000-0600';
    const fmt = ZDateFormats.Iso;
    // Act.
    const actual = formatDateTime(stamp, { format: fmt, culture: 'en-US', timeZone });
    // Assert.
    expect(actual).toEqual(expected);
  });

  it('should format to the specified culture', () => {
    // Arrange.
    const culture = 'en-GB';
    const stamp = '2023-12-07T13:52:00.000Z';
    const expected = '07/12/2023, 13:52';
    // Act.
    const actual = formatDateTime(stamp, { culture, timeZone: 'UTC' });
    // Assert.
    expect(actual).toEqual(expected);
  });

  it('should format to the fallback if no valid date can be found for the value', () => {
    // Arrange.
    const stamp = 'lol-wut?';
    const expected = 'Invalid Date';
    // Act.
    const actual = formatDateTime(stamp, { fallback: expected });
    // Assert.
    expect(actual).toEqual(expected);
  });
});
