// Familia `folder` del catálogo curado (30 iconos).
//
// Extraído de curated-icons.ts sin tocar una línea de coreografía. Que el movimiento no se
// movió lo verifica `npm run curated:lock:check` contra curated-choreography.lock.json.
import { AnimatedIconDef } from '../animated-icon.model';
import { EASE, SPRING_OUT, rotateSeq, scaleSeq, moveYSeq, track, burst, strokeDraw, icon } from '../choreography';
import { folderShapes, folderArchiveShapes, folderBookmarkShapes, folderCheckShapes, folderClockShapes, folderClosedShapes, folderCodeShapes, folderCogShapes, folderDotShapes, folderDownShapes, folderGit2Shapes, folderGitShapes, folderHeartShapes, folderInputShapes, folderKanbanShapes, folderKeyShapes, folderLockShapes, folderMinusShapes, folderOpenDotShapes, folderOpenShapes, folderOutputShapes, folderPenShapes, folderPlusShapes, folderRootShapes, folderSearch2Shapes, folderSearchShapes, folderSymlinkShapes, folderSyncShapes, folderTreeShapes, folderUpShapes, folderXShapes } from '../animated-icons.shapes';

const FOLDER_BOUNCE = /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.8, 0]), 520, { easing: SPRING_OUT });

const FOLDER_GEAR_SPIN = /* @__PURE__ */ [
  { transform: 'scale(1) rotate(0deg)' },
  { transform: 'scale(1.15) rotate(360deg)' },
  { transform: 'scale(1) rotate(720deg)' },
];

/** Mismo criterio que `server-cog`/`shield-cog`/`calendar-cog`: el engrane gira, la carpeta se queda quieta. */
const FOLDER_COG_WOBBLE = /* @__PURE__ */ [
  { transform: 'scale(1) rotate(0deg)', offset: 0 },
  { transform: 'scale(1.15) rotate(360deg)', offset: 0.31 },
  { transform: 'scale(1) rotate(720deg)', offset: 0.62 },
  { transform: 'scale(1) rotate(705deg)', offset: 0.78 },
  { transform: 'scale(1) rotate(720deg)', offset: 1 },
];

/**
 * La carpeta a secas. Mismo salto que `folder-open` y que las otras 29: se levanta y asienta con el
 * resorte de la familia. No lleva nada más porque no hay nada más — una sola figura, y qué hace el
 * cuerpo ya lo dice el criterio de sus hermanas.
 */
export const folderIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderShapes, {
    default: { root: FOLDER_BOUNCE },
  });

/** Carpeta que se abre y levanta. */
export const folderOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderOpenShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.8, 0]), 520, { easing: SPRING_OUT }),
    },
  });

export const folderArchiveIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderArchiveShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 260 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 340 }),
      },
    },
    /** Igual que el default; al terminar, el candado hace un último "clic" (se aprieta y suelta). */
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: '0', offset: 0 },
            { transform: 'scale(1.12)', opacity: '1', offset: 0.22 },
            { transform: 'scale(1)', offset: 0.33 },
            { transform: 'scale(1)', offset: 0.6 },
            { transform: 'scale(1, 0.6)', offset: 0.78 },
            { transform: 'scale(1)', offset: 1 },
          ],
          900,
          { delay: 260, origin: '15px 19px' },
        ),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 260 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 340 }),
      },
    },
  });

export const folderBookmarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderBookmarkShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 260 }) },
    },
    /** Igual que el default; al terminar, el listón ondea una vez y regresa. */
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'rotate(0deg)', offset: 0.33 },
            { transform: 'rotate(-8deg)', offset: 0.65 },
            { transform: 'rotate(0deg)', offset: 1 },
          ],
          900,
          { delay: 260, origin: '12px 6px' },
        ),
      },
    },
  });

