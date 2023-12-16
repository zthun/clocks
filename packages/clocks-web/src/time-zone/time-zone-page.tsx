import { ZDateFormats, culture, cultures, formatDateTime, timeZones, userTimeZone } from '@zthun/clocks-fn';
import { ZClockAnalog, useDate } from '@zthun/clocks-react';
import { ZBox, ZCard, ZChoiceAutocomplete, ZH2, ZH3, ZStack } from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import { ZHorizontalAnchor, ZOrientation, setFirst } from '@zthun/helpful-fn';
import { identity } from 'lodash-es';
import React, { useMemo, useState } from 'react';

export function ZTimeZonePage() {
  const current = useDate(1000);
  const [timeZone, setTimeZone] = useState<string>(userTimeZone());
  const _timeZone = useMemo(() => [timeZone], [timeZone]);
  const _setTimeZone = setFirst.bind(null, setTimeZone, userTimeZone());
  const _timeZones = useMemo(() => timeZones(), []);
  const [format, setFormat] = useState<string>(ZDateFormats.LocalDateTime);
  const _format = useMemo(() => [format], [format]);
  const _setFormat = setFirst.bind(null, setFormat, ZDateFormats.LocalDateTime);
  const _formats = Object.values(ZDateFormats);
  const [locale, setLocale] = useState<string>(culture());
  const _culture = useMemo(() => [locale], [locale]);
  const _setCulture = setFirst.bind(null, setLocale, culture());
  const _cultures = cultures();

  const subHeading = formatDateTime(current, { timeZone, format: `'UTC' xxx` });
  const formatted = formatDateTime(current, { timeZone, format, culture: locale });

  return (
    <ZCard className='ZTimeZonePage-root' heading={timeZone} subHeading={subHeading}>
      <ZStack orientation={ZOrientation.Vertical} gap={ZSizeFixed.Medium} justifyContent='center'>
        <ZBox width={ZSizeVaried.Full} justification={ZHorizontalAnchor.Center}>
          <ZBox width={ZSizeFixed.ExtraSmall} margin={{ x: ZSizeVaried.Fit, bottom: ZSizeFixed.Large }}>
            <ZClockAnalog value={current} timeZone={timeZone} name='analog' />
          </ZBox>

          <ZH3 className='ZTimeZonePage-value' compact>
            {formatted}
          </ZH3>
        </ZBox>

        <ZH2 compact>Options</ZH2>

        <ZChoiceAutocomplete
          label='Time Zone'
          name='time-zone'
          value={_timeZone}
          indelible
          onValueChange={_setTimeZone}
          options={_timeZones}
          identifier={identity}
        />

        <ZChoiceAutocomplete
          label='Culture'
          name='culture'
          value={_culture}
          indelible
          onValueChange={_setCulture}
          options={_cultures}
          identifier={identity}
        />

        <ZChoiceAutocomplete
          label='Format'
          name='format'
          value={_format}
          indelible
          onValueChange={_setFormat}
          options={_formats}
          identifier={identity}
        />
      </ZStack>
    </ZCard>
  );
}
