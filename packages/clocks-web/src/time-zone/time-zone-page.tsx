import { userTimeZone } from '@zthun/clocks-fn';
import { ZGrid, ZStack } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import React, { useMemo } from 'react';
import { ZTimeZoneCard } from './time-zone-card';

export function ZTimeZonePage() {
  const current = useMemo(() => userTimeZone(), []);

  return (
    <ZStack className='ZTimeZonePage-root' gap={ZSizeFixed.ExtraLarge}>
      <ZGrid gap={ZSizeFixed.Small} columns='1fr 1fr' columnsSm={'1fr'}>
        <ZTimeZoneCard value={current} name='user' />
        <ZTimeZoneCard value='UTC' name='utc' />
      </ZGrid>
    </ZStack>
  );
}
