import { AnimatedIconDef } from './animated-icon.model';
import { EASE, SPRING_OUT, SPRING_BOUNCY, SPRING_SMOOTH, rotateSeq, scaleSeq, moveXSeq, moveYSeq, track, burst, strokeDraw, icon, held } from './choreography';
import { activityShapes, alarmClockShapes, alarmClockCheckShapes, alarmClockMinusShapes, alarmClockOffShapes, alarmClockPlusShapes, appWindowShapes, arrowLeftShapes, arrowRightShapes, arrowUpShapes, arrowDownShapes, arrowUpLeftShapes, arrowUpRightShapes, arrowDownLeftShapes, arrowDownRightShapes, atSignShapes, badgeCheckShapes, banShapes, banknoteShapes, bellRingShapes, bellShapes, bellCheckShapes, bellDotShapes, bellMinusShapes, bellOffShapes, bellPlusShapes, bookOpenShapes, bracesShapes, briefcaseShapes, building2Shapes, buildingShapes, cableShapes, cakeShapes, calendarCheckShapes, calendarClockShapes, calendarDaysShapes, calendarShapes, cameraShapes, cctvShapes, chartColumnShapes, checkShapes, chevronDownShapes, chevronLeftShapes, chevronRightShapes, chevronUpShapes, chevronsUpDownShapes, circleAlertShapes, circleCheckShapes, circlePlusShapes, circleQuestionMarkShapes, circleShapes, circleXShapes, clipboardCheckShapes, clockShapes, cloudUploadShapes, commandShapes, contactShapes, copyShapes, copyCheckShapes, copyMinusShapes, copyPlusShapes, copySlashShapes, copyXShapes, cpuShapes, creditCardShapes, crownShapes, databaseShapes, downloadShapes, ellipsisShapes, ellipsisVerticalShapes, externalLinkShapes, eyeOffShapes, eyeShapes, fileBadgeShapes, fileCheckCornerShapes, fileCheckShapes, fileExclamationPointShapes, fileShapes, fileSpreadsheetShapes, fileTextShapes, fileXShapes, folderOpenShapes, funnelShapes, gitForkShapes, globeShapes, globeCheckShapes, globeLockShapes, globeOffShapes, globeXShapes, bookmarkShapes, bookmarkCheckShapes, bookmarkMinusShapes, bookmarkOffShapes, bookmarkPlusShapes, bookmarkXShapes, stickyNoteShapes, stickyNoteCheckShapes, stickyNoteMinusShapes, stickyNoteOffShapes, stickyNotePlusShapes, stickyNoteXShapes, ticketShapes, ticketCheckShapes, ticketMinusShapes, ticketPercentShapes, ticketPlusShapes, ticketSlashShapes, ticketXShapes, grid2x2Shapes, grid2x2CheckShapes, grid2x2PlusShapes, grid2x2XShapes, graduationCapShapes, gripVerticalShapes, hardDriveShapes, hashShapes, hatGlassesShapes, heartPulseShapes, heartCrackShapes, heartHandshakeShapes, heartMinusShapes, heartOffShapes, heartPlusShapes, heartXShapes, rotateCcwClockShapes, houseShapes, idCardShapes, imageOffShapes, imageShapes, imagesShapes, imageDownShapes, imageMinusShapes, imagePlayShapes, imagePlusShapes, imageUpShapes, imageUpscaleShapes, inboxShapes, infinityShapes, infoShapes, keyRoundShapes, keyShapes, keyboardShapes, landmarkShapes, languagesShapes, laptopShapes, layersShapes, layoutDashboardShapes, layoutGridShapes, layoutPanelLeftShapes, layoutPanelTopShapes, layoutListShapes, layoutTemplateShapes, layoutFreeformShapes, libraryShapes, lightbulbShapes, link2Shapes, linkShapes, listChecksShapes, listShapes, loaderCircleShapes, lockShapes, logOutShapes, mailShapes, mapPinShapes, mapPinCheckShapes, mapPinCheckInsideShapes, mapPinHouseShapes, mapPinMinusShapes, mapPinMinusInsideShapes, mapPinPlusShapes, mapPinPlusInsideShapes, mapPinSearchShapes, mapPinXShapes, mapPinXInsideShapes, mapShapes, minusShapes, monitorShapes, moonShapes, mousePointerClickShapes, mouseShapes, navigationShapes, networkShapes, packageSearchShapes, packageShapes, packageCheckShapes, packageMinusShapes, packageOpenShapes, packagePlusShapes, packageXShapes, paletteShapes, panelLeftCloseShapes, panelLeftShapes, panelLeftOpenShapes, panelRightShapes, panelRightCloseShapes, panelRightOpenShapes, panelTopShapes, panelTopCloseShapes, panelTopOpenShapes, panelBottomShapes, panelBottomCloseShapes, panelBottomOpenShapes, panelLeftDashedShapes, panelRightDashedShapes, panelTopDashedShapes, panelBottomDashedShapes, panelTopBottomDashedShapes, panelLeftRightDashedShapes, penLineShapes, penShapes, pencilShapes, phoneShapes, planeShapes, playShapes, plusShapes, powerShapes, printerShapes, qrCodeShapes, receiptShapes, refreshCwShapes, rotateCcwShapes, rotateCwShapes, routerShapes, saveShapes, saveAllShapes, saveCheckShapes, saveOffShapes, savePenShapes, savePlusShapes, scrollTextShapes, searchCheckShapes, searchShapes, searchSlashShapes, searchXShapes, sendShapes, serverShapes, serverCogShapes, serverCrashShapes, serverOffShapes, serverPlusShapes, settingsShapes, shieldAlertShapes, shieldCheckShapes, shieldOffShapes, shieldShapes, shieldBanShapes, shieldCogShapes, shieldHalfShapes, shieldKeyholeShapes, shieldLockShapes, shieldMinusShapes, shieldPlusShapes, shieldUserShapes, shieldXShapes, shirtShapes, shoppingBagShapes, shoppingCartShapes, smartphoneShapes, sparklesShapes, squareCenterlineDashedHorizontalShapes, squareCenterlineDashedVerticalShapes, squarePenShapes, squareShapes, starShapes, starCheckShapes, starHalfShapes, starMinusShapes, starOffShapes, starPlusShapes, starXShapes, sunShapes, tabletShapes, tagShapes, trash2Shapes, trashShapes, triangleAlertShapes, triangleShapes, truckShapes, tvShapes, typeShapes, unlinkShapes, uploadShapes, signalShapes, signalHighShapes, signalMediumShapes, signalLowShapes, signalZeroShapes, volumeShapes, volume1Shapes, volumeOffShapes, volumeXShapes, tally1Shapes, tally2Shapes, tally3Shapes, tally4Shapes, tally5Shapes, userCheckShapes, userCogShapes, userMinusShapes, userPlusShapes, userShapes, userXShapes, usersShapes, userRoundShapes, userRoundArrowLeftShapes, userRoundCheckShapes, userRoundCogShapes, userRoundKeyShapes, userRoundMinusShapes, userRoundPenShapes, userRoundPlusShapes, userRoundSearchShapes, userRoundXShapes, volume2Shapes, warehouseShapes, webhookShapes, wifiShapes, wifiHighShapes, wifiLowShapes, wifiZeroShapes, workflowShapes, wrenchShapes, xShapes, zapShapes, zoomInShapes, zoomOutShapes } from './animated-icons.shapes';

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

