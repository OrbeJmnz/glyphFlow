// Helpers de coreografía que comparten VARIAS familias.
//
// Viven aquí y no duplicados en cada familia a propósito: dos copias del mismo helper se
// desincronizan en cuanto alguien ajusta un timing en una sola, y eso no lo caza ningún test
// — el lock ancla la coreografía resultante, no de dónde salió. Una sola fuente, un solo ajuste.
import { rotateSeq, scaleSeq } from '../choreography';

/** Copiado y confirmado: la misma separación de copy y la palomita se dibuja de insignia. */
// Se despega de verdad, más lejos y con rebote elástico, en vez del handshake chico.
export const COPY_PEEL = /* @__PURE__ */ [
  { transform: 'translate(0, 0)' },
  { transform: 'translate(3px, -3px)' },
  { transform: 'translate(0, 0)' },
];

// Palpitar real: 4 pulsaciones que se van apagando, como un corazón calmándose.
export const HEART_QUAD_PULSE = /* @__PURE__ */ scaleSeq([1, 1.16, 1, 1.16, 1, 1.1, 1, 1.06, 1]);

// La esquina doblada gira desde donde se pega a la hoja, como si se doblara en el momento.
// Mismo carácter que `file-badge:chida` (el papel cede, el sello se aprieta) — aquí la esquina
// es la insignia: se aprieta y rebota en vez de solo girar. `flip` guarda el giro original.
export const FOLD_CHIDA = /* @__PURE__ */ [
  { transform: 'scale(1)' },
  { transform: 'scale(0.85)' },
  { transform: 'scale(1.08)' },
  { transform: 'scale(1)' },
];

/** Revisado: la palomita se dibuja sobre la tabla. */
// Variantes de la sección 6: reutilizan insignias que YA tienen animación en otro icono de la
// librería (pen, +, -, x, check, search, sync) — mismo criterio, aplicado a la insignia nueva.
export const BADGE_BOUNCE_DRAW = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'scale(0.8)' },
  { strokeDasharray: '1', strokeDashoffset: '0.4', opacity: '0.6', transform: 'scale(1.25)' },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)' },
];

export const X_SNAP_DRAW = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: 'scale(1)' },
  { strokeDasharray: '1', strokeDashoffset: '0.5', opacity: '0.5', transform: 'scale(1.15)' },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: 'scale(1)' },
];

export const REFRESH_SPIN = /* @__PURE__ */ rotateSeq([0, 360]);

/**
 * VAIVÉN "ALEATORIO" DE UNA LÍNEA INTERIOR (rejillas y columnas).
 *
 * Aleatorio de verdad no se puede: los keyframes se construyen una sola vez, al cargar el módulo,
 * y tienen que ser IDÉNTICOS en cada render — si no, el server-side y el cliente pintan distinto y
 * Angular truena la hidratación. Lo que se busca no es azar sino que NO SE VEA UN PATRÓN, y eso se
 * consigue con tres semillas: distinta amplitud, distinto sentido de arranque y distintos tiempos.
 * Dos líneas con semillas distintas nunca se leen como un bloque.
 *
 * `amp` va en unidades del viewBox y se mide contra el hueco disponible: una línea no puede salirse
 * del marco ni cruzarse con su vecina.
 */
const SEMILLAS: { a: number; o: number }[][] = [
  [{ a: 0, o: 0 }, { a: 1, o: 0.22 }, { a: -0.55, o: 0.48 }, { a: 0.7, o: 0.72 }, { a: -0.23, o: 0.88 }, { a: 0, o: 1 }],
  [{ a: 0, o: 0 }, { a: -0.85, o: 0.3 }, { a: 0.62, o: 0.55 }, { a: -0.4, o: 0.78 }, { a: 0.2, o: 0.92 }, { a: 0, o: 1 }],
  [{ a: 0, o: 0 }, { a: 0.5, o: 0.16 }, { a: -1, o: 0.44 }, { a: 0.38, o: 0.7 }, { a: -0.55, o: 0.86 }, { a: 0, o: 1 }],
];

export const lineaVaga = (eje: 'X' | 'Y', amp: number, semilla: 0 | 1 | 2): Keyframe[] =>
  SEMILLAS[semilla].map(({ a, o }) => ({
    transform: `translate${eje}(${Number((a * amp).toFixed(3))}px)`,
    offset: o,
  }));

/**
 * El mismo vaivén DESPUÉS de que la línea se despliegue desde su borde — que es la animación que
 * estas familias ya tenían. Van fundidos en un solo track porque `shapes` admite uno por figura.
 *
 * El orden `scaleY(...) translateX(...)` no es intercambiable pero aquí es inofensivo: un escalado
 * en un eje no toca el desplazamiento del OTRO. Por eso el despliegue y el vaivén son siempre ejes
 * cruzados (línea vertical: se despliega en Y, vaga en X).
 */
