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

| What you import                   | gzip          |
| --------------------------------- | ------------- |
| The component alone, no icons     | **4.57 KB**   |
| One icon (`[iconDef]="bellIcon"`) | **4.83 KB**   |
| The whole catalog (`name="bell"`) | **129.54 KB** |

An icon costs about 0.26 KB on top of the runtime. Looking one up by name forces the bundler to keep
all 1767, because it cannot know which one you will ask for — so that route is opt-in via
`provideIconCatalog(ANIMATED_ICONS)`, never a hidden fallback.

```ts
import { GfIconComponent, bellIcon } from 'glyphflow';
```

```html
<gf-icon [iconDef]="bellIcon" trigger="hover" /> <gf-icon [iconDef]="searchIcon" label="Search" />
```

## Triggers

| `trigger`         | Fires                                                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `group` (default)  | Draws on mount, animates on the nearest `.group` hover — the same ancestor Tailwind's `group-hover:` reads. Falls back to its own hover with no `.group` around. |
| `hover`            | Pointer enters.                                                                                                                             |
| `tap`              | Click.                                                                                                                                      |
| `view`             | Enters the viewport. `viewOnce` (default `true`) decides once vs. every re-entry.                                                          |
| `auto`             | On mount.                                                                                                                                   |
| `manual`           | Never on its own.                                                                                                                           |

`manual` pairs with three public methods — grab the instance with `ViewChild`/`viewChild()`:

```ts
@ViewChild(GfIconComponent) icon!: GfIconComponent;

this.icon.play('hover'); // plays a variant — no argument replays `animation`
this.icon.reverse(); // reverses the animation currently running
this.icon.cancel(); // stops it and resets to the base pose
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
<button><gf-icon [iconDef]="saveIcon" /> Save</button>

<!-- Semantic: no text, so the icon carries the meaning -->
<button><gf-icon [iconDef]="saveIcon" label="Save" /></button>
```

Both components honour `prefers-reduced-motion` by default — but honouring it means something
different in each, and that is deliberate. In `<gf-icon>` the choreography is decoration on an icon
that is already correct, so it holds still. In `<gf-icon-morph>` holding still would leave you
staring at the **wrong** icon, so it jumps straight to the destination. Reduced motion removes the
motion, not the state change.

## Morphing

Lives in a separate entry point, `glyphflow/morph`, so anyone who only wants animated icons doesn't
pay for shape-interpolation math.

```ts
import { GfIconMorphComponent } from 'glyphflow/morph';
// The binding IS the state: changing [icon] transitions from the previous value.
```

The first value renders statically — morphing "from nothing" doesn't exist. SSR and browsers without
WAAPI land there too: you see the icon, it just doesn't animate.

```ts
import { Component } from '@angular/core';
import { GfIconMorphComponent } from 'glyphflow/morph';
import { moonIcon, sunIcon } from 'glyphflow';

@Component({
  imports: [GfIconMorphComponent],
  template: `
    <button (click)="dark = !dark">
      <gf-icon-morph [icon]="dark ? moonIcon : sunIcon" />
    </button>
  `,
})
export class ThemeToggle {
  dark = false;
}
```

## Speed control

One multiplier for every calculated duration — choreography and morph transitions alike:

```ts
import { provideGfIcons } from 'glyphflow';

providers: [provideGfIcons({ durationScale: 0.8 })]; // 20% faster, everywhere
```

`1` is the default — no change. It applies from the next playback: anything already animating keeps
the duration WAAPI already received when it started.

## Compatibility

Angular **20, 21 and 22** — each version is tested in CI by scaffolding a fresh app with _that_
version's CLI, installing the real `.tgz`, and building it with SSR prerendering. The
`peerDependencies` range reflects only what that matrix confirmed.

## Workspace

- `projects/glyphflow` — the library (`ng-packagr`, `gf` prefix → `<gf-icon>`).
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
