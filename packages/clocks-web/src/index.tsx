/* istanbul ignore file --@preserve */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ZClocksApp } from './app/app';

const container = createRoot(document.getElementById('zthunworks-clocks')!);

container.render(
  <React.StrictMode>
    <ZClocksApp />
  </React.StrictMode>
);
