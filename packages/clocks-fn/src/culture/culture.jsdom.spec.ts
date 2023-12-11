// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { culture } from './culture.mjs';

describe('Culture (DOM)', () => {
  it('should return the current node locale', () => {
    // Arrange.
    // Act.
    const actual = culture();
    // Assert.
    expect(actual).toBeTruthy();
  });
});
