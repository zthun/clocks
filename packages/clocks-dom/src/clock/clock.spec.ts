import { formatDateTime } from '@zthun/clocks-fn';
import { describe, expect, it } from 'vitest';
import { ZClockDigitalElement } from './clock-digital.mjs';

describe('ZClockElement', () => {
  describe('Digital', () => {
    const createTestTarget = () => new ZClockDigitalElement();

    describe('Render', () => {
      it('should add the text of the node to the digital format', () => {
        // Arrange
        const value = new Date().toJSON();
        const format = 'p';
        const timeZone = 'UTC';
        const culture = 'en-GB';
        const expected = formatDateTime(value, { format, timeZone, culture });
        const target = createTestTarget();
        target.value = value;
        target.format = format;
        target.culture = culture;
        target.timeZone = timeZone;
        target.name = 'fun-party';
        target.timeZone = 'UTC';
        target.connectedCallback();
        // Act.
        target.attributeChangedCallback();
        const actual = target.textContent;
        // Assert.
        expect(actual).toEqual(expected);
      });
    });
  });
});
