import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZClockComponentModel } from '@zthun/clocks-dom';

export class ZTimeZonePageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZTimeZonePage-root';

  public analog(): Promise<ZClockComponentModel> {
    return ZCircusBy.first(this.driver, ZClockComponentModel, 'analog');
  }
}
