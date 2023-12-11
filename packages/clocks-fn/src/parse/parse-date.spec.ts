import { describe, expect, it } from 'vitest';
import { ZDateFormats } from '../format/format-date.mjs';
import { parseDateTime } from './parse-date.mjs';

describe('Parse', () => {
  it('should parse the correct date', () => {
    // Arrange.
    const expected = new Date();
    // Act.
    const actual = parseDateTime(expected.toJSON());
    // Assert.
    expect(actual?.getTime()).toEqual(expected.getTime());
  });

  it('should return null if value is undefined with no fallback', () => {
    expect(parseDateTime(undefined)).toBeNull();
  });

  it('should return fallback if value is undefined', () => {
    const expected = new Date();
    expect(parseDateTime(undefined, { fallback: expected })).toBe(expected);
  });

  it('should return null if value is null', () => {
    expect(parseDateTime(null)).toBeNull();
  });

  it('should return fallback if value is null', () => {
    const expected = new Date();
    expect(parseDateTime(undefined, { fallback: expected })).toBe(expected);
  });

  it('should return the date time if the timestamp is passed', () => {
    const expected = new Date().getTime();
    expect(parseDateTime(expected)?.getTime()).toEqual(expected);
  });

  it('should return the date object', () => {
    const expected = new Date();
    expect(parseDateTime(expected)).toBe(expected);
  });

  it('should return null if the string value does not match the format', () => {
    expect(parseDateTime('2020-10-14T11', { format: ZDateFormats.Iso })).toBeNull();
  });

  it('should return null if the string value only partially matches the format', () => {
    expect(parseDateTime('2022-10-14T11:22:30.333', { format: ZDateFormats.IsoDateOnly })).toBeNull();
  });

  it('should parse to the users timezone at midnight for a date only format', () => {
    const expected = new Date(2023, 9, 14, 0, 0, 0, 0).toJSON();
    expect(parseDateTime('2023-10-14', { format: ZDateFormats.IsoDateOnly })?.toJSON()).toEqual(expected);
  });

  it('should parse to the users timezone if no timezone is specified in the format', () => {
    const expected = new Date(2023, 9, 14, 4, 52, 30, 224).toJSON();
    const format = ZDateFormats.IsoNoTimeZone;
    expect(parseDateTime('2023-10-14T04:52:30.224', { format })?.toJSON()).toEqual(expected);
  });

  it('should read the timezone on the date and format appropriately', () => {
    const expected = '2023-10-14T04:52:30.224Z';
    expect(parseDateTime(expected, { format: ZDateFormats.Iso })?.toJSON()).toEqual(expected);
  });

  it('should return the fallback if the value passed is not a valid date', () => {
    const fallback = new Date();
    expect(parseDateTime('lol-wut?', { fallback })).toBe(fallback);
  });
});
