import { FACES, isMochiNight } from '../data/faces';
import { accXMarkup, fxBackMarkup, fxInMarkup, fxOutMarkup } from '../data/fx';
import { nubeIn } from '../data/kawaii';
import { mochiSkin, mochiTuft } from '../data/mochi';
import { isFant } from '../data/fantasma';
import { isGato } from '../data/gato';
import { isPulpo } from '../data/pulpo';
import { botTokens, type GfBotTokens } from '../data/tokens';
import type { BotContext, BotFaceElements } from './context';
import { accMarkup, faceMarkup, faceOf, ownFace } from './face';
import { measureSilhouette } from './silhouette';
import { shapeD, withHat } from './shape-view';
import { startShapeFx } from './shape-fx';

/**
 * Construcción de la forma: lo que se rehace cada vez que cambia la forma, la piel, el estilo de
 * cara, el sombrero o el accesorio. Escribe el contorno, la cara, los fx y las capas de la piel, y
 * deja listas las referencias (`ctx.fe`) y las capas que giran con la pose (`ctx.poseEls`).
 */

const TOKEN_KEYS = ['base', 'primary', 'secondary', 'tertiary', 'highlight', 'shadow', 'edge', 'glow', 'stroke'] as const;

/** El efecto de contorno (glow, pixel, glitch, bug) va encima de cualquier piel y cualquier forma. */
export function applyFx(ctx: BotContext): void {
  ctx.svg.dataset['fx'] = ctx.fxVar || '';
  ctx.el.breath.style.filter =
    ctx.fxVar === 'pixel' ? `url(#${ctx.id}-pix)` : ctx.fxVar === 'glitch' ? `url(#${ctx.id}-glitch)` : '';
}

/** Familia de la piel: el prefijo del nombre no sirve («neu» empieza con n y «gel» con g). */
function skinFamily(ctx: BotContext): string {
  const v = ctx.mochiVar;
  return ctx.shape.skin !== 'mochi'
    ? ''
    : isGato(v)
      ? 'gato'
      : isFant(v)
        ? 'fant'
        : isPulpo(v)
          ? 'pulpo'
          : isMochiNight(v)
            ? 'night'
            : 'light';
}

export function buildShape(ctx: BotContext): void {
  const { el, svg, id: p } = ctx;
  const sh = withHat(ctx, ctx.shape);
  const d = shapeD(sh);
  const mochi = sh.skin === 'mochi';

  // «Neumórfico sin boca» usa los mismos ojos: toma el CSS de la cara neumórfica (o la propia si la forma ya tiene ojos así)
  const fk = faceOf(ctx, sh);
  svg.dataset['face'] = fk === 'neunm' ? (FACES[ownFace(sh)].eye === 'nrect' ? ownFace(sh) : 'neu') : fk;
  ctx.shapeAnims.forEach((a) => a.cancel());
  ctx.shapeAnims = [];
  svg.dataset['skin'] = sh.skin || '';
  svg.dataset['shape'] = sh.id;
  el.clip.setAttribute('d', d);
  el.face.innerHTML = faceMarkup(ctx, sh);
  el.fxIn.innerHTML = sh.fxIn ? sh.fxIn(p) : '';
  el.fxOut.innerHTML = sh.fxOut ? sh.fxOut(p) : '';
  el.fxBack.innerHTML = sh.fxBack ? sh.fxBack(p) : '';
  if (sh.id === 'nNube') el.fxIn.innerHTML += nubeIn(p);
  el.fxIn.innerHTML += fxInMarkup(p, sh);
  el.fxOut.innerHTML +=
    fxOutMarkup(p, sh) +
    (ctx.accX
      ? accXMarkup(ctx.accX, { cy: sh.cy, d, faceY: sh.faceY, hatX: sh.hatX }, p, measureSilhouette(d, sh.faceY))
      : '');
  el.fxBack.innerHTML += fxBackMarkup(p);
  applyFx(ctx);
  el.accBack.innerHTML = accMarkup(ctx, sh);
  el.accFront.innerHTML = accMarkup(ctx, sh);
  svg.dataset['mvar'] = mochi ? ctx.mochiVar : '';
  {
    // los sombreros heredan la paleta de la piel
    const T: GfBotTokens | null = mochi ? botTokens(ctx.mochiVar) : null;
    for (const k of TOKEN_KEYS) {
      const v = T?.[k];
      if (v) svg.style.setProperty('--bot-' + k, v);
      else svg.style.removeProperty('--bot-' + k);
    }
  }
  svg.dataset['mfam'] = skinFamily(ctx);
  {
    const k = mochi ? mochiSkin(ctx.mochiVar, p) : { back: '', paint: '', over: '' };
    const foot =
      mochi && sh.footPaint
        ? mochiTuft(ctx.mochiVar, p, sh.footPaint, true) +
          (ctx.mochiVar === 'line'
            ? `<path d="${sh.footArc}" fill="none" stroke="#2E2896" stroke-width="7" stroke-linecap="round"/>`
            : '')
        : '';
    ctx.q('.skinBack')!.innerHTML = k.back;
    ctx.q('.skinPaint')!.innerHTML = k.paint + foot;
    ctx.q('.skinOver')!.innerHTML = k.over;
  }
  const fe: BotFaceElements = {
    eyes: ctx.q('.eyes'), eyeList: ctx.qa('.eye'), closed: ctx.qa('.closed'), happy: ctx.qa('.happy'),
    squeeze: ctx.qa('.squeeze'), bubble: ctx.q('.bubble'), browA: ctx.qa('.browA'), browS: ctx.qa('.browS'),
    tears: ctx.qa('.tear'), sweat: ctx.q('.sweat'), faceFx: ctx.q('.faceFx'), cheeks: ctx.qa('.cheek'),
    line: ctx.qa('.line'), half: ctx.qa('.half'), ring: ctx.qa('.ring'), cross: ctx.qa('.cross'),
    mouths: ctx.qa('.mouths [data-m]'), ants: ctx.qa('.ant'), antTips: ctx.qa('.ant-tip'),
    mflow: ctx.q('.mflow'), mhalo: ctx.q('.mhalo'),
  };
  ctx.fe = fe;
  // en el robot el reflejo va DEBAJO de la cara: la luz no puede pasar por encima de su pantalla
  if (sh.skin === 'robot') el.flip.insertBefore(el.light, el.face);
  else el.flip.appendChild(el.light);
  ctx.q('.vigG')?.setAttribute('cy', String(sh.cy));
  const yaws = ctx.qa('.face .yaw');
  ctx.feats = yaws.map((n) => ({ x: Number(n.dataset['x']), y: Number(n.dataset['y']) }));
  ctx.poseEls = [
    ...yaws, el.clip, ...ctx.qa('.side'), el.flip, el.light, el.accBack, el.accFront,
    ...ctx.qa('.accBack .acc'), ...ctx.qa('.accFront .acc'),
  ];
  [el.clip, el.flip, el.light, el.accBack, el.accFront].forEach((n) => (n.style.transformOrigin = `100px ${sh.cy}px`));
  const transition = ctx.reduce ? '' : `transform ${ctx.spring.duration}ms ${ctx.spring.easing}, opacity 180ms ease`;
  ctx.poseEls.forEach((n) => (n.style.transition = transition));
  startShapeFx(ctx);
}