export const folderCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderCheckShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 260 }) },
    },
    /** Igual que el default; al terminar, la palomita "confirma" con un rebote y regresa. */
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)', offset: 0.31 },
            { transform: 'scale(1.3)', offset: 0.6 },
            { transform: 'scale(1)', offset: 1 },
          ],
          900,
          { delay: 260, origin: '13px 15px' },
        ),
      },
    },
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Mismo criterio de `calendar-clock`/`clipboard-clock`: el reloj respira y la manecilla da un tic. */
export const folderClockIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderClockShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 500, { delay: 260, origin: '16px 16px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 30, 0]), 620, { delay: 300, origin: '16px 16px' }),
      },
    },
    /** Igual que el default; al terminar el tic, la manecilla da una vuelta completa y regresa a la hora. */
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 500, { delay: 260, origin: '16px 16px' }),
        0: /* @__PURE__ */ track(
          [
            { transform: 'rotate(0deg)', offset: 0 },
            { transform: 'rotate(30deg)', offset: 0.25 },
            { transform: 'rotate(0deg)', offset: 0.44 },
            { transform: 'rotate(0deg)', offset: 0.55 },
            { transform: 'rotate(360deg)', offset: 1 },
          ],
          1400,
          { delay: 300, origin: '16px 16px' },
        ),
      },
    },
  });

/** La tapa baja de y=6 —pegada al borde superior del cuerpo— a su sitio en y=10, descubriéndolo. */
const FOLDER_LID_SLIDE = /* @__PURE__ */ [{ transform: 'translateY(-4px)' }, { transform: 'translateY(0px)' }];

export const folderClosedIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderClosedShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: { 1: /* @__PURE__ */ track(FOLDER_LID_SLIDE, 340, { easing: SPRING_OUT, delay: 260, fill: 'backwards' }) },
    },
    /** Igual que el default; al terminar, el pliegue se hunde un poco (como si se sellara) y regresa. */
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translateY(0)', offset: 0.33 },
            { transform: 'translateY(2px)', offset: 0.65 },
            { transform: 'translateY(0)', offset: 1 },
          ],
          900,
          { delay: 260 },
        ),
      },
    },
  });

/** Igual que el default; al terminar, `<` y `>` se separan cada uno por su lado y regresan. */
export const folderCodeIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderCodeShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
      },
    },
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translateX(0)', offset: 0.25 },
            { transform: 'translateX(-3px)', offset: 0.65 },
            { transform: 'translateX(0)', offset: 1 },
          ],
          880,
          { delay: 260, origin: '10px 13px' },
        ),
        1: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translateX(0)', offset: 0.275 },
            { transform: 'translateX(3px)', offset: 0.7 },
            { transform: 'translateX(0)', offset: 1 },
          ],
          800,
          { delay: 340, origin: '14px 13px' },
        ),
      },
    },
  });

export const folderCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderCogShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(FOLDER_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        2: /* @__PURE__ */ track(FOLDER_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        3: /* @__PURE__ */ track(FOLDER_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        4: /* @__PURE__ */ track(FOLDER_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        5: /* @__PURE__ */ track(FOLDER_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        6: /* @__PURE__ */ track(FOLDER_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        7: /* @__PURE__ */ track(FOLDER_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        8: /* @__PURE__ */ track(FOLDER_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        9: /* @__PURE__ */ track(FOLDER_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
      },
    },
    /** Igual que el default; al asentarse, el engrane da un pequeño titubeo mecánico y se detiene. */
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(FOLDER_COG_WOBBLE, 1050, { delay: 260, origin: '18px 18px' }),
        2: /* @__PURE__ */ track(FOLDER_COG_WOBBLE, 1050, { delay: 260, origin: '18px 18px' }),
        3: /* @__PURE__ */ track(FOLDER_COG_WOBBLE, 1050, { delay: 260, origin: '18px 18px' }),
        4: /* @__PURE__ */ track(FOLDER_COG_WOBBLE, 1050, { delay: 260, origin: '18px 18px' }),
        5: /* @__PURE__ */ track(FOLDER_COG_WOBBLE, 1050, { delay: 260, origin: '18px 18px' }),
        6: /* @__PURE__ */ track(FOLDER_COG_WOBBLE, 1050, { delay: 260, origin: '18px 18px' }),
        7: /* @__PURE__ */ track(FOLDER_COG_WOBBLE, 1050, { delay: 260, origin: '18px 18px' }),
        8: /* @__PURE__ */ track(FOLDER_COG_WOBBLE, 1050, { delay: 260, origin: '18px 18px' }),
        9: /* @__PURE__ */ track(FOLDER_COG_WOBBLE, 1050, { delay: 260, origin: '18px 18px' }),
      },
    },
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        5: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        6: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        7: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        8: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        9: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const folderDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderDotShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 260 }) },
    },
    /** Igual que el default; al terminar, el punto vuelve a parpadear y regresa a su tamaño. */
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: '0', offset: 0 },
            { transform: 'scale(1.12)', opacity: '1', offset: 0.2 },
            { transform: 'scale(1)', offset: 0.31 },
            { transform: 'scale(1.3)', offset: 0.65 },
            { transform: 'scale(1)', offset: 1 },
          ],
          900,
          { delay: 260, origin: '12px 13px' },
        ),
      },
    },
  });

