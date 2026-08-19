<p align="center">
  <img
    src="https://raw.githubusercontent.com/OrbeJmnz/glyphFlow/main/projects/playground/public/images/glyphflow-logo-1200w.png"
    alt="glyphflow"
    width="440"
  />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/glyphflow"><img src="https://img.shields.io/npm/v/glyphflow.svg" alt="npm" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/npm/l/glyphflow.svg" alt="MIT" /></a>
  <br />
  <a href="https://github.com/OrbeJmnz/glyphFlow/blob/main/README.md">Read in English</a>
</p>

# glyphflow

Iconos de [Lucide](https://lucide.dev) que se mueven de verdad, para Angular — coreografía por
figura sobre Web Animations API nativa. Sin `@angular/animations`, sin librería de animación de
terceros, sin nada que configurar. Más morphing entre iconos, en su propio entry point.

Gratis, MIT, sin backend. Ver [NOTICE](./NOTICE) para atribuciones de terceros.

```bash
npm i glyphflow
```

## Importa un icono, paga por ese icono

Medido en CI en cada push, no prometido — `npm run bundle-check`:

| Qué importas                                 | gzip         |
| -------------------------------------------- | ------------ |
| Solo el componente, sin iconos               | **3.74 KB**  |
| Un icono individual (`[iconDef]="bellIcon"`) | **4.09 KB**  |
| El catálogo completo (`name="bell"`)         | **94.48 KB** |

Un icono cuesta ~0.35 KB sobre el runtime. Buscar por nombre obliga al bundler a conservar los 1767,
porque no puede saber cuál vas a pedir — por eso esa ruta es opt-in vía
`provideIconCatalog(ANIMATED_ICONS)`, nunca un fallback oculto.

```ts
import { MaxIconComponent, bellIcon } from 'glyphflow';
```

```html
<max-icon [iconDef]="bellIcon" trigger="hover" /> <max-icon [iconDef]="searchIcon" label="Buscar" />
```

## El catálogo

|                        |                                                     |
| ---------------------- | --------------------------------------------------- |
| Iconos totales         | **1767** — el set canónico completo de Lucide 1.31  |
| Con coreografía a mano | **180** — movimiento con intención, icono por icono |
| Generados              | **1587** — geometría más trazo automático           |

Los dos viven en archivos separados a propósito (`curated-icons.ts` y `generated-icons.ts`): el
generador nunca toca el curado. La coreografía con intención es criterio humano, icono por icono.
Ver [CONTRIBUTING.md](./CONTRIBUTING.md).

## Accesibilidad: una regla, no una matriz

Nunca hay que coordinar `aria-hidden` con `aria-label`. O pones `label`, o no lo pones:

```html
<!-- Decorativo: el botón ya dice "Guardar" -->
<button><max-icon [iconDef]="saveIcon" /> Guardar</button>

<!-- Semántico: no hay texto, el icono carga el significado -->
<button><max-icon [iconDef]="saveIcon" label="Guardar" /></button>
```

Ambos componentes respetan `prefers-reduced-motion` por default — pero respetarlo significa algo
distinto en cada uno, y eso es deliberado. En `<max-icon>` la coreografía es adorno sobre un icono
que ya es el correcto, así que se queda quieto. En `<max-icon-morph>` quedarse quieto te dejaría
mirando el icono **equivocado**, así que salta directo al destino. El movimiento reducido quita el
movimiento, no el cambio de estado.

## Morphing

Vive en un entry point aparte, `glyphflow/morph`, para que quien solo quiera iconos animados no
pague la matemática de interpolación de formas.

```ts
import { MaxIconMorphComponent } from 'glyphflow/morph';
// El binding ES el estado: cambiar [icon] transiciona desde el valor anterior.
```

El primer valor se pinta estático — morphear "desde nada" no existe. Ahí caen también el SSR y
cualquier navegador sin WAAPI: se ve el icono, solo que no se anima.

## Compatibilidad

Angular **20, 21 y 22** — cada versión se prueba en CI creando una app nueva con el CLI de ESA
versión, instalando el `.tgz` real y compilándola con prerender SSR. El rango de `peerDependencies`
refleja solo lo que esa matriz confirmó.

## Workspace

- `projects/glyphflow` — la librería (`ng-packagr`, prefijo `max` → `<max-icon>`).
- `projects/playground` — el sitio en vivo: catálogo, patrones, editor de geometría y laboratorio de
  autoría. Consume el paquete **publicado** desde npm, nunca el código de este repo, para que lo que
  la API pública no alcance a cubrir se note de inmediato.

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
