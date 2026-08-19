import { AnimatedIconDef } from './animated-icon.model';
import { EASE, SPRING_OUT, SPRING_BOUNCY, SPRING_SMOOTH, rotateSeq, scaleSeq, moveXSeq, moveYSeq, track, burst, strokeDraw, icon, held } from './choreography';
import { activityShapes, alarmClockShapes, appWindowShapes, arrowLeftShapes, arrowRightShapes, atSignShapes, badgeCheckShapes, banShapes, banknoteShapes, bellRingShapes, bellShapes, bookOpenShapes, bracesShapes, briefcaseShapes, building2Shapes, buildingShapes, cableShapes, cakeShapes, calendarCheckShapes, calendarClockShapes, calendarDaysShapes, calendarShapes, cameraShapes, cctvShapes, chartColumnShapes, checkShapes, chevronDownShapes, chevronLeftShapes, chevronRightShapes, chevronUpShapes, chevronsUpDownShapes, circleAlertShapes, circleCheckShapes, circlePlusShapes, circleQuestionMarkShapes, circleShapes, circleXShapes, clipboardCheckShapes, clockShapes, cloudUploadShapes, commandShapes, contactShapes, copyShapes, cpuShapes, creditCardShapes, crownShapes, databaseShapes, downloadShapes, ellipsisShapes, ellipsisVerticalShapes, externalLinkShapes, eyeOffShapes, eyeShapes, fileBadgeShapes, fileCheckCornerShapes, fileCheckShapes, fileExclamationPointShapes, fileShapes, fileSpreadsheetShapes, fileTextShapes, fileXShapes, folderOpenShapes, funnelShapes, gitForkShapes, globeShapes, graduationCapShapes, gripVerticalShapes, hardDriveShapes, hashShapes, hatGlassesShapes, heartPulseShapes, rotateCcwClockShapes, houseShapes, idCardShapes, imageOffShapes, imageShapes, imagesShapes, inboxShapes, infinityShapes, infoShapes, keyRoundShapes, keyShapes, keyboardShapes, landmarkShapes, languagesShapes, laptopShapes, layersShapes, layoutDashboardShapes, layoutGridShapes, layoutPanelLeftShapes, layoutPanelTopShapes, layoutListShapes, layoutTemplateShapes, layoutFreeformShapes, libraryShapes, lightbulbShapes, link2Shapes, linkShapes, listChecksShapes, listShapes, loaderCircleShapes, lockShapes, logOutShapes, mailShapes, mapPinShapes, mapPinCheckShapes, mapPinCheckInsideShapes, mapPinHouseShapes, mapPinMinusShapes, mapPinMinusInsideShapes, mapPinPlusShapes, mapPinPlusInsideShapes, mapPinSearchShapes, mapPinXShapes, mapPinXInsideShapes, mapShapes, minusShapes, monitorShapes, moonShapes, mousePointerClickShapes, mouseShapes, navigationShapes, networkShapes, packageSearchShapes, packageShapes, paletteShapes, panelLeftCloseShapes, panelLeftShapes, penLineShapes, penShapes, pencilShapes, phoneShapes, planeShapes, playShapes, plusShapes, powerShapes, printerShapes, qrCodeShapes, receiptShapes, refreshCwShapes, rotateCcwShapes, rotateCwShapes, routerShapes, saveShapes, scrollTextShapes, searchCheckShapes, searchShapes, searchSlashShapes, searchXShapes, sendShapes, serverShapes, settingsShapes, shieldAlertShapes, shieldCheckShapes, shieldOffShapes, shieldShapes, shirtShapes, shoppingBagShapes, shoppingCartShapes, smartphoneShapes, sparklesShapes, squareCenterlineDashedHorizontalShapes, squareCenterlineDashedVerticalShapes, squarePenShapes, squareShapes, starShapes, sunShapes, tabletShapes, tagShapes, trash2Shapes, trashShapes, triangleAlertShapes, triangleShapes, truckShapes, tvShapes, typeShapes, unlinkShapes, uploadShapes, userCheckShapes, userCogShapes, userMinusShapes, userPlusShapes, userShapes, userXShapes, usersShapes, volume2Shapes, warehouseShapes, webhookShapes, wifiShapes, wifiHighShapes, wifiLowShapes, wifiZeroShapes, workflowShapes, wrenchShapes, xShapes, zapShapes, zoomInShapes, zoomOutShapes } from './animated-icons.shapes';

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

/** Cuerpo 0.9s y badajo 1.1s: ese desfase ES el efecto (portado de Animate UI). */
export const bellIcon: AnimatedIconDef = /* @__PURE__ */ icon(bellShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 20, -10, 10, -5, 3, 0]), 900, { origin: 'top center' }),
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -6, 5, -5, 4, -3, 2, 0]), 1100) },
    },
  });

/** Campana con ondas: repica y las ondas salen DESPUÉS del primer golpe, no junto con él. */
export const bellRingIcon: AnimatedIconDef = /* @__PURE__ */ icon(bellRingShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 18, -12, 9, -5, 0]), 900, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -5, 4, -3, 2, 0]), 1050),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 650, { delay: 140 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 650, { delay: 140 }),
      },
    },
  });

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
  });

/** Toast de error/advertencia: el círculo se dibuja y el signo aparece después. */
export const circleAlertIcon: AnimatedIconDef = /* @__PURE__ */ icon(circleAlertShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -6, 5, -3, 0]), 600),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 340 }),
      },
    },
  });

/** Toast de éxito: primero el círculo, luego la palomita. Nunca al mismo tiempo. */
export const circleCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(circleCheckShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 280 }),
      },
    },
  });

/** Toast de error: el círculo se dibuja y la equis se tacha en dos tiempos. */
export const circleXIcon: AnimatedIconDef = /* @__PURE__ */ icon(circleXShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 300 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 420 }),
      },
    },
  });

/** Copiar: la hoja de enfrente se desliza y vuelve — el gesto de sacar una copia. */
export const copyIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.5px, -1.5px)' },
            { transform: 'translate(0, 0)' },
          ],
          600,
        ),
      },
    },
  });

/** Calendario: las dos anillas rebotan escalonadas, el cuerpo quieto. */
export const calendarIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500, { delay: 90 }),
      },
    },
  });