const BELL_SHAKE_ROOT = /* @__PURE__ */ rotateSeq([0, 18, -12, 9, -5, 0]);
const BELL_CLAPPER = /* @__PURE__ */ moveXSeq([0, -4, 3, -2, 1, 0]);

export const bellCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(bellCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(BELL_SHAKE_ROOT, 700, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_CLAPPER, 750),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 550 }),
      },
    },
  });

export const bellDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(bellDotShapes, {
    default: {
      root: /* @__PURE__ */ track(BELL_SHAKE_ROOT, 700, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_CLAPPER, 750),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 550 }),
      },
    },
  });

export const bellMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(bellMinusShapes, {
    default: {
      root: /* @__PURE__ */ track(BELL_SHAKE_ROOT, 700, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_CLAPPER, 750),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 550 }),
      },
    },
  });

/** Silenciada: se fragmenta y la diagonal cruza al final — sin repique, ya no suena. */
export const bellOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(bellOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 360 }),
      },
    },
  });

export const bellPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(bellPlusShapes, {
    default: {
      root: /* @__PURE__ */ track(BELL_SHAKE_ROOT, 700, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_CLAPPER, 750),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 550 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 550 }),
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
const COPY_HANDSHAKE = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(1.5px, -1.5px)' },
  { transform: 'translate(0, 0)' },
];

export const copyIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(COPY_HANDSHAKE, 600) } },
  });

/** Copiado y confirmado: la misma separación de copy y la palomita se dibuja de insignia. */
// Se despega de verdad, más lejos y con rebote elástico, en vez del handshake chico.
const COPY_PEEL = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(3px, -3px)' },
  { transform: 'translate(0, 0)' },
];

export const copyCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyCheckShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(COPY_HANDSHAKE, 600),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 350 }),
      },
    },
    peel: {
      shapes: {
        1: /* @__PURE__ */ track(COPY_PEEL, 500, { easing: SPRING_BOUNCY }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 350 }),
      },
    },
  });

/** Quitar copia: se separa y el "-" se dibuja de insignia. */
export const copyMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyMinusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(COPY_HANDSHAKE, 600),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
    peel: {
      shapes: {
        1: /* @__PURE__ */ track(COPY_PEEL, 500, { easing: SPRING_BOUNCY }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
  });

/** Agregar copia: se separa y el "+" se dibuja de insignia, en dos trazos. */
export const copyPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyPlusShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(COPY_HANDSHAKE, 600),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
    peel: {
      shapes: {
        2: /* @__PURE__ */ track(COPY_PEEL, 500, { easing: SPRING_BOUNCY }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
  });

/** Copia inválida: se separa y una sola diagonal la tacha. */
export const copySlashIcon: AnimatedIconDef = /* @__PURE__ */ icon(copySlashShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(COPY_HANDSHAKE, 600),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { delay: 350 }),
      },
    },
    peel: {
      shapes: {
        1: /* @__PURE__ */ track(COPY_PEEL, 500, { easing: SPRING_BOUNCY }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { delay: 350 }),
      },
    },
  });

/** Cancelar copia: se separa y la equis se dibuja de insignia. */
export const copyXIcon: AnimatedIconDef = /* @__PURE__ */ icon(copyXShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(COPY_HANDSHAKE, 600),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 430 }),
      },
    },
    peel: {
      shapes: {
        2: /* @__PURE__ */ track(COPY_PEEL, 500, { easing: SPRING_BOUNCY }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 430 }),
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

const HEART_BEAT = /* @__PURE__ */ scaleSeq([1, 1.1, 1]);

export const heartCrackIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartCrackShapes, {
    default: {
      root: /* @__PURE__ */ track(HEART_BEAT, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { delay: 260 }) },
    },
  });

/** Un solo trazo — no hay insignia que dibujar aparte, todo el gesto es la figura completa. */
export const heartHandshakeIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartHandshakeShapes, {
    default: {
      root: /* @__PURE__ */ track(HEART_BEAT, 500, { easing: SPRING_OUT, origin: 'center' }),
    },
  });

export const heartMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartMinusShapes, {
    default: {
      root: /* @__PURE__ */ track(HEART_BEAT, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }) },
    },
  });

/** Ya no es favorito: se fragmenta y la diagonal cruza al final — sin latido. */
export const heartOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 160 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 380 }),
      },
    },
  });

export const heartPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartPlusShapes, {
    default: {
      root: /* @__PURE__ */ track(HEART_BEAT, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }),
      },
    },
  });

export const heartXIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartXShapes, {
    default: {
      root: /* @__PURE__ */ track(HEART_BEAT, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
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

const SAVE_POP_ROOT = /* @__PURE__ */ scaleSeq([1, 0.85, 1.06, 1]);
const SAVE_POP_BADGE = /* @__PURE__ */ scaleSeq([1, 1.55, 0.8, 1]);

/** Guardado y confirmado: la etiqueta rebota y la palomita se dibuja de insignia. */
export const saveCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(saveCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.95, 1]), 420, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 0.9, 1]), 600, {
          delay: 80,
          easing: SPRING_BOUNCY,
          origin: '12px 17px',
        }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 500 }),
      },
    },
    pop: {
      root: /* @__PURE__ */ track(SAVE_POP_ROOT, 500, { easing: SPRING_BOUNCY, origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(SAVE_POP_BADGE, 550, { delay: 80, easing: SPRING_BOUNCY, origin: '12px 17px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 500 }),
      },
    },
  });

/** Guardado desactivado: se fragmenta y la diagonal la cruza al final. */
export const saveOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(saveOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 60 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 140 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 320 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 400 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 460 }),
      },
    },
    quick: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 120),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 90, { delay: 30 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 90, { delay: 70 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 120, { delay: 110 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 120, { delay: 160 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 90, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 230, easing: SPRING_OUT }),
      },
    },
  });

