import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  GfIconComponent,
  SPRING_SNAPPY,
  arrowRightIcon,
  rocketIcon,
  type AnimatedIconDef,
} from 'glyphflow';

@Component({
  selector: 'app-icon-swap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GfIconComponent],
  host: { 'aria-hidden': 'true', '[style.--swap-spring]': 'spring' },
  template: `
    <span class="layer rest">
      <gf-icon [iconDef]="rest()" [size]="16" trigger="manual" />
    </span>
    <span class="layer enter">
      <gf-icon [iconDef]="enter()" [size]="16" trigger="group" />
      <span class="accent"><ng-content select="[accent]" /></span>
    </span>
  `,
  styles: `
    :host {
      position: relative;
      display: inline-block;
      flex: none;
      width: 16px;
      height: 16px;
    }

    .layer {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      transition:
        transform 0.34s var(--swap-spring),
        opacity 0.16s ease;
    }

    .enter {
      transform: translateY(15px) scale(0.8);
      opacity: 0;
    }

    .accent {
      position: absolute;
      inset: -6px;
      display: grid;
      pointer-events: none;
      transform: scale(0.6);
      opacity: 0;
      transition:
        transform 0.34s 0.05s var(--swap-spring),
        opacity 0.16s 0.05s ease;
    }

    :host-context(a:focus-visible) .rest,
    :host-context(button:focus-visible) .rest {
      transform: translateY(-15px) scale(0.8);
      opacity: 0;
    }

    :host-context(a:focus-visible) .enter,
    :host-context(button:focus-visible) .enter,
    :host-context(a:focus-visible) .accent,
    :host-context(button:focus-visible) .accent {
      transform: none;
      opacity: 1;
    }

    /* Hover only where there is hover: on touch, :hover sticks after a tap. */
    @media (hover: hover) {
      :host-context(a:hover) .rest,
      :host-context(button:hover) .rest {
        transform: translateY(-15px) scale(0.8);
        opacity: 0;
      }

      :host-context(a:hover) .enter,
      :host-context(button:hover) .enter,
      :host-context(a:hover) .accent,
      :host-context(button:hover) .accent {
        transform: none;
        opacity: 1;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .layer,
      .accent {
        transition-property: opacity;
        transition-duration: 0.12s;
      }
    }
  `,
})
export class IconSwap {
  readonly rest = input.required<AnimatedIconDef>();
  readonly enter = input.required<AnimatedIconDef>();
  protected readonly spring = SPRING_SNAPPY;
}

// Usage: the accent is projected with [accent] and sits on a 28px box, icon in the middle.
@Component({
  selector: 'app-get-started-button',
  imports: [IconSwap],
  template: `
    <button type="button">
      Get started
      <app-icon-swap [rest]="arrowRightIcon" [enter]="rocketIcon">
        <svg accent viewBox="0 0 28 28" fill="currentColor">
          <circle cx="5.2" cy="23" r="1.25" />
          <circle cx="3.1" cy="25.2" r="0.95" opacity="0.7" />
          <circle cx="1.4" cy="27" r="0.7" opacity="0.45" />
        </svg>
      </app-icon-swap>
    </button>
  `,
  styles: `
    button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
  `,
})
export class GetStartedButton {
  protected readonly arrowRightIcon = arrowRightIcon;
  protected readonly rocketIcon = rocketIcon;
}
