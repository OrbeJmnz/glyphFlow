---
'glyphflow': major
---

`reveal` now means one thing, every icon has it, and the gesture vocabulary that replaced it grew a
proper `dart`/`nudge`/`hold` split

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

| New name | Icons | What it is |
| --- | --- | --- |
| `assemble` | 33 | Pieces enter from outside and settle into place (`corner-*`, `git-*`, `layout-*`, `log-in`…) |
| `mark` | 41 | The base stays and the distinguishing mark arrives (`file-check`, `shield-check`, `book-*`…) |
| `cascade` | 14 | Pieces arrive one at a time (`signal-*`, `wifi-*`, `chart-column`, `cpu`…) |
| `scan` | 1 | `qr-code` — the modules never enter; they dip and return. It is a scan |
| `twinkle` | 1 | `sparkles` — it twinkles in place. Joins the name six `star-*` icons already used |
| `bounce` | 1 | `clipboard` — joins the name thirteen icons already used |

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

### The hover gesture is picked by name, not by position

`varianteDeHover` used to take **the third key** of `animations`. With `reveal` on all 1767 that
rule would have stolen the hover from the 672 icons that only had `draw` and `default`: they would
have gone from their curated gesture to a generic materialization, silently and without a failing
test. It now picks **the first name that is not `draw`, `default`, or the generic `reveal`**.

A hand-written `reveal` **does** count as an icon's own gesture — whoever wrote `bolt`'s did so
because the generic one did not serve it — and the exclusion checks the `autoReveal` field, not the
name. One consequence worth knowing: adding `dart`/`nudge`/`assemble`/`hold` to an icon that only had
`default` before makes that new variant the hover target, same as it always has for named variants.

### Size

Measured in CI, not promised. The published figures move again with this round of work:

| What you import | 2.6.0 | 3.0.0 |
| --- | --- | --- |
| The component alone, no icons | 4.06 KB | **5.07 KB** |
| One icon (`[iconDef]="bellIcon"`) | 4.59 KB | **5.44 KB** |
| The whole catalog (`name="bell"`) | — | **174.52 KB** |

**The "one icon" budget is nearly exhausted**: 5.44 KB against a 5.5 KB gzip cap, 0.06 KB of
headroom. It was raised from 5 KB to 5.5 KB for the `reveal` ghost alone; the `dart` trail and the
`d`-attribute keyframes in this round ate the rest. The next choreography that adds real weight to a
tree-shaken icon will need either a deliberate, approved budget raise or a lighter technique — this
tripwire has done its job twice now and is close to doing it a third time.

Worth repeating from before: **`core` is not a separate budget with room to spare — it sits inside
"one icon"**, because an Angular component definition is a module-level side effect esbuild cannot
drop from the FESM. The two numbers move together because they are, structurally, the same cost.

### API

- New exported type `AutoReveal`, and a new optional `autoReveal` field on `IconChoreography`.
- The `reveal` ghost is synthesized in the DOM at playback and **never enters `def.shapes`**. That is
  not a style preference: `glyphflow/morph` builds its geometry from `shapes` filtering
  `opacity !== '0'`, and one extra figure there would mismatch morphs across the whole catalog. This
  way the published geometry does not change by a single byte for those 1767 icons.
- `dart`'s trail figures are real, visible-at-zero-opacity entries in `shapes` (unlike the `reveal`
  ghost), each one declared individually in the test suite's `FIGURAS_ANEXAS` allowlist — they are
  part of the icon's own curated geometry, not synthesized at runtime.