/** Igual que el default; al terminar, la flecha empuja más hacia abajo y regresa. */
export const folderDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderDownShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translateY(0)', offset: 0.23 },
            { transform: 'translateY(3px)', offset: 0.65 },
            { transform: 'translateY(0)', offset: 1 },
          ],
          950,
          { delay: 260 },
        ),
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translateY(0)', offset: 0.265 },
            { transform: 'translateY(3px)', offset: 0.68 },
            { transform: 'translateY(0)', offset: 1 },
          ],
          830,
          { delay: 380 },
        ),
      },
    },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const folderGit2Icon: AnimatedIconDef = /* @__PURE__ */ icon(folderGit2Shapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 260 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 460 }),
      },
    },
    /** Igual que el default; al conectarse, los dos commits laten una vez (confirmación) y regresan. */
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        2: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: '0', offset: 0 },
            { transform: 'scale(1.12)', opacity: '1', offset: 0.19 },
            { transform: 'scale(1)', offset: 0.31 },
            { transform: 'scale(1.3)', offset: 0.65 },
            { transform: 'scale(1)', offset: 1 },
          ],
          850,
          { delay: 260, origin: '13px 12px' },
        ),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
        3: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: '0', offset: 0 },
            { transform: 'scale(1.12)', opacity: '1', offset: 0.25 },
            { transform: 'scale(1)', offset: 0.4 },
            { transform: 'scale(1.3)', offset: 0.7 },
            { transform: 'scale(1)', offset: 1 },
          ],
          650,
          { delay: 460, origin: '20px 19px' },
        ),
      },
    },
  });

export const folderGitIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderGitShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 340 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 340 }),
      },
    },
    /** Igual que el default; al terminar, el nodo del commit late una vez más y regresa. */
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: '0', offset: 0 },
            { transform: 'scale(1.12)', opacity: '1', offset: 0.2 },
            { transform: 'scale(1)', offset: 0.32 },
            { transform: 'scale(1.3)', offset: 0.65 },
            { transform: 'scale(1)', offset: 1 },
          ],
          820,
          { delay: 260, origin: '12px 13px' },
        ),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 340 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 340 }),
      },
    },
  });

/** Igual que el default; al aparecer, el corazón palpita (3 latidos) y se queda quieto. */
export const folderHeartIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderHeartShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 260 }) },
    },
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: '0', offset: 0 },
            { transform: 'scale(1.12)', opacity: '1', offset: 0.14 },
            { transform: 'scale(1)', offset: 0.25 },
            { transform: 'scale(1)', offset: 0.35 },
            { transform: 'scale(1.15)', offset: 0.48 },
            { transform: 'scale(1)', offset: 0.58 },
            { transform: 'scale(1.15)', offset: 0.71 },
            { transform: 'scale(1)', offset: 0.81 },
            { transform: 'scale(1.12)', offset: 0.92 },
            { transform: 'scale(1)', offset: 1 },
          ],
          1280,
          { delay: 260, origin: '18px 17.8px' },
        ),
      },
    },
  });

/** Igual que el default; al terminar, la flecha entra un poco más y regresa. */
export const folderInputIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderInputShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translateX(0)', offset: 0.23 },
            { transform: 'translateX(3px)', offset: 0.65 },
            { transform: 'translateX(0)', offset: 1 },
          ],
          950,
          { delay: 260 },
        ),
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translateX(0)', offset: 0.265 },
            { transform: 'translateX(3px)', offset: 0.68 },
            { transform: 'translateX(0)', offset: 1 },
          ],
          830,
          { delay: 380 },
        ),
      },
    },
  });

