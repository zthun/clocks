import { formatDateTime, userTimeZone } from '@zthun/clocks-fn';
import { firstDefined } from '@zthun/helpful-fn';
import { ZClockElement } from './clock.mjs';

export class ZClockAnalogElement extends ZClockElement {
  public static readonly Size = 100;
  public static readonly TickHeight = 8;
  public static readonly TickWidth = 2;
  public static readonly MinuteSecondHeight = 30;
  public static readonly HourHeight = 22;
  public static readonly FaceColor = '#000000';
  public static readonly OutlineColor = '#ffffff';
  public static readonly SecondColor = '#ffff00';

  public constructor() {
    super('analog');
  }

  private createSvgElement(name: string) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
  }

  private createHand(width: number, height: number, color: string) {
    const c = ZClockAnalogElement.Size / 2;
    const [x, y] = [c - width / 2, c - height];

    const hand = this.createSvgElement('rect');
    hand.setAttribute('x', `${x}`);
    hand.setAttribute('y', `${y}`);
    hand.setAttribute('width', `${width}`);
    hand.setAttribute('height', `${height}`);
    hand.setAttribute('fill', color);
    hand.style.transformOrigin = 'center';

    return hand;
  }

  private createClockSecondHand(second: number) {
    const hand = this.createHand(
      ZClockAnalogElement.TickWidth / 2,
      ZClockAnalogElement.MinuteSecondHeight * 1.2,
      ZClockAnalogElement.SecondColor
    );
    hand.setAttribute('name', 'hand-second');
    hand.style.transform = `rotate(${second * 6}deg)`;
    return hand;
  }

  private createClockMinuteHand(minute: number) {
    const hand = this.createHand(
      ZClockAnalogElement.TickWidth,
      ZClockAnalogElement.MinuteSecondHeight,
      ZClockAnalogElement.OutlineColor
    );
    hand.setAttribute('name', 'hand-minute');
    hand.style.transform = `rotate(${minute * 6}deg)`;
    return hand;
  }

  private createClockHourHand(hour: number, minute: number) {
    const hand = this.createHand(
      ZClockAnalogElement.TickWidth,
      ZClockAnalogElement.HourHeight,
      ZClockAnalogElement.OutlineColor
    );
    hand.setAttribute('name', 'hand-hour');
    const r = hour * 30 + 0.5 * minute;
    hand.style.transform = `rotate(${r}deg)`;
    return hand;
  }

  private createClockHourMarker(hour: number) {
    const h = ZClockAnalogElement.TickHeight;
    const w = ZClockAnalogElement.TickWidth;
    const s = ZClockAnalogElement.Size / 2;
    const [x, y] = [s - w / 2, s - h / 2];
    const t = 'translateY(-40px)';
    const r = `rotate(${hour * 30}deg)`;
    const transform = `${r} ${t}`;

    const tick = this.createSvgElement('rect');
    tick.setAttribute('name', `hour-${hour}`);
    tick.setAttribute('x', `${x}`);
    tick.setAttribute('y', `${y}`);
    tick.setAttribute('width', `${w}`);
    tick.setAttribute('height', `${h}`);
    tick.setAttribute('fill', ZClockAnalogElement.OutlineColor);
    tick.style.transform = transform;
    tick.style.transformOrigin = 'center';
    return tick;
  }

  private createCenterGear() {
    const c = ZClockAnalogElement.Size / 2;
    const r = ZClockAnalogElement.Size / 20;
    const gear = this.createSvgElement('circle');
    gear.setAttribute('r', `${r - 2}`);
    gear.setAttribute('cx', `${c}`);
    gear.setAttribute('cy', `${c}`);
    gear.setAttribute('fill', ZClockAnalogElement.OutlineColor);
    return gear;
  }

  private createClockFace() {
    const r = ZClockAnalogElement.Size / 2;
    const face = this.createSvgElement('circle');
    face.setAttribute('r', `${r - 2}`);
    face.setAttribute('cx', `${r}`);
    face.setAttribute('cy', `${r}`);
    face.setAttribute('fill', ZClockAnalogElement.FaceColor);
    face.setAttribute('stroke', ZClockAnalogElement.OutlineColor);
    return face;
  }

  private createClockSvg() {
    const s = `${ZClockAnalogElement.Size}`;

    const svg = this.createSvgElement('svg');
    svg.setAttribute('viewBox', `0 0 ${s} ${s}`);
    svg.style.position = 'relative';
    svg.appendChild(this.createClockFace());

    for (let h = 0; h < 12; ++h) {
      svg.appendChild(this.createClockHourMarker(h));
    }

    // We're going to cheat here and just use the string format to grab our data.
    // We don't care about the milliseconds cause clock faces only have hour, minute
    // and second hands.  Furthermore, we want the 24 hour clock as well.
    const options = {
      format: 'HH,mm,ss',
      timeZone: firstDefined(userTimeZone(), this.timeZone)
    };

    const [hour, minute, second] = formatDateTime(this.value, options).split(',');

    svg.appendChild(this.createClockHourHand(+hour, +minute));
    svg.appendChild(this.createClockMinuteHand(+minute));
    svg.appendChild(this.createClockSecondHand(+second));
    svg.appendChild(this.createCenterGear());

    return svg;
  }

  public render(root: Node): void {
    root.appendChild(this.createClockSvg());
  }
}

customElements.define('z-clock-analog', ZClockAnalogElement);