export const lineaDespliegaYVaga = (
  ejeDespliegue: 'X' | 'Y',
  eje: 'X' | 'Y',
  amp: number,
  semilla: 0 | 1 | 2,
): Keyframe[] => {
  const DESPLIEGUE = 0.32;
  const s = (v: number) => `scale${ejeDespliegue}(${v})`;
  return [
    { transform: `${s(0.15)} translate${eje}(0px)`, offset: 0 },
    { transform: `${s(1)} translate${eje}(0px)`, offset: DESPLIEGUE },
    ...lineaVaga(eje, amp, semilla)
      .slice(1)
      .map((k) => ({
        transform: `${s(1)} ${k['transform']}`,
        offset: Number((DESPLIEGUE + (1 - DESPLIEGUE) * (k.offset as number)).toFixed(4)),
      })),
  ];
};

/**
 * EL COMPÁS DE UNA FLECHA. Se agacha hacia adentro, sale, y regresa rebotando.
 *
 * La punta y el asta son DOS figuras que tienen que leerse como una sola: si se traslada la punta
 * y el asta se queda, la flecha se parte por la mitad. Y trasladar las dos tampoco sirve cuando el
 * asta nace pegada a otra cosa (el aro de `circle-arrow-*`, el marco de `square-arrow-*`): ahí lo
 * que hace el asta es ESTIRARSE lo mismo que la punta viaja, con el `origin` en su extremo fijo.
 *
 * De ahí que sean dos helpers y no uno: `puntaCompas` traslada, `astaCompas` escala, y los dos
 * comparten offsets para que el estirón caiga en el MISMO cuadro que el viaje. Si se desincronizan
 * los offsets, la flecha se ve de goma.
 *
 * `dir`: +1 sale hacia abajo/derecha, -1 hacia arriba/izquierda.
 * `salida`: cuánto viaja la punta hacia afuera, en unidades del viewBox.
 * `agache`: cuánto se mete antes — es lo que hace legible una salida corta (ver cicatriz del
 * margen: hacia afuera casi nunca hay más de 1 unidad).
 */
export const puntaCompas = (eje: 'X' | 'Y', dir: 1 | -1, salida = 2, agache = 1): Keyframe[] => [
  { transform: `translate${eje}(0px)`, offset: 0 },
  { transform: `translate${eje}(${-agache * dir}px)`, offset: 0.22 },
  { transform: `translate${eje}(${salida * dir}px)`, offset: 0.6 },
  { transform: `translate${eje}(${salida * 0.2 * dir}px)`, offset: 0.82 },
  { transform: `translate${eje}(0px)`, offset: 1 },
];

/**
 * El mismo compás, pero DIBUJÁNDOSE primero. Existe porque `shapes` admite UN track por figura:
 * no se pueden encadenar "primero el trazo, luego el gesto" como dos animaciones, hay que fundirlos
 * en una sola lista de keyframes. Los offsets se calculan a partir de los del compás (no copiados a
 * mano) justo para que punta y asta no se puedan desincronizar.
 */
const CON_TRAZO = 0.55;
const conTrazo = (kf: Keyframe[]): Keyframe[] => [
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: kf[0]['transform'], offset: 0 },
  { strokeDasharray: '1', strokeDashoffset: '1', opacity: '0', transform: kf[0]['transform'], offset: 0.17 },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1', transform: kf[0]['transform'], offset: 0.42 },
  ...kf.map((k) => ({
    strokeDasharray: '1',
    strokeDashoffset: '0',
    opacity: '1',
    transform: k['transform'],
    offset: Number((CON_TRAZO + (1 - CON_TRAZO) * (k.offset as number)).toFixed(4)),
  })),
];

export const puntaTrazoYCompas = (eje: 'X' | 'Y', dir: 1 | -1, salida = 2, agache = 1): Keyframe[] =>
  conTrazo(puntaCompas(eje, dir, salida, agache));

export const astaTrazoYCompas = (eje: 'X' | 'Y', largo: number, salida = 2, agache = 1): Keyframe[] =>
  conTrazo(astaCompas(eje, largo, salida, agache));

/** `largo` = cuánto mide el asta en unidades del viewBox. Los offsets son los de `puntaCompas`. */
export const astaCompas = (eje: 'X' | 'Y', largo: number, salida = 2, agache = 1): Keyframe[] => {
  const f = (d: number) => `scale${eje}(${Number(((largo + d) / largo).toFixed(4))})`;
  return [
    { transform: f(0), offset: 0 },
    { transform: f(-agache), offset: 0.22 },
    { transform: f(salida), offset: 0.6 },
    { transform: f(salida * 0.2), offset: 0.82 },
    { transform: f(0), offset: 1 },
  ];
};

