import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZClockComponentModel } from '@zthun/clocks-dom';
import { ZChoiceComponentModel } from '@zthun/fashion-boutique';

export class ZTimeZonePageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZTimeZonePage-root';

  public analog(): Promise<ZClockComponentModel> {
    return ZCircusBy.first(this.driver, ZClockComponentModel, 'analog');
  }

  public async value(): Promise<string> {
    const value = await this.driver.select('.ZTimeZonePage-value');
    return value.text();
  }

  public async culture(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'culture');
  }

  public async format(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'format');
  }

  public async timeZone(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, 'time-zone');
  }
}
