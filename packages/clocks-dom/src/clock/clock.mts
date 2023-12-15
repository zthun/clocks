import { firstDefined } from '@zthun/helpful-fn';

export interface IZClockOptions {
  timeZone?: string | null;
}

export interface IZClockElement {
  value?: string | null;
  name?: string | null;
}

export abstract class ZClockElement extends HTMLElement implements IZClockElement, IZClockOptions {
  public static get observedAttributes() {
    return ['value', 'format', 'culture', 'timeZone', 'name'];
  }

  public constructor(public readonly kind: string) {
    super();
  }

  public get value(): string | null {
    return this.getAttribute('value');
  }

  public set value(value: string) {
    this.setAttribute('value', value);
  }

  public get name(): string | null {
    return this.getAttribute('name');
  }

  public set name(value: string) {
    this.setAttribute('name', value);
  }

  public get timeZone(): string | null {
    return this.getAttribute('timeZone');
  }

  public set timeZone(value: string) {
    this.setAttribute('timeZone', value);
  }

  public connectedCallback() {
    this.classList.add('ZClock-root');
    this.classList.add(`ZClock-${this.kind}`);
    this.setAttribute('data-kind', this.kind);
  }

  public attributeChangedCallback() {
    this.childNodes.forEach((ch) => this.removeChild(ch));
    this.setAttribute('data-name', firstDefined('', this.name));
    this.render(this);
  }

  public abstract render(root: Node): void;
}