/** Las tres columnas del kanban crecen desde abajo, como las barras de `chart-column`. */
export const folderKanbanIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderKanbanShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleY(0.2)' }, { transform: 'scaleY(1)' }], 300, {
          delay: 260,
          easing: SPRING_OUT,
          origin: '8px 14px',
        }),
        2: /* @__PURE__ */ track([{ transform: 'scaleY(0.2)' }, { transform: 'scaleY(1)' }], 260, {
          delay: 300,
          easing: SPRING_OUT,
          origin: '12px 12px',
        }),
        3: /* @__PURE__ */ track([{ transform: 'scaleY(0.2)' }, { transform: 'scaleY(1)' }], 340, {
          delay: 340,
          easing: SPRING_OUT,
          origin: '16px 16px',
        }),
      },
    },
    /** Igual que el default; al crecer, cada columna rebota un poco más alto y se asienta. */
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { transform: 'scaleY(0.2)', offset: 0 },
            { transform: 'scaleY(1)', offset: 0.375 },
            { transform: 'scaleY(1.15)', offset: 0.68 },
            { transform: 'scaleY(1)', offset: 1 },
          ],
          800,
          { delay: 260, origin: '8px 14px' },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'scaleY(0.2)', offset: 0 },
            { transform: 'scaleY(1)', offset: 0.35 },
            { transform: 'scaleY(1.15)', offset: 0.7 },
            { transform: 'scaleY(1)', offset: 1 },
          ],
          750,
          { delay: 300, origin: '12px 12px' },
        ),
        3: /* @__PURE__ */ track(
          [
            { transform: 'scaleY(0.2)', offset: 0 },
            { transform: 'scaleY(1)', offset: 0.4 },
            { transform: 'scaleY(1.15)', offset: 0.68 },
            { transform: 'scaleY(1)', offset: 1 },
          ],
          850,
          { delay: 340, origin: '16px 16px' },
        ),
      },
    },
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
      },
    },
  });

export const folderKeyIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderKeyShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 260 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 460 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 140, { delay: 460 }),
      },
    },
    /** Igual que el default; al terminar, la argolla "tintinea" con un giro leve y regresa. */
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        3: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3) rotate(0deg)', opacity: '0', offset: 0 },
            { transform: 'scale(1.12) rotate(0deg)', opacity: '1', offset: 0.19 },
            { transform: 'scale(1) rotate(0deg)', offset: 0.33 },
            { transform: 'scale(1) rotate(12deg)', offset: 0.65 },
            { transform: 'scale(1) rotate(0deg)', offset: 1 },
          ],
          900,
          { delay: 260, origin: '19px 20px' },
        ),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 460 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 140, { delay: 460 }),
      },
    },
  });

export const folderLockIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderLockShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 460 }),
      },
    },
    /** Igual que el default; al asegurar, el candado se aprieta un poco más y suelta. */
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }),
        0: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: '0', offset: 0 },
            { transform: 'scale(1.12)', opacity: '1', offset: 0.19 },
            { transform: 'scale(1)', offset: 0.375 },
            { transform: 'scale(1, 0.85)', offset: 0.65 },
            { transform: 'scale(1)', offset: 1 },
          ],
          800,
          { delay: 460, origin: '17px 19.5px' },
        ),
      },
    },
  });

export const folderMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderMinusShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }) },
    },
    /** Igual que el default; al terminar, el guion se estira un poco más ancho y regresa. */
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)', offset: 0.26 },
            { transform: 'scale(1.3)', offset: 0.6 },
            { transform: 'scale(1)', offset: 1 },
          ],
          850,
          { delay: 260, origin: '12px 13px' },
        ),
      },
    },
  });

/** Hermana de `folder-open`: mismo brinco, con el puntito adentro apareciendo de golpe. */
export const folderOpenDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderOpenDotShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 260 }) },
    },
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: '0', offset: 0 },
            { transform: 'scale(1.12)', opacity: '1', offset: 0.19 },
            { transform: 'scale(1)', offset: 0.31 },
            { transform: 'scale(1.3)', offset: 0.65 },
            { transform: 'scale(1)', offset: 1 },
          ],
          900,
          { delay: 260, origin: '14px 15px' },
        ),
      },
    },
  });