/** Empujoncito hacia donde lleva. Sostenido mientras dure el hover. */
export const chevronRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronRightShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, 3]), 320),
  });

/** Igual que el chevron pero de regreso: la flecha de "volver". */
export const arrowLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowLeftShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, -3]), 320),
  });

/** Descargar: el asta y la punta bajan juntas; la bandeja no se mueve (es el piso). */
export const downloadIcon: AnimatedIconDef = /* @__PURE__ */ icon(downloadShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 550),
      },
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

/** Latido doble (como el de verdad) y el electro trazándose encima. */
export const heartPulseIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartPulseShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1, 1.08, 1]), 900, { origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 700, { delay: 150 }) },
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

/** Abrir: el arco se levanta y el cuerpo da un tirón. */
export const lockIcon: AnimatedIconDef = /* @__PURE__ */ icon(lockShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.8, 0]), 500, { delay: 120 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.8, 0]), 500),
      },
    },
  });

/** Correo: el sobre da un golpecito y la solapa se traza. */
export const mailIcon: AnimatedIconDef = /* @__PURE__ */ icon(mailShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.06, 1]), 500, { origin: 'center' }),
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 500, { delay: 120 }) },
    },
  });

/** Clic: el cursor se hunde y las chispas salen DESPUÉS del golpe. Si salen juntas, no es clic. */
export const mousePointerClickIcon: AnimatedIconDef = /* @__PURE__ */ icon(mousePointerClickShapes, {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.85, 1]), 400, { origin: '10px 10px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 200 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 240 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 280 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 320 }),
      },
    },
  });

/** Escribir: el lápiz recorre su propia diagonal. */
export const pencilIcon: AnimatedIconDef = /* @__PURE__ */ icon(pencilShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(1.5px, -1.5px)' },
          { transform: 'translate(-1px, 1px)' },
          { transform: 'translate(0, 0)' },
        ],
        700,
      ),
    },
    /** Escribiendo: gira desde la punta, fija, simulando el trazo de la mano. */
    write: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -10, 6, -8, 5, -6, 3, 0]), 950, {
        origin: '2.3px 21.5px',
      }),
    },
  });

/** Agregar: golpe seco. `turn` es la otra lectura, la de "+ que se vuelve ✕". */
export const plusIcon: AnimatedIconDef = /* @__PURE__ */ icon(plusShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.25, 1]), 400, { easing: SPRING_OUT, origin: 'center' }),
    },
    turn: /* @__PURE__ */ held(/* @__PURE__ */ rotateSeq([0, 90]), 350, { origin: 'center' }),
  });

/** `default` es de ESTADO: gira 45° y se queda; al salir el puntero regresa (portado). */
export const refreshCwIcon: AnimatedIconDef = /* @__PURE__ */ icon(refreshCwShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ rotateSeq([0, 45]), 450, { origin: 'center' }),
    rotate: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 700, { easing: SPRING_OUT, origin: 'center' }),
    },
  });

/** Guardar: se hunde como un botón físico. */
export const saveIcon: AnimatedIconDef = /* @__PURE__ */ icon(saveShapes, {
    default: {
      // El bounce sale de ADENTRO (la etiqueta) más grande y elástico; el cuerpo solo se asienta
      // un poco, no es él quien rebota.
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.95, 1]), 420, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 0.9, 1]), 600, {
          delay: 80,
          easing: SPRING_BOUNCY,
          origin: '12px 17px',
        }),
      },
    },
  });

/** Sacudida desde el mango; `find` la pasea como si buscara (ambas portadas). */
export const searchIcon: AnimatedIconDef = /* @__PURE__ */ icon(searchShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 17, -10, 5, -1, 0]), 800, { origin: 'bottom right' }),
    },
    find: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(-15%, 0)' },
          { transform: 'translate(0, -15%)' },
          { transform: 'translate(0, 0)' },
        ],
        1000,
      ),
    },
  });

/** Encontrado: primero la lupa, luego la palomita. El orden cuenta la historia. */
export const searchCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(searchCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 6, -5, 3, 0]), 700, {
        delay: 380,
        origin: 'bottom right',
      }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { delay: 380 }),
      },
    },
    /** Traza + el mismo "busca alrededor" que hace `search:find`. */
    reveal: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(-15%, 0)' },
          { transform: 'translate(0, -15%)' },
          { transform: 'translate(0, 0)' },
        ],
        1000,
        { delay: 760 },
      ),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { delay: 380 }),
      },
    },
  });

/** Búsqueda desactivada: la diagonal cae al final. */
export const searchSlashIcon: AnimatedIconDef = /* @__PURE__ */ icon(searchSlashShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 6, -5, 3, 0]), 700, {
        delay: 380,
        origin: 'bottom right',
      }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 380 }),
      },
    },
    /** Traza + el mismo "busca alrededor" que hace `search:find`. */
    reveal: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(-15%, 0)' },
          { transform: 'translate(0, -15%)' },
          { transform: 'translate(0, 0)' },
        ],
        1000,
        { delay: 700 },
      ),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 380 }),
      },
    },
  });

/** Sin resultados: la lupa se dibuja, la equis se tacha y el conjunto se sacude. */
export const searchXIcon: AnimatedIconDef = /* @__PURE__ */ icon(searchXShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 6, -5, 3, 0]), 700, { delay: 380, origin: 'bottom right' }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 380 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 480 }),
      },
    },
    /** Traza + el mismo "busca alrededor" que hace `search:find` (en vez del shake de default). */
    reveal: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(-15%, 0)' },
          { transform: 'translate(0, -15%)' },
          { transform: 'translate(0, 0)' },
        ],
        1000,
        { delay: 740 },
      ),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 380 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 480 }),
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
  });

/** Protegido: el escudo primero, la palomita después. */
export const shieldCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 500, { origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { delay: 260 }) },
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
  });

/** Persona: la cabeza asoma tantito. */
export const userIcon: AnimatedIconDef = /* @__PURE__ */ icon(userShapes, {
    default: {
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.2, 0]), 500) },
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.05, 1]), 500, { origin: 'center' }),
    },
  });

/** Apretar: la llave gira y regresa. */
export const wrenchIcon: AnimatedIconDef = /* @__PURE__ */ icon(wrenchShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -18, 12, 0]), 700, { origin: 'center' }),
    },
  });

