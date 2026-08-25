import { AnimatedIconDef } from './animated-icon.model';
import { SHIELD_GEAR_SPIN } from './icons/_shared';
import { EASE, SPRING_OUT, SPRING_SMOOTH, rotateSeq, scaleSeq, moveXSeq, moveYSeq, track, burst, strokeDraw, icon, held } from './choreography';
import { activityShapes, appWindowShapes, atSignShapes, banShapes, banknoteShapes, bracesShapes, building2Shapes, buildingShapes, cableShapes, cakeShapes, cameraShapes, cctvShapes, checkShapes, commandShapes, contactShapes, cpuShapes, creditCardShapes, crownShapes, downloadShapes, ellipsisShapes, ellipsisVerticalShapes, externalLinkShapes, eyeOffShapes, eyeShapes, funnelShapes, graduationCapShapes, hashShapes, hatGlassesShapes, idCardShapes, imagesShapes, inboxShapes, infinityShapes, infoShapes, keyboardShapes, landmarkShapes, languagesShapes, laptopShapes, layersShapes, libraryShapes, lightbulbShapes, loaderCircleShapes, logOutShapes, mailShapes, menuShapes, minusShapes, moonShapes, networkShapes, paletteShapes, phoneShapes, planeShapes, playShapes, pauseShapes, plusShapes, powerShapes, printerShapes, qrCodeShapes, routerShapes, scrollTextShapes, sendShapes, settingsShapes, shirtShapes, shoppingBagShapes, shoppingCartShapes, sparklesShapes, sunShapes, tabletShapes, tagShapes, trash2Shapes, trashShapes, triangleAlertShapes, triangleShapes, truckShapes, tvShapes, typeShapes, unlinkShapes, uploadShapes, usersShapes, warehouseShapes, webhookShapes, workflowShapes, wrenchShapes, xShapes, zapShapes, zoomInShapes, zoomOutShapes } from './animated-icons.shapes';

/**
 * Catálogo CURADO — coreografía con intención, a mano, icono por icono. El generador offline
 * (ver generated-icons.ts) JAMÁS lee ni escribe este archivo: es la frontera dura entre
 * "geometría + draw automático, en lote" y "movimiento con criterio humano".
 *
 * Paths: **Lucide** (ISC). Coreografías: `bell`, `check`, `refresh-cw`, `search`, `settings`
 * portadas de Animate UI (MIT + Commons Clause); el resto son de la casa.
 *
 * Regla que ordena el archivo: si dos figuras se mueven igual y al mismo tiempo, no hay
 * coreografía, hay un bloque. El desfase es lo que se siente vivo.
 */

// Cada icono es un export individual (tree-shakeable vía `[iconDef]="bellIcon"`) — ANIMATED_ICONS
// se compone a partir de ellos y existe solo para la ruta de conveniencia `name="bell"`, que sí
// arrastra el registro completo (documentado en el contrato público de la librería).









/** Palomita: se dibuja mientras crece 10% y regresa (portado de Animate UI). */
export const checkIcon: AnimatedIconDef = /* @__PURE__ */ icon(checkShapes, {
    default: {
      shapes: {
        0: {
          keyframes: [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'scale(1)' },
            {
              strokeDasharray: '1',
              strokeDashoffset: '0.5',
              opacity: '0.5',
              transform: 'scale(1.1)',
            },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)' },
          ],
          options: { duration: 600, easing: EASE },
          origin: '12px 11.5px',
        },
      },
    },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });















/** Descargar: el asta y la punta bajan juntas; la bandeja no se mueve (es el piso). */
export const downloadIcon: AnimatedIconDef = /* @__PURE__ */ icon(downloadShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 550),
      },
    },
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Parpadeo. Aplastar en Y con el origen al centro lee como párpado. */
export const eyeIcon: AnimatedIconDef = /* @__PURE__ */ icon(eyeShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.1)' }, { transform: 'scaleY(1)' }],
        450,
        { origin: 'center' },
      ),
    },
  });

/** Ocultar: se tacha. Solo la diagonal se dibuja, el ojo ya estaba ahí. */
export const eyeOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(eyeOffShapes, {
    default: { shapes: { 3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420) } },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  });

/** Anónimo: se toca el sombrero y los lentes aparecen. */
export const hatGlassesIcon: AnimatedIconDef = /* @__PURE__ */ icon(hatGlassesShapes, {
    default: {
      shapes: {
        // Sombrero: el ala (1) y la línea horizontal (2) son UNA pieza, mismo movimiento.
        1: /* @__PURE__ */ track(
          [
            { transform: 'translateY(-3px) rotate(-10deg)' },
            { transform: 'translateY(0.8px) rotate(4deg)' },
            { transform: 'translateY(-0.4px) rotate(-2deg)' },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          600,
          { origin: '12px 11px' },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'translateY(-3px) rotate(-10deg)' },
            { transform: 'translateY(0.8px) rotate(4deg)' },
            { transform: 'translateY(-0.4px) rotate(-2deg)' },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          600,
          { origin: '12px 11px' },
        ),
        // Lentes: el puente (0) y los dos aros (3, 4) son un armazón rígido, mismo movimiento,
        // pivotando desde el centro del armazón — no cada aro por su lado.
        0: /* @__PURE__ */ track(
          [
            { transform: 'translateY(-3px) rotate(-14deg)' },
            { transform: 'translateY(0.8px) rotate(5deg)' },
            { transform: 'translateY(-0.4px) rotate(-2deg)' },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          550,
          { delay: 180, origin: '12px 18px' },
        ),
        3: /* @__PURE__ */ track(
          [
            { transform: 'translateY(-3px) rotate(-14deg)' },
            { transform: 'translateY(0.8px) rotate(5deg)' },
            { transform: 'translateY(-0.4px) rotate(-2deg)' },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          550,
          { delay: 180, origin: '12px 18px' },
        ),
        4: /* @__PURE__ */ track(
          [
            { transform: 'translateY(-3px) rotate(-14deg)' },
            { transform: 'translateY(0.8px) rotate(5deg)' },
            { transform: 'translateY(-0.4px) rotate(-2deg)' },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          550,
          { delay: 180, origin: '12px 18px' },
        ),
      },
    },
  });










/** Galería: las dos láminas se separan tantito — se nota que son DOS. */
export const imagesIcon: AnimatedIconDef = /* @__PURE__ */ icon(imagesShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1.5, 0]), 600),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.5, 0]), 600),
      },
    },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, 3px)' }], 500, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, -3px)' }], 500, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, 3px)' }], 500, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, 3px)' }], 500, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Toast informativo: círculo primero, la "i" después. */
export const infoIcon: AnimatedIconDef = /* @__PURE__ */ icon(infoShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 360 }),
      },
    },
  });

/** Spinner. Va lineal a propósito: con `[loop]` no se debe notar el corte entre vueltas. */
export const loaderCircleIcon: AnimatedIconDef = /* @__PURE__ */ icon(loaderCircleShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 900, { easing: 'linear', origin: 'center' }),
    },
  });



/** Correo: el sobre da un golpecito y la solapa se traza. */
export const mailIcon: AnimatedIconDef = /* @__PURE__ */ icon(mailShapes, {
  default: {
    root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.06, 1]), 500, { origin: 'center' }),
    shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 500, { delay: 120 }) },
  },
  pulse: {
    root: /* @__PURE__ */ track(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.9, 1.3)' },
        { transform: 'scale(1.1, 0.9)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1, 1)' },
      ],
      600,
      { easing: 'ease-out', origin: 'center' },
    ),
  },
});









/** Agregar: golpe seco. `turn` es la otra lectura, la de "+ que se vuelve ✕". */
export const plusIcon: AnimatedIconDef = /* @__PURE__ */ icon(plusShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.25, 1]), 400, { easing: SPRING_OUT, origin: 'center' }),
    },
    turn: /* @__PURE__ */ held(/* @__PURE__ */ rotateSeq([0, 90]), 350, { origin: 'center' }),
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
      },
    },
  });













/** Enviar: se va, y regresa desde el lado contrario. El truco es que no vuelve por donde salió. */
export const sendIcon: AnimatedIconDef = /* @__PURE__ */ icon(sendShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)', opacity: '1' },
          { transform: 'translate(6px, -6px)', opacity: '0' },
          { transform: 'translate(-5px, 5px)', opacity: '0' },
          { transform: 'translate(0, 0)', opacity: '1' },
        ],
        800,
      ),
    },
  });

/** Media vuelta en dos tiempos; `rotate` gira parejo (bueno con `loop`). Portadas. */
export const settingsIcon: AnimatedIconDef = /* @__PURE__ */ icon(settingsShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 90, 180]), 1250, { origin: 'center' }),
    },
    rotate: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 2000, { easing: 'linear', origin: 'center' }),
    },
    active: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 1000, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  });


/** Destellos: la estrella grande respira y las chiquitas titilan a destiempo. */
export const sparklesIcon: AnimatedIconDef = /* @__PURE__ */ icon(sparklesShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 700, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 450, { delay: 140 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 450, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 450, { delay: 300 }),
      },
    },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1)' }, { transform: 'scale(0.9)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }], 600, { easing: EASE }),
        3: /* @__PURE__ */ track([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(0)' }, { opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'scale(1)' }], 600, { easing: EASE }),
      },
    },
  });

/** Borrar: la tapa se levanta girando desde su extremo izquierdo. */
export const trashIcon: AnimatedIconDef = /* @__PURE__ */ icon(trashShapes, {
    default: {
      // Replica la animación de trash-2 (tapa: línea + agarradera), sin los elementos que la
      // diferencian (trash no tiene las líneas de contenido cayendo). El bote (0) se queda quieto.
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: 'translateY(-1.5px) rotate(-12deg)' },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          600,
          { origin: '3px 6px' },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: 'translateY(-1.5px) rotate(-12deg)' },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          600,
          { origin: '3px 6px' },
        ),
      },
    },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/**
   * Igual que `trash` pero además el contenido cae 80ms después. ADAPTADO: el original de Animate
   * UI interpola el atributo `d` (path morph), que no es confiable entre navegadores.
   */
export const trash2Icon: AnimatedIconDef = /* @__PURE__ */ icon(trash2Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1.5, 0]), 520, { delay: 80 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1.5, 0]), 520, { delay: 120 }),
        3: /* @__PURE__ */ track(
          [
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: 'translateY(-1.5px) rotate(-12deg)' },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          600,
          { origin: '3px 6px' },
        ),
        4: /* @__PURE__ */ track(
          [
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: 'translateY(-1.5px) rotate(-12deg)' },
            { transform: 'translateY(0) rotate(0deg)' },
          ],
          600,
          { origin: '3px 6px' },
        ),
      },
    },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Advertencia: se sacude y el signo aparece al final. */
export const triangleAlertIcon: AnimatedIconDef = /* @__PURE__ */ icon(triangleAlertShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 4, -3, 0]), 600),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 340 }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.1) rotate(-3deg)', offset: 0.2 }, { transform: 'scale(1.1) rotate(3deg)', offset: 0.4 }, { transform: 'scale(1.1) rotate(-2deg)', offset: 0.6 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
  });

/** Subir: asta y punta van hacia arriba; la bandeja se queda. */
export const uploadIcon: AnimatedIconDef = /* @__PURE__ */ icon(uploadShapes, {
    default: {
      // Solo la flecha se mueve (asta + punta); la bandeja se queda estática.
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 550),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 550),
      },
    },
    /** El asta se acorta en longitud (scaleY) desde arriba, donde toca la punta; la punta no se mueve. */
    retract: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.6)' }, { transform: 'scaleY(1)' }],
          320,
          { origin: '12px 3px' },
        ),
      },
    },
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });


/** Apretar: la llave gira y regresa. */
export const wrenchIcon: AnimatedIconDef = /* @__PURE__ */ icon(wrenchShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -18, 12, 0]), 700, { origin: 'center' }),
    },
  });

/**
 * Menú: las tres barras se recorren en cascada de arriba a abajo. El desfase de 70 ms es TODO el
 * gesto — las tres a la vez serían un bloque moviéndose, que es justo lo que la regla del archivo
 * dice que no es coreografía.
 */
export const menuIcon: AnimatedIconDef = /* @__PURE__ */ icon(menuShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2.5, 0]), 420),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2.5, 0]), 420, { delay: 70 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2.5, 0]), 420, { delay: 140 }),
      },
    },
  });

/** Cerrar: gira 90° y se sostiene mientras el puntero siga encima. */
export const xIcon: AnimatedIconDef = /* @__PURE__ */ icon(xShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ rotateSeq([0, 90]), 350, { origin: 'center' }),
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
      },
    },
  });











/** Playera colgada meciéndose desde los hombros. */
export const shirtIcon: AnimatedIconDef = /* @__PURE__ */ icon(shirtShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 4, -3, 2, 0]), 750, { origin: 'top center' }),
    },
  });

































/** Despega y vuelve a entrar por el otro lado. */
export const planeIcon: AnimatedIconDef = /* @__PURE__ */ icon(planeShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)', opacity: '1' },
          { transform: 'translate(7px, -7px)', opacity: '0' },
          { transform: 'translate(-6px, 6px)', opacity: '0' },
          { transform: 'translate(0, 0)', opacity: '1' },
        ],
        850,
      ),
    },
  });





































/** Equipo: el de adelante saluda y el de atrás aparece después. */
export const usersIcon: AnimatedIconDef = /* @__PURE__ */ icon(usersShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.2, 0]), 500),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 450, { delay: 160 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 450, { delay: 220 }),
      },
    },
  });

/** Camión que avanza CON las llantas girando. Sin las llantas, patina. */
// Se resiste hacia la izquierda, sale disparado a la derecha y desaparece, y reaparece desde la
// izquierda para retomar su lugar — sin las llantas girando.
const SHOOT_OFF_KEYFRAMES: Keyframe[] = [
  { transform: 'translateX(0)', opacity: '1', offset: 0 },
  { transform: 'translateX(-3px)', opacity: '1', offset: 0.18 },
  { transform: 'translateX(-3px)', opacity: '1', offset: 0.3 },
  { transform: 'translateX(26px)', opacity: '1', offset: 0.46 },
  { transform: 'translateX(26px)', opacity: '0', offset: 0.5 },
  { transform: 'translateX(-26px)', opacity: '0', offset: 0.54 },
  { transform: 'translateX(-26px)', opacity: '1', offset: 0.62 },
  { transform: 'translateX(0)', opacity: '1', offset: 1 },
];

export const truckIcon: AnimatedIconDef = /* @__PURE__ */ icon(truckShapes, {
    default: {
      root: /* @__PURE__ */ track(SHOOT_OFF_KEYFRAMES, 1500),
    },
  });













/** Abrir fuera: la flecha se sale de la caja. */
export const externalLinkIcon: AnimatedIconDef = /* @__PURE__ */ icon(externalLinkShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(2px, -2px)' },
            { transform: 'translate(0, 0)' },
          ],
          550,
        ),
        1: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(2px, -2px)' },
            { transform: 'translate(0, 0)' },
          ],
          550,
        ),
      },
    },
  });




/** Timbrando. */
export const phoneIcon: AnimatedIconDef = /* @__PURE__ */ icon(phoneShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -12, 10, -8, 6, 0]), 800, { origin: 'center' }),
    },
  });



/** Carrito rodando con las ruedas girando. */
export const shoppingCartIcon: AnimatedIconDef = /* @__PURE__ */ icon(shoppingCartShapes, {
    default: {
      root: /* @__PURE__ */ track(SHOOT_OFF_KEYFRAMES, 1500),
    },
    pulse: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) translateY(0)' }, { transform: 'scale(1.1) translateY(-5px)' }, { transform: 'scale(1) translateY(0)' }, { transform: 'scale(1.1) translateY(-5px)' }, { transform: 'scale(1) translateY(0)' }], 800, { easing: EASE }),
    },
  });

/** Billete que se voltea. */
export const banknoteIcon: AnimatedIconDef = /* @__PURE__ */ icon(banknoteShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.8)' }, { transform: 'scaleX(1)' }],
        600,
        {
          origin: 'center',
        },
      ),
    },
  });

/** Corona que se posa. */
export const crownIcon: AnimatedIconDef = /* @__PURE__ */ icon(crownShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2.5, 0, -1, 0]), 650, { easing: SPRING_OUT }),
    },
  });

/** Sol: los rayos brotan uno por uno mientras el astro gira despacio. */
export const sunIcon: AnimatedIconDef = /* @__PURE__ */ icon(sunShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(45deg)', offset: 0.5625 },
          { transform: 'rotate(405deg)', offset: 1 },
        ],
        2400,
        { origin: 'center', easing: 'linear' },
      ),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 0 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 45 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 135 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 180 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 225 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 270 }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 315 }),
      },
    },
    /** Destello: los rayos titilan en ola, el sol no gira. */
    shine: {
      shapes: {
        // Late durante TODA la ola (780ms = último rayo a los 280ms + sus 500ms), no solo al
        // principio — si no, se queda quieto mientras los rayos siguen titilando.
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1, 1.08, 1]), 780, {
          origin: '12px 12px',
        }),
        1: /* @__PURE__ */ track(
          [
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
          ],
          500,
          { delay: 0 },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
          ],
          500,
          { delay: 40 },
        ),
        3: /* @__PURE__ */ track(
          [
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
          ],
          500,
          { delay: 80 },
        ),
        4: /* @__PURE__ */ track(
          [
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
          ],
          500,
          { delay: 120 },
        ),
        5: /* @__PURE__ */ track(
          [
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
          ],
          500,
          { delay: 160 },
        ),
        6: /* @__PURE__ */ track(
          [
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
          ],
          500,
          { delay: 200 },
        ),
        7: /* @__PURE__ */ track(
          [
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
          ],
          500,
          { delay: 240 },
        ),
        8: /* @__PURE__ */ track(
          [
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
            { transform: 'scale(1.3)', opacity: '0.6' },
            { transform: 'scale(1)', opacity: '1' },
          ],
          500,
          { delay: 280 },
        ),
      },
    },
  });

/** Luna que se recuesta. */
export const moonIcon: AnimatedIconDef = /* @__PURE__ */ icon(moonShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -18, 0]), 700, { origin: 'center' }),
    },
  });

/** Chispazo: parpadeo eléctrico, irregular a propósito. */
export const zapIcon: AnimatedIconDef = /* @__PURE__ */ icon(zapShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [
          { opacity: '1', transform: 'scale(1)' },
          { opacity: '0.2', transform: 'scale(0.92)' },
          { opacity: '1', transform: 'scale(1.15)' },
          { opacity: '0.15', transform: 'scale(0.95)' },
          { opacity: '0.9', transform: 'scale(1.08)' },
          { opacity: '0.3', transform: 'scale(0.97)' },
          { opacity: '1', transform: 'scale(1)' },
        ],
        650,
        { origin: 'center' },
      ),
    },
  });


/** Foco prendiendo. */
export const lightbulbIcon: AnimatedIconDef = /* @__PURE__ */ icon(lightbulbShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { opacity: '0.45', transform: 'scale(0.96)' },
            { opacity: '1', transform: 'scale(1.08)' },
            { opacity: '1', transform: 'scale(1)' },
          ],
          600,
          { origin: '12px 14px' },
        ),
      },
    },
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-20deg)', offset: 0.4 }, { transform: 'rotate(15deg)', offset: 0.6 }, { transform: 'rotate(-7deg)', offset: 0.8 }, { transform: 'rotate(0deg)', offset: 1 }], 800, { easing: EASE, delay: 300 }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(0deg)', offset: 0.4 }, { transform: 'rotate(10deg)', offset: 0.6 }, { transform: 'rotate(-5deg)', offset: 0.8 }, { transform: 'rotate(0deg)', offset: 1 }], 800, { easing: EASE }),
      },
    },
  });

/** Obturador: solo el lente se cierra y abre. */
export const cameraIcon: AnimatedIconDef = /* @__PURE__ */ icon(cameraShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.65, 1]), 420, { origin: '12px 13px' }),
      },
    },
  });

/** Pastel: las velitas titilan a destiempo, como las de verdad. */
export const cakeIcon: AnimatedIconDef = /* @__PURE__ */ icon(cakeShapes, {
  default: {
    shapes: {
      6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420),
      7: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 110 }),
      8: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 220 }),
    },
  },
  pulse: {
    root: /* @__PURE__ */ track(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.9, 1.3)' },
        { transform: 'scale(1.1, 0.9)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1, 1)' },
      ],
      600,
      { easing: 'ease-out', origin: 'center' },
    ),
  },
});

