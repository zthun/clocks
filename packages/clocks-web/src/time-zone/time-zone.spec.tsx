import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZClockComponentModel } from '@zthun/clocks-dom';
import { guessDateTime, userTimeZone } from '@zthun/clocks-fn';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { ZTimeZonePage } from './time-zone-page';
import { ZTimeZonePageComponentModel } from './time-zone-page.cm';

describe('TimeZones Page', () => {
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  const createTestTarget = async () => {
    const element = <ZTimeZonePage />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZTimeZonePageComponentModel);
  };

  afterEach(async () => {
    await _renderer?.destroy?.call(_renderer);
    await _driver?.destroy?.call(_driver);
  });

  type AttributeFactory = (c: ZClockComponentModel) => Promise<string | null>;
  type ClockFactory = (t: ZTimeZonePageComponentModel) => Promise<ZClockComponentModel>;

  const shouldRenderAttribute = async (
    attributeFn: AttributeFactory,
    expected: string | null,
    clockFn: ClockFactory
  ) => {
    // Arrange.
    const target = await createTestTarget();
    const clock = await clockFn(target);
    // Act.
    const actual = await attributeFn(clock);
    // Assert.
    expect(actual).toEqual(expected);
  };

  const shouldRenderTimeZone = shouldRenderAttribute.bind(null, (c) => c.timeZone());

  const shouldRenderTheTime = async (tolerance: number, clockFn: ClockFactory) => {
    // Arrange.
    const target = await createTestTarget();
    const tz = userTimeZone();
    // Act.
    const clock = await clockFn(target);
    const value = await clock.value();
    const expected = new Date().getTime();
    const actual = guessDateTime(value, { timeZone: tz })?.getTime();
    // Assert.
    expect(actual).toBeGreaterThanOrEqual(expected - tolerance);
    expect(actual).toBeLessThanOrEqual(expected + tolerance);
  };

  describe('Clock Settings', () => {
    const factory = (t: ZTimeZonePageComponentModel) => t.analog();

    it('should have time zone', () => shouldRenderTimeZone(userTimeZone(), factory));
    it('should render time', () => shouldRenderTheTime(2000, factory));
  });
});