/** Cerrar: gira 90° y se sostiene mientras el puntero siga encima. */
export const xIcon: AnimatedIconDef = /* @__PURE__ */ icon(xShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ rotateSeq([0, 90]), 350, { origin: 'center' }),
  });

// ── 2ª tanda: lo que más se usa en la app ──────────────────────────────────
/** Documento: las líneas de texto se escriben una tras otra. */
export const fileTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileTextShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { delay: 180 }),
      },
    },
  });

/** Monitor encendiéndose: el parpadeo del tubo, no un fundido parejo. */
export const monitorIcon: AnimatedIconDef = /* @__PURE__ */ icon(monitorShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { opacity: '1' },
            { opacity: '0.35' },
            { opacity: '1' },
            { opacity: '0.6' },
            { opacity: '1' },
          ],
          600,
        ),
      },
    },
  });

/** Paquete que aterriza. */
export const packageIcon: AnimatedIconDef = /* @__PURE__ */ icon(packageShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2.5, 0]), 550, { easing: SPRING_OUT }),
    },
  });

/**
 * Historial: todo gira en REVERSA — es el gesto de rebobinar.
 *
 * Se llamaba `history` hasta que Lucide lo renombró a `rotate-ccw-clock`. Es un renombre puro:
 * la geometría es byte por byte la misma (verificado contra lucide-static@1.31.0), y Lucide sigue
 * publicando `history.svg` como alias deprecado. El nombre viejo vive en ICON_ALIASES, así que
 * `name="history"` sigue funcionando para quien ya lo escribía así.
 */
export const rotateCcwClockIcon: AnimatedIconDef = /* @__PURE__ */ icon(rotateCcwClockShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -22, 0]), 700, { origin: 'center' }),
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -70, 0]), 800, { origin: '12px 12px' }) },
    },
  });

/** Playera colgada meciéndose desde los hombros. */
export const shirtIcon: AnimatedIconDef = /* @__PURE__ */ icon(shirtShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 4, -3, 2, 0]), 750, { origin: 'top center' }),
    },
  });

/** Carpeta que se abre y levanta. */
export const folderOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderOpenShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.8, 0]), 520, { easing: SPRING_OUT }),
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

/** Globo girando: achicar el meridiano en X lee como rotación sin deformar nada. */
export const globeIcon: AnimatedIconDef = /* @__PURE__ */ icon(globeShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(
          [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.15)' }, { transform: 'scaleX(1)' }],
          1100,
          { origin: '12px 12px' },
        ),
      },
    },
  });

/** Llave girando sobre su anillo, no sobre el centro del lienzo. */
export const keyIcon: AnimatedIconDef = /* @__PURE__ */ icon(keyShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -20, 0]), 700, { origin: '7.5px 15.5px' }),
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

/** Pin que cae y se clava. */
export const mapPinIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -12, 8, -5, 3, 0]), 650, {
        origin: '12px 21.8px',
      }),
    },
    /** Ubicando: el punto adentro late, el pin no se mueve. */
    locate: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.35, 1, 1.3, 1]), 700, {
          origin: '12px 10px',
        }),
      },
    },
  });

// El mismo rebote izquierda-derecha de map-pin, anclado en la punta de abajo — TODAS las
// variantes de map-pin lo comparten.
const MAP_PIN_ROCK = /* @__PURE__ */ rotateSeq([0, -12, 8, -5, 3, 0]);

/** Ubicación confirmada: el pin se rebotea y la palomita se dibuja de insignia. */
export const mapPinCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 300 }) },
    },
    /** Celebración: la palomita se dibuja y pega un rebote elástico, no solo se traza. */
    confirm: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: {
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'scale(0.5)' },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1.3)' },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)' },
          ],
          380,
          { delay: 280, easing: SPRING_BOUNCY, origin: '19px 20px' },
        ),
      },
    },
  });

/** Igual, pero la palomita reemplaza el punto adentro del pin. */
export const mapPinCheckInsideIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinCheckInsideShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 150 }) },
    },
  });

/** Es un domicilio: el pin se rebotea y la casita se dibuja de insignia. */
export const mapPinHouseIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinHouseShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '10px 21.8px' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 300 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 480 }),
      },
    },
  });

/** Ubicación quitada: el pin se rebotea y el signo "-" se dibuja de insignia. */
export const mapPinMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinMinusShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }) },
    },
  });

/** Igual, pero el "-" reemplaza el punto adentro del pin. */
export const mapPinMinusInsideIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinMinusInsideShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }) },
    },
  });

/** Ubicación agregada: el pin se rebotea y el signo "+" se dibuja de insignia, en dos trazos. */
export const mapPinPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinPlusShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
      },
    },
  });

/** Igual, pero el "+" reemplaza el punto adentro del pin. */
export const mapPinPlusInsideIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinPlusInsideShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
      },
    },
  });

/** Buscando ubicación: el pin se rebotea y la lupa aparece de insignia. */
export const mapPinSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinSearchShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 260, origin: '18px 18px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 480 }),
      },
    },
    /** Rastreando: la lupa barre de un lado a otro, buscando. */
    scan: {
      shapes: {
        3: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(-2px, 0)' },
            { transform: 'translate(2px, 0)' },
            { transform: 'translate(0, 0)' },
          ],
          700,
          { origin: '18px 18px' },
        ),
      },
    },
  });

/** Ubicación inválida: el pin se rebotea y la equis se dibuja de insignia. */
export const mapPinXIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinXShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
    /** Rechazo: sacudida más brusca y rápida en vez del rebote suave — un "no" tajante. */
    deny: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -15, 12, -10, 8, -4, 0]), 450, {
        origin: '12px 21.8px',
      }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 150 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 210 }),
      },
    },
  });

/** Igual, pero la equis reemplaza el punto adentro del pin. */
export const mapPinXInsideIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinXInsideShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 230 }),
      },
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

/** Portafolio: se levanta del asa. */
export const briefcaseIcon: AnimatedIconDef = /* @__PURE__ */ icon(briefcaseShapes, {
    default: {
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.2, 0]), 500) },
    },
  });

/** Libro que se abre. */
export const bookOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookOpenShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleX(0.9)' }, { transform: 'scaleX(1)' }], 500, {
          origin: '12px 12px',
        }),
      },
    },
  });

