import { formatDateTime, timeZones, userTimeZone } from '@zthun/clocks-fn';
import { ZClockAnalog, useDate } from '@zthun/clocks-react';
import { ZBox, ZCard, ZChoiceAutocomplete, ZH2, ZStack } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZOrientation, setFirst } from '@zthun/helpful-fn';
import { identity } from 'lodash';
import React, { useMemo, useState } from 'react';

export function ZTimeZonePage() {
  const current = useDate(1000);
  const [timeZone, setTimeZone] = useState<string>(userTimeZone());
  const _timeZone = useMemo(() => [timeZone], [timeZone]);
  const _setTimeZone = setFirst.bind(null, setTimeZone, userTimeZone());
  const _timeZones = useMemo(() => timeZones(), []);

  const subHeading = formatDateTime(current, { timeZone, format: 'xxx' });

  return (
    <ZCard className='ZTimeZonePage-root' heading={timeZone} subHeading={subHeading}>
      <ZStack orientation={ZOrientation.Vertical} gap={ZSizeFixed.Medium}>
        <ZBox width={ZSizeFixed.ExtraSmall}>
          <ZClockAnalog value={current} timeZone={timeZone} name='analog' />
        </ZBox>

        <ZH2>Options</ZH2>

        <ZChoiceAutocomplete
          label='Time Zone'
          name='time-zone'
          value={_timeZone}
          onValueChange={_setTimeZone}
          options={_timeZones}
          identifier={identity}
        />
      </ZStack>
    </ZCard>
  );
}
