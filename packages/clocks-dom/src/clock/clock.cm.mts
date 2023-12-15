import { ZCircusComponentModel } from '@zthun/cirque';

export class ZClockComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZClock-root';

  public timeZone(): Promise<string | null> {
    return this.driver.attribute('timeZone');
  }

  public value(): Promise<string | null> {
    return this.driver.attribute('value');
  }
}
