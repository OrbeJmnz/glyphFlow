---
'glyphflow': minor
---

Six curated two-state gestures, exported as `intent`

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
