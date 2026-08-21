import { AnimatedIconDef } from './animated-icon.model';
import { EASE, SPRING_OUT, SPRING_BOUNCY, SPRING_SMOOTH, rotateSeq, scaleSeq, moveXSeq, moveYSeq, track, burst, strokeDraw, icon, held } from './choreography';
import { activityShapes, alarmClockShapes, alarmClockCheckShapes, alarmClockMinusShapes, alarmClockOffShapes, alarmClockPlusShapes, appWindowShapes, arrowLeftShapes, arrowRightShapes, arrowUpShapes, arrowDownShapes, arrowUpLeftShapes, arrowUpRightShapes, arrowDownLeftShapes, arrowDownRightShapes, atSignShapes, badgeCheckShapes, badgeAlertShapes, badgeCentShapes, badgeDollarSignShapes, badgeEuroShapes, badgeIndianRupeeShapes, badgeInfoShapes, badgeJapaneseYenShapes, badgeMinusShapes, badgePercentShapes, badgePlusShapes, badgePoundSterlingShapes, badgeQuestionMarkShapes, badgeRussianRubleShapes, badgeSwissFrancShapes, badgeTurkishLiraShapes, badgeXShapes, banShapes, banknoteShapes, bellRingShapes, bellShapes, bellCheckShapes, bellDotShapes, bellMinusShapes, bellOffShapes, bellPlusShapes, bookOpenShapes, bracesShapes, briefcaseShapes, building2Shapes, buildingShapes, cableShapes, cakeShapes, calendarCheckShapes, calendarClockShapes, calendarDaysShapes, calendarShapes, calendar1Shapes, calendarArrowDownShapes, calendarArrowUpShapes, calendarCheck2Shapes, calendarCogShapes, calendarFoldShapes, calendarHeartShapes, calendarMinus2Shapes, calendarMinusShapes, calendarOffShapes, calendarPlus2Shapes, calendarPlusShapes, calendarRangeShapes, calendarSearchShapes, calendarSyncShapes, calendarX2Shapes, calendarXShapes, cameraShapes, cctvShapes, chartColumnShapes, checkShapes, chevronDownShapes, chevronLeftShapes, chevronRightShapes, chevronUpShapes, chevronsUpDownShapes, circleAlertShapes, circleCheckShapes, circlePlusShapes, circleQuestionMarkShapes, circleShapes, circleXShapes, clipboardCheckShapes, clipboardClockShapes, clipboardCopyShapes, clipboardListShapes, clipboardMinusShapes, clipboardPasteShapes, clipboardPenLineShapes, clipboardPenShapes, clipboardPlusShapes, clipboardTypeShapes, clipboardXShapes, clockShapes, cloudUploadShapes, commandShapes, contactShapes, copyShapes, copyCheckShapes, copyMinusShapes, copyPlusShapes, copySlashShapes, copyXShapes, cpuShapes, creditCardShapes, crownShapes, databaseShapes, downloadShapes, ellipsisShapes, ellipsisVerticalShapes, externalLinkShapes, eyeOffShapes, eyeShapes, fileBadgeShapes, fileCheckCornerShapes, fileCheckShapes, fileExclamationPointShapes, fileShapes, fileSpreadsheetShapes, fileTextShapes, fileXShapes, folderOpenShapes, folderArchiveShapes, folderBookmarkShapes, folderCheckShapes, folderClockShapes, folderClosedShapes, folderCodeShapes, folderCogShapes, folderDotShapes, folderDownShapes, folderGit2Shapes, folderGitShapes, folderHeartShapes, folderInputShapes, folderKanbanShapes, folderKeyShapes, folderLockShapes, folderMinusShapes, folderOpenDotShapes, folderOutputShapes, folderPenShapes, folderPlusShapes, folderRootShapes, folderSearch2Shapes, folderSearchShapes, folderSymlinkShapes, folderSyncShapes, folderTreeShapes, folderUpShapes, folderXShapes, funnelShapes, gitForkShapes, globeShapes, globeCheckShapes, globeLockShapes, globeOffShapes, globeXShapes, bookmarkShapes, bookmarkCheckShapes, bookmarkMinusShapes, bookmarkOffShapes, bookmarkPlusShapes, bookmarkXShapes, stickyNoteShapes, stickyNoteCheckShapes, stickyNoteMinusShapes, stickyNoteOffShapes, stickyNotePlusShapes, stickyNoteXShapes, ticketShapes, ticketCheckShapes, ticketMinusShapes, ticketPercentShapes, ticketPlusShapes, ticketSlashShapes, ticketXShapes, grid2x2Shapes, grid2x2CheckShapes, grid2x2PlusShapes, grid2x2XShapes, graduationCapShapes, gripVerticalShapes, hardDriveShapes, hashShapes, hatGlassesShapes, heartPulseShapes, heartCrackShapes, heartHandshakeShapes, heartMinusShapes, heartOffShapes, heartPlusShapes, heartXShapes, rotateCcwClockShapes, houseShapes, idCardShapes, imageOffShapes, imageShapes, imagesShapes, imageDownShapes, imageMinusShapes, imagePlayShapes, imagePlusShapes, imageUpShapes, imageUpscaleShapes, inboxShapes, infinityShapes, infoShapes, keyRoundShapes, keyShapes, keyboardShapes, landmarkShapes, languagesShapes, laptopShapes, layersShapes, layoutDashboardShapes, layoutGridShapes, layoutPanelLeftShapes, layoutPanelTopShapes, layoutListShapes, layoutTemplateShapes, layoutFreeformShapes, libraryShapes, lightbulbShapes, link2Shapes, linkShapes, listChecksShapes, listShapes, loaderCircleShapes, lockShapes, logOutShapes, mailShapes, mapPinShapes, mapPinCheckShapes, mapPinCheckInsideShapes, mapPinHouseShapes, mapPinMinusShapes, mapPinMinusInsideShapes, mapPinPlusShapes, mapPinPlusInsideShapes, mapPinSearchShapes, mapPinXShapes, mapPinXInsideShapes, mapShapes, minusShapes, monitorShapes, moonShapes, mousePointerClickShapes, mouseShapes, mouseLeftShapes, mouseOffShapes, mouseRightShapes, mousePointerShapes, mousePointer2Shapes, mousePointer2OffShapes, mousePointerBanShapes, navigationShapes, networkShapes, packageSearchShapes, packageShapes, packageCheckShapes, packageMinusShapes, packageOpenShapes, packagePlusShapes, packageXShapes, paletteShapes, panelLeftCloseShapes, panelLeftShapes, panelLeftOpenShapes, panelRightShapes, panelRightCloseShapes, panelRightOpenShapes, panelTopShapes, panelTopCloseShapes, panelTopOpenShapes, panelBottomShapes, panelBottomCloseShapes, panelBottomOpenShapes, panelLeftDashedShapes, panelRightDashedShapes, panelTopDashedShapes, panelBottomDashedShapes, panelTopBottomDashedShapes, panelLeftRightDashedShapes, penLineShapes, penShapes, pencilShapes, phoneShapes, planeShapes, playShapes, plusShapes, powerShapes, printerShapes, qrCodeShapes, receiptShapes, refreshCwShapes, rotateCcwShapes, rotateCwShapes, routerShapes, saveShapes, saveAllShapes, saveCheckShapes, saveOffShapes, savePenShapes, savePlusShapes, scrollTextShapes, searchCheckShapes, searchShapes, searchSlashShapes, searchXShapes, sendShapes, serverShapes, serverCogShapes, serverCrashShapes, serverOffShapes, serverPlusShapes, settingsShapes, shieldAlertShapes, shieldCheckShapes, shieldOffShapes, shieldShapes, shieldBanShapes, shieldCogShapes, shieldHalfShapes, shieldKeyholeShapes, shieldLockShapes, shieldMinusShapes, shieldPlusShapes, shieldUserShapes, shieldXShapes, shirtShapes, shoppingBagShapes, shoppingCartShapes, smartphoneShapes, sparklesShapes, squareCenterlineDashedHorizontalShapes, squareCenterlineDashedVerticalShapes, squarePenShapes, squareShapes, starShapes, starCheckShapes, starHalfShapes, starMinusShapes, starOffShapes, starPlusShapes, starXShapes, sunShapes, tabletShapes, tagShapes, trash2Shapes, trashShapes, triangleAlertShapes, triangleShapes, truckShapes, tvShapes, typeShapes, unlinkShapes, uploadShapes, signalShapes, signalHighShapes, signalMediumShapes, signalLowShapes, signalZeroShapes, volumeShapes, volume1Shapes, volumeOffShapes, volumeXShapes, tally1Shapes, tally2Shapes, tally3Shapes, tally4Shapes, tally5Shapes, userCheckShapes, userCogShapes, userMinusShapes, userPlusShapes, userShapes, userXShapes, usersShapes, userRoundShapes, userRoundArrowLeftShapes, userRoundCheckShapes, userRoundCogShapes, userRoundKeyShapes, userRoundMinusShapes, userRoundPenShapes, userRoundPlusShapes, userRoundSearchShapes, userRoundXShapes, volume2Shapes, warehouseShapes, webhookShapes, wifiShapes, wifiHighShapes, wifiLowShapes, wifiZeroShapes, workflowShapes, wrenchShapes, xShapes, zapShapes, zoomInShapes, zoomOutShapes } from './animated-icons.shapes';

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
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(20deg)' }, { transform: 'rotate(-10deg)' }, { transform: 'rotate(10deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: EASE, origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(0)' }], 1100, { easing: EASE }),
      },
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
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(20deg)' }, { transform: 'rotate(-10deg)' }, { transform: 'rotate(10deg)' }, { transform: 'rotate(-5deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: EASE, origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(2px)' }, { transform: 'translateX(0)' }], 1100, { easing: EASE }),
      },
    },
  });

const BELL_SHAKE_ROOT = /* @__PURE__ */ rotateSeq([0, 18, -12, 9, -5, 0]);
const BELL_CLAPPER = /* @__PURE__ */ moveXSeq([0, -4, 3, -2, 1, 0]);
// Mismo repique que el `bell` base (sin -ring), como prefijo largo antes de mostrar la insignia.
const BELL_RING_ROOT = /* @__PURE__ */ rotateSeq([0, 20, -10, 10, -5, 3, 0]);
const BELL_RING_CLAPPER = /* @__PURE__ */ moveXSeq([0, -6, 5, -5, 4, -3, 2, 0]);

export const bellCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(bellCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(BELL_SHAKE_ROOT, 700, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_CLAPPER, 750),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 550 }),
      },
    },
    ring: {
      root: /* @__PURE__ */ track(BELL_RING_ROOT, 900, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_RING_CLAPPER, 1100),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 850 }),
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
    ring: {
      root: /* @__PURE__ */ track(BELL_RING_ROOT, 900, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_RING_CLAPPER, 1100),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 850 }),
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
    ring: {
      root: /* @__PURE__ */ track(BELL_RING_ROOT, 900, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_RING_CLAPPER, 1100),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 850 }),
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
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
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
    ring: {
      root: /* @__PURE__ */ track(BELL_RING_ROOT, 900, { origin: 'top center' }),
      shapes: {
        0: /* @__PURE__ */ track(BELL_RING_CLAPPER, 1100),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 850 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 850 }),
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
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
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
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.1) rotate(-3deg)', offset: 0.2 }, { transform: 'scale(1.1) rotate(3deg)', offset: 0.4 }, { transform: 'scale(1.1) rotate(-2deg)', offset: 0.6 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
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
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
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
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, -3px)' }], 500, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, 3px)' }], 500, { easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
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
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
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
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Igual que el chevron pero de regreso: la flecha de "volver". */
export const arrowLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowLeftShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, -3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
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

/** Latido doble (como el de verdad) y el electro trazándose encima. */
export const heartPulseIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartPulseShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1, 1.08, 1]), 900, { origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 700, { delay: 150 }) },
    },
  });

const HEART_BEAT = /* @__PURE__ */ scaleSeq([1, 1.1, 1]);
// Palpitar real: 4 pulsaciones que se van apagando, como un corazón calmándose.
const HEART_QUAD_PULSE = /* @__PURE__ */ scaleSeq([1, 1.16, 1, 1.16, 1, 1.1, 1, 1.06, 1]);

export const heartCrackIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartCrackShapes, {
    default: {
      root: /* @__PURE__ */ track(HEART_BEAT, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { delay: 260 }) },
    },
    pulse: {
      root: /* @__PURE__ */ track(HEART_QUAD_PULSE, 1500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { delay: 260 }) },
    },
  });

/** Un solo trazo — no hay insignia que dibujar aparte, todo el gesto es la figura completa. */
export const heartHandshakeIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartHandshakeShapes, {
    default: {
      root: /* @__PURE__ */ track(HEART_BEAT, 500, { easing: SPRING_OUT, origin: 'center' }),
    },
    pulse: {
      root: /* @__PURE__ */ track(HEART_QUAD_PULSE, 1500, { easing: SPRING_OUT, origin: 'center' }),
    },
  });

export const heartMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(heartMinusShapes, {
    default: {
      root: /* @__PURE__ */ track(HEART_BEAT, 500, { easing: SPRING_OUT, origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 260 }) },
    },
    pulse: {
      root: /* @__PURE__ */ track(HEART_QUAD_PULSE, 1500, { easing: SPRING_OUT, origin: 'center' }),
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
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
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
    pulse: {
      root: /* @__PURE__ */ track(HEART_QUAD_PULSE, 1500, { easing: SPRING_OUT, origin: 'center' }),
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
    pulse: {
      root: /* @__PURE__ */ track(HEART_QUAD_PULSE, 1500, { easing: SPRING_OUT, origin: 'center' }),
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

const CURSOR_PRESS = /* @__PURE__ */ scaleSeq([1, 0.85, 1]);

// Deriva orgánica del cursor tras el hundimiento, con dos "clics" — rebotes de escala cortos y
// visibles pero rápidos — mientras se mueve. offsets absolutos sobre una duración larga (3400ms):
// simula el gesto de alguien que suelta el mouse y sigue clicando sin querer mientras piensa.
const CURSOR_WANDER_CLICK = /* @__PURE__ */ [
  { transform: 'scale(1)', offset: 0 },
  { transform: 'scale(0.85)', offset: 0.06 },
  { transform: 'scale(1) translate(0, 0)', offset: 0.12 },
  { transform: 'translate(-2px, 1.5px) scale(1)', offset: 0.3 },
  { transform: 'translate(-2px, 1.5px) scale(1)', offset: 0.42 },
  { transform: 'translate(-2px, 1.5px) scale(0.8)', offset: 0.445 },
  { transform: 'translate(-2px, 1.5px) scale(1)', offset: 0.47 },
  { transform: 'translate(1.5px, 3px) scale(1)', offset: 0.6 },
  { transform: 'translate(3px, -1px) scale(1)', offset: 0.75 },
  { transform: 'translate(3px, -1px) scale(1)', offset: 0.8 },
  { transform: 'translate(3px, -1px) scale(0.8)', offset: 0.825 },
  { transform: 'translate(3px, -1px) scale(1)', offset: 0.85 },
  { transform: 'translate(-1px, -2px) scale(1)', offset: 0.92 },
  { transform: 'translate(0, 0) scale(1)', offset: 1 },
];
// Misma ruta que CURSOR_WANDER_CLICK, solo posición — para piezas que deben seguir al cursor
// pegadas (la colita, la insignia de "prohibido") sin clicar ellas mismas.
const CURSOR_WANDER_TRACK = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(0, 0)', offset: 0.12 },
  { transform: 'translate(-2px, 1.5px)', offset: 0.3 },
  { transform: 'translate(-2px, 1.5px)', offset: 0.47 },
  { transform: 'translate(1.5px, 3px)', offset: 0.6 },
  { transform: 'translate(3px, -1px)', offset: 0.8 },
  { transform: 'translate(3px, -1px)', offset: 0.85 },
  { transform: 'translate(-1px, -2px)', offset: 0.92 },
  { transform: 'translate(0, 0)', offset: 1 },
];

/** Mismo hundimiento del cursor en `mouse-pointer-click`; la colita se dibuja después. */
export const mousePointerIcon: AnimatedIconDef = /* @__PURE__ */ icon(mousePointerShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CURSOR_PRESS, 400, { origin: '10px 10px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
      },
    },
    /** Igual que el default; al terminar, el cursor deriva y "clica" dos veces al pasar. */
    wander: {
      shapes: {
        1: /* @__PURE__ */ track(CURSOR_WANDER_CLICK, 3400, { origin: '10px 10px' }),
        0: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'translate(0, 0)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'translate(0, 0)', offset: 0.088 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translate(0, 0)', offset: 0.153 },
            ...CURSOR_WANDER_TRACK.filter((k) => k.offset >= 0.3),
          ],
          3400,
        ),
      },
    },
    nudge: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)', offset: 0 }, { transform: 'translate(0, -4px)', offset: 0.25 }, { transform: 'translate(-3px, 0)', offset: 0.75 }, { transform: 'translate(0, 0)', offset: 1 }], 1000, { easing: 'ease' }),
    },
  });

