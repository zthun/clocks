import * as locale from 'date-fns/locale';
import { keyBy } from 'lodash-es';

/**
 * Lookup codes for date-fns locales.
 *
 * This should not be exported and should only be used internally.
 */
export const LocaleLookup = keyBy(Object.values<Locale>(locale), (l) => l.code!);
