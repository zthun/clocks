/**
 * Returns the user's current timezone.
 *
 * @returns
 *        The users current timezone.
 */
export function userTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Returns the list of all supported timezones.
 *
 * @returns
 *        A list of all timezone values.
 */
export function timeZones(): string[] {
  return Intl.supportedValuesOf('timeZone');
}