/** Prohibido: primero el círculo, luego el tajo. */
export const banIcon: AnimatedIconDef = /* @__PURE__ */ icon(banShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 300 }),
      },
    },
  });

/** Arroba: se traza la espiral desde afuera. */
export const atSignIcon: AnimatedIconDef = /* @__PURE__ */ icon(atSignShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 500),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 220 }),
      },
    },
  });

/** Salir: la flecha se va por la puerta. */
export const logOutIcon: AnimatedIconDef = /* @__PURE__ */ icon(logOutShapes, {
  default: {
    reverseOnLeave: true,
    shapes: {
      0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2.5, 0]), 550, { fill: 'forwards' }),
      1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2.5, 0]), 550, { fill: 'forwards' }),
    },
  },
  nudge: {
    reverseOnLeave: true,
    shapes: {
      1: /* @__PURE__ */ track(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-3px)' },
          { transform: 'translateX(0)' },
        ],
        400,
        { fill: 'forwards' },
      ),
      2: /* @__PURE__ */ track(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-3px)' },
          { transform: 'translateX(0)' },
        ],
        400,
      ),
    },
  },
});

/** Filtrar: el embudo se comprime y suelta. */
export const funnelIcon: AnimatedIconDef = /* @__PURE__ */ icon(funnelShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.88)' }, { transform: 'scaleY(1)' }],
        500,
        {
          origin: 'top center',
        },
      ),
    },
  });

// ── 3ª tanda: el resto de lo que la app usa a diario ──────────────────────
/** Electro: el trazo ES la animación, y lento a propósito para que se lea el pulso. */
export const activityIcon: AnimatedIconDef = /* @__PURE__ */ icon(activityShapes, {
    default: { autoDraw: { speed: 45 } },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 600, { easing: EASE }),
      },
    },
  });







/** Ventana: los tres puntos de la barra de título se encienden en orden. */
export const appWindowIcon: AnimatedIconDef = /* @__PURE__ */ icon(appWindowShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 80 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 160 }),
      },
    },
  });







































/** Contacto: la cabeza asoma. */
export const contactIcon: AnimatedIconDef = /* @__PURE__ */ icon(contactShapes, {
    default: { shapes: { 3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.2, 0]), 500) } },
  });

/** Procesador trabajando: pulso eléctrico, no un rebote mecánico. */
export const cpuIcon: AnimatedIconDef = /* @__PURE__ */ icon(cpuShapes, {
    default: {
      shapes: {
        12: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.4' }, { opacity: '1' }], 700),
        13: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.4' }, { opacity: '1' }], 700, { delay: 150 }),
      },
    },
  });

/** Pasar la tarjeta. */
export const creditCardIcon: AnimatedIconDef = /* @__PURE__ */ icon(creditCardShapes, {
  default: {
    root: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2.5, 0]), 600),
    shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 150 }) },
  },
  pulse: {
    root: /* @__PURE__ */ track(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.9, 1.3)' },
        { transform: 'scale(1.1, 0.9)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1, 1)' },
      ],
      600,
      { easing: 'ease-out', origin: 'center' },
    ),
  },
});


/** Los tres puntitos de "cargando", en orden izquierda → derecha (índices 2, 0, 1). */
export const ellipsisIcon: AnimatedIconDef = /* @__PURE__ */ icon(ellipsisShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 500),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 500, { delay: 120 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 500, { delay: 240 }),
      },
    },
  });




/** El birrete que se avienta al aire. */
export const graduationCapIcon: AnimatedIconDef = /* @__PURE__ */ icon(graduationCapShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translateY(0) rotate(0deg)' },
          { transform: 'translateY(-3px) rotate(-10deg)' },
          { transform: 'translateY(0) rotate(0deg)' },
        ],
        650,
        { easing: SPRING_OUT, origin: 'center' },
      ),
    },
  });


/** Credencial: la foto asoma. */
export const idCardIcon: AnimatedIconDef = /* @__PURE__ */ icon(idCardShapes, {
    default: { shapes: { 3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.2, 0]), 500) } },
  });

/** Bandeja de entrada: algo cae adentro. */
export const inboxIcon: AnimatedIconDef = /* @__PURE__ */ icon(inboxShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2.5, 0]), 500, { easing: SPRING_OUT }) } },
  });

/** Teclado: las teclas se pulsan en cascada. Es "escribiendo", no "teclado bonito". */
export const keyboardIcon: AnimatedIconDef = /* @__PURE__ */ icon(keyboardShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 45 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 90 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 135 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 180 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 225 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 270 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 315 }),
      },
    },
  });

/** Banco: las columnas se levantan una por una. */
export const landmarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(landmarkShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([2, 0]), 420, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([2, 0]), 420, { delay: 80, easing: SPRING_OUT }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([2, 0]), 420, { delay: 160, easing: SPRING_OUT }),
      },
    },
    alert: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(-10px)', offset: 0 }, { opacity: 0, transform: 'translateX(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 300 }),
        2: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(-10px)', offset: 0 }, { opacity: 0, transform: 'translateX(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 200 }),
        3: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(-10px)', offset: 0 }, { opacity: 0, transform: 'translateX(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 100 }),
        4: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(-10px)', offset: 0 }, { opacity: 0, transform: 'translateX(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 350, { easing: 'ease-out' }),
        5: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(-10px)', offset: 0 }, { opacity: 0, transform: 'translateY(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateY(2px)', offset: 0.8 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 400 }),
      },
    },
  });

/** Idiomas: se traza, que es lo que hace un alfabeto. */
export const languagesIcon: AnimatedIconDef = /* @__PURE__ */ icon(languagesShapes, {
    default: { autoDraw: { speed: 60 } },
  });

/** Laptop abriéndose. */
export const laptopIcon: AnimatedIconDef = /* @__PURE__ */ icon(laptopShapes, {
  default: {
    reverseOnLeave: true,
    shapes: {
      0: /* @__PURE__ */ track([{ transform: 'scaleY(0.85)' }, { transform: 'scaleY(1)' }], 450, {
        easing: SPRING_OUT,
        origin: '12px 16px',
        fill: 'forwards',
      }),
    },
  },
});

/** Capas separándose: la de arriba sube, la de abajo baja. */
export const layersIcon: AnimatedIconDef = /* @__PURE__ */ icon(layersShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.8, 0]), 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1.2, 0]), 550),
      },
    },
    /** Las tres capas se acoplan a medio camino — la de arriba también baja, no se queda fija. */
    merge: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'translateY(0)' },
            { transform: 'translateY(2.5px)' },
            { transform: 'translateY(2.5px)' },
            { transform: 'translateY(0)' },
          ],
          1000,
        ),
        1: /* @__PURE__ */ track(
          [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-2.5px)' },
            { transform: 'translateY(-2.5px)' },
            { transform: 'translateY(0)' },
          ],
          1000,
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-7.5px)' },
            { transform: 'translateY(-7.5px)' },
            { transform: 'translateY(0)' },
          ],
          1000,
          { delay: 60 },
        ),
      },
    },
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-9px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-5px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });








/** Libros que se acomodan. */
export const libraryIcon: AnimatedIconDef = /* @__PURE__ */ icon(libraryShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -6, 0]), 500, { origin: 'bottom left' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 5, 0]), 500, { delay: 90, origin: 'bottom left' }),
      },
    },
  });



/** Desligar: los eslabones se separan y las chispitas saltan. */
export const unlinkIcon: AnimatedIconDef = /* @__PURE__ */ icon(unlinkShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 550),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 240 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 280 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 320 }),
      },
    },
  });



export const minusIcon: AnimatedIconDef = /* @__PURE__ */ icon(minusShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.25, 1]), 400, { easing: SPRING_OUT, origin: 'center' }),
    },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
      },
    },
  });

/** Red: los nodos se conectan de arriba hacia abajo. */
export const networkIcon: AnimatedIconDef = /* @__PURE__ */ icon(networkShapes, {
  default: {
    shapes: {
      2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350),
      4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 300 }),
      3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 500 }),
      0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 720 }),
      1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 720 }),
    },
  },
});

/** Paleta: los colores aparecen uno por uno. */
export const paletteIcon: AnimatedIconDef = /* @__PURE__ */ icon(paletteShapes, {
  default: {
    shapes: {
      1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380),
      2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 80 }),
      3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 160 }),
      4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 240 }),
    },
  },
  pulse: {
    root: /* @__PURE__ */ track(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.9, 1.3)' },
        { transform: 'scale(1.1, 0.9)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1, 1)' },
      ],
      600,
      { easing: 'ease-out', origin: 'center' },
    ),
  },
});

/** Play: el empujón de arrancar. */
export const playIcon: AnimatedIconDef = /* @__PURE__ */ icon(playShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) translateX(0)' },
          { transform: 'scale(1.15) translateX(1px)' },
          { transform: 'scale(1) translateX(0)' },
        ],
        420,
        { easing: SPRING_OUT, origin: 'center' },
      ),
    },
    /** Avanza: se desplaza a la derecha y regresa, elástico. */
    next: {
      root: /* @__PURE__ */ track(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(0)' }],
        450,
        { easing: EASE, origin: 'center' },
      ),
    },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/**
 * Pausa: las dos barras se separan un pelo y vuelven — el reverso del empujón de `play`, con sus
 * mismos 420 ms y su mismo resorte para que el par alterne sin cambiar de carácter.
 *
 * Índices al revés de lo que uno espera: en Lucide la barra DERECHA (x=14) es la figura 0.
 */
export const pauseIcon: AnimatedIconDef = /* @__PURE__ */ icon(pauseShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 420, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1.2, 0]), 420, { easing: SPRING_OUT }),
      },
    },
  });

/** Escaneo: las esquinas primero, luego los módulos. */
export const qrCodeIcon: AnimatedIconDef = /* @__PURE__ */ icon(qrCodeShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 70 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 140 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 220 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 260 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 300 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 340 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 380 }),
      },
    },
  });

/** Pergamino desenrollándose. */
export const scrollTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(scrollTextShapes, {
    default: {
      // Arranca más chico (enrollado) y se estira a su tamaño. Ya estirado, las dos líneas de
      // texto se dibujan una tras otra, simulando que se escriben.
      root: /* @__PURE__ */ track([{ transform: 'scaleY(0.6)' }, { transform: 'scaleY(1)' }], 500, {
        easing: SPRING_OUT,
        origin: 'top center',
      }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 500 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 650 }),
      },
    },
  });




















/** Bolsa colgando que se mece desde las asas. */
export const shoppingBagIcon: AnimatedIconDef = /* @__PURE__ */ icon(shoppingBagShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 5, -4, 2, 0]), 700, { origin: 'top center' }),
    },
  });

/** Etiqueta que pende de su ojal. */
export const tagIcon: AnimatedIconDef = /* @__PURE__ */ icon(tagShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 8, -6, 3, 0]), 700, { origin: '7.5px 7.5px' }),
    },
    nudge: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-5deg)', offset: 0.8 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'top left' }),
    },
  });

export const warehouseIcon: AnimatedIconDef = /* @__PURE__ */ icon(warehouseShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2, 0]), 500, { easing: SPRING_OUT }),
    },
  });

/** Flujo: nodo → conexión → nodo. En ese orden, que es de lo que trata un flujo. */
export const workflowIcon: AnimatedIconDef = /* @__PURE__ */ icon(workflowShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350, { delay: 480 }),
      },
    },
  });

/** Acercar: la lente late y el signo aparece. */
export const zoomInIcon: AnimatedIconDef = /* @__PURE__ */ icon(zoomInShapes, {
    default: {
      // El aumento afecta a TODO el icono (root), no solo a la lupa.
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1]), 450, { origin: '11px 11px' }),
      shapes: {
        // El "+" se achica hasta casi desaparecer (se lee como "-" un instante) y rebota
        // elástico de vuelta.
        2: /* @__PURE__ */ track(
          [
            { transform: 'scaleY(1)' },
            { transform: 'scaleY(0.1)' },
            { transform: 'scaleY(1.3)' },
            { transform: 'scaleY(0.9)' },
            { transform: 'scaleY(1)' },
          ],
          550,
          { delay: 120, easing: EASE, origin: '11px 11px' },
        ),
        3: /* @__PURE__ */ track(
          [
            { transform: 'scaleX(1)' },
            { transform: 'scaleX(1.15)' },
            { transform: 'scaleX(0.95)' },
            { transform: 'scaleX(1)' },
          ],
          550,
          { delay: 120, easing: EASE, origin: '11px 11px' },
        ),
      },
    },
  });

export const zoomOutIcon: AnimatedIconDef = /* @__PURE__ */ icon(zoomOutShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.9, 1]), 450, { origin: '11px 11px' }),
      shapes: {
        2: /* @__PURE__ */ track(
          [
            { transform: 'scaleX(1)' },
            { transform: 'scaleX(1.3)' },
            { transform: 'scaleX(0.9)' },
            { transform: 'scaleX(1)' },
          ],
          550,
          { delay: 120, easing: EASE, origin: '11px 11px' },
        ),
      },
    },
  });










// ── 4ª tanda: cobertura total del inventario ──────────────────────────────
// Nombres CANÓNICOS de Lucide. Los que la app escribe distinto entran por `ICON_ALIASES`.
/** Cámara que barre la escena. */
export const cctvIcon: AnimatedIconDef = /* @__PURE__ */ icon(cctvShapes, {
  default: {
    root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -10, 8, 0]), 750, {
      origin: 'center',
    }),
  },
  alert: {
    shapes: {
      0: /* @__PURE__ */ track(
        [
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-15deg)', offset: 0.33 },
          { transform: 'rotate(10deg)', offset: 0.66 },
          { transform: 'rotate(0deg)', offset: 1 },
        ],
        2000,
        { easing: EASE, origin: '7px 9px' },
      ),
      1: /* @__PURE__ */ track(
        [
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-15deg)', offset: 0.33 },
          { transform: 'rotate(10deg)', offset: 0.66 },
          { transform: 'rotate(0deg)', offset: 1 },
        ],
        2000,
        { easing: EASE, origin: '7px 9px' },
      ),
    },
  },
});




/** Edificio: las ventanas se van prendiendo. */
export const buildingIcon: AnimatedIconDef = /* @__PURE__ */ icon(buildingShapes, {
  default: {
    shapes: {
      1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350),
      2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350, { delay: 70 }),
      3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350, { delay: 140 }),
      4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350, { delay: 210 }),
      5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350, { delay: 280 }),
    },
  },
  pulse: {
    root: /* @__PURE__ */ track(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.9, 1.3)' },
        { transform: 'scale(1.1, 0.9)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1, 1)' },
      ],
      600,
      { easing: 'ease-out', origin: 'center' },
    ),
  },
});

export const building2Icon: AnimatedIconDef = /* @__PURE__ */ icon(building2Shapes, {
  default: {
    shapes: {
      1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350),
      2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350, { delay: 90 }),
      3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350, { delay: 180 }),
    },
  },
  pulse: {
    root: /* @__PURE__ */ track(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.9, 1.3)' },
        { transform: 'scale(1.1, 0.9)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1, 1)' },
      ],
      600,
      { easing: 'ease-out', origin: 'center' },
    ),
  },
});

/** Cable: se traza como lo que es, un tendido. */
export const cableIcon: AnimatedIconDef = /* @__PURE__ */ icon(cableShapes, {
  default: { autoDraw: { speed: 55 } },
});


export const commandIcon: AnimatedIconDef = /* @__PURE__ */ icon(commandShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1]), 420, { easing: SPRING_OUT, origin: 'center' }) },
  });












export const hashIcon: AnimatedIconDef = /* @__PURE__ */ icon(hashShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1, 0]), 450),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1, 0]), 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1, 0]), 450, { delay: 80 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 450, { delay: 80 }),
      },
    },
  });











/** Menú de tres puntos, de arriba hacia abajo (índices 1, 0, 2). */
export const ellipsisVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(ellipsisVerticalShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.5, 0]), 450),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.5, 0]), 450, { delay: 110 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.5, 0]), 450, { delay: 220 }),
      },
    },
  });









/** Imprimiendo: la hoja sale. */
export const printerIcon: AnimatedIconDef = /* @__PURE__ */ icon(printerShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2.5, 0]), 550, { easing: SPRING_OUT }),
        // La hoja que entra por arriba también se mueve, no solo la que sale.
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500, { easing: SPRING_OUT }),
      },
    },
  });


/** Router: la señal sale del aparato hacia afuera. */
export const routerIcon: AnimatedIconDef = /* @__PURE__ */ icon(routerShapes, {
    default: {
      // El router entra desde abajo; los dos indicadores parpadean desfasados entre sí.
      root: /* @__PURE__ */ track(
        [
          { transform: 'translateY(6px)', opacity: '0.4' },
          { transform: 'translateY(0)', opacity: '1' },
        ],
        450,
        { easing: SPRING_OUT },
      ),
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 500),
        2: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 650, { delay: 150 }),
        // Los arcos de señal aparecen subiendo desde abajo, no con el pop-in de `burst`.
        4: /* @__PURE__ */ track(
          [
            { transform: 'translateY(4px)', opacity: '0' },
            { transform: 'translateY(0)', opacity: '1' },
          ],
          380,
          { delay: 100 },
        ),
        5: /* @__PURE__ */ track(
          [
            { transform: 'translateY(4px)', opacity: '0' },
            { transform: 'translateY(0)', opacity: '1' },
          ],
          380,
          { delay: 220 },
        ),
      },
    },
  });

export const tabletIcon: AnimatedIconDef = /* @__PURE__ */ icon(tabletShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -7, 7, -5, 5, -2, 0]), 600, {
        easing: SPRING_SMOOTH,
      }),
    },
  });

export const triangleIcon: AnimatedIconDef = /* @__PURE__ */ icon(triangleShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1]), 450, { easing: SPRING_OUT, origin: 'center' }) },
  });

/** Tele encendiéndose: parpadeo de tubo. */
export const tvIcon: AnimatedIconDef = /* @__PURE__ */ icon(tvShapes, {
  default: {
    shapes: {
      1: /* @__PURE__ */ track(
        [
          { opacity: '1' },
          { opacity: '0.3' },
          { opacity: '1' },
          { opacity: '0.6' },
          { opacity: '1' },
        ],
        600,
      ),
    },
  },
  pulse: {
    root: /* @__PURE__ */ track(
      [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.9, 1.3)' },
        { transform: 'scale(1.1, 0.9)' },
        { transform: 'scale(0.95, 1.05)' },
        { transform: 'scale(1, 1)' },
      ],
      600,
      { easing: 'ease-out', origin: 'center' },
    ),
  },
});





























export const typeIcon: AnimatedIconDef = /* @__PURE__ */ icon(typeShapes, { default: { autoDraw: { speed: 60 } } });

// Se pasa de `autoDraw` (mide en runtime, sin delay fijo) a `strokeDraw` explícito por shape:
// para que el giro final arranque justo cuando termina de dibujarse necesitamos un timing
// determinista, no uno medido — mismo patrón que `workflow`/`search-x`.
export const webhookIcon: AnimatedIconDef = /* @__PURE__ */ icon(webhookShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 350),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 350, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 350, { delay: 440 }),
      },
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, {
        delay: 790,
        easing: 'linear',
        origin: 'center',
      }),
    },
  });

/** Encender: el arco se traza y el botón prende. */
export const powerIcon: AnimatedIconDef = /* @__PURE__ */ icon(powerShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 500),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 280 }),
      },
    },
  });

/** Llaves que se abren. */
export const bracesIcon: AnimatedIconDef = /* @__PURE__ */ icon(bracesShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1.5, 0]), 500),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.5, 0]), 500),
      },
    },
  });















// Los "dashed" son marcador de resize-handle, no un divisor activo: cada raya invita a jalar
// con un nudge chico e ida-vuelta (no el sostenido de open/close), escalonado entre rayas.































/*
 * `facebook`, `instagram`, `linkedin` y `twitter` VIVÍAN AQUÍ y se eliminaron a propósito.
 *
 * Ya no existen en el set canónico de Lucide (confirmado contra lucide-static@1.31.0 con
 * `npm run lucide:diff`), con indicios de ser una remoción deliberada por riesgo de marca —
 * son logos corporativos, no iconografía genérica. NO se reintroducen sin verificación de
 * licencia explícita: la licencia ISC de Lucide cubre SU dibujo, no el derecho de marca de un
 * tercero sobre su logo.
 *
 * Si alguna vez hacen falta, van como iconos propios del consumidor vía `[iconDef]` (que acepta
 * cualquier `AnimatedIconDef`), no dentro del catálogo que publica este paquete.
 */


