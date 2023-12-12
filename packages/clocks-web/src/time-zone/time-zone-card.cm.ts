import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZClockComponentModel } from '@zthun/clocks-dom';

export class ZTimeZoneCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZTimeZoneCard-root';
  public static readonly NameDigital = 'digital';
  public static readonly NameAnalog = 'analog';

  public analog(): Promise<ZClockComponentModel> {
    return ZCircusBy.first(this.driver, ZClockComponentModel, ZTimeZoneCardComponentModel.NameAnalog);
  }

  public digital(): Promise<ZClockComponentModel> {
    return ZCircusBy.first(this.driver, ZClockComponentModel, ZTimeZoneCardComponentModel.NameDigital);
  }
}
