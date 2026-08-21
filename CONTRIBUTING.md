# Contribuir a glyphflow

## Reportar un bug o proponer un icono/coreografía

Abre un issue. Para una coreografía nueva o un ajuste a una existente, el flujo es:

1. Genera el snippet desde el playground (cuando exista) o escríbelo a mano siguiendo el patrón de
   `curated-icons.ts`.
2. Abre un PR contra `curated-icons.ts` (nunca contra `generated-icons.ts`, ver regla abajo).
3. El mantenedor revisa y mergea — no hay panel ni roles en runtime, la autorización es el PR mismo.

## Regla curado vs. generado (no negociable)

El catálogo vive en dos archivos separados:

- **`curated-icons.ts`** — los 410 iconos con coreografía a mano, con intención. Se edita por PR
  humano, icono por icono. **El generador offline nunca lee ni escribe este archivo.**
- **`generated-icons.ts`** — el resto del set de Lucide (1357), solo con la variante `draw`
  automática. Lo escribe el script generador (`scripts/generate-lucide-icons.ts`, `npm run
  generate:icons`).
  Nunca se edita a mano; si necesitas tocar la coreografía de un icono que está aquí, eso lo saca
  de este archivo y lo mueve a `curated-icons.ts`.

`animated-icons.registry.ts` compone ambos con `Object.assign({}, GENERATED_ICONS, CURATED_ICONS)`
— curado al final, así que si algún día un nombre existiera en los dos (no debería pasar), lo
curado gana siempre. Es `Object.assign` a propósito, NO `{...a, ...b}`: el spread de un objeto
importado de otro módulo rompe el tree-shaking de esbuild — verificado con una reproducción
mínima, ver el plan del proyecto.

## Antes de abrir PR

- `npm run verify:clean` en verde — no `npm test`/`npm run build` sueltos. Ese script borra
  `node_modules`/`dist`, corre `npm ci` desde cero y ejecuta todo el pipeline (lint, typecheck,
  tests, build dev+prod, SSR, bundle-size check, NOTICE check, pack-check). Verificar con
  `node_modules`/`dist` ya construidos de una sesión anterior dio falsos positivos reales en este
  proyecto — CI pasaba "local" y fallaba en GitHub Actions.
- Si tocaste la **geometría** de un icono curado, el barrido de sanidad va a trunar: el lock
  (`curated-choreography.lock.json`) ancla cada coreografía a las figuras contra las que se
  escribió. Ese error no se calla regenerando de volada — primero revisa que cada índice de
  `shapes: { … }` siga apuntando a la figura que la coreografía asume (una figura de más recorre
  TODOS los índices siguientes), y hasta entonces corre `npm run curated:lock` en el mismo PR. El
  comando imprime el diff antes de escribir y marca con `⚠ LA ANIMA` las figuras que cambiaron y
  tienen una coreografía apoyada en ellas — esas son las que hay que mirar. Con `-- --dry-run` ves
  el diff sin tocar el archivo, y ese diff es lo que se revisa en el PR, no solo el JSON resultante.
  CI corre `npm run curated:lock:check`: si el lock commiteado no refleja la geometría actual, el
  job falla imprimiendo ese mismo diff anotado en el log.
  Existe por un caso real: `calendar-clock` quedó animando las manecillas del reloj creyendo que
  eran los pines, con los tests en verde.

## Qué NO se acepta

- Animaciones semánticas generadas en lote sin dirección humana figura por figura.
- Código copiado de Animate UI (MIT + Commons Clause — prohíbe redistribuir sus componentes).
- Dependencias nuevas en `projects/glyphflow` sin discutirlo antes (el paquete es cero-deps a
  propósito).
- PRs que editen `generated-icons.ts` a mano.
