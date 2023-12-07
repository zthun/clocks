// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { culture } from './culture.mjs';

describe('Culture (Node)', () => {
  it('should return the current node locale', () => {
    // Arrange.
    // Act.
    const actual = culture();
    // Assert.
    expect(actual).toBeTruthy();
  });
});
