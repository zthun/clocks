import { IZCircusDriver, IZCircusSetup, ZCircusBy } from '@zthun/cirque';
import { ZCircusSetupRenderer } from '@zthun/cirque-du-react';
import { ZClockComponentModel } from '@zthun/clocks-dom';
import { guessDateTime, userTimeZone } from '@zthun/clocks-fn';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { ZTimeZoneCardComponentModel } from './time-zone-card.cm';
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
  type TimeZoneCardFactory = (t: ZTimeZonePageComponentModel) => Promise<ZTimeZoneCardComponentModel>;

  const shouldRenderAttribute = async (
    attributeFn: AttributeFactory,
    expected: string | null,
    cardFn: TimeZoneCardFactory
  ) => {
    // Arrange.
    const target = await createTestTarget();
    const card = await cardFn(target);
    // Act.
    const clock = await card.digital();
    const actual = await attributeFn(clock);
    // Assert.
    expect(actual).toEqual(expected);
  };

  const shouldRenderName = shouldRenderAttribute.bind(null, (c) => c.name());
  const shouldRenderTimeZone = shouldRenderAttribute.bind(null, (c) => c.timeZone());
  const shouldRenderCulture = shouldRenderAttribute.bind(null, (c) => c.culture());
  const shouldRenderFormat = shouldRenderAttribute.bind(null, (c) => c.format());

  const shouldRenderTheTime = async (tolerance: number, cardFn: TimeZoneCardFactory) => {
    // Arrange.
    const target = await createTestTarget();
    const card = await cardFn(target);
    const tz = userTimeZone();
    // Act.
    const clock = await card.digital();
    const value = await clock.value();
    const expected = new Date().getTime();
    const actual = guessDateTime(value, { timeZone: tz, format: 'HH:mm:ss' })?.getTime();
    // Assert.
    expect(actual).toBeGreaterThanOrEqual(expected - tolerance);
    expect(actual).toBeLessThanOrEqual(expected + tolerance);
  };

  describe('User time zone', () => {
    const factory = (t: ZTimeZonePageComponentModel) => t.user();

    it('should render name', () => shouldRenderName(ZTimeZoneCardComponentModel.NameDigital, factory));
    it('should have time zone', () => shouldRenderTimeZone(userTimeZone(), factory));
    it('should render culture', () => shouldRenderCulture(null, factory));
    it('should render format', () => shouldRenderFormat('HH:mm:ss', factory));
    it('should render time', () => shouldRenderTheTime(2000, factory));
  });

  describe('UTC', () => {
    const factory = (t: ZTimeZonePageComponentModel) => t.utc();

    it('should render name', () => shouldRenderName(ZTimeZoneCardComponentModel.NameDigital, factory));
    it('should have time zone', () => shouldRenderTimeZone('UTC', factory));
    it('should render culture', () => shouldRenderCulture(null, factory));
    it('should render format', () => shouldRenderFormat('HH:mm:ss', factory));
    it('should render time', () => shouldRenderTheTime(2000, factory));
  });
});
