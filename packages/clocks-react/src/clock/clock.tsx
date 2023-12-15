import { ZDateTime } from '@zthun/clocks-fn';

import { IZComponentName, IZComponentStyle, IZComponentValue } from '@zthun/fashion-boutique';

export interface IZClock extends IZComponentStyle, IZComponentValue<ZDateTime>, IZComponentName {
  timeZone?: string;
}