/** Infinito: lento a propósito, el chiste es ver el trazo completar el lazo. */
export const infinityIcon: AnimatedIconDef = /* @__PURE__ */ icon(infinityShapes, {
    default: { autoDraw: { speed: 38 } },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 1000, { easing: EASE }),
      },
    },
  });







// Cada barra se dibuja de abajo hacia arriba, del punto hacia afuera — igual intención que wifi
// (del centro hacia afuera) pero en barras en vez de arcos.






// Cada raya se dibuja en orden, como si se fuera contando — tally-5 remata con el trazo
// diagonal que "tacha" el grupo de 4.








// ─── Portado de ng-animated-icons (MIT © 2025 Ajit Panigrahi) ──────────────────────────────────
// github.com/ajitzero/animated-icons — su coreografía vive en CSS (@keyframes / transition); aquí
// quedó reinterpretada sobre WAAPI en un port de UNA sola vez. De aquí en adelante estos iconos se
// mantienen a mano, igual que el resto del archivo: no hay script que los regenere.
//
// Los marcados REVISAR se mapearon por POSICIÓN — su catálogo está clavado a una versión anterior
// de Lucide, así que el `d` ya no casa y el índice de figura es una inferencia, no una medición.

export const airplayIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" },
    { tag: 'path', d: "m12 15 5 6H7Z" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 400, { easing: 'cubic-bezier(0, 0, 0.3, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const alignHorizontalSpaceAroundIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 6, height: 10, x: 9, y: 7, rx: 2 },
    { tag: 'path', d: "M4 22V2" },
    { tag: 'path', d: "M20 22V2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.78)' }], 600, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(2px)' }], 600, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-2px)' }], 600, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const alignVerticalSpaceAroundIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 10, height: 6, x: 7, y: 9, rx: 2 },
    { tag: 'path', d: "M22 20H2" },
    { tag: 'path', d: "M22 4H2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.78)' }], 600, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 600, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 600, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const anvilIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4" },
    { tag: 'path', d: "M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z" },
    { tag: 'path', d: "M9 12v5" },
    { tag: 'path', d: "M15 12v5" },
    { tag: 'path', d: "M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(-50px)' }, { transform: 'translateY(0)' }], 200, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }),
    },
  },
);

export const archiveIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 20, height: 5, x: 2, y: 3, rx: 1 },
    { tag: 'path', d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" },
    { tag: 'path', d: "M10 12h4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);



















export const awardIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" },
    { tag: 'circle', cx: 12, cy: 8, r: 6 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(20deg) scale(1.2)', offset: 0.3 }, { transform: 'rotate(-20deg) scale(1.2)', offset: 0.6 }, { transform: 'rotate(0deg) scale(1)', offset: 1 }], 1000, { easing: 'ease' }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const axeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9" },
    { tag: 'path', d: "M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-20deg)', offset: 0.6 }, { transform: 'rotate(15deg)', offset: 0.8 }, { transform: 'rotate(0deg)', offset: 1 }], 1000, { easing: 'ease' }),
    },
  },
);

export const axis3dIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.5 10.5 15 9" },
    { tag: 'path', d: "M4 4v15a1 1 0 0 0 1 1h15" },
    { tag: 'path', d: "M4.293 19.707 6 18" },
    { tag: 'path', d: "m9 15 1.5-1.5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 300, { easing: EASE, delay: 600 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 300, { easing: EASE, delay: 200 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 300, { easing: EASE, delay: 400 }),
      },
    },
  },
);







// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const beanOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1" },
    { tag: 'path', d: "M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66" },
    { tag: 'path', d: "M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04" },
    { tag: 'line', x1: 2, x2: 22, y1: 2, y2: 22 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const beerOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 13v5" },
    { tag: 'path', d: "M17 11.47V8" },
    { tag: 'path', d: "M17 11h1a3 3 0 0 1 2.745 4.211" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" },
    { tag: 'path', d: "M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268" },
    { tag: 'path', d: "M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12" },
    { tag: 'path', d: "M9 14.6V18" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);





export const binaryIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 14, y: 14, width: 4, height: 6, rx: 2 },
    { tag: 'rect', x: 6, y: 4, width: 4, height: 6, rx: 2 },
    { tag: 'path', d: "M6 20h4" },
    { tag: 'path', d: "M14 10h4" },
    { tag: 'path', d: "M6 14h2v6" },
    { tag: 'path', d: "M14 4h2v6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-8px)' }], 260, { easing: 'ease-in-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(8px)' }], 260, { easing: 'ease-in-out', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 260, { easing: 'ease-in-out', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 260, { easing: 'ease-in-out', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 260, { easing: 'ease-in-out', fill: 'forwards' }),
        5: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 260, { easing: 'ease-in-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const blendIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 9, cy: 9, r: 7 },
    { tag: 'circle', cx: 15, cy: 15, r: 7 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3.5px, 3.5px)' }], 320, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3.5px, -3.5px)' }], 320, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const blocksIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" },
    { tag: 'rect', x: 14, y: 2, width: 8, height: 8, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, -1.5px)' }], 320, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const bluetoothOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m17 17-5 5V12l-5 5" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M14.5 9.5 17 7l-5-5v4.5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

/** El motor no fija transform-box en el track raíz; girar cada figura con origen explícito para pivotar en el círculo central. */
const BOLT_SPIN = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }];

export const boltIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
    },
    { tag: 'circle', cx: 12, cy: 12, r: 4 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BOLT_SPIN, 1000, { easing: 'ease', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(BOLT_SPIN, 1000, { easing: 'ease', origin: '12px 12px' }),
      },
    },
  },
);

export const boneIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-8deg)', offset: 0.2 }, { transform: 'rotate(8deg)', offset: 0.4 }, { transform: 'rotate(-6deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
  },
);























export const botOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.67 8H18a2 2 0 0 1 2 2v4.33" },
    { tag: 'path', d: "M2 14h2" },
    { tag: 'path', d: "M20 14h2" },
    { tag: 'path', d: "M22 22 2 2" },
    { tag: 'path', d: "M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586" },
    { tag: 'path', d: "M9 13v2" },
    { tag: 'path', d: "M9.67 4H12v2.33" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const brainCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10.852 14.772-.383.923" },
    { tag: 'path', d: "m10.852 9.228-.383-.923" },
    { tag: 'path', d: "m13.148 14.772.382.924" },
    { tag: 'path', d: "m13.531 8.305-.383.923" },
    { tag: 'path', d: "m14.772 10.852.923-.383" },
    { tag: 'path', d: "m14.772 13.148.923.383" },
    { tag: 'path', d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771" },
    { tag: 'path', d: "M17.998 5.125a4 4 0 0 1 2.525 5.771" },
    { tag: 'path', d: "M19.505 10.294a4 4 0 0 1-1.5 7.706" },
    { tag: 'path', d: "M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516" },
    { tag: 'path', d: "M4.5 10.291A4 4 0 0 0 6 18" },
    { tag: 'path', d: "M6.002 5.125a3 3 0 0 0 .4 1.375" },
    { tag: 'path', d: "m9.228 10.852-.923-.383" },
    { tag: 'path', d: "m9.228 13.148-.923.383" },
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '12px 12px' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '12px 12px' }),
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '12px 12px' }),
        5: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '12px 12px' }),
        12: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '12px 12px' }),
        13: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '12px 12px' }),
        14: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);



// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const brushCleaningIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m16 22-1-4" },
    { tag: 'path', d: "M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1" },
    { tag: 'path', d: "M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z" },
    { tag: 'path', d: "m8 22 1-4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.25 }, { transform: 'rotate(10deg)', offset: 0.5 }, { transform: 'rotate(0deg)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const brushIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m11 10 3 3" },
    { tag: 'path', d: "M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z" },
    { tag: 'path', d: "M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-6deg)', offset: 0.33 }, { transform: 'rotate(6deg)', offset: 0.66 }, { transform: 'rotate(0deg)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const bugOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 20v-8" },
    { tag: 'path', d: "M12.656 7H14a4 4 0 0 1 4 4v1.344" },
    { tag: 'path', d: "M14.12 3.88 16 2" },
    { tag: 'path', d: "M17.123 17.123A6 6 0 0 1 6 14v-3a4 4 0 0 1 1.72-3.287" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M21 5a4 4 0 0 1-3.55 3.97" },
    { tag: 'path', d: "M22 13h-3.344" },
    { tag: 'path', d: "M3 21a4 4 0 0 1 3.81-4" },
    { tag: 'path', d: "M3 5a4 4 0 0 0 3.55 3.97" },
    { tag: 'path', d: "M6 13H2" },
    { tag: 'path', d: "m8 2 1.88 1.88" },
    { tag: 'path', d: "M9.712 4.06A3 3 0 0 1 15 6v1.13" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const cameraOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14.564 14.558a3 3 0 1 1-4.122-4.121" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175" },
    { tag: 'path', d: "M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const candyOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 10v7.9" },
    { tag: 'path', d: "M11.802 6.145a5 5 0 0 1 6.053 6.053" },
    { tag: 'path', d: "M14 6.1v2.243" },
    { tag: 'path', d: "m15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965" },
    { tag: 'path', d: "M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const captionsOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.5 5H19a2 2 0 0 1 2 2v8.5" },
    { tag: 'path', d: "M17 11h-.5" },
    { tag: 'path', d: "M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M7 11h4" },
    { tag: 'path', d: "M7 15h2.5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const castIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" },
    { tag: 'path', d: "M2 12a9 9 0 0 1 8 8" },
    { tag: 'path', d: "M2 16a5 5 0 0 1 4 4" },
    { tag: 'line', x1: 2, x2: 2.01, y1: 20, y2: 20 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 450 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
      },
    },
  },
);
















// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const checkCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 6 7 17l-5-5" },
    { tag: 'path', d: "m22 10-7.5 7.5L13 16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);

export const cherryIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" },
    { tag: 'path', d: "M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" },
    { tag: 'path', d: "M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12" },
    { tag: 'path', d: "M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-12deg)' }, { transform: 'rotate(7deg)' }, { transform: 'rotate(-4deg)' }, { transform: 'rotate(0deg)' }], 800, { easing: EASE, origin: 'top center' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-12deg)' }, { transform: 'rotate(7deg)' }, { transform: 'rotate(-4deg)' }, { transform: 'rotate(0deg)' }], 800, { easing: EASE, origin: 'top center' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-12deg)' }, { transform: 'rotate(7deg)' }, { transform: 'rotate(-4deg)' }, { transform: 'rotate(0deg)' }], 800, { easing: EASE, origin: 'top center' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-12deg)' }, { transform: 'rotate(7deg)' }, { transform: 'rotate(-4deg)' }, { transform: 'rotate(0deg)' }], 800, { easing: EASE, origin: 'top center' }),
      },
    },
  },
);








export const cigaretteOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13" },
    { tag: 'path', d: "M18 8c0-2.5-2-2.5-2-5" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866" },
    { tag: 'path', d: "M22 8c0-2.5-2-2.5-2-5" },
    { tag: 'path', d: "M7 12v4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);
















// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const clapperboardIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m12.296 3.464 3.02 3.956" },
    { tag: 'path', d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z" },
    { tag: 'path', d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
    { tag: 'path', d: "m6.18 5.276 3.1 3.899" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-8deg)', offset: 0.25 }, { transform: 'rotate(-8deg)', offset: 0.7 }, { transform: 'rotate(0deg)', offset: 1 }], 800, { easing: 'ease-in-out', origin: '12.5% 87.5%' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(0deg)', offset: 0.3 }, { transform: 'rotate(14deg)', offset: 0.55 }, { transform: 'rotate(0deg)', offset: 1 }], 800, { easing: 'ease-in-out', origin: '3px 11px' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(0deg)', offset: 0.3 }, { transform: 'rotate(14deg)', offset: 0.55 }, { transform: 'rotate(0deg)', offset: 1 }], 800, { easing: 'ease-in-out', origin: '3px 11px' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(0deg)', offset: 0.3 }, { transform: 'rotate(14deg)', offset: 0.55 }, { transform: 'rotate(0deg)', offset: 1 }], 800, { easing: 'ease-in-out', origin: '3px 11px' }),
      },
    },
  },
);





/** El motor no fija transform-box en el track raíz; girar cada figura con origen explícito para pivotar en el círculo central. */
const COG_SPIN = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }];

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const cogIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M11 10.27 7 3.34' },
    { tag: 'path', d: 'm11 13.73-4 6.93' },
    { tag: 'path', d: 'M12 22v-2' },
    { tag: 'path', d: 'M12 2v2' },
    { tag: 'path', d: 'M14 12h8' },
    { tag: 'path', d: 'm17 20.66-1-1.73' },
    { tag: 'path', d: 'm17 3.34-1 1.73' },
    { tag: 'path', d: 'M2 12h2' },
    { tag: 'path', d: 'm20.66 17-1.73-1' },
    { tag: 'path', d: 'm20.66 7-1.73 1' },
    { tag: 'path', d: 'm3.34 17 1.73-1' },
    { tag: 'path', d: 'm3.34 7 1.73 1' },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
    { tag: 'circle', cx: 12, cy: 12, r: 8 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(COG_SPIN, 500, {
          easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        1: /* @__PURE__ */ track(COG_SPIN, 500, {
          easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        2: /* @__PURE__ */ track(COG_SPIN, 500, {
          easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        3: /* @__PURE__ */ track(COG_SPIN, 500, {
          easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        4: /* @__PURE__ */ track(COG_SPIN, 500, {
          easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        5: /* @__PURE__ */ track(COG_SPIN, 500, {
          easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        6: /* @__PURE__ */ track(COG_SPIN, 500, {
          easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        7: /* @__PURE__ */ track(COG_SPIN, 500, {
          easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        8: /* @__PURE__ */ track(COG_SPIN, 500, {
          easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        9: /* @__PURE__ */ track(COG_SPIN, 500, {
          easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        10: /* @__PURE__ */ track(COG_SPIN, 500, {
          easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        11: /* @__PURE__ */ track(COG_SPIN, 500, {
          easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        12: /* @__PURE__ */ track(COG_SPIN, 500, {
          easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
        13: /* @__PURE__ */ track(COG_SPIN, 500, {
          easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          fill: 'forwards',
          origin: '12px 12px',
        }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const compassIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], 1000, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const contrastIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M12 18a6 6 0 0 0 0-12v12z" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 500, { easing: 'ease-in-out', fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const cropIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 2v14a2 2 0 0 0 2 2h14" },
    { tag: 'path', d: "M18 22V8a2 2 0 0 0-2-2H2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1px, -1px)' }], 300, { easing: 'ease', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-1px, 1px)' }], 300, { easing: 'ease', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const diamondPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 8v8" },
    { tag: 'path', d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" },
    { tag: 'path', d: "M8 12h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
      },
    },
  },
);







export const diffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 3v14" },
    { tag: 'path', d: "M5 10h14" },
    { tag: 'path', d: "M5 21h14" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 500 }),
      },
    },
  },
);

export const dnaOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8" },
    { tag: 'path', d: "m17 6-2.891-2.891" },
    { tag: 'path', d: "M2 15c3.333-3 6.667-3 10-3" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "m20 9 .891.891" },
    { tag: 'path', d: "M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1" },
    { tag: 'path', d: "M3.109 14.109 4 15" },
    { tag: 'path', d: "m6.5 12.5 1 1" },
    { tag: 'path', d: "m7 18 2.891 2.891" },
    { tag: 'path', d: "M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const dropletOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18.715 13.186C18.29 11.858 17.384 10.607 16 9.5c-2-1.6-3.5-4-4-6.5a10.7 10.7 0 0 1-.884 2.586" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M8.795 8.797A11 11 0 0 1 8 9.5C6 11.1 5 13 5 15a7 7 0 0 0 13.222 3.208" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const drumIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m2 2 8 8" },
    { tag: 'path', d: "m22 2-8 8" },
    { tag: 'ellipse', cx: 12, cy: 9, rx: 10, ry: 5 },
    { tag: 'path', d: "M7 13.4v7.9" },
    { tag: 'path', d: "M12 14v8" },
    { tag: 'path', d: "M17 13.4v7.9" },
    { tag: 'path', d: "M2 9v8a10 5 0 0 0 20 0V9" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-14deg)' }, { transform: 'rotate(0deg)' }], 520, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(14deg)' }, { transform: 'rotate(0deg)' }], 520, { easing: 'ease-in-out' }),
      },
    },
  },
);

export const earOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46" },
    { tag: 'path', d: "M6 8.5c0-.75.13-1.47.36-2.14" },
    { tag: 'path', d: "M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76" },
    { tag: 'path', d: "M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18" },
    { tag: 'line', x1: 2, x2: 22, y1: 2, y2: 22 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const eclipseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M12 2a7 7 0 1 0 10 10" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px) scale(1)' }, { transform: 'translate(3px, -3px) scale(0.78)' }], 1000, { easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const eggOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19" },
    { tag: 'path', d: "M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);












export const fishOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058" },
    { tag: 'path', d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618" },
    { tag: 'path', d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const flagOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M4 22V4" },
    { tag: 'path', d: "M7.656 2H8c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10.347" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const flashlightOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11.652 6H18" },
    { tag: 'path', d: "M12 13v1" },
    { tag: 'path', d: "M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V6" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M7.649 2H17a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8a4 4 0 0 0-.55 1.007" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const flaskConicalOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 2v2.343" },
    { tag: 'path', d: "M14 2v6.343" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-1.755-2.96l5.227-9.563" },
    { tag: 'path', d: "M6.453 15H15" },
    { tag: 'path', d: "M8.5 2h7" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const frameIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'line', x1: 22, x2: 2, y1: 6, y2: 6 },
    { tag: 'line', x1: 22, x2: 2, y1: 18, y2: 18 },
    { tag: 'line', x1: 6, x2: 6, y1: 2, y2: 22 },
    { tag: 'line', x1: 18, x2: 18, y1: 2, y2: 22 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 220, { easing: 'ease-in-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 220, { easing: 'ease-in-out', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 220, { easing: 'ease-in-out', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 220, { easing: 'ease-in-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const funnelXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473" },
    { tag: 'path', d: "m16.5 3.5 5 5" },
    { tag: 'path', d: "m21.5 3.5-5 5" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
      },
    },
  },
);





export const gaugeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m12 14 4-4" },
    { tag: 'path', d: "M3.34 19a10 10 0 1 1 17.32 0" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(72deg)' }], 600, { easing: 'cubic-bezier(0.16, 1.4, 0.3, 1)', fill: 'forwards', origin: '12px 14px' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const gavelIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381" },
    { tag: 'path', d: "m16 16 6-6" },
    { tag: 'path', d: "m21.5 10.5-8-8" },
    { tag: 'path', d: "m8 8 6-6" },
    { tag: 'path', d: "m8.5 7.5 8 8" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-20deg)', offset: 0.6 }, { transform: 'rotate(15deg)', offset: 0.8 }, { transform: 'rotate(0deg)', offset: 1 }], 1000, { easing: 'ease' }),
    },
  },
);



// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const hammerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9" },
    { tag: 'path', d: "m18 15 4-4" },
    { tag: 'path', d: "m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-20deg)', offset: 0.6 }, { transform: 'rotate(15deg)', offset: 0.8 }, { transform: 'rotate(0deg)', offset: 1 }], 1000, { easing: 'ease' }),
    },
  },
);

export const handCoinsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17' },
    {
      tag: 'path',
      d: 'm7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9',
    },
    { tag: 'path', d: 'm2 16 6 6' },
    { tag: 'circle', cx: 16, cy: 9, r: 2.9 },
    { tag: 'circle', cx: 6, cy: 5, r: 3 },
  ],
  {
    default: {
      reverseOnLeave: true,
      shapes: {
        3: /* @__PURE__ */ track(
          [
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(-10px)', opacity: 1 },
            { transform: 'translateY(0)', opacity: 1 },
          ],
          600,
          { easing: 'ease-in', fill: 'forwards' },
        ),
        4: /* @__PURE__ */ track(
          [
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(-10px)', opacity: 1 },
            { transform: 'translateY(0)', opacity: 1 },
          ],
          600,
          { easing: 'ease-in', fill: 'forwards' },
        ),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const handHeartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" },
    { tag: 'path', d: "m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95" },
    { tag: 'path', d: "m2 15 6 6" },
    { tag: 'path', d: "m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px) scale(1)' }, { transform: 'translateY(-1.5px) scale(1.12)' }], 320, { easing: 'ease', fill: 'forwards', origin: '16px 8px' }),
      },
      reverseOnLeave: true,
    },
  },
);



export const headphoneOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 14h-1.343" },
    { tag: 'path', d: "M9.128 3.47A9 9 0 0 1 21 12v3.343" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3" },
    { tag: 'path', d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);


// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const hopOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27" },
    { tag: 'path', d: "M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28" },
    { tag: 'path', d: "M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26" },
    { tag: 'path', d: "M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25" },
    { tag: 'path', d: "M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75" },
    { tag: 'path', d: "M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24" },
    { tag: 'path', d: "M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28" },
    { tag: 'path', d: "M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05" },
    { tag: 'path', d: "m2 2 20 20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);


// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const kanbanIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 3v14" },
    { tag: 'path', d: "M12 3v8" },
    { tag: 'path', d: "M19 3v18" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
      },
    },
  },
);


export const keyboardOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M 20 4 A2 2 0 0 1 22 6" },
    { tag: 'path', d: "M 22 6 L 22 16.41" },
    { tag: 'path', d: "M 7 16 L 16 16" },
    { tag: 'path', d: "M 9.69 4 L 20 4" },
    { tag: 'path', d: "M14 8h.01" },
    { tag: 'path', d: "M18 8h.01" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" },
    { tag: 'path', d: "M6 8h.01" },
    { tag: 'path', d: "M8 12h.01" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const lightbulbOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5" },
    { tag: 'path', d: "M9 18h6" },
    { tag: 'path', d: "M10 22h4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);




// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const locateOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 19v3" },
    { tag: 'path', d: "M12 2v3" },
    { tag: 'path', d: "M18.89 13.24a7 7 0 0 0-8.13-8.13" },
    { tag: 'path', d: "M19 12h3" },
    { tag: 'path', d: "M2 12h3" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M7.05 7.05a7 7 0 0 0 9.9 9.9" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const mailCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8' },
    { tag: 'path', d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' },
    { tag: 'path', d: 'm16 19 2 2 4-4' },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 },
          ],
          500,
          { easing: 'ease-out' },
        ),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
    },
  },
);


// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const maximize2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 3h6v6" },
    { tag: 'path', d: "m21 3-7 7" },
    { tag: 'path', d: "m3 21 7-7" },
    { tag: 'path', d: "M9 21H3v-6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, -2px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, 2px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, -2px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, 2px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const maximizeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 3H5a2 2 0 0 0-2 2v3" },
    { tag: 'path', d: "M21 8V5a2 2 0 0 0-2-2h-3" },
    { tag: 'path', d: "M3 16v3a2 2 0 0 0 2 2h3" },
    { tag: 'path', d: "M16 21h3a2 2 0 0 0 2-2v-3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, -2px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, -2px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-2px, 2px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(2px, 2px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const megaphoneOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11.636 6A13 13 0 0 0 19.4 3.2 1 1 0 0 1 21 4v11.344" },
    { tag: 'path', d: "M14.378 14.357A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" },
    { tag: 'path', d: "M8 8v6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);









// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const micOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 19v3" },
    { tag: 'path', d: "M15 9.34V5a3 3 0 0 0-5.68-1.33" },
    { tag: 'path', d: "M16.95 16.95A7 7 0 0 1 5 12v-2" },
    { tag: 'path', d: "M18.89 13.23A7 7 0 0 0 19 12v-2" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M9 9v3a3 3 0 0 0 5.12 2.12" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const milkOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 2h8" },
    { tag: 'path', d: "M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3" },
    { tag: 'path', d: "M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435" },
    { tag: 'line', x1: 2, x2: 22, y1: 2, y2: 22 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const minimize2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m14 10 7-7" },
    { tag: 'path', d: "M20 10h-6V4" },
    { tag: 'path', d: "m3 21 7-7" },
    { tag: 'path', d: "M4 14h6v6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1px, -1px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-1px, 1px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-1px, 1px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1px, -1px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const minimizeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 3v3a2 2 0 0 1-2 2H3" },
    { tag: 'path', d: "M21 8h-3a2 2 0 0 1-2-2V3" },
    { tag: 'path', d: "M3 16h3a2 2 0 0 1 2 2v3" },
    { tag: 'path', d: "M16 21v-3a2 2 0 0 1 2-2h3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1px, 1px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-1px, 1px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1px, -1px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-1px, -1px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);




















export const nfcIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 8.32a7.43 7.43 0 0 1 0 7.36" },
    { tag: 'path', d: "M9.46 6.21a11.76 11.76 0 0 1 0 11.58" },
    { tag: 'path', d: "M12.91 4.1a15.91 15.91 0 0 1 .01 15.8" },
    { tag: 'path', d: "M16.37 2a20.16 20.16 0 0 1 0 20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 450 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 550 }),
      },
    },
  },
);


export const nutOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 4V2" },
    { tag: 'path', d: "M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939" },
    { tag: 'path', d: "M19 10v3.343" },
    { tag: 'path', d: "M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192" },
    { tag: 'line', x1: 2, x2: 22, y1: 2, y2: 22 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const octagonAlertIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 16h.01" },
    { tag: 'path', d: "M12 8v4" },
    { tag: 'path', d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.1) rotate(-3deg)', offset: 0.2 }, { transform: 'scale(1.1) rotate(3deg)', offset: 0.4 }, { transform: 'scale(1.1) rotate(-2deg)', offset: 0.6 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
  },
);

/** El motor no fija transform-box en el track raíz; girar cada figura con origen explícito para pivotar en el círculo central. */
const ORBIT_SPIN = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-1080deg)' }];

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const orbitIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M20.341 6.484A10 10 0 0 1 10.266 21.85' },
    { tag: 'path', d: 'M3.659 17.516A10 10 0 0 1 13.74 2.152' },
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
    { tag: 'circle', cx: 19, cy: 5, r: 2 },
    { tag: 'circle', cx: 5, cy: 19, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ORBIT_SPIN, 3000, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(ORBIT_SPIN, 3000, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(ORBIT_SPIN, 3000, { easing: EASE, origin: '12px 12px' }),
        3: /* @__PURE__ */ track(ORBIT_SPIN, 3000, { easing: EASE, origin: '12px 12px' }),
        4: /* @__PURE__ */ track(ORBIT_SPIN, 3000, { easing: EASE, origin: '12px 12px' }),
      },
    },
  },
);

export const paintbrushIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m14.622 17.897-10.68-2.913" },
    { tag: 'path', d: "M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" },
    { tag: 'path', d: "M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-6deg)', offset: 0.33 }, { transform: 'rotate(6deg)', offset: 0.66 }, { transform: 'rotate(0deg)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const paperclipIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'm16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551',
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' },
          ],
          700,
          { easing: 'ease-in-out' },
        ),
      },
    },
    pulse: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1, 1)' },
          { transform: 'scale(0.9, 1.3)' },
          { transform: 'scale(1.1, 0.9)' },
          { transform: 'scale(0.95, 1.05)' },
          { transform: 'scale(1, 1)' },
        ],
        600,
        { easing: 'ease-out', origin: 'center' },
      ),
    },
  },
);