/** Una sola figura: el cursor se hunde igual que en `mouse-pointer-click`, sin chispas. */
export const mousePointer2Icon: AnimatedIconDef = /* @__PURE__ */ icon(mousePointer2Shapes, {
    default: {
      shapes: { 0: /* @__PURE__ */ track(CURSOR_PRESS, 400, { origin: '10px 10px' }) },
    },
    wander: {
      shapes: { 0: /* @__PURE__ */ track(CURSOR_WANDER_CLICK, 3400, { origin: '10px 10px' }) },
    },
    nudge: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)', offset: 0 }, { transform: 'translate(0, -4px)', offset: 0.25 }, { transform: 'translate(-3px, 0)', offset: 0.75 }, { transform: 'translate(0, 0)', offset: 1 }], 1000, { easing: 'ease' }),
    },
  });

/** Apagado: se fragmenta y la diagonal cruza al final — sin hundimiento. */
export const mousePointer2OffIcon: AnimatedIconDef = /* @__PURE__ */ icon(mousePointer2OffShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 160 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 380 }),
      },
    },
  });

export const mousePointerBanIcon: AnimatedIconDef = /* @__PURE__ */ icon(mousePointerBanShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CURSOR_PRESS, 400, { origin: '5px 5px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 460 }),
      },
    },
    /** Igual que el default; al terminar, el cursor "prohibido" deriva completo — insignia pegada. */
    wander: {
      shapes: {
        0: /* @__PURE__ */ track(CURSOR_WANDER_CLICK, 3400, { origin: '5px 5px' }),
        1: /* @__PURE__ */ track(
          [
            { transform: 'scale(0.3) translate(0, 0)', opacity: '0', offset: 0 },
            { transform: 'scale(0.3) translate(0, 0)', opacity: '0', offset: 0.076 },
            { transform: 'scale(1.12) translate(0, 0)', opacity: '1', offset: 0.11 },
            { transform: 'scale(1) translate(0, 0)', opacity: '1', offset: 0.135 },
            ...CURSOR_WANDER_TRACK.filter((k) => k.offset >= 0.3),
          ],
          3400,
        ),
        2: /* @__PURE__ */ track(
          [
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'translate(0, 0)', offset: 0 },
            { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'translate(0, 0)', offset: 0.135 },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'translate(0, 0)', offset: 0.2 },
            ...CURSOR_WANDER_TRACK.filter((k) => k.offset >= 0.3),
          ],
          3400,
        ),
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
    nudge: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(-15deg)', offset: 0.25 }, { transform: 'rotate(15deg)', offset: 0.75 }], 400, { easing: EASE }),
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

/** `default` es de ESTADO: gira 45° y se queda; al salir el puntero regresa (portado). */
export const refreshCwIcon: AnimatedIconDef = /* @__PURE__ */ icon(refreshCwShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ rotateSeq([0, 45]), 450, { origin: 'center' }),
    rotate: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 700, { easing: SPRING_OUT, origin: 'center' }),
    },
    active: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      reverseOnLeave: true,
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
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
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
    nudge: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0) translateY(0)', offset: 0 }, { transform: 'translateX(0) translateY(-4px)', offset: 0.25 }, { transform: 'translateX(-3px) translateY(0)', offset: 0.5 }, { transform: 'translateX(0) translateY(0)', offset: 1 }], 1000, { easing: EASE }),
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
    active: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 1000, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  });

/** Protegido: el escudo primero, la palomita después. */
export const shieldCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldCheckShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 500, { origin: 'center' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { delay: 260 }) },
    },
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
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

/** Persona: la cabeza asoma tantito. */
export const userIcon: AnimatedIconDef = /* @__PURE__ */ icon(userShapes, {
    default: {
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.2, 0]), 500) },
      root: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.05, 1]), 500, { origin: 'center' }),
    },
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(2px)', offset: 0.33 }, { transform: 'translateY(-2px)', offset: 0.66 }, { transform: 'translateY(0)', offset: 1 }], 600, { easing: EASE }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(4px)', offset: 0.33 }, { transform: 'translateY(-2px)', offset: 0.66 }, { transform: 'translateY(0)', offset: 1 }], 600, { easing: EASE }),
      },
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
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
      },
    },
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
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
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

const FOLDER_BOUNCE = /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.8, 0]), 520, { easing: SPRING_OUT });
const FOLDER_GEAR_SPIN = /* @__PURE__ */ [
  { transform: 'scale(1) rotate(0deg)' },
  { transform: 'scale(1.15) rotate(360deg)' },
  { transform: 'scale(1) rotate(720deg)' },
];

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

export const folderClosedIcon: AnimatedIconDef = /* @__PURE__ */ icon(folderClosedShapes, {
    default: {
      root: FOLDER_BOUNCE,
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 260 }) },
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

/** Mismo criterio que `server-cog`/`shield-cog`/`calendar-cog`: el engrane gira, la carpeta se queda quieta. */
const FOLDER_COG_WOBBLE = /* @__PURE__ */ [
  { transform: 'scale(1) rotate(0deg)', offset: 0 },
  { transform: 'scale(1.15) rotate(360deg)', offset: 0.31 },
  { transform: 'scale(1) rotate(720deg)', offset: 0.62 },
  { transform: 'scale(1) rotate(705deg)', offset: 0.78 },
  { transform: 'scale(1) rotate(720deg)', offset: 1 },
];

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
    pulse: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1, 1)' }, { transform: 'scale(0.9, 1.3)' }, { transform: 'scale(1.1, 0.9)' }, { transform: 'scale(0.95, 1.05)' }, { transform: 'scale(1, 1)' }], 600, { easing: 'ease-out' }),
      },
    },
  });

/** Guardado: el listón cae y la palomita se dibuja de insignia. */
export const bookmarkCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkCheckShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(-3px) scale(0.9, 1.3)', offset: 0 }, { transform: 'translateY(0) scale(1.1, 0.9)', offset: 0.5 }, { transform: 'translateY(0) scale(0.95, 1.05)', offset: 0.72 }, { transform: 'translateY(0) scale(1, 1)', offset: 1 }], 600, { easing: 'ease-out', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 350 }),
      },
    },
    wave: { root: BOOKMARK_WAVE },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1, 1)' }, { transform: 'scale(0.9, 1.3)' }, { transform: 'scale(1.1, 0.9)' }, { transform: 'scale(0.95, 1.05)' }, { transform: 'scale(1, 1)' }], 600, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Quitar: el listón cae y el "-" se dibuja de insignia. */
export const bookmarkMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkMinusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(-3px) scale(0.9, 1.3)', offset: 0 }, { transform: 'translateY(0) scale(1.1, 0.9)', offset: 0.5 }, { transform: 'translateY(0) scale(0.95, 1.05)', offset: 0.72 }, { transform: 'translateY(0) scale(1, 1)', offset: 1 }], 600, { easing: 'ease-out', origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
    wave: { root: BOOKMARK_WAVE },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1, 1)' }, { transform: 'scale(0.9, 1.3)' }, { transform: 'scale(1.1, 0.9)' }, { transform: 'scale(0.95, 1.05)' }, { transform: 'scale(1, 1)' }], 600, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
      },
    },
  });

/** Sin guardar: el listón se dibuja en fragmentos y la diagonal lo tacha al final. */
export const bookmarkOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkOffShapes, {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1, 1)' }, { transform: 'scale(0.9, 1.3)' }, { transform: 'scale(1.1, 0.9)' }, { transform: 'scale(0.95, 1.05)' }, { transform: 'scale(1, 1)' }], 600, { easing: 'ease-out', origin: 'center' }),
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
        2: /* @__PURE__ */ track([{ transform: 'translateY(-3px) scale(0.9, 1.3)', offset: 0 }, { transform: 'translateY(0) scale(1.1, 0.9)', offset: 0.5 }, { transform: 'translateY(0) scale(0.95, 1.05)', offset: 0.72 }, { transform: 'translateY(0) scale(1, 1)', offset: 1 }], 600, { easing: 'ease-out', origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
      },
    },
    wave: { root: BOOKMARK_WAVE },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1, 1)' }, { transform: 'scale(0.9, 1.3)' }, { transform: 'scale(1.1, 0.9)' }, { transform: 'scale(0.95, 1.05)' }, { transform: 'scale(1, 1)' }], 600, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
      },
    },
  });

/** Quitar: el listón cae y la equis se dibuja de insignia. */
export const bookmarkXIcon: AnimatedIconDef = /* @__PURE__ */ icon(bookmarkXShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(-3px) scale(0.9, 1.3)', offset: 0 }, { transform: 'translateY(0) scale(1.1, 0.9)', offset: 0.5 }, { transform: 'translateY(0) scale(0.95, 1.05)', offset: 0.72 }, { transform: 'translateY(0) scale(1, 1)', offset: 1 }], 600, { easing: 'ease-out', origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 350 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 430 }),
      },
    },
    wave: { root: BOOKMARK_WAVE },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1, 1)' }, { transform: 'scale(0.9, 1.3)' }, { transform: 'scale(1.1, 0.9)' }, { transform: 'scale(0.95, 1.05)' }, { transform: 'scale(1, 1)' }], 600, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
      },
    },
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
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
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
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
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
    active: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-28deg)' }], 600, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      reverseOnLeave: true,
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
    reveal: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** Igual, pero la palomita reemplaza el punto adentro del pin. */
export const mapPinCheckInsideIcon: AnimatedIconDef = /* @__PURE__ */ icon(mapPinCheckInsideShapes, {
    default: {
      root: /* @__PURE__ */ track(MAP_PIN_ROCK, 650, { origin: '12px 21.8px' }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 150 }) },
    },
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
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
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(12deg)', offset: 0.25 }, { transform: 'rotate(-10deg)', offset: 0.55 }, { transform: 'rotate(3deg)', offset: 0.85 }, { transform: 'rotate(0deg)', offset: 1 }], 800, { easing: EASE }),
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
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
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
    active: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      reverseOnLeave: true,
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
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 400),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 400),
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

/** Despertador sonando: campanas y patas se sacuden juntas. */
export const alarmClockIcon: AnimatedIconDef = /* @__PURE__ */ icon(alarmClockShapes, {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -8, 7, -5, 3, 0]), 600, { origin: 'center' }),
    },
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(0, -1.5px)' }], 300, { easing: 'linear' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(0, -1.5px)' }], 300, { easing: 'linear' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(0, -1.5px)' }], 300, { easing: 'linear' }),
        3: /* @__PURE__ */ track([{ transform: 'translate(0, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(-1px, -1.5px)' }, { transform: 'translate(1px, -1.5px)' }, { transform: 'translate(0, -1.5px)' }], 300, { easing: 'linear' }),
        4: /* @__PURE__ */ track([{ transform: 'translate(0, -2.5px)' }, { transform: 'translate(-2px, -2.5px)' }, { transform: 'translate(2px, -2.5px)' }, { transform: 'translate(-2px, -2.5px)' }, { transform: 'translate(2px, -2.5px)' }, { transform: 'translate(0, -2.5px)' }], 300, { easing: 'linear' }),
        5: /* @__PURE__ */ track([{ transform: 'translate(0, -2.5px)' }, { transform: 'translate(-2px, -2.5px)' }, { transform: 'translate(2px, -2.5px)' }, { transform: 'translate(-2px, -2.5px)' }, { transform: 'translate(2px, -2.5px)' }, { transform: 'translate(0, -2.5px)' }], 300, { easing: 'linear' }),
      },
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
    reveal: {
      shapes: {
        5: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
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
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
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
// La insignia cae con gravedad y rebota al aterrizar; el símbolo aparece TODO junto después,
// como una sola pieza — no trazo por trazo como en el default.
const BADGE_DROP = /* @__PURE__ */ [
  { transform: 'translateY(-14px)', opacity: '0' },
  { transform: 'translateY(3px)', opacity: '1' },
  { transform: 'translateY(0)' },
];

export const badgeCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeCheckShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { delay: 220 }),
      },
    },
    /** `drop`: la insignia cae con gravedad y rebota; la palomita aparece de un solo golpe. */
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1)' }, { transform: 'scale(0.9)' }, { transform: 'scale(1)' }], 1200, { easing: EASE }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 1200, { easing: EASE }),
      },
    },
  });

const BADGE_POP = /* @__PURE__ */ scaleSeq([1, 1.08, 1]);

export const badgeAlertIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeAlertShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 220, { delay: 480 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.1) rotate(-3deg)', offset: 0.2 }, { transform: 'scale(1.1) rotate(3deg)', offset: 0.4 }, { transform: 'scale(1.1) rotate(-2deg)', offset: 0.6 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
  });

export const badgeCentIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeCentShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 300 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeDollarSignIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeDollarSignShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 380 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeEuroIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeEuroShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 300 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeIndianRupeeIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeIndianRupeeShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 320 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 420 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeInfoIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeInfoShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 220, { delay: 220 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 400 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeJapaneseYenIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeJapaneseYenShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 340 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 460 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 540 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeMinusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgePercentIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgePercentShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 200, { delay: 460 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 200, { delay: 540 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgePlusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgePoundSterlingIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgePoundSterlingShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 220 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 400 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 480 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeQuestionMarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeQuestionMarkShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 220, { delay: 480 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
    alert: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
      },
    },
  });

export const badgeRussianRubleIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeRussianRubleShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 220 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 440 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeSwissFrancIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeSwissFrancShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 380 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 480 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

/** El cuerpo de la insignia está en el índice 2 (única de la familia con el orden invertido). */
export const badgeTurkishLiraIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeTurkishLiraShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 220 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 380 }),
      },
    },
    drop: {
      shapes: {
        2: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const badgeXIcon: AnimatedIconDef = /* @__PURE__ */ icon(badgeXShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_POP, 450, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 300 }),
      },
    },
    drop: {
      shapes: {
        0: /* @__PURE__ */ track(BADGE_DROP, 480, { easing: SPRING_BOUNCY, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 480 }),
      },
    },
  });

export const chevronDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronDownShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, 3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const chevronLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronLeftShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, -3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const chevronUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronUpShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, -3]), 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Ordenar: las dos flechas se separan — el gesto de "esto se puede mover". */
export const chevronsUpDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(chevronsUpDownShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 500),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1.5, 0]), 500),
      },
    },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
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
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
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
    alert: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
      },
    },
  });

/** Revisado: la palomita se dibuja sobre la tabla. */
// Variantes de la sección 6: reutilizan insignias que YA tienen animación en otro icono de la
// librería (pen, +, -, x, check, search, sync) — mismo criterio, aplicado a la insignia nueva.
const BADGE_BOUNCE_DRAW = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'scale(0.8)' },
  { strokeDasharray: '1', strokeDashoffset: '0.4', opacity: '0.6', transform: 'scale(1.25)' },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)' },
];
const X_SNAP_DRAW = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'scale(1)' },
  { strokeDasharray: '1', strokeDashoffset: '0.5', opacity: '0.5', transform: 'scale(1.15)' },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)' },
];
// Mismo combo dashoffset+scale que trae `check` de fábrica.
const CHECK_BOUNCE_DRAW = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'scale(1)' },
  { strokeDasharray: '1', strokeDashoffset: '0.5', opacity: '0.5', transform: 'scale(1.1)' },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)' },
];
// Igual que el `translate` de reposo de pencil/pen/square-pen.
const PEN_WRITE_SQUIGGLE = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(1.5px, -1.5px)' },
  { transform: 'translate(-1px, 1px)' },
  { transform: 'translate(0, 0)' },
];
const SEARCH_TILT = /* @__PURE__ */ rotateSeq([0, 17, -10, 5, -1, 0]);
const REFRESH_SPIN = /* @__PURE__ */ rotateSeq([0, 360]);