/** Guardar y editar: la etiqueta rebota y la pluma se dibuja de insignia. */
export const savePenIcon: AnimatedIconDef = /* @__PURE__ */ icon(savePenShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.95, 1]), 420, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 0.9, 1]), 600, {
          delay: 80,
          easing: SPRING_BOUNCY,
          origin: '12px 17px',
        }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 500 }),
      },
    },
    pop: {
      root: /* @__PURE__ */ track(SAVE_POP_ROOT, 500, { easing: SPRING_BOUNCY, origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(SAVE_POP_BADGE, 550, { delay: 80, easing: SPRING_BOUNCY, origin: '12px 17px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 500 }),
      },
    },
  });

/** Guardar y agregar: la etiqueta rebota y el "+" se dibuja de insignia, en dos trazos. */
export const savePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(savePlusShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.95, 1]), 420, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 0.9, 1]), 600, {
          delay: 80,
          easing: SPRING_BOUNCY,
          origin: '12px 17px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 500 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 500 }),
      },
    },
    pop: {
      root: /* @__PURE__ */ track(SAVE_POP_ROOT, 500, { easing: SPRING_BOUNCY, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(SAVE_POP_BADGE, 550, { delay: 80, easing: SPRING_BOUNCY, origin: '12px 17px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 500 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 500 }),
      },
    },
  });

/** Guardar todo: las dos hojas se asientan una tras otra, la de atrás primero. */
export const saveAllIcon: AnimatedIconDef = /* @__PURE__ */ icon(saveAllShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.9, 1]), 380, { easing: SPRING_OUT, origin: '13px 14px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.95, 1]), 420, {
          delay: 140,
          easing: SPRING_OUT,
          origin: '12px 12px',
        }),
      },
    },
    stack: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.78, 1.05, 1]), 460, {
          easing: SPRING_BOUNCY,
          origin: '13px 14px',
        }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.82, 1.08, 1]), 500, {
          delay: 160,
          easing: SPRING_BOUNCY,
          origin: '12px 12px',
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

const PACKAGE_BOUNCE = /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2.5, 0]), 550, {
  easing: SPRING_OUT,
});
const PACKAGE_DROP = /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -6, 1, 0]), 480, {
  easing: SPRING_BOUNCY,
});

/** Paquete confirmado: el mismo bounce de package y la palomita se dibuja de insignia. */
export const packageCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(packageCheckShapes, {
    default: {
      root: PACKAGE_BOUNCE,
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 400 }) },
    },
    drop: {
      root: PACKAGE_DROP,
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 330 }) },
    },
  });

/** Quitar paquete: bounce y el "-" se dibuja de insignia. */
export const packageMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(packageMinusShapes, {
    default: {
      root: PACKAGE_BOUNCE,
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }) },
    },
    drop: {
      root: PACKAGE_DROP,
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 330 }) },
    },
  });

/** Paquete abierto: las dos solapas se abren, el cuerpo se queda quieto. */
export const packageOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(packageOpenShapes, {
    default: {
      root: PACKAGE_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 450, {
          delay: 100,
          origin: '12px 8px',
        }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 450, {
          delay: 180,
          origin: '12px 8px',
        }),
      },
    },
    wide: {
      root: PACKAGE_DROP,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.22, 1]), 480, {
          delay: 60,
          easing: SPRING_BOUNCY,
          origin: '12px 8px',
        }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.22, 1]), 480, {
          delay: 140,
          easing: SPRING_BOUNCY,
          origin: '12px 8px',
        }),
      },
    },
  });

/** Agregar paquete: bounce y el "+" se dibuja de insignia, en dos trazos. */
export const packagePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(packagePlusShapes, {
    default: {
      root: PACKAGE_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
      },
    },
    drop: {
      root: PACKAGE_DROP,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 330 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 330 }),
      },
    },
  });

/** Cancelar paquete: bounce y la equis se dibuja de insignia. */
export const packageXIcon: AnimatedIconDef = /* @__PURE__ */ icon(packageXShapes, {
    default: {
      root: PACKAGE_BOUNCE,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 480 }),
      },
    },
    drop: {
      root: PACKAGE_DROP,
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 330 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 410 }),
      },
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

// Con estas variantes el meridiano y el ecuador van todos soldados en un solo trazo (no hay
// figura separada que "girar" como en globe), así que el cuerpo late tantito en vez de girar, y
// la insignia se dibuja después.
const GLOBE_PULSE = /* @__PURE__ */ [
  { transform: 'scaleX(1)' },
  { transform: 'scaleX(0.94)' },
  { transform: 'scaleX(1)' },
];

/** Verificado en línea: el globo late y la palomita se dibuja de insignia. */
export const globeCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(globeCheckShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(GLOBE_PULSE, 600, { origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 300 }),
      },
    },
    /** Confirmación con más carácter: sacudida corta en vez del pulso tranquilo. */
    shake: { root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 6, -5, 3, 0]), 500) },
  });

/** Acceso restringido: el globo late y el candado cierra encima. */
export const globeLockIcon: AnimatedIconDef = /* @__PURE__ */ icon(globeLockShapes, {
    default: {
      shapes: {
        // El globo son DOS figuras (el arco 0 y el resto del ecuador 1) — laten juntas, si no
        // el ecuador se queda quieto mientras el arco pulsa.
        0: /* @__PURE__ */ track(GLOBE_PULSE, 600, { origin: '10px 12px' }),
        1: /* @__PURE__ */ track(GLOBE_PULSE, 600, { origin: '10px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2, 0]), 300, { delay: 300, easing: SPRING_OUT }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 380 }),
      },
    },
    /** Acceso con problemas: sacudida corta en vez del pulso tranquilo. */
    shake: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 6, -5, 3, 0]), 500),
    },
  });

/** Fuera de línea: el globo se fragmenta y la diagonal lo cruza al final. */
export const globeOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(globeOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 60 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 120 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 180 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 240 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 300 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 420 }),
      },
    },
    /** Señal intermitente: los fragmentos titilan antes de que la diagonal corte. */
    flicker: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 200),
        1: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 200, { delay: 90 }),
        2: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 200, { delay: 180 }),
        3: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 200, { delay: 270 }),
        4: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 200, { delay: 360 }),
        5: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }], 200, { delay: 450 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 560 }),
      },
    },
  });

