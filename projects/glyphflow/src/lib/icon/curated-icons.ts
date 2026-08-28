import { AnimatedIconDef } from './animated-icon.model';
import { SHIELD_GEAR_SPIN, SHOOT_OFF_KEYFRAMES, TRAZO_INVERSO, X_SNAP_DRAW, lineaDespliegaYVaga, puntaCompas, astaCompas } from './icons/_shared';
import { EASE, SPRING_OUT, SPRING_SMOOTH, SPRING_SNAPPY, rotateSeq, scaleSeq, moveXSeq, moveYSeq, track, burst, strokeDraw, icon, held } from './choreography';
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









/* ── Vocabulario de las familias que viven en este archivo ──────────────────────────────────
 *
 * Van todas juntas y ARRIBA del primer icono a propósito. Repartidas junto a la familia que las
 * usa se perdieron una vez: reescribir un icono se lleva lo que haya entre él y el siguiente
 * `export const`, y ahí es donde estaban.
 */

/** El sobre de `mail` respira. */
const MAIL_BREATH = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.06)' },
  { transform: 'scale(1)' },
];

/** Los gestos de la insignia de `mail`, encadenados al trazo de la solapa. Van y VUELVEN. */
const BADGE_TURN = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(0deg)', offset: 0.35 },
  { transform: 'rotate(90deg)', offset: 0.72 },
  { transform: 'rotate(0deg)', offset: 1 },
];

const BADGE_TILT = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(0deg)', offset: 0.35 },
  { transform: 'rotate(12deg)', offset: 0.72 },
  { transform: 'rotate(0deg)', offset: 1 },
];

const BADGE_SHAKE = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(0deg)', offset: 0.35 },
  { transform: 'rotate(-9deg)', offset: 0.56 },
  { transform: 'rotate(9deg)', offset: 0.78 },
  { transform: 'rotate(0deg)', offset: 1 },
];

const BADGE_GROW = /* @__PURE__ */ [
  { transform: 'scale(1)', offset: 0 },
  { transform: 'scale(1)', offset: 0.35 },
  { transform: 'scale(1.3)', offset: 0.72 },
  { transform: 'scale(1)', offset: 1 },
];

/** El asta de la lupa sale hacia afuera. Solo 0.8: su punta ya está en (22,22) y con el grosor
 *  del trazo el borde cae en 23, así que hacia esa esquina es todo el margen que hay. */
const BADGE_PROBE = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(0, 0)', offset: 0.35 },
  { transform: 'translate(0.8px, 0.8px)', offset: 0.72 },
  { transform: 'translate(0, 0)', offset: 1 },
];

/** Las poses que la insignia SOSTIENE en `hold`: el mismo gesto sin el regreso. */
const HOLD_TURN = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(90deg)' }];
const HOLD_TILT = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(12deg)' }];
const HOLD_GROW = /* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }];
const HOLD_PROBE = /* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.8px, 0.8px)' }];

/**
 * Las cejas de `face-angry` se fruncen MÁS. Cada una gira sobre su extremo de fuera, que es el que
 * no se mueve al fruncir el ceño, y hacia el lado que baja el extremo de dentro — por eso los dos
 * signos son opuestos y no intercambiables.
 */
const FACE_BROW_LEFT = /* @__PURE__ */ [
  { transform: 'rotate(0deg)' },
  { transform: 'rotate(12deg)' },
  { transform: 'rotate(0deg)' },
];

const FACE_BROW_RIGHT = /* @__PURE__ */ [
  { transform: 'rotate(0deg)' },
  { transform: 'rotate(-12deg)' },
  { transform: 'rotate(0deg)' },
];

/** Los ojos de raya se estiran y se encogen: es todo el gesto que una cara sin expresión permite. */
const FACE_EYE_STRETCH = /* @__PURE__ */ [
  { transform: 'scaleX(1)', offset: 0 },
  { transform: 'scaleX(1.4)', offset: 0.35 },
  { transform: 'scaleX(0.6)', offset: 0.7 },
  { transform: 'scaleX(1)', offset: 1 },
];

/** La sonrisa de oreja a oreja se ensancha y vuelve. */
const FACE_GRIN = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.25)' },
  { transform: 'scale(1)' },
];

/**
 * La curva de la boca se acentúa. El pivote decide hacia dónde: puesto en el borde de arriba la
 * curva se alarga hacia abajo, y puesto en el de abajo empuja los extremos hacia arriba. Por eso
 * el mismo keyframe sirve para el ceño y para la sonrisa — lo que cambia es el `origin`.
 */
const FACE_CURVE_DEEPEN = /* @__PURE__ */ [
  { transform: 'scaleY(1)' },
  { transform: 'scaleY(1.55)' },
  { transform: 'scaleY(1)' },
];

/** La mano saluda: un vaivén corto sobre la muñeca. */
const HAND_WAVE = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(-9deg)', offset: 0.25 },
  { transform: 'rotate(9deg)', offset: 0.6 },
  { transform: 'rotate(-4deg)', offset: 0.82 },
  { transform: 'rotate(0deg)', offset: 1 },
];

/** Servir: lo que va sobre la mano se ofrece y se queda ahí. El gesto que ya usa `hand-heart`. */
const HAND_SERVE = /* @__PURE__ */ [
  { transform: 'translateY(0px) scale(1)' },
  { transform: 'translateY(-1.5px) scale(1.12)' },
];

/** Las divisiones de una tabla se corren y vuelven — la lógica de `table-cells-merge`. */
const TABLE_SHIFT = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(-1.5px, 0)', offset: 0.33 },
  { transform: 'translate(1.5px, 0)', offset: 0.66 },
  { transform: 'translate(0, 0)', offset: 1 },
];

const TABLE_SHIFT_Y = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(0, -1.5px)', offset: 0.33 },
  { transform: 'translate(0, 1.5px)', offset: 0.66 },
  { transform: 'translate(0, 0)', offset: 1 },
];

/** La pila de `layers` se abre: la de arriba se levanta y la de abajo cede. */
const LAYER_LIFT = /* @__PURE__ */ [
  { transform: 'translateY(0)' },
  { transform: 'translateY(-1.8px)' },
  { transform: 'translateY(0)' },
];

const LAYER_SINK = /* @__PURE__ */ [
  { transform: 'translateY(0)' },
  { transform: 'translateY(1.2px)' },
  { transform: 'translateY(0)' },
];

/**
 * Las flechas de `layers` llevan anticipación: sus puntas ya tocan los bordes (y=22 abajo, y=2
 * arriba), así que un desplazamiento limpio de 2 se saldría. Retrocediendo 1 primero, el recorrido
 * se lee igual y el punto extremo se queda dentro.
 */
const LAYER_ARROW_DOWN = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-1px)', offset: 0.3 },
  { transform: 'translateY(1px)', offset: 0.7 },
  { transform: 'translateY(0)', offset: 1 },
];

const LAYER_ARROW_UP = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(1px)', offset: 0.3 },
  { transform: 'translateY(-1px)', offset: 0.7 },
  { transform: 'translateY(0)', offset: 1 },
];

/** Un cuarto de vuelta y de regreso, para los signos. */
const LAYER_TURN = /* @__PURE__ */ [
  { transform: 'rotate(0deg)' },
  { transform: 'rotate(90deg)' },
  { transform: 'rotate(0deg)' },
];

/** Poses de `hold`: la pila se queda abierta y el mini icono, puesto. */
const HOLD_LIFT = /* @__PURE__ */ [{ transform: 'translateY(0)' }, { transform: 'translateY(-1.8px)' }];
const HOLD_SINK = /* @__PURE__ */ [{ transform: 'translateY(0)' }, { transform: 'translateY(1.2px)' }];
const HOLD_TURN_90 = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(90deg)' }];
const HOLD_DOWN_1 = /* @__PURE__ */ [{ transform: 'translateY(0)' }, { transform: 'translateY(1px)' }];
const HOLD_UP_1 = /* @__PURE__ */ [{ transform: 'translateY(0)' }, { transform: 'translateY(-1px)' }];

/** El auricular suena. El mismo vaivén de `phone`, aplicado a la figura y no al root: así el
 *  mini icono de cada variante no se sacude con él. */
const PHONE_RING = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(-12deg)', offset: 0.2 },
  { transform: 'rotate(10deg)', offset: 0.4 },
  { transform: 'rotate(-8deg)', offset: 0.6 },
  { transform: 'rotate(6deg)', offset: 0.8 },
  { transform: 'rotate(0deg)', offset: 1 },
];

/** Las ondas de `phone-call` salen de dentro hacia fuera. */
const PHONE_WAVE = /* @__PURE__ */ [
  { transform: 'scale(0.55)', opacity: 0, offset: 0 },
  { transform: 'scale(1)', opacity: 1, offset: 0.6 },
  { transform: 'scale(1)', opacity: 1, offset: 1 },
];

/**
 * Las flechas de `phone-*` viven en la esquina de arriba a la derecha, pegadas al borde: la punta
 * de `forwarded` termina en x=22 y con el grosor del trazo su remate cae en 23. Por eso salen 1 y
 * no más, y las diagonales reparten ese 1 entre los dos ejes.
 */
const PHONE_NUDGE_R = /* @__PURE__ */ [
  { transform: 'translateX(0)' },
  { transform: 'translateX(1px)' },
  { transform: 'translateX(0)' },
];

const PHONE_NUDGE_OUT = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(0.7px, -0.7px)' },
  { transform: 'translate(0, 0)' },
];

const PHONE_NUDGE_IN = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(-0.7px, 0.7px)' },
  { transform: 'translate(0, 0)' },
];

/**
 * El intercambio completo de `replace`. Los 11 son la distancia exacta entre los dos centros
 * —(17.5, 6.5) y (6.5, 17.5)—, así que cada cuadro aterriza clavado en el sitio del otro.
 *
 * Y cada uno rodea por un lado: el punteado baja y luego cruza, el macizo sube y luego cruza. En
 * línea recta se encontrarían en el centro y a mitad de camino el icono sería una mancha.
 */
const SWAP_LOWER = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(0, 11px)', offset: 0.22 },
  { transform: 'translate(-11px, 11px)', offset: 0.44 },
  { transform: 'translate(-11px, 11px)', offset: 0.58 },
  { transform: 'translate(0, 11px)', offset: 0.8 },
  { transform: 'translate(0, 0)', offset: 1 },
];

const SWAP_UPPER = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(0, -11px)', offset: 0.22 },
  { transform: 'translate(11px, -11px)', offset: 0.44 },
  { transform: 'translate(11px, -11px)', offset: 0.58 },
  { transform: 'translate(0, -11px)', offset: 0.8 },
  { transform: 'translate(0, 0)', offset: 1 },
];

/**
 * Los dos brazos INTERCAMBIAN su sitio de verdad. `repeat` y `repeat-2` son simétricos a 180° —la
 * punta de arriba cae exactamente sobre la de abajo, el asta sobre la otra asta—, así que media
 * vuelta deja cada flecha donde estaba su pareja y la pose final es idéntica al reposo.
 *
 * Los 9° de anticipación y el encogimiento a mitad de vuelta son el arrastre: sin ellos es la
 * manecilla de un reloj, no dos piezas que se llevan una a otra.
 *
 * Y el `scale` tampoco es adorno: la punta de `repeat` está a 11.2 del centro, así que al pasar
 * por lo alto llegaría a y=0.8 y con su propio trazo encima se saldría del lienzo de 24.
 */
const SWAP_DRAG = /* @__PURE__ */ [
  { transform: 'rotate(0deg) scale(1)', offset: 0 },
  { transform: 'rotate(9deg) scale(0.98)', offset: 0.12 },
  { transform: 'rotate(-30deg) scale(0.92)', offset: 0.34 },
  { transform: 'rotate(-104deg) scale(0.92)', offset: 0.62 },
  { transform: 'rotate(-186deg) scale(0.97)', offset: 0.86 },
  { transform: 'rotate(-180deg) scale(1)', offset: 1 },
];

/** Un rayo del spinner se apaga y vuelve. El desfase de cada uno da la vuelta. */
const SPINNER_FADE = /* @__PURE__ */ [
  { opacity: 1, offset: 0 },
  { opacity: 0.15, offset: 0.3 },
  { opacity: 1, offset: 0.7 },
  { opacity: 1, offset: 1 },
];

/** El vinilo asoma de su funda y se guarda. */
const SLEEVE_SLIDE = /* @__PURE__ */ [
  { transform: 'translateX(0)' },
  { transform: 'translateX(2px)' },
  { transform: 'translateX(0)' },
];

/** El tirador recorre su riel y vuelve. */
const SLIDER_RIGHT = /* @__PURE__ */ [
  { transform: 'translateX(0)' },
  { transform: 'translateX(3px)' },
  { transform: 'translateX(0)' },
];

const SLIDER_LEFT = /* @__PURE__ */ [
  { transform: 'translateX(0)' },
  { transform: 'translateX(-3px)' },
  { transform: 'translateX(0)' },
];

/** Lo que sale del centro hacia fuera: el sonido de un disco, una onda. */
const RIPPLE_OUT = /* @__PURE__ */ [
  { transform: 'scale(1)', offset: 0 },
  { transform: 'scale(1.12)', offset: 0.45 },
  { transform: 'scale(1)', offset: 1 },
];

/** Una vuelta entera: rota todo y termina donde empezó. */
const FULL_TURN_CW = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }];

/** Las aspas del molinete giran; el aro se queda. */
const PINWHEEL = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }];

/* ── Vocabulario de la etapa 1 de la cola larga ──────────────────────────────────────────── */

/** Un cuarto de vuelta y de regreso. Para equis y cruces: las deja donde estaban. */
const E1_TURN = /* @__PURE__ */ [
  { transform: 'rotate(0deg)' },
  { transform: 'rotate(90deg)' },
  { transform: 'rotate(0deg)' },
];

/** Aparece de golpe con un rebote corto. Para lo macizo, que un trazo no le luce. */
const E1_POP = /* @__PURE__ */ [
  { transform: 'scale(0.35)', opacity: 0 },
  { transform: 'scale(1.1)', opacity: 1 },
  { transform: 'scale(1)', opacity: 1 },
];

/** Parpadea. Para puntos suspensivos y avisos: dice "esto sigue pasando". */
const E1_BLINK = /* @__PURE__ */ [
  { opacity: 1, offset: 0 },
  { opacity: 0.15, offset: 0.35 },
  { opacity: 1, offset: 0.75 },
  { opacity: 1, offset: 1 },
];

/** Y desde el borde izquierdo. */
const E1_UNFOLD_X = /* @__PURE__ */ [{ transform: 'scaleX(0.15)' }, { transform: 'scaleX(1)' }];

/** Late una vez. */
const E1_PULSE = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.08)' },
  { transform: 'scale(1)' },
];

/**
 * Se desplaza y vuelve, con anticipación. La anticipación no es adorno: casi todo lo que se mueve
 * hacia un borde en este catálogo tiene 1 de margen, y un recorrido de 1 se ve como un temblor.
 * Retrocediendo antes, el recorrido visible se dobla sin salirse del lienzo.
 */
const E1_PUSH_RIGHT = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(-1px)', offset: 0.28 },
  { transform: 'translateX(1.5px)', offset: 0.7 },
  { transform: 'translateX(0)', offset: 1 },
];

const E1_PUSH_LEFT = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(1px)', offset: 0.28 },
  { transform: 'translateX(-1.5px)', offset: 0.7 },
  { transform: 'translateX(0)', offset: 1 },
];

const E1_PUSH_UP = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(1px)', offset: 0.28 },
  { transform: 'translateY(-1.5px)', offset: 0.7 },
  { transform: 'translateY(0)', offset: 1 },
];

const E1_PUSH_DOWN = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-1px)', offset: 0.28 },
  { transform: 'translateY(1.5px)', offset: 0.7 },
  { transform: 'translateY(0)', offset: 1 },
];

/** El pin se clava: baja de golpe y rebota. */
const E1_PIN_DROP = /* @__PURE__ */ [
  { transform: 'translateY(-2.5px)', offset: 0 },
  { transform: 'translateY(0.6px)', offset: 0.55 },
  { transform: 'translateY(-0.3px)', offset: 0.75 },
  { transform: 'translateY(0)', offset: 1 },
];

/** Las hojas de la tijera se cierran. Cada una gira sobre SU anilla, o la tijera se desarma. */
const E1_BLADE_A = /* @__PURE__ */ [
  { transform: 'rotate(0deg)' },
  { transform: 'rotate(-10deg)' },
  { transform: 'rotate(0deg)' },
];

const E1_BLADE_B = /* @__PURE__ */ [
  { transform: 'rotate(0deg)' },
  { transform: 'rotate(10deg)' },
  { transform: 'rotate(0deg)' },
];

/** Sale hacia la esquina de arriba a la derecha. */
const E1_OUT_CORNER = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(0.8px, -0.8px)' },
  { transform: 'translate(0, 0)' },
];

/** Se aparta hacia atrás, en diagonal: el gesto de mandar algo al fondo. */
const E1_TO_BACK = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(2.5px, 2.5px)' },
  { transform: 'translate(0, 0)' },
];

/** El párpado se abre. */
const E1_LID = /* @__PURE__ */ [
  { transform: 'scaleY(1)' },
  { transform: 'scaleY(0.35)' },
  { transform: 'scaleY(1)' },
];

/** La onda del "aproximadamente" ondula. */
const E1_WAVE = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-1.2px)', offset: 0.35 },
  { transform: 'translateY(1.2px)', offset: 0.7 },
  { transform: 'translateY(0)', offset: 1 },
];

/* ── Vocabulario de la etapa 2 ───────────────────────────────────────────────────────────── */

/** Un cuarto de vuelta y de regreso. */
const E2_TURN = /* @__PURE__ */ [
  { transform: 'rotate(0deg)' },
  { transform: 'rotate(90deg)' },
  { transform: 'rotate(0deg)' },
];

/** Late una vez. */
const E2_PULSE = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.08)' },
  { transform: 'scale(1)' },
];

/** Aparece de golpe con un rebote corto. */
const E2_POP = /* @__PURE__ */ [
  { transform: 'scale(0.35)', opacity: 0 },
  { transform: 'scale(1.1)', opacity: 1 },
  { transform: 'scale(1)', opacity: 1 },
];

/** Parpadea: un indicador encendido, un aviso. */
const E2_BLINK = /* @__PURE__ */ [
  { opacity: 1, offset: 0 },
  { opacity: 0.15, offset: 0.35 },
  { opacity: 1, offset: 0.75 },
  { opacity: 1, offset: 1 },
];

/** Una barra de ecualizador: se hunde y rebota. */
const E2_EQ = /* @__PURE__ */ [
  { transform: 'scaleY(1)', offset: 0 },
  { transform: 'scaleY(0.45)', offset: 0.25 },
  { transform: 'scaleY(1.15)', offset: 0.6 },
  { transform: 'scaleY(1)', offset: 1 },
];

/** Lo que cuelga se balancea sobre su punto de anclaje, no sobre su centro. */
const E2_HANG = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(-5deg)', offset: 0.25 },
  { transform: 'rotate(4deg)', offset: 0.55 },
  { transform: 'rotate(-2deg)', offset: 0.8 },
  { transform: 'rotate(0deg)', offset: 1 },
];

/** Una onda que sale hacia fuera. */
const E2_WAVE_OUT = /* @__PURE__ */ [
  { transform: 'scale(0.6)', opacity: 0, offset: 0 },
  { transform: 'scale(1)', opacity: 1, offset: 0.6 },
  { transform: 'scale(1)', opacity: 1, offset: 1 },
];

/** Una tecla se pulsa: baja y vuelve. */
const E2_KEY_PRESS = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(1.2px)', offset: 0.4 },
  { transform: 'translateY(0)', offset: 1 },
];

/** Se despliega desde su borde de arriba. */
const E2_UNFOLD_Y = /* @__PURE__ */ [{ transform: 'scaleY(0.15)' }, { transform: 'scaleY(1)' }];

/** Y desde el borde izquierdo: un pergamino que se desenrolla, una cinta que se estira. */
const E2_UNFOLD_X = /* @__PURE__ */ [{ transform: 'scaleX(0.15)' }, { transform: 'scaleX(1)' }];

/** La hoja de encima se despega de la pila. */
const E2_PEEL = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(-1.5px, 1.5px)' },
  { transform: 'translate(0, 0)' },
];

/**
 * Se desplaza y vuelve, con anticipación: casi todo lo que va hacia un borde tiene 1 de margen, y
 * un recorrido de 1 se ve como un temblor.
 */
const E2_PUSH_DOWN = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-1px)', offset: 0.28 },
  { transform: 'translateY(1.5px)', offset: 0.7 },
  { transform: 'translateY(0)', offset: 1 },
];

const E2_PUSH_UP = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(1px)', offset: 0.28 },
  { transform: 'translateY(-1.5px)', offset: 0.7 },
  { transform: 'translateY(0)', offset: 1 },
];

/** El haz de una linterna: se enciende de golpe y se sostiene un instante. */
const E2_BEAM = /* @__PURE__ */ [
  { transform: 'scaleY(0.2)', opacity: 0, offset: 0 },
  { transform: 'scaleY(1.3)', opacity: 1, offset: 0.35 },
  { transform: 'scaleY(1)', opacity: 1, offset: 1 },
];

/** Una chispa: destella y se apaga. */
const E2_SPARK = /* @__PURE__ */ [
  { transform: 'scale(0.4)', opacity: 0, offset: 0 },
  { transform: 'scale(1.15)', opacity: 1, offset: 0.4 },
  { transform: 'scale(1)', opacity: 1, offset: 0.75 },
  { transform: 'scale(1)', opacity: 1, offset: 1 },
];

/** El mango de un pincel se mece mientras pinta. */
const E2_BRUSH = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(-4deg)', offset: 0.3 },
  { transform: 'rotate(4deg)', offset: 0.65 },
  { transform: 'rotate(0deg)', offset: 1 },
];

/**
 * La claqueta: la hoja de arriba se levanta desde su bisagra y el cuerpo cede en sentido
 * contrario. Copiado en espíritu de `clapperboard`, que es el icono que ya tenía este gesto.
 */
const E2_CLAP_BODY = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(-6deg)', offset: 0.25 },
  { transform: 'rotate(-6deg)', offset: 0.7 },
  { transform: 'rotate(0deg)', offset: 1 },
];

const E2_CLAP_LID = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(0deg)', offset: 0.3 },
  { transform: 'rotate(14deg)', offset: 0.55 },
  { transform: 'rotate(0deg)', offset: 1 },
];

/**
 * El guiño: la raya del ojo se cierra a casi nada de alto y se ensancha, y lo que queda es una
 * raya horizontal. No gira — se cierra, que es como se guiña de verdad.
 *
 * Con `transform` y no con `d` a propósito: animar `d` es lo único que rompe el build aquí, y con
 * motivo medido (redibuja el path en cada cuadro, mientras esto lo mueve el compositor). El morph
 * de verdad vive en `glyphflow/morph`, que es opt-in.
 *
 * El pivote va en las opciones porque cambia con cada icono: siempre el centro de SU raya, o el
 * ojo se cerraría desplazándose.
 */
const E2_WINK = /* @__PURE__ */ [
  { transform: 'scaleY(1) scaleX(1)', offset: 0 },
  { transform: 'scaleY(0.08) scaleX(1.7)', offset: 0.35 },
  { transform: 'scaleY(0.08) scaleX(1.7)', offset: 0.6 },
  { transform: 'scaleY(1) scaleX(1)', offset: 1 },
];

/* ── Vocabulario de la etapa 3: el mundo ─────────────────────────────────────────────────── */

/** Late una vez. */
const E3_PULSE = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.08)' },
  { transform: 'scale(1)' },
];

/** Aparece de golpe con un rebote corto. */
const E3_POP = /* @__PURE__ */ [
  { transform: 'scale(0.35)', opacity: 0 },
  { transform: 'scale(1.12)', opacity: 1 },
  { transform: 'scale(1)', opacity: 1 },
];

/** Una burbuja sube y se va. Empieza abajo y con poca opacidad, como sale del líquido. */
const E3_BUBBLE = /* @__PURE__ */ [
  { transform: 'translateY(1.6px)', opacity: 0.2, offset: 0 },
  { transform: 'translateY(0)', opacity: 1, offset: 0.6 },
  { transform: 'translateY(0)', opacity: 1, offset: 1 },
];

/**
 * Ondear. Se hace con `skewX` y no con `rotate`: una bandera girando se descuelga de su asta,
 * mientras que inclinándose se deforma como la tela, que es lo que pasa de verdad.
 */
const E3_WAVE = /* @__PURE__ */ [
  { transform: 'skewX(0deg)', offset: 0 },
  { transform: 'skewX(-6deg)', offset: 0.3 },
  { transform: 'skewX(5deg)', offset: 0.65 },
  { transform: 'skewX(0deg)', offset: 1 },
];

/** Temblar corto y rápido: una fractura que cruje, una yema que se mueve. */
const E3_WOBBLE = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(-0.6px)', offset: 0.2 },
  { transform: 'translateX(0.6px)', offset: 0.4 },
  { transform: 'translateX(-0.4px)', offset: 0.6 },
  { transform: 'translateX(0)', offset: 1 },
];

/** La yema tiembla como gelatina: se deforma en los dos ejes a contratiempo. */
const E3_JIGGLE = /* @__PURE__ */ [
  { transform: 'scale(1, 1)', offset: 0 },
  { transform: 'scale(1.12, 0.9)', offset: 0.3 },
  { transform: 'scale(0.92, 1.1)', offset: 0.6 },
  { transform: 'scale(1, 1)', offset: 1 },
];

/** Un paso: la pata se levanta y vuelve. El desfase entre patas es lo que hace que camine. */
const E3_STEP = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-1.2px)', offset: 0.4 },
  { transform: 'translateY(0)', offset: 1 },
];

/** Cae y rebota: un fruto, un casco que se asienta. */
const E3_DROP = /* @__PURE__ */ [
  { transform: 'translateY(-2.5px)', offset: 0 },
  { transform: 'translateY(0.5px)', offset: 0.55 },
  { transform: 'translateY(-0.25px)', offset: 0.78 },
  { transform: 'translateY(0)', offset: 1 },
];

/** Destella: una estrella, un rayo, una chispa. */
const E3_TWINKLE = /* @__PURE__ */ [
  { transform: 'scale(0.5)', opacity: 0, offset: 0 },
  { transform: 'scale(1.2)', opacity: 1, offset: 0.4 },
  { transform: 'scale(1)', opacity: 1, offset: 1 },
];

/** Se abre desde su base: un paraguas, una espiga, un objetivo. */
const E3_UNFURL = /* @__PURE__ */ [{ transform: 'scale(0.4)' }, { transform: 'scale(1)' }];

/** Se mece colgando o apoyado, sobre el punto que se le indique. */
const E3_SWAY = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(-5deg)', offset: 0.28 },
  { transform: 'rotate(4deg)', offset: 0.62 },
  { transform: 'rotate(0deg)', offset: 1 },
];

/** El mercurio sube por el tubo, o baja. Se estira desde el bulbo, que es lo que no se mueve. */
const E3_MERCURY = /* @__PURE__ */ [
  { transform: 'scaleY(0.55)', offset: 0 },
  { transform: 'scaleY(1)', offset: 0.65 },
  { transform: 'scaleY(1)', offset: 1 },
];

/** Se desplaza y vuelve, con anticipación: sin ella el recorrido que cabe no se lee. */
const E3_GLIDE_UP = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(-0.8px, 1px)', offset: 0.28 },
  { transform: 'translate(1px, -1.4px)', offset: 0.7 },
  { transform: 'translate(0, 0)', offset: 1 },
];

const E3_GLIDE_DOWN = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(-0.8px, -1.4px)', offset: 0.28 },
  { transform: 'translate(1px, 1px)', offset: 0.7 },
  { transform: 'translate(0, 0)', offset: 1 },
];

/** Parpadea. */
const E3_BLINK = /* @__PURE__ */ [
  { opacity: 1, offset: 0 },
  { opacity: 0.15, offset: 0.35 },
  { opacity: 1, offset: 0.75 },
  { opacity: 1, offset: 1 },
];

/** Una rueda que gira sobre su eje. */
const E3_ROLL = /* @__PURE__ */ [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }];

/**
 * El nivel del líquido baja y sube: el recipiente se vacía y se vuelve a llenar. Va en la LÍNEA,
 * no en el recipiente, porque lo que se mueve es lo de dentro.
 */
const E3_LIQUID = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(2.5px)', offset: 0.35 },
  { transform: 'translateY(-2px)', offset: 0.72 },
  { transform: 'translateY(0)', offset: 1 },
];

/** Un meneo elástico de arriba abajo, con el rebote pasado de largo. */
const E3_ELASTIC_Y = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-1.8px)', offset: 0.3 },
  { transform: 'translateY(1.2px)', offset: 0.58 },
  { transform: 'translateY(-0.5px)', offset: 0.8 },
  { transform: 'translateY(0)', offset: 1 },
];

/** El mismo meneo de lado. */
const E3_ELASTIC_X = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(-1.8px)', offset: 0.3 },
  { transform: 'translateX(1.2px)', offset: 0.58 },
  { transform: 'translateX(-0.5px)', offset: 0.8 },
  { transform: 'translateX(0)', offset: 1 },
];

/**
 * Las dos rayas de `touchpad`, que se mueven ATADAS: la horizontal sube y baja 1.5, y la vertical
 * —que mide 6 y arranca en ella— se alarga y se acorta lo justo para no despegarse.
 *
 * Los factores son la cuenta, no el ojo: (6+1.5)/6 = 1.25 cuando la horizontal sube, y
 * (6−1.5)/6 = 0.75 cuando baja. Con el pivote en su base, el extremo de arriba cae clavado en
 * ella en los dos casos.
 */
const E3_PAD_ROW = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-1.5px)', offset: 0.35 },
  { transform: 'translateY(1.5px)', offset: 0.72 },
  { transform: 'translateY(0)', offset: 1 },
];

const E3_PAD_COL = /* @__PURE__ */ [
  { transform: 'translateX(0) scaleY(1)', offset: 0 },
  { transform: 'translateX(-1.5px) scaleY(1.25)', offset: 0.35 },
  { transform: 'translateX(1.5px) scaleY(0.75)', offset: 0.72 },
  { transform: 'translateX(0) scaleY(1)', offset: 1 },
];

/**
 * Aterrizaje gomoso: cae, se APLASTA al tocar, rebota estirada y se asienta. El squash & stretch
 * de siempre, y el pivote en la base es lo que lo hace legible — aplastando desde el centro
 * parecería que encoge, no que pesa.
 */
const E3_SQUASH_LAND = /* @__PURE__ */ [
  { transform: 'translateY(-3px) scale(1, 1)', offset: 0 },
  { transform: 'translateY(0) scale(1.07, 0.88)', offset: 0.42 },
  { transform: 'translateY(-0.9px) scale(0.97, 1.06)', offset: 0.62 },
  { transform: 'translateY(0) scale(1.02, 0.97)', offset: 0.82 },
  { transform: 'translateY(0) scale(1, 1)', offset: 1 },
];

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
/** La flecha baja y se queda ahí mientras dure el hover. Asta y punta comparten el track: si solo
 *  bajara una, la punta se despegaría del asta. */
const DOWNLOAD_DIP = /* @__PURE__ */ [{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }];

export const downloadIcon: AnimatedIconDef = /* @__PURE__ */ icon(downloadShapes, {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 550),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 2, 0]), 550),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(DOWNLOAD_DIP, 320, { easing: SPRING_SNAPPY, fill: 'forwards' }),
        2: /* @__PURE__ */ track(DOWNLOAD_DIP, 320, { easing: SPRING_SNAPPY, fill: 'forwards' }),
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
    hold: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, -2px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0, 0)' }, { transform: 'translate(2px, -2px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
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
/** Crece y vuelve. Sin `origin`: en el root el centro por defecto ya es el del viewBox. */
const BAN_POP = /* @__PURE__ */ [
  { transform: 'scale(1)', offset: 0 },
  { transform: 'scale(1.15)', offset: 0.45 },
  { transform: 'scale(1)', offset: 1 },
];

export const banIcon: AnimatedIconDef = /* @__PURE__ */ icon(banShapes, {
    default: {
      root: /* @__PURE__ */ track(BAN_POP, 520, { easing: EASE }),
      shapes: { 1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { delay: 180, fill: 'backwards' }) },
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
      0: /* @__PURE__ */ track(/* @__PURE__ */ puntaCompas('X', 1, 1.5, 1.5), 560),
      1: /* @__PURE__ */ track(/* @__PURE__ */ astaCompas('X', 12, 1.5, 1.5), 560, { origin: '9px 12px' }),
    },
  },
  nudge: {
    shapes: {
      0: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(0)' }], 400),
      1: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.75)' }, { transform: 'scaleX(1)' }], 400, { origin: '9px 12px' }),
    },
  },
  hold: {
    shapes: {
      0: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(1.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      1: /* @__PURE__ */ track([{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.125)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '9px 12px' }),
    },
    reverseOnLeave: true,
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
/** La barra de título se traza desde el borde izquierdo; el `origin` de ese extremo va en las
 *  opciones, porque es dónde está la figura y no parte del gesto. */
const APP_WINDOW_BAR = /* @__PURE__ */ [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }];

export const appWindowIcon: AnimatedIconDef = /* @__PURE__ */ icon(appWindowShapes, {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(APP_WINDOW_BAR, 300, { easing: SPRING_OUT, origin: '2px 8px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 240, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { delay: 330, fill: 'backwards' }),
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
    shapes: {
      0: /* @__PURE__ */ track(E2_UNFOLD_Y, 520, { easing: SPRING_OUT, origin: '12px 16px', delay: 100, fill: 'backwards' }),
      1: /* @__PURE__ */ track(E2_UNFOLD_X, 420, { easing: SPRING_OUT, origin: '12px 16px' }),
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

/** Aparece al separarse las mitades y baja con el cuerpo, cerrándole el borde que le falta. */
const ARCHIVE_SEAL = /* @__PURE__ */ [
  { opacity: 0, transform: 'translateY(0px)' },
  { opacity: 1, transform: 'translateY(2px)' },
];

export const archiveIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 20, height: 5, x: 2, y: 3, rx: 1 },
    { tag: 'path', d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" },
    { tag: 'path', d: "M10 12h4" },
    // Figura de más respecto a Lucide, y a propósito: ver ARCHIVE_SEAL y FIGURAS_ANEXAS.
    { tag: 'path', d: "M4 8h16", opacity: '0' },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(-2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        2: /* @__PURE__ */ track([{ transform: 'translateY(0px)' }, { transform: 'translateY(2px)' }], 200, { easing: 'ease-in', fill: 'forwards' }),
        3: /* @__PURE__ */ track(ARCHIVE_SEAL, 200, { easing: 'ease-in', fill: 'forwards' }),
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
        0: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(3px, 3px)' }], 320, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
        1: /* @__PURE__ */ track([{ transform: 'translate(0px, 0px)' }, { transform: 'translate(-3px, -3px)' }], 320, { easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', fill: 'forwards' }),
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
      root: /* @__PURE__ */ track(MAIL_BREATH, 500, { easing: EASE, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 500, { easing: 'ease-out', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(BADGE_GROW, 900, { easing: EASE, origin: '19px 19px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '19px 19px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
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

/** Una barra del ecualizador: se hunde y rebota. El desfase entre barras lo pone cada `delay`. */
const AUDIO_EQ_BAR = /* @__PURE__ */ [
  { transform: 'scaleY(1)', offset: 0 },
  { transform: 'scaleY(0.45)', offset: 0.25 },
  { transform: 'scaleY(1.15)', offset: 0.6 },
  { transform: 'scaleY(1)', offset: 1 },
];

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
        4: /* @__PURE__ */ track(AUDIO_EQ_BAR, 700, { easing: EASE, origin: '2px 11.5px' }),
        7: /* @__PURE__ */ track(AUDIO_EQ_BAR, 700, { easing: EASE, origin: '6px 11.5px', delay: 80, fill: 'backwards' }),
        0: /* @__PURE__ */ track(AUDIO_EQ_BAR, 700, { easing: EASE, origin: '10px 12px', delay: 160, fill: 'backwards' }),
        1: /* @__PURE__ */ track(AUDIO_EQ_BAR, 700, { easing: EASE, origin: '14px 11.2px', delay: 240, fill: 'backwards' }),
        3: /* @__PURE__ */ track(AUDIO_EQ_BAR, 700, { easing: EASE, origin: '18px 9.1px', delay: 320, fill: 'backwards' }),
        5: /* @__PURE__ */ track(AUDIO_EQ_BAR, 700, { easing: EASE, origin: '22px 11.5px', delay: 400, fill: 'backwards' }),
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
        0: /* @__PURE__ */ track(E2_BRUSH, 700, { easing: EASE, origin: '15px 12px', delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(E2_PULSE, 560, { easing: EASE, origin: '6px 18px' }),
        3: /* @__PURE__ */ track(E2_PULSE, 560, { easing: EASE, origin: '18px 16px', delay: 180, fill: 'backwards' }),
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
export * from './icons/corner';
import { cornerDownLeftIcon, cornerDownRightIcon, cornerLeftDownIcon, cornerLeftUpIcon, cornerRightDownIcon, cornerRightUpIcon, cornerUpLeftIcon, cornerUpRightIcon } from './icons/corner';
export * from './icons/trending';
import { trendingUpIcon, trendingDownIcon, trendingUpDownIcon } from './icons/trending';
export * from './icons/undo';
import { undoIcon, undo2Icon, undoDotIcon } from './icons/undo';
export * from './icons/rows';
import { rows2Icon, rows3Icon, rows4Icon } from './icons/rows';
export * from './icons/panels';
import { panelsLeftBottomIcon, panelsRightBottomIcon, panelsTopLeftIcon } from './icons/panels';
export * from './icons/rectangle';
import { rectangleHorizontalIcon, rectangleVerticalIcon, rectangleEllipsisIcon, rectangleCircleIcon, rectangleGogglesIcon } from './icons/rectangle';
export * from './icons/squares';
import { squaresUniteIcon, squaresIntersectIcon, squaresSubtractIcon, squaresExcludeIcon } from './icons/squares';
export * from './icons/heading';
import { headingIcon, heading1Icon, heading2Icon, heading3Icon, heading4Icon, heading5Icon, heading6Icon } from './icons/heading';
export * from './icons/case';
import { caseUpperIcon, caseLowerIcon, caseSensitiveIcon } from './icons/case';
export * from './icons/pilcrow';
import { pilcrowIcon, pilcrowLeftIcon, pilcrowRightIcon } from './icons/pilcrow';
export * from './icons/chess';
import { chessKingIcon, chessQueenIcon, chessRookIcon, chessBishopIcon, chessKnightIcon, chessPawnIcon } from './icons/chess';
export * from './icons/gamepad';
import { gamepadIcon, gamepad2Icon, gamepadDirectionalIcon } from './icons/gamepad';
export * from './icons/test';
import { testTubeIcon, testTubesIcon, testTubeDiagonalIcon } from './icons/test';
export * from './icons/wallet';
import { walletIcon, walletCardsIcon, walletMinimalIcon } from './icons/wallet';
export * from './icons/tree';
import { treeDeciduousIcon, treePineIcon, treePalmIcon } from './icons/tree';
export * from './icons/plug';
import { plugIcon, plug2Icon, plugZapIcon } from './icons/plug';
export * from './icons/lamp';
import { lampIcon, lampFloorIcon, lampCeilingIcon, lampWallDownIcon, lampWallUpIcon, lampDeskIcon } from './icons/lamp';
export * from './icons/bed';
import { bedIcon, bedDoubleIcon, bedSingleIcon } from './icons/bed';
export * from './icons/door';
import { doorClosedIcon, doorOpenIcon, doorClosedLockedIcon } from './icons/door';
export * from './icons/car';
import { carIcon, carFrontIcon, carTaxiFrontIcon } from './icons/car';
export * from './icons/lens';
import { lensConcaveIcon, lensConvexIcon } from './icons/lens';
export * from './icons/brick-wall';
import { brickWallIcon, brickWallFireIcon, brickWallShieldIcon } from './icons/brick-wall';
export * from './icons/line';
import { lineStyleIcon, lineSquiggleIcon, lineDotRightHorizontalIcon } from './icons/line';
export * from './icons/picture-in-picture';
import { pictureInPictureIcon, pictureInPicture2Icon } from './icons/picture-in-picture';
export * from './icons/scale';
import { scaleIcon, scale3dIcon } from './icons/scale';
export * from './icons/weight';
import { weightIcon, weightTildeIcon } from './icons/weight';
export * from './icons/waves';
import { wavesHorizontalIcon, wavesVerticalIcon, wavesArrowUpIcon, wavesArrowDownIcon, wavesLadderIcon } from './icons/waves';
export * from './icons/wind';
import { windIcon, windArrowDownIcon } from './icons/wind';
export * from './icons/zodiac';
import { zodiacAriesIcon, zodiacTaurusIcon, zodiacGeminiIcon, zodiacCancerIcon, zodiacLeoIcon, zodiacVirgoIcon, zodiacLibraIcon, zodiacScorpioIcon, zodiacSagittariusIcon, zodiacCapricornIcon, zodiacAquariusIcon, zodiacPiscesIcon, zodiacOphiuchusIcon } from './icons/zodiac';
export * from './icons/ruler';
import { rulerIcon, rulerDimensionLineIcon } from './icons/ruler';
export * from './icons/fishing';
import { fishingHookIcon, fishingRodIcon } from './icons/fishing';
export * from './icons/paint';
import { paintBucketIcon, paintRollerIcon } from './icons/paint';
export * from './icons/flower';
import { flowerIcon, flower2Icon } from './icons/flower';
export * from './icons/ice-cream';
import { iceCreamBowlIcon, iceCreamConeIcon } from './icons/ice-cream';
export * from './icons/utensils';
import { utensilsIcon, utensilsCrossedIcon } from './icons/utensils';
export * from './icons/tent';
import { tentIcon, tentTreeIcon } from './icons/tent';
export * from './icons/train';
import { trainFrontIcon, trainFrontTunnelIcon, trainTrackIcon } from './icons/train';
export * from './icons/align';
import { alignStartHorizontalIcon, alignEndHorizontalIcon, alignStartVerticalIcon, alignEndVerticalIcon, alignCenterHorizontalIcon, alignCenterVerticalIcon, alignHorizontalJustifyStartIcon, alignHorizontalJustifyEndIcon, alignHorizontalJustifyCenterIcon, alignVerticalJustifyStartIcon, alignVerticalJustifyEndIcon, alignVerticalJustifyCenterIcon, alignHorizontalDistributeStartIcon, alignHorizontalDistributeEndIcon, alignHorizontalDistributeCenterIcon, alignVerticalDistributeStartIcon, alignVerticalDistributeEndIcon, alignVerticalDistributeCenterIcon, alignHorizontalSpaceBetweenIcon, alignVerticalSpaceBetweenIcon, alignHorizontalSpaceAroundIcon, alignVerticalSpaceAroundIcon } from './icons/align';
export * from './icons/square';
import { squareActivityIcon, squareArrowDownLeftIcon, squareArrowDownRightIcon, squareArrowDownIcon, squareArrowLeftIcon, squareArrowRightEnterIcon, squareArrowRightExitIcon, squareArrowRightIcon, squareArrowUpLeftIcon, squareArrowUpRightIcon, squareArrowUpIcon, squareAsteriskIcon, squareBottomDashedScissorsIcon, squareCodeIcon, squareDashedBottomCodeIcon, squareDashedBottomIcon, squareDashedMousePointerIcon, squareDashedTextIcon, squareDashedTopSolidIcon, squareDashedIcon, squareDivideIcon, squareDotIcon, squareEqualIcon, squareFunctionIcon, squareLibraryIcon, squareMIcon, squareMenuIcon, squareMinusIcon, squareMousePointerIcon, squareOffIcon, squareParkingIcon, squarePauseIcon, squarePercentIcon, squarePiIcon, squarePilcrowIcon, squarePlayIcon, squarePowerIcon, squareRadicalIcon, squareRoundCornerIcon, squareSigmaIcon, squareSlashIcon, squareSplitHorizontalIcon, squareSplitVerticalIcon, squareSquareIcon, squareStarIcon, squareStopIcon, squareUserRoundIcon, squareUserIcon, squareXIcon, squareArrowOutDownLeftIcon, squareArrowOutDownRightIcon, squareArrowOutUpLeftIcon, squareArrowOutUpRightIcon, squareChartGanttIcon, squareCheckBigIcon, squareCheckIcon, squareChevronDownIcon, squareChevronLeftIcon, squareChevronRightIcon, squareChevronUpIcon, squareDashedKanbanIcon, squareKanbanIcon, squareParkingOffIcon, squarePlusIcon, squareScissorsIcon, squareStackIcon, squareTerminalIcon, squarePenIcon, squareCenterlineDashedHorizontalIcon, squareCenterlineDashedVerticalIcon, squareIcon } from './icons/square';
export * from './icons/arrow';
import { arrowDownFromLineIcon, arrowDownToDotIcon, arrowDownToLineIcon, arrowLeftFromLineIcon, arrowLeftToLineIcon, arrowRightFromLineIcon, arrowRightToLineIcon, arrowUpFromDotIcon, arrowUpFromLineIcon, arrowUpToLineIcon, arrowDownUpIcon, arrowUpDownIcon, arrowDownNarrowWideIcon, arrowUpNarrowWideIcon, arrowDownWideNarrowIcon, arrowUpWideNarrowIcon, arrowBigDownDashIcon, arrowBigDownIcon, arrowBigLeftDashIcon, arrowBigLeftIcon, arrowBigRightDashIcon, arrowBigRightIcon, arrowBigUpDashIcon, arrowBigUpIcon, arrowDown01Icon, arrowDown10Icon, arrowDownAZIcon, arrowDownZAIcon, arrowLeftRightIcon, arrowRightLeftIcon, arrowUp01Icon, arrowUp10Icon, arrowUpAZIcon, arrowUpZAIcon, arrowLeftIcon, arrowRightIcon, arrowUpIcon, arrowDownIcon, arrowUpLeftIcon, arrowUpRightIcon, arrowDownLeftIcon, arrowDownRightIcon } from './icons/arrow';
export * from './icons/file';
import { fileAxis3dIcon, fileBracesCornerIcon, fileBracesIcon, fileCodeCornerIcon, fileCodeIcon, fileCogIcon, fileImageIcon, fileInputIcon, fileMinusCornerIcon, filePlayIcon, filePlusCornerIcon, fileSearchCornerIcon, fileSearchIcon, fileSignalIcon, fileTypeCornerIcon, fileTypeIcon, fileUserIcon, fileXCornerIcon, fileChartColumnIncreasingIcon, fileChartColumnIcon, fileChartLineIcon, fileDownIcon, fileMinusIcon, filePenIcon, filePlusIcon, fileQuestionMarkIcon, fileSlidersIcon, fileTerminalIcon, fileUpIcon, fileTextIcon, fileCheckIcon, fileXIcon, fileIcon, fileCheckCornerIcon, fileSpreadsheetIcon, fileBadgeIcon, fileExclamationPointIcon, fileArchiveIcon, fileBoxIcon, fileChartPieIcon, fileClockIcon, fileDiffIcon, fileDigitIcon, fileHeadphoneIcon, fileHeartIcon, fileKeyIcon, fileLockIcon, fileMusicIcon, fileOutputIcon, filePenLineIcon, fileScanIcon, fileStackIcon, fileSymlinkIcon, fileVideoCameraIcon, fileVolumeIcon } from './icons/file';
export * from './icons/circle';
import { circleDotIcon, circleEuroIcon, circleMinusIcon, circleParkingIcon, circlePlayIcon, circlePoundSterlingIcon, circleSlash2Icon, circleSlashIcon, circleStarIcon, circleStopIcon, circleArrowDownIcon, circleArrowLeftIcon, circleArrowOutDownLeftIcon, circleArrowOutDownRightIcon, circleArrowOutUpLeftIcon, circleArrowOutUpRightIcon, circleArrowRightIcon, circleArrowUpIcon, circleCheckBigIcon, circleChevronDownIcon, circleChevronLeftIcon, circleChevronRightIcon, circleChevronUpIcon, circleOffIcon, circleParkingOffIcon, circleAlertIcon, circleCheckIcon, circleXIcon, circlePlusIcon, circleQuestionMarkIcon, circleIcon, circleSmallIcon, circleEqualIcon, circleDivideIcon, circleEllipsisIcon, circleDollarSignIcon, circlePercentIcon, circlePauseIcon, circlePowerIcon, circleGaugeIcon, circleUserIcon, circleUserRoundIcon, circlePileIcon, circleDashedIcon, circleDotDashedIcon, circleFadingPlusIcon, circleFadingArrowUpIcon } from './icons/circle';
export * from './icons/folder';
import { folderIcon, folderOpenIcon, folderArchiveIcon, folderBookmarkIcon, folderCheckIcon, folderClockIcon, folderClosedIcon, folderCodeIcon, folderCogIcon, folderDotIcon, folderDownIcon, folderGit2Icon, folderGitIcon, folderHeartIcon, folderInputIcon, folderKanbanIcon, folderKeyIcon, folderLockIcon, folderMinusIcon, folderOpenDotIcon, folderOutputIcon, folderPenIcon, folderPlusIcon, folderRootIcon, folderSearch2Icon, folderSearchIcon, folderSymlinkIcon, folderSyncIcon, folderTreeIcon, folderUpIcon, folderXIcon } from './icons/folder';
export * from './icons/chart';
import { chartAreaIcon, chartBarBigIcon, chartBarStackedIcon, chartColumnStackedIcon, chartColumnBigIcon, chartCandlestickIcon, chartNetworkIcon, chartBarDecreasingIcon, chartBarIncreasingIcon, chartBarIcon, chartColumnDecreasingIcon, chartColumnIncreasingIcon, chartGanttIcon, chartLineIcon, chartNoAxesColumnDecreasingIcon, chartNoAxesColumnIncreasingIcon, chartNoAxesColumnIcon, chartNoAxesCombinedIcon, chartNoAxesGanttIcon, chartPieIcon, chartScatterIcon, chartSplineIcon, chartColumnIcon } from './icons/chart';
export * from './icons/book';
import { bookAIcon, bookAudioIcon, bookCheckIcon, bookDashedIcon, bookDownIcon, bookHeadphonesIcon, bookHeartIcon, bookImageIcon, bookKeyIcon, bookLockIcon, bookMarkedIcon, bookMinusIcon, bookOpenCheckIcon, bookOpenTextIcon, bookPlusIcon, bookTextIcon, bookTypeIcon, bookUp2Icon, bookUpIcon, bookUserIcon, bookXIcon, bookIcon, bookOpenIcon, bookAlertIcon, bookCopyIcon, bookSearchIcon } from './icons/book';
export * from './icons/calendar';
import { calendarIcon, calendarCheckIcon, calendarClockIcon, calendarDaysIcon, calendar1Icon, calendarArrowDownIcon, calendarArrowUpIcon, calendarCheck2Icon, calendarCogIcon, calendarFoldIcon, calendarHeartIcon, calendarMinus2Icon, calendarMinusIcon, calendarOffIcon, calendarPlus2Icon, calendarPlusIcon, calendarRangeIcon, calendarSearchIcon, calendarSyncIcon, calendarX2Icon, calendarXIcon } from './icons/calendar';
export * from './icons/panel';
import { panelLeftIcon, panelLeftCloseIcon, panelLeftOpenIcon, panelRightIcon, panelRightCloseIcon, panelRightOpenIcon, panelTopIcon, panelTopCloseIcon, panelTopOpenIcon, panelBottomIcon, panelBottomCloseIcon, panelBottomOpenIcon, panelLeftDashedIcon, panelRightDashedIcon, panelTopDashedIcon, panelBottomDashedIcon, panelTopBottomDashedIcon, panelLeftRightDashedIcon } from './icons/panel';
export * from './icons/git';
import { gitBranchMinusIcon, gitPullRequestArrowIcon, gitPullRequestCreateArrowIcon, gitPullRequestDraftIcon, gitForkIcon, gitBranchIcon, gitBranchPlusIcon, gitCommitHorizontalIcon, gitCommitVerticalIcon, gitCompareIcon, gitCompareArrowsIcon, gitGraphIcon, gitMergeConflictIcon, gitMergeIcon, gitPullRequestIcon, gitPullRequestClosedIcon, gitPullRequestCreateIcon } from './icons/git';
export * from './icons/user';
import { userPenIcon, userIcon, userCheckIcon, userMinusIcon, userPlusIcon, userXIcon, userCogIcon, userRoundIcon, userRoundArrowLeftIcon, userRoundCheckIcon, userRoundCogIcon, userRoundKeyIcon, userRoundMinusIcon, userRoundPenIcon, userRoundPlusIcon, userRoundSearchIcon, userRoundXIcon, userKeyIcon, userLockIcon, userSearchIcon, userShieldIcon, userStarIcon } from './icons/user';
export * from './icons/badge';
import { badgeIcon, badgeCheckIcon, badgeAlertIcon, badgeCentIcon, badgeDollarSignIcon, badgeEuroIcon, badgeIndianRupeeIcon, badgeInfoIcon, badgeJapaneseYenIcon, badgeMinusIcon, badgePercentIcon, badgePlusIcon, badgePoundSterlingIcon, badgeQuestionMarkIcon, badgeRussianRubleIcon, badgeSwissFrancIcon, badgeTurkishLiraIcon, badgeXIcon } from './icons/badge';
export * from './icons/monitor';
import { monitorCloudIcon, monitorDotIcon, monitorPlayIcon, monitorStopIcon, monitorSmartphoneIcon, monitorPauseIcon, monitorXIcon, monitorSpeakerIcon, monitorCheckIcon, monitorCogIcon, monitorDownIcon, monitorOffIcon, monitorUpIcon, monitorIcon } from './icons/monitor';
export * from './icons/shield';
import { shieldQuestionMarkIcon, shieldCheckIcon, shieldBanIcon, shieldCogIcon, shieldHalfIcon, shieldKeyholeIcon, shieldLockIcon, shieldMinusIcon, shieldPlusIcon, shieldUserIcon, shieldXIcon, shieldIcon, shieldAlertIcon, shieldOffIcon, shieldCogCornerIcon, shieldEllipsisIcon } from './icons/shield';
export * from './icons/clock';
import { clock1Icon, clock10Icon, clock11Icon, clock12Icon, clock2Icon, clock3Icon, clock5Icon, clock6Icon, clock7Icon, clock8Icon, clock9Icon, clockArrowRightIcon, clockIcon, clock4Icon, clockAlertIcon, clockArrowDownIcon, clockArrowLeftIcon, clockArrowUpIcon, clockCheckIcon, clockFadingIcon, clockPlusIcon } from './icons/clock';
export * from './icons/map';
import { mapPinOffIcon, mapPinIcon, mapPinCheckIcon, mapPinCheckInsideIcon, mapPinHouseIcon, mapPinMinusIcon, mapPinMinusInsideIcon, mapPinPlusIcon, mapPinPlusInsideIcon, mapPinSearchIcon, mapPinXIcon, mapPinXInsideIcon, mapIcon, mapMinusIcon, mapPinPenIcon, mapPinnedIcon, mapPlusIcon } from './icons/map';
export * from './icons/message';
import { messageCircleCheckIcon, messageCircleHeartIcon, messageSquareCheckIcon, messageSquareHeartIcon, messageCircleMoreIcon, messageCircleOffIcon, messageCircleQuestionMarkIcon, messageCircleWarningIcon, messageCircleIcon, messageSquareMoreIcon, messageSquareOffIcon, messageSquareIcon, messageCircleCodeIcon, messageCirclePlusIcon, messageCircleXIcon, messageCircleReplyIcon, messageCircleDashedIcon, messageSquareCodeIcon, messageSquarePlusIcon, messageSquareXIcon, messageSquareReplyIcon, messageSquareQuoteIcon, messageSquareTextIcon, messageSquareDiffIcon, messageSquareShareIcon, messageSquareWarningIcon, messageSquareDotIcon, messageSquareLockIcon, messageSquareDashedIcon } from './icons/message';
export * from './icons/clipboard';
import { clipboardIcon, clipboardCheckIcon, clipboardClockIcon, clipboardCopyIcon, clipboardListIcon, clipboardMinusIcon, clipboardPasteIcon, clipboardPenLineIcon, clipboardPenIcon, clipboardPlusIcon, clipboardTypeIcon, clipboardXIcon } from './icons/clipboard';
export * from './icons/move';
import { moveIcon, moveDiagonal2Icon, moveDiagonalIcon, moveDownLeftIcon, moveDownRightIcon, moveDownIcon, moveHorizontalIcon, moveLeftIcon, moveRightIcon, moveUpLeftIcon, moveUpRightIcon, moveUpIcon, moveVerticalIcon, move3dIcon } from './icons/move';
export * from './icons/scan';
import { scanIcon, scanBarcodeIcon, scanEyeIcon, scanFaceIcon, scanHeartIcon, scanLineIcon, scanQrCodeIcon, scanSearchIcon, scanSquareIcon, scanTextIcon, scanBoxIcon } from './icons/scan';
export * from './icons/mouse';
import { mousePointerClickIcon, mousePointerIcon, mousePointer2Icon, mousePointer2OffIcon, mousePointerBanIcon, mouseIcon, mouseLeftIcon, mouseOffIcon, mouseRightIcon } from './icons/mouse';
export * from './icons/chevrons';
import { chevronsDownUpIcon, chevronsDownIcon, chevronsLeftRightIcon, chevronsLeftIcon, chevronsRightLeftIcon, chevronsRightIcon, chevronsUpIcon, chevronsUpDownIcon, chevronsLeftRightEllipsisIcon } from './icons/chevrons';
export * from './icons/heart';
import { heartIcon, heartPulseIcon, heartCrackIcon, heartHandshakeIcon, heartMinusIcon, heartOffIcon, heartPlusIcon, heartXIcon } from './icons/heart';
export * from './icons/image';
import { imageIcon, imageOffIcon, imageDownIcon, imageMinusIcon, imagePlayIcon, imagePlusIcon, imageUpIcon, imageUpscaleIcon } from './icons/image';
export * from './icons/cloud';
import { cloudIcon, cloudCogIcon, cloudMoonRainIcon, cloudSunRainIcon, cloudDownloadIcon, cloudMoonIcon, cloudOffIcon, cloudUploadIcon, cloudCheckIcon, cloudAlertIcon, cloudLightningIcon, cloudRainIcon, cloudDrizzleIcon, cloudRainWindIcon, cloudHailIcon, cloudSnowIcon, cloudFogIcon, cloudSunIcon, cloudSyncIcon, cloudBackupIcon } from './icons/cloud';
export * from './icons/bell';
import { bellIcon, bellRingIcon, bellCheckIcon, bellDotIcon, bellMinusIcon, bellOffIcon, bellPlusIcon, bellElectricIcon } from './icons/bell';
export * from './icons/package';
import { packageIcon, packageCheckIcon, packageMinusIcon, packageOpenIcon, packagePlusIcon, packageXIcon, packageSearchIcon, package2Icon } from './icons/package';
export * from './icons/ticket';
import { ticketIcon, ticketCheckIcon, ticketMinusIcon, ticketPercentIcon, ticketPlusIcon, ticketSlashIcon, ticketXIcon } from './icons/ticket';
export * from './icons/layout';
import { layoutDashboardIcon, layoutGridIcon, layoutPanelLeftIcon, layoutPanelTopIcon, layoutListIcon, layoutTemplateIcon, layoutFreeformIcon } from './icons/layout';
export * from './icons/star';
import { starIcon, starCheckIcon, starHalfIcon, starMinusIcon, starOffIcon, starPlusIcon, starXIcon } from './icons/star';
export * from './icons/list';
import { listFilterPlusIcon, listTreeIcon, listCheckIcon, listTodoIcon, listIcon, listChecksIcon, listChevronsDownUpIcon, listChevronsUpDownIcon, listCollapseIcon, listIndentDecreaseIcon, listIndentIncreaseIcon, listMinusIcon, listPlusIcon, listXIcon, listEndIcon, listStartIcon, listRestartIcon, listMusicIcon, listVideoIcon, listOrderedIcon, listFilterIcon, listSortAscendingIcon, listSortDescendingIcon } from './icons/list';
export * from './icons/battery';
import { batteryChargingIcon, batteryFullIcon, batteryLowIcon, batteryMediumIcon, batteryWarningIcon, batteryIcon, batteryPlusIcon } from './icons/battery';
export * from './icons/dice';
import { dice1Icon, dice2Icon, dice3Icon, dice4Icon, dice5Icon, dice6Icon } from './icons/dice';
export * from './icons/wifi';
import { wifiOffIcon, wifiPenIcon, wifiIcon, wifiHighIcon, wifiLowIcon, wifiZeroIcon, wifiCogIcon, wifiSyncIcon } from './icons/wifi';
export * from './icons/copy';
import { copyIcon, copyCheckIcon, copyMinusIcon, copyPlusIcon, copySlashIcon, copyXIcon } from './icons/copy';
export * from './icons/save';
import { saveIcon, saveCheckIcon, saveOffIcon, savePenIcon, savePlusIcon, saveAllIcon } from './icons/save';
export * from './icons/bookmark';
import { bookmarkIcon, bookmarkCheckIcon, bookmarkMinusIcon, bookmarkOffIcon, bookmarkPlusIcon, bookmarkXIcon } from './icons/bookmark';
export * from './icons/sticky';
import { stickyNoteIcon, stickyNoteCheckIcon, stickyNoteMinusIcon, stickyNoteOffIcon, stickyNotePlusIcon, stickyNoteXIcon, stickyNotesIcon } from './icons/sticky';
export * from './icons/globe';
import { globeIcon, globeCheckIcon, globeLockIcon, globeOffIcon, globeXIcon } from './icons/globe';
export * from './icons/alarm';
import { alarmClockIcon, alarmClockCheckIcon, alarmClockMinusIcon, alarmClockOffIcon, alarmClockPlusIcon, alarmSmokeIcon } from './icons/alarm';
export * from './icons/server';
import { serverIcon, serverCogIcon, serverCrashIcon, serverOffIcon, serverPlusIcon } from './icons/server';
export * from './icons/volume';
import { volume2Icon, volumeIcon, volume1Icon, volumeOffIcon, volumeXIcon } from './icons/volume';
export * from './icons/signal';
import { signalIcon, signalHighIcon, signalMediumIcon, signalLowIcon, signalZeroIcon } from './icons/signal';
export * from './icons/tally';
import { tally1Icon, tally2Icon, tally3Icon, tally4Icon, tally5Icon } from './icons/tally';
export * from './icons/receipt';
import { receiptJapaneseYenIcon, receiptPoundSterlingIcon, receiptTurkishLiraIcon, receiptIcon, receiptCentIcon, receiptEuroIcon, receiptIndianRupeeIcon, receiptRussianRubleIcon, receiptSwissFrancIcon, receiptTextIcon } from './icons/receipt';
export * from './icons/between';
import { betweenHorizontalEndIcon, betweenHorizontalStartIcon, betweenVerticalEndIcon, betweenVerticalStartIcon } from './icons/between';
export * from './icons/gallery';
import { galleryHorizontalEndIcon, galleryHorizontalIcon, galleryVerticalEndIcon, galleryVerticalIcon, galleryThumbnailsIcon } from './icons/gallery';
export * from './icons/refresh';
import { refreshCcwDotIcon, refreshCcwIcon, refreshCwOffIcon, refreshCwIcon } from './icons/refresh';
export * from './icons/rotate';
import { rotateCcwKeyIcon, rotateCcwClockIcon, rotateCcwIcon, rotateCwIcon, rotate3dIcon, rotateCcwSquareIcon, rotateCwFadingClockIcon, rotateCwSquareIcon } from './icons/rotate';
export * from './icons/text';
import { textAlignCenterIcon, textCursorInputIcon, textCursorIcon, textSearchIcon, textAlignEndIcon, textAlignJustifyIcon, textAlignStartIcon, textInitialIcon, textQuoteIcon, textWrapIcon } from './icons/text';
export * from './icons/chevron';
import { chevronRightIcon, chevronDownIcon, chevronLeftIcon, chevronUpIcon, chevronFirstIcon, chevronLastIcon } from './icons/chevron';
export * from './icons/search';
import { searchIcon, searchCheckIcon, searchSlashIcon, searchXIcon, searchAlertIcon, searchCodeIcon } from './icons/search';
export * from './icons/grid';
import { grid2x2Icon, grid2x2CheckIcon, grid2x2PlusIcon, grid2x2XIcon, grid3x2Icon, grid3x3Icon } from './icons/grid';
export * from './icons/database';
import { databaseCheckIcon, databaseMinusIcon, databaseIcon, databaseArrowDownIcon, databaseArrowUpIcon, databaseBackupIcon, databasePlusIcon, databaseSearchIcon, databaseXIcon, databaseZapIcon } from './icons/database';
export * from './icons/house';
import { houseHeartIcon, houseWifiIcon, houseIcon, housePlugIcon, housePlusIcon } from './icons/house';
export * from './icons/lock';
import { lockKeyholeOpenIcon, lockOpenIcon, lockIcon, lockKeyholeIcon } from './icons/lock';
export * from './icons/notebook';
import { notebookIcon, notebookTabsIcon, notebookTextIcon, notebookPenIcon } from './icons/notebook';
export * from './icons/radio';
import { radioOffIcon, radioTowerIcon, radioIcon, radioReceiverIcon } from './icons/radio';
export * from './icons/smartphone';
import { smartphoneChargingIcon, smartphoneNfcIcon, smartphoneIcon } from './icons/smartphone';
export * from './icons/briefcase';
import { briefcaseBusinessIcon, briefcaseMedicalIcon, briefcaseIcon, briefcaseConveyorBeltIcon } from './icons/briefcase';
export * from './icons/grip';
import { gripHorizontalIcon, gripIcon, gripVerticalIcon } from './icons/grip';
export * from './icons/hard';
import { hardDriveDownloadIcon, hardDriveUploadIcon, hardDriveIcon, hardHatIcon } from './icons/hard';
export * from './icons/key';
import { keySquareIcon, keyIcon, keyRoundIcon } from './icons/key';
export * from './icons/link';
import { link2OffIcon, linkIcon, link2Icon } from './icons/link';
export * from './icons/navigation';
import { navigation2OffIcon, navigationOffIcon, navigationIcon, navigation2Icon } from './icons/navigation';
export * from './icons/pen';
import { penOffIcon, penIcon, penLineIcon, penToolIcon } from './icons/pen';
export * from './icons/pencil';
import { pencilLineIcon, pencilOffIcon, pencilIcon, pencilRulerIcon, pencilSparklesIcon } from './icons/pencil';

/**
 * El repertorio de la cola larga. Tres gestos y sus variantes, compartidos por 150 iconos: uno
 * por icono habría sido 150 formas distintas de decir lo mismo.
 */

/** Lo que sale hacia fuera: una onda, una señal. Crece desde dentro. */
const WAVE_OUT = /* @__PURE__ */ [
  { transform: 'scale(0.55)', opacity: 0, offset: 0 },
  { transform: 'scale(1)', opacity: 1, offset: 0.65 },
  { transform: 'scale(1)', opacity: 1, offset: 1 },
];

/** La cápsula del micrófono late mientras capta. */
const MIC_PULSE = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(1.09)' },
  { transform: 'scale(1)' },
];

/** El arco del micrófono se abre para escuchar. */
const MIC_LISTEN = /* @__PURE__ */ [
  { transform: 'scaleX(1)' },
  { transform: 'scaleX(1.12)' },
  { transform: 'scaleX(1)' },
];

/** El cable del micrófono de mano se mece. */
const MIC_SWAY = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(-5deg)', offset: 0.3 },
  { transform: 'rotate(4deg)', offset: 0.65 },
  { transform: 'rotate(0deg)', offset: 1 },
];

/** Una barra de ecualizador: se hunde y rebota. El desfase entre barras lo pone cada `delay`. */
const EQ_BAR = /* @__PURE__ */ [
  { transform: 'scaleY(1)', offset: 0 },
  { transform: 'scaleY(0.45)', offset: 0.25 },
  { transform: 'scaleY(1.15)', offset: 0.6 },
  { transform: 'scaleY(1)', offset: 1 },
];

/** Los tres botones se encienden en fila, como los de una ventana de verdad. */
export const appWindowMacIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 2, y: 4, width: 20, height: 16, rx: 2 },
    { tag: 'path', d: "M6 8h.01" },
    { tag: 'path', d: "M10 8h.01" },
    { tag: 'path', d: "M14 8h.01" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(E1_POP, 340, { easing: EASE, origin: '6px 8px' }),
        2: /* @__PURE__ */ track(E1_POP, 340, { easing: EASE, origin: '10px 8px', delay: 90, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E1_POP, 340, { easing: EASE, origin: '14px 8px', delay: 180, fill: 'backwards' }),
      },
    },
  },
);

/** La flecha sube a sacar lo archivado: punta y asta juntas. */
export const archiveRestoreIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 2, y: 3, width: 20, height: 5, rx: 1 },
    { tag: 'path', d: "M4 8v11a2 2 0 0 0 2 2h2" },
    { tag: 'path', d: "M20 8v11a2 2 0 0 1-2 2h-2" },
    { tag: 'path', d: "m9 15 3-3 3 3" },
    { tag: 'path', d: "M12 12v9" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PULSE, 500, { easing: EASE, origin: 'center', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E1_PUSH_UP, 620, { easing: EASE }),
        4: /* @__PURE__ */ track(E1_PUSH_UP, 620, { easing: EASE }),
      },
    },
  },
);

/** Ecualizador: las seis barras se hunden y rebotan de izquierda a derecha. */
export const audioLinesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 10v3" },
    { tag: 'path', d: "M6 6v11" },
    { tag: 'path', d: "M10 3v18" },
    { tag: 'path', d: "M14 8v7" },
    { tag: 'path', d: "M18 5v13" },
    { tag: 'path', d: "M22 10v3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_EQ, 700, { easing: EASE, origin: '2px 11.5px' }),
        1: /* @__PURE__ */ track(E2_EQ, 700, { easing: EASE, origin: '6px 11.5px', delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_EQ, 700, { easing: EASE, origin: '10px 12px', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E2_EQ, 700, { easing: EASE, origin: '14px 11.5px', delay: 240, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E2_EQ, 700, { easing: EASE, origin: '18px 11.5px', delay: 320, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E2_EQ, 700, { easing: EASE, origin: '22px 11.5px', delay: 400, fill: 'backwards' }),
      },
    },
  },
);

/** Una sola pieza: la onda se estira a lo alto, que es lo que hace una onda. */
export const audioWaveformIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_EQ, 700, { easing: EASE, origin: '12px 12px' }),
      },
    },
  },
);

/** El billete late y la flecha baja, punta y asta juntas. */
export const banknoteArrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" },
    { tag: 'path', d: "m16 19 3 3 3-3" },
    { tag: 'path', d: "M18 12h.01" },
    { tag: 'path', d: "M19 16v6" },
    { tag: 'path', d: "M6 12h.01" },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PULSE, 480, { easing: EASE, origin: 'center' }),
        1: /* @__PURE__ */ track(E2_PUSH_DOWN, 620, { easing: EASE, delay: 220, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E2_PUSH_DOWN, 620, { easing: EASE, delay: 220, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E2_POP, 340, { easing: EASE, origin: '12px 12px', delay: 140, fill: 'backwards' }),
      },
    },
  },
);

/** Y aquí la flecha sube. */
export const banknoteArrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" },
    { tag: 'path', d: "M18 12h.01" },
    { tag: 'path', d: "M19 22v-6" },
    { tag: 'path', d: "m22 19-3-3-3 3" },
    { tag: 'path', d: "M6 12h.01" },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PULSE, 480, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track(E2_PUSH_UP, 620, { easing: EASE, delay: 220, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E2_PUSH_UP, 620, { easing: EASE, delay: 220, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E2_POP, 340, { easing: EASE, origin: '12px 12px', delay: 140, fill: 'backwards' }),
      },
    },
  },
);

/** La equis gira un cuarto de vuelta al lado del billete. */
export const banknoteXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" },
    { tag: 'path', d: "m17 17 5 5" },
    { tag: 'path', d: "M18 12h.01" },
    { tag: 'path', d: "m22 17-5 5" },
    { tag: 'path', d: "M6 12h.01" },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PULSE, 480, { easing: EASE, origin: 'center' }),
        1: /* @__PURE__ */ track(E2_TURN, 600, { easing: EASE, origin: '19.5px 19.5px', delay: 220, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E2_TURN, 600, { easing: EASE, origin: '19.5px 19.5px', delay: 220, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E2_POP, 340, { easing: EASE, origin: '12px 12px', delay: 140, fill: 'backwards' }),
      },
    },
  },
);

/** La semilla late: es lo único que una pieza sola permite. */
export const beanIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z",
    },
    { tag: 'path', d: "M5.341 10.62a4 4 0 1 0 5.279-5.28" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_POP, 320, { easing: EASE, origin: '10px 7px', delay: 160, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E3_PULSE, 520, { easing: EASE, origin: 'center' }),
      },
    },
  },
);

export const beefIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3",
    },
    {
      tag: 'path',
      d: "m18.5 6 2.19 4.5a6.48 6.48 0 0 1-2.29 7.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5",
    },
    { tag: 'circle', cx: 12.5, cy: 8.5, r: 2.5 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_PULSE, 500, { easing: EASE, origin: 'center' }),
        1: /* @__PURE__ */ track(E3_PULSE, 500, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track(E3_POP, 340, { easing: EASE, origin: '12.5px 8.5px', delay: 200, fill: 'backwards' }),
      },
    },
  },
);

export const beerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 11h1a3 3 0 0 1 0 6h-1" },
    { tag: 'path', d: "M9 12v6" },
    { tag: 'path', d: "M13 12v6" },
    {
      tag: 'path',
      d: "M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z",
    },
    { tag: 'path', d: "M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_PULSE, 460, { easing: EASE, origin: '18px 14px', delay: 200, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E3_BUBBLE, 620, { easing: EASE, delay: 140, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E3_BUBBLE, 620, { easing: EASE, delay: 240, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E3_JIGGLE, 560, { easing: EASE, origin: '11px 8px', delay: 60, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E3_PULSE, 460, { easing: EASE, origin: 'center' }),
      },
    },
  },
);

export const bluetoothIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m7 7 10 10-5 5V2l5 5L7 17" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PULSE, 500, { easing: EASE, origin: 'center' }),
      },
    },
  },
);

/** Las dos marcas parpadean: hay enlace. */
export const bluetoothConnectedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m7 7 10 10-5 5V2l5 5L7 17" },
    { tag: 'line', x1: 18, y1: 12, x2: 21, y2: 12 },
    { tag: 'line', x1: 3, y1: 12, x2: 6, y2: 12 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PULSE, 500, { easing: EASE, origin: 'center' }),
        1: /* @__PURE__ */ track(E2_BLINK, 700, { easing: EASE, delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_BLINK, 700, { easing: EASE, delay: 160, fill: 'backwards' }),
      },
    },
  },
);

/** La onda sale del punto hacia fuera: está buscando. */
export const bluetoothSearchingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m7 7 10 10-5 5V2l5 5L7 17" },
    { tag: 'path', d: "M20.83 14.83a4 4 0 0 0 0-5.66" },
    { tag: 'path', d: "M18 12h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PULSE, 500, { easing: EASE, origin: 'center' }),
        1: /* @__PURE__ */ track(E2_WAVE_OUT, 520, { easing: EASE, origin: '18px 12px', delay: 280, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_POP, 320, { easing: EASE, origin: '18px 12px', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

/** La fractura cruje: el hueso tiembla y las marcas destellan. */
export const boneFractureIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M14 4.5a1 1 0 0 1 5 0 .5.5 0 0 0 .5.5 1 1 0 0 1 0 5c-.81 0-1.8-.7-2.5 0l-1.958 1.957a.15.15 0 0 1-.252-.072l-.493-2.07a.15.15 0 0 0-.111-.112l-2.072-.494a.15.15 0 0 1-.072-.252L14 7c.7-.7 0-1.69 0-2.5",
    },
    { tag: 'path', d: "m16 20-1-2" },
    { tag: 'path', d: "m20 16-2-1" },
    { tag: 'path', d: "m4 8 2 1" },
    { tag: 'path', d: "m8 4 1 2" },
    {
      tag: 'path',
      d: "M9.698 14.19a.15.15 0 0 0 .112.112l2.074.489a.15.15 0 0 1 .072.252L10 17c-.7.7 0 1.69 0 2.5a1 1 0 0 1-5 0 .495.495 0 0 0-.5-.5 1 1 0 0 1 0-5c.81 0 1.8.7 2.5 0l1.956-1.957a.15.15 0 0 1 .252.072z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_WOBBLE, 560, { easing: EASE }),
        1: /* @__PURE__ */ track(E3_TWINKLE, 320, { easing: EASE, origin: '15.5px 19px', delay: 320, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E3_TWINKLE, 320, { easing: EASE, origin: '19px 15.5px', delay: 400, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E3_TWINKLE, 320, { easing: EASE, origin: '5px 8.5px', delay: 240, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E3_TWINKLE, 320, { easing: EASE, origin: '8.5px 5px', delay: 160, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E3_WOBBLE, 560, { easing: EASE }),
      },
    },
  },
);

export const botIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 8V4H8" },
    { tag: 'rect', x: 4, y: 8, width: 16, height: 12, rx: 2 },
    { tag: 'path', d: "M2 14h2" },
    { tag: 'path', d: "M20 14h2" },
    { tag: 'path', d: "M15 13v2" },
    { tag: 'path', d: "M9 13v2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PUSH_UP, 600, { easing: EASE }),
        4: /* @__PURE__ */ track(E2_WINK, 760, { easing: EASE, origin: '15px 14px', delay: 180, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_POP, 300, { easing: 'ease-out', origin: '3px 14px', delay: 340, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E2_POP, 300, { easing: 'ease-out', origin: '21px 14px', delay: 400, fill: 'backwards' }),
      },
    },
  },
);

/** El mismo guiño, con la burbuja latiendo debajo. */
export const botMessageSquareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6V2H8" },
    { tag: 'path', d: "M15 11v2" },
    { tag: 'path', d: "M2 12h2" },
    { tag: 'path', d: "M20 12h2" },
    { tag: 'path', d: "M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" },
    { tag: 'path', d: "M9 11v2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PUSH_UP, 600, { easing: EASE }),
        1: /* @__PURE__ */ track(E2_WINK, 760, { easing: EASE, origin: '15px 12px', delay: 180, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E2_PULSE, 480, { easing: EASE, origin: 'center', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const brainIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 18V5" },
    { tag: 'path', d: "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" },
    { tag: 'path', d: "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" },
    { tag: 'path', d: "M17.997 5.125a4 4 0 0 1 2.526 5.77" },
    { tag: 'path', d: "M18 18a4 4 0 0 0 2-7.464" },
    { tag: 'path', d: "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" },
    { tag: 'path', d: "M6 18a4 4 0 0 1-2-7.464" },
    { tag: 'path', d: "M6.003 5.125a4 4 0 0 0-2.526 5.77" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(E2_PULSE, 500, { easing: EASE, origin: '12px 11px', delay: 380, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E2_PULSE, 620, { easing: EASE, origin: '19px 8px', delay: 200, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E2_PULSE, 620, { easing: EASE, origin: '19px 14px', delay: 200, fill: 'backwards' }),
        6: /* @__PURE__ */ track(E2_PULSE, 620, { easing: EASE, origin: '6px 14px' }),
        7: /* @__PURE__ */ track(E2_PULSE, 620, { easing: EASE, origin: '5px 8px' }),
      },
    },
  },
);

/** Los nodos del circuito se encienden en cadena: una señal recorriéndolo. */
export const brainCircuitIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
    },
    { tag: 'path', d: "M9 13a4.5 4.5 0 0 0 3-4" },
    { tag: 'path', d: "M6.003 5.125A3 3 0 0 0 6.401 6.5" },
    { tag: 'path', d: "M3.477 10.896a4 4 0 0 1 .585-.396" },
    { tag: 'path', d: "M6 18a4 4 0 0 1-1.967-.516" },
    { tag: 'path', d: "M12 13h4" },
    { tag: 'path', d: "M12 18h6a2 2 0 0 1 2 2v1" },
    { tag: 'path', d: "M12 8h8" },
    { tag: 'path', d: "M16 8V5a2 2 0 0 1 2-2" },
    { tag: 'circle', cx: 16, cy: 13, r: 0.5 },
    { tag: 'circle', cx: 18, cy: 3, r: 0.5 },
    { tag: 'circle', cx: 20, cy: 21, r: 0.5 },
    { tag: 'circle', cx: 20, cy: 8, r: 0.5 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PULSE, 560, { easing: EASE, origin: '9px 12px' }),
        9: /* @__PURE__ */ track(E2_SPARK, 420, { easing: EASE, origin: '16px 13px', delay: 400, fill: 'backwards' }),
        10: /* @__PURE__ */ track(E2_SPARK, 420, { easing: EASE, origin: '18px 3px', delay: 200, fill: 'backwards' }),
        11: /* @__PURE__ */ track(E2_SPARK, 420, { easing: EASE, origin: '20px 21px', delay: 500, fill: 'backwards' }),
        12: /* @__PURE__ */ track(E2_SPARK, 420, { easing: EASE, origin: '20px 8px', delay: 300, fill: 'backwards' }),
      },
    },
  },
);

/** Camina: las patas se levantan en alternancia, no todas a la vez. */
export const bugIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 20v-9" },
    { tag: 'path', d: "M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" },
    { tag: 'path', d: "M14.12 3.88 16 2" },
    { tag: 'path', d: "M21 21a4 4 0 0 0-3.81-4" },
    { tag: 'path', d: "M21 5a4 4 0 0 1-3.55 3.97" },
    { tag: 'path', d: "M22 13h-4" },
    { tag: 'path', d: "M3 21a4 4 0 0 1 3.81-4" },
    { tag: 'path', d: "M3 5a4 4 0 0 0 3.55 3.97" },
    { tag: 'path', d: "M6 13H2" },
    { tag: 'path', d: "m8 2 1.88 1.88" },
    { tag: 'path', d: "M9 7.13V6a3 3 0 1 1 6 0v1.13" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(E3_PULSE, 460, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track(E3_SWAY, 640, { easing: EASE, origin: '12px 7px' }),
        3: /* @__PURE__ */ track(E3_STEP, 560, { easing: EASE, delay: 220, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E3_STEP, 560, { easing: EASE, delay: 100, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E3_STEP, 560, { easing: EASE, delay: 340, fill: 'backwards' }),
        6: /* @__PURE__ */ track(E3_STEP, 560, { easing: EASE, delay: 100, fill: 'backwards' }),
        7: /* @__PURE__ */ track(E3_STEP, 560, { easing: EASE, delay: 220, fill: 'backwards' }),
        8: /* @__PURE__ */ track(E3_STEP, 560, { easing: EASE, delay: 340, fill: 'backwards' }),
        9: /* @__PURE__ */ track(E3_SWAY, 640, { easing: EASE, origin: '12px 7px' }),
      },
    },
  },
);

export const cableCarIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 3h.01" },
    { tag: 'path', d: "M14 2h.01" },
    { tag: 'path', d: "m2 9 20-5" },
    { tag: 'path', d: "M12 12V6.5" },
    { tag: 'rect', x: 4, y: 12, width: 16, height: 10, rx: 3 },
    { tag: 'path', d: "M9 12v5" },
    { tag: 'path', d: "M15 12v5" },
    { tag: 'path', d: "M4 17h16" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(E2_HANG, 720, { easing: EASE, origin: '12px 9px' }),
        4: /* @__PURE__ */ track(E2_HANG, 720, { easing: EASE, origin: '12px 9px' }),
        5: /* @__PURE__ */ track(E2_HANG, 720, { easing: EASE, origin: '12px 9px' }),
        6: /* @__PURE__ */ track(E2_HANG, 720, { easing: EASE, origin: '12px 9px' }),
        7: /* @__PURE__ */ track(E2_HANG, 720, { easing: EASE, origin: '12px 9px' }),
      },
    },
  },
);

/** La cereza rebota encima y las capas responden. */
export const cakeSliceIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 13H3" },
    { tag: 'path', d: "M16 17H3" },
    {
      tag: 'path',
      d: "m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6",
    },
    { tag: 'circle', cx: 9, cy: 7, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_POP, 300, { easing: EASE, origin: '9.5px 13px', delay: 240, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E3_POP, 300, { easing: EASE, origin: '9.5px 17px', delay: 300, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E3_PULSE, 460, { easing: EASE, origin: 'center' }),
        3: /* @__PURE__ */ track(E3_DROP, 620, { easing: EASE, delay: 120, fill: 'backwards' }),
      },
    },
  },
);

/** El caramelo se retuerce: los dos extremos giran en sentidos opuestos. */
export const candyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 7v10.9" },
    { tag: 'path', d: "M14 6.1V17" },
    {
      tag: 'path',
      d: "M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4",
    },
    {
      tag: 'path',
      d: "M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07",
    },
    {
      tag: 'path',
      d: "M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_BLINK, 600, { easing: EASE, delay: 180, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E3_BLINK, 600, { easing: EASE, delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E3_SWAY, 640, { easing: EASE, origin: '16px 5px', delay: 120, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E3_PULSE, 460, { easing: EASE, origin: 'center' }),
        4: /* @__PURE__ */ track(E3_SWAY, 640, { easing: EASE, origin: '8px 19px', delay: 220, fill: 'backwards' }),
      },
    },
  },
);

/** Las rayas recorren el bastón de abajo arriba. */
export const candyCaneIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10.8 5 2.111 4.223" },
    { tag: 'path', d: "M17.75 7 15 2.1" },
    { tag: 'path', d: "m4.874 14.647 2.12 4.24" },
    {
      tag: 'path',
      d: "M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2z",
    },
    { tag: 'path', d: "m7.906 9.712 2.005 4.411" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 380, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 140, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E3_PULSE, 460, { easing: EASE, origin: 'center' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 220, fill: 'backwards' }),
      },
    },
  },
);

/** Las hojas se mecen sobre el tallo, que se queda quieto. */
export const cannabisIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 22v-4" },
    {
      tag: 'path',
      d: "M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_PULSE, 400, { easing: EASE, origin: '12px 20px', delay: 180, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E3_SWAY, 700, { easing: EASE, origin: '12px 18px' }),
      },
    },
  },
);

export const captionsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 5, width: 18, height: 14, rx: 2, ry: 2 },
    { tag: 'path', d: "M7 15h4M15 15h2M7 11h2M13 11h4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PULSE, 460, { easing: EASE, origin: 'center' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out', delay: 180, fill: 'backwards' }),
      },
    },
  },
);

export const checkLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M20 4L9 15" },
    { tag: 'path', d: "M21 19L3 19" },
    { tag: 'path', d: "M9 15L4 10" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E1_UNFOLD_X, 420, { easing: SPRING_OUT, origin: '3px 19px', delay: 420, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out' }),
      },
    },
  },
);

/** El humo sube ondulando por encima. */
export const cigaretteIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14" },
    { tag: 'path', d: "M18 8c0-2.5-2-2.5-2-5" },
    { tag: 'path', d: "M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" },
    { tag: 'path', d: "M22 8c0-2.5-2-2.5-2-5" },
    { tag: 'path', d: "M7 12v4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_PULSE, 440, { easing: EASE, origin: 'center' }),
        1: /* @__PURE__ */ track(E3_BUBBLE, 640, { easing: EASE, delay: 200, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E3_POP, 300, { easing: EASE, origin: '21px 14px', delay: 160, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E3_BUBBLE, 640, { easing: EASE, delay: 300, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E3_POP, 280, { easing: EASE, origin: '7px 14px', delay: 120, fill: 'backwards' }),
      },
    },
  },
);

export const columns2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M12 3v18" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ lineaDespliegaYVaga('Y', 'X', 3, 0), 1200, { origin: '12px 3px', delay: 120, fill: 'backwards' }),
      },
    },
  },
);

/** Las dos divisiones, una tras otra. */
export const columns3Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M9 3v18" },
    { tag: 'path', d: "M15 3v18" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ lineaDespliegaYVaga('Y', 'X', 2.2, 0), 1200, { origin: '9px 3px', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ lineaDespliegaYVaga('Y', 'X', 2.2, 2), 1200, { origin: '15px 3px', delay: 210, fill: 'backwards' }),
      },
    },
  },
);

/** Y las tres, de izquierda a derecha. */
export const columns4Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M7.5 3v18" },
    { tag: 'path', d: "M12 3v18" },
    { tag: 'path', d: "M16.5 3v18" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ lineaDespliegaYVaga('Y', 'X', 1.6, 0), 1200, { origin: '7.5px 3px', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ lineaDespliegaYVaga('Y', 'X', 1.6, 1), 1200, { origin: '12px 3px', delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ lineaDespliegaYVaga('Y', 'X', 1.6, 2), 1200, { origin: '16.5px 3px', delay: 280, fill: 'backwards' }),
      },
    },
  },
);

/** Una sola pieza: late. */
export const diamondIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PULSE, 500, { easing: EASE, origin: 'center' }),
      },
    },
  },
);

/** El diamante late y el menos se pone de canto. */
export const diamondMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z",
    },
    { tag: 'path', d: "M8 12h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PULSE, 500, { easing: EASE, origin: 'center' }),
        1: /* @__PURE__ */ track(E2_TURN, 600, { easing: EASE, origin: '12px 12px', delay: 180, fill: 'backwards' }),
      },
    },
  },
);

/** La diagonal parte el diamante y los dos ceros caen a sus lados. */
export const diamondPercentIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z",
    },
    { tag: 'path', d: "M9.2 9.2h.01" },
    { tag: 'path', d: "m14.5 9.5-5 5" },
    { tag: 'path', d: "M14.7 14.8h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PULSE, 500, { easing: EASE, origin: 'center' }),
        1: /* @__PURE__ */ track(E2_POP, 320, { easing: EASE, origin: '9.2px 9.2px', delay: 380, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E2_POP, 320, { easing: EASE, origin: '14.7px 14.8px', delay: 460, fill: 'backwards' }),
      },
    },
  },
);

export const discIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(RIPPLE_OUT, 700, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(RIPPLE_OUT, 700, { easing: EASE, origin: '12px 12px', delay: 140, fill: 'backwards' }),
      },
    },
  },
);

/** El sonido sale del eje hacia el borde. */
export const disc2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'circle', cx: 12, cy: 12, r: 4 },
    { tag: 'path', d: "M12 12h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(RIPPLE_OUT, 700, { easing: EASE, origin: '12px 12px', delay: 240, fill: 'backwards' }),
        1: /* @__PURE__ */ track(RIPPLE_OUT, 700, { easing: EASE, origin: '12px 12px', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(RIPPLE_OUT, 700, { easing: EASE, origin: '12px 12px' }),
      },
    },
  },
);

/** El vinilo asoma de su funda y se guarda. */
export const discAlbumIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'circle', cx: 12, cy: 12, r: 5 },
    { tag: 'path', d: "M12 12h.01" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(SLEEVE_SLIDE, 700, { easing: EASE }),
        2: /* @__PURE__ */ track(SLEEVE_SLIDE, 700, { easing: EASE }),
      },
    },
  },
);

/** La hélice se enciende de abajo arriba: los travesaños, uno tras otro. */
export const dnaIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 16 1.5 1.5" },
    { tag: 'path', d: "m14 8-1.5-1.5" },
    { tag: 'path', d: "M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" },
    { tag: 'path', d: "m16.5 10.5 1 1" },
    { tag: 'path', d: "m17 6-2.891-2.891" },
    { tag: 'path', d: "M2 15c6.667-6 13.333 0 20-6" },
    { tag: 'path', d: "m20 9 .891.891" },
    { tag: 'path', d: "M3.109 14.109 4 15" },
    { tag: 'path', d: "m6.5 12.5 1 1" },
    { tag: 'path', d: "m7 18 2.891 2.891" },
    { tag: 'path', d: "M9 22c1.798-1.998 2.518-3.995 2.807-5.993" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_TWINKLE, 340, { easing: EASE, origin: '10.7px 16.7px', delay: 120, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E3_TWINKLE, 340, { easing: EASE, origin: '13.2px 7.2px', delay: 440, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E3_TWINKLE, 340, { easing: EASE, origin: '17px 11px', delay: 360, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E3_TWINKLE, 340, { easing: EASE, origin: '15.5px 4.5px', delay: 680, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E3_PULSE, 500, { easing: EASE, origin: 'center' }),
        6: /* @__PURE__ */ track(E3_TWINKLE, 340, { easing: EASE, origin: '20.4px 9.4px', delay: 520, fill: 'backwards' }),
        7: /* @__PURE__ */ track(E3_TWINKLE, 340, { easing: EASE, origin: '3.5px 14.5px', delay: 280, fill: 'backwards' }),
        8: /* @__PURE__ */ track(E3_TWINKLE, 340, { easing: EASE, origin: '7px 13px', delay: 200, fill: 'backwards' }),
        9: /* @__PURE__ */ track(E3_TWINKLE, 340, { easing: EASE, origin: '8.4px 19.4px', delay: 600, fill: 'backwards' }),
        10: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 280, fill: 'backwards' }),
      },
    },
  },
);

/** Una sola pieza: late como una gota a punto de caer. */
export const dropletIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_PULSE, 520, { easing: EASE, origin: '12px 16px' }),
      },
    },
  },
);

/** Escucha: el interior pulsa y el pabellón responde. */
export const earIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" },
    { tag: 'path', d: "M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_PULSE, 480, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(E3_PULSE, 480, { easing: EASE, origin: '12px 10px', delay: 140, fill: 'backwards' }),
      },
    },
  },
);

export const eggIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_SWAY, 700, { easing: EASE, origin: '12px 22px' }),
      },
    },
  },
);

/** La yema tiembla como gelatina; la clara aguanta. */
export const eggFriedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 11.5, cy: 12.5, r: 3.5 },
    {
      tag: 'path',
      d: "M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_JIGGLE, 620, { easing: EASE, origin: '11.5px 12.5px', delay: 140, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E3_PULSE, 460, { easing: EASE, origin: 'center' }),
      },
    },
  },
);

export const equalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'line', x1: 5, y1: 9, x2: 19, y2: 9 },
    { tag: 'line', x1: 5, y1: 15, x2: 19, y2: 15 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_UNFOLD_X, 440, { easing: SPRING_OUT, origin: '12px 9px' }),
        1: /* @__PURE__ */ track(E1_UNFOLD_X, 440, { easing: SPRING_OUT, origin: '12px 15px', delay: 100, fill: 'backwards' }),
      },
    },
  },
);

/** Aquí las rayas ondulan: aproximadamente, no exactamente. */
export const equalApproximatelyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0" },
    { tag: 'path', d: "M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_WAVE, 700, { easing: EASE, delay: 120, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E1_WAVE, 700, { easing: EASE }),
      },
    },
  },
);

/** El párpado se cierra del todo y las pestañas se abren en abanico. */
export const eyeClosedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m15 18-.722-3.25" },
    { tag: 'path', d: "M2 8a10.645 10.645 0 0 0 20 0" },
    { tag: 'path', d: "m20 15-1.726-2.05" },
    { tag: 'path', d: "m4 15 1.726-2.05" },
    { tag: 'path', d: "m9 18 .722-3.25" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_POP, 320, { easing: EASE, origin: '14.6px 16.4px', delay: 320, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E1_LID, 600, { easing: EASE, origin: '12px 8px' }),
        2: /* @__PURE__ */ track(E1_POP, 320, { easing: EASE, origin: '19.1px 13.9px', delay: 380, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E1_POP, 320, { easing: EASE, origin: '4.9px 13.9px', delay: 200, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E1_POP, 320, { easing: EASE, origin: '9.4px 16.4px', delay: 260, fill: 'backwards' }),
      },
    },
  },
);

/** El contorno se traza dando la vuelta y la pupila aparece al cerrarse. */
export const eyeDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.054 18.946a11 11 0 0 1-2.11 0" },
    { tag: 'path', d: "M13.054 5.054a11 11 0 0 0-2.11-.001" },
    { tag: 'path', d: "M17.072 6.274a11 11 0 0 1 1.753 1.173" },
    { tag: 'path', d: "M18.825 16.552a11 11 0 0 1-1.753 1.174" },
    { tag: 'path', d: "M2.514 13.303a11 11 0 0 1-.452-.954 1 1 0 0 1 0-.697 11 11 0 0 1 .45-.955" },
    { tag: 'path', d: "M21.485 10.697a11 11 0 0 1 .453.955 1 1 0 0 1 0 .697 11 11 0 0 1-.453.954" },
    { tag: 'path', d: "M5.173 7.448a11 11 0 0 1 1.753-1.174" },
    { tag: 'path', d: "M6.926 17.726a11 11 0 0 1-1.753-1.174" },
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 280, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 70, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 210, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 140, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 490, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 350, fill: 'backwards' }),
        8: /* @__PURE__ */ track(E1_POP, 360, { easing: EASE, origin: '12px 12px', delay: 580, fill: 'backwards' }),
      },
    },
  },
);

export const faceAngryIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 11V9.416" },
    { tag: 'path', d: "M17 9a5 5 0 00-3 1" },
    { tag: 'path', d: "M7 9a5 5 0 013 1" },
    { tag: 'path', d: "M9 11V9.416" },
    { tag: 'path', d: "M9 16a5 5 0 016.001 0" },
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(FACE_BROW_RIGHT, 520, { easing: EASE, origin: '17px 9px' }),
        2: /* @__PURE__ */ track(FACE_BROW_LEFT, 520, { easing: EASE, origin: '7px 9px' }),
      },
    },
  },
);

/** Los ojos de raya se estiran y se encogen: no hay más gesto disponible. */
export const faceExpressionlessIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 10h2" },
    { tag: 'path', d: "M8 10h2" },
    { tag: 'path', d: "M8 16h8" },
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(FACE_EYE_STRETCH, 620, { easing: EASE, origin: '15px 10px', delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track(FACE_EYE_STRETCH, 620, { easing: EASE, origin: '9px 10px' }),
      },
    },
  },
);

/** La sonrisa de oreja a oreja se ensancha y vuelve. */
export const faceGrinningIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 10V9" },
    {
      tag: 'path',
      d: "M7.084 14.302a5.12 5.12 0 009.833 0 .24.24 0 00-.235-.302H7.32a.24.24 0 00-.235.302",
    },
    { tag: 'path', d: "M9 10V9" },
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(FACE_GRIN, 520, { easing: EASE, origin: '12px 15.5px' }),
      },
    },
  },
);

/** La boca recta se estira como los ojos de `expressionless`: es su pariente sin gesto. */
export const faceNeutralIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 10V9" },
    { tag: 'path', d: "M8 16h8" },
    { tag: 'path', d: "M9 10V9" },
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(FACE_EYE_STRETCH, 620, { easing: EASE, origin: '12px 16px' }),
      },
    },
  },
);

export const faceSlightlyFrowningIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 10V9" },
    { tag: 'path', d: "M9 10V9" },
    { tag: 'path', d: "M9 16a5 5 0 016 0" },
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(FACE_CURVE_DEEPEN, 520, { easing: EASE, origin: '12px 16px' }),
      },
    },
  },
);

/** La misma curva alargándose hacia arriba, con el pivote en el borde de abajo. */
export const faceSlightlySmilingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 10V9" },
    { tag: 'path', d: "M16.472 15a6 6 0 01-8.943 0" },
    { tag: 'path', d: "M9 10V9" },
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(FACE_CURVE_DEEPEN, 520, { easing: EASE, origin: '12px 18px' }),
      },
    },
  },
);

/** Nada: la cola se agita y el cuerpo la sigue. */
export const fishIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",
    },
    { tag: 'path', d: "M18 12v.5" },
    { tag: 'path', d: "M16 17.93a9.77 9.77 0 0 1 0-11.86" },
    {
      tag: 'path',
      d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",
    },
    { tag: 'path', d: "M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" },
    { tag: 'path', d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_WAVE, 660, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(E3_BLINK, 600, { easing: EASE, delay: 320, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E3_PULSE, 420, { easing: EASE, origin: '16px 12px', delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E3_SWAY, 700, { easing: EASE, origin: '7px 9px', delay: 60, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E3_PULSE, 420, { easing: EASE, origin: '11px 5px', delay: 260, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E3_WAVE, 660, { easing: EASE, origin: '12px 12px' }),
      },
    },
  },
);

/** Una sola pieza: ondula al nadar. */
export const fishSymbolIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 16s9-15 20-4C11 23 2 8 2 8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_WAVE, 700, { easing: EASE, origin: '12px 12px' }),
      },
    },
  },
);

/** Ondea. Con `skewX` y no con un giro: una bandera que rota se descuelga de su asta. */
export const flagIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_WAVE, 700, { easing: EASE, origin: '4px 4px' }),
      },
    },
  },
);

/** Igual, con el asta a la derecha. */
export const flagTriangleLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_WAVE, 700, { easing: EASE, origin: '18px 3px' }),
      },
    },
  },
);

/** Y con el asta a la izquierda. */
export const flagTriangleRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 22V2.8a.8.8 0 0 1 1.17-.71l11.38 5.69a.8.8 0 0 1 0 1.44L6 15.5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_WAVE, 700, { easing: EASE, origin: '6px 3px' }),
      },
    },
  },
);

export const flashlightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13v1" },
    {
      tag: 'path',
      d: "M17 2a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8A4 4 0 0 0 16 12v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V3a1 1 0 0 1 1-1z",
    },
    { tag: 'path', d: "M6 6h12" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_BEAM, 520, { easing: EASE, origin: '12px 13px', delay: 220, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_PULSE, 460, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track(E2_POP, 300, { easing: EASE, origin: '12px 6px', delay: 120, fill: 'backwards' }),
      },
    },
  },
);

/** El matraz da su saltito y el líquido baja y sube dentro. */
export const flaskConicalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
    },
    { tag: 'path', d: "M6.453 15h11.094" },
    { tag: 'path', d: "M8.5 2h7" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_PULSE, 460, { easing: EASE, origin: 'center' }),
        1: /* @__PURE__ */ track(E3_LIQUID, 700, { easing: EASE, delay: 120, fill: 'backwards' }),
      },
    },
  },
);

/** Lo mismo en el matraz redondo. */
export const flaskRoundIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 2v6.292a7 7 0 1 0 4 0V2" },
    { tag: 'path', d: "M5 15h14" },
    { tag: 'path', d: "M8.5 2h7" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_PULSE, 460, { easing: EASE, origin: 'center' }),
        1: /* @__PURE__ */ track(E3_LIQUID, 700, { easing: EASE, delay: 120, fill: 'backwards' }),
      },
    },
  },
);

export const funnelPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M13.354 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l1.218-1.348",
    },
    { tag: 'path', d: "M16 6h6" },
    { tag: 'path', d: "M19 3v6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PULSE, 500, { easing: EASE, origin: 'center' }),
        1: /* @__PURE__ */ track(E1_TURN, 600, { easing: EASE, origin: '19px 6px', delay: 200, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E1_TURN, 600, { easing: EASE, origin: '19px 6px', delay: 200, fill: 'backwards' }),
      },
    },
  },
);

export const handIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" },
    { tag: 'path', d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" },
    { tag: 'path', d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" },
    {
      tag: 'path',
      d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
    },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(HAND_WAVE, 620, { easing: EASE, origin: '12px 22px' }),
    },
  },
);

/** El puño saluda igual. */
export const handFistIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0",
    },
    { tag: 'path', d: "M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5" },
    { tag: 'path', d: "M9 5A2 2 0 1 0 5 5V10" },
    { tag: 'path', d: "M9 7V4A2 2 0 1 1 13 4V7.268" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(HAND_WAVE, 620, { easing: EASE, origin: '12px 22px' }),
    },
  },
);

/** Y la mano abierta. */
export const handGrabIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" },
    { tag: 'path', d: "M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" },
    { tag: 'path', d: "M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5" },
    { tag: 'path', d: "M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2" },
    { tag: 'path', d: "M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(HAND_WAVE, 620, { easing: EASE, origin: '12px 22px' }),
    },
  },
);

/** La mano que ayuda saluda desde su muñeca, que aquí está abajo a la izquierda. */
export const handHelpingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" },
    {
      tag: 'path',
      d: "m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
    },
    { tag: 'path', d: "m2 13 6 6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(HAND_WAVE, 620, { easing: EASE, origin: '3px 16px' }),
    },
  },
);

export const handMetalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" },
    { tag: 'path', d: "M14 11V9a2 2 0 1 0-4 0v2" },
    { tag: 'path', d: "M10 10.5V5a2 2 0 1 0-4 0v9" },
    {
      tag: 'path',
      d: "m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5",
    },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(HAND_WAVE, 620, { easing: EASE, origin: '12px 22px' }),
    },
  },
);

/** Esta no saluda: SIRVE. La cúpula y su pomo se ofrecen y se quedan — la lógica de `hand-heart`. */
export const handPlatterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 3V2" },
    {
      tag: 'path',
      d: "m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5",
    },
    { tag: 'path', d: "M2 14h12a2 2 0 0 1 0 4h-2" },
    { tag: 'path', d: "M4 10h16" },
    { tag: 'path', d: "M5 10a7 7 0 0 1 14 0" },
    { tag: 'path', d: "M5 14v6a1 1 0 0 1-1 1H2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(HAND_SERVE, 320, { easing: 'ease', origin: '12px 10px', fill: 'forwards' }),
        4: /* @__PURE__ */ track(HAND_SERVE, 320, { easing: 'ease', origin: '12px 10px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El lúpulo se abre por brácteas, de dentro hacia fuera. */
export const hopIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18",
    },
    {
      tag: 'path',
      d: "M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88",
    },
    {
      tag: 'path',
      d: "M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36",
    },
    {
      tag: 'path',
      d: "M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87",
    },
    {
      tag: 'path',
      d: "M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08",
    },
    {
      tag: 'path',
      d: "M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57",
    },
    { tag: 'path', d: "M4.93 4.93 3 3a.7.7 0 0 1 0-1" },
    {
      tag: 'path',
      d: "M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_POP, 360, { easing: EASE, origin: '13px 16px', delay: 80, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E3_POP, 360, { easing: EASE, origin: '14px 5px' }),
        2: /* @__PURE__ */ track(E3_POP, 360, { easing: EASE, origin: '15px 19px', delay: 240, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E3_POP, 360, { easing: EASE, origin: '19px 21px', delay: 480, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E3_POP, 360, { easing: EASE, origin: '19px 16px', delay: 400, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E3_POP, 360, { easing: EASE, origin: '19px 8px', delay: 320, fill: 'backwards' }),
        6: /* @__PURE__ */ track(E3_POP, 360, { easing: EASE, origin: '4px 4px', delay: 560, fill: 'backwards' }),
        7: /* @__PURE__ */ track(E3_POP, 360, { easing: EASE, origin: '10px 16px', delay: 160, fill: 'backwards' }),
      },
    },
  },
);

export const idCardLanyardIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.5 8h-3" },
    {
      tag: 'path',
      d: "m15 2-1 2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3",
    },
    { tag: 'path', d: "M16.899 22A5 5 0 0 0 7.1 22" },
    { tag: 'path', d: "m9 2 3 6" },
    { tag: 'circle', cx: 12, cy: 15, r: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_HANG, 720, { easing: EASE, origin: '12px 2px' }),
        1: /* @__PURE__ */ track(E2_HANG, 720, { easing: EASE, origin: '12px 2px' }),
        2: /* @__PURE__ */ track(E2_HANG, 720, { easing: EASE, origin: '12px 2px' }),
        4: /* @__PURE__ */ track(E2_HANG, 720, { easing: EASE, origin: '12px 2px' }),
      },
    },
  },
);

/** Las teclas se pulsan una tras otra, de izquierda a derecha. */
export const keyboardMusicIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 2, y: 4, width: 20, height: 16, rx: 2 },
    { tag: 'path', d: "M6 8h4" },
    { tag: 'path', d: "M14 8h.01" },
    { tag: 'path', d: "M18 8h.01" },
    { tag: 'path', d: "M2 12h20" },
    { tag: 'path', d: "M6 12v4" },
    { tag: 'path', d: "M10 12v4" },
    { tag: 'path', d: "M14 12v4" },
    { tag: 'path', d: "M18 12v4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(E2_POP, 300, { easing: EASE, origin: '8px 8px', delay: 60, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_POP, 300, { easing: EASE, origin: '14px 8px', delay: 150, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E2_POP, 300, { easing: EASE, origin: '18px 8px', delay: 240, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E2_KEY_PRESS, 520, { easing: EASE }),
        6: /* @__PURE__ */ track(E2_KEY_PRESS, 520, { easing: EASE, delay: 90, fill: 'backwards' }),
        7: /* @__PURE__ */ track(E2_KEY_PRESS, 520, { easing: EASE, delay: 180, fill: 'backwards' }),
        8: /* @__PURE__ */ track(E2_KEY_PRESS, 520, { easing: EASE, delay: 270, fill: 'backwards' }),
      },
    },
  },
);

/** La pantalla se abre desde la base, que es donde está la bisagra. */
export const laptopMinimalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 4, width: 18, height: 12, rx: 2, ry: 2 },
    { tag: 'line', x1: 2, y1: 20, x2: 22, y2: 20 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_UNFOLD_Y, 520, { easing: SPRING_OUT, origin: '12px 16px', delay: 100, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_UNFOLD_X, 420, { easing: SPRING_OUT, origin: '12px 20px' }),
      },
    },
  },
);

export const layers2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z",
    },
    {
      tag: 'path',
      d: "m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(LAYER_LIFT, 550, { easing: EASE }),
        1: /* @__PURE__ */ track(LAYER_SINK, 550, { easing: EASE, delay: 80, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(HOLD_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(HOLD_SINK, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La pila se abre y la flecha baja: punta y asta juntas. */
export const layersArrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 7v15" },
    { tag: 'path', d: "M2 12a1 1 0 00.58.91l5.093 2.316" },
    { tag: 'path', d: "M22 12a1 1 0 01-.59.92l-5.077 2.308" },
    {
      tag: 'path',
      d: "M8 10.37 2.6 7.91a1 1 0 010-1.831l8.57-3.9a2 2 0 011.66.001l8.59 3.91a1 1 0 010 1.831l-5.392 2.45",
    },
    { tag: 'path', d: "m9 19 3 3 3-3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(LAYER_ARROW_DOWN, 700, { easing: EASE, delay: 220, fill: 'backwards' }),
        1: /* @__PURE__ */ track(LAYER_SINK, 550, { easing: EASE, delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(LAYER_SINK, 550, { easing: EASE, delay: 80, fill: 'backwards' }),
        3: /* @__PURE__ */ track(LAYER_LIFT, 550, { easing: EASE }),
        4: /* @__PURE__ */ track(LAYER_ARROW_DOWN, 700, { easing: EASE, delay: 220, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(HOLD_DOWN_1, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(HOLD_SINK, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(HOLD_SINK, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(HOLD_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(HOLD_DOWN_1, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La misma pila, con la flecha subiendo. */
export const layersArrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 12V2" },
    { tag: 'path', d: "M2 17.002a1 1 0 00.58.91l8.6 3.91a2 2 0 001.65 0l8.58-3.9a1 1 0 00.59-.92" },
    {
      tag: 'path',
      d: "M7.674 8.774 2.58 11.09a1 1 0 000 1.822l8.6 3.91a2 2 0 001.65 0l8.58-3.9a1 1 0 00.59-.92 1 1 0 00-.59-.922l-5.078-2.308",
    },
    { tag: 'path', d: "m9 5 3-3 3 3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(LAYER_ARROW_UP, 700, { easing: EASE, delay: 220, fill: 'backwards' }),
        1: /* @__PURE__ */ track(LAYER_SINK, 550, { easing: EASE, delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(LAYER_LIFT, 550, { easing: EASE }),
        3: /* @__PURE__ */ track(LAYER_ARROW_UP, 700, { easing: EASE, delay: 220, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(HOLD_UP_1, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(HOLD_SINK, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(HOLD_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(HOLD_UP_1, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La pila se abre y el menos se pone de canto. */
export const layersMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.832z",
    },
    { tag: 'path', d: "M16 17h6" },
    { tag: 'path', d: "M2.003 11.995a1 1 0 0 0 .597.915l8.58 3.91a2 2 0 0 0 .83.18" },
    {
      tag: 'path',
      d: "M2.003 16.995a1 1 0 0 0 .597.915l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l2.11-.96",
    },
    { tag: 'path', d: "M22.018 12.004a1 1 0 0 1-.598.916l-.177.08" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(LAYER_LIFT, 550, { easing: EASE }),
        1: /* @__PURE__ */ track(LAYER_TURN, 600, { easing: EASE, origin: '19px 17px', delay: 220, fill: 'backwards' }),
        2: /* @__PURE__ */ track(LAYER_SINK, 550, { easing: EASE, delay: 80, fill: 'backwards' }),
        3: /* @__PURE__ */ track(LAYER_SINK, 550, { easing: EASE, delay: 80, fill: 'backwards' }),
        4: /* @__PURE__ */ track(LAYER_SINK, 550, { easing: EASE, delay: 80, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(HOLD_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(HOLD_TURN_90, 320, { easing: SPRING_OUT, origin: '19px 17px', fill: 'forwards' }),
        2: /* @__PURE__ */ track(HOLD_SINK, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(HOLD_SINK, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(HOLD_SINK, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Y la cruz gira un cuarto de vuelta. */
export const layersPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z",
    },
    { tag: 'path', d: "M16 17h6" },
    { tag: 'path', d: "M19 14v6" },
    { tag: 'path', d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178" },
    { tag: 'path', d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(LAYER_LIFT, 550, { easing: EASE }),
        1: /* @__PURE__ */ track(LAYER_TURN, 600, { easing: EASE, origin: '19px 17px', delay: 220, fill: 'backwards' }),
        2: /* @__PURE__ */ track(LAYER_TURN, 600, { easing: EASE, origin: '19px 17px', delay: 220, fill: 'backwards' }),
        3: /* @__PURE__ */ track(LAYER_SINK, 550, { easing: EASE, delay: 80, fill: 'backwards' }),
        4: /* @__PURE__ */ track(LAYER_SINK, 550, { easing: EASE, delay: 80, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(HOLD_LIFT, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(HOLD_TURN_90, 320, { easing: SPRING_OUT, origin: '19px 17px', fill: 'forwards' }),
        2: /* @__PURE__ */ track(HOLD_TURN_90, 320, { easing: SPRING_OUT, origin: '19px 17px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(HOLD_SINK, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(HOLD_SINK, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El libro de al lado se inclina para dejarse sacar. */
export const libraryBigIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 8, height: 18, rx: 1 },
    { tag: 'path', d: "M7 3v18" },
    {
      tag: 'path',
      d: "M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PULSE, 460, { easing: EASE, origin: '7px 12px' }),
        1: /* @__PURE__ */ track(E2_POP, 300, { easing: EASE, origin: '7px 12px', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_HANG, 620, { easing: EASE, origin: '18px 20px', delay: 220, fill: 'backwards' }),
      },
    },
  },
);

export const loaderIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v4" },
    { tag: 'path', d: "m16.2 7.8 2.9-2.9" },
    { tag: 'path', d: "M18 12h4" },
    { tag: 'path', d: "m16.2 16.2 2.9 2.9" },
    { tag: 'path', d: "M12 18v4" },
    { tag: 'path', d: "m4.9 19.1 2.9-2.9" },
    { tag: 'path', d: "M2 12h4" },
    { tag: 'path', d: "m4.9 4.9 2.9 2.9" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(SPINNER_FADE, 900, { easing: EASE }),
        1: /* @__PURE__ */ track(SPINNER_FADE, 900, { easing: EASE, delay: 90, fill: 'backwards' }),
        2: /* @__PURE__ */ track(SPINNER_FADE, 900, { easing: EASE, delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track(SPINNER_FADE, 900, { easing: EASE, delay: 270, fill: 'backwards' }),
        4: /* @__PURE__ */ track(SPINNER_FADE, 900, { easing: EASE, delay: 360, fill: 'backwards' }),
        5: /* @__PURE__ */ track(SPINNER_FADE, 900, { easing: EASE, delay: 450, fill: 'backwards' }),
        6: /* @__PURE__ */ track(SPINNER_FADE, 900, { easing: EASE, delay: 540, fill: 'backwards' }),
        7: /* @__PURE__ */ track(SPINNER_FADE, 900, { easing: EASE, delay: 630, fill: 'backwards' }),
      },
    },
  },
);

/** Las tres aspas giran dentro del aro, que se queda quieto. */
export const loaderPinwheelIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" },
    { tag: 'path', d: "M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" },
    { tag: 'path', d: "M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" },
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(PINWHEEL, 900, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(PINWHEEL, 900, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(PINWHEEL, 900, { easing: EASE, origin: '12px 12px' }),
      },
    },
  },
);

/** Las cuatro marcas parpadean hacia dentro y el círculo late: eso es localizar. */
export const locateIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'line', x1: 2, y1: 12, x2: 5, y2: 12 },
    { tag: 'line', x1: 19, y1: 12, x2: 22, y2: 12 },
    { tag: 'line', x1: 12, y1: 2, x2: 12, y2: 5 },
    { tag: 'line', x1: 12, y1: 19, x2: 12, y2: 22 },
    { tag: 'circle', cx: 12, cy: 12, r: 7 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_BLINK, 700, { easing: EASE, delay: 240, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E1_BLINK, 700, { easing: EASE, delay: 80, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E1_BLINK, 700, { easing: EASE }),
        3: /* @__PURE__ */ track(E1_BLINK, 700, { easing: EASE, delay: 160, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E1_PULSE, 520, { easing: EASE, origin: '12px 12px', delay: 180, fill: 'backwards' }),
      },
    },
  },
);

export const logInIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 17 5-5-5-5" },
    { tag: 'path', d: "M15 12H3" },
    { tag: 'path', d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PUSH_RIGHT, 620, { easing: EASE }),
        1: /* @__PURE__ */ track(E1_PUSH_RIGHT, 620, { easing: EASE }),
        2: /* @__PURE__ */ track(E1_PULSE, 460, { easing: EASE, origin: '18px 12px', delay: 200, fill: 'backwards' }),
      },
    },
  },
);

export const mailBadgeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 7.7V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8.25" },
    { tag: 'path', d: "M12 12.996a1.94 1.94 0 0 1-1.03-.296L2 7" },
    {
      tag: 'path',
      d: "m20.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88",
    },
    { tag: 'circle', cx: 19, cy: 14, r: 3 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MAIL_BREATH, 500, { easing: EASE, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 500, { easing: 'ease-out', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(BADGE_GROW, 900, { easing: EASE, origin: '19px 16px' }),
        3: /* @__PURE__ */ track(BADGE_GROW, 900, { easing: EASE, origin: '19px 16px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '19px 16px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(HOLD_GROW, 320, { easing: SPRING_OUT, origin: '19px 16px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const mailMinusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" },
    { tag: 'path', d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" },
    { tag: 'path', d: "M16 19h6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MAIL_BREATH, 500, { easing: EASE, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 500, { easing: 'ease-out', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(BADGE_TURN, 900, { easing: EASE, origin: '19px 19px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(HOLD_TURN, 320, { easing: SPRING_OUT, origin: '19px 19px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const mailOpenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z",
    },
    { tag: 'path', d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MAIL_BREATH, 500, { easing: EASE, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 500, { easing: 'ease-out', delay: 120, fill: 'backwards' }),
      },
    },
  },
);

/** La cruz gira igual que la equis: es el mismo signo girado. */
export const mailPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" },
    { tag: 'path', d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" },
    { tag: 'path', d: "M19 16v6" },
    { tag: 'path', d: "M16 19h6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MAIL_BREATH, 500, { easing: EASE, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 500, { easing: 'ease-out', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(BADGE_TURN, 900, { easing: EASE, origin: '19px 19px' }),
        3: /* @__PURE__ */ track(BADGE_TURN, 900, { easing: EASE, origin: '19px 19px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(HOLD_TURN, 320, { easing: SPRING_OUT, origin: '19px 19px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(HOLD_TURN, 320, { easing: SPRING_OUT, origin: '19px 19px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El signo se inclina, como quien ladea la cabeza al preguntar. */
export const mailQuestionMarkIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" },
    { tag: 'path', d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" },
    { tag: 'path', d: "M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2" },
    { tag: 'path', d: "M20 22v.01" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MAIL_BREATH, 500, { easing: EASE, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 500, { easing: 'ease-out', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(BADGE_TILT, 900, { easing: EASE, origin: '20px 18px' }),
        3: /* @__PURE__ */ track(BADGE_TILT, 900, { easing: EASE, origin: '20px 18px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(HOLD_TILT, 320, { easing: SPRING_OUT, origin: '20px 18px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(HOLD_TILT, 320, { easing: SPRING_OUT, origin: '20px 18px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const mailSearchIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5" },
    { tag: 'path', d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" },
    { tag: 'path', d: "M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" },
    { tag: 'circle', cx: 18, cy: 18, r: 3 },
    { tag: 'path', d: "m22 22-1.5-1.5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MAIL_BREATH, 500, { easing: EASE, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 500, { easing: 'ease-out', delay: 120, fill: 'backwards' }),
        4: /* @__PURE__ */ track(BADGE_PROBE, 900, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(HOLD_PROBE, 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El aviso tirita. */
export const mailWarningIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5" },
    { tag: 'path', d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" },
    { tag: 'path', d: "M20 14v4" },
    { tag: 'path', d: "M20 22v.01" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MAIL_BREATH, 500, { easing: EASE, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 500, { easing: 'ease-out', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(BADGE_SHAKE, 900, { easing: EASE, origin: '20px 18px' }),
        3: /* @__PURE__ */ track(BADGE_SHAKE, 900, { easing: EASE, origin: '20px 18px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(HOLD_TILT, 320, { easing: SPRING_OUT, origin: '20px 18px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(HOLD_TILT, 320, { easing: SPRING_OUT, origin: '20px 18px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

export const mailXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9" },
    { tag: 'path', d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" },
    { tag: 'path', d: "m17 17 4 4" },
    { tag: 'path', d: "m21 17-4 4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(MAIL_BREATH, 500, { easing: EASE, origin: 'center' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 500, { easing: 'ease-out', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(BADGE_TURN, 900, { easing: EASE, origin: '19px 19px' }),
        3: /* @__PURE__ */ track(BADGE_TURN, 900, { easing: EASE, origin: '19px 19px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(HOLD_TURN, 320, { easing: SPRING_OUT, origin: '19px 19px', fill: 'forwards' }),
        3: /* @__PURE__ */ track(HOLD_TURN, 320, { easing: SPRING_OUT, origin: '19px 19px', fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * Grita barriendo: el megáfono pivota sobre su BOCA —el lado derecho, por donde sale el sonido— y
 * la línea que la marca se abre.
 *
 * El giro es de `root` y no del cono solo: con el pivote a la derecha, la punta estrecha describe
 * un arco de 15 unidades, y dejar el mango y la línea quietos mientras el cono se va no lee como
 * un barrido, lee como un icono roto. Moviéndose entero se mantiene rígido, que es lo que hace un
 * megáfono de verdad.
 *
 * `origin` de `root` va en porcentaje porque son píxeles del host, no unidades del viewBox:
 * `88% 42%` es (21.1, 10.1) en un lienzo de 24, o sea la boca.
 */
export const megaphoneIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" },
    { tag: 'path', d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" },
    { tag: 'path', d: "M8 6v8" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 3, -1.5, 0]), 620, { easing: EASE, origin: '88% 42%' }),
      shapes: {
        2: /* @__PURE__ */ track(E2_BEAM, 480, { easing: EASE, origin: '8px 10px', delay: 160, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_PULSE, 460, { easing: EASE, origin: '9px 18px', delay: 240, fill: 'backwards' }),
      },
    },
  },
);

export const micIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 19v3" },
    { tag: 'path', d: "M19 10v2a7 7 0 0 1-14 0v-2" },
    { tag: 'rect', x: 9, y: 2, width: 6, height: 13, rx: 3 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(MIC_LISTEN, 520, { easing: EASE, origin: '12px 12px', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(MIC_PULSE, 520, { easing: EASE, origin: '12px 8.5px' }),
      },
    },
  },
);

/** Ecualizador: las seis barras suben y bajan desfasadas, de izquierda a derecha. */
export const micAudioLinesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 3v2.341" },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M14 5v.341" },
    { tag: 'path', d: "M18 5v13" },
    { tag: 'path', d: "M2 10v3" },
    { tag: 'path', d: "M22 10v3" },
    { tag: 'path', d: "M6 6v11" },
    { tag: 'path', d: "M9 21h6" },
    { tag: 'rect', x: 10, y: 9, width: 4, height: 8, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(EQ_BAR, 700, { easing: EASE, origin: '10px 4.2px', delay: 160, fill: 'backwards' }),
        2: /* @__PURE__ */ track(EQ_BAR, 700, { easing: EASE, origin: '14px 5.2px', delay: 240, fill: 'backwards' }),
        3: /* @__PURE__ */ track(EQ_BAR, 700, { easing: EASE, origin: '18px 11.5px', delay: 320, fill: 'backwards' }),
        4: /* @__PURE__ */ track(EQ_BAR, 700, { easing: EASE, origin: '2px 11.5px' }),
        5: /* @__PURE__ */ track(EQ_BAR, 700, { easing: EASE, origin: '22px 11.5px', delay: 400, fill: 'backwards' }),
        6: /* @__PURE__ */ track(EQ_BAR, 700, { easing: EASE, origin: '6px 11.5px', delay: 80, fill: 'backwards' }),
      },
    },
  },
);

/** Las ondas salen de la cápsula hacia fuera: primero las de dentro. */
export const micSignalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M18 11a6 6 0 00-3-5.197" },
    { tag: 'path', d: "M2 11a10 10 0 015-8.662" },
    { tag: 'path', d: "M22 11a10 10 0 00-5-8.662" },
    { tag: 'path', d: "M6 11a6 6 0 013-5.197" },
    { tag: 'path', d: "M9 21h6" },
    { tag: 'rect', x: 10, y: 9, width: 4, height: 8, rx: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(WAVE_OUT, 420, { easing: EASE, origin: '15px 8px', delay: 180, fill: 'backwards' }),
        2: /* @__PURE__ */ track(WAVE_OUT, 420, { easing: EASE, origin: '5px 6.5px', delay: 300, fill: 'backwards' }),
        3: /* @__PURE__ */ track(WAVE_OUT, 420, { easing: EASE, origin: '19px 6.5px', delay: 300, fill: 'backwards' }),
        4: /* @__PURE__ */ track(WAVE_OUT, 420, { easing: EASE, origin: '9px 8px', delay: 180, fill: 'backwards' }),
        6: /* @__PURE__ */ track(MIC_PULSE, 520, { easing: EASE, origin: '12px 13px' }),
      },
    },
  },
);

/** El micrófono de mano: la cabeza late y el cable se mece detrás. */
export const micVocalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",
    },
    {
      tag: 'path',
      d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",
    },
    { tag: 'circle', cx: 16, cy: 7, r: 5 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(MIC_SWAY, 700, { easing: EASE, origin: '16px 7px', delay: 100, fill: 'backwards' }),
        2: /* @__PURE__ */ track(MIC_PULSE, 520, { easing: EASE, origin: '16px 7px' }),
      },
    },
  },
);

/** El cartón da su saltito y la leche baja y sube dentro: se vacía y se llena. */
export const milkIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 2h8" },
    {
      tag: 'path',
      d: "M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2",
    },
    { tag: 'path', d: "M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(E3_PULSE, 460, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track(E3_LIQUID, 700, { easing: EASE, delay: 120, fill: 'backwards' }),
      },
    },
  },
);

export const moonStarIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 5h4" },
    { tag: 'path', d: "M20 3v4" },
    {
      tag: 'path',
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_TWINKLE, 380, { easing: EASE, origin: '20px 5px', delay: 200, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E3_TWINKLE, 380, { easing: EASE, origin: '20px 5px', delay: 200, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E3_SWAY, 660, { easing: EASE, origin: '12px 12px' }),
      },
    },
  },
);

/** Cae y aterriza gomosa: se aplasta al tocar, rebota estirada y se asienta. */
export const mountainIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m8 3 4 8 5-5 5 15H2L8 3z" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_SQUASH_LAND, 760, { easing: EASE, origin: '12px 22px' }),
      },
    },
  },
);

export const musicIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 18V5l12-2v13" },
    { tag: 'circle', cx: 6, cy: 18, r: 3 },
    { tag: 'circle', cx: 18, cy: 16, r: 3 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_BRUSH, 700, { easing: EASE, origin: '15px 12px', delay: 60, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_PULSE, 560, { easing: EASE, origin: '6px 18px' }),
        2: /* @__PURE__ */ track(E2_PULSE, 560, { easing: EASE, origin: '18px 16px', delay: 180, fill: 'backwards' }),
      },
    },
  },
);

/** La nota suena: la cabeza late y el asta la sigue. */
export const music2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 8, cy: 18, r: 4 },
    { tag: 'path', d: "M12 18V2l7 4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PULSE, 560, { easing: EASE, origin: '8px 18px' }),
        1: /* @__PURE__ */ track(E2_BRUSH, 700, { easing: EASE, origin: '12px 18px', delay: 80, fill: 'backwards' }),
      },
    },
  },
);

/** Igual, con el asta recta. */
export const music3Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 18, r: 4 },
    { tag: 'path', d: "M16 18V2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PULSE, 560, { easing: EASE, origin: '12px 18px' }),
        1: /* @__PURE__ */ track(E2_BRUSH, 700, { easing: EASE, origin: '16px 18px', delay: 80, fill: 'backwards' }),
      },
    },
  },
);

/** El fruto cae y rebota; su rabito lo sigue. */
export const nutIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 4V2" },
    {
      tag: 'path',
      d: "M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4",
    },
    {
      tag: 'path',
      d: "M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_DROP, 620, { easing: EASE }),
        1: /* @__PURE__ */ track(E3_DROP, 620, { easing: EASE }),
        2: /* @__PURE__ */ track(E3_DROP, 620, { easing: EASE }),
      },
    },
  },
);

export const octagonIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PULSE, 460, { easing: EASE, origin: 'center' }),
      },
    },
  },
);

/** Las dos barras se apartan y vuelven: la pausa que el icono nombra. */
export const octagonPauseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 15V9" },
    { tag: 'path', d: "M14 15V9" },
    {
      tag: 'path',
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PUSH_LEFT, 560, { easing: EASE }),
        1: /* @__PURE__ */ track(E1_PUSH_RIGHT, 560, { easing: EASE }),
      },
    },
  },
);

/** La equis gira un cuarto de vuelta. */
export const octagonXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m15 9-6 6" },
    {
      tag: 'path',
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
    },
    { tag: 'path', d: "m9 9 6 6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_TURN, 620, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(E1_TURN, 620, { easing: EASE, origin: '12px 12px' }),
      },
    },
  },
);

/** El pincel se mece mientras pinta, sobre su punta. */
export const paintbrushVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 2v2" },
    { tag: 'path', d: "M14 2v4" },
    { tag: 'path', d: "M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z" },
    {
      tag: 'path',
      d: "M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_POP, 300, { easing: EASE, origin: '10px 3px', delay: 180, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_POP, 300, { easing: EASE, origin: '14px 4px', delay: 260, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E2_BRUSH, 700, { easing: EASE, origin: '12px 12px' }),
        3: /* @__PURE__ */ track(E2_BRUSH, 700, { easing: EASE, origin: '12px 12px' }),
      },
    },
  },
);

export const phoneCallIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 2a9 9 0 0 1 9 9" },
    { tag: 'path', d: "M13 6a5 5 0 0 1 5 5" },
    {
      tag: 'path',
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(PHONE_WAVE, 420, { easing: EASE, origin: '13px 11px', delay: 300, fill: 'backwards' }),
        1: /* @__PURE__ */ track(PHONE_WAVE, 420, { easing: EASE, origin: '13px 11px', delay: 200, fill: 'backwards' }),
        2: /* @__PURE__ */ track(PHONE_RING, 800, { easing: EASE, origin: '11px 15px' }),
      },
    },
  },
);

/** Suena y la flecha sale hacia la derecha, con su asta. */
export const phoneForwardedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 6h8" },
    { tag: 'path', d: "m18 2 4 4-4 4" },
    {
      tag: 'path',
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(PHONE_NUDGE_R, 600, { easing: EASE, delay: 250, fill: 'backwards' }),
        1: /* @__PURE__ */ track(PHONE_NUDGE_R, 600, { easing: EASE, delay: 250, fill: 'backwards' }),
        2: /* @__PURE__ */ track(PHONE_RING, 800, { easing: EASE, origin: '11px 15px' }),
      },
    },
  },
);

/** Suena y la flecha entra desde la esquina. */
export const phoneIncomingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 2v6h6" },
    { tag: 'path', d: "m22 2-6 6" },
    {
      tag: 'path',
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(PHONE_NUDGE_IN, 600, { easing: EASE, delay: 250, fill: 'backwards' }),
        1: /* @__PURE__ */ track(PHONE_NUDGE_IN, 600, { easing: EASE, delay: 250, fill: 'backwards' }),
        2: /* @__PURE__ */ track(PHONE_RING, 800, { easing: EASE, origin: '11px 15px' }),
      },
    },
  },
);

export const phoneMissedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m16 2 6 6" },
    { tag: 'path', d: "m22 2-6 6" },
    {
      tag: 'path',
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(LAYER_TURN, 600, { easing: EASE, origin: '19px 5px', delay: 250, fill: 'backwards' }),
        1: /* @__PURE__ */ track(LAYER_TURN, 600, { easing: EASE, origin: '19px 5px', delay: 250, fill: 'backwards' }),
        2: /* @__PURE__ */ track(PHONE_RING, 800, { easing: EASE, origin: '11px 15px' }),
      },
    },
  },
);

/** Suena y la flecha se va hacia la esquina. */
export const phoneOutgoingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m16 8 6-6" },
    { tag: 'path', d: "M22 8V2h-6" },
    {
      tag: 'path',
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(PHONE_NUDGE_OUT, 600, { easing: EASE, delay: 250, fill: 'backwards' }),
        1: /* @__PURE__ */ track(PHONE_NUDGE_OUT, 600, { easing: EASE, delay: 250, fill: 'backwards' }),
        2: /* @__PURE__ */ track(PHONE_RING, 800, { easing: EASE, origin: '11px 15px' }),
      },
    },
  },
);

/** El pin se clava: cae de golpe y rebota. */
export const pinIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17v5" },
    {
      tag: 'path',
      d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PIN_DROP, 620, { easing: EASE }),
        1: /* @__PURE__ */ track(E1_PIN_DROP, 620, { easing: EASE }),
      },
    },
  },
);

/** Y aquí aterriza. */
export const planeLandingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 22h20" },
    {
      tag: 'path',
      d: "M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_PULSE, 400, { easing: EASE, origin: '12px 22px' }),
        1: /* @__PURE__ */ track(E3_GLIDE_DOWN, 700, { easing: EASE, delay: 100, fill: 'backwards' }),
      },
    },
  },
);

export const planeTakeoffIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 22h20" },
    {
      tag: 'path',
      d: "M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_PULSE, 400, { easing: EASE, origin: '12px 22px' }),
        1: /* @__PURE__ */ track(E3_GLIDE_UP, 700, { easing: EASE, delay: 100, fill: 'backwards' }),
      },
    },
  },
);

export const pointerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 14a8 8 0 0 1-8 8" },
    { tag: 'path', d: "M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" },
    { tag: 'path', d: "M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" },
    { tag: 'path', d: "M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" },
    {
      tag: 'path',
      d: "M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
    },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(E1_PUSH_UP, 600, { easing: EASE }),
      },
    },
  },
);

/** El papel sale de la impresora y la equis gira al lado. */
export const printerXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.531 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6.377" },
    { tag: 'path', d: "m16.5 16.5 5 5" },
    { tag: 'path', d: "m16.5 21.5 5-5" },
    { tag: 'path', d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.5" },
    { tag: 'path', d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PUSH_DOWN, 620, { easing: EASE }),
        1: /* @__PURE__ */ track(E1_TURN, 600, { easing: EASE, origin: '19px 19px', delay: 220, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E1_TURN, 600, { easing: EASE, origin: '19px 19px', delay: 220, fill: 'backwards' }),
      },
    },
  },
);

export const redoIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 7v6h-6" },
    { tag: 'path', d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 460, { easing: 'ease-out' }),
      },
    },
  },
);

/** Lo mismo con el arco cerrado. */
export const redo2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m15 14 5-5-5-5" },
    { tag: 'path', d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 300, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 460, { easing: 'ease-out' }),
      },
    },
  },
);

export const repeatIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m17 2 4 4-4 4" },
    { tag: 'path', d: "M3 11v-1a4 4 0 0 1 4-4h14" },
    { tag: 'path', d: "m7 22-4-4 4-4" },
    { tag: 'path', d: "M21 13v1a4 4 0 0 1-4 4H3" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(SWAP_DRAG, 760, { easing: EASE, origin: '50% 50%' }),
    },
  },
);

/** El mismo intercambio, aquí en vertical: también es simétrico a 180°, punto por punto. */
export const repeat2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m2 9 3-3 3 3" },
    { tag: 'path', d: "M13 18H7a2 2 0 0 1-2-2V6" },
    { tag: 'path', d: "m22 15-3 3-3-3" },
    { tag: 'path', d: "M11 6h6a2 2 0 0 1 2 2v10" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(SWAP_DRAG, 760, { easing: EASE, origin: '50% 50%' }),
    },
  },
);

/** Los dos cuadros se intercambian de verdad: cada uno hace los 11 enteros hasta el sitio del
 *  otro, rodeando por lados distintos para no cruzarse a mitad de camino. */
export const replaceIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 4a1 1 0 0 1 1-1" },
    { tag: 'path', d: "M15 10a1 1 0 0 1-1-1" },
    { tag: 'path', d: "M21 4a1 1 0 0 0-1-1" },
    { tag: 'path', d: "M21 9a1 1 0 0 1-1 1" },
    { tag: 'path', d: "m3 7 3 3 3-3" },
    { tag: 'path', d: "M6 10V5a2 2 0 0 1 2-2h2" },
    { tag: 'rect', x: 3, y: 14, width: 7, height: 7, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(SWAP_LOWER, 1100, { easing: EASE, delay: 120, fill: 'backwards' }),
        1: /* @__PURE__ */ track(SWAP_LOWER, 1100, { easing: EASE, delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(SWAP_LOWER, 1100, { easing: EASE, delay: 120, fill: 'backwards' }),
        3: /* @__PURE__ */ track(SWAP_LOWER, 1100, { easing: EASE, delay: 120, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        6: /* @__PURE__ */ track(SWAP_UPPER, 1100, { easing: EASE, delay: 120, fill: 'backwards' }),
      },
    },
  },
);

/** Las hojas se cierran, cada una sobre su anilla, y la línea de corte aparece. */
export const scissorsLineDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5.42 9.42 8 12" },
    { tag: 'circle', cx: 4, cy: 8, r: 2 },
    { tag: 'path', d: "m14 6-8.58 8.58" },
    { tag: 'circle', cx: 4, cy: 16, r: 2 },
    { tag: 'path', d: "M10.8 14.8 14 18" },
    { tag: 'path', d: "M16 12h-2" },
    { tag: 'path', d: "M22 12h-2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_BLADE_A, 620, { easing: EASE, origin: '4px 8px' }),
        1: /* @__PURE__ */ track(E1_PULSE, 400, { easing: EASE, origin: '4px 8px', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E1_BLADE_A, 620, { easing: EASE, origin: '4px 8px' }),
        3: /* @__PURE__ */ track(E1_PULSE, 400, { easing: EASE, origin: '4px 16px', delay: 120, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E1_BLADE_B, 620, { easing: EASE, origin: '4px 16px' }),
        5: /* @__PURE__ */ track(E1_POP, 320, { easing: EASE, origin: '15px 12px', delay: 300, fill: 'backwards' }),
        6: /* @__PURE__ */ track(E1_POP, 320, { easing: EASE, origin: '21px 12px', delay: 380, fill: 'backwards' }),
      },
    },
  },
);

/** Lo compartido sale de la pantalla hacia la esquina. */
export const screenShareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" },
    { tag: 'path', d: "M8 21h8" },
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "m17 8 5-5" },
    { tag: 'path', d: "M17 3h5v5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PULSE, 460, { easing: EASE, origin: 'center' }),
        3: /* @__PURE__ */ track(E1_OUT_CORNER, 620, { easing: EASE, delay: 180, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E1_OUT_CORNER, 620, { easing: EASE, delay: 180, fill: 'backwards' }),
      },
    },
  },
);

/** El pergamino se desenrolla de izquierda a derecha. */
export const scrollIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 17V5a2 2 0 0 0-2-2H4" },
    {
      tag: 'path',
      d: "M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_UNFOLD_X, 480, { easing: SPRING_OUT, origin: '4px 10px', delay: 200, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_UNFOLD_X, 560, { easing: SPRING_OUT, origin: '8px 19px' }),
      },
    },
  },
);

export const sendHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z",
    },
    { tag: 'path', d: "M6 12h16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PUSH_RIGHT, 620, { easing: EASE }),
        1: /* @__PURE__ */ track(E1_PUSH_RIGHT, 620, { easing: EASE, delay: 60, fill: 'backwards' }),
      },
    },
  },
);

/** El cuadro de delante se va al fondo, hacia el que ya está detrás. */
export const sendToBackIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 14, y: 14, width: 8, height: 8, rx: 2 },
    { tag: 'rect', x: 2, y: 2, width: 8, height: 8, rx: 2 },
    { tag: 'path', d: "M7 14v1a2 2 0 0 0 2 2h1" },
    { tag: 'path', d: "M14 7h1a2 2 0 0 1 2 2v1" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(E1_TO_BACK, 700, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 280, fill: 'backwards' }),
      },
    },
  },
);

export const settings2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 17H5" },
    { tag: 'path', d: "M19 7h-9" },
    { tag: 'circle', cx: 17, cy: 17, r: 3 },
    { tag: 'circle', cx: 7, cy: 7, r: 3 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(SLIDER_LEFT, 650, { easing: EASE, delay: 110, fill: 'backwards' }),
        3: /* @__PURE__ */ track(SLIDER_RIGHT, 650, { easing: EASE }),
      },
    },
  },
);

/** La cesta se llena: las varillas bajan una tras otra. */
export const shoppingBasketIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m15 11-1 9" },
    { tag: 'path', d: "m19 11-4-7" },
    { tag: 'path', d: "M2 11h20" },
    { tag: 'path', d: "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" },
    { tag: 'path', d: "M4.5 15.5h15" },
    { tag: 'path', d: "m5 11 4-7" },
    { tag: 'path', d: "m9 11 1 9" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_STEP, 520, { easing: EASE, delay: 380, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E3_STEP, 520, { easing: EASE, delay: 460, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E3_POP, 300, { easing: EASE, origin: '12px 11px', delay: 120, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E3_PULSE, 460, { easing: EASE, origin: 'center' }),
        4: /* @__PURE__ */ track(E3_POP, 300, { easing: EASE, origin: '12px 15.5px', delay: 540, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E3_STEP, 520, { easing: EASE, delay: 220, fill: 'backwards' }),
        6: /* @__PURE__ */ track(E3_STEP, 520, { easing: EASE, delay: 300, fill: 'backwards' }),
      },
    },
  },
);

export const splineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 19, cy: 5, r: 2 },
    { tag: 'circle', cx: 5, cy: 19, r: 2 },
    { tag: 'path', d: "M5 17A12 12 0 0 1 17 5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_POP, 340, { easing: EASE, origin: '19px 5px', delay: 440, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E1_POP, 340, { easing: EASE, origin: '5px 19px', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 520, { easing: 'ease-out' }),
      },
    },
  },
);

/** Los ocho puntos se encienden dando la vuelta y el sol late en medio. */
export const sunDimIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 4 },
    { tag: 'path', d: "M12 4h.01" },
    { tag: 'path', d: "M20 12h.01" },
    { tag: 'path', d: "M12 20h.01" },
    { tag: 'path', d: "M4 12h.01" },
    { tag: 'path', d: "M17.657 6.343h.01" },
    { tag: 'path', d: "M17.657 17.657h.01" },
    { tag: 'path', d: "M6.343 17.657h.01" },
    { tag: 'path', d: "M6.343 6.343h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_PULSE, 520, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '12px 4px', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '20px 12px', delay: 240, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '12px 20px', delay: 360, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '4px 12px', delay: 480, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '17.7px 6.3px', delay: 180, fill: 'backwards' }),
        6: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '17.7px 17.7px', delay: 300, fill: 'backwards' }),
        7: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '6.3px 17.7px', delay: 420, fill: 'backwards' }),
        8: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '6.3px 6.3px', delay: 540, fill: 'backwards' }),
      },
    },
  },
);

/** Los rayos salen del sol dando la vuelta. */
export const sunMediumIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 4 },
    { tag: 'path', d: "M12 3v1" },
    { tag: 'path', d: "M12 20v1" },
    { tag: 'path', d: "M3 12h1" },
    { tag: 'path', d: "M20 12h1" },
    { tag: 'path', d: "m18.364 5.636-.707.707" },
    { tag: 'path', d: "m6.343 17.657-.707.707" },
    { tag: 'path', d: "m5.636 5.636.707.707" },
    { tag: 'path', d: "m17.657 17.657.707.707" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_PULSE, 520, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '12px 3.5px', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '12px 20.5px', delay: 360, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '3.5px 12px', delay: 480, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '20.5px 12px', delay: 240, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '18px 6px', delay: 180, fill: 'backwards' }),
        6: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '6px 18px', delay: 420, fill: 'backwards' }),
        7: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '6px 6px', delay: 540, fill: 'backwards' }),
        8: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '18px 18px', delay: 300, fill: 'backwards' }),
      },
    },
  },
);

/** Medio sol y media nieve: el sol late a un lado mientras los copos caen al otro. */
export const sunSnowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 21v-1" },
    { tag: 'path', d: "M10 4V3" },
    { tag: 'path', d: "M10 9a3 3 0 0 0 0 6" },
    { tag: 'path', d: "m14 20 1.25-2.5L18 18" },
    { tag: 'path', d: "m14 4 1.25 2.5L18 6" },
    { tag: 'path', d: "m17 21-3-6 1.5-3H22" },
    { tag: 'path', d: "m17 3-3 6 1.5 3" },
    { tag: 'path', d: "M2 12h1" },
    { tag: 'path', d: "m20 10-1.5 2 1.5 2" },
    { tag: 'path', d: "m3.64 18.36.7-.7" },
    { tag: 'path', d: "m4.34 6.34-.7-.7" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '10px 20.5px', delay: 200, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '10px 3.5px', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E3_PULSE, 520, { easing: EASE, origin: '10px 12px' }),
        3: /* @__PURE__ */ track(E3_TWINKLE, 320, { easing: EASE, origin: '16px 19px', delay: 340, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E3_TWINKLE, 320, { easing: EASE, origin: '16px 5px', delay: 420, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E3_BUBBLE, 620, { easing: EASE, delay: 180, fill: 'backwards' }),
        6: /* @__PURE__ */ track(E3_BUBBLE, 620, { easing: EASE, delay: 260, fill: 'backwards' }),
        7: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '2.5px 12px', delay: 280, fill: 'backwards' }),
        8: /* @__PURE__ */ track(E3_TWINKLE, 320, { easing: EASE, origin: '19px 12px', delay: 500, fill: 'backwards' }),
        9: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '4px 18px', delay: 360, fill: 'backwards' }),
        10: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '4px 6px', delay: 440, fill: 'backwards' }),
      },
    },
  },
);

export const tableIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 3v18" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M3 9h18" },
    { tag: 'path', d: "M3 15h18" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TABLE_SHIFT, 550, { easing: EASE }),
        2: /* @__PURE__ */ track(TABLE_SHIFT_Y, 550, { easing: EASE, delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track(TABLE_SHIFT_Y, 550, { easing: EASE, delay: 120, fill: 'backwards' }),
      },
    },
  },
);

/** Va toda de una pieza: Lucide la dibuja en un solo trazo, así que se corre entera. */
export const table2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TABLE_SHIFT, 550, { easing: EASE }),
      },
    },
  },
);

export const tableColumnsSplitIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 14v2" },
    { tag: 'path', d: "M14 20v2" },
    { tag: 'path', d: "M14 2v2" },
    { tag: 'path', d: "M14 8v2" },
    { tag: 'path', d: "M2 15h8" },
    { tag: 'path', d: "M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2" },
    { tag: 'path', d: "M2 9h8" },
    { tag: 'path', d: "M22 15h-4" },
    { tag: 'path', d: "M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" },
    { tag: 'path', d: "M22 9h-4" },
    { tag: 'path', d: "M5 3v18" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 720, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 900, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 180, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 630, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 450, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 90, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 810, fill: 'backwards' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 540, fill: 'backwards' }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 270, fill: 'backwards' }),
        10: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 360, fill: 'backwards' }),
      },
    },
  },
);

export const tableOfContentsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 5H3" },
    { tag: 'path', d: "M16 12H3" },
    { tag: 'path', d: "M16 19H3" },
    { tag: 'path', d: "M21 5h.01" },
    { tag: 'path', d: "M21 12h.01" },
    { tag: 'path', d: "M21 19h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 180, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 360, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 340, { easing: 'ease-out', delay: 90, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 340, { easing: 'ease-out', delay: 270, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 340, { easing: 'ease-out', delay: 450, fill: 'backwards' }),
      },
    },
  },
);

/** Lo mismo con la vertical a la derecha. */
export const tablePropertiesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 3v18" },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M21 9H3" },
    { tag: 'path', d: "M21 15H3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TABLE_SHIFT, 550, { easing: EASE }),
        2: /* @__PURE__ */ track(TABLE_SHIFT_Y, 550, { easing: EASE, delay: 60, fill: 'backwards' }),
        3: /* @__PURE__ */ track(TABLE_SHIFT_Y, 550, { easing: EASE, delay: 120, fill: 'backwards' }),
      },
    },
  },
);

export const tableRowsSplitIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 10h2" },
    { tag: 'path', d: "M15 22v-8" },
    { tag: 'path', d: "M15 2v4" },
    { tag: 'path', d: "M2 10h2" },
    { tag: 'path', d: "M20 10h2" },
    { tag: 'path', d: "M3 19h18" },
    { tag: 'path', d: "M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6" },
    { tag: 'path', d: "M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2" },
    { tag: 'path', d: "M8 10h2" },
    { tag: 'path', d: "M9 22v-8" },
    { tag: 'path', d: "M9 2v4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 450, fill: 'backwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 900, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 180, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 270, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 540, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 720, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 810, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 90, fill: 'backwards' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 360, fill: 'backwards' }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 630, fill: 'backwards' }),
        10: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out' }),
      },
    },
  },
);

/** El teléfono asoma por delante de la tableta. */
export const tabletSmartphoneIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 8, width: 10, height: 14, rx: 2 },
    { tag: 'path', d: "M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" },
    { tag: 'path', d: "M8 18h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_PEEL, 620, { easing: EASE, delay: 160, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E2_PULSE, 460, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track(E2_POP, 300, { easing: EASE, origin: '8px 18px', delay: 320, fill: 'backwards' }),
      },
    },
  },
);

export const tagPlusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 13h6" },
    {
      tag: 'path',
      d: "m16.5 6.5-3.914-3.914A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l1.79-1.79",
    },
    { tag: 'path', d: "M19 10v6" },
    { tag: 'circle', cx: 7.5, cy: 7.5, r: 0.5, fill: "currentColor" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_TURN, 600, { easing: EASE, origin: '19px 13px', delay: 240, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E1_PULSE, 460, { easing: EASE, origin: 'center' }),
        2: /* @__PURE__ */ track(E1_TURN, 600, { easing: EASE, origin: '19px 13px', delay: 240, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E1_POP, 300, { easing: EASE, origin: '7.5px 7.5px', delay: 140, fill: 'backwards' }),
      },
    },
  },
);

/** Y aquí gira la equis. */
export const tagXIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "m16.5 6.5-3.914-3.914A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.43 2.43 0 0 0 3.42 0l1.79-1.79",
    },
    { tag: 'path', d: "m16.5 10.5 5 5" },
    { tag: 'path', d: "m21.5 10.5-5 5" },
    { tag: 'circle', cx: 7.5, cy: 7.5, r: 0.5, fill: "currentColor" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PULSE, 460, { easing: EASE, origin: 'center' }),
        1: /* @__PURE__ */ track(E1_TURN, 600, { easing: EASE, origin: '19px 13px', delay: 240, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E1_TURN, 600, { easing: EASE, origin: '19px 13px', delay: 240, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E1_POP, 300, { easing: EASE, origin: '7.5px 7.5px', delay: 140, fill: 'backwards' }),
      },
    },
  },
);

/** El mercurio sube y el copo destella por brazos. */
export const thermometerSnowflakeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 20-1.25-2.5L6 18" },
    { tag: 'path', d: "M10 4 8.75 6.5 6 6" },
    { tag: 'path', d: "M10.585 15H10" },
    { tag: 'path', d: "M2 12h6.5L10 9" },
    { tag: 'path', d: "M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" },
    { tag: 'path', d: "m4 10 1.5 2L4 14" },
    { tag: 'path', d: "m7 21 3-6-1.5-3" },
    { tag: 'path', d: "m7 3 3 6h2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '8px 19px', delay: 460, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '8px 5px', delay: 400, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '10.3px 15px', delay: 580, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 160, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E3_MERCURY, 620, { easing: EASE, origin: '18px 20px' }),
        5: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '4.7px 12px', delay: 520, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 320, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 240, fill: 'backwards' }),
      },
    },
  },
);

export const thermometerSunIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v2" },
    { tag: 'path', d: "M12 8a4 4 0 0 0-1.645 7.647" },
    { tag: 'path', d: "M2 12h2" },
    { tag: 'path', d: "M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" },
    { tag: 'path', d: "m4.93 4.93 1.41 1.41" },
    { tag: 'path', d: "m6.34 17.66-1.41 1.41" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '12px 3px', delay: 300, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E3_PULSE, 460, { easing: EASE, origin: '12px 12px', delay: 180, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '3px 12px', delay: 380, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E3_MERCURY, 620, { easing: EASE, origin: '18px 20px' }),
        4: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '5.6px 5.6px', delay: 460, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E3_TWINKLE, 300, { easing: EASE, origin: '5.6px 18.4px', delay: 540, fill: 'backwards' }),
      },
    },
  },
);

export const ticketsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8" },
    { tag: 'path', d: "M6 10V8" },
    { tag: 'path', d: "M6 14v1" },
    { tag: 'path', d: "M6 19v2" },
    { tag: 'rect', x: 2, y: 8, width: 20, height: 13, rx: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(E2_CLAP_BODY, 800, { easing: 'ease-in-out', origin: '12.5% 87.5%' }),
      shapes: {
        0: /* @__PURE__ */ track(E2_CLAP_LID, 800, { easing: 'ease-in-out', origin: '3px 8px' }),
      },
    },
  },
);

export const timerResetIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 2h4" },
    { tag: 'path', d: "M12 14v-4" },
    { tag: 'path', d: "M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" },
    { tag: 'path', d: "M9 17H4v5" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(FULL_TURN_CW, 1000, { easing: EASE, origin: '12px 14px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 700, fill: 'backwards' }),
      },
    },
  },
);

/** Las dos rayas de dentro se mueven ATADAS: la vertical se alarga lo justo para no despegarse
 *  de la horizontal cuando esta sube, y se acorta lo mismo cuando baja. */
export const touchpadIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 2, y: 4, width: 20, height: 16, rx: 2 },
    { tag: 'path', d: "M2 14h20" },
    { tag: 'path', d: "M12 20v-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(E3_PAD_ROW, 700, { easing: EASE }),
        2: /* @__PURE__ */ track(E3_PAD_COL, 700, { easing: EASE, origin: '12px 20px' }),
      },
    },
  },
);

export const triangleDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.17 4.193a2 2 0 0 1 3.666.013" },
    { tag: 'path', d: "M14 21h2" },
    { tag: 'path', d: "m15.874 7.743 1 1.732" },
    { tag: 'path', d: "m18.849 12.952 1 1.732" },
    { tag: 'path', d: "M21.824 18.18a2 2 0 0 1-1.835 2.824" },
    { tag: 'path', d: "M4.024 21a2 2 0 0 1-1.839-2.839" },
    { tag: 'path', d: "m5.136 12.952-1 1.732" },
    { tag: 'path', d: "M8 21h2" },
    { tag: 'path', d: "m8.102 7.743-1 1.732" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 280, fill: 'backwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 70, fill: 'backwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 140, fill: 'backwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 210, fill: 'backwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 420, fill: 'backwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 490, fill: 'backwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 350, fill: 'backwards' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 560, fill: 'backwards' }),
      },
    },
  },
);

/** Una sola pieza: late. */
export const triangleRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PULSE, 460, { easing: EASE, origin: 'center' }),
      },
    },
  },
);

/** Arranca y da la vuelta al lienzo, como `truck`, con las ruedas girando y el rayo destellando. */
export const truckElectricIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 19V7a2 2 0 0 0-2-2H9" },
    { tag: 'path', d: "M15 19H9" },
    {
      tag: 'path',
      d: "M19 19h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14",
    },
    { tag: 'path', d: "M2 13v5a1 1 0 0 0 1 1h2" },
    { tag: 'path', d: "M4 3 2.15 5.15a.495.495 0 0 0 .35.86h2.15a.47.47 0 0 1 .35.86L3 9.02" },
    { tag: 'circle', cx: 17, cy: 19, r: 2 },
    { tag: 'circle', cx: 7, cy: 19, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(SHOOT_OFF_KEYFRAMES, 1500),
      shapes: {
        4: /* @__PURE__ */ track(E3_TWINKLE, 340, { easing: 'ease-out', origin: '4px 5px', delay: 200, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E3_ROLL, 900, { easing: EASE, origin: '17px 19px' }),
        6: /* @__PURE__ */ track(E3_ROLL, 900, { easing: EASE, origin: '7px 19px' }),
      },
    },
  },
);

export const tvMinimalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M7 21h10" },
    { tag: 'rect', x: 2, y: 3, width: 20, height: 14, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_POP, 300, { easing: EASE, origin: '12px 21px', delay: 200, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E3_UNFURL, 520, { easing: SPRING_OUT, origin: '12px 10px' }),
      },
    },
  },
);

export const typeOutlineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PULSE, 460, { easing: EASE, origin: 'center' }),
      },
    },
  },
);

/** El paraguas se mece colgado de su copa; la copa no aparece, ya está ahí. */
export const umbrellaIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13v7a2 2 0 0 0 4 0" },
    { tag: 'path', d: "M12 2v2" },
    {
      tag: 'path',
      d: "M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_SWAY, 660, { easing: EASE, origin: '12px 13px' }),
        1: /* @__PURE__ */ track(E3_POP, 280, { easing: 'ease-out', origin: '12px 3px', delay: 200, fill: 'backwards' }),
      },
    },
  },
);

export const unlink2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_PULSE, 460, { easing: EASE, origin: 'center' }),
      },
    },
  },
);

/** La cabeza asoma y el de atrás aparece después: son dos, no un bloque. */
export const usersRoundIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 21a8 8 0 0 0-16 0" },
    { tag: 'circle', cx: 10, cy: 8, r: 5 },
    { tag: 'path', d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_PULSE, 460, { easing: EASE, origin: '10px 18px', delay: 120, fill: 'backwards' }),
        1: /* @__PURE__ */ track(E3_STEP, 520, { easing: EASE }),
        2: /* @__PURE__ */ track(E3_POP, 340, { easing: EASE, origin: '20px 12px', delay: 260, fill: 'backwards' }),
      },
    },
  },
);

/** El objetivo se menea de arriba abajo, elástico; el cuerpo se queda. */
export const videoIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" },
    { tag: 'rect', x: 2, y: 6, width: 14, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_ELASTIC_Y, 720, { easing: EASE }),
      },
    },
  },
);

/** Lo único que se mueve es el pie: se bambolea de lado, elástico. El objetivo se queda quieto. */
export const webcamIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 10, r: 8 },
    { tag: 'circle', cx: 12, cy: 10, r: 3 },
    { tag: 'path', d: "M7 22h10" },
    { tag: 'path', d: "M12 22v-4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(E3_ELASTIC_X, 720, { easing: EASE }),
        3: /* @__PURE__ */ track(E3_ELASTIC_X, 720, { easing: EASE, delay: 60, fill: 'backwards' }),
      },
    },
  },
);

export const wheatIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 22 16 8" },
    {
      tag: 'path',
      d: "M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
    },
    {
      tag: 'path',
      d: "M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
    },
    {
      tag: 'path',
      d: "M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
    },
    { tag: 'path', d: "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" },
    {
      tag: 'path',
      d: "M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
    },
    {
      tag: 'path',
      d: "M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
    },
    {
      tag: 'path',
      d: "M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E3_PULSE, 440, { easing: EASE, origin: '9px 15px' }),
        1: /* @__PURE__ */ track(E3_POP, 320, { easing: EASE, origin: '5px 14px', delay: 100, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E3_POP, 320, { easing: EASE, origin: '9px 10px', delay: 260, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E3_POP, 320, { easing: EASE, origin: '13px 6px', delay: 420, fill: 'backwards' }),
        4: /* @__PURE__ */ track(E3_POP, 320, { easing: EASE, origin: '19px 5px', delay: 580, fill: 'backwards' }),
        5: /* @__PURE__ */ track(E3_POP, 320, { easing: EASE, origin: '9px 19px', delay: 180, fill: 'backwards' }),
        6: /* @__PURE__ */ track(E3_POP, 320, { easing: EASE, origin: '13px 15px', delay: 340, fill: 'backwards' }),
        7: /* @__PURE__ */ track(E3_POP, 320, { easing: EASE, origin: '17px 11px', delay: 500, fill: 'backwards' }),
      },
    },
  },
);

/** La copa da su saltito y el vino baja y sube dentro: se vacía y se llena. */
export const wineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 22h8" },
    { tag: 'path', d: "M7 10h10" },
    { tag: 'path', d: "M12 15v7" },
    { tag: 'path', d: "M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(E3_PULSE, 460, { easing: EASE, origin: 'center' }),
        1: /* @__PURE__ */ track(E3_LIQUID, 700, { easing: EASE, delay: 120, fill: 'backwards' }),
      },
    },
  },
);

export const xLineTopIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 4H6" },
    { tag: 'path', d: "M18 8 6 20" },
    { tag: 'path', d: "m6 8 12 12" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E1_UNFOLD_X, 420, { easing: SPRING_OUT, origin: '6px 4px' }),
        1: /* @__PURE__ */ track(E1_TURN, 600, { easing: EASE, origin: '12px 14px', delay: 180, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E1_TURN, 600, { easing: EASE, origin: '12px 14px', delay: 180, fill: 'backwards' }),
      },
    },
  },
);


// ── Transporte, respuesta y flechas sueltas ────────────────────────────────────────────────
// Este bloque cierra bordes que estaban abiertos por concepto aunque no por familia: `redo*`
// llevaba coreografía y `undo*` no; `play`/`pause` sí y `skip`/`step`/`rewind` no.
// Los `undo*` viven en icons/undo.ts, los `corner*` en icons/corner.ts y los `trending*` en
// icons/trending.ts — aquí queda lo que no alcanza para módulo propio.

/** Golpe: la figura avanza y regresa con resorte. */
const GOLPE_IZQ = /* @__PURE__ */ moveXSeq([0, -2, 0]);
const GOLPE_DER = /* @__PURE__ */ moveXSeq([0, 2, 0]);

/** Y lo golpeado recula: más chico y más tarde que el golpe, o no se lee como consecuencia. */
const RECULA_IZQ = /* @__PURE__ */ moveXSeq([0, -0.9, 0.4, 0]);
const RECULA_DER = /* @__PURE__ */ moveXSeq([0, 0.9, -0.4, 0]);

/**
 * Un PASO, no un empujón: avanza, SE QUEDA ahí un momento y vuelve. Ese reposo a media animación
 * es lo único que separa a `step-*` de `skip-*` — sin él son el mismo gesto con otro nombre.
 */
const PASO_IZQ = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(-1.8px)', offset: 0.4 },
  { transform: 'translateX(-1.8px)', offset: 0.62 },
  { transform: 'translateX(0)', offset: 1 },
];
const PASO_DER = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(1.8px)', offset: 0.4 },
  { transform: 'translateX(1.8px)', offset: 0.62 },
  { transform: 'translateX(0)', offset: 1 },
];

/**
 * `rewind` y `fast-forward` están encajonados por los DOS lados: al triángulo izquierdo le queda 1
 * de margen a la izquierda y al derecho 1 a la derecha. Medido sobre la geometría, no estimado.
 *
 * Por eso aquí NO se aplica el truco de la casa de tomar impulso al revés: el retroceso solo
 * mueve el recorte al otro borde. El recorrido se queda en lo que la figura aguanta, y lo que
 * hace legible la dirección es el desfase de 90 ms entre las dos puntas, no la distancia.
 */
const CADENA_IZQ = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(0.85px)', offset: 0.3 },
  { transform: 'translateX(-0.85px)', offset: 0.7 },
  { transform: 'translateX(0)', offset: 1 },
];
const CADENA_DER = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(-2px)', offset: 0.28 },
  { transform: 'translateX(1px)', offset: 0.62 },
  { transform: 'translateX(0)', offset: 1 },
];
const CADENA_DER_HOLD = /* @__PURE__ */ [{ transform: 'translateX(0)' }, { transform: 'translateX(1px)' }];

/** `eject` expulsa: 1.8 y no más, porque a 2.5 la punta del triángulo se corta contra el borde. */
const EXPULSA = /* @__PURE__ */ moveYSeq([0, -1.8, 0]);
/** Y la ranura acusa el disparo hundiéndose un pelo. Acción y reacción. */
const ACUSA = /* @__PURE__ */ moveYSeq([0, 0.7, 0]);

/**
 * PUNTAS SOLDADAS A LA PLUMA — el mismo mecanismo que `PUNTA_*` en icons/_shared.ts, pero cada
 * asta de aquí tiene su propio largo, así que cada una lleva su offset. El número es la fracción
 * del trazo a la que arranca el último tramo recto, MEDIDA sobre la geometría; el desplazamiento
 * es el largo de ese tramo. Asta y punta comparten duración y easing: eso es lo que las suelda.
 */
const PUNTA_REPLY = [
  { transform: 'translate(12px, 0px)', offset: 0 },
  { transform: 'translate(12px, 0px)', offset: 0.407 },
  { transform: 'translate(0, 0)', offset: 1 },
];
const PUNTA_REPLY_ALL = [
  { transform: 'translate(11px, 0px)', offset: 0 },
  { transform: 'translate(11px, 0px)', offset: 0.4285 },
  { transform: 'translate(0, 0)', offset: 1 },
];
const PUNTA_FORWARD = [
  { transform: 'translate(-12px, 0px)', offset: 0 },
  { transform: 'translate(-12px, 0px)', offset: 0.406 },
  { transform: 'translate(0, 0)', offset: 1 },
];
/** El bucle de `iteration-*` mide 45.7 y su tramo recto solo 8: la punta sale al final del todo. */
const PUNTA_ITER_IZQ = [
  { transform: 'translate(8px, 0px)', offset: 0 },
  { transform: 'translate(8px, 0px)', offset: 0.823 },
  { transform: 'translate(0, 0)', offset: 1 },
];
const PUNTA_ITER_DER = [
  { transform: 'translate(-8px, 0px)', offset: 0 },
  { transform: 'translate(-8px, 0px)', offset: 0.823 },
  { transform: 'translate(0, 0)', offset: 1 },
];
const PUNTA_SHUFFLE_LARGA = [
  { transform: 'translate(-6px, 0px)', offset: 0 },
  { transform: 'translate(-6px, 0px)', offset: 0.766 },
  { transform: 'translate(0, 0)', offset: 1 },
];
const PUNTA_SHUFFLE_CORTA = [
  { transform: 'translate(-6px, 0px)', offset: 0 },
  { transform: 'translate(-6px, 0px)', offset: 0.426 },
  { transform: 'translate(0, 0)', offset: 1 },
];

/**
 * FLECHAS QUE SE ESTIRAN — sin dibujo: la flecha entera existe desde el cuadro 0 y se ALARGA.
 * El asta escala desde su cola y la punta se traslada exactamente lo que el asta crece, así que
 * no pueden despegarse. Los factores salen del largo real de cada asta, no de un valor bonito:
 * un asta de 10 que debe estirarse 2.2 escala (10+2.2)/10.
 *
 * El retroceso previo no es adorno. Los iconos de Lucide ya tocan su caja — hacia cualquier borde
 * queda 1 de margen — y 1 de recorrido se lee como temblor; encogerse primero DUPLICA el trayecto
 * visible sin salirse del lienzo.
 */
const ESTIRA_Y = [
  { transform: 'scaleY(1)', offset: 0 },
  { transform: 'scaleY(0.85)', offset: 0.3 },
  { transform: 'scaleY(1.22)', offset: 0.7 },
  { transform: 'scaleY(1)', offset: 1 },
];
const ESTIRA_X = [
  { transform: 'scaleX(1)', offset: 0 },
  { transform: 'scaleX(0.85)', offset: 0.3 },
  { transform: 'scaleX(1.22)', offset: 0.7 },
  { transform: 'scaleX(1)', offset: 1 },
];
const PUNTA_BAJA = [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-1.5px)', offset: 0.3 },
  { transform: 'translateY(2.2px)', offset: 0.7 },
  { transform: 'translateY(0)', offset: 1 },
];
const PUNTA_SUBE = [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(1.5px)', offset: 0.3 },
  { transform: 'translateY(-2.2px)', offset: 0.7 },
  { transform: 'translateY(0)', offset: 1 },
];
const PUNTA_VA_IZQ = [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(1.5px)', offset: 0.3 },
  { transform: 'translateX(-2.2px)', offset: 0.7 },
  { transform: 'translateX(0)', offset: 1 },
];
const PUNTA_VA_DER = [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(-1.5px)', offset: 0.3 },
  { transform: 'translateX(2.2px)', offset: 0.7 },
  { transform: 'translateX(0)', offset: 1 },
];

/** `share`: asta de 13, y la punta ya toca y=2 — hacia arriba solo caben 0.8 antes de cortarse. */
const ESTIRA_SHARE = [
  { transform: 'scaleY(1)', offset: 0 },
  { transform: 'scaleY(0.8615)', offset: 0.3 },
  { transform: 'scaleY(1.0615)', offset: 0.7 },
  { transform: 'scaleY(1)', offset: 1 },
];
const PUNTA_SHARE = [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(1.8px)', offset: 0.3 },
  { transform: 'translateY(-0.8px)', offset: 0.7 },
  { transform: 'translateY(0)', offset: 1 },
];

/** `arrows-up-from-line`: astas de 14, y la punta arranca en y=3. */
const ESTIRA_SALTO = [
  { transform: 'scaleY(1)', offset: 0 },
  { transform: 'scaleY(0.8929)', offset: 0.3 },
  { transform: 'scaleY(1.1143)', offset: 0.7 },
  { transform: 'scaleY(1)', offset: 1 },
];
const PUNTA_SALTO = [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(1.5px)', offset: 0.3 },
  { transform: 'translateY(-1.6px)', offset: 0.7 },
  { transform: 'translateY(0)', offset: 1 },
];

const ESTIRADO = 520;

/** El triángulo se estrella contra la barra y la barra acusa el golpe. */
export const skipBackIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",
    },
    { tag: 'path', d: "M3 20V4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(GOLPE_IZQ, 420, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(RECULA_IZQ, 380, { delay: 150 }),
      },
    },
  },
);

/** Lo mismo del otro lado: aquí la barra es la figura 0. */
export const skipForwardIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 4v16" },
    {
      tag: 'path',
      d: "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
    },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(GOLPE_DER, 420, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(RECULA_DER, 380, { delay: 150 }),
      },
    },
  },
);

/** Un paso atrás y de regreso. La barra queda quieta: es la pared de la que te alejas. */
export const stepBackIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M13.971 4.285A2 2 0 0 1 17 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",
    },
    { tag: 'path', d: "M21 20V4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(PASO_IZQ, 560),
      },
    },
  },
);

/** Un paso adelante y de regreso. */
export const stepForwardIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
    },
    { tag: 'path', d: "M3 4v16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(PASO_DER, 560),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track([{ transform: 'translateX(0)' }, { transform: 'translateX(1.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las dos puntas retroceden en cadena: primero la de adelante (la izquierda), luego la otra. */
export const rewindIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 12 18z" },
    { tag: 'path', d: "M22 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 22 18z" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CADENA_IZQ, 420, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(CADENA_IZQ, 420, { delay: 90, easing: SPRING_OUT }),
      },
    },
  },
);

/** Igual hacia adelante: la de la derecha va primero, porque es la que abre camino. */
export const fastForwardIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z" },
    { tag: 'path', d: "M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CADENA_DER, 560, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(CADENA_DER, 560, { delay: 110, easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(CADENA_DER_HOLD, 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(CADENA_DER_HOLD, 320, { delay: 80, easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Expulsa: el triángulo salta y la ranura se hunde por el disparo. */
export const ejectIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M4 13a1 1 0 0 1-.72-1.695l7.257-7.668a2 2 0 0 1 2.926 0l7.256 7.668A1 1 0 0 1 20 13z",
    },
    { tag: 'rect', x: 3, y: 17, width: 18, height: 4, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(EXPULSA, 460, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(ACUSA, 380, { delay: 40 }),
      },
    },
  },
);

/** Los dos carriles se trazan cruzados y cada punta viene soldada al suyo. */
export const shuffleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m18 14 4 4-4 4" },
    { tag: 'path', d: "m18 2 4 4-4 4" },
    { tag: 'path', d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" },
    { tag: 'path', d: "M2 6h1.972a4 4 0 0 1 3.6 2.2" },
    { tag: 'path', d: "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 520),
        1: /* @__PURE__ */ track(PUNTA_SHUFFLE_LARGA, 520),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { delay: 160 }),
        4: /* @__PURE__ */ track(TRAZO_INVERSO, 380, { delay: 300 }),
        0: /* @__PURE__ */ track(PUNTA_SHUFFLE_CORTA, 380, { delay: 300 }),
      },
    },
  },
);

/** El gancho se traza y la punta, que ya estaba ahí, sale soldada a la pluma. */
export const replyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M20 18v-2a4 4 0 0 0-4-4H4" },
    { tag: 'path', d: "m9 17-5-5 5-5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 480),
        1: /* @__PURE__ */ track(PUNTA_REPLY, 480),
      },
    },
  },
);

/** Dos puntas soldadas al mismo trazo: viajan juntas, que es como están en reposo. */
export const replyAllIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m12 17-5-5 5-5" },
    { tag: 'path', d: "M22 18v-2a4 4 0 0 0-4-4H7" },
    { tag: 'path', d: "m7 17-5-5 5-5" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 480),
        0: /* @__PURE__ */ track(PUNTA_REPLY_ALL, 480),
        2: /* @__PURE__ */ track(PUNTA_REPLY_ALL, 480),
      },
    },
  },
);

/** El espejo de reply. */
export const forwardIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m15 17 5-5-5-5" },
    { tag: 'path', d: "M4 18v-2a4 4 0 0 1 4-4h12" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 480),
        0: /* @__PURE__ */ track(PUNTA_FORWARD, 480),
      },
    },
  },
);

/** El bucle se traza y la punta sale por su boca, soldada a la pluma. */
export const iterationCwIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 10a8 8 0 1 1 8 8H4" },
    { tag: 'path', d: "m8 22-4-4 4-4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(TRAZO_INVERSO, 560),
        1: /* @__PURE__ */ track(PUNTA_ITER_IZQ, 560),
      },
    },
  },
);

/** Y al revés: aquí el bucle es la figura 1. */
export const iterationCcwIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m16 14 4 4-4 4" },
    { tag: 'path', d: "M20 10a8 8 0 1 0-8 8h8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(TRAZO_INVERSO, 560),
        0: /* @__PURE__ */ track(PUNTA_ITER_DER, 560),
      },
    },
  },
);

/** La flecha se ESTIRA hacia el fondo del montón; las capas ni se enteran. */
export const layerArrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 10v10" },
    { tag: 'path', d: "M22 10a1 1 0 01-.59.92l-5.077 2.308" },
    {
      tag: 'path',
      d: "M22.017 10.005a1 1 0 00-.597-.916l-8.59-3.91a2 2 0 00-1.66.001L2.6 9.08a1 1 0 00-.02 1.831l5.093 2.316",
    },
    { tag: 'path', d: "m9 17 3 3 3-3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ESTIRA_Y, ESTIRADO, { origin: '12px 10px' }),
        3: /* @__PURE__ */ track(PUNTA_BAJA, ESTIRADO),
      },
    },
  },
);

/** Y aquí se estira hacia arriba. La cola es el pivote: es lo que no se mueve. */
export const layerArrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 14V4" },
    {
      tag: 'path',
      d: "M7.674 10.774 2.58 13.09a1 1 0 000 1.822l8.6 3.91a2 2 0 001.65 0l8.58-3.9a1 1 0 00.59-.92 1 1 0 00-.59-.922l-5.078-2.308",
    },
    { tag: 'path', d: "m9 7 3-3 3 3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ESTIRA_Y, ESTIRADO, { origin: '12px 14px' }),
        2: /* @__PURE__ */ track(PUNTA_SUBE, ESTIRADO),
      },
    },
  },
);

/** Quita un decimal: la flecha se estira a la izquierda y el dígito que queda se encoge. */
export const decimalsArrowLeftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m13 21-3-3 3-3" },
    { tag: 'path', d: "M20 18H10" },
    { tag: 'path', d: "M3 11h.01" },
    { tag: 'rect', x: 6, y: 3, width: 5, height: 8, rx: 2.5 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(ESTIRA_X, ESTIRADO, { origin: '20px 18px' }),
        0: /* @__PURE__ */ track(PUNTA_VA_IZQ, ESTIRADO),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.86, 1]), 380, { delay: 240, origin: '8.5px 7px' }),
      },
    },
  },
);

/** Agrega uno: la flecha se estira a la derecha y el segundo dígito APARECE. Esa asimetría es el icono. */
export const decimalsArrowRightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 18h10" },
    { tag: 'path', d: "m17 21 3-3-3-3" },
    { tag: 'path', d: "M3 11h.01" },
    { tag: 'rect', x: 15, y: 3, width: 5, height: 8, rx: 2.5 },
    { tag: 'rect', x: 6, y: 3, width: 5, height: 8, rx: 2.5 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ESTIRA_X, ESTIRADO, { origin: '10px 18px' }),
        1: /* @__PURE__ */ track(PUNTA_VA_DER, ESTIRADO),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 340, { delay: 240, easing: SPRING_OUT, origin: '17.5px 7px' }),
      },
    },
  },
);

/** Las dos flechas se encogen y se estiran fuera de la línea, desfasadas. La línea es el suelo. */
export const arrowsUpFromLineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m4 6 3-3 3 3" },
    { tag: 'path', d: "M7 17V3" },
    { tag: 'path', d: "m14 6 3-3 3 3" },
    { tag: 'path', d: "M17 17V3" },
    { tag: 'path', d: "M4 21h16" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(ESTIRA_SALTO, ESTIRADO, { origin: '7px 17px' }),
        0: /* @__PURE__ */ track(PUNTA_SALTO, ESTIRADO),
        3: /* @__PURE__ */ track(ESTIRA_SALTO, ESTIRADO, { delay: 120, origin: '17px 17px' }),
        2: /* @__PURE__ */ track(PUNTA_SALTO, ESTIRADO, { delay: 120 }),
      },
    },
  },
);

/** Lo que se estira es la flecha, no la caja: se hunde en ella y sale disparada. */
export const shareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v13" },
    { tag: 'path', d: "m16 6-4-4-4 4" },
    { tag: 'path', d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ESTIRA_SHARE, ESTIRADO, { origin: '12px 15px' }),
        1: /* @__PURE__ */ track(PUNTA_SHARE, ESTIRADO),
      },
    },
  },
);

/** Se propaga: late el nodo de origen, la señal recorre cada hilo y el nodo del otro extremo aparece. */
export const share2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 18, cy: 5, r: 3 },
    { tag: 'circle', cx: 6, cy: 12, r: 3 },
    { tag: 'circle', cx: 18, cy: 19, r: 3 },
    { tag: 'line', x1: 8.59, y1: 13.51, x2: 15.42, y2: 17.49 },
    { tag: 'line', x1: 15.41, y1: 6.51, x2: 8.59, y2: 10.49 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.25, 1]), 360, { easing: SPRING_OUT, origin: '6px 12px' }),
        4: /* @__PURE__ */ track(TRAZO_INVERSO, 260, { delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 440, easing: SPRING_OUT, origin: '18px 5px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { delay: 320 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { delay: 560, easing: SPRING_OUT, origin: '18px 19px' }),
      },
    },
  },
);


// ── Layout y formas ────────────────────────────────────────────────────────────────────────
// Los espejos de familias ya curadas viven en sus módulos: icons/rows.ts (espejo de columns-*),
// icons/panels.ts (de panel-*), icons/rectangle.ts y icons/squares.ts. Aquí queda lo que no
// alcanza para módulo propio — familias de dos.

/** Doblar: los dos lados se juntan. Desdoblar: se apartan. La dirección ES el icono. */
const JUNTA_DER = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(2px)', offset: 0.5 },
  { transform: 'translateX(0)', offset: 1 },
];
const JUNTA_IZQ = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(-2px)', offset: 0.5 },
  { transform: 'translateX(0)', offset: 1 },
];
const JUNTA_ABAJO = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(2px)', offset: 0.5 },
  { transform: 'translateY(0)', offset: 1 },
];
const JUNTA_ARRIBA = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-2px)', offset: 0.5 },
  { transform: 'translateY(0)', offset: 1 },
];

/**
 * Desdoblar es hacia AFUERA, y afuera solo queda 1 de margen — medido: las líneas y los galones
 * de `unfold-*` tocan 2 y 22. Así que primero se juntan y luego salen: 1.5 hacia adentro más 0.9
 * hacia afuera dan 2.4 de recorrido visible sin que el trazo se corte contra el borde.
 */
const ABRE_DER = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(-1.5px)', offset: 0.32 },
  { transform: 'translateX(0.9px)', offset: 0.72 },
  { transform: 'translateX(0)', offset: 1 },
];
const ABRE_IZQ = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(1.5px)', offset: 0.32 },
  { transform: 'translateX(-0.9px)', offset: 0.72 },
  { transform: 'translateX(0)', offset: 1 },
];
const ABRE_ABAJO = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-1.5px)', offset: 0.32 },
  { transform: 'translateY(0.9px)', offset: 0.72 },
  { transform: 'translateY(0)', offset: 1 },
];
const ABRE_ARRIBA = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(1.5px)', offset: 0.32 },
  { transform: 'translateY(-0.9px)', offset: 0.72 },
  { transform: 'translateY(0)', offset: 1 },
];

/**
 * Voltear: cada mitad se aplasta contra el eje hasta casi desaparecer y vuelve. Eso es lo que se
 * ve cuando una figura gira de canto, y el pivote va en su borde INTERIOR — el que toca el eje —
 * porque es el único punto que en un volteo real se queda quieto.
 */
const VOLTEA_X = /* @__PURE__ */ [
  { transform: 'scaleX(1)', offset: 0 },
  { transform: 'scaleX(0.12)', offset: 0.5 },
  { transform: 'scaleX(1)', offset: 1 },
];
const VOLTEA_Y = /* @__PURE__ */ [
  { transform: 'scaleY(1)', offset: 0 },
  { transform: 'scaleY(0.12)', offset: 0.5 },
  { transform: 'scaleY(1)', offset: 1 },
];

/** Separador: los dos galones se apartan de la línea. La línea es lo que separa: no se mueve. */
const APARTA_ARRIBA = /* @__PURE__ */ moveYSeq([0, -1.5, 0]);
const APARTA_ABAJO = /* @__PURE__ */ moveYSeq([0, 1.5, 0]);
const APARTA_IZQ = /* @__PURE__ */ moveXSeq([0, -1.5, 0]);
const APARTA_DER = /* @__PURE__ */ moveXSeq([0, 1.5, 0]);

/** `stretch-*`: las barras se estiran en el eje que el nombre dice, y hacia ahí queda 1. */
const ESTIRA_BARRA_X = /* @__PURE__ */ [
  { transform: 'scaleX(1)', offset: 0 },
  { transform: 'scaleX(0.93)', offset: 0.32 },
  { transform: 'scaleX(1.05)', offset: 0.7 },
  { transform: 'scaleX(1)', offset: 1 },
];
const ESTIRA_BARRA_Y = /* @__PURE__ */ [
  { transform: 'scaleY(1)', offset: 0 },
  { transform: 'scaleY(0.93)', offset: 0.32 },
  { transform: 'scaleY(1.05)', offset: 0.7 },
  { transform: 'scaleY(1)', offset: 1 },
];


/** El mismo apagado en cadena de `squares-*`, aquí dando la vuelta al anillo. */
const GIRA_APAGADO = /* @__PURE__ */ [
  { opacity: '1', offset: 0 },
  { opacity: '0.25', offset: 0.4 },
  { opacity: '1', offset: 1 },
];

/** Ni cuadrado ni círculo: se aplasta y se estira como algo blando. Eso es un squircle. */
export const squircleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'scale(1, 1)', offset: 0 },
          { transform: 'scale(1.08, 0.94)', offset: 0.35 },
          { transform: 'scale(0.96, 1.06)', offset: 0.65 },
          { transform: 'scale(1, 1)', offset: 1 },
        ], 560, { easing: EASE, origin: '12px 12px' }),
      },
    },
  },
);

/** Los ocho trazos se apagan y encienden dando la vuelta, en el orden del reloj. */
export const squircleDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.77 3.043a34 34 0 0 0-3.54 0" },
    { tag: 'path', d: "M13.771 20.956a33 33 0 0 1-3.541.001" },
    { tag: 'path', d: "M20.18 17.74c-.51 1.15-1.29 1.93-2.439 2.44" },
    { tag: 'path', d: "M20.18 6.259c-.51-1.148-1.291-1.929-2.44-2.438" },
    { tag: 'path', d: "M20.957 10.23a33 33 0 0 1 0 3.54" },
    { tag: 'path', d: "M3.043 10.23a34 34 0 0 0 .001 3.541" },
    { tag: 'path', d: "M6.26 20.179c-1.15-.508-1.93-1.29-2.44-2.438" },
    { tag: 'path', d: "M6.26 3.82c-1.149.51-1.93 1.291-2.44 2.44" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(GIRA_APAGADO, 420),
        3: /* @__PURE__ */ track(GIRA_APAGADO, 420, { delay: 60 }),
        4: /* @__PURE__ */ track(GIRA_APAGADO, 420, { delay: 120 }),
        2: /* @__PURE__ */ track(GIRA_APAGADO, 420, { delay: 180 }),
        1: /* @__PURE__ */ track(GIRA_APAGADO, 420, { delay: 240 }),
        6: /* @__PURE__ */ track(GIRA_APAGADO, 420, { delay: 300 }),
        5: /* @__PURE__ */ track(GIRA_APAGADO, 420, { delay: 360 }),
        7: /* @__PURE__ */ track(GIRA_APAGADO, 420, { delay: 420 }),
      },
    },
  },
);

/** Los dos galones se apartan de la línea; la línea es lo que separa y no se mueve. */
export const separatorHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m16 16-4 4-4-4" },
    { tag: 'path', d: "M3 12h18" },
    { tag: 'path', d: "m8 8 4-4 4 4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(APARTA_ARRIBA, 460, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(APARTA_ABAJO, 460, { easing: SPRING_OUT }),
      },
    },
  },
);

/** Lo mismo de canto. */
export const separatorVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 3v18" },
    { tag: 'path', d: "m16 16 4-4-4-4" },
    { tag: 'path', d: "m8 8-4 4 4 4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(APARTA_IZQ, 460, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(APARTA_DER, 460, { easing: SPRING_OUT }),
      },
    },
  },
);

/** Las dos barras se estiran a lo ancho, una tras otra. */
export const stretchHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 2, y: 4, width: 20, height: 6, rx: 2 },
    { tag: 'rect', x: 2, y: 14, width: 20, height: 6, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ESTIRA_BARRA_X, 520, { origin: '12px 7px' }),
        1: /* @__PURE__ */ track(ESTIRA_BARRA_X, 520, { delay: 90, origin: '12px 17px' }),
      },
    },
  },
);

/** Y estas a lo alto. */
export const stretchVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 4, y: 2, width: 6, height: 20, rx: 2 },
    { tag: 'rect', x: 14, y: 2, width: 6, height: 20, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ESTIRA_BARRA_Y, 520, { origin: '7px 12px' }),
        1: /* @__PURE__ */ track(ESTIRA_BARRA_Y, 520, { delay: 90, origin: '17px 12px' }),
      },
    },
  },
);

/** Se dobla: cada lado se va hacia el centro con su galón. Las marcas del pliegue no se mueven. */
export const foldHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 12h6" },
    { tag: 'path', d: "M22 12h-6" },
    { tag: 'path', d: "M12 2v2" },
    { tag: 'path', d: "M12 8v2" },
    { tag: 'path', d: "M12 14v2" },
    { tag: 'path', d: "M12 20v2" },
    { tag: 'path', d: "m19 9-3 3 3 3" },
    { tag: 'path', d: "m5 15 3-3-3-3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(JUNTA_DER, 480, { easing: EASE }),
        7: /* @__PURE__ */ track(JUNTA_DER, 480, { easing: EASE }),
        1: /* @__PURE__ */ track(JUNTA_IZQ, 480, { easing: EASE }),
        6: /* @__PURE__ */ track(JUNTA_IZQ, 480, { easing: EASE }),
      },
    },
  },
);

/** Lo mismo en vertical: arriba baja y abajo sube. */
export const foldVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 22v-6" },
    { tag: 'path', d: "M12 8V2" },
    { tag: 'path', d: "M4 12H2" },
    { tag: 'path', d: "M10 12H8" },
    { tag: 'path', d: "M16 12h-2" },
    { tag: 'path', d: "M22 12h-2" },
    { tag: 'path', d: "m15 19-3-3-3 3" },
    { tag: 'path', d: "m15 5-3 3-3-3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(JUNTA_ABAJO, 480, { easing: EASE }),
        7: /* @__PURE__ */ track(JUNTA_ABAJO, 480, { easing: EASE }),
        0: /* @__PURE__ */ track(JUNTA_ARRIBA, 480, { easing: EASE }),
        6: /* @__PURE__ */ track(JUNTA_ARRIBA, 480, { easing: EASE }),
      },
    },
  },
);

/** Se abre: cada lado sale hacia afuera. Toma impulso hacia adentro porque afuera solo queda 1. */
export const unfoldHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 12h6" },
    { tag: 'path', d: "M8 12H2" },
    { tag: 'path', d: "M12 2v2" },
    { tag: 'path', d: "M12 8v2" },
    { tag: 'path', d: "M12 14v2" },
    { tag: 'path', d: "M12 20v2" },
    { tag: 'path', d: "m19 15 3-3-3-3" },
    { tag: 'path', d: "m5 9-3 3 3 3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ABRE_DER, 520, { easing: EASE }),
        6: /* @__PURE__ */ track(ABRE_DER, 520, { easing: EASE }),
        1: /* @__PURE__ */ track(ABRE_IZQ, 520, { easing: EASE }),
        7: /* @__PURE__ */ track(ABRE_IZQ, 520, { easing: EASE }),
      },
    },
  },
);

/** Y este se abre a lo alto. */
export const unfoldVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 22v-6" },
    { tag: 'path', d: "M12 8V2" },
    { tag: 'path', d: "M4 12H2" },
    { tag: 'path', d: "M10 12H8" },
    { tag: 'path', d: "M16 12h-2" },
    { tag: 'path', d: "M22 12h-2" },
    { tag: 'path', d: "m15 19-3 3-3-3" },
    { tag: 'path', d: "m15 5-3-3-3 3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ABRE_ABAJO, 520, { easing: EASE }),
        6: /* @__PURE__ */ track(ABRE_ABAJO, 520, { easing: EASE }),
        1: /* @__PURE__ */ track(ABRE_ARRIBA, 520, { easing: EASE }),
        7: /* @__PURE__ */ track(ABRE_ARRIBA, 520, { easing: EASE }),
      },
    },
  },
);

/** Cada mitad gira de canto contra el eje. El pivote va en su borde interior: es lo único que en un volteo real se queda quieto. */
export const flipHorizontal2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m3 7 5 5-5 5V7" },
    { tag: 'path', d: "m21 7-5 5 5 5V7" },
    { tag: 'path', d: "M12 20v2" },
    { tag: 'path', d: "M12 14v2" },
    { tag: 'path', d: "M12 8v2" },
    { tag: 'path', d: "M12 2v2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(VOLTEA_X, 560, { easing: EASE, origin: '8px 12px' }),
        1: /* @__PURE__ */ track(VOLTEA_X, 560, { easing: EASE, origin: '16px 12px' }),
      },
    },
  },
);

/** Y aquí el eje es horizontal. */
export const flipVertical2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m17 3-5 5-5-5h10" },
    { tag: 'path', d: "m17 21-5-5-5 5h10" },
    { tag: 'path', d: "M4 12H2" },
    { tag: 'path', d: "M10 12H8" },
    { tag: 'path', d: "M16 12h-2" },
    { tag: 'path', d: "M22 12h-2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(VOLTEA_Y, 560, { easing: EASE, origin: '12px 8px' }),
        1: /* @__PURE__ */ track(VOLTEA_Y, 560, { easing: EASE, origin: '12px 16px' }),
      },
    },
  },
);

/** Cada pomo se mueve y sus dos tramos de riel se ajustan LO MISMO: uno crece lo que el otro encoge, así que el riel nunca se despega ni se solapa. */
export const slidersHorizontalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 5H3" },
    { tag: 'path', d: "M12 19H3" },
    { tag: 'path', d: "M14 3v4" },
    { tag: 'path', d: "M16 17v4" },
    { tag: 'path', d: "M21 12h-9" },
    { tag: 'path', d: "M21 19h-5" },
    { tag: 'path', d: "M21 5h-7" },
    { tag: 'path', d: "M8 10v4" },
    { tag: 'path', d: "M8 12H3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(1.2143)', offset: 0.5 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 520, { origin: '3px 5px' }),
        6: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(0.7857)', offset: 0.5 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 520, { origin: '21px 5px' }),
        2: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(1.5px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 520),
        8: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(0.7)', offset: 0.5 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 520, { origin: '3px 12px', delay: 90 }),
        4: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(1.1667)', offset: 0.5 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 520, { origin: '21px 12px', delay: 90 }),
        7: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-1.5px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 520, { delay: 90 }),
        1: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(1.1667)', offset: 0.5 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 520, { origin: '3px 19px', delay: 180 }),
        5: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(0.7)', offset: 0.5 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 520, { origin: '21px 19px', delay: 180 }),
        3: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(1.5px)', offset: 0.5 },
          { transform: 'translateX(0)', offset: 1 },
        ], 520, { delay: 180 }),
      },
    },
  },
);

/** Lo mismo de pie. */
export const slidersVerticalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 8h4" },
    { tag: 'path', d: "M12 21v-9" },
    { tag: 'path', d: "M12 8V3" },
    { tag: 'path', d: "M17 16h4" },
    { tag: 'path', d: "M19 12V3" },
    { tag: 'path', d: "M19 21v-5" },
    { tag: 'path', d: "M3 14h4" },
    { tag: 'path', d: "M5 10V3" },
    { tag: 'path', d: "M5 21v-7" },
  ],
  {
    default: {
      shapes: {
        7: /* @__PURE__ */ track([
          { transform: 'scaleY(1)', offset: 0 },
          { transform: 'scaleY(0.7857)', offset: 0.5 },
          { transform: 'scaleY(1)', offset: 1 },
        ], 520, { origin: '5px 3px' }),
        8: /* @__PURE__ */ track([
          { transform: 'scaleY(1)', offset: 0 },
          { transform: 'scaleY(1.2143)', offset: 0.5 },
          { transform: 'scaleY(1)', offset: 1 },
        ], 520, { origin: '5px 21px' }),
        6: /* @__PURE__ */ track([
          { transform: 'translateY(0)', offset: 0 },
          { transform: 'translateY(-1.5px)', offset: 0.5 },
          { transform: 'translateY(0)', offset: 1 },
        ], 520),
        2: /* @__PURE__ */ track([
          { transform: 'scaleY(1)', offset: 0 },
          { transform: 'scaleY(1.3)', offset: 0.5 },
          { transform: 'scaleY(1)', offset: 1 },
        ], 520, { origin: '12px 3px', delay: 90 }),
        1: /* @__PURE__ */ track([
          { transform: 'scaleY(1)', offset: 0 },
          { transform: 'scaleY(0.8333)', offset: 0.5 },
          { transform: 'scaleY(1)', offset: 1 },
        ], 520, { origin: '12px 21px', delay: 90 }),
        0: /* @__PURE__ */ track([
          { transform: 'translateY(0)', offset: 0 },
          { transform: 'translateY(1.5px)', offset: 0.5 },
          { transform: 'translateY(0)', offset: 1 },
        ], 520, { delay: 90 }),
        4: /* @__PURE__ */ track([
          { transform: 'scaleY(1)', offset: 0 },
          { transform: 'scaleY(0.8333)', offset: 0.5 },
          { transform: 'scaleY(1)', offset: 1 },
        ], 520, { origin: '19px 3px', delay: 180 }),
        5: /* @__PURE__ */ track([
          { transform: 'scaleY(1)', offset: 0 },
          { transform: 'scaleY(1.3)', offset: 0.5 },
          { transform: 'scaleY(1)', offset: 1 },
        ], 520, { origin: '19px 21px', delay: 180 }),
        3: /* @__PURE__ */ track([
          { transform: 'translateY(0)', offset: 0 },
          { transform: 'translateY(-1.5px)', offset: 0.5 },
          { transform: 'translateY(0)', offset: 1 },
        ], 520, { delay: 180 }),
      },
    },
  },
);


// ── Tipografía ─────────────────────────────────────────────────────────────────────────────
// Cada icono anima LO QUE LE HACE AL TEXTO: negrita engorda, cursiva se inclina, subrayado barre
// la línea, subíndice baja y superíndice sube. El nombre ya dice cuál es su animación, así que
// aquí no hay un gesto genérico repartido entre todos.
//
// Las familias de tres o más viven en su módulo: icons/heading.ts, icons/case.ts, icons/pilcrow.ts.

/**
 * `bold` es el único icono del catálogo donde escalar ENGORDA a propósito. Escalar una figura
 * escala también su trazo, y en todos los demás eso es un efecto colateral que se tolera; aquí
 * es justo lo que el icono significa.
 */
const ENGORDA = [
          { transform: 'scale(1)', offset: 0 },
          { transform: 'scale(1.14)', offset: 0.5 },
          { transform: 'scale(1)', offset: 1 },
        ];

/**
 * `italic` se inclina MÁS de lo que ya está, con un contraapoyo al principio. Y va con `skewX`,
 * no con un giro: girar la letra movería también sus dos remates horizontales, que en una cursiva
 * real se quedan planos sobre la línea.
 */
const INCLINA = [
          { transform: 'skewX(0deg)', offset: 0 },
          { transform: 'skewX(3deg)', offset: 0.3 },
          { transform: 'skewX(-8deg)', offset: 0.7 },
          { transform: 'skewX(0deg)', offset: 1 },
        ];

/** La raya barre desde su extremo izquierdo, que es por donde empieza a escribirse. */
const BARRE = /* @__PURE__ */ [{ transform: 'scaleX(0.05)' }, { transform: 'scaleX(1)' }];


/** El texto pierde su formato: se apaga un instante y vuelve. */
const APAGA = /* @__PURE__ */ [
  { opacity: '1', offset: 0 },
  { opacity: '0.3', offset: 0.45 },
  { opacity: '1', offset: 1 },
];

/** Engorda: al escalar, el trazo se engrosa con la letra. Aquí eso no es efecto colateral, es el icono. */
export const boldIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ENGORDA, 480, { easing: EASE, origin: '12px 12px' }),
      },
    },
  },
);

/** Se inclina más, después de un contraapoyo. Con skewX: los remates de una cursiva no giran. */
export const italicIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'line', x1: 19, y1: 4, x2: 10, y2: 4 },
    { tag: 'line', x1: 14, y1: 20, x2: 5, y2: 20 },
    { tag: 'line', x1: 15, y1: 4, x2: 9, y2: 20 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(INCLINA, 560, { easing: EASE }),
    },
  },
);

/** La raya barre por debajo y la letra se asienta encima de ella. */
export const underlineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 4v6a6 6 0 0 0 12 0V4" },
    { tag: 'line', x1: 4, y1: 20, x2: 20, y2: 20 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(BARRE, 420, { easing: SPRING_OUT, origin: '4px 20px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.8, 0]), 400, { easing: SPRING_OUT, delay: 300 }),
      },
    },
  },
);

/** La raya tacha y la letra se abre por donde la cortó. Causa y efecto. */
export const strikethroughIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 4H9a3 3 0 0 0-2.83 4" },
    { tag: 'path', d: "M14 12a4 4 0 0 1 0 8H6" },
    { tag: 'line', x1: 4, y1: 12, x2: 20, y2: 12 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(BARRE, 420, { easing: SPRING_OUT, origin: '4px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.7, 0]), 420, { easing: SPRING_OUT, delay: 260 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.7, 0]), 420, { easing: SPRING_OUT, delay: 260 }),
      },
    },
  },
);

/** El carácter chico BAJA a su sitio. Eso es un subíndice. */
export const subscriptIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m4 5 8 8" },
    { tag: 'path', d: "m12 5-8 8" },
    {
      tag: 'path',
      d: "M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2, 0]), 460, { easing: SPRING_OUT }),
      },
    },
  },
);

/** Y aquí SUBE. */
export const superscriptIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m4 19 8-8" },
    { tag: 'path', d: "m12 19-8-8" },
    {
      tag: 'path',
      d: "M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([2, 0]), 460, { easing: SPRING_OUT }),
      },
    },
  },
);

/** La letra aterriza sobre la línea de escritura y la línea acusa el golpe. */
export const baselineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 20h16" },
    { tag: 'path', d: "m6 16 6-12 6 12" },
    { tag: 'path', d: "M8 12h8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2, 0]), 460, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-2, 0]), 460, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.5, 0]), 380, { easing: EASE, delay: 220 }),
      },
    },
  },
);

/** Una ligadura JUNTA dos letras: se acercan una a la otra y el trazo que las une se queda. */
export const ligatureIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 12h2v8" },
    { tag: 'path', d: "M14 20h4" },
    { tag: 'path', d: "M6 12h4" },
    { tag: 'path', d: "M6 20h4" },
    { tag: 'path', d: "M8 20V8a4 4 0 0 1 7.464-2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1.2, 0]), 480, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -1.2, 0]), 480, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.6, 0]), 480, { easing: SPRING_OUT }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.6, 0]), 480, { easing: SPRING_OUT }),
      },
    },
  },
);

/** Las dos letras botan y el corchete se cierra alrededor: la palabra entera. */
export const wholeWordIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 7, cy: 12, r: 3 },
    { tag: 'path', d: "M10 9v6" },
    { tag: 'circle', cx: 17, cy: 12, r: 3 },
    { tag: 'path', d: "M14 7v8" },
    { tag: 'path', d: "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.2, 0]), 440, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.2, 0]), 440, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.2, 0]), 440, { easing: SPRING_OUT, delay: 100 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.2, 0]), 440, { easing: SPRING_OUT, delay: 100 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.05, 1]), 400, { easing: EASE, delay: 220, origin: '12px 18px' }),
      },
    },
  },
);

/** El asterisco gira 60°, que es justo su simetría: acaba idéntico a como empezó. */
export const regexIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 3v10" },
    { tag: 'path', d: "m12.67 5.5 8.66 5" },
    { tag: 'path', d: "m12.67 10.5 8.66-5" },
    { tag: 'path', d: "M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 60]), 520, { easing: SPRING_OUT, origin: '17px 8px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 60]), 520, { easing: SPRING_OUT, origin: '17px 8px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 60]), 520, { easing: SPRING_OUT, origin: '17px 8px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 420, { easing: EASE, delay: 140, origin: '6px 18px' }),
      },
    },
  },
);

/** La equis entra de golpe y el texto se apaga un instante: acaba de perder su formato. */
export const removeFormattingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 7V4h16v3" },
    { tag: 'path', d: "M5 20h6" },
    { tag: 'path', d: "M13 4 8 20" },
    { tag: 'path', d: "m15 15 5 5" },
    { tag: 'path', d: "m20 15-5 5" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(X_SNAP_DRAW, 380, { easing: SPRING_OUT, origin: '17.5px 17.5px' }),
        4: /* @__PURE__ */ track(X_SNAP_DRAW, 380, { easing: SPRING_OUT, delay: 90, origin: '17.5px 17.5px' }),
        0: /* @__PURE__ */ track(APAGA, 460, { delay: 200 }),
        1: /* @__PURE__ */ track(APAGA, 460, { delay: 200 }),
        2: /* @__PURE__ */ track(APAGA, 460, { delay: 200 }),
      },
    },
  },
);

/** El plumón pasa por su propia diagonal y la marca que deja se aviva detrás. */
export const highlighterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m9 11-6 6v3h9l3-3" },
    { tag: 'path', d: "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'translate(0, 0)', offset: 0 },
          { transform: 'translate(-1.2px, 1.2px)', offset: 0.45 },
          { transform: 'translate(0, 0)', offset: 1 },
        ], 520, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.07, 1]), 420, { easing: EASE, delay: 160, origin: '9px 17px' }),
      },
    },
  },
);

/** Las dos comillas caen, la de abrir primero. */
export const quoteIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
    },
    {
      tag: 'path',
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
    },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 440, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 440, { easing: SPRING_OUT, delay: 100 }),
      },
    },
  },
);

/** Sube el cuerpo de letra: la flecha se estira hacia arriba y la A crece con ella. */
export const aArrowUpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m14 11 4-4 4 4" },
    { tag: 'path', d: "M18 16V7" },
    { tag: 'path', d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" },
    { tag: 'path', d: "M3.304 13h6.392" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'scaleY(1)', offset: 0 },
          { transform: 'scaleY(1.1333)', offset: 0.5 },
          { transform: 'scaleY(1)', offset: 1 },
        ], 500, { easing: EASE, origin: '18px 16px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.2, 0]), 500, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.06, 1]), 500, { easing: EASE, origin: '6.5px 16px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.06, 1]), 500, { easing: EASE, origin: '6.5px 16px' }),
      },
    },
  },
);

/** Y aquí lo baja. La flecha crece desde ARRIBA, que es su extremo fijo. */
export const aArrowDownIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m14 12 4 4 4-4" },
    { tag: 'path', d: "M18 16V7" },
    { tag: 'path', d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" },
    { tag: 'path', d: "M3.304 13h6.392" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'scaleY(1)', offset: 0 },
          { transform: 'scaleY(1.1333)', offset: 0.5 },
          { transform: 'scaleY(1)', offset: 1 },
        ], 500, { easing: EASE, origin: '18px 7px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1.2, 0]), 500, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.94, 1]), 500, { easing: EASE, origin: '6.5px 16px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.94, 1]), 500, { easing: EASE, origin: '6.5px 16px' }),
      },
    },
  },
);

/** La grande crece y la chica encoge a la vez: la diferencia entre las dos ES el icono. */
export const aLargeSmallIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16" },
    { tag: 'path', d: "M15.697 14h5.606" },
    { tag: 'path', d: "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16" },
    { tag: 'path', d: "M3.304 13h6.392" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 520, { easing: EASE, origin: '6.5px 16px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 520, { easing: EASE, origin: '6.5px 16px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.88, 1]), 520, { easing: EASE, origin: '18.5px 16px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.88, 1]), 520, { easing: EASE, origin: '18.5px 16px' }),
      },
    },
  },
);


// ── Símbolos pelados ───────────────────────────────────────────────────────────────────────
// `badge-dollar-sign` y `circle-dollar-sign` llevaban coreografía y el `$` desnudo no. Doce
// símbolos estaban igual: enmarcados sí, de a pie no.
//
// No se copió al hermano enmarcado a propósito — casi todos son `strokeDraw` escalonado. Aquí
// cada símbolo anima lo suyo, y en las monedas eso es claro: casi todas son una LETRA ATRAVESADA
// POR BARRAS, y la barra es lo que convierte una letra en dinero. La letra se asienta y las
// barras la cruzan. Cambia cuántas hay y por dónde entran, que es lo que distingue una moneda
// de otra.

/** La barra cruza desde el lado por el que entra. Nunca desde el centro: una moneda se escribe. */
const CRUZA = /* @__PURE__ */ [{ transform: 'scaleX(0.15)' }, { transform: 'scaleX(1)' }];
/** Igual para las diagonales, donde escalar en un solo eje las deformaría. */
const CRUZA_DIAG = /* @__PURE__ */ [{ transform: 'scale(0.15)' }, { transform: 'scale(1)' }];
/** El trazo vertical del `$` y de `phi` no entra por un lado: atraviesa desde el centro. */
const ATRAVIESA = /* @__PURE__ */ [{ transform: 'scaleY(0.4)' }, { transform: 'scaleY(1)' }];
/** La letra solo acusa el paso de la barra. */
const ASIENTA = /* @__PURE__ */ scaleSeq([1, 1.06, 1]);

/**
 * Tres símbolos giran justo su propia simetría y acaban IDÉNTICOS a como empezaron: el asterisco
 * 60° (seis radios), la equis de `variable` 90° (dos diagonales). Por eso el regreso al reposo
 * no se ve, aunque el track no tenga `fill` — el cuadro final y el inicial son el mismo dibujo.
 */
const GIRA_60 = /* @__PURE__ */ rotateSeq([0, 60]);
const GIRA_90 = /* @__PURE__ */ rotateSeq([0, 90]);

/** La ese se asienta y el trazo la atraviesa desde el centro, hacia los dos extremos. */
export const dollarSignIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'line', x1: 12, y1: 2, x2: 12, y2: 22 },
    { tag: 'path', d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '12px 12px' }),
        0: /* @__PURE__ */ track(ATRAVIESA, 460, { easing: SPRING_OUT, origin: '12px 12px', delay: 80 }),
      },
    },
  },
);

/** La ce se asienta y las dos barras la cruzan desde la izquierda, una tras otra. */
export const euroIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 10h12" },
    { tag: 'path', d: "M4 14h9" },
    {
      tag: 'path',
      d: "M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '12px 12px' }),
        0: /* @__PURE__ */ track(CRUZA, 420, { easing: SPRING_OUT, origin: '4px 10px', delay: 80 }),
        1: /* @__PURE__ */ track(CRUZA, 420, { easing: SPRING_OUT, origin: '4px 14px', delay: 170 }),
      },
    },
  },
);

/** El travesaño es lo que hace libra: entra por la izquierda y el resto solo se asienta. */
export const poundSterlingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 7c0-5.333-8-5.333-8 0" },
    { tag: 'path', d: "M10 7v14" },
    { tag: 'path', d: "M6 21h12" },
    { tag: 'path', d: "M6 13h10" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '14px 7px' }),
        1: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '10px 14px' }),
        3: /* @__PURE__ */ track(CRUZA, 420, { easing: SPRING_OUT, origin: '6px 13px', delay: 80 }),
      },
    },
  },
);

/** Dos barras sobre la ye, de arriba abajo. */
export const japaneseYenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 9.5V21m0-11.5L6 3m6 6.5L18 3" },
    { tag: 'path', d: "M6 15h12" },
    { tag: 'path', d: "M6 11h12" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(CRUZA, 420, { easing: SPRING_OUT, origin: '6px 11px', delay: 80 }),
        1: /* @__PURE__ */ track(CRUZA, 420, { easing: SPRING_OUT, origin: '6px 15px', delay: 170 }),
      },
    },
  },
);

/** Las dos barras de arriba entran primero; el bucle y la pierna se asientan. */
export const indianRupeeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 3h12" },
    { tag: 'path', d: "M6 8h12" },
    { tag: 'path', d: "m6 13 8.5 8" },
    { tag: 'path', d: "M6 13h3" },
    { tag: 'path', d: "M9 13c6.667 0 6.667-10 0-10" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(CRUZA, 420, { easing: SPRING_OUT, origin: '6px 3px' }),
        1: /* @__PURE__ */ track(CRUZA, 420, { easing: SPRING_OUT, origin: '6px 8px', delay: 90 }),
        4: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '9px 8px', delay: 180 }),
        2: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '6px 13px', delay: 180 }),
      },
    },
  },
);

/** Una sola barra, y basta: es lo único que separa una erre de un rublo. */
export const russianRubleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 11h8a4 4 0 0 0 0-8H9v18" },
    { tag: 'path', d: "M6 15h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '9px 12px' }),
        1: /* @__PURE__ */ track(CRUZA, 420, { easing: SPRING_OUT, origin: '6px 15px', delay: 80 }),
      },
    },
  },
);

/** Las dos barras diagonales entran desde su extremo derecho; los ganchos se asientan. */
export const saudiRiyalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m20 19.5-5.5 1.2" },
    { tag: 'path', d: "M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2" },
    { tag: 'path', d: "m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2" },
    { tag: 'path', d: "M20 10 4 13.5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '10px 12px' }),
        1: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '15px 10px' }),
        3: /* @__PURE__ */ track(CRUZA_DIAG, 420, { easing: SPRING_OUT, origin: '20px 10px', delay: 90 }),
        0: /* @__PURE__ */ track(CRUZA_DIAG, 420, { easing: SPRING_OUT, origin: '20px 19.5px', delay: 180 }),
      },
    },
  },
);

/** Dos travesaños sobre la efe, de arriba abajo. */
export const swissFrancIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 21V3h8" },
    { tag: 'path', d: "M6 16h9" },
    { tag: 'path', d: "M10 9.5h7" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '10px 12px' }),
        2: /* @__PURE__ */ track(CRUZA, 420, { easing: SPRING_OUT, origin: '10px 9.5px', delay: 80 }),
        1: /* @__PURE__ */ track(CRUZA, 420, { easing: SPRING_OUT, origin: '6px 16px', delay: 170 }),
      },
    },
  },
);

/** Las dos barras bajan en diagonal desde la derecha, cruzando la ele. */
export const turkishLiraIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 4 5 9" },
    { tag: 'path', d: "m15 8.5-10 5" },
    { tag: 'path', d: "M18 12a9 9 0 0 1-9 9V3" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '12px 12px' }),
        0: /* @__PURE__ */ track(CRUZA_DIAG, 420, { easing: SPRING_OUT, origin: '15px 4px', delay: 80 }),
        1: /* @__PURE__ */ track(CRUZA_DIAG, 420, { easing: SPRING_OUT, origin: '15px 8.5px', delay: 170 }),
      },
    },
  },
);

/** Dos barras sobre la pe. */
export const philippinePesoIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M20 11H4" },
    { tag: 'path', d: "M20 7H4" },
    { tag: 'path', d: "M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '10px 12px' }),
        1: /* @__PURE__ */ track(CRUZA, 420, { easing: SPRING_OUT, origin: '4px 7px', delay: 80 }),
        0: /* @__PURE__ */ track(CRUZA, 420, { easing: SPRING_OUT, origin: '4px 11px', delay: 170 }),
      },
    },
  },
);

/** Aquí la barra no cruza: es el suelo, y entra al final. */
export const georgianLariIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11.5 21a7.5 7.5 0 1 1 7.35-9" },
    { tag: 'path', d: "M13 12V3" },
    { tag: 'path', d: "M4 21h16" },
    { tag: 'path', d: "M9 12V3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '11.5px 13.5px' }),
        3: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '9px 7.5px' }),
        1: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '13px 7.5px' }),
        2: /* @__PURE__ */ track(CRUZA, 420, { easing: SPRING_OUT, origin: '4px 21px', delay: 120 }),
      },
    },
  },
);

/** Una moneda: gira de canto y vuelve. Es una figura sola, así que no hay nada que desfasar — y no hace falta. */
export const bitcoinIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(0.12)', offset: 0.5 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 620, { easing: EASE, origin: '12px 12px' }),
      },
    },
  },
);

/** Los cuatro remates se abren en diagonal desde la moneda, en aspa. */
export const currencyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 8 },
    { tag: 'line', x1: 3, y1: 3, x2: 6, y2: 6 },
    { tag: 'line', x1: 21, y1: 3, x2: 18, y2: 6 },
    { tag: 'line', x1: 3, y1: 21, x2: 6, y2: 18 },
    { tag: 'line', x1: 21, y1: 21, x2: 18, y2: 18 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 460, { easing: SPRING_OUT, origin: '12px 12px' }),
        1: /* @__PURE__ */ track([
          { transform: 'translate(0, 0)', offset: 0 },
          { transform: 'translate(-1.2px, -1.2px)', offset: 0.5 },
          { transform: 'translate(0, 0)', offset: 1 },
        ], 460, { easing: SPRING_OUT, delay: 60 }),
        2: /* @__PURE__ */ track([
          { transform: 'translate(0, 0)', offset: 0 },
          { transform: 'translate(1.2px, -1.2px)', offset: 0.5 },
          { transform: 'translate(0, 0)', offset: 1 },
        ], 460, { easing: SPRING_OUT, delay: 120 }),
        4: /* @__PURE__ */ track([
          { transform: 'translate(0, 0)', offset: 0 },
          { transform: 'translate(1.2px, 1.2px)', offset: 0.5 },
          { transform: 'translate(0, 0)', offset: 1 },
        ], 460, { easing: SPRING_OUT, delay: 180 }),
        3: /* @__PURE__ */ track([
          { transform: 'translate(0, 0)', offset: 0 },
          { transform: 'translate(-1.2px, 1.2px)', offset: 0.5 },
          { transform: 'translate(0, 0)', offset: 1 },
        ], 460, { easing: SPRING_OUT, delay: 240 }),
      },
    },
  },
);

/** Un porcentaje es una proporción: uno de los ceros crece mientras el otro encoge, y luego al revés. */
export const percentIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'line', x1: 19, y1: 5, x2: 5, y2: 19 },
    { tag: 'circle', cx: 6.5, cy: 6.5, r: 2.5 },
    { tag: 'circle', cx: 17.5, cy: 17.5, r: 2.5 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'scale(1)', offset: 0 },
          { transform: 'scale(1.25)', offset: 0.35 },
          { transform: 'scale(0.9)', offset: 0.7 },
          { transform: 'scale(1)', offset: 1 },
        ], 620, { easing: EASE, origin: '6.5px 6.5px' }),
        2: /* @__PURE__ */ track([
          { transform: 'scale(1)', offset: 0 },
          { transform: 'scale(0.9)', offset: 0.35 },
          { transform: 'scale(1.25)', offset: 0.7 },
          { transform: 'scale(1)', offset: 1 },
        ], 620, { easing: EASE, origin: '17.5px 17.5px' }),
      },
    },
  },
);

/** Los dos puntos se apartan de la raya. La raya es lo que divide: no se mueve. */
export const divideIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 6, r: 1 },
    { tag: 'line', x1: 5, y1: 12, x2: 19, y2: 12 },
    { tag: 'circle', cx: 12, cy: 18, r: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 460, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1.5, 0]), 460, { easing: SPRING_OUT }),
      },
    },
  },
);

/** Sumar es recoger: la sigma se estrecha sobre su eje y vuelve. */
export const sigmaIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(0.85)', offset: 0.45 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 500, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);

/** Las dos patas se abren. */
export const piIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'line', x1: 9, y1: 4, x2: 9, y2: 20 },
    { tag: 'path', d: "M4 7c0-1.7 1.3-3 3-3h13" },
    { tag: 'path', d: "M18 20c-1.7 0-3-1.3-3-3V4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.9, 0]), 480, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.9, 0]), 480, { easing: SPRING_OUT }),
      },
    },
  },
);

/** La raíz se alarga sobre lo que cubre, desde su punta izquierda. */
export const radicalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'scaleX(1)', offset: 0 },
          { transform: 'scaleX(0.92)', offset: 0.32 },
          { transform: 'scaleX(1.04)', offset: 0.7 },
          { transform: 'scaleX(1)', offset: 1 },
        ], 520, { easing: EASE, origin: '3px 12px' }),
      },
    },
  },
);

/** Gira 60°, que es su propia simetría: acaba idéntico a como empezó. */
export const asteriskIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v12" },
    { tag: 'path', d: "M17.196 9 6.804 15" },
    { tag: 'path', d: "m6.804 9 10.392 6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(GIRA_60, 520, { easing: SPRING_OUT, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(GIRA_60, 520, { easing: SPRING_OUT, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(GIRA_60, 520, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
  },
);

/** Un arco sobre dos pies: cae, se aplasta al tocar y se asienta. El pivote va en la base. */
export const omegaIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'translateY(-2.2px) scale(1, 1)', offset: 0 },
          { transform: 'translateY(0) scale(1.06, 0.9)', offset: 0.45 },
          { transform: 'translateY(0) scale(0.98, 1.04)', offset: 0.72 },
          { transform: 'translateY(0) scale(1, 1)', offset: 1 },
        ], 640, { easing: EASE, origin: '12px 20px' }),
      },
    },
  },
);

/** El trazo atraviesa el óvalo desde el centro, igual que en el dólar. */
export const phiIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v20" },
    { tag: 'circle', cx: 12, cy: 12, r: 7 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(ASIENTA, 460, { easing: EASE, origin: '12px 12px' }),
        0: /* @__PURE__ */ track(ATRAVIESA, 460, { easing: SPRING_OUT, origin: '12px 12px', delay: 80 }),
      },
    },
  },
);

/** Los paréntesis aprietan y la equis de dentro gira 90°: su simetría, así que vuelve igual. */
export const variableIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 21s-4-3-4-9 4-9 4-9" },
    { tag: 'path', d: "M16 3s4 3 4 9-4 9-4 9" },
    { tag: 'line', x1: 15, y1: 9, x2: 9, y2: 15 },
    { tag: 'line', x1: 9, y1: 9, x2: 15, y2: 15 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.9, 0]), 500, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.9, 0]), 500, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(GIRA_90, 520, { easing: SPRING_OUT, origin: '12px 12px', delay: 90 }),
        3: /* @__PURE__ */ track(GIRA_90, 520, { easing: SPRING_OUT, origin: '12px 12px', delay: 90 }),
      },
    },
  },
);

/** El lazo se asienta y la colita da el latigazo final, que es como se escribe a mano. */
export const ampersandIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 12h3" },
    {
      tag: 'path',
      d: "M17.5 12a8 8 0 0 1-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13",
    },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.05, 1]), 480, { easing: EASE, origin: '12px 13px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 1, 0]), 420, { easing: SPRING_OUT, delay: 160 }),
      },
    },
  },
);

/** Dos, y por eso botan en fila: primero el de la izquierda. */
export const ampersandsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5",
    },
    {
      tag: 'path',
      d: "M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 440, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 440, { easing: SPRING_OUT, delay: 110 }),
      },
    },
  },
);


// ── Juego y deporte ────────────────────────────────────────────────────────────────────────
// Las seis piezas de ajedrez viven en icons/chess.ts y los mandos en icons/gamepad.ts. Aquí
// queda lo que no alcanza para módulo: cosas que ya tienen un movimiento propio evidente y solo
// hay que dejarlas hacerlo.

/** Un pulso de anillo: se usa donde algo se expande desde su centro (diana, portería). */
const ANILLO = /* @__PURE__ */ scaleSeq([1, 1.12, 1]);

/**
 * La pelota bota con TODO lo que lleva dentro: las costuras van con el mismo pivote y los
 * mismos keyframes, o sea escalan como un solo cuerpo. Aplastar solo el contorno dejaría las
 * costuras flotando dentro de una pelota deformada.
 */
const BOTE = /* @__PURE__ */ [
  { transform: 'scale(1, 1)', offset: 0 },
  { transform: 'scale(1.06, 0.93)', offset: 0.4 },
  { transform: 'scale(0.98, 1.04)', offset: 0.7 },
  { transform: 'scale(1, 1)', offset: 1 },
];
/** El aro exterior de `target` mide 10 de radio y toca el borde: a 1.12 se corta. */
const ANILLO_GRANDE = /* @__PURE__ */ scaleSeq([1, 1.06, 1]);

/**
 * Un paso. Girar sobre el talón tiraba la punta 1.6 fuera del lienzo, y es que este zapato
 * ocupa el cuadro ENTERO: 2..22 en los dos ejes, o sea 1 de margen por los cuatro lados.
 *
 * Así que el recorrido se queda en lo que cabe y el peso del paso lo pone la compresión, que
 * solo encoge y por eso no necesita espacio.
 */
// El pivote es el TALÓN (5, 22), no el centro: es el punto que no se despega del suelo.
const PASO_ZAPATO = /* @__PURE__ */ rotateSeq([0, -8, 2, 0]);

/** La palanca se inclina desde su base y la bola va con ella, que es lo único que puede pasar si están soldadas. */
export const joystickIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z" },
    { tag: 'path', d: "M6 15v-2" },
    { tag: 'path', d: "M12 15V9" },
    { tag: 'circle', cx: 12, cy: 6, r: 3 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-12deg)', offset: 0.4 },
          { transform: 'rotate(8deg)', offset: 0.72 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 620, { easing: EASE, origin: '12px 15px' }),
        3: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-12deg)', offset: 0.4 },
          { transform: 'rotate(8deg)', offset: 0.72 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 620, { easing: EASE, origin: '12px 15px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-14deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 15px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-14deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 15px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Encaja: entra girada y se acomoda de golpe. */
export const puzzleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'rotate(-5deg)', offset: 0 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 520, { easing: SPRING_OUT, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-4deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Cae y encaja: se aplasta al tocar y se asienta. El pivote va en la base. */
export const toyBrickIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 8, width: 18, height: 12, rx: 1 },
    { tag: 'path', d: "M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3" },
    { tag: 'path', d: "M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'translateY(-1.5px) scale(1, 1)', offset: 0 },
          { transform: 'translateY(0) scale(1.05, 0.92)', offset: 0.45 },
          { transform: 'translateY(0) scale(0.99, 1.03)', offset: 0.72 },
          { transform: 'translateY(0) scale(1, 1)', offset: 1 },
        ], 600, { easing: EASE, origin: '12px 20px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 600, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 600, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1.2px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1.2px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Ruedan: cada dado gira sobre SU centro y en sentido contrario al otro, con sus puntos encima. */
export const dicesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 2, y: 10, width: 12, height: 12, rx: 2, ry: 2 },
    { tag: 'path', d: "m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" },
    { tag: 'path', d: "M6 18h.01" },
    { tag: 'path', d: "M10 14h.01" },
    { tag: 'path', d: "M15 6h.01" },
    { tag: 'path', d: "M18 9h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-9deg)', offset: 0.45 },
          { transform: 'rotate(3deg)', offset: 0.75 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 620, { easing: EASE, origin: '8px 16px' }),
        2: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-9deg)', offset: 0.45 },
          { transform: 'rotate(3deg)', offset: 0.75 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 620, { easing: EASE, origin: '8px 16px' }),
        3: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-9deg)', offset: 0.45 },
          { transform: 'rotate(3deg)', offset: 0.75 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 620, { easing: EASE, origin: '8px 16px' }),
        1: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(10deg)', offset: 0.45 },
          { transform: 'rotate(-4deg)', offset: 0.75 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 620, { easing: EASE, delay: 80, origin: '16px 8px' }),
        4: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(10deg)', offset: 0.45 },
          { transform: 'rotate(-4deg)', offset: 0.75 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 620, { easing: EASE, delay: 80, origin: '16px 8px' }),
        5: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(10deg)', offset: 0.45 },
          { transform: 'rotate(-4deg)', offset: 0.75 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 620, { easing: EASE, delay: 80, origin: '16px 8px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-8deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 16px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-8deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 16px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-8deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 16px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(8deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 8px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(8deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 8px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(8deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 8px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Fija el blanco: el pulso va de fuera hacia dentro, que es como se apunta. */
export const targetIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'circle', cx: 12, cy: 12, r: 6 },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ANILLO_GRANDE, 420, { easing: SPRING_OUT, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(ANILLO_GRANDE, 420, { easing: SPRING_OUT, delay: 100, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(ANILLO, 420, { easing: SPRING_OUT, delay: 200, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las cuatro marcas se cierran sobre el centro y el aro acusa el enfoque. */
export const crosshairIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'line', x1: 22, y1: 12, x2: 18, y2: 12 },
    { tag: 'line', x1: 6, y1: 12, x2: 2, y2: 12 },
    { tag: 'line', x1: 12, y1: 6, x2: 12, y2: 2 },
    { tag: 'line', x1: 12, y1: 22, x2: 12, y2: 18 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, 0.9px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 440, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(-0.9px, 0px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 440, { easing: SPRING_OUT, delay: 60 }),
        4: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, -0.9px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 440, { easing: SPRING_OUT, delay: 120 }),
        2: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0.9px, 0px)', offset: 0.5 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 440, { easing: SPRING_OUT, delay: 180 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.05, 1]), 420, { easing: EASE, delay: 240, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El banderín se planta y las ondas salen de él. */
export const goalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13V2l8 4-8 4" },
    { tag: 'path', d: "M20.561 10.222a9 9 0 1 1-12.55-5.29" },
    { tag: 'path', d: "M8.002 9.997a5 5 0 1 0 8.9 2.02" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([1.5, 0]), 460, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(ANILLO, 420, { easing: SPRING_OUT, delay: 180, origin: '12px 13px' }),
        1: /* @__PURE__ */ track(ANILLO_GRANDE, 420, { easing: SPRING_OUT, delay: 280, origin: '12px 13px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Cuelga de una cinta, así que se columpia desde donde se cuelga — no desde su centro. */
export const medalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
    },
    { tag: 'path', d: "M11 12 5.12 2.2" },
    { tag: 'path', d: "m13 12 5.88-9.8" },
    { tag: 'path', d: "M8 7h8" },
    { tag: 'circle', cx: 12, cy: 17, r: 5 },
    { tag: 'path', d: "M12 18v-2h-.5" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-8deg)', offset: 0.3 },
          { transform: 'rotate(6deg)', offset: 0.58 },
          { transform: 'rotate(-3deg)', offset: 0.8 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 720, { easing: EASE, origin: '12px 10px' }),
        5: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-8deg)', offset: 0.3 },
          { transform: 'rotate(6deg)', offset: 0.58 },
          { transform: 'rotate(-3deg)', offset: 0.8 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 720, { easing: EASE, origin: '12px 10px' }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-9deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 10px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-9deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 10px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se levanta. La línea de abajo es la mesa: esa se queda. */
export const trophyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2" },
    { tag: 'path', d: "M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2" },
    { tag: 'path', d: "M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3" },
    { tag: 'path', d: "M4 22h16" },
    { tag: 'path', d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" },
    { tag: 'path', d: "M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, 0.8px)', offset: 0.3 },
          { transform: 'translate(0px, -0.9px)', offset: 0.7 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 540, { easing: EASE }),
        0: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, 0.8px)', offset: 0.3 },
          { transform: 'translate(0px, -0.9px)', offset: 0.7 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 540, { easing: EASE }),
        1: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, 0.8px)', offset: 0.3 },
          { transform: 'translate(0px, -0.9px)', offset: 0.7 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 540, { easing: EASE }),
        2: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, 0.8px)', offset: 0.3 },
          { transform: 'translate(0px, -0.9px)', offset: 0.7 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 540, { easing: EASE }),
        5: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(0px, 0.8px)', offset: 0.3 },
          { transform: 'translate(0px, -0.9px)', offset: 0.7 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 540, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Bota: se aplasta contra el suelo y se recupera. El pivote va abajo, que es por donde toca. */
export const volleyballIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 7a16 16 20 0 1 10.98 4.362" },
    { tag: 'path', d: "M12 12a13 13 0 0 1-8.66 5" },
    { tag: 'path', d: "M16.83 13.634a16 16 0 0 1-9.267 7.328" },
    { tag: 'path', d: "M20.66 17A13 13 0 0 0 12 12a13 13 0 0 1 0-10" },
    { tag: 'path', d: "M8.17 15.366a16 16 0 0 1-1.713-11.69" },
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track(BOTE, 560, { easing: EASE, origin: '12px 22px' }),
        0: /* @__PURE__ */ track(BOTE, 560, { easing: EASE, origin: '12px 22px' }),
        1: /* @__PURE__ */ track(BOTE, 560, { easing: EASE, origin: '12px 22px' }),
        2: /* @__PURE__ */ track(BOTE, 560, { easing: EASE, origin: '12px 22px' }),
        3: /* @__PURE__ */ track(BOTE, 560, { easing: EASE, origin: '12px 22px' }),
        4: /* @__PURE__ */ track(BOTE, 560, { easing: EASE, origin: '12px 22px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.04, 0.93)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.04, 0.93)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.04, 0.93)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.04, 0.93)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.04, 0.93)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.04, 0.93)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Una repetición: sube por un lado y baja por el otro, sobre su propio centro. */
export const dumbbellIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
    },
    { tag: 'path', d: "m2.5 21.5 1.4-1.4" },
    { tag: 'path', d: "m20.1 3.9 1.4-1.4" },
    {
      tag: 'path',
      d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
    },
    { tag: 'path', d: "m9.6 14.4 4.8-4.8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-10deg)', offset: 0.3333333333333333 },
          { transform: 'rotate(10deg)', offset: 0.6666666666666666 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 660, { easing: EASE, origin: '12px 12px' }),
        3: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-10deg)', offset: 0.3333333333333333 },
          { transform: 'rotate(10deg)', offset: 0.6666666666666666 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 660, { easing: EASE, origin: '12px 12px' }),
        4: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-10deg)', offset: 0.3333333333333333 },
          { transform: 'rotate(10deg)', offset: 0.6666666666666666 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 660, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-10deg)', offset: 0.3333333333333333 },
          { transform: 'rotate(10deg)', offset: 0.6666666666666666 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 660, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-10deg)', offset: 0.3333333333333333 },
          { transform: 'rotate(10deg)', offset: 0.6666666666666666 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 660, { easing: EASE, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se marca: el músculo se abomba y las líneas del pliegue van detrás. */
export const bicepsFlexedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1",
    },
    { tag: 'path', d: "M15 14a5 5 0 0 0-7.584 2" },
    { tag: 'path', d: "M9.964 6.825C8.019 7.977 9.5 13 8 15" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'scale(1, 1)', offset: 0 },
          { transform: 'scale(1.04, 1.05)', offset: 0.45 },
          { transform: 'scale(1, 1)', offset: 1 },
        ], 540, { easing: EASE, origin: '13px 17px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.06, 1]), 500, { easing: EASE, delay: 90, origin: '11px 15px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.06, 1]), 500, { easing: EASE, delay: 90, origin: '9px 11px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.04, 1.05)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '13px 17px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.05)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 15px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.05)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '9px 11px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Un paso: el talón queda clavado en el suelo y la punta se levanta sobre él. */
export const sportShoeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m15 10.42 4.8-5.07" },
    { tag: 'path', d: "M19 18h3" },
    {
      tag: 'path',
      d: "M9.5 22 21.414 9.415A2 2 0 0 0 21.2 6.4l-5.61-4.208A1 1 0 0 0 14 3v2a2 2 0 0 1-1.394 1.906L8.677 8.053A1 1 0 0 0 8 9c-.155 6.393-2.082 9-4 9a2 2 0 0 0 0 4h14",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(PASO_ZAPATO, 620, { easing: EASE, origin: '5px 22px' }),
        0: /* @__PURE__ */ track(PASO_ZAPATO, 620, { easing: EASE, origin: '5px 22px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.9, 0]), 620, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '5px 22px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '5px 22px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Chocan: cada espada gira contra la otra desde el punto donde se cruzan. */
export const swordsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'polyline', points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5" },
    { tag: 'line', x1: 13, y1: 19, x2: 19, y2: 13 },
    { tag: 'line', x1: 16, y1: 16, x2: 20, y2: 20 },
    { tag: 'line', x1: 19, y1: 21, x2: 21, y2: 19 },
    { tag: 'polyline', points: "14.5 6.5 18 3 21 3 21 6 17.5 9.5" },
    { tag: 'line', x1: 5, y1: 14, x2: 9, y2: 18 },
    { tag: 'line', x1: 7, y1: 17, x2: 4, y2: 20 },
    { tag: 'line', x1: 3, y1: 19, x2: 5, y2: 21 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-6deg)', offset: 0.42 },
          { transform: 'rotate(3deg)', offset: 0.72 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 560, { easing: EASE, origin: '11px 11px' }),
        1: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-6deg)', offset: 0.42 },
          { transform: 'rotate(3deg)', offset: 0.72 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 560, { easing: EASE, origin: '11px 11px' }),
        2: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-6deg)', offset: 0.42 },
          { transform: 'rotate(3deg)', offset: 0.72 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 560, { easing: EASE, origin: '11px 11px' }),
        3: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(-6deg)', offset: 0.42 },
          { transform: 'rotate(3deg)', offset: 0.72 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 560, { easing: EASE, origin: '11px 11px' }),
        4: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(6deg)', offset: 0.42 },
          { transform: 'rotate(-3deg)', offset: 0.72 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 560, { easing: EASE, origin: '11px 11px' }),
        5: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(6deg)', offset: 0.42 },
          { transform: 'rotate(-3deg)', offset: 0.72 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 560, { easing: EASE, origin: '11px 11px' }),
        6: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(6deg)', offset: 0.42 },
          { transform: 'rotate(-3deg)', offset: 0.72 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 560, { easing: EASE, origin: '11px 11px' }),
        7: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(6deg)', offset: 0.42 },
          { transform: 'rotate(-3deg)', offset: 0.72 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 560, { easing: EASE, origin: '11px 11px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 11px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 11px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 11px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 11px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 11px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 11px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 11px' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 11px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La chispa crepita y la carga tiembla: está a punto. */
export const bombIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 11, cy: 13, r: 9 },
    {
      tag: 'path',
      d: "M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95",
    },
    { tag: 'path', d: "m22 2-1.5 1.5" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.6, 0.8, 1.4, 1]), 520, { easing: EASE, origin: '21.2px 2.8px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.5, 0.5, -0.35, 0.35, 0]), 520, { easing: EASE, delay: 80 }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.5)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '21.2px 2.8px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Despega por su propia diagonal, con el retroceso previo que hace falta porque hacia arriba solo queda 1. */
export const rocketIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" },
    {
      tag: 'path',
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",
    },
    {
      tag: 'path',
      d: "M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",
    },
    { tag: 'path', d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(-0.9px, 0.9px)', offset: 0.32 },
          { transform: 'translate(1px, -1px)', offset: 0.7 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 560, { easing: EASE }),
        1: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(-0.9px, 0.9px)', offset: 0.32 },
          { transform: 'translate(1px, -1px)', offset: 0.7 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 560, { easing: EASE }),
        2: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(-0.9px, 0.9px)', offset: 0.32 },
          { transform: 'translate(1px, -1px)', offset: 0.7 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 560, { easing: EASE }),
        3: /* @__PURE__ */ track([
          { transform: 'translate(0px, 0px)', offset: 0 },
          { transform: 'translate(-0.9px, 0.9px)', offset: 0.32 },
          { transform: 'translate(1px, -1px)', offset: 0.7 },
          { transform: 'translate(0px, 0px)', offset: 1 },
        ], 560, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.9px, -0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.9px, -0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.9px, -0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.9px, -0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se mece colgado de su cuerda: el pivote va abajo, donde está atado. */
export const balloonIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1" },
    { tag: 'path', d: "M12 6a2 2 0 0 1 2 2" },
    { tag: 'path', d: "M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(3.5deg)', offset: 0.32 },
          { transform: 'rotate(-2.5deg)', offset: 0.64 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 720, { easing: EASE, origin: '12px 22px' }),
        1: /* @__PURE__ */ track([
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(3.5deg)', offset: 0.32 },
          { transform: 'rotate(-2.5deg)', offset: 0.64 },
          { transform: 'rotate(0deg)', offset: 1 },
        ], 720, { easing: EASE, origin: '12px 22px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(3.5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(3.5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * Revienta: el cono da el tirón y lo que sale vuela hacia afuera, en cadena.
 *
 * El tirón lo acusa el ICONO ENTERO desde la raíz, no solo el cono: si el cono se dobla y el
 * confeti se queda clavado en el aire, parece que el confeti salió por su cuenta. Seis grados de
 * raíz y diez de cono se suman donde importa, y el confeti sigue reventando desde su propio sitio.
 *
 * `origin` de la RAÍZ va en píxeles CSS, no en unidades del viewBox — de ahí el `50% 50%`. Y la
 * raíz no la recorta el viewBox sino el cuadro de layout, así que el chequeo de lienzo por figuras
 * no la ve: ésta se midió aparte, contra la caja del elemento.
 */
export const partyPopperIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5.8 11.3 2 22l10.7-3.79" },
    { tag: 'path', d: "M4 3h.01" },
    { tag: 'path', d: "M22 8h.01" },
    { tag: 'path', d: "M15 2h.01" },
    { tag: 'path', d: "M22 20h.01" },
    {
      tag: 'path',
      d: "m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",
    },
    { tag: 'path', d: "m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" },
    { tag: 'path', d: "m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" },
    {
      tag: 'path',
      d: "M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",
    },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -6, 2.4, 0]), 600, { easing: EASE, origin: '50% 50%' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -10, 4, 0]), 600, { easing: EASE, origin: '3px 22px' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1]), 460, { easing: SPRING_OUT, origin: '11px 15px' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 120, origin: '10px 4.5px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 180, origin: '18px 6px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 240, origin: '19.5px 14px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 300, origin: '15px 2px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 350, origin: '22px 8px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 400, origin: '22px 20px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 450, origin: '4px 3px' }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '50% 50%' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-8deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '3px 22px' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.12)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 15px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El lazo bota y la tapa se despega un dedo: está por abrirse. */
export const giftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 7v14" },
    { tag: 'path', d: "M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" },
    { tag: 'path', d: "M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" },
    { tag: 'rect', x: 3, y: 7, width: 18, height: 4, rx: 1 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.14, 1]), 460, { easing: SPRING_OUT, origin: '12px 6px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.8, 0]), 440, { easing: SPRING_OUT, delay: 90 }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.12)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 6px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);


// ── Plurales y hermanos sueltos ────────────────────────────────────────────────────────────
// `file` tiene 55 curados y `files` ninguno; `folder` 31 y `folders` ninguno; `message-square`
// 29 y `messages-square` ninguno. Ocho plurales huérfanos de familias completas, más un puñado
// de hermanos que se quedaron fuera aunque su pareja estuviera dentro (`globe` sí, `earth` no).
//
// El lenguaje del plural sale del propio dibujo: son PILAS, así que el de encima se despega del
// de atrás. Los que no son pila hacen lo suyo.

/** El de encima de la pila se despega del de atrás y vuelve. */
const DESPEGA = [
          { transform: 'translate(0, 0)', offset: 0 },
          { transform: 'translate(-0.85px, 0.7px)', offset: 0.5 },
          { transform: 'translate(0, 0)', offset: 1 },
        ];

/** Un destello corto para lo que chispea: varitas, brasas. */
const CHISPA = /* @__PURE__ */ [
  { transform: 'scale(0.4)', opacity: '0.3' },
  { transform: 'scale(1.15)', opacity: '1' },
  { transform: 'scale(1)', opacity: '1' },
];

/** La copa se mece sobre el tronco, que está clavado. Mismo criterio que icons/tree.ts. */
const MECE_COPA = [
          { transform: 'rotate(0deg)', offset: 0 },
          { transform: 'rotate(3deg)', offset: 0.3 },
          { transform: 'rotate(-2.2deg)', offset: 0.62 },
          { transform: 'rotate(0deg)', offset: 1 },
        ];

/** El de delante se despega del de atrás: eso es lo que hace que sean dos y no uno. */
export const filesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" },
    {
      tag: 'path',
      d: "M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z",
    },
    { tag: 'path', d: "M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(DESPEGA, 480, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.85px, 0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Igual con las carpetas. */
export const foldersIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M20 5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2.5a1.5 1.5 0 0 1 1.2.6l.6.8a1.5 1.5 0 0 0 1.2.6z",
    },
    { tag: 'path', d: "M3 8.268a2 2 0 0 0-1 1.738V19a2 2 0 0 0 2 2h11a2 2 0 0 0 1.732-1" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(DESPEGA, 480, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.85px, 0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El sobre de delante se separa del fajo. */
export const mailsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732" },
    { tag: 'path', d: "m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5" },
    { tag: 'rect', x: 7, y: 3, width: 15, height: 12, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(DESPEGA, 480, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.85px, 0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El calendario de delante se levanta y sus anillas botan detrás. */
export const calendarsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v2" },
    { tag: 'path', d: "M15.726 21.01A2 2 0 0 1 14 22H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2" },
    { tag: 'path', d: "M18 2v2" },
    { tag: 'path', d: "M2 13h2" },
    { tag: 'path', d: "M8 8h14" },
    { tag: 'rect', x: 8, y: 3, width: 14, height: 14, rx: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(DESPEGA, 480, { easing: SPRING_OUT }),
        3: /* @__PURE__ */ track(DESPEGA, 480, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.8, 0]), 420, { easing: SPRING_OUT, delay: 140 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.8, 0]), 420, { easing: SPRING_OUT, delay: 200 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.85px, 0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.85px, 0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** No es una pila: son dos que se responden. Por eso botan por turnos, no a la vez. */
export const messagesSquareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
    },
    {
      tag: 'path',
      d: "M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 420, { easing: SPRING_OUT, origin: '9px 8px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 420, { easing: SPRING_OUT, delay: 180, origin: '15px 15px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '15px 15px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La de delante se columpia desde SU agujero, igual que hace `tag` desde el suyo. */
export const tagsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z",
    },
    { tag: 'path', d: "M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193" },
    { tag: 'circle', cx: 10.5, cy: 6.5, r: 0.5, fill: "currentColor" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 16, -12, 5.28, 0]), 700, { origin: '10.5px 6.5px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 16, -12, 5.28, 0]), 700, { origin: '10.5px 6.5px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(13deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '10.5px 6.5px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(13deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '10.5px 6.5px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los registros entran de arriba abajo, una línea por vez, con su marca delante. */
export const logsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 5h1" },
    { tag: 'path', d: "M3 12h1" },
    { tag: 'path', d: "M3 19h1" },
    { tag: 'path', d: "M8 5h1" },
    { tag: 'path', d: "M8 12h1" },
    { tag: 'path', d: "M8 19h1" },
    { tag: 'path', d: "M13 5h8" },
    { tag: 'path', d: "M13 12h8" },
    { tag: 'path', d: "M13 19h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([-1.2, 0]), 420, { easing: SPRING_OUT }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([-1.2, 0]), 420, { easing: SPRING_OUT }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([-1.2, 0]), 420, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([-1.2, 0]), 420, { easing: SPRING_OUT, delay: 110 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([-1.2, 0]), 420, { easing: SPRING_OUT, delay: 110 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([-1.2, 0]), 420, { easing: SPRING_OUT, delay: 110 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([-1.2, 0]), 420, { easing: SPRING_OUT, delay: 220 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([-1.2, 0]), 420, { easing: SPRING_OUT, delay: 220 }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([-1.2, 0]), 420, { easing: SPRING_OUT, delay: 220 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Gira como `globe`: los continentes se estrechan sobre el eje y el aro se queda quieto. */
export const earthIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21.54 15H17a2 2 0 0 0-2 2v4.54" },
    {
      tag: 'path',
      d: "M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",
    },
    { tag: 'path', d: "M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" },
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.15)' }, { transform: 'scaleX(1)' }], 1100, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.15)' }, { transform: 'scaleX(1)' }], 1100, { origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.15)' }, { transform: 'scaleX(1)' }], 1100, { origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.15)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.15)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.15)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Igual, y el candado se cierra encima. */
export const earthLockIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M7 3.34V5a3 3 0 0 0 3 3" },
    { tag: 'path', d: "M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" },
    { tag: 'path', d: "M21.54 15H17a2 2 0 0 0-2 2v4.54" },
    { tag: 'path', d: "M12 2a10 10 0 1 0 9.54 13" },
    { tag: 'path', d: "M20 6V4a2 2 0 1 0-4 0v2" },
    { tag: 'rect', x: 14, y: 6, width: 8, height: 5, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.15)' }, { transform: 'scaleX(1)' }], 1100, { origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.15)' }, { transform: 'scaleX(1)' }], 1100, { origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.15)' }, { transform: 'scaleX(1)' }], 1100, { origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-0.9, 0]), 420, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los dos signos se abren. Toman impulso hacia dentro porque hacia fuera solo queda 1. */
export const codeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m16 18 6-6-6-6" },
    { tag: 'path', d: "m8 6-6 6 6 6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(1.5px)', offset: 0.32 },
          { transform: 'translateX(-0.9px)', offset: 0.72 },
          { transform: 'translateX(0)', offset: 1 },
        ], 520, { easing: EASE }),
        0: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-1.5px)', offset: 0.32 },
          { transform: 'translateX(0.9px)', offset: 0.72 },
          { transform: 'translateX(0)', offset: 1 },
        ], 520, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Lo mismo, y la barra de en medio se inclina un poco más. */
export const codeXmlIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m18 16 4-4-4-4" },
    { tag: 'path', d: "m6 8-4 4 4 4" },
    { tag: 'path', d: "m14.5 4-5 16" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(1.5px)', offset: 0.32 },
          { transform: 'translateX(-0.9px)', offset: 0.72 },
          { transform: 'translateX(0)', offset: 1 },
        ], 520, { easing: EASE }),
        0: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-1.5px)', offset: 0.32 },
          { transform: 'translateX(0.9px)', offset: 0.72 },
          { transform: 'translateX(0)', offset: 1 },
        ], 520, { easing: EASE }),
        2: /* @__PURE__ */ track([
          { transform: 'skewX(0deg)', offset: 0 },
          { transform: 'skewX(-5deg)', offset: 0.5 },
          { transform: 'skewX(0deg)', offset: 1 },
        ], 520, { easing: EASE, delay: 80, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'skewX(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las líneas se acomodan de arriba abajo y las anillas botan al final. */
export const notepadTextIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 2v4" },
    { tag: 'path', d: "M12 2v4" },
    { tag: 'path', d: "M16 2v4" },
    { tag: 'rect', x: 4, y: 4, width: 16, height: 18, rx: 2 },
    { tag: 'path', d: "M8 10h6" },
    { tag: 'path', d: "M8 14h8" },
    { tag: 'path', d: "M8 18h5" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([-1.4, 0]), 420, { easing: SPRING_OUT }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([-1.4, 0]), 420, { easing: SPRING_OUT, delay: 90 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([-1.4, 0]), 420, { easing: SPRING_OUT, delay: 180 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.8, 0]), 400, { easing: SPRING_OUT, delay: 240 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.8, 0]), 400, { easing: SPRING_OUT, delay: 290 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.8, 0]), 400, { easing: SPRING_OUT, delay: 340 }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las líneas igual, y el contorno punteado se apaga dando la vuelta. */
export const notepadTextDashedIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 2v4" },
    { tag: 'path', d: "M12 2v4" },
    { tag: 'path', d: "M16 2v4" },
    { tag: 'path', d: "M16 4h2a2 2 0 0 1 2 2v2" },
    { tag: 'path', d: "M20 12v2" },
    { tag: 'path', d: "M20 18v2a2 2 0 0 1-2 2h-1" },
    { tag: 'path', d: "M13 22h-2" },
    { tag: 'path', d: "M7 22H6a2 2 0 0 1-2-2v-2" },
    { tag: 'path', d: "M4 14v-2" },
    { tag: 'path', d: "M4 8V6a2 2 0 0 1 2-2h2" },
    { tag: 'path', d: "M8 10h6" },
    { tag: 'path', d: "M8 14h8" },
    { tag: 'path', d: "M8 18h5" },
  ],
  {
    default: {
      shapes: {
        10: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([-1.4, 0]), 420, { easing: SPRING_OUT }),
        11: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([-1.4, 0]), 420, { easing: SPRING_OUT, delay: 90 }),
        12: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([-1.4, 0]), 420, { easing: SPRING_OUT, delay: 180 }),
        3: /* @__PURE__ */ track(APAGA, 440, { delay: 140 }),
        4: /* @__PURE__ */ track(APAGA, 440, { delay: 190 }),
        5: /* @__PURE__ */ track(APAGA, 440, { delay: 240 }),
        6: /* @__PURE__ */ track(APAGA, 440, { delay: 290 }),
        7: /* @__PURE__ */ track(APAGA, 440, { delay: 340 }),
        8: /* @__PURE__ */ track(APAGA, 440, { delay: 390 }),
        9: /* @__PURE__ */ track(APAGA, 440, { delay: 440 }),
      },
    },
    hold: {
      shapes: {
        10: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        11: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        12: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La varita da el golpe y las chispas salen después, no a la vez: primero se agita. */
export const wandIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 4V2" },
    { tag: 'path', d: "M15 16v-2" },
    { tag: 'path', d: "M8 9h2" },
    { tag: 'path', d: "M20 9h2" },
    { tag: 'path', d: "M17.8 11.8 19 13" },
    { tag: 'path', d: "M15 9h.01" },
    { tag: 'path', d: "M17.8 6.2 19 5" },
    { tag: 'path', d: "m3 21 9-9" },
    { tag: 'path', d: "M12.2 6.2 11 5" },
  ],
  {
    default: {
      shapes: {
        7: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -8, 4, 0]), 560, { easing: EASE, origin: '3px 21px' }),
        5: /* @__PURE__ */ track(CHISPA, 380, { easing: SPRING_OUT, delay: 200, origin: '15px 9px' }),
        0: /* @__PURE__ */ track(CHISPA, 340, { easing: SPRING_OUT, delay: 260, origin: '15px 3px' }),
        1: /* @__PURE__ */ track(CHISPA, 340, { easing: SPRING_OUT, delay: 300, origin: '15px 15px' }),
        2: /* @__PURE__ */ track(CHISPA, 340, { easing: SPRING_OUT, delay: 340, origin: '9px 9px' }),
        3: /* @__PURE__ */ track(CHISPA, 340, { easing: SPRING_OUT, delay: 380, origin: '21px 9px' }),
        4: /* @__PURE__ */ track(CHISPA, 340, { easing: SPRING_OUT, delay: 420, origin: '18.4px 12.4px' }),
        6: /* @__PURE__ */ track(CHISPA, 340, { easing: SPRING_OUT, delay: 460, origin: '18.4px 5.6px' }),
        8: /* @__PURE__ */ track(CHISPA, 340, { easing: SPRING_OUT, delay: 500, origin: '11.6px 5.6px' }),
      },
    },
    hold: {
      shapes: {
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-8deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '3px 21px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se agita y las chispas salen detrás, en cadena. Nueve grados es todo lo que cabe cruzando el lienzo entero. */
export const wandSparklesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
    },
    { tag: 'path', d: "m14 7 3 3" },
    { tag: 'path', d: "M5 6v4" },
    { tag: 'path', d: "M19 14v4" },
    { tag: 'path', d: "M10 2v2" },
    { tag: 'path', d: "M7 8H3" },
    { tag: 'path', d: "M21 16h-4" },
    { tag: 'path', d: "M11 3H9" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -7, 3.85, 0]), 600, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -7, 3.85, 0]), 600, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(CHISPA, 340, { easing: SPRING_OUT, delay: 160, origin: '5px 8px' }),
        4: /* @__PURE__ */ track(CHISPA, 340, { easing: SPRING_OUT, delay: 210, origin: '10px 3px' }),
        5: /* @__PURE__ */ track(CHISPA, 340, { easing: SPRING_OUT, delay: 260, origin: '5px 8px' }),
        7: /* @__PURE__ */ track(CHISPA, 340, { easing: SPRING_OUT, delay: 310, origin: '10px 3px' }),
        3: /* @__PURE__ */ track(CHISPA, 340, { easing: SPRING_OUT, delay: 360, origin: '19px 16px' }),
        6: /* @__PURE__ */ track(CHISPA, 340, { easing: SPRING_OUT, delay: 410, origin: '19px 16px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '5px 8px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '19px 16px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '10px 3px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '5px 8px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '19px 16px' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '10px 3px' }),
      },
      reverseOnLeave: true,
    },
  }
);

/** El lazo se cierra y el nudo acusa el tirón. */
export const lassoIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3.704 14.467a10 8 0 1 1 3.115 2.375" },
    { tag: 'path', d: "M7 22a5 5 0 0 1-2-3.994" },
    { tag: 'circle', cx: 5, cy: 16, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.94, 1]), 520, { easing: EASE, origin: '12px 11px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.94, 1]), 520, { easing: EASE, origin: '12px 11px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 1]), 420, { easing: SPRING_OUT, delay: 160, origin: '5px 16px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '5px 16px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Igual, y el puntero que selecciona da su clic. */
export const lassoSelectIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M7 22a5 5 0 0 1-2-4" },
    { tag: 'path', d: "M7 16.93c.96.43 1.96.74 2.99.91" },
    {
      tag: 'path',
      d: "M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2",
    },
    { tag: 'path', d: "M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
    {
      tag: 'path',
      d: "M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.94, 1]), 520, { easing: EASE, origin: '12px 11px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 1]), 420, { easing: SPRING_OUT, delay: 120, origin: '5px 16px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.85, 0]), 440, { easing: SPRING_OUT, delay: 180 }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.85px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Rueda de canto, que es lo que hace una cápsula suelta. Sí cabe: la diagonal deja 28 grados de holgura. */
export const pillIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" },
    { tag: 'path', d: "m8.5 8.5 7 7" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -12, 6, 0]), 660, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -12, 6, 0]), 660, { easing: EASE, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-12deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-12deg) scale(1.14)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  }
);

/** El tapón se despega: es lo único de un bote que se abre. */
export const pillBottleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4" },
    { tag: 'path', d: "M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" },
    { tag: 'rect', x: 4, y: 2, width: 16, height: 5, rx: 1 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.85, 0]), 460, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.06, 1]), 420, { easing: EASE, delay: 120, origin: '15.5px 14.5px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Titila: se estira a lo alto y se recoge, desde su base. Una llama no se mueve de sitio. */
export const flameIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'scale(1, 1)', offset: 0 },
          { transform: 'scale(0.95, 1.06)', offset: 0.32 },
          { transform: 'scale(1.04, 0.97)', offset: 0.66 },
          { transform: 'scale(1, 1)', offset: 1 },
        ], 620, { easing: EASE, origin: '12px 21px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.95, 1.06)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 21px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La llama titila y los leños no se mueven: están debajo. */
export const flameKindlingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z",
    },
    { tag: 'path', d: "m5 22 14-4" },
    { tag: 'path', d: "m5 18 14 4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'scale(1, 1)', offset: 0 },
          { transform: 'scale(0.95, 1.06)', offset: 0.32 },
          { transform: 'scale(1.04, 0.97)', offset: 0.66 },
          { transform: 'scale(1, 1)', offset: 1 },
        ], 620, { easing: EASE, origin: '12px 15px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.95, 1.06)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 15px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se asienta: cae, se aplasta al tocar y se recupera. */
export const boxIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
    },
    { tag: 'path', d: "m3.3 7 8.7 5 8.7-5" },
    { tag: 'path', d: "M12 22V12" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track([
          { transform: 'translateY(-0.85px) scale(1, 1)', offset: 0 },
          { transform: 'translateY(0) scale(1.04, 0.94)', offset: 0.45 },
          { transform: 'translateY(0) scale(0.99, 1.02)', offset: 0.72 },
          { transform: 'translateY(0) scale(1, 1)', offset: 1 },
        ], 580, { easing: EASE, origin: '12px 22px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-0.85, 0]), 580, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-0.85, 0]), 580, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.85px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.85px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se apilan en orden: primero las dos de abajo, y encima la última. */
export const boxesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
    },
    { tag: 'path', d: "m7 16.5-4.74-2.85" },
    { tag: 'path', d: "m7 16.5 5-3" },
    { tag: 'path', d: "M7 16.5v5.17" },
    {
      tag: 'path',
      d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
    },
    { tag: 'path', d: "m17 16.5-5-3" },
    { tag: 'path', d: "m17 16.5 4.74-2.85" },
    { tag: 'path', d: "M17 16.5v5.17" },
    {
      tag: 'path',
      d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
    },
    { tag: 'path', d: "M12 8 7.26 5.15" },
    { tag: 'path', d: "m12 8 4.74-2.85" },
    { tag: 'path', d: "M12 13.5V8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1, 0]), 460, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1, 0]), 460, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1, 0]), 460, { easing: SPRING_OUT }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1, 0]), 460, { easing: SPRING_OUT }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1, 0]), 460, { easing: SPRING_OUT, delay: 100 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1, 0]), 460, { easing: SPRING_OUT, delay: 100 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1, 0]), 460, { easing: SPRING_OUT, delay: 100 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1, 0]), 460, { easing: SPRING_OUT, delay: 100 }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1, 0]), 460, { easing: SPRING_OUT, delay: 200 }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1, 0]), 460, { easing: SPRING_OUT, delay: 200 }),
        10: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1, 0]), 460, { easing: SPRING_OUT, delay: 200 }),
        11: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1, 0]), 460, { easing: SPRING_OUT, delay: 200 }),
      },
    },
    hold: {
      shapes: {
        8: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        10: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        11: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Dos árboles distintos, así que se mecen desfasados: a la vez serían uno solo con dos copas. */
export const treesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" },
    { tag: 'path', d: "M7 16v6" },
    { tag: 'path', d: "M13 19v3" },
    {
      tag: 'path',
      d: "M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(MECE_COPA, 720, { easing: EASE, origin: '7px 16px' }),
        3: /* @__PURE__ */ track(MECE_COPA, 720, { easing: EASE, delay: 120, origin: '13px 19px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(3deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '7px 16px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(3deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '13px 19px' }),
      },
      reverseOnLeave: true,
    },
  },
);


// ── Hardware y conectores ──────────────────────────────────────────────────────────────────
// El gesto sale de lo que el aparato HACE: un chip conduce, un enchufe se mete, una bobina se
// enrolla mientras la otra se desenrolla, un metrónomo marca el compás.
//
// Y una regla que aquí aparece cuatro veces: un `circle` girando es INVISIBLE. Los ventiladores
// de la `gpu`, las bobinas del casete y los tornillos del panel no pueden animarse con `rotate`,
// así que se les nota por otra vía — laten, se alternan, se encienden en cadena.

/** Se apaga y vuelve. Para lo que conduce o se lee: pines, códigos, huellas. */
const APAGA_HW = /* @__PURE__ */ [
  { opacity: '1', offset: 0 },
  { opacity: '0.25', offset: 0.4 },
  { opacity: '1', offset: 1 },
];

/** Una tecla se hunde desde arriba: ahí es donde bisagra. */
const TECLA = /* @__PURE__ */ [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.65)' }, { transform: 'scaleY(1)' }];

/** Los dos ventiladores arrancan, uno tras otro. Girar un círculo no se ve: se nota porque late. */
export const gpuIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 17h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2" },
    { tag: 'path', d: "M2 21V3" },
    { tag: 'path', d: "M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3" },
    { tag: 'circle', cx: 16, cy: 11, r: 2 },
    { tag: 'circle', cx: 8, cy: 11, r: 2 },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.25, 1]), 440, { easing: SPRING_OUT, origin: '8px 11px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.25, 1]), 440, { easing: SPRING_OUT, origin: '16px 11px', delay: 120 }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.25)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 11px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.25)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 11px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La corriente entra por las patas y llega a las pistas de dentro. */
export const microchipIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 12h4" },
    { tag: 'path', d: "M10 17h4" },
    { tag: 'path', d: "M10 7h4" },
    { tag: 'path', d: "M18 12h2" },
    { tag: 'path', d: "M18 18h2" },
    { tag: 'path', d: "M18 6h2" },
    { tag: 'path', d: "M4 12h2" },
    { tag: 'path', d: "M4 18h2" },
    { tag: 'path', d: "M4 6h2" },
    { tag: 'rect', x: 6, y: 2, width: 12, height: 20, rx: 2 },
  ],
  {
    default: {
      shapes: {
        8: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.8, 0]), 400, { easing: SPRING_OUT }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.8, 0]), 400, { easing: SPRING_OUT, delay: 70 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.8, 0]), 400, { easing: SPRING_OUT, delay: 140 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.8, 0]), 400, { easing: SPRING_OUT }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.8, 0]), 400, { easing: SPRING_OUT, delay: 70 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.8, 0]), 400, { easing: SPRING_OUT, delay: 140 }),
        2: /* @__PURE__ */ track(APAGA, 420, { delay: 220 }),
        0: /* @__PURE__ */ track(APAGA, 420, { delay: 270 }),
        1: /* @__PURE__ */ track(APAGA, 420, { delay: 320 }),
      },
    },
    hold: {
      shapes: {
        8: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los contactos se leen de izquierda a derecha, por columnas. */
export const memoryStickIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 12v-2" },
    { tag: 'path', d: "M12 18v-2" },
    { tag: 'path', d: "M16 12v-2" },
    { tag: 'path', d: "M16 18v-2" },
    { tag: 'path', d: "M2 11h1.5" },
    { tag: 'path', d: "M20 18v-2" },
    { tag: 'path', d: "M20.5 11H22" },
    { tag: 'path', d: "M4 18v-2" },
    { tag: 'path', d: "M8 12v-2" },
    { tag: 'path', d: "M8 18v-2" },
    { tag: 'rect', x: 2, y: 6, width: 20, height: 10, rx: 2 },
  ],
  {
    default: {
      shapes: {
        7: /* @__PURE__ */ track(APAGA, 420),
        8: /* @__PURE__ */ track(APAGA, 420, { delay: 60 }),
        9: /* @__PURE__ */ track(APAGA, 420, { delay: 60 }),
        0: /* @__PURE__ */ track(APAGA, 420, { delay: 120 }),
        1: /* @__PURE__ */ track(APAGA, 420, { delay: 120 }),
        2: /* @__PURE__ */ track(APAGA, 420, { delay: 180 }),
        3: /* @__PURE__ */ track(APAGA, 420, { delay: 180 }),
        5: /* @__PURE__ */ track(APAGA, 420, { delay: 240 }),
      },
    },
    hold: {
      shapes: {
        8: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 14px' }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 14px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 14px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 14px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 14px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 14px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El testigo de encendido parpadea y las rejillas respiran. */
export const pcCaseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 5, y: 2, width: 14, height: 20, rx: 2 },
    { tag: 'path', d: "M15 14h.01" },
    { tag: 'path', d: "M9 6h6" },
    { tag: 'path', d: "M9 10h6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.6, 1]), 420, { easing: SPRING_OUT, origin: '15px 14px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.8, 0]), 400, { easing: SPRING_OUT, delay: 120 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.8, 0]), 400, { easing: SPRING_OUT, delay: 180 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.6)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '15px 14px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La señal salta de un nodo al otro por la pista que los une. */
export const circuitBoardIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M11 9h4a2 2 0 0 0 2-2V3" },
    { tag: 'circle', cx: 9, cy: 9, r: 2 },
    { tag: 'path', d: "M7 21v-4a2 2 0 0 1 2-2h4" },
    { tag: 'circle', cx: 15, cy: 15, r: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 1]), 420, { easing: SPRING_OUT, origin: '9px 9px' }),
        1: /* @__PURE__ */ track(APAGA_HW, 420, { delay: 140 }),
        3: /* @__PURE__ */ track(APAGA_HW, 420, { delay: 200 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 1]), 420, { easing: SPRING_OUT, origin: '15px 15px', delay: 260 }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '9px 9px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '15px 15px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los cuatro tornillos se aprietan en el orden del reloj. */
export const inspectionPanelIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: "M7 7h.01" },
    { tag: 'path', d: "M17 7h.01" },
    { tag: 'path', d: "M7 17h.01" },
    { tag: 'path', d: "M17 17h.01" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.5, 1]), 380, { easing: SPRING_OUT, origin: '7px 7px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.5, 1]), 380, { easing: SPRING_OUT, origin: '17px 7px', delay: 90 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.5, 1]), 380, { easing: SPRING_OUT, origin: '17px 17px', delay: 180 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.5, 1]), 380, { easing: SPRING_OUT, origin: '7px 17px', delay: 270 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.5)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '7px 7px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.5)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '17px 7px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.5)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '17px 17px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.5)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '7px 17px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La señal recorre el cable desde el enchufe hasta las dos puntas. */
export const usbIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 10, cy: 7, r: 1 },
    { tag: 'circle', cx: 4, cy: 20, r: 1 },
    { tag: 'path', d: "M4.7 19.3 19 5" },
    { tag: 'path', d: "m21 3-3 1 2 2Z" },
    { tag: 'path', d: "M9.26 7.68 5 12l2 5" },
    { tag: 'path', d: "m10 14 5 2 3.5-3.5" },
    { tag: 'path', d: "m18 12 1-1 1 1-1 1Z" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.5, 1]), 400, { easing: SPRING_OUT, origin: '4px 20px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.5, 1]), 400, { easing: SPRING_OUT, origin: '10px 7px', delay: 160 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 1]), 400, { easing: SPRING_OUT, origin: '19px 12px', delay: 240 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 1]), 400, { easing: SPRING_OUT, origin: '19.5px 4px', delay: 320 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.5)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '4px 20px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.5)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '10px 7px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El conector se asienta en el puerto. */
export const hdmiPortIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M22 9a1 1 0 00-1-1H3a1 1 0 00-1 1v4a1 1 0 001 1h.5a2 2 0 011.6.8l.3.4A2 2 0 007 16h10a2 2 0 001.6-.8l.3-.4a2 2 0 011.6-.8h.5a1 1 0 001-1z",
    },
    { tag: 'path', d: "M8 12h8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.8, 0]), 440, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.98, 1]), 440, { easing: EASE, delay: 80, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los cuatro pines se leen de izquierda a derecha. */
export const ethernetPortIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 8v1" },
    { tag: 'path', d: "M14 8v1" },
    { tag: 'path', d: "M18 8v1" },
    {
      tag: 'path',
      d: "M19 17a2 2 0 00-1.765 1.059l-.47.882A2 2 0 0115 20H9a2 2 0 01-1.765-1.059l-.47-.882A2 2 0 005 17H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v9a2 2 0 01-2 2z",
    },
    { tag: 'path', d: "M6 8v1" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.8, 0]), 380, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.8, 0]), 380, { easing: SPRING_OUT, delay: 80 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.8, 0]), 380, { easing: SPRING_OUT, delay: 160 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.8, 0]), 380, { easing: SPRING_OUT, delay: 240 }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El chip es lo que se lee: late, y sus contactos van detrás. */
export const cardSimIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 14v4" },
    {
      tag: 'path',
      d: "M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z",
    },
    { tag: 'path', d: "M8 14h8" },
    { tag: 'rect', x: 8, y: 10, width: 8, height: 8, rx: 1 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 440, { easing: SPRING_OUT, origin: '12px 14px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 440, { easing: SPRING_OUT, origin: '12px 14px', delay: 60 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 440, { easing: SPRING_OUT, origin: '12px 14px', delay: 60 }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 14px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 14px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 14px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los cuatro brazos captan en cadena, de izquierda a derecha. */
export const antennaIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 12 7 2" },
    { tag: 'path', d: "m7 12 5-10" },
    { tag: 'path', d: "m12 12 5-10" },
    { tag: 'path', d: "m17 12 5-10" },
    { tag: 'path', d: "M4.5 7h15" },
    { tag: 'path', d: "M12 16v6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.7, 0]), 400, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.7, 0]), 400, { easing: SPRING_OUT, delay: 80 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.7, 0]), 400, { easing: SPRING_OUT, delay: 160 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.7, 0]), 400, { easing: SPRING_OUT, delay: 240 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los dos paneles se orientan y la señal sale por abajo. */
export const satelliteIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5",
    },
    { tag: 'path', d: "M16.5 7.5 19 5" },
    {
      tag: 'path',
      d: "m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5",
    },
    { tag: 'path', d: "M9 21a6 6 0 0 0-6-6" },
    {
      tag: 'path',
      d: "M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 2, 0]), 620, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 4, -2, 0]), 620, { easing: EASE, origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 440, { easing: SPRING_OUT, origin: '3px 21px', delay: 180 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-4deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(4deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las ondas salen de la parábola, de dentro hacia fuera. */
export const satelliteDishIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 10a7.31 7.31 0 0 0 10 10Z" },
    { tag: 'path', d: "m9 15 3-3" },
    { tag: 'path', d: "M17 13a6 6 0 0 0-6-6" },
    { tag: 'path', d: "M21 13A10 10 0 0 0 11 3" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([0.75, 1]), 420, { easing: SPRING_OUT, delay: 120, fill: 'backwards', origin: '9px 15px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([0.75, 1]), 420, { easing: SPRING_OUT, delay: 220, fill: 'backwards', origin: '9px 15px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 2, 0]), 560, { easing: EASE, origin: '9px 15px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '9px 15px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '9px 15px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El sol pega y el panel lo acusa. */
export const solarPanelIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 2h2" },
    { tag: 'path', d: "m14.28 14-4.56 8" },
    { tag: 'path', d: "m21 22-1.558-4H4.558" },
    { tag: 'path', d: "M3 10v2" },
    {
      tag: 'path',
      d: "M6.245 15.04A2 2 0 0 1 8 14h12a1 1 0 0 1 .864 1.505l-3.11 5.457A2 2 0 0 1 16 22H4a1 1 0 0 1-.863-1.506z",
    },
    { tag: 'path', d: "M7 2a4 4 0 0 1-4 4" },
    { tag: 'path', d: "m8.66 7.66 1.41 1.41" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.5, 1]), 380, { easing: SPRING_OUT, origin: '12px 2px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.5, 1]), 380, { easing: SPRING_OUT, origin: '3px 11px', delay: 70 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 1]), 380, { easing: SPRING_OUT, origin: '9.4px 8.4px', delay: 140 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.2, 1]), 380, { easing: SPRING_OUT, origin: '5px 4px', delay: 210 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.03, 1]), 460, { easing: EASE, delay: 260, origin: '12px 18px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.5)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 2px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.5)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '3px 11px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El rayo dice que está cargando; el cable se tensa con él. */
export const evChargerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5" },
    { tag: 'path', d: "M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16" },
    { tag: 'path', d: "M2 21h13" },
    { tag: 'path', d: "M3 7h11" },
    { tag: 'path', d: "m9 11-2 3h3l-2 3" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.35, 1]), 440, { easing: SPRING_OUT, origin: '9px 14px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.8, 0]), 460, { easing: SPRING_OUT, delay: 100 }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.35)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '9px 14px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los cables se descuelgan y vuelven; el poste está clavado. */
export const utilityPoleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v20" },
    { tag: 'path', d: "M2 5h20" },
    { tag: 'path', d: "M3 3v2" },
    { tag: 'path', d: "M7 3v2" },
    { tag: 'path', d: "M17 3v2" },
    { tag: 'path', d: "M21 3v2" },
    { tag: 'path', d: "m19 5-7 7-7-7" },
  ],
  {
    default: {
      shapes: {
        6: /* @__PURE__ */ track([
          { transform: 'scaleY(1)', offset: 0 },
          { transform: 'scaleY(1.12)', offset: 0.45 },
          { transform: 'scaleY(1)', offset: 1 },
        ], 600, { easing: EASE, origin: '12px 5px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.5, 0]), 380, { easing: SPRING_OUT, delay: 120 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.5, 0]), 380, { easing: SPRING_OUT, delay: 170 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.5, 0]), 380, { easing: SPRING_OUT, delay: 220 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.5, 0]), 380, { easing: SPRING_OUT, delay: 270 }),
      },
    },
    hold: {
      shapes: {
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.12)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 5px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El cono empuja aire: late desde su centro y el testigo parpadea. */
export const speakerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 4, y: 2, width: 16, height: 20, rx: 2 },
    { tag: 'path', d: "M12 6h.01" },
    { tag: 'circle', cx: 12, cy: 14, r: 4 },
    { tag: 'path', d: "M12 14h.01" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1]), 460, { easing: SPRING_OUT, origin: '12px 14px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1]), 460, { easing: SPRING_OUT, origin: '12px 14px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.6, 1]), 400, { easing: SPRING_OUT, origin: '12px 6px', delay: 120 }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.12)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 14px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.12)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 14px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se asientan en la cabeza con un giro corto, desde donde se apoyan. */
export const headphonesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 2, 0]), 560, { easing: EASE, origin: '12px 21px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-4deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 21px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El micro baja a su sitio, girando desde donde se engancha. */
export const headsetIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z",
    },
    { tag: 'path', d: "M21 16v2a4 4 0 0 1-4 4h-5" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 9, -4, 0]), 600, { easing: EASE, origin: '21px 16px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(9deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '21px 16px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los dos bafles empujan y los mandos parpadean. */
export const boomBoxIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" },
    { tag: 'path', d: "M8 8v1" },
    { tag: 'path', d: "M12 8v1" },
    { tag: 'path', d: "M16 8v1" },
    { tag: 'rect', x: 2, y: 9, width: 20, height: 12, rx: 2 },
    { tag: 'circle', cx: 8, cy: 15, r: 2 },
    { tag: 'circle', cx: 16, cy: 15, r: 2 },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 460, { easing: SPRING_OUT, origin: '8px 15px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 460, { easing: SPRING_OUT, origin: '16px 15px', delay: 100 }),
        1: /* @__PURE__ */ track(APAGA, 420, { delay: 160 }),
        2: /* @__PURE__ */ track(APAGA, 420, { delay: 210 }),
        3: /* @__PURE__ */ track(APAGA, 420, { delay: 260 }),
      },
    },
    hold: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.15)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 15px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.15)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 15px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La cinta pasa de una bobina a la otra: una crece justo lo que la otra encoge. */
export const cassetteTapeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 2, y: 4, width: 20, height: 16, rx: 2 },
    { tag: 'circle', cx: 8, cy: 10, r: 2 },
    { tag: 'path', d: "M8 12h8" },
    { tag: 'circle', cx: 16, cy: 10, r: 2 },
    { tag: 'path', d: "m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.25, 1]), 640, { easing: EASE, origin: '8px 10px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.75, 1]), 640, { easing: EASE, origin: '16px 10px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.25)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 10px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.75)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 10px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Lo mismo, en cinta de vídeo. */
export const videotapeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 2, y: 4, width: 20, height: 16, rx: 2 },
    { tag: 'path', d: "M2 8h20" },
    { tag: 'circle', cx: 8, cy: 14, r: 2 },
    { tag: 'path', d: "M8 12h8" },
    { tag: 'circle', cx: 16, cy: 14, r: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.25, 1]), 640, { easing: EASE, origin: '8px 14px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.75, 1]), 640, { easing: EASE, origin: '16px 14px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.25)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 14px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.75)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 14px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El brazo baja al disco y la aguja se posa. */
export const turntableIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 12.01h.01" },
    { tag: 'path', d: "M18 8v4a8 8 0 0 1-1.07 4" },
    { tag: 'circle', cx: 10, cy: 12, r: 4 },
    { tag: 'rect', x: 2, y: 4, width: 20, height: 16, rx: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 7, -3, 0]), 600, { easing: EASE, origin: '18px 8px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.6, 1]), 400, { easing: SPRING_OUT, origin: '10px 12px', delay: 200 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(7deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '18px 8px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las teclas se hunden en orden. El pivote va arriba, que es por donde bisagran. */
export const pianoIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8",
    },
    { tag: 'path', d: "M2 14h20" },
    { tag: 'path', d: "M6 14v4" },
    { tag: 'path', d: "M10 14v4" },
    { tag: 'path', d: "M14 14v4" },
    { tag: 'path', d: "M18 14v4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(TECLA, 380, { easing: SPRING_OUT, origin: '6px 14px' }),
        3: /* @__PURE__ */ track(TECLA, 380, { easing: SPRING_OUT, origin: '10px 14px', delay: 80 }),
        4: /* @__PURE__ */ track(TECLA, 380, { easing: SPRING_OUT, origin: '14px 14px', delay: 160 }),
        5: /* @__PURE__ */ track(TECLA, 380, { easing: SPRING_OUT, origin: '18px 14px', delay: 240 }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(0.65)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '6px 14px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(0.65)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '14px 14px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La caja resuena y el mástil aguanta: la madera vibra donde hay hueco. */
export const guitarIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m11.9 12.1 4.514-4.514" },
    {
      tag: 'path',
      d: "M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z",
    },
    { tag: 'path', d: "m6 16 2 2" },
    {
      tag: 'path',
      d: "M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z",
    },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 0.98, 1.035, 1]), 700, { easing: EASE, origin: '9px 16px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 0.98, 1.035, 1]), 700, { easing: EASE, delay: 70, origin: '9px 16px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '9px 16px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La pantalla se enciende y la base no se mueve: es lo que la sostiene. */
export const computerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 5, y: 2, width: 14, height: 8, rx: 2 },
    { tag: 'rect', x: 2, y: 14, width: 20, height: 8, rx: 2 },
    { tag: 'path', d: "M6 18h2" },
    { tag: 'path', d: "M12 18h6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.05, 1]), 460, { easing: SPRING_OUT, origin: '12px 10px' }),
        2: /* @__PURE__ */ track(APAGA, 420, { delay: 160 }),
        3: /* @__PURE__ */ track(APAGA, 420, { delay: 210 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.05)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 10px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El haz sale del objetivo: primero el centro, luego los rayos. */
export const projectorIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 7 3 5" },
    { tag: 'path', d: "M9 6V3" },
    { tag: 'path', d: "m13 7 2-2" },
    { tag: 'circle', cx: 9, cy: 13, r: 3 },
    {
      tag: 'path',
      d: "M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17",
    },
    { tag: 'path', d: "M16 16h2" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 440, { easing: SPRING_OUT, origin: '9px 13px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 1]), 380, { easing: SPRING_OUT, origin: '9px 4.5px', delay: 120 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 1]), 380, { easing: SPRING_OUT, origin: '4px 6px', delay: 180 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 1]), 380, { easing: SPRING_OUT, origin: '14px 6px', delay: 240 }),
        5: /* @__PURE__ */ track(APAGA, 420, { delay: 300 }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.15)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '9px 13px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Marca el compás: el brazo va de un lado al otro, girando desde su base. */
export const metronomeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 11.4V9.1" },
    { tag: 'path', d: "m12 17 6.59-6.59" },
    {
      tag: 'path',
      d: "m15.05 5.7-.218-.691a3 3 0 0 0-5.663 0L4.418 19.695A1 1 0 0 0 5.37 21h13.253a1 1 0 0 0 .951-1.31L18.45 16.2",
    },
    { tag: 'circle', cx: 20, cy: 9, r: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 4, -2, 0]), 900, { easing: EASE, origin: '12px 19px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 4, -2, 0]), 900, { easing: EASE, origin: '12px 19px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 4, -2, 0]), 900, { easing: EASE, origin: '12px 19px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-4deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 19px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-4deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 19px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-4deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 19px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Lo lee un haz que pasa de izquierda a derecha. */
export const barcodeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 5v14" },
    { tag: 'path', d: "M8 5v14" },
    { tag: 'path', d: "M12 5v14" },
    { tag: 'path', d: "M17 5v14" },
    { tag: 'path', d: "M21 5v14" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(APAGA, 420),
        1: /* @__PURE__ */ track(APAGA, 420, { delay: 70 }),
        2: /* @__PURE__ */ track(APAGA, 420, { delay: 140 }),
        3: /* @__PURE__ */ track(APAGA, 420, { delay: 210 }),
        4: /* @__PURE__ */ track(APAGA, 420, { delay: 280 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(0.9)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(0.9)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(0.9)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(0.9)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(0.9)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se lee de dentro hacia fuera, cresta por cresta. */
export const fingerprintPatternIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" },
    { tag: 'path', d: "M14 13.12c0 2.38 0 6.38-1 8.88" },
    { tag: 'path', d: "M17.29 21.02c.12-.6.43-2.3.5-3.02" },
    { tag: 'path', d: "M2 12a10 10 0 0 1 18-6" },
    { tag: 'path', d: "M2 16h.01" },
    { tag: 'path', d: "M21.8 16c.2-2 .131-5.354 0-6" },
    { tag: 'path', d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" },
    { tag: 'path', d: "M8.65 22c.21-.66.45-1.32.57-2" },
    { tag: 'path', d: "M9 6.8a6 6 0 0 1 9 5.2v2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(APAGA, 420),
        1: /* @__PURE__ */ track(APAGA, 420, { delay: 60 }),
        2: /* @__PURE__ */ track(APAGA, 420, { delay: 110 }),
        6: /* @__PURE__ */ track(APAGA, 420, { delay: 160 }),
        7: /* @__PURE__ */ track(APAGA, 420, { delay: 210 }),
        8: /* @__PURE__ */ track(APAGA, 420, { delay: 260 }),
        5: /* @__PURE__ */ track(APAGA, 420, { delay: 310 }),
        3: /* @__PURE__ */ track(APAGA, 420, { delay: 360 }),
        4: /* @__PURE__ */ track(APAGA, 420, { delay: 410 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 14px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 14px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 14px' }),
      },
      reverseOnLeave: true,
    },
  },
);


// ── Casa y objetos ─────────────────────────────────────────────────────────────────────────
// Las lámparas viven en icons/lamp.ts, las camas en icons/bed.ts y las puertas en icons/door.ts,
// porque en las tres el gesto lo decide cómo está sujeta cada cosa. Aquí queda el resto.

/** Se apaga y vuelve: testigos, mandos, luz de horno. */
const APAGA_CASA = /* @__PURE__ */ [
  { opacity: '1', offset: 0 },
  { opacity: '0.3', offset: 0.42 },
  { opacity: '1', offset: 1 },
];

/** Un asiento cede bajo el peso. Solo encoge, así que no necesita margen. */
const CEDE = /* @__PURE__ */ [
  { transform: 'scaleY(1)', offset: 0 },
  { transform: 'scaleY(0.92)', offset: 0.45 },
  { transform: 'scaleY(1)', offset: 1 },
];

/** Una gota que cae y se repone. */
const GOTA = /* @__PURE__ */ [
  { transform: 'translateY(-0.8px)', opacity: '0.3', offset: 0 },
  { transform: 'translateY(0.8px)', opacity: '1', offset: 0.6 },
  { transform: 'translateY(0)', opacity: '1', offset: 1 },
];

/** El calor sube y se deshace. */
const ONDA = /* @__PURE__ */ [
  { transform: 'translateY(0)', opacity: '1', offset: 0 },
  { transform: 'translateY(-0.8px)', opacity: '0.4', offset: 0.6 },
  { transform: 'translateY(0)', opacity: '1', offset: 1 },
];

/** Un reflejo que cruza el cristal en diagonal. */
const BRILLO = /* @__PURE__ */ [
  { transform: 'translate(0, 0)', offset: 0 },
  { transform: 'translate(0.8px, -0.8px)', offset: 0.5 },
  { transform: 'translate(0, 0)', offset: 1 },
];

/** Alguien se sienta: el asiento cede y el respaldo lo acusa. Las patas aguantan. */
export const armchairIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" },
    {
      tag: 'path',
      d: "M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
    },
    { tag: 'path', d: "M5 18v2" },
    { tag: 'path', d: "M19 18v2" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CEDE, 520, { easing: EASE, origin: '12px 18px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.5, 0]), 500, { easing: SPRING_OUT, delay: 60 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(0.92)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 18px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Igual, con sitio para tres. */
export const sofaIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" },
    {
      tag: 'path',
      d: "M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
    },
    { tag: 'path', d: "M4 18v2" },
    { tag: 'path', d: "M20 18v2" },
    { tag: 'path', d: "M12 4v9" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CEDE, 520, { easing: EASE, origin: '12px 18px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.5, 0]), 500, { easing: SPRING_OUT, delay: 60 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.5, 0]), 500, { easing: SPRING_OUT, delay: 60 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(0.92)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 18px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Lo que se mueve son las cajas de los estantes; el mueble está fijo a la pared. */
export const shelvingUnitIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 12V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" },
    { tag: 'path', d: "M16 20v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" },
    { tag: 'path', d: "M20 22V2" },
    { tag: 'path', d: "M4 12h16" },
    { tag: 'path', d: "M4 20h16" },
    { tag: 'path', d: "M4 2v20" },
    { tag: 'path', d: "M4 4h16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 460, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1, 0]), 460, { easing: SPRING_OUT, delay: 110 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El agua se mece dentro; la bañera no se mueve. */
export const bathIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 4 8 6" },
    { tag: 'path', d: "M17 19v2" },
    { tag: 'path', d: "M2 12h20" },
    { tag: 'path', d: "M7 19v2" },
    {
      tag: 'path',
      d: "M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([
          { transform: 'translateY(0)', offset: 0 },
          { transform: 'translateY(-0.6px)', offset: 0.35 },
          { transform: 'translateY(0.4px)', offset: 0.7 },
          { transform: 'translateY(0)', offset: 1 },
        ], 620, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.6px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las gotas caen en cadena, de la alcachofa hacia abajo. */
export const showerHeadIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m4 4 2.5 2.5" },
    { tag: 'path', d: "M13.5 6.5a4.95 4.95 0 0 0-7 7" },
    { tag: 'path', d: "M15 5 5 15" },
    { tag: 'path', d: "M14 17v.01" },
    { tag: 'path', d: "M10 16v.01" },
    { tag: 'path', d: "M13 13v.01" },
    { tag: 'path', d: "M16 10v.01" },
    { tag: 'path', d: "M11 20v.01" },
    { tag: 'path', d: "M17 14v.01" },
    { tag: 'path', d: "M20 11v.01" },
  ],
  {
    default: {
      shapes: {
        6: /* @__PURE__ */ track(GOTA, 420, { easing: SPRING_OUT }),
        9: /* @__PURE__ */ track(GOTA, 420, { easing: SPRING_OUT, delay: 70 }),
        5: /* @__PURE__ */ track(GOTA, 420, { easing: SPRING_OUT, delay: 140 }),
        8: /* @__PURE__ */ track(GOTA, 420, { easing: SPRING_OUT, delay: 210 }),
        4: /* @__PURE__ */ track(GOTA, 420, { easing: SPRING_OUT, delay: 280 }),
        3: /* @__PURE__ */ track(GOTA, 420, { easing: SPRING_OUT, delay: 350 }),
        7: /* @__PURE__ */ track(GOTA, 420, { easing: SPRING_OUT, delay: 420 }),
      },
    },
    hold: {
      shapes: {
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Tira de la cisterna y la taza acusa la descarga. */
export const toiletIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18",
    },
    { tag: 'path', d: "M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.5, 0]), 400, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.05, 1]), 480, { easing: SPRING_OUT, origin: '14px 16px', delay: 140 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La toalla se mece colgada de su barra. */
export const towelRackIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 7h-2" },
    {
      tag: 'path',
      d: "M6.5 3h11A2.5 2.5 0 0 1 20 5.5V20a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V5.5a1 1 0 0 0-5 0V17a1 1 0 0 0 1 1h4",
    },
    { tag: 'path', d: "M9 7H2" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 2.5, -1.8, 0]), 700, { easing: EASE, origin: '13px 3px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(2.5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '13px 3px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Aprietas el pulsador y cae la gota. En ese orden, que es como funciona. */
export const soapDispenserDropletIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.5 2v4" },
    { tag: 'path', d: "M14 2H7a2 2 0 0 0-2 2" },
    {
      tag: 'path',
      d: "M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19",
    },
    {
      tag: 'path',
      d: "M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.8, 0]), 400, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.8, 0]), 400, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.5, 0]), 460, { easing: SPRING_OUT, delay: 160, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Centrifuga: el remolino de dentro SÍ puede girar, porque es un trazo y no un círculo. */
export const washingMachineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 6h3" },
    { tag: 'path', d: "M17 6h.01" },
    { tag: 'rect', x: 3, y: 2, width: 18, height: 20, rx: 2 },
    { tag: 'circle', cx: 12, cy: 13, r: 5 },
    { tag: 'path', d: "M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 900, { easing: 'linear', origin: '12px 13px' }),
        1: /* @__PURE__ */ track(APAGA_CASA, 440, { delay: 200 }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(180deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 13px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se tira del tirador y la puerta cede un pelo. */
export const refrigeratorIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" },
    { tag: 'path', d: "M5 10h14" },
    { tag: 'path', d: "M15 7v6" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.8, 0]), 460, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.98)' }, { transform: 'scaleX(1)' }], 480, { easing: EASE, delay: 80, origin: '5px 12px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Está funcionando: la luz de dentro y el panel parpadean. */
export const microwaveIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 2, y: 4, width: 20, height: 15, rx: 2 },
    { tag: 'rect', x: 6, y: 8, width: 8, height: 7, rx: 1 },
    { tag: 'path', d: "M18 8v7" },
    { tag: 'path', d: "M6 19v2" },
    { tag: 'path', d: "M18 19v2" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(APAGA_CASA, 440),
        2: /* @__PURE__ */ track(APAGA_CASA, 440, { delay: 160 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.04)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '10px 11.5px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Bate: lo de dentro se agita de lado a lado y el botón parpadea. */
export const blenderIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M8 14a2 2 0 0 0-1.963 1.615l-1.018 5.193A1 1 0 0 0 6 22h12a1 1 0 0 0 .981-1.192l-1.018-5.193A2 2 0 0 0 16 14z",
    },
    { tag: 'path', d: "m17 2-1 12" },
    { tag: 'path', d: "M8.006 14 7 2" },
    { tag: 'path', d: "M7.565 8.787A5 5 0 0 0 12 8a5 5 0 0 1 4.56-.75" },
    { tag: 'path', d: "M19 2H5a2 2 0 0 0-2 2v5a2 2 0 0 0 .688 1.5" },
    { tag: 'path', d: "M12 18h.01" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track([
          { transform: 'translateX(0)', offset: 0 },
          { transform: 'translateX(-0.9px)', offset: 0.28 },
          { transform: 'translateX(0.9px)', offset: 0.62 },
          { transform: 'translateX(0)', offset: 1 },
        ], 620, { easing: EASE }),
        5: /* @__PURE__ */ track(APAGA_CASA, 440, { delay: 120 }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El calor sube: las dos ondas primero, y las aletas se quedan donde están. */
export const heaterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 8c2-3-2-3 0-6" },
    { tag: 'path', d: "M15.5 8c2-3-2-3 0-6" },
    { tag: 'path', d: "M6 10h.01" },
    { tag: 'path', d: "M6 14h.01" },
    { tag: 'path', d: "M10 16v-4" },
    { tag: 'path', d: "M14 16v-4" },
    { tag: 'path', d: "M18 16v-4" },
    { tag: 'path', d: "M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3" },
    { tag: 'path', d: "M5 20v2" },
    { tag: 'path', d: "M19 20v2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(ONDA, 620, { easing: EASE }),
        1: /* @__PURE__ */ track(ONDA, 620, { easing: EASE, delay: 120 }),
        2: /* @__PURE__ */ track(APAGA_CASA, 440, { delay: 200 }),
        3: /* @__PURE__ */ track(APAGA_CASA, 440, { delay: 250 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Sale aire: los dos remolinos giran, y esos sí son trazos. */
export const airVentIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 17.5a2.5 2.5 0 1 1-4 2.03V12" },
    { tag: 'path', d: "M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" },
    { tag: 'path', d: "M6 8h12" },
    { tag: 'path', d: "M6.6 15.572A2 2 0 1 0 10 17v-5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 14, -6, 0]), 720, { easing: EASE, origin: '16px 17.5px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 14, -6, 0]), 720, { easing: EASE, origin: '8px 17.5px', delay: 120 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(14deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 17.5px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(14deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 17.5px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Gira de verdad: sus aspas son un trazo, así que la vuelta entera se ve. */
export const fanIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z",
    },
    { tag: 'path', d: "M12 12v.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 900, { easing: 'linear', origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(120deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Barre: gira desde el puño, que es de donde se agarra. */
export const broomIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.5 10.5 22 2" },
    {
      tag: 'path',
      d: "M14.734 13.841a2 2 0 00-.314-2.42L12.58 9.58a2 2 0 00-2.421-.314l-7.657 4.461A1 1 0 002.3 15.3l6.403 6.403a1 1 0 001.571-.204z",
    },
    { tag: 'path', d: "m5 18 2-2" },
    { tag: 'path', d: "m7.699 10.7 5.602 5.601" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 3, 0]), 620, { easing: EASE, origin: '22px 2px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 3, 0]), 620, { easing: EASE, origin: '22px 2px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 3, 0]), 620, { easing: EASE, origin: '22px 2px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 3, 0]), 620, { easing: EASE, origin: '22px 2px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '22px 2px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '22px 2px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '22px 2px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '22px 2px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Barre igual, y los destellos salen después del barrido. */
export const broomSparklesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 2v2" },
    { tag: 'path', d: "M12 3h-2" },
    { tag: 'path', d: "M13.5 10.5 22 2" },
    {
      tag: 'path',
      d: "M14.734 13.841a2 2 0 00-.314-2.42L12.58 9.58a2 2 0 00-2.421-.314l-7.657 4.461A1 1 0 002.3 15.3l6.403 6.403a1 1 0 001.571-.204z",
    },
    { tag: 'path', d: "M20 15v4" },
    { tag: 'path', d: "M22 17h-4" },
    { tag: 'path', d: "M4 4v4" },
    { tag: 'path', d: "m5 18 2-2" },
    { tag: 'path', d: "M6 6H2" },
    { tag: 'path', d: "m7.699 10.7 5.602 5.601" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 3, 0]), 620, { easing: EASE, origin: '22px 2px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 3, 0]), 620, { easing: EASE, origin: '22px 2px' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 3, 0]), 620, { easing: EASE, origin: '22px 2px' }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 3, 0]), 620, { easing: EASE, origin: '22px 2px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 1]), 380, { easing: SPRING_OUT, origin: '4px 6px', delay: 180 }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 1]), 380, { easing: SPRING_OUT, origin: '4px 6px', delay: 225 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 1]), 380, { easing: SPRING_OUT, origin: '11px 3px', delay: 270 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 1]), 380, { easing: SPRING_OUT, origin: '11px 3px', delay: 315 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 1]), 380, { easing: SPRING_OUT, origin: '20px 17px', delay: 360 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.4, 1]), 380, { easing: SPRING_OUT, origin: '20px 17px', delay: 405 }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '22px 2px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '22px 2px' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '22px 2px' }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '22px 2px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se cierran: cada lama bascula desde su extremo izquierdo, de arriba abajo. */
export const blindsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3h18" },
    { tag: 'path', d: "M20 7H8" },
    { tag: 'path', d: "M20 11H8" },
    { tag: 'path', d: "M10 19h10" },
    { tag: 'path', d: "M8 15h12" },
    { tag: 'path', d: "M4 3v14" },
    { tag: 'circle', cx: 4, cy: 19, r: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 0]), 520, { easing: EASE, origin: '8px 7px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 0]), 520, { easing: EASE, origin: '8px 11px', delay: 80 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 0]), 520, { easing: EASE, origin: '8px 15px', delay: 160 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 0]), 520, { easing: EASE, origin: '10px 19px', delay: 240 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 1, 0]), 460, { easing: SPRING_OUT, delay: 220 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 7px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 11px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 15px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '10px 19px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El motivo se compone: primero el sol, después el monte. */
export const wallpaperIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M8 21h8" },
    { tag: 'path', d: "m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15" },
    { tag: 'circle', cx: 8, cy: 9, r: 2 },
    { tag: 'rect', x: 2, y: 3, width: 20, height: 14, rx: 2 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 1]), 420, { easing: SPRING_OUT, origin: '8px 9px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([1.2, 0]), 460, { easing: SPRING_OUT, delay: 140, fill: 'backwards' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 9px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El brillo cruza el cristal: dos reflejos, uno detrás del otro. */
export const mirrorRectangularIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 6 8 9" },
    { tag: 'path', d: "m16 7-8 8" },
    { tag: 'rect', x: 4, y: 2, width: 16, height: 20, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BRILLO, 520, { easing: EASE }),
        1: /* @__PURE__ */ track(BRILLO, 520, { easing: EASE, delay: 110 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.8px, -0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.8px, -0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Lo mismo, en el redondo. */
export const mirrorRoundIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 6.6 8.6 8" },
    { tag: 'path', d: "M12 18v4" },
    { tag: 'path', d: "M15 7.5 9.5 13" },
    { tag: 'path', d: "M7 22h10" },
    { tag: 'circle', cx: 12, cy: 10, r: 8 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(BRILLO, 520, { easing: EASE }),
        2: /* @__PURE__ */ track(BRILLO, 520, { easing: EASE, delay: 110 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.8px, -0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.8px, -0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);


// ── Lo que rueda ───────────────────────────────────────────────────────────────────────────
// Los `car-*` viven en icons/car.ts y los `train-*` en icons/train.ts. Aquí queda el resto.
//
// La regla del grupo: casi todas las ruedas de Lucide son `circle`, y un círculo girando es
// INVISIBLE. Así que ninguno rueda — lo que se mueve es la carrocería sobre su suspensión,
// mientras las ruedas siguen pegadas al suelo. Que además es lo fiel: al arrancar, lo que se
// mueve respecto al asfalto es la carrocería, no el punto de contacto de la rueda.

/** La carrocería se hunde sobre los amortiguadores y vuelve. */
const SUSPENSION = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(0.7px)', offset: 0.45 },
  { transform: 'translateY(0)', offset: 1 },
];
/** Un faro, un piloto, un cartel: enciende y vuelve. */
const DESTELLA = /* @__PURE__ */ [
  { opacity: '1', offset: 0 },
  { opacity: '0.25', offset: 0.4 },
  { opacity: '1', offset: 1 },
];

/** El humo de un escape: sube y se deshace. */
const HUMO = /* @__PURE__ */ [
  { transform: 'translateY(0)', opacity: '1', offset: 0 },
  { transform: 'translateY(-0.8px)', opacity: '0.35', offset: 0.6 },
  { transform: 'translateY(0)', opacity: '1', offset: 1 },
];
/** Una marca de carretera que pasa por debajo. */
const MARCA = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(1.2px)', offset: 0.5 },
  { transform: 'translateY(0)', offset: 1 },
];

/** La cruz destella —es lo que la hace ambulancia— y la caja se hunde. */
export const ambulanceIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 10H6" },
    { tag: 'path', d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" },
    {
      tag: 'path',
      d: "M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14",
    },
    { tag: 'path', d: "M8 8v4" },
    { tag: 'path', d: "M9 18h6" },
    { tag: 'circle', cx: 17, cy: 18, r: 2 },
    { tag: 'circle', cx: 7, cy: 18, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(SHOOT_OFF_KEYFRAMES, 1500, { delay: 620 }),
      shapes: {
        0: /* @__PURE__ */ track(DESTELLA, 420),
        3: /* @__PURE__ */ track(DESTELLA, 420),
        1: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 120 }),
        2: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 120 }),
        4: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 120 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 10px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 10px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La caja se hunde con sus ventanas; las ruedas se quedan. */
export const busIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 6v6" },
    { tag: 'path', d: "M15 6v6" },
    { tag: 'path', d: "M2 12h19.6" },
    {
      tag: 'path',
      d: "M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",
    },
    { tag: 'circle', cx: 7, cy: 18, r: 2 },
    { tag: 'path', d: "M9 18h5" },
    { tag: 'circle', cx: 16, cy: 18, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(SHOOT_OFF_KEYFRAMES, 1500, { delay: 620 }),
      shapes: {
        3: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
        5: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los retrovisores tiemblan y los pilotos encienden. */
export const busFrontIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 6 2 7" },
    { tag: 'path', d: "M10 6h4" },
    { tag: 'path', d: "m22 7-2-1" },
    { tag: 'rect', x: 4, y: 3, width: 16, height: 16, rx: 2 },
    { tag: 'path', d: "M4 11h16" },
    { tag: 'path', d: "M8 15h.01" },
    { tag: 'path', d: "M16 15h.01" },
    { tag: 'path', d: "M6 19v2" },
    { tag: 'path', d: "M18 21v-2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.6, 0]), 460, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.6, 0]), 460, { easing: SPRING_OUT }),
        5: /* @__PURE__ */ track(DESTELLA, 420, { delay: 120 }),
        6: /* @__PURE__ */ track(DESTELLA, 420, { delay: 180 }),
      },
    },
    hold: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 15px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 15px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se mece sobre su rueda única, que es lo que tiene de caravana. */
export const caravanIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2" },
    { tag: 'path', d: "M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2" },
    { tag: 'path', d: "M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9" },
    { tag: 'circle', cx: 8, cy: 19, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(SHOOT_OFF_KEYFRAMES, 1500, { delay: 620 }),
      shapes: {
        0: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La furgoneta se hunde por detrás, que es donde va la carga. */
export const vanIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M13 6v5a1 1 0 0 0 1 1h6.102a1 1 0 0 1 .712.298l.898.91a1 1 0 0 1 .288.702V17a1 1 0 0 1-1 1h-3",
    },
    { tag: 'path', d: "M5 18H3a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2h12c1.1 0 2.1.8 2.4 1.8l1.176 4.2" },
    { tag: 'path', d: "M9 18h5" },
    { tag: 'circle', cx: 16, cy: 18, r: 2 },
    { tag: 'circle', cx: 7, cy: 18, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(SHOOT_OFF_KEYFRAMES, 1500, { delay: 620 }),
      shapes: {
        0: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El cuadro rebota entre las dos ruedas; ellas no se mueven. */
export const bikeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 18.5, cy: 17.5, r: 3.5 },
    { tag: 'circle', cx: 5.5, cy: 17.5, r: 3.5 },
    { tag: 'circle', cx: 15, cy: 5, r: 1 },
    { tag: 'path', d: "M12 17.5V14l-3-3 4-3 2 3h2" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(SHOOT_OFF_KEYFRAMES, 1500, { delay: 620 }),
      shapes: {
        3: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Igual, con motor. */
export const motorbikeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m18 14-1-3" },
    { tag: 'path', d: "m3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81" },
    { tag: 'path', d: "M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5" },
    { tag: 'circle', cx: 19, cy: 17, r: 3 },
    { tag: 'circle', cx: 5, cy: 17, r: 3 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(SHOOT_OFF_KEYFRAMES, 1500, { delay: 620 }),
      shapes: {
        0: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Y aquí el patinete. */
export const scooterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 4h-3.5l2 11.05" },
    { tag: 'path', d: "M6.95 17h5.142c.523 0 .95-.406 1.063-.916a6.5 6.5 0 0 1 5.345-5.009" },
    { tag: 'circle', cx: 19.5, cy: 17.5, r: 2.5 },
    { tag: 'circle', cx: 4.5, cy: 17.5, r: 2.5 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(SHOOT_OFF_KEYFRAMES, 1500, { delay: 620 }),
      shapes: {
        0: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Esta sí tiene algo mejor que la suspensión: LEVANTA la horquilla por su mástil. */
export const forkliftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 12H5a2 2 0 0 0-2 2v5" },
    { tag: 'path', d: "M15 19h7" },
    { tag: 'path', d: "M16 19V2" },
    {
      tag: 'path',
      d: "M6 12V7a2 2 0 0 1 2-2h2.172a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 16 10.828",
    },
    { tag: 'path', d: "M7 19h4" },
    { tag: 'circle', cx: 13, cy: 19, r: 2 },
    { tag: 'circle', cx: 5, cy: 19, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(SHOOT_OFF_KEYFRAMES, 1500, { delay: 620 }),
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -1.5, 0]), 620, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 180 }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Echa humo por el tubo y la cabina se mece sobre la rueda grande. */
export const tractorIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20" },
    { tag: 'path', d: "M16 18h-5" },
    { tag: 'path', d: "M18 5a1 1 0 0 0-1 1v5.573" },
    { tag: 'path', d: "M3 4h8.129a1 1 0 0 1 .99.863L13 11.246" },
    { tag: 'path', d: "M4 11V4" },
    { tag: 'path', d: "M7 15h.01" },
    { tag: 'path', d: "M8 10.1V4" },
    { tag: 'circle', cx: 18, cy: 18, r: 2 },
    { tag: 'circle', cx: 7, cy: 15, r: 5 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(SHOOT_OFF_KEYFRAMES, 1500, { delay: 620 }),
      shapes: {
        4: /* @__PURE__ */ track(HUMO, 620, { easing: EASE }),
        6: /* @__PURE__ */ track(HUMO, 620, { easing: EASE, delay: 100 }),
        3: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 140 }),
        2: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 140 }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los pilotos encienden y la caja se hunde sobre los raíles. */
export const tramFrontIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 4, y: 3, width: 16, height: 16, rx: 2 },
    { tag: 'path', d: "M4 11h16" },
    { tag: 'path', d: "M12 3v8" },
    { tag: 'path', d: "m8 19-2 3" },
    { tag: 'path', d: "m18 22-2-3" },
    { tag: 'path', d: "M8 15h.01" },
    { tag: 'path', d: "M16 15h.01" },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track(DESTELLA, 420),
        6: /* @__PURE__ */ track(DESTELLA, 420, { delay: 90 }),
        0: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 120 }),
        1: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 120 }),
        2: /* @__PURE__ */ track(SUSPENSION, 520, { easing: SPRING_OUT, delay: 120 }),
      },
    },
    hold: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 15px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 15px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La carretera pasa por debajo: las marcas del centro bajan una tras otra. */
export const roadIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 17v4" },
    { tag: 'path', d: "M12 5V3" },
    { tag: 'path', d: "M12 9v3" },
    {
      tag: 'path',
      d: "M2.077 18.449A2 2 0 0 0 4 21h16a2 2 0 0 0 1.924-2.55l-4-14A2 2 0 0 0 16 3H8a2 2 0 0 0-1.924 1.45z",
    },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(MARCA, 480, { easing: EASE }),
        2: /* @__PURE__ */ track(MARCA, 480, { easing: EASE, delay: 90 }),
        0: /* @__PURE__ */ track(MARCA, 480, { easing: EASE, delay: 180 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.2px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.2px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.2px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Alguien lo rozó: se tambalea sobre su base y se endereza. */
export const trafficConeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16.05 10.966a5 2.5 0 0 1-8.1 0" },
    {
      tag: 'path',
      d: "m16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04",
    },
    { tag: 'path', d: "M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z" },
    { tag: 'path', d: "M9.194 6.57a5 2.5 0 0 0 5.61 0" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -6, 4, -2, 0]), 700, { easing: EASE, origin: '12px 20px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -6, 4, -2, 0]), 700, { easing: EASE, origin: '12px 20px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -6, 4, -2, 0]), 700, { easing: EASE, origin: '12px 20px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -6, 4, -2, 0]), 700, { easing: EASE, origin: '12px 20px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 20px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 20px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 20px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 20px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El cartel se columpia sobre el poste, que está clavado. */
export const signpostIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13v8" },
    { tag: 'path', d: "M12 3v3" },
    {
      tag: 'path',
      d: "M2.354 10.354a1.207 1.207 0 0 1 0-1.708l2.06-2.06A2 2 0 0 1 5.828 6h12.344a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H5.828a2 2 0 0 1-1.414-.586z",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3.5, -2.5, 0]), 700, { easing: EASE, origin: '12px 8px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(3.5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 8px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Dos brazos, dos sentidos: cada uno se columpia hacia el suyo. */
export const signpostBigIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 9H4L2 7l2-2h6" },
    { tag: 'path', d: "M14 5h6l2 2-2 2h-6" },
    { tag: 'path', d: "M10 22V4a2 2 0 1 1 4 0v18" },
    { tag: 'path', d: "M8 22h8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 2, 0]), 700, { easing: EASE, origin: '11px 7px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 4, -2, 0]), 700, { easing: EASE, origin: '13px 7px', delay: 90 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-4deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 7px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(4deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '13px 7px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El banderín ondea con skewX; el mojón no se mueve. */
export const milestoneIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 13v8" },
    { tag: 'path', d: "M12 3v3" },
    {
      tag: 'path',
      d: "M18.172 6a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track([
          { transform: 'skewX(0deg)', offset: 0 },
          { transform: 'skewX(-6deg)', offset: 0.35 },
          { transform: 'skewX(4deg)', offset: 0.7 },
          { transform: 'skewX(0deg)', offset: 1 },
        ], 720, { easing: EASE, origin: '12px 9px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'skewX(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 9px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Metes la moneda: la ranura destella y el contador se asienta. */
export const parkingMeterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 15h2" },
    { tag: 'path', d: "M12 12v3" },
    { tag: 'path', d: "M12 19v3" },
    {
      tag: 'path',
      d: "M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z",
    },
    { tag: 'path', d: "M9 9a3 3 0 1 1 6 0" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(DESTELLA, 420),
        1: /* @__PURE__ */ track(DESTELLA, 420, { delay: 80 }),
        3: /* @__PURE__ */ track(SUSPENSION, 480, { easing: SPRING_OUT, delay: 140 }),
        4: /* @__PURE__ */ track(SUSPENSION, 480, { easing: SPRING_OUT, delay: 140 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 15px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 13.5px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La manguera se descuelga del surtidor, que se queda plantado. */
export const fuelIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5" },
    { tag: 'path', d: "M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16" },
    { tag: 'path', d: "M2 21h13" },
    { tag: 'path', d: "M3 9h11" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 5, -3, 0]), 660, { easing: EASE, origin: '14px 13px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '14px 13px' }),
      },
      reverseOnLeave: true,
    },
  },
);


/* ── Vocabulario de la tanda de aire, agua y lugares ────────────────────────────────────────── */

/**
 * Una pala vista DE PERFIL no gira: parpadea. Girarla de verdad la sacaría del lienzo (8 unidades
 * de radio desde un eje que está en y=3), y de canto es como se ve un rotor en marcha.
 */
const PALA_DE_CANTO = /* @__PURE__ */ [
  { transform: 'scaleX(1)', offset: 0 },
  { transform: 'scaleX(0.12)', offset: 0.25 },
  { transform: 'scaleX(1)', offset: 0.5 },
  { transform: 'scaleX(0.12)', offset: 0.75 },
  { transform: 'scaleX(1)', offset: 1 },
];

/** Lo mismo para una pala vertical: el rotor de cola. */
const PALA_DE_CANTO_Y = /* @__PURE__ */ [
  { transform: 'scaleY(1)', offset: 0 },
  { transform: 'scaleY(0.12)', offset: 0.25 },
  { transform: 'scaleY(1)', offset: 0.5 },
  { transform: 'scaleY(0.12)', offset: 0.75 },
  { transform: 'scaleY(1)', offset: 1 },
];

/**
 * Una puerta gira sobre sus bisagras y en plano eso se ve como que se estrecha. Es EL MISMO gesto
 * de `icons/door.ts`, a propósito: los seis edificios de esta tanda comparten la puerta —es
 * literalmente la misma figura en todos—, así que lo que los distingue es su seña, no la entrada.
 */
const PUERTA_ABRE = /* @__PURE__ */ [
  { transform: 'scaleX(1)', offset: 0 },
  { transform: 'scaleX(0.86)', offset: 0.5 },
  { transform: 'scaleX(1)', offset: 1 },
];

/** Dos golpes: un pulso, un timbre. No es un latido simple, y esa es la diferencia. */
const LATIDO_DOBLE = /* @__PURE__ */ scaleSeq([1, 1.2, 1, 1.12, 1]);

/** Un trazo que crece desde su base. */
const CRECE_Y = /* @__PURE__ */ [{ transform: 'scaleY(0.45)' }, { transform: 'scaleY(1)' }];

/** El helicóptero despega: sube y vuelve. El margen del lienzo da 1 unidad, no más. */
const DESPEGUE = /* @__PURE__ */ moveYSeq([0, -0.9, 0]);

/**
 * El rotor de perfil parpadea, la cola hace lo mismo en vertical y el aparato despega. Nada gira:
 * un rotor de canto no se ve girar, se ve titilar.
 */
export const helicopterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 17v4" },
    { tag: 'path', d: "M14 3v8a2 2 0 0 0 2 2h5.865" },
    { tag: 'path', d: "M17 17v4" },
    { tag: 'path', d: "M18 17a4 4 0 0 0 4-4 8 6 0 0 0-8-6 6 5 0 0 0-6 5v3a2 2 0 0 0 2 2z" },
    { tag: 'path', d: "M2 10v5" },
    { tag: 'path', d: "M6 3h16" },
    { tag: 'path', d: "M7 21h14" },
    { tag: 'path', d: "M8 13H2" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(DESPEGUE, 780, { easing: EASE, delay: 140 }),
      shapes: {
        5: /* @__PURE__ */ track(PALA_DE_CANTO, 620, { easing: EASE, origin: '14px 3px' }),
        4: /* @__PURE__ */ track(PALA_DE_CANTO_Y, 620, { easing: EASE, origin: '2px 12.5px' }),
      },
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1px)' }], 320),
  },
);

/**
 * Las cuatro hélices de `drone` SÍ giran, y es la excepción que confirma la regla del círculo
 * invisible: son medios arcos (la cuerda entre sus extremos mide 8, o sea el diámetro), no
 * círculos cerrados. Un semicírculo girando se ve perfectamente. Los centros están medidos, no
 * supuestos: el punto medio de esa cuerda.
 */
export const droneIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 10 7 7" },
    { tag: 'path', d: "m10 14-3 3" },
    { tag: 'path', d: "m14 10 3-3" },
    { tag: 'path', d: "m14 14 3 3" },
    { tag: 'path', d: "M14.205 4.139a4 4 0 1 1 5.439 5.863" },
    { tag: 'path', d: "M19.637 14a4 4 0 1 1-5.432 5.868" },
    { tag: 'path', d: "M4.367 10a4 4 0 1 1 5.438-5.862" },
    { tag: 'path', d: "M9.795 19.862a4 4 0 1 1-5.429-5.873" },
    { tag: 'rect', x: 10, y: 8, width: 4, height: 8, rx: 1 },
  ],
  {
    default: {
      shapes: {
        6: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 900, { easing: EASE, origin: '7.09px 7.07px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 900, { easing: EASE, delay: 70, origin: '16.92px 7.07px' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 900, { easing: EASE, delay: 140, origin: '7.08px 16.93px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 900, { easing: EASE, delay: 210, origin: '16.92px 16.93px' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.7, 0]), 860, { easing: EASE, delay: 120 }),
      },
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1px)' }], 320),
  },
);

/**
 * La torre de control barre: los dos cristales se encienden en cadena —que es como se lee un haz
 * girando— y la antena emite. Al estirarse la antena, su remate sube CON ella: 12% de 4 unidades
 * son 0.48, y sin ese traslado el palo se le despega.
 */
export const towerControlIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z" },
    { tag: 'path', d: "M8 13v9" },
    { tag: 'path', d: "M16 22v-9" },
    { tag: 'path', d: "m9 6 1 7" },
    { tag: 'path', d: "m15 6-1 7" },
    { tag: 'path', d: "M12 6V2" },
    { tag: 'path', d: "M13 2h-2" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(DESTELLA, 420),
        4: /* @__PURE__ */ track(DESTELLA, 420, { delay: 160 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.12)' }, { transform: 'scaleY(1)' }], 640, { easing: EASE, origin: '12px 6px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.48, 0]), 640, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.12)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 6px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.48px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * Rema. El remo y sus dos palas son UNA pieza rígida —giran juntos sobre el mismo pivote, porque
 * separarlos rompería el remo— y el casco responde después, que es donde está la coreografía.
 */
export const kayakIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z" },
    {
      tag: 'path',
      d: "M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61",
    },
    { tag: 'path', d: "m6.707 6.707 10.586 10.586" },
    { tag: 'path', d: "M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -13, 9, 0]), 760, { easing: EASE, origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -13, 9, 0]), 760, { easing: EASE, origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -13, 9, 0]), 760, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 2.5, -1.5, 0]), 760, { easing: EASE, delay: 120, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-13deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-13deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-13deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La vela se hincha desde el mástil y el casco escora sobre su línea de flotación. */
export const sailboatIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 2v15" },
    { tag: 'path', d: "M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z" },
    { tag: 'path', d: "M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 2.5, -2, 0]), 980, { easing: EASE, origin: '12px 22px' }),
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.05)' }, { transform: 'scaleX(1)' }], 900, { easing: EASE, delay: 100, origin: '10px 13px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.06)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '10px 13px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Cuelga de su argolla: péndulo amortiguado. El pivote es la argolla, no el centro. */
export const anchorIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6v16" },
    { tag: 'path', d: "m19 13 2-1a9 9 0 0 1-18 0l2 1" },
    { tag: 'path', d: "M9 11h6" },
    { tag: 'circle', cx: 12, cy: 4, r: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 6, -4.5, 3, -1.5, 0]), 1000, { easing: EASE, origin: '12px 4px' }),
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(5deg)' }], 320, { origin: '12px 4px' }),
  },
);

/**
 * Giran los radios, NO el aro: Lucide lo dibuja abierto por abajo para que pasen las patas, y
 * girándolo ese hueco aparecería arriba. Los cinco radios están todos a radio ~10 del centro, así
 * que una vuelta entera cabe justa en el lienzo. El eje es un `circle`: girarlo no se vería.
 */
export const ferrisWheelIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
    { tag: 'path', d: "M12 2v4" },
    { tag: 'path', d: "m6.8 15-3.5 2" },
    { tag: 'path', d: "m20.7 7-3.5 2" },
    { tag: 'path', d: "M6.8 9 3.3 7" },
    { tag: 'path', d: "m20.7 17-3.5-2" },
    { tag: 'path', d: "m9 22 3-8 3 8" },
    { tag: 'path', d: "M8 22h8" },
    { tag: 'path', d: "M18 18.7a9 9 0 1 0-12 0" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1100, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1100, { easing: EASE, origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1100, { easing: EASE, origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1100, { easing: EASE, origin: '12px 12px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1100, { easing: EASE, origin: '12px 12px' }),
      },
    },
    hold: {
      // Un paso de cabina: 72°, que es lo que hay entre dos de los cinco radios.
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(72deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(72deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(72deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(72deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(72deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * No hay carrito dibujado, así que el carrito ES el trazo: la vía se dibuja de izquierda a derecha
 * y los soportes se estiran detrás, en el orden en que los va dejando atrás. Mismo truco que
 * `road` y `train-track`: animar lo que el vehículo recorre cuando el vehículo no está.
 */
export const rollerCoasterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 19V5" },
    { tag: 'path', d: "M10 19V6.8" },
    { tag: 'path', d: "M14 19v-7.8" },
    { tag: 'path', d: "M18 5v4" },
    { tag: 'path', d: "M18 19v-6" },
    { tag: 'path', d: "M22 19V9" },
    { tag: 'path', d: "M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65" },
  ],
  {
    default: {
      shapes: {
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 820, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track(CRECE_Y, 380, { easing: SPRING_OUT, delay: 140, origin: '6px 19px' }),
        1: /* @__PURE__ */ track(CRECE_Y, 380, { easing: SPRING_OUT, delay: 220, origin: '10px 19px' }),
        2: /* @__PURE__ */ track(CRECE_Y, 380, { easing: SPRING_OUT, delay: 300, origin: '14px 19px' }),
        4: /* @__PURE__ */ track(CRECE_Y, 380, { easing: SPRING_OUT, delay: 380, origin: '18px 19px' }),
        3: /* @__PURE__ */ track(CRECE_Y, 380, { easing: SPRING_OUT, delay: 380, origin: '18px 9px' }),
        5: /* @__PURE__ */ track(CRECE_Y, 380, { easing: SPRING_OUT, delay: 460, origin: '22px 19px' }),
      },
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.05)' }], 320, { origin: '12px 19px' }),
  },
);

/** El almenado se alza de izquierda a derecha, asomando del muro, y el rastrillo abre detrás. */
export const castleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 5V3" },
    { tag: 'path', d: "M14 5V3" },
    { tag: 'path', d: "M15 21v-3a3 3 0 0 0-6 0v3" },
    { tag: 'path', d: "M18 3v8" },
    { tag: 'path', d: "M18 5H6" },
    { tag: 'path', d: "M22 11H2" },
    { tag: 'path', d: "M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9" },
    { tag: 'path', d: "M6 3v8" },
  ],
  {
    default: {
      shapes: {
        7: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([1.6, 0]), 460, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([1.6, 0]), 460, { easing: SPRING_OUT, delay: 70 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([1.6, 0]), 460, { easing: SPRING_OUT, delay: 140 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([1.6, 0]), 460, { easing: SPRING_OUT, delay: 210 }),
        2: /* @__PURE__ */ track(PUERTA_ABRE, 560, { easing: EASE, delay: 300, origin: '9px 21px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.86)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '9px 21px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La cruz se traza: primero el palo, después el travesaño. Y la puerta abre. */
export const churchIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 9h4" },
    { tag: 'path', d: "M12 7v5" },
    { tag: 'path', d: "M14 21v-3a2 2 0 0 0-4 0v3" },
    {
      tag: 'path',
      d: "m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9",
    },
    {
      tag: 'path',
      d: "M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14",
    },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { easing: 'ease-out', delay: 240 }),
        2: /* @__PURE__ */ track(PUERTA_ABRE, 560, { easing: EASE, delay: 420, origin: '10px 21px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.86)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '10px 21px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La media luna se enciende sobre el minarete, la cúpula respira y la puerta abre. */
export const mosqueIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.268 2a2 2 0 003.465 2" },
    { tag: 'path', d: "M14 5 L14 8" },
    { tag: 'path', d: "M16 22v-3a2 2 0 00-4 0v3" },
    {
      tag: 'path',
      d: "M21 13c-.662-1.497-1.666-2.753-2.9-3.63C16.825 8.47 15.422 8 14 8s-2.826.47-4.1 1.37C8.668 10.248 7.663 11.504 7 13z",
    },
    { tag: 'path', d: "M3 9h4" },
    {
      tag: 'path',
      d: "M7 22V6a5 5 0 00-2-4 5 5 0 00-2 4v14a2 2 0 002 2h14a2 2 0 002-2v-7",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 520, { easing: SPRING_OUT, origin: '14px 3px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.04, 1]), 700, { easing: EASE, delay: 180, origin: '14px 13px' }),
        2: /* @__PURE__ */ track(PUERTA_ABRE, 560, { easing: EASE, delay: 380, origin: '12px 22px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.18)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '14px 3px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La cruz da DOS golpes —un pulso, no un latido— y la puerta abre después. */
export const hospitalIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 7v4" },
    { tag: 'path', d: "M14 21v-3a2 2 0 0 0-4 0v3" },
    { tag: 'path', d: "M14 9h-4" },
    {
      tag: 'path',
      d: "M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2",
    },
    { tag: 'path', d: "M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(LATIDO_DOBLE, 720, { easing: EASE, origin: '12px 9px' }),
        2: /* @__PURE__ */ track(LATIDO_DOBLE, 720, { easing: EASE, origin: '12px 9px' }),
        1: /* @__PURE__ */ track(PUERTA_ABRE, 560, { easing: EASE, delay: 380, origin: '10px 21px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.15)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 9px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.15)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 9px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se van encendiendo los cuartos, uno por uno, de arriba abajo y de izquierda a derecha. */
export const hotelIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 22v-6.57" },
    { tag: 'path', d: "M12 11h.01" },
    { tag: 'path', d: "M12 7h.01" },
    { tag: 'path', d: "M14 15.43V22" },
    { tag: 'path', d: "M15 16a5 5 0 0 0-6 0" },
    { tag: 'path', d: "M16 11h.01" },
    { tag: 'path', d: "M16 7h.01" },
    { tag: 'path', d: "M8 11h.01" },
    { tag: 'path', d: "M8 7h.01" },
    { tag: 'rect', x: 4, y: 2, width: 16, height: 20, rx: 2 },
  ],
  {
    default: {
      shapes: {
        8: /* @__PURE__ */ track(DESTELLA, 420),
        2: /* @__PURE__ */ track(DESTELLA, 420, { delay: 90 }),
        6: /* @__PURE__ */ track(DESTELLA, 420, { delay: 180 }),
        7: /* @__PURE__ */ track(DESTELLA, 420, { delay: 270 }),
        1: /* @__PURE__ */ track(DESTELLA, 420, { delay: 360 }),
        5: /* @__PURE__ */ track(DESTELLA, 420, { delay: 450 }),
      },
    },
    hold: {
      // La cama se mulle. Es lo único de este icono que no es fachada.
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.35)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 16px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Suena el timbre: el reloj da dos golpes y la puerta abre. */
export const schoolIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 21v-3a2 2 0 0 0-4 0v3" },
    { tag: 'path', d: "M18 4.933V21" },
    { tag: 'path', d: "m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6" },
    {
      tag: 'path',
      d: "m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11",
    },
    { tag: 'path', d: "M6 4.933V21" },
    { tag: 'circle', cx: 12, cy: 9, r: 2 },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track(LATIDO_DOBLE, 720, { easing: EASE, origin: '12px 9px' }),
        0: /* @__PURE__ */ track(PUERTA_ABRE, 560, { easing: EASE, delay: 360, origin: '10px 21px' }),
      },
    },
    hold: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.15)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 9px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El emblema aparece primero, las cuatro ventanas se encienden detrás y la puerta abre. */
export const universityIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 21v-3a2 2 0 0 0-4 0v3" },
    { tag: 'path', d: "M18 12h.01" },
    { tag: 'path', d: "M18 16h.01" },
    {
      tag: 'path',
      d: "M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z",
    },
    { tag: 'path', d: "M6 12h.01" },
    { tag: 'path', d: "M6 16h.01" },
    { tag: 'circle', cx: 12, cy: 10, r: 2 },
  ],
  {
    default: {
      shapes: {
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 520, { easing: SPRING_OUT, origin: '12px 10px' }),
        4: /* @__PURE__ */ track(DESTELLA, 400, { delay: 220 }),
        1: /* @__PURE__ */ track(DESTELLA, 400, { delay: 260 }),
        5: /* @__PURE__ */ track(DESTELLA, 400, { delay: 300 }),
        2: /* @__PURE__ */ track(DESTELLA, 400, { delay: 340 }),
        0: /* @__PURE__ */ track(PUERTA_ABRE, 560, { easing: EASE, delay: 420, origin: '10px 21px' }),
      },
    },
    hold: {
      shapes: {
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.18)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 10px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El toldo es lo que hace tienda: se despliega desde su barra y el mostrador abre debajo. */
export const storeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" },
    {
      tag: 'path',
      d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",
    },
    { tag: 'path', d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.08)' }, { transform: 'scaleY(0.98)' }, { transform: 'scaleY(1)' }], 820, { easing: EASE, origin: '12px 2px' }),
        0: /* @__PURE__ */ track(PUERTA_ABRE, 560, { easing: EASE, delay: 240, origin: '10px 21px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 2px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La maquinaria trepida y las ventanas laten con ella, de izquierda a derecha. */
export const factoryIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 16h.01" },
    { tag: 'path', d: "M16 16h.01" },
    {
      tag: 'path',
      d: "M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z",
    },
    { tag: 'path', d: "M8 16h.01" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.35, 0, -0.35, 0, 0.2, 0]), 620, { easing: EASE }),
      shapes: {
        3: /* @__PURE__ */ track(DESTELLA, 400),
        0: /* @__PURE__ */ track(DESTELLA, 400, { delay: 110 }),
        1: /* @__PURE__ */ track(DESTELLA, 400, { delay: 220 }),
      },
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.5px)' }], 320),
  },
);

/** Las franjas se pintan en cadena, de izquierda a derecha, y los postes se clavan al final. */
export const constructionIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 2, y: 6, width: 20, height: 8, rx: 1 },
    { tag: 'path', d: "M17 14v7" },
    { tag: 'path', d: "M7 14v7" },
    { tag: 'path', d: "M17 3v3" },
    { tag: 'path', d: "M7 3v3" },
    { tag: 'path', d: "M10 14 2.3 6.3" },
    { tag: 'path', d: "m14 6 7.7 7.7" },
    { tag: 'path', d: "m8 6 8 8" },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 140 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 280 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1, 0]), 380, { easing: SPRING_OUT, delay: 420 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1, 0]), 380, { easing: SPRING_OUT, delay: 470 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.03)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 10px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La cuelgan de su asa: sube, rebota y la tapa se separa un momento. */
export const backpackIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" },
    { tag: 'path', d: "M8 10h8" },
    { tag: 'path', d: "M8 18h8" },
    { tag: 'path', d: "M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6" },
    { tag: 'path', d: "M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" },
  ],
  {
    default: {
      // El asa ya toca el borde de arriba: el recorrido hacia AFUERA es de 1 unidad, no más.
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.8, 0.3, 0]), 760, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.7, 0]), 560, { easing: EASE, delay: 180 }),
      },
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.8px)' }], 320),
  },
);

/**
 * La maleta se posa en el carro y el carro acusa el golpe. Las ruedas son `circle`: girarlas no se
 * vería, así que se quedan donde están —que además es lo que hacen cuando cargas algo.
 */
export const baggageClaimIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2" },
    { tag: 'path', d: "M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10" },
    { tag: 'rect', width: 13, height: 8, x: 8, y: 6, rx: 1 },
    { tag: 'circle', cx: 18, cy: 20, r: 2 },
    { tag: 'circle', cx: 9, cy: 20, r: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.2, 0]), 620, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-1.2, 0]), 620, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(SUSPENSION, 480, { easing: SPRING_OUT, delay: 420 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El asa telescópica se extiende y la maleta se vuelca sobre su rueda, como cuando tiras de ella. */
export const luggageIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" },
    { tag: 'path', d: "M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" },
    { tag: 'path', d: "M10 20h4" },
    { tag: 'circle', cx: 16, cy: 20, r: 2 },
    { tag: 'circle', cx: 8, cy: 20, r: 2 },
  ],
  {
    default: {
      // El pivote es la rueda de atrás, no el centro: una maleta se vuelca sobre la rueda.
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 0]), 720, { easing: EASE, delay: 380, origin: '8px 20px' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(0.72)' }, { transform: 'scaleY(1)' }], 520, { easing: SPRING_OUT, origin: '12px 18px' }),
      },
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-4deg)' }], 320, { origin: '8px 20px' }),
  },
);


/* ── Vocabulario de la tanda de comida ──────────────────────────────────────────────────────── */

/**
 * El vapor de algo caliente: nace pegado a la superficie, sube y se deshace. Va con `opacity` a 0
 * en los dos extremos —aparece y desaparece— porque un vapor que se corta en seco se ve como un
 * parpadeo. Lo comparten `coffee` y `soup`, que es literalmente lo mismo en dos recipientes.
 */
const VAPOR = /* @__PURE__ */ [
  { transform: 'translateY(0.5px)', opacity: '0', offset: 0 },
  { transform: 'translateY(0)', opacity: '1', offset: 0.4 },
  { transform: 'translateY(-0.9px)', opacity: '0', offset: 1 },
];

/** Servir: cae desde arriba y se asienta. El margen del lienzo da 1 unidad, se usa 0.9. */
const SE_POSA = /* @__PURE__ */ moveYSeq([-0.9, 0]);

/** Colgar de un punto y balancearse: fruta en su rabito, cubierto en su mango. */
const CUELGA = /* @__PURE__ */ rotateSeq([0, -7, 4.5, -2, 0]);

/** La manzana se asienta y su rabito acusa el tirón. El pivote va donde toca el suelo. */
export const appleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6.528V3a1 1 0 0 1 1-1h0" },
    {
      tag: 'path',
      d: "M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21",
    },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.96, 1.02, 1]), 620, { easing: EASE, origin: '12px 21px' }),
        0: /* @__PURE__ */ track(CUELGA, 720, { easing: EASE, delay: 80, origin: '12px 6.5px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-7deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 6.5px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Cuelga de su rabo, arriba a la derecha, y se balancea entera. */
export const bananaIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5" },
    {
      tag: 'path',
      d: "M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z",
    },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3.5, -2.5, 1.5, 0]), 940, { easing: EASE, origin: '13px 2px' }),
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(3.5deg)' }], 320, { origin: '13px 2px' }),
  },
);

/** Sirve: la botella se inclina sobre su base y la etiqueta va con ella. */
export const bottleWineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a6 6 0 0 0 1.2 3.6l.6.8A6 6 0 0 1 17 13v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a6 6 0 0 1 1.2-3.6l.6-.8A6 6 0 0 0 10 5z",
    },
    { tag: 'path', d: "M17 13h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -11, 0]), 820, { easing: EASE, origin: '12px 22px' }),
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-11deg)' }], 320, { origin: '12px 22px' }),
  },
);

/** La copa respira y el tallo la acompaña con la mitad de recorrido. */
export const broccoliIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 13a3 3 0 0 1-2.121-5.121" },
    {
      tag: 'path',
      d: "M15.606 14.204c-3.5 1.5-5.899 4.503-8.899 7.503A1 1 0 0 1 6 22c-2 0-4-2-4-4a1 1 0 0 1 .293-.707c1.911-1.911 3.823-3.578 5.347-5.441",
    },
    { tag: 'path', d: "M16.573 14.737A4 4 0 0 1 14 11" },
    {
      tag: 'path',
      d: "M7.14 10.907a4 4 0 1 1 2.756-7.43A4 4 0 0 1 16.7 4.48a2 2 0 0 1 2.82 2.82 4 4 0 0 1 1.002 6.805A4 4 0 1 1 13 16",
    },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.05, 1]), 720, { easing: EASE, origin: '13px 9px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -2.5, 0]), 720, { easing: EASE, delay: 100, origin: '14px 14px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.05)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '13px 9px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se arranca de la tierra: primero se agitan las hojas, después sube la raíz. */
export const carrotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M15 16a1 1 0 0 0-7-7q-4 4-5.987 12.385a.5.5 0 0 0 .602.602Q11 20 15 16l-3-3",
    },
    { tag: 'path', d: "M15 9q4 4 7 0-3-4-7 0 4-4 0-7-4 3 0 7" },
    { tag: 'path', d: "m8 15-2.58-2.58" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -7, 4, 0]), 720, { easing: EASE, origin: '15px 9px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.6, 0]), 620, { easing: EASE, delay: 140 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.6, 0]), 620, { easing: EASE, delay: 140 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-7deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '15px 9px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se infla desde la banda, que es lo único que un gorro de chef puede hacer. */
export const chefHatIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z",
    },
    { tag: 'path', d: "M6 17h12" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.06)' }, { transform: 'scaleY(1)' }], 720, { easing: EASE, origin: '12px 17px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.06)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 17px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los gajos se trazan de dentro afuera y la corteza late al final. */
export const citrusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z",
    },
    { tag: 'path', d: "M19.65 15.66A8 8 0 0 1 8.35 4.34" },
    { tag: 'path', d: "m14 10-5.5 5.5" },
    { tag: 'path', d: "M14 17.85V10H6.15" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 200 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 360, { easing: 'ease-out', delay: 360 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.05)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '13px 11px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El vapor sube, columna por columna. La taza no se mueve: lo que está caliente es el café. */
export const coffeeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 2v2" },
    { tag: 'path', d: "M14 2v2" },
    {
      tag: 'path',
      d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
    },
    { tag: 'path', d: "M6 2v2" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(VAPOR, 900, { easing: EASE }),
        0: /* @__PURE__ */ track(VAPOR, 900, { easing: EASE, delay: 130 }),
        1: /* @__PURE__ */ track(VAPOR, 900, { easing: EASE, delay: 260 }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las chispas aparecen una a una, como si se hornearan. La galleta no se mueve. */
export const cookieIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" },
    { tag: 'path', d: "M8.5 8.5v.01" },
    { tag: 'path', d: "M16 15.5v.01" },
    { tag: 'path', d: "M12 12v.01" },
    { tag: 'path', d: "M11 17v.01" },
    { tag: 'path', d: "M7 14v.01" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, origin: '8.5px 8.5px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, delay: 90, origin: '12px 12px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, delay: 180, origin: '7px 14px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, delay: 270, origin: '16px 15.5px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, delay: 360, origin: '11px 17px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.04)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se destapa: la tapa se levanta con su asa y la olla se queda en el fuego. */
export const cookingPotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 12h20" },
    { tag: 'path', d: "M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" },
    { tag: 'path', d: "m4 8 16-4" },
    {
      tag: 'path',
      d: "m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.8, 0]), 720, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.8, 0]), 720, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los dos cuernos se enroscan hacia dentro, cada uno sobre su lado, y el cuerpo respira. */
export const croissantIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487",
    },
    {
      tag: 'path',
      d: "M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132",
    },
    { tag: 'path', d: "M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42" },
    { tag: 'path', d: "M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14" },
    {
      tag: 'path',
      d: "M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 0]), 720, { easing: EASE, origin: '15px 11px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 0]), 720, { easing: EASE, origin: '15px 11px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 5, 0]), 720, { easing: EASE, delay: 90, origin: '11px 15px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 5, 0]), 720, { easing: EASE, delay: 90, origin: '11px 15px' }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.05)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '9px 9px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La pajilla se agita dentro del vaso y el refresco le responde. */
export const cupSodaIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8" },
    { tag: 'path', d: "M5 8h14" },
    { tag: 'path', d: "M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0" },
    { tag: 'path', d: "m12 8 1-6h2" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -6, 4, 0]), 720, { easing: EASE, origin: '12px 8px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.4, 0]), 660, { easing: EASE, delay: 120 }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 8px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La cereza se posa encima y la crema acusa el golpe. */
export const dessertIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826",
    },
    { tag: 'path', d: "M20.804 14.869a9 9 0 0 1-17.608 0" },
    { tag: 'circle', cx: 12, cy: 4, r: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(SE_POSA, 520, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.97, 1]), 480, { easing: EASE, delay: 300, origin: '12px 13px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * La dona SÍ gira, y el agujero no: el borde del glaseado es irregular, así que la vuelta se ve;
 * el agujero es un `circle` y girarlo no se vería. Girando uno y no el otro, se lee el giro.
 */
export const donutIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3",
    },
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        /* @__PURE__ */ [
          { transform: 'rotate(0deg) translateY(0)' },
          { transform: 'rotate(12deg) translateY(-0.5px)' },
          { transform: 'rotate(0deg) translateY(0)' },
        ],
        760,
        { easing: EASE, origin: '12px 12px' },
      ),
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(12deg)' }], 320, { origin: '12px 12px' }),
  },
);

/** Se agita agarrado por el hueso, que es por donde se agarra de verdad. */
export const drumstickIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23",
    },
    {
      tag: 'path',
      d: "m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59",
    },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(CUELGA, 860, { easing: EASE, origin: '6px 18px' }),
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-7deg)' }], 320, { origin: '6px 18px' }),
  },
);

/** El agua ondea; el vaso no se mueve. Es la misma frontera que en `coffee`. */
export const glassWaterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z",
    },
    { tag: 'path', d: "M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(
          /* @__PURE__ */ [
            { transform: 'translateY(0) rotate(0deg)', offset: 0 },
            { transform: 'translateY(-1.1px) rotate(-3deg)', offset: 0.28 },
            { transform: 'translateY(1.2px) rotate(3deg)', offset: 0.6 },
            { transform: 'translateY(-0.5px) rotate(-1.2deg)', offset: 0.82 },
            { transform: 'translateY(0) rotate(0deg)', offset: 1 },
          ],
          860,
          { easing: EASE, origin: '12px 12px' },
        ),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.2px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * El racimo se llena desde el rabo hacia abajo. Son ocho `circle` y ninguno gira —no se vería—:
 * lo que hacen es APARECER, y el orden es lo que cuenta la forma del racimo.
 */
export const grapeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 5V2l-5.89 5.89" },
    { tag: 'circle', cx: 16.6, cy: 15.89, r: 3 },
    { tag: 'circle', cx: 8.11, cy: 7.4, r: 3 },
    { tag: 'circle', cx: 12.35, cy: 11.65, r: 3 },
    { tag: 'circle', cx: 13.91, cy: 5.85, r: 3 },
    { tag: 'circle', cx: 18.15, cy: 10.09, r: 3 },
    { tag: 'circle', cx: 6.56, cy: 13.2, r: 3 },
    { tag: 'circle', cx: 10.8, cy: 17.44, r: 3 },
    { tag: 'circle', cx: 5, cy: 19, r: 3 },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, origin: '13.91px 5.85px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 55, origin: '18.15px 10.09px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 110, origin: '12.35px 11.65px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 165, origin: '8.11px 7.4px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 220, origin: '16.6px 15.89px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 275, origin: '6.56px 13.2px' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 330, origin: '10.8px 17.44px' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 385, origin: '5px 19px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-8deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '16.1px 7.89px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El lazo del hueso se agita y el jamón acusa el tirón. */
export const hamIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856" },
    {
      tag: 'path',
      d: "M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288",
    },
    {
      tag: 'path',
      d: "M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025",
    },
    { tag: 'path', d: "m8.5 16.5-1-1" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 3, 0]), 820, { easing: EASE, origin: '13px 8px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.97, 1]), 620, { easing: EASE, delay: 120, origin: '8px 16px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.97, 1]), 620, { easing: EASE, delay: 120, origin: '8px 16px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '13px 8px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se arma: cae el pan de arriba y el relleno se comprime debajo. El de abajo no se mueve. */
export const hamburgerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25" },
    { tag: 'path', d: "M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2" },
    {
      tag: 'path',
      d: "M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0",
    },
    { tag: 'path', d: "m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(SE_POSA, 520, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.94, 1]), 480, { easing: EASE, delay: 260, origin: '12px 16px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.94, 1]), 480, { easing: EASE, delay: 260, origin: '12px 16px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se mece desde su punta, que es el único punto de la hoja que está sujeto. */
export const leafyGreenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22",
    },
    { tag: 'path', d: "M2 22 17 7" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -2, 1, 0]), 940, { easing: EASE, origin: '2px 22px' }),
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(3deg)' }], 320, { origin: '2px 22px' }),
  },
);

/**
 * Gira la espiral y NO el contorno: el círculo de fuera girando sería invisible, y con la espiral
 * sola el giro se lee entero. Es el mismo criterio que en `donut`, al revés.
 */
export const lollipopIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
    { tag: 'path', d: "m21 21-4.3-4.3" },
    { tag: 'path', d: "M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1100, { easing: EASE, origin: '11px 11px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(90deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 11px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Brinda: la copa se inclina sobre el pie y vuelve. */
export const martiniIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M12 12 4.207 4.207A.707.707 0 0 1 4.707 3h14.586a.707.707 0 0 1 .5 1.207z",
    },
    { tag: 'path', d: "M12 12v10" },
    { tag: 'path', d: "M7 22h10" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -6, 4, 0]), 820, { easing: EASE, origin: '12px 22px' }),
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { origin: '12px 22px' }),
  },
);

/** Se abre por el pliegue de arriba y el fondo cede un poco. */
export const paperBagIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M5.364 3.848C4 6 3 9.652 3 12.652V19a2 2 0 002 2h14a2 2 0 002-2v-5c0-2.334-1.816-4.668-2.622-7.002",
    },
    {
      tag: 'path',
      d: "M7 3h11.379a2 2 0 011.789 1.106l.723 1.447A1 1 0 0119.997 7h-8.525a2 2 0 01-1.789-1.106L8.79 4.105a2 2 0 10-3.579 1.789l2.261 4.522A5 5 0 018 12.652V21",
    },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.5, 0]), 660, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.98)' }, { transform: 'scaleY(1)' }], 660, { easing: EASE, delay: 90, origin: '12px 21px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Le van cayendo los ingredientes a la rebanada, de la punta hacia la corteza. */
export const pizzaIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m12 14-1 1" },
    { tag: 'path', d: "m13.75 18.25-1.25 1.42" },
    { tag: 'path', d: "M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12" },
    { tag: 'path', d: "M18.8 9.3a1 1 0 0 0 2.1 7.7" },
    {
      tag: 'path',
      d: "M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, origin: '11.5px 14.5px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, delay: 110, origin: '13.1px 18.9px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, delay: 220, origin: '19.8px 13.1px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 460, { easing: 'ease-out', delay: 300 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11.5px 14.5px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '13.1px 18.9px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.15)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '19.8px 13.1px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las palomitas saltan de la caja y la caja acusa el brinco. */
export const popcornIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4" },
    { tag: 'path', d: "M10 22 9 8" },
    { tag: 'path', d: "m14 22 1-14" },
    {
      tag: 'path',
      d: "M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.9, 0]), 620, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.97)' }, { transform: 'scaleY(1)' }], 520, { easing: EASE, delay: 200, origin: '12px 22px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se agita agarrada por el palo, abajo a la derecha. */
export const popsicleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z",
    },
    { tag: 'path', d: "m22 22-5.5-5.5" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4.5, 3, 0]), 820, { easing: EASE, origin: '22px 22px' }),
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-4.5deg)' }], 320, { origin: '22px 22px' }),
  },
);

/** Se remueve: las hojas se mecen en sentidos contrarios y el bol se queda quieto. */
export const saladIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M7 21h10" },
    { tag: 'path', d: "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" },
    {
      tag: 'path',
      d: "M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1",
    },
    { tag: 'path', d: "m13 12 4-4" },
    { tag: 'path', d: "M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -3, 2, 0]), 760, { easing: EASE, origin: '16px 8px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -3, 2, 0]), 760, { easing: EASE, origin: '16px 8px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, -2, 0]), 760, { easing: EASE, delay: 110, origin: '7px 10px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-3deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 8px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-3deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 8px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(3deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '7px 10px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se cierra: baja la tapa y el relleno cede. Mismo gesto que `hamburger`, otra geometría. */
export const sandwichIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777" },
    { tag: 'path', d: "M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25" },
    { tag: 'path', d: "M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9" },
    { tag: 'path', d: "m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" },
    { tag: 'rect', width: 20, height: 4, x: 2, y: 11, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-0.8, 0]), 520, { easing: SPRING_OUT }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.9)' }, { transform: 'scaleY(1)' }], 480, { easing: EASE, delay: 240, origin: '12px 15px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.3, 0]), 480, { easing: EASE, delay: 240 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Nada: la cola bate, el cuerpo la sigue y el ojo parpadea. */
export const shrimpIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 12h.01" },
    { tag: 'path', d: "M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1" },
    {
      tag: 'path',
      d: "M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8",
    },
    { tag: 'path', d: "M14 8a8.5 8.5 0 0 1 0 8" },
    { tag: 'path', d: "M16 16c2 0 4.5-4 4-6" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -10, 6, 0]), 760, { easing: EASE, origin: '13px 21px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 3, 0]), 760, { easing: EASE, delay: 90, origin: '16px 16px' }),
        0: /* @__PURE__ */ track(DESTELLA, 420, { delay: 200 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-10deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '13px 21px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El mismo vapor de `coffee`, en otro recipiente: sube de izquierda a derecha. */
export const soupIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" },
    { tag: 'path', d: "M7 21h10" },
    { tag: 'path', d: "M19.5 12 22 6" },
    {
      tag: 'path',
      d: "M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62",
    },
    {
      tag: 'path',
      d: "M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62",
    },
    {
      tag: 'path',
      d: "M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62",
    },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track(VAPOR, 900, { easing: EASE }),
        4: /* @__PURE__ */ track(VAPOR, 900, { easing: EASE, delay: 130 }),
        3: /* @__PURE__ */ track(VAPOR, 900, { easing: EASE, delay: 260 }),
      },
    },
    hold: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Brota la hoja y detrás se traza el brote. El aro se queda: girarlo no se vería. */
export const veganIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 8q6 0 6-6-6 0-6 6" },
    { tag: 'path', d: "M17.41 3.59a10 10 0 1 0 3 3" },
    { tag: 'path', d: "M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 480, { easing: SPRING_OUT, origin: '19px 5px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 560, { easing: 'ease-out', delay: 200 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.15)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '19px 5px' }),
      },
      reverseOnLeave: true,
    },
  },
);


/* ── Vocabulario de la tanda de animales y naturaleza ───────────────────────────────────────── */

/**
 * Un animal se delata por una sola parte: la cola, la antena, la oreja. `AGITA` es esa parte
 * —siempre colgando de un pivote que NO se mueve, la base donde nace— y `LADEA` es la cabeza
 * entera, que es lo único que hace un animal quieto que te está mirando.
 */
const AGITA = /* @__PURE__ */ rotateSeq([0, -10, 6, 0]);
const LADEA = /* @__PURE__ */ rotateSeq([0, 4, -2, 0]);

/** El ala: baja de golpe y sube despacio, que es como bate de verdad. */
const ALETEO = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(-14deg)', offset: 0.35 },
  { transform: 'rotate(5deg)', offset: 0.7 },
  { transform: 'rotate(0deg)', offset: 1 },
];

/** El ala bate desde el hombro y el ojo parpadea. El cuerpo no se mueve: está posado. */
export const birdIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 7h.01" },
    { tag: 'path', d: "M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" },
    { tag: 'path', d: "m20 7 2 .5-2 .5" },
    { tag: 'path', d: "M10 18v3" },
    { tag: 'path', d: "M14 17.75V21" },
    { tag: 'path', d: "M7 18a6 6 0 0 0 3.84-10.61" },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track(ALETEO, 720, { easing: EASE, origin: '11px 8px' }),
        0: /* @__PURE__ */ track(DESTELLA, 420, { delay: 180 }),
      },
    },
    hold: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-14deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 8px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Ladea la cabeza y parpadea. Un gato quieto no hace nada más, y eso ES el gato. */
export const catIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z",
    },
    { tag: 'path', d: "M8 14v.5" },
    { tag: 'path', d: "M16 14v.5" },
    { tag: 'path', d: "M11.25 16.25h1.5L12 17l-.75-.75Z" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(LADEA, 820, { easing: EASE, origin: '12px 21px' }),
      shapes: {
        1: /* @__PURE__ */ track(DESTELLA, 380, { delay: 200 }),
        2: /* @__PURE__ */ track(DESTELLA, 380, { delay: 200 }),
      },
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(4deg)' }], 320, { origin: '12px 21px' }),
  },
);

/** Levanta las orejas y después parpadea. Las orejas son lo que un perro mueve primero. */
export const dogIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11.25 16.25h1.5L12 17z" },
    { tag: 'path', d: "M16 14v.5" },
    {
      tag: 'path',
      d: "M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309",
    },
    { tag: 'path', d: "M8 14v.5" },
    {
      tag: 'path',
      d: "M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5",
    },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.09)' }, { transform: 'scaleY(1)' }], 620, { easing: SPRING_OUT, origin: '12px 11px' }),
        3: /* @__PURE__ */ track(DESTELLA, 380, { delay: 240 }),
        1: /* @__PURE__ */ track(DESTELLA, 380, { delay: 240 }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.09)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 11px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Ladea y las dos ojeras destellan por turnos: son lo único que un panda tiene de expresión. */
export const pandaIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11.25 17.25h1.5L12 18z" },
    { tag: 'path', d: "m15 12 2 2" },
    { tag: 'path', d: "M18 6.5a.5.5 0 0 0-.5-.5" },
    {
      tag: 'path',
      d: "M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83",
    },
    { tag: 'path', d: "M6 6.5a.495.495 0 0 1 .5-.5" },
    { tag: 'path', d: "m9 12-2 2" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(LADEA, 860, { easing: EASE, origin: '12px 22px' }),
      shapes: {
        5: /* @__PURE__ */ track(DESTELLA, 400, { delay: 160 }),
        1: /* @__PURE__ */ track(DESTELLA, 400, { delay: 300 }),
      },
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(4deg)' }], 320, { origin: '12px 22px' }),
  },
);

/** La cola rizada se agita desde donde nace, y el ojo parpadea después. */
export const ratIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13 22H4a2 2 0 0 1 0-4h12" },
    { tag: 'path', d: "M13.236 18a3 3 0 0 0-2.2-5" },
    { tag: 'path', d: "M16 9h.01" },
    {
      tag: 'path',
      d: "M16.82 3.94a3 3 0 1 1 3.237 4.868l1.815 2.587a1.5 1.5 0 0 1-1.5 2.1l-2.872-.453a3 3 0 0 0-3.5 3",
    },
    { tag: 'path', d: "M17 4.988a3 3 0 1 0-5.2 2.052A7 7 0 0 0 4 14.015 4 4 0 0 0 8 18" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(AGITA, 760, { easing: EASE, origin: '11px 13px' }),
        2: /* @__PURE__ */ track(DESTELLA, 380, { delay: 220 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-10deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 13px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * Camina: el caparazón sube y baja, y las patas alternan debajo. Lento a propósito —es una
 * tortuga— y con las dos patas desfasadas media zancada, que es lo que hace que se lea como paso.
 */
export const turtleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z",
    },
    { tag: 'path', d: "M4.82 7.9 8 10" },
    { tag: 'path', d: "M15.18 7.9 12 10" },
    { tag: 'path', d: "M16.93 10H20a2 2 0 0 1 0 4H2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.5, 0]), 800, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.4, 0]), 800, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.4, 0]), 800, { easing: EASE, delay: 400 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las antenas tantean por turnos y el cuerpo empuja un pelín. La concha no se mueve: pesa. */
export const snailIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0" },
    { tag: 'circle', cx: 10, cy: 13, r: 8 },
    { tag: 'path', d: "M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6" },
    { tag: 'path', d: "M18 3 19.1 5.2" },
    { tag: 'path', d: "M22 3 20.9 5.2" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -9, 5, 0]), 760, { easing: EASE, origin: '19.1px 5.2px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 9, -5, 0]), 760, { easing: EASE, delay: 130, origin: '20.9px 5.2px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.4, 0]), 900, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-9deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '19.1px 5.2px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(9deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '20.9px 5.2px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La cola se esponja desde su base, que es lo que hace ardilla a una ardilla. */
export const squirrelIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15.236 22a3 3 0 0 0-2.2-5" },
    { tag: 'path', d: "M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4" },
    { tag: 'path', d: "M18 13h.01" },
    {
      tag: 'path',
      d: "M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10",
    },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -5, 3, 0]), 760, { easing: EASE, origin: '16px 20px' }),
        2: /* @__PURE__ */ track(DESTELLA, 380, { delay: 200 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 20px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se contrae y se estira, que es como avanza un gusano. Las dos puntas llegan tarde. */
export const wormIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m19 12-1.5 3" },
    { tag: 'path', d: "M19.63 18.81 22 20" },
    {
      tag: 'path',
      d: "M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.94)' }, { transform: 'scaleX(1)' }], 820, { easing: EASE, origin: '4px 6px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.6, 0]), 820, { easing: EASE, delay: 120 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.6, 0]), 820, { easing: EASE, delay: 120 }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.94)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '4px 6px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * Una sola figura, así que no hay coreografía posible entre piezas: el gesto ES el trazo. Se
 * dibuja de fuera hacia dentro, que es como se recorre una caracola de verdad.
 */
export const shellIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 1000, { easing: 'ease-out' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.04)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se pliega: los tres paneles se trazan en el orden en que se dobla el papel. */
export const origamiIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025",
    },
    {
      tag: 'path',
      d: "m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009",
    },
    {
      tag: 'path',
      d: "m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 520, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 460, { easing: 'ease-out', delay: 260 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 400, { easing: 'ease-out', delay: 480 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se monta de arriba abajo: el techo cae, los aleros lo siguen y alguien se asoma al agujero. */
export const birdhouseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 18v4" },
    { tag: 'path', d: "m17 18 1.956-11.468" },
    { tag: 'path', d: "m3 8 7.82-5.615a2 2 0 0 1 2.36 0L21 8" },
    { tag: 'path', d: "M4 18h16" },
    { tag: 'path', d: "M7 18 5.044 6.532" },
    { tag: 'circle', cx: 12, cy: 10, r: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(SE_POSA, 520, { easing: SPRING_OUT }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-0.6, 0]), 520, { easing: SPRING_OUT, delay: 90 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-0.6, 0]), 520, { easing: SPRING_OUT, delay: 150 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 520, { easing: EASE, delay: 340, origin: '12px 10px' }),
      },
    },
    hold: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.18)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 10px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se estampa: primero la almohadilla, que es la que carga el peso, y los dedos detrás. */
export const pawPrintIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 11, cy: 4, r: 2 },
    { tag: 'circle', cx: 18, cy: 8, r: 2 },
    { tag: 'circle', cx: 20, cy: 16, r: 2 },
    {
      tag: 'path',
      d: "M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z",
    },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, origin: '9.25px 15px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 360, { easing: SPRING_OUT, delay: 140, origin: '11px 4px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 360, { easing: SPRING_OUT, delay: 210, origin: '18px 8px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 360, { easing: SPRING_OUT, delay: 280, origin: '20px 16px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '9.25px 15px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se camina: primero una huella entera —planta y dedos—, y después la otra. */
export const footprintsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
    },
    {
      tag: 'path',
      d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
    },
    { tag: 'path', d: "M16 17h4" },
    { tag: 'path', d: "M4 13h4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, origin: '6.5px 9px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 360, { easing: SPRING_OUT, delay: 90, origin: '6px 13px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, delay: 260, origin: '17.5px 13px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 360, { easing: SPRING_OUT, delay: 350, origin: '18px 17px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '17.5px 13px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '18px 17px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Flota: se mece desde el nacimiento del cañón, que es de donde colgaría si la sostuvieras. */
export const featherIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14.086 18.412A2 2 0 0112.67 19H5v-7.672a2 2 0 01.586-1.414L11.75 3.75a6 6 0 118.49 8.49z" },
    { tag: 'path', d: "M16 8 2 22" },
    { tag: 'path', d: "M17.488 15H9" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -3.5, 2.5, -1, 0]), 1000, { easing: EASE, origin: '19px 5px' }),
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-3.5deg)' }], 320, { origin: '19px 5px' }),
  },
);

/** Se abre desde el corazón del capullo y la hoja de abajo se mece después. */
export const roseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 10h-1a4 4 0 1 1 4-4v.534" },
    {
      tag: 'path',
      d: "M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31",
    },
    {
      tag: 'path',
      d: "M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2",
    },
    { tag: 'path', d: "M9.77 12C4 15 2 22 2 22" },
    { tag: 'circle', cx: 17, cy: 8, r: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([0.9, 1.02, 1]), 620, { easing: SPRING_OUT, origin: '17px 8px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([0.9, 1.02, 1]), 620, { easing: SPRING_OUT, delay: 70, origin: '17px 8px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 520, { easing: EASE, delay: 200, origin: '17px 8px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 2, 0]), 760, { easing: EASE, delay: 260, origin: '4.5px 17px' }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.15)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '17px 8px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * Late dos veces. Girarlo no serviría: las cuatro hojas son iguales, así que un cuarto de vuelta
 * deja el trébol idéntico —el mismo problema del círculo invisible, con otra simetría—.
 */
export const cloverIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16.17 7.83 2 22" },
    {
      tag: 'path',
      d: "M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12",
    },
    { tag: 'path', d: "m7.83 7.83 8.34 8.34" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(LATIDO_DOBLE, 760, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(LATIDO_DOBLE, 760, { easing: EASE, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se mece desde el tallo y el nervio se traza detrás, de la base a la punta. */
export const leafIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" },
    { tag: 'path', d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 2.5, -1.5, 0]), 860, { easing: EASE, origin: '2px 21px' }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 520, { easing: 'ease-out', delay: 140 }),
      },
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(2.5deg)' }], 320, { origin: '2px 21px' }),
  },
);

/** La mata se mece sobre el tronco, que no se mueve, y la rama la sigue con retraso. */
export const shrubIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 22v-5.172a2 2 0 0 0-.586-1.414L9.5 13.5" },
    { tag: 'path', d: "M14.5 14.5 12 17" },
    { tag: 'path', d: "M17 8.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0z" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 2.5, -1.5, 0]), 860, { easing: EASE, origin: '12px 20px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3.5, -2, 0]), 860, { easing: EASE, delay: 110, origin: '12px 17px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(2.5deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 20px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Brota: primero la hoja de abajo y después la de arriba. El suelo no se mueve. */
export const sproutIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3",
    },
    { tag: 'path', d: "M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" },
    { tag: 'path', d: "M5 21h14" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 520, { easing: SPRING_OUT, origin: '5px 13px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 520, { easing: SPRING_OUT, delay: 220, origin: '13px 13px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '13px 13px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '5px 13px' }),
      },
      reverseOnLeave: true,
    },
  },
);


/* ── Vocabulario de la tanda de herramientas ────────────────────────────────────────────────── */

/** Una herramienta que empuja: avanza y vuelve. */
const EMPUJA = /* @__PURE__ */ moveXSeq([0, 0.7, 0]);

/** El golpe de un sello: baja de golpe y se levanta. */
const GOLPEA = /* @__PURE__ */ moveYSeq([0, 0.8, 0]);

/** Sale de dentro y se asienta: una herramienta que asoma de su caja. */
const ASOMA = /* @__PURE__ */ moveYSeq([0.9, 0]);

/**
 * Taladra: la broca y el mandril avanzan mientras el cuerpo RETROCEDE. Ese contragolpe es lo que
 * lo hace un taladro y no un puntero moviéndose — la fuerza va en las dos direcciones.
 */
export const drillIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z" },
    {
      tag: 'path',
      d: "M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8",
    },
    { tag: 'path', d: "M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3" },
    { tag: 'path', d: "M18 6h4" },
    { tag: 'path', d: "m5 10-2 8" },
    { tag: 'path', d: "m7 18 2-8" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(EMPUJA, 620, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.35, 0]), 620, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.3, 0]), 620, { easing: EASE, delay: 60 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.3, 0]), 620, { easing: EASE, delay: 60 }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.35px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los dos polos se encienden por turnos: un imán no se mueve, atrae. */
export const magnetIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m12 15 4 4" },
    {
      tag: 'path',
      d: "M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z",
    },
    { tag: 'path', d: "m5 8 4 4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(DESTELLA, 420),
        0: /* @__PURE__ */ track(DESTELLA, 420, { delay: 150 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.03, 1]), 620, { easing: EASE, delay: 80, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.04)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se aprieta el bulbo y la gota sale DESPUÉS: apretar y soltar no pasan a la vez. */
export const pipetteIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12",
    },
    {
      tag: 'path',
      d: "m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z",
    },
    { tag: 'path', d: "m2 22 .414-.414" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.93, 1]), 560, { easing: EASE, origin: '18px 6px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, delay: 280, origin: '2.2px 21.8px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.93)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '18px 6px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Rocía: la boquilla se hunde y la nube sale en cadena, de cerca a lejos. */
export const sprayCanIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3h.01" },
    { tag: 'path', d: "M7 5h.01" },
    { tag: 'path', d: "M11 7h.01" },
    { tag: 'path', d: "M3 7h.01" },
    { tag: 'path', d: "M7 9h.01" },
    { tag: 'path', d: "M3 11h.01" },
    { tag: 'rect', width: 4, height: 4, x: 15, y: 5 },
    { tag: 'path', d: "m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2" },
    { tag: 'path', d: "m13 14 8-2" },
    { tag: 'path', d: "m13 19 8-2" },
  ],
  {
    default: {
      shapes: {
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.4, 0]), 520, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 120, origin: '11px 7px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 180, origin: '7px 9px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 240, origin: '7px 5px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 300, origin: '3px 11px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 360, origin: '3px 7px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 420, origin: '3px 3px' }),
      },
    },
    hold: {
      shapes: {
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.4px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Traza el arco, y las patas se abren primero: sin abrir el compás no hay radio. */
export const draftingCompassIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m12.99 6.74 1.93 3.44" },
    { tag: 'path', d: "M19.136 12a10 10 0 0 1-14.271 0" },
    { tag: 'path', d: "m21 21-2.16-3.84" },
    { tag: 'path', d: "m3 21 8.02-14.26" },
    { tag: 'circle', cx: 12, cy: 5, r: 2 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 3, 0]), 720, { easing: EASE, origin: '12px 5px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -3, 0]), 720, { easing: EASE, origin: '12px 5px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -3, 0]), 720, { easing: EASE, origin: '12px 5px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 520, { easing: 'ease-out', delay: 240 }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(3deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 5px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-3deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 5px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-3deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 5px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se despliega la hoja desde su remache, y el muelle del lomo acusa la apertura. */
export const pocketKnifeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2" },
    { tag: 'path', d: "M18 6h.01" },
    { tag: 'path', d: "M6 18h.01" },
    { tag: 'path', d: "M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z" },
    { tag: 'path', d: "M18 11.66V22a4 4 0 0 0 4-4V6" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -7, 1.5, 0]), 760, { easing: EASE, origin: '18px 6px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -7, 1.5, 0]), 760, { easing: EASE, origin: '18px 6px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.94)' }, { transform: 'scaleY(1)' }], 620, { easing: EASE, delay: 140, origin: '4px 7px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-7deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '18px 6px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-7deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '18px 6px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las herramientas asoman de la caja, una detrás de otra. La caja no se mueve. */
export const toolCaseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 15h4" },
    {
      tag: 'path',
      d: "m14.817 10.995-.971-1.45 1.034-1.232a2 2 0 0 0-2.025-3.238l-1.82.364L9.91 3.885a2 2 0 0 0-3.625.748L6.141 6.55l-1.725.426a2 2 0 0 0-.19 3.756l.657.27",
    },
    {
      tag: 'path',
      d: "m18.822 10.995 2.26-5.38a1 1 0 0 0-.557-1.318L16.954 2.9a1 1 0 0 0-1.281.533l-.924 2.122",
    },
    { tag: 'path', d: "M4 12.006A1 1 0 0 1 4.994 11H19a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(ASOMA, 520, { easing: SPRING_OUT }),
        2: /* @__PURE__ */ track(ASOMA, 520, { easing: SPRING_OUT, delay: 120 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 480, { easing: EASE, delay: 300, origin: '12px 15px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se levanta por el asa y las dos trabas laten: es lo que se toca al cargarla. */
export const toolboxIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 12v4" },
    { tag: 'path', d: "M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" },
    {
      tag: 'path',
      d: "M17 6a2 2 0 011.414.586l3 3A2 2 0 0122 11v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 01.586-1.414l3-3A2 2 0 017 6z",
    },
    { tag: 'path', d: "M2 14h20" },
    { tag: 'path', d: "M8 12v4" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.6, 0]), 620, { easing: EASE }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.1, 1]), 480, { easing: EASE, delay: 180, origin: '8px 14px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.1, 1]), 480, { easing: EASE, delay: 240, origin: '16px 14px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.6px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Tritura: las tiras salen por la boca en cadena, de izquierda a derecha. */
export const shredderIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M4 13V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5",
    },
    { tag: 'path', d: "M14 2v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M10 22v-5" },
    { tag: 'path', d: "M14 19v-2" },
    { tag: 'path', d: "M18 20v-3" },
    { tag: 'path', d: "M2 13h20" },
    { tag: 'path', d: "M6 20v-3" },
  ],
  {
    default: {
      // Todas crecen desde la boca (y=17), que es por donde salen de verdad.
      shapes: {
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(0.1)' }, { transform: 'scaleY(1)' }], 420, { easing: SPRING_OUT, origin: '6px 17px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(0.1)' }, { transform: 'scaleY(1)' }], 420, { easing: SPRING_OUT, delay: 110, origin: '10px 17px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(0.1)' }, { transform: 'scaleY(1)' }], 420, { easing: SPRING_OUT, delay: 220, origin: '14px 17px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(0.1)' }, { transform: 'scaleY(1)' }], 420, { easing: SPRING_OUT, delay: 330, origin: '18px 17px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Sella: baja de golpe y el papel de debajo acusa el impacto. */
export const stampIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13" },
    {
      tag: 'path',
      d: "M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z",
    },
    { tag: 'path', d: "M5 22h14" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(GOLPEA, 520, { easing: EASE }),
        1: /* @__PURE__ */ track(GOLPEA, 520, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.08)' }, { transform: 'scaleX(1)' }], 420, { easing: EASE, delay: 260, origin: '12px 22px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Borra: va y vuelve por su diagonal, que es la del propio dibujo. */
/**
 * La goma BORRA: dos pasadas completas de izquierda a derecha, lentas y sin frenones. Antes era un
 * temblorcito diagonal de 0.7 que no se leía como borrar nada.
 *
 * Amplitud 1.2 porque es lo que hay: el pico de la goma ya está en x≈2.2 y su base llega a 21, así
 * que con `stroke-width: 2` el trazo ocupa de 1.2 a 22 — queda una unidad por lado.
 */
const ERASER_SWEEP = /* @__PURE__ */ [
  { transform: 'translateX(0px)', offset: 0 },
  { transform: 'translateX(0.849px)', offset: 0.0625 },
  { transform: 'translateX(1.2px)', offset: 0.125 },
  { transform: 'translateX(0.849px)', offset: 0.1875 },
  { transform: 'translateX(0px)', offset: 0.25 },
  { transform: 'translateX(-0.849px)', offset: 0.3125 },
  { transform: 'translateX(-1.2px)', offset: 0.375 },
  { transform: 'translateX(-0.849px)', offset: 0.4375 },
  { transform: 'translateX(0px)', offset: 0.5 },
  { transform: 'translateX(0.849px)', offset: 0.5625 },
  { transform: 'translateX(1.2px)', offset: 0.625 },
  { transform: 'translateX(0.849px)', offset: 0.6875 },
  { transform: 'translateX(0px)', offset: 0.75 },
  { transform: 'translateX(-0.849px)', offset: 0.8125 },
  { transform: 'translateX(-1.2px)', offset: 0.875 },
  { transform: 'translateX(-0.849px)', offset: 0.9375 },
  { transform: 'translateX(0px)', offset: 1 },
];

export const eraserIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21",
    },
    { tag: 'path', d: "m5.082 11.09 8.828 8.828" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(ERASER_SWEEP, 1600, { easing: 'linear' }),
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.7px, -0.7px)' }], 320),
  },
);

/** El hilo se devana: las dos vueltas corren en sentidos opuestos, como en un carrete. */
export const spoolIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66",
    },
    {
      tag: 'path',
      d: "m7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178",
    },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.6, 0]), 760, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.6, 0]), 760, { easing: EASE, delay: 100 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.6px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-0.6px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);


/**
 * Se coloca ladeada y la trama de la gasa aparece detrás, en aspa. La tirita no se pega recta:
 * nadie la pone así.
 */
export const bandageIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 10.01h.01" },
    { tag: 'path', d: "M10 14.01h.01" },
    { tag: 'path', d: "M14 10.01h.01" },
    { tag: 'path', d: "M14 14.01h.01" },
    { tag: 'path', d: "M18 6v12" },
    { tag: 'path', d: "M6 6v12" },
    { tag: 'rect', x: 2, y: 6, width: 20, height: 12, rx: 2 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([-3, 0]), 520, { easing: SPRING_OUT, origin: '12px 12px' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 200, origin: '10px 10px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 260, origin: '14px 14px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 320, origin: '14px 10px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 380, origin: '10px 14px' }),
      },
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-3deg)' }], 320, { origin: '12px 12px' }),
  },
);

/** Las cuencas se encienden por turnos. Es lo único que se mueve en una calavera. */
export const skullIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m12.5 17-.5-1-.5 1h1z" },
    {
      tag: 'path',
      d: "M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z",
    },
    { tag: 'circle', cx: 15, cy: 12, r: 1 },
    { tag: 'circle', cx: 9, cy: 12, r: 1 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.45, 1]), 480, { easing: EASE, origin: '9px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.45, 1]), 480, { easing: EASE, delay: 180, origin: '15px 12px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.45)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '9px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.45)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '15px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * Inyecta: el émbolo baja POR EL EJE de la jeringa, que va en diagonal, y la gota sale por la
 * punta al final. Mover el émbolo en vertical lo despegaría del cuerpo.
 */
export const syringeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m18 2 4 4" },
    { tag: 'path', d: "m17 7 3-3" },
    { tag: 'path', d: "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" },
    { tag: 'path', d: "m9 11 4 4" },
    { tag: 'path', d: "m5 19-3 3" },
    { tag: 'path', d: "m14 4 6 6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.6px, 0.6px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.6px, 0.6px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.6px, 0.6px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 320, origin: '3.5px 20.5px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.6px, 0.6px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.6px, 0.6px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.6px, 0.6px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Caen las dos, una detrás de otra, y cada raya cae con SU pastilla: van pegadas. */
export const tabletsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 7, cy: 7, r: 5 },
    { tag: 'circle', cx: 17, cy: 17, r: 5 },
    { tag: 'path', d: "M12 17h10" },
    { tag: 'path', d: "m3.46 10.54 7.08-7.08" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(SE_POSA, 520, { easing: SPRING_OUT }),
        3: /* @__PURE__ */ track(SE_POSA, 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(SE_POSA, 520, { easing: SPRING_OUT, delay: 140 }),
        2: /* @__PURE__ */ track(SE_POSA, 520, { easing: SPRING_OUT, delay: 140 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Ausculta: la campana late con lo que está oyendo. Dos golpes, que es un pulso. */
export const stethoscopeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 2v2" },
    { tag: 'path', d: "M5 2v2" },
    { tag: 'path', d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" },
    { tag: 'path', d: "M8 15a6 6 0 0 0 12 0v-3" },
    { tag: 'circle', cx: 20, cy: 10, r: 2 },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(LATIDO_DOBLE, 720, { easing: EASE, origin: '20px 10px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -2, 1, 0]), 760, { easing: EASE, delay: 120, origin: '8px 15px' }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.25)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '20px 10px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Enfoca: el tubo baja hacia la platina y la muestra se ilumina cuando llega. */
export const microscopeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M6 18h8" },
    { tag: 'path', d: "M3 22h18" },
    { tag: 'path', d: "M14 22a7 7 0 1 0 0-14h-1" },
    { tag: 'path', d: "M9 14h2" },
    { tag: 'path', d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" },
    { tag: 'path', d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.5, 0]), 620, { easing: EASE }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.5, 0]), 620, { easing: EASE }),
        3: /* @__PURE__ */ track(DESTELLA, 420, { delay: 280 }),
      },
    },
    hold: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El nivel sube y baja: lo que está vivo en un vaso de precipitados es el líquido. */
export const beakerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4.5 3h15" },
    { tag: 'path', d: "M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" },
    { tag: 'path', d: "M6 14h12" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(
          /* @__PURE__ */ [
            { transform: 'translateY(0) scaleX(1)', offset: 0 },
            { transform: 'translateY(-0.7px) scaleX(1.02)', offset: 0.5 },
            { transform: 'translateY(0) scaleX(1)', offset: 1 },
          ],
          760,
          { easing: EASE, origin: '12px 14px' },
        ),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.7px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * Las órbitas NO giran, se TRAZAN. Girarlas era lo primero que pedía el icono y la medición lo
 * tumbó: son elipses cruzadas cuyas puntas quedan a 11.6 unidades del centro —más que el radio
 * del lienzo—, así que cualquier giro las saca (medido: -0.72 y 24.72 sobre una caja de 0 a 24).
 *
 * Trazarlas uno detrás de otro dice lo mismo y mejor: es el electrón recorriendo su órbita.
 */
export const atomIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
    {
      tag: 'path',
      d: "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z",
    },
    {
      tag: 'path',
      d: "M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z",
    },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 620, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 620, { easing: 'ease-out', delay: 220 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.6, 1]), 520, { easing: EASE, delay: 480, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.8)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Sonríe y parpadea: la boca se ensancha y los ojos llegan después. */
export const babyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" },
    { tag: 'path', d: "M15 12h.01" },
    {
      tag: 'path',
      d: "M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",
    },
    { tag: 'path', d: "M9 12h.01" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], 620, { easing: EASE, origin: '12px 16px' }),
        3: /* @__PURE__ */ track(DESTELLA, 380, { delay: 220 }),
        1: /* @__PURE__ */ track(DESTELLA, 380, { delay: 220 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.25)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 16px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Saluda: los brazos giran desde los hombros y la cabeza acompaña un poco. */
export const personStandingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 5, r: 1 },
    { tag: 'path', d: "m9 20 3-6 3 6" },
    { tag: 'path', d: "m6 8 6 2 6-2" },
    { tag: 'path', d: "M12 10v4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -7, 4, 0]), 760, { easing: EASE, origin: '12px 10px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -3, 2, 0]), 760, { easing: EASE, delay: 90, origin: '12px 10px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-7deg)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 10px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los cristales se encienden por turnos, de izquierda a derecha. La montura no se mueve. */
export const glassesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 6, cy: 15, r: 4 },
    { tag: 'circle', cx: 18, cy: 15, r: 4 },
    { tag: 'path', d: "M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2" },
    { tag: 'path', d: "M2.5 13 5 7c.7-1.3 1.4-2 3-2" },
    { tag: 'path', d: "M21.5 13 19 7c-.7-1.3-1.5-2-3-2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(DESTELLA, 420),
        1: /* @__PURE__ */ track(DESTELLA, 420, { delay: 160 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 520, { easing: EASE, delay: 80, origin: '12px 15px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 15px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Flota y parpadea. El borde de abajo ya está ondulado: lo que falta es que levite. */
export const ghostIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M9 10h.01" },
    { tag: 'path', d: "M15 10h.01" },
    {
      tag: 'path',
      d: "M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z",
    },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.9, 0]), 940, { easing: EASE }),
      shapes: {
        0: /* @__PURE__ */ track(DESTELLA, 420, { delay: 200 }),
        1: /* @__PURE__ */ track(DESTELLA, 420, { delay: 200 }),
      },
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 320),
  },
);


/* ── Vocabulario de la tanda de símbolos ────────────────────────────────────────────────────── */

/**
 * La flecha de Marte sale del círculo y vuelve. Punta y asta viajan JUNTAS —si el asta se queda,
 * la flecha se parte— y el recorrido es de 0.6: hacia la esquina superior derecha no hay más sitio.
 */
const SALE_FLECHA = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(0.6px, -0.6px)' },
  { transform: 'translate(0, 0)' },
];

/** La cruz de Venus se afirma hacia abajo. */
const AFIRMA_CRUZ = /* @__PURE__ */ moveYSeq([0, 0.5, 0]);

/** Un aspa de peligro: se enciende y se apaga. Va en cadena con las otras dos. */
const AVISA = /* @__PURE__ */ scaleSeq([1, 1.06, 1]);

/** La flecha sale del círculo; el círculo se queda donde está. */
export const marsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 3h5v5" },
    { tag: 'path', d: "m21 3-6.75 6.75" },
    { tag: 'circle', cx: 10, cy: 14, r: 6 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(SALE_FLECHA, 620, { easing: EASE }),
        0: /* @__PURE__ */ track(SALE_FLECHA, 620, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.6px, -0.6px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.6px, -0.6px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Lo mismo, pero el travesaño va montado en el asta: viaja con ella o se despega. */
export const marsStrokeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m14 6 4 4" },
    { tag: 'path', d: "M17 3h4v4" },
    { tag: 'path', d: "m21 3-7.75 7.75" },
    { tag: 'circle', cx: 9, cy: 15, r: 6 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(SALE_FLECHA, 620, { easing: EASE }),
        1: /* @__PURE__ */ track(SALE_FLECHA, 620, { easing: EASE }),
        0: /* @__PURE__ */ track(SALE_FLECHA, 620, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.6px, -0.6px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.6px, -0.6px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.6px, -0.6px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La cruz se afirma hacia abajo, con el travesaño pegado al asta. */
export const venusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 15v7" },
    { tag: 'path', d: "M9 19h6" },
    { tag: 'circle', cx: 12, cy: 9, r: 6 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(AFIRMA_CRUZ, 620, { easing: EASE }),
        1: /* @__PURE__ */ track(AFIRMA_CRUZ, 620, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.5px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los dos gestos del bloque en un icono: la flecha sale y la cruz se afirma, por turnos. */
export const venusAndMarsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 20h4" },
    { tag: 'path', d: "M12 16v6" },
    { tag: 'path', d: "M17 2h4v4" },
    { tag: 'path', d: "m21 2-5.46 5.46" },
    { tag: 'circle', cx: 12, cy: 11, r: 5 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(SALE_FLECHA, 620, { easing: EASE }),
        2: /* @__PURE__ */ track(SALE_FLECHA, 620, { easing: EASE }),
        1: /* @__PURE__ */ track(AFIRMA_CRUZ, 620, { easing: EASE, delay: 200 }),
        0: /* @__PURE__ */ track(AFIRMA_CRUZ, 620, { easing: EASE, delay: 200 }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.6px, -0.6px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.6px, -0.6px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los tres brazos se afirman en cadena, cada uno hacia donde apunta. */
export const transgenderIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 16v6" },
    { tag: 'path', d: "M14 20h-4" },
    { tag: 'path', d: "M18 2h4v4" },
    { tag: 'path', d: "m2 2 7.17 7.17" },
    { tag: 'path', d: "M2 5.355V2h3.357" },
    { tag: 'path', d: "m22 2-7.17 7.17" },
    { tag: 'path', d: "M8 5 5 8" },
    { tag: 'circle', cx: 12, cy: 12, r: 4 },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track(SALE_FLECHA, 560, { easing: EASE }),
        2: /* @__PURE__ */ track(SALE_FLECHA, 560, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.6px, -0.6px)' }, { transform: 'translate(0, 0)' }], 560, { easing: EASE, delay: 130 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.6px, -0.6px)' }, { transform: 'translate(0, 0)' }], 560, { easing: EASE, delay: 130 }),
        0: /* @__PURE__ */ track(AFIRMA_CRUZ, 560, { easing: EASE, delay: 260 }),
        1: /* @__PURE__ */ track(AFIRMA_CRUZ, 560, { easing: EASE, delay: 260 }),
      },
    },
    hold: {
      shapes: {
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.1)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El asta y sus dos aspas se trazan de abajo arriba; el círculo late al final. */
export const nonBinaryIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v10" },
    { tag: 'path', d: "m8.5 4 7 4" },
    { tag: 'path', d: "m8.5 8 7-4" },
    { tag: 'circle', cx: 12, cy: 17, r: 5 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 260 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 400 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 480, { easing: EASE, delay: 560, origin: '12px 17px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 17px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * Las tres aspas avisan por turnos, no a la vez. Girarlo no serviría: tiene simetría de tres, así
 * que un tercio de vuelta lo deja idéntico —el problema del círculo invisible con otra simetría—.
 */
export const biohazardIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 11.9, r: 2 },
    { tag: 'path', d: "M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6" },
    { tag: 'path', d: "m8.9 10.1 1.4.8" },
    { tag: 'path', d: "M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5" },
    { tag: 'path', d: "m15.1 10.1-1.4.8" },
    { tag: 'path', d: "M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2" },
    { tag: 'path', d: "M12 13.9v1.6" },
    { tag: 'path', d: "M13.5 5.4c-1-.2-2-.2-3 0" },
    { tag: 'path', d: "M17 16.4c.7-.7 1.2-1.6 1.5-2.5" },
    { tag: 'path', d: "M5.5 13.9c.3.9.8 1.8 1.5 2.5" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(AVISA, 420, { easing: EASE, origin: '12px 11.9px' }),
        3: /* @__PURE__ */ track(AVISA, 420, { easing: EASE, delay: 140, origin: '12px 11.9px' }),
        5: /* @__PURE__ */ track(AVISA, 420, { easing: EASE, delay: 280, origin: '12px 11.9px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 1]), 480, { easing: EASE, delay: 420, origin: '12px 11.9px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 11.9px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los tres sectores se encienden en cadena y el núcleo remata. Misma simetría, mismo criterio. */
export const radiationIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 12h.01" },
    {
      tag: 'path',
      d: "M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z",
    },
    {
      tag: 'path',
      d: "M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z",
    },
    {
      tag: 'path',
      d: "M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z",
    },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(AVISA, 420, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(AVISA, 420, { easing: EASE, delay: 140, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(AVISA, 420, { easing: EASE, delay: 280, origin: '12px 12px' }),
        0: /* @__PURE__ */ track(DESTELLA, 420, { delay: 420 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.6)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El ciclo se recorre: cada flecha se traza con su punta, una tras otra, y vuelve a empezar. */
export const recycleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5",
    },
    {
      tag: 'path',
      d: "M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12",
    },
    { tag: 'path', d: "m14 16-3 3 3 3" },
    { tag: 'path', d: "M8.293 13.596 7.196 9.5 3.1 10.598" },
    {
      tag: 'path',
      d: "m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843",
    },
    { tag: 'path', d: "m13.378 9.633 4.096 1.098 1.097-4.096" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { easing: 'ease-out', delay: 260 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 400 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { easing: 'ease-out', delay: 660 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 780 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 200, { easing: 'ease-out', delay: 1000 }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.15)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12.5px 19px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * La C se traza dentro de su aro. Y en `copyleft` se traza AL REVÉS, empezando por el otro
 * extremo: es el mismo símbolo reflejado, y el dashoffset negativo es lo que invierte la mano.
 */
export const copyrightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M14.83 14.83a4 4 0 1 1 0-5.66" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 520, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.04, 1]), 520, { easing: EASE, delay: 300, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.04)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El reflejo de `copyright`, también en el trazo: su C se escribe desde el extremo contrario. */
export const copyleftIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M9.17 14.83a4 4 0 1 0 0-5.66" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(
          /* @__PURE__ */ [
            { strokeDasharray: '1', strokeDashoffset: '-1', opacity: '0' },
            { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' },
          ],
          520,
          { easing: 'ease-out' },
        ),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.04, 1]), 520, { easing: EASE, delay: 300, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.04)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las dos C se escriben en fila, de izquierda a derecha, dentro del aro. */
export const creativeCommonsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1" },
    { tag: 'path', d: "M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out', delay: 200 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.04, 1]), 520, { easing: EASE, delay: 420, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.04)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Una sola figura: el gesto es el trazo, y termina cerrándose sobre sí mismo. */
export const crossIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z",
    },
  ],
  {
    default: {
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 760, { easing: 'ease-out' }) },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El trébol late sobre su pie, que se queda clavado: es una carta, no una planta. */
export const clubIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z",
    },
    { tag: 'path', d: "M12 17.66L12 22" },
  ],
  {
    default: {
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.06, 1, 1.04, 1]), 720, { easing: EASE, origin: '12px 17.66px' }) },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 320, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 17.66px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La pica se clava: cae sobre su punta y el pie acusa el golpe. */
export const spadeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 18v4" },
    {
      tag: 'path',
      d: "M2 14.499a5.5 5.5 0 0 0 9.591 3.675.6.6 0 0 1 .818.001A5.5 5.5 0 0 0 22 14.5c0-2.29-1.5-4-3-5.5l-5.492-5.312a2 2 0 0 0-3-.02L5 8.999c-1.5 1.5-3 3.2-3 5.5",
    },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-0.8, 0]), 520, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.8)' }, { transform: 'scaleY(1)' }], 420, { easing: EASE, delay: 260, origin: '12px 22px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.8px)' }], 320, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);


/* ── Vocabulario de la tanda de agua, aire y luz ────────────────────────────────────────────── */

/** Algo que deriva empujado por el aire. Corto: casi todo aquí toca los dos bordes. */
const DERIVA = /* @__PURE__ */ moveXSeq([0, 0.6, 0]);

/** Sube y vuelve: burbuja, sol, salvavidas. */
const ASCIENDE = /* @__PURE__ */ moveYSeq([0, -0.6, 0]);

/**
 * Las dos nubes derivan, y la de atrás la mitad. Ese desfase es TODO el gesto: moviéndolas igual
 * no hay viento, hay un icono deslizándose.
 */
export const cloudyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17.5 12a1 1 0 1 1 0 9H9.006a7 7 0 1 1 6.702-9z" },
    { tag: 'path', d: "M21.832 9A3 3 0 0 0 19 7h-2.207a5.5 5.5 0 0 0-10.72.61" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(DERIVA, 860, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.3, 0]), 860, { easing: EASE, delay: 90 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-0.9px)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60 }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La niebla pasa por delante del sol, en dos bandas desfasadas. */
export const hazeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m5.2 6.2 1.4 1.4" },
    { tag: 'path', d: "M2 13h2" },
    { tag: 'path', d: "M20 13h2" },
    { tag: 'path', d: "m17.4 7.6 1.4-1.4" },
    { tag: 'path', d: "M22 17H2" },
    { tag: 'path', d: "M22 21H2" },
    { tag: 'path', d: "M16 13a4 4 0 0 0-8 0" },
    { tag: 'path', d: "M12 5V2.5" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(DERIVA, 860, { easing: EASE }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.6, 0]), 860, { easing: EASE, delay: 140 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.04, 1]), 720, { easing: EASE, delay: 80, origin: '12px 13px' }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1.6px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-2.4px)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.3' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El agua sale por las dos compuertas; el muro no se mueve, para eso es un muro. */
export const damIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" },
    { tag: 'path', d: "M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" },
    { tag: 'path', d: "M2 10h4" },
    { tag: 'path', d: "M2 14h4" },
    { tag: 'path', d: "M2 18h4" },
    { tag: 'path', d: "M2 6h4" },
    { tag: 'path', d: "M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(DERIVA, 820, { easing: EASE }),
        1: /* @__PURE__ */ track(DERIVA, 820, { easing: EASE, delay: 160 }),
        5: /* @__PURE__ */ track(DESTELLA, 400, { delay: 60 }),
        2: /* @__PURE__ */ track(DESTELLA, 400, { delay: 140 }),
        3: /* @__PURE__ */ track(DESTELLA, 400, { delay: 220 }),
        4: /* @__PURE__ */ track(DESTELLA, 400, { delay: 300 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.7px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.7px)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 70 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.35' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.35' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.35' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.35' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las dos gotas caen, la grande primero: pesa más. */
export const dropletsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
    },
    {
      tag: 'path',
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
    },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(SE_POSA, 520, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(SE_POSA, 520, { easing: SPRING_OUT, delay: 150 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 380, { easing: SPRING_OUT, fill: 'forwards', origin: '15px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.08)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 70, origin: '7px 11px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Suben, la grande antes que la pequeña, y el brillo se enciende al final. */
export const bubblesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M7.001 15.085A1.5 1.5 0 0 1 9 16.5" },
    { tag: 'circle', cx: 18.5, cy: 8.5, r: 3.5 },
    { tag: 'circle', cx: 7.5, cy: 16.5, r: 5.5 },
    { tag: 'circle', cx: 7.5, cy: 4.5, r: 2.5 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(ASCIENDE, 820, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.5, 0]), 820, { easing: EASE, delay: 140 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.4, 0]), 820, { easing: EASE, delay: 280 }),
        0: /* @__PURE__ */ track(DESTELLA, 420, { delay: 260 }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1.5px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1.2px)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 120 }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Amanece: la flecha sube con su punta, el sol asoma detrás y los rayos se encienden. */
export const sunriseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 2v8" },
    { tag: 'path', d: "m4.93 10.93 1.41 1.41" },
    { tag: 'path', d: "M2 18h2" },
    { tag: 'path', d: "M20 18h2" },
    { tag: 'path', d: "m19.07 10.93-1.41 1.41" },
    { tag: 'path', d: "M22 22H2" },
    { tag: 'path', d: "m8 6 4-4 4 4" },
    { tag: 'path', d: "M16 18a4 4 0 0 0-8 0" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.6, 0]), 620, { easing: EASE }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.6, 0]), 620, { easing: EASE }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.4, 0]), 660, { easing: EASE, delay: 120 }),
        1: /* @__PURE__ */ track(DESTELLA, 400, { delay: 200 }),
        4: /* @__PURE__ */ track(DESTELLA, 400, { delay: 280 }),
        2: /* @__PURE__ */ track(DESTELLA, 400, { delay: 360 }),
        3: /* @__PURE__ */ track(DESTELLA, 400, { delay: 440 }),
      },
    },
    hold: {
      shapes: {
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1.4px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.14)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 18px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.14)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 18px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Anochece: exactamente lo contrario de `sunrise`, y por eso los dos van en pareja. */
export const sunsetIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 10V2" },
    { tag: 'path', d: "m4.93 10.93 1.41 1.41" },
    { tag: 'path', d: "M2 18h2" },
    { tag: 'path', d: "M20 18h2" },
    { tag: 'path', d: "m19.07 10.93-1.41 1.41" },
    { tag: 'path', d: "M22 22H2" },
    { tag: 'path', d: "m16 6-4 4-4-4" },
    { tag: 'path', d: "M16 18a4 4 0 0 0-8 0" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.6, 0]), 620, { easing: EASE }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.6, 0]), 620, { easing: EASE }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.4, 0]), 660, { easing: EASE, delay: 120 }),
        3: /* @__PURE__ */ track(DESTELLA, 400, { delay: 200 }),
        2: /* @__PURE__ */ track(DESTELLA, 400, { delay: 280 }),
        4: /* @__PURE__ */ track(DESTELLA, 400, { delay: 360 }),
        1: /* @__PURE__ */ track(DESTELLA, 400, { delay: 440 }),
      },
    },
    hold: {
      shapes: {
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.4px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.4px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.4px)' }], 380, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.25' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.25' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.25' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.25' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60 }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El foco barre desde su montura y los destellos se encienden por donde va pasando. */
export const spotlightIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15.295 19.562 16 22" },
    { tag: 'path', d: "m17 16 3.758 2.098" },
    { tag: 'path', d: "m19 12.5 3.026-.598" },
    {
      tag: 'path',
      d: "M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z",
    },
    { tag: 'path', d: "M8 9V2" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 0]), 760, { easing: EASE, origin: '8px 10px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 160, origin: '20.5px 12.2px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 260, origin: '18.9px 17px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 380, { easing: SPRING_OUT, delay: 360, origin: '15.6px 20.8px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-9deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 10px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.5)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '20.5px 12.2px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.5)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 110, origin: '18.9px 17px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.5)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 160, origin: '15.6px 20.8px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Suena: los cinco destellos giran alrededor en cadena y la luz late en el centro. */
export const sirenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M7 18v-6a5 5 0 1 1 10 0v6" },
    {
      tag: 'path',
      d: "M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z",
    },
    { tag: 'path', d: "M21 12h1" },
    { tag: 'path', d: "M18.5 4.5 18 5" },
    { tag: 'path', d: "M2 12h1" },
    { tag: 'path', d: "M12 2v1" },
    { tag: 'path', d: "m4.929 4.929.707.707" },
    { tag: 'path', d: "M12 12v6" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(DESTELLA, 360),
        6: /* @__PURE__ */ track(DESTELLA, 360, { delay: 90 }),
        5: /* @__PURE__ */ track(DESTELLA, 360, { delay: 180 }),
        3: /* @__PURE__ */ track(DESTELLA, 360, { delay: 270 }),
        2: /* @__PURE__ */ track(DESTELLA, 360, { delay: 360 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1.15)' }, { transform: 'scaleY(1)' }], 620, { easing: EASE, delay: 120, origin: '12px 18px' }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }], 380, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }], 380, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }], 380, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }], 380, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }], 380, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.3)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 18px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se descuelga la manguera y el asa cede: es el gesto de usarlo, no de mirarlo. */
export const fireExtinguisherIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5" },
    { tag: 'path', d: "M9 18h8" },
    { tag: 'path', d: "M18 3h-3" },
    { tag: 'path', d: "M11 3a6 6 0 0 0-6 6v11" },
    { tag: 'path', d: "M5 13h4" },
    { tag: 'path', d: "M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 4, -2, 0]), 760, { easing: EASE, origin: '11px 3px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.88)' }, { transform: 'scaleY(1)' }], 560, { easing: EASE, delay: 140, origin: '13px 6.5px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(7deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 3px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(0.8)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '13px 6.5px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Flota, y los cuatro cabos se encienden en cadena: el aro es un `circle`, girarlo no se vería. */
export const lifeBuoyIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m4.93 4.93 4.24 4.24" },
    { tag: 'path', d: "m14.83 9.17 4.24-4.24" },
    { tag: 'path', d: "m14.83 14.83 4.24 4.24" },
    { tag: 'path', d: "m9.17 14.83-4.24 4.24" },
    { tag: 'circle', cx: 12, cy: 12, r: 4 },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.6, 0]), 940, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(DESTELLA, 360, { delay: 80 }),
        2: /* @__PURE__ */ track(DESTELLA, 360, { delay: 180 }),
        3: /* @__PURE__ */ track(DESTELLA, 360, { delay: 280 }),
        4: /* @__PURE__ */ track(DESTELLA, 360, { delay: 380 }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1.2px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 80, origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se abre desde el mástil, que es lo único que una sombrilla sabe hacer. */
export const parasolIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12.5 11.134 18.196 21" },
    {
      tag: 'path',
      d: "M20.425 5.299a10 10 0 0 0-16.941 9.78c.183.563.843.774 1.355.478L20.16 6.711c.512-.296.66-.973.264-1.413",
    },
    { tag: 'path', d: "M21 21H3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([0.92, 1.02, 1]), 620, { easing: SPRING_OUT, origin: '12px 11px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 11px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.06)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '18.196px 21px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * Se voltea, y con un flip en Y —no con un giro—. Rotar 180 grados era lo obvio y la tira de
 * fotogramas lo tumbó: a media vuelta el icono ocupa la diagonal de su caja, 1.41 veces su ancho,
 * y en cualquier contenedor con recorte se corta. Un `scaleY(-1)` que pasa por 0.06 se lee igual
 * de bien —el reloj se pone de canto y cae del otro lado— y NUNCA sale de su cuadro.
 *
 * Ojo con esto al medir: el chequeo de lienzo mira las figuras contra el viewBox, así que una
 * animación en el ROOT se le escapa. El root no lo recorta el viewBox, lo recorta el contenedor.
 */
export const hourglassIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M5 22h14" },
    { tag: 'path', d: "M5 2h14" },
    {
      tag: 'path',
      d: "M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",
    },
    {
      tag: 'path',
      d: "M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2",
    },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(
        /* @__PURE__ */ [
          { transform: 'scaleY(1)' },
          { transform: 'scaleY(0.06)' },
          { transform: 'scaleY(-1)' },
        ],
        820,
        { easing: EASE, origin: '50% 50%' },
      ),
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(-1)' }], 480, { origin: '50% 50%' }),
  },
);

/** Cae y se asienta: pesa, así que el rebote es corto y la piedra no se deforma. */
export const stoneIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M11.264 2.205A4 4 0 0 0 6.42 4.211l-4 8a4 4 0 0 0 1.359 5.117l6 4a4 4 0 0 0 4.438 0l6-4a4 4 0 0 0 1.576-4.592l-2-6a4 4 0 0 0-2.53-2.53z",
    },
    { tag: 'path', d: "M11.99 22 14 12l7.822 3.184" },
    { tag: 'path', d: "M14 12 8.47 2.302" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-0.6, 0]), 460, { easing: SPRING_OUT }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out', delay: 280 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out', delay: 400 }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '50% 50%' }),
      reverseOnLeave: true,
    },
  },
);

/** Se mide la parcela: el banderín ondea y las dos diagonales se tienden después. */
export const landPlotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m12 8 6-3-6-3v10" },
    {
      tag: 'path',
      d: "m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12",
    },
    { tag: 'path', d: "m6.49 12.85 11.02 6.3" },
    { tag: 'path', d: "M17.51 12.85 6.5 19.15" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.82)' }, { transform: 'scaleX(1)' }], 620, { easing: EASE, origin: '12px 5px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { easing: 'ease-out', delay: 240 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { easing: 'ease-out', delay: 400 }),
      },
    },
    hold: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-5deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '50% 50%' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.72)' }], 380, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 5px' }),
      },
      reverseOnLeave: true,
    },
  },
);


/* ── Vocabulario de la tanda de geometría y medida ──────────────────────────────────────────── */

/**
 * Una figura pura no tiene partes que se muevan, así que su gesto es el trazo. Lo que se cura es
 * el ORDEN —igual que en el zodiaco—, y aquí eso significa dibujar como se dibujaría a mano: el
 * contorno antes que lo que va dentro, la base antes que lo que se apoya en ella.
 *
 * Y el `hold` NO es ese trazo congelado: es la figura DICIENDO SU MEDIDA. La elipse se redondea,
 * el cilindro se estira, la balanza se inclina, el ángulo se abre. Una figura sostenida que no
 * cambia de valor no aporta nada.
 */
const AFIRMA_FIG = /* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }];

/** El vértice antes que el arco: sin los dos lados no hay ángulo que medir. */
export const angleIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 3v16a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M3 11a10 10 0 0 1 10 10" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 480, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out', delay: 360 }),
      },
    },
    // El ángulo se abre: el arco crece desde el vértice, que es lo que mide.
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.18)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '3px 21px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Una sola figura: se traza. Sostenida, se recoge sobre sí misma. */
export const astroidIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M12.983 21.186a1 1 0 0 1-1.966 0 10 10 0 0 0-8.203-8.203 1 1 0 0 1 0-1.966 10 10 0 0 0 8.203-8.203 1 1 0 0 1 1.966 0 10 10 0 0 0 8.203 8.203 1 1 0 0 1 0 1.966 10 10 0 0 0-8.203 8.203",
    },
  ],
  {
    default: {
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 900, { easing: 'ease-out' }) },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.86)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La base antes que el cono: un cono se apoya en su elipse. Sostenido, se mira desde arriba. */
export const coneIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98" },
    { tag: 'ellipse', cx: 12, cy: 19, rx: 9, ry: 3 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 480, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 520, { easing: 'ease-out', delay: 360 }),
      },
    },
    // Bajar el punto de vista abre la elipse de la base: eso es ver el cono más desde arriba.
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.22)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 19px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El volumen antes que sus aristas internas, que son las que lo hacen sólido. */
export const cuboidIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 22v-8" },
    { tag: 'path', d: "M2.336 8.89 10 14l11.715-7.029" },
    {
      tag: 'path',
      d: "M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z",
    },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 620, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out', delay: 480 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 300, { easing: 'ease-out', delay: 760 }),
      },
    },
    // Sostenido: las aristas de dentro se marcan y el bloque se abre un punto.
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(AFIRMA_FIG, 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.8px)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.8px)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60 }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La tapa antes que el cuerpo. Sostenido: el cilindro CRECE, que es su única medida libre. */
export const cylinderIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'ellipse', cx: 12, cy: 5, rx: 9, ry: 3 },
    { tag: 'path', d: "M3 5v14a9 3 0 0 0 18 0V5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 480, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 520, { easing: 'ease-out', delay: 360 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(0.84)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 5px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los dos arcos, la cuerda que los cruza y al final los extremos que la marcan. */
export const diameterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 19, cy: 19, r: 2 },
    { tag: 'circle', cx: 5, cy: 5, r: 2 },
    { tag: 'path', d: "M6.48 3.66a10 10 0 0 1 13.86 13.86" },
    { tag: 'path', d: "m6.41 6.41 11.18 11.18" },
    { tag: 'path', d: "M3.66 6.48a10 10 0 0 0 13.86 13.86" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 460, { easing: 'ease-out' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 460, { easing: 'ease-out', delay: 180 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out', delay: 420 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { easing: SPRING_OUT, delay: 660, origin: '5px 5px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { easing: SPRING_OUT, delay: 760, origin: '19px 19px' }),
      },
    },
    // Sostenido: los dos extremos se agarran, que es lo que hace una medida.
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.4)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '5px 5px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.4)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '19px 19px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Una elipse solo tiene una medida que cambiar: su excentricidad. Sostenida, se redondea. */
export const ellipseIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [{ tag: 'ellipse', cx: 12, cy: 12, rx: 10, ry: 6 }],
  {
    default: {
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 620, { easing: 'ease-out' }) },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.6)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se traza, y sostenido gira MEDIO paso de su simetría: con un paso entero quedaría igual. */
export const hexagonIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    },
  ],
  {
    default: {
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 720, { easing: 'ease-out' }) },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(30deg)' }], 440, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Lo mismo con cinco lados: medio paso son 36 grados. */
export const pentagonIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
    },
  ],
  {
    default: {
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 720, { easing: 'ease-out' }) },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(36deg)' }], 440, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El contorno y después la arista, que es la que la levanta del plano. Sostenida, crece. */
export const pyramidIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z",
    },
    { tag: 'path', d: "M12 2v20" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 620, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out', delay: 460 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.03)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.03)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Del centro hacia afuera: centro, radio, extremo, y el arco al final. Sostenido, el radio crece. */
export const radiusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M20.34 17.52a10 10 0 1 0-2.82 2.82" },
    { tag: 'circle', cx: 19, cy: 19, r: 2 },
    { tag: 'path', d: "m13.41 13.41 4.18 4.18" },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { easing: 'ease-out', delay: 220 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 320, { easing: SPRING_OUT, delay: 440, origin: '19px 19px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 560, { easing: 'ease-out', delay: 620 }),
      },
    },
    // Sostenido: el extremo se aleja del centro y la línea llega hasta él. Eso es un radio mayor.
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.22)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.7px, 0.7px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los dos marcos se turnan, que es lo que hace una proporción: uno manda y el otro cede. */
export const ratioIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 12, height: 20, x: 6, y: 2, rx: 2 },
    { tag: 'rect', width: 20, height: 12, x: 2, y: 6, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.88)' }, { transform: 'scaleX(1)' }], 620, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.88)' }, { transform: 'scaleY(1)' }], 620, { easing: EASE, delay: 160, origin: '12px 12px' }),
      },
    },
    // Sostenido: la proporción se decide. El horizontal gana y el vertical se estrecha.
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.78)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.12)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El marco y después las divisiones. Sostenido, la división se corre: eso es reproporcionar. */
export const proportionsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 20, height: 16, x: 2, y: 4, rx: 2 },
    { tag: 'path', d: "M12 9v11" },
    { tag: 'path', d: "M2 9h13a2 2 0 0 1 2 2v9" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 520, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 460, { easing: 'ease-out', delay: 400 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 340, { easing: 'ease-out', delay: 700 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-2px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1.6px)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60 }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La flecha sale de la esquina y el marco cede: escalar es eso, y el marco lo acusa. */
export const scalingIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" },
    { tag: 'path', d: "M14 15H9v-5" },
    { tag: 'path', d: "M16 3h5v5" },
    { tag: 'path', d: "M21 3 9 15" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.6px, -0.6px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.6px, -0.6px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.9, 1]), 560, { easing: EASE, delay: 140, origin: '9px 15px' }),
      },
    },
    // Sostenido: escalado aplicado. La flecha se va a su esquina y el marco se encoge de verdad.
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.8px, -0.8px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.8px, -0.8px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.92)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '3px 21px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las dos mitades de la ese, en el orden en que se escribe. Sostenida, se separan. */
export const sectionIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 5a4 3 0 0 0-8 0c0 4 8 3 8 7a4 3 0 0 1-8 0" },
    { tag: 'path', d: "M8 19a4 3 0 0 0 8 0c0-4-8-3-8-7a4 3 0 0 1 8 0" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 520, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 520, { easing: 'ease-out', delay: 380 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.8px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60 }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las tres aparecen por tamaño, de la grande a la pequeña. Sostenidas, se reparten el lienzo. */
export const shapesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",
    },
    { tag: 'rect', x: 3, y: 14, width: 7, height: 7, rx: 1 },
    { tag: 'circle', cx: 17.5, cy: 17.5, r: 3.5 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, origin: '6.5px 17.5px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, delay: 150, origin: '12px 6.5px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, delay: 300, origin: '17.5px 17.5px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.7px, 0.7px)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 50 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.7px, 0.7px)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 100 }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La curva, la recta que la toca y los dos puntos. Sostenida, la tangente rueda sobre la curva. */
export const tangentIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 17, cy: 4, r: 2 },
    { tag: 'path', d: "M15.59 5.41 5.41 15.59" },
    { tag: 'circle', cx: 4, cy: 17, r: 2 },
    { tag: 'path', d: "M12 22s-4-9-1.5-11.5S22 12 22 12" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 620, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 420, { easing: 'ease-out', delay: 480 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { easing: SPRING_OUT, delay: 780, origin: '17px 4px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { easing: SPRING_OUT, delay: 860, origin: '4px 17px' }),
      },
    },
    // Sostenida: la recta gira sobre el punto donde toca. Es lo único que una tangente puede hacer.
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-7deg)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '10.5px 10.5px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.8px, 0.8px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.8px, -0.8px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El contorno y luego el agujero. Sostenido, el agujero se abre: es lo que hace un toro. */
export const torusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'ellipse', cx: 12, cy: 11, rx: 3, ry: 2 },
    { tag: 'ellipse', cx: 12, cy: 12.5, rx: 10, ry: 8.5 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 620, { easing: 'ease-out' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { easing: 'ease-out', delay: 480 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.7)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 11px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los cuatro nodos y después los lados que los unen. Sostenido, los nodos se agarran. */
export const vectorSquareIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M19.5 7a24 24 0 0 1 0 10" },
    { tag: 'path', d: "M4.5 7a24 24 0 0 0 0 10" },
    { tag: 'path', d: "M7 19.5a24 24 0 0 0 10 0" },
    { tag: 'path', d: "M7 4.5a24 24 0 0 1 10 0" },
    { tag: 'rect', x: 17, y: 17, width: 5, height: 5, rx: 1 },
    { tag: 'rect', x: 17, y: 2, width: 5, height: 5, rx: 1 },
    { tag: 'rect', x: 2, y: 17, width: 5, height: 5, rx: 1 },
    { tag: 'rect', x: 2, y: 2, width: 5, height: 5, rx: 1 },
  ],
  {
    default: {
      shapes: {
        7: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { easing: SPRING_OUT, origin: '4.5px 4.5px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { easing: SPRING_OUT, delay: 80, origin: '19.5px 4.5px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { easing: SPRING_OUT, delay: 160, origin: '19.5px 19.5px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { easing: SPRING_OUT, delay: 240, origin: '4.5px 19.5px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 340 }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 420 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 500 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 580 }),
      },
    },
    // Sostenido: los nodos crecen —seleccionados— y los lados se abomban al tirar de ellos.
    hold: {
      shapes: {
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '4.5px 4.5px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '19.5px 4.5px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '19.5px 19.5px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '4.5px 19.5px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La barra espaciadora: se traza, y sostenida se pulsa y se queda hundida. */
export const spaceIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [{ tag: 'path', d: "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1" }],
  {
    default: {
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 520, { easing: 'ease-out' }) },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.4px) scaleX(1.04)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 19px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El cúter corta por su diagonal. Sostenido, se queda al final del corte. */
export const sliceIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M11 16.586V19a1 1 0 0 1-1 1H2L18.37 3.63a1 1 0 1 1 3 3l-9.663 9.663a1 1 0 0 1-1.414 0L8 14",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.7px, -0.7px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-1px, 1px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La ruta se recorre nodo a nodo. Sostenida, el destino se marca y el resto se apaga. */
export const waypointsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m10.586 5.414-5.172 5.172" },
    { tag: 'path', d: "m18.586 13.414-5.172 5.172" },
    { tag: 'path', d: "M6 12h12" },
    { tag: 'circle', cx: 12, cy: 20, r: 2 },
    { tag: 'circle', cx: 12, cy: 4, r: 2 },
    { tag: 'circle', cx: 20, cy: 12, r: 2 },
    { tag: 'circle', cx: 4, cy: 12, r: 2 },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { easing: SPRING_OUT, origin: '12px 4px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { easing: 'ease-out', delay: 180 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { easing: SPRING_OUT, delay: 340, origin: '4px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 480 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { easing: SPRING_OUT, delay: 680, origin: '20px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 280, { easing: 'ease-out', delay: 820 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 300, { easing: SPRING_OUT, delay: 900, origin: '12px 20px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.5)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 20px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.4' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.4' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.4' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Un punto solo puede hacer una cosa: marcarse. Y sostenido se queda grande. */
export const dotIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [{ tag: 'circle', cx: 12, cy: 12, r: 1 }],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 3.5, 1]), 620, { easing: EASE, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(4)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se traza de esquina a esquina. Sostenida, se endereza un poco: una barra inclinada solo eso. */
export const slashIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [{ tag: 'path', d: "M22 2 2 22" }],
  {
    default: {
      shapes: { 0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 520, { easing: 'ease-out' }) },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(5deg)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);


/* ── Vocabulario de la tanda de pantalla y documento ────────────────────────────────────────── */

/*
 * En este bloque el gesto es la OPERACIÓN, y media tanda viene en pares invertidos: agrupar y
 * desagrupar, unir y partir, entrar y salir. Cuando eso pasa, el par comparte recorrido y solo
 * cambia el signo — si cada uno se inventa el suyo, dejan de leerse como opuestos. Ese recorrido
 * son 0.9 y va escrito a mano en cada sitio: una constante interpolada en el keyframe
 * (`translate(${JUNTA}px…)`) deja de ser un literal estático, y entonces Rollup ya no puede tirar
 * el módulo. Medido: el core pasó de 4.65 a 5.09 KB y el icono suelto se salió del presupuesto.
 */

/** Las esquinas de un encuadre se cierran sobre lo que enmarcan. */
const CIERRA_ESQUINA = /* @__PURE__ */ scaleSeq([1, 0.88, 1]);

/** Las dos piezas se juntan; las esquinas se cierran sobre ellas. Eso es agrupar. */
export const groupIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 7V5c0-1.1.9-2 2-2h2" },
    { tag: 'path', d: "M17 3h2c1.1 0 2 .9 2 2v2" },
    { tag: 'path', d: "M21 17v2c0 1.1-.9 2-2 2h-2" },
    { tag: 'path', d: "M7 21H5c-1.1 0-2-.9-2-2v-2" },
    { tag: 'rect', width: 7, height: 5, x: 7, y: 7, rx: 1 },
    { tag: 'rect', width: 7, height: 5, x: 10, y: 12, rx: 1 },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.9px, 0.9px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.9px, -0.9px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        0: /* @__PURE__ */ track(CIERRA_ESQUINA, 520, { easing: EASE, delay: 140, origin: '3px 3px' }),
        1: /* @__PURE__ */ track(CIERRA_ESQUINA, 520, { easing: EASE, delay: 140, origin: '21px 3px' }),
        2: /* @__PURE__ */ track(CIERRA_ESQUINA, 520, { easing: EASE, delay: 140, origin: '21px 21px' }),
        3: /* @__PURE__ */ track(CIERRA_ESQUINA, 520, { easing: EASE, delay: 140, origin: '3px 21px' }),
      },
    },
    // Sostenido: agrupado. Las piezas se quedan juntas y el marco apretado sobre ellas.
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(1.2px, 1.2px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-1.2px, -1.2px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.82)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '3px 3px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.82)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '21px 3px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.82)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '21px 21px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.82)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '3px 21px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El par exacto de `group`: las dos cajas se van cada una a su diagonal. */
export const ungroupIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 11, y: 14, width: 10, height: 7, rx: 2 },
    { tag: 'rect', x: 3, y: 3, width: 10, height: 7, rx: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.9px, -0.9px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.9px, 0.9px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-1.2px, -1.2px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(1.2px, 1.2px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las dos cajas se acercan por su diagonal y las guías de arriba se marcan. */
export const combineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" },
    { tag: 'path', d: "M19 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" },
    { tag: 'path', d: "m7 15 3 3" },
    { tag: 'path', d: "m7 21 3-3H5a2 2 0 0 1-2-2v-2" },
    { tag: 'rect', x: 14, y: 14, width: 7, height: 7, rx: 1 },
    { tag: 'rect', x: 3, y: 3, width: 7, height: 7, rx: 1 },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.9px, 0.9px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.9px, -0.9px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        0: /* @__PURE__ */ track(DESTELLA, 400, { delay: 200 }),
        1: /* @__PURE__ */ track(DESTELLA, 400, { delay: 280 }),
      },
    },
    hold: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(1.3px, 1.3px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-1.3px, -1.3px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La flecha baja por el tronco y la rama se recoge: dos caminos que pasan a ser uno. */
export const mergeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m8 6 4-4 4 4" },
    { tag: 'path', d: "M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" },
    { tag: 'path', d: "m20 22-5-5" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.8, 0]), 620, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.9px, -0.9px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE, delay: 160 }),
      },
    },
    // Sostenido: unido. La rama llega hasta el tronco y la flecha se queda dentro.
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-1.4px, -1.4px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.2px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El par de `merge`, con el signo cambiado: las dos puntas se abren hacia sus esquinas. */
export const splitIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 3h5v5" },
    { tag: 'path', d: "M8 3H3v5" },
    { tag: 'path', d: "M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" },
    { tag: 'path', d: "m15 9 6-6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.7px, -0.7px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.7px, -0.7px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.7px, -0.7px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE, delay: 120 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.9px, -0.9px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.9px, -0.9px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.9px, -0.9px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El de en medio se adelanta y los otros dos se quedan detrás, atenuados. */
export const bringToFrontIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', x: 8, y: 8, width: 8, height: 8, rx: 2 },
    { tag: 'path', d: "M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2" },
    { tag: 'path', d: "M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1]), 560, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(DESTELLA, 420, { delay: 140 }),
        2: /* @__PURE__ */ track(DESTELLA, 420, { delay: 140 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.18)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.35' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.35' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La barra sube a acoplarse al marco, que es lo que hace un dock. */
export const dockIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 8h20" },
    { tag: 'rect', width: 20, height: 16, x: 2, y: 4, rx: 2 },
    { tag: 'path', d: "M6 16h12" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.9, 0]), 620, { easing: EASE }),
        0: /* @__PURE__ */ track(DESTELLA, 420, { delay: 200 }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1.4px) scaleX(1.06)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 16px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se pulsa: la tecla retrocede por su punta y la equis se marca. */
export const deleteIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z",
    },
    { tag: 'path', d: "m12 9 6 6" },
    { tag: 'path', d: "m18 9-6 6" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.8, 0]), 560, { easing: EASE }),
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.2, 1]), 480, { easing: EASE, delay: 140, origin: '15px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.2, 1]), 480, { easing: EASE, delay: 140, origin: '15px 12px' }),
      },
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-1.2px)' }], 400),
  },
);

/** La tecla de opción se pulsa: baja y se queda hundida. */
export const optionIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M14 3h7" },
    {
      tag: 'path',
      d: "M3 3h5.28a1 1 0 0 1 .948.684l5.544 16.632a1 1 0 0 0 .949.684H21",
    },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.8, 0]), 560, { easing: EASE }),
    },
    hold: /* @__PURE__ */ held(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.3px)' }], 400),
  },
);

/** Los dos corchetes abrazan lo que hay dentro: se abren y se cierran a la vez. */
export const bracketsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3" },
    { tag: 'path', d: "M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.8, 0]), 620, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.8, 0]), 620, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-1.2px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(1.2px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Lo mismo con paréntesis, que además se PANDEAN: son curvos, así que ceden por el centro. */
export const parenthesesIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M8 21s-4-3-4-9 4-9 4-9" },
    { tag: 'path', d: "M16 3s4 3 4 9-4 9-4 9" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.3)' }, { transform: 'scaleX(1)' }], 620, { easing: EASE, origin: '8px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(1.3)' }, { transform: 'scaleX(1)' }], 620, { easing: EASE, origin: '16px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.5) translateX(-0.6px)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.5) translateX(0.6px)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los cuatro rombos laten desde el centro hacia afuera. Sostenido, se separan del núcleo. */
export const componentIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",
    },
    {
      tag: 'path',
      d: "M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z",
    },
    {
      tag: 'path',
      d: "M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z",
    },
    {
      tag: 'path',
      d: "M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",
    },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 460, { easing: EASE, origin: '12px 5.5px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 460, { easing: EASE, delay: 110, origin: '18.5px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 460, { easing: EASE, delay: 220, origin: '12px 18.5px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.15, 1]), 460, { easing: EASE, delay: 330, origin: '5.5px 12px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 50 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.9px)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 100 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-0.9px)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 150 }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El marcador se despega del álbum. Sostenido, sale del todo. */
export const albumIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'polyline', points: "11 3 11 11 14 8 17 11 17 3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.9, 0]), 620, { easing: EASE }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.6px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El diafragma se cierra: las seis hojas giran a la vez sobre el centro, como en una cámara. */
export const apertureIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: "m14.31 8 5.74 9.94" },
    { tag: 'path', d: "M9.69 8h11.48" },
    { tag: 'path', d: "m7.38 12 5.74-9.94" },
    { tag: 'path', d: "M9.69 16 3.95 6.06" },
    { tag: 'path', d: "M14.31 16H2.83" },
    { tag: 'path', d: "m16.62 12-5.74 9.94" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 10, 0]), 720, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 10, 0]), 720, { easing: EASE, origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 10, 0]), 720, { easing: EASE, origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 10, 0]), 720, { easing: EASE, origin: '12px 12px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 10, 0]), 720, { easing: EASE, origin: '12px 12px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 10, 0]), 720, { easing: EASE, origin: '12px 12px' }),
      },
    },
    // Sostenido: cerrado. El diafragma se queda girado y el aro no se mueve, porque es el cuerpo.
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(16deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(16deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(16deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(16deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(16deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(16deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La tira corre: las perforaciones se encienden en cadena, de arriba abajo y por los dos lados. */
export const filmIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'path', d: "M7 3v18" },
    { tag: 'path', d: "M3 7.5h4" },
    { tag: 'path', d: "M3 12h18" },
    { tag: 'path', d: "M3 16.5h4" },
    { tag: 'path', d: "M17 3v18" },
    { tag: 'path', d: "M17 7.5h4" },
    { tag: 'path', d: "M17 16.5h4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(DESTELLA, 380),
        6: /* @__PURE__ */ track(DESTELLA, 380, { delay: 100 }),
        4: /* @__PURE__ */ track(DESTELLA, 380, { delay: 200 }),
        7: /* @__PURE__ */ track(DESTELLA, 380, { delay: 300 }),
      },
    },
    // Sostenido: fotograma elegido. La línea de corte se marca y las perforaciones se apagan.
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(2.5)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.4' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.4' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.4' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.4' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Enfoca: las cuatro esquinas se cierran sobre el punto y el punto responde. */
export const focusIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
    { tag: 'path', d: "M3 7V5a2 2 0 0 1 2-2h2" },
    { tag: 'path', d: "M17 3h2a2 2 0 0 1 2 2v2" },
    { tag: 'path', d: "M21 17v2a2 2 0 0 1-2 2h-2" },
    { tag: 'path', d: "M7 21H5a2 2 0 0 1-2-2v-2" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(CIERRA_ESQUINA, 560, { easing: EASE, origin: '3px 3px' }),
        2: /* @__PURE__ */ track(CIERRA_ESQUINA, 560, { easing: EASE, origin: '21px 3px' }),
        3: /* @__PURE__ */ track(CIERRA_ESQUINA, 560, { easing: EASE, origin: '21px 21px' }),
        4: /* @__PURE__ */ track(CIERRA_ESQUINA, 560, { easing: EASE, origin: '3px 21px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.2, 1]), 480, { easing: EASE, delay: 180, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.78)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '3px 3px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.78)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '21px 3px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.78)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '21px 21px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.78)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '3px 21px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El vídeo crece hacia las cuatro esquinas y las esquinas le abren sitio. */
export const fullscreenIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 7V5a2 2 0 0 1 2-2h2" },
    { tag: 'path', d: "M17 3h2a2 2 0 0 1 2 2v2" },
    { tag: 'path', d: "M21 17v2a2 2 0 0 1-2 2h-2" },
    { tag: 'path', d: "M7 21H5a2 2 0 0 1-2-2v-2" },
    { tag: 'rect', width: 10, height: 8, x: 7, y: 8, rx: 1 },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.14, 1]), 620, { easing: EASE, origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.5px, -0.5px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE, delay: 100 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.5px, -0.5px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE, delay: 100 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.5px, 0.5px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE, delay: 100 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.5px, 0.5px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE, delay: 100 }),
      },
    },
    // Sostenido: a pantalla completa de verdad. El vídeo llena y las esquinas se apartan.
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.28)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.8px, -0.8px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.8px, -0.8px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.8px, 0.8px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.8px, 0.8px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las cuatro flechas salen a sus esquinas, cada una a la suya. */
export const expandIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m15 15 6 6" },
    { tag: 'path', d: "m15 9 6-6" },
    { tag: 'path', d: "M21 16v5h-5" },
    { tag: 'path', d: "M21 8V3h-5" },
    { tag: 'path', d: "M3 16v5h5" },
    { tag: 'path', d: "m3 21 6-6" },
    { tag: 'path', d: "M3 8V3h5" },
    { tag: 'path', d: "M9 9 3 3" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.5px, -0.5px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.5px, -0.5px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.5px, 0.5px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE, delay: 70 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.5px, 0.5px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE, delay: 70 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.5px, 0.5px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE, delay: 140 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.5px, 0.5px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE, delay: 140 }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.5px, -0.5px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE, delay: 210 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.5px, -0.5px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE, delay: 210 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.7px, -0.7px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.7px, -0.7px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.7px, 0.7px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.7px, 0.7px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.7px, 0.7px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.7px, 0.7px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.7px, -0.7px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.7px, -0.7px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las dos flechas se cruzan y el objetivo late: eso es cambiar de cámara. */
export const switchCameraIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" },
    { tag: 'path', d: "M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" },
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
    { tag: 'path', d: "m18 22-3-3 3-3" },
    { tag: 'path', d: "m6 2 3 3-3 3" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.9, 0]), 620, { easing: EASE }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.9, 0]), 620, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.18, 1]), 520, { easing: EASE, delay: 180, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-1.4px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(1.4px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.25)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El ojo parpadea entre sus dos párpados. Sostenido, se abre del todo y la pupila se dilata. */
export const viewIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" },
    { tag: 'path', d: "M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" },
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
    {
      tag: 'path',
      d: "M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",
    },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0.25)' }, { transform: 'scaleY(1)' }], 560, { easing: EASE, origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.6, 1]), 520, { easing: EASE, delay: 240, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(2.2)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.12)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las dos letras se marcan por turnos. Sostenido, la calidad queda puesta. */
export const hdIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 12H6" },
    { tag: 'path', d: "M10 15V9" },
    {
      tag: 'path',
      d: "M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z",
    },
    { tag: 'path', d: "M6 15V9" },
    { tag: 'rect', x: 2, y: 5, width: 20, height: 14, rx: 2 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(DESTELLA, 380),
        0: /* @__PURE__ */ track(DESTELLA, 380, { delay: 80 }),
        1: /* @__PURE__ */ track(DESTELLA, 380, { delay: 160 }),
        2: /* @__PURE__ */ track(DESTELLA, 380, { delay: 260 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Los subtítulos aparecen: primero una C y después la otra, como el texto que llega. */
export const closedCaptionIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 9.17a3 3 0 1 0 0 5.66" },
    { tag: 'path', d: "M17 9.17a3 3 0 1 0 0 5.66" },
    { tag: 'rect', x: 2, y: 5, width: 20, height: 14, rx: 2 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { easing: 'ease-out' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 380, { easing: 'ease-out', delay: 200 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.22)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '9px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.22)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '16px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La cinta gira: los dos carretes laten por turnos y la línea de abajo los une. */
export const voicemailIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 6, cy: 12, r: 4 },
    { tag: 'circle', cx: 18, cy: 12, r: 4 },
    { tag: 'line', x1: 6, x2: 18, y1: 16, y2: 16 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1]), 520, { easing: EASE, origin: '6px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.12, 1]), 520, { easing: EASE, delay: 200, origin: '18px 12px' }),
      },
    },
    // Sostenido: la cinta tensada. Los dos carretes se abren y la línea se estira entre ellos.
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.16)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '6px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.16)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '18px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.1)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 16px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La pantalla baja de su barra y el pie aparece debajo. */
export const presentationIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 3h20" },
    { tag: 'path', d: "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" },
    { tag: 'path', d: "m7 21 5-5 5 5" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(0.75)' }, { transform: 'scaleY(1)' }], 520, { easing: SPRING_OUT, origin: '12px 3px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ burst(), 420, { easing: SPRING_OUT, delay: 320, origin: '12px 21px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.12)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 3px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El periódico se lee: titular primero y después las líneas de texto. */
export const newspaperIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 18h-5" },
    { tag: 'path', d: "M18 14h-8" },
    {
      tag: 'path',
      d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",
    },
    { tag: 'rect', width: 8, height: 4, x: 10, y: 6, rx: 1 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.08, 1]), 480, { easing: EASE, origin: '14px 8px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(0.1)' }, { transform: 'scaleX(1)' }], 380, { easing: SPRING_OUT, delay: 220, origin: '18px 14px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(0.1)' }, { transform: 'scaleX(1)' }], 380, { easing: SPRING_OUT, delay: 340, origin: '15px 18px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.14)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '14px 8px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las tres barras crecen desde su punto, de arriba abajo: eso es una línea de tiempo. */
export const timelineIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 12h.01" },
    { tag: 'path', d: "M4 16h.01" },
    { tag: 'path', d: "M4 20h.01" },
    { tag: 'path', d: "M4 4h.01" },
    { tag: 'path', d: "M4 8h.01" },
    {
      tag: 'path',
      d: "M9.414 13.414a2 2 0 0 0 1.414.586H19a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 12z",
    },
    {
      tag: 'path',
      d: "M9.414 21.414a2 2 0 0 0 1.414.586H19a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 20z",
    },
    {
      tag: 'path',
      d: "M9.414 5.414A2 2 0 0 0 10.828 6H19a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 4z",
    },
  ],
  {
    default: {
      shapes: {
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(0.1)' }, { transform: 'scaleX(1)' }], 420, { easing: SPRING_OUT, origin: '8px 4px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(0.1)' }, { transform: 'scaleX(1)' }], 420, { easing: SPRING_OUT, delay: 160, origin: '8px 12px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(0.1)' }, { transform: 'scaleX(1)' }], 420, { easing: SPRING_OUT, delay: 320, origin: '8px 20px' }),
        3: /* @__PURE__ */ track(DESTELLA, 340, { delay: 60 }),
        4: /* @__PURE__ */ track(DESTELLA, 340, { delay: 160 }),
        0: /* @__PURE__ */ track(DESTELLA, 340, { delay: 260 }),
        1: /* @__PURE__ */ track(DESTELLA, 340, { delay: 360 }),
        2: /* @__PURE__ */ track(DESTELLA, 340, { delay: 460 }),
      },
    },
    // Sostenido: se elige un tramo. El de en medio se marca y los otros dos ceden.
    hold: {
      shapes: {
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.08)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 12px' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.4' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.4' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se resume: las líneas se acortan de arriba abajo y la flecha sale con lo que queda. */
export const summaryIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M15 4H7" },
    { tag: 'path', d: "m18 16 3 3-3 3" },
    { tag: 'path', d: "M3 4v13a2 2 0 0 0 2 2h16" },
    { tag: 'path', d: "M7 14h7" },
    { tag: 'path', d: "M7 9h12" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.7)' }, { transform: 'scaleX(1)' }], 560, { easing: EASE, origin: '7px 9px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0.7)' }, { transform: 'scaleX(1)' }], 560, { easing: EASE, delay: 120, origin: '7px 14px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.7, 0]), 560, { easing: EASE, delay: 280 }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.62)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '7px 9px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.62)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '7px 14px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.62)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 120, origin: '7px 4px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(1px)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 160 }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La rejilla se dibuja: primero las filas, después las columnas. Sostenida, se aprieta. */
export const sheetIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 },
    { tag: 'line', x1: 3, x2: 21, y1: 9, y2: 9 },
    { tag: 'line', x1: 3, x2: 21, y1: 15, y2: 15 },
    { tag: 'line', x1: 9, x2: 9, y1: 9, y2: 21 },
    { tag: 'line', x1: 15, x2: 15, y1: 9, y2: 21 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 140 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 300 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 440 }),
      },
    },
    // Sostenida: las columnas se juntan, que es lo que pasa al estrechar una hoja de cálculo.
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(1.4px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-1.4px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se rellena: los dos campos se llenan de izquierda a derecha y las etiquetas se marcan. */
export const formIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 14h6" },
    { tag: 'path', d: "M4 2h10" },
    { tag: 'rect', x: 4, y: 18, width: 16, height: 4, rx: 1 },
    { tag: 'rect', x: 4, y: 6, width: 16, height: 4, rx: 1 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(0.1)' }, { transform: 'scaleX(1)' }], 460, { easing: SPRING_OUT, origin: '4px 8px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(0.1)' }, { transform: 'scaleX(1)' }], 460, { easing: SPRING_OUT, delay: 220, origin: '4px 20px' }),
        1: /* @__PURE__ */ track(DESTELLA, 380, { delay: 100 }),
        0: /* @__PURE__ */ track(DESTELLA, 380, { delay: 320 }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.3)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 8px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.3)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 20px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Entra: la flecha baja con su punta y la caja la recibe. */
export const importIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 3v12" },
    { tag: 'path', d: "m8 11 4 4 4-4" },
    {
      tag: 'path',
      d: "M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.9, 0]), 620, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.9, 0]), 620, { easing: EASE }),
      },
    },
    // Sostenido: ya entró. La flecha se hunde en la caja hasta que casi solo se ve la punta.
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.6px) scaleY(0.85)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 15px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.6px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * La figura empuja su silla: los brazos van, el cuerpo responde y AL FINAL rueda.
 *
 * Los dos arcos de la rueda no son un `circle`: son dos tramos abiertos de la misma
 * circunferencia, así que girarlos SÍ se ve —es la excepción que ya usó `drone`—. Su centro está
 * medido, no supuesto: los dos arcos tienen radio 5 y sus centros caen en (9,16), a 2.05 del punto
 * medio de cada cuerda. Girando ahí, la rueda se queda dentro de su propio círculo y no toca el
 * borde del lienzo.
 */
export const accessibilityIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'circle', cx: 16, cy: 4, r: 1 },
    { tag: 'path', d: "m18 19 1-7-6 1" },
    { tag: 'path', d: "m5 8 3-3 5.5 3-2.36 3.5" },
    { tag: 'path', d: "M4.24 14.5a5 5 0 0 0 6.88 6" },
    { tag: 'path', d: "M13.76 17.5a5 5 0 0 0-6.88-6" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -6, 3, 0]), 720, { easing: EASE, origin: '8px 5px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 5, -3, 0]), 720, { easing: EASE, delay: 120, origin: '13px 13px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.3, 1]), 480, { easing: EASE, delay: 60, origin: '16px 4px' }),
        // Y entonces echa a rodar. Los dos arcos giran juntos: son la misma rueda.
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 820, { easing: EASE, delay: 300, origin: '9px 16px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 820, { easing: EASE, delay: 300, origin: '9px 16px' }),
      },
    },
    // Sostenido: ya ha rodado media vuelta y el brazo se queda echado hacia atrás.
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(140deg)' }], 520, { easing: SPRING_OUT, fill: 'forwards', origin: '9px 16px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(140deg)' }], 520, { easing: SPRING_OUT, fill: 'forwards', origin: '9px 16px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-6deg)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 5px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(5deg)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '13px 13px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El anuncio se enciende: las letras por turnos y el marco al final. */
export const adIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 13H6" },
    { tag: 'path', d: "M10 15v-4a2 2 0 0 0-4 0v4" },
    {
      tag: 'path',
      d: "M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z",
    },
    { tag: 'rect', x: 2, y: 5, width: 20, height: 14, rx: 2 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(DESTELLA, 380),
        0: /* @__PURE__ */ track(DESTELLA, 380, { delay: 90 }),
        2: /* @__PURE__ */ track(DESTELLA, 380, { delay: 180 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.03, 1]), 480, { easing: EASE, delay: 260, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.18)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.18)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.18)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);


/* ── Vocabulario de la tanda de objetos con dueño ───────────────────────────────────────────── */

/** Se vuelca para verter: sobre la base, que es lo que no se despega del suelo. */
const VUELCA = /* @__PURE__ */ rotateSeq([0, -7, 0]);

/** Se vierte y vuelve. El asa y el cuerpo van juntos: son la misma pieza de barro. */
export const amphoraIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8" },
    { tag: 'path', d: "M10 5H8a2 2 0 0 0 0 4h.68" },
    { tag: 'path', d: "M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8" },
    { tag: 'path', d: "M14 5h2a2 2 0 0 1 0 4h-.68" },
    { tag: 'path', d: "M18 22H6" },
    { tag: 'path', d: "M9 2h6" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(VUELCA, 760, { easing: EASE, origin: '12px 22px' }),
        1: /* @__PURE__ */ track(VUELCA, 760, { easing: EASE, origin: '12px 22px' }),
        2: /* @__PURE__ */ track(VUELCA, 760, { easing: EASE, origin: '12px 22px' }),
        3: /* @__PURE__ */ track(VUELCA, 760, { easing: EASE, origin: '12px 22px' }),
        5: /* @__PURE__ */ track(VUELCA, 760, { easing: EASE, origin: '12px 22px' }),
      },
    },
    // Sostenida: vertiendo. Se queda volcada; la base no, que sigue en el suelo.
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-10deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-10deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-10deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-10deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-10deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 22px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se asienta bajo su peso y los dos aros ceden con él: un barril lleno pesa. */
export const barrelIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 3a41 41 0 000 18" },
    { tag: 'path', d: "M14 3a41 41 0 010 18" },
    {
      tag: 'path',
      d: "M16.997 21a2 2 0 001.68-.92 15.25 15.25 0 000-16.16 2 2 0 00-1.68-.92h-10a2 2 0 00-1.681.92 15.25 15.25 0 000 16.16 2 2 0 001.681.92z",
    },
    { tag: 'path', d: "M3.54 16h16.914" },
    { tag: 'path', d: "M3.54 8h16.914" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.03, 1]), 620, { easing: EASE, origin: '12px 21px' }),
        4: /* @__PURE__ */ track(DESTELLA, 400, { delay: 140 }),
        3: /* @__PURE__ */ track(DESTELLA, 400, { delay: 240 }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.9px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.02, 0.97)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 21px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El contenedor cae en su sitio y las aristas se trazan detrás: se apila. */
export const containerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z",
    },
    { tag: 'path', d: "M10 21.9V14L2.1 9.1" },
    { tag: 'path', d: "m10 14 11.9-6.9" },
    { tag: 'path', d: "M14 19.8v-8.1" },
    { tag: 'path', d: "M18 17.5V9.4" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(SE_POSA, 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 320 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 320, { easing: 'ease-out', delay: 440 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 560 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 260, { easing: 'ease-out', delay: 660 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1.2px)' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * La rueda de la caja fuerte gira, y giran los RADIOS, no los tornillos: los cuatro puntos son
 * `circle` y girarlos no se vería. El centro también es un círculo, así que se queda.
 */
export const vaultIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 18, height: 18, x: 3, y: 3, rx: 2 },
    { tag: 'circle', cx: 7.5, cy: 7.5, r: 0.5, fill: "currentColor" },
    { tag: 'path', d: "m7.9 7.9 2.7 2.7" },
    { tag: 'circle', cx: 16.5, cy: 7.5, r: 0.5, fill: "currentColor" },
    { tag: 'path', d: "m13.4 10.6 2.7-2.7" },
    { tag: 'circle', cx: 7.5, cy: 16.5, r: 0.5, fill: "currentColor" },
    { tag: 'path', d: "m7.9 16.1 2.7-2.7" },
    { tag: 'circle', cx: 16.5, cy: 16.5, r: 0.5, fill: "currentColor" },
    { tag: 'path', d: "m13.4 13.4 2.7 2.7" },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 90]), 820, { easing: EASE, origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 90]), 820, { easing: EASE, origin: '12px 12px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 90]), 820, { easing: EASE, origin: '12px 12px' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 90]), 820, { easing: EASE, origin: '12px 12px' }),
      },
    },
    // Sostenido: cerrada. Los radios se quedan a 45°, entre dos tornillos.
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(45deg)' }], 460, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(45deg)' }], 460, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(45deg)' }], 460, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        8: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(45deg)' }], 460, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        9: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Sube la bandera: hay correo. Es lo único que se mueve en un buzón, y por eso va sola. */
export const mailboxIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" },
    { tag: 'polyline', points: "15,9 18,9 18,11" },
    { tag: 'path', d: "M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2" },
    { tag: 'line', x1: 6, x2: 7, y1: 10, y2: 10 },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, -0.9, 0]), 620, { easing: SPRING_OUT }),
        3: /* @__PURE__ */ track(DESTELLA, 400, { delay: 220 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-1.8px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se llena: la hucha engorda un poco y el ojo se aviva. Sostenida, se queda llena. */
export const piggyBankIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z",
    },
    { tag: 'path', d: "M16 10h.01" },
    { tag: 'path', d: "M2 8v1a2 2 0 0 0 2 2h1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.04, 1]), 620, { easing: EASE, origin: '13px 20px' }),
        1: /* @__PURE__ */ track(DESTELLA, 400, { delay: 180 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.5, 0]), 560, { easing: EASE, delay: 100 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '13px 20px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se cuelga del asa: el asa se estira y el bolso queda colgando de ella. */
export const handbagIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z",
    },
    { tag: 'path', d: "M8 11V6a4 4 0 0 1 8 0v5" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(0.8)' }, { transform: 'scaleY(1)' }], 520, { easing: SPRING_OUT, origin: '12px 11px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.5, 0]), 560, { easing: EASE, delay: 120 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.1)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 11px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(0.8px)' }], 420, { easing: SPRING_OUT, fill: 'forwards', delay: 60 }),
      },
      reverseOnLeave: true,
    },
  },
);

/** La moneda de delante cae sobre el montón. Sostenido, se apilan del todo. */
export const coinsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M13.744 17.736a6 6 0 1 1-7.48-7.48" },
    { tag: 'path', d: "M15 6h1v4" },
    { tag: 'path', d: "m6.134 14.768.866-.5 2 3.464" },
    { tag: 'circle', cx: 16, cy: 8, r: 6 },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(SE_POSA, 520, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(SE_POSA, 520, { easing: SPRING_OUT }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.06, 1]), 480, { easing: EASE, delay: 260, origin: '10px 14px' }),
        2: /* @__PURE__ */ track(DESTELLA, 400, { delay: 300 }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.9px, 0.9px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.9px, 0.9px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Destella por sus facetas, de arriba abajo. Sostenida, se queda encendida. */
export const gemIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10.5 3 8 9l4 13 4-13-2.5-6" },
    {
      tag: 'path',
      d: "M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z",
    },
    { tag: 'path', d: "M2 9h20" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(DESTELLA, 400),
        0: /* @__PURE__ */ track(DESTELLA, 400, { delay: 140 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.05, 1]), 560, { easing: EASE, delay: 220, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.05)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(1.05)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 9px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se ata: el lazo se aprieta y las dos colas caen. */
export const ribbonIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22" },
    { tag: 'path', d: "m12 18 2.57-3.5" },
    { tag: 'path', d: "M6.243 9.016a7 7 0 0 1 11.507-.009" },
    { tag: 'path', d: "M9.35 14.53 12 11.22" },
    {
      tag: 'path',
      d: "M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z",
    },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.9, 1]), 560, { easing: EASE, origin: '12px 9px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.03, 1]), 620, { easing: EASE, delay: 120, origin: '12px 7px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(0.84)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 9px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.04)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 7px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se despega por su esquina doblada, y la cara de dentro sonríe. */
export const stickerIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z",
    },
    { tag: 'path', d: "M15 3v5a1 1 0 0 0 1 1h5" },
    { tag: 'path', d: "M8 13h.01" },
    { tag: 'path', d: "M16 13h.01" },
    { tag: 'path', d: "M10 16s.8 1 2 1c1.3 0 2-1 2-1" },
  ],
  {
    default: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.14, 1]), 560, { easing: EASE, origin: '21px 3px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.2, 1]), 480, { easing: EASE, delay: 200, origin: '12px 16px' }),
        2: /* @__PURE__ */ track(DESTELLA, 380, { delay: 260 }),
        3: /* @__PURE__ */ track(DESTELLA, 380, { delay: 260 }),
      },
    },
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.2)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '21px 3px' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.3)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 16px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El muestrario se abre en abanico: la muestra de fuera gira sobre la pila. */
export const swatchBookIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z" },
    { tag: 'path', d: "M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7" },
    { tag: 'path', d: "M 7 17h.01" },
    {
      tag: 'path',
      d: "m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8",
    },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -6, 0]), 720, { easing: EASE, origin: '11px 17px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -3, 0]), 720, { easing: EASE, delay: 100, origin: '11px 17px' }),
        2: /* @__PURE__ */ track(DESTELLA, 400, { delay: 240 }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-9deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '11px 17px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-4.5deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '11px 17px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/**
 * Las agujas dan la vuelta a la esfera. Aquí sí gira: las agujas son un trazo con dirección, no
 * un `circle` — la esfera, que sí lo es, se queda quieta.
 */
export const watchIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 10v2.2l1.6 1" },
    {
      tag: 'path',
      d: "m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05",
    },
    {
      tag: 'path',
      d: "m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05",
    },
    { tag: 'circle', cx: 12, cy: 12, r: 6 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 360]), 1100, { easing: EASE, origin: '12px 12px' }),
      },
    },
    // Sostenido: marca otra hora. Un reloj parado en la misma hora no está andando.
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(120deg)' }], 480, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se teclea: las teclas se encienden en cadena y la pantalla da el resultado. */
export const calculatorIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'rect', width: 16, height: 20, x: 4, y: 2, rx: 2 },
    { tag: 'line', x1: 8, x2: 16, y1: 6, y2: 6 },
    { tag: 'line', x1: 16, x2: 16, y1: 14, y2: 18 },
    { tag: 'path', d: "M16 10h.01" },
    { tag: 'path', d: "M12 10h.01" },
    { tag: 'path', d: "M8 10h.01" },
    { tag: 'path', d: "M12 14h.01" },
    { tag: 'path', d: "M8 14h.01" },
    { tag: 'path', d: "M12 18h.01" },
    { tag: 'path', d: "M8 18h.01" },
  ],
  {
    default: {
      shapes: {
        5: /* @__PURE__ */ track(DESTELLA, 340),
        4: /* @__PURE__ */ track(DESTELLA, 340, { delay: 90 }),
        7: /* @__PURE__ */ track(DESTELLA, 340, { delay: 180 }),
        6: /* @__PURE__ */ track(DESTELLA, 340, { delay: 270 }),
        2: /* @__PURE__ */ track(DESTELLA, 340, { delay: 360 }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleX(0.2)' }, { transform: 'scaleX(1)' }], 420, { easing: SPRING_OUT, delay: 480, origin: '8px 6px' }),
      },
    },
    // Sostenido: el resultado en pantalla. La línea del visor se marca y las teclas se apagan.
    hold: {
      shapes: {
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(2.5)' }], 400, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 6px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.4' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.4' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.4' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ opacity: '1' }, { opacity: '0.4' }], 400, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se llama: el pulsador baja y la campana suena debajo. */
export const conciergeBellIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z" },
    { tag: 'path', d: "M20 16a8 8 0 1 0-16 0" },
    { tag: 'path', d: "M12 4v4" },
    { tag: 'path', d: "M10 4h4" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.8, 0]), 480, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0, 0.8, 0]), 480, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.05, 1]), 560, { easing: EASE, delay: 200, origin: '12px 16px' }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.6px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(1.6px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.06)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '12px 16px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se enfocan: los dos tubos se acercan y las tapas los siguen. */
export const binocularsIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 10h4" },
    { tag: 'path', d: "M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" },
    {
      tag: 'path',
      d: "M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z",
    },
    { tag: 'path', d: "M 22 16 L 2 16" },
    {
      tag: 'path',
      d: "M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z",
    },
    { tag: 'path', d: "M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.6, 0]), 620, { easing: EASE }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.6, 0]), 620, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.6, 0]), 620, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.6, 0]), 620, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 0.8, 1]), 620, { easing: EASE, origin: '12px 10px' }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.9px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-0.9px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-0.9px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleX(0.7)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 10px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se dispara: la flecha sale por su diagonal y el arco se destensa detrás. */
export const bowArrowIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M17 3h4v4" },
    {
      tag: 'path',
      d: "M18.575 11.082a13 13 0 0 1 1.048 9.027 1.17 1.17 0 0 1-1.914.597L14 17",
    },
    {
      tag: 'path',
      d: "M7 10 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05",
    },
    {
      tag: 'path',
      d: "M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z",
    },
    { tag: 'path', d: "M9.707 14.293 21 3" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.6px, -0.6px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.6px, -0.6px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.5px, 0.5px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE, delay: 90 }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.8px, -0.8px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.8px, -0.8px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.8px, 0.8px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las dos máscaras se ladean en sentidos contrarios: comedia y tragedia nunca están de acuerdo. */
export const dramaIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M10 11h.01" },
    { tag: 'path', d: "M14 6h.01" },
    { tag: 'path', d: "M18 6h.01" },
    { tag: 'path', d: "M6.5 13.1h.01" },
    { tag: 'path', d: "M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3" },
    { tag: 'path', d: "M17.4 9.9c-.8.8-2 .8-2.8 0" },
    {
      tag: 'path',
      d: "M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7",
    },
    { tag: 'path', d: "M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4" },
  ],
  {
    default: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 4, 0]), 720, { easing: EASE, origin: '16px 17px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 4, 0]), 720, { easing: EASE, origin: '16px 17px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 0]), 720, { easing: EASE, delay: 120, origin: '8px 21px' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 0]), 720, { easing: EASE, delay: 120, origin: '8px 21px' }),
      },
    },
    hold: {
      shapes: {
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(4deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 17px' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(4deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 17px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(4deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 17px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(4deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '16px 17px' }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-4deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 21px' }),
        7: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-4deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 21px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-4deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 21px' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-4deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '8px 21px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se abre el telón: las dos mitades a sus lados y los asientos esperando. */
export const theaterIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M2 10s3-3 3-8" },
    { tag: 'path', d: "M22 10s-3-3-3-8" },
    { tag: 'path', d: "M10 2c0 4.4-3.6 8-8 8" },
    { tag: 'path', d: "M14 2c0 4.4 3.6 8 8 8" },
    { tag: 'path', d: "M2 10s2 2 2 5" },
    { tag: 'path', d: "M22 10s-2 2-2 5" },
    { tag: 'path', d: "M8 15h8" },
    { tag: 'path', d: "M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" },
    { tag: 'path', d: "M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.7, 0]), 620, { easing: EASE }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.7, 0]), 620, { easing: EASE }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, -0.7, 0]), 620, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.7, 0]), 620, { easing: EASE }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.7, 0]), 620, { easing: EASE }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ moveXSeq([0, 0.7, 0]), 620, { easing: EASE }),
        6: /* @__PURE__ */ track(DESTELLA, 420, { delay: 240 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-0.7px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-0.7px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(-0.7px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.7px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.7px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateX(0.7px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se ladea al ponérsela, y las dos plumas de los lados se agitan con el movimiento. */
export const venetianMaskIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M18 11c-1.5 0-2.5.5-3 2" },
    {
      tag: 'path',
      d: "M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z",
    },
    { tag: 'path', d: "M6 11c1.5 0 2.5.5 3 2" },
  ],
  {
    default: {
      root: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 2, 0]), 760, { easing: EASE, origin: '50% 50%' }),
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, 8, -4, 0]), 720, { easing: EASE, delay: 120, origin: '15px 13px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -8, 4, 0]), 720, { easing: EASE, delay: 120, origin: '9px 13px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(12deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '15px 13px' }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-12deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '9px 13px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El atril se inclina hacia quien lee, que es para lo que sirve un atril. */
export const lecternIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    {
      tag: 'path',
      d: "M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3",
    },
    { tag: 'path', d: "M18 6V3a1 1 0 0 0-1-1h-3" },
    { tag: 'rect', width: 8, height: 12, x: 8, y: 10, rx: 1 },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 0]), 720, { easing: EASE, origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ rotateSeq([0, -4, 0]), 720, { easing: EASE, origin: '12px 12px' }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-7deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'rotate(-7deg)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 12px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** El cajón del medio sube al primer puesto y el micro lo acompaña. */
export const podiumIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M12 6V2h-1" },
    {
      tag: 'path',
      d: "M9 15a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1",
    },
    { tag: 'path', d: "M9 21V11a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10" },
  ],
  {
    default: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'scaleY(0.88)' }, { transform: 'scaleY(1)' }], 520, { easing: SPRING_OUT, origin: '12px 21px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([0.8, 0]), 520, { easing: SPRING_OUT }),
      },
    },
    hold: {
      shapes: {
        2: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scaleY(1.08)' }], 420, { easing: SPRING_OUT, fill: 'forwards', origin: '12px 21px' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Las dos manos se aprietan: cada una avanza hacia la otra y el trato queda hecho. */
export const handshakeIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m11 17 2 2a1 1 0 1 0 3-3" },
    {
      tag: 'path',
      d: "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
    },
    { tag: 'path', d: "m21 3 1 11h-2" },
    { tag: 'path', d: "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" },
    { tag: 'path', d: "M3 4h8" },
  ],
  {
    default: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(0.6px, -0.6px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'translate(0, 0)' }, { transform: 'translate(-0.6px, 0.6px)' }, { transform: 'translate(0, 0)' }], 620, { easing: EASE }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ scaleSeq([1, 1.1, 1]), 520, { easing: EASE, delay: 200, origin: '13px 18px' }),
      },
    },
    hold: {
      shapes: {
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(0.9px, -0.9px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translate(-0.9px, 0.9px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'scale(1.15)' }], 400, { easing: SPRING_OUT, fill: 'forwards', delay: 60, origin: '13px 18px' }),
      },
      reverseOnLeave: true,
    },
  },
);

/** Se planta poste a poste, de izquierda a derecha, y los travesaños detrás de cada par. */
export const fenceIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" },
    { tag: 'path', d: "M6 8h4" },
    { tag: 'path', d: "M6 18h4" },
    { tag: 'path', d: "m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" },
    { tag: 'path', d: "M14 8h4" },
    { tag: 'path', d: "M14 18h4" },
    { tag: 'path', d: "m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-0.8, 0]), 420, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 200 }),
        2: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 260 }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-0.8, 0]), 420, { easing: SPRING_OUT, delay: 340 }),
        4: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 540 }),
        5: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 240, { easing: 'ease-out', delay: 600 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ moveYSeq([-0.8, 0]), 420, { easing: SPRING_OUT, delay: 680 }),
      },
    },
    hold: {
      shapes: {
        0: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 420, { easing: SPRING_OUT, fill: 'forwards' }),
        3: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 420, { easing: SPRING_OUT, fill: 'forwards', delay: 60 }),
        6: /* @__PURE__ */ track(/* @__PURE__ */ [{ transform: 'none' }, { transform: 'translateY(-0.9px)' }], 420, { easing: SPRING_OUT, fill: 'forwards', delay: 120 }),
      },
      reverseOnLeave: true,
    },
  },
);

export const CURATED_ICONS: Record<string, AnimatedIconDef> = {
  'alarm-smoke': alarmSmokeIcon,
  'app-window-mac': appWindowMacIcon,
  'archive-restore': archiveRestoreIcon,
  'audio-lines': audioLinesIcon,
  'audio-waveform': audioWaveformIcon,
  'banknote-arrow-down': banknoteArrowDownIcon,
  'banknote-arrow-up': banknoteArrowUpIcon,
  'banknote-x': banknoteXIcon,
  'battery-plus': batteryPlusIcon,
  'bean': beanIcon,
  'beef': beefIcon,
  'beer': beerIcon,
  'bell-electric': bellElectricIcon,
  'bluetooth': bluetoothIcon,
  'bluetooth-connected': bluetoothConnectedIcon,
  'bluetooth-searching': bluetoothSearchingIcon,
  'bone-fracture': boneFractureIcon,
  'book-alert': bookAlertIcon,
  'book-copy': bookCopyIcon,
  'book-search': bookSearchIcon,
  'bot': botIcon,
  'bot-message-square': botMessageSquareIcon,
  'brain': brainIcon,
  'brain-circuit': brainCircuitIcon,
  'briefcase-conveyor-belt': briefcaseConveyorBeltIcon,
  'bug': bugIcon,
  'cable-car': cableCarIcon,
  'cake-slice': cakeSliceIcon,
  'candy': candyIcon,
  'candy-cane': candyCaneIcon,
  'cannabis': cannabisIcon,
  'captions': captionsIcon,
  'check-line': checkLineIcon,
  'chevron-first': chevronFirstIcon,
  'chevron-last': chevronLastIcon,
  'chevrons-left-right-ellipsis': chevronsLeftRightEllipsisIcon,
  'cigarette': cigaretteIcon,
  'clock-4': clock4Icon,
  'clock-alert': clockAlertIcon,
  'clock-arrow-down': clockArrowDownIcon,
  'clock-arrow-left': clockArrowLeftIcon,
  'clock-arrow-up': clockArrowUpIcon,
  'clock-check': clockCheckIcon,
  'clock-fading': clockFadingIcon,
  'clock-plus': clockPlusIcon,
  'columns-2': columns2Icon,
  'columns-3': columns3Icon,
  'columns-4': columns4Icon,
  'database-arrow-down': databaseArrowDownIcon,
  'database-arrow-up': databaseArrowUpIcon,
  'database-backup': databaseBackupIcon,
  'database-plus': databasePlusIcon,
  'database-search': databaseSearchIcon,
  'database-x': databaseXIcon,
  'database-zap': databaseZapIcon,
  'diamond': diamondIcon,
  'diamond-minus': diamondMinusIcon,
  'diamond-percent': diamondPercentIcon,
  'disc': discIcon,
  'disc-2': disc2Icon,
  'disc-album': discAlbumIcon,
  'dna': dnaIcon,
  'droplet': dropletIcon,
  'ear': earIcon,
  'egg': eggIcon,
  'egg-fried': eggFriedIcon,
  'equal': equalIcon,
  'equal-approximately': equalApproximatelyIcon,
  'eye-closed': eyeClosedIcon,
  'eye-dashed': eyeDashedIcon,
  'face-angry': faceAngryIcon,
  'face-expressionless': faceExpressionlessIcon,
  'face-grinning': faceGrinningIcon,
  'face-neutral': faceNeutralIcon,
  'face-slightly-frowning': faceSlightlyFrowningIcon,
  'face-slightly-smiling': faceSlightlySmilingIcon,
  'fish': fishIcon,
  'fish-symbol': fishSymbolIcon,
  'flag': flagIcon,
  'flag-triangle-left': flagTriangleLeftIcon,
  'flag-triangle-right': flagTriangleRightIcon,
  'flashlight': flashlightIcon,
  'flask-conical': flaskConicalIcon,
  'flask-round': flaskRoundIcon,
  'funnel-plus': funnelPlusIcon,
  'gallery-thumbnails': galleryThumbnailsIcon,
  'grid-3x2': grid3x2Icon,
  'grid-3x3': grid3x3Icon,
  'hand': handIcon,
  'hand-fist': handFistIcon,
  'hand-grab': handGrabIcon,
  'hand-helping': handHelpingIcon,
  'hand-metal': handMetalIcon,
  'hand-platter': handPlatterIcon,
  'hard-hat': hardHatIcon,
  'hop': hopIcon,
  'house-plug': housePlugIcon,
  'house-plus': housePlusIcon,
  'id-card-lanyard': idCardLanyardIcon,
  'keyboard-music': keyboardMusicIcon,
  'laptop-minimal': laptopMinimalIcon,
  'layers-2': layers2Icon,
  'layers-arrow-down': layersArrowDownIcon,
  'layers-arrow-up': layersArrowUpIcon,
  'layers-minus': layersMinusIcon,
  'layers-plus': layersPlusIcon,
  'library-big': libraryBigIcon,
  'loader': loaderIcon,
  'loader-pinwheel': loaderPinwheelIcon,
  'locate': locateIcon,
  'lock-keyhole': lockKeyholeIcon,
  'log-in': logInIcon,
  'mail-badge': mailBadgeIcon,
  'mail-minus': mailMinusIcon,
  'mail-open': mailOpenIcon,
  'mail-plus': mailPlusIcon,
  'mail-question-mark': mailQuestionMarkIcon,
  'mail-search': mailSearchIcon,
  'mail-warning': mailWarningIcon,
  'mail-x': mailXIcon,
  'map-minus': mapMinusIcon,
  'map-pin-pen': mapPinPenIcon,
  'map-pinned': mapPinnedIcon,
  'map-plus': mapPlusIcon,
  'megaphone': megaphoneIcon,
  'mic': micIcon,
  'mic-audio-lines': micAudioLinesIcon,
  'mic-signal': micSignalIcon,
  'mic-vocal': micVocalIcon,
  'milk': milkIcon,
  'moon-star': moonStarIcon,
  'mountain': mountainIcon,
  'move-3d': move3dIcon,
  'music': musicIcon,
  'music-2': music2Icon,
  'music-3': music3Icon,
  'navigation-2': navigation2Icon,
  'nut': nutIcon,
  'octagon': octagonIcon,
  'octagon-pause': octagonPauseIcon,
  'octagon-x': octagonXIcon,
  'package-2': package2Icon,
  'paintbrush-vertical': paintbrushVerticalIcon,
  'pen-tool': penToolIcon,
  'pencil-ruler': pencilRulerIcon,
  'pencil-sparkles': pencilSparklesIcon,
  'phone-call': phoneCallIcon,
  'phone-forwarded': phoneForwardedIcon,
  'phone-incoming': phoneIncomingIcon,
  'phone-missed': phoneMissedIcon,
  'phone-outgoing': phoneOutgoingIcon,
  'pin': pinIcon,
  'plane-landing': planeLandingIcon,
  'plane-takeoff': planeTakeoffIcon,
  'pointer': pointerIcon,
  'printer-x': printerXIcon,
  'radio-receiver': radioReceiverIcon,
  'receipt-cent': receiptCentIcon,
  'receipt-euro': receiptEuroIcon,
  'receipt-indian-rupee': receiptIndianRupeeIcon,
  'receipt-russian-ruble': receiptRussianRubleIcon,
  'receipt-swiss-franc': receiptSwissFrancIcon,
  'receipt-text': receiptTextIcon,
  'redo': redoIcon,
  'redo-2': redo2Icon,
  'repeat': repeatIcon,
  'repeat-2': repeat2Icon,
  'replace': replaceIcon,
  'rotate-3d': rotate3dIcon,
  'rotate-ccw-square': rotateCcwSquareIcon,
  'rotate-cw-fading-clock': rotateCwFadingClockIcon,
  'rotate-cw-square': rotateCwSquareIcon,
  'scan-box': scanBoxIcon,
  'scissors-line-dashed': scissorsLineDashedIcon,
  'screen-share': screenShareIcon,
  'scroll': scrollIcon,
  'search-alert': searchAlertIcon,
  'search-code': searchCodeIcon,
  'send-horizontal': sendHorizontalIcon,
  'send-to-back': sendToBackIcon,
  'settings-2': settings2Icon,
  'shield-cog-corner': shieldCogCornerIcon,
  'shield-ellipsis': shieldEllipsisIcon,
  'shopping-basket': shoppingBasketIcon,
  'spline': splineIcon,
  'sticky-notes': stickyNotesIcon,
  'sun-dim': sunDimIcon,
  'sun-medium': sunMediumIcon,
  'sun-snow': sunSnowIcon,
  'table': tableIcon,
  'table-2': table2Icon,
  'table-columns-split': tableColumnsSplitIcon,
  'table-of-contents': tableOfContentsIcon,
  'table-properties': tablePropertiesIcon,
  'table-rows-split': tableRowsSplitIcon,
  'tablet-smartphone': tabletSmartphoneIcon,
  'tag-plus': tagPlusIcon,
  'tag-x': tagXIcon,
  'text-align-end': textAlignEndIcon,
  'text-align-justify': textAlignJustifyIcon,
  'text-align-start': textAlignStartIcon,
  'text-initial': textInitialIcon,
  'text-quote': textQuoteIcon,
  'text-wrap': textWrapIcon,
  'thermometer-snowflake': thermometerSnowflakeIcon,
  'thermometer-sun': thermometerSunIcon,
  'tickets': ticketsIcon,
  'timer-reset': timerResetIcon,
  'touchpad': touchpadIcon,
  'triangle-dashed': triangleDashedIcon,
  'triangle-right': triangleRightIcon,
  'truck-electric': truckElectricIcon,
  'tv-minimal': tvMinimalIcon,
  'type-outline': typeOutlineIcon,
  'umbrella': umbrellaIcon,
  'unlink-2': unlink2Icon,
  'user-key': userKeyIcon,
  'user-lock': userLockIcon,
  'user-search': userSearchIcon,
  'user-shield': userShieldIcon,
  'user-star': userStarIcon,
  'users-round': usersRoundIcon,
  'video': videoIcon,
  'webcam': webcamIcon,
  'wheat': wheatIcon,
  'wifi-cog': wifiCogIcon,
  'wifi-sync': wifiSyncIcon,
  'wine': wineIcon,
  'x-line-top': xLineTopIcon,
  'archive-x': archiveXIcon,
  'audio-lines-x': audioLinesXIcon,
  'banknote-check': banknoteCheckIcon,
  'beef-off': beefOffIcon,
  'bug-play': bugPlayIcon,
  'cannabis-off': cannabisOffIcon,
  'cctv-off': cctvOffIcon,
  'circle-dot': circleDotIcon,
  'circle-small': circleSmallIcon,
  'circle-equal': circleEqualIcon,
  'circle-divide': circleDivideIcon,
  'circle-ellipsis': circleEllipsisIcon,
  'circle-dollar-sign': circleDollarSignIcon,
  'circle-percent': circlePercentIcon,
  'circle-pause': circlePauseIcon,
  'circle-power': circlePowerIcon,
  'circle-gauge': circleGaugeIcon,
  'circle-user': circleUserIcon,
  'circle-user-round': circleUserRoundIcon,
  'circle-pile': circlePileIcon,
  'circle-dashed': circleDashedIcon,
  'circle-dot-dashed': circleDotDashedIcon,
  'circle-fading-plus': circleFadingPlusIcon,
  'circle-fading-arrow-up': circleFadingArrowUpIcon,
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
  'list-chevrons-down-up': listChevronsDownUpIcon,
  'list-chevrons-up-down': listChevronsUpDownIcon,
  'list-collapse': listCollapseIcon,
  'list-indent-decrease': listIndentDecreaseIcon,
  'list-indent-increase': listIndentIncreaseIcon,
  'list-minus': listMinusIcon,
  'list-plus': listPlusIcon,
  'list-x': listXIcon,
  'list-end': listEndIcon,
  'list-start': listStartIcon,
  'list-restart': listRestartIcon,
  'list-music': listMusicIcon,
  'list-video': listVideoIcon,
  'list-ordered': listOrderedIcon,
  'list-filter': listFilterIcon,
  'list-sort-ascending': listSortAscendingIcon,
  'list-sort-descending': listSortDescendingIcon,
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
  'align-start-horizontal': alignStartHorizontalIcon,
  'align-end-horizontal': alignEndHorizontalIcon,
  'align-start-vertical': alignStartVerticalIcon,
  'align-end-vertical': alignEndVerticalIcon,
  'align-center-horizontal': alignCenterHorizontalIcon,
  'align-center-vertical': alignCenterVerticalIcon,
  'align-horizontal-justify-start': alignHorizontalJustifyStartIcon,
  'align-horizontal-justify-end': alignHorizontalJustifyEndIcon,
  'align-horizontal-justify-center': alignHorizontalJustifyCenterIcon,
  'align-vertical-justify-start': alignVerticalJustifyStartIcon,
  'align-vertical-justify-end': alignVerticalJustifyEndIcon,
  'align-vertical-justify-center': alignVerticalJustifyCenterIcon,
  'align-horizontal-distribute-start': alignHorizontalDistributeStartIcon,
  'align-horizontal-distribute-end': alignHorizontalDistributeEndIcon,
  'align-horizontal-distribute-center': alignHorizontalDistributeCenterIcon,
  'align-vertical-distribute-start': alignVerticalDistributeStartIcon,
  'align-vertical-distribute-end': alignVerticalDistributeEndIcon,
  'align-vertical-distribute-center': alignVerticalDistributeCenterIcon,
  'align-horizontal-space-between': alignHorizontalSpaceBetweenIcon,
  'align-vertical-space-between': alignVerticalSpaceBetweenIcon,
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
  'message-circle-code': messageCircleCodeIcon,
  'message-circle-plus': messageCirclePlusIcon,
  'message-circle-x': messageCircleXIcon,
  'message-circle-reply': messageCircleReplyIcon,
  'message-circle-dashed': messageCircleDashedIcon,
  'message-square-code': messageSquareCodeIcon,
  'message-square-plus': messageSquarePlusIcon,
  'message-square-x': messageSquareXIcon,
  'message-square-reply': messageSquareReplyIcon,
  'message-square-quote': messageSquareQuoteIcon,
  'message-square-text': messageSquareTextIcon,
  'message-square-diff': messageSquareDiffIcon,
  'message-square-share': messageSquareShareIcon,
  'message-square-warning': messageSquareWarningIcon,
  'message-square-dot': messageSquareDotIcon,
  'message-square-lock': messageSquareLockIcon,
  'message-square-dashed': messageSquareDashedIcon,
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
  'file-archive': fileArchiveIcon,
  'file-box': fileBoxIcon,
  'file-chart-pie': fileChartPieIcon,
  'file-clock': fileClockIcon,
  'file-diff': fileDiffIcon,
  'file-digit': fileDigitIcon,
  'file-headphone': fileHeadphoneIcon,
  'file-heart': fileHeartIcon,
  'file-key': fileKeyIcon,
  'file-lock': fileLockIcon,
  'file-music': fileMusicIcon,
  'file-output': fileOutputIcon,
  'file-pen-line': filePenLineIcon,
  'file-scan': fileScanIcon,
  'file-stack': fileStackIcon,
  'file-symlink': fileSymlinkIcon,
  'file-video-camera': fileVideoCameraIcon,
  'file-volume': fileVolumeIcon,
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
  'cloud-check': cloudCheckIcon,
  'cloud-alert': cloudAlertIcon,
  'cloud-lightning': cloudLightningIcon,
  'cloud-rain': cloudRainIcon,
  'cloud-drizzle': cloudDrizzleIcon,
  'cloud-rain-wind': cloudRainWindIcon,
  'cloud-hail': cloudHailIcon,
  'cloud-snow': cloudSnowIcon,
  'cloud-fog': cloudFogIcon,
  'cloud-sun': cloudSunIcon,
  'cloud-sync': cloudSyncIcon,
  'cloud-backup': cloudBackupIcon,
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
  'undo': undoIcon,
  'undo-2': undo2Icon,
  'undo-dot': undoDotIcon,
  'corner-down-left': cornerDownLeftIcon,
  'corner-down-right': cornerDownRightIcon,
  'corner-left-down': cornerLeftDownIcon,
  'corner-left-up': cornerLeftUpIcon,
  'corner-right-down': cornerRightDownIcon,
  'corner-right-up': cornerRightUpIcon,
  'corner-up-left': cornerUpLeftIcon,
  'corner-up-right': cornerUpRightIcon,
  'trending-down': trendingDownIcon,
  'trending-up': trendingUpIcon,
  'trending-up-down': trendingUpDownIcon,
  'skip-back': skipBackIcon,
  'skip-forward': skipForwardIcon,
  'step-back': stepBackIcon,
  'step-forward': stepForwardIcon,
  'rewind': rewindIcon,
  'fast-forward': fastForwardIcon,
  'eject': ejectIcon,
  'shuffle': shuffleIcon,
  'reply': replyIcon,
  'reply-all': replyAllIcon,
  'forward': forwardIcon,
  'iteration-cw': iterationCwIcon,
  'iteration-ccw': iterationCcwIcon,
  'layer-arrow-down': layerArrowDownIcon,
  'layer-arrow-up': layerArrowUpIcon,
  'decimals-arrow-left': decimalsArrowLeftIcon,
  'decimals-arrow-right': decimalsArrowRightIcon,
  'arrows-up-from-line': arrowsUpFromLineIcon,
  'share': shareIcon,
  'share-2': share2Icon,
  'rows-2': rows2Icon,
  'rows-3': rows3Icon,
  'rows-4': rows4Icon,
  'panels-left-bottom': panelsLeftBottomIcon,
  'panels-right-bottom': panelsRightBottomIcon,
  'panels-top-left': panelsTopLeftIcon,
  'rectangle-horizontal': rectangleHorizontalIcon,
  'rectangle-vertical': rectangleVerticalIcon,
  'rectangle-ellipsis': rectangleEllipsisIcon,
  'rectangle-circle': rectangleCircleIcon,
  'rectangle-goggles': rectangleGogglesIcon,
  'squares-unite': squaresUniteIcon,
  'squares-intersect': squaresIntersectIcon,
  'squares-subtract': squaresSubtractIcon,
  'squares-exclude': squaresExcludeIcon,
  'squircle': squircleIcon,
  'squircle-dashed': squircleDashedIcon,
  'separator-horizontal': separatorHorizontalIcon,
  'separator-vertical': separatorVerticalIcon,
  'stretch-horizontal': stretchHorizontalIcon,
  'stretch-vertical': stretchVerticalIcon,
  'fold-horizontal': foldHorizontalIcon,
  'fold-vertical': foldVerticalIcon,
  'unfold-horizontal': unfoldHorizontalIcon,
  'unfold-vertical': unfoldVerticalIcon,
  'flip-horizontal-2': flipHorizontal2Icon,
  'flip-vertical-2': flipVertical2Icon,
  'sliders-horizontal': slidersHorizontalIcon,
  'sliders-vertical': slidersVerticalIcon,
  'heading': headingIcon,
  'heading-1': heading1Icon,
  'heading-2': heading2Icon,
  'heading-3': heading3Icon,
  'heading-4': heading4Icon,
  'heading-5': heading5Icon,
  'heading-6': heading6Icon,
  'case-upper': caseUpperIcon,
  'case-lower': caseLowerIcon,
  'case-sensitive': caseSensitiveIcon,
  'pilcrow': pilcrowIcon,
  'pilcrow-left': pilcrowLeftIcon,
  'pilcrow-right': pilcrowRightIcon,
  'bold': boldIcon,
  'italic': italicIcon,
  'underline': underlineIcon,
  'strikethrough': strikethroughIcon,
  'subscript': subscriptIcon,
  'superscript': superscriptIcon,
  'baseline': baselineIcon,
  'ligature': ligatureIcon,
  'whole-word': wholeWordIcon,
  'regex': regexIcon,
  'remove-formatting': removeFormattingIcon,
  'highlighter': highlighterIcon,
  'quote': quoteIcon,
  'a-arrow-up': aArrowUpIcon,
  'a-arrow-down': aArrowDownIcon,
  'a-large-small': aLargeSmallIcon,
  'dollar-sign': dollarSignIcon,
  'euro': euroIcon,
  'pound-sterling': poundSterlingIcon,
  'japanese-yen': japaneseYenIcon,
  'indian-rupee': indianRupeeIcon,
  'russian-ruble': russianRubleIcon,
  'saudi-riyal': saudiRiyalIcon,
  'swiss-franc': swissFrancIcon,
  'turkish-lira': turkishLiraIcon,
  'philippine-peso': philippinePesoIcon,
  'georgian-lari': georgianLariIcon,
  'bitcoin': bitcoinIcon,
  'currency': currencyIcon,
  'percent': percentIcon,
  'divide': divideIcon,
  'sigma': sigmaIcon,
  'pi': piIcon,
  'radical': radicalIcon,
  'asterisk': asteriskIcon,
  'omega': omegaIcon,
  'phi': phiIcon,
  'variable': variableIcon,
  'ampersand': ampersandIcon,
  'ampersands': ampersandsIcon,
  'chess-king': chessKingIcon,
  'chess-queen': chessQueenIcon,
  'chess-rook': chessRookIcon,
  'chess-bishop': chessBishopIcon,
  'chess-knight': chessKnightIcon,
  'chess-pawn': chessPawnIcon,
  'gamepad': gamepadIcon,
  'gamepad-2': gamepad2Icon,
  'gamepad-directional': gamepadDirectionalIcon,
  'joystick': joystickIcon,
  'puzzle': puzzleIcon,
  'toy-brick': toyBrickIcon,
  'dices': dicesIcon,
  'target': targetIcon,
  'crosshair': crosshairIcon,
  'goal': goalIcon,
  'medal': medalIcon,
  'trophy': trophyIcon,
  'volleyball': volleyballIcon,
  'dumbbell': dumbbellIcon,
  'biceps-flexed': bicepsFlexedIcon,
  'sport-shoe': sportShoeIcon,
  'swords': swordsIcon,
  'bomb': bombIcon,
  'rocket': rocketIcon,
  'balloon': balloonIcon,
  'party-popper': partyPopperIcon,
  'gift': giftIcon,
  'files': filesIcon,
  'folders': foldersIcon,
  'mails': mailsIcon,
  'calendars': calendarsIcon,
  'messages-square': messagesSquareIcon,
  'tags': tagsIcon,
  'logs': logsIcon,
  'earth': earthIcon,
  'earth-lock': earthLockIcon,
  'code': codeIcon,
  'code-xml': codeXmlIcon,
  'notepad-text': notepadTextIcon,
  'notepad-text-dashed': notepadTextDashedIcon,
  'wand': wandIcon,
  'wand-sparkles': wandSparklesIcon,
  'lasso': lassoIcon,
  'lasso-select': lassoSelectIcon,
  'pill': pillIcon,
  'pill-bottle': pillBottleIcon,
  'flame': flameIcon,
  'flame-kindling': flameKindlingIcon,
  'box': boxIcon,
  'boxes': boxesIcon,
  'trees': treesIcon,
  'test-tube': testTubeIcon,
  'test-tubes': testTubesIcon,
  'test-tube-diagonal': testTubeDiagonalIcon,
  'wallet': walletIcon,
  'wallet-cards': walletCardsIcon,
  'wallet-minimal': walletMinimalIcon,
  'tree-deciduous': treeDeciduousIcon,
  'tree-pine': treePineIcon,
  'tree-palm': treePalmIcon,
  'gpu': gpuIcon,
  'microchip': microchipIcon,
  'memory-stick': memoryStickIcon,
  'pc-case': pcCaseIcon,
  'circuit-board': circuitBoardIcon,
  'inspection-panel': inspectionPanelIcon,
  'usb': usbIcon,
  'hdmi-port': hdmiPortIcon,
  'ethernet-port': ethernetPortIcon,
  'card-sim': cardSimIcon,
  'antenna': antennaIcon,
  'satellite': satelliteIcon,
  'satellite-dish': satelliteDishIcon,
  'solar-panel': solarPanelIcon,
  'ev-charger': evChargerIcon,
  'utility-pole': utilityPoleIcon,
  'speaker': speakerIcon,
  'headphones': headphonesIcon,
  'headset': headsetIcon,
  'boom-box': boomBoxIcon,
  'cassette-tape': cassetteTapeIcon,
  'videotape': videotapeIcon,
  'turntable': turntableIcon,
  'piano': pianoIcon,
  'guitar': guitarIcon,
  'computer': computerIcon,
  'projector': projectorIcon,
  'metronome': metronomeIcon,
  'barcode': barcodeIcon,
  'fingerprint-pattern': fingerprintPatternIcon,
  'plug': plugIcon,
  'plug-2': plug2Icon,
  'plug-zap': plugZapIcon,
  'armchair': armchairIcon,
  'sofa': sofaIcon,
  'shelving-unit': shelvingUnitIcon,
  'bath': bathIcon,
  'shower-head': showerHeadIcon,
  'toilet': toiletIcon,
  'towel-rack': towelRackIcon,
  'soap-dispenser-droplet': soapDispenserDropletIcon,
  'washing-machine': washingMachineIcon,
  'refrigerator': refrigeratorIcon,
  'microwave': microwaveIcon,
  'blender': blenderIcon,
  'heater': heaterIcon,
  'air-vent': airVentIcon,
  'fan': fanIcon,
  'broom': broomIcon,
  'broom-sparkles': broomSparklesIcon,
  'blinds': blindsIcon,
  'wallpaper': wallpaperIcon,
  'mirror-rectangular': mirrorRectangularIcon,
  'mirror-round': mirrorRoundIcon,
  'lamp': lampIcon,
  'lamp-floor': lampFloorIcon,
  'lamp-ceiling': lampCeilingIcon,
  'lamp-wall-down': lampWallDownIcon,
  'lamp-wall-up': lampWallUpIcon,
  'lamp-desk': lampDeskIcon,
  'bed': bedIcon,
  'bed-double': bedDoubleIcon,
  'bed-single': bedSingleIcon,
  'door-closed': doorClosedIcon,
  'door-open': doorOpenIcon,
  'door-closed-locked': doorClosedLockedIcon,
  'ambulance': ambulanceIcon,
  'bus': busIcon,
  'bus-front': busFrontIcon,
  'caravan': caravanIcon,
  'van': vanIcon,
  'bike': bikeIcon,
  'motorbike': motorbikeIcon,
  'scooter': scooterIcon,
  'forklift': forkliftIcon,
  'tractor': tractorIcon,
  'tram-front': tramFrontIcon,
  'road': roadIcon,
  'traffic-cone': trafficConeIcon,
  'signpost': signpostIcon,
  'signpost-big': signpostBigIcon,
  'milestone': milestoneIcon,
  'parking-meter': parkingMeterIcon,
  'fuel': fuelIcon,
  'car': carIcon,
  'car-front': carFrontIcon,
  'car-taxi-front': carTaxiFrontIcon,
  'train-front': trainFrontIcon,
  'train-front-tunnel': trainFrontTunnelIcon,
  'train-track': trainTrackIcon,
  'helicopter': helicopterIcon,
  'drone': droneIcon,
  'tower-control': towerControlIcon,
  'kayak': kayakIcon,
  'sailboat': sailboatIcon,
  'anchor': anchorIcon,
  'ferris-wheel': ferrisWheelIcon,
  'roller-coaster': rollerCoasterIcon,
  'castle': castleIcon,
  'church': churchIcon,
  'mosque': mosqueIcon,
  'hospital': hospitalIcon,
  'hotel': hotelIcon,
  'school': schoolIcon,
  'university': universityIcon,
  'store': storeIcon,
  'factory': factoryIcon,
  'construction': constructionIcon,
  'tent': tentIcon,
  'tent-tree': tentTreeIcon,
  'backpack': backpackIcon,
  'baggage-claim': baggageClaimIcon,
  'luggage': luggageIcon,
  'apple': appleIcon,
  'banana': bananaIcon,
  'bottle-wine': bottleWineIcon,
  'broccoli': broccoliIcon,
  'carrot': carrotIcon,
  'chef-hat': chefHatIcon,
  'citrus': citrusIcon,
  'coffee': coffeeIcon,
  'cookie': cookieIcon,
  'cooking-pot': cookingPotIcon,
  'croissant': croissantIcon,
  'cup-soda': cupSodaIcon,
  'dessert': dessertIcon,
  'donut': donutIcon,
  'drumstick': drumstickIcon,
  'glass-water': glassWaterIcon,
  'grape': grapeIcon,
  'ham': hamIcon,
  'hamburger': hamburgerIcon,
  'ice-cream-bowl': iceCreamBowlIcon,
  'ice-cream-cone': iceCreamConeIcon,
  'leafy-green': leafyGreenIcon,
  'lollipop': lollipopIcon,
  'martini': martiniIcon,
  'paper-bag': paperBagIcon,
  'pizza': pizzaIcon,
  'popcorn': popcornIcon,
  'popsicle': popsicleIcon,
  'salad': saladIcon,
  'sandwich': sandwichIcon,
  'shrimp': shrimpIcon,
  'soup': soupIcon,
  'utensils': utensilsIcon,
  'utensils-crossed': utensilsCrossedIcon,
  'vegan': veganIcon,
  'bird': birdIcon,
  'cat': catIcon,
  'dog': dogIcon,
  'panda': pandaIcon,
  'rat': ratIcon,
  'turtle': turtleIcon,
  'snail': snailIcon,
  'squirrel': squirrelIcon,
  'worm': wormIcon,
  'shell': shellIcon,
  'origami': origamiIcon,
  'birdhouse': birdhouseIcon,
  'paw-print': pawPrintIcon,
  'footprints': footprintsIcon,
  'feather': featherIcon,
  'flower': flowerIcon,
  'flower-2': flower2Icon,
  'rose': roseIcon,
  'clover': cloverIcon,
  'leaf': leafIcon,
  'shrub': shrubIcon,
  'sprout': sproutIcon,
  'drill': drillIcon,
  'magnet': magnetIcon,
  'pipette': pipetteIcon,
  'spray-can': sprayCanIcon,
  'drafting-compass': draftingCompassIcon,
  'pocket-knife': pocketKnifeIcon,
  'tool-case': toolCaseIcon,
  'toolbox': toolboxIcon,
  'shredder': shredderIcon,
  'stamp': stampIcon,
  'eraser': eraserIcon,
  'spool': spoolIcon,
  'ruler': rulerIcon,
  'ruler-dimension-line': rulerDimensionLineIcon,
  'fishing-hook': fishingHookIcon,
  'fishing-rod': fishingRodIcon,
  'paint-bucket': paintBucketIcon,
  'paint-roller': paintRollerIcon,
  'bandage': bandageIcon,
  'skull': skullIcon,
  'syringe': syringeIcon,
  'tablets': tabletsIcon,
  'stethoscope': stethoscopeIcon,
  'microscope': microscopeIcon,
  'beaker': beakerIcon,
  'atom': atomIcon,
  'baby': babyIcon,
  'person-standing': personStandingIcon,
  'glasses': glassesIcon,
  'ghost': ghostIcon,
  'zodiac-aries': zodiacAriesIcon,
  'zodiac-taurus': zodiacTaurusIcon,
  'zodiac-gemini': zodiacGeminiIcon,
  'zodiac-cancer': zodiacCancerIcon,
  'zodiac-leo': zodiacLeoIcon,
  'zodiac-virgo': zodiacVirgoIcon,
  'zodiac-libra': zodiacLibraIcon,
  'zodiac-scorpio': zodiacScorpioIcon,
  'zodiac-sagittarius': zodiacSagittariusIcon,
  'zodiac-capricorn': zodiacCapricornIcon,
  'zodiac-aquarius': zodiacAquariusIcon,
  'zodiac-pisces': zodiacPiscesIcon,
  'zodiac-ophiuchus': zodiacOphiuchusIcon,
  'mars': marsIcon,
  'mars-stroke': marsStrokeIcon,
  'venus': venusIcon,
  'venus-and-mars': venusAndMarsIcon,
  'transgender': transgenderIcon,
  'non-binary': nonBinaryIcon,
  'biohazard': biohazardIcon,
  'radiation': radiationIcon,
  'recycle': recycleIcon,
  'copyright': copyrightIcon,
  'copyleft': copyleftIcon,
  'creative-commons': creativeCommonsIcon,
  'cross': crossIcon,
  'club': clubIcon,
  'spade': spadeIcon,
  'cloudy': cloudyIcon,
  'haze': hazeIcon,
  'dam': damIcon,
  'droplets': dropletsIcon,
  'bubbles': bubblesIcon,
  'sunrise': sunriseIcon,
  'sunset': sunsetIcon,
  'spotlight': spotlightIcon,
  'siren': sirenIcon,
  'fire-extinguisher': fireExtinguisherIcon,
  'life-buoy': lifeBuoyIcon,
  'parasol': parasolIcon,
  'hourglass': hourglassIcon,
  'stone': stoneIcon,
  'land-plot': landPlotIcon,
  'waves-horizontal': wavesHorizontalIcon,
  'waves-vertical': wavesVerticalIcon,
  'waves-arrow-up': wavesArrowUpIcon,
  'waves-arrow-down': wavesArrowDownIcon,
  'waves-ladder': wavesLadderIcon,
  'wind': windIcon,
  'wind-arrow-down': windArrowDownIcon,
  'angle': angleIcon,
  'astroid': astroidIcon,
  'cone': coneIcon,
  'cuboid': cuboidIcon,
  'cylinder': cylinderIcon,
  'diameter': diameterIcon,
  'ellipse': ellipseIcon,
  'hexagon': hexagonIcon,
  'pentagon': pentagonIcon,
  'pyramid': pyramidIcon,
  'radius': radiusIcon,
  'ratio': ratioIcon,
  'proportions': proportionsIcon,
  'scaling': scalingIcon,
  'section': sectionIcon,
  'shapes': shapesIcon,
  'tangent': tangentIcon,
  'torus': torusIcon,
  'vector-square': vectorSquareIcon,
  'space': spaceIcon,
  'slice': sliceIcon,
  'waypoints': waypointsIcon,
  'dot': dotIcon,
  'slash': slashIcon,
  'scale': scaleIcon,
  'scale-3d': scale3dIcon,
  'weight': weightIcon,
  'weight-tilde': weightTildeIcon,
  'group': groupIcon,
  'ungroup': ungroupIcon,
  'combine': combineIcon,
  'merge': mergeIcon,
  'split': splitIcon,
  'bring-to-front': bringToFrontIcon,
  'dock': dockIcon,
  'delete': deleteIcon,
  'option': optionIcon,
  'brackets': bracketsIcon,
  'parentheses': parenthesesIcon,
  'component': componentIcon,
  'album': albumIcon,
  'aperture': apertureIcon,
  'film': filmIcon,
  'focus': focusIcon,
  'fullscreen': fullscreenIcon,
  'expand': expandIcon,
  'switch-camera': switchCameraIcon,
  'view': viewIcon,
  'hd': hdIcon,
  'closed-caption': closedCaptionIcon,
  'voicemail': voicemailIcon,
  'presentation': presentationIcon,
  'newspaper': newspaperIcon,
  'timeline': timelineIcon,
  'summary': summaryIcon,
  'sheet': sheetIcon,
  'form': formIcon,
  'import': importIcon,
  'accessibility': accessibilityIcon,
  'ad': adIcon,
  'line-style': lineStyleIcon,
  'line-squiggle': lineSquiggleIcon,
  'line-dot-right-horizontal': lineDotRightHorizontalIcon,
  'picture-in-picture': pictureInPictureIcon,
  'picture-in-picture-2': pictureInPicture2Icon,
  'amphora': amphoraIcon,
  'barrel': barrelIcon,
  'container': containerIcon,
  'vault': vaultIcon,
  'mailbox': mailboxIcon,
  'piggy-bank': piggyBankIcon,
  'handbag': handbagIcon,
  'coins': coinsIcon,
  'gem': gemIcon,
  'ribbon': ribbonIcon,
  'sticker': stickerIcon,
  'swatch-book': swatchBookIcon,
  'watch': watchIcon,
  'calculator': calculatorIcon,
  'concierge-bell': conciergeBellIcon,
  'binoculars': binocularsIcon,
  'bow-arrow': bowArrowIcon,
  'drama': dramaIcon,
  'theater': theaterIcon,
  'venetian-mask': venetianMaskIcon,
  'lectern': lecternIcon,
  'podium': podiumIcon,
  'handshake': handshakeIcon,
  'fence': fenceIcon,
  'lens-concave': lensConcaveIcon,
  'lens-convex': lensConvexIcon,
  'brick-wall': brickWallIcon,
  'brick-wall-fire': brickWallFireIcon,
  'brick-wall-shield': brickWallShieldIcon,
};