/** Igual que el default; al terminar, la flecha empuja más hacia afuera y regresa. */
export const folderOutputIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderOutputShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translateX(0)', offset: 0.23 },
            { transform: 'translateX(-3px)', offset: 0.65 },
            { transform: 'translateX(0)', offset: 1 },
          ],
          950,
          { delay: 260 },
        ),
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translateX(0)', offset: 0.265 },
            { transform: 'translateX(-3px)', offset: 0.68 },
            { transform: 'translateX(0)', offset: 1 },
          ],
          830,
          { delay: 380 },
        ),
      },
    },
  });

/** Igual que el default; al terminar de escribir, la pluma hace un trazo de firma y regresa. */
export const folderPenIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderPenShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 260 }) },
    },
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(
          [
            {
              strokeDasharray: '1',
              strokeDashoffset: '1',
              opacity: '0',
              transform: 'translate(0, 0)',
              offset: 0,
            },
            {
              strokeDasharray: '1',
              strokeDashoffset: '0',
              opacity: '1',
              transform: 'translate(0, 0)',
              offset: 0.32,
            },
            { transform: 'translate(1.5px, -1.5px)', offset: 0.55 },
            { transform: 'translate(-1px, 1px)', offset: 0.78 },
            { transform: 'translate(0, 0)', offset: 1 },
          ],
          1000,
          { delay: 260 },
        ),
      },
    },
    nudge: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)', opacity: '0', offset: 0, easing: 'ease-out' }, { transform: 'translate(-1.5px, 2.25px)', opacity: '0.4', offset: 0.45, easing: 'ease-out' }, { transform: 'translate(-1.5px, 2.25px)', opacity: '0', offset: 1 }], 500, { easing: 'linear', delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
      },
    },
  });

export const folderPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderPlusShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
      },
    },
    /** Igual que el default; al terminar, la cruz crece un poco más y regresa. */
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)', offset: 0.26 },
            { transform: 'scale(1.25)', offset: 0.6 },
            { transform: 'scale(1)', offset: 1 },
          ],
          850,
          { delay: 260, origin: '12px 13px' },
        ),
        1: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)', offset: 0.26 },
            { transform: 'scale(1.25)', offset: 0.6 },
            { transform: 'scale(1)', offset: 1 },
          ],
          850,
          { delay: 260, origin: '12px 13px' },
        ),
      },
    },
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
      },
    },
  });

export const folderRootIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderRootShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 460 }),
      },
    },
    /** Igual que el default; al plantarse, el nodo raíz late una vez (confirmación) y regresa. */
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: '0', offset: 0 },
            { transform: 'scale(1.12)', opacity: '1', offset: 0.19 },
            { transform: 'scale(1)', offset: 0.33 },
            { transform: 'scale(1.3)', offset: 0.65 },
            { transform: 'scale(1)', offset: 1 },
          ],
          850,
          { delay: 260, origin: '12px 13px' },
        ),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 460 }),
      },
    },
  });

/** Igual que el default; al terminar, la lupa se ladea (buscando) y regresa. */
export const folderSearch2Icon: AnimatedIconDef = /* @__PURE__ */ icon(folderSearch2Shapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 460 }),
      },
    },
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3) rotate(0deg)', opacity: '0', offset: 0 },
            { transform: 'scale(1.12) rotate(0deg)', opacity: '1', offset: 0.2 },
            { transform: 'scale(1) rotate(0deg)', offset: 0.31 },
            { transform: 'scale(1) rotate(15deg)', offset: 0.65 },
            { transform: 'scale(1) rotate(0deg)', offset: 1 },
          ],
          900,
          { delay: 260, origin: '11.5px 12.5px' },
        ),
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'rotate(0deg)', offset: 0.23 },
            { transform: 'rotate(15deg)', offset: 0.7 },
            { transform: 'rotate(0deg)', offset: 1 },
          ],
          700,
          { delay: 460, origin: '11.5px 12.5px' },
        ),
      },
    },
  });

export const folderSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderSearchShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 260 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 460 }),
      },
    },
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        2: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3) rotate(0deg)', opacity: '0', offset: 0 },
            { transform: 'scale(1.12) rotate(0deg)', opacity: '1', offset: 0.2 },
            { transform: 'scale(1) rotate(0deg)', offset: 0.31 },
            { transform: 'scale(1) rotate(15deg)', offset: 0.65 },
            { transform: 'scale(1) rotate(0deg)', offset: 1 },
          ],
          900,
          { delay: 260, origin: '17px 17px' },
        ),
        1: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'rotate(0deg)', offset: 0.23 },
            { transform: 'rotate(15deg)', offset: 0.7 },
            { transform: 'rotate(0deg)', offset: 1 },
          ],
          700,
          { delay: 460, origin: '17px 17px' },
        ),
      },
    },
  });

