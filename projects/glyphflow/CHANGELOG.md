# glyphflow

## 3.0.0

### Major Changes

- [`8779872`](https://github.com/OrbeJmnz/glyphFlow/commit/87798723fc29e0ba1948f39035f39b945a542776) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - `reveal` now means one thing, every icon has it, the gesture vocabulary that replaced it grew a
  proper `dart`/`nudge`/`hold` split, and a fourth universal animation joins it: `flicker`

  **Breaking.** Through 2.6.0, `reveal` was the name of 122 hand-written choreographies that did
  different things: some assembled the icon from scattered pieces, some kept the base still and only
  brought in the mark, some lit up bars one at a time. From 3.0.0 it names **a single animation**,
  available on all 1767 icons: the icon materializes — a faint copy of the full stroke flashes
  underneath (the "ghost") while the real stroke draws on top, and the whole thing settles with a
  wobble. It is the recipe `bolt` and `audio-waveform` already carried by hand.

  ### What breaks

  **Variant names have been public contract since 2.6.0**, when `ICON_VARIANTS` shipped. This changes
  its **values** for well over 200 icons across three rounds of work, so anyone who wired a variant
  picker against that export in 2.6.0 will see a different list. And anyone writing a variant name on
  one of the renamed icons **gets no error**: the string is still valid, it just plays a different
  gesture than before. That silent break is why this is a major and not a minor.

  The 122 curated `reveal`s were split by what they actually **do**:

  | New name   | Icons | What it is                                                                                   |
  | ---------- | ----- | -------------------------------------------------------------------------------------------- |
  | `assemble` | 33    | Pieces enter from outside and settle into place (`corner-*`, `git-*`, `layout-*`, `log-in`…) |
  | `mark`     | 41    | The base stays and the distinguishing mark arrives (`file-check`, `shield-check`, `book-*`…) |
  | `cascade`  | 14    | Pieces arrive one at a time (`signal-*`, `wifi-*`, `chart-column`, `cpu`…)                   |
  | `scan`     | 1     | `qr-code` — the modules never enter; they dip and return. It is a scan                       |
  | `twinkle`  | 1     | `sparkles` — it twinkles in place. Joins the name six `star-*` icons already used            |
  | `bounce`   | 1     | `clipboard` — joins the name thirteen icons already used                                     |

  Also: `snowflake`'s `reveal` became its `default` (it was better than the shiver it had), `italic`'s
  became its hand-written `draw` (keeping the `skewX` the automatic stroke cannot reproduce), and
  `external-link` loses its `launch` variant (identical to its own `assemble`).

  Another 15 icons lose their hand-written `reveal` — `activity`, `check`, `x`, `plus`, `minus`,
  `book-open`, `bookmark-*`… — because they were already this same recipe **without the ghost**. They
  do not lose the animation: they inherit the universal one, which is better than what they had.

  ### `nudge` split into `dart` and `nudge`

  `nudge` used to name two different animations: icons where a copy of the tip trails behind and fades
  (a "dart", 40 icons — `arrow-*`, `chevron-*`, `corner-*`, `download`, `log-in/out`…) and icons that
  just settle into place with no trail (55 icons, where `nudge` stays correct). What separates them is
  real and testable: what **travels** leaves a trail, what **settles** does not.

  `dart` grew across three tandas to close the entire `arrow-*` family plus the boxed/framed
  variants (107 icons total): the anatomy dictates the mechanic, not a single template —
  `arrow-big-*` compress against their own tail (no room for a translating dart), `*-arrow-out-*`
  stretch their diagonal from the center instead of translating it (the ring anchors it there), the
  line-anchored arrows (`-from-line`/`-to-line`) load against the line and the line absorbs the
  recoil, and the sort/order arrows anchor their letters and bars (moving them read as "the whole icon
  shakes"). `assemble` grew alongside it in the same icons, 62 more since the original 33.

  `hold` is a new variant name for a class of icon that had a **sustained state** — a pose that stays,
  not a one-shot gesture — living inside `default` (`fill: 'forwards'` + `reverseOnLeave`). 34 icons
  migrated: `default` keeps the gesture, `hold` keeps the state. This is the same shape `circle-arrow-*`
  already had; the rest of the framed/order/digit/dot arrows never got it until now.

  ### Layout family: `nudge`/`assemble` where they add something, and nowhere they don't

  `panel-*`/`panels-*` (21) get `nudge`: the divider pushes perpendicular to itself, toward the side
  that opens the panel its name promises; the frame never moves. `columns-2/3/4` and `grid-3x2/3x3` (5)
  get `nudge` too — the cheap half of their own `default`, which already deploys the line and then
  wanders; `nudge` is just the wander, for repeated hover where re-deploying each time would feel odd.
  `table`, `table-properties`, and `rows-2/3/4` (5) get `assemble` — the rich half, the same deploy
  composed on top of the shift/push their `default` already does.

  `table-2` is the one icon in the catalog where Lucide ships the frame and both internal lines fused
  into a **single** `<path>`. `default` used to translate the whole icon because there was no way to
  isolate just the lines without splitting that path — which would break the geometry test that keeps
  every curated icon 1:1 with Lucide's own SVG, node for node. It doesn't split now either: `default`
  and `assemble` animate the `d` attribute **directly**, keeping the four frame fragments byte-identical
  across every keyframe and moving only the two line commands' coordinates. Same single node, same
  resting `d` Lucide ships — first use of `d`-attribute animation in this library (Chrome/Firefox/Safari
  16.4+; older engines silently ignore the property and the icon stays still, nothing throws).

  Deliberately **not** touched: `table`/`separator-*`/`fold-*`/`unfold-*`/`stretch-*`/`group`/`ungroup`/
  `boxes`/`move-*`/`layout-dashboard` and the rest of `layout.ts`. Each already has a `default` that
  does exactly what its name promises; adding a second variant would have been redundant at best, and
  at worst would silently steal hover away from a gesture that was already right.

  ### `flicker`: a fourth universal animation

  Same shape as `reveal` — `icon()` hangs it on all 1767, `varianteDeHover` excludes the generic one
  the same way (checks `autoFlicker`, not the name) — but a different mechanic and much cheaper.
  The stroke un-draws (the reverse of `draw`) and draws again, all figures at once, with a brief gap
  fully erased in the middle so the two halves read as separate gestures instead of one continuous
  wiggle. No ghost, no synthesized DOM node: unlike `reveal`, there is nothing to build, so it never
  touches the geometry even temporarily.

  An initial hand-authored prototype on `heart`/`bell`/`wifi` was removed before shipping — once the
  automatic mechanism existed, the hand-written version was byte-for-byte the same thing with extra
  steps.

  ### The hover gesture is picked by name, not by position

  `varianteDeHover` used to take **the third key** of `animations`. With `reveal` on all 1767 that
  rule would have stolen the hover from the 672 icons that only had `draw` and `default`: they would
  have gone from their curated gesture to a generic materialization, silently and without a failing
  test. It now picks **the first name that is not `draw`, `default`, or the generic `reveal`/`flicker`**.

  A hand-written `reveal` **does** count as an icon's own gesture — whoever wrote `bolt`'s did so
  because the generic one did not serve it — and the exclusion checks the `autoReveal`/`autoFlicker`
  field, not the name. One consequence worth knowing: adding `dart`/`nudge`/`assemble`/`hold` to an
  icon that only had `default` before makes that new variant the hover target, same as it always has
  for named variants. Verified across the whole catalog: adding universal `flicker` changed **zero**
  icons' hover target.

  ### Size

  Measured in CI, not promised. The published figures move again with this round of work:

  | What you import                   | 2.6.0   | 3.0.0         |
  | --------------------------------- | ------- | ------------- |
  | The component alone, no icons     | 4.06 KB | **5.24 KB**   |
  | One icon (`[iconDef]="bellIcon"`) | 4.59 KB | **5.60 KB**   |
  | The whole catalog (`name="bell"`) | —       | **174.74 KB** |

  The "one icon" budget was raised twice this cycle: 5 → 5.5 KB for the `reveal` ghost, then
  5.5 → 6 KB for `flicker` (+0.16 KB — cheaper than `reveal`, since there's no ghost to synthesize).
  Both were deliberate, measured calls, not regressions papered over — the tripwire's real job is
  catching the whole catalog (~175 KB) leaking into a single-icon import, and 5.60 KB doesn't come
  close. The budget moves when there's a reason; it isn't a hard ceiling on the vocabulary.

  Worth repeating from before: **`core` is not a separate budget with room to spare — it sits inside
  "one icon"**, because an Angular component definition is a module-level side effect esbuild cannot
  drop from the FESM. The two numbers move together because they are, structurally, the same cost.

  ### API
  - New exported types `AutoReveal` and `AutoFlicker`, and new optional `autoReveal`/`autoFlicker`
    fields on `IconChoreography`.
  - The `reveal` ghost is synthesized in the DOM at playback and **never enters `def.shapes`**. That is
    not a style preference: `glyphflow/morph` builds its geometry from `shapes` filtering
    `opacity !== '0'`, and one extra figure there would mismatch morphs across the whole catalog. This
    way the published geometry does not change by a single byte for those 1767 icons. `flicker` has no
    equivalent concern — it never adds a node, curated or synthesized.
  - `dart`'s trail figures are real, visible-at-zero-opacity entries in `shapes` (unlike the `reveal`
    ghost), each one declared individually in the test suite's `FIGURAS_ANEXAS` allowlist — they are
    part of the icon's own curated geometry, not synthesized at runtime.

### Minor Changes

- [`1334733`](https://github.com/OrbeJmnz/glyphFlow/commit/1334733743d28f86d66f60d02350bba5928d839f) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - `<gf-icon-morph>` now speaks in states: `asyncState` covers idle → loading → success → error

  Every app writes this by hand — a button that spins, then shows a tick, then goes back to normal.
  Now it's four inputs:

  ```html
  <gf-icon-morph
    [asyncState]="state()"
    [autoReset]="2000"
    [idleIcon]="sparklesIcon"
    [loadingIcon]="loaderCircleIcon"
    [successIcon]="checkIcon"
    [errorIcon]="triangleAlertIcon"
  />
  ```

  **`loading` is not a morph.** A morph is one shot with an end; a spinner has none, and implementing
  it as a looping morph flickers. The loading state runs a real rotation — `iterations: Infinity`,
  `linear`, because any easing puts a pulse into every turn — on a `<g>` of its own, never on the
  `<path>`. The crossfade fallback animates the figure's `transform`, and two animations on the same
  property of the same element overwrite each other.

  **When the answer arrives the spinner settles rather than finishing its lap.** It travels to the
  nearest resting angle, never more than half a turn, in 240 ms. Completing the turn at constant speed
  sounds better on paper, but the `<path>` is already morphing into the tick while the group keeps
  rolling: a fast server would leave the tick spinning for up to a second after the answer was already
  on screen.

  `autoReset` sends a terminal state back to idle on its own. It moves the icon, not your input —
  `asyncState` is yours to own, so showing two successes in a row means passing through `loading`
  again, the same way it happens for real.

  Under `prefers-reduced-motion` the loading icon still appears, it just doesn't spin. The state is
  information, not decoration.

- [`1334733`](https://github.com/OrbeJmnz/glyphFlow/commit/1334733743d28f86d66f60d02350bba5928d839f) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - Six curated two-state gestures, exported as `intent`

  ```ts
  import { COPY_INTENT } from 'glyphflow/morph';
  ```

  ```html
  <gf-icon-morph [intent]="COPY_INTENT" [active]="copied()" />
  ```

  An intent is not sugar for a ternary — that alone wouldn't earn an API. What it carries is the
  curation: the pair of figures, the spring the gesture wants, and whether its active state is
  temporary. `COPY_INTENT`, `THEME_INTENT`, `PASSWORD_INTENT`, `PLAY_PAUSE_INTENT`,
  `MENU_CLOSE_INTENT` and `EXPAND_COLLAPSE_INTENT`, plus the `MorphIntent` type if you want your own.

  **They are imported consts, not a string attribute.** `intent="copy"` would need a registry, and a
  registry makes all twelve figures reachable from the component — everyone using one intent would pay
  for the other five. One export each keeps them tree-shakeable: measured, importing `COPY_INTENT`
  costs 0.42 KB gzip, its two figures and nothing more. A typo also fails at compile time instead of
  leaving a silently empty icon at runtime.

  Only `COPY_INTENT` comes back on its own, after 2 s, because a confirmation is temporary. A toggle
  that reflects real state — theme, password visibility, play/pause — must never revert by itself: it
  would be lying about what is actually happening.

  `autoReset` lost its `= 0` default and is now optional. `0` is a legitimate value meaning "don't come
  back", so as a default it was indistinguishable from "not set", and the one an intent carries could
  never be switched off from a template. It is the same trap `animation="default"` fell into in 2.5.0.

### Patch Changes

- [`1334733`](https://github.com/OrbeJmnz/glyphFlow/commit/1334733743d28f86d66f60d02350bba5928d839f) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - `copy` ↔ `check` is now told in two beats

  Copying is two things — the sheet on top retracts, and what's left folds into a tick — and doing both
  at once hid them behind each other. It read as "something small changed" without you being able to
  say what. Now the square goes first and the outline waits its turn, with a deliberate overlap so it
  stays one gesture instead of two animations stitched together.

  The piece that survives is the outline rather than the square, and that is geometry, not taste: the
  square is a **closed loop** and the tick an **open stroke**, and closed-to-open is the hard case for
  the subpath matcher. Measured residuals — outline→tick 0.286, square→tick 0.676, uncomfortably close
  to the 0.75 threshold where the engine gives up and crossfades instead.

  No other curated morph is staged. `sun`↔`moon` and `volume`↔`volume-off` keep their shared clock,
  and there's a test holding them to it.

- [`1334733`](https://github.com/OrbeJmnz/glyphFlow/commit/1334733743d28f86d66f60d02350bba5928d839f) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - Curated morphs no longer freeze halfway through when the spring overshoots

  `morphKeyframes` derives each offset from the moment the spring first crosses its target. With a
  spring that overshoots, that happens well before the end: 54.7% of the clock with `snappy`, 19.2%
  with `bouncy`. The geometric branch compensates by drawing the bounce and closing on offset 1. The
  curated branch never did — its last keyframe sat at 0.547, and WAAPI holds a property from its final
  offset to the end of the animation. So the icon finished morphing, stood still for the rest of the
  duration, and then jumped slightly as the resting `d` was written.

  Fixed by trimming the clock rather than drawing the bounce: offsets are rescaled so the last one is
  1, and the duration shrinks by the same factor. **No pose moves in real time.** `copy`→`check` with
  `snappy` went from 317 ms with its final pose at 173 ms, to 173 ms with its final pose at 173 ms —
  the visible motion is identical and only the dead tail is gone. Drawing the bounce would need a way
  to cap how far a figure may leave the canvas, and two of the three curated constructors have no plan
  to measure that against.

  This affects the nine curated pairs — `sun`/`moon`, `copy`/`check`, `eye`/`eye-off`,
  `eye`/`eye-closed`, `volume`/`volume-off` and the `-off` pattern on `bell`, `pin`, `star` and
  `heart` — for anyone passing them `snappy` or `bouncy`. With `smooth` nothing changes: it never
  reaches exactly 1, so it never took the early exit.

  One observable consequence: the animation's `finished` promise now resolves when the motion ends
  instead of after the hold. Anything chained to it fires earlier.

## 2.6.0

### Minor Changes

- [`ec69fbf`](https://github.com/OrbeJmnz/glyphFlow/commit/ec69fbf880e47eea893cd91debfcdda836c3b1a3) Thanks [@OrbeJmnz](https://github.com/OrbeJmnz)! - `IconMeta.variants` and `ICON_VARIANTS` — you can now discover what animations an icon has, without
  paying for the catalog to find out.

  You could always ask for a variant (`animation="rotate"`). What you couldn't do was ask an icon what
  its options _were_. The only way was `Object.keys(ANIMATED_ICONS[name].animations)`, and touching
  `ANIMATED_ICONS` drags in the full catalog — the exact cost `provideIconCatalog()` exists to avoid.

  `ICON_VARIANTS: Record<string, readonly string[]>` is a new standalone, tree-shakeable export — same
  shape as `ICON_TAGS`, same reason: importing it alone doesn't pull in geometry for the other 1766
  icons. `IconMeta` gains a matching `variants: readonly string[]` field, populated the same way
  `tags` is, for callers who already pay for `ICON_META`.

  Every icon's list always starts with `'draw'` — `icon()` injects it first, so this is a hard
  invariant, not a convention. `trash` reads `['draw', 'default', 'active']`.

  No bundle impact: `core` and the tree-shakeable per-icon import both hold their existing budgets.

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
