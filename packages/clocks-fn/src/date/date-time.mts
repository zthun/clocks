/**
 * Represents a value for a date time object.
 */
export type ZDateTime = string | Date | number | null | undefined;

/**
 * Options for performing operations on a {@link ZDateTime} object.
 */
export type ZDateTimeOptions<T> = {
  /**
   * The string format to output.
   */
  format?: string;

  /**
   * A list of supported formats when guessing a date.
   *
   * If this is falsy, then the standard formats in
   * {@link ZDateFormats} is used.
   */
  supportedFormats?: string[];

  /**
   * The culture language to use.
   *
   * If this is not specified, then you can assume
   * that the user's system culture is used.
   */
  culture?: string;

  /**
   * The timezone to force.
   *
   * If this is not specified, then you can assume the
   * user's current timezone.
   */
  timeZone?: string;

  /**
   * An optional fallback value for invalid date formats or bad parsing.
   */
  fallback?: T;
};
