import { ZDateTime, ZDateTimeOptions } from '../date/date-time.mjs';
import { ZDateFormats } from '../format/format-date.mjs';
import { parseDateTime } from '../parse/parse-date.mjs';

/**
 * Similar to {@link parseDateTime} but tries multiple supported formats.
 *
 * @param value -
 *        The value to parse that may result in a date.
 * @param options -
 *        The options for guessing the date.  These will be forwarded to parse
 *        for processing.
 */
export function guessDateTime(value: ZDateTime, options: ZDateTimeOptions<Date | null> = {}): Date | null {
  const { fallback = null } = options;

  if (value == null) {
    return fallback;
  }

  const { supportedFormats = Object.values(ZDateFormats) } = options;

  for (const fmt of supportedFormats) {
    const inner = { ...options };
    inner.format = fmt;
    const result = parseDateTime(value, inner);

    if (result != null) {
      return result;
    }
  }

  return fallback;
}