export const phoneOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272" },
    { tag: 'path', d: "M22 2 2 22" },
    { tag: 'path', d: "M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const pickaxeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m14 13-8.381 8.38a1 1 0 0 1-3.001-3L11 9.999" },
    { tag: 'path', d: "M15.973 4.027A13 13 0 0 0 5.902 2.373c-1.398.342-1.092 2.158.277 2.601a19.9 19.9 0 0 1 5.822 3.024" },
    { tag: 'path', d: "M16.001 11.999a19.9 19.9 0 0 1 3.024 5.824c.444 1.369 2.26 1.676 2.603.278A13 13 0 0 0 20 8.069" },
    { tag: 'path', d: "M18.352 3.352a1.205 1.205 0 0 0-1.704 0l-5.296 5.296a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l5.296-5.296a1.205 1.205 0 0 0 0-1.704z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-20deg)', offset: 0.6 }, { transform: 'rotate(15deg)', offset: 0.8 }, { transform: 'rotate(0deg)', offset: 1 }], 1000, { easing: 'ease' }),
    },
  },
);

export const pinOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17v5" },
    { tag: 'path', d: "M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const pointerOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 4.5V4a2 2 0 0 0-2.41-1.957" },
    { tag: 'path', d: "M13.9 8.4a2 2 0 0 0-1.26-1.295" },
    { tag: 'path', d: "M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158" },
    { tag: 'path', d: "m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343" },
    { tag: 'path', d: "M6 6v8" },
    { tag: 'path', d: "m2 2 20 20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const powerOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18.36 6.64A9 9 0 0 1 20.77 15" },
    { tag: 'path', d: "M6.16 6.16a9 9 0 1 0 12.68 12.68" },
    { tag: 'path', d: "M12 2v4" },
    { tag: 'path', d: "m2 2 20 20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const printerCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.5 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5" },
    { tag: 'path', d: "m16 19 2 2 4-4" },
    { tag: 'path', d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2" },
    { tag: 'path', d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);

export const rabbitIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 16a3 3 0 0 1 2.24 5" },
    { tag: 'path', d: "M18 12h.01" },
    { tag: 'path', d: "M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3" },
    { tag: 'path', d: "M20 8.54V4a2 2 0 1 0-4 0v3" },
    { tag: 'path', d: "M7.612 12.524a3 3 0 1 0-1.6 4.3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(-6px)' }, { transform: 'translateY(0) scale(1)' }, { transform: 'translateY(-6px)' }, { transform: 'translateY(0) scale(1)' }], 800, { easing: EASE }),
    },
  },
);

export const radarIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19.07 4.93A10 10 0 0 0 6.99 3.34" },
    { tag: 'path', d: "M4 6h.01" },
    { tag: 'path', d: "M2.29 9.62A10 10 0 1 0 21.31 8.35" },
    { tag: 'path', d: "M16.24 7.76A6 6 0 1 0 8.23 16.67" },
    { tag: 'path', d: "M12 18h.01" },
    { tag: 'path', d: "M17.99 11.66A6 6 0 0 1 15.77 16.67" },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
    { tag: 'path', d: "m13.41 10.59 5.66-5.66" },
  ],
  {
    default: {
      shapes: {
        7: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(720deg)' }], 2000, { easing: 'linear', origin: '13.41px 10.59px' }),
      },
    },
  },
);



// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const rainbowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 17a10 10 0 0 0-20 0" },
    { tag: 'path', d: "M6 17a6 6 0 0 1 12 0" },
    { tag: 'path', d: "M10 17a2 2 0 0 1 4 0" },
  ],
  {
    // Los tres arcos se dibujan en cascada, de afuera hacia adentro: a la vez se leen como un
    // solo trazo grueso y se pierde que son tres.
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 620, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 620, { easing: 'ease-out', delay: 150 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 620, { easing: 'ease-out', delay: 300 }),
      },
    },
  },
);





// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const rockingChairIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m15 13 3.708 7.416" },
    { tag: 'path', d: "M3 19a15 15 0 0 0 18 0" },
    { tag: 'path', d: "m3 2 3.21 9.633A2 2 0 0 0 8.109 13H18" },
    { tag: 'path', d: "m9 13-3.708 7.416" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(5deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(5deg)' }, { transform: 'rotate(0deg)' }], 2400, { easing: EASE }),
    },
  },
);


export const routeOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 6, cy: 19, r: 3 },
    { tag: 'path', d: "M9 19h8.5c.4 0 .9-.1 1.3-.2" },
    { tag: 'path', d: "M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M21 15.3a3.5 3.5 0 0 0-3.3-3.3" },
    { tag: 'path', d: "M15 5h-4.3" },
    { tag: 'circle', cx: 18, cy: 5, r: 3 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const routeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 6, cy: 19, r: 3 },
    { tag: 'path', d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" },
    { tag: 'circle', cx: 18, cy: 5, r: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 220, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 620, { easing: 'ease-in-out', delay: 420, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 220, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const rssIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 11a9 9 0 0 1 9 9" },
    { tag: 'path', d: "M4 4a16 16 0 0 1 16 16" },
    { tag: 'circle', cx: 5, cy: 19, r: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 450 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
      },
    },
  },
);


export const scissorsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 6, cy: 6, r: 3 },
    { tag: 'path', d: "M8.12 8.12 12 12" },
    { tag: 'path', d: "M20 4 8.12 15.88" },
    { tag: 'circle', cx: 6, cy: 18, r: 3 },
    { tag: 'path', d: "M14.8 14.8 20 20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: 'ease-in-out', origin: '12px 12px' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: 'ease-in-out', origin: '12px 12px' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: 'ease-in-out', origin: '12px 12px' }),
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: 'ease-in-out', origin: '12px 12px' }),
      },
    },
  },
);


export const shipWheelIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 8 },
    { tag: 'path', d: "M12 2v7.5" },
    { tag: 'path', d: "m19 5-5.23 5.23" },
    { tag: 'path', d: "M22 12h-7.5" },
    { tag: 'path', d: "m19 19-5.23-5.23" },
    { tag: 'path', d: "M12 14.5V22" },
    { tag: 'path', d: "M10.23 13.77 5 19" },
    { tag: 'path', d: "M9.5 12H2" },
    { tag: 'path', d: "M10.23 10.23 5 5" },
    { tag: 'circle', cx: 12, cy: 12, r: 2.5 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 750, { easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const shipIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 10.189V14" },
    { tag: 'path', d: "M12 2v3" },
    { tag: 'path', d: "M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" },
    { tag: 'path', d: "M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76" },
    { tag: 'path', d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: EASE }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(-3deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(-3deg)' }], 2400, { easing: EASE }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(-3deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(-3deg)' }], 2400, { easing: EASE }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(-3deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(-3deg)' }], 2400, { easing: EASE }),
        4: /* @__PURE__ */ track([{ transform: 'rotate(-3deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(-3deg)' }], 2400, { easing: EASE }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const shovelIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21.56 4.56a1.5 1.5 0 0 1 0 2.122l-.47.47a3 3 0 0 1-4.212-.03 3 3 0 0 1 0-4.243l.44-.44a1.5 1.5 0 0 1 2.121 0z" },
    { tag: 'path', d: "M3 22a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707l3.355-3.355a1.205 1.205 0 0 1 1.704 0l3.296 3.296a1.205 1.205 0 0 1 0 1.704l-3.355 3.355a1 1 0 0 1-.707.293z" },
    { tag: 'path', d: "m9 15 7.879-7.878" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)', offset: 0 }, { transform: 'translate(2px, -2px)', offset: 0.6 }, { transform: 'translate(-5px, 5px)', offset: 0.8 }, { transform: 'translate(0, 0)', offset: 1 }], 500, { easing: 'ease-out' }),
    },
  },
);

export const shrinkIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8" },
    { tag: 'path', d: "M9 19.8V15m0 0H4.2M9 15l-6 6" },
    { tag: 'path', d: "M15 4.2V9m0 0h4.8M15 9l6-6" },
    { tag: 'path', d: "M9 4.2V9m0 0H4.2M9 9 3 3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-1px, -1px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1px, -1px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-1px, 1px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1px, 1px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const signatureIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284" },
    { tag: 'path', d: "M3 21h18" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 600, { easing: 'ease-in' }),
      },
    },
  },
);


export const snowflakeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 20-1.25-2.5L6 18" },
    { tag: 'path', d: "M10 4 8.75 6.5 6 6" },
    { tag: 'path', d: "m14 20 1.25-2.5L18 18" },
    { tag: 'path', d: "m14 4 1.25 2.5L18 6" },
    { tag: 'path', d: "m17 21-3-6h-4" },
    { tag: 'path', d: "m17 3-3 6 1.5 3" },
    { tag: 'path', d: "M2 12h6.5L10 9" },
    { tag: 'path', d: "m20 10-1.5 2 1.5 2" },
    { tag: 'path', d: "M22 12h-6.5L14 15" },
    { tag: 'path', d: "m4 10 1.5 2L4 14" },
    { tag: 'path', d: "m7 21 3-6-1.5-3" },
    { tag: 'path', d: "m7 3 3 6h4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(5deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(5deg)' }, { transform: 'rotate(0deg)' }], 400, { easing: EASE }),
    },
  },
);

export const sparkleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1)', offset: 0 }, { transform: 'scale(0.9)', offset: 0.33 }, { transform: 'scale(1.2)', offset: 0.66 }, { transform: 'scale(1)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const speechIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20" },
    { tag: 'path', d: "M19.8 17.8a7.5 7.5 0 0 0 .003-10.603" },
    { tag: 'path', d: "M17 15a3.5 3.5 0 0 0-.025-4.975" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
      },
    },
  },
);

export const spellCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m6 16 6-12 6 12" },
    { tag: 'path', d: "M8 12h8" },
    { tag: 'path', d: "m16 20 2 2 4-4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);



















// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const swordIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m11 19-6-6" },
    { tag: 'path', d: "m5 21-2-2" },
    { tag: 'path', d: "m8 16-4 4" },
    { tag: 'path', d: "M9.5 17.5 21 6V3h-3L6.5 14.5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(25deg)', offset: 0.3 }, { transform: 'rotate(-5deg)', offset: 0.5 }, { transform: 'rotate(0deg)', offset: 0.7 }], 1000, { easing: 'ease' }),
    },
  },
);

export const telescopeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" },
    { tag: 'path', d: "m13.56 11.747 4.332-.924" },
    { tag: 'path', d: "m16 21-3.105-6.21" },
    { tag: 'path', d: "M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" },
    { tag: 'path', d: "m6.158 8.633 1.114 4.456" },
    { tag: 'path', d: "m8 21 3.105-6.21" },
    { tag: 'circle', cx: 12, cy: 13, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-15deg)' }], 320, { easing: 'ease-in-out', fill: 'forwards', origin: '12px 13px' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-15deg)' }], 320, { easing: 'ease-in-out', fill: 'forwards', origin: '12px 13px' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-15deg)' }], 320, { easing: 'ease-in-out', fill: 'forwards', origin: '12px 13px' }),
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-15deg)' }], 320, { easing: 'ease-in-out', fill: 'forwards', origin: '12px 13px' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const terminalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 19h8" },
    { tag: 'path', d: "m4 17 6-6-6-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 800, { easing: 'linear' }),
      },
    },
  },
);





export const thermometerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(5deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(5deg)' }, { transform: 'rotate(0deg)' }], 400, { easing: EASE }),
    },
  },
);

export const thumbsDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" },
    { tag: 'path', d: "M17 14V2" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px) rotate(0deg)' }, { transform: 'translate(-1px, 2px) rotate(-12deg)' }], 300, { easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

export const thumbsUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" },
    { tag: 'path', d: "M7 10v12" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px) rotate(0deg)' }, { transform: 'translate(-1px, -2px) rotate(-12deg)' }], 300, { easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

export const timerOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 2h4" },
    { tag: 'path', d: "M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7" },
    { tag: 'path', d: "M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M12 12v-2" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const timerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'line', x1: 10, x2: 14, y1: 2, y2: 2 },
    { tag: 'line', x1: 12, x2: 15, y1: 14, y2: 11 },
    { tag: 'circle', cx: 12, cy: 14, r: 8 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1) translateY(0)' }, { transform: 'scale(0.9) translateY(0.5px)' }, { transform: 'scale(1) translateY(0)' }], 300, { easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(300deg)' }], 600, { easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards', origin: '12px 14px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const toggleLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 9, cy: 12, r: 3 },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 5, rx: 7 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(6px)' }], 500, { easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const toggleRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 15, cy: 12, r: 3 },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 5, rx: 7 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-6px)' }], 500, { easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const tornadoIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 4H3" },
    { tag: 'path', d: "M18 8H6" },
    { tag: 'path', d: "M19 12H9" },
    { tag: 'path', d: "M16 16h-6" },
    { tag: 'path', d: "M11 20H9" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(0)' }], 3000, { easing: EASE }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(0)' }], 3000, { easing: EASE }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(0)' }], 3000, { easing: EASE }),
        4: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(-2px)' }, { transform: 'translateX(0)' }], 3000, { easing: EASE }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const touchpadOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 20v-6" },
    { tag: 'path', d: "M19.656 14H22" },
    { tag: 'path', d: "M2 14h12" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" },
    { tag: 'path', d: "M9.656 4H20a2 2 0 0 1 2 2v10.344" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const umbrellaOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13v7a2 2 0 0 0 4 0" },
    { tag: 'path', d: "M12 2v2" },
    { tag: 'path', d: "M18.656 13h2.336a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-12.07-7.51" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M5.961 5.957a10.28 10.28 0 0 0-3.922 5.769A1 1 0 0 0 3 13h10" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const unplugIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m19 5 3-3" },
    { tag: 'path', d: "m2 22 3-3" },
    { tag: 'path', d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" },
    { tag: 'path', d: "M7.5 13.5 10 11" },
    { tag: 'path', d: "M10.5 16.5 13 14" },
    { tag: 'path', d: "m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1)' }, { transform: 'scale(1.9)' }], 320, { easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)', fill: 'forwards', origin: '22px 2px' }),
        1: /* @__PURE__ */ track([{ transform: 'scale(1)' }, { transform: 'scale(1.9)' }], 320, { easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)', fill: 'forwards', origin: '2px 22px' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, -3px)' }], 320, { easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }], 220, { easing: 'ease-out', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }], 220, { easing: 'ease-out', fill: 'forwards' }),
        5: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, 3px)' }], 320, { easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);


// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const vibrateOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m2 8 2 2-2 2 2 2-2 2" },
    { tag: 'path', d: "m22 8-2 2 2 2-2 2 2 2" },
    { tag: 'path', d: "M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2" },
    { tag: 'path', d: "M16 10.34V6c0-.55-.45-1-1-1h-4.34" },
    { tag: 'line', x1: 2, x2: 22, y1: 2, y2: 22 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const vibrateIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m2 8 2 2-2 2 2 2-2 2" },
    { tag: 'path', d: "m22 8-2 2 2 2-2 2 2 2" },
    { tag: 'rect', width: 8, height: 14, x: 8, y: 5, rx: 1 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(5deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(5deg)' }, { transform: 'rotate(0deg)' }], 400, { easing: 'ease', origin: 'center' }),
      },
    },
  },
);

export const videoOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196" },
    { tag: 'path', d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" },
    { tag: 'path', d: "m2 2 20 20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const voteIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m9 12 2 2 4-4" },
    { tag: 'path', d: "M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" },
    { tag: 'path', d: "M22 19H2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);

export const webhookOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15" },
    { tag: 'path', d: "M9 3.4a4 4 0 0 1 6.52.66" },
    { tag: 'path', d: "m6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05" },
    { tag: 'path', d: "M20.3 20.3a4 4 0 0 1-2.3.7" },
    { tag: 'path', d: "M18.6 13a4 4 0 0 1 3.357 3.414" },
    { tag: 'path', d: "m12 6 .6 1" },
    { tag: 'path', d: "m2 2 20 20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const wheatOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m2 22 10-10" },
    { tag: 'path', d: "m16 8-1.17 1.17" },
    { tag: 'path', d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" },
    { tag: 'path', d: "m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97" },
    { tag: 'path', d: "M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62" },
    { tag: 'path', d: "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" },
    { tag: 'path', d: "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" },
    { tag: 'path', d: "m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98" },
    { tag: 'path', d: "M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28" },
    { tag: 'line', x1: 2, x2: 22, y1: 2, y2: 22 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);



export const wineOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 22h8" },
    { tag: 'path', d: "M7 10h3m7 0h-1.343" },
    { tag: 'path', d: "M12 15v7" },
    { tag: 'path', d: "M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198" },
    { tag: 'line', x1: 2, x2: 22, y1: 2, y2: 22 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const zapOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.768 5.111 13.44 2.44a1.5 1.5 0 012.474 1.561l-1.633 4.625" },
    { tag: 'path', d: "m18.889 13.232.672-.672A1.5 1.5 0 0018.5 10h-2.844" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "m7.94 7.94-3.5 3.499A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l5.5-5.5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);


// ─── Fase A: familias a medias ────────────────────────────────────────────────────────────────
// arrow-*, chart-* y monitor-* ya tenían hermanos curados. Estos extienden SU idioma, no inventan
// otro: la flecha se desliza con resorte contra una referencia quieta, la barra crece desde su
// base, y en el monitor solo se mueve lo que está dentro de la pantalla.

































// ─── Fase B: la familia square-* ──────────────────────────────────────────────────────────────
// El marco NO se mueve. Lo dictan los square-* que ya estaban curados (square-plus, square-kanban,
// square-chevron-down): el cuadro es el contenedor y animarlo le quita el punto de apoyo al gesto.
// Las flechas repiten lo de circle-arrow-*: la punta empuja y el asta encoge desde su extremo fijo.



















































// ─── Fase C: lo que distingue a cada icono de su base ─────────────────────────────────────────
// Se anima SOLO el glifo que da nombre al icono — el palomeo de un `-check`, la diagonal de un
// `-off` — y el resto se queda quieto, que es lo que ya hacían sus hermanos curados. El glifo se
// reconoce por su trazo relativo: es el mismo dibujo en todo el catálogo, solo colocado en otro
// lado, así que se identifica aunque Lucide haya redibujado la base de esa variante.

export const archiveXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 20, height: 5, x: 2, y: 3, rx: 1 },
    { tag: 'path', d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" },
    { tag: 'path', d: "m9.5 17 5-5" },
    { tag: 'path', d: "m9.5 12 5 5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 150, fill: 'backwards' }),
      },
    },
  },
);

export const audioLinesXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 3v18" },
    { tag: 'path', d: "M14 8v6.35" },
    { tag: 'path', d: "m17 17 5 5" },
    { tag: 'path', d: "M18 5v8.1" },
    { tag: 'path', d: "M2 10v3" },
    { tag: 'path', d: "M22 10v3" },
    { tag: 'path', d: "m22 17-5 5" },
    { tag: 'path', d: "M6 6v11" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 150, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 450, fill: 'backwards' }),
      },
    },
  },
);

export const banknoteCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11.748 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4.875" },
    { tag: 'path', d: "m16 19 2 2 4-4" },
    { tag: 'path', d: "M18 12h.01" },
    { tag: 'path', d: "M6 12h.01" },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const beefOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M11.771 6.109a2.5 2.5 0 0 1 3.12 3.12' },
    { tag: 'path', d: 'M17.852 12.185a6.5 6.5 0 0 0-9.035-9.04' },
    { tag: 'path', d: 'M18.013 18.013C15.029 20.349 10.831 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5' },
    { tag: 'path', d: 'm18.5 6 2.19 4.5a6.48 6.48 0 0 1-.139 4.393' },
    { tag: 'path', d: 'm2 2 20 20' },
    {
      tag: 'path',
      d: 'M6.355 6.37a7 7 0 0 0-.075.23c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c3.356 0 6.993-1.267 9.85-3.151',
    },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-7%)', offset: 0.1667 },
          { transform: 'translateX(7%)', offset: 0.3333 },
          { transform: 'translateX(-7%)', offset: 0.5 },
          { transform: 'translateX(7%)', offset: 0.6667 },
          { transform: 'translateX(0)', offset: 1 },
        ],
        600,
        { easing: EASE },
      ),
    },
  },
);

export const bugPlayIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97" },
    { tag: 'path', d: "M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z" },
    { tag: 'path', d: "M14.12 3.88 16 2" },
    { tag: 'path', d: "M21 5a4 4 0 0 1-3.55 3.97" },
    { tag: 'path', d: "M3 21a4 4 0 0 1 3.81-4" },
    { tag: 'path', d: "M3 5a4 4 0 0 0 3.55 3.97" },
    { tag: 'path', d: "M6 13H2" },
    { tag: 'path', d: "m8 2 1.88 1.88" },
    { tag: 'path', d: "M9 7.13V6a3 3 0 1 1 6 0v1.13" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 150, fill: 'backwards' }),
      },
    },
  },
);

export const cannabisOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M12 22v-4c1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5' },
    { tag: 'path', d: 'M13.988 8.327C13.902 6.054 13.365 3.82 12 2a9.3 9.3 0 0 0-1.445 2.9' },
    { tag: 'path', d: 'M17.375 11.725C18.882 10.53 21 7.841 21 6c-2.324 0-5.08 1.296-6.662 2.684' },
    { tag: 'path', d: 'm2 2 20 20' },
    { tag: 'path', d: 'M21.024 15.378A15 15 0 0 0 22 15c-.426-1.279-2.67-2.557-4.25-2.907' },
    {
      tag: 'path',
      d: 'M6.995 6.992C5.714 6.4 4.29 6 3 6c0 2 2.5 5 4 6-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3',
    },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-7%)', offset: 0.1667 },
          { transform: 'translateX(7%)', offset: 0.3333 },
          { transform: 'translateX(-7%)', offset: 0.5 },
          { transform: 'translateX(7%)', offset: 0.6667 },
          { transform: 'translateX(0)', offset: 1 },
        ],
        600,
        { easing: EASE },
      ),
    },
  },
);

export const cctvOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'm12.309 6.652 4.797 2.401a1 1 0 0 1 .447 1.341l-.501 1.001.605.605h2.725a1 1 0 0 1 .894 1.447l-.724 1.448',
    },
    {
      tag: 'path',
      d: 'm15.166 15.166-.719 1.439a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.9 2.9 0 0 1 .873-1.037',
    },
    { tag: 'path', d: 'M2 19h3.76a2 2 0 0 0 1.8-1.1l1.441-2.902' },
    { tag: 'path', d: 'm2 2 20 20' },
    { tag: 'path', d: 'M2 21v-4' },
    { tag: 'path', d: 'M7 9h.01' },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-7%)', offset: 0.1667 },
          { transform: 'translateX(7%)', offset: 0.3333 },
          { transform: 'translateX(-7%)', offset: 0.5 },
          { transform: 'translateX(7%)', offset: 0.6667 },
          { transform: 'translateX(0)', offset: 1 },
        ],
        600,
        { easing: EASE },
      ),
    },
  },
);


























export const columns3CogIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M10.6 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v5.6' },
    { tag: 'path', d: 'm14.305 19.53.923-.382' },
    { tag: 'path', d: 'M15 3v7.6' },
    { tag: 'path', d: 'm15.229 16.852-.924-.383' },
    { tag: 'path', d: 'm16.852 15.228-.383-.923' },
    { tag: 'path', d: 'm16.852 20.772-.383.924' },
    { tag: 'path', d: 'm19.148 15.228.383-.923' },
    { tag: 'path', d: 'm19.53 21.696-.382-.924' },
    { tag: 'path', d: 'm20.773 16.852.922-.383' },
    { tag: 'path', d: 'm20.773 19.148.922.383' },
    { tag: 'path', d: 'M9 3v18' },
    { tag: 'circle', cx: 18, cy: 18, r: 3 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        3: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        4: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        5: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        6: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        7: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        8: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        9: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        11: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
      },
    },
  },
);

export const contactRoundIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 2v2" },
    { tag: 'path', d: "M17.915 21a6 6 0 10-12 0" },
    { tag: 'path', d: "M8 2v2" },
    { tag: 'circle', cx: 12, cy: 11, r: 4 },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT, delay: 120, fill: 'backwards' }),
      },
    },
  },
);



export const disc3Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M6 12c0-1.7.7-3.2 1.8-4.2' },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
    { tag: 'path', d: 'M18 12c0 1.7-.7 3.2-1.8 4.2' },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
      },
    },
    active: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
          1000,
          { easing: 'linear', origin: '12px 12px', fill: 'forwards' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
          1000,
          { easing: 'linear', origin: '12px 12px', fill: 'forwards' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
          1000,
          { easing: 'linear', origin: '12px 12px', fill: 'forwards' },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
          1000,
          { easing: 'linear', origin: '12px 12px', fill: 'forwards' },
        ),
      },
      reverseOnLeave: true,
    },
  },
);

export const equalNotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'line', x1: 5, x2: 19, y1: 9, y2: 9 },
    { tag: 'line', x1: 5, x2: 19, y1: 15, y2: 15 },
    { tag: 'line', x1: 19, x2: 5, y1: 5, y2: 19 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const faceSlightlySmilingPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.267 2.08a10 10 0 108.653 8.653" },
    { tag: 'path', d: "M15 10V9" },
    { tag: 'path', d: "M16 5h6" },
    { tag: 'path', d: "M16.472 15a6 6 0 01-8.943 0" },
    { tag: 'path', d: "M19 2v6" },
    { tag: 'path', d: "M9 10V9" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 150, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
      },
    },
  },
);
























export const laptopMinimalCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 20h20" },
    { tag: 'path', d: "m9 10 2 2 4-4" },
    { tag: 'rect', x: 3, y: 4, width: 18, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);



export const locateFixedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'line', x1: 2, x2: 5, y1: 12, y2: 12 },
    { tag: 'line', x1: 19, x2: 22, y1: 12, y2: 12 },
    { tag: 'line', x1: 12, x2: 12, y1: 2, y2: 5 },
    { tag: 'line', x1: 12, x2: 12, y1: 19, y2: 22 },
    { tag: 'circle', cx: 12, cy: 12, r: 7 },
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT }),
      },
    },
  },
);







export const mountainSnowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m8 3 4 8 5-5 5 15H2L8 3z" },
    { tag: 'path', d: "M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const music4Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 18V5l12-2v13" },
    { tag: 'path', d: "m9 9 12-2" },
    { tag: 'circle', cx: 6, cy: 18, r: 3 },
    { tag: 'circle', cx: 18, cy: 16, r: 3 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);



export const octagonMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z" },
    { tag: 'path', d: "M8 12h8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const playOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10.215 4.56 9.79 5.71a2 2 0 0 1 .003 3.458l-.393.23" },
    { tag: 'path', d: "m16.042 16.042-8.034 4.686A2 2 0 0 1 5 19V5" },
    { tag: 'path', d: "m2 2 20 20" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);





export const redoDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 17, r: 1 },
    { tag: 'path', d: "M21 7v6h-6" },
    { tag: 'path', d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT }),
      },
    },
  },
);

export const repeat1Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m17 2 4 4-4 4" },
    { tag: 'path', d: "M3 11v-1a4 4 0 0 1 4-4h14" },
    { tag: 'path', d: "m7 22-4-4 4-4" },
    { tag: 'path', d: "M21 13v1a4 4 0 0 1-4 4H3" },
    { tag: 'path', d: "M11 10h1v4" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const repeatOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11.656 6H21l-4-4" },
    { tag: 'path', d: "M17.898 17.898A4 4 0 0 1 17 18H3l4-4" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M21 13v1a4 4 0 0 1-.171 1.159" },
    { tag: 'path', d: "m21 6-4 4" },
    { tag: 'path', d: "M3 11v-1a4 4 0 0 1 3.102-3.898" },
    { tag: 'path', d: "m7 22-4-4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const replaceAllIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" },
    { tag: 'path', d: "M14 4a1 1 0 0 1 1-1" },
    { tag: 'path', d: "M15 10a1 1 0 0 1-1-1" },
    { tag: 'path', d: "M19 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" },
    { tag: 'path', d: "M21 4a1 1 0 0 0-1-1" },
    { tag: 'path', d: "M21 9a1 1 0 0 1-1 1" },
    { tag: 'path', d: "m3 7 3 3 3-3" },
    { tag: 'path', d: "M6 10V5a2 2 0 0 1 2-2h2" },
    { tag: 'rect', x: 3, y: 14, width: 7, height: 7, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 150, fill: 'backwards' }),
      },
    },
  },
);









export const screenShareOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" },
    { tag: 'path', d: "M8 21h8" },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "m22 3-5 5" },
    { tag: 'path', d: "m17 3 5 5" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 150, fill: 'backwards' }),
      },
    },
  },
);


export const spellCheck2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m6 16 6-12 6 12" },
    { tag: 'path', d: "M8 12h8" },
    { tag: 'path', d: "M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const splinePointerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" },
    { tag: 'path', d: "M5 17A12 12 0 0 1 17 5" },
    { tag: 'circle', cx: 19, cy: 5, r: 2 },
    { tag: 'circle', cx: 5, cy: 19, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const sunMoonIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v2" },
    { tag: 'path', d: "M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715" },
    { tag: 'path', d: "M16 12a4 4 0 0 0-4-4" },
    { tag: 'path', d: "m19 5-1.256 1.256" },
    { tag: 'path', d: "M20 12h2" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 150, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
      },
    },
  },
);

export const tableCellsMergeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M12 21v-6' },
    { tag: 'path', d: 'M12 9V3' },
    { tag: 'path', d: 'M3 15h18' },
    { tag: 'path', d: 'M3 9h18' },
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1.5, 1.5, 0]), 550),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1.5, 1.5, 0]), 550, { delay: 60 }),
      },
    },
  },
);

export const tableCellsSplitIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M12 15V9' },
    { tag: 'path', d: 'M3 15h18' },
    { tag: 'path', d: 'M3 9h18' },
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1.5, 1.5, 0]), 550),
      },
    },
  },
);

export const ticketsPlaneIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12' },
    { tag: 'path', d: 'm12 13.5 3.794.506' },
    { tag: 'path', d: 'm3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8' },
    { tag: 'path', d: 'M6 10V8' },
    { tag: 'path', d: 'M6 14v1' },
    { tag: 'path', d: 'M6 19v2' },
    { tag: 'rect', x: 2, y: 8, width: 20, height: 13, rx: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-8deg)', offset: 0.25 },
          { transform: 'rotate(-8deg)', offset: 0.7 },
          { transform: 'rotate(0deg)', offset: 1 },
        ],
        800,
        { easing: 'ease-in-out', origin: '12.5% 87.5%' },
      ),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, {
          easing: 'ease-out',
          delay: 150,
          fill: 'backwards',
        }),
      },
    },
  },
);

export const tvMinimalPlayIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z" },
    { tag: 'path', d: "M7 21h10" },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 3, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
  },
);

export const webcamOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: 'M12 22v-4' },
    { tag: 'path', d: 'M12.754 7.096a3 3 0 0 1 2.15 2.15' },
    { tag: 'path', d: 'M12.863 12.873a3 3 0 0 1-3.736-3.735' },
    { tag: 'path', d: 'M16.566 16.57A8 8 0 0 1 5.43 5.433' },
    { tag: 'path', d: 'm2 2 20 20' },
    { tag: 'path', d: 'M7 22h10' },
    { tag: 'path', d: 'M8.478 2.817a8 8 0 0 1 10.705 10.705' },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-7%)', offset: 0.1667 },
          { transform: 'translateX(7%)', offset: 0.3333 },
          { transform: 'translateX(-7%)', offset: 0.5 },
          { transform: 'translateX(7%)', offset: 0.6667 },
          { transform: 'translateX(0)', offset: 1 },
        ],
        600,
        { easing: EASE },
      ),
    },
  },
);

export const wrenchOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: 'M10.747 5.093a6 6 0 0 1 6.841-2.882c.438.12.54.662.219.984L14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-2.882 6.842',
    },
    { tag: 'path', d: 'm13.5 13.5-7.88 7.88a1 1 0 0 1-2.999-3l7.88-7.88' },
    { tag: 'path', d: 'm2 2 20 20' },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-7%)', offset: 0.1667 },
          { transform: 'translateX(7%)', offset: 0.3333 },
          { transform: 'translateX(-7%)', offset: 0.5 },
          { transform: 'translateX(7%)', offset: 0.6667 },
          { transform: 'translateX(0)', offset: 1 },
        ],
        600,
        { easing: EASE },
      ),
    },
  },
);













