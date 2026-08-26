import { AnimatedIconDef } from './animated-icon.model';
import { SHIELD_GEAR_SPIN, TRAZO_INVERSO, X_SNAP_DRAW } from './icons/_shared';
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
 * Un elemento se ARRASTRA hasta el sitio del otro y vuelve. La anticipación no es adorno: las
 * puntas de `repeat` terminan en x=21 y x=3, así que sin retroceder primero el recorrido visible
 * sería de 1 y no se leería como un intercambio.
 */
const DRAG_RIGHT = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(-1px)', offset: 0.25 },
  { transform: 'translateX(1px)', offset: 0.68 },
  { transform: 'translateX(0)', offset: 1 },
];

const DRAG_LEFT = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(1px)', offset: 0.25 },
  { transform: 'translateX(-1px)', offset: 0.68 },
  { transform: 'translateX(0)', offset: 1 },
];

const DRAG_UP = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(1px)', offset: 0.25 },
  { transform: 'translateY(-1.5px)', offset: 0.68 },
  { transform: 'translateY(0)', offset: 1 },
];

const DRAG_DOWN = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-1px)', offset: 0.25 },
  { transform: 'translateY(1.5px)', offset: 0.68 },
  { transform: 'translateY(0)', offset: 1 },
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

/** Se despliega desde su borde de arriba: divisiones de rejilla, columnas. */
const E1_UNFOLD_Y = /* @__PURE__ */ [{ transform: 'scaleY(0.15)' }, { transform: 'scaleY(1)' }];

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

/** Lo que vibra al sonar: una campana, un megáfono. Corto y rápido, o parece que se cae. */
const E2_RING = /* @__PURE__ */ [
  { transform: 'rotate(0deg)', offset: 0 },
  { transform: 'rotate(-8deg)', offset: 0.2 },
  { transform: 'rotate(7deg)', offset: 0.45 },
  { transform: 'rotate(-4deg)', offset: 0.7 },
  { transform: 'rotate(0deg)', offset: 1 },
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
        1: /* @__PURE__ */ track(E1_UNFOLD_Y, 460, { easing: SPRING_OUT, origin: '12px 3px', delay: 120, fill: 'backwards' }),
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
        1: /* @__PURE__ */ track(E1_UNFOLD_Y, 460, { easing: SPRING_OUT, origin: '9px 3px', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E1_UNFOLD_Y, 460, { easing: SPRING_OUT, origin: '15px 3px', delay: 210, fill: 'backwards' }),
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
        1: /* @__PURE__ */ track(E1_UNFOLD_Y, 460, { easing: SPRING_OUT, origin: '7.5px 3px', delay: 120, fill: 'backwards' }),
        2: /* @__PURE__ */ track(E1_UNFOLD_Y, 460, { easing: SPRING_OUT, origin: '12px 3px', delay: 200, fill: 'backwards' }),
        3: /* @__PURE__ */ track(E1_UNFOLD_Y, 460, { easing: SPRING_OUT, origin: '16.5px 3px', delay: 280, fill: 'backwards' }),
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

/** Grita: el cono se mece desde el mango —que es por donde se sujeta— y su boca se abre. */
export const megaphoneIcon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" },
    { tag: 'path', d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" },
    { tag: 'path', d: "M8 6v8" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(E2_RING, 620, { easing: EASE, origin: '7px 10px' }),
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
      shapes: {
        0: /* @__PURE__ */ track(DRAG_RIGHT, 700, { easing: EASE }),
        1: /* @__PURE__ */ track(DRAG_RIGHT, 700, { easing: EASE }),
        2: /* @__PURE__ */ track(DRAG_LEFT, 700, { easing: EASE, delay: 90, fill: 'backwards' }),
        3: /* @__PURE__ */ track(DRAG_LEFT, 700, { easing: EASE, delay: 90, fill: 'backwards' }),
      },
    },
  },
);

/** El mismo intercambio, aquí en vertical. */
export const repeat2Icon: AnimatedIconDef = /* @__PURE__ */ icon(
  [
    { tag: 'path', d: "m2 9 3-3 3 3" },
    { tag: 'path', d: "M13 18H7a2 2 0 0 1-2-2V6" },
    { tag: 'path', d: "m22 15-3 3-3-3" },
    { tag: 'path', d: "M11 6h6a2 2 0 0 1 2 2v10" },
  ],
  {
    default: {
      shapes: {
        0: /* @__PURE__ */ track(DRAG_UP, 700, { easing: EASE }),
        1: /* @__PURE__ */ track(DRAG_UP, 700, { easing: EASE }),
        2: /* @__PURE__ */ track(DRAG_DOWN, 700, { easing: EASE, delay: 90, fill: 'backwards' }),
        3: /* @__PURE__ */ track(DRAG_DOWN, 700, { easing: EASE, delay: 90, fill: 'backwards' }),
      },
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
  { transform: 'translateX(-0.85px)', offset: 0.3 },
  { transform: 'translateX(0.85px)', offset: 0.7 },
  { transform: 'translateX(0)', offset: 1 },
];

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
        0: /* @__PURE__ */ track(CADENA_DER, 420, { easing: SPRING_OUT }),
        1: /* @__PURE__ */ track(CADENA_DER, 420, { delay: 90, easing: SPRING_OUT }),
      },
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
        0: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 560),
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
        1: /* @__PURE__ */ track(/* @__PURE__ */ strokeDraw(), 560),
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
};
