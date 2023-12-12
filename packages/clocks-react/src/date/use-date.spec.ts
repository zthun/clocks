import { IZCircusSetup } from '@zthun/cirque';
import { IZCircusReactHook, ZCircusSetupHook } from '@zthun/cirque-du-react';
import { sleep } from '@zthun/helpful-fn';
import { afterEach, describe, expect, it } from 'vitest';
import { useDate } from './use-date.mjs';

describe('Use Date', () => {
  const tolerance = 500;
  let _hook: IZCircusSetup<IZCircusReactHook<Date, never>>;
  let _driver: IZCircusReactHook<Date, never>;

  const createTestTarget = async (interval?: number) => {
    _hook = new ZCircusSetupHook(() => useDate(interval));
    _driver = await _hook.setup();
    return _driver;
  };

  afterEach(async () => {
    await _hook?.destroy?.call(_hook);
    await _driver?.destroy?.call(_driver);
  });

  it('should return the specific date', async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.current();
    const expected = new Date().getTime();
    // Assert.
    expect(actual.getTime()).toBeGreaterThanOrEqual(expected - tolerance);
    expect(actual.getTime()).toBeLessThanOrEqual(expected + tolerance);
  });

  it('should refresh the date after the interval seconds', async () => {
    // Arrange.
    const interval = 500;
    const target = await createTestTarget(interval);
    const expected = await target.current();
    // Act.
    await sleep(interval + 10);
    const actual = await target.rerender();
    // Assert.
    expect(actual.getTime()).toBeGreaterThan(expected.getTime());
  });
});
