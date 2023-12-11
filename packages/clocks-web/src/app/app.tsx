/* istanbul ignore file --@preserve */
import {
  ZBannerMain,
  ZCaption,
  ZFashionThemeContext,
  ZH1,
  ZImageSource,
  ZNotFound,
  ZRoute,
  ZRouteMap,
  ZRouter
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { createDarkTheme } from '@zthun/fashion-theme';
import React from 'react';
import { ZTimeZonePage } from '../time-zone/time-zone-page';

const darkTheme = createDarkTheme();

export function ZClocksApp() {
  const avatar = <ZImageSource src='svg/clocks.svg' height={ZSizeFixed.Medium} />;
  const prefix = (
    <div className='ZClocksApp-description'>
      <ZH1 compact>Clocks</ZH1>
      <ZCaption compact>When are you?</ZCaption>
    </div>
  );

  return (
    <ZRouter>
      <ZFashionThemeContext.Provider value={darkTheme}>
        <ZBannerMain avatar={avatar} prefix={prefix}>
          <ZRouteMap>
            <ZRoute path='' element={<ZTimeZonePage />} />
            <ZRoute path='*' element={<ZNotFound />} />
          </ZRouteMap>
        </ZBannerMain>
      </ZFashionThemeContext.Provider>
    </ZRouter>
  );
}