export const clipboardCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardCheckShapes, {
    default: { shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }), 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { delay: 150 }) } },
    reveal: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  });

/** El reloj respira y la manecilla da un tic — mismo criterio que `calendar-clock`. */
/** `spin`: la manecilla da la vuelta completa en vez del tic — mismo giro de `refresh-cw:rotate`. */
export const clipboardClockIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardClockShapes, {
    default: {
      shapes: {
        4: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 500, { delay: 150, origin: '16px 16px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 30, 0]), 620, { delay: 190, origin: '16px 16px' }),
      },
    },
    spin: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 500, { delay: 150, origin: '16px 16px' }),
        0: /* @__PURE__ */ track(REFRESH_SPIN, 700, { delay: 190, easing: SPRING_OUT, origin: '16px 16px' }),
      },
    },
  });

/** `peel`: la flecha "despega" con la misma separación de `copy-*:peel`. */
export const clipboardCopyIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardCopyShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 230 }),
      },
    },
    peel: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        4: /* @__PURE__ */ track(COPY_PEEL, 500, { delay: 150, easing: SPRING_BOUNCY }),
      },
    },
  });

/** El check-list se llena renglón por renglón: la marca y luego la línea, fila tras fila. */
export const clipboardListIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardListShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 150 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 150 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 230 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 230 }),
      },
    },
    quick: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 160, { delay: 80 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 120, { delay: 80 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 160, { delay: 130 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 120, { delay: 130 }),
      },
    },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: EASE }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
        2: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }], 300, { easing: 'ease', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }], 300, { easing: 'ease', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }], 300, { easing: 'ease', fill: 'forwards' }),
        5: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }], 300, { easing: 'ease', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** `bounce`: mismo rebote de `minus` (scale 1→1.25→1) combinado con el trazo. */
export const clipboardMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardMinusShapes, {
    default: { shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }), 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }) } },
    bounce: { shapes: { 2: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 150, origin: '12px 14px' }) } },
  });

const PASTE_NUDGE = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(3px, 0)' },
  { transform: 'translate(0, 0)' },
];

export const clipboardPasteIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardPasteShapes, {
    default: {
      shapes: {
        4: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 230 }),
      },
    },
    nudge: {
      shapes: {
        0: /* @__PURE__ */ track(PASTE_NUDGE, 400, { delay: 150, easing: SPRING_BOUNCY }),
        2: /* @__PURE__ */ track(PASTE_NUDGE, 400, { delay: 190, easing: SPRING_BOUNCY }),
      },
    },
  });

/** La pluma escribe primero; la marca de la lista aparece de golpe al terminar. */
/** `write`: la pluma tiembla como en `pencil`/`pen`/`square-pen`, en vez de solo dibujarse. */
export const clipboardPenLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardPenLineShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 150 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 470 }),
      },
    },
    write: {
      shapes: {
        4: /* @__PURE__ */ track(PEN_WRITE_SQUIGGLE, 700, { delay: 150 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 850 }),
      },
    },
    alert: {
      shapes: {
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)' }, { transform: 'rotate(-0.3deg) translate(-0.5px, 1px)' }, { transform: 'rotate(0.2deg) translate(1px, -0.5px)' }, { transform: 'rotate(-0.4deg) translate(0px, 0px)' }, { transform: 'rotate(0deg) translate(0px, 0px)' }], 500, { easing: EASE }),
      },
    },
  });

export const clipboardPenIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardPenShapes, {
    default: { shapes: {
        3: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }), 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 150 }) } },
    write: { shapes: { 1: /* @__PURE__ */ track(PEN_WRITE_SQUIGGLE, 700, { delay: 150 }) } },
    nudge: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
      },
    },
  });

/** `bounce`: mismo rebote de `plus` (scale 1→1.25→1) combinado con el trazo. */
export const clipboardPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardPlusShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
      },
    },
    bounce: {
      shapes: {
        2: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 150, origin: '12px 14px' }),
        3: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 150, origin: '12px 14px' }),
      },
    },
  });

/** La "T" se escribe en orden natural: la barra de arriba, el tallo y por último la base. */
export const clipboardTypeIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardTypeShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 150 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { delay: 230 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 140, { delay: 380 }),
      },
    },
    quick: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 90, { delay: 80 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 110, { delay: 130 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 80, { delay: 220 }),
      },
    },
  });

/** `snap`: mismo combo dashoffset+scale de `check`, aplicado a las dos diagonales. */
export const clipboardXIcon: AnimatedIconDef = /* @__PURE__ */ icon(clipboardXShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 150 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 230 }),
      },
    },
    snap: {
      shapes: {
        2: /* @__PURE__ */ track(X_SNAP_DRAW, 400, { delay: 150, origin: '12px 14px' }),
        3: /* @__PURE__ */ track(X_SNAP_DRAW, 400, { delay: 230, origin: '12px 14px' }),
      },
    },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: EASE }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
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
    reveal: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
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
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-9px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-5px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
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
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(-10px)', offset: 0 }, { opacity: 0, transform: 'translateX(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 350, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(-10px)', offset: 0 }, { opacity: 0, transform: 'translateY(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateY(2px)', offset: 0.8 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 200 }),
        2: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(10px)', offset: 0 }, { opacity: 0, transform: 'translateX(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 100 }),
        3: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(10px)', offset: 0 }, { opacity: 0, transform: 'translateY(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateY(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 300 }),
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
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(-10px)', offset: 0 }, { opacity: 0, transform: 'translateX(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 300 }),
        1: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(-10px)', offset: 0 }, { opacity: 0, transform: 'translateY(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateY(2px)', offset: 0.8 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 350, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(10px)', offset: 0 }, { opacity: 0, transform: 'translateX(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 100 }),
        3: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(10px)', offset: 0 }, { opacity: 0, transform: 'translateY(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateY(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 350, { easing: 'ease-out', delay: 200 }),
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
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(-5px)', offset: 0 }, { opacity: 0, transform: 'translateX(-5px)', offset: 0.2 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 300, { easing: 'ease-in' }),
        1: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(10px)', offset: 0 }, { opacity: 0, transform: 'translateX(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 400, { easing: 'ease-out', delay: 100 }),
        2: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(10px)', offset: 0 }, { opacity: 0, transform: 'translateX(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 400, { easing: 'ease-out', delay: 200 }),
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
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(-5px)', offset: 0 }, { opacity: 0, transform: 'translateY(-5px)', offset: 0.2 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 300, { easing: 'ease-in' }),
        1: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(-10px)', offset: 0 }, { opacity: 0, transform: 'translateX(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 400, { easing: 'ease-out', delay: 100 }),
        2: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(10px)', offset: 0 }, { opacity: 0, transform: 'translateX(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 400, { easing: 'ease-out', delay: 200 }),
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
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(-5px)', offset: 0 }, { opacity: 0, transform: 'translateY(-5px)', offset: 0.2 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 300, { easing: 'ease-in' }),
        1: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(-10px)', offset: 0 }, { opacity: 0, transform: 'translateX(-10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(3px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 400, { easing: 'ease-out', delay: 100 }),
        2: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(10px)', offset: 0 }, { opacity: 0, transform: 'translateX(10px)', offset: 0.5 }, { opacity: 0.8, transform: 'translateX(-2px)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 400, { easing: 'ease-out', delay: 200 }),
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
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
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
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
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
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
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
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.1) rotate(-3deg)', offset: 0.2 }, { transform: 'scale(1.1) rotate(3deg)', offset: 0.4 }, { transform: 'scale(1.1) rotate(-2deg)', offset: 0.6 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
  });

/** Protección apagada: el tajo cae al final. */
export const shieldOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(shieldOffShapes, {
    default: { shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { delay: 220 }) } },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
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
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
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
    pulse: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1)', offset: 0 }, { transform: 'scale(0.9)', offset: 0.33 }, { transform: 'scale(1.2)', offset: 0.66 }, { transform: 'scale(1)', offset: 1 }], 600, { easing: EASE, origin: 'center' }),
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
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
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
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-15deg)', offset: 0.33 }, { transform: 'rotate(10deg)', offset: 0.66 }, { transform: 'rotate(0deg)', offset: 1 }], 2000, { easing: EASE }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-15deg)', offset: 0.33 }, { transform: 'rotate(10deg)', offset: 0.66 }, { transform: 'rotate(0deg)', offset: 1 }], 2000, { easing: EASE }),
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-15deg)', offset: 0.33 }, { transform: 'rotate(10deg)', offset: 0.66 }, { transform: 'rotate(0deg)', offset: 1 }], 2000, { easing: EASE }),
      },
    },
  });

export const arrowRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowRightShapes, { default: /* @__PURE__ */ held(/* @__PURE__ */ moveXSeq([0, 3]), 320),
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

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
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
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
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
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
    nudge: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(-15deg)', offset: 0.25 }, { transform: 'rotate(15deg)', offset: 0.75 }], 400, { easing: EASE }),
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
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
      },
    },
  });

export const fileIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileShapes, {
    default: { root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2, 0]), 480, { easing: SPRING_OUT }) },
  });

export const fileCheckCornerIcon: AnimatedIconDef = /* @__PURE__ */ icon(fileCheckCornerShapes, {
    default: { shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 180 }) } },
    reveal: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
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
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.1) rotate(-3deg)', offset: 0.2 }, { transform: 'scale(1.1) rotate(3deg)', offset: 0.4 }, { transform: 'scale(1.1) rotate(-2deg)', offset: 0.6 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
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
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 70, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out' }),
        2: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 140, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 140, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 70, fill: 'backwards' }),
        5: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 210, fill: 'backwards' }),
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
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.15 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease-out' }),
      },
    },
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
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  });

export const imageDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(imageDownShapes, {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 400, { delay: 100 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 220 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
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
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
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

const MOUSE_PRESS = /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1.5, 0]), 420, { easing: SPRING_OUT });

// Después del hundimiento, el mouse deriva solo — fluido y lento, como reposando sobre el escritorio.
// `ease-in-out` a propósito, no un resorte: un rebote aquí se vería mecánico, no orgánico.
const MOUSE_WANDER = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(0, 1.5px)', offset: 0.06 },
  { transform: 'translate(0, 0)', offset: 0.13 },
  { transform: 'translate(-2px, 1.5px)', offset: 0.35 },
  { transform: 'translate(1.5px, 3px)', offset: 0.58 },
  { transform: 'translate(3px, -1px)', offset: 0.78 },
  { transform: 'translate(0, 0)', offset: 1 },
];

/** Clic izquierdo: mismo hundimiento de `mouse`; el punto activo late del lado izquierdo. */
export const mouseLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(mouseLeftShapes, {
    default: {
      root: MOUSE_PRESS,
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 180 }) },
    },
    /** Igual que el default; al asentarse, el mouse deriva solo por el escritorio. */
    wander: {
      root: /* @__PURE__ */ track(MOUSE_WANDER, 3200, { easing: 'ease-in-out' }),
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 180 }) },
    },
  });

/** Apagado: se fragmenta y la diagonal cruza al final — sin hundimiento. */
export const mouseOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(mouseOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 220 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 380 }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  });

export const mouseRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(mouseRightShapes, {
    default: {
      root: MOUSE_PRESS,
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 180 }) },
    },
    wander: {
      root: /* @__PURE__ */ track(MOUSE_WANDER, 3200, { easing: 'ease-in-out' }),
      shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 180 }) },
    },
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
    active: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      reverseOnLeave: true,
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
  });

/** Subir a la nube: la flecha se va para arriba. */
export const cloudUploadIcon: AnimatedIconDef = /* @__PURE__ */ icon(cloudUploadShapes, {
    default: { shapes: { 2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -2, 0]), 550) } },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** Usuario validado: la palomita se dibuja al final. */
export const userCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(userCheckShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 450),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { delay: 200 }),
      },
    },
    reveal: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
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
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        5: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        6: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        7: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        8: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
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
    alert: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(1px)', offset: 0.33 }, { transform: 'translateY(-2px)', offset: 0.66 }, { transform: 'translateY(0)', offset: 1 }], 600, { easing: EASE }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(4px)', offset: 0.33 }, { transform: 'translateY(-2px)', offset: 0.66 }, { transform: 'translateY(0)', offset: 1 }], 600, { easing: EASE }),
      },
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
    reveal: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
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
    active: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        5: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        6: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        7: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        8: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        9: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        10: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
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
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
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
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const arrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowDownShapes, {
    default: /* @__PURE__ */ held(/* @__PURE__ */ moveYSeq([0, 3]), 320),
  });

const ARROW_UP_LEFT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-3px, -3px)' }];
export const arrowUpLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowUpLeftShapes, {
    default: /* @__PURE__ */ held(ARROW_UP_LEFT_NUDGE, 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, 3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

const ARROW_UP_RIGHT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(3px, -3px)' }];
export const arrowUpRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowUpRightShapes, {
    default: /* @__PURE__ */ held(ARROW_UP_RIGHT_NUDGE, 320),
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, 3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

const ARROW_DOWN_LEFT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-3px, 3px)' }];
export const arrowDownLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowDownLeftShapes, {
    default: /* @__PURE__ */ held(ARROW_DOWN_LEFT_NUDGE, 320),
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, -3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

const ARROW_DOWN_RIGHT_NUDGE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(3px, 3px)' }];
export const arrowDownRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(arrowDownRightShapes, {
    default: /* @__PURE__ */ held(ARROW_DOWN_RIGHT_NUDGE, 320),
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, -3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
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
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 450 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
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
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
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
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
      },
    },
  });

/** Sin señal: solo el punto. */
export const wifiZeroIcon: AnimatedIconDef = /* @__PURE__ */ icon(wifiZeroShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(WIFI_RISE, 320) } },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 1200),
      },
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
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
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
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
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
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
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
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
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
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
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
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 200, { easing: EASE, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 200, { easing: EASE, fill: 'forwards' }),
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
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
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
    active: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 200, { easing: EASE, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 200, { easing: EASE, fill: 'forwards' }),
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
    reveal: {
      shapes: {
        4: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
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

const CALENDAR_PIN = /* @__PURE__ */ moveYSeq([0, -1.5, 0]);

/** El "1" se dibuja como insignia, igual que el resto de la familia. */
export const calendar1Icon: AnimatedIconDef = /* @__PURE__ */ icon(calendar1Shapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        3: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 260 }),
      },
    },
    quick: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        3: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 150, { delay: 130 }),
      },
    },
  });

/** El asta baja primero, la punta llega al final — como si la fecha aterrizara. */
const ARROW_DOWN_NUDGE = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(0, 3px)' },
  { transform: 'translate(0, 0)' },
];
const ARROW_UP_NUDGE = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(0, -3px)' },
  { transform: 'translate(0, 0)' },
];

/** `nudge`: la flecha empuja hacia abajo — mismo gesto de `arrow-down`. */
export const calendarArrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarArrowDownShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 420 }),
      },
    },
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        0: /* @__PURE__ */ track(ARROW_DOWN_NUDGE, 400, { delay: 480, easing: SPRING_BOUNCY }),
      },
    },
  });

export const calendarArrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarArrowUpShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 280, { delay: 420 }),
      },
    },
    nudge: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        0: /* @__PURE__ */ track(ARROW_UP_NUDGE, 400, { delay: 480, easing: SPRING_BOUNCY }),
      },
    },
  });

/** Trazo alterno del cuerpo (bosquejado a mano, 6 piezas) — mismos pines e insignia que `calendar-check`. */
export const calendarCheck2Icon: AnimatedIconDef = /* @__PURE__ */ icon(calendarCheck2Shapes, {
    default: {
      shapes: {
        7: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        10: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 260 }),
      },
    },
    pop: {
      shapes: {
        7: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        10: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        6: /* @__PURE__ */ track(CHECK_BOUNCE_DRAW, 500, { delay: 260, origin: '17px 20px' }),
      },
    },
  });