/** Vibración de celular: corta y nerviosa, no un mecidito. */
export const smartphoneIcon: AnimatedIconDef = /* @__PURE__ */ icon(smartphoneShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -7, 7, -5, 5, -2, 0]), 600, {
        easing: SPRING_SMOOTH,
      }),
    },
  });

/** Timbrando. */
export const phoneIcon: AnimatedIconDef = /* @__PURE__ */ icon(phoneShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -12, 10, -8, 6, 0]), 800, { origin: 'center' }),
    },
  });

/** Ticket que sale de la impresora. */
export const receiptIcon: AnimatedIconDef = /* @__PURE__ */ icon(receiptShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2.5, 0]), 500, { easing: SPRING_OUT }),
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 180 }) },
    },
  });

/** Deshacer: gira al revés que `refresh-cw`. */
export const rotateCcwIcon: AnimatedIconDef = /* @__PURE__ */ icon(rotateCcwShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -360]), 800, { easing: SPRING_OUT, origin: 'center' }),
    },
  });

/** Carrito rodando con las ruedas girando. */
export const shoppingCartIcon: AnimatedIconDef = /* @__PURE__ */ icon(shoppingCartShapes, {
    default: {
      root: /* @__PURE__ */ track(SHOOT_OFF_KEYFRAMES, 1500),
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

/** Manecillas dando la vuelta; la carátula quieta. */
export const clockIcon: AnimatedIconDef = /* @__PURE__ */ icon(clockShapes, {
    default: {
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1200, { origin: '12px 12px' }) },
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
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2.5, 0]), 550),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2.5, 0]), 550),
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
  });

/** Despertador sonando: campanas y patas se sacuden juntas. */
export const alarmClockIcon: AnimatedIconDef = /* @__PURE__ */ icon(alarmClockShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -8, 7, -5, 3, 0]), 600, { origin: 'center' }),
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

/** Verificado: la insignia late y la palomita entra después. */
export const badgeCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeCheckShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { delay: 220 }),
      },
    },
  });

export const chevronDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronDownShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, 3]), 320) });

export const chevronLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronLeftShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, -3]), 320) });

export const chevronUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronUpShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, -3]), 320) });

/** Ordenar: las dos flechas se separan — el gesto de "esto se puede mover". */
export const chevronsUpDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronsUpDownShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1.5, 0]), 500),
      },
    },
  });

/** Agregar: el círculo se traza y la cruz aparece dentro. */
export const circlePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(circlePlusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350, { delay: 320 }),
      },
    },
  });

/** Ayuda: el signo de interrogación llega al final, que es lo que se mira. */
export const circleQuestionMarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(circleQuestionMarkShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 380 }),
      },
    },
  });

/** Revisado: la palomita se dibuja sobre la tabla. */
export const clipboardCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardCheckShapes, {
    default: { shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { delay: 150 }) } },
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
  });

/** Base de datos: los discos se asientan de arriba hacia abajo. */
export const databaseIcon: AnimatedIconDef = /* @__PURE__ */ icon(databaseShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { delay: 90, easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 450, { delay: 180, easing: SPRING_OUT }),
      },
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

/** Archivo validado. */
export const fileCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileCheckShapes, {
    default: { shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 180 }) } },
  });

/** Archivo rechazado: la equis se tacha en dos tiempos. */
export const fileXIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileXShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 180 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 300 }),
      },
    },
  });

/** Fork: del nodo de abajo brotan las dos ramas. */
export const gitForkIcon: AnimatedIconDef = /* @__PURE__ */ icon(gitForkShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 400, { origin: '12px 18px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 200 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 280 }),
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

/** Disco duro leyendo: el foquito parpadea. */
export const hardDriveIcon: AnimatedIconDef = /* @__PURE__ */ icon(hardDriveShapes, {
    default: {
      shapes: { 2: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.25' }, { opacity: '1' }], 500) },
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
  });

/** Idiomas: se traza, que es lo que hace un alfabeto. */
export const languagesIcon: AnimatedIconDef = /* @__PURE__ */ icon(languagesShapes, {
    default: { autoDraw: { speed: 60 } },
  });

/** Laptop abriéndose. */
export const laptopIcon: AnimatedIconDef = /* @__PURE__ */ icon(laptopShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scaleY(0.85)' }, { transform: 'scaleY(1)' }], 450, {
          easing: SPRING_OUT,
          origin: '12px 16px',
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
  });

/** Tablero armándose, tarjeta por tarjeta. */
export const layoutDashboardIcon: AnimatedIconDef = /* @__PURE__ */ icon(layoutDashboardShapes, {
    default: {
      // Los cuadros crecen y se achican alternado, pivotando desde su esquina EXTERIOR (la que
      // toca el marco de 18x18) para que el cuadrado que forman entre los 4 no se deforme —
      // solo respira el hueco interior, el contorno exterior se queda fijo.
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, { origin: '3px 3px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 80,
          origin: '21px 3px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, {
          delay: 160,
          origin: '21px 21px',
        }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 240,
          origin: '3px 21px',
        }),
      },
    },
    /** Los grandes se encogen al tamaño de los chicos y viceversa; luego regresan. */
    swap: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.556)' }, { transform: 'scaleY(0.556)' }, { transform: 'scaleY(1)' }],
          900,
          { origin: '3px 3px' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.556)' }, { transform: 'scaleY(0.556)' }, { transform: 'scaleY(1)' }],
          900,
          { origin: '21px 21px' },
        ),
        1: /* @__PURE__ */ track(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.8)' }, { transform: 'scaleY(1.8)' }, { transform: 'scaleY(1)' }],
          900,
          { origin: '21px 3px' },
        ),
        3: /* @__PURE__ */ track(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.8)' }, { transform: 'scaleY(1.8)' }, { transform: 'scaleY(1)' }],
          900,
          { origin: '3px 21px' },
        ),
      },
    },
  });

/** Igual que el tablero pero en diagonal. */
export const layoutGridIcon: AnimatedIconDef = /* @__PURE__ */ icon(layoutGridShapes, {
    default: {
      // Mismo criterio que layout-dashboard: pivote en la esquina exterior, el cuadrado que
      // forman los 4 no se deforma.
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, { origin: '3px 3px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 70,
          origin: '21px 3px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, {
          delay: 140,
          origin: '21px 21px',
        }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 210,
          origin: '3px 21px',
        }),
      },
    },
  });

