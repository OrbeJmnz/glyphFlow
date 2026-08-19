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
  <a href="https://github.com/OrbeJmnz/glyphFlow/blob/main/README.es.md">Leer en español</a>
</p>

# glyphflow

[Lucide](https://lucide.dev) icons that actually move, for Angular — per-shape choreography on the
native Web Animations API. No `@angular/animations`, no third-party animation library, nothing to
configure. Plus morphing between icons, in its own entry point.

Free, MIT, no backend. See [NOTICE](./NOTICE) for third-party attribution.

```bash
npm i glyphflow
```

## Import one icon, pay for one icon

Measured in CI on every push, not promised — `npm run bundle-check`:

| What you import                   | gzip         |
| --------------------------------- | ------------ |
| The component alone, no icons     | **3.74 KB**  |
| One icon (`[iconDef]="bellIcon"`) | **4.09 KB**  |
| The whole catalog (`name="bell"`) | **94.48 KB** |

An icon costs about 0.35 KB on top of the runtime. Looking one up by name forces the bundler to keep
all 1767, because it cannot know which one you will ask for — so that route is opt-in via
`provideIconCatalog(ANIMATED_ICONS)`, never a hidden fallback.

```ts
import { MaxIconComponent, bellIcon } from 'glyphflow';
```

```html
<max-icon [iconDef]="bellIcon" trigger="hover" /> <max-icon [iconDef]="searchIcon" label="Search" />
```

## The catalog

|                    |                                                   |
| ------------------ | ------------------------------------------------- |
| Total icons        | **1767** — the complete canonical Lucide 1.31 set |
| Hand-choreographed | **180** — motion with intent, one icon at a time  |
| Generated          | **1587** — geometry plus an automatic draw-on     |

The two live in separate files on purpose (`curated-icons.ts` and `generated-icons.ts`): the
generator never touches the curated ones. Choreography with intent is human judgement, icon by icon.
See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Accessibility: one rule, not a matrix

You never coordinate `aria-hidden` with `aria-label`. You either pass a `label` or you don't:

```html
<!-- Decorative: the button already says "Save" -->
<button><max-icon [iconDef]="saveIcon" /> Save</button>

<!-- Semantic: no text, so the icon carries the meaning -->
<button><max-icon [iconDef]="saveIcon" label="Save" /></button>
```

Both components honour `prefers-reduced-motion` by default — but honouring it means something
different in each, and that is deliberate. In `<max-icon>` the choreography is decoration on an icon
that is already correct, so it holds still. In `<max-icon-morph>` holding still would leave you
staring at the **wrong** icon, so it jumps straight to the destination. Reduced motion removes the
motion, not the state change.

## Morphing

Lives in a separate entry point, `glyphflow/morph`, so anyone who only wants animated icons doesn't
pay for shape-interpolation math.

```ts
import { MaxIconMorphComponent } from 'glyphflow/morph';
// The binding IS the state: changing [icon] transitions from the previous value.
```

The first value renders statically — morphing "from nothing" doesn't exist. SSR and browsers without
WAAPI land there too: you see the icon, it just doesn't animate.

## Compatibility

Angular **20, 21 and 22** — each version is tested in CI by scaffolding a fresh app with _that_
version's CLI, installing the real `.tgz`, and building it with SSR prerendering. The
`peerDependencies` range reflects only what that matrix confirmed.

## Workspace

- `projects/glyphflow` — the library (`ng-packagr`, `max` prefix → `<max-icon>`).
- `projects/playground` — the live site: icon catalog, patterns, geometry editor and authoring lab.
  It consumes the **published** package from npm, never the source in this repo, so that anything
  the public API fails to cover shows up immediately.

```bash
npm install
ng build glyphflow
ng test glyphflow
ng serve playground

npm run verify:clean      # wipes node_modules/dist and runs the whole pipeline from scratch
npm run generate:icons    # regenerates generated-icons.ts from lucide-static
npm run lucide:diff       # diffs the catalog against the installed Lucide version
```

## License

MIT — see [LICENSE](./LICENSE).