/** Igual que el default; al terminar, el atajo se desliza un poco más y regresa. */
export const folderSymlinkIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderSymlinkShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }) },
    },
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translateX(0)', offset: 0.31 },
            { transform: 'translateX(2px)', offset: 0.65 },
            { transform: 'translateX(0)', offset: 1 },
          ],
          850,
          { delay: 260, origin: '6px 13px' },
        ),
      },
    },
  });

/** Igual que el default; al sincronizar, los dos brazos dan un giro corto y regresan. */
export const folderSyncIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderSyncShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 420 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 420 }),
      },
    },
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'rotate(0deg)', offset: 0.22 },
            { transform: 'rotate(20deg)', offset: 0.7 },
            { transform: 'rotate(0deg)', offset: 1 },
          ],
          720,
          { delay: 260, origin: '16px 16px' },
        ),
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'rotate(0deg)', offset: 0.28 },
            { transform: 'rotate(20deg)', offset: 0.72 },
            { transform: 'rotate(0deg)', offset: 1 },
          ],
          780,
          { delay: 260, origin: '16px 16px' },
        ),
        3: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'rotate(0deg)', offset: 0.26 },
            { transform: 'rotate(20deg)', offset: 0.72 },
            { transform: 'rotate(0deg)', offset: 1 },
          ],
          620,
          { delay: 420, origin: '16px 16px' },
        ),
        4: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'rotate(0deg)', offset: 0.32 },
            { transform: 'rotate(20deg)', offset: 0.74 },
            { transform: 'rotate(0deg)', offset: 1 },
          ],
          680,
          { delay: 420, origin: '16px 16px' },
        ),
      },
    },
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Sin cuerpo único de carpeta: el tronco se dibuja primero, luego la rama, luego los dos archivos. */
export const folderTreeIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderTreeShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 180 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 340 }),
      },
    },
    /** Igual que el default; al terminar, los dos archivos vuelven a asentarse (rebote) juntos. */
    extra: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 180 }),
        1: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: '0', offset: 0 },
            { transform: 'scale(1.12)', opacity: '1', offset: 0.17 },
            { transform: 'scale(1)', offset: 0.33 },
            { transform: 'scale(1.2)', offset: 0.68 },
            { transform: 'scale(1)', offset: 1 },
          ],
          780,
          { delay: 200, origin: '17px 16px' },
        ),
        0: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3)', opacity: '0', offset: 0 },
            { transform: 'scale(1.12)', opacity: '1', offset: 0.16 },
            { transform: 'scale(1)', offset: 0.32 },
            { transform: 'scale(1.2)', offset: 0.68 },
            { transform: 'scale(1)', offset: 1 },
          ],
          820,
          { delay: 340, origin: '17px 6px' },
        ),
      },
    },
  });

/** Igual que el default; al terminar, la flecha empuja más hacia arriba y regresa. */
export const folderUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderUpShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translateY(0)', offset: 0.23 },
            { transform: 'translateY(-3px)', offset: 0.65 },
            { transform: 'translateY(0)', offset: 1 },
          ],
          950,
          { delay: 260 },
        ),
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translateY(0)', offset: 0.265 },
            { transform: 'translateY(-3px)', offset: 0.68 },
            { transform: 'translateY(0)', offset: 1 },
          ],
          830,
          { delay: 380 },
        ),
      },
    },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Igual que el default; al terminar, la X pega un golpe más grande y regresa. */
export const folderXIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderXShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
      },
    },
    extra: {
      root: FOLDER_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)', offset: 0.26 },
            { transform: 'scale(1.2)', offset: 0.6 },
            { transform: 'scale(1)', offset: 1 },
          ],
          850,
          { delay: 260, origin: '12px 13px' },
        ),
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)', offset: 0.286 },
            { transform: 'scale(1.2)', offset: 0.65 },
            { transform: 'scale(1)', offset: 1 },
          ],
          770,
          { delay: 340, origin: '12px 13px' },
        ),
      },
    },
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
      },
    },
  });