/** Mismo criterio que `server-cog`/`shield-cog`: el engrane gira, el calendario se queda quieto. */
const CALENDAR_COG_TRIPLE_SPIN = /* @__PURE__ */ [
  { transform: 'scale(1) rotate(0deg)' },
  { transform: 'scale(1.2) rotate(540deg)' },
  { transform: 'scale(1) rotate(1080deg)' },
];

/** Mismo criterio que `server-cog`/`shield-cog`: el engrane gira, el calendario se queda quieto. */
export const calendarCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarCogShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        11: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        1: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        3: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        4: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        5: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        6: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        7: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        8: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
        12: /* @__PURE__ */ track(SHIELD_GEAR_SPIN, 650, { delay: 260, origin: '18px 18px' }),
      },
    },
    spin: {
      shapes: {
        2: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        11: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: SPRING_BOUNCY, origin: '18px 18px' }),
        1: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: SPRING_BOUNCY, origin: '18px 18px' }),
        3: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: SPRING_BOUNCY, origin: '18px 18px' }),
        4: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: SPRING_BOUNCY, origin: '18px 18px' }),
        5: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: SPRING_BOUNCY, origin: '18px 18px' }),
        6: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: SPRING_BOUNCY, origin: '18px 18px' }),
        7: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: SPRING_BOUNCY, origin: '18px 18px' }),
        8: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: SPRING_BOUNCY, origin: '18px 18px' }),
        12: /* @__PURE__ */ track(CALENDAR_COG_TRIPLE_SPIN, 500, { delay: 200, easing: SPRING_BOUNCY, origin: '18px 18px' }),
      },
    },
    active: {
      shapes: {
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        5: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        6: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        7: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        8: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        9: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        10: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        11: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        12: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

/** La esquina doblada ya está en la geometría — solo brincan los pines, sin insignia aparte. */
/** `flip`: el mismo ceder de papel de `sticky-note` (chida), aplicado al calendario entero. */
export const calendarFoldIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarFoldShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        3: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
      },
    },
    flip: {
      root: /* @__PURE__ */ track(FOLD_CHIDA, 420, { delay: 150, origin: 'center' }),
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        3: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
      },
    },
  });

/** `beat`: el mismo palpitar de 4 pulsaciones de `heart-*:pulse`, aplicado a la insignia. */
export const calendarHeartIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarHeartShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        4: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { delay: 260 }),
      },
    },
    beat: {
      shapes: {
        2: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        4: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        1: /* @__PURE__ */ track(HEART_QUAD_PULSE, 1200, { delay: 260, easing: SPRING_OUT, origin: '18.5px 17px' }),
      },
    },
  });

export const calendarMinus2Icon: AnimatedIconDef = /* @__PURE__ */ icon(calendarMinus2Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
      },
    },
    bounce: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 260, origin: '12px 15px' }),
      },
    },
  });

export const calendarMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarMinusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        4: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
      },
    },
    bounce: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        4: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 260, origin: '19px 18px' }),
      },
    },
  });

/** Apagado: se fragmenta y la diagonal cruza al final — sin brinco de pines. */
export const calendarOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarOffShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 180 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { delay: 460 }),
      },
    },
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  });

export const calendarPlus2Icon: AnimatedIconDef = /* @__PURE__ */ icon(calendarPlus2Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
      },
    },
    bounce: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 260, origin: '12px 15px' }),
        5: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 260, origin: '12px 15px' }),
      },
    },
  });

export const calendarPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarPlusShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
      },
    },
    bounce: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 260, origin: '19px 18px' }),
        2: /* @__PURE__ */ track(BADGE_BOUNCE_DRAW, 450, { delay: 260, origin: '19px 18px' }),
      },
    },
  });

/** Selección de rango: las dos líneas se dibujan y los dos extremos aparecen, fila tras fila. */
export const calendarRangeIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarRangeShapes, {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        3: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 260 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 380 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260, { delay: 380 }),
      },
    },
    quick: {
      shapes: {
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        3: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { delay: 130 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 160, { delay: 130 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 130, { delay: 190 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 160, { delay: 190 }),
      },
    },
  });

/** Mismo criterio que `search-check`/`user-round-search`: la lupa aparece y el mango se dibuja. */
/** `shake`: la lupa se ladea igual que `search`, en vez de solo aparecer quieta. */
export const calendarSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarSearchShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        4: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 180, { delay: 460 }),
      },
    },
    shake: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        4: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        5: /* @__PURE__ */ track(SEARCH_TILT, 800, { delay: 260, origin: '18px 17px' }),
        2: /* @__PURE__ */ track(SEARCH_TILT, 800, { delay: 260, origin: '18px 17px' }),
      },
    },
  });

/** `spin`: los dos brazos giran de una pieza — mismo giro completo de `refresh-cw:rotate`. */
export const calendarSyncIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarSyncShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        7: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 260 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 420 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 160, { delay: 420 }),
      },
    },
    spin: {
      shapes: {
        2: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        7: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        0: /* @__PURE__ */ track(REFRESH_SPIN, 700, { delay: 260, easing: SPRING_OUT, origin: '16px 16px' }),
        1: /* @__PURE__ */ track(REFRESH_SPIN, 700, { delay: 260, easing: SPRING_OUT, origin: '16px 16px' }),
        3: /* @__PURE__ */ track(REFRESH_SPIN, 700, { delay: 260, easing: SPRING_OUT, origin: '16px 16px' }),
        4: /* @__PURE__ */ track(REFRESH_SPIN, 700, { delay: 260, easing: SPRING_OUT, origin: '16px 16px' }),
      },
    },
    active: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  });

export const calendarX2Icon: AnimatedIconDef = /* @__PURE__ */ icon(calendarX2Shapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
      },
    },
    snap: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        5: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        1: /* @__PURE__ */ track(X_SNAP_DRAW, 400, { delay: 260, origin: '19px 18px' }),
        2: /* @__PURE__ */ track(X_SNAP_DRAW, 400, { delay: 340, origin: '19px 18px' }),
      },
    },
  });

export const calendarXIcon: AnimatedIconDef = /* @__PURE__ */ icon(calendarXShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 260 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { delay: 340 }),
      },
    },
    snap: {
      shapes: {
        0: /* @__PURE__ */ track(CALENDAR_PIN, 500),
        1: /* @__PURE__ */ track(CALENDAR_PIN, 500, { delay: 90 }),
        4: /* @__PURE__ */ track(X_SNAP_DRAW, 400, { delay: 260, origin: '12px 15px' }),
        5: /* @__PURE__ */ track(X_SNAP_DRAW, 400, { delay: 340, origin: '12px 15px' }),
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
    nudge: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0) rotate(0deg)', offset: 0 }, { transform: 'translateY(-3px) rotate(3deg)', offset: 0.2 }, { transform: 'translateY(0) rotate(-3deg)', offset: 0.4 }, { transform: 'translateY(-2px) rotate(0deg)', offset: 0.6 }, { transform: 'translateY(0) rotate(0deg)', offset: 1 }], 900, { easing: 'ease' }),
    },
  });

/** Infinito: lento a propósito, el chiste es ver el trazo completar el lazo. */
export const infinityIcon: AnimatedIconDef = /* @__PURE__ */ icon(infinityShapes, {
    default: { autoDraw: { speed: 38 } },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 1000, { easing: EASE }),
      },
    },
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
    alert: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
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
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 300 }),
        4: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 400 }),
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
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 300 }),
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
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
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
    reveal: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
      },
    },
  });

/** Sin señal: solo el punto. */
export const signalZeroIcon: AnimatedIconDef = /* @__PURE__ */ icon(signalZeroShapes, {
    default: { shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 260) } },
    reveal: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 1200),
      },
    },
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

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigDownDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-6.939 6.939a1.207 1.207 0 0 1-1.708 0l-6.94-6.94a.707.707 0 0 1 .5-1.206H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1z" },
    { tag: 'path', d: "M9 4h6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-7.086 7.086a1 1 0 0 1-1.414 0l-7.086-7.086a.707.707 0 0 1 .5-1.207H8a1 1 0 0 0 1-1z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigLeftDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 9a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707l6.94 6.94a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z" },
    { tag: 'path', d: "M20 9v6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.793 19.793a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigRightDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 9a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707l-6.94 6.94a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z" },
    { tag: 'path', d: "M4 9v6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.207 19.793a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigUpDashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 16a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-6.939-6.939a1.207 1.207 0 0 0-1.708 0l-6.94 6.94a.707.707 0 0 0 .5 1.206H8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1z" },
    { tag: 'path', d: "M9 20h6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowBigUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-out', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

export const arrowDown01Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'rect', x: 15, y: 4, width: 4, height: 6, ry: 2 },
    { tag: 'path', d: "M17 20v-6h-2" },
    { tag: 'path', d: "M15 20h4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDown10Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'path', d: "M17 10V4h-2" },
    { tag: 'path', d: "M15 10h4" },
    { tag: 'rect', x: 15, y: 14, width: 4, height: 6, ry: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownAZIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'path', d: "M20 8h-5" },
    { tag: 'path', d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10" },
    { tag: 'path', d: "M15 14h5l-5 6h5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowDownZAIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M15 4h5l-5 6h5" },
    { tag: 'path', d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" },
    { tag: 'path', d: "M20 18h-5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowLeftRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 3 4 7l4 4" },
    { tag: 'path', d: "M4 7h16" },
    { tag: 'path', d: "m16 21 4-4-4-4" },
    { tag: 'path', d: "M20 17H4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 500),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], 500),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], 500),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const arrowRightLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m16 3 4 4-4 4" },
    { tag: 'path', d: "M20 7H4" },
    { tag: 'path', d: "m8 21-4-4 4-4" },
    { tag: 'path', d: "M4 17h16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], 500),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 500),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 500),
      },
    },
  },
);

export const arrowUp01Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'rect', x: 15, y: 4, width: 4, height: 6, ry: 2 },
    { tag: 'path', d: "M17 20v-6h-2" },
    { tag: 'path', d: "M15 20h4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUp10Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M17 10V4h-2" },
    { tag: 'path', d: "M15 10h4" },
    { tag: 'rect', x: 15, y: 14, width: 4, height: 6, ry: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpAZIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M20 8h-5" },
    { tag: 'path', d: "M15 10V6.5a2.5 2.5 0 0 1 5 0V10" },
    { tag: 'path', d: "M15 14h5l-5 6h5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpZAIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M15 4h5l-5 6h5" },
    { tag: 'path', d: "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" },
    { tag: 'path', d: "M20 18h-5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-10px)' }], 300, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
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
export const batteryChargingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m11 7-3 5h4l-3 5" },
    { tag: 'path', d: "M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935" },
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.1 }, { opacity: 1 }], 500),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryFullIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 10v4" },
    { tag: 'path', d: "M14 10v4" },
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M6 10v4" },
    { tag: 'rect', x: 2, y: 6, width: 16, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out', delay: 520, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryLowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M6 14v-4" },
    { tag: 'rect', x: 2, y: 6, width: 16, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryMediumIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 14v-4" },
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M6 14v-4" },
    { tag: 'rect', x: 2, y: 6, width: 16, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 260, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryWarningIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 17h.01" },
    { tag: 'path', d: "M10 7v6" },
    { tag: 'path', d: "M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2" },
    { tag: 'path', d: "M22 14v-4" },
    { tag: 'path', d: "M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 500),
        1: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 500),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const batteryIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M 22 14 L 22 10" },
    { tag: 'rect', x: 2, y: 6, width: 16, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 900, { easing: 'ease-in-out' }),
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

export const betweenHorizontalEndIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 13, height: 7, x: 3, y: 3, rx: 1 },
    { tag: 'path', d: "m22 15-3-3 3-3" },
    { tag: 'rect', width: 13, height: 7, x: 3, y: 14, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-2px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const betweenHorizontalStartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 13, height: 7, x: 8, y: 3, rx: 1 },
    { tag: 'path', d: "m2 9 3 3-3 3" },
    { tag: 'rect', width: 13, height: 7, x: 8, y: 14, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(2px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const betweenVerticalEndIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 7, height: 13, x: 3, y: 3, rx: 1 },
    { tag: 'path', d: "m9 22 3-3 3 3" },
    { tag: 'rect', width: 7, height: 13, x: 14, y: 3, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const betweenVerticalStartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 7, height: 13, x: 3, y: 8, rx: 1 },
    { tag: 'path', d: "m15 2-3 3-3-3" },
    { tag: 'rect', width: 7, height: 13, x: 14, y: 8, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1px)' }], 150, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
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

export const boltIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" },
    { tag: 'circle', cx: 12, cy: 12, r: 4 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ rotate: '0deg' }, { rotate: '180deg' }], 1000, { easing: 'ease' }),
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

export const bookAIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "m8 13 4-7 4 7" },
    { tag: 'path', d: "M9.1 11h5.7" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookAudioIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v7" },
    { tag: 'path', d: "M16 8v3" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M8 8v3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 880, fill: 'backwards' }),
      },
    },
  },
);

export const bookCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "m9 9.5 2 2 4-4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 340, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

export const bookDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17h1.5" },
    { tag: 'path', d: "M12 22h1.5" },
    { tag: 'path', d: "M12 2h1.5" },
    { tag: 'path', d: "M17.5 22H19a1 1 0 0 0 1-1" },
    { tag: 'path', d: "M17.5 2H19a1 1 0 0 1 1 1v1.5" },
    { tag: 'path', d: "M20 14v3h-2.5" },
    { tag: 'path', d: "M20 8.5V10" },
    { tag: 'path', d: "M4 10V8.5" },
    { tag: 'path', d: "M4 19.5V14" },
    { tag: 'path', d: "M4 4.5A2.5 2.5 0 0 1 6.5 2H8" },
    { tag: 'path', d: "M8 22H6.5a1 1 0 0 1 0-5H8" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const bookDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13V7" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "m9 10 3 3 3-3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookHeadphonesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M8 12v-2a4 4 0 0 1 8 0v2" },
    { tag: 'circle', cx: 15, cy: 12, r: 1 },
    { tag: 'circle', cx: 9, cy: 12, r: 1 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const bookHeartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

export const bookImageIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'circle', cx: 10, cy: 8, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const bookKeyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 2H6.5A2.5 2.5 0 0 0 4 4.5v15" },
    { tag: 'path', d: "M17 2v6" },
    { tag: 'path', d: "M17 4h2" },
    { tag: 'path', d: "M20 15.2V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'circle', cx: 17, cy: 10, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookLockIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 6V4a2 2 0 1 0-4 0v2" },
    { tag: 'path', d: "M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10" },
    { tag: 'rect', x: 12, y: 6, width: 8, height: 5, rx: 1 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

export const bookMarkedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 2v8l3-3 3 3V2" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

export const bookMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M9 10h6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const bookOpenCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 5v16" },
    { tag: 'path', d: "m16 12 2 2 4-4" },
    { tag: 'path', d: "M22 6V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2h4.001A2 2 0 0022 17v-1.344" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 880, fill: 'backwards' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const bookOpenTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 5v16" },
    { tag: 'path', d: "M16 13h2" },
    { tag: 'path', d: "M16 9h2" },
    { tag: 'path', d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" },
    { tag: 'path', d: "M6 13h2" },
    { tag: 'path', d: "M6 9h2" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1)', offset: 0 }, { transform: 'scale(1.05)', offset: 0.2 }, { transform: 'scale(1)', offset: 1 }], 800, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1.1)', offset: 0.3 }, { transform: 'scaleY(1)', offset: 1 }], 800, { easing: 'ease' }),
        1: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1.1)', offset: 0.3 }, { transform: 'scaleY(1)', offset: 1 }], 800, { easing: 'ease' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1.1)', offset: 0.3 }, { transform: 'scaleY(1)', offset: 1 }], 800, { easing: 'ease' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1.1)', offset: 0.3 }, { transform: 'scaleY(1)', offset: 1 }], 800, { easing: 'ease' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1.1)', offset: 0.3 }, { transform: 'scaleY(1)', offset: 1 }], 800, { easing: 'ease' }),
        5: /* @__PURE__ */ track([{ transform: 'scaleY(1)', offset: 0 }, { transform: 'scaleY(1.1)', offset: 0.3 }, { transform: 'scaleY(1)', offset: 1 }], 800, { easing: 'ease' }),
      },
    },
  },
);

