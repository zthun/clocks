import { IZClockElement, IZClockOptions, ZClockDigitalElement } from '@zthun/clocks-dom';
import { ZDateFormats, formatDateTime } from '@zthun/clocks-fn';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { useMemo } from 'react';
import { IZClock } from './clock';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-clock-digital']: IZClockOptions & IZClockElement & React.HTMLAttributes<HTMLProps<ZClockDigitalElement>>;
    }
  }
}

export function ZClockDigital(props: IZClock) {
  const { className, value, timeZone, format, culture, name } = props;
  const date = useMemo(() => formatDateTime(value, { format: ZDateFormats.Iso, timeZone: 'UTC' }), [value]);

  return (
    <z-clock-digital
      className={cssJoinDefined('ZClock-root', className)}
      title={date}
      value={date}
      name={name}
      timeZone={timeZone}
      format={format}
      culture={culture}
      data-name='sample'
    />
  );
}
