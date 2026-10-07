/**
 * Objetos para jugar. Se dibujan centrados en (0,0) con radio ≈ `r`. La estrella es el icono
 * «star» de Lucide (ISC), el mismo set de glyphFlow. El material sale 70–80 % del bot (tokens
 * `--bot-*`, igual que los sombreros) y el resto es la identidad del objeto; la galleta mezcla su
 * color de galleta con el del bot (`color-mix`) para que siga leyéndose como galleta.
 *
 * Las claves están en inglés (el prototipo traía `estrella`, `pelota`, `galleta`).
 */

export interface GfBotToy {
  label: string;
  /** Radio aproximado. */
  r: number;
  /** SVG del objeto; `id` es el prefijo único para sus degradados. */
  draw: (id: string) => string;
}

export const LUCIDE_STAR = 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z';

export const TV = (t: string): string => `var(--bot-${t})`;
export const TMIX = (c: string, t: string, k: number): string => `fill:${c};fill:color-mix(in srgb, ${c} ${k}%, var(--bot-${t}))`;

export const TOYS = {
  star: { label:'Star', r:12, draw: (id: string): string => `<linearGradient id="${id}-sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:${TV('highlight')}"/><stop offset=".45" style="stop-color:${TV('tertiary')}"/><stop offset="1" style="stop-color:${TV('secondary')}"/></linearGradient>` +
    `<g class="tspin"><path d="${LUCIDE_STAR}" transform="translate(-13.2 -13.2) scale(1.1)" fill="url(#${id}-sg)" style="stroke:${TV('shadow')}" stroke-width="1.7" stroke-linejoin="round"/>` +
    `<path d="M-4.2 -3.6 L-2.6 -6.6" style="stroke:${TV('highlight')}" stroke-width="2" stroke-linecap="round"/></g>` },
  ball: { label:'Ball', r:11, draw: (id: string): string => `<radialGradient id="${id}-bg" cx=".35" cy=".3" r=".8"><stop offset="0" style="stop-color:${TV('highlight')}"/><stop offset=".55" style="stop-color:${TV('primary')}"/><stop offset="1" style="stop-color:${TV('shadow')}"/></radialGradient>` +
    `<g class="tball"><circle r="11" fill="url(#${id}-bg)" style="stroke:${TV('shadow')}" stroke-width="1.2"/>` +
    `<path d="M-11 -1 Q0 -8 11 -1" fill="none" style="stroke:${TV('tertiary')}" stroke-width="3.4"/><path d="M-9.6 5.4 Q0 0 9.6 5.4" fill="none" style="stroke:${TV('secondary')}" stroke-width="3.4"/>` +
    `<ellipse cx="-4" cy="-6" rx="3.6" ry="2.2" style="fill:${TV('highlight')}" opacity=".8" transform="rotate(-25 -4 -6)"/></g>` },
  cookie: { label:'Cookie', r:11, draw: (id: string): string => `<mask id="${id}-bm" maskUnits="userSpaceOnUse" x="-16" y="-16" width="32" height="32"><rect x="-16" y="-16" width="32" height="32" fill="#fff"/><g class="bites" fill="#000"></g></mask>` +
    `<g mask="url(#${id}-bm)"><circle r="11" style="${TMIX('#E5B27A', 'tertiary', 72)};stroke:color-mix(in srgb, #B47A43 70%, var(--bot-shadow))" stroke-width="1.4"/><circle r="7.6" style="${TMIX('#F3CFA0', 'highlight', 70)}" opacity=".7"/>` +
    [[-4, -4, 1.7], [3.4, -5, 1.4], [5, 2.4, 1.8], [-2, 4.2, 1.6], [-6.4, 1.6, 1.2], [1, -.4, 1.1]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .85}" style="${TMIX('#5B331E', 'shadow', 75)}"/>`).join('') + `</g>` }
} as const satisfies Record<string, GfBotToy>;

export type GfBotToyId = keyof typeof TOYS;
