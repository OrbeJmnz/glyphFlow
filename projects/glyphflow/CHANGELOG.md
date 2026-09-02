# glyphflow

## 2.5.0

### Minor Changes

- [`0c09bc5`](https://github.com/OrbeJmnz/glyphFlow/commit/0c09bc5a5fe5460059a63691c3691536e0cba08e) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - `animation="default"` is finally honored — it was the one variant you could not ask for.

  When you don't name a variant, `<gf-icon>` picks its hover gesture by POSITION: with three or more
  it plays the THIRD, because the catalog orders them `draw`, `default`, and then the icon's
  expressive one (`rotate`, `find`, `turn`…). Naming a variant was supposed to override that. It did,
  for every name except one.

  The input was declared `animation = 'default'`, and `'default'` is a real variant name. So the
  resolver could not tell "the consumer left it alone" apart from "the consumer asked for `default`",
  and it broke the tie by throwing the value away:

  ```ts
  if (animation && animation !== 'default') return animation; // before
  if (animation) return animation; // now
  ```

  On `trash-2` (draw / default / active) that meant there was no way to keep the shake:
  `animation="default"` silently played `active` on hover instead. The sentinel is now `undefined`,
  which cannot collide with a catalog key, so the input carries no initializer.

  **What changes for you: only the path that was already being ignored.**

  - Not passing `animation` — identical. The positional convention still chooses the hover gesture,
    and the 1095 icons that depend on that order are untouched.
  - `animation="rotate"` — identical.
  - `animation="default"` — now respected instead of silently discarded. That is the fix, and nothing
    could have deliberately depended on its own input being dropped.

  `play()` and `play('variant')` behave exactly as before; neither ever went through the resolver.

  The public type goes from `animation: string` to `animation?: string` in the emitted `.d.ts`. This
  input is written, not read, so template bindings and `setInput` calls are unaffected — the looser
  type only surfaces if you hold a `GfIconComponent` reference and assign `.animation` into a
  `string`.

## 2.4.0

### Minor Changes

- [`3a24aca`](https://github.com/OrbeJmnz/glyphFlow/commit/3a24acabe307201c85f674b4dc6d1b3903f11fd5) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - Five new variants across 194 icons, and the `hold` variant is now actually visible on 219 more.

  **`strike`** — 79 icons in the `-off` family. They all share one anatomy: the base drawing plus a
  diagonal that crosses it out, so the gesture is derived from each icon's own geometry rather than
  written by hand. The diagonal draws corner to corner, the icon recoils as if it took the hit, and
  each figure dims at the moment the cut actually reaches it — its projection onto the cut's axis,
  measured from the corner where the blade enters its box and scaled by how long the stroke takes.
  `fish-off` and `screen-share-off` are the two exceptions: the first carries the diagonal fused into
  a compound path, the second has no diagonal at all.

  **`flip`** — 50 icons across 25 opposite pairs (`undo`/`redo`, `rotate-ccw`/`rotate-cw`,
  `chevron-up`/`chevron-down`, `thumbs-up`/`thumbs-down`, `skip-back`/`skip-forward`,
  `trending-up`/`trending-down`, `forward`/`reply`, `git-branch`/`git-merge`…). The icon shows its
  opposite, holds it for a beat, and comes back. The pairs weren't picked by name: all 1767 geometries
  were sampled point by point to find which ones are an exact mirror or half-turn of each other. There
  are 97 such pairs in the catalog; these 25 are the ones where reversing means something in a UI. On
  a plain directional arrow the direction _is_ the meaning, so those were left alone.

  **`nudge`** — the 22 `align-*` and the 14 `monitor-*`, two families that had nothing but `default`.
  The align icons perform the operation the button promises: the boxes start out of line and snap
  into place, moving perpendicular to their guides, which never move because they're the reference.
  The monitors tilt their screen on its hinge while the stand stays put, since it's resting on a desk.

  **`spin`** — the 21 `clock-*`, which until now didn't do the one thing a clock does. A full turn in
  twelve hard 30° steps: the ticking is a `steps()` easing, not extra keyframes. A whole turn on
  purpose — 360° ends where it started, so it returns to rest with nothing to hide.

  **`idle`** — the 8 `face-*` icons, none of which blinked. Ported from `cat`'s own `idle`, since the
  eyes are the same primitive. The head tilt pivots on the circle's center rather than the base of the
  neck: a circle is invariant under rotation about its own center, so the outline can't leave the
  canvas while the eyes and mouth still turn inside it.

  **Existing `hold` variants are now visible.** A `hold` retains its last keyframe, so that pose _is_
  the variant — and 258 of the 496 were leaving a pose under 1.2 viewBox units, indistinguishable from
  rest (`scale(1.04)`, `rotate(3deg)`, `translateY(-0.5px)`). 219 were amplified to a perceptible
  threshold, each one capped by measuring its figures' real bounding boxes so the bigger pose still
  fits the canvas. Ten were deliberately left subtle after review — on a car settling or a turtle
  barely peeking, restraint _is_ the gesture.

  **37 hover gestures got faster.** A `default` is what fires on hover and has to feel immediate; the
  slowest were taking up to 3 seconds. They now land in 1100 ms, with every duration and delay scaled
  by the same factor — same keyframes, same easing, same proportions between figures. Cyclical ones
  were left alone: `orbit` turns a full revolution, `radar` sweeps, `rocking-chair` rocks and the
  clouds drift. A cloud in a hurry isn't a cloud.

  Nothing was removed and no geometry changed. The `max-*` selectors and `Max*` symbols stay exported
  and deprecated, as they have since v2.

## 2.3.0

### Minor Changes

- [`0ff79c7`](https://github.com/OrbeJmnz/glyphFlow/commit/0ff79c7d045433e1b1c8b447d719ac81b0e83307) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - Reanimated 80 curated icons across `book`, `calendar`, `circle`, `clipboard`, `clock`, `cloud`,
  `copy`, `dice`, `grid`, `heading`, `image`, `map`, and `mouse`, and added a `hold` variant to
  several icons that didn't have one yet — `clock-arrow-down/left/right/up`, `log-out`, `cloud-sync`,
  `cloud-backup`, `clipboard-copy`.

  `clipboard-copy`'s `peel` used to move only its arrowhead while the shaft stayed put, splitting the
  arrow in two — both figures now draw and travel together, sharing the exact same keyframes so they
  can't drift apart. `copy-check/minus/plus/slash/x`'s `peel` was a bigger version of the same
  one-shot slide as `default`; it's now `copy`'s own `active` (the two sheets actually separate and
  hold) plus the badge drawing on top of the front sheet, mirroring the existing "badge mounted on
  the sheet" convention.

  `dice-1`…`dice-6` rolled around a corner of their own square instead of its center, outside the
  default 24px render size — a root-level transform needs a percentage origin (`50% 50%`), not `px`,
  since the engine only sets `transform-box: view-box` on child figures, never on the root `<svg>`.

  Fixed a real tree-shaking regression this batch introduced along the way: a non-trivial expression
  (a binary sum, a `.filter()`, a spread) written inline as an argument to an already-
  `/* @__PURE__ */`-annotated call kept Rollup from proving the whole call side-effect-free, so 8 of
  the touched icons stayed in every bundle — including the bare component with no icon imported at
  all. Precomputing those expressions into their own constants fixed it, and the measured numbers
  ended up BELOW the previous baseline: `core` 4.65 → 4.06 KB gzip, one icon 4.90 → 4.48 KB.

## 2.2.0

### Minor Changes

- [`341160b`](https://github.com/OrbeJmnz/glyphFlow/commit/341160baa7dab7387ae587ca3e84e93b170d2629) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - Interruptor global de movimiento: `provideGfIcons({ animationsEnabled: false })` deja todos los
  iconos quietos, `<gf-icon>` y `<gf-icon-morph>` incluidos.

  No sustituye a `prefers-reduced-motion`, que se sigue respetando por su cuenta. Cubre lo que la
  media query no puede: una aplicación con su propio ajuste de accesibilidad, donde el usuario apaga
  el movimiento DENTRO del producto sin tocar el sistema operativo. Hasta ahora la única salida era
  poner `respectReducedMotion` icono por icono, y aun así solo permitía seguir al sistema, nunca
  contradecirlo.

  Se lee en el momento de animar, igual que `durationScale`: un getter sobre una señal lo convierte
  en un interruptor vivo sin re-bootstrapear. En el morph la figura nueva se PINTA aunque no se
  interpole — saltarse la escritura dejaría en pantalla el icono anterior, que es peor que no animar.

  Aditivo y con default `true`: nada cambia para quien no lo declare.

## 2.1.0

### Minor Changes

- [`603ee15`](https://github.com/OrbeJmnz/glyphFlow/commit/603ee1587b988eaaa4c6c8db9e217f3280952962) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - `IconMeta.tags` ya viene poblado, y los sinónimos se exportan aparte como `ICON_TAGS`.

  Buscar un icono por su nombre exacto solo funciona si ya sabes cómo se llama. Lucide publica los
  sinónimos con los que indexa cada uno — `trash-2` trae `delete`, `remove`, `bin`, `garbage` — y
  hasta ahora el paquete los tiraba.

  ```ts
  import { ICON_TAGS } from 'glyphflow';

  ICON_TAGS['trash-2']; // ['garbage', 'delete', 'remove', 'bin']
  ```

  **`ICON_TAGS` va aparte del registro a propósito.** Colgados solo de `IconMeta`, buscar por sinónimo
  obligaría a importar `ICON_META`, que se construye sobre `ANIMATED_ICON_NAMES` y arrastra la
  geometría de los 1767. Así un buscador indexa los sinónimos sin bajar el catálogo. Quien ya tenga
  `ICON_META` en la mano los encuentra igual en `.tags`, sin pagar de nuevo.

  Los presupuestos no se movieron: los 1767 arrays se caen enteros por tree-shaking si nadie los
  importa. Medido contra la línea base — `core` 4.58 → 4.57 KB gzip, un icono suelto 4.83 → 4.83 KB,
  catálogo completo 119.10 → 119.11 KB.

  **`tags` es un campo REQUERIDO**, no opcional, porque los 1767 tienen al menos uno: verificado en
  las dos direcciones contra `lucide-static/tags.json`, y el generador aborta si algún día deja de ser
  cierto. Si construías un `IconMeta` a mano — un mock, un fixture — ahora tiene que incluir `tags`;
  leerlo, que es para lo que existe, no cambia.

## 2.0.0

### Major Changes

- [`1cefa2c`](https://github.com/OrbeJmnz/glyphFlow/commit/1cefa2cbf06a6b1f5eff0168de44d5a8a2922155) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - Un solo namespace público: `gf-`, y toda la API en inglés.

  El paquete se llamaba `glyphflow` pero sus componentes se llamaban `Max*`. Eran dos nombres de
  marca conviviendo en el mismo import, y la propia documentación gastaba un párrafo defendiendo el
  prefijo — con `mat-button` y `p-button` como ejemplos, que derivan de Material y de Prime. El
  equivalente de glyphFlow nunca fue `max-`, era `gf-`.

  Al mismo tiempo, `glyphflow/morph` exportaba doce símbolos en español, y los que más pesaban no
  eran las constantes sino las propiedades que se escriben en cada llamada.

  Va todo en UNA sola major a propósito: si hay que romper, se rompe una vez.

  ## Equivalencias

  | v1                                   | v2                            |
  | ------------------------------------ | ----------------------------- |
  | `MaxIconComponent`                   | `GfIconComponent`             |
  | `MaxIconMorphComponent`              | `GfIconMorphComponent`        |
  | `MaxIconsConfig`                     | `GfIconsConfig`               |
  | `MAX_ICONS_CONFIG`                   | `GF_ICONS_CONFIG`             |
  | `MAX_ICON_CATALOG`                   | `GF_ICON_CATALOG`             |
  | `provideMaxIcons()`                  | `provideGfIcons()`            |
  | `<max-icon>`                         | `<gf-icon>`                   |
  | `<max-icon-morph>`                   | `<gf-icon-morph>`             |
  | `PASOS_DEFAULT`                      | `STEPS_DEFAULT`               |
  | `RESOLUCION_DEFAULT`                 | `RESOLUTION_DEFAULT`          |
  | `COLA_DEFAULT`                       | `SPRING_TAIL_DEFAULT`         |
  | `opts.pasos`                         | `opts.steps`                  |
  | `opts.resolucion`                    | `opts.resolution`             |
  | `opts.cola`                          | `opts.tail`                   |
  | `opts.idaYVuelta`                    | `opts.roundTrip`              |
  | `opts.sobrepaso`                     | `opts.overshoot`              |
  | `MorphKeyframes.duracion`            | `.duration`                   |
  | `'completa' \| 'corta' \| 'recorte'` | `'full' \| 'short' \| 'clip'` |

  ## Nada de esto rompe hoy

  Todos los nombres de la izquierda siguen funcionando durante una minor, y no como promesa: hay
  tests que lo verifican.

  - Los símbolos viejos son **la misma referencia**, no copias. `MAX_ICONS_CONFIG` ES
    `GF_ICONS_CONFIG`, así que un `provideMaxIcons()` de la v1 alimenta al componente nuevo. Dos
    `InjectionToken` distintos no se ven entre sí, y ese fallo habría sido silencioso:
    `durationScale` ignorado, sin un error que lo delate.
  - **Los selectores viejos siguen montando**: `<max-icon>` y `<max-icon-morph>` están declarados
    junto a los nuevos. Un renombrado de selector es más peligroso que uno de símbolo — según el
    modo de compilación puede degradarse a elemento desconocido y dejar el icono invisible, sin
    error.
  - Las opciones de morph se leen con el nombre nuevo primero y el viejo después, y los valores en
    español se **traducen**, no se ignoran.

  ## Lo único que sí cambia de comportamiento

  `COLA_DEFAULT` cambió de **valor**, no solo de nombre: era `'corta'`, ahora es `'short'`. Pasarlo
  como opción sigue funcionando; compararlo contra un `'corta'` literal ahora da `false`.

  ## Al actualizar

  Un `find & replace` con la tabla de arriba y listo. Los avisos de `@deprecated` van marcando lo que
  falte, y nada deja de funcionar mientras tanto.

## 1.4.0

### Minor Changes

- [`c0f4414`](https://github.com/OrbeJmnz/glyphFlow/commit/c0f441441421126c779950ed3ee61ed6b4e86e48) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - La familia `git` completa pasa a coreografía a mano: **12 iconos** más curados, de 899 a **911**.

  `git-branch`, `git-branch-plus`, `git-commit-horizontal`, `git-commit-vertical`, `git-compare`,
  `git-compare-arrows`, `git-graph`, `git-merge`, `git-merge-conflict`, `git-pull-request`,
  `git-pull-request-closed` y `git-pull-request-create` dejan de tener solo el trazo automático.

  El criterio es el mismo en toda la familia y sigue lo que el icono significa: el círculo de origen
  se dibuja, luego su conector, luego el círculo de destino, y al final la figura que los une se
  inclina como un golpe de mazo y regresa a su posición. `git-compare-arrows` dibuja e inclina sus dos
  flechas EN SIMULTÁNEO, porque comparar es paralelo y no secuencial. Las marcas de conflicto y de
  cerrado —la X— tiemblan apenas terminan de dibujarse. `git-merge` pulsa al asentar en el círculo
  destino. Todo el ciclo por icono cabe en menos de un segundo, para que se vea completo en un hover
  normal.

  Esto además cierra un hueco visible: hasta ahora la familia se veía PARTIDA. En 1.3.0 aparecían
  `git-branch-minus` y `git-pull-request-draft` con coreografía, pero `git-branch` y
  `git-pull-request` —los iconos base— solo se dibujaban, porque estaban del lado generado. Se leía
  como catálogo incompleto, no como una frontera entre curado y generado.

  **No hay nada que romper al actualizar.** La superficie pública es idéntica: los mismos 1767 iconos
  exportados, ninguno perdido ni agregado. Los 12 ya se exportaban con el mismo nombre; lo que cambia
  es que ahora se mueven con intención en vez de solo dibujarse.

  Por dentro, `curated-icons.ts` se partió en un módulo por familia bajo `icons/` (de 19,687 a 6,118
  líneas), con el archivo original como barrel. Es reorganización de fuente y no toca el artefacto
  publicado: ng-packagr aplana todo a un solo FESM, y se verificó que la lista de exports del `.d.ts`
  queda byte por byte igual.

## 1.3.0

### Minor Changes

- [`28275b4`](https://github.com/OrbeJmnz/glyphFlow/commit/28275b4be1cb30641a379379f6fa0f3253de182c) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - El catálogo curado casi se duplica: de **405 a 899** iconos con coreografía a mano (el total de la
  librería sigue en 1767 — nada entra ni sale, solo se mueve de `generated-icons.ts` a
  `curated-icons.ts`). 494 de esos son nuevos: 487 portados de
  [ajitzero/animated-icons](https://github.com/ajitzero/animated-icons) (MIT © 2025 Ajit Panigrahi)
  a WAAPI nativa, más `menu`, `pause`, `lock-open`, `heart` y `move-right`, que quedaban con solo
  `draw` automático.

  Sobre ese port, una revisión completa figura por figura corrigió coreografía que estaba mal, no
  solo ausente:

  - **Rotaciones sin `transform-origin` explícito** (`bolt`, `orbit`, `refresh-ccw-dot`, `cctv`,
    `cloud-cog`, `columns-3-cog`, entre otros) pivotaban en la caja por default del navegador en vez
    del círculo o engrane central — visible como bamboleo, no giro limpio.
  - **Familia `-off`** (`cannabis-off`, `cctv-off`, `circle-slash-2`, `beef-off`, `square-off`,
    `wrench-off`, `webcam-off`) no traía la variante `alert` (shake) que ya comparte el resto de la
    familia.
  - **`dice-1`…`dice-6`** ahora giran sobre su propio eje, con pausa clara en cada cuarto de vuelta.
  - **`scan-*`**: variante `hold` nueva con las 4 esquinas expandiéndose — la dirección de cada
    esquina se corrigió por ícono, porque no todos comparten el mismo orden de figuras que
    `maximize`.
  - Once iconos más ganan variantes con nombre nuevas (`pulse` en 57 de la familia `file-*`,
    `receipt-*`, `notebook-*`, `mail-*` y otros; `active`, `hold`) sobre su animación existente.

  **No hay nada que romper al actualizar.** La superficie pública es idéntica a la de 1.2.0: mismo
  total de 1767 iconos exportados, nada perdido ni agregado. Los iconos que ya usabas por nombre
  siguen ahí; los que se movieron de generado a curado ahora tienen coreografía en vez de solo
  `draw`, y algunos de los 405 ya curados se mueven distinto a como se movían — con la geometría
  intacta, así que ningún layout cambia.

## 1.2.0

### Minor Changes

- [`c464092`](https://github.com/OrbeJmnz/glyphFlow/commit/c464092437be2e1f6a6f2a4274a833ab68b3f4e8) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - 225 iconos más pasan de solo trazo a coreografía a mano: el catálogo curado va de **180 a 405**.

  Es la fase 3 completa. Cada uno se escribió icono por icono — giros, resortes, trazos y rebotes elegidos para lo que ese símbolo significa, no aplicados en lote. Varios estrenan además variantes con nombre (`ring`, `pulse`, `drop`, `wander`) que se piden por `animation=`.

  **No hay nada que romper al actualizar.** La superficie pública es idéntica a la de 1.1.0: 1787 exports en el entry point principal y 19 en `glyphflow/morph`, sin uno solo perdido ni agregado. Los iconos afectados ya se exportaban con el mismo nombre; lo que cambia es que ahora tienen coreografía en vez de únicamente `draw`.

  Consecuencia que sí conviene saber: si venías usando alguno de esos 225, va a moverse distinto —con intención, no solo dibujándose. El `d` y las figuras no cambian, así que nada de layout se mueve.

## 1.1.0

### Minor Changes

- [`140ec52`](https://github.com/OrbeJmnz/glyphFlow/commit/140ec52109cdaa68dcaf2d350996d16f99ede7bb) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - Nuevo entry point `glyphflow/morph`: transición entre dos iconos sobre Web Animations API, con el
  mismo trato que el resto de la librería — cero dependencias de animación, cero loop en JS.

  ```html
  <max-icon-morph [icon]="abierto() ? equisIcon : menuIcon" label="Menú" />
  ```

  Un solo `[icon]`: cuando el valor cambia, la figura transiciona desde la anterior. Sin `from`/`to`
  ni `trigger` — el binding es el estado, así que hover, toggle y cambio de estado son el mismo
  mecanismo. Acepta cualquier icono del catálogo tal cual.

  - **El navegador interpola, nosotros no.** El plan de correspondencia (Procrustes 2D) se calcula una
    vez y se entrega como keyframes discretos; el resorte se integra offline y solo decide la duración
    y el reparto temporal. No hay `requestAnimationFrame` ni trabajo por frame.
  - **Reposo exacto.** En vuelo las poses son polilíneas (WAAPI solo interpola entre `d` con la misma
    estructura de comandos), pero al asentar se escribe el `d` canónico del destino: el DOM en reposo
    vuelve a ser curvas, no cientos de segmentos rectos.
  - **Interrumpible sin saltos.** Cambiar de destino a media transición arranca desde la forma que se
    está viendo, no desde el icono completo. Medido en navegador: el salto pasa de 3.72 a 0.25
    unidades sobre un lienzo de 24 — y aguanta interrumpir la interrupción.
  - **`prefers-reduced-motion`**: salta directo al icono nuevo sin animar. Se quita el movimiento, no
    el cambio de estado: quedarse quieto dejaría al usuario mirando el icono equivocado.
  - **Accesibilidad y tamaño idénticos a `<max-icon>`**, y honra el mismo
    `provideMaxIcons({ durationScale })`.
  - **Timing**: un solo preset de resorte, `smooth` (críticamente amortiguado). La API funcional
    también acepta un `{ k, c }` propio para quien quiera afinarlo. Los presets con rebote llegarán
    cuando el motor sepa dibujar el sobrepaso — no se publican nombres que todavía no cumplen.
  - **No le cuesta nada a quien no lo use**: entry point aparte, en su propio chunk. Importar un icono
    suelto sigue costando 3.57KB gzip.

  La API ya publicada no se toca: el `.d.ts` del entry point principal es byte por byte el de 1.0.0.

## 1.0.0

### Major Changes

- Primera versión estable: 1.0.0.

  Catálogo completo de Lucide 1.31 — **1767 iconos** (180 curados con coreografía a mano, figura
  por figura, y 1587 generados con trazo automático), animados sobre **Web Animations API nativa**:
  cero dependencias de animación, ni `@angular/animations` ni librerías de terceros.

  - **Tree-shakeable de verdad, medido**: importar un icono por su `export const` cuesta 3.57KB gzip
    contra 93.87KB del catálogo completo. La ruta por `name=` (que sí arrastra el registro) es
    opt-in vía `provideIconCatalog()`.
  - **SSR-safe**: renderiza en Node sin `window`/`document`, verificado con `@angular/platform-server`.
  - **Angular 20, 21 y 22**: cada versión se prueba instalando el tarball real en una app consumidora
    recién scaffoldeada con el CLI de ESA versión, no dentro del workspace.
  - Accesibilidad de fábrica: `decorative` por defecto (`aria-hidden`), `label` lo vuelve semántico,
    y `respectReducedMotion` honra `prefers-reduced-motion`.
