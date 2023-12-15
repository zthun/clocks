import { userTimeZone } from '@zthun/clocks-fn';
import { describe, expect, it } from 'vitest';
import { ZClockAnalogElement } from './clock-analog.mjs';

describe('ZClockElement', () => {
  describe('Analog', () => {
    const createTestTarget = () => new ZClockAnalogElement();

    const shouldRotate = (expected: number, value: Date, hand: 'hour' | 'minute' | 'second') => {
      // Arrange
      const target = createTestTarget();
      target.value = value.toJSON();
      target.timeZone = userTimeZone();
      target.name = 'analog-clock';
      target.connectedCallback();
      // Act.
      target.attributeChangedCallback();
      const hour = target.querySelector<SVGElement>(`[name="hand-${hand}"]`);
      const actual = hour?.style.transform;
      // Assert.
      expect(actual).toContain(expected);
    };

    describe('Render', () => {
      it('should set the hour rotate 30 degrees for each hour plus .5 degrees for each minute', () => {
        const value = new Date();
        value.setHours(10);
        value.setMinutes(46);
        shouldRotate(323, value, 'hour');
      });

      it('should set the minute rotation 6 degrees each', () => {
        const value = new Date();
        value.setMinutes(32);
        shouldRotate(192, value, 'minute');
      });

      it('should set the second rotation 6 degrees each', () => {
        const value = new Date();
        value.setSeconds(47);
        shouldRotate(282, value, 'second');
      });
    });
  });
});