// ── Familias extraídas a ./icons/ ─────────────────────────────────────────────────────────────
//
// Van las dos formas y no es redundancia: `export *` publica los símbolos hacia afuera (es lo
// que sostiene public-api.ts y la ruta tree-shakeable del consumidor), y el `import` nombrado
// los mete en el scope de este módulo, que es lo que necesita el literal CURATED_ICONS de abajo.
// Nombrado y no `import * as`: un namespace object ancla el módulo entero y mata el árbol.
export * from './icons/square';
import { squareActivityIcon, squareArrowDownLeftIcon, squareArrowDownRightIcon, squareArrowDownIcon, squareArrowLeftIcon, squareArrowRightEnterIcon, squareArrowRightExitIcon, squareArrowRightIcon, squareArrowUpLeftIcon, squareArrowUpRightIcon, squareArrowUpIcon, squareAsteriskIcon, squareBottomDashedScissorsIcon, squareCodeIcon, squareDashedBottomCodeIcon, squareDashedBottomIcon, squareDashedMousePointerIcon, squareDashedTextIcon, squareDashedTopSolidIcon, squareDashedIcon, squareDivideIcon, squareDotIcon, squareEqualIcon, squareFunctionIcon, squareLibraryIcon, squareMIcon, squareMenuIcon, squareMinusIcon, squareMousePointerIcon, squareOffIcon, squareParkingIcon, squarePauseIcon, squarePercentIcon, squarePiIcon, squarePilcrowIcon, squarePlayIcon, squarePowerIcon, squareRadicalIcon, squareRoundCornerIcon, squareSigmaIcon, squareSlashIcon, squareSplitHorizontalIcon, squareSplitVerticalIcon, squareSquareIcon, squareStarIcon, squareStopIcon, squareUserRoundIcon, squareUserIcon, squareXIcon, squareArrowOutDownLeftIcon, squareArrowOutDownRightIcon, squareArrowOutUpLeftIcon, squareArrowOutUpRightIcon, squareChartGanttIcon, squareCheckBigIcon, squareCheckIcon, squareChevronDownIcon, squareChevronLeftIcon, squareChevronRightIcon, squareChevronUpIcon, squareDashedKanbanIcon, squareKanbanIcon, squareParkingOffIcon, squarePlusIcon, squareScissorsIcon, squareStackIcon, squareTerminalIcon, squarePenIcon, squareCenterlineDashedHorizontalIcon, squareCenterlineDashedVerticalIcon, squareIcon } from './icons/square';
export * from './icons/arrow';
import { arrowDownFromLineIcon, arrowDownToDotIcon, arrowDownToLineIcon, arrowLeftFromLineIcon, arrowLeftToLineIcon, arrowRightFromLineIcon, arrowRightToLineIcon, arrowUpFromDotIcon, arrowUpFromLineIcon, arrowUpToLineIcon, arrowDownUpIcon, arrowUpDownIcon, arrowDownNarrowWideIcon, arrowUpNarrowWideIcon, arrowDownWideNarrowIcon, arrowUpWideNarrowIcon, arrowBigDownDashIcon, arrowBigDownIcon, arrowBigLeftDashIcon, arrowBigLeftIcon, arrowBigRightDashIcon, arrowBigRightIcon, arrowBigUpDashIcon, arrowBigUpIcon, arrowDown01Icon, arrowDown10Icon, arrowDownAZIcon, arrowDownZAIcon, arrowLeftRightIcon, arrowRightLeftIcon, arrowUp01Icon, arrowUp10Icon, arrowUpAZIcon, arrowUpZAIcon, arrowLeftIcon, arrowRightIcon, arrowUpIcon, arrowDownIcon, arrowUpLeftIcon, arrowUpRightIcon, arrowDownLeftIcon, arrowDownRightIcon } from './icons/arrow';
export * from './icons/file';
import { fileAxis3dIcon, fileBracesCornerIcon, fileBracesIcon, fileCodeCornerIcon, fileCodeIcon, fileCogIcon, fileImageIcon, fileInputIcon, fileMinusCornerIcon, filePlayIcon, filePlusCornerIcon, fileSearchCornerIcon, fileSearchIcon, fileSignalIcon, fileTypeCornerIcon, fileTypeIcon, fileUserIcon, fileXCornerIcon, fileChartColumnIncreasingIcon, fileChartColumnIcon, fileChartLineIcon, fileDownIcon, fileMinusIcon, filePenIcon, filePlusIcon, fileQuestionMarkIcon, fileSlidersIcon, fileTerminalIcon, fileUpIcon, fileTextIcon, fileCheckIcon, fileXIcon, fileIcon, fileCheckCornerIcon, fileSpreadsheetIcon, fileBadgeIcon, fileExclamationPointIcon } from './icons/file';
export * from './icons/circle';
import { circleDotIcon, circleEuroIcon, circleMinusIcon, circleParkingIcon, circlePlayIcon, circlePoundSterlingIcon, circleSlash2Icon, circleSlashIcon, circleStarIcon, circleStopIcon, circleArrowDownIcon, circleArrowLeftIcon, circleArrowOutDownLeftIcon, circleArrowOutDownRightIcon, circleArrowOutUpLeftIcon, circleArrowOutUpRightIcon, circleArrowRightIcon, circleArrowUpIcon, circleCheckBigIcon, circleChevronDownIcon, circleChevronLeftIcon, circleChevronRightIcon, circleChevronUpIcon, circleOffIcon, circleParkingOffIcon, circleAlertIcon, circleCheckIcon, circleXIcon, circlePlusIcon, circleQuestionMarkIcon, circleIcon } from './icons/circle';
export * from './icons/folder';
import { folderIcon, folderOpenIcon, folderArchiveIcon, folderBookmarkIcon, folderCheckIcon, folderClockIcon, folderClosedIcon, folderCodeIcon, folderCogIcon, folderDotIcon, folderDownIcon, folderGit2Icon, folderGitIcon, folderHeartIcon, folderInputIcon, folderKanbanIcon, folderKeyIcon, folderLockIcon, folderMinusIcon, folderOpenDotIcon, folderOutputIcon, folderPenIcon, folderPlusIcon, folderRootIcon, folderSearch2Icon, folderSearchIcon, folderSymlinkIcon, folderSyncIcon, folderTreeIcon, folderUpIcon, folderXIcon } from './icons/folder';
export * from './icons/chart';
import { chartAreaIcon, chartBarBigIcon, chartBarStackedIcon, chartColumnStackedIcon, chartColumnBigIcon, chartCandlestickIcon, chartNetworkIcon, chartBarDecreasingIcon, chartBarIncreasingIcon, chartBarIcon, chartColumnDecreasingIcon, chartColumnIncreasingIcon, chartGanttIcon, chartLineIcon, chartNoAxesColumnDecreasingIcon, chartNoAxesColumnIncreasingIcon, chartNoAxesColumnIcon, chartNoAxesCombinedIcon, chartNoAxesGanttIcon, chartPieIcon, chartScatterIcon, chartSplineIcon, chartColumnIcon } from './icons/chart';
export * from './icons/book';
import { bookAIcon, bookAudioIcon, bookCheckIcon, bookDashedIcon, bookDownIcon, bookHeadphonesIcon, bookHeartIcon, bookImageIcon, bookKeyIcon, bookLockIcon, bookMarkedIcon, bookMinusIcon, bookOpenCheckIcon, bookOpenTextIcon, bookPlusIcon, bookTextIcon, bookTypeIcon, bookUp2Icon, bookUpIcon, bookUserIcon, bookXIcon, bookIcon, bookOpenIcon } from './icons/book';
export * from './icons/calendar';
import { calendarIcon, calendarCheckIcon, calendarClockIcon, calendarDaysIcon, calendar1Icon, calendarArrowDownIcon, calendarArrowUpIcon, calendarCheck2Icon, calendarCogIcon, calendarFoldIcon, calendarHeartIcon, calendarMinus2Icon, calendarMinusIcon, calendarOffIcon, calendarPlus2Icon, calendarPlusIcon, calendarRangeIcon, calendarSearchIcon, calendarSyncIcon, calendarX2Icon, calendarXIcon } from './icons/calendar';
export * from './icons/panel';
import { panelLeftIcon, panelLeftCloseIcon, panelLeftOpenIcon, panelRightIcon, panelRightCloseIcon, panelRightOpenIcon, panelTopIcon, panelTopCloseIcon, panelTopOpenIcon, panelBottomIcon, panelBottomCloseIcon, panelBottomOpenIcon, panelLeftDashedIcon, panelRightDashedIcon, panelTopDashedIcon, panelBottomDashedIcon, panelTopBottomDashedIcon, panelLeftRightDashedIcon } from './icons/panel';
export * from './icons/git';
import { gitBranchMinusIcon, gitPullRequestArrowIcon, gitPullRequestCreateArrowIcon, gitPullRequestDraftIcon, gitForkIcon, gitBranchIcon, gitBranchPlusIcon, gitCommitHorizontalIcon, gitCommitVerticalIcon, gitCompareIcon, gitCompareArrowsIcon, gitGraphIcon, gitMergeConflictIcon, gitMergeIcon, gitPullRequestIcon, gitPullRequestClosedIcon, gitPullRequestCreateIcon } from './icons/git';
export * from './icons/user';
import { userPenIcon, userIcon, userCheckIcon, userMinusIcon, userPlusIcon, userXIcon, userCogIcon, userRoundIcon, userRoundArrowLeftIcon, userRoundCheckIcon, userRoundCogIcon, userRoundKeyIcon, userRoundMinusIcon, userRoundPenIcon, userRoundPlusIcon, userRoundSearchIcon, userRoundXIcon } from './icons/user';
export * from './icons/badge';
import { badgeIcon, badgeCheckIcon, badgeAlertIcon, badgeCentIcon, badgeDollarSignIcon, badgeEuroIcon, badgeIndianRupeeIcon, badgeInfoIcon, badgeJapaneseYenIcon, badgeMinusIcon, badgePercentIcon, badgePlusIcon, badgePoundSterlingIcon, badgeQuestionMarkIcon, badgeRussianRubleIcon, badgeSwissFrancIcon, badgeTurkishLiraIcon, badgeXIcon } from './icons/badge';
export * from './icons/monitor';
import { monitorCloudIcon, monitorDotIcon, monitorPlayIcon, monitorStopIcon, monitorSmartphoneIcon, monitorPauseIcon, monitorXIcon, monitorSpeakerIcon, monitorCheckIcon, monitorCogIcon, monitorDownIcon, monitorOffIcon, monitorUpIcon, monitorIcon } from './icons/monitor';
export * from './icons/shield';
import { shieldQuestionMarkIcon, shieldCheckIcon, shieldBanIcon, shieldCogIcon, shieldHalfIcon, shieldKeyholeIcon, shieldLockIcon, shieldMinusIcon, shieldPlusIcon, shieldUserIcon, shieldXIcon, shieldIcon, shieldAlertIcon, shieldOffIcon } from './icons/shield';
export * from './icons/clock';
import { clock1Icon, clock10Icon, clock11Icon, clock12Icon, clock2Icon, clock3Icon, clock5Icon, clock6Icon, clock7Icon, clock8Icon, clock9Icon, clockArrowRightIcon, clockIcon } from './icons/clock';
export * from './icons/map';
import { mapPinOffIcon, mapPinIcon, mapPinCheckIcon, mapPinCheckInsideIcon, mapPinHouseIcon, mapPinMinusIcon, mapPinMinusInsideIcon, mapPinPlusIcon, mapPinPlusInsideIcon, mapPinSearchIcon, mapPinXIcon, mapPinXInsideIcon, mapIcon } from './icons/map';
export * from './icons/message';
import { messageCircleCheckIcon, messageCircleHeartIcon, messageSquareCheckIcon, messageSquareHeartIcon, messageCircleMoreIcon, messageCircleOffIcon, messageCircleQuestionMarkIcon, messageCircleWarningIcon, messageCircleIcon, messageSquareMoreIcon, messageSquareOffIcon, messageSquareIcon } from './icons/message';
export * from './icons/clipboard';
import { clipboardIcon, clipboardCheckIcon, clipboardClockIcon, clipboardCopyIcon, clipboardListIcon, clipboardMinusIcon, clipboardPasteIcon, clipboardPenLineIcon, clipboardPenIcon, clipboardPlusIcon, clipboardTypeIcon, clipboardXIcon } from './icons/clipboard';
export * from './icons/move';
import { moveIcon, moveDiagonal2Icon, moveDiagonalIcon, moveDownLeftIcon, moveDownRightIcon, moveDownIcon, moveHorizontalIcon, moveLeftIcon, moveRightIcon, moveUpLeftIcon, moveUpRightIcon, moveUpIcon, moveVerticalIcon } from './icons/move';
export * from './icons/scan';
import { scanIcon, scanBarcodeIcon, scanEyeIcon, scanFaceIcon, scanHeartIcon, scanLineIcon, scanQrCodeIcon, scanSearchIcon, scanSquareIcon, scanTextIcon } from './icons/scan';
export * from './icons/mouse';
import { mousePointerClickIcon, mousePointerIcon, mousePointer2Icon, mousePointer2OffIcon, mousePointerBanIcon, mouseIcon, mouseLeftIcon, mouseOffIcon, mouseRightIcon } from './icons/mouse';
export * from './icons/chevrons';
import { chevronsDownUpIcon, chevronsDownIcon, chevronsLeftRightIcon, chevronsLeftIcon, chevronsRightLeftIcon, chevronsRightIcon, chevronsUpIcon, chevronsUpDownIcon } from './icons/chevrons';
export * from './icons/heart';
import { heartIcon, heartPulseIcon, heartCrackIcon, heartHandshakeIcon, heartMinusIcon, heartOffIcon, heartPlusIcon, heartXIcon } from './icons/heart';
export * from './icons/image';
import { imageIcon, imageOffIcon, imageDownIcon, imageMinusIcon, imagePlayIcon, imagePlusIcon, imageUpIcon, imageUpscaleIcon } from './icons/image';
export * from './icons/cloud';
import { cloudIcon, cloudCogIcon, cloudMoonRainIcon, cloudSunRainIcon, cloudDownloadIcon, cloudMoonIcon, cloudOffIcon, cloudUploadIcon } from './icons/cloud';
export * from './icons/bell';
import { bellIcon, bellRingIcon, bellCheckIcon, bellDotIcon, bellMinusIcon, bellOffIcon, bellPlusIcon } from './icons/bell';
export * from './icons/package';
import { packageIcon, packageCheckIcon, packageMinusIcon, packageOpenIcon, packagePlusIcon, packageXIcon, packageSearchIcon } from './icons/package';
export * from './icons/ticket';
import { ticketIcon, ticketCheckIcon, ticketMinusIcon, ticketPercentIcon, ticketPlusIcon, ticketSlashIcon, ticketXIcon } from './icons/ticket';
export * from './icons/layout';
import { layoutDashboardIcon, layoutGridIcon, layoutPanelLeftIcon, layoutPanelTopIcon, layoutListIcon, layoutTemplateIcon, layoutFreeformIcon } from './icons/layout';
export * from './icons/star';
import { starIcon, starCheckIcon, starHalfIcon, starMinusIcon, starOffIcon, starPlusIcon, starXIcon } from './icons/star';
export * from './icons/list';
import { listFilterPlusIcon, listTreeIcon, listCheckIcon, listTodoIcon, listIcon, listChecksIcon } from './icons/list';
export * from './icons/battery';
import { batteryChargingIcon, batteryFullIcon, batteryLowIcon, batteryMediumIcon, batteryWarningIcon, batteryIcon } from './icons/battery';
export * from './icons/dice';
import { dice1Icon, dice2Icon, dice3Icon, dice4Icon, dice5Icon, dice6Icon } from './icons/dice';
export * from './icons/wifi';
import { wifiOffIcon, wifiPenIcon, wifiIcon, wifiHighIcon, wifiLowIcon, wifiZeroIcon } from './icons/wifi';
export * from './icons/copy';
import { copyIcon, copyCheckIcon, copyMinusIcon, copyPlusIcon, copySlashIcon, copyXIcon } from './icons/copy';
export * from './icons/save';
import { saveIcon, saveCheckIcon, saveOffIcon, savePenIcon, savePlusIcon, saveAllIcon } from './icons/save';
export * from './icons/bookmark';
import { bookmarkIcon, bookmarkCheckIcon, bookmarkMinusIcon, bookmarkOffIcon, bookmarkPlusIcon, bookmarkXIcon } from './icons/bookmark';
export * from './icons/sticky';
import { stickyNoteIcon, stickyNoteCheckIcon, stickyNoteMinusIcon, stickyNoteOffIcon, stickyNotePlusIcon, stickyNoteXIcon } from './icons/sticky';
export * from './icons/globe';
import { globeIcon, globeCheckIcon, globeLockIcon, globeOffIcon, globeXIcon } from './icons/globe';
export * from './icons/alarm';
import { alarmClockIcon, alarmClockCheckIcon, alarmClockMinusIcon, alarmClockOffIcon, alarmClockPlusIcon } from './icons/alarm';
export * from './icons/server';
import { serverIcon, serverCogIcon, serverCrashIcon, serverOffIcon, serverPlusIcon } from './icons/server';
export * from './icons/volume';
import { volume2Icon, volumeIcon, volume1Icon, volumeOffIcon, volumeXIcon } from './icons/volume';
export * from './icons/signal';
import { signalIcon, signalHighIcon, signalMediumIcon, signalLowIcon, signalZeroIcon } from './icons/signal';
export * from './icons/tally';
import { tally1Icon, tally2Icon, tally3Icon, tally4Icon, tally5Icon } from './icons/tally';
export * from './icons/receipt';
import { receiptJapaneseYenIcon, receiptPoundSterlingIcon, receiptTurkishLiraIcon, receiptIcon } from './icons/receipt';
export * from './icons/between';
import { betweenHorizontalEndIcon, betweenHorizontalStartIcon, betweenVerticalEndIcon, betweenVerticalStartIcon } from './icons/between';
export * from './icons/gallery';
import { galleryHorizontalEndIcon, galleryHorizontalIcon, galleryVerticalEndIcon, galleryVerticalIcon } from './icons/gallery';
export * from './icons/refresh';
import { refreshCcwDotIcon, refreshCcwIcon, refreshCwOffIcon, refreshCwIcon } from './icons/refresh';
export * from './icons/rotate';
import { rotateCcwKeyIcon, rotateCcwClockIcon, rotateCcwIcon, rotateCwIcon } from './icons/rotate';
export * from './icons/text';
import { textAlignCenterIcon, textCursorInputIcon, textCursorIcon, textSearchIcon } from './icons/text';
export * from './icons/chevron';
import { chevronRightIcon, chevronDownIcon, chevronLeftIcon, chevronUpIcon } from './icons/chevron';
export * from './icons/search';
import { searchIcon, searchCheckIcon, searchSlashIcon, searchXIcon } from './icons/search';
export * from './icons/grid';
import { grid2x2Icon, grid2x2CheckIcon, grid2x2PlusIcon, grid2x2XIcon } from './icons/grid';
export * from './icons/database';
import { databaseCheckIcon, databaseMinusIcon, databaseIcon } from './icons/database';
export * from './icons/house';
import { houseHeartIcon, houseWifiIcon, houseIcon } from './icons/house';
export * from './icons/lock';
import { lockKeyholeOpenIcon, lockOpenIcon, lockIcon } from './icons/lock';
export * from './icons/notebook';
import { notebookIcon, notebookTabsIcon, notebookTextIcon, notebookPenIcon } from './icons/notebook';
export * from './icons/radio';
import { radioOffIcon, radioTowerIcon, radioIcon } from './icons/radio';
export * from './icons/smartphone';
import { smartphoneChargingIcon, smartphoneNfcIcon, smartphoneIcon } from './icons/smartphone';
export * from './icons/briefcase';
import { briefcaseBusinessIcon, briefcaseMedicalIcon, briefcaseIcon } from './icons/briefcase';
export * from './icons/grip';
import { gripHorizontalIcon, gripIcon, gripVerticalIcon } from './icons/grip';
export * from './icons/hard';
import { hardDriveDownloadIcon, hardDriveUploadIcon, hardDriveIcon } from './icons/hard';
export * from './icons/key';
import { keySquareIcon, keyIcon, keyRoundIcon } from './icons/key';
export * from './icons/link';
import { link2OffIcon, linkIcon, link2Icon } from './icons/link';
export * from './icons/navigation';
import { navigation2OffIcon, navigationOffIcon, navigationIcon } from './icons/navigation';
export * from './icons/pen';
import { penOffIcon, penIcon, penLineIcon } from './icons/pen';
export * from './icons/pencil';
import { pencilLineIcon, pencilOffIcon, pencilIcon } from './icons/pencil';

