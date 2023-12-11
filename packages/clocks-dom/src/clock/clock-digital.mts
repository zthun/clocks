import { culture, formatDateTime, userTimeZone } from '@zthun/clocks-fn';
import { firstDefined } from '@zthun/helpful-fn';
import { ZClockElement } from './clock.mjs';

export class ZClockDigitalElement extends ZClockElement {
  public constructor() {
    super('digital');
  }

  public render(root: Node): void {
    const options = {
      format: firstDefined('p', this.format),
      culture: firstDefined(culture(), this.culture),
      timeZone: firstDefined(userTimeZone(), this.timeZone)
    };
    const span = document.createElement('span');
    span.textContent = formatDateTime(this.value, options);
    root.appendChild(span);
  }
}

customElements.define('z-clock-digital', ZClockDigitalElement);