/** No disponible: el globo late y la equis se dibuja de insignia. */
export const globeXIcon: AnimatedIconDef = /* @__PURE__ */ icon(globeXShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(GLOBE_PULSE, 600, { origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
    /** Rechazo con más carácter: sacudida corta en vez del pulso tranquilo. */
    shake: { root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 6, -5, 3, 0]), 500) },
  });

// El listón cae desde arriba y se asienta — así se coloca un separador de verdad.
const BOOKMARK_DROP = /* @__PURE__ */ [
  { transform: 'translateY(-3px)' },
  { transform: 'translateY(0)' },
];

// El listón ondea como bandera, colgado desde arriba.
const BOOKMARK_WAVE = /* @__PURE__ */ track(
  /* @__PURE__ */ rotateSeq([0, -4, 3, -2, 0]),
  450,
  { origin: 'top center' },
);

export const bookmarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(BOOKMARK_DROP, 450, { easing: SPRING_OUT }) } },
    wave: { root: BOOKMARK_WAVE },
  });

/** Guardado: el listón cae y la palomita se dibuja de insignia. */
export const bookmarkCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkCheckShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BOOKMARK_DROP, 450, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 350 }),
      },
    },
    wave: { root: BOOKMARK_WAVE },
  });

/** Quitar: el listón cae y el "-" se dibuja de insignia. */
export const bookmarkMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkMinusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(BOOKMARK_DROP, 450, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
    wave: { root: BOOKMARK_WAVE },
  });

/** Sin guardar: el listón se dibuja en fragmentos y la diagonal lo tacha al final. */
export const bookmarkOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 120 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 380 }),
      },
    },
    wave: { root: BOOKMARK_WAVE },
  });

/** Guardar: el listón cae y el "+" se dibuja de insignia, en dos trazos. */
export const bookmarkPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkPlusShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(BOOKMARK_DROP, 450, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
    wave: { root: BOOKMARK_WAVE },
  });

/** Quitar: el listón cae y la equis se dibuja de insignia. */
export const bookmarkXIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkXShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(BOOKMARK_DROP, 450, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 430 }),
      },
    },
    wave: { root: BOOKMARK_WAVE },
  });

// La esquina doblada gira desde donde se pega a la hoja, como si se doblara en el momento.
// Mismo carácter que `file-badge:chida` (el papel cede, el sello se aprieta) — aquí la esquina
// es la insignia: se aprieta y rebota en vez de solo girar. `flip` guarda el giro original.
const FOLD_CHIDA = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(0.85)' },
  { transform: 'scale(1.08)' },
  { transform: 'scale(1)' },
];
const FOLD_FLIP = /* @__PURE__ */ [{ transform: 'rotate(-25deg)' }, { transform: 'rotate(0deg)' }];

export const stickyNoteIcon: AnimatedIconDef = /* @__PURE__ */ icon(stickyNoteShapes, {
    default: {
      shapes: { 1: /* @__PURE__ */ track(FOLD_CHIDA, 420, { delay: 150, origin: '16px 4px' }) },
    },
    flip: {
      shapes: { 1: /* @__PURE__ */ track(FOLD_FLIP, 380, { easing: SPRING_OUT, origin: '16px 4px' }) },
    },
  });

/** Tarea lista: la esquina se aprieta y la palomita se dibuja de insignia. */
export const stickyNoteCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(stickyNoteCheckShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(FOLD_CHIDA, 420, { delay: 150, origin: '16px 4px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 420 }),
      },
    },
    flip: {
      shapes: {
        1: /* @__PURE__ */ track(FOLD_FLIP, 380, { easing: SPRING_OUT, origin: '16px 4px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 350 }),
      },
    },
  });

/** Quitar: la esquina se aprieta y el "-" se dibuja de insignia. */
export const stickyNoteMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(stickyNoteMinusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_CHIDA, 420, { delay: 150, origin: '16px 4px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 420 }),
      },
    },
    flip: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_FLIP, 380, { easing: SPRING_OUT, origin: '16px 4px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
  });

/** Descartada: la esquina se aprieta, el cuerpo se dibuja en fragmentos y la diagonal la tacha. */
export const stickyNoteOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(stickyNoteOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_CHIDA, 420, { delay: 150, origin: '16px 4px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 120 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 200 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 420 }),
      },
    },
    flip: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_FLIP, 380, { easing: SPRING_OUT, origin: '16px 4px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 120 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 200 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 420 }),
      },
    },
  });

/** Nueva nota: la esquina se aprieta y el "+" se dibuja de insignia, en dos trazos. */
export const stickyNotePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(stickyNotePlusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_CHIDA, 420, { delay: 150, origin: '16px 4px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 420 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 420 }),
      },
    },
    flip: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_FLIP, 380, { easing: SPRING_OUT, origin: '16px 4px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
  });

/** Quitar: la esquina se aprieta y la equis se dibuja de insignia. */
export const stickyNoteXIcon: AnimatedIconDef = /* @__PURE__ */ icon(stickyNoteXShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_CHIDA, 420, { delay: 150, origin: '16px 4px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 420 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 500 }),
      },
    },
    flip: {
      shapes: {
        0: /* @__PURE__ */ track(FOLD_FLIP, 380, { easing: SPRING_OUT, origin: '16px 4px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 430 }),
      },
    },
  });

// El boleto "sale" con un golpe de escala, como al entregarlo; el perforado/símbolo se dibuja
// después.
const TICKET_POP = /* @__PURE__ */ [
  { transform: 'scale(0.85)' },
  { transform: 'scale(1.05)' },
  { transform: 'scale(1)' },
];

/** El boleto sale y el perforado se dibuja. */
// Se sacude tantito por el perforado, como si se fuera a rasgar.
const TICKET_TEAR = /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -3, 2, -1, 0]), 400);

export const ticketIcon: AnimatedIconDef = /* @__PURE__ */ icon(ticketShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TICKET_POP, 420, { easing: SPRING_OUT, origin: 'center' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 320 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 380 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 440 }),
      },
    },
    tear: { root: TICKET_TEAR },
  });

/** Boleto validado: sale y la palomita se dibuja de insignia. */
export const ticketCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(ticketCheckShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TICKET_POP, 420, { easing: SPRING_OUT, origin: 'center' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 320 }),
      },
    },
    tear: { root: TICKET_TEAR },
  });

/** Quitar: sale y el "-" se dibuja de insignia. */
export const ticketMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(ticketMinusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TICKET_POP, 420, { easing: SPRING_OUT, origin: 'center' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 320 }),
      },
    },
    tear: { root: TICKET_TEAR },
  });

