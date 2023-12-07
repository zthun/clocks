import { parse } from 'date-fns';
import { culture as culture$ } from '../culture/culture.mjs';
import { LocaleLookup } from '../culture/locale-lookup.mjs';
import { ZDateTime, ZDateTimeOptions } from '../date/date-time.mjs';
import { ZDateFormats } from '../format/format-date.mjs';

/**
 * Parses a string value back to a date format.
 *
 * @param value -
 *        The value to parse
 * @param options -
 *        The options to parse with.  The most important option here is format.  If the format
 *        is not specified, then the standard zoned ISO 8601 format is used.
 *
 * @returns
 *        The date object parsed from the value.  Returns null
 *        if the value parsed with the given options results in an
 *        invalid date.
 */
export function parseDateTime(value: ZDateTime, options: ZDateTimeOptions<Date | null> = {}): Date | null {
  const { fallback = null } = options;

  if (value == null) {
    return fallback;
  }

  if (typeof value === 'number') {
    return new Date(value);
  }

  if (value instanceof Date) {
    return value;
  }

  const { format = ZDateFormats.Iso, culture = culture$() } = options;
  const result = parse(value, format, new Date(), { locale: LocaleLookup[culture] });
  return isNaN(result.getTime()) ? fallback : result;
}
