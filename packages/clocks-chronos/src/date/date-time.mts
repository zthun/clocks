/**
 * Represents a value for a date time object.
 */
export type ZDateTime = string | Date | number | null | undefined;

/**
 * Options for performing operations on a {@link ZDateTime} object.
 */
export type ZDateTimeOptions = {
  /**
   * The string format(s) to use in order of priority.
   *
   * If you pass an array for this, then the array should
   * be in order of priority with element 0 as the highest
   * priority.
   */
  format?: string | string[];

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
};