export const SHIELD_GEAR_SPIN = /* @__PURE__ */ [
  { transform: 'scale(1) rotate(0deg)' },
  { transform: 'scale(1.15) rotate(360deg)' },
  { transform: 'scale(1) rotate(720deg)' },
];

/**
 * Una figura sola no tiene con qué escalonarse, así que late. Es el mismo pulso que `circle` usa
 * desde siempre para su aro pelado; aquí lo comparten todos los iconos de una sola pieza.
 */
/**
 * Rebote elastico de CIERRE: el icono se achata, se estira y se asienta.
 *
 * Va en el track raiz y despues de que el gesto termino, para separar un `default` de su `mark`
 * cuando los dos dibujan la misma insignia. Sin esto se veian identicos, y una variante que no se
 * distingue de otra no es una variante.
 *
 * Deforma a proposito (scaleX y scaleY en contra): un rebote que solo escala uniforme se lee como
 * un pulso, no como algo que cae y se acomoda.
 */
export const REBOTE_ELASTICO = /* @__PURE__ */ [
  { transform: 'scale(1, 1) translateY(0)' },
  { transform: 'scale(1.1, 0.9) translateY(1px)' },
  { transform: 'scale(0.94, 1.07) translateY(-2px)' },
  { transform: 'scale(1.02, 0.98) translateY(0)' },
  { transform: 'scale(1, 1) translateY(0)' },
];

export const LATIDO = /* @__PURE__ */ scaleSeq([1, 1.15, 1]);

/**
 * Trazo que se dibuja AL REVÉS de como está escrito el `d`. Con `pathLength="1"`, un
 * `strokeDashoffset` de −1 esconde el trazo por el OTRO extremo, así que al ir a 0 se revela
 * empezando por donde el path TERMINA.
 *
 * Existe porque el sentido del trazo a veces ES el significado (`trending-*`, la propagación de
 * `share-2`) y Lucide escribió esos paths en el sentido contrario al que se leen.
 */
export const TRAZO_INVERSO = /* @__PURE__ */ [
  { strokeDasharray: '1', strokeDashoffset: '-1', opacity: '0' },
  { strokeDasharray: '1', strokeDashoffset: '0', opacity: '1' },
];

/**
 * El divisor de un panel se mueve HACIA donde apunta su nombre y se SOSTIENE ahí, con regreso
 * rápido al final. Nunca un vaivén parejo: eso se lee ambiguo, no dice de qué lado está el panel.
 *
 * Vive aquí porque lo comparten `panel-*` (18 iconos) y `panels-*` (3). Duplicarlo era garantía
 * de que alguien ajustara el timing en una sola copia y nadie se enterara.
 */
export const PANEL_DIVIDER_LEFT = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(-2px)', offset: 0.35 },
  { transform: 'translateX(-2px)', offset: 0.75 },
  { transform: 'translateX(0)', offset: 1 },
];
export const PANEL_DIVIDER_RIGHT = /* @__PURE__ */ [
  { transform: 'translateX(0)', offset: 0 },
  { transform: 'translateX(2px)', offset: 0.35 },
  { transform: 'translateX(2px)', offset: 0.75 },
  { transform: 'translateX(0)', offset: 1 },
];
export const PANEL_DIVIDER_UP = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(-2px)', offset: 0.35 },
  { transform: 'translateY(-2px)', offset: 0.75 },
  { transform: 'translateY(0)', offset: 1 },
];
export const PANEL_DIVIDER_DOWN = /* @__PURE__ */ [
  { transform: 'translateY(0)', offset: 0 },
  { transform: 'translateY(2px)', offset: 0.35 },
  { transform: 'translateY(2px)', offset: 0.75 },
  { transform: 'translateY(0)', offset: 1 },
];

/**
 * La salida de `truck`: se resiste hacia la izquierda, sale disparado a la derecha y desaparece,
 * y reaparece por la izquierda para retomar su sitio.
 *
 * Vive aqui porque lo comparten `truck`, `truck-electric` y los catorce vehiculos con motor o de
 * dos ruedas, repartidos entre curated-icons.ts, icons/car.ts e icons/train.ts.
 */
export const SHOOT_OFF_KEYFRAMES = /* @__PURE__ */ [
  { transform: 'translateX(0)', opacity: '1', offset: 0 },
  { transform: 'translateX(-3px)', opacity: '1', offset: 0.18 },
  { transform: 'translateX(-3px)', opacity: '1', offset: 0.3 },
  { transform: 'translateX(26px)', opacity: '1', offset: 0.46 },
  { transform: 'translateX(26px)', opacity: '0', offset: 0.5 },
  { transform: 'translateX(-26px)', opacity: '0', offset: 0.54 },
  { transform: 'translateX(-26px)', opacity: '1', offset: 0.62 },
  { transform: 'translateX(0)', opacity: '1', offset: 1 },
];
