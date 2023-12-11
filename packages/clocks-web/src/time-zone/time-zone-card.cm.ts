import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZClockComponentModel } from '@zthun/clocks-dom';

export class ZTimeZoneCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZTimeZoneCard-root';

  public clock(): Promise<ZClockComponentModel> {
    return ZCircusBy.first(this.driver, ZClockComponentModel);
  }
}