export const CURATED_ICONS: Record<string, AnimatedIconDef> = {
  'archive-x': archiveXIcon,
  'audio-lines-x': audioLinesXIcon,
  'banknote-check': banknoteCheckIcon,
  'beef-off': beefOffIcon,
  'bug-play': bugPlayIcon,
  'cannabis-off': cannabisOffIcon,
  'cctv-off': cctvOffIcon,
  'circle-dot': circleDotIcon,
  'circle-euro': circleEuroIcon,
  'circle-minus': circleMinusIcon,
  'circle-parking': circleParkingIcon,
  'circle-play': circlePlayIcon,
  'circle-pound-sterling': circlePoundSterlingIcon,
  'circle-slash-2': circleSlash2Icon,
  'circle-slash': circleSlashIcon,
  'circle-star': circleStarIcon,
  'circle-stop': circleStopIcon,
  'clock-1': clock1Icon,
  'clock-10': clock10Icon,
  'clock-11': clock11Icon,
  'clock-12': clock12Icon,
  'clock-2': clock2Icon,
  'clock-3': clock3Icon,
  'clock-5': clock5Icon,
  'clock-6': clock6Icon,
  'clock-7': clock7Icon,
  'clock-8': clock8Icon,
  'clock-9': clock9Icon,
  'clock-arrow-right': clockArrowRightIcon,
  cloud: cloudIcon,
  'cloud-cog': cloudCogIcon,
  'cloud-moon-rain': cloudMoonRainIcon,
  'cloud-sun-rain': cloudSunRainIcon,
  'columns-3-cog': columns3CogIcon,
  'contact-round': contactRoundIcon,
  'database-check': databaseCheckIcon,
  'database-minus': databaseMinusIcon,
  'disc-3': disc3Icon,
  'equal-not': equalNotIcon,
  'face-slightly-smiling-plus': faceSlightlySmilingPlusIcon,
  'file-axis-3d': fileAxis3dIcon,
  'file-braces-corner': fileBracesCornerIcon,
  'file-braces': fileBracesIcon,
  'file-code-corner': fileCodeCornerIcon,
  'file-code': fileCodeIcon,
  'file-cog': fileCogIcon,
  'file-image': fileImageIcon,
  'file-input': fileInputIcon,
  'file-minus-corner': fileMinusCornerIcon,
  'file-play': filePlayIcon,
  'file-plus-corner': filePlusCornerIcon,
  'file-search-corner': fileSearchCornerIcon,
  'file-search': fileSearchIcon,
  'file-signal': fileSignalIcon,
  'file-type-corner': fileTypeCornerIcon,
  'file-type': fileTypeIcon,
  'file-user': fileUserIcon,
  'file-x-corner': fileXCornerIcon,
  'git-branch-minus': gitBranchMinusIcon,
  'git-pull-request-arrow': gitPullRequestArrowIcon,
  'git-pull-request-create-arrow': gitPullRequestCreateArrowIcon,
  'git-pull-request-draft': gitPullRequestDraftIcon,
  'house-heart': houseHeartIcon,
  'laptop-minimal-check': laptopMinimalCheckIcon,
  'list-filter-plus': listFilterPlusIcon,
  'list-tree': listTreeIcon,
  'locate-fixed': locateFixedIcon,
  'lock-keyhole-open': lockKeyholeOpenIcon,
  'lock-open': lockOpenIcon,
  'message-circle-check': messageCircleCheckIcon,
  'message-circle-heart': messageCircleHeartIcon,
  'message-square-check': messageSquareCheckIcon,
  'message-square-heart': messageSquareHeartIcon,
  'mountain-snow': mountainSnowIcon,
  'music-4': music4Icon,
  notebook: notebookIcon,
  'notebook-tabs': notebookTabsIcon,
  'notebook-text': notebookTextIcon,
  'octagon-minus': octagonMinusIcon,
  'play-off': playOffIcon,
  'radio-off': radioOffIcon,
  'receipt-japanese-yen': receiptJapaneseYenIcon,
  'receipt-pound-sterling': receiptPoundSterlingIcon,
  'receipt-turkish-lira': receiptTurkishLiraIcon,
  'redo-dot': redoDotIcon,
  'repeat-1': repeat1Icon,
  'repeat-off': repeatOffIcon,
  'replace-all': replaceAllIcon,
  scan: scanIcon,
  'scan-barcode': scanBarcodeIcon,
  'scan-eye': scanEyeIcon,
  'scan-face': scanFaceIcon,
  'scan-heart': scanHeartIcon,
  'scan-line': scanLineIcon,
  'scan-qr-code': scanQrCodeIcon,
  'scan-search': scanSearchIcon,
  'scan-square': scanSquareIcon,
  'screen-share-off': screenShareOffIcon,
  'smartphone-charging': smartphoneChargingIcon,
  'spell-check-2': spellCheck2Icon,
  'spline-pointer': splinePointerIcon,
  'sun-moon': sunMoonIcon,
  'table-cells-merge': tableCellsMergeIcon,
  'table-cells-split': tableCellsSplitIcon,
  'tickets-plane': ticketsPlaneIcon,
  'tv-minimal-play': tvMinimalPlayIcon,
  'webcam-off': webcamOffIcon,
  'wrench-off': wrenchOffIcon,
  'square-activity': squareActivityIcon,
  'square-arrow-down-left': squareArrowDownLeftIcon,
  'square-arrow-down-right': squareArrowDownRightIcon,
  'square-arrow-down': squareArrowDownIcon,
  'square-arrow-left': squareArrowLeftIcon,
  'square-arrow-right-enter': squareArrowRightEnterIcon,
  'square-arrow-right-exit': squareArrowRightExitIcon,
  'square-arrow-right': squareArrowRightIcon,
  'square-arrow-up-left': squareArrowUpLeftIcon,
  'square-arrow-up-right': squareArrowUpRightIcon,
  'square-arrow-up': squareArrowUpIcon,
  'square-asterisk': squareAsteriskIcon,
  'square-bottom-dashed-scissors': squareBottomDashedScissorsIcon,
  'square-code': squareCodeIcon,
  'square-dashed-bottom-code': squareDashedBottomCodeIcon,
  'square-dashed-bottom': squareDashedBottomIcon,
  'square-dashed-mouse-pointer': squareDashedMousePointerIcon,
  'square-dashed-text': squareDashedTextIcon,
  'square-dashed-top-solid': squareDashedTopSolidIcon,
  'square-dashed': squareDashedIcon,
  'square-divide': squareDivideIcon,
  'square-dot': squareDotIcon,
  'square-equal': squareEqualIcon,
  'square-function': squareFunctionIcon,
  'square-library': squareLibraryIcon,
  'square-m': squareMIcon,
  'square-menu': squareMenuIcon,
  'square-minus': squareMinusIcon,
  'square-mouse-pointer': squareMousePointerIcon,
  'square-off': squareOffIcon,
  'square-parking': squareParkingIcon,
  'square-pause': squarePauseIcon,
  'square-percent': squarePercentIcon,
  'square-pi': squarePiIcon,
  'square-pilcrow': squarePilcrowIcon,
  'square-play': squarePlayIcon,
  'square-power': squarePowerIcon,
  'square-radical': squareRadicalIcon,
  'square-round-corner': squareRoundCornerIcon,
  'square-sigma': squareSigmaIcon,
  'square-slash': squareSlashIcon,
  'square-split-horizontal': squareSplitHorizontalIcon,
  'square-split-vertical': squareSplitVerticalIcon,
  'square-square': squareSquareIcon,
  'square-star': squareStarIcon,
  'square-stop': squareStopIcon,
  'square-user-round': squareUserRoundIcon,
  'square-user': squareUserIcon,
  'square-x': squareXIcon,
  'arrow-down-from-line': arrowDownFromLineIcon,
  'arrow-down-to-dot': arrowDownToDotIcon,
  'arrow-down-to-line': arrowDownToLineIcon,
  'arrow-left-from-line': arrowLeftFromLineIcon,
  'arrow-left-to-line': arrowLeftToLineIcon,
  'arrow-right-from-line': arrowRightFromLineIcon,
  'arrow-right-to-line': arrowRightToLineIcon,
  'arrow-up-from-dot': arrowUpFromDotIcon,
  'arrow-up-from-line': arrowUpFromLineIcon,
  'arrow-up-to-line': arrowUpToLineIcon,
  'arrow-down-up': arrowDownUpIcon,
  'arrow-up-down': arrowUpDownIcon,
  'arrow-down-narrow-wide': arrowDownNarrowWideIcon,
  'arrow-up-narrow-wide': arrowUpNarrowWideIcon,
  'arrow-down-wide-narrow': arrowDownWideNarrowIcon,
  'arrow-up-wide-narrow': arrowUpWideNarrowIcon,
  'chart-area': chartAreaIcon,
  'chart-bar-big': chartBarBigIcon,
  'chart-bar-stacked': chartBarStackedIcon,
  'chart-column-stacked': chartColumnStackedIcon,
  'chart-column-big': chartColumnBigIcon,
  'chart-candlestick': chartCandlestickIcon,
  'chart-network': chartNetworkIcon,
  'monitor-cloud': monitorCloudIcon,
  'monitor-dot': monitorDotIcon,
  'monitor-play': monitorPlayIcon,
  'monitor-stop': monitorStopIcon,
  'monitor-smartphone': monitorSmartphoneIcon,
  'monitor-pause': monitorPauseIcon,
  'monitor-x': monitorXIcon,
  'monitor-speaker': monitorSpeakerIcon,
  'airplay': airplayIcon,
  'align-horizontal-space-around': alignHorizontalSpaceAroundIcon,
  'align-vertical-space-around': alignVerticalSpaceAroundIcon,
  'anvil': anvilIcon,
  'archive': archiveIcon,
  'arrow-big-down-dash': arrowBigDownDashIcon,
  'arrow-big-down': arrowBigDownIcon,
  'arrow-big-left-dash': arrowBigLeftDashIcon,
  'arrow-big-left': arrowBigLeftIcon,
  'arrow-big-right-dash': arrowBigRightDashIcon,
  'arrow-big-right': arrowBigRightIcon,
  'arrow-big-up-dash': arrowBigUpDashIcon,
  'arrow-big-up': arrowBigUpIcon,
  'arrow-down-0-1': arrowDown01Icon,
  'arrow-down-1-0': arrowDown10Icon,
  'arrow-down-a-z': arrowDownAZIcon,
  'arrow-down-z-a': arrowDownZAIcon,
  'arrow-left-right': arrowLeftRightIcon,
  'arrow-right-left': arrowRightLeftIcon,
  'arrow-up-0-1': arrowUp01Icon,
  'arrow-up-1-0': arrowUp10Icon,
  'arrow-up-a-z': arrowUpAZIcon,
  'arrow-up-z-a': arrowUpZAIcon,
  'award': awardIcon,
  'axe': axeIcon,
  'axis-3d': axis3dIcon,
  'battery-charging': batteryChargingIcon,
  'battery-full': batteryFullIcon,
  'battery-low': batteryLowIcon,
  'battery-medium': batteryMediumIcon,
  'battery-warning': batteryWarningIcon,
  'battery': batteryIcon,
  'bean-off': beanOffIcon,
  'beer-off': beerOffIcon,
  'between-horizontal-end': betweenHorizontalEndIcon,
  'between-horizontal-start': betweenHorizontalStartIcon,
  'between-vertical-end': betweenVerticalEndIcon,
  'between-vertical-start': betweenVerticalStartIcon,
  'binary': binaryIcon,
  'blend': blendIcon,
  'blocks': blocksIcon,
  'bluetooth-off': bluetoothOffIcon,
  'bolt': boltIcon,
  'bone': boneIcon,
  'book-a': bookAIcon,
  'book-audio': bookAudioIcon,
  'book-check': bookCheckIcon,
  'book-dashed': bookDashedIcon,
  'book-down': bookDownIcon,
  'book-headphones': bookHeadphonesIcon,
  'book-heart': bookHeartIcon,
  'book-image': bookImageIcon,
  'book-key': bookKeyIcon,
  'book-lock': bookLockIcon,
  'book-marked': bookMarkedIcon,
  'book-minus': bookMinusIcon,
  'book-open-check': bookOpenCheckIcon,
  'book-open-text': bookOpenTextIcon,
  'book-plus': bookPlusIcon,
  'book-text': bookTextIcon,
  'book-type': bookTypeIcon,
  'book-up-2': bookUp2Icon,
  'book-up': bookUpIcon,
  'book-user': bookUserIcon,
  'book-x': bookXIcon,
  'book': bookIcon,
  'bot-off': botOffIcon,
  'brain-cog': brainCogIcon,
  'briefcase-business': briefcaseBusinessIcon,
  'briefcase-medical': briefcaseMedicalIcon,
  'brush-cleaning': brushCleaningIcon,
  'brush': brushIcon,
  'bug-off': bugOffIcon,
  'camera-off': cameraOffIcon,
  'candy-off': candyOffIcon,
  'captions-off': captionsOffIcon,
  'cast': castIcon,
  'chart-bar-decreasing': chartBarDecreasingIcon,
  'chart-bar-increasing': chartBarIncreasingIcon,
  'chart-bar': chartBarIcon,
  'chart-column-decreasing': chartColumnDecreasingIcon,
  'chart-column-increasing': chartColumnIncreasingIcon,
  'chart-gantt': chartGanttIcon,
  'chart-line': chartLineIcon,
  'chart-no-axes-column-decreasing': chartNoAxesColumnDecreasingIcon,
  'chart-no-axes-column-increasing': chartNoAxesColumnIncreasingIcon,
  'chart-no-axes-column': chartNoAxesColumnIcon,
  'chart-no-axes-combined': chartNoAxesCombinedIcon,
  'chart-no-axes-gantt': chartNoAxesGanttIcon,
  'chart-pie': chartPieIcon,
  'chart-scatter': chartScatterIcon,
  'chart-spline': chartSplineIcon,
  'check-check': checkCheckIcon,
  'cherry': cherryIcon,
  'chevrons-down-up': chevronsDownUpIcon,
  'chevrons-down': chevronsDownIcon,
  'chevrons-left-right': chevronsLeftRightIcon,
  'chevrons-left': chevronsLeftIcon,
  'chevrons-right-left': chevronsRightLeftIcon,
  'chevrons-right': chevronsRightIcon,
  'chevrons-up': chevronsUpIcon,
  'cigarette-off': cigaretteOffIcon,
  'circle-arrow-down': circleArrowDownIcon,
  'circle-arrow-left': circleArrowLeftIcon,
  'circle-arrow-out-down-left': circleArrowOutDownLeftIcon,
  'circle-arrow-out-down-right': circleArrowOutDownRightIcon,
  'circle-arrow-out-up-left': circleArrowOutUpLeftIcon,
  'circle-arrow-out-up-right': circleArrowOutUpRightIcon,
  'circle-arrow-right': circleArrowRightIcon,
  'circle-arrow-up': circleArrowUpIcon,
  'circle-check-big': circleCheckBigIcon,
  'circle-chevron-down': circleChevronDownIcon,
  'circle-chevron-left': circleChevronLeftIcon,
  'circle-chevron-right': circleChevronRightIcon,
  'circle-chevron-up': circleChevronUpIcon,
  'circle-off': circleOffIcon,
  'circle-parking-off': circleParkingOffIcon,
  'clapperboard': clapperboardIcon,
  'clipboard': clipboardIcon,
  'cloud-download': cloudDownloadIcon,
  'cloud-moon': cloudMoonIcon,
  'cloud-off': cloudOffIcon,
  'cog': cogIcon,
  'compass': compassIcon,
  'contrast': contrastIcon,
  'crop': cropIcon,
  'diamond-plus': diamondPlusIcon,
  'dice-1': dice1Icon,
  'dice-2': dice2Icon,
  'dice-3': dice3Icon,
  'dice-4': dice4Icon,
  'dice-5': dice5Icon,
  'dice-6': dice6Icon,
  'diff': diffIcon,
  'dna-off': dnaOffIcon,
  'droplet-off': dropletOffIcon,
  'drum': drumIcon,
  'ear-off': earOffIcon,
  'eclipse': eclipseIcon,
  'egg-off': eggOffIcon,
  'file-chart-column-increasing': fileChartColumnIncreasingIcon,
  'file-chart-column': fileChartColumnIcon,
  'file-chart-line': fileChartLineIcon,
  'file-down': fileDownIcon,
  'file-minus': fileMinusIcon,
  'file-pen': filePenIcon,
  'file-plus': filePlusIcon,
  'file-question-mark': fileQuestionMarkIcon,
  'file-sliders': fileSlidersIcon,
  'file-terminal': fileTerminalIcon,
  'file-up': fileUpIcon,
  'fish-off': fishOffIcon,
  'flag-off': flagOffIcon,
  'flashlight-off': flashlightOffIcon,
  'flask-conical-off': flaskConicalOffIcon,
  'frame': frameIcon,
  'funnel-x': funnelXIcon,
  'gallery-horizontal-end': galleryHorizontalEndIcon,
  'gallery-horizontal': galleryHorizontalIcon,
  'gallery-vertical-end': galleryVerticalEndIcon,
  'gallery-vertical': galleryVerticalIcon,
  'gauge': gaugeIcon,
  'gavel': gavelIcon,
  'grip-horizontal': gripHorizontalIcon,
  'grip': gripIcon,
  'hammer': hammerIcon,
  'hand-coins': handCoinsIcon,
  'hand-heart': handHeartIcon,
  'hard-drive-download': hardDriveDownloadIcon,
  'hard-drive-upload': hardDriveUploadIcon,
  'headphone-off': headphoneOffIcon,
  'heart': heartIcon,
  'hop-off': hopOffIcon,
  'house-wifi': houseWifiIcon,
  'kanban': kanbanIcon,
  'key-square': keySquareIcon,
  'keyboard-off': keyboardOffIcon,
  'lightbulb-off': lightbulbOffIcon,
  'link-2-off': link2OffIcon,
  'list-check': listCheckIcon,
  'list-todo': listTodoIcon,
  'locate-off': locateOffIcon,
  'mail-check': mailCheckIcon,
  'map-pin-off': mapPinOffIcon,
  'maximize-2': maximize2Icon,
  'maximize': maximizeIcon,
  'megaphone-off': megaphoneOffIcon,
  'message-circle-more': messageCircleMoreIcon,
  'message-circle-off': messageCircleOffIcon,
  'message-circle-question-mark': messageCircleQuestionMarkIcon,
  'message-circle-warning': messageCircleWarningIcon,
  'message-circle': messageCircleIcon,
  'message-square-more': messageSquareMoreIcon,
  'message-square-off': messageSquareOffIcon,
  'message-square': messageSquareIcon,
  'mic-off': micOffIcon,
  'milk-off': milkOffIcon,
  'minimize-2': minimize2Icon,
  'minimize': minimizeIcon,
  'monitor-check': monitorCheckIcon,
  'monitor-cog': monitorCogIcon,
  'monitor-down': monitorDownIcon,
  'monitor-off': monitorOffIcon,
  'monitor-up': monitorUpIcon,
  move: moveIcon,
  'move-diagonal-2': moveDiagonal2Icon,
  'move-diagonal': moveDiagonalIcon,
  'move-down-left': moveDownLeftIcon,
  'move-down-right': moveDownRightIcon,
  'move-down': moveDownIcon,
  'move-horizontal': moveHorizontalIcon,
  'move-left': moveLeftIcon,
  'move-right': moveRightIcon,
  'move-up-left': moveUpLeftIcon,
  'move-up-right': moveUpRightIcon,
  'move-up': moveUpIcon,
  'move-vertical': moveVerticalIcon,
  'navigation-2-off': navigation2OffIcon,
  'navigation-off': navigationOffIcon,
  'nfc': nfcIcon,
  'notebook-pen': notebookPenIcon,
  'nut-off': nutOffIcon,
  'octagon-alert': octagonAlertIcon,
  'orbit': orbitIcon,
  'paintbrush': paintbrushIcon,
  'paperclip': paperclipIcon,
  'pen-off': penOffIcon,
  'pencil-line': pencilLineIcon,
  'pencil-off': pencilOffIcon,
  'phone-off': phoneOffIcon,
  'pickaxe': pickaxeIcon,
  'pin-off': pinOffIcon,
  'pointer-off': pointerOffIcon,
  'power-off': powerOffIcon,
  'printer-check': printerCheckIcon,
  'rabbit': rabbitIcon,
  'radar': radarIcon,
  'radio-tower': radioTowerIcon,
  'radio': radioIcon,
  'rainbow': rainbowIcon,
  'refresh-ccw-dot': refreshCcwDotIcon,
  'refresh-ccw': refreshCcwIcon,
  'refresh-cw-off': refreshCwOffIcon,
  'rocking-chair': rockingChairIcon,
  'rotate-ccw-key': rotateCcwKeyIcon,
  'route-off': routeOffIcon,
  'route': routeIcon,
  'rss': rssIcon,
  'scan-text': scanTextIcon,
  'scissors': scissorsIcon,
  'shield-question-mark': shieldQuestionMarkIcon,
  'ship-wheel': shipWheelIcon,
  'ship': shipIcon,
  'shovel': shovelIcon,
  'shrink': shrinkIcon,
  'signature': signatureIcon,
  'smartphone-nfc': smartphoneNfcIcon,
  'snowflake': snowflakeIcon,
  'sparkle': sparkleIcon,
  'speech': speechIcon,
  'spell-check': spellCheckIcon,
  'square-arrow-out-down-left': squareArrowOutDownLeftIcon,
  'square-arrow-out-down-right': squareArrowOutDownRightIcon,
  'square-arrow-out-up-left': squareArrowOutUpLeftIcon,
  'square-arrow-out-up-right': squareArrowOutUpRightIcon,
  'square-chart-gantt': squareChartGanttIcon,
  'square-check-big': squareCheckBigIcon,
  'square-check': squareCheckIcon,
  'square-chevron-down': squareChevronDownIcon,
  'square-chevron-left': squareChevronLeftIcon,
  'square-chevron-right': squareChevronRightIcon,
  'square-chevron-up': squareChevronUpIcon,
  'square-dashed-kanban': squareDashedKanbanIcon,
  'square-kanban': squareKanbanIcon,
  'square-parking-off': squareParkingOffIcon,
  'square-plus': squarePlusIcon,
  'square-scissors': squareScissorsIcon,
  'square-stack': squareStackIcon,
  'square-terminal': squareTerminalIcon,
  'sword': swordIcon,
  'telescope': telescopeIcon,
  'terminal': terminalIcon,
  'text-align-center': textAlignCenterIcon,
  'text-cursor-input': textCursorInputIcon,
  'text-cursor': textCursorIcon,
  'text-search': textSearchIcon,
  'thermometer': thermometerIcon,
  'thumbs-down': thumbsDownIcon,
  'thumbs-up': thumbsUpIcon,
  'timer-off': timerOffIcon,
  'timer': timerIcon,
  'toggle-left': toggleLeftIcon,
  'toggle-right': toggleRightIcon,
  'tornado': tornadoIcon,
  'touchpad-off': touchpadOffIcon,
  'umbrella-off': umbrellaOffIcon,
  'unplug': unplugIcon,
  'user-pen': userPenIcon,
  'vibrate-off': vibrateOffIcon,
  'vibrate': vibrateIcon,
  'video-off': videoOffIcon,
  'vote': voteIcon,
  'webhook-off': webhookOffIcon,
  'wheat-off': wheatOffIcon,
  'wifi-off': wifiOffIcon,
  'wifi-pen': wifiPenIcon,
  'wine-off': wineOffIcon,
  'zap-off': zapOffIcon,
  bell: bellIcon,
  'bell-ring': bellRingIcon,
  'bell-check': bellCheckIcon,
  'bell-dot': bellDotIcon,
  'bell-minus': bellMinusIcon,
  'bell-off': bellOffIcon,
  'bell-plus': bellPlusIcon,
  check: checkIcon,
  'circle-alert': circleAlertIcon,
  'circle-check': circleCheckIcon,
  'circle-x': circleXIcon,
  copy: copyIcon,
  'copy-check': copyCheckIcon,
  'copy-minus': copyMinusIcon,
  'copy-plus': copyPlusIcon,
  'copy-slash': copySlashIcon,
  'copy-x': copyXIcon,
  calendar: calendarIcon,
  'chevron-right': chevronRightIcon,
  'arrow-left': arrowLeftIcon,
  download: downloadIcon,
  eye: eyeIcon,
  'eye-off': eyeOffIcon,
  'hat-glasses': hatGlassesIcon,
  'heart-pulse': heartPulseIcon,
  'heart-crack': heartCrackIcon,
  'heart-handshake': heartHandshakeIcon,
  'heart-minus': heartMinusIcon,
  'heart-off': heartOffIcon,
  'heart-plus': heartPlusIcon,
  'heart-x': heartXIcon,
  images: imagesIcon,
  info: infoIcon,
  'loader-circle': loaderCircleIcon,
  lock: lockIcon,
  mail: mailIcon,
  'mouse-pointer-click': mousePointerClickIcon,
  'mouse-pointer': mousePointerIcon,
  'mouse-pointer-2': mousePointer2Icon,
  'mouse-pointer-2-off': mousePointer2OffIcon,
  'mouse-pointer-ban': mousePointerBanIcon,
  pencil: pencilIcon,
  plus: plusIcon,
  'refresh-cw': refreshCwIcon,
  save: saveIcon,
  'save-check': saveCheckIcon,
  'save-off': saveOffIcon,
  'save-pen': savePenIcon,
  'save-plus': savePlusIcon,
  'save-all': saveAllIcon,
  search: searchIcon,
  'search-check': searchCheckIcon,
  'search-slash': searchSlashIcon,
  'search-x': searchXIcon,
  send: sendIcon,
  settings: settingsIcon,
  'shield-check': shieldCheckIcon,
  'shield-ban': shieldBanIcon,
  'shield-cog': shieldCogIcon,
  'shield-half': shieldHalfIcon,
  'shield-keyhole': shieldKeyholeIcon,
  'shield-lock': shieldLockIcon,
  'shield-minus': shieldMinusIcon,
  'shield-plus': shieldPlusIcon,
  'shield-user': shieldUserIcon,
  'shield-x': shieldXIcon,
  sparkles: sparklesIcon,
  trash: trashIcon,
  'trash-2': trash2Icon,
  'triangle-alert': triangleAlertIcon,
  upload: uploadIcon,
  user: userIcon,
  wrench: wrenchIcon,
  menu: menuIcon,
  x: xIcon,
  'file-text': fileTextIcon,
  monitor: monitorIcon,
  package: packageIcon,
  'package-check': packageCheckIcon,
  'package-minus': packageMinusIcon,
  'package-open': packageOpenIcon,
  'package-plus': packagePlusIcon,
  'package-x': packageXIcon,
  'rotate-ccw-clock': rotateCcwClockIcon,
  shirt: shirtIcon,
  folder: folderIcon,
  'folder-open': folderOpenIcon,
  'folder-archive': folderArchiveIcon,
  'folder-bookmark': folderBookmarkIcon,
  'folder-check': folderCheckIcon,
  'folder-clock': folderClockIcon,
  'folder-closed': folderClosedIcon,
  'folder-code': folderCodeIcon,
  'folder-cog': folderCogIcon,
  'folder-dot': folderDotIcon,
  'folder-down': folderDownIcon,
  'folder-git-2': folderGit2Icon,
  'folder-git': folderGitIcon,
  'folder-heart': folderHeartIcon,
  'folder-input': folderInputIcon,
  'folder-kanban': folderKanbanIcon,
  'folder-key': folderKeyIcon,
  'folder-lock': folderLockIcon,
  'folder-minus': folderMinusIcon,
  'folder-open-dot': folderOpenDotIcon,
  'folder-output': folderOutputIcon,
  'folder-pen': folderPenIcon,
  'folder-plus': folderPlusIcon,
  'folder-root': folderRootIcon,
  'folder-search-2': folderSearch2Icon,
  'folder-search': folderSearchIcon,
  'folder-symlink': folderSymlinkIcon,
  'folder-sync': folderSyncIcon,
  'folder-tree': folderTreeIcon,
  'folder-up': folderUpIcon,
  'folder-x': folderXIcon,
  plane: planeIcon,
  globe: globeIcon,
  'globe-check': globeCheckIcon,
  'globe-lock': globeLockIcon,
  'globe-off': globeOffIcon,
  'globe-x': globeXIcon,
  bookmark: bookmarkIcon,
  'bookmark-check': bookmarkCheckIcon,
  'bookmark-minus': bookmarkMinusIcon,
  'bookmark-off': bookmarkOffIcon,
  'bookmark-plus': bookmarkPlusIcon,
  'bookmark-x': bookmarkXIcon,
  'sticky-note': stickyNoteIcon,
  'sticky-note-check': stickyNoteCheckIcon,
  'sticky-note-minus': stickyNoteMinusIcon,
  'sticky-note-off': stickyNoteOffIcon,
  'sticky-note-plus': stickyNotePlusIcon,
  'sticky-note-x': stickyNoteXIcon,
  ticket: ticketIcon,
  'ticket-check': ticketCheckIcon,
  'ticket-minus': ticketMinusIcon,
  'ticket-percent': ticketPercentIcon,
  'ticket-plus': ticketPlusIcon,
  'ticket-slash': ticketSlashIcon,
  'ticket-x': ticketXIcon,
  'grid-2x2': grid2x2Icon,
  'grid-2x2-check': grid2x2CheckIcon,
  'grid-2x2-plus': grid2x2PlusIcon,
  'grid-2x2-x': grid2x2XIcon,
  key: keyIcon,
  users: usersIcon,
  truck: truckIcon,
  'map-pin': mapPinIcon,
  'map-pin-check': mapPinCheckIcon,
  'map-pin-check-inside': mapPinCheckInsideIcon,
  'map-pin-house': mapPinHouseIcon,
  'map-pin-minus': mapPinMinusIcon,
  'map-pin-minus-inside': mapPinMinusInsideIcon,
  'map-pin-plus': mapPinPlusIcon,
  'map-pin-plus-inside': mapPinPlusInsideIcon,
  'map-pin-search': mapPinSearchIcon,
  'map-pin-x': mapPinXIcon,
  'map-pin-x-inside': mapPinXInsideIcon,
  'external-link': externalLinkIcon,
  briefcase: briefcaseIcon,
  'book-open': bookOpenIcon,
  smartphone: smartphoneIcon,
  phone: phoneIcon,
  receipt: receiptIcon,
  'rotate-ccw': rotateCcwIcon,
  'shopping-cart': shoppingCartIcon,
  banknote: banknoteIcon,
  crown: crownIcon,
  sun: sunIcon,
  moon: moonIcon,
  zap: zapIcon,
  clock: clockIcon,
  lightbulb: lightbulbIcon,
  camera: cameraIcon,
  cake: cakeIcon,
  ban: banIcon,
  'at-sign': atSignIcon,
  'log-out': logOutIcon,
  funnel: funnelIcon,
  activity: activityIcon,
  'alarm-clock': alarmClockIcon,
  'alarm-clock-check': alarmClockCheckIcon,
  'alarm-clock-minus': alarmClockMinusIcon,
  'alarm-clock-off': alarmClockOffIcon,
  'alarm-clock-plus': alarmClockPlusIcon,
  'app-window': appWindowIcon,
  badge: badgeIcon,
  'badge-check': badgeCheckIcon,
  'badge-alert': badgeAlertIcon,
  'badge-cent': badgeCentIcon,
  'badge-dollar-sign': badgeDollarSignIcon,
  'badge-euro': badgeEuroIcon,
  'badge-indian-rupee': badgeIndianRupeeIcon,
  'badge-info': badgeInfoIcon,
  'badge-japanese-yen': badgeJapaneseYenIcon,
  'badge-minus': badgeMinusIcon,
  'badge-percent': badgePercentIcon,
  'badge-plus': badgePlusIcon,
  'badge-pound-sterling': badgePoundSterlingIcon,
  'badge-question-mark': badgeQuestionMarkIcon,
  'badge-russian-ruble': badgeRussianRubleIcon,
  'badge-swiss-franc': badgeSwissFrancIcon,
  'badge-turkish-lira': badgeTurkishLiraIcon,
  'badge-x': badgeXIcon,
  'chevron-down': chevronDownIcon,
  'chevron-left': chevronLeftIcon,
  'chevron-up': chevronUpIcon,
  'chevrons-up-down': chevronsUpDownIcon,
  'circle-plus': circlePlusIcon,
  'circle-question-mark': circleQuestionMarkIcon,
  'clipboard-check': clipboardCheckIcon,
  'clipboard-clock': clipboardClockIcon,
  'clipboard-copy': clipboardCopyIcon,
  'clipboard-list': clipboardListIcon,
  'clipboard-minus': clipboardMinusIcon,
  'clipboard-paste': clipboardPasteIcon,
  'clipboard-pen-line': clipboardPenLineIcon,
  'clipboard-pen': clipboardPenIcon,
  'clipboard-plus': clipboardPlusIcon,
  'clipboard-type': clipboardTypeIcon,
  'clipboard-x': clipboardXIcon,
  contact: contactIcon,
  cpu: cpuIcon,
  'credit-card': creditCardIcon,
  database: databaseIcon,
  ellipsis: ellipsisIcon,
  'file-check': fileCheckIcon,
  'file-x': fileXIcon,
  'git-fork': gitForkIcon,
  'graduation-cap': graduationCapIcon,
  'hard-drive': hardDriveIcon,
  'id-card': idCardIcon,
  inbox: inboxIcon,
  keyboard: keyboardIcon,
  landmark: landmarkIcon,
  languages: languagesIcon,
  laptop: laptopIcon,
  layers: layersIcon,
  'layout-dashboard': layoutDashboardIcon,
  'layout-grid': layoutGridIcon,
  'layout-panel-left': layoutPanelLeftIcon,
  'layout-panel-top': layoutPanelTopIcon,
  'layout-list': layoutListIcon,
  'layout-template': layoutTemplateIcon,
  'layout-freeform': layoutFreeformIcon,
  library: libraryIcon,
  link: linkIcon,
  'link-2': link2Icon,
  unlink: unlinkIcon,
  list: listIcon,
  'list-checks': listChecksIcon,
  minus: minusIcon,
  network: networkIcon,
  palette: paletteIcon,
  play: playIcon,
  pause: pauseIcon,
  'qr-code': qrCodeIcon,
  'scroll-text': scrollTextIcon,
  server: serverIcon,
  'server-cog': serverCogIcon,
  'server-crash': serverCrashIcon,
  'server-off': serverOffIcon,
  'server-plus': serverPlusIcon,
  shield: shieldIcon,
  'shield-alert': shieldAlertIcon,
  'shield-off': shieldOffIcon,
  'shopping-bag': shoppingBagIcon,
  tag: tagIcon,
  warehouse: warehouseIcon,
  workflow: workflowIcon,
  'zoom-in': zoomInIcon,
  'zoom-out': zoomOutIcon,
  star: starIcon,
  'star-check': starCheckIcon,
  'star-half': starHalfIcon,
  'star-minus': starMinusIcon,
  'star-off': starOffIcon,
  'star-plus': starPlusIcon,
  'star-x': starXIcon,
  cctv: cctvIcon,
  'arrow-right': arrowRightIcon,
  'chart-column': chartColumnIcon,
  building: buildingIcon,
  'building-2': building2Icon,
  cable: cableIcon,
  circle: circleIcon,
  command: commandIcon,
  'square-pen': squarePenIcon,
  pen: penIcon,
  'pen-line': penLineIcon,
  file: fileIcon,
  'file-check-corner': fileCheckCornerIcon,
  'file-spreadsheet': fileSpreadsheetIcon,
  'file-badge': fileBadgeIcon,
  'file-exclamation-point': fileExclamationPointIcon,
  'square-centerline-dashed-horizontal': squareCenterlineDashedHorizontalIcon,
  'square-centerline-dashed-vertical': squareCenterlineDashedVerticalIcon,
  'grip-vertical': gripVerticalIcon,
  hash: hashIcon,
  house: houseIcon,
  image: imageIcon,
  'image-off': imageOffIcon,
  'image-down': imageDownIcon,
  'image-minus': imageMinusIcon,
  'image-play': imagePlayIcon,
  'image-plus': imagePlusIcon,
  'image-up': imageUpIcon,
  'image-upscale': imageUpscaleIcon,
  'ellipsis-vertical': ellipsisVerticalIcon,
  mouse: mouseIcon,
  'mouse-left': mouseLeftIcon,
  'mouse-off': mouseOffIcon,
  'mouse-right': mouseRightIcon,
  navigation: navigationIcon,
  'package-search': packageSearchIcon,
  printer: printerIcon,
  'rotate-cw': rotateCwIcon,
  router: routerIcon,
  tablet: tabletIcon,
  triangle: triangleIcon,
  tv: tvIcon,
  'cloud-upload': cloudUploadIcon,
  'user-check': userCheckIcon,
  'user-minus': userMinusIcon,
  'user-plus': userPlusIcon,
  'user-x': userXIcon,
  'user-cog': userCogIcon,
  'user-round': userRoundIcon,
  'user-round-arrow-left': userRoundArrowLeftIcon,
  'user-round-check': userRoundCheckIcon,
  'user-round-cog': userRoundCogIcon,
  'user-round-key': userRoundKeyIcon,
  'user-round-minus': userRoundMinusIcon,
  'user-round-pen': userRoundPenIcon,
  'user-round-plus': userRoundPlusIcon,
  'user-round-search': userRoundSearchIcon,
  'user-round-x': userRoundXIcon,
  'arrow-up': arrowUpIcon,
  'arrow-down': arrowDownIcon,
  'arrow-up-left': arrowUpLeftIcon,
  'arrow-up-right': arrowUpRightIcon,
  'arrow-down-left': arrowDownLeftIcon,
  'arrow-down-right': arrowDownRightIcon,
  wifi: wifiIcon,
  'wifi-high': wifiHighIcon,
  'wifi-low': wifiLowIcon,
  'wifi-zero': wifiZeroIcon,
  type: typeIcon,
  webhook: webhookIcon,
  power: powerIcon,
  braces: bracesIcon,
  'panel-left': panelLeftIcon,
  'panel-left-close': panelLeftCloseIcon,
  'panel-left-open': panelLeftOpenIcon,
  'panel-right': panelRightIcon,
  'panel-right-close': panelRightCloseIcon,
  'panel-right-open': panelRightOpenIcon,
  'panel-top': panelTopIcon,
  'panel-top-close': panelTopCloseIcon,
  'panel-top-open': panelTopOpenIcon,
  'panel-bottom': panelBottomIcon,
  'panel-bottom-close': panelBottomCloseIcon,
  'panel-bottom-open': panelBottomOpenIcon,
  'panel-left-dashed': panelLeftDashedIcon,
  'panel-right-dashed': panelRightDashedIcon,
  'panel-top-dashed': panelTopDashedIcon,
  'panel-bottom-dashed': panelBottomDashedIcon,
  'panel-top-bottom-dashed': panelTopBottomDashedIcon,
  'panel-left-right-dashed': panelLeftRightDashedIcon,
  'calendar-check': calendarCheckIcon,
  'calendar-clock': calendarClockIcon,
  'calendar-days': calendarDaysIcon,
  'calendar-1': calendar1Icon,
  'calendar-arrow-down': calendarArrowDownIcon,
  'calendar-arrow-up': calendarArrowUpIcon,
  'calendar-check-2': calendarCheck2Icon,
  'calendar-cog': calendarCogIcon,
  'calendar-fold': calendarFoldIcon,
  'calendar-heart': calendarHeartIcon,
  'calendar-minus-2': calendarMinus2Icon,
  'calendar-minus': calendarMinusIcon,
  'calendar-off': calendarOffIcon,
  'calendar-plus-2': calendarPlus2Icon,
  'calendar-plus': calendarPlusIcon,
  'calendar-range': calendarRangeIcon,
  'calendar-search': calendarSearchIcon,
  'calendar-sync': calendarSyncIcon,
  'calendar-x-2': calendarX2Icon,
  'calendar-x': calendarXIcon,
  map: mapIcon,
  'key-round': keyRoundIcon,
  infinity: infinityIcon,
  square: squareIcon,
  'volume-2': volume2Icon,
  volume: volumeIcon,
  'volume-1': volume1Icon,
  'volume-off': volumeOffIcon,
  'volume-x': volumeXIcon,
  signal: signalIcon,
  'signal-high': signalHighIcon,
  'signal-medium': signalMediumIcon,
  'signal-low': signalLowIcon,
  'signal-zero': signalZeroIcon,
  'tally-1': tally1Icon,
  'tally-2': tally2Icon,
  'tally-3': tally3Icon,
  'tally-4': tally4Icon,
  'tally-5': tally5Icon,
  'git-branch': gitBranchIcon,
  'git-branch-plus': gitBranchPlusIcon,
  'git-commit-horizontal': gitCommitHorizontalIcon,
  'git-commit-vertical': gitCommitVerticalIcon,
  'git-compare': gitCompareIcon,
  'git-compare-arrows': gitCompareArrowsIcon,
  'git-graph': gitGraphIcon,
  'git-merge-conflict': gitMergeConflictIcon,
  'git-merge': gitMergeIcon,
  'git-pull-request': gitPullRequestIcon,
  'git-pull-request-closed': gitPullRequestClosedIcon,
  'git-pull-request-create': gitPullRequestCreateIcon,
};
