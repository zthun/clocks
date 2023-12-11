import { useEffect, useState } from 'react';

/**
 * Uses the current date updated at every interval.
 *
 * @param interval -
 *        The interval to update.  The default is every 45 seconds.
 *
 * @returns
 *        The current date.
 */
export function useDate(interval = 45000) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const counter = setInterval(() => setDate(new Date()), interval);
    return () => clearInterval(counter);
  }, [interval]);

  return date;
}
