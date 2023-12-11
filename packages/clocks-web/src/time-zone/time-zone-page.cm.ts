import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZTimeZoneCardComponentModel } from './time-zone-card.cm';

export class ZTimeZonePageComponentModel extends ZCircusComponentModel {
  public static readonly TimeZoneUser = 'user';
  public static readonly TimeZoneUtc = 'utc';
  public static readonly Selector = '.ZTimeZonePage-root';

  public user(): Promise<ZTimeZoneCardComponentModel> {
    return ZCircusBy.first(this.driver, ZTimeZoneCardComponentModel, ZTimeZonePageComponentModel.TimeZoneUser);
  }

  public utc(): Promise<ZTimeZoneCardComponentModel> {
    return ZCircusBy.first(this.driver, ZTimeZoneCardComponentModel, ZTimeZonePageComponentModel.TimeZoneUtc);
  }
}