/** Descuento: sale y el símbolo "%" se dibuja en tres trazos. */
export const ticketPercentIcon: AnimatedIconDef = /* @__PURE__ */ icon(ticketPercentShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TICKET_POP, 420, { easing: SPRING_OUT, origin: 'center' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 220, { delay: 320 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 220, { delay: 560 }),
      },
    },
    tear: { root: TICKET_TEAR },
  });

/** Agregar: sale y el "+" se dibuja de insignia, en dos trazos. */
export const ticketPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(ticketPlusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TICKET_POP, 420, { easing: SPRING_OUT, origin: 'center' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 320 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 320 }),
      },
    },
    tear: { root: TICKET_TEAR },
  });

/** Anulado: sale y una sola diagonal lo tacha. */
export const ticketSlashIcon: AnimatedIconDef = /* @__PURE__ */ icon(ticketSlashShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TICKET_POP, 420, { easing: SPRING_OUT, origin: 'center' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { delay: 320 }),
      },
    },
    tear: { root: TICKET_TEAR },
  });

/** Cancelado: sale y la equis se dibuja de insignia. */
export const ticketXIcon: AnimatedIconDef = /* @__PURE__ */ icon(ticketXShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TICKET_POP, 420, { easing: SPRING_OUT, origin: 'center' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 320 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
      },
    },
    tear: { root: TICKET_TEAR },
  });

// El marco entra con un pop; las divisiones/insignia se dibujan encima.
// Parpadeo corto tras dibujarse, como refrescando la vista.
const GRID_FLASH = /* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.3' }, { opacity: '1' }];

export const grid2x2Icon: AnimatedIconDef = /* @__PURE__ */ icon(grid2x2Shapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 180 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
      },
    },
    flash: {
      shapes: {
        0: /* @__PURE__ */ track(GRID_FLASH, 240),
        1: /* @__PURE__ */ track(GRID_FLASH, 240, { delay: 100 }),
      },
    },
  });

/** Selección confirmada: el marco entra y la palomita se dibuja de insignia. */
export const grid2x2CheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(grid2x2CheckShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 340 }),
      },
    },
    flash: { shapes: { 0: /* @__PURE__ */ track(GRID_FLASH, 240) } },
  });

/** Agregar: el marco entra y el "+" se dibuja de insignia, en dos trazos. */
export const grid2x2PlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(grid2x2PlusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
      },
    },
    flash: { shapes: { 0: /* @__PURE__ */ track(GRID_FLASH, 240) } },
  });

/** Quitar: el marco entra y la equis se dibuja de insignia. */
export const grid2x2XIcon: AnimatedIconDef = /* @__PURE__ */ icon(grid2x2XShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 420 }),
      },
    },
    flash: { shapes: { 0: /* @__PURE__ */ track(GRID_FLASH, 240) } },
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

/** Alarma confirmada: el mismo temblor de alarm-clock y la palomita se dibuja al final. */
// Sonando de verdad: sacudida más grande y rápida que el temblor de despertar.
const CLOCK_RING = /* @__PURE__ */ rotateSeq([0, -15, 12, -10, 8, -4, 0]);

export const alarmClockCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(alarmClockCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -8, 7, -5, 3, 0]), 600, { origin: 'center' }),
      shapes: { 5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 400 }) },
    },
    ring: {
      root: /* @__PURE__ */ track(CLOCK_RING, 350, { origin: 'center' }),
      shapes: { 5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 250 }) },
    },
  });

/** Quitar alarma: tiembla y el "-" se dibuja al final. */
export const alarmClockMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(alarmClockMinusShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -8, 7, -5, 3, 0]), 600, { origin: 'center' }),
      shapes: { 5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }) },
    },
    ring: {
      root: /* @__PURE__ */ track(CLOCK_RING, 350, { origin: 'center' }),
      shapes: { 5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 250 }) },
    },
  });

/** Alarma apagada: se fragmenta y la diagonal la cruza al final. */
export const alarmClockOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(alarmClockOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 60 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 140 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 220 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 300 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 420 }),
      },
    },
  });

/** Agregar alarma: tiembla y el "+" se dibuja al final, en dos trazos. */
export const alarmClockPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(alarmClockPlusShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -8, 7, -5, 3, 0]), 600, { origin: 'center' }),
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
      },
    },
    ring: {
      root: /* @__PURE__ */ track(CLOCK_RING, 350, { origin: 'center' }),
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 250 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 250 }),
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

// Los indicadores parpadean desfasados, igual que en server — sin importar en qué índice les
// haya tocado caer por el badge.
const SERVER_BLINK = /* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.2' }, { opacity: '1' }];

/** Configurar servidor: el engrane entero gira; los indicadores parpadean desfasados. */
export const serverCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(serverCogShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        10: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        11: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 500, { origin: '12px 12px' }),
        8: /* @__PURE__ */ track(SERVER_BLINK, 550, { delay: 200 }),
        9: /* @__PURE__ */ track(SERVER_BLINK, 550, { delay: 380 }),
      },
    },
    spin: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        10: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        11: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 720]), 650, { easing: SPRING_OUT, origin: '12px 12px' }),
        8: /* @__PURE__ */ track(SERVER_BLINK, 550, { delay: 250 }),
        9: /* @__PURE__ */ track(SERVER_BLINK, 550, { delay: 430 }),
      },
    },
  });

/** Servidor caído: los indicadores parpadean y el rayo pega al final. */
export const serverCrashIcon: AnimatedIconDef = /* @__PURE__ */ icon(serverCrashShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(SERVER_BLINK, 400),
        3: /* @__PURE__ */ track(SERVER_BLINK, 400, { delay: 150 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 350 }),
      },
    },
    shock: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 2, -1, 0]), 300, { easing: SPRING_BOUNCY }),
      shapes: {
        2: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0' }, { opacity: '1' }], 250),
        3: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0' }, { opacity: '1' }], 250, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 220, easing: SPRING_BOUNCY }),
      },
    },
  });

/** Servidor apagado: se fragmenta y la diagonal lo cruza al final. */
export const serverOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(serverOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 280 }),
        4: /* @__PURE__ */ track(SERVER_BLINK, 300, { delay: 400 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 480 }),
      },
    },
    quick: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { delay: 60 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 100, { delay: 120 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { delay: 170 }),
        4: /* @__PURE__ */ track(SERVER_BLINK, 200, { delay: 240 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 190, { delay: 290, easing: SPRING_OUT }),
      },
    },
  });