/** Sidebar + 2 tarjetas: crecen/achican alternado, el panel lateral respira en ancho (no alto). */
export const layoutPanelLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(layoutPanelLeftShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.12)' }, { transform: 'scaleX(1)' }],
          420,
          { origin: '3px 12px' },
        ),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 80,
          origin: '21px 3px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, {
          delay: 160,
          origin: '21px 21px',
        }),
      },
    },
    /** El sidebar es el protagonista: late dos veces, las tarjetas se quedan quietas. */
    focus: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'scaleX(1)' },
            { transform: 'scaleX(1.18)' },
            { transform: 'scaleX(1)' },
            { transform: 'scaleX(1.18)' },
            { transform: 'scaleX(1)' },
          ],
          700,
          { origin: '3px 12px' },
        ),
      },
    },
  });

/** Header + 2 tarjetas: crecen/achican alternado, el header respira en alto (no ancho). */
export const layoutPanelTopIcon: AnimatedIconDef = /* @__PURE__ */ icon(layoutPanelTopShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.15)' }, { transform: 'scaleY(1)' }],
          420,
          { origin: '12px 3px' },
        ),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 80,
          origin: '3px 21px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, {
          delay: 160,
          origin: '21px 21px',
        }),
      },
    },
    /** El header es el protagonista: late dos veces, las tarjetas se quedan quietas. */
    focus: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'scaleY(1)' },
            { transform: 'scaleY(1.22)' },
            { transform: 'scaleY(1)' },
            { transform: 'scaleY(1.22)' },
            { transform: 'scaleY(1)' },
          ],
          700,
          { origin: '12px 3px' },
        ),
      },
    },
  });

/** Lista: las 2 miniaturas crecen/achican alternado, los renglones se dibujan de arriba a abajo. */
export const layoutListIcon: AnimatedIconDef = /* @__PURE__ */ icon(layoutListShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, { origin: '3px 3px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 100,
          origin: '3px 21px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 460 }),
      },
    },
    /** Leyendo: los renglones se iluminan uno a uno, en orden, como si se recorrieran. */
    read: {
      shapes: {
        2: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.35' }, { opacity: '1' }], 260, { delay: 0 }),
        3: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.35' }, { opacity: '1' }], 260, {
          delay: 140,
        }),
        4: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.35' }, { opacity: '1' }], 260, {
          delay: 280,
        }),
        5: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.35' }, { opacity: '1' }], 260, {
          delay: 420,
        }),
      },
    },
  });

/** Header + 2 tarjetas asimétricas: los 3 crecen/achican alternado. */
export const layoutTemplateIcon: AnimatedIconDef = /* @__PURE__ */ icon(layoutTemplateShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.15)' }, { transform: 'scaleY(1)' }],
          420,
          { origin: '12px 3px' },
        ),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 80,
          origin: '3px 21px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, {
          delay: 160,
          origin: '21px 21px',
        }),
      },
    },
    /** Las dos tarjetas intercambian ancho (la angosta se hace ancha y viceversa), luego regresan. */
    select: {
      shapes: {
        1: /* @__PURE__ */ track(
          [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.556)' }, { transform: 'scaleX(0.556)' }, { transform: 'scaleX(1)' }],
          900,
          { origin: '3px 21px' },
        ),
        2: /* @__PURE__ */ track(
          [{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.8)' }, { transform: 'scaleX(1.8)' }, { transform: 'scaleX(1)' }],
          900,
          { delay: 60, origin: '21px 21px' },
        ),
      },
    },
  });

/** Freeform: sin cuadrado que mantener — cada bloque late desde su propio centro. */
export const layoutFreeformIcon: AnimatedIconDef = /* @__PURE__ */ icon(layoutFreeformShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, { origin: '6.5px 6.5px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1]), 420, {
          delay: 90,
          origin: '17.5px 7.5px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 420, {
          delay: 180,
          origin: '7.5px 17.5px',
        }),
      },
    },
    /** Suelto de verdad: cada bloque se ladea y escala a su propio ritmo, sin sincronía. */
    shuffle: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(-6deg) scale(1.08)' },
            { transform: 'rotate(0deg) scale(1)' },
          ],
          520,
          { origin: '6.5px 6.5px' },
        ),
        1: /* @__PURE__ */ track(
          [
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(5deg) scale(0.9)' },
            { transform: 'rotate(0deg) scale(1)' },
          ],
          520,
          { delay: 110, origin: '17.5px 7.5px' },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'rotate(0deg) scale(1)' },
            { transform: 'rotate(-4deg) scale(1.1)' },
            { transform: 'rotate(0deg) scale(1)' },
          ],
          520,
          { delay: 220, origin: '7.5px 17.5px' },
        ),
      },
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

/** Los dos eslabones se juntan. */
export const linkIcon: AnimatedIconDef = /* @__PURE__ */ icon(linkShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 500),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1.2, 0]), 500),
      },
    },
  });

export const link2Icon: AnimatedIconDef = /* @__PURE__ */ icon(link2Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 500),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1.2, 0]), 500),
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

/** Lista: las viñetas caen en orden. */
export const listIcon: AnimatedIconDef = /* @__PURE__ */ icon(listShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 90 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 180 }),
      },
    },
  });

/** Pendientes que se van palomeando. */
export const listChecksIcon: AnimatedIconDef = /* @__PURE__ */ icon(listChecksShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 160 }),
      },
    },
  });

export const minusIcon: AnimatedIconDef = /* @__PURE__ */ icon(minusShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.25, 1]), 400, { easing: SPRING_OUT, origin: 'center' }),
    },
  });

/** Red: los nodos se conectan de arriba hacia abajo. */
export const networkIcon: AnimatedIconDef = /* @__PURE__ */ icon(networkShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350, { delay: 140 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350, { delay: 200 }),
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
        { easing: SPRING_BOUNCY, origin: 'center' },
      ),
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

/** Servidor: los indicadores parpadean desfasados. */
export const serverIcon: AnimatedIconDef = /* @__PURE__ */ icon(serverShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 550),
        3: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 550, { delay: 180 }),
      },
    },
  });

