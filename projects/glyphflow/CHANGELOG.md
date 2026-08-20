# glyphflow

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