/** Agregar servidor: los indicadores parpadean y el "+" se dibuja de insignia. */
export const serverPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(serverPlusShapes, {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(SERVER_BLINK, 550),
        5: /* @__PURE__ */ track(SERVER_BLINK, 550, { delay: 180 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
    alert: {
      shapes: {
        4: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0' }, { opacity: '1' }], 350),
        5: /* @__PURE__ */ track([{ opacity: '1' }, { opacity: '0' }, { opacity: '1' }], 350, { delay: 120 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 0.9, 1]), 400, {
          delay: 240,
          easing: SPRING_BOUNCY,
          origin: '18px 8px',
        }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 0.9, 1]), 400, {
          delay: 240,
          easing: SPRING_BOUNCY,
          origin: '18px 8px',
        }),
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

const SHIELD_POP = /* @__PURE__ */ scaleSeq([1, 1.08, 1]);
const SHIELD_GEAR_SPIN = /* @__PURE__ */ [
  { transform: 'scale(1) rotate(0deg)' },
  { transform: 'scale(1.15) rotate(360deg)' },
  { transform: 'scale(1) rotate(720deg)' },
];

export const shieldBanIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldBanShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { delay: 260 }) },
    },
  });

/** Igual criterio que `server-cog`/`user-round-cog`: el engrane gira, el escudo se queda quieto. */
export const shieldCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldCogShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        3: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        4: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        5: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        7: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        8: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
        9: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 150, origin: '12px 12px' }),
      },
    },
  });

export const shieldHalfIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldHalfShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 260 }) },
    },
  });

export const shieldKeyholeIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldKeyholeShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 260 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 460 }),
      },
    },
  });

export const shieldLockIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldLockShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 460 }),
      },
    },
  });

export const shieldMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldMinusShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }) },
    },
  });

export const shieldPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldPlusShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }),
      },
    },
  });

/** Escudo con persona: el escudo late, la cabeza aparece de golpe y los hombros se dibujan. */
export const shieldUserIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldUserShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 260 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 460 }),
      },
    },
  });

export const shieldXIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldXShapes, {
    default: {
      root: /* @__PURE__ */ track(SHIELD_POP, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
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

const STAR_SPIN = /* @__PURE__ */ [
  { transform: 'rotate(0deg) scale(1)' },
  { transform: 'rotate(360deg) scale(1.25)' },
  { transform: 'rotate(360deg) scale(1)' },
];

const STAR_TWINKLE = /* @__PURE__ */ scaleSeq([1, 1.35, 0.88, 1.12, 1]);

/** Favorito confirmado: el mismo giro de star y la palomita se dibuja de insignia. */
export const starCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(starCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(STAR_SPIN, 1050, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 850 }) },
    },
    twinkle: {
      root: /* @__PURE__ */ track(STAR_TWINKLE, 650, { easing: SPRING_BOUNCY, origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 450 }) },
    },
  });

/** Media estrella: mismo giro que star, sin insignia. */
export const starHalfIcon: AnimatedIconDef = /* @__PURE__ */ icon(starHalfShapes, {
    default: { root: /* @__PURE__ */ track(STAR_SPIN, 1050, { easing: SPRING_OUT, origin: 'center' }) },
    twinkle: { root: /* @__PURE__ */ track(STAR_TWINKLE, 650, { easing: SPRING_BOUNCY, origin: 'center' }) },
  });

/** Quitar de favoritos: gira y el "-" se dibuja de insignia. */
export const starMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(starMinusShapes, {
    default: {
      root: /* @__PURE__ */ track(STAR_SPIN, 1050, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 850 }) },
    },
    twinkle: {
      root: /* @__PURE__ */ track(STAR_TWINKLE, 650, { easing: SPRING_BOUNCY, origin: 'center' }),
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 450 }) },
    },
  });

/** Ya no es favorito: se fragmenta y la diagonal la cruza al final. */
export const starOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(starOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 200 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 460 }),
      },
    },
    quick: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 110 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 250, easing: SPRING_OUT }),
      },
    },
  });

/** Agregar a favoritos: gira y el "+" se dibuja de insignia, en dos trazos. */
export const starPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(starPlusShapes, {
    default: {
      root: /* @__PURE__ */ track(STAR_SPIN, 1050, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 850 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 850 }),
      },
    },
    twinkle: {
      root: /* @__PURE__ */ track(STAR_TWINKLE, 650, { easing: SPRING_BOUNCY, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 450 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 450 }),
      },
    },
  });

/** Cancelar favorito: gira y la equis se dibuja de insignia. */
export const starXIcon: AnimatedIconDef = /* @__PURE__ */ icon(starXShapes, {
    default: {
      root: /* @__PURE__ */ track(STAR_SPIN, 1050, { easing: SPRING_OUT, origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 850 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 930 }),
      },
    },
    twinkle: {
      root: /* @__PURE__ */ track(STAR_TWINKLE, 650, { easing: SPRING_BOUNCY, origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 450 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 530 }),
      },
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

export const imageDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(imageDownShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 100 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
  });

export const imageMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(imageMinusShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 100 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { delay: 220 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
  });

/** El triángulo de play aparece de golpe, como una insignia — no es una línea que se dibuje. */
export const imagePlayIcon: AnimatedIconDef = /* @__PURE__ */ icon(imagePlayShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 380 }),
      },
    },
  });

export const imagePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(imagePlusShapes, {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 100 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 450, { delay: 220 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
      },
    },
  });

export const imageUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(imageUpShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
      },
    },
  });

const IMAGE_UPSCALE_FRAME = /* @__PURE__ */ [
  { transform: 'scale(0.8)', opacity: '0' },
  { transform: 'scale(1)', opacity: '1' },
];

/** El recorte se asienta y las 4 esquinas del marco se dibujan a la vez; luego, las flechas. */
export const imageUpscaleIcon: AnimatedIconDef = /* @__PURE__ */ icon(imageUpscaleShapes, {
    default: {
      shapes: {
        7: /* @__PURE__ */ track(IMAGE_UPSCALE_FRAME, 380, { easing: SPRING_OUT, origin: '8px 16px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 320 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 320 }),
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

const USER_ROUND_HEAD_BOB = /* @__PURE__ */ moveYSeq([0, -1, 0]);
const USER_ROUND_GEAR_SPIN = /* @__PURE__ */ [
  { transform: 'scale(1) rotate(0deg)' },
  { transform: 'scale(1.15) rotate(360deg)' },
  { transform: 'scale(1) rotate(720deg)' },
];

/** Usuario redondo: la cabeza asoma, igual que en `user`. */
export const userRoundIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundShapes, {
    default: {
      shapes: { 0: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450) },
    },
  });

/** Ir atrás: la cabeza asoma y la flecha se dibuja hacia la izquierda. */
export const userRoundArrowLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundArrowLeftShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 340 }),
      },
    },
  });

