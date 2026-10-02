import type { BotContext } from './context';

/**
 * La sombra de contacto del sombrero vive DENTRO del cuerpo (recortada por su silueta) pero sigue
 * al sombrero cuadro a cuadro: se mide dónde quedó el sombrero en pantalla y se copia esa matriz.
 */
export function hatShadowSync(ctx: BotContext): void {
  const { hatEls, el } = ctx;
  if (!hatEls?.sdyn || !el.hatShadow.firstChild) return;
  const a = el.hatShadowWrap.getScreenCTM();
  const b = hatEls.sdyn.getScreenCTM();
  if (!a || !b || !a.a) return;
  const m = a.inverse().multiply(b);
  el.hatShadow.setAttribute(
    'transform',
    `matrix(${[m.a, m.b, m.c, m.d, m.e, m.f].map((v) => +v.toFixed(4)).join(' ')})`,
  );
}
