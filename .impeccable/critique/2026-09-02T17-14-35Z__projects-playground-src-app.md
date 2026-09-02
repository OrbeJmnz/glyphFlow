---
target: sitio publico glyphflow
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 6
timestamp: 2026-09-02T17-14-35Z
slug: projects-playground-src-app
---
# Auditoría de diseño — sitio público glyphflow (glyph-flow-zeta.vercel.app)

Método: dual-agent (A: revisión de diseño en vivo, 7 rutas × 2 viewports × 2 temas · B: detector determinista) + auditoría técnica code-level. Aislados hasta la síntesis.

Design Health (Nielsen): 29/40 · Audit Health: 13/20 · Detector: 1 hallazgo real.

## Nielsen 29/40
| # | Heurística | Nota | Hallazgo |
|---|---|---|---|
| 1 | Visibilidad del estado | 3 | Contador vivo y estado en URL; el control 1x sigue activo con motion off |
| 2 | Mundo real | 3 | "Which engine do I use?"; `hold`/`held` sin glosario |
| 3 | Control y libertad | 3 | Escape restaura foco; cambiar idioma tira el `?q=`; el editor ensucia el historial al cargar |
| 4 | Consistencia | 2 | 5/9 docs sin h1; `.tabla-scroll` falta en comparativa; copiar permanente vs fantasma; `aria-label` en español en /en |
| 5 | Prevención de errores | 3 | Ruta de fallo del copiar; `clear` del Lab borra sin confirmar |
| 6 | Reconocer > recordar | 2 | Pickers de 1767 glifos sin nombre; nombres truncados sin tooltip |
| 7 | Flexibilidad | 4 | Roving tabindex, Ctrl+K, estado en URL, hash compartible |
| 8 | Minimalista | 3 | Cero sombras, un acento; hero de 7 bloques; 11 chips |
| 9 | Recuperación de errores | 2 | `0 of 1767.` sin mensaje; /en/nope devuelve HTTP 200 |
| 10 | Ayuda y docs | 4 | 9 páginas, comparativa con método y fecha, StackBlitz por patrón |

## Audit 13/20
A11y 2 · Perf 3 · Theming 3 · Responsive 2 · Integridad 3 (PASS)

## Carga cognitiva: 5 de 8 fallan
Foco único, chunking, una cosa a la vez, opciones mínimas, memoria de trabajo. Raíz común: el home es landing y catálogo de 1767 iconos a la vez.

## P1 (sin P0)
1. CLS 0.835 en el home; cascarón vacío ~400 ms. `main` 96px→780px, el footer se destruye. El prerender ya trae el contenido pero la hidratación va en cascada. Fix: modulepreload de los chunks de la ruta + @defer sobre el grid (2492 KB decodificados).
2. `npm i glyphflow` a 1.91:1 en tema oscuro (default). El pill invertido es #ffffff y el texto usa `--gf-marca-N` crudos en vez de los `-texto`. Misma fuga rompe el degradado de texto en claro (1.87–3.76:1). WCAG 1.4.3 AA. Triple confirmación.
3. /en/docs/comparison desborda 160px a 390px (scrollWidth 540 vs 380). WCAG 1.4.10. Fix: `<div class="tabla-scroll">`, la clase ya existe en docs-page.css:175.
4. `iconos.ts:455` setInterval(1900) incondicional sin pausa. WCAG 2.2.2 nivel A. Más `contador.ts:36` e `iconos.ts:191` leyendo matchMedia crudo en vez de `hayMovimiento()`.
5. Empty state mudo (`0 of 1767.`) y soft-404 con HTTP 200.
6. Menú móvil tabulable estando cerrado: 8 tab stops fuera de pantalla. Fix: `[attr.inert]`.

## Patrones sistémicos
1. El sistema define `--gf-marca-N-texto` y las 4 reglas de degradado no las consumen (origen de ambos P1 de contraste).
2. ARIA radiogroup correcto 4 veces, omitido 3.
3. Tres overlays con tres contratos distintos; falta un primitivo Overlay.
4. 21 breakpoints, cero tokens, px y rem mezclados.
5. La regla de 44px táctiles aplicada en 11 archivos menos en app.css, el único chrome táctil.

## Especificidad: PASA (~80% específico)
Sin defaults de IA. El 20% de plantilla está en el tejido conectivo: 14 eyebrows en mayúsculas, cadenas con `·`, «PALABRA — fragmento», casi-negro tintado.
Contradicción de fondo: el elemento firma es un GIF de 425 KB (oscuro) en el sitio de una librería que vende animación nativa.

## Detector (B)
1 real: `morph-bench.css:272` anima `width` (layout-transition). 3 ya adjudicados en `.impeccable/config.json`, uno de ellos falso positivo genuino (binding de Angular).

## Fortalezas a conservar
Reduced-motion best-in-class (35 bloques a mano, cero killer global, switch de 3 estados que pausa WAAPI vivo). Gestión de foco de nivel librería. Comparativa honesta con método publicado. Tokens con ratios medidos en el propio archivo. Cero will-change. Dogfooding verificable.
