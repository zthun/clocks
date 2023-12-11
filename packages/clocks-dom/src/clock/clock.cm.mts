import { ZCircusComponentModel } from '@zthun/cirque';

export class ZClockComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZClock-root';

  public format(): Promise<string | null> {
    return this.driver.attribute('format');
  }

  public timeZone(): Promise<string | null> {
    return this.driver.attribute('timeZone');
  }

  public culture(): Promise<string | null> {
    return this.driver.attribute('culture');
  }

  public value(): Promise<string | null> {
    return this.driver.attribute('value');
  }

  public name(): Promise<string | null> {
    return this.driver.attribute('name');
  }
}
