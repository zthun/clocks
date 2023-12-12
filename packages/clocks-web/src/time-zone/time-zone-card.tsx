import { formatDateTime } from '@zthun/clocks-fn';
import { ZClockAnalog, ZClockDigital, useDate } from '@zthun/clocks-react';
import {
  IZComponentHeading,
  IZComponentName,
  IZComponentValue,
  IZComponentWidth,
  ZCard,
  ZIconFontAwesome
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import React from 'react';

export interface IZTimezoneCard
  extends IZComponentHeading,
    IZComponentWidth,
    IZComponentName,
    IZComponentValue<string> {}

export function ZTimeZoneCard(props: IZTimezoneCard) {
  const { value, width, widthLg, widthMd, widthSm, widthXs, heading, subHeading, name } = props;

  const avatar = <ZIconFontAwesome name='clock' width={ZSizeFixed.Small} />;
  const current = useDate(1000);
  const zone = formatDateTime(current, { timeZone: value, format: 'xxx' });

  return (
    <ZCard
      className={cssJoinDefined('ZTimeZoneCard-root')}
      avatar={avatar}
      heading={firstDefined(value, heading)}
      subHeading={firstDefined(zone, subHeading)}
      name={name}
      width={width}
      widthLg={widthLg}
      widthMd={widthMd}
      widthSm={widthSm}
      widthXs={widthXs}
    >
      <ZClockAnalog value={current} timeZone={value} name='analog' />
      <ZClockDigital value={current} timeZone={value} format='HH:mm:ss' name='digital' />
    </ZCard>
  );
}