export const bookPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 7v6" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M9 10h6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M8 11h8" },
    { tag: 'path', d: "M8 7h6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
      },
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookTypeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 13h4" },
    { tag: 'path', d: "M12 6v7" },
    { tag: 'path', d: "M16 8V6H8v2" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 880, fill: 'backwards' }),
      },
    },
  },
);

export const bookUp2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13V7" },
    { tag: 'path', d: "M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2" },
    { tag: 'path', d: "m9 10 3-3 3 3" },
    { tag: 'path', d: "m9 5 3-3 3 3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 880, fill: 'backwards' }),
      },
    },
  },
);

export const bookUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13V7" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "m9 10 3-3 3 3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookUserIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 13a3 3 0 1 0-6 0" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'circle', cx: 12, cy: 8, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
      },
    },
  },
);

export const bookXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m14.5 7-5 5" },
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
    { tag: 'path', d: "m9.5 7 5 5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
    },
    reveal: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: 'ease' }),
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 620, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 320, { easing: 'ease-out', delay: 750, fill: 'backwards' }),
      },
    },
  },
);

export const bookIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg) translateY(0)', offset: 0 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.2 }, { transform: 'scale(1.04) rotate(8deg) translateY(-2px)', offset: 0.5 }, { transform: 'scale(1.04) rotate(-8deg) translateY(-2px)', offset: 0.8 }, { transform: 'scale(1) rotate(0deg) translateY(0)', offset: 1 }], 600, { easing: EASE }),
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

export const briefcaseBusinessIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 12h.01" },
    { tag: 'path', d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" },
    { tag: 'path', d: "M22 13a18.15 18.15 0 0 1-20 0" },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 6, rx: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(12deg)', offset: 0.25 }, { transform: 'rotate(-10deg)', offset: 0.55 }, { transform: 'rotate(3deg)', offset: 0.85 }, { transform: 'rotate(0deg)', offset: 1 }], 800, { easing: EASE }),
    },
  },
);

export const briefcaseMedicalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 11v4" },
    { tag: 'path', d: "M14 13h-4" },
    { tag: 'path', d: "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" },
    { tag: 'path', d: "M18 6v14" },
    { tag: 'path', d: "M6 6v14" },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 6, rx: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(12deg)', offset: 0.25 }, { transform: 'rotate(-10deg)', offset: 0.55 }, { transform: 'rotate(3deg)', offset: 0.85 }, { transform: 'rotate(0deg)', offset: 1 }], 800, { easing: EASE }),
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

export const chartBarDecreasingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M7 11h8" },
    { tag: 'path', d: "M7 16h3" },
    { tag: 'path', d: "M7 6h12" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease' }),
      },
    },
  },
);

export const chartBarIncreasingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M7 11h8" },
    { tag: 'path', d: "M7 16h12" },
    { tag: 'path', d: "M7 6h3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease' }),
      },
    },
  },
);

export const chartBarIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M7 16h8" },
    { tag: 'path', d: "M7 11h12" },
    { tag: 'path', d: "M7 6h3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
      },
    },
  },
);

export const chartColumnDecreasingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 17V9" },
    { tag: 'path', d: "M18 17v-3" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M8 17V5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 100 }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease' }),
      },
    },
  },
);

export const chartColumnIncreasingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 17V9" },
    { tag: 'path', d: "M18 17V5" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M8 17v-3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 100 }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.5 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.51 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 600, { easing: 'ease' }),
      },
    },
  },
);

export const chartGanttIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 6h8" },
    { tag: 'path', d: "M12 16h6" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M8 11h7" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const chartLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "m19 9-5 5-4-4-3 3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 700, { easing: 'ease-in-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const chartNoAxesColumnDecreasingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 21V3" },
    { tag: 'path', d: "M12 21V9" },
    { tag: 'path', d: "M19 21v-6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const chartNoAxesColumnIncreasingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 21v-6" },
    { tag: 'path', d: "M12 21V9" },
    { tag: 'path', d: "M19 21V3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const chartNoAxesColumnIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 21v-6" },
    { tag: 'path', d: "M12 21V3" },
    { tag: 'path', d: "M19 21V9" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const chartNoAxesCombinedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 16v5" },
    { tag: 'path', d: "M16 14.639V21" },
    { tag: 'path', d: "M20 10.656V21" },
    { tag: 'path', d: "m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" },
    { tag: 'path', d: "M4 18.463V21" },
    { tag: 'path', d: "M8 14.656V21" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 500, { easing: 'ease' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 500, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 500, { easing: 'ease', delay: 200 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 500, { easing: 'ease', delay: 300 }),
        4: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 500, { easing: 'ease', delay: 400 }),
        5: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.15 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 900, { easing: 'ease' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const chartNoAxesGanttIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 5h12" },
    { tag: 'path', d: "M4 12h10" },
    { tag: 'path', d: "M12 19h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
      },
    },
  },
);

export const chartPieIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" },
    { tag: 'path', d: "M21.21 15.89A10 10 0 1 1 8 2.83" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.1px, -1.1px)' }], 600, { easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.5)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const chartScatterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 7.5, cy: 7.5, r: 0.5, fill: "currentColor" },
    { tag: 'circle', cx: 18.5, cy: 5.5, r: 0.5, fill: "currentColor" },
    { tag: 'circle', cx: 11.5, cy: 11.5, r: 0.5, fill: "currentColor" },
    { tag: 'circle', cx: 7.5, cy: 16.5, r: 0.5, fill: "currentColor" },
    { tag: 'circle', cx: 17.5, cy: 14.5, r: 0.5, fill: "currentColor" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 300, { easing: 'ease-out' }),
      },
    },
  },
);

export const chartSplineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 700, { easing: 'ease-in-out' }),
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

export const chevronsDownUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m7 20 5-5 5 5" },
    { tag: 'path', d: "m7 4 5 5 5-5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const chevronsDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m7 6 5 5 5-5" },
    { tag: 'path', d: "m7 13 5 5 5-5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

export const chevronsLeftRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m9 7-5 5 5 5" },
    { tag: 'path', d: "m15 7 5 5-5 5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const chevronsLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m11 17-5-5 5-5" },
    { tag: 'path', d: "m18 17-5-5 5-5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

export const chevronsRightLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m20 17-5-5 5-5" },
    { tag: 'path', d: "m4 17 5-5-5-5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const chevronsRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m6 17 5-5-5-5" },
    { tag: 'path', d: "m13 17 5-5-5-5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

export const chevronsUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m17 11-5-5-5 5" },
    { tag: 'path', d: "m17 18-5-5-5 5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
      reverseOnLeave: true,
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

export const circleArrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M12 8v8" },
    { tag: 'path', d: "m8 12 4 4 4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.8)' }], 220, { easing: 'ease-out', fill: 'forwards', origin: '12px 8px' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }], 220, { easing: 'ease-out', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleArrowLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m12 8-4 4 4 4" },
    { tag: 'path', d: "M16 12H8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }], 220, { easing: 'ease-out', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.8)' }], 220, { easing: 'ease-out', fill: 'forwards', origin: '16px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleArrowOutDownLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 12a10 10 0 1 1 10 10" },
    { tag: 'path', d: "m2 22 10-10" },
    { tag: 'path', d: "M8 22H2v-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
  },
);

export const circleArrowOutDownRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 22a10 10 0 1 1 10-10" },
    { tag: 'path', d: "M22 22 12 12" },
    { tag: 'path', d: "M22 16v6h-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
  },
);

export const circleArrowOutUpLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 8V2h6" },
    { tag: 'path', d: "m2 2 10 10" },
    { tag: 'path', d: "M12 2A10 10 0 1 1 2 12" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
  },
);

export const circleArrowOutUpRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 12A10 10 0 1 1 12 2" },
    { tag: 'path', d: "M22 2 12 12" },
    { tag: 'path', d: "M16 2h6v6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
  },
);

export const circleArrowRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m12 16 4-4-4-4" },
    { tag: 'path', d: "M8 12h8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }], 220, { easing: 'ease-out', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.8)' }], 220, { easing: 'ease-out', fill: 'forwards', origin: '8px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleArrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m16 12-4-4-4 4" },
    { tag: 'path', d: "M12 16V8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }], 220, { easing: 'ease-out', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.8)' }], 220, { easing: 'ease-out', fill: 'forwards', origin: '12px 16px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const circleCheckBigIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21.801 10A10 10 0 1 1 17 3.335" },
    { tag: 'path', d: "m9 11 3 3L22 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);

export const circleChevronDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m16 10-4 4-4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(2px)', offset: 0.4 }, { transform: 'translateY(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
    },
  },
);

export const circleChevronLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m14 16-4-4 4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-2px)', offset: 0.4 }, { transform: 'translateX(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
    },
  },
);

export const circleChevronRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m10 8 4 4-4 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(2px)', offset: 0.4 }, { transform: 'translateX(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
    },
  },
);

export const circleChevronUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m8 14 4-4 4 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.4 }, { transform: 'translateY(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
    },
  },
);

export const circleOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M8.35 2.69A10 10 0 0 1 21.3 15.65" },
    { tag: 'path', d: "M19.08 19.08A10 10 0 1 1 4.92 4.92" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const circleParkingOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.656 7H13a3 3 0 0 1 2.984 3.307" },
    { tag: 'path', d: "M13 13H9" },
    { tag: 'path', d: "M19.071 19.071A1 1 0 0 1 4.93 4.93" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M8.357 2.687a10 10 0 0 1 12.956 12.956" },
    { tag: 'path', d: "M9 17V9" },
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

export const clipboardIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 8, height: 4, x: 8, y: 2, rx: 1, ry: 1 },
    { tag: 'path', d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.25 }, { transform: 'translateY(1px)', offset: 0.5 }, { transform: 'translateY(0)', offset: 1 }], 500, { easing: EASE }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-1deg)', offset: 0.25 }, { transform: 'rotate(1deg)', offset: 0.75 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
      },
    },
  },
);

export const cloudDownloadIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13v8l-4-4" },
    { tag: 'path', d: "m12 21 4-4" },
    { tag: 'path', d: "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const cloudMoonIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z" },
    { tag: 'path', d: "M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-1.2px, -1.2px)' }, { transform: 'translate(1.2px, 1.2px)' }, { transform: 'translate(0, 0)' }], 1400, { easing: 'ease-in-out' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(1.2px, 1.2px)' }, { transform: 'translate(-1.2px, -1.2px)' }, { transform: 'translate(0, 0)' }], 1400, { easing: 'ease-in-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const cloudOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057" },
    { tag: 'path', d: "M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78" },
    { tag: 'path', d: "m2 2 20 20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const cogIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 10.27 7 3.34" },
    { tag: 'path', d: "m11 13.73-4 6.93" },
    { tag: 'path', d: "M12 22v-2" },
    { tag: 'path', d: "M12 2v2" },
    { tag: 'path', d: "M14 12h8" },
    { tag: 'path', d: "m17 20.66-1-1.73" },
    { tag: 'path', d: "m17 3.34-1 1.73" },
    { tag: 'path', d: "M2 12h2" },
    { tag: 'path', d: "m20.66 17-1.73-1" },
    { tag: 'path', d: "m20.66 7-1.73 1" },
    { tag: 'path', d: "m3.34 17 1.73-1" },
    { tag: 'path', d: "m3.34 7 1.73 1" },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
    { tag: 'circle', cx: 12, cy: 12, r: 8 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 500, { easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', fill: 'forwards' }),
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

export const dice1Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: "M12 12h.01" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0) rotate(0deg)' }, { transform: 'translateX(-20%) rotate(45deg)' }, { transform: 'translateX(0) rotate(90deg)' }, { transform: 'translateX(-20%) rotate(135deg)' }, { transform: 'translateX(0) rotate(180deg)' }], 1000, { easing: EASE }),
    },
  },
);

export const dice2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: "M15 9h.01" },
    { tag: 'path', d: "M9 15h.01" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0) rotate(0deg)' }, { transform: 'translateX(-20%) rotate(45deg)' }, { transform: 'translateX(0) rotate(90deg)' }, { transform: 'translateX(-20%) rotate(135deg)' }, { transform: 'translateX(0) rotate(180deg)' }], 1000, { easing: EASE }),
    },
  },
);

export const dice3Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: "M16 8h.01" },
    { tag: 'path', d: "M12 12h.01" },
    { tag: 'path', d: "M8 16h.01" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0) rotate(0deg)' }, { transform: 'translateX(-20%) rotate(45deg)' }, { transform: 'translateX(0) rotate(90deg)' }, { transform: 'translateX(-20%) rotate(135deg)' }, { transform: 'translateX(0) rotate(180deg)' }], 1000, { easing: EASE }),
    },
  },
);

export const dice4Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: "M16 8h.01" },
    { tag: 'path', d: "M8 8h.01" },
    { tag: 'path', d: "M8 16h.01" },
    { tag: 'path', d: "M16 16h.01" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0) rotate(0deg)' }, { transform: 'translateX(-20%) rotate(45deg)' }, { transform: 'translateX(0) rotate(90deg)' }, { transform: 'translateX(-20%) rotate(135deg)' }, { transform: 'translateX(0) rotate(180deg)' }], 1000, { easing: EASE }),
    },
  },
);

export const dice5Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: "M16 8h.01" },
    { tag: 'path', d: "M8 8h.01" },
    { tag: 'path', d: "M8 16h.01" },
    { tag: 'path', d: "M16 16h.01" },
    { tag: 'path', d: "M12 12h.01" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0) rotate(0deg)' }, { transform: 'translateX(-20%) rotate(45deg)' }, { transform: 'translateX(0) rotate(90deg)' }, { transform: 'translateX(-20%) rotate(135deg)' }, { transform: 'translateX(0) rotate(180deg)' }], 1000, { easing: EASE }),
    },
  },
);

export const dice6Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: "M16 8h.01" },
    { tag: 'path', d: "M16 12h.01" },
    { tag: 'path', d: "M16 16h.01" },
    { tag: 'path', d: "M8 8h.01" },
    { tag: 'path', d: "M8 12h.01" },
    { tag: 'path', d: "M8 16h.01" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0) rotate(0deg)' }, { transform: 'translateX(-20%) rotate(45deg)' }, { transform: 'translateX(0) rotate(90deg)' }, { transform: 'translateX(-20%) rotate(135deg)' }, { transform: 'translateX(0) rotate(180deg)' }], 1000, { easing: EASE }),
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

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileChartColumnIncreasingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M8 18v-2" },
    { tag: 'path', d: "M12 18v-4" },
    { tag: 'path', d: "M16 18v-6" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        4: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileChartColumnIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M8 18v-1" },
    { tag: 'path', d: "M12 18v-6" },
    { tag: 'path', d: "M16 18v-3" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        4: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileChartLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "m16 13-3.5 3.5-2-2L8 17" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 700, { easing: 'ease-in-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M12 18v-6" },
    { tag: 'path', d: "m9 15 3 3 3-3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M9 15h6" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const filePenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34" },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const filePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M9 15h6" },
    { tag: 'path', d: "M12 18v-6" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileQuestionMarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" },
    { tag: 'path', d: "M12 17h.01" },
    { tag: 'path', d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
      },
    },
  },
);

export const fileSlidersIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M8 12h8" },
    { tag: 'path', d: "M10 11v2" },
    { tag: 'path', d: "M8 17h8" },
    { tag: 'path', d: "M14 16v2" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(4px)' }], 400, { easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' }),
        5: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-4px)' }], 400, { easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileTerminalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "m8 16 2-2-2-2" },
    { tag: 'path', d: "M12 18h4" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 800, { easing: 'linear' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const fileUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M12 12v6" },
    { tag: 'path', d: "m15 15-3-3-3 3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 300, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
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

export const galleryHorizontalEndIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 7v10" },
    { tag: 'path', d: "M6 5v14" },
    { tag: 'rect', width: 12, height: 18, x: 10, y: 3, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(3px)', offset: 0 }, { opacity: 0, transform: 'translateX(3px)', offset: 0.6 }, { opacity: 1, transform: 'translateX(0)', offset: 0.8 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 600),
        1: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateX(3px)', offset: 0 }, { opacity: 0, transform: 'translateX(3px)', offset: 0.4 }, { opacity: 1, transform: 'translateX(0)', offset: 0.6 }, { opacity: 1, transform: 'translateX(0)', offset: 1 }], 600),
      },
    },
  },
);

