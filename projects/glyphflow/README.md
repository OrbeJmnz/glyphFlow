# glyphflow

Iconos de [Lucide](https://lucide.dev) animados de verdad para Angular — coreografía por figura sobre
Web Animations API nativa, sin `@angular/animations` ni librerías de animación de terceros. Más
morphing entre iconos y un editor de geometría, ambos en construcción.

Gratis, MIT, sin backend. Ver [NOTICE](./NOTICE) para atribuciones de terceros.

## Estado

En desarrollo. **Nada publicado en npm todavía.** El catálogo ya está completo y corresponde 1:1 con
`lucide-static@1.31.0`; el plan del proyecto (arquitectura, roadmap, decisiones) vive fuera de este
repo mientras se arma.

## El catálogo

| | |
| --- | --- |
| Iconos totales | **1767** — el set canónico completo de Lucide 1.31 |
| Con coreografía a mano | **180** — movimiento con intención, icono por icono |
| Generados | **1587** — geometría + trazo automático (`draw`) |

Los dos viven en archivos separados a propósito (`curated-icons.ts` y `generated-icons.ts`): el
generador nunca toca el curado. Ver [CONTRIBUTING.md](./CONTRIBUTING.md).

## Importa un icono, paga por ese icono

Medido en CI en cada push, no prometido — `npm run bundle-check`:

| Qué importas | gzip |
| --- | --- |
| Solo el componente, sin iconos | **3.22 KB** |
| Un icono individual (`[iconDef]="bellIcon"`) | **3.57 KB** |
| El catálogo completo (`name="bell"`) | **93.87 KB** |

Un icono cuesta ~0.35 KB sobre el runtime. La ruta por `name` es la de conveniencia y carga el
catálogo entero — es opt-in vía `provideIconCatalog(ANIMATED_ICONS)`, nunca un fallback oculto.

```ts
// Producción consciente de bundle: import nombrado, tree-shakeable de verdad
import { MaxIconComponent, bellIcon } from 'glyphflow';
```

```html
<max-icon [iconDef]="bellIcon" trigger="hover" class="size-5" />
<max-icon [iconDef]="searchIcon" label="Buscar" />
```

## Compatibilidad

Angular **20, 21 y 22** — cada versión se prueba en CI creando una app nueva con el CLI de ESA
versión, instalando el `.tgz` real y compilándola con prerender SSR. El rango de `peerDependencies`
refleja solo lo que esa matriz confirmó.

## Workspace

- `projects/glyphflow` — la librería (`ng-packagr`, prefix `max` → `<max-icon>`).
- `projects/playground` — app para animar/editar iconos (no publicada aún).

```bash
npm install
ng build glyphflow
ng test glyphflow
ng serve playground

npm run verify:clean      # borra node_modules/dist y corre el pipeline completo desde cero
npm run generate:icons    # regenera generated-icons.ts desde lucide-static
npm run lucide:diff       # compara el catálogo contra la versión de Lucide instalada
```

## Licencia

MIT — ver [LICENSE](./LICENSE).
