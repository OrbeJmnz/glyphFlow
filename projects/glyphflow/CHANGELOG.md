# glyphflow

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