export const galleryHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 3v18" },
    { tag: 'rect', width: 12, height: 18, x: 6, y: 3, rx: 2 },
    { tag: 'path', d: "M22 3v18" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'scale(0.8) translateX(4px)' }, { opacity: 1, transform: 'scale(1) translateX(0)' }], 600, { easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 150 }),
        2: /* @__PURE__ */ track([{ opacity: 0, transform: 'scale(0.8) translateX(-4px)' }, { opacity: 1, transform: 'scale(1) translateX(0)' }], 600, { easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 150 }),
      },
    },
  },
);

export const galleryVerticalEndIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M7 2h10" },
    { tag: 'path', d: "M5 6h14" },
    { tag: 'rect', width: 18, height: 12, x: 3, y: 10, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(3px)', offset: 0 }, { opacity: 0, transform: 'translateY(3px)', offset: 0.6 }, { opacity: 1, transform: 'translateY(0)', offset: 0.8 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 600),
        1: /* @__PURE__ */ track([{ opacity: 0, transform: 'translateY(3px)', offset: 0 }, { opacity: 0, transform: 'translateY(3px)', offset: 0.4 }, { opacity: 1, transform: 'translateY(0)', offset: 0.6 }, { opacity: 1, transform: 'translateY(0)', offset: 1 }], 600),
      },
    },
  },
);

export const galleryVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 2h18" },
    { tag: 'rect', width: 18, height: 12, x: 3, y: 6, rx: 2 },
    { tag: 'path', d: "M3 22h18" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0, transform: 'scale(0.8) translateY(4px)' }, { opacity: 1, transform: 'scale(1) translateY(0)' }], 600, { easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 150 }),
        2: /* @__PURE__ */ track([{ opacity: 0, transform: 'scale(0.8) translateY(-4px)' }, { opacity: 1, transform: 'scale(1) translateY(0)' }], 600, { easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', delay: 150 }),
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

export const gripHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 9, r: 1 },
    { tag: 'circle', cx: 19, cy: 9, r: 1 },
    { tag: 'circle', cx: 5, cy: 9, r: 1 },
    { tag: 'circle', cx: 12, cy: 15, r: 1 },
    { tag: 'circle', cx: 19, cy: 15, r: 1 },
    { tag: 'circle', cx: 5, cy: 15, r: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 70, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 140, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out' }),
        3: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 140, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 210, fill: 'backwards' }),
        5: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 70, fill: 'backwards' }),
      },
    },
  },
);

export const gripIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 5, r: 1 },
    { tag: 'circle', cx: 19, cy: 5, r: 1 },
    { tag: 'circle', cx: 5, cy: 5, r: 1 },
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
    { tag: 'circle', cx: 19, cy: 12, r: 1 },
    { tag: 'circle', cx: 5, cy: 12, r: 1 },
    { tag: 'circle', cx: 12, cy: 19, r: 1 },
    { tag: 'circle', cx: 19, cy: 19, r: 1 },
    { tag: 'circle', cx: 5, cy: 19, r: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 70, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 140, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out' }),
        3: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 140, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 210, fill: 'backwards' }),
        5: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 70, fill: 'backwards' }),
        6: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 210, fill: 'backwards' }),
        7: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 280, fill: 'backwards' }),
        8: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], 620, { easing: 'ease-in-out', delay: 140, fill: 'backwards' }),
      },
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
    { tag: 'path', d: "M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" },
    { tag: 'path', d: "m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" },
    { tag: 'path', d: "m2 16 6 6" },
    { tag: 'circle', cx: 16, cy: 9, r: 2.9 },
    { tag: 'circle', cx: 6, cy: 5, r: 3 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-10px)', opacity: 1 }, { transform: 'translateY(0)', opacity: 1 }], 600, { easing: 'ease-in' }),
        4: /* @__PURE__ */ track([{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-10px)', opacity: 1 }, { transform: 'translateY(0)', opacity: 1 }], 600, { easing: 'ease-in' }),
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

export const hardDriveDownloadIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v8" },
    { tag: 'path', d: "m16 6-4 4-4-4" },
    { tag: 'rect', width: 20, height: 8, x: 2, y: 14, rx: 2 },
    { tag: 'path', d: "M6 18h.01" },
    { tag: 'path', d: "M10 18h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const hardDriveUploadIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m16 6-4-4-4 4" },
    { tag: 'path', d: "M12 2v8" },
    { tag: 'rect', width: 20, height: 8, x: 2, y: 14, rx: 2 },
    { tag: 'path', d: "M6 18h.01" },
    { tag: 'path', d: "M10 18h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
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
export const heartIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }], 1200, { easing: EASE }),
      },
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
export const houseWifiIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9.5 13.866a4 4 0 0 1 5 .01" },
    { tag: 'path', d: "M12 17h.01" },
    { tag: 'path', d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
    { tag: 'path', d: "M7 10.754a8 8 0 0 1 10 0" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 450 }),
      },
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

export const keySquareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z" },
    { tag: 'path', d: "m14 7 3 3" },
    { tag: 'path', d: "m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg) scale(1)', offset: 0 }, { transform: 'rotate(15deg) scale(1.05)', offset: 0.3 }, { transform: 'rotate(-15deg) scale(1)', offset: 0.7 }, { transform: 'rotate(0deg) scale(1)', offset: 1 }], 600, { origin: 'center' }),
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
export const link2OffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 17H7A5 5 0 0 1 7 7" },
    { tag: 'path', d: "M15 7h2a5 5 0 0 1 4 8" },
    { tag: 'line', x1: 8, x2: 12, y1: 12, y2: 12 },
    { tag: 'line', x1: 2, x2: 22, y1: 2, y2: 22 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const listCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 5H3" },
    { tag: 'path', d: "M16 12H3" },
    { tag: 'path', d: "M11 19H3" },
    { tag: 'path', d: "m15 18 2 2 4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const listTodoIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 5h8" },
    { tag: 'path', d: "M13 12h8" },
    { tag: 'path', d: "M13 19h8" },
    { tag: 'path', d: "m3 17 2 2 4-4" },
    { tag: 'rect', x: 3, y: 4, width: 6, height: 6, rx: 1 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
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
    { tag: 'path', d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" },
    { tag: 'path', d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" },
    { tag: 'path', d: "m16 19 2 2 4-4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);

export const mapPinOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.75 7.09a3 3 0 0 1 2.16 2.16" },
    { tag: 'path', d: "M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533" },
    { tag: 'path', d: "M9.13 9.13a3 3 0 0 0 3.74 3.74" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
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
export const messageCircleMoreIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" },
    { tag: 'path', d: "M8 12h.01" },
    { tag: 'path', d: "M12 12h.01" },
    { tag: 'path', d: "M16 12h.01" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 1, offset: 0 }, { opacity: 0, offset: 0.1 }, { opacity: 0, offset: 0.2 }, { opacity: 1, offset: 0.3 }, { opacity: 1, offset: 0.5 }, { opacity: 0, offset: 0.6 }, { opacity: 0, offset: 0.7 }, { opacity: 1, offset: 0.8 }, { opacity: 1, offset: 0.9 }, { opacity: 1, offset: 1 }], 1500),
        2: /* @__PURE__ */ track([{ opacity: 1, offset: 0 }, { opacity: 0, offset: 0.1 }, { opacity: 0, offset: 0.2 }, { opacity: 1, offset: 0.3 }, { opacity: 1, offset: 0.5 }, { opacity: 0, offset: 0.6 }, { opacity: 0, offset: 0.7 }, { opacity: 1, offset: 0.8 }, { opacity: 1, offset: 0.9 }, { opacity: 1, offset: 1 }], 1500, { delay: 100 }),
        3: /* @__PURE__ */ track([{ opacity: 1, offset: 0 }, { opacity: 0, offset: 0.1 }, { opacity: 0, offset: 0.2 }, { opacity: 1, offset: 0.3 }, { opacity: 1, offset: 0.5 }, { opacity: 0, offset: 0.6 }, { opacity: 0, offset: 0.7 }, { opacity: 1, offset: 0.8 }, { opacity: 1, offset: 0.9 }, { opacity: 1, offset: 1 }], 1500, { delay: 200 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageCircleOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M4.93 4.929a10 10 0 0 0-1.938 11.412 2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 0 0 11.302-1.989" },
    { tag: 'path', d: "M8.35 2.69A10 10 0 0 1 21.3 15.65" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageCircleQuestionMarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" },
    { tag: 'path', d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" },
    { tag: 'path', d: "M12 17h.01" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageCircleWarningIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" },
    { tag: 'path', d: "M12 8v4" },
    { tag: 'path', d: "M12 16h.01" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.1) rotate(-3deg)', offset: 0.2 }, { transform: 'scale(1.1) rotate(3deg)', offset: 0.4 }, { transform: 'scale(1.1) rotate(-2deg)', offset: 0.6 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageCircleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 }, { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageSquareMoreIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" },
    { tag: 'path', d: "M12 11h.01" },
    { tag: 'path', d: "M16 11h.01" },
    { tag: 'path', d: "M8 11h.01" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 1, offset: 0 }, { opacity: 0, offset: 0.1 }, { opacity: 0, offset: 0.2 }, { opacity: 1, offset: 0.3 }, { opacity: 1, offset: 0.5 }, { opacity: 0, offset: 0.6 }, { opacity: 0, offset: 0.7 }, { opacity: 1, offset: 0.8 }, { opacity: 1, offset: 0.9 }, { opacity: 1, offset: 1 }], 1500),
        2: /* @__PURE__ */ track([{ opacity: 1, offset: 0 }, { opacity: 0, offset: 0.1 }, { opacity: 0, offset: 0.2 }, { opacity: 1, offset: 0.3 }, { opacity: 1, offset: 0.5 }, { opacity: 0, offset: 0.6 }, { opacity: 0, offset: 0.7 }, { opacity: 1, offset: 0.8 }, { opacity: 1, offset: 0.9 }, { opacity: 1, offset: 1 }], 1500, { delay: 100 }),
        3: /* @__PURE__ */ track([{ opacity: 1, offset: 0 }, { opacity: 0, offset: 0.1 }, { opacity: 0, offset: 0.2 }, { opacity: 1, offset: 0.3 }, { opacity: 1, offset: 0.5 }, { opacity: 0, offset: 0.6 }, { opacity: 0, offset: 0.7 }, { opacity: 1, offset: 0.8 }, { opacity: 1, offset: 0.9 }, { opacity: 1, offset: 1 }], 1500, { delay: 200 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageSquareOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M8.656 3H20a2 2 0 0 1 2 2v11.344" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const messageSquareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'scale(1) rotate(0deg)', offset: 0 }, { transform: 'scale(1.05) rotate(-7deg)', offset: 0.2 }, { transform: 'scale(1.05) rotate(7deg)', offset: 0.4 }, { transform: 'scale(1) rotate(0deg)', offset: 1 }], 500, { easing: EASE }),
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

export const monitorCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m9 10 2 2 4-4" },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 3, rx: 2 },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const monitorCogIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "m14.305 7.53.923-.382" },
    { tag: 'path', d: "m15.228 4.852-.923-.383" },
    { tag: 'path', d: "m16.852 3.228-.383-.924" },
    { tag: 'path', d: "m16.852 8.772-.383.923" },
    { tag: 'path', d: "m19.148 3.228.383-.924" },
    { tag: 'path', d: "m19.53 9.696-.382-.924" },
    { tag: 'path', d: "m20.772 4.852.924-.383" },
    { tag: 'path', d: "m20.772 7.148.924.383" },
    { tag: 'path', d: "M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" },
    { tag: 'path', d: "M8 21h8" },
    { tag: 'circle', cx: 18, cy: 6, r: 3 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        5: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        6: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        7: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        8: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
        11: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(180deg)' }], 800, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '18px 6px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const monitorDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13V7" },
    { tag: 'path', d: "m15 10-3 3-3-3" },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 3, rx: 2 },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const monitorOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M17 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 1.184-1.826" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M8 21h8" },
    { tag: 'path', d: "M8.656 3H20a2 2 0 0 1 2 2v10a2 2 0 0 1-.293 1.042" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const monitorUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m9 10 3-3 3 3" },
    { tag: 'path', d: "M12 13V7" },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 3, rx: 2 },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 320, { easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const moveDiagonal2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 13v6h-6" },
    { tag: 'path', d: "M5 11V5h6" },
    { tag: 'path', d: "m5 5 14 14" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)', offset: 0 }, { transform: 'translate(-3px, -3px)', offset: 0.25 }, { transform: 'translate(0, 0)', offset: 0.45 }, { transform: 'translate(0, 0)', offset: 0.55 }, { transform: 'translate(3px, 3px)', offset: 0.75 }, { transform: 'translate(0, 0)', offset: 1 }], 1000),
    },
  },
);

export const moveDiagonalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 19H5v-6" },
    { tag: 'path', d: "M13 5h6v6" },
    { tag: 'path', d: "M19 5 5 19" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)', offset: 0 }, { transform: 'translate(3px, -3px)', offset: 0.25 }, { transform: 'translate(0, 0)', offset: 0.45 }, { transform: 'translate(0, 0)', offset: 0.55 }, { transform: 'translate(-3px, 3px)', offset: 0.75 }, { transform: 'translate(0, 0)', offset: 1 }], 1000),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveDownLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 19H5V13" },
    { tag: 'path', d: "M19 5L5 19" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-3px, 3px)' }, { transform: 'translate(0, 0)' }], 500),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveDownRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 13V19H13" },
    { tag: 'path', d: "M5 5L19 19" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(3px, 3px)' }, { transform: 'translate(0, 0)' }], 500),
    },
  },
);

export const moveDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 18L12 22L16 18" },
    { tag: 'path', d: "M12 2V22" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0)' }, { transform: 'translateY(3px)' }, { transform: 'translateY(0)' }], 500),
    },
  },
);

export const moveHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m18 8 4 4-4 4" },
    { tag: 'path', d: "M2 12h20" },
    { tag: 'path', d: "m6 8-4 4 4 4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-3px)', offset: 0.25 }, { transform: 'translateX(0)', offset: 0.45 }, { transform: 'translateX(0)', offset: 0.55 }, { transform: 'translateX(3px)', offset: 0.75 }, { transform: 'translateX(0)', offset: 1 }], 1000),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 8L2 12L6 16" },
    { tag: 'path', d: "M2 12H22" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 500),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 8L22 12L18 16" },
    { tag: 'path', d: "M2 12H22" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], 500),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveUpLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 11V5H11" },
    { tag: 'path', d: "M5 5L19 19" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-3px, -3px)' }, { transform: 'translate(0, 0)' }], 500),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const moveUpRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 5H19V11" },
    { tag: 'path', d: "M19 5L5 19" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(3px, -3px)' }, { transform: 'translate(0, 0)' }], 500),
    },
  },
);

export const moveUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 6L12 2L16 6" },
    { tag: 'path', d: "M12 2V22" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0)' }, { transform: 'translateY(-3px)' }, { transform: 'translateY(0)' }], 500),
    },
  },
);

export const moveVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v20" },
    { tag: 'path', d: "m8 18 4 4 4-4" },
    { tag: 'path', d: "m8 6 4-4 4 4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-3px)', offset: 0.25 }, { transform: 'translateY(0)', offset: 0.45 }, { transform: 'translateY(0)', offset: 0.55 }, { transform: 'translateY(3px)', offset: 0.75 }, { transform: 'translateY(0)', offset: 1 }], 1000),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const navigation2OffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9.31 9.31 5 21l7-4 7 4-1.17-3.17" },
    { tag: 'path', d: "M14.53 8.88 12 2l-1.17 3.17" },
    { tag: 'line', x1: 2, x2: 22, y1: 2, y2: 22 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const navigationOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8.43 8.43 3 11l8 2 2 8 2.57-5.43" },
    { tag: 'path', d: "M17.39 11.73 22 2l-9.73 4.61" },
    { tag: 'line', x1: 2, x2: 22, y1: 2, y2: 22 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
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

export const notebookPenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" },
    { tag: 'path', d: "M2 6h4" },
    { tag: 'path', d: "M2 10h4" },
    { tag: 'path', d: "M2 14h4" },
    { tag: 'path', d: "M2 18h4" },
    { tag: 'path', d: "M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
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

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const orbitIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M20.341 6.484A10 10 0 0 1 10.266 21.85" },
    { tag: 'path', d: "M3.659 17.516A10 10 0 0 1 13.74 2.152" },
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
    { tag: 'circle', cx: 19, cy: 5, r: 2 },
    { tag: 'circle', cx: 5, cy: 19, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-1080deg)' }], 3000, { easing: EASE }),
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
    { tag: 'path', d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: '0' }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' }], 700, { easing: 'ease-in-out' }),
      },
    },
  },
);

