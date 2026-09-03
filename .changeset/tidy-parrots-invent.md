---
'glyphflow': major
---

`reveal` now means one thing, and every icon has it

**Breaking.** Through 2.6.0, `reveal` was the name of 122 hand-written choreographies that did
different things: some assembled the icon from scattered pieces, some kept the base still and only
brought in the mark, some lit up bars one at a time. From 3.0.0 it names **a single animation**,
available on all 1767 icons: the icon materializes — a faint copy of the full stroke flashes
underneath (the "ghost") while the real stroke draws on top, and the whole thing settles with a
wobble. It is the recipe `bolt` and `audio-waveform` already carried by hand.

### What breaks

**Variant names have been public contract since 2.6.0**, when `ICON_VARIANTS` shipped. This changes
its **values** for 108 icons, so anyone who wired a variant picker against that export in 2.6.0 will
see a different list. And anyone writing `animation="reveal"` on one of the 93 renamed icons **gets
no error**: the string is still valid, it just plays the generic materialization instead of the
gesture it used to have. That silent break is why this is a major and not a minor.

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
`external-link` loses its `launch` variant.

Another 15 icons lose their hand-written `reveal` — `activity`, `check`, `x`, `plus`, `minus`,
`book-open`, `bookmark-*`… — because they were already this same recipe **without the ghost**. They
do not lose the animation: they inherit the universal one, which is better than what they had.

### The hover gesture is picked by name, not by position

`varianteDeHover` used to take **the third key** of `animations`. With `reveal` on all 1767 that
rule would have stolen the hover from the 672 icons that only had `draw` and `default`: they would
have gone from their curated gesture to a generic materialization, silently and without a failing
test. It now picks **the first name that is not `draw`, `default`, or the generic `reveal`**.

A hand-written `reveal` **does** count as an icon's own gesture — whoever wrote `bolt`'s did so
because the generic one did not serve it — and the exclusion checks the `autoReveal` field, not the
name. Measured across the catalog: **1758 of 1767 icons keep their hover gesture**. The 9 that change
do so because of deliberate decisions, and one improves (`route-off` moves to `strike`, the gesture
of the `-off` family).

### Size

The CI budget for "one hand-imported icon" goes from 5 KB to 5.5 KB gzip, and the figures published
in the README and on the site go from **4.59 KB to 5.04 KB** (+0.45 KB, the cost of the ghost). The
budget was raised deliberately: that tripwire exists to catch the whole catalog leaking in (~94 KB),
and 5.04 does not threaten it.

Worth knowing why that number is what it is: **that case never measured the icon alone — it carries
the whole component**, because an Angular component definition is a module-level side effect esbuild
cannot drop from the FESM. `core` (4.06 → 4.50 KB) is not a separate budget with room to spare; it
sits inside this one.

### API

- New exported type `AutoReveal`, and a new optional `autoReveal` field on `IconChoreography`.
- The ghost is synthesized in the DOM at playback and **never enters `def.shapes`**. That is not a
  style preference: `glyphflow/morph` builds its geometry from `shapes` filtering `opacity !== '0'`,
  and one extra figure there would mismatch morphs across the whole catalog. This way the published
  geometry does not change by a single byte.