export const shieldIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.1, 1]), 480, { easing: SPRING_OUT, origin: 'center' }),
    },
  });

/** Escudo con alerta: late y el signo aparece. */
export const shieldAlertIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldAlertShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 4, 0]), 550, { origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 200 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 300 }),
      },
    },
  });

/** Protección apagada: el tajo cae al final. */
export const shieldOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldOffShapes, {
    default: { shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { delay: 220 }) } },
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
          { delay: 120, easing: SPRING_BOUNCY, origin: '11px 11px' },
        ),
        3: /* @__PURE__ */ track(
          [
            { transform: 'scaleX(1)' },
            { transform: 'scaleX(1.15)' },
            { transform: 'scaleX(0.95)' },
            { transform: 'scaleX(1)' },
          ],
          550,
          { delay: 120, easing: SPRING_BOUNCY, origin: '11px 11px' },
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
          { delay: 120, easing: SPRING_BOUNCY, origin: '11px 11px' },
        ),
      },
    },
  });

/** Favorito: gira y crece de un golpe. */
export const starIcon: AnimatedIconDef = /* @__PURE__ */ icon(starShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'rotate(0deg) scale(1)' },
          { transform: 'rotate(360deg) scale(1.25)' },
          { transform: 'rotate(360deg) scale(1)' },
        ],
        1050,
        { easing: SPRING_OUT, origin: 'center' },
      ),
    },
    /** Chispazo: pulso doble sin girar, como un "me encanta" rápido. */
    twinkle: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'scale(1) rotate(0deg)' },
          { transform: 'scale(1.3) rotate(-8deg)' },
          { transform: 'scale(0.95) rotate(4deg)' },
          { transform: 'scale(1.15) rotate(-2deg)' },
          { transform: 'scale(1) rotate(0deg)' },
        ],
        550,
        { origin: 'center' },
      ),
    },
  });

// ── 4ª tanda: cobertura total del inventario ──────────────────────────────
// Nombres CANÓNICOS de Lucide. Los que la app escribe distinto entran por `ICON_ALIASES`.
/** Cámara que barre la escena. */
export const cctvIcon: AnimatedIconDef = /* @__PURE__ */ icon(cctvShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -10, 8, 0]), 750, { origin: 'center' }) },
  });

export const arrowRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowRightShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, 3]), 320) });

/** Gráfica: las barras crecen desde su base, de la más alta a la más baja. */
export const chartColumnIcon: AnimatedIconDef = /* @__PURE__ */ icon(chartColumnShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'scaleY(0.15)' }, { transform: 'scaleY(1)' }], 500, {
          easing: SPRING_OUT,
          origin: '0px 17px',
        }),
        1: /* @__PURE__ */ track([{ transform: 'scaleY(0.15)' }, { transform: 'scaleY(1)' }], 500, {
          delay: 90,
          easing: SPRING_OUT,
          origin: '0px 17px',
        }),
        3: /* @__PURE__ */ track([{ transform: 'scaleY(0.15)' }, { transform: 'scaleY(1)' }], 500, {
          delay: 180,
          easing: SPRING_OUT,
          origin: '0px 17px',
        }),
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
  });

export const building2Icon: AnimatedIconDef = /* @__PURE__ */ icon(building2Shapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350, { delay: 90 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 350, { delay: 180 }),
      },
    },
  });

/** Cable: se traza como lo que es, un tendido. */
export const cableIcon: AnimatedIconDef = /* @__PURE__ */ icon(cableShapes, { default: { autoDraw: { speed: 55 } } });

export const circleIcon: AnimatedIconDef = /* @__PURE__ */ icon(circleShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 450, { origin: 'center' }) },
  });

export const commandIcon: AnimatedIconDef = /* @__PURE__ */ icon(commandShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1]), 420, { easing: SPRING_OUT, origin: 'center' }) },
  });

/** Editar: la pluma recorre su trazo sobre la hoja. */
export const squarePenIcon: AnimatedIconDef = /* @__PURE__ */ icon(squarePenShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.5px, -1.5px)' },
            { transform: 'translate(-1px, 1px)' },
            { transform: 'translate(0, 0)' },
          ],
          700,
        ),
      },
    },
  });

export const penIcon: AnimatedIconDef = /* @__PURE__ */ icon(penShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(1.5px, -1.5px)' },
          { transform: 'translate(-1px, 1px)' },
          { transform: 'translate(0, 0)' },
        ],
        700,
      ),
    },
    /** Escribiendo: gira desde la punta, fija, simulando el trazo de la mano. */
    write: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -10, 6, -8, 5, -6, 3, 0]), 950, {
        origin: '2.3px 21.5px',
      }),
    },
  });

/** La pluma escribe y el renglón aparece detrás de ella. */
export const penLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(penLineShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(
          [
            { transform: 'translate(0, 0)' },
            { transform: 'translate(1.5px, -1.5px)' },
            { transform: 'translate(0, 0)' },
          ],
          600,
        ),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 200 }),
      },
    },
    /** Escribiendo: la pluma (1) gira desde su punta; el renglón (0) se dibuja al parejo. */
    write: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -10, 6, -8, 5, -6, 3, 0]), 950, {
          origin: '2.3px 21.5px',
        }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 700, { delay: 150 }),
      },
    },
  });

export const fileIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2, 0]), 480, { easing: SPRING_OUT }) },
  });

export const fileCheckCornerIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileCheckCornerShapes, {
    default: { shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 180 }) } },
  });

/** Hoja de cálculo: las celdas se llenan en cascada. */
export const fileSpreadsheetIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileSpreadsheetShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 60 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 140 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 220 }),
      },
    },
  });

export const fileBadgeIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileBadgeShapes, {
    default: { shapes: { 3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { delay: 150 }) } },
    /** Los renglones se hunden distinto y el sello se aprieta después: el papel cede, el sello sella. */
    chida: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1.95, 0]), 500),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.45, 0]), 500),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.95, 1]), 420, { delay: 150 }),
      },
    },
  });

export const fileExclamationPointIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileExclamationPointShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 3, 0]), 550),
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 200 }) },
    },
  });