export const penOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982" },
    { tag: 'path', d: "m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353" },
    { tag: 'path', d: "m2 2 20 20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const pencilLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 21h8" },
    { tag: 'path', d: "m15 5 4 4" },
    { tag: 'path', d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
      },
    },
  },
);

export const pencilOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982" },
    { tag: 'path', d: "m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353" },
    { tag: 'path', d: "m15 5 4 4" },
    { tag: 'path', d: "m2 2 20 20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
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

export const radioTowerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4.9 16.1C1 12.2 1 5.8 4.9 1.9" },
    { tag: 'path', d: "M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" },
    { tag: 'circle', cx: 12, cy: 9, r: 2 },
    { tag: 'path', d: "M16.2 4.8c2 2 2.26 5.11.8 7.47" },
    { tag: 'path', d: "M19.1 1.9a9.96 9.96 0 0 1 0 14.1" },
    { tag: 'path', d: "M9.5 18h5" },
    { tag: 'path', d: "m8 22 4-11 4 11" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 150 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        4: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const radioIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16.247 7.761a6 6 0 0 1 0 8.478" },
    { tag: 'path', d: "M19.075 4.933a10 10 0 0 1 0 14.134" },
    { tag: 'path', d: "M4.925 19.067a10 10 0 0 1 0-14.134" },
    { tag: 'path', d: "M7.753 16.239a6 6 0 0 1 0-8.478" },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 150 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        4: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
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
export const refreshCcwDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" },
    { tag: 'path', d: "M3 3v5h5" },
    { tag: 'path', d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" },
    { tag: 'path', d: "M16 16h5v5" },
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

export const refreshCcwIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" },
    { tag: 'path', d: "M3 3v5h5" },
    { tag: 'path', d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" },
    { tag: 'path', d: "M16 16h5v5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-50deg)' }], 400, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
      reverseOnLeave: true,
    },
  },
);

export const refreshCwOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47" },
    { tag: 'path', d: "M8 16H3v5" },
    { tag: 'path', d: "M3 12C3 9.51 4 7.26 5.64 5.64" },
    { tag: 'path', d: "m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64" },
    { tag: 'path', d: "M21 12c0 1-.16 1.97-.47 2.87" },
    { tag: 'path', d: "M21 3v5h-5" },
    { tag: 'path', d: "M22 22 2 2" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
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

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const rotateCcwKeyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 7v6" },
    { tag: 'path', d: "M12 9h2" },
    { tag: 'path', d: "M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8" },
    { tag: 'path', d: "M3 3v5h5" },
    { tag: 'circle', cx: 12, cy: 15, r: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-40deg)' }], 450, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '12px 12px' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-40deg)' }], 450, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
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

export const scanTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 7V5a2 2 0 0 1 2-2h2" },
    { tag: 'path', d: "M17 3h2a2 2 0 0 1 2 2v2" },
    { tag: 'path', d: "M21 17v2a2 2 0 0 1-2 2h-2" },
    { tag: 'path', d: "M7 21H5a2 2 0 0 1-2-2v-2" },
    { tag: 'path', d: "M7 8h8" },
    { tag: 'path', d: "M7 12h10" },
    { tag: 'path', d: "M7 16h6" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
        5: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        6: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
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

export const shieldQuestionMarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" },
    { tag: 'path', d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" },
    { tag: 'path', d: "M12 17h.01" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)', offset: 0 }, { transform: 'rotate(-10deg)', offset: 0.2 }, { transform: 'rotate(10deg)', offset: 0.4 }, { transform: 'rotate(-10deg)', offset: 0.6 }, { transform: 'rotate(0deg)', offset: 1 }], 500, { easing: EASE, origin: 'center' }),
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

export const smartphoneNfcIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 7, height: 12, x: 2, y: 6, rx: 1 },
    { tag: 'path', d: "M13 8.32a7.43 7.43 0 0 1 0 7.36" },
    { tag: 'path', d: "M16.46 6.21a11.76 11.76 0 0 1 0 11.58" },
    { tag: 'path', d: "M19.91 4.1a15.91 15.91 0 0 1 .01 15.8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 450 }),
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

export const squareArrowOutDownLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6" },
    { tag: 'path', d: "m3 21 9-9" },
    { tag: 'path', d: "M9 21H3v-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
  },
);

export const squareArrowOutDownRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" },
    { tag: 'path', d: "m21 21-9-9" },
    { tag: 'path', d: "M21 15v6h-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, -2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
  },
);

export const squareArrowOutUpLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6" },
    { tag: 'path', d: "m3 3 9 9" },
    { tag: 'path', d: "M3 9V3h6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
  },
);

export const squareArrowOutUpRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" },
    { tag: 'path', d: "m21 3-9 9" },
    { tag: 'path', d: "M15 3h6v6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
        2: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(-2px, 2px)' }, { transform: 'translate(0, 0)' }], 500),
      },
    },
  },
);

export const squareChartGanttIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M9 8h7" },
    { tag: 'path', d: "M8 12h6" },
    { tag: 'path', d: "M11 16h5" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const squareCheckBigIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344" },
    { tag: 'path', d: "m9 11 3 3L22 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareCheckIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m9 12 2 2 4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0, offset: 0.33 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1, offset: 1 }], 500, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareChevronDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m16 10-4 4-4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(2px)', offset: 0.4 }, { transform: 'translateY(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
    },
  },
);

export const squareChevronLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m14 16-4-4 4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-2px)', offset: 0.4 }, { transform: 'translateX(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
    },
  },
);

export const squareChevronRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m10 8 4 4-4 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(2px)', offset: 0.4 }, { transform: 'translateX(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
    },
  },
);

export const squareChevronUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m8 14 4-4 4 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0)', offset: 0 }, { transform: 'translateY(-2px)', offset: 0.4 }, { transform: 'translateY(0)', offset: 1 }], 300, { easing: 'ease-in' }),
      },
    },
  },
);

export const squareDashedKanbanIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 7v7" },
    { tag: 'path', d: "M12 7v4" },
    { tag: 'path', d: "M16 7v9" },
    { tag: 'path', d: "M5 3a2 2 0 0 0-2 2" },
    { tag: 'path', d: "M9 3h1" },
    { tag: 'path', d: "M14 3h1" },
    { tag: 'path', d: "M19 3a2 2 0 0 1 2 2" },
    { tag: 'path', d: "M21 9v1" },
    { tag: 'path', d: "M21 14v1" },
    { tag: 'path', d: "M21 19a2 2 0 0 1-2 2" },
    { tag: 'path', d: "M14 21h1" },
    { tag: 'path', d: "M9 21h1" },
    { tag: 'path', d: "M5 21a2 2 0 0 1-2-2" },
    { tag: 'path', d: "M3 14v1" },
    { tag: 'path', d: "M3 9v1" },
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

export const squareKanbanIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M8 7v7" },
    { tag: 'path', d: "M12 7v4" },
    { tag: 'path', d: "M16 7v9" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease' }),
        2: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 100 }),
        3: /* @__PURE__ */ track([{ strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }, { strokeDasharray: '1', strokeDashoffset: '1', opacity: 0 }, { strokeDasharray: '1', strokeDashoffset: '0', opacity: 1 }], 600, { easing: 'ease', delay: 200 }),
      },
    },
  },
);

export const squareParkingOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41" },
    { tag: 'path', d: "M3 8.7V19a2 2 0 0 0 2 2h10.3" },
    { tag: 'path', d: "m2 2 20 20" },
    { tag: 'path', d: "M13 13a3 3 0 1 0 0-6H9v2" },
    { tag: 'path', d: "M9 17v-2.3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const squarePlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M8 12h8" },
    { tag: 'path', d: "M12 8v8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track([{ opacity: 0, strokeDasharray: '1', strokeDashoffset: '1', offset: 0 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '1', offset: 0.15 }, { opacity: 1, strokeDasharray: '1', strokeDashoffset: '0', offset: 1 }], 300, { easing: 'ease-out', delay: 250 }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const squareScissorsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m17 17-2.18-2.18" },
    { tag: 'path', d: "M9.56 14.44 17 7" },
    { tag: 'path', d: "M9.56 9.56 12 12" },
    { tag: 'circle', cx: 8.5, cy: 15.5, r: 1.5 },
    { tag: 'circle', cx: 8.5, cy: 8.5, r: 1.5 },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: 'ease-in-out', origin: '12px 12px' }),
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: 'ease-in-out', origin: '12px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: 'ease-in-out', origin: '12px 12px' }),
        3: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(-22deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: 'ease-in-out', origin: '12px 12px' }),
        4: /* @__PURE__ */ track([{ transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(22deg)' }, { transform: 'rotate(0deg)' }], 900, { easing: 'ease-in-out', origin: '12px 12px' }),
      },
    },
  },
);

export const squareStackIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" },
    { tag: 'path', d: "M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" },
    { tag: 'rect', width: 8, height: 8, x: 14, y: 14, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(1)' }, { transform: 'scale(0.9)' }, { transform: 'scale(1)' }], 400, { easing: 'ease', delay: 300 }),
        1: /* @__PURE__ */ track([{ transform: 'scale(1)' }, { transform: 'scale(0.9)' }, { transform: 'scale(1)' }], 400, { easing: 'ease', delay: 150 }),
        2: /* @__PURE__ */ track([{ transform: 'scale(1)' }, { transform: 'scale(0.9)' }, { transform: 'scale(1)' }], 400, { easing: 'ease' }),
      },
    },
  },
);

export const squareTerminalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m7 11 2-2-2-2" },
    { tag: 'path', d: "M11 13h4" },
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 800, { easing: 'linear' }),
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

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const textAlignCenterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 5H3" },
    { tag: 'path', d: "M17 12H7" },
    { tag: 'path', d: "M19 19H5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(3px)', offset: 0.2 }, { transform: 'translateX(-3px)', offset: 0.4 }, { transform: 'translateX(2px)', offset: 0.6 }, { transform: 'translateX(0)', offset: 1 }], 1000, { easing: 'linear' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const textCursorInputIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6" },
    { tag: 'path', d: "M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7" },
    { tag: 'path', d: "M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1" },
    { tag: 'path', d: "M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1" },
    { tag: 'path', d: "M9 6v12" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 900, { easing: 'linear' }),
        3: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 900, { easing: 'linear' }),
        4: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 900, { easing: 'linear' }),
      },
    },
  },
);

// REVISAR: mapeo por posición — su geometría diverge de Lucide 1.31.
export const textCursorIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1" },
    { tag: 'path', d: "M7 22h1a4 4 0 0 0 4-4" },
    { tag: 'path', d: "M7 2h1a4 4 0 0 1 4 4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 800, { easing: 'linear' }),
    },
  },
);

export const textSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 5H3" },
    { tag: 'path', d: "M10 12H3" },
    { tag: 'path', d: "M10 19H3" },
    { tag: 'circle', cx: 17, cy: 15, r: 3 },
    { tag: 'path', d: "m21 19-1.9-1.9" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleX(1)', offset: 0 }, { transform: 'scaleX(1)', offset: 0.25 }, { transform: 'scaleX(0.7)', offset: 0.5 }, { transform: 'scaleX(1)', offset: 1 }], 1000, { easing: EASE }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(1)', offset: 0 }, { transform: 'scaleX(1)', offset: 0.3 }, { transform: 'scaleX(0.8)', offset: 0.5 }, { transform: 'scaleX(1)', offset: 1 }], 1000, { easing: EASE, delay: 50 }),
        3: /* @__PURE__ */ track([{ transform: 'translateX(0) translateY(0)', offset: 0 }, { transform: 'translateX(0) translateY(-4px)', offset: 0.25 }, { transform: 'translateX(-3px) translateY(0)', offset: 0.5 }, { transform: 'translateX(0) translateY(0)', offset: 1 }], 1000, { easing: EASE }),
        4: /* @__PURE__ */ track([{ transform: 'translateX(0) translateY(0)', offset: 0 }, { transform: 'translateX(0) translateY(-4px)', offset: 0.25 }, { transform: 'translateX(-3px) translateY(0)', offset: 0.5 }, { transform: 'translateX(0) translateY(0)', offset: 1 }], 1000, { easing: EASE }),
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

export const userPenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11.5 15H7a4 4 0 0 0-4 4v2" },
    { tag: 'path', d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" },
    { tag: 'circle', cx: 10, cy: 7, r: 4 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'rotate(0deg) translate(0px, 0px)', offset: 0 }, { transform: 'rotate(-0.5deg) translate(-1px, 1.5px)', offset: 0.25 }, { transform: 'rotate(0.5deg) translate(1.5px, -1px)', offset: 0.75 }, { transform: 'rotate(0deg) translate(0px, 0px)', offset: 1 }], 500, { easing: EASE }),
      },
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

export const wifiOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 20h.01" },
    { tag: 'path', d: "M8.5 16.429a5 5 0 0 1 7 0" },
    { tag: 'path', d: "M5 12.859a10 10 0 0 1 5.17-2.69" },
    { tag: 'path', d: "M19 12.859a10 10 0 0 0-2.007-1.523" },
    { tag: 'path', d: "M2 8.82a15 15 0 0 1 4.177-2.643" },
    { tag: 'path', d: "M22 8.82a15 15 0 0 0-11.288-3.764" },
    { tag: 'path', d: "m2 2 20 20" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track([{ transform: 'translateX(0)', offset: 0 }, { transform: 'translateX(-7%)', offset: 0.1667 }, { transform: 'translateX(7%)', offset: 0.3333 }, { transform: 'translateX(-7%)', offset: 0.5 }, { transform: 'translateX(7%)', offset: 0.6667 }, { transform: 'translateX(0)', offset: 1 }], 600, { easing: EASE }),
    },
  },
);

export const wifiPenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 8.82a15 15 0 0 1 20 0" },
    { tag: 'path', d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" },
    { tag: 'path', d: "M5 12.859a10 10 0 0 1 10.5-2.222" },
    { tag: 'path', d: "M8.5 16.429a5 5 0 0 1 3-1.406" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 450 }),
        2: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 350 }),
        3: /* @__PURE__ */ track([{ opacity: 0 }, { opacity: 1 }], 600, { easing: 'ease', delay: 250 }),
      },
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

export const arrowDownFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 3H5" },
    { tag: 'path', d: "M12 21V7" },
    { tag: 'path', d: "m6 15 6 6 6-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownToDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v14" },
    { tag: 'path', d: "m19 9-7 7-7-7" },
    { tag: 'circle', cx: 12, cy: 21, r: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17V3" },
    { tag: 'path', d: "m6 11 6 6 6-6" },
    { tag: 'path', d: "M19 21H5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowLeftFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m9 6-6 6 6 6" },
    { tag: 'path', d: "M3 12h14" },
    { tag: 'path', d: "M21 19V5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowLeftToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 19V5" },
    { tag: 'path', d: "m13 6-6 6 6 6" },
    { tag: 'path', d: "M7 12h14" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowRightFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 5v14" },
    { tag: 'path', d: "M21 12H7" },
    { tag: 'path', d: "m15 18 6-6-6-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowRightToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 12H3" },
    { tag: 'path', d: "m11 18 6-6-6-6" },
    { tag: 'path', d: "M21 5v14" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpFromDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m5 9 7-7 7 7" },
    { tag: 'path', d: "M12 16V2" },
    { tag: 'circle', cx: 12, cy: 21, r: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m18 9-6-6-6 6" },
    { tag: 'path', d: "M12 3v14" },
    { tag: 'path', d: "M5 21h14" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpToLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 3h14" },
    { tag: 'path', d: "m18 13-6-6-6 6" },
    { tag: 'path', d: "M12 7v14" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'path', d: "m21 8-4-4-4 4" },
    { tag: 'path', d: "M17 4v16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m21 16-4 4-4-4" },
    { tag: 'path', d: "M17 20V4" },
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownNarrowWideIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'path', d: "M11 4h4" },
    { tag: 'path', d: "M11 8h7" },
    { tag: 'path', d: "M11 12h10" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 180, fill: 'backwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpNarrowWideIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M11 12h4" },
    { tag: 'path', d: "M11 16h7" },
    { tag: 'path', d: "M11 20h10" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 180, fill: 'backwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowDownWideNarrowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 16 4 4 4-4" },
    { tag: 'path', d: "M7 20V4" },
    { tag: 'path', d: "M11 4h10" },
    { tag: 'path', d: "M11 8h7" },
    { tag: 'path', d: "M11 12h4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const arrowUpWideNarrowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 8 4-4 4 4" },
    { tag: 'path', d: "M7 4v16" },
    { tag: 'path', d: "M11 12h10" },
    { tag: 'path', d: "M11 16h7" },
    { tag: 'path', d: "M11 20h4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-3px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '11px 0px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const chartAreaIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 700, { easing: 'ease-out' }),
      },
    },
  },
);

export const chartBarBigIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'rect', x: 7, y: 13, width: 9, height: 4, rx: 1 },
    { tag: 'rect', x: 7, y: 5, width: 12, height: 4, rx: 1 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '7px 0px' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '7px 0px', delay: 110, fill: 'backwards' }),
      },
    },
  },
);

