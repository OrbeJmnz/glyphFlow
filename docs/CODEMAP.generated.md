# CODEMAP (generado)

> ⚙️ **Archivo generado por `codemap.mjs` — NO editar a mano.** Se regenera desde el código.
> Inventario estructural (`qué hay y dónde`). El mapa curado de dominio/flujos vive en [`CODEMAP.md`](CODEMAP.md) (si existe); el `porqué/estado` vive en Engram.

**Stack:** Angular · **Raíz escaneada:** `.` · **162 archivos** · 155 ts · 2 component · 2 config · 1 model · 1 routes · 1 service

## core  `(18)`

| Archivo | Tipo | Símbolo | Resumen |
|---|---|---|---|
| [projects/playground/src/app/core/cifras.ts](../projects/playground/src/app/core/cifras.ts) | ts | `CIFRAS` | Las cifras de portada — las mismas en el hero y en el menú móvil. Solo `curados` sale del |
| [projects/playground/src/app/core/densidad.ts](../projects/playground/src/app/core/densidad.ts) | ts | `elegirDensidad` |  |
| [projects/playground/src/app/core/duration-scale.ts](../projects/playground/src/app/core/duration-scale.ts) | ts | `elegirVelocidad` | Velocidad global de las animaciones, movible en vivo desde la UI. 2 = el doble de rápido. |
| [projects/playground/src/app/core/enlaces-idioma.ts](../projects/playground/src/app/core/enlaces-idioma.ts) | ts | `conectarEnlacesDeIdioma` | `hreflang` recíproco + `canonical`, reescritos en cada navegación. |
| [projects/playground/src/app/core/github.ts](../projects/playground/src/app/core/github.ts) | ts | `cargarEstrellas` | Solo lo que se usa. Declarado como propiedad y no como índice: `noPropertyAccessFromIndexS |
| [projects/playground/src/app/core/i18n-loader.server.ts](../projects/playground/src/app/core/i18n-loader.server.ts) | ts | `RaizI18nLoaderServidor` |  |
| [projects/playground/src/app/core/i18n-loader.ts](../projects/playground/src/app/core/i18n-loader.ts) | ts | `RaizI18nLoader` |  |
| [projects/playground/src/app/core/i18n-testing.ts](../projects/playground/src/app/core/i18n-testing.ts) | ts | `providersI18nTest` |  |
| [projects/playground/src/app/core/i18n.ts](../projects/playground/src/app/core/i18n.ts) | ts | `provideI18n` |  |
| [projects/playground/src/app/core/idioma.ts](../projects/playground/src/app/core/idioma.ts) | ts | `esIdioma` | Los dos idiomas del sitio y dónde se recuerda la elección. Sin Angular y sin Transloco a |
| [projects/playground/src/app/core/morph-icon-plano.ts](../projects/playground/src/app/core/morph-icon-plano.ts) | ts | `iconoPlano` |  |
| [projects/playground/src/app/core/rutas.service.ts](../projects/playground/src/app/core/rutas.service.ts) | service | `Rutas` |  |
| [projects/playground/src/app/core/rutas.ts](../projects/playground/src/app/core/rutas.ts) | ts | `slug` |  |
| [projects/playground/src/app/core/sitio.ts](../projects/playground/src/app/core/sitio.ts) | ts | `ORIGEN` | El origen canónico del sitio. Constante y no `location.origin`, por dos razones que se ven |
| [projects/playground/src/app/core/taller.ts](../projects/playground/src/app/core/taller.ts) | ts | `Taller` |  |
| [projects/playground/src/app/core/tema.ts](../projects/playground/src/app/core/tema.ts) | ts | `alternarTema` |  |
| [projects/playground/src/app/core/transicion.ts](../projects/playground/src/app/core/transicion.ts) | ts | `registrarExterna` | Registra una transición que abrió OTRO (hoy: el router de Angular, vía `onViewTransitionCr |
| [projects/playground/src/app/core/translated-title-strategy.ts](../projects/playground/src/app/core/translated-title-strategy.ts) | ts | `TranslatedTitleStrategy` | `route.title` ya no es el texto de la pestaña — es una CLAVE de traducción (`routes.iconos |

## features/docs  `(6)`

| Archivo | Tipo | Símbolo | Resumen |
|---|---|---|---|
| [projects/playground/src/app/features/docs/accesibilidad.ts](../projects/playground/src/app/features/docs/accesibilidad.ts) | ts | `app-docs-accesibilidad` |  |
| [projects/playground/src/app/features/docs/api-surface.ts](../projects/playground/src/app/features/docs/api-surface.ts) | ts | `xIcon` | La superficie pública de glyphflow, como DATO. |
| [projects/playground/src/app/features/docs/api.ts](../projects/playground/src/app/features/docs/api.ts) | ts | `app-docs-api` |  |
| [projects/playground/src/app/features/docs/docs.ts](../projects/playground/src/app/features/docs/docs.ts) | ts | `app-docs` |  |
| [projects/playground/src/app/features/docs/empezando.ts](../projects/playground/src/app/features/docs/empezando.ts) | ts | `app-docs-empezando` |  |
| [projects/playground/src/app/features/docs/ssr.ts](../projects/playground/src/app/features/docs/ssr.ts) | ts | `app-docs-ssr` |  |

## features/editor  `(5)`

| Archivo | Tipo | Símbolo | Resumen |
|---|---|---|---|
| [projects/playground/src/app/features/editor/editor.ts](../projects/playground/src/app/features/editor/editor.ts) | ts | `app-editor` |  |
| [projects/playground/src/app/features/editor/geometria/historial.ts](../projects/playground/src/app/features/editor/geometria/historial.ts) | ts | `crearHistorial` | Pila de deshacer/rehacer sobre estados inmutables. |
| [projects/playground/src/app/features/editor/geometria/path-edit.ts](../projects/playground/src/app/features/editor/geometria/path-edit.ts) | ts | `nodosDe` |  |
| [projects/playground/src/app/features/editor/geometria/path-model.ts](../projects/playground/src/app/features/editor/geometria/path-model.ts) | ts | `numerosDe` | Comandos de path que aparecen en el catálogo, más Q/T por si Lucide los estrena. |
| [projects/playground/src/app/features/editor/geometria/path-split.ts](../projects/playground/src/app/features/editor/geometria/path-split.ts) | ts | `arcoACentro` |  |

## features/iconos  `(8)`

| Archivo | Tipo | Símbolo | Resumen |
|---|---|---|---|
| [projects/playground/src/app/features/iconos/buscador.ts](../projects/playground/src/app/features/iconos/buscador.ts) | ts | `normalizar` | Relevancia del buscador del catálogo. Módulo puro: sin Angular, sin señales, sin DOM — así |
| [projects/playground/src/app/features/iconos/icon-badges.ts](../projects/playground/src/app/features/iconos/icon-badges.ts) | ts | `insigniasDe` | La taxonomía de los filtros del grid: cómo se parte un catálogo de cientos en grupos que v |
| [projects/playground/src/app/features/iconos/icon-detail-panel.ts](../projects/playground/src/app/features/iconos/icon-detail-panel.ts) | ts | `app-icon-detail-panel` |  |
| [projects/playground/src/app/features/iconos/icon-name.ts](../projects/playground/src/app/features/iconos/icon-name.ts) | ts | `nombreDeConst` | `refresh-cw` → `refreshCwIcon`. La convención real de `curated-icons.ts` (verificada contr |
| [projects/playground/src/app/features/iconos/icon-scrubber.ts](../projects/playground/src/app/features/iconos/icon-scrubber.ts) | ts | `app-icon-scrubber` | Scrubber manual (t = 0 → 1) sobre la coreografía de una variante. NO es una capacidad nuev |
| [projects/playground/src/app/features/iconos/iconos.ts](../projects/playground/src/app/features/iconos/iconos.ts) | ts | `app-alert` |  |
| [projects/playground/src/app/features/iconos/motion-inspector.ts](../projects/playground/src/app/features/iconos/motion-inspector.ts) | ts | `analizarIcono` | Motion Inspector: análisis puro sobre datos que ya existen en `MotionTrack`/`IconChoreogra |
| [projects/playground/src/app/features/iconos/nombres-generados.ts](../projects/playground/src/app/features/iconos/nombres-generados.ts) | ts | `NOMBRES_GENERADOS` | Los 856 iconos que existen en el catálogo con trazo automático y sin coreografía. |

## features/lab  `(5)`

| Archivo | Tipo | Símbolo | Resumen |
|---|---|---|---|
| [projects/playground/src/app/features/lab/icon-import.ts](../projects/playground/src/app/features/lab/icon-import.ts) | ts | `app-icon-import` | El otro lado del "Exportar JSON" del panel de detalle: pega el JSON de vuelta y se previsu |
| [projects/playground/src/app/features/lab/icon-node.ts](../projects/playground/src/app/features/lab/icon-node.ts) | ts | `aIconNode` | `AnimatedIconDef` → data estilo Lucide (`[tag, attrs][]`), que es lo que come la API FUNCI |
| [projects/playground/src/app/features/lab/lab.ts](../projects/playground/src/app/features/lab/lab.ts) | ts | `app-lab` | Las herramientas de autoría, juntas y fuera del showcase. |
| [projects/playground/src/app/features/lab/morph-bench.ts](../projects/playground/src/app/features/lab/morph-bench.ts) | ts | `app-morph-bench` |  |
| [projects/playground/src/app/features/lab/morph-picker.ts](../projects/playground/src/app/features/lab/morph-picker.ts) | ts | `app-morph-picker` |  |

## features/patrones  `(1)`

| Archivo | Tipo | Símbolo | Resumen |
|---|---|---|---|
| [projects/playground/src/app/features/patrones/patrones.ts](../projects/playground/src/app/features/patrones/patrones.ts) | ts | `app-patrones` |  |

## shared  `(13)`

| Archivo | Tipo | Símbolo | Resumen |
|---|---|---|---|
| [projects/playground/src/app/shared/marca/boton-donar.ts](../projects/playground/src/app/shared/marca/boton-donar.ts) | ts | `app-boton-donar` |  |
| [projects/playground/src/app/shared/marca/boton-github.ts](../projects/playground/src/app/shared/marca/boton-github.ts) | ts | `app-boton-github` |  |
| [projects/playground/src/app/shared/marca/logo.ts](../projects/playground/src/app/shared/marca/logo.ts) | ts | `app-logo` |  |
| [projects/playground/src/app/shared/ui/boton.ts](../projects/playground/src/app/shared/ui/boton.ts) | ts | `button[app-boton], a[app-boton]` |  |
| [projects/playground/src/app/shared/ui/campo-busqueda.ts](../projects/playground/src/app/shared/ui/campo-busqueda.ts) | ts | `app-campo-busqueda` | El campo de búsqueda: filtrar los curados en el editor, y elegir iconos en el picker del l |
| [projects/playground/src/app/shared/ui/carril-activo.ts](../projects/playground/src/app/shared/ui/carril-activo.ts) | ts | `[appCarrilActivo]` | Publica dónde está el hijo `.activo` como variables CSS del host: `--ind-x`, `--ind-w` y |
| [projects/playground/src/app/shared/ui/chip.ts](../projects/playground/src/app/shared/ui/chip.ts) | ts | `button[app-chip], a[app-chip]` |  |
| [projects/playground/src/app/shared/ui/contador.ts](../projects/playground/src/app/shared/ui/contador.ts) | ts | `app-contador` | Cuenta de 0 al valor final al montarse — no con WAAPI (que anima propiedades CSS, no texto |
| [projects/playground/src/app/shared/ui/deslizador.ts](../projects/playground/src/app/shared/ui/deslizador.ts) | ts | `app-deslizador` | El deslizador. Hoy lo usa el scrubber para recorrer una animación con la mano. |
| [projects/playground/src/app/shared/ui/grupo.ts](../projects/playground/src/app/shared/ui/grupo.ts) | ts | `app-grupo` | El contenedor de un grupo de controles relacionados donde normalmente uno está activo: la |
| [projects/playground/src/app/shared/ui/nombre-transicion.ts](../projects/playground/src/app/shared/ui/nombre-transicion.ts) | ts | `[appNombreTransicion]` | Pone `view-transition-name` en un elemento SOLO mientras está cerca de la pantalla. |
| [projects/playground/src/app/shared/ui/titulo-si-truncado.ts](../projects/playground/src/app/shared/ui/titulo-si-truncado.ts) | ts | `[appTituloSiTruncado]` | Pone `title` en el host **solo si** su etiqueta `[data-name]` viene cortada con elipsis. |
| [projects/playground/src/app/shared/ui/tooltip.ts](../projects/playground/src/app/shared/ui/tooltip.ts) | ts | `app-tooltip` | Envuelve un trigger y muestra `texto` en una burbuja al hover/focus. Sin posicionamiento |

## (app)  `(4)`

| Archivo | Tipo | Símbolo | Resumen |
|---|---|---|---|
| [projects/playground/src/app/app.config.server.ts](../projects/playground/src/app/app.config.server.ts) | ts | `serverConfig` | Config del prerender. Se fusiona con la del navegador en vez de duplicarla: el sitio se |
| [projects/playground/src/app/app.config.ts](../projects/playground/src/app/app.config.ts) | config | `appConfig` |  |
| [projects/playground/src/app/app.routes.ts](../projects/playground/src/app/app.routes.ts) | routes | `routes` |  |
| [projects/playground/src/app/app.ts](../projects/playground/src/app/app.ts) | ts | `app-root` |  |

## projects  `(95)`

| Archivo | Tipo | Símbolo | Resumen |
|---|---|---|---|
| [projects/glyphflow/morph/src/core/interpolate.ts](../projects/glyphflow/morph/src/core/interpolate.ts) | ts | `allocOutputs` | Polar interpolation: the similarity is interpolated in its natural space |
| [projects/glyphflow/morph/src/core/normalize.ts](../projects/glyphflow/morph/src/core/normalize.ts) | ts | `iconToCubics` | Normalization: any SVG primitive → cubic Bézier segments. |
| [projects/glyphflow/morph/src/core/parse.ts](../projects/glyphflow/morph/src/core/parse.ts) | ts | `parsePath` | Raw absolute segment (shorthands already resolved), as a labeled tuple — |
| [projects/glyphflow/morph/src/core/plan.ts](../projects/glyphflow/morph/src/core/plan.ts) | ts | `centroid` | Correspondence and alignment. Closed-form 2D Procrustes (no SVD: atan2), |
| [projects/glyphflow/morph/src/core/resample.ts](../projects/glyphflow/morph/src/core/resample.ts) | ts | `detectCorners` | Arc-length resampling with anchored corners. |
| [projects/glyphflow/morph/src/core/serialize.ts](../projects/glyphflow/morph/src/core/serialize.ts) | ts | `serialize` | Serialization. In flight each subpath is emitted as a polyline |
| [projects/glyphflow/morph/src/core/spring.ts](../projects/glyphflow/morph/src/core/spring.ts) | ts | `Spring` | Spring: damped harmonic oscillator over the progress x: 0 → 1, |
| [projects/glyphflow/morph/src/core/types.ts](../projects/glyphflow/morph/src/core/types.ts) | ts | `segCount` | Attributes of an icon node (values as Lucide exports them: string or |
| [projects/glyphflow/morph/src/gf-icon-morph.component.ts](../projects/glyphflow/morph/src/gf-icon-morph.component.ts) | component | `gf-icon-morph, max-icon-morph` | Por NOMBRE DE PAQUETE, no por ruta relativa: `glyphflow/morph` es un entry point secundari |
| [projects/glyphflow/morph/src/morph-keyframes.ts](../projects/glyphflow/morph/src/morph-keyframes.ts) | ts | `morphKeyframes` |  |
| [projects/glyphflow/morph/src/public-api.ts](../projects/glyphflow/morph/src/public-api.ts) | ts |  | Superficie pública de `glyphflow/morph` — entry point secundario, su propio chunk: quien n |
| [projects/glyphflow/src/lib/icon/animated-icon.model.ts](../projects/glyphflow/src/lib/icon/animated-icon.model.ts) | model |  | Figura del icono. Campos opcionales a propósito (en vez de una unión discriminada) porque  |
| [projects/glyphflow/src/lib/icon/animated-icons.registry.ts](../projects/glyphflow/src/lib/icon/animated-icons.registry.ts) | ts | `resolveIconName` | Composición final: generado primero, curado al final — un argumento posterior de |
| [projects/glyphflow/src/lib/icon/animated-icons.shapes.ts](../projects/glyphflow/src/lib/icon/animated-icons.shapes.ts) | ts | `bellShapes` | Cada figura es un |
| [projects/glyphflow/src/lib/icon/choreography.ts](../projects/glyphflow/src/lib/icon/choreography.ts) | ts | `EASE` | Se re-exportan para que `curated-icons.ts` siga teniendo UN solo lugar de donde importar |
| [projects/glyphflow/src/lib/icon/curated-audit.ts](../projects/glyphflow/src/lib/icon/curated-audit.ts) | ts | `shapeFingerprint` | `path:1a2b3c4d5e6f` — el tag va al frente para que el lock se lea de un vistazo en el PR. |
| [projects/glyphflow/src/lib/icon/curated-icons.ts](../projects/glyphflow/src/lib/icon/curated-icons.ts) | ts | `checkIcon` | Catálogo CURADO — coreografía con intención, a mano, icono por icono. El generador offline |
| [projects/glyphflow/src/lib/icon/generated-icons.ts](../projects/glyphflow/src/lib/icon/generated-icons.ts) | ts | `aArrowDownIcon` | AUTO-GENERADO por scripts/generate-lucide-icons.ts desde lucide-static@1.31.0. |
| [projects/glyphflow/src/lib/icon/gf-icon.component.ts](../projects/glyphflow/src/lib/icon/gf-icon.component.ts) | component | `gf-icon, max-icon` | Icono animado con coreografía por figura. |
| [projects/glyphflow/src/lib/icon/gf-icons.config.ts](../projects/glyphflow/src/lib/icon/gf-icons.config.ts) | config | `provideGfIcons` | Config global opcional. Sin `provideGfIcons(...)` en ningún injector, el valor por defecto |
| [projects/glyphflow/src/lib/icon/icon-catalog.provider.ts](../projects/glyphflow/src/lib/icon/icon-catalog.provider.ts) | ts | `provideIconCatalog` |  |
| [projects/glyphflow/src/lib/icon/icon-tags.ts](../projects/glyphflow/src/lib/icon/icon-tags.ts) | ts | `ICON_TAGS` | AUTO-GENERADO por scripts/generate-lucide-icons.ts desde lucide-static@1.31.0. |
| [projects/glyphflow/src/lib/icon/icons/_shared.ts](../projects/glyphflow/src/lib/icon/icons/_shared.ts) | ts | `COPY_PEEL` | Copiado y confirmado: la misma separación de copy y la palomita se dibuja de insignia. |
| [projects/glyphflow/src/lib/icon/icons/alarm.ts](../projects/glyphflow/src/lib/icon/icons/alarm.ts) | ts | `alarmClockIcon` | Despertador sonando: campanas y patas se sacuden juntas. |
| [projects/glyphflow/src/lib/icon/icons/arrow.ts](../projects/glyphflow/src/lib/icon/icons/arrow.ts) | ts | `arrowDownFromLineIcon` | Familia `arrow` del catálogo curado (42 iconos). |
| [projects/glyphflow/src/lib/icon/icons/badge.ts](../projects/glyphflow/src/lib/icon/icons/badge.ts) | ts | `badgeCheckIcon` | Familia `badge` del catálogo curado (17 iconos). |
| [projects/glyphflow/src/lib/icon/icons/battery.ts](../projects/glyphflow/src/lib/icon/icons/battery.ts) | ts | `batteryChargingIcon` | Familia `battery` del catálogo curado (6 iconos). |
| [projects/glyphflow/src/lib/icon/icons/bell.ts](../projects/glyphflow/src/lib/icon/icons/bell.ts) | ts | `bellIcon` | Cuerpo 0.9s y badajo 1.1s: ese desfase ES el efecto (portado de Animate UI). |
| [projects/glyphflow/src/lib/icon/icons/between.ts](../projects/glyphflow/src/lib/icon/icons/between.ts) | ts | `betweenHorizontalEndIcon` | Familia `between` del catálogo curado (4 iconos). |
| [projects/glyphflow/src/lib/icon/icons/book.ts](../projects/glyphflow/src/lib/icon/icons/book.ts) | ts | `bookAIcon` | Familia `book` del catálogo curado (23 iconos). |
| [projects/glyphflow/src/lib/icon/icons/bookmark.ts](../projects/glyphflow/src/lib/icon/icons/bookmark.ts) | ts | `bookmarkIcon` | Familia `bookmark` del catálogo curado (6 iconos). |
| [projects/glyphflow/src/lib/icon/icons/briefcase.ts](../projects/glyphflow/src/lib/icon/icons/briefcase.ts) | ts | `briefcaseBusinessIcon` | Familia `briefcase` del catálogo curado (3 iconos). |
| [projects/glyphflow/src/lib/icon/icons/calendar.ts](../projects/glyphflow/src/lib/icon/icons/calendar.ts) | ts | `calendarIcon` | Calendario: las dos anillas rebotan escalonadas, el cuerpo quieto. |
| [projects/glyphflow/src/lib/icon/icons/chart.ts](../projects/glyphflow/src/lib/icon/icons/chart.ts) | ts | `chartAreaIcon` | Familia `chart` del catálogo curado (23 iconos). |
| [projects/glyphflow/src/lib/icon/icons/chevron.ts](../projects/glyphflow/src/lib/icon/icons/chevron.ts) | ts | `chevronRightIcon` | Empujoncito hacia donde lleva. Sostenido mientras dure el hover. |
| [projects/glyphflow/src/lib/icon/icons/chevrons.ts](../projects/glyphflow/src/lib/icon/icons/chevrons.ts) | ts | `chevronsDownUpIcon` | Familia `chevrons` del catálogo curado (8 iconos). |
| [projects/glyphflow/src/lib/icon/icons/circle.ts](../projects/glyphflow/src/lib/icon/icons/circle.ts) | ts | `circleDotIcon` | Familia `circle` del catálogo curado (31 iconos). |
| [projects/glyphflow/src/lib/icon/icons/clipboard.ts](../projects/glyphflow/src/lib/icon/icons/clipboard.ts) | ts | `clipboardIcon` | Familia `clipboard` del catálogo curado (12 iconos). |
| [projects/glyphflow/src/lib/icon/icons/clock.ts](../projects/glyphflow/src/lib/icon/icons/clock.ts) | ts | `clock1Icon` | Familia `clock` del catálogo curado (13 iconos). |
| [projects/glyphflow/src/lib/icon/icons/cloud.ts](../projects/glyphflow/src/lib/icon/icons/cloud.ts) | ts | `cloudCogIcon` | Familia `cloud` del catálogo curado (7 iconos). |
| [projects/glyphflow/src/lib/icon/icons/copy.ts](../projects/glyphflow/src/lib/icon/icons/copy.ts) | ts | `copyIcon` | Familia `copy` del catálogo curado (6 iconos). |
| [projects/glyphflow/src/lib/icon/icons/database.ts](../projects/glyphflow/src/lib/icon/icons/database.ts) | ts | `databaseCheckIcon` | Familia `database` del catálogo curado (3 iconos). |
| [projects/glyphflow/src/lib/icon/icons/dice.ts](../projects/glyphflow/src/lib/icon/icons/dice.ts) | ts | `dice1Icon` | Familia `dice` del catálogo curado (6 iconos). |
| [projects/glyphflow/src/lib/icon/icons/file.ts](../projects/glyphflow/src/lib/icon/icons/file.ts) | ts | `fileAxis3dIcon` | Familia `file` del catálogo curado (37 iconos). |
| [projects/glyphflow/src/lib/icon/icons/folder.ts](../projects/glyphflow/src/lib/icon/icons/folder.ts) | ts | `folderOpenIcon` | Carpeta que se abre y levanta. |
| [projects/glyphflow/src/lib/icon/icons/gallery.ts](../projects/glyphflow/src/lib/icon/icons/gallery.ts) | ts | `galleryHorizontalEndIcon` | Familia `gallery` del catálogo curado (4 iconos). |
| [projects/glyphflow/src/lib/icon/icons/git.ts](../projects/glyphflow/src/lib/icon/icons/git.ts) | ts | `gitBranchMinusIcon` | Familia `git` del catálogo curado (17 iconos). |
| [projects/glyphflow/src/lib/icon/icons/globe.ts](../projects/glyphflow/src/lib/icon/icons/globe.ts) | ts | `globeIcon` | Globo girando: achicar el meridiano en X lee como rotación sin deformar nada. |
| [projects/glyphflow/src/lib/icon/icons/grid.ts](../projects/glyphflow/src/lib/icon/icons/grid.ts) | ts | `grid2x2Icon` | Familia `grid` del catálogo curado (4 iconos). |
| [projects/glyphflow/src/lib/icon/icons/grip.ts](../projects/glyphflow/src/lib/icon/icons/grip.ts) | ts | `gripHorizontalIcon` | Familia `grip` del catálogo curado (3 iconos). |
| [projects/glyphflow/src/lib/icon/icons/hard.ts](../projects/glyphflow/src/lib/icon/icons/hard.ts) | ts | `hardDriveDownloadIcon` | Familia `hard` del catálogo curado (3 iconos). |
| [projects/glyphflow/src/lib/icon/icons/heart.ts](../projects/glyphflow/src/lib/icon/icons/heart.ts) | ts | `heartIcon` | El corazón base — cierra la familia: sus cinco hermanos (`heart-crack`, `-handshake`, `-mi |
| [projects/glyphflow/src/lib/icon/icons/house.ts](../projects/glyphflow/src/lib/icon/icons/house.ts) | ts | `houseHeartIcon` | Familia `house` del catálogo curado (3 iconos). |
| [projects/glyphflow/src/lib/icon/icons/image.ts](../projects/glyphflow/src/lib/icon/icons/image.ts) | ts | `imageIcon` | Foto: sale el sol y luego el paisaje. |
| [projects/glyphflow/src/lib/icon/icons/key.ts](../projects/glyphflow/src/lib/icon/icons/key.ts) | ts | `keySquareIcon` | Familia `key` del catálogo curado (3 iconos). |
| [projects/glyphflow/src/lib/icon/icons/layout.ts](../projects/glyphflow/src/lib/icon/icons/layout.ts) | ts | `layoutDashboardIcon` | Tablero armándose, tarjeta por tarjeta. |
| [projects/glyphflow/src/lib/icon/icons/link.ts](../projects/glyphflow/src/lib/icon/icons/link.ts) | ts | `link2OffIcon` | Familia `link` del catálogo curado (3 iconos). |
| [projects/glyphflow/src/lib/icon/icons/list.ts](../projects/glyphflow/src/lib/icon/icons/list.ts) | ts | `listFilterPlusIcon` | Familia `list` del catálogo curado (6 iconos). |
| [projects/glyphflow/src/lib/icon/icons/lock.ts](../projects/glyphflow/src/lib/icon/icons/lock.ts) | ts | `lockKeyholeOpenIcon` | Familia `lock` del catálogo curado (3 iconos). |
| [projects/glyphflow/src/lib/icon/icons/map.ts](../projects/glyphflow/src/lib/icon/icons/map.ts) | ts | `mapPinOffIcon` | Familia `map` del catálogo curado (13 iconos). |
| [projects/glyphflow/src/lib/icon/icons/message.ts](../projects/glyphflow/src/lib/icon/icons/message.ts) | ts | `messageCircleCheckIcon` | Familia `message` del catálogo curado (12 iconos). |
| [projects/glyphflow/src/lib/icon/icons/monitor.ts](../projects/glyphflow/src/lib/icon/icons/monitor.ts) | ts | `monitorCloudIcon` | Familia `monitor` del catálogo curado (14 iconos). |
| [projects/glyphflow/src/lib/icon/icons/mouse.ts](../projects/glyphflow/src/lib/icon/icons/mouse.ts) | ts | `mousePointerClickIcon` | Clic: el cursor se hunde y las chispas salen DESPUÉS del golpe. Si salen juntas, no es cli |
| [projects/glyphflow/src/lib/icon/icons/move.ts](../projects/glyphflow/src/lib/icon/icons/move.ts) | ts | `moveDiagonal2Icon` | Familia `move` del catálogo curado (12 iconos). |
| [projects/glyphflow/src/lib/icon/icons/navigation.ts](../projects/glyphflow/src/lib/icon/icons/navigation.ts) | ts | `navigation2OffIcon` | Familia `navigation` del catálogo curado (3 iconos). |
| [projects/glyphflow/src/lib/icon/icons/notebook.ts](../projects/glyphflow/src/lib/icon/icons/notebook.ts) | ts | `notebookTabsIcon` | Familia `notebook` del catálogo curado (3 iconos). |
| [projects/glyphflow/src/lib/icon/icons/package.ts](../projects/glyphflow/src/lib/icon/icons/package.ts) | ts | `packageIcon` | Paquete que aterriza. |
| [projects/glyphflow/src/lib/icon/icons/panel.ts](../projects/glyphflow/src/lib/icon/icons/panel.ts) | ts | `panelLeftIcon` | Panel: el divisor se desliza a la izquierda — "left" es el nombre, no solo la etiqueta. |
| [projects/glyphflow/src/lib/icon/icons/pen.ts](../projects/glyphflow/src/lib/icon/icons/pen.ts) | ts | `penOffIcon` | Familia `pen` del catálogo curado (3 iconos). |
| [projects/glyphflow/src/lib/icon/icons/pencil.ts](../projects/glyphflow/src/lib/icon/icons/pencil.ts) | ts | `pencilLineIcon` | Familia `pencil` del catálogo curado (3 iconos). |
| [projects/glyphflow/src/lib/icon/icons/radio.ts](../projects/glyphflow/src/lib/icon/icons/radio.ts) | ts | `radioOffIcon` | Familia `radio` del catálogo curado (3 iconos). |
| [projects/glyphflow/src/lib/icon/icons/receipt.ts](../projects/glyphflow/src/lib/icon/icons/receipt.ts) | ts | `receiptJapaneseYenIcon` | Familia `receipt` del catálogo curado (4 iconos). |
| [projects/glyphflow/src/lib/icon/icons/refresh.ts](../projects/glyphflow/src/lib/icon/icons/refresh.ts) | ts | `refreshCcwDotIcon` | Familia `refresh` del catálogo curado (4 iconos). |
| [projects/glyphflow/src/lib/icon/icons/rotate.ts](../projects/glyphflow/src/lib/icon/icons/rotate.ts) | ts | `rotateCcwKeyIcon` | Familia `rotate` del catálogo curado (4 iconos). |
| [projects/glyphflow/src/lib/icon/icons/save.ts](../projects/glyphflow/src/lib/icon/icons/save.ts) | ts | `saveIcon` | Guardar: se hunde como un botón físico. |
| [projects/glyphflow/src/lib/icon/icons/scan.ts](../projects/glyphflow/src/lib/icon/icons/scan.ts) | ts | `scanBarcodeIcon` | Familia `scan` del catálogo curado (9 iconos). |
| [projects/glyphflow/src/lib/icon/icons/search.ts](../projects/glyphflow/src/lib/icon/icons/search.ts) | ts | `searchIcon` | Sacudida desde el mango; `find` la pasea como si buscara (ambas portadas). |
| [projects/glyphflow/src/lib/icon/icons/server.ts](../projects/glyphflow/src/lib/icon/icons/server.ts) | ts | `serverIcon` | Servidor: los indicadores parpadean desfasados. |
| [projects/glyphflow/src/lib/icon/icons/shield.ts](../projects/glyphflow/src/lib/icon/icons/shield.ts) | ts | `shieldQuestionMarkIcon` | Familia `shield` del catálogo curado (14 iconos). |
| [projects/glyphflow/src/lib/icon/icons/signal.ts](../projects/glyphflow/src/lib/icon/icons/signal.ts) | ts | `signalIcon` | Señal completa: el punto y las 4 barras se dibujan de abajo hacia arriba, creciendo. |
| [projects/glyphflow/src/lib/icon/icons/smartphone.ts](../projects/glyphflow/src/lib/icon/icons/smartphone.ts) | ts | `smartphoneChargingIcon` | Familia `smartphone` del catálogo curado (3 iconos). |
| [projects/glyphflow/src/lib/icon/icons/square.ts](../projects/glyphflow/src/lib/icon/icons/square.ts) | ts | `squareActivityIcon` | Familia `square` del catálogo curado (71 iconos). |
| [projects/glyphflow/src/lib/icon/icons/star.ts](../projects/glyphflow/src/lib/icon/icons/star.ts) | ts | `starIcon` | Favorito: gira y crece de un golpe. |
| [projects/glyphflow/src/lib/icon/icons/sticky.ts](../projects/glyphflow/src/lib/icon/icons/sticky.ts) | ts | `stickyNoteIcon` | Familia `sticky` del catálogo curado (6 iconos). |
| [projects/glyphflow/src/lib/icon/icons/tally.ts](../projects/glyphflow/src/lib/icon/icons/tally.ts) | ts | `tally1Icon` | Familia `tally` del catálogo curado (5 iconos). |
| [projects/glyphflow/src/lib/icon/icons/text.ts](../projects/glyphflow/src/lib/icon/icons/text.ts) | ts | `textAlignCenterIcon` | Familia `text` del catálogo curado (4 iconos). |
| [projects/glyphflow/src/lib/icon/icons/ticket.ts](../projects/glyphflow/src/lib/icon/icons/ticket.ts) | ts | `ticketIcon` | Familia `ticket` del catálogo curado (7 iconos). |
| [projects/glyphflow/src/lib/icon/icons/user.ts](../projects/glyphflow/src/lib/icon/icons/user.ts) | ts | `userPenIcon` | Familia `user` del catálogo curado (17 iconos). |
| [projects/glyphflow/src/lib/icon/icons/volume.ts](../projects/glyphflow/src/lib/icon/icons/volume.ts) | ts | `volume2Icon` | Volumen: las ondas salen del cono, de la chica a la grande. |
| [projects/glyphflow/src/lib/icon/icons/wifi.ts](../projects/glyphflow/src/lib/icon/icons/wifi.ts) | ts | `wifiOffIcon` | Familia `wifi` del catálogo curado (6 iconos). |
| [projects/glyphflow/src/lib/icon/motion-runtime.ts](../projects/glyphflow/src/lib/icon/motion-runtime.ts) | ts | `resetSoporteLinear` | A dónde se degrada un `linear()` cuando el navegador no lo entiende: exactamente el |
| [projects/glyphflow/src/lib/icon/spring-easings.ts](../projects/glyphflow/src/lib/icon/spring-easings.ts) | ts | `SPRING_SMOOTH` | ζ = 1.00 — crítico, sin rebote. El reemplazo directo de un expo-out. |
| [projects/glyphflow/src/public-api.ts](../projects/glyphflow/src/public-api.ts) | ts |  | Public API Surface of glyphflow |
| [projects/playground/src/main.server.ts](../projects/playground/src/main.server.ts) | ts |  |  |
| [projects/playground/src/main.ts](../projects/playground/src/main.ts) | ts |  |  |

## scripts  `(7)`

| Archivo | Tipo | Símbolo | Resumen |
|---|---|---|---|
| [scripts/bundle-size-check.ts](../scripts/bundle-size-check.ts) | ts |  | Bundle budget de v0.1 — "importa un icono, paga por ese icono", medido en CI, no prometido |
| [scripts/gen-playground-tags.ts](../scripts/gen-playground-tags.ts) | ts |  | Escribe la copia de los tags que consume el buscador del sitio, desde el paquete PUBLICADO |
| [scripts/gen-sitemap.ts](../scripts/gen-sitemap.ts) | ts |  | Escribe robots.txt y sitemap.xml en `projects/playground/public/`, desde la MISMA tabla de |
| [scripts/gen-spring-easings.ts](../scripts/gen-spring-easings.ts) | ts | `SPRING_` | ζ = ${z.toFixed(2)} — ${CARACTER[nombre as keyof typeof SPRING_PRESETS]} |
| [scripts/generate-lucide-icons.ts](../scripts/generate-lucide-icons.ts) | ts | `GENERATED_ICONS` | Genera generated-icons.ts a partir de lucide-static (icon-nodes.json). |
| [scripts/pack-check.ts](../scripts/pack-check.ts) | ts |  | npm pack + instalar en un proyecto limpio + import real. Un `ng build` en verde no garanti |
| [scripts/ssr-smoke-test.ts](../scripts/ssr-smoke-test.ts) | ts | `app-root` | SSR smoke test — corre server-side (Node, sin jsdom, sin window/document reales) para prob |