/** Voltear horizontal: se voltea de verdad (scaleX negativo), no se sacude. */
export const squareCenterlineDashedHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(squareCenterlineDashedHorizontalShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [{ transform: 'scaleX(1)' }, { transform: 'scaleX(-1)' }, { transform: 'scaleX(1)' }],
        900,
        { origin: 'center' },
      ),
    },
  });

export const squareCenterlineDashedVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(squareCenterlineDashedVerticalShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [{ transform: 'scaleY(1)' }, { transform: 'scaleY(-1)' }, { transform: 'scaleY(1)' }],
        900,
        { origin: 'center' },
      ),
    },
  });

/** Agarradera: los puntos se cimbran por filas — invita a arrastrar. */
export const gripVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(gripVerticalShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 450),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 450),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 450, { delay: 90 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 450, { delay: 90 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 450, { delay: 180 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1.2, 0]), 450, { delay: 180 }),
      },
    },
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

export const houseIcon: AnimatedIconDef = /* @__PURE__ */ icon(houseShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2.5, 0]), 500, { easing: SPRING_OUT }) },
  });

/** Foto: sale el sol y luego el paisaje. */
export const imageIcon: AnimatedIconDef = /* @__PURE__ */ icon(imageShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { delay: 220 }),
      },
    },
  });

/** Sin imagen: el tajo cae al final. */
export const imageOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(imageOffShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 220 }) } },
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

export const mouseIcon: AnimatedIconDef = /* @__PURE__ */ icon(mouseShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1.5, 0]), 420, { easing: SPRING_OUT }) },
  });

/** Navegación: se lanza hacia adelante. */
export const navigationIcon: AnimatedIconDef = /* @__PURE__ */ icon(navigationShapes, {
    default: {
      root: /* @__PURE__ */ track(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(2px, -2px)' },
          { transform: 'translate(0, 0)' },
        ],
        550,
        { easing: SPRING_OUT },
      ),
    },
  });

/** Buscar en paquetería: la lupa late sobre la caja. */
export const packageSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(packageSearchShapes, {
    default: { shapes: { 5: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.2, 1]), 500, { origin: '18.5px 16.5px' }) } },
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

export const rotateCwIcon: AnimatedIconDef = /* @__PURE__ */ icon(rotateCwShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 800, { easing: SPRING_OUT, origin: 'center' }) },
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
  });

/** Subir a la nube: la flecha se va para arriba. */
export const cloudUploadIcon: AnimatedIconDef = /* @__PURE__ */ icon(cloudUploadShapes, {
    default: { shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 550) } },
  });

/** Usuario validado: la palomita se dibuja al final. */
export const userCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(userCheckShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 450),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 200 }),
      },
    },
  });

export const userMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(userMinusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 180 }),
      },
    },
  });

export const userPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(userPlusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 180 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 240 }),
      },
    },
  });

export const userXIcon: AnimatedIconDef = /* @__PURE__ */ icon(userXShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 300 }),
      },
    },
  });

/**
   * Configurar usuario: la cabeza asoma y el engrane late. Los índices NO son intercambiables —
   * 10 es la cabeza (9,7) y 9 el engrane (18,15); al revés, la cabeza escala respecto a un pivote
   * que le queda a media figura de distancia y sale volando.
   */
export const userCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(userCogShapes, {
    default: {
      shapes: {
        10: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 450),
        // El engrane es el círculo Y los 8 dientes que lo rodean (índices 1-8) — deben girar
        // juntos como una sola pieza, no el círculo solo.
        1: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        3: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        4: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        5: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        6: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        7: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        8: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
        9: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.15) rotate(360deg)' },
            { transform: 'scale(1) rotate(720deg)' },
          ],
          650,
          { delay: 150, origin: '18px 15px' },
        ),
      },
    },
    /** Ajuste fino: el engrane da vueltas cortas de matraca, en vez del giro completo. */
    tune: {
      shapes: {
        10: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 450),
        1: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        2: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        3: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        4: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        5: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        6: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        7: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        8: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
        9: /* @__PURE__ */ track(
          [
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
            { transform: 'scale(1.08) rotate(15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
          ],
          700,
          { origin: '18px 15px' },
        ),
      },
    },
  });

/** Wifi conectando: del punto hacia afuera, arco por arco. */
// Cada arco SUBE desde abajo (translateY + fade), no truena en su lugar como `burst()` — así se
// lee la dirección sin ambigüedad. Del punto hacia afuera: punto, arco interior, medio, exterior.
const WIFI_RISE = /* @__PURE__ */ [
  { transform: 'translateY(3px)', opacity: '0' },
  { transform: 'translateY(0)', opacity: '1' },
];

export const wifiIcon: AnimatedIconDef = /* @__PURE__ */ icon(wifiShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(WIFI_RISE, 320),
        3: /* @__PURE__ */ track(WIFI_RISE, 380, { delay: 130 }),
        2: /* @__PURE__ */ track(WIFI_RISE, 380, { delay: 260 }),
        1: /* @__PURE__ */ track(WIFI_RISE, 380, { delay: 390 }),
      },
    },
  });

/** Señal fuerte: como wifi, sin el arco más exterior. */
export const wifiHighIcon: AnimatedIconDef = /* @__PURE__ */ icon(wifiHighShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(WIFI_RISE, 320),
        2: /* @__PURE__ */ track(WIFI_RISE, 380, { delay: 130 }),
        1: /* @__PURE__ */ track(WIFI_RISE, 380, { delay: 260 }),
      },
    },
  });

/** Señal débil: solo el arco interior. */
export const wifiLowIcon: AnimatedIconDef = /* @__PURE__ */ icon(wifiLowShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(WIFI_RISE, 320),
        1: /* @__PURE__ */ track(WIFI_RISE, 380, { delay: 130 }),
      },
    },
  });

/** Sin señal: solo el punto. */
export const wifiZeroIcon: AnimatedIconDef = /* @__PURE__ */ icon(wifiZeroShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(WIFI_RISE, 320) } },
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

/** Panel: el divisor se desliza a la izquierda — "left" es el nombre, no solo la etiqueta. */
// Se mueve a la izquierda y se sostiene ahí la mayor parte del tiempo, en vez de un vaivén
// parejo que se lee ambiguo. panel-left-close usa el mismo divisor: su flecha "<" ya apunta
// y empuja hacia la izquierda, así que ambos van en la MISMA dirección.
const PANEL_DIVIDER_LEFT: Keyframe[] = [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(-2px)', offset: 0.35 },
  { transform: 'translateX(-2px)', offset: 0.75 },
  { transform: 'translateX(0)', offset: 1 },
];

