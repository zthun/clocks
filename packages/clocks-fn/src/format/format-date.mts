import { formatInTimeZone } from 'date-fns-tz';
import { culture as culture$ } from '../culture/culture.mjs';
import { LocaleLookup } from '../culture/locale-lookup.mjs';
import { ZDateTime, ZDateTimeOptions } from '../date/date-time.mjs';
import { guessDateTime } from '../guess/guess-date.mjs';
import { userTimeZone } from '../timezone/timezone.mjs';

/**
 * Common formats that do not include the timezone.
 *
 * Shifting dates are dates where the time zone is dependant
 * on the user location when it is used.
 */
export enum ZDateFormats {
  /**
   * Standard {@link https://en.wikipedia.org/wiki/ISO_8601 | ISO-8601} format with date only.
   *
   * Using this should imply midnight user timezone.
   */
  IsoDateOnly = `yyyy-MM-dd`,
  /**
   * Standard {@link https://en.wikipedia.org/wiki/ISO_8601 | ISO-8601} format with time only.
   */
  IsoTimeOnly = `HH:mm:ss.SSS`,
  /**
   * Standard {@link https://en.wikipedia.org/wiki/ISO_8601 | ISO-8601} format without timezone specifier.
   */
  IsoNoTimeZone = `${IsoDateOnly}'T'${IsoTimeOnly}`,
  /**
   * Standard {@link https://en.wikipedia.org/wiki/ISO_8601 | ISO-8601} format.
   */
  Iso = `${IsoNoTimeZone}XX`,
  /**
   * Users local date (locale specific).
   */
  LocalDate = 'P',
  /**
   * User local time (locale specific).
   */
  LocalTime = 'p',
  /**
   * Date and time formatted with user specific locale.
   */
  LocalDateTime = 'Pp'
}

/**
 * Formats a given value.
 *
 * @param value -
 *        The value to format.
 * @param options -
 *        The given options for the format.
 *
 * @returns
 *        If value is null or undefined, then the empty string is returned.
 *        If value is a string, then the date is guessed from the string and
 *        reformatted to the format specified by options.  Otherwise,
 *        the date or number specified by value is formatted to the culture,
 *        timezone, and format specified in the options.
 */
export function formatDateTime(value: ZDateTime, options: ZDateTimeOptions<string> = {}): string {
  const {
    format = ZDateFormats.LocalDateTime,
    culture = culture$(),
    timeZone = userTimeZone(),
    fallback = ''
  } = options;

  let date: Date | number | null | undefined;

  if (typeof value === 'string') {
    date = guessDateTime(value, { ...options, fallback: null });
  } else {
    date = value;
  }

  if (date == null) {
    return fallback;
  }

  return formatInTimeZone(date, timeZone, format, { locale: LocaleLookup[culture] });
}
