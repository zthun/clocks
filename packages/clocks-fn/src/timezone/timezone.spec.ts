// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { timeZones, userTimeZone } from './timezone.mjs';

describe('Timezone (Node)', () => {
  it('should return the current timezone', () => {
    // Arrange.
    // Act.
    const actual = userTimeZone();
    // Assert.
    expect(actual).toBeTruthy();
  });

  it('should return all supported timezones', () => {
    // Arrange.
    // Act.
    const actual = timeZones();
    // Assert.
    expect(actual.length).toBeGreaterThan(1);
  });
});
