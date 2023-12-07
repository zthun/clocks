/**
 * Returns the users current culture (locale).
 *
 * @returns
 *        The current locale.
 */
export function culture() {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  return locale;
}