export const userRoundCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundCheckShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 200 }),
      },
    },
  });

/** Configurar usuario redondo: la cabeza asoma y el engrane late — mismo criterio que `user-cog`. */
export const userRoundCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundCogShapes, {
    default: {
      shapes: {
        9: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        0: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        1: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        2: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        3: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        4: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        5: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        7: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        8: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
        10: /* @__PURE__ */ track(USER_ROUND_GEAR_SPIN, 650, { delay: 150, origin: '18px 18px' }),
      },
    },
  });

/** Llave de usuario: la cabeza asoma, la llave aparece de insignia y el diente se dibuja. */
export const userRoundKeyIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundKeyShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 320 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 140, { delay: 460 }),
      },
    },
  });

export const userRoundMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundMinusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 180 }),
      },
    },
  });

export const userRoundPenIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundPenShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 200 }),
      },
    },
  });

export const userRoundPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundPlusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 180 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 240 }),
      },
    },
  });

export const userRoundSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundSearchShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 460 }),
      },
    },
  });

export const userRoundXIcon: AnimatedIconDef = /* @__PURE__ */ icon(userRoundXShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(USER_ROUND_HEAD_BOB, 450),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 300 }),
      },
    },
  });

/** Igual que `arrow-left`/`arrow-right`: nudge que se sostiene en hover y regresa al salir. */
export const arrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowUpShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, -3]), 320),
  });

export const arrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowDownShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, 3]), 320),
  });

const ARROW_UP_LEFT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-3px, -3px)' }];
export const arrowUpLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowUpLeftShapes, {
    default: /* @__PURE__ */ held(ARROW_UP_LEFT_NUDGE, 320),
  });

const ARROW_UP_RIGHT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(3px, -3px)' }];
export const arrowUpRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowUpRightShapes, {
    default: /* @__PURE__ */ held(ARROW_UP_RIGHT_NUDGE, 320),
  });

const ARROW_DOWN_LEFT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-3px, 3px)' }];
export const arrowDownLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowDownLeftShapes, {
    default: /* @__PURE__ */ held(ARROW_DOWN_LEFT_NUDGE, 320),
  });

const ARROW_DOWN_RIGHT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(3px, 3px)' }];
export const arrowDownRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowDownRightShapes, {
    default: /* @__PURE__ */ held(ARROW_DOWN_RIGHT_NUDGE, 320),
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

/** Abrir panel: la flecha ">" empuja hacia la derecha (adentro) y se sostiene. */
export const panelLeftOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelLeftOpenShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_LEFT, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

// Mismo criterio que panel-left, en cada orientación: el divisor se mueve HACIA donde apunta el
// nombre y se sostiene ahí, con regreso rápido al final — nunca un vaivén parejo y ambiguo.
const PANEL_DIVIDER_RIGHT: Keyframe[] = [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(2px)', offset: 0.35 },
  { transform: 'translateX(2px)', offset: 0.75 },
  { transform: 'translateX(0)', offset: 1 },
];
const PANEL_DIVIDER_UP: Keyframe[] = [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-2px)', offset: 0.35 },
  { transform: 'translateY(-2px)', offset: 0.75 },
  { transform: 'translateY(0)', offset: 1 },
];
const PANEL_DIVIDER_DOWN: Keyframe[] = [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(2px)', offset: 0.35 },
  { transform: 'translateY(2px)', offset: 0.75 },
  { transform: 'translateY(0)', offset: 1 },
];

export const panelRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelRightShapes, {
    default: { shapes: { 1: /* @__PURE__ */ track(PANEL_DIVIDER_RIGHT, 550) } },
  });

/** Cerrar panel: la flecha "&gt;" empuja hacia la derecha (afuera) y se sostiene. */
export const panelRightCloseIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelRightCloseShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_RIGHT, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Abrir panel: la flecha "&lt;" empuja hacia la izquierda (adentro) y se sostiene. */
export const panelRightOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelRightOpenShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_RIGHT, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const panelTopIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelTopShapes, {
    default: { shapes: { 1: /* @__PURE__ */ track(PANEL_DIVIDER_UP, 550) } },
  });

/** Cerrar panel: la flecha "^" empuja hacia arriba (afuera) y se sostiene. */
export const panelTopCloseIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelTopCloseShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_UP, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Abrir panel: la flecha "v" empuja hacia abajo (adentro) y se sostiene. */
export const panelTopOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelTopOpenShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_UP, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const panelBottomIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelBottomShapes, {
    default: { shapes: { 1: /* @__PURE__ */ track(PANEL_DIVIDER_DOWN, 550) } },
  });

/** Cerrar panel: la flecha "v" empuja hacia abajo (afuera) y se sostiene. */
export const panelBottomCloseIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelBottomCloseShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_DOWN, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Abrir panel: la flecha "^" empuja hacia arriba (adentro) y se sostiene. */
export const panelBottomOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelBottomOpenShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(PANEL_DIVIDER_DOWN, 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2]), 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

// Los "dashed" son marcador de resize-handle, no un divisor activo: cada raya invita a jalar
// con un nudge chico e ida-vuelta (no el sostenido de open/close), escalonado entre rayas.

/** Marca de resize a la izquierda: las 4 rayas invitan a jalar hacia la izquierda. */
export const panelLeftDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelLeftDashedShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400, { delay: 70 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400, { delay: 140 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400, { delay: 210 }),
      },
    },
    /** Jalando de verdad: las 4 rayas se mueven juntas, sin escalonar, con rebote elástico. */
    active: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
      },
    },
  });

/** Marca de resize a la derecha: las 4 rayas invitan a jalar hacia la derecha. */
export const panelRightDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelRightDashedShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400, { delay: 70 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400, { delay: 140 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400, { delay: 210 }),
      },
    },
    /** Jalando de verdad: las 4 rayas se mueven juntas, sin escalonar, con rebote elástico. */
    active: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
      },
    },
  });

/** Marca de resize arriba: las 4 rayas invitan a jalar hacia arriba. */
export const panelTopDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelTopDashedShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400, { delay: 70 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400, { delay: 140 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400, { delay: 210 }),
      },
    },
    /** Jalando de verdad: las 4 rayas se mueven juntas, sin escalonar, con rebote elástico. */
    active: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
      },
    },
  });