export const panelLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelLeftShapes, {
    default: { shapes: { 1: /* @__PURE__ */ track(PANEL_DIVIDER_LEFT, 550) } },
  });

/** Cerrar panel: la flecha empuja hacia la izquierda y se sostiene. */
export const panelLeftCloseIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelLeftCloseShapes, {
    // `reverseOnLeave` aplica a TODA la coreografía, no solo al root: por eso basta con el track
    // de la flecha, sin un root vacío de relleno.
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_LEFT, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Fecha confirmada: las anillas rebotan y la palomita se dibuja. */
export const calendarCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarCheckShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 260 }),
      },
    },
  });

/** Fecha con hora: el reloj late después de las anillas. */
/**
 * Calendario con reloj. Los dos pines brincan como en el resto de la familia, y ADEMÁS las
 * manecillas dan un tic — girando desde el centro del reloj, no brincando como los pines: el gesto
 * de cada figura corresponde a lo que la figura es. Es el único de los cuatro calendarios que
 * marca tiempo, y la animación lo dice.
 *
 * Ojo con los índices: aquí los pines son 1 y 4, NO 0 y 1 como en sus hermanos — el 0 son las
 * manecillas. La coreografía vieja animaba 0 y 1, así que movía las manecillas hacia arriba (se
 * salían del reloj) y dejaba el pin izquierdo quieto.
 *
 * Las dos manecillas son UN solo `<path>` con un único subtrazo (`M16 14v2.2l1.6 1`), unidas en el
 * vértice (16, 16.2): giran como cuerpo rígido por estructura, no hace falta coordinar dos tracks.
 */
export const calendarClockIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarClockShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500, { delay: 90 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 30, 0]), 620, { delay: 260, origin: '16px 16px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 500, { delay: 220, origin: '16px 16px' }),
      },
    },
  });

/** Los días se van llenando, renglón por renglón. */
export const calendarDaysIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarDaysShapes, {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 60 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 110 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 160 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 240 }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 290 }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 340 }),
      },
    },
  });

/** Mapa desdoblándose. */
export const mapIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapShapes, {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scaleX(0.88)' }, { transform: 'scaleX(1)' }], 500, {
        easing: SPRING_OUT,
        origin: 'center',
      }),
    },
  });

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

/**
   * Llave redonda girando sobre su anillo. Ojo: el anillo de ésta está ARRIBA A LA DERECHA, no
   * abajo a la izquierda como en `key` — con el pivote de la otra, la llave gira desde la punta.
   */
export const keyRoundIcon: AnimatedIconDef = /* @__PURE__ */ icon(keyRoundShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -20, 0]), 700, { origin: '16.5px 7.5px' }) },
  });

/** Infinito: lento a propósito, el chiste es ver el trazo completar el lazo. */
export const infinityIcon: AnimatedIconDef = /* @__PURE__ */ icon(infinityShapes, {
    default: { autoDraw: { speed: 38 } },
  });

export const squareIcon: AnimatedIconDef = /* @__PURE__ */ icon(squareShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1]), 420, { easing: SPRING_OUT, origin: 'center' }) },
  });

/** Volumen: las ondas salen del cono, de la chica a la grande. */
export const volume2Icon: AnimatedIconDef = /* @__PURE__ */ icon(volume2Shapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 80 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 200 }),
      },
    },
  });

export const CURATED_ICONS: Record<string, AnimatedIconDef> = {
  bell: bellIcon,
  'bell-ring': bellRingIcon,
  check: checkIcon,
  'circle-alert': circleAlertIcon,
  'circle-check': circleCheckIcon,
  'circle-x': circleXIcon,
  copy: copyIcon,
  calendar: calendarIcon,
  'chevron-right': chevronRightIcon,
  'arrow-left': arrowLeftIcon,
  download: downloadIcon,
  eye: eyeIcon,
  'eye-off': eyeOffIcon,
  'hat-glasses': hatGlassesIcon,
  'heart-pulse': heartPulseIcon,
  images: imagesIcon,
  info: infoIcon,
  'loader-circle': loaderCircleIcon,
  lock: lockIcon,
  mail: mailIcon,
  'mouse-pointer-click': mousePointerClickIcon,
  pencil: pencilIcon,
  plus: plusIcon,
  'refresh-cw': refreshCwIcon,
  save: saveIcon,
  search: searchIcon,
  'search-check': searchCheckIcon,
  'search-slash': searchSlashIcon,
  'search-x': searchXIcon,
  send: sendIcon,
  settings: settingsIcon,
  'shield-check': shieldCheckIcon,
  sparkles: sparklesIcon,
  trash: trashIcon,
  'trash-2': trash2Icon,
  'triangle-alert': triangleAlertIcon,
  upload: uploadIcon,
  user: userIcon,
  wrench: wrenchIcon,
  x: xIcon,
  'file-text': fileTextIcon,
  monitor: monitorIcon,
  package: packageIcon,
  'rotate-ccw-clock': rotateCcwClockIcon,
  shirt: shirtIcon,
  'folder-open': folderOpenIcon,
  plane: planeIcon,
  globe: globeIcon,
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
  'app-window': appWindowIcon,
  'badge-check': badgeCheckIcon,
  'chevron-down': chevronDownIcon,
  'chevron-left': chevronLeftIcon,
  'chevron-up': chevronUpIcon,
  'chevrons-up-down': chevronsUpDownIcon,
  'circle-plus': circlePlusIcon,
  'circle-question-mark': circleQuestionMarkIcon,
  'clipboard-check': clipboardCheckIcon,
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
  'qr-code': qrCodeIcon,
  'scroll-text': scrollTextIcon,
  server: serverIcon,
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
  'ellipsis-vertical': ellipsisVerticalIcon,
  mouse: mouseIcon,
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
  'calendar-check': calendarCheckIcon,
  'calendar-clock': calendarClockIcon,
  'calendar-days': calendarDaysIcon,
  map: mapIcon,
  'key-round': keyRoundIcon,
  infinity: infinityIcon,
  square: squareIcon,
  'volume-2': volume2Icon,
};