export const chartBarStackedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 13v4" },
    { tag: 'path', d: "M15 5v4" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'rect', x: 7, y: 13, width: 9, height: 4, rx: 1 },
    { tag: 'rect', x: 7, y: 5, width: 12, height: 4, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 340, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '7px 0px' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleX(0.12)' }, { transform: 'scaleX(1)' }], 500, { easing: SPRING_OUT, origin: '7px 0px', delay: 110, fill: 'backwards' }),
      },
    },
  },
);

export const chartColumnStackedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 13H7" },
    { tag: 'path', d: "M19 9h-4" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'rect', x: 15, y: 5, width: 4, height: 12, rx: 1 },
    { tag: 'rect', x: 7, y: 8, width: 4, height: 9, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 340, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
        3: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 17px', delay: 110, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 17px' }),
      },
    },
  },
);

export const chartColumnBigIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'rect', x: 15, y: 5, width: 4, height: 12, rx: 1 },
    { tag: 'rect', x: 7, y: 8, width: 4, height: 9, rx: 1 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 17px', delay: 110, fill: 'backwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 17px' }),
      },
    },
  },
);

export const chartCandlestickIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 5v4" },
    { tag: 'rect', width: 4, height: 6, x: 7, y: 9, rx: 1 },
    { tag: 'path', d: "M9 15v2" },
    { tag: 'path', d: "M17 3v2" },
    { tag: 'rect', width: 4, height: 8, x: 15, y: 5, rx: 1 },
    { tag: 'path', d: "M17 13v3" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { easing: 'ease-out', delay: 380, fill: 'backwards' }),
        1: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { easing: 'ease-out', delay: 380, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { easing: 'ease-out', delay: 460, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 9px', delay: 110, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { easing: 'ease-out', delay: 460, fill: 'backwards' }),
      },
    },
  },
);

export const chartNetworkIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m13.11 7.664 1.78 2.672" },
    { tag: 'path', d: "m14.162 12.788-3.324 1.424" },
    { tag: 'path', d: "m20 4-6.06 1.515" },
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'circle', cx: 12, cy: 6, r: 2 },
    { tag: 'circle', cx: 16, cy: 12, r: 2 },
    { tag: 'circle', cx: 9, cy: 15, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 380, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 460, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '12px 6px' }),
        5: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '16px 12px', delay: 90, fill: 'backwards' }),
        6: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '9px 15px', delay: 180, fill: 'backwards' }),
      },
    },
  },
);

export const monitorCloudIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 13a3 3 0 1 1 2.83-4H14a2 2 0 0 1 0 4z" },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
    { tag: 'rect', x: 2, y: 3, width: 20, height: 14, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 520, { easing: 'ease-out' }),
      },
    },
  },
);

export const monitorDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M22 12.307V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.693" },
    { tag: 'path', d: "M8 21h8" },
    { tag: 'circle', cx: 19, cy: 6, r: 3 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '19px 6px' }),
      },
    },
  },
);

export const monitorPlayIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z" },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
    { tag: 'rect', x: 2, y: 3, width: 20, height: 14, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '13px 12px' }),
      },
    },
  },
);

export const monitorStopIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
    { tag: 'rect', x: 2, y: 3, width: 20, height: 14, rx: 2 },
    { tag: 'rect', x: 9, y: 7, width: 6, height: 6, rx: 1 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '12px 10px' }),
      },
    },
  },
);

export const monitorSmartphoneIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" },
    { tag: 'path', d: "M10 19v-3.96 3.15" },
    { tag: 'path', d: "M7 19h5" },
    { tag: 'rect', width: 6, height: 10, x: 16, y: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '19px 17px' }),
      },
    },
  },
);

export const monitorPauseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 13V7" },
    { tag: 'path', d: "M14 13V7" },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 3, rx: 2 },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 10px' }),
        1: /* @__PURE__ */ track([{ transform: 'scaleY(0.12)' }, { transform: 'scaleY(1)' }], 500, { easing: SPRING_OUT, origin: '0px 10px', delay: 90, fill: 'backwards' }),
      },
    },
  },
);

export const monitorXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m14.5 12.5-5-5" },
    { tag: 'path', d: "m9.5 12.5 5-5" },
    { tag: 'rect', width: 20, height: 14, x: 2, y: 3, rx: 2 },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 220, { easing: 'ease-out', delay: 110, fill: 'backwards' }),
      },
    },
  },
);

export const monitorSpeakerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5.5 20H8" },
    { tag: 'path', d: "M17 9h.01" },
    { tag: 'rect', width: 10, height: 16, x: 12, y: 4, rx: 2 },
    { tag: 'path', d: "M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4" },
    { tag: 'circle', cx: 17, cy: 15, r: 1 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '17px 9px', delay: 120, fill: 'backwards' }),
        4: /* @__PURE__ */ track([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 420, { easing: SPRING_OUT, origin: '17px 15px' }),
      },
    },
  },
);


// ─── Fase B: la familia square-* ──────────────────────────────────────────────────────────────
// El marco NO se mueve. Lo dictan los square-* que ya estaban curados (square-plus, square-kanban,
// square-chevron-down): el cuadro es el contenedor y animarlo le quita el punto de apoyo al gesto.
// Las flechas repiten lo de circle-arrow-*: la punta empuja y el asta encoge desde su extremo fijo.

export const squareActivityIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M17 12h-2l-2 5-2-10-2 5H7" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareArrowDownLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 15H9l6-6" },
    { tag: 'path', d: "M9 15V9" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareArrowDownRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 15 9 9" },
    { tag: 'path', d: "M9 15h6V9" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareArrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M12 8v8" },
    { tag: 'path', d: "m8 12 4 4 4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.78)' }], 240, { easing: 'ease-out', fill: 'forwards', origin: '12px 8px' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareArrowLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m12 8-4 4 4 4" },
    { tag: 'path', d: "M16 12H8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.78)' }], 240, { easing: 'ease-out', fill: 'forwards', origin: '16px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareArrowRightEnterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 16 4-4-4-4" },
    { tag: 'path', d: "M3 12h11" },
    { tag: 'path', d: "M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareArrowRightExitIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 12h11" },
    { tag: 'path', d: "m17 16 4-4-4-4" },
    { tag: 'path', d: "M21 6.344V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.344" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareArrowRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M8 12h8" },
    { tag: 'path', d: "m12 16 4-4-4-4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.78)' }], 240, { easing: 'ease-out', fill: 'forwards', origin: '8px 12px' }),
        2: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareArrowUpLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 15 9 9" },
    { tag: 'path', d: "M9 15V9h6" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-1.5px, -1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-1.5px, -1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareArrowUpRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 15V9H9" },
    { tag: 'path', d: "m9 15 6-6" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, -1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, -1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareArrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m16 12-4-4-4 4" },
    { tag: 'path', d: "M12 16V8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.78)' }], 240, { easing: 'ease-out', fill: 'forwards', origin: '12px 16px' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareAsteriskIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M12 8v8" },
    { tag: 'path', d: "m8.5 14 7-4" },
    { tag: 'path', d: "m8.5 10 7 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const squareBottomDashedScissorsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 21h1" },
    { tag: 'path', d: "m17 17-2.18-2.18" },
    { tag: 'path', d: "M5 21a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2" },
    { tag: 'path', d: "M9 21h1" },
    { tag: 'path', d: "M9.56 14.44 17 7" },
    { tag: 'path', d: "M9.56 9.56 12 12" },
    { tag: 'circle', cx: 8.5, cy: 15.5, r: 1.5 },
    { tag: 'circle', cx: 8.5, cy: 8.5, r: 1.5 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 640, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 800, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 960, fill: 'backwards' }),
      },
    },
  },
);

export const squareCodeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 9-3 3 3 3" },
    { tag: 'path', d: "m14 15 3-3-3-3" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareDashedBottomCodeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 9.5 8 12l2 2.5" },
    { tag: 'path', d: "M14 21h1" },
    { tag: 'path', d: "m14 9.5 2 2.5-2 2.5" },
    { tag: 'path', d: "M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" },
    { tag: 'path', d: "M9 21h1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
      },
    },
  },
);

export const squareDashedBottomIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2" },
    { tag: 'path', d: "M9 21h1" },
    { tag: 'path', d: "M14 21h1" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareDashedMousePointerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" },
    { tag: 'path', d: "M5 3a2 2 0 0 0-2 2" },
    { tag: 'path', d: "M19 3a2 2 0 0 1 2 2" },
    { tag: 'path', d: "M5 21a2 2 0 0 1-2-2" },
    { tag: 'path', d: "M9 3h1" },
    { tag: 'path', d: "M9 21h2" },
    { tag: 'path', d: "M14 3h1" },
    { tag: 'path', d: "M3 9v1" },
    { tag: 'path', d: "M21 9v2" },
    { tag: 'path', d: "M3 14v1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        6: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        7: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        8: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        9: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareDashedTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 21h1" },
    { tag: 'path', d: "M14 3h1" },
    { tag: 'path', d: "M19 3a2 2 0 0 1 2 2" },
    { tag: 'path', d: "M21 14v1" },
    { tag: 'path', d: "M21 19a2 2 0 0 1-2 2" },
    { tag: 'path', d: "M21 9v1" },
    { tag: 'path', d: "M3 14v1" },
    { tag: 'path', d: "M3 9v1" },
    { tag: 'path', d: "M5 21a2 2 0 0 1-2-2" },
    { tag: 'path', d: "M5 3a2 2 0 0 0-2 2" },
    { tag: 'path', d: "M7 12h10" },
    { tag: 'path', d: "M7 16h6" },
    { tag: 'path', d: "M7 8h8" },
    { tag: 'path', d: "M9 21h1" },
    { tag: 'path', d: "M9 3h1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 640, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 800, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 960, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 1120, fill: 'backwards' }),
        10: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 1280, fill: 'backwards' }),
        11: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 1440, fill: 'backwards' }),
        12: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 1600, fill: 'backwards' }),
        13: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 1760, fill: 'backwards' }),
        14: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 1920, fill: 'backwards' }),
      },
    },
  },
);

export const squareDashedTopSolidIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 21h1" },
    { tag: 'path', d: "M21 14v1" },
    { tag: 'path', d: "M21 19a2 2 0 0 1-2 2" },
    { tag: 'path', d: "M21 9v1" },
    { tag: 'path', d: "M3 14v1" },
    { tag: 'path', d: "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" },
    { tag: 'path', d: "M3 9v1" },
    { tag: 'path', d: "M5 21a2 2 0 0 1-2-2" },
    { tag: 'path', d: "M9 21h1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 480, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 640, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 800, fill: 'backwards' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 960, fill: 'backwards' }),
      },
    },
  },
);

export const squareDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 3a2 2 0 0 0-2 2" },
    { tag: 'path', d: "M19 3a2 2 0 0 1 2 2" },
    { tag: 'path', d: "M21 19a2 2 0 0 1-2 2" },
    { tag: 'path', d: "M5 21a2 2 0 0 1-2-2" },
    { tag: 'path', d: "M9 3h1" },
    { tag: 'path', d: "M9 21h1" },
    { tag: 'path', d: "M14 3h1" },
    { tag: 'path', d: "M14 21h1" },
    { tag: 'path', d: "M3 9v1" },
    { tag: 'path', d: "M21 9v1" },
    { tag: 'path', d: "M3 14v1" },
    { tag: 'path', d: "M21 14v1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 55, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 110, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 165, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 220, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 275, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 330, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 385, fill: 'backwards' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 440, fill: 'backwards' }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 495, fill: 'backwards' }),
        10: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 550, fill: 'backwards' }),
        11: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 605, fill: 'backwards' }),
      },
    },
  },
);

export const squareDivideIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'line', x1: 8, x2: 16, y1: 12, y2: 12 },
    { tag: 'line', x1: 12, x2: 12, y1: 16, y2: 16 },
    { tag: 'line', x1: 12, x2: 12, y1: 8, y2: 8 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const squareDotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);

export const squareEqualIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M7 10h10" },
    { tag: 'path', d: "M7 14h10" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareFunctionIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: "M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3" },
    { tag: 'path', d: "M9 11.2h5.7" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareLibraryIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M7 7v10" },
    { tag: 'path', d: "M11 7v10" },
    { tag: 'path', d: "m15 7 2 10" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const squareMIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareMenuIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M7 8h10" },
    { tag: 'path', d: "M7 12h10" },
    { tag: 'path', d: "M7 16h10" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const squareMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M8 12h8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareMousePointerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" },
    { tag: 'path', d: "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(1.5px, 1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareOffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M20.4 20.4a2 2 0 01-1.4.6H5a2 2 0 01-2-2V5a2 2 0 01.59-1.41" },
    { tag: 'path', d: "M21 15.3V5a2 2 0 00-2-2H8.7" },
    { tag: 'path', d: "M22 22 2 2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const squareParkingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M9 17V7h4a3 3 0 0 1 0 6H9" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);

export const squarePauseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'line', x1: 10, x2: 10, y1: 15, y2: 9 },
    { tag: 'line', x1: 14, x2: 14, y1: 15, y2: 9 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squarePercentIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "m15 9-6 6" },
    { tag: 'path', d: "M9 9h.01" },
    { tag: 'path', d: "M15 15h.01" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const squarePiIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M7 7h10" },
    { tag: 'path', d: "M10 7v10" },
    { tag: 'path', d: "M16 17a2 2 0 0 1-2-2V7" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const squarePilcrowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M12 12H9.5a2.5 2.5 0 0 1 0-5H17" },
    { tag: 'path', d: "M12 7v10" },
    { tag: 'path', d: "M16 7v10" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const squarePlayIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);

export const squarePowerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 7v4" },
    { tag: 'path', d: "M7.998 9.003a5 5 0 1 0 8-.005" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareRadicalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M7 12h2l2 5 2-10h4" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareRoundCornerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 11a8 8 0 0 0-8-8" },
    { tag: 'path', d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareSigmaIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M16 8.9V7H8l4 5-4 5h8v-1.9" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareSlashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'line', x1: 9, x2: 15, y1: 15, y2: 9 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
      },
    },
  },
);

export const squareSplitHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3" },
    { tag: 'path', d: "M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3" },
    { tag: 'line', x1: 12, x2: 12, y1: 4, y2: 20 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(-1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateX(0px)' }, { transform: 'translateX(1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareSplitVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3" },
    { tag: 'path', d: "M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3" },
    { tag: 'line', x1: 4, x2: 20, y1: 12, y2: 12 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(1.5px)' }], 240, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const squareSquareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'rect', x: 8, y: 8, width: 8, height: 8, rx: 1 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);

export const squareStarIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11.035 7.69a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);

export const squareStopIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'rect', x: 9, y: 9, width: 6, height: 6, rx: 1 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([{ transform: 'scale(0.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }], 380, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);

export const squareUserRoundIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 21a6 6 0 0 0-12 0" },
    { tag: 'circle', cx: 12, cy: 11, r: 4 },
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareUserIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'circle', cx: 12, cy: 10, r: 3 },
    { tag: 'path', d: "M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const squareXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'path', d: "m15 9-6 6" },
    { tag: 'path', d: "m9 9 6 6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const CURATED_ICONS: Record<string, AnimatedIconDef> = {
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
};