/** Marca de resize abajo: las 4 rayas invitan a jalar hacia abajo. */
export const panelBottomDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelBottomDashedShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400, { delay: 70 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400, { delay: 140 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400, { delay: 210 }),
      },
    },
    /** Jalando de verdad: las 4 rayas se mueven juntas, sin escalonar, con rebote elástico. */
    active: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
      },
    },
  });

/** Marca de resize arriba y abajo: cada par se separa hacia afuera. */
export const panelTopBottomDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelTopBottomDashedShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400, { delay: 70 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400, { delay: 70 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400, { delay: 140 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400, { delay: 140 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 400, { delay: 210 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 400, { delay: 210 }),
      },
    },
    /** Jalando de verdad: los 8 se separan juntos, sin escalonar, con rebote elástico. */
    active: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
      },
    },
  });

/** Marca de resize izquierda y derecha: cada par se separa hacia afuera. */
export const panelLeftRightDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(panelLeftRightDashedShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400, { delay: 70 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400, { delay: 70 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400, { delay: 140 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400, { delay: 140 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 2, 0]), 400, { delay: 210 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -2, 0]), 400, { delay: 210 }),
      },
    },
    /** Jalando de verdad: los 8 se separan juntos, sin escalonar, con rebote elástico. */
    active: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 3, 0]), 500, { easing: SPRING_BOUNCY }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -3, 0]), 500, { easing: SPRING_BOUNCY }),
      },
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

/** El altavoz solo, sin ondas — late tantito al aparecer. */
export const volumeIcon: AnimatedIconDef = /* @__PURE__ */ icon(volumeShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380) } },
  });

/** Volumen bajo: el altavoz + una sola onda. */
export const volume1Icon: AnimatedIconDef = /* @__PURE__ */ icon(volume1Shapes, {
    default: { shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 80 }) } },
  });

/** Silenciado: el sonido intenta salir (ondas parciales) y la diagonal lo corta. */
export const volumeOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(volumeOffShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 100 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 140 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 380 }),
      },
    },
  });

/** Volumen nulo: el altavoz + la equis se dibuja en dos trazos. */
export const volumeXIcon: AnimatedIconDef = /* @__PURE__ */ icon(volumeXShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
      },
    },
  });

// Cada barra se dibuja de abajo hacia arriba, del punto hacia afuera — igual intención que wifi
// (del centro hacia afuera) pero en barras en vez de arcos.

/** Señal completa: el punto y las 4 barras se dibujan de abajo hacia arriba, creciendo. */
export const signalIcon: AnimatedIconDef = /* @__PURE__ */ icon(signalShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 180 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
      },
    },
  });

/** Señal fuerte: como signal, sin la barra más alta. */
export const signalHighIcon: AnimatedIconDef = /* @__PURE__ */ icon(signalHighShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 180 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
      },
    },
  });

/** Señal media: punto + 2 barras. */
export const signalMediumIcon: AnimatedIconDef = /* @__PURE__ */ icon(signalMediumShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 180 }),
      },
    },
  });

/** Señal débil: punto + 1 barra. */
export const signalLowIcon: AnimatedIconDef = /* @__PURE__ */ icon(signalLowShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
      },
    },
  });

/** Sin señal: solo el punto. */
export const signalZeroIcon: AnimatedIconDef = /* @__PURE__ */ icon(signalZeroShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260) } },
  });

// Cada raya se dibuja en orden, como si se fuera contando — tally-5 remata con el trazo
// diagonal que "tacha" el grupo de 4.

// Contando con golpe: cada raya "pega" desde abajo con rebote elástico, en vez de dibujarse
// despacio — la sensación de ir marcando 1, 2, 3... con énfasis.
const TALLY_BOUNCE = /* @__PURE__ */ [
  { transform: 'scaleY(0)' },
  { transform: 'scaleY(1.15)' },
  { transform: 'scaleY(1)' },
];

export const tally1Icon: AnimatedIconDef = /* @__PURE__ */ icon(tally1Shapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260) } },
    count: { shapes: { 0: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { easing: SPRING_BOUNCY, origin: '4px 20px' }) } },
  });

export const tally2Icon: AnimatedIconDef = /* @__PURE__ */ icon(tally2Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
      },
    },
    count: {
      shapes: {
        0: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { easing: SPRING_BOUNCY, origin: '4px 20px' }),
        1: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 80, easing: SPRING_BOUNCY, origin: '9px 20px' }),
      },
    },
  });

export const tally3Icon: AnimatedIconDef = /* @__PURE__ */ icon(tally3Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 200 }),
      },
    },
    count: {
      shapes: {
        0: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { easing: SPRING_BOUNCY, origin: '4px 20px' }),
        1: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 80, easing: SPRING_BOUNCY, origin: '9px 20px' }),
        2: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 160, easing: SPRING_BOUNCY, origin: '14px 20px' }),
      },
    },
  });

export const tally4Icon: AnimatedIconDef = /* @__PURE__ */ icon(tally4Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
      },
    },
    count: {
      shapes: {
        0: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { easing: SPRING_BOUNCY, origin: '4px 20px' }),
        1: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 80, easing: SPRING_BOUNCY, origin: '9px 20px' }),
        2: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 160, easing: SPRING_BOUNCY, origin: '14px 20px' }),
        3: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 240, easing: SPRING_BOUNCY, origin: '19px 20px' }),
      },
    },
  });

/** Tally de 5: las 4 rayas se dibujan y la diagonal las tacha al final. */
export const tally5Icon: AnimatedIconDef = /* @__PURE__ */ icon(tally5Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 200 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 460 }),
      },
    },
    /** Las 4 rayas pegan con rebote; la diagonal remata con un tachón rápido y seco. */
    count: {
      shapes: {
        0: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { easing: SPRING_BOUNCY, origin: '4px 20px' }),
        1: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 80, easing: SPRING_BOUNCY, origin: '9px 20px' }),
        2: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 160, easing: SPRING_BOUNCY, origin: '14px 20px' }),
        3: /* @__PURE__ */ track(TALLY_BOUNCE, 400, { delay: 240, easing: SPRING_BOUNCY, origin: '19px 20px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 140, { delay: 420 }),
      },
    },
  });

export const CURATED_ICONS: Record<string, AnimatedIconDef> = {
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
  'folder-open': folderOpenIcon,
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
};
